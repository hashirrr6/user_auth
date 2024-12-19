let API="http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  
    const form = document.getElementById("form");

   
    form.addEventListener("submit", async (event) => {
       
        event.preventDefault();

       
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const cpassword = document.getElementById("cpassword").value;

        console.log(username,email,password,cpassword);
        

        try {
            const res= await fetch(API+"/api/adduser",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({username,email,password,cpassword})
            })
            if(res.status==201){
                const {msg}=await res.json();
                alert(msg);
                window.location.href="/index.html"
            }else{
                const {msg}=await res.json();
                alert(msg);
            }
    
            
        } catch (error) {
            console.log(error);
            
        }

        
        
    });
});
