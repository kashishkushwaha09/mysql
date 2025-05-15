const db=require('../utils/db-connection');
// Retrieve all buses with more than the specified number of available seats.
const retrieveEntries=(req,res)=>{
    const {seats}=req.params;
    const readQuery=`SELECT * FROM buses WHERE availableSeats>${seats}`
    db.execute(readQuery,(err,results)=>{
         if(err){
                console.log(err.message);
                res.status(500).send(err.message);
                db.end();
                return;
            }
            console.log("value has been inserted");
            res.status(200).send(results);
    })
}
// Add a new bus.
const addEntries=(req,res)=>{
    const {busNumber, totalSeats, availableSeats}=req.body;
    const insertQuery=`INSERT INTO buses (busNumber, totalSeats, availableSeats) VALUES (?,?,?)`
    db.execute(insertQuery,[busNumber, totalSeats, availableSeats],(err)=>{
         if(err){
                console.log(err.message);
                res.status(500).send(err.message);
                db.end();
                return;
            }
            console.log("value has been inserted");
            res.status(200).send(`bus successfully added`);
    })
}

module.exports={addEntries,retrieveEntries};