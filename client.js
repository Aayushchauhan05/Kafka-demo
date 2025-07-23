const {Kafka}= require("kafkajs")

exports.kafka = new Kafka({
    clientId: "My-kafka-App",
    brokers: ["localhost:9092"]
});
