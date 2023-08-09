const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { Kafka } = require('kafkajs')
let client;
const kafkaServer = "127.0.0.1:9092";
const mongodbURI = "mongodb://localhost/product-service";

const kafka = new Kafka({
  clientId: 'node-ecommerce-microservices',
  brokers: ['localhost:29092']
})
const producer = kafka.producer({allowAutoTopicCreation: true})

app.use(express.json());

// mongoose.connect(mongodbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.get('/producer', async (req, res) => {
  await producer.connect()

  // Producing messages and sending messages to kafka

  const data = await producer.send({
    topic: 'test-topic',
    messages: [{
      value: 'Hello world!! Thisssss is kafka js speaking.'
    }]
  })

  console.log(`Message produced ${JSON.stringify(data)}`);

  res.send(JSON.stringify(data))
})

app.listen(PORT, () => {
  console.log(`Auth service listening at port- ${PORT}`);
});
