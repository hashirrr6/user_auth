import express from "express"
import env from "dotenv"
import connection from "./connection.js";
import router from "./router.js";

env.config()


const app=express();
app.use(express.static("../"))
app.use(express.json({limit:"100mb"}))
app.use("/api",router)


connection().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`server started on http://localhost:${process.env.PORT}`);
        
    })
})

