const express = require("express");
const request = require("request");
const app = express();
const https = require("https")
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

  var data = {
    members:[{
      email_address :email,
      status: "subscribed",
      merge_fields:{
        FNAME:firstname,
        LNAME:lastname
      }
    }]
  };
  let jsonData = JSON.stringify(data);
  const url = 'https://us6.api.mailchimp.com/3.0/lists/627b540a9' ;
  const option ={
    method: "POST",
    auth :"ardhendu:652c13d979648ec152762987f4f52898-us6"
  }
  const request = https.request(url, option , function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  request.write(jsonData);
  request.end();

});
app.post("/failure",function(req,res){

  res.redirect("/");
});


app.listen("4040",function(){
  console.log("Server is runnning at port 4040");
})


//  API key ---652c13d979648ec152762987f4f52898-us6
//
// audience id -627b540a99
