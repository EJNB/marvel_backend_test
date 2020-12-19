const winston = require("winston");
// require('express-async-errors');

// module.exports = function() {
//   winston.handleExceptions(
//     new winston.transports.Console({ colorize: true, prettyPrint: true }),
//     new winston.transports.File({ filename: 'uncaughtExceptions.log' }));

//   process.on('unhandledRejection', (ex) => {
//     throw ex;
//   });

//   winston.add(winston.transports.File, { filename: 'logfile.log' });
//   // winston.add(winston.transports.MongoDB, {
//   //   db: 'mongodb://localhost/vidly',
//   //   level: 'info'
//   // });
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
