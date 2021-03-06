# language: ru

@placeOrder
Функция: Оформления заказа
  @choosingOrderItems
  Сценарий: Выбор позиций заказа
    Допустим Я нахожусь на главной странице
    И Я нажимаю на "Оформить заказ на чистку"
    И Выбираю тип чистки "Кроссовки" в поле 0 "тип чистки"
    И Я ввожу 5 в поле 0 "количество пар"
    И в поле 0 нажимаю на кнопку +1
    И Выбираю тип чистки "Кроссовки" в поле 1 "тип чистки"
    И Я ввожу 10 в поле 1 "количество пар"
    И в поле 1 нажимаю на кнопку +1
    И в поле 2 нажимаю на кнопку Корзина
    И Я нажимаю на "Далее"
    И Я ввожу номер телефона "7078071180" в поле "phone"
    И Я ввожу "email" "sgsgen@gmail.com" в поле "email"
    И Я ввожу "имя" "Чингиз" в поле "firstName"
    И Я ввожу "фамилию" "Кабыкенов" в поле "lastName"
    И Я ввожу "адрес" "1 микрорайон д.46" в поле "address"
    И Я нажимаю на поле "Дата"
    И Я выбираю способ доставки "Доставка"
    И Я выбираю способ оплаты "Наличными"
    И Я нажимаю на "Далее"
    И Я нажимаю на "Оформить"
    То Я вижу список заказов "SHOESER"

#  Сценарий: Оформления заказа - ввод реквизитов
#    Допустим Я на странице Оформления заказа
#    И выбрал услуги:
#      | Тип       | Количество |
#      | Кроссовки | 1          |
#      | Кроссовки | 2          |
#    Если Заполнил форму:
#      | Телефон | 234234    |
#      | Емэйл   | ыафывфавы |
#      | Имя     | вафыв     |
#      | Фамилия | фывавфыв  |
#      | Адрес   | фывафы ва |
#    И нажимаю нв "Далее"
#    То вижу "Заказ принят"
#    И открываю созданный заказ
#    И вижу



