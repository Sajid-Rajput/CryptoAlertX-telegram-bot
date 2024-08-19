const log = require('../config/log');

module.exports = {
    handleError: (error) => {
        log.ERROR('Error:', error['message'] || error);
        if (error['response']) return { error: `API responded with status ${error['response']['status']}: ${error['response']['data']}` };
        else if (error['request']) return { error: 'No response received from the API' };
        else return { error: `Request setup failed: ${error['message']}` };
    }
};
