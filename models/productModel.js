const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
      nome:{
        type: String,
        required: [true, "Por favor coloque o nome do produto"]
      },
      quantidade: {
        type: Number,
        required: true,
        default: 0
      },
      preco: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: false
      }
  },
  {
    timestamps: true
  }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;