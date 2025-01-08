const jwt = require("jsonwebtoken")

const authmiddleware = (req,res,next)=>{
  
  
  const auth = req.headers["authorization"]
  // console.log(req.headers)
  
  if (!auth || !auth.startsWith('bearer ')) {
    return res.status(403).json({
      message : "Please signin "
    });
  }

  const token = auth.split(' ')[1];

 try {
   
     const decoded = jwt.verify(token, "secret");
    
   
     req.userId = decoded.userId
   

     next()
  
 } catch (error) {
  return res.json({
    message :"Please verify first !! "
  })
 }

}

module.exports = {
  authmiddleware
}