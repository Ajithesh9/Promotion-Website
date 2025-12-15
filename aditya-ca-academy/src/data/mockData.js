// You can also import these directly from your JSON files if you move them to src
import caData from './ca_foundation_students.json'; 
import mecData from './jr_mec_students.json';

// Helper to sort and add image paths matching your original logic
export const getCAStudents = () => {
  const students = caData.ca_foundation_students || [];
  return students
    .sort((a, b) => b.marks - a.marks)
    .map(s => ({
      ...s,
      photo: `/assets/student photos/${s.htno}.jpg` // Ensure images are in public folder
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