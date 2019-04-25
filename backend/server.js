const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const flightList = require('./flight-sample.json');
const app = express();
const enableCORS = function (request, response, next) {
    response.header('Access-Control-Allow-Origin', request.headers.origin);
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Date, X-Date');
    return next();
};

app.use(bodyParser.urlencoded({
    limit: '1000mb'
}));

app.use(bodyParser.json({
    limit: '1000mb'
}));

app.use(bodyParser.json({
    type: 'application/vnd.api+json'
}));

app.use(cors());
app.use(enableCORS);

//Api for getting flight data based on search
app.post('/getFlights', function(req, res) {
    let userFilter =req.body;
   Object.keys(userFilter).forEach((key) =>{
    
    userFilter[key] ==  ''? delete userFilter[key] : userFilter[key]
 })

 if(Object.keys(userFilter).length>0){
  let flightListnew= flightList.filter(function(item) {
        
         for (let key in userFilter) {
            
           if (item[key] === undefined || item[key] != userFilter[key])
             return false;
         }
         return true;
       });
       res.send(flightListnew)
 }else{
    res.send(flightList)
 }
 
     
});


app.listen(port);
console.log('Server started! At http://localhost:' + port);


