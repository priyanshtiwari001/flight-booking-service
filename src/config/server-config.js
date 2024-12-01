const dotenv = require('dotenv');
dotenv.config();

const PORT = (process.env.PORT);
const FLIGHT_SERVICE = process.env.FLIGHT_SERVICE;
const QUEUE_NAME = process.env.QUEUE_NAME;

module.exports={
    PORT,
    FLIGHT_SERVICE,
    QUEUE_NAME
}