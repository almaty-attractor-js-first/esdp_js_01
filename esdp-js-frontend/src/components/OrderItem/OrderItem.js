import React from 'react';
import {Card, CardBody, CardTitle, Col} from "reactstrap";
import PropTypes from 'prop-types';
import './OrderItem.css';

const OrderItem = props => {
      return (
          <Col md="6">
              <Card>
                  <CardBody>
                      <CardTitle>
                          <h3 className="order-h3">Заказ № {props.id}</h3>
                           от {props.name} {props.surname}
                      </CardTitle>
                      <p>email: {props.email}</p>
                      <p>Время заказа: {props.date}</p>
                      <p>Телефон: {props.telephone}</p>
                      <p>Тип Очистки: {props.typeofcleaning}</p>
                      <p>Количество пар: {props.numberofpairs}</p>
                      <p>Тип доставки: {props.deliverytype}</p>
                      <p>Адрес: {props.address}</p>
                      <p>Стоимость: {props.price} тенге</p>
                  </CardBody>
              </Card>
          </Col>
      );
};

OrderItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default OrderItem;
