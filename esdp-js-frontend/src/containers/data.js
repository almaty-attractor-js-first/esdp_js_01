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
    statusJob: "в работе"
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
    statusJob: "в ожидание"
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
    statusJob: "в ожидание"
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
    statusJob: "в ожидание"
  },
];
