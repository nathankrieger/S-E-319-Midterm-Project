// let search;
// let courseList;

// async function fetchCourses() {
//   try {
//     const response = await fetch("./data.json");
//     if (!response.ok) {
//       throw new Error('Failed to fetch courses');
//     }
//     courseList = await response.json();
//     console.log(courseList); // Logging the courseList here will ensure it's populated
//     generateCourses(courseList, "");
//   } catch (error) {
//     console.error('Error fetching courses:', error.message);
//   }
// }

// window.onload = function () {
//   fetchCourses();

//   search = document.getElementById("search");

//   search.addEventListener("keypress", function (event) {
//     if (event.key === 'Enter') {
//         event.preventDefault(); // Prevent form submission
//         generateCourses(courseList, search.value);
//     }
// });
// };

// function generateCourses(courses, query) {
//   const container = document.getElementById("classescontainer");
//   container.innerHTML = '';

//   courses.forEach(major => {
//     major.courses.forEach(course => {
//       if (course.courseCode.includes(query.toUpperCase())) {
//         let column = document.createElement("div");
//         column.classList.add("col");
//         column.classList.add("d-flex");
//         column.classList.add("flex-column");
//         column.style.height = '150px';
//         column.style.padding = '15px';

//         const courseContainer = document.createElement("div");
//         courseContainer.classList.add("course-container");
//         courseContainer.classList.add("d-flex");
//         courseContainer.classList.add("flex-column");
//         courseContainer.classList.add("h-100");
//         courseContainer.classList.add("justify-content-center");
//         courseContainer.classList.add("align-items-center");
//         courseContainer.style.cursor = 'pointer';

//         courseContainer.addEventListener("click", function () {
//           window.location.href = "course-details.html?code=" + encodeURIComponent(course.courseCode) + "&description=" + encodeURIComponent(course.courseTitle);
//         });

//         courseContainer.innerHTML = `
//           <div class="text-center">
//               <h3 class="fs-2 text-body-emphasis text-center">${course.courseCode}</h3>
//               <p>${course.courseTitle}</p>
//           </div>`;

//         column.appendChild(courseContainer);
//         container.appendChild(column);
//       }
//     });
//   });
// }


async function fetchMajors() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error('Failed to fetch majors');
    }
    majorList = await response.json();
    console.log(majorList); // Logging the majorList here will ensure it's populated
    generateMajors(majorList);
  } catch (error) {
    console.error('Error fetching majors:', error.message);
  }
}

window.onload = function () {
  fetchMajors();
};

function generateMajors(majors) {

  const container = document.getElementById("classescontainer");
  container.innerHTML = '';

  majors.forEach(major => {


    /*********** */
    let column = document.createElement("div");
    column.classList.add("col");
    column.classList.add("d-flex");
    column.classList.add("flex-column");
    column.style.height = '150px';
    column.style.padding = '15px';

    let majorContainer = document.createElement("div");
    majorContainer.classList.add("course-container");
    majorContainer.classList.add("d-flex");
    majorContainer.classList.add("flex-column");
    majorContainer.classList.add("h-100");
    majorContainer.classList.add("justify-content-center");
    majorContainer.classList.add("align-items-center");
    majorContainer.classList.add("mb-3"); // Add margin bottom between majors
    majorContainer.style.cursor = 'pointer';
    majorContainer.style.padding = '30px'; // Add padding to major container

    majorContainer.addEventListener("click", function () {
      window.location.href = "major-courses.html?major=" + encodeURIComponent(major.major);
    });

    majorContainer.innerHTML = `
        <div class="text-center">
            <h3 class="fs-2 text-body-emphasis text-center">${major.major}</h3>
            
        </div>`;

    container.appendChild(majorContainer);
  });
}

