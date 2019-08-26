const { I } = inject();

Given('Я нахожусь на главной странице', () => {
  I.amOnPage("/");
});

When('Я нажимаю на {string}', (text) => {
  I.click(text);
});

When('Выбираю тип чистки {string} в поле {int} {string}', (value, num) => {
  I.selectOption({id: `cleaningType${num}`}, value);
});

When('Я ввожу {int} в поле {int} {string}', (int, num) => {
  I.clearField({id: `cleaningQty${num}`});
  I.fillField({id: `cleaningQty${num}`}, int);
});

When('в поле {int} нажимаю на кнопку +1', (num) => {
  I.click(`button[data-id='${num}']`);
});

When('в поле {int} нажимаю на кнопку Корзина', (num) => {
  I.click(`button[data-delete-id='${num}']`);
});

When('Я ввожу номер телефона {string} в поле {string}', (text, inputName) => {
  I.fillField({name: inputName}, text);
});

When('Я ввожу {string} {string} в поле {string}', async (type, text, inputName) => {
  const value = await I.grabValueFrom({name: inputName});
  if (value) {
    I.seeInField({name: inputName}, value);
  } else {
    I.fillField({name: inputName}, text);
  }
});

When('Я нажимаю на поле {string}', (text) => {
  I.click(text);
  I.click('28'); // @TODO Заменить число на объект даты
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
