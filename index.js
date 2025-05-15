const express= require('express');
const mysql=require('mysql2');
const app=express();

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Khush@123',
    database:'testdb'
})
connection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("connection has been created");
    const creationQuery=`create table Students(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(20))`
    connection.execute(creationQuery,(err)=>{
        if(err){
            console.log(err);   
            connection.end();
            return;
        }
        console.log('table has been created');
    })
})


app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})
