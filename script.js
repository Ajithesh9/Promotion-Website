// CA Foundation Student Data from CSV
const students = [
  { name: "G S V SUVARNA MADHURI", htno: "668158", marks: 330, max: 400 },
  { name: "CH THANUSRI LAKSHMI", htno: "908700", marks: 314, max: 400 },
  { name: "CHIRLA SAHITHI", htno: "668156", marks: 313, max: 400 },
  { name: "ADITYA REDDY TADI", htno: "668151", marks: 312, max: 400 },
  { name: "PADALA SAI MALLIK", htno: "668160", marks: 310, max: 400 },
  { name: "G NAGA SHIVA KARTHIK", htno: "908684", marks: 308, max: 400 },
  { name: "MOHAN CHOUDHARY", htno: "668095", marks: 305, max: 400 },
  { name: "K SOWMYA SRI", htno: "908704", marks: 293, max: 400 },
  { name: "THARAKESWAR NAGOJU", htno: "668152", marks: 284, max: 400 },
  { name: "V S SATYA LAKSHMI", htno: "668157", marks: 283, max: 400 },
  { name: "K  JOSHNA MADHURI", htno: "668154", marks: 283, max: 400 },
  { name: "P SRUJANA SAILI", htno: "908697", marks: 278, max: 400 },
  { name: "N S P S PRASANNA", htno: "908685", marks: 251, max: 400 },
  { name: "P  VINODHINI", htno: "908695", marks: 248, max: 400 },
  { name: "D N SAI SURENDRA", htno: "668150", marks: 235, max: 400 },
  { name: "G AASHU GEHLOT", htno: "908718", marks: 225, max: 400 },
  { name: "R LOVA MAHA NAVYA", htno: "908698", marks: 224, max: 400 },
  { name: "R SANDEEP", htno: "908688", marks: 351, max: 400 },
];

// Jr. MEC Student Data (for modern-styled cards)
const jrMecStudents = [
  { name: "C N S KARTEEK", gainedMarks: 492, maxMarks: 500 },
  { name: "CH T SRI LAKSHMI", gainedMarks: 490, maxMarks: 500 },
  { name: "C S MADHURI", gainedMarks: 490, maxMarks: 500 },
  { name: "B V V V V U S K Tejaswini", gainedMarks: 488, maxMarks: 500 },
  { name: "P SAI MALLIK", gainedMarks: 487, maxMarks: 500 },
];

// Create an IntersectionObserver for scroll-triggered animations.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// Populate the topper section with the student having maximum marks.
const populateTopper = () => {
  const topper = students.reduce((max, student) =>
    max.marks > student.marks ? max : student
  );
  const topperSpotlight = document.querySelector(".topper-spotlight");
  if (topperSpotlight) {
    topperSpotlight.innerHTML = `
      <div class="topper-photo" style="background-image: url('./assets/topper.jpg');"></div>
      <div class="topper-details">
        <h2 class="topper-name">${topper.name}</h2>
        <div class="topper-marks">${topper.marks}</div>
        <p class="topper-max-marks">Out of ${topper.max} Marks</p>
        <p class="topper-htno">HT No: ${topper.htno}</p>
      </div>
    `;
    observer.observe(topperSpotlight);
  }
};

// Populate CA Foundation students sorted by marks.
// For each student, use a file naming convention: rank1.jpg, rank2.jpg, etc.
const populateStudents = () => {
  const studentsGrid = document.querySelector(".students-grid");
  if (studentsGrid) {
    students
      .sort((a, b) => b.marks - a.marks)
      .forEach((student, index) => {
        const card = document.createElement("div");
        card.className = "student-card";
        if (index === 0) card.classList.add("rank-1");
        else if (index === 1) card.classList.add("rank-2");
        else if (index === 2) card.classList.add("rank-3");

        card.innerHTML = `
          <div class="student-photo" style="background-image: url('./assets/student photos/rank${
            index + 1
          }.jpg');">
            <div class="student-rank">${index + 1}</div>
          </div>
          <div class="student-info">
            <h3 class="student-name">${student.name}</h3>
            <div class="student-marks">${student.marks}</div>
            <p class="student-max-marks">Max Marks: ${student.max}</p>
            <p class="ht-no">HT No: ${student.htno}</p>
          </div>
        `;
        studentsGrid.appendChild(card);
        observer.observe(card);
      });
  }
};

// Populate Jr. MEC students (modern-styled cards) sorted by marks.
// Now using a similar logic for photos with a naming convention: jr1.jpg, jr2.jpg, etc.
const populateJrMecStudents = () => {
  const jrMecGrid = document.querySelector(".jr-mec-grid");
  if (jrMecGrid) {
    jrMecStudents
      .sort((a, b) => b.gainedMarks - a.gainedMarks)
      .forEach((student, index) => {
        const card = document.createElement("div");
        card.className = "student-card jr-mec";
        card.innerHTML = `
          <div class="student-photo" style="background-image: url('./assets/MEC/jr${
            index + 1
          }.jpg');"></div>
          <div class="student-info">
            <h3 class="student-name">${student.name}</h3>
            <div class="student-marks">${student.gainedMarks}</div>
            <p class="student-max-marks">Max Marks: ${student.maxMarks}</p>
          </div>
        `;
        jrMecGrid.appendChild(card);
        observer.observe(card);
      });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  populateTopper();
  populateStudents();
  populateJrMecStudents();

  // Header scroll hide/show functionality
  let lastScroll = 0;
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    header.style.transform =
      currentScroll > lastScroll && currentScroll > 200
        ? "translateY(-100%)"
        : "translateY(0)";
    header.classList.toggle("scrolled", currentScroll > 100);
    lastScroll = currentScroll;
  });

  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector("nav");
  if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      nav.classList.toggle("active");
    });
  }
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      nav.classList.remove("active");
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
  });
});
// Disable right-click context menu
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Optionally disable copy (this won’t stop someone determined enough)
document.addEventListener("copy", function (e) {
  e.preventDefault();
});
