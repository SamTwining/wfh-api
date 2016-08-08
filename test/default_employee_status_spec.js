'use strict';

const expect = require('chai').expect;
const moment = require('moment');

const Employee = require('../models/employee');
const statuses = require('../constants/statuses');
const config = require('../config.js');

describe('Employee', function() {

  describe('Default status', function() {

    it('should equal default status when date modified is for previous day', function() {

      const employee = Employee.setDefaultStatusBasedOnTime({
        status: statuses.OutOfOffice,
        dateModified: moment().hours(14).subtract(1, 'days'),
        defaultStatus: statuses.InOffice
      }, moment().hours(13));
      
      let expectedStatus = config.allowDefaults ? employee.defaultStatus : config.defaultStatus;
      expect(employee.status).to.equal(expectedStatus);
    });

    it('should equal status (OutOfOffice) when last updated is on or after 8pm', function() {

      const employee = Employee.setDefaultStatusBasedOnTime({
        status: statuses.OutOfOffice,
        dateModified: moment()
          .hours(20)
          .minutes(0)
          .subtract(1, 'days'),
        defaultStatus: statuses.InOffice
      }, moment().hours(13));

      expect(employee.status).to.equal(statuses.OutOfOffice);
    });

    it('should equal status set when last updated is after 8pm and current time 9am the next day', function() {

      const employee = Employee.setDefaultStatusBasedOnTime({
        status: statuses.OutOfOffice,
        dateModified: moment()
          .hours(9),
        defaultStatus: statuses.InOffice
      }, moment().hours(13));

      expect(employee.status).to.equal(statuses.OutOfOffice);
    });

    it('should equal default status set when last updated before 8pm', function() {

      const employee = Employee.setDefaultStatusBasedOnTime({
        status: statuses.OutOfOffice,
        dateModified: moment().set({
          hours:19,
          minutes:30
        }).subtract(1, 'days'),
        defaultStatus: statuses.InOffice
      }, moment().hours(13));

      let expectedStatus = config.allowDefaults ? employee.defaultStatus : config.defaultStatus;
      expect(employee.status).to.equal(expectedStatus);
    });

    it('should equal default status when last updated is on or after 8pm more than 2 days ago', function() {

      const employee = Employee.setDefaultStatusBasedOnTime({
        status: statuses.OutOfOffice,
        dateModified: moment().set({
          hours:19,
          minutes:30
        }).subtract(2, 'days'),
        defaultStatus: statuses.InOffice
      }, moment().hours(13));

      let expectedStatus = config.allowDefaults ? employee.defaultStatus : config.defaultStatus;
      expect(employee.status).to.equal(expectedStatus);
    });

    it('should equal default status when last updated is on or after 8pm more than 2 days ago, even if sick', function() {

      const employee = Employee.setDefaultStatusBasedOnTime({
        status: statuses.Sick,
        dateModified: moment().set({
          hours:19,
          minutes:30
        }).subtract(2, 'days'),
        defaultStatus: statuses.InOffice
      }, moment().hours(13));
      let expectedStatus = config.rolloverExemptStatuses.indexOf(statuses.Sick) === -1 ? employee.defaultStatus : statuses.Sick;
      expect(employee.status).to.equal(expectedStatus);
    });

    it('should equal default status when last updated is on or after 8pm more than 2 days ago, even if on Vacation', function() {

      const employee = Employee.setDefaultStatusBasedOnTime({
        status: statuses.Vacation,
        dateModified: moment().set({
          hours:19,
          minutes:30
        }).subtract(2, 'days'),
        defaultStatus: statuses.InOffice
      }, moment().hours(13));

      let expectedStatus = config.rolloverExemptStatuses.indexOf(statuses.Vacation) === -1 ? employee.defaultStatus : statuses.Vacation;
      expect(employee.status).to.equal(expectedStatus);
    });

  });


});
