const winston = require('winston');
const path = require('path');
const fs = require("fs");
const logger = require('../Config/logger')

const createLog = (type, message, payload) => {

    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => stack;
    const err = new Error();
    Error.captureStackTrace(err, global);
    const callee = err.stack[1];
    Error.prepareStackTrace = orig;

    //Get absolute name of the file & line number.
    const callerFile = path.basename(callee.getFileName());
    const callerLine = callee.getLineNumber();
    let filename = `${callerFile}:${callerLine}:`;
    message = filename + message;
    let domain = 'DashboardApi';
    if (undefined !== payload) {
        // creating logger instance for domain
        logger.createInstance(domain)
        console.log('Instance created successfully -->', domain)

    } else {
        console.log("Error: Request Header is undefined, can not log");
        return;
    }

    if (domain !== 'localhost') {
        //get the existing or created instance
        let domainLogger = winston.loggers.get(`${domain}`)
        if (logger.logLevels.levels[type]) {
            domainLogger.log(type, message, { timestamp: new Date().toISOString(), userid: payload.headers.userid, domain: payload.headers.domain, method: payload.method, url: payload.url })
        }
    }
    // if (logger.logLevels.levels[type] < process.env.LOG_LEVEL) {
    //     logger.logger.log(type, message, { timestamp: new Date().toISOString(), userid: payload.userId, subdomain: payload.subdomain, method: payload.method, url: payload.apiName })
    //     if ((process.env.SLATE_ENV === 'PROD') && (process.env.SLACK_WEBHOOK_URL !== undefined)) {
    //         if (type === 'fatal' || type === 'error') {
    //             sendCriticalNotification(`[${payload.subdomain}][${payload.userId}] ${payload.apiName} ${message}`)
    //         }
    //     }
    // }
}

module.exports = { createLog }