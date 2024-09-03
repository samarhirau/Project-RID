const jwt = require("jsonwebtoken");


// const { Cookie } = require("express-session");

exports.isAuthenticated = async(req,res,next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(

            new errorHandler("please login in to access the resource",401)
        );
    }
    const {id}= jwt.verify(token,process.env.JWT_SECRET);
 

   
    req.id = id;
    next();

}