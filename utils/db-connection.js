const mysql=require('mysql2');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Khush@123',
    database:'busbookingapp'
})
connection.connect((err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("connection has been created");
    const users=`create table IF NOT EXISTS Users(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255)
    )`
    const buses=`create table IF NOT EXISTS Buses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    busNumber VARCHAR(255),
    totalSeats INT,
    availableSeats INT
    )`
    const bookings=`create table IF NOT EXISTS Bookings(
    id INT AUTO_INCREMENT PRIMARY KEY,
    seatNumber INT
    )`
    const payments=`create table IF NOT EXISTS Payments(
    id INT AUTO_INCREMENT PRIMARY KEY,
    amountPaid DECIMAL(10,2),
    paymentStatus VARCHAR(255)
    )`
    connection.execute(users,(err)=>{
        if(err){
            console.log(err);   
            connection.end();
            return;
        }
        console.log('users has been created');
    })
    connection.execute(buses,(err)=>{
        if(err){
            console.log(err);   
            connection.end();
            return;
        }
        console.log('buses has been created');
    })
    connection.execute(bookings,(err)=>{
        if(err){
            console.log(err);   
            connection.end();
            return;
        }
        console.log('bookings has been created');
    })
    connection.execute(payments,(err)=>{
        if(err){
            console.log(err);   
            connection.end();
            return;
        }
        console.log('payments has been created');
    })
})
module.exports=connection;