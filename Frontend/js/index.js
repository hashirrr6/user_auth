const API = "http://localhost:3000";

async function getHome() {
    try {
        
        const token = sessionStorage.getItem("token");

       
        if (!token) {
            console.error("No token found!");
            alert("You need to log in first.");
            window.location.href = "./Frontend/pages/login.html";  
            return;
        }


        const res = await fetch(API + "/api/home", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

      
        if (res.status === 200) {
            const data = await res.json();
            const { username,profile } = data;
            console.log(username,profile);
              

            
            document.getElementById("usname").textContent = `Hello, ${username}..`;
            // console.log("Logged in as:", username);
            document.getElementById("profile").src=profile
        } else {
            
            const { msg } = await res.json();
            alert(msg);
        }
    } catch (error) {
        
        console.log("Error fetching home data:", error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    getHome();
});
