const { Op } = require("sequelize");
const db=require('../utils/db-connection');
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

module.exports={addEntries,retrieveEntries};