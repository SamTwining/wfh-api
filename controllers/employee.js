'use strict';

const Employee = require('../models/employee');
const Boom = require('boom');

module.exports.getAll = function (request, reply) {
  
  Employee.getAll()
  .then((workers) => {

    reply(workers);

  })
  .catch((err) => {
    console.log(err);
    reply(Boom.badImplementation());
  });

};

module.exports.addNew = function(request, reply){

  var payload = request.payload;

  Employee.getByEmail(payload.email)
  .then(function(employee){
    if(employee){
      return reply(Boom.conflict());
    }

    var employee = new Employee(payload)
    .save(payload)
    .then((worker) => {
      reply();
    });

  })
  .catch((err) => {
    console.log(err);
    reply(Boom.badImplementation());
  })

};

module.exports.updateStatus = function (request, reply){
  var payload = request.payload;

  if(!Employee.isValidStatus(payload.status)){
    return reply(Boom.badRequest('Not a valid status type'));
  }

  Employee.updateStatus(payload.email, payload.status)
  .then((employee) => {
    if(!employee){
      return reply(Boom.notFound('Email Address Not Found'));
    }
    reply(employee);
  })
  .catch((err) => {
    console.log(err);
    reply(Boom.badImplementation());
  });
};


/* 

/get all workes

  post /webhooks/wfo
  post /webhooks/wfslack

*/