const db=require('../utils/db-connection');
// Retrieve all users from the database.
const retrieveEntries=(req,res)=>{
    const readQuery=`SELECT * FROM users`;
    db.execute(readQuery,(err,results)=>{
        if(err){
        console.log(err.message);
        res.status(500).send(err.message);
        db.end();
        return;
    }
     res.status(200).send(results);
    })
}
// Add a new user.
const addEntries=(req,res)=>{
const {email,name}=req.body;
const InsertQuery=`INSERT INTO users (name,email) VALUES (?,?)`;
db.execute(InsertQuery,[name,email],(err)=>{
    if(err){
        console.log(err.message);
        res.status(500).send(err.message);
        db.end();
        return;
    }
    console.log("value has been inserted");
    res.status(200).send(`User with name ${name} successfully added`);
})
}
const updateEntries=(req,res)=>{
    const {id}=req.params;
    const {name,email}=req.body;
    let updateQuery,fields;
    if(!name && !email){
     res.status(400).send('provide essentials to update');
     db.end(); 
     return;
    }else if(!name && email){
    updateQuery=`UPDATE users set email=? WHERE id=?`;
     fields=[email,id];
    }else if(name && !email){
    updateQuery=`UPDATE users set name=? WHERE id=?`;
     fields=[name,id];
    }else{
    updateQuery=`UPDATE users set name=?,email=? WHERE id=?`;
     fields=[name,email,id];
    }
    db.execute(updateQuery,fields,(err,result)=>{
        if(err){
            console.log(err.message);
        res.status(500).send(err.message);
        db.end();
        return;
        }
        if(result.affectedRows===0){
            res.status(404).send("User not found");
            return;
        }
        res.status(200).send("user has been updated");
    })
}
const deleteEntry=(req,res)=>{
    const {id}=req.params;
    const deleteQuery=`DELETE FROM users WHERE id=?`;
    db.execute(deleteQuery,[id],(err,results)=>{
    if(err){
        console.log(err.message);
        res.status(500).send(err.message);
        db.end();
        return;
    }
    console.log("user has been deleted");
    if(results.affectedRows===0){
        res.status(404).send("User not found");
        return;
    }
    res.status(200).send(`User with id ${id} is deleted`);
    })
}

module.exports={retrieveEntries,addEntries,updateEntries,deleteEntry};