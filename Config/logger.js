const winston = require("winston");

const myFormatter = winston.format((info) => {
  const { domain, method, url, timestamp, userid, level, message } = info;
  if (domain) {
    info.message = `[${timestamp}][${domain}][${userid}][${level}][${method}]:${url}|${message} `;
  } else {
    info.message = `[${timestamp}][${level}]:|${message} `;
  }

  info.level = "";
  delete info.timestamp;
  delete info.domain;
  delete info.method;
  delete info.url;
  delete info.userid;
  return info;
})();

const logLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    config: 3,
    info: 4,
    trace: 5,
    debug: 6,
  },
};

const logger = winston.createLogger({
  format: winston.format.combine(myFormatter, winston.format.simple()),
  levels: logLevels.levels,
  transports: [
    new winston.transports.File({
      filename: "logs/combined.log",
      level: "debug",
    }),
  ],
});

const createInstance = (domain) => {
  winston.loggers.add(`${domain}`, {
    format: winston.format.combine(myFormatter, winston.format.simple()),
    levels: logLevels.levels,
    transports: [
      new winston.transports.File({
        filename: `logs/${domain}.log`,
        level: "debug",
      }),
    ],
  });
};

module.exports = { logger, createInstance, logLevels };
