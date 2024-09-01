const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Olá NODE API')
})

app.listen(3000, () => {
  console.log(`App está funcionando na porta 3000`)
})