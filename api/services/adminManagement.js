module.exports = {
    login: async (data) => {
        const usersRef = db.collection('admin');
        const snapshot = await usersRef.where('userName', '==', data.userName).get();
        if (snapshot.empty) {
            throw "notFound";
        }
        let userData;
        snapshot.forEach(doc => {
            userData = doc.data();
        });
        //check role
        if (userData.role != 'admin') {
            throw "notAuthorized";
        }
        //validate password
        let validPassword = await sails.helpers.vaildatePassword(data.password, userData.password);
        if (!validPassword)
            throw "notVaildPassword"
        return { token: jwToken.sign({ userName: userData.userName, role: userData.role }) }

    },


}