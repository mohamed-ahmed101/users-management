
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
    register: async (userData) => {
        const usersRef = db.collection('users');
        const isEmailExist = usersRef.where('email', '==', userData.email).get();
        const isUserNameExist = usersRef.where('userName', '==', userData.userName).get();
        const [
            isEmailExisnapshotstQuerySnapshot,
            isUserNameExistQuerySnapshot
        ] = await Promise.all([isEmailExist, isUserNameExist]);

        if (!isUserNameExistQuerySnapshot.empty || !isEmailExisnapshotstQuerySnapshot.empty)
            throw "notAvailable";

        //encrypt passsword
        userData.password = await sails.helpers.encryptPassword(userData.password);

        usersRef.doc(uuid.v4()).set(userData);
        return { message: "register done successfully" };
    },

}