const { I } = inject();

let state = {};
Before(() => {
  state = {};
});

Given('Я нахожусь на главной странице', () => {
  I.amOnPage("/");
  I.wait(1)
});

When('Я нажимаю на {string}', (text) => {
  I.click(text);
  I.wait(1)
});

When('Выбираю тип чистки {string} в поле {int} {string}', (value, num) => {
  I.selectOption({id: `cleaningType${num}`}, value);
  I.wait(1)
});

When('Я ввожу {int} в поле {int} {string}', (int, num) => {
  I.clearField({id: `cleaningQty${num}`});
  I.fillField({id: `cleaningQty${num}`}, int);
  I.wait(1)
});

When('в поле {int} нажимаю на кнопку +1', (num) => {
  I.click(`button[data-id='${num}']`);
  I.wait(1)
});

When('в поле {int} нажимаю на кнопку Корзина', (num) => {
  I.click(`button[data-delete-id='${num}']`);
  I.wait(1)
});

When('Я ввожу номер телефона {string} в поле {string}', (text, inputName) => {
  I.fillField({name: inputName}, text);
  I.wait(1)
});

When('Я ввожу {string} {string} в поле {string}', async (type, text, inputName) => {
  const value = await I.grabValueFrom({name: inputName});
  if (value) {
    I.seeInField({name: inputName}, value);
  } else {
    I.fillField({name: inputName}, text);
  }
  I.wait(1)
});

When('Я нажимаю на поле {string}', (text) => {
  I.click(text);
  I.click('28'); // @TODO Заменить число на объект даты
  I.wait(1)
});

When('Я выбираю способ доставки {string}', (buttonName) => {
  I.click(buttonName);
});

When('Я выбираю способ оплаты {string}', (buttonName) => {
  I.click(buttonName);
});

Then('Я вижу список заказов {string}', (text) => {
  I.see(text);
});

Given('Я нахожусь на странице списка заказов для админа', () => {
  I.amOnPage("/admin-order-items");
});

When('Выбираю статус {string} в поле {int} {string}', (value, num) => {
  I.selectOption({id: `status${num}`}, value);
});

Then('Я вижу статус {string} в поле {int} {string}', (value, num) => {
  I.see(value, {id: `status${num}`})
});


When('Я копирую {string} из поля {int} нажимаю на поле {int} вижу {string}', async (name, num) => {
  let clientName = await I.grabTextFrom({id: `tableCellName${num}`});
  I.click({id: `tableRow${num}`});
  I.see(clientName);
});

Then('Я вижу {string}', (title) => {
  I.see(title);
});

When('Я нажимаю на поле {int}', (num) => {
  I.click({id: `tableRow${num}`});
});

When('Я ввожу статус {string} в поле {string}', (value) => {
  I.selectOption({id: `status`}, value);
});

Then('Я не вижу {string}', (value) => {
  I.dontSee(value)
});

Given('Я нахожусь на странице списка заказов для мастера', () => {
  I.amOnPage("/order-items");
});

When('Я вижу поле {int}', (num) => {
  I.seeElement({id: `tableRow${num}`})
});

When('Я вижу {string} в поле {int}', (value, num) => {
  I.see(value, {id: `tableRow${num}`})
});

When('Я нажимаю на {string} в поле {int}', (value, num) => {
  I.click(value, '//*[@id="masterButton0"]/span[1]');
});

Then('Я не вижу поле {int}', (num) => {
  I.dontSeeElement({id: `tableRow${num}`})
});

Given('Я нахожусь на странице редактирования статусов', () => {
  I.amOnPage("/statuses/edit");
  I.wait(1);
});


When('Я копирую название статуса из поля {int}', async (num) => {
  state.statusName = await I.grabTextFrom({id: `statusName${num}`});
  I.wait(1);
  I.wait(1);
});

When('Я меняю местами статус {int} и статус {int}', (num1, num2) => {
  I.dragAndDrop(`//*[@id="draggable${num1}"]`, `//*[@id="draggable${num2}"]`);
  I.wait(1);
});

When('Я вижу новое имя статуса в поле {int}', (num) => {
  I.see(state.statusName, {id: `statusName${num}`})
  I.wait(1);
});

When('в поле {int} нажимаю на кнопку Редактировать', (num) => {
  I.click(`button[data-edit-button='${num}']`);
  I.wait(1);
});

When('Я в поле {int} ввожу {string} в инпут {string}', (num, value) => {
  I.fillField({id: `name${num}`}, value);
  I.wait(1);
});

When('в поле {int} нажимаю на кнопку Отменить', (num) => {
  I.click(`button[data-discard-button='${num}']`);
  I.wait(1);
});

When('в поле {int} нажимаю на кнопку Сохранить', (num) => {
  I.click(`button[data-submit-button='${num}']`);
  I.wait(1);
});

Then('Я вижу название статуса в поле {int}', (num) => {
  I.see(state.statusName, {id: `statusName${num}`});
  I.wait(1);
  I.wait(1);
});

Then('Я не вижу название статуса в поле {int}', (num) => {
  I.dontSee(state.statusName, {id: `statusName${num}`});
});

Given('Я нахожусь на странице для авторизации админа', () => {
  I.amOnPage("/login");
  I.wait(1)
});

When('Я ввожу пароль {string} в поле {string}', (text, inputName) => {
  I.fillField({name: inputName}, text);
  I.wait(1)
});

When('Я ввожу {int} в поле {int} {string}', (int, num) => {
  I.clearField({id: `cleaningQty${num}`});
  I.fillField({id: `cleaningQty${num}`}, int);
  I.wait(1)
});
