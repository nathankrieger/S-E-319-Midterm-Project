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

  search.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission
        generateCourses(courseList, search.value);
    }
});
};

function generateCourses(courses, query) {
  const container = document.getElementById("classescontainer");
  container.innerHTML = '';

  // if (!query.trim()) {
  //   return; // Exit early if query is empty or only contains whitespace
  // }

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


function generateFlowcharts(myFlowcharts) {
  // Find the element “col” in HTML
  var CardFlowchart = document.getElementById("col");

  //var checkboxes = [];
  var cards = [];

  // Read every flowchart from the array
  for (let i = 0; i < myFlowcharts.majors.length; i++) {
      let major = myFlowcharts.flowcharts[i].major;
      // let year = myFlowcharts.flowcharts[i].year;
      let url = myFlowcharts.flowcharts[i].url;


      // let checkbox = "checkbox" + i.toString();
      let card = "card" + i.toString();


      let AddCardFlowchart = document.createElement("div");
      // add class = “col” to new division for Bootstrap
      AddCardFlowchart.classList.add("col");
      // create Bootstrap card
      AddCardFlowchart.innerHTML = `
              <div id=${card} class="card shadow-sm">

              <img src=${url} class="card-img-top" alt="..."></img>
              <div class="card-body">
              <p class="card-text"> <strong>${major}</strong></p>
              <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
              <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
              </div>
              <small class="text-body-secondary">9 mins</small>
              </div>
              </div>
              </div>
              `;
      // append new division
      CardFlowchart.appendChild(AddCardFlowchart);

      // let cbox = document.getElementById(checkbox);
      // checkboxes.push(cbox);
      let ccard = document.getElementById(card);
      cards.push(ccard);

  }

  // checkboxes.forEach((checkboxParam, index) => {
  //     console.log(index);
  //     checkboxParam.addEventListener('change', () => {
  //         if (checkboxParam.checked) {
  //             cards[index].style.display = 'block'; // Show the card
  //         } else {
  //             cards[index].style.display = 'none'; // Hide the card
  //         }
  //     });
  // });
}



