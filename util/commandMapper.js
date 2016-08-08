'use strict';

const commands = require('../constants/commands');
const statuses = require('../constants/statuses');

var internals = {};

module.exports = internals.commands = function(command) {

  switch (command) {
  case commands.wfh:
    return statuses.WFH;
  case commands.wfo:
    return statuses.InOffice;
  case commands.wfotest:
    return statuses.InOffice;
  case commands.wfhtest:
    return statuses.WFH;
  default:
    return statuses.InOffice;
  }

};

