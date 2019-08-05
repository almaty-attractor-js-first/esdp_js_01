db = {
    addOrder(order, userId) {
        if (userId) {
            order.client = userId;
        }
        order.status = 'inwork';
        this.orders.push(order);
        let userDate = {
            address: order.address,
            email: order.email,
            firstName: order.firstName,
            lastName: order.lastName,
            phone: order.phone
        };
        this.insertClients(userDate);

    },
	getOrders() {
		return this.orders;
	},
	getOrdersById(orderId) {
		console.log('getOrdersById');
		return this.orders.find((order) => {return order.id === orderId});
	},
	getCleaningItems() {
    	return this.cleaningItems;
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
			id: '4',
			clientId: '1',
			masterId: '1',
			email: 'greenmassa@gmail.com',
			phone: '7476396538',
			firstName: 'James',
			lastName: 'Bond',
			status: 'inwork',
			orderItems: [
				{cleaningType: 'slingBacks', qty: 1},
				{cleaningType: 'sneakers', qty: 1}
			],
			createdAt: '2019-08-02T15:17:48.831Z',
			description: 'помыть',
			paymentStatus: false,
			paymentMethod: 'cash',
			totalPrice: '1200',
			address: 'Абая Саина 54',
			deliveryType: 'self',
			completedDate: '2019-08-02T15:17:48.831Z'
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
			firstName: "John",
			lastName: "Doe",
			phone: "111",
			email: "test@mail.com",
			address: "Test street"
    }],
    insertClients(newClient) {
        const obj = this.clients.find((client) => {return client.phone === newClient.phone});
        const index = this.clients.indexOf(obj);
        if(index !== -1){
            this.clients.splice(index , 1 , newClient);
            console.log(this.clients);
        } else {
            this.clients.push(newClient);
            console.log(this.clients);
        }
    },
    findClient(phone){
        const clientInArray = this.clients.filter((element)=> {
            return phone === element.phone;
        });
        const client = clientInArray[0];

        return client;
    }
};
module.exports = db;




