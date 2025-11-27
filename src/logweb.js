importScripts('logbrowser.bundle.js'); 

// Logger instance
const logger = new LogBrowser.Logger(); // because ESM export is wrapped in bundle
const logs = [];

const LogTypes = {
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
    DEBUG: 'debug'
};

self.addEventListener('message', (event) => {
    const { action, type, message, filename } = event.data;

    if (action === 'log') {
        const logEntry = { type: type || LogTypes.INFO, message, timestamp: new Date() };
        logs.push(logEntry);
        logger.log(logEntry.type, logEntry.message);
        self.postMessage({ action: 'log', logEntry });
    }

    else if (action === 'save' && filename) {
        saveLogs(filename);
    }
});

function saveLogs(filename) {
    let content = '';
    if (filename.endsWith('.json')) {
        content = JSON.stringify(logs, null, 2);
    } else {
        content = logs.map(l => `[${new Date(l.timestamp).toLocaleTimeString()}] [${l.type.toUpperCase()}] ${l.message}`).join('\n');
    }

    const blob = new Blob([content], { type: 'text/plain' });
    const reader = new FileReader();
    reader.onload = function() {
        self.postMessage({ action: 'download', filename, dataUrl: this.result });
    };
    reader.readAsDataURL(blob);
}