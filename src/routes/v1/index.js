const express = require('express');
const router = express.Router();


const infoRoutes = require('./info-routes');
const bookingRoutes = require('./booking-routes');


router.use('/info',infoRoutes);

router.use('/bookings',bookingRoutes)

module.exports=router;
