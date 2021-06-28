const mongoose = require("mongoose")
const express = require("express")
const body_parser = require("body-parser")


const app = express()

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(body_parser.urlencoded({extended:true})) //for getting data from UI form body

app.listen(3000,()=>{
    mongoose.connect("mongodb+srv://phuong:abcd123@practise.tdh94.mongodb.net/BestBuy?retryWrites=true&w=majority",
    {useUnifiedTopology:true,useNewUrlParser:true},(error)=>{
        if(error){
            console.log(error)
            console.log("Connection failed!")
        }
        else
            console.log("Connected to the Database")
    })
})

const empSchema = mongoose.Schema({
    name: String,
    city: String,
    contact: String,
    email: String,
    salary: Number
})

const emp = mongoose.model("emp",empSchema)

//Get all data
app.get("/",(req,res)=>{    
    emp.find({},(error,records)=>{
        if(error){
            console.log(error)
            console.log("Failed to get recrods!")
        }
        else
            // console.log(records)        
            res.render("index",{
                data: records
            })
    })   
})



app.get("/add",(req,res)=>{
    res.render("insert")
})


//Create
app.post("/create",(req,res)=>{
    let emp_data = req.body
    emp.create({
        name: emp_data.name,
        city: emp_data.city,
        contact: emp_data.contact,
        email: emp_data.email,
        salary: emp_data.salary
    },(error,created)=>{
        if(error)
            console.log("Failed to create!! "+error)
        else{
            console.log(created)
            res.redirect("/")
        }
    })    
})
 
//Delete based on id
app.get("/delete/:id",(req,res)=>{
    let id = req.params.id
    emp.findByIdAndDelete(id,(error,deleted)=>{
        if(error)
            console.log("Failed to delete! -- "+error)
        else{
            console.log(deleted)
            res.redirect("/")
        }
    })
})


app.get("/edit/:id",(req,res)=>{
    let id = req.params.id

    emp.findById(id,(error,response)=>{
        if(error)
            console.log("Failed to find record by ID!! "+error)
        else{
            res.render("update",{
                data : response,
                emp_id:id
            })
        }
    })    
})


//Update based on id
app.post("/update/:id",(req,res)=>{
    let id = req.params.id
    let emp_data = req.body
    emp.findByIdAndUpdate(id,{
        name: emp_data.name,
        city: emp_data.city,
        contact: emp_data.contact,
        email: emp_data.email,
        salary: emp_data.salary
    },(error,updated)=>{
        if(error)
            console.log("Failed to Update -- "+error)
        else{
            console.log(updated)
            res.redirect("/")
        }
    })
})