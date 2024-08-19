const log = require('npmlog');

// ******** These are Console Logs Setting ******** //
log.addLevel('ERROR', 2000, { fg: 'white', bg: 'red' });
log.addLevel('INFO', 2001, { fg: 'white', bg: 'cyan' });
log.addLevel('DELETE', 2002, { fg: 'white', bg: 'red' });
log.addLevel('START', 2003, { fg: 'white', bg: 'green' });
log.addLevel('STOP', 2004, { fg: 'white', bg: 'yellow' });
log.addLevel('CREATE', 2005, { fg: 'white', bg: 'green' });
log.addLevel('SUCCESS', 2003, { fg: 'white', bg: 'green' });

module.exports = log;