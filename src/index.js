const express = require('express');

const app = express();
const apiRoutes = require('./routes');
const {SeverConfig,Queue} = require('./config');
const CronJobs = require('./utils/common/cron-jobs');


app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRoutes);
// /api/v1/info




app.listen(SeverConfig.PORT,async ()=>{
    console.log(`Port is successfully running on ${SeverConfig.PORT}`);
//    CronJobs();
await Queue.connectQueue();
console.log("queue connected");
})