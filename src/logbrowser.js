export class Logger {
    constructor() {
        this.logs = [];
    }

    log(type, message) {
        const logEntry = { type, message, timestamp: new Date() };
        this.logs.push(logEntry);

        // Also print to console
        switch(type) {
            case 'info': console.info(message); break;
            case 'warn': console.warn(message); break;
            case 'error': console.error(message); break;
            case 'debug': console.debug(message); break;
            default: console.log(message);
        }
    }

    info(message) { this.log('info', message); }
    warn(message) { this.log('warn', message); }
    error(message) { this.log('error', message); }
    debug(message) { this.log('debug', message); }

    getLogs() {
        return this.logs;
    }
}