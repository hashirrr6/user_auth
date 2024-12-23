import pkg from "jsonwebtoken"
const { sign } = pkg;

import userSchema from "../models/user.models.js"
import bcrypt from "bcrypt"

import nodemailer from "nodemailer"
const transporter=nodemailer.createTransport({
    Host:"sandbox.smtp.mailtrap.io",
    Port:2525,
    secure:false,
    auth:{
User:"a83daa61120ae4",
pass:"bce81eb67ff8ca",},
})

export async function adduser(req,res) {
    const{username,email,password,cpassword,profile}=req.body
    console.log(username,email,password,cpassword);
    if(!(username&&email&&password&&cpassword&&profile))
        return res.status(404).send({msg:"feilds are empty"});
    if(password!=cpassword)
        return res.status(404).send({msg:"password not match"});
    const data=await userSchema.findOne({email})
    if(data)
        return res.status(404).send({msg:"email already exists"});
    const hpasssword= await bcrypt.hash(password,10)
console.log(hpasssword);



await userSchema.create({username,email,password:hpasssword,profile}).then(()=>{
    return res.status(201).send({msg:"succesfully created"});

}).catch((error)=>{
    res.status(500).send({error})
})
}

export async function loginUser(req,res){
    const {email,password}=req.body;
    if(!(email&&password))

        return res.status(404).send({msg:"fields are empty"});

    const user=await userSchema.findOne({email})

    if(user==null)
        return res.status(404).send({msg:"email is not valid"})

    
    
    const success=await bcrypt.compare(password,user.password)
    console.log(success);
    
    const token=await sign({userID:user._id},process.env.JWT_KEY,
        {expiresIn:"24h"})
    res.status(200).send({msg:"succesfully loged in",token})
    
}

export async function home(req,res) {
    try {
        console.log("end point");
        console.log(req.user);
        
        
        const _id=req.user.userID;
        const user=await userSchema.findOne({_id});
        res.status(200).send({username:user.username,profile:user.profile})
        
        
    } catch (error) {
        res.status(400).send({error})
    }
    
}
export async function forgetPassword(req,res) {
    console.log(req.body);

    try{
        const info=await WebTransportError.sendMail({
            from:'kaves92582@cctoolz.com',
            to:req.body.email,
            subject:"verify",
            text:"verify your email",
            html:"<a href='http://localhost:3000/pages/forgetpassword.html'><button>verify</button></a>",
        });
        console.log("Message sent:%s",info.messageId);
        res.status(200).send({msg:"Check Your email"})
        // message sent:
    }catch(error){
        res.status(400).send(error)
    }
    
    
}