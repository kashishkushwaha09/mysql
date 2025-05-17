const db=require('../utils/db-connection');
const User=require('../models/userModel')
const Booking=require('../models/bookingModel');
const Bus=require('../models/busModel');
// Retrieve all users from the database.
const retrieveEntries=async (req,res)=>{
 try {
    const user=await User.findAll();
    if(!user){
        res.status(404).send("student not found"); 
    }
     res.status(200).send(user);
 } catch (error) {
     console.log(error);
         res.status(500).send("Server error:-unable to retrieve data");
 }
}
// Add a new user.
const addEntries=async (req,res)=>{
try {
    const {name,email}=req.body;
     const user=await User.create({
        name,email
     }) 
     res.status(201).send(`User with name ${name} successfully created`);
    } catch (error) {
        console.log(error);
         res.status(500).send("Server error:-unable to make an entry");
        
    }
}
const updateEntries=async (req,res)=>{
    try {
    const {id}=req.params;
    const {name,email}=req.body;
    const user=await User.findByPk(id);
    if(!user){
        res.status(404).send("user not found");
    }
    if(name){
    user.name=name;
    }
    if(email){
        user.email=email;
    }
    
    await user.save();
    res.status(200).send("user has been updated");
 } catch (error) {
             console.log(err);
        res.status(500).send(err.message);
 }
}
const deleteEntry=async (req,res)=>{
     try {
        const {id}=req.params; 
        const user=await User.destroy({
            where:{
                id:id
            }
        })
        if(!user){
            res.status(404).send('User not found');
        }
        res.status(200).send(`user with id ${id} is deleted`);
    } catch (err) {
            console.log(err);
        res.status(500).send(err.message);
    }

}
const getAllBookings=async (req,res)=>{
    try {
        console.log('getAllBookings called');
        const {id}=req.params;
        const user=await User.findByPk(id);
        if(!user){
            res.status(404).send('User not found');
        }
        const bookings=await Booking.findAll({
             attributes: ['id', 'seatNumber'],
            include:[

                {
                model:User,
                attributes:['name','email']
            },
            {
                model:Bus,
                attributes:['busNumber']
            }],
            where:{
                UserId:user.id
            }
        });
        if(!bookings){
            res.status(404).send('Bookings not found');
        }

        res.status(200).send(bookings);
    } catch (err) {
            console.log(err);
        res.status(500).send(err.message);
    }
};

module.exports={retrieveEntries,addEntries,updateEntries,deleteEntry,getAllBookings};