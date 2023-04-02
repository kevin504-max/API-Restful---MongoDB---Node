const router = require("express").Router();

const Person = require("../models/Person");

// Create a new person
router.post("/", async (req, res) => {
    const { name, salary, approved, status } = req.body;

    if(!name) {
        res.status(422).json({ error: "Name is required!" });
        return;
    } else if(!salary) {
        res.status(422).json({ error: "Salary is required!" });
        return;
    } 

    const person = {
        name,
        salary,
        approved,
        status
    };

    try {
        // create a new person
        await Person.create(person);
        
        res.status(201).json({ message: "Person inserted in the system!" })

    } catch (error) {
        res.status(500).json({ error: error });
    }
    
});

// Get all person
router.get("/", async (req, res) => {
    try {
        const people = await Person.find();

        res.status(200).json(people);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Get a person by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const person = await Person.findOne({ _id: id });

        if(!person) {
            res.status(422).json({ error: "Person not found!" });
            return;
        }

        res.status(200).json(person);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Update a person  - (PUT, PATCH)
router.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { name, salary, approved, status } = req.body;
    const person = {
        name,
        salary,
        approved,
        status
    };

    try {
        const updatedPerson = await Person.updateOne({ _id: id }, person);

        if(updatedPerson.matchedCount === 0) {
            res.status(422).json("Person not found!");
            return;  
        }

        res.status(200).json(person); 
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

// Delete a peerson
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const person = await Person.findOne({ _id: id });

    if(!person) {
        res.status(422).json({ error: "Person not found!" });
        return;
    }

    try {
        await Person.deleteOne({ _id: id });
        res.status(200).json({ message: "Person deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

module.exports = router;