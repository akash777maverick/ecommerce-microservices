const express = require('express')
const app = express()
const PORT = process.env.PORT || 7080
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'node-ecommerce-microservices',
  brokers: ['localhost:29092']
}) 

const consumer = kafka.consumer({groupId: 'test-id'})
const topic = 'test-topic'

async function connect(){
    //Consuming messages from kafka
    await consumer.connect()

    await consumer.subscribe({ topic: topic, fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value.toString(),
          })
        },
      })
}

connect()

app.listen(PORT, () => {
    console.log(`order-service running at Port- ${PORT}`);
})