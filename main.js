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

function toggleDarkMode() {
    const button = document.querySelector('.toggle-button');
    const currentMode = document.body.classList.contains('dark-mode');
    if (currentMode) {
        document.body.classList.remove('dark-mode');
        button.textContent = 'Dark Mode';
    } else {
        document.body.classList.add('dark-mode');
        button.textContent = 'Light Mode';
    }
}

function toggleSideBar() {
    const btn = document.querySelector('.collapsible');
    const content = document.querySelector('.table-of-content-container');
    // Instead of 'none', let's check if it's currently visible or not
    if (window.getComputedStyle(content).display === 'none') {
        content.style.display = 'block';
        btn.style.marginLeft = "25vw";
        btn.innerHTML = "Hide"
    } else {
        content.style.display = 'none';
        btn.style.marginLeft = "0";
        btn.innerHTML = "Show Table of Contents"
    }
}

