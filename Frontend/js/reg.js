let API = "http://localhost:3000";
let profile; // Global variable to store the base64 encoded profile image

// Handle file input change and convert the image to base64
document.getElementById("form").addEventListener('change', async (e) => {
    const file = e.target.files[0];
    console.log(file);
    profile = await convertBase64(file);
    console.log(profile);
    // Update the image preview with the base64 string
    document.getElementById("profile").src = profile;
});

// Ensure form submission is handled correctly
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const cpassword = document.getElementById("cpassword").value;

        // Make sure that the profile (image) is not null before sending the request
        if (!profile) {
            alert("Please upload a profile image.");
            return;
        }

        console.log(username, email, password, cpassword, profile);

        try {
            const res = await fetch(API + "/api/adduser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    cpassword,
                    profile
                })
            });

            if (res.status == 201) {
                const { msg } = await res.json();
                alert(msg);
                window.location.href = "/index.html"; // Redirect on success
            } else {
                const { msg } = await res.json();
                alert(msg); // Show error message
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while submitting the form.");
        }
    });
});

// Convert the selected file to a base64 string
function convertBase64(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader(); // Correct the typo here
        fileReader.readAsDataURL(file); // Convert file to base64
        fileReader.onload = () => {
            resolve(fileReader.result); // Resolve with base64 string
        };
        fileReader.onerror = (error) => {
            reject(error); // Reject on error
        };
    });
}
