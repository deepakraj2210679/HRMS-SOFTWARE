import express from "express"
import mysql from "mysql"
import bodyparser from 'body-parser'
import cors from "cors"
import route from "./routes/routes.js"

const app=express()
const db=mysql.createConnection({
    host:'bvcymhrq4n5yygspnwvr-mysql.services.clever-cloud.com',
    user:'uyps6mbvy2gk7aeq',
  
    password:'zFvxd3HKtuLHxHmox9xK',
    database:'bvcymhrq4n5yygspnwvr',
    port:3306
})

db.connect((error) => {
    if (error) {
        console.log("MySQL connection failed:");
    } else {
        console.log("MySQL connected successfully");
    }
});

app.use(bodyparser.json())
app.use(cors())

app.get("/hi",(req,res)=>{
    res.send("Hello world")
})

app.listen(3000,()=>{
    console.log("The application is running in the port 3000")
})


app.use("/",route)

export default db