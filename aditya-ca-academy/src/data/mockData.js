import caData from './ca_foundation_students.json'; 
import mecData from './jr_mec_students.json';
import cecData from './jr_cec_students.json'; // [1] Import

export const getCAStudents = () => {
  const students = caData.ca_foundation_students || [];
  return students
    .sort((a, b) => b.marks - a.marks)
    .map(s => ({
      ...s,
      photo: `/assets/student photos/${s.htno}.jpg`
    }));
};

export const getMecStudents = () => {
  const students = mecData.jr_mec_students || [];
  return students
    .sort((a, b) => b.gainedMarks - a.gainedMarks)
    .map((s, i) => ({
      ...s,
      photo: `/assets/MEC/jr${i + 1}.jpg`
    }));
};

// [2] New Helper
export const getCECStudents = () => {
  const students = cecData.jr_cec_students || [];
  return students
    .sort((a, b) => b.gainedMarks - a.gainedMarks)
    .map((s, i) => ({
      ...s,
      photo: `/assets/CEC/jr${i + 1}.jpg`
    }));
};