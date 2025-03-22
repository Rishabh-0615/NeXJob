import express from 'express';
import mongoose  from 'mongoose';

const app=express();

app.get('/hello',(req,res)=>{
    res.send("This is Hello page")
})



app.listen(5000,()=>{
    console.log(`Connected`);
})