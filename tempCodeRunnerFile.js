const {kafka} =require("./client")


async function init(){
const producer=kafka.producer();
console.log("Connecting Producer");
await producer.connect();
       console.log("producer connected successfully")

       await producer.send({
        topic:"rider-updated",
        messages:[
            
          {partition:0,
            key:"localupdate",value:JSON.stringify({name:"Ayush",loc:"delhi"})}
        ]
       })
       await producer.disconnect();
}

init();