const jwt = require("jsonwebtoken");

exports.authRequired =(req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(402).json({error:"Please login"});
    }

    // const token = authorization.split("Bearer ")[0]
    const token = authorization.split(" ")[1]
    if(!token){
        return res.status(402).json({error:"Please login"});
    }

    const user = jwt.verify
    (
        token, 
        "405da4efc202abf8cea2f4f966417c4efb7a0e83f47b8c1d62a7a70b4e68dfec9baffc604ce793f222c1133fad14dc85dc5f40112d7bbba9912e28a1814d5cc2"
        );

        req.user = user;

    next();
}