const {DataTypes}=require('sequelize');
const sequelize= require('../utils/db-connection')

// id, busNumber, totalSeats, availableSeats

const Booking=sequelize.define('Bookings',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    seatNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
})
module.exports=Booking;