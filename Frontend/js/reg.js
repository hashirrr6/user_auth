let API="http://localhost:3000";
let profile;
document.getElementById("file").addEventListener('change',async(e)=>{
    console.log(e.target.files[0]);
    profile=await convertBase64(e.target.files[0])
    console.log(profile);
    document.getElementById("profile").src=profile
    
    
})

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
                body:JSON.stringify({username,email,password,cpassword,profile})
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

function convertBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new fileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })
}
