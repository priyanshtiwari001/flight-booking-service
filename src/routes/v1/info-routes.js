const express = require('express');
const { InfoController } = require('../../controllers');
const router = express.Router();



router.get('/',InfoController.infoGet);



module.exports=router;