# language: ru

Функция: Оформления заказа
  Сценарий: Оформления заказа - наличные
    Допустим Я нахожусь на главной странице
    Если Я нажимаю на кнопку "Оформить заказ на чистку"
    И Выбираю тип чистки 'Туфли' в поле '//select[@id="cleaningType0"]'
    И Я ввожу 5 в поле '//*[@id="cleaningQty0"]'
    И Нажимаю на кнопку '//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]/div[4]/button'
    И Выбираю тип чистки 'Сапоги' в поле '//select[@id="cleaningType1"]'
    И Я ввожу 10 в поле '//*[@id="cleaningQty1"]'
    И Нажимаю на кнопку '//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]/div[8]/button'
    И Нажимаю на кнопку '//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]/div[11]/button'
    И Нажимаю на кнопку "Далее"
    И Я ввожу номер телефона "7078071180" в поле "phone"
    И Я ввожу email "sgsgen@gmail.com" в поле "email"
    И Я ввожу имя "Чингиз" в поле "firstName"
    И Я ввожу фамилию "Кабыкенов" в поле "lastName"
    И Я ввожу адрес "1 микрорайон д.46" в поле "address"
    И Я нажимаю на дату доставки '//*[@id="root"]/main/main/div/div[2]/div[6]/div/div/input'
    И Я выбираю способ доставки "Доставка"
    И Я выбираю способ оплаты "Наличными"
    И Нажимаю на кнопку "Далее"
    И Нажимаю на кнопку "Оформить"
    То Я вижу список заказов "Список заказов"
