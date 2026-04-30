function validateForm() {
    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const event = document.getElementById("event").value;
    const tickets = document.getElementById("tickets").value;

    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("eventError").textContent = "";
    document.getElementById("ticketsError").textContent = "";

    if (name === "") {
        document.getElementById("nameError").textContent = "Name is required.";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
        document.getElementById("emailError").textContent = "Email is required.";
        isValid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("emailError").textContent = "Enter a valid email address.";
        isValid = false;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (phone === "") {
        document.getElementById("phoneError").textContent = "Phone number is required.";
        isValid = false;
    } else if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").textContent = "Enter a valid 10-digit phone number.";
        isValid = false;
    }

    if (event === "") {
        document.getElementById("eventError").textContent = "Please select an event.";
        isValid = false;
    }

    if (tickets === "" || tickets < 1) {
        document.getElementById("ticketsError").textContent = "Enter at least 1 ticket.";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("registerForm").submit();
    }
}

function searchEvents() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const cards = document.querySelectorAll(".event-card");

    cards.forEach(function(card) {
        const name = card.getAttribute("data-name");
        if (name.includes(query)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function filterEvents(category, btn) {
    const cards = document.querySelectorAll(".event-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(function(b) { b.classList.remove("active"); });
    btn.classList.add("active");

    cards.forEach(function(card) {
        if (category === "All" || card.getAttribute("data-category") === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

setTimeout(function() {
    const flashes = document.querySelectorAll(".flash");
    flashes.forEach(function(f) {
        f.style.transition = "opacity 0.5s";
        f.style.opacity = "0";
        setTimeout(function() { f.remove(); }, 500);
    });
}, 3000);
