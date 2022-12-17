
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
    getProfile: async (data) => {
        const usersRef = db.collection('users');
        const snapshot = await usersRef
            .where('userName', '==', data.userName)
            .select('userName', 'email', 'age')
            .get();
        if (snapshot.empty) {
            throw "notFound";
        }
        let userData;
        snapshot.forEach(doc => {
            userData = doc.data();
        });
        return userData;
    },
    update: async (userData, newData) => {

        const usersRef = db.collection('users');
        const snapshotFind = await usersRef.where('userName', '==', userData.userName).get();
        let docId;
        snapshotFind.forEach(doc => {
            docId = doc.id;
        });

        let promises = []
        if (newData.email && newData.email != userData.email) {
            promises.push(usersRef.where('email', '==', newData.email).get())
        }
        if (newData.userName && newData.userName != userData.userName) {
            promises.push(usersRef.where('userName', '==', newData.userName).get());
        }
        let results = await Promise.all(promises);
        results.forEach(result => {
            if (!result.empty)
                throw "notAvailable";
        })

        const snapshot = await usersRef
            .doc(docId)
            .update(newData);

        if (snapshot.empty) {
            throw "can't update";
        }

        let token = jwToken.sign({ userName: newData.userName, email: newData.email });

        return { message: "user updated successfully", token };
    }

}