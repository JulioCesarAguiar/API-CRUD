const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('Olá NODE API')
})

//puxar todos os produtos
app.get('/products', async(req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//achar um produto no banco pelo id
app.get('/products/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//colocar um produto novo no banco de dados
app.post('/products', async(req, res) => {
  try{
    const product = await Product.create(req.body)
    res.status(200).json(product);
  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message})
  }
}) 

// dar update num produto pelo id dele no banco 
app.put('/products/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    //tratamento de erro para caso não consiga achar o produto pelo id
    if(!product){
      return res.status(404).json({message: `não conseguimos encontrar o produto de ID ${id}`})
    }
    const updateProduct = await Product.findById(id);
    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//deletar um produto
app.delete('/products/:id', async(req, res) =>{
  try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id);
    if(!product){
      return res.status(404).json({message: `não conseguimos encontrar o produto de ID ${id}`})
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://admin:jc20049731@cluster0.3apxa.mongodb.net/node-API?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
  console.log('conectado ao MongoDB')
  app.listen(3000, () => {
    console.log(`App está funcionando na porta 3000`)
  })
}).catch((error) => {
  console.log(error)
})