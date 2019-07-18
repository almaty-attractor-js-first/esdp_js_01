import React from 'react';
import {Card, CardBody, CardTitle, Col} from "reactstrap";
import PropTypes from 'prop-types';

const OrderItem = props => {
      return (
          <Col md="4">
              <Card>
                  <CardBody>
                      <CardTitle>
                          Заказ № {props.id} от
                              {props.name} {props.surname}
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
};

export default OrderItem;
