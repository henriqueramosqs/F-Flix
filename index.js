const express = require('express')
var app = express()

app.use(express.static(__dirname + "/public"));

app.get("/",(req,res)=>{
    res.sendFile( __dirname +"/LandingPage.html")
})

app.get("/FeedbackPage",(req,res)=>{
    res.sendFile( __dirname +"/FeedbackPage.html")
})

app.listen(3032, ()=>{
    console.log("aplicação ouvindo na porta 3032")
})