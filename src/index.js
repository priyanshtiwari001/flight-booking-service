const express = require('express');
const app = express();
const apiRoutes = require('./routes');
const {SeverConfig} = require('./config');



app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRoutes);
// /api/v1/info




app.listen(SeverConfig.PORT,()=>{
    console.log(`Port is successfully running on ${SeverConfig.PORT}`);
})