fetch("cs299-portfolio\index.html");
fetch("cs299-portfolio\project1\index.html");

// navigation bar change active selection item
const links = document.querySelectorAll('.nav-link');
// Add a click event listener to each link
links.forEach(link => {
    link.addEventListener('click', function (event) {
        // Remove the "active" class from all links
        links.forEach(l => l.classList.remove('active'));
        // Add the "active" class to the clicked link
        this.classList.add('active');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Collapsible on default, click to toggle
    var coll = document.querySelectorAll(".collapsible");
    var i;

    // Expand all collapsible divs by default
    for (i = 0; i < coll.length; i++) {
        coll[i].classList.add("active"); // Add the "active" class
        var content = coll[i].nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
    }

    // Toggle functionality remains the same
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
});
