const {StatusCodes, INTERNAL_SERVER_ERROR, OK} = require('http-status-codes')
const {BookingService} = require('../services')
const {ErrorResponse,SuccessResponse} = require('../utils/common');


// it is a post request
// data --> request body --> {modelNumber:'anb220,capacity:200}

async function createBooking(req,res){
    try {
console.log(req.body);
        const booking = await BookingService.creatingBooking({
            flightId:req.body.flightId,
            userId:req.body.userId,
            noOfSeats:req.body.noOfSeats
        },)
       SuccessResponse.data=booking;

        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        console.log(error)
        ErrorResponse.error=error;
        return res.status(INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }

}

async function makePayment(req,res){
    try {
        const response = await BookingService.makePayment({
            totalCost: req.body.totalCost,
            userId: req.body.userId,
            bookingId: req.body.bookingId
        })
        SuccessResponse.data=response;

        return res.status(OK).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        ErrorResponse.error = error;
        return res.status(INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports={
    createBooking,
    makePayment
}