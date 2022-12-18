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
        let keyFilter = '';
        if (filterData.email)
            keyFilter = "email";
        else if (filterData.userName)
            keyFilter = "userName";
        
        let query = keyFilter ? usersRef.where(keyFilter, '==', filterData[keyFilter]) : usersRef;
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

        let algoUserData = await algoClientUserIndex.search( filterData[keyFilter]);
        let algoFilteredData = algoUserData.hits.map(element => {
          return  _.omit(element, ['_highlightResult', 'password', 'objectID']);
        }); 
        return { pageNumber: page, count: count, data: userData , algoFilteredData };
    }

}