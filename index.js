const express = require('express')
var app = express()

app.get("/",(req,res)=>{
    res.sendFile( __dirname +"/LandingPage.html")
})

app.listen(3032, ()=>{
    console.log("aplicação ouvindo na porta 3032")
})