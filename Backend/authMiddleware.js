const verifyToken = (req,res,next)=>{
const token = req.headers.token || req.query.token

if(!token){
  return  res.status(401).json("Unauthorized")
}
if(token !== "12345"){
    return res.status(404).json("Wrong Credentials")
}
next()

}

module.exports={verifyToken}