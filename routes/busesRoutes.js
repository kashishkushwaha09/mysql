const express=require('express');
const router=express.Router();
const busController=require('../controller/busController');
router.get('/available/:seats',busController.retrieveEntries);
router.post('/add',busController.addEntries);
// router.put('/update/:id',userController.updateEntries);
// router.delete('/delete/:id',userController.deleteEntry);


module.exports=router;