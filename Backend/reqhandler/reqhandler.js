import userSchema from "../models/user.models.js"
import bcrypt from "bcrypt"
export async function adduser(req,res) {
    const{username,email,password,cpassword}=req.body
    console.log(username,email,password,cpassword);
    if(!(username&&email&&password&&cpassword))
        return res.status(404).send({msg:"feilds are empty"});
    if(password!=cpassword)
        return res.status(404).send({msg:"password not match"});
    const data=await userSchema.findOne({email})
    if(data)
        return res.status(404).send({msg:"email already exists"});
    const hpasssword= await bcrypt.hash(password,10)
console.log(hpasssword);
await userSchema.create({username,email,password:hpasssword}).then(()=>{
    return res.status(201).send({msg:"succesfully created"});

}).catch((error)=>{
    res.status(500).send({error})
})
}