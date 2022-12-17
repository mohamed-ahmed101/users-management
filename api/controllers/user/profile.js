module.exports = {


  friendlyName: 'Profile',


  description: 'Profile user.',


  inputs: {

  },


  exits: {
    notFound: {
      description: 'User not found with the email address provided or password do not match email provided',
      statusCode: 404
    },
  },


  fn: async function () {

    return await userManagement.getProfile(this.req.user.data)

  }


};
