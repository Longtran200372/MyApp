const requestLogger = function (req, res, next) {
    const time = Date.now()
    console.log(`[${time}] ${req.method} ${req.url}`)
    next()
  }

module.exports = requestLogger
