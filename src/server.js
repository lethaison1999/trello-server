import express from 'express'
const app = express()
const hostname = 'localhost'
const port = 8017

app.get('/', (req, res) => {
  res.send('Hello Worlds!')
})

app.listen(port, hostname, () => {
  console.log(` App is running on port: https://${hostname}:${port}`)
})
