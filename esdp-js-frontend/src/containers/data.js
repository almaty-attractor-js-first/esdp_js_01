import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    ref: 'CDD1049',
    masterName: "Чингиз",
    customer: {
      firstName: 'Ekaterina',
      lastName: "Tankova"
    },
    deliveryType: "Доставка",
    paymentState: 'Не оплачена',
    takeToWork: "Take",
    statusJob: "в работе",
    createdAt: '2020-10-05T14:48:00.000Z'
  },
  {
    id: uuid(),
    ref: 'CDD1049',
    masterName: "Айдос",
    customer: {
      firstName: 'Alexa',
      lastName: "Richardson"
    },
    deliveryType: "Самовывоз",
    paymentState: 'Оплачена',
    takeToWork: "Take",
    statusJob: "в ожидание",
    createdAt: '2020-08-05T14:48:00.000Z'
  },
  {
    id: uuid(),
    ref: 'CDD1049',
    masterName: "Генадий",
    customer: {
      firstName: 'Anje',
      lastName: "Keizer"
    },
    deliveryType: "Самовывоз",
    paymentState: 'Оплачена',
    takeToWork: "Take",
    statusJob: "в ожидание",
    createdAt: '2018-09-05T10:48:00.000Z'
  },
  {
    id: uuid(),
    ref: 'CDD1049',
    masterName: "Даурен",
    customer: {
      firstName: 'Clarke',
      lastName: "Gillebert"
    },
    deliveryType: "Самовывоз",
    paymentState: 'Оплачена',
    takeToWork: "Take",
    statusJob: "в ожидание",
    createdAt: '2020-11-05T14:48:00.000Z'
  },
];
