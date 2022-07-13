import Express from "express";
import cors from "cors";
import mysql from 'mysql';
import dotenv from 'dotenv/config'
const app = Express();
const password = process.env.PASSWORD;
const db = mysql.createConnection({
    user: 'sqluser',
    host:"localhost",
    password:'password',
    database:"employee"
})


app.use(Express.json());

app.use(cors({
    origin:"*",
    credentials:true

}))

app.get("/show",(req,res)=>{
   db.query("SELECT * FROM employee_table",(err,result)=>{
    if(err){
        console.log("err")
    }else{
        res.send(result);
    }
   })
})



app.post("/create",(req,res)=>{
    const name = req.body.name;
    const position = req.body.position;
    const department = req.body.department;
    console.log(password);

    db.query("INSERT INTO employee_table(name,position,department) VALUES(?,?,?)",[name,position,department],(error,result)=>{
        if(error){
            console.log(error);
        }else{
            res.send("successfully created record in DB");
        }

    }
    
    );
})


app.listen(3001,()=>{
    console.log("server is running at port ",3001);
})