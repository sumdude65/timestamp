const express = require('express')
const app = express()
const port = 3000

app.use(function(req,res,done){
  console.log(`${req.path} ${req.method} ${req.ip} `)
  done()
})
app.get('/',(req,res)=>{
res.sendFile(__dirname + '/html/index.html')
})
app.get('/api/timestamp/',(req,res)=>{
  const now = new Date()
  const dateText = new Date(now)
res.json({unix: `${Date.parse(now)}`,UTC: `${dateText}`})
})
 
app.get('/api/timestamp/:date',(req,res)=>{
  const date = req.params.date
  
  if(date.indexOf('-') > 0){
    const newDate = new Date(date)
    const response = {unix: `${Date.parse(date)}`, UTC: `${newDate}`}
    res.json(response)
  } else if (date.indexOf('-') < 0){
    const newDate = new Date(parseInt(date))
    const minute = newDate.getMinutes()
    const second = newDate.getSeconds()
    const response = {unix : date, UTC : `${newDate}`}
    res.json(response)

  }
})


app.listen(port,()=>{
  console.log(`Example app listening at http://localhost:${port}`)
})
module.exports = app