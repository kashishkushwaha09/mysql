const { Op } = require("sequelize");
const db=require('../utils/db-connection');
const User = require('../models/userModel');
const Booking=require('../models/bookingModel');
const Bus=require('../models/busModel')
// Retrieve all buses with more than the specified number of available seats.
const retrieveEntries=async (req,res)=>{
try {
    const user=await Bus.findAll({
  where: {
    availableSeats: {
      [Op.gt]: 10
    }
  },
});
    if(!user){
        res.status(404).send("student not found"); 
    }
     res.status(200).send(user);
 } catch (error) {
     console.log(error);
         res.status(500).send("Server error:-unable to retrieve data");
 }
}
// Add a new bus.
const addEntries=async (req,res)=>{
    try {
    const {busNumber, totalSeats, availableSeats}=req.body;
     const bus=await Bus.create({
        busNumber, totalSeats, availableSeats
     }) 
     res.status(201).send(`Bus with busNumber ${busNumber} successfully created`);
    } catch (error) {
        console.log(error);
         res.status(500).send("Server error:-unable to make an entry");
        
    }
   
}
const getAllBookings=async (req,res)=>{
    try {
        console.log('getAllBookings called');
        const {id}=req.params;
        const bus=await Bus.findByPk(id);
        if(!bus){
            res.status(404).send('Bus not found');
        }
        const bookings=await Booking.findAll({
             attributes: ['id', 'seatNumber'],
            include:[

                {
                model:User,
                attributes:['name','email']
            }],
            where:{
                BusId:bus.id
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

module.exports={addEntries,retrieveEntries,getAllBookings};