document.addEventListener("DOMContentLoaded", function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const description = urlParams.get('description');

    console.log(code);
    console.log(description);

    // Populate course details on the page
    document.getElementById("course-title").innerText = code;
    document.getElementById("course-description").innerText = description;
    // Populate additional details if needed
});