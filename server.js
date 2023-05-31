const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const multer = require("multer");
const Posts = require("./model/model")
const path = require('path');

app.use(express.urlencoded({extended : true}))
app.use(express.json());
app.use(cors())

app.use('/images',express.static("uploads"))

const upload = multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads')
        },
        filename:function(req,file,callback){
            callback(null,file.originalname)
        }
    })
})

app.get("/posts", async (req,res)=>{
    try{
        const data = await Posts.find();
        data.reverse();
        res.json(data)
    }catch(err){
        console.log(err)
    }
})

app.post("/upload",upload.single('PostImage'),(req,res)=>{
    const data = new Posts({
        name:req.body.name,
        location: req.body.location,
        description: req.body.description, 
        postImage: req.file.originalname ,
        date : req.body.date
    })
    data.save()
    .then(data => {
        res.status(200).json({
            message : "success"
        })
    })
    .catch(err => {
        res.status(400).json({
            error : "Failed to save post"
        })
    })
})

mongoose.connect(process.env.DB_URL)
.then(()=>{
    console.log("connected to DB");
})
.catch(err => {
    console.log("Failed to connect to database")
})

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server listening...`)
})