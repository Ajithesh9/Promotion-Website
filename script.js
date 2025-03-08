document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/.netlify/functions/getStudents");
    const data = await response.json();
    console.log("Fetched student data:", data);

    // Populate the Topper Spotlight with the top student (first in sorted array)
    populateTopper(data.caStudents);

    // Populate the CA Foundation student grid
    populateStudents(data.caStudents);

    // Populate the Jr MEC student grid
    populateJrMecStudents(data.jrMecStudents);
  } catch (error) {
    console.error("Error fetching student data:", error);
  }
});

function populateTopper(students) {
  if (!students || students.length === 0) return;
  // Assume the first student is the topper
  const topper = students[0];
  const topperSpotlight = document.querySelector(".topper-spotlight");
  if (topperSpotlight) {
    topperSpotlight.innerHTML = `
      <div class="topper-photo" style="background-image: url('${topper.photo}');"></div>
      <div class="topper-details">
        <h2 class="topper-name">${topper.name}</h2>
        <div class="topper-marks">${topper.marks}</div>
        <p class="topper-max-marks">Out of ${topper.max} Marks</p>
        <p class="topper-htno">HT No: ${topper.htno}</p>
      </div>
    `;
  }
}

function populateStudents(students) {
  const studentsGrid = document.querySelector(".students-grid");
  if (studentsGrid) {
    studentsGrid.innerHTML = ""; // Clear any existing content
    students.forEach((student) => {
      const card = document.createElement("div");
      card.className = "student-card";
      card.innerHTML = `
        <div class="student-photo" style="background-image: url('${student.photo}');">
          <div class="student-rank">${student.htno}</div>
        </div>
        <div class="student-info">
          <h3 class="student-name">${student.name}</h3>
          <div class="student-marks">${student.marks}</div>
          <p class="student-max-marks">Max Marks: ${student.max}</p>
          <p class="ht-no">HT No: ${student.htno}</p>
        </div>
      `;
      studentsGrid.appendChild(card);
    });
  }
}

function populateJrMecStudents(jrStudents) {
  const jrMecGrid = document.querySelector(".jr-mec-grid");
  if (jrMecGrid) {
    jrMecGrid.innerHTML = ""; // Clear any existing content
    jrStudents.forEach((student, index) => {
      const card = document.createElement("div");
      card.className = "student-card jr-mec";
      card.innerHTML = `
        <div class="student-photo" style="background-image: url('${student.photo}');"></div>
        <div class="student-info">
          <h3 class="student-name">${student.name}</h3>
          <div class="student-marks">${student.gainedMarks}</div>
          <p class="student-max-marks">Max Marks: ${student.maxMarks}</p>
        </div>
      `;
      jrMecGrid.appendChild(card);
    });
  }
}
