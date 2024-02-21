const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { authenticated } = require('./router/auth_users.js');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;


let users = [];
const doesExist = (username) =>{
    let userwithsamename = users.filter((user) =>{
        return user.username === username;
    });
    if (userwithsamename.length > 0){
        return true;
    }
    else{
        return false;
    }
}

const authenticatedUser = (username, password) =>{
    let validusers = users.filter((user) => {
        return (user.username === username && user.password === password)
    });
    if(validusers.length >0){
        return true;
    }else{
        return false;
    }
}

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req,res,next){
    
    if (req.session.authorization){
        token = req.session.authorization ['accessToken']
        jwt.verify(token, "access", (err,user) => {
            if(!err){
                req.user = user;
                next();
            }
            else {
                return res.status(403).json({message: "user not authenticated"})
            }
        })
    }

});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running on port 5000"));
