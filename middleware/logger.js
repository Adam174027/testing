const moment=require('moment');
const logger=(req, res, next)=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${moment().startOf(moment().format()).fromNow()}`);
    next();
}


module.exports=logger;