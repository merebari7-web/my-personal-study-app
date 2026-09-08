import jsPDF from 'jspdf';
import { LessonNote, SchemeOfWork } from '../types';

export const pdfService = {
  /**
   * Export a complete formatted Nigerian Lesson Note to PDF
   */
  exportLessonNotePDF(note: LessonNote, schoolName: string = 'FEDERAL GOVERNMENT COLLEGE'): void {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    // Helper to add clean text and advance y
    const checkPageBreak = (neededHeight: number = 20) => {
      if (y + neededHeight >= 280) {
        doc.addPage();
        y = 20;
      }
    };

    // Header - Nigerian School Format
    doc.setFillColor(0, 135, 81); // Nigerian Green
    doc.rect(margin, y, contentWidth, 2, 'F');
    y += 7;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0, 100, 60);
    doc.text(schoolName.toUpperCase(), pageWidth / 2, y, { align: 'center' });
    y += 6;

    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50);
    doc.text('OFFICIAL NERDC CURRICULUM LESSON PLAN', pageWidth / 2, y, { align: 'center' });
    y += 5;

    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text(`Curriculum Reference: ${note.nerdcCode} | Bloom Taxonomy: ${note.bloomLevel}`, pageWidth / 2, y, { align: 'center' });
    y += 6;

    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // Metadata Grid Box
    doc.setFillColor(245, 247, 250);
    doc.rect(margin, y, contentWidth, 24, 'F');
    doc.rect(margin, y, contentWidth, 24, 'S');

    doc.setFontSize(9);
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.text('SUBJECT:', margin + 4, y + 6);
    doc.text('CLASS:', margin + 65, y + 6);
    doc.text('TERM:', margin + 115, y + 6);

    doc.text('WEEK:', margin + 4, y + 13);
    doc.text('DURATION:', margin + 65, y + 13);
    doc.text('PERIOD:', margin + 115, y + 13);

    doc.text('AUTHOR:', margin + 4, y + 20);
    doc.text('DATE:', margin + 115, y + 20);

    doc.setFont('helvetica', 'normal');
    doc.text(note.subjectName, margin + 22, y + 6);
    doc.text(note.className, margin + 80, y + 6);
    doc.text(note.term, margin + 130, y + 6);

    doc.text(`Week ${note.week}`, margin + 22, y + 13);
    doc.text(note.duration, margin + 85, y + 13);
    doc.text(note.period, margin + 132, y + 13);

    doc.text(note.author, margin + 22, y + 20);
    doc.text(note.updatedAt || new Date().toISOString().split('T')[0], margin + 130, y + 20);

    y += 30;

    // TOPIC TITLE
    doc.setFillColor(236, 253, 245);
    doc.rect(margin, y, contentWidth, 10, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(6, 95, 70);
    doc.text(`TOPIC: ${note.topic.toUpperCase()}`, margin + 4, y + 7);
    y += 14;

    // 1. BEHAVIORAL OBJECTIVES
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 100, 60);
    doc.text('1. BEHAVIORAL OBJECTIVES', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    doc.text('By the end of this lesson, learners should be able to:', margin + 2, y);
    y += 5;

    note.behavioralObjectives.forEach((obj, idx) => {
      checkPageBreak(10);
      const lines = doc.splitTextToSize(`${idx + 1}. ${obj}`, contentWidth - 8);
      doc.text(lines, margin + 4, y);
      y += lines.length * 4.5;
    });
    y += 3;

    // 2. ENTRY BEHAVIOUR / PREVIOUS KNOWLEDGE
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 100, 60);
    doc.text('2. PREVIOUS KNOWLEDGE / ENTRY BEHAVIOUR', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    const pkLines = doc.splitTextToSize(note.previousKnowledge, contentWidth - 4);
    doc.text(pkLines, margin + 2, y);
    y += pkLines.length * 4.5 + 4;

    // 3. INSTRUCTIONAL MATERIALS
    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 100, 60);
    doc.text('3. INSTRUCTIONAL MATERIALS / TEACHING AIDS', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(40, 40, 40);
    note.instructionalMaterials.forEach(mat => {
      checkPageBreak(8);
      const lines = doc.splitTextToSize(`• ${mat}`, contentWidth - 6);
      doc.text(lines, margin + 3, y);
      y += lines.length * 4.2;
    });
    y += 4;

    // 4. LESSON PRESENTATION (STEP BY STEP)
    checkPageBreak(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 100, 60);
    doc.text('4. LESSON PRESENTATION & STEP-BY-STEP CONTENT', margin, y);
    y += 6;

    note.lessonPresentation.forEach(step => {
      checkPageBreak(35);
      doc.setFillColor(245, 247, 250);
      doc.rect(margin, y, contentWidth, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(step.title, margin + 3, y + 4.5);
      y += 9;

      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(70, 70, 70);
      const tAct = doc.splitTextToSize(`Teacher's Activity: ${step.teacherActivity}`, contentWidth - 6);
      doc.text(tAct, margin + 3, y);
      y += tAct.length * 4;

      const lAct = doc.splitTextToSize(`Learners' Activity: ${step.learnerActivity}`, contentWidth - 6);
      doc.text(lAct, margin + 3, y);
      y += lAct.length * 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(20, 20, 20);
      const contentLines = doc.splitTextToSize(step.content, contentWidth - 6);
      doc.text(contentLines, margin + 3, y);
      y += contentLines.length * 4 + 4;
    });

    // 5. WORKED EXAMPLES
    if (note.workedExamples && note.workedExamples.length > 0) {
      checkPageBreak(30);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(0, 100, 60);
      doc.text('5. WORKED EXAMPLES / PRACTICAL ILLUSTRATIONS', margin, y);
      y += 5;

      note.workedExamples.forEach(ex => {
        checkPageBreak(25);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text(ex.title, margin + 2, y);
        y += 4.5;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(40, 40, 40);
        const pLines = doc.splitTextToSize(`Problem: ${ex.problem}`, contentWidth - 6);
        doc.text(pLines, margin + 4, y);
        y += pLines.length * 4;

        doc.setFont('helvetica', 'italic');
        const sLines = doc.splitTextToSize(`Solution: \n${ex.solution}`, contentWidth - 6);
        doc.text(sLines, margin + 4, y);
        y += sLines.length * 4 + 3;
      });
    }

    // 6. EVALUATION & ASSIGNMENT
    checkPageBreak(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 100, 60);
    doc.text('6. EVALUATION QUESTIONS', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 30, 30);
    note.evaluationQuestions.forEach(q => {
      checkPageBreak(8);
      const qLines = doc.splitTextToSize(q, contentWidth - 6);
      doc.text(qLines, margin + 3, y);
      y += qLines.length * 4;
    });
    y += 4;

    checkPageBreak(25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 100, 60);
    doc.text('7. TAKE-HOME ASSIGNMENT', margin, y);
    y += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 30, 30);
    const assignLines = doc.splitTextToSize(note.assignment, contentWidth - 6);
    doc.text(assignLines, margin + 3, y);
    y += assignLines.length * 4 + 8;

    // Sign-off / Approval Block
    checkPageBreak(25);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(80, 80, 80);
    doc.text('SUBJECT TEACHER\'S SIGNATURE: _______________________', margin + 4, y);
    doc.text('HOD / VP ACADEMICS STAMP: _______________________', margin + 95, y);

    // Save PDF
    const filename = `${note.className}_${note.subjectName}_Wk${note.week}_LessonNote.pdf`.replace(/\s+/g, '_');
    doc.save(filename);
  },

  /**
   * Export a 12-Week Scheme of Work to PDF
   */
  exportSchemeOfWorkPDF(sow: SchemeOfWork, schoolName: string = 'FEDERAL GOVERNMENT COLLEGE'): void {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 12;
    let y = 16;

    // Header
    doc.setFillColor(0, 135, 81);
    doc.rect(margin, y, pageWidth - margin * 2, 2, 'F');
    y += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(0, 100, 60);
    doc.text(schoolName.toUpperCase(), pageWidth / 2, y, { align: 'center' });
    y += 5;

    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50);
    doc.text(`NERDC 12-WEEK SCHEME OF WORK — ${sow.className.toUpperCase()} ${sow.subjectName.toUpperCase()} (${sow.term.toUpperCase()})`, pageWidth / 2, y, { align: 'center' });
    y += 4;

    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Academic Session: ${sow.academicSession} | Official Standard Syllabus Scheme`, pageWidth / 2, y, { align: 'center' });
    y += 6;

    // Table Header
    const colX = [margin, margin + 14, margin + 65, margin + 125, margin + 185, margin + 235];
    const colWidths = [14, 51, 60, 60, 50, 38];

    doc.setFillColor(240, 245, 240);
    doc.rect(margin, y, pageWidth - margin * 2, 7, 'F');
    doc.setDrawColor(180, 180, 180);
    doc.rect(margin, y, pageWidth - margin * 2, 7, 'S');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(0, 80, 50);
    doc.text('WEEK', colX[0] + 2, y + 4.5);
    doc.text('TOPIC / SUBTOPICS', colX[1] + 2, y + 4.5);
    doc.text('BEHAVIORAL OBJECTIVES', colX[2] + 2, y + 4.5);
    doc.text('INSTRUCTIONAL AIDS', colX[3] + 2, y + 4.5);
    doc.text('TEACHER & LEARNER ACTIVITIES', colX[4] + 2, y + 4.5);
    doc.text('EVALUATION', colX[5] + 2, y + 4.5);
    y += 7;

    // Rows
    sow.weeks.forEach(item => {
      const rowHeight = 12;
      if (y + rowHeight >= 195) {
        doc.addPage();
        y = 15;
      }

      doc.setFillColor(item.week % 2 === 0 ? 252 : 255, item.week % 2 === 0 ? 252 : 255, item.week % 2 === 0 ? 252 : 255);
      doc.rect(margin, y, pageWidth - margin * 2, rowHeight, 'F');
      doc.rect(margin, y, pageWidth - margin * 2, rowHeight, 'S');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(30, 30, 30);
      doc.text(`Wk ${item.week}`, colX[0] + 2, y + 5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      const topLines = doc.splitTextToSize(item.topic, colWidths[1] - 4);
      doc.text(topLines, colX[1] + 2, y + 4);

      const objLines = doc.splitTextToSize(item.behavioralObjectives.join('; '), colWidths[2] - 4);
      doc.text(objLines, colX[2] + 2, y + 4);

      const aidLines = doc.splitTextToSize(item.instructionalMaterials.join(', '), colWidths[3] - 4);
      doc.text(aidLines, colX[3] + 2, y + 4);

      const actLines = doc.splitTextToSize(`${item.teacherActivities}`, colWidths[4] - 4);
      doc.text(actLines, colX[4] + 2, y + 4);

      const evalLines = doc.splitTextToSize(item.evaluation, colWidths[5] - 4);
      doc.text(evalLines, colX[5] + 2, y + 4);

      y += rowHeight;
    });

    // Approval sign block
    y += 6;
    if (y < 195) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text('PREPARED BY: ____________________________', margin + 10, y + 4);
      doc.text('APPROVED BY PRINCIPAL: ____________________________', pageWidth - margin - 110, y + 4);
    }

    const filename = `${sow.className}_${sow.subjectName}_${sow.term}_SchemeOfWork.pdf`.replace(/\s+/g, '_');
    doc.save(filename);
  }
};
