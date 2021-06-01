const express = require("express");
const request = require("request");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'))

app.get("/",function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req,res){
  let firstname = req.body.f_name;
  let lastname = req.body.l_name;
  let email = req.body.email
  res.send(`${firstname},${lastname},${email}`);

});


app.listen("4040",function(){
  console.log("Server is runnning at port 4040");
})
