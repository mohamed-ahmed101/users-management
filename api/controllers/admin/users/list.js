const { userName, email } = require('../../../customValidation/inputValidation');
const { page, limit } = require('../../../customValidation/paginationValidation');
const adminManagement = require('../../../services/adminManagement');


module.exports = {


  friendlyName: 'List',


  description: 'List user.',


  inputs: {
    email: { ...email, required: false },
    userName: { ...userName, required: false },
    limit,
    page

  },


  exits: {

  },


  fn: async function (inputs) {
    return await adminManagement.list(inputs);

  }


};
