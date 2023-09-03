const expMiddleware = (req, res, next) => {
    console.log("msg from expMiddleware external file");
    next();
}

module.exports = expMiddleware