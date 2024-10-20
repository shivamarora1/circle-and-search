require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const port = process.env.PORT

const corsOptions = {
  origin: process.env.FRONTEND_URL,
};

app.use(express.json())
app.use(cors(corsOptions))
app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/result', (req, res) => {

  const data = req.body;
  console.log(data);

  // ! do implementation here.
  const res_data = [
    {
      "title": "Wireless Bluetooth Headphones",
      "image_url": "https://m.media-amazon.com/images/I/51QpBpTTBQL._AC_UL320_.jpg",
      "rating": 4.5,
      "description": "High-quality wireless Bluetooth headphones with noise cancellation.",
      "link": "https://example.com/product/headphones",
      "actual_price": 99.99,
      "discount_price": 79.99
    },
    {
      "title": "Smart LED TV 55-inch",
      "image_url": "https://m.media-amazon.com/images/I/71zP3rSXR0L._AC_UL320_.jpg",
      "rating": 4.8,
      "description": "Ultra HD 4K Smart LED TV with voice control and built-in streaming apps.",
      "link": "https://example.com/product/tv",
      "actual_price": 799.99,
      "discount_price": 699.99
    },
    {
      "title": "Gaming Laptop",
      "image_url": "https://m.media-amazon.com/images/I/71niDOUbw8L._AC_UL320_.jpg",
      "rating": 4.7,
      "description": "Powerful gaming laptop with Intel i7 processor and NVIDIA RTX graphics.",
      "link": "https://example.com/product/laptop",
      "actual_price": 1299.99,
      "discount_price": 1099.99
    },
    {
      "title": "Smartwatch with Fitness Tracker",
      "image_url": "https://m.media-amazon.com/images/I/51ODU7VRAeL._AC_UL320_.jpg",
      "rating": 4.3,
      "description": "Stylish smartwatch with heart rate monitor, GPS, and fitness tracking.",
      "link": "https://example.com/product/smartwatch",
      "actual_price": 199.99,
      "discount_price": 149.99
    },
    {
      "title": "Home Security Camera",
      "image_url": "https://m.media-amazon.com/images/I/51Pdde9M1RL._AC_UL320_.jpg",
      "rating": 4.6,
      "description": "HD home security camera with night vision, motion detection, and cloud storage.",
      "link": "https://example.com/product/camera",
      "actual_price": 89.99,
      "discount_price": 59.99
    }
  ];
  
  res.json(res_data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;