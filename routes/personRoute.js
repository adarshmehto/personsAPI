const express = require("express");
const router = express.Router();

const db = require("../utils/db")
const Person = require("../models/person")

router.get('/', async (req, res) => {
    try {
        const personsData = await Person.find({}) //Person.find({ $or: [{ name: "Alice" }, { name: "alice" }] })
        res.status(200).json({
            data: personsData
        })
    }
    catch (err) {
        res.status(404).json({
            message: "Data not found",
            error: err
        })
    }
});

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const newPerson = new Person(req.body);
        await newPerson.save();
        res.status(201).json({ message: 'Data added successfully', data: newPerson });
    } catch (err) {
        // console.error('Error adding data:', err);
        console.error("Error is:",err)
        res.status(500).json(
            {
                message: 'Failed to add data',
                error: err
            });
    }


    //1st way of adding Data
    // try {
    //     const newPerson = new Person(req.body);
    //     await newPerson.save();
    //     res.status(201).json({ message: 'Data added successfully', data: newPerson });
    // } catch (err) {
    //     console.error('Error adding data:', err);
    //     res.status(500).json({ error: 'Failed to add data' });
    // }


    //2nd way of adding data
    //Substitue -  await Person.create({
    //     name: req.body.name,
    //     work: req.body.work,
    //     age: req.body.age,
    //     mobile: req.body.mobile,
    //     email: req.body.email,
    //     address: req.body.address,
    //     salary: req.body.salary,
    // });
})

// PARAMTRISED API //'/person:workType' ye workType ek variable ho gaya
router.get('/:workType', async (req, res) => {
    const workType = req.params.workType
    try {
        if (workType == "chef" || workType == "waiter" || workType == "manager") {
            const response = await Person.find({ work: workType })
            res.status(200).json({
                data: response
            })
        }
        else {
            res.status(404).json({
                message: "Invalid data"
            })
        }
    }
    catch (err) {
        console.error("Error is:",err)
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
});

//put mein update krte h
//id as a prams hi paas krte h
//and data as req
router.put('/:id',async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        //findByIdAndUpdate ye response return krta h
        const response = await Person.findByIdAndUpdate(id,data,{
            new:true, //Returns the updated data
            runValidators: true //mongoose k validations check krta h 
        }); 
       if(response){
            res.status(200).json({
                message: "Data updated successfully",
                updatedData : response
            })
        }
        else{
            res.status(404).json({
                message : "Unable to find by id"
            })
        }
    }
    catch(err){
        console.error("Error is:",err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

router.delete('/:id',async (req,res)=>{
    try 
    {
        const id = req.params.id;
        const response = await Person.findByIdAndDelete(id);
        if(response){
            res.status(200).json({
                message: "Data deleted successfully",
                dataDeleted : response
            })
        }
        else{
            res.status(404).json({
                message : "Unable to find by id"
            })
        }
    }catch(err){
        console.error("Error is:",err)
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

module.exports = router;