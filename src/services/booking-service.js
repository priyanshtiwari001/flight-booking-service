const {BookingRepository} = require('../repositories');
const db = require('../models');
const axios = require('axios');
const AppErrors = require('../utils/errors/app-errors');
const { BAD_REQUEST } = require('http-status-codes');
const {SeverConfig} = require('../config');

const bookingRepo = new BookingRepository();


async function creatingBooking(data){
    const transaction = await db.sequelize.transaction();

    try{
        const flight =  await axios.get(`${SeverConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/`);
        // console.log(flight);
        const flightData = flight.data.data;
        // console.log(flightData);
        if(data.noOfSeats > flightData.totalSeats){
            throw new AppErrors('no more seats are avaiable', BAD_REQUEST);
        }

        const totalBillingAmount = data.noOfSeats * flightData.price;
        const bookingPayload = {...data, totalCost: totalBillingAmount};
        const booking = await bookingRepo.create(bookingPayload, transaction);
        // console.log('booking',booking);
        const updateSeats = await axios.patch(`${SeverConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
            seats: data.noOfSeats
        });
     
        // console.log(updateSeats);

         await transaction.commit();
         return booking;
    }catch(error){
        console.log(error);
        await transaction.rollback();
        throw error;
    }
  
}

async function makePayment(data){
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepo.get(data,transaction);
        console.log(bookingDetails);

        return true;
    } catch (error) {
        console.log(error);
    } 
}

module.exports={
    creatingBooking,
    makePayment
}