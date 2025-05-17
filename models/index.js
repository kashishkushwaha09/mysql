const User=require('./userModel');
const Booking=require('./bookingModel');
const Bus=require('./busModel');

User.hasMany(Booking);
Booking.belongsTo(User);

Bus.hasMany(Booking)
Booking.belongsTo(Bus)
module.exports={
    User,
    Booking,
    Bus
}