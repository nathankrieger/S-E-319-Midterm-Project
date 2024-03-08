
// fetch("./courses.json")
//   .then(response => response.json())
//   .then(courses => generateCourses(courses));

// function generateCourses(courses) {
//   container = document.getElementById("maincontainer");

//   let row = document.createElement("div");
//   row.classList.add("row");
//   row.classList.add("g-4");
//   row.classList.add("py-5");
//   row.classList.add("row-cols-1");
//   row.classList.add("row-cols-lg-2");


//   for (let i = 0; i < courses[0]["courses"].length; i++) {
//     let courseName = courses[0]["courses"][i];
//     let [courseCode, courseDescription] = courseName.split(':'); // Split course name at the semicolon

//     let column = document.createElement("div");
//     column.classList.add("col");
//     column.classList.add("d-flex");
//     column.classList.add("flex-column"); // Add flex-column class for flexbox
//     column.style.height = '300px'; // Set height to 200px
//     column.style.marginBottom = '20px'; // Add margin between rows
//     column.innerHTML = `
//       <div class="course-container d-flex flex-column h-100 justify-content-between">
//         <div>
//           <h3 class="fs-2 text-body-emphasis text-center">${courseCode}</h3>
//           <p>${courseDescription}</p> <!-- Display course description as a paragraph -->
//         </div>
//       </div>`;
//     row.appendChild(column);

//     container.appendChild(row);
//   }

// }

// fetch("./courses.json")
//   .then(response => response.json())
//   .then(courses => generateCourses(courses));

// function generateCourses(courses) {
//   const container = document.getElementById("maincontainer");

//   // Create a new row for every two courses
//   for (let i = 0; i < courses[0]["courses"].length; i += 2) {
//     let row = document.createElement("div");
//     row.classList.add("row");
//     row.classList.add("g-4");
//     row.classList.add("py-5");

//     // Create columns for each course in the row
//     for (let j = i; j < Math.min(i + 2, courses[0]["courses"].length); j++) {
//       let courseName = courses[0]["courses"][j];
//       let [courseCode, courseDescription] = courseName.split(':'); // Split course name at the semicolon

//       let column = document.createElement("div");
//       column.classList.add("col");
//       column.classList.add("d-flex");
//       column.classList.add("flex-column"); // Add flex-column class for flexbox
//       column.style.height = '300px'; // Set height to 300px
//       //column.style.marginBottom = '10px'; // Add margin between rows

//       // Create the course container
//       const courseContainer = document.createElement("div");
//       courseContainer.classList.add("course-container");
//       courseContainer.classList.add("d-flex");
//       courseContainer.classList.add("flex-column");
//       courseContainer.classList.add("h-100");
//       courseContainer.classList.add("justify-content-between");
//       courseContainer.style.cursor = 'pointer'; // Change cursor to pointer when hovering

//       courseContainer.addEventListener("click", function() {
//         // Define the action you want to take when the container is clicked
//         console.log("Container clicked! Course code: " + courseCode);
//         // Example action: navigate to a specific course page

//         //window.location.href = "course-details.html?code=" + encodeURIComponent(courseCode);
//         window.location.href = "TODO.html";
//       });

//       // Create the content inside the course container
//       courseContainer.innerHTML = `
//         <div>
//           <h3 class="fs-2 text-body-emphasis text-center">${courseCode}</h3>
//           <p>${courseDescription}</p> <!-- Display course description as a paragraph -->
//         </div>`;

//       column.appendChild(courseContainer);
//       row.appendChild(column);
//     }

//     container.appendChild(row);
//   }
// }
let search;
let courseList;

async function fetchCourses() {
    try {
        const response = await fetch("./courses.json");
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }
        courseList = await response.json();
        console.log(courseList); // Logging the courseList here will ensure it's populated
        generateCourses(courseList, "");
    } catch (error) {
        console.error('Error fetching courses:', error.message);
    }
}

window.onload = function () {
    fetchCourses();

    search = document.getElementById("search");

    search.addEventListener("input", () => {
        generateCourses(courseList, search.value);
    });
};

function generateCourses(courses, query) {
    const container = document.getElementById("classescontainer");
    container.innerHTML = '';

    let row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("g-4");
    row.classList.add("py-5");

    for (let i = 0; i < courses[0]["courses"].length; i++) {
        if (courses[0]["courses"][i].includes(query)) {
            let courseName = courses[0]["courses"][i];
            let [courseCode, courseDescription] = courseName.split(':');

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
                window.location.href = "course-details.html?code=" + encodeURIComponent(courseCode) + "&description=" + encodeURIComponent(courseDescription);
            });

            courseContainer.innerHTML = `
                <div class="text-center">
                    <h3 class="fs-2 text-body-emphasis text-center">${courseCode}</h3>
                    <p>${courseDescription}</p>
                </div>`;

            column.appendChild(courseContainer);
            row.appendChild(column);

            if (row.children.length == 2) {
                container.appendChild(row);
                row = document.createElement("div");
                row.classList.add("row");
                row.classList.add("g-4");
                row.classList.add("py-5");
            }
        }
        container.appendChild(row);
    }
}
