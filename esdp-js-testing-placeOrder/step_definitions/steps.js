const { I } = inject();
// Add in your custom step files

Given('Я нахожусь на главной странице', () => {
  I.wait(1);
  I.amOnPage("/");
});

When('Я нажимаю на кнопку {string}', (buttonName) => {
  I.wait(1);
  I.click(buttonName);
});

When('Выбираю тип чистки {string}', (value) => {
  I.wait(1);
  I.selectOption({id: "cleaningType"}, value);
});

When('Я ввожу {string} в поле {string}', (text, inputName) => {
  I.wait(1);
  I.click({name: "qty"});
  I.fillField({name: inputName}, text);
});

When('Нажимаю на кнопку {string}', (buttonName) => {
  I.wait(1);
  I.click(buttonName);
});

When('Я ввожу номер телефона {string} в поле {string}', (text, inputName) => {
  I.wait(1);
  I.fillField({name: inputName}, text);
});

When('Я ввожу свой email {string} в поле {string}', (text, inputName) => {
  I.wait(1);
  I.fillField({name: inputName}, text);
});

When('Я ввожу свое имя {string} в поле {string}', (text, inputName) => {
  I.wait(1);
  I.fillField({name: inputName}, text);
});

When('Я ввожу свое фамилию {string} в поле {string}', (text, inputName) => {
  I.wait(1);
  I.fillField({name: inputName}, text);
});

When('Я ввожу свой адрес {string} в поле {string}', (text, inputName) => {
  I.wait(1);
  I.fillField({name: inputName}, text);
});

When('Я выбираю способ доставки {string}', (buttonName) => {
  I.wait(1);
  I.click(buttonName);
});

When('Я выбираю способ оплаты {string}', (buttonName) => {
  I.wait(1);
  I.click(buttonName);
});


Then('Я вижу список заказов {string}', (text) => {
	I.wait(2);
	I.see(text);
});
