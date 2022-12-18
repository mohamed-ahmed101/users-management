/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

admin = require('firebase-admin');

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const algoliasearch = require("algoliasearch");

module.exports.bootstrap = async function () {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return;
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```
  initializeApp({
    credential: cert(sails.config.serviceAccount)
  });
  db = getFirestore();

  algoClient = algoliasearch(sails.config.applicationID, sails.config.adminAPIKey);
  algoClientUserIndex = algoClient.initIndex('usersManagement');
  
  //create AdminUser
  const adminData = { userName: "admin", password: "admin123", role: "admin" };
  const usersRef = db.collection('admin');
  adminData.password = await sails.helpers.encryptPassword(adminData.password);
  usersRef.doc(adminData.userName).set(adminData);

};
