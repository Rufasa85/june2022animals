const express = require("express");
const path = require("path")
const app = express();
const fs = require("fs")



//middleware for find static assets
app.use(express.static("public"))

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./index.html"))
})

app.get("/pets",(req,res)=>{
   fs.readFile("./pets.json","utf8",(err,data)=>{
    if(err){
        throw err
    } else {
        const pets = JSON.parse(data);
        res.json(pets)
    }
   })
})

app.post("/pets",(req,res)=>{
    console.log(req.body);
    const newPet = {
        id:req.body.id,
        name:req.body.name,
        species:req.body.species,
        owner:req.body.owner
    }
    fs.readFile("./pets.json","utf8",(err,data)=>{
        if(err){
            throw err
        } else {
            const pets = JSON.parse(data);
            pets.push(newPet)
            fs.writeFile("./pets.json",JSON.stringify(pets,null,4),(err,data)=>{
                if(err) {
                    throw err;
                }
                res.json({data:req.body,message:"success!"})
            })
        }
       })
})

// app.get("/pets/:petName",(req,res)=>{
//     let thisPet;
//     pets.forEach(pet=>{
//         if(pet.name.toLowerCase()===req.params.petName.toLowerCase()){
//             thisPet = pet;
//         }
//     })
//     res.json(thisPet)
// })

app.listen(3000,()=>{
    console.log("listenin to port " + 3000)
})

