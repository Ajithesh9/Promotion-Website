import caData from './ca_foundation_students.json'; 
import mecData from './jr_mec_students.json';
import cecData from './jr_cec_students.json';

export const getCAStudents = () => {
  const students = caData.ca_foundation_students || [];
  return students
    .sort((a, b) => b.marks - a.marks)
    .map(s => ({
      ...s,
      // CA Path: /assets/CA/908688.webp
      photo: `/assets/CA/${s.htno}.webp` 
    }));
};

export const getMecStudents = () => {
  const students = mecData.jr_mec_students || [];
  return students
    .sort((a, b) => b.gainedMarks - a.gainedMarks)
    .map((s, i) => ({
      ...s,
      // MEC Path: /assets/MEC/MEC_1.webp, MEC_2.webp...
      photo: `/assets/MEC/MEC_${i + 1}.webp` 
    }));
};

export const getCECStudents = () => {
  const students = cecData.jr_cec_students || [];
  return students
    .sort((a, b) => b.gainedMarks - a.gainedMarks)
    .map((s, i) => ({
      ...s,
      // CEC Path: /assets/CEC/CEC_1.webp, CEC_2.webp...
      photo: `/assets/CEC/CEC_${i + 1}.webp` 
    }));
};