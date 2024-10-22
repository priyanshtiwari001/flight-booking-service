const {ErrorResponse,SuccessResponse} = require('../utils/common');
const st = require('http-status-codes');
function infoGet(req,res){
  try {
    return res.status(st.OK).json(SuccessResponse);
  } catch (error) {
// console.log(error);
    ErrorResponse.error=error;
    return res.status(st.INTERNAL_SERVER_ERROR).json(ErrorResponse);
  }
   
}

module.exports={
    infoGet,
}