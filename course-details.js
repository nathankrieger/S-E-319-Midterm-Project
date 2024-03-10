document.addEventListener("DOMContentLoaded", function () {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const title = urlParams.get('title');
    const credits = urlParams.get('credits');

    console.log(code);
    console.log(title);

    // Populate course details on the page
    document.getElementById("course-code").innerText = code;
    document.getElementById("course-title").innerText = title;
    document.getElementById("course-credits").innerHTML = "<strong>Credits: "+credits+"</strong>"
    // Populate additional details if needed
});