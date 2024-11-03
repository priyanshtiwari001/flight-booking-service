const cron = require('node-cron');
const { BookingService } = require('../../services');

 function CronJobs(){
    console.log("inside cron job")
    return  cron.schedule('*/30 * * * *', async () => {
       await BookingService.cancelOldBooking();
      });
}

module.exports=CronJobs;


