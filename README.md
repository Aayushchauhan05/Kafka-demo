﻿# Kafka-demo


```markdown
# Real-Time Kafka Messaging Demo 🚀

A hands-on project demonstrating real-time data streaming and partitioned message processing using Apache Kafka and Node.js.

## Overview

This project showcases a real-time messaging system where rider location updates are streamed through Kafka topics with intelligent partitioning based on geographical locations. The demo includes producers, consumers, and admin utilities to demonstrate Kafka's distributed streaming capabilities.

## Features

- **Real-time Data Streaming**: Continuous streaming of rider location updates
- **Intelligent Partitioning**: Dynamic message assignment to partitions based on location (north/south)
- **Scalable Consumer Groups**: Multiple consumer instances with automatic partition assignment
- **Topic Management**: Programmatic Kafka topic administration
- **Dockerized Environment**: Easy setup with Docker Compose

## Architecture

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Producer  │───▶│    Kafka    │───▶│  Consumer   │
│             │    │   Cluster   │    │   Group     │
└─────────────┘    └─────────────┘    └─────────────┘
                           │
                   ┌─────────────┐
                   │ Zookeeper   │
                   └─────────────┘
```

## Tech Stack

- **Node.js** - Runtime environment
- **KafkaJS** - Kafka client library
- **Apache Kafka** - Distributed streaming platform
- **Docker & Docker Compose** - Containerization
- **Zookeeper** - Kafka coordination service

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Git

## Installation & Setup

1. **Clone the repository**
   ```
   git clone https://github.com/yourusername/kafka-messaging-demo.git
   cd kafka-messaging-demo
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Start Kafka and Zookeeper using Docker**
   ```
   docker-compose up -d
   ```

4. **Wait for services to be ready** (usually 30-60 seconds)
   ```
   docker-compose logs -f kafka
   ```

## Usage

### 1. Create Kafka Topic (Admin)

```
node admin.js
```

This will create the `rider-updates` topic with the specified number of partitions.

### 2. Start Consumer

```
node consumer.js
```

The consumer will start listening for messages on the `rider-updates` topic.

### 3. Start Producer

```
node producer.js
```

The producer will begin sending rider location updates to different partitions based on location.

### 4. Multiple Consumer Instances (Optional)

Open additional terminals and run more consumer instances to see partition assignment in action:

```
# Terminal 2
node consumer.js

# Terminal 3
node consumer.js
```

## Project Structure

```
kafka-messaging-demo/
├── src/
│   ├── admin.js          # Topic management utilities
│   ├── producer.js       # Message producer
│   ├── consumer.js       # Message consumer
│   └── config/
│       └── kafka.js      # Kafka configuration
├── docker-compose.yml    # Docker services setup
├── package.json
├── .gitignore
└── README.md
```

## Configuration

### Kafka Configuration

```
// config/kafka.js
const kafka = require('kafkajs').kafka({
  clientId: 'rider-app',
  brokers: ['localhost:9092']
});
```

### Topic Configuration

- **Topic Name**: `rider-updates`
- **Partitions**: 2 (north, south)
- **Replication Factor**: 1

## Key Learning Points

- **Partitioning Strategy**: Messages are distributed across partitions based on rider location
- **Consumer Groups**: Multiple consumers can process messages in parallel
- **Scalability**: Easy horizontal scaling by adding more consumer instances
- **Fault Tolerance**: Kafka's built-in replication and persistence mechanisms

## Sample Output

### Producer
```
✅ Producer connected
📍 Sent message: {"rider":"rider-123","location":"north","timestamp":"2024-01-15T10:30:00Z"} to partition 0
📍 Sent message: {"rider":"rider-456","location":"south","timestamp":"2024-01-15T10:30:01Z"} to partition 1
```

### Consumer
```
🔗 Consumer connected and subscribed to rider-updates
📨 Received message from partition 0: {"rider":"rider-123","location":"north","timestamp":"2024-01-15T10:30:00Z"}
📨 Received message from partition 1: {"rider":"rider-456","location":"south","timestamp":"2024-01-15T10:30:01Z"}
```

## Docker Services

The project includes a `docker-compose.yml` file that sets up:

- **Zookeeper**: Coordination service for Kafka
- **Kafka**: Message broker with exposed port 9092

```
version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000

  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
```

## Troubleshooting

### Common Issues

1. **Connection Refused Error**
   - Ensure Docker services are running: `docker-compose ps`
   - Wait for Kafka to be fully initialized

2. **Topic Already Exists**
   - This is normal on subsequent runs
   - The admin script handles existing topics gracefully

3. **No Messages Received**
   - Check if producer is running
   - Verify topic creation was successful

### Useful Commands

```
# Check running containers
docker-compose ps

# View Kafka logs
docker-compose logs kafka

# Stop all services
docker-compose down

# Clean restart
docker-compose down -v && docker-compose up -d
```

## Future Enhancements

- [ ] Add message serialization (Avro/JSON Schema)
- [ ] Implement consumer offset management
- [ ] Add monitoring and metrics
- [ ] Create a web dashboard for real-time visualization
- [ ] Add error handling and retry mechanisms
- [ ] Implement dead letter queues

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Apache Kafka community for excellent documentation
- KafkaJS team for the Node.js client library
- Docker team for containerization support

---

⭐ If you found this project helpful, please give it a star!

📫 Feel free to reach out if you have questions or suggestions!
```
