# -*- coding: utf-8 -*-
"""Mater Misericordiae Secondary School, Rumomasi — weekly lesson-note PDF
generator (SECOND TERM). Renders SS1, SS2 and SS3 Second-Term 2026/2027 notes
(weeks 7-12, 10 subjects each, 30 files) in the same school format as the
First-Term files, writes them into mater-notes/, refreshes mater-notes/README.md
(60-file index) and emits quiz/_mater_list_t2.json for the app's Mater Notes
library module.
Run: python3 quiz/mater_gen2.py  (needs reportlab + pypdf)"""
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

WEEKS = ["SEVEN", "EIGHT", "NINE", "TEN", "ELEVEN", "TWELVE"]
TERM = "SECOND 2026/2027 ACADEMIC SESSION"
SCHOOL = "NAME OF SCHOOL: MATER MISERICORDIAE SECONDARY SCHOOL, RUMOMASI"

# content key -> (display subject, file label) — same as First Term
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
SUBJECTS = ("Biology", "Chemistry", "Economics", "English Language",
            "Geography", "Government", "Agricultural Science",
            "Computer Studies", "Civic Education", "Food & Nutrition")

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


def load_content():
    from mater_ss1c import SS1_T2 as A
    from mater_ss1d import SS1_T2 as B
    from mater_ss2_bio import SS2_BIO
    from mater_ss2_chem import SS2_CHEM
    from mater_ss2_eco import SS2_ECO
    from mater_ss2_eng import SS2_ENG, SS2_GEO
    from mater_ss2_agri import SS2_AGRI, SS2_COMP
    from mater_ss2_civ import SS2_CIV, SS2_FOOD, SS2_GOV
    from mater_ss3_t2a import SS3_BIO2, SS3_CHEM2
    from mater_ss3_t2b import SS3_ECO2, SS3_ENG2
    from mater_ss3_t2c import SS3_GEO2, SS3_GOV2
    from mater_ss3_t2d import SS3_AGRI2, SS3_COMP2
    from mater_ss3_t2e import SS3_CIV2, SS3_FOOD2
    return {
        "SS1": dict(list(A.items()) + list(B.items())),
        "SS2": {"Biology": SS2_BIO, "Chemistry": SS2_CHEM, "Economics": SS2_ECO,
                "English Language": SS2_ENG, "Geography": SS2_GEO,
                "Agricultural Science": SS2_AGRI, "Computer Studies": SS2_COMP,
                "Civic Education": SS2_CIV, "Food & Nutrition": SS2_FOOD,
                "Government": SS2_GOV},
        "SS3": {"Biology": SS3_BIO2, "Chemistry": SS3_CHEM2, "Economics": SS3_ECO2,
                "English Language": SS3_ENG2, "Geography": SS3_GEO2,
                "Government": SS3_GOV2, "Agricultural Science": SS3_AGRI2,
                "Computer Studies": SS3_COMP2, "Civic Education": SS3_CIV2,
                "Food & Nutrition": SS3_FOOD2},
    }


def main():
    try:
        from pypdf import PdfReader
    except Exception:
        PdfReader = None
    content = load_content()
    entries = []
    os.makedirs(OUT, exist_ok=True)
    for cls in ("SS1", "SS2", "SS3"):
        for key in SUBJECTS:
            subj_disp, label = SUBJ_MAP[key]
            fname = "SS %s %s  WK 7-12.pdf" % (cls[2], label)
            path = os.path.join(OUT, fname)
            weeks = content[cls][key]
            assert len(weeks) == 6, (cls, key, len(weeks))
            build_pdf(path, cls, subj_disp, weeks)
            pages = len(PdfReader(path).pages) if PdfReader else 0
            topics = [w[0] for w in weeks]
            entries.append({"cls": cls, "subj": subj_disp, "file": fname,
                            "pages": pages, "weeks": "Weeks 7\u201312 \u00b7 Second Term",
                            "topics": topics})
            print("built %-6s %-34s %3d pages" % (cls, fname, pages))
    json.dump(entries, open(os.path.join(HERE, "_mater_list_t2.json"), "w", encoding="utf-8"),
              ensure_ascii=False, indent=1)

    # README index — rebuild the full 60-row index from the three lists
    def load_list(path):
        try:
            return json.load(open(path, encoding="utf-8"))
        except Exception:
            return []
    t1 = load_list(os.path.join(HERE, "_mater_list.json"))
    s2 = load_list(os.path.join(HERE, "_mater_list_ss2.json"))
    t2 = entries
    readme = ["# Mater Notes \u2014 Mater Misericordiae Secondary School, Rumomasi\n\n",
              "Weekly lesson notes for **SS1, SS2 and SS3**, First Term 2026/2027 (weeks 1\u20136) and ",
              "Second Term 2026/2027 (weeks 7\u201312) \u2014 60 files in total.\n\n",
              "Open any file to read or print it. In the app, tap the **\U0001f4da Mater Notes** launcher ",
              "to browse and open the same library.\n",
              "## First Term (Weeks 1\u20136)\n",
              "| Class | Subject | File | Pages |\n|---|---|---|---|\n"]

    def row(e):
        return "| %s | %s | `%s` | %d |\n" % (e["cls"], e["subj"], e["file"], e["pages"])

    for e in sorted(t1 + s2, key=lambda x: (x["cls"], x["subj"])):
        readme.append(row(e))
    readme.append("\n## Second Term (Weeks 7\u201312)\n")
    readme.append("| Class | Subject | File | Pages |\n|---|---|---|---|\n")
    for e in sorted(t2, key=lambda x: (x["cls"], x["subj"])):
        readme.append(row(e))
    open(os.path.join(OUT, "README.md"), "w", encoding="utf-8").write("".join(readme))
    print("README index written; second-term files:", len(entries))


if __name__ == "__main__":
    main()
