const {BookingRepository} = require('../repositories');
const db = require('../models');
const axios = require('axios');
const AppErrors = require('../utils/errors/app-errors');
const {StatusCodes} = require('http-status-codes');
const {SeverConfig} = require('../config');
const {Enums}= require('../utils/common');
const {CANCELLED,BOOKED,INITIATED} = Enums.BOOKING_STATUS;
const bookingRepo = new BookingRepository();


async function creatingBooking(data){
    const transaction = await db.sequelize.transaction();

    try{
        const flight =  await axios.get(`${SeverConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/`);
        console.log(flight);
        const flightData = flight.data.data;
        // console.log(flightData);
        if(data.noOfSeats > flightData.totalSeats){
            throw new AppErrors('no more seats are avaiable', StatusCodes.BAD_REQUEST);
        }

        const totalBillingAmount = data.noOfSeats * flightData.price;
        const bookingPayload = {...data, totalCost: totalBillingAmount};
        const booking = await bookingRepo.create(bookingPayload, transaction);
        // console.log('booking',booking);
       await axios.patch(`${SeverConfig.FLIGHT_SERVICE}/api/v1/flights/${data.flightId}/seats`, {
            seats: data.noOfSeats
        });
     
        // console.log(updateSeats);

         await transaction.commit();
         return booking;
    }catch(error){
        // console.log(error);
        await transaction.rollback();
        throw error;
    }
  
}

async function makePayment(data){
    const transaction = await db.sequelize.transaction();
    try {
        const bookingDetails = await bookingRepo.get(data.bookingId,transaction); // get the booking details that created.

        if(bookingDetails.status == CANCELLED){
            throw new AppErrors('the booking is expired',StatusCodes.BAD_REQUEST);
        }
        
        const bookingTime = new Date(bookingDetails.createdAt);
        const currentTime = new Date();
        if(currentTime - bookingTime > 300000){ // if time is exceed more than 5 mins then we cancelled the booking payment
            await bookingRepo.update(data.bookingId,{status:CANCELLED},transaction);
            throw new AppErrors('The booking has expired', StatusCodes.BAD_REQUEST);
        }

        if(bookingDetails.totalCost != data.totalCost ){
            throw new AppErrors('The amount of the payment doesn\'t match',StatusCodes.BAD_REQUEST);
        }

       
       
        //let assume if everything is OK, then we make the payment successful and book the flight
        await bookingRepo.update(data.bookingId,{status:BOOKED},transaction);
        await  transaction.commit();

        return bookingDetails;
    } catch (error) {
        console.log(error);
        transaction.rollback();
        throw  Error;
    } 
}

module.exports={
    creatingBooking,
    makePayment
}