# -*- coding: utf-8 -*-
"""Mater Misericordiae Secondary School, Rumomasi — weekly lesson-note PDF
generator. Renders SS1 and SS3 First-Term 2026/2027 notes (weeks 1-6, 10
subjects each) in the same school format as the SS2 PDFs, writes them into
mater-notes/, refreshes mater-notes/README.md (30-file index) and emits
quiz/_mater_list.json for the app's Mater Notes library module.
Run: python3 quiz/mater_gen.py  (needs pip install -r requirements.txt)"""
import os, sys, json, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, PageBreak)
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "..")
OUT = os.path.join(ROOT, "mater-notes")

GREEN = colors.HexColor("#0b4a37")
GOLD = colors.HexColor("#8a5f24")
INK = colors.HexColor("#20302a")
MUT = colors.HexColor("#55695e")

WEEKS = ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"]
TERM = "FIRST 2026/2027 ACADEMIC SESSION"
SCHOOL = "NAME OF SCHOOL: MATER MISERICORDIAE SECONDARY SCHOOL, RUMOMASI"

# content key -> (display subject, file label)
SUBJ_MAP = {
    "Agricultural Science": ("Agricultural Science", "AGRIC"),
    "Biology": ("Biology", "BIOLOGY"),
    "Chemistry": ("Chemistry", "CHEMISTRY"),
    "Civic Education": ("Citizenship & Heritage Studies", "CITIZENSHIP AND HERITAGE STUDIES"),
    "Computer Studies": ("Digital Technology", "DIGITAL TECHNOLOGY"),
    "Economics": ("Economics", "ECONOMICS"),
    "English Language": ("English Language", "ENGLISH LANGUAGE"),
    "Geography": ("Geography", "GEOGRAPHY"),
    "Government": ("Government", "GOVERNMENT"),
    "Food & Nutrition": ("Home Management", "HOME MANAGEMENT"),
}

st_hdr = ParagraphStyle("hdr", fontName="Times-Bold", fontSize=12, leading=16,
                        textColor=INK, alignment=TA_CENTER, spaceAfter=1)
st_meta = ParagraphStyle("meta", fontName="Times-Roman", fontSize=10.5, leading=14,
                         textColor=MUT, alignment=TA_CENTER, spaceAfter=1)
st_topic = ParagraphStyle("topic", fontName="Helvetica-Bold", fontSize=15.5, leading=21,
                          textColor=GREEN, alignment=TA_CENTER, spaceBefore=10, spaceAfter=12)
st_sec = ParagraphStyle("sec", fontName="Helvetica-Bold", fontSize=11.8, leading=17,
                        textColor=GOLD, spaceBefore=13, spaceAfter=4)
st_body = ParagraphStyle("body", fontName="Helvetica", fontSize=11.2, leading=17.2,
                         textColor=INK, spaceAfter=7, alignment=TA_LEFT)
st_bullet = ParagraphStyle("bul", parent=st_body, leftIndent=15, bulletIndent=4, spaceAfter=5)
st_eval = ParagraphStyle("eval", parent=st_bullet, leftIndent=20, spaceAfter=6)


def clean(t):
    """Keep reportlab mini-markup but neutralise stray ampersands & angle brackets."""
    t = t.replace("&", "&amp;").replace("<b>", "@B@").replace("</b>", "@/B@") \
         .replace("<i>", "@I@").replace("</i>", "@/I@")
    t = re.sub(r"<[^>]+>", "", t)
    return t.replace("@B@", "<b>").replace("@/B@", "</b>") \
            .replace("@I@", "<i>").replace("@/I@", "</i>")


def meta_row(cls, subj_disp):
    return [Paragraph("CLASS: " + cls, st_meta), Paragraph("SUBJECT: " + subj_disp, st_meta)]


def build_pdf(path, cls, subj_disp, weeks):
    doc = BaseDocTemplate(path, pagesize=A4,
                          leftMargin=2.0 * cm, rightMargin=2.0 * cm,
                          topMargin=1.6 * cm, bottomMargin=1.8 * cm,
                          title="Mater Misericordiae Secondary School, Rumomasi — %s %s" % (cls, subj_disp),
                          author="Mater Misericordiae Secondary School, Rumomasi")
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="f")
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame])])
    story = []
    for i, (topic, secs) in enumerate(weeks):
        if i:
            story.append(PageBreak())
        story.append(Paragraph(SCHOOL, st_hdr))
        story.append(Paragraph("TERM: " + TERM, st_meta))
        story.append(Paragraph("WEEK: " + WEEKS[i], st_meta))
        m = meta_row(cls, subj_disp)
        t = Table([m], colWidths=[doc.width / 2.0, doc.width / 2.0])
        t.setStyle(TableStyle([("ALIGN", (0, 0), (-1, -1), "CENTER"),
                               ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                               ("LEFTPADDING", (0, 0), (-1, -1), 0),
                               ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                               ("TOPPADDING", (0, 0), (-1, -1), 1),
                               ("BOTTOMPADDING", (0, 0), (-1, -1), 1)]))
        story.append(t)
        story.append(Paragraph("TOPIC: " + clean(topic), st_topic))
        bar = Table([[""]], colWidths=[doc.width], rowHeights=[1.2])
        bar.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD),
                                 ("LEFTPADDING", (0, 0), (-1, -1), 0),
                                 ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                                 ("TOPPADDING", (0, 0), (-1, -1), 0),
                                 ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
        story.append(bar)
        story.append(Spacer(1, 4))
        for heading, items in secs:
            is_eval = heading.strip().lower() == "class evaluation"
            story.append(Paragraph(clean(heading).upper() if is_eval else clean(heading), st_sec))
            if is_eval:
                for n, q in enumerate(items, 1):
                    story.append(Paragraph("%d.&nbsp;&nbsp;%s" % (n, clean(q)), st_eval))
            else:
                for it in items:
                    story.append(Paragraph(clean(it), st_bullet, bulletText="\u2022"))
            story.append(Spacer(1, 2))
    doc.build(story)


def main():
    from mater_ss1a import SS1_A
    from mater_ss1b import SS1_B
    from mater_ss3a import SS3_A
    from mater_ss3b import SS3_B
    try:
        from pypdf import PdfReader
    except Exception:
        PdfReader = None

    content = {"SS1": dict(list(SS1_A.items()) + list(SS1_B.items())),
               "SS3": dict(list(SS3_A.items()) + list(SS3_B.items()))}
    entries = []
    os.makedirs(OUT, exist_ok=True)
    for cls in ("SS1", "SS3"):
        for key in ("Biology", "Chemistry", "Economics", "English Language",
                    "Geography", "Government", "Agricultural Science",
                    "Computer Studies", "Civic Education", "Food & Nutrition"):
            subj_disp, label = SUBJ_MAP[key]
            fname = "SS %s %s  WK 1-6.pdf" % (cls[2], label)
            path = os.path.join(OUT, fname)
            weeks = content[cls][key]
            build_pdf(path, cls, subj_disp, weeks)
            pages = len(PdfReader(path).pages) if PdfReader else 0
            topics = [w[0] for w in weeks]
            entries.append({"cls": cls, "subj": subj_disp, "file": fname,
                            "pages": pages, "weeks": "Weeks 1\u20136 \u00b7 First Term",
                            "topics": topics})
            print("built %-6s %-32s %3d pages" % (cls, fname, pages))
    json.dump(entries, open(os.path.join(HERE, "_mater_list.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)

    # README index — merge with existing SS2 files
    readme = ["# Master Notes — Mater Misericordiae Secondary School, Rumomasi\n\n",
              "Weekly lesson notes for **SS1, SS2 and SS3**, weeks 1\u20136, First Term 2026/2027.\n\n",
              "Open any file to read or print it. In the app, tap **\U0001f4da Mater Notes** (launcher button) ",
              "or the note's **Open PDF** to browse and open the same library.\n",
              "| Class | Subject | File | Pages |\n|---|---|---|---|\n"]
    for e in sorted(entries, key=lambda x: (x["cls"], x["subj"])):
        readme.append("| %s | %s | `%s` | %d |\n" % (e["cls"], e["subj"], e["file"], e["pages"]))
    for f in sorted(os.listdir(OUT)):
        if f.startswith("SS 2") and f.endswith(".pdf"):
            if PdfReader:
                p = len(PdfReader(os.path.join(OUT, f)).pages)
            else:
                p = "?"
            subj = re.sub(r"\s*WKS?\s*1-6\.pdf$", "", f.replace("SS 2 ", ""))
            readme.append("| SS2 | %s | `%s` | %s |\n" % (subj, f, p))
    open(os.path.join(OUT, "README.md"), "w", encoding="utf-8").write("".join(readme))
    print("README index written; total entries:", len(entries), "new")


if __name__ == "__main__":
    main()
