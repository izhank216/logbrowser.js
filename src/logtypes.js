// LogTypes + API
const LogTypes = {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    DEBUG: 'debug'
};

// Initialize worker
let logWorker;
if (!window.logWorker) {
    logWorker = new Worker('src/logweb.js');
    window.logWorker = logWorker;
} else {
    logWorker = window.logWorker;
}

// Handle downloads
logWorker.addEventListener('message', (event) => {
    const { action, filename, dataUrl } = event.data;
    if (action === 'download' && filename && dataUrl) {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
    }
});

// Logging functions
function log(type, message) {
    if (!LogTypes[type.toUpperCase()]) type = LogTypes.INFO;
    logWorker.postMessage({ action: 'log', type, message });
}

const info = (msg) => log('info', msg);
const warn = (msg) => log('warn', msg);
const error = (msg) => log('error', msg);
const debug = (msg) => log('debug', msg);

// Save logs
function logFile(filename) {
    logWorker.postMessage({ action: 'save', filename });
}

// Expose globally
window.LogTypes = LogTypes;
window.log = log;
window.logInfo = info;
window.logWarn = warn;
window.logError = error;
window.logDebug = debug;
window.logFile = logFile;
