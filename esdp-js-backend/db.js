let array = [];
db = {
    data: "123",
    addOrder(order, userId) {
        if (userId) {
            order.client = userId;
        }
        order.status = 'inwork';
        this.orders.push(order);

        this.insertClients(order.userData);

    },
    get: (subject, id, token) => {
        // const user = db[suxbject].find((element) => {
        //     return element.token === token
        // });
        if (!id) {
            if (subject === 'orders') {

				if (user.role === 'admin' || user.role === 'master') {
					return db[subject];
				} else {
					return {message: "only master and admin can fetch orders"}
				}
			} else if (subject === 'users') {
				if (user.role === 'admin') {
					return db[subject];
				} else {
					return {message: "only admin can fetch users"}
				}
			}



		} else {
			const item = db[subject].find((element) => {
				return element.id === id
			});
			const user = db[subject].find((element) => {
				return element.token === token
			});
			if (subject === 'orders') {
				if (user.role === 'admin' || user.role === 'master') {
					return item;
				} else if (user.role === 'user' && user.id === item.client) {
					return item;
				} else {
					return {message: "this is not your order"};
				}
			} else if (subject === 'users') {
				if (user.role === 'admin' || user.role === 'courier') {
					return item;
				} else {
					return {message: "only admin can fetch users"}
				}
			}
		}
	},
	getSubject: (subject) => {
		return db[subject];
	},
	post: (subject, data, token) => {
		if (data) {
			if (subject === 'orders') {
				const user = db[subject].find((element) => {return element.token === token});
				if (user.role === 'admin' || user.role === 'user') {
					data.date = new Date();
					db[subject].push(data);
				} else {
					return {message: "only user and admin can create orders"}
				}
			} else if (subject === 'users') {
				db[subject].push(data);
			} else if (subject === 'cleaningTypes') {
				data.date = new Date();
			}
		}
	},
	delete: (subject, id, token) => {
		if (id) {
			const user = db[subject].find((element) => {return element.token === token});
			if (user.role === 'admin') {
				const index = db[subject].findIndex( (element) => {return element.id === id});
				db[subject].slice(index, 1);
			} else {
				return {message: "you dont have enough rights to delete this"}
			}
		}
	},
	getOrdersByStatus: (status, token) => {
		const user = db[subject].find((element) => {return element.token === token});
		if (user.role === 'master' || user.role === 'admin') {
			return db.orders.find((element) => {return element.status === status});
		} else {
			return {message: "you dont have enough rights to fetch orders by status"}
		}

	},
	getUsersByRole: (role) => {
		return db.users.find((user) => { return user.role === role});
	},
	users: [
		{
			id: '1',
			email: 'greenmassa@gmail.com',
			name: 'dauren',
			surname: 'akhmetov',
			middlename: 'kuandykovich',
			password: 'qwe',
			token: 'qweqwe',
			role: 'admin',
			displayName: 'Dauren Green'
		},
		{
			id: '2',
			email: 'aidos@gmail.com',
			name: 'aidos',
			surname: 'omurzakov',
			middlename: '',
			password: 'qwe',
			token: 'qweqweqwew',
			role: 'user',
			displayName: 'Aidos11'
		}
	],
	orders :[
		{
			clientId: '1',
			email: 'greenmassa@gmail.com',
			phone: '7476396538',
			name: 'James',
			surname: 'Bond',
			middlename: '',
			status: 'inwork',
			quantity: 1,
			cleaningType: 'dry',
			date: new Date(),
			description: 'помыть',
			price: '1200',
			address: 'Абая Саина 54',
			deliveryType: 'self',
			deliveryDate: new Date()
		},
		{
			clientId: '2',
			email: 'aidos@gmail.com',
			phone: '7476313132',
			name: 'Aidos',
			surname: 'Omurzakov',
			middlename: '',
			status: 'waiting',
			quantity: 1,
			cleaningType: 'dry',
			date: new Date(),
			description: 'помыть',
			price: '1200',
			address: 'Абая Саина 54',
			deliveryType: 'self',
			deliveryDate: new Date()
		}
	],
	cleaningItems : [
		{name: "sneakers", title: "Кроссовки", price: 1500, status: true},
		{name: "boots", title: "Ботинки", price: 2600, status: true},
		{name: "slingBacks", title: "Туфли", price: 3000, status: true},
		{name: "highBoots", title: "Сапоги", price: 3800, status: true},
	{name: "highshoes", title: "Тапочек", price: 3800, status: true}

    ],
    clients: [{
        address: "Test street",
        email: "test@mail.com",
        firstName: "John",
        lastName: "Doe",
        phone: "111"
    }],
    insertClients(newClient) {
        const obj = this.clients.find((client) => {return client.phone === newClient.phone});
        const index = this.clients.indexOf(obj);
        if(index !== -1){
            this.clients.splice(index , 1 , newClient);
        } else {
            this.clients.push(newClient);
        }
    }
};
module.exports = db;





