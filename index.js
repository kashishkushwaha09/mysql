const express= require('express');
const app=express();
const db=require('./utils/db-connection');
const userRouter=require('./routes/usersRoutes');
app.use(express.json());
app.use('/api/users',userRouter);

app.listen(3000,()=>{
    console.log("server is listening on port 3000");
})
