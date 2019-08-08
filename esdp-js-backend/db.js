const nanoid = require('nanoid');

db = {
    addOrder(order, userId) {
        if (userId) {
            order.client = userId;
        }
        order.status = 'pending';
        order.id = nanoid();
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
		return this.orders.find((order) => {return order.id === orderId});
	},
	updateOrdersById(orderId, data) {
		const index = this.orders.findIndex((order) => {return order.id === orderId});
		this.orders.splice(index , 1 , data);
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
	orders: [
		{
			id: '4',
			clientId: '1',
			masterId: '1',
			email: 'greenmassa@gmail.com',
			phone: '7476396538',
			firstName: 'James',
			lastName: 'Bond',
			status: 'pending',
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
	cleaningItems: [
		{name: "sneakers", title: "Кроссовки", price: 1500, status: true},
		{name: "boots", title: "Ботинки", price: 2600, status: true},
		{name: "slingBacks", title: "Туфли", price: 3000, status: true},
		{name: "highBoots", title: "Сапоги", price: 3800, status: true},
		{name: "highShoes", title: "Тапочек", price: 3800, status: true}
    ],
	statuses: [
		{name: "pending", title: "В обработке", color: 'orange', status: true},
		{name: "inWork", title: "В работе", color: 'indigo', status: true},
		{name: "completed", title: "Завершён", color: 'green', status: true},
		{name: "rejected", title: "Отклонён", color: 'red', status: true},
		{name: "canceled", title: "Отменён", color: 'grey', status: true}
    ],
	masters: [
		{name: "John Doe", birthDate: "05.05.1940", workingFrom: '06.06.1950', workingTo: 'today', working: true, completedOrders: 25},
		{name: "Jane Doe", birthDate: "04.04.1930", workingFrom: '06.06.1950', workingTo: 'today', working: true, completedOrders: 25},
		{name: "Bat Man", birthDate: "03.03.1920", workingFrom: '06.06.1950', workingTo: 'today', working: true, completedOrders: 25},
		{name: "Cpt. Price", birthDate: "02.02.1910", workingFrom: '07.07.1950', workingTo: '06.06.1950', working: false, completedOrders: 999},
		{name: "Mr. Martian", birthDate: "01.01.1900", workingFrom: '06.06.1950', workingTo: 'today', working: true, completedOrders: 25}
    ],
	clients: [{
		firstName: "John",
		lastName: "Doe",
		phone: "+7 777 888 9900",
		email: "test@mail.com",
		address: "Test street",
		orders: [{
			orderId: 'JICL32VLz6C_ej49TT63M',
			date: '01.01.2020',
			amount: '15000',
			status: 'inWork'
		}]
	}],
	insertClients(newClient) {
			const index = this.clients.findIndex((client) => {return client.phone === newClient.phone});
			if(index !== -1){
					this.clients.splice(index , 1 , newClient);
					console.log(newClient);
			} else {
					this.clients.push(newClient);
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




