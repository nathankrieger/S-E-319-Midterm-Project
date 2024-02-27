
fetch("./courses.json")
.then(response => response.json())
.then(courses => generateCourses(courses));

function generateCourses(courses) {
  container = document.getElementById("maincontainer");

  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("g-4");
  row.classList.add("py-5");
  row.classList.add("row-cols-1");
  row.classList.add("row-cols-lg-3");

  for (let i = 0; i < courses[0]["courses"].length; i++) {
    let column = document.createElement("div");
    column.classList.add("col");
    column.classList.add("d-flex");
    column.classList.add("align-items-start");
    column.innerHTML = `
    <div>
      <h3 class="fs-2 text-body-emphasis">${courses[0]["courses"][i]}</h3>
      <p>${courses[0]["courses"][i]}</p>
      <a href="#" class="btn btn-primary">
        Go to course
      </a>
    </div>`;
    row.appendChild(column);
    
    container.appendChild(row);
  }
}
