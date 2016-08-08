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
  case commands.vacation:
    return statuses.Vacation;
  case commands.ooo:
    return statuses.OutOfOffice;
  case commands.sick:
    return statuses.Sick;
  default:
    return statuses.InOffice;
  }

};

