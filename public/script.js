fetch("/api/pets").then(res=>res.json()).then(data=>{
    console.log(data);
    data.forEach(pet=>{
        const newLi = document.createElement("li");
        newLi.textContent = pet.name;
        document.querySelector("#pets").append(newLi)
    })
})

document.querySelector("#new-pet-form").addEventListener("submit",e=>{
    e.preventDefault();
    const myPet = {
        name:document.querySelector("#pet-name").value,
        owner:document.querySelector("#owner-name").value,
        species:document.querySelector("#species").value,
        id:document.querySelector("#id").value,
    }
    console.log(myPet);
    fetch("/api/pets",{
        method:"POST",
        body:JSON.stringify(myPet),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(data=>{
        console.log(data)
        location.reload();
    })
})