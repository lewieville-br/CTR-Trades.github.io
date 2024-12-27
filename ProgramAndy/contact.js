document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the default form submission behavior

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Validate form fields
    if (!name || !email || !message) {
        alert("Please fill out all fields.");
        return;
    }

    // Compose the mailto link with the user input
    const subject = encodeURIComponent("Contact Form Submission from " + name);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}`);
    const mailtoLink = `mailto:lewis.miller@svu.edu?subject=${subject}&body=${body}`;

    // Open the default email app with the pre-filled data
    window.location.href = mailtoLink;

    // Optional: Reset the form after submission
    document.getElementById("contact-form").reset();
});
