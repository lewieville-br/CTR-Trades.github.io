document.getElementById("agree-btn").addEventListener("click", function() {
    alert("You have agreed to the terms of service. Thank you!");
    window.location.href = "index.html"; // Redirect to another page after agreement
});

document.getElementById("disagree-btn").addEventListener("click", function() {
    alert("You must agree to the terms of service to continue.");
});
