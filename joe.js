const express = require("express");
const path = require("path")
const app = express();

const pets = require("./pets.json")

//middleware for find static assets
app.use(express.static("public"))

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"))
})

app.get("/pets",(req,res)=>{
    res.json(pets)
})

app.post("/pets",(req,res)=>{
    console.log(req.body);
    pets.push({
        id:req.body.id,
        name:req.body.name,
        species:req.body.species,
        owner:req.body.owner
    })
    res.send("you made a post request!")
})

app.get("/pets/:petName",(req,res)=>{
    let thisPet;
    pets.forEach(pet=>{
        if(pet.name.toLowerCase()===req.params.petName.toLowerCase()){
            thisPet = pet;
        }
    })
    res.json(thisPet)
})

app.listen(3000,()=>{
    console.log("listenin to port " + 3000)
})

