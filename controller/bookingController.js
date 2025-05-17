const db=require('../utils/db-connection');
const Booking=require('../models/bookingModel');
const User = require('../models/userModel');
const Bus=require('../models/busModel');

const addBooking=async (req,res)=>{
    try {
        const {seatNumber,userId,busId}=req.body;
        const user=await User.findByPk(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const bus=await Bus.findByPk(busId);
        if(!bus){
            return res.status(404).json({message:"Bus not found"});
        }
        const booking=await Booking.create({
            seatNumber,
            UserId:user.id,
            BusId:bus.id
        })
        res.status(201).json({booking});
    } catch (error) {
        console.log(error);
         res.status(500).json({error:error.message});
        
    }
}

module.exports={addBooking};