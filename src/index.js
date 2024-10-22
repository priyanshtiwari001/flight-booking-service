const express = require('express');
const app = express();
const apiRoutes = require('./routes');
const {SeverConfig} = require('./config');


app.use('/api',apiRoutes);


app.listen(SeverConfig.PORT,()=>{
    console.log(`Port is successfully running on ${SeverConfig.PORT}`);
})