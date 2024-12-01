const amqplib = require('amqplib');
const {QUEUE_NAME} = require('./server-config')
let channels,connection;
async function connectQueue(){
    try {
         connection = await amqplib.connect("amqp://localhost"); // help to setup connection
     channels = await connection.createChannel(); // if we have more than one connection then we create channel.
    await channels.assertQueue(QUEUE_NAME); // check whether  queue is  present or not. if not present then  create one.
    } catch (error) {
        console.log(error);
    }
    
}

async function sendData(data){
    try {
        channels.sendToQueue(QUEUE_NAME,Buffer.from(JSON.stringify(data)));
    } catch (error) {
        console.log(error);
    }
   

}

module.exports={
    connectQueue,sendData
}