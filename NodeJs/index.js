const http = require('http')
const url = require('url')
const fs = require('fs')
const server = http.createServer((req,res)=>{
const query = url.parse(req.url , true )
const path = query.pathname
const method = req.method
if(path === "/bharath" && method === 'GET'){
 fs.readFile('hello.txt' ,'utf8',(err,data)=>{
  res.end(data)
 })
}
})
server.listen(8000,()=>{
 console.log("Server started")
})