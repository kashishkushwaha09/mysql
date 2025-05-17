const express= require('express');
const app=express();
const db=require('./utils/db-connection');
const userRouter=require('./routes/usersRoutes');
const busRouter=require('./routes/busesRoutes');
const bookingRouter=require('./routes/bookingRoutes');
require('./models');
app.use(express.json());
app.use('/api/users',userRouter);
app.use('/api/buses',busRouter);
app.use('/api/bookings',bookingRouter);
db.sync({alter:true}).then(()=>{
app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})
})
.catch((err)=>{
    console.log(err);
})
