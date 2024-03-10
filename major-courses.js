let search;
let courseList;

const urlParams = new URLSearchParams(window.location.search);
const major = urlParams.get('major');

async function fetchCourses() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    courseList = await response.json();
    console.log(courseList); // Logging the courseList here will ensure it's populated
    generateCourses(courseList);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
  }
}

window.onload = function() {
    fetchCourses();
};

function generateCourses(courses) {
  const container = document.getElementById("classescontainer");

  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("g-4");
  row.classList.add("py-4");

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].major == major) {
        for (let j = 0; j < courses[i]["courses"].length; j++) {
            let courseCode = courses[i]["courses"][j]["courseCode"];
            let courseTitle = courses[i]["courses"][j]["courseTitle"];
            let credits = courses[i]["courses"][j]["credits"];
            let img = courses[i]["courses"][j]["courseTitle"];

            let column = document.createElement("div");
            column.classList.add("col");
            column.classList.add("d-flex");
            column.classList.add("flex-column");
            column.style.height = '150px';
            // column.style.marginBottom = '20px';

            const courseContainer = document.createElement("div");
            courseContainer.classList.add("course-container");
            courseContainer.classList.add("d-flex");
            courseContainer.classList.add("flex-column");
            courseContainer.classList.add("h-100");
            // courseContainer.classList.add("justify-content-between");
            courseContainer.classList.add("justify-content-center"); // Center content horizontally
            courseContainer.classList.add("align-items-center"); // Center content vertically
            courseContainer.style.cursor = 'pointer';

            courseContainer.addEventListener("click", function () {
                window.location.href = "course-details.html?code=" + encodeURIComponent(courseCode) + "&description=" + encodeURIComponent(courseTitle);
            });

            courseContainer.innerHTML = `
                    <div class="text-center">
                        <h3 class="fs-2 text-body-emphasis text-center">${courseCode}</h3>
                        <p>${courseTitle}</p>
                        <p><strong>Credits:</strong> ${credits}</p>
                    </div>`;

            column.appendChild(courseContainer);
            row.appendChild(column);

            if (row.children.length == 2) {
                container.appendChild(row);
                row = document.createElement("div");
                row.classList.add("row");
                row.classList.add("g-4");
                row.classList.add("py-3");
            }
        }
    }
  }
}


