# language: ru
@editStatuses
Функция: Проверка смены позиции статусов
  @editStatusesPosition
  Сценарий: Изменения позиции статуса
    Допустим Я нахожусь на странице редактирования статусов
    И Я нажимаю на "админ"
    И Я нажимаю на "статусы"
    И Я копирую название статуса из поля 0
    И Я меняю местами статус 0 и статус 4
    То Я вижу новое имя статуса в поле 4

