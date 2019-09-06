const nanoid = require('nanoid');


db = {
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
        {cleaningType: 'slingBacks', qty: 1 ,price: 3000 , title: "Туфли"},
        {cleaningType: 'sneakers', qty: 1 , price: 1500 , title: "Кроссовки"}
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
    {id: 1, name: "John Doe", birthDate: "05.05.1940", workingFrom: '06.06.1950', workingTo: 'today', working: true, completedOrders: 25},
    {id: 2, name: "Jane Doe", birthDate: "04.04.1930", workingFrom: '06.06.1950', workingTo: 'today', working: true, completedOrders: 25},
    {id: 3, name: "Bat Man", birthDate: "03.03.1920", workingFrom: '06.06.1950', workingTo: 'today', working: true, completedOrders: 25},
    {id: 4, name: "Cpt. Price", birthDate: "02.02.1910", workingFrom: '07.07.1950', workingTo: '06.06.1950', working: false, completedOrders: 999},
    {id: 5, name: "Mr. Martian", birthDate: "01.01.1900", workingFrom: '06.06.1950', workingTo: 'today', working: true, completedOrders: 25}
  ],
  clients: [{
    firstName: "John",
    lastName: "Doe",
    phone: "+7 777 888 9900",
    email: "test@mail.com",
    address: "Test street",
    orders: []
  }],
  ordersCount: 1,
  addOrder(order, userId) {
    if (userId) {
      order.client = userId;
    }
    order.status = 'pending';
    this.ordersCount ++;
    this.orders.push(order);
  },
  getOrders() {
    return this.orders;
  },
  getOrdersById(orderId) {
    return this.orders.find((order) => {return order.id === orderId});
  },
  updateOrdersById(orderId, data) {
    const index = this.orders.findIndex((order) => {return order.id === orderId});
    this.orders[index] = {...this.orders[index], ...data};
  },
  updateOrderStatusById(orderId, status) {
    const index = this.orders.findIndex((order) => {return order.id === orderId});
    return this.orders[index] = {...this.orders[index], status};
  },
  getCleaningItems() {
    return this.cleaningItems;
  },
  getStatuses() {
    return this.statuses;
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
  insertClients(newOrder) {
    const index = this.clients.findIndex((client) => {return client.phone === newOrder.phone});
    if(index !== -1){
      let currentClient = {...this.clients[index],
        firstName: newOrder.firstName,
        lastName: newOrder.lastName,
        phone: newOrder.phone,
        email: newOrder.email,
        address: newOrder.address
      };
      currentClient.orders.push(newOrder.id);
      this.clients[index] = currentClient;
    } else {
      const newClient = {
        firstName: newOrder.firstName,
        lastName: newOrder.lastName,
        phone: newOrder.phone,
        email: newOrder.email,
        address: newOrder.address,
        orders: [newOrder.id]
      };
      this.clients.push(newClient);
    }
  },
  findClient(phone){
    const clientInArray = this.clients.filter((element)=> {
      return phone === element.phone;
    });
    return clientInArray[0];
  }
};
module.exports = db;




