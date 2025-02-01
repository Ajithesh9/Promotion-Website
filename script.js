// Student Data from CSV
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
  { name: "P  VONODHINI", htno: "908695", marks: 248, max: 400 },
  { name: "D N SAI SURENDRA", htno: "668150", marks: 235, max: 400 },
  { name: "G AASHU GEHLOT", htno: "908718", marks: 225, max: 400 },
  { name: "R LOVA MAHA NAVYA", htno: "908698", marks: 224, max: 400 },
  { name: "R SANDEEP", htno: "908688", marks: 351, max: 400 },
];

// Create an IntersectionObserver to add the "visible" class when elements come into view.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Optionally unobserve once visible
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

function populateTopper() {
  // Find the topper (highest marks)
  const topper = students.reduce((max, student) =>
    max.marks > student.marks ? max : student
  );
  const topperSpotlight = document.querySelector(".topper-spotlight");
  if (topperSpotlight) {
    topperSpotlight.innerHTML = `
      <div class="topper-photo" style="background-image: url('${topper.name}.jpg')"></div>
      <div class="topper-details">
        <h2 class="topper-name">${topper.name}</h2>
        <div class="topper-marks">${topper.marks}</div>
        <p class="topper-max-marks">Out of ${topper.max} Marks</p>
        <p class="topper-htno">HT No: ${topper.htno}</p>
      </div>
    `;
    // Observe the topper section for scroll-triggered animation
    observer.observe(topperSpotlight);
  }
}

function populateStudents() {
  const studentsGrid = document.querySelector(".students-grid");
  if (studentsGrid) {
    // Sort students in descending order by marks
    students
      .sort((a, b) => b.marks - a.marks)
      .forEach((student, index) => {
        const card = document.createElement("div");
        card.className = "student-card";
        card.innerHTML = `
          <div class="student-photo" style="background-image: url('${
            student.name
          }.jpg')">
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
        // Observe each student card for scroll-triggered animation
        observer.observe(card);
      });
  }
}

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  populateTopper();
  populateStudents();
});

// Header Scroll Behavior
let lastScroll = 0;
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 200) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }
  if (currentScroll > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
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
