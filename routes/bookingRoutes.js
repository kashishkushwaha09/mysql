const express=require('express');
const router=express.Router();
const bookingController=require('../controller/bookingController');
// router.get('/',bookingController.retrieveEntries);
router.post('/add',bookingController.addBooking);
// router.put('/update/:id',bookingController.updateBooking);
// router.delete('/delete/:id',bookingController.deleteBooking);


module.exports=router;