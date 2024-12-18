// 
const API = "http://localhost:3000";


document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();  


    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
       
        const res = await fetch(API + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (res.status === 200) {
            
            const { msg, token } = await res.json();
            alert(msg);
            sessionStorage.setItem("token", token);  
            window.location.href = "/index.html";  
        } else {
            const { msg } = await res.json();
            alert(msg);  
        }
    } catch (error) {
        console.error("Login error:", error);
    }
});
