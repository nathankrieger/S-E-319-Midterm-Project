let search;
let courseList;

async function fetchFlowcharts() {
    try {
        const response = await fetch("./data.json");
        if (!response.ok) {
            throw new Error('Failed to fetch flowcharts');
        }
        courseList = await response.json();
        console.log(courseList); // Logging the courseList here will ensure it's populated
        generateFlowcharts(courseList);
    } catch (error) {
        console.error('Error fetching courses:', error.message);
    }
}


window.onload = function () {
    fetchFlowcharts();
};

function generateFlowcharts(myFlowcharts) {
    // Find the element “col” in HTML
    var CardFlowchart = document.getElementById("col");

    // Read every flowchart from the array
    for (let i = 0; i < myFlowcharts.length; i++) {
        let major = myFlowcharts[i].major;
        let flowchart = myFlowcharts[i].flowchart;
        let credits = flowchart.credits;
        let year = flowchart.year;

        let AddCardFlowchart = document.createElement("div");
        // add class = “col” to new division for Bootstrap
        AddCardFlowchart.classList.add("col");
        // create Bootstrap card
        AddCardFlowchart.innerHTML = `
            <div class="card shadow-sm">
                <img src=${flowchart.img} class="card-img-top" alt="Flowchart"></img>
                <div class="card-body">
                    <p class="card-text"><strong>${major}</strong></p>
                    <p class="card-text">${credits} total credits</p>
                    <p class="card-text">From: ${year}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary view-btn">View</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Append new division
        CardFlowchart.appendChild(AddCardFlowchart);

        // Add event listener to the "View" button
        let viewBtn = AddCardFlowchart.querySelector(".view-btn");
        viewBtn.addEventListener("click", function () {
            window.open(flowchart, "_blank");
        });
    }
}
