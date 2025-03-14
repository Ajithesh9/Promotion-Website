// script.js
console.log("script.js loaded");

document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM fully loaded, starting fetch...");
  try {
    const response = await fetch("/.netlify/functions/getStudents");
    console.log("Fetch response:", response);
    if (!response.ok) {
      console.error("HTTP error while fetching data:", response.status);
      return;
    }
    const data = await response.json();
    console.log("Fetched student data:", data);

    if (!data.caStudents || !data.jrMecStudents) {
      console.error("Data is missing required arrays.");
      return;
    }

    populateTopper(data.caStudents);
    populateStudents(data.caStudents);
    populateJrMecStudents(data.jrMecStudents);
  } catch (error) {
    console.error("Error fetching student data:", error);
  }

  // Mobile Menu Toggle
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const nav = document.querySelector("nav");
  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", (e) => {
      e.preventDefault();
      nav.classList.toggle("active");
      console.log("Mobile menu toggled:", nav.classList.contains("active"));
    });
    // Optional: close the menu if clicking outside
    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove("active");
      }
    });
  } else {
    console.error("Mobile menu toggle or nav not found");
  }
});

function populateTopper(students) {
  if (!students || students.length === 0) {
    console.error("No CA Foundation students data found");
    return;
  }
  // Use the first student as the topper.
  const topper = students[0];
  console.log("Populating topper with:", topper);
  const topperSpotlight = document.querySelector(".topper-spotlight");
  if (!topperSpotlight) {
    console.error("Topper spotlight element not found");
    return;
  }
  // Use a fixed topper image using a relative path.
  topperSpotlight.innerHTML = `
    <div class="topper-photo" style="background-image: url('assets/topper.webp');"></div>
    <div class="topper-details">
      <h2 class="topper-name">${topper.name}</h2>
      <div class="topper-marks">${topper.marks}</div>
      <p class="topper-max-marks">Out of ${topper.max} Marks</p>
      <p class="topper-htno">HT No: ${topper.htno}</p>
    </div>
  `;
  topperSpotlight.style.opacity = "1";
  topperSpotlight.classList.add("visible");
  console.log("Topper spotlight updated");
}

function populateStudents(students) {
  // Select the CA Foundation grid: the div with class "students-grid" inside #ca-foundation.
  const caGrid = document.querySelector("#ca-foundation .students-grid");
  if (!caGrid) {
    console.error("CA Foundation students grid not found");
    return;
  }
  caGrid.innerHTML = "";
  // Use the array index (index + 1) as the student rank.
  students.forEach((student, index) => {
    const card = document.createElement("div");
    card.className = "student-card";
    card.innerHTML = `
      <div class="student-photo" style="background-image: url('${
        student.photo
      }');">
        <div class="student-rank">${index + 1}</div>
      </div>
      <div class="student-info">
        <h3 class="student-name">${student.name}</h3>
        <div class="student-marks">${student.marks}</div>
        <p class="student-max-marks">Max Marks: ${student.max}</p>
        <p class="ht-no">HT No: ${student.htno}</p>
      </div>
    `;
    card.style.opacity = "1";
    card.classList.add("visible");
    caGrid.appendChild(card);
  });
  console.log("CA Foundation grid populated with", students.length, "students");
}

function populateJrMecStudents(jrStudents) {
  // Select the Jr. MEC grid: the div with class "students-grid jr-mec-grid" inside #jr-mec.
  const jrGrid = document.querySelector("#jr-mec .jr-mec-grid");
  if (!jrGrid) {
    console.error("Jr MEC grid not found");
    return;
  }
  jrGrid.innerHTML = "";
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
    card.style.opacity = "1";
    card.classList.add("visible");
    jrGrid.appendChild(card);
  });
  console.log("Jr MEC grid populated with", jrStudents.length, "students");
}

function setupLazyLoad() {
  const lazyElements = document.querySelectorAll(".lazy");
  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const src = el.getAttribute("data-src");
            if (src) {
              el.style.backgroundImage = `url('${src}')`;
              el.removeAttribute("data-src");
            }
            el.classList.add("visible");
            observer.unobserve(el);
          }
        });
      },
      {
        rootMargin: "0px 0px 50px 0px",
        threshold: 0,
      }
    );
    lazyElements.forEach((el) => observer.observe(el));
  } else {
    lazyElements.forEach((el) => {
      const src = el.getAttribute("data-src");
      if (src) {
        el.style.backgroundImage = `url('${src}')`;
        el.removeAttribute("data-src");
      }
      el.classList.add("visible");
    });
  }
}
