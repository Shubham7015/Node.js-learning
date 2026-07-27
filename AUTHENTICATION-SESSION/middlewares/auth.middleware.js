import jwt from "jsonwebtoken" 

export const authenticationMiddleware = async function(req,res,next)  {
    try{  
    const tokenHeader = req.headers["authorization"];
      // Header authorization: Bearer <TOKEN>
      if (!tokenHeader) return next();
    
      
        if (!tokenHeader.startsWith('Bearer'))
          return res
            .status(400)
            .json({ error: "Authorization header must start with bearer" });
    
        const token = tokenHeader.split(' ')[1];
    
    
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        next();
      } catch (error) {
        console.error(`Authentication token not matched: ${error}`);
        next(); // treat as unauthenticated rather than crashing the request
      }

}

export const ensureAuthenticated = async function(req,res,next){
    if(!req.user) return res.status(401).json({error:"You are not authorized"}) ;
    next() ; 
    
}

export const restrictToRol = function(role) {
    return async function(req,res,next){
        if(req.user.role !== role) return res.status(401).json({error:"You are not authorized"}) 
        next() ;
    };
};

const adminOnly = restrictToRol('ADMIN')