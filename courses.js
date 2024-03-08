
let search;
let courseList;
fetch("./courses.json")
.then((courses) => courses.json())
.then((json) => courseList = json);

window.onload = function () {
  generateCourses(courseList, "");
  search = document.getElementById("search");

  search.addEventListener("input", () => {
    document.getElementById("classes").remove();
    generateCourses(courseList, search.value);
  });
};

function generateCourses(courses, query) {
  container = document.getElementById("maincontainer");

  let row = document.createElement("div");
  row.id = "classes";
  row.classList.add("row");
  row.classList.add("g-4");
  row.classList.add("pb-5");
  row.classList.add("row-cols-1");
  row.classList.add("row-cols-lg-3");

  for (let j = 0; j < courses.length; j++) {
    if (courses[j]["major"] == "Computer Science (COMS)") {
      for (let i = 0; i < courses[j]["courses"].length; i++) {
        if (courses[j]["courses"][i].includes(query)) {
          console.log(query);
          let column = document.createElement("div");
          column.classList.add("col");
          column.classList.add("d-flex");
          column.classList.add("align-items-start");
          column.classList.add("box");
          column.classList.add("py-5");
          column.innerHTML = `
          <div>
            <h3 class="fs-2" style="color: white;">${courses[j]["courses"][i]}</h3>
            <p>${courses[j]["courses"][i]}</p>
            <a href="#" class="btn btn-primary">
              Go to course
            </a>
          </div>`;
          row.appendChild(column);
        }
      }
    }
  }

  container.appendChild(row);
}
