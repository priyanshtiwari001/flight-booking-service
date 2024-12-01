const {ErrorResponse,SuccessResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');


function infoGet(req,res){
  try {
console.log('req recieved')
    return res.status(st.OK).json({
      success: true,
      message: 'Booking API is live',
      error: {},
      data: {},
    });
  } catch (error) {
// console.log(error);
    ErrorResponse.error=error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
   
}

module.exports={
    infoGet,
}