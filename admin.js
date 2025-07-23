const {kafka} = require("./client")

async function init() {
    const admin = kafka.admin();
    console.log("Admin connecting");
    
    
    await admin.connect();
    console.log("Admin connected");

    try {
        await admin.createTopics({
            topics: [{
                topic: "rider-updates",
                numPartitions: 2
            }]
        });
        console.log('Topic created successfully');
    } catch (error) {
        console.error('Error creating topic:', error);
    } finally {
        console.log("Disconnecting Admin");
        await admin.disconnect();
    }
}

init().catch(console.error);
