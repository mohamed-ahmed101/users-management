
const uuid = require('uuid')

module.exports = {
    login: async (data) => {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('userName', '==', data.userName).get();
        if (snapshot.empty) {
            throw "notFound";
        }
        let userData;
        snapshot.forEach(doc => {
            userData = doc.data();
        });
        let validPassword = await sails.helpers.vaildatePassword(data.password, userData.password);
        if (!validPassword)
            throw "notVaildPassword"
        return { token: jwToken.sign({ userName: userData.userName, email: userData.email }) }

    },

}