
const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

const msbhost = process.env.MSB_HOST || 'localhost';
const msbport = parseInt(process.env.MSB_PORT) || 3000;
console.log(msbhost)
console.log(msbport)
app.get('/', (req, res) => {
  res.send('Hello from ms-a!')
})

app.get('/ms-b', (req, res) => {
  axios.get(`http://${msbhost}:${msbport}`).then((response) => {
    res.send(response.data);
  })
})
app.get("/healthz", (req, res) => {
  res.send("healthy");
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})