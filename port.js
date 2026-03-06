document.getElementById("resumeBtn").addEventListener("click", function () {
    alert("Thank you for visiting my portfolio!");
});

document.getElementById("contactBtn").addEventListener("click", function () {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
});

document.getElementById("toggleSkillsBtn").addEventListener("click", function () {
    let skillsSection = document.getElementById("skills");

    if (skillsSection.style.display === "none") {
      skillsSection.style.display = "grid";
    } else {
      skillsSection.style.display = "none";
    }
});
