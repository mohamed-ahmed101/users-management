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
    list: async (filterData) => {

        const usersRef = db.collection('users');
        let query;
        if (filterData.email)
            query = usersRef.where('email', '==', filterData.email);
        else if (filterData.userName)
            query = usersRef.where('userName', '==', filterData.userName);
        else
            query = usersRef;
        let snapshot = await query.count().get()
        const count = snapshot.data().count;
        const page = filterData.page || 0;
        const limit = filterData.limit || 10;
        const result = await query
            .select('userName', 'email', 'age')
            .offset(page * limit)
            .limit(limit)
            .get();

        let userData = [];
        result.forEach(result => {
            userData.push({ ...result.data(), id: result.id })
        })

        return { pageNumber: page, count: count, data: userData };
    }

}