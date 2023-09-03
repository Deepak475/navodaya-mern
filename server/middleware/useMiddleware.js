const useMiddleware = (req, res, next) => {
    let bodydata = req.query.age;
    if (!bodydata) {
        res.send(`Your age is ${bodydata} you are eligible to receive a free GIFT`)
    } else if (bodydata < 18) {
        res.send(`Your age is ${bodydata} go and watch POGO`)
    }
    else {
        next();
    }
}
module.exports = useMiddleware