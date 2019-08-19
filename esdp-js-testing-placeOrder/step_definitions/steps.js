const { I } = inject();

Given('Я нахожусь на главной странице', () => {
  I.amOnPage("/");
});

When('Я нажимаю на кнопку {string}', (buttonName) => {
  I.click(buttonName);
});

When('Выбираю тип чистки {string} в поле {string}', (value, selector) => {
  I.selectOption(selector, value);
});

When('Я ввожу {int} в поле {string}', (num, selector) => {
  I.clearField(selector);
  I.fillField(selector, num);
});

When('Нажимаю на кнопку {string}', () => {
  I.click('//*[@id="root"]/main/main/div/div[2]/div[4]/button/span[1]/svg/path');
});

When('Нажимаю на кнопку {string}', () => {
  I.click('//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]/div[8]/button');
});

When('Нажимаю на кнопку {string}', () => {
  I.click('//div[@class="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-3"]/div[11]/button');
});

When('Нажимаю на кнопку {string}', (buttonName) => {
  I.click(buttonName);
});

When('Я ввожу номер телефона {string} в поле {string}', (text, inputName) => {
  I.fillField({name: inputName}, text);
});

When('Я ввожу email {string} в поле {string}', async (text, inputName) => {
  const email = await I.grabValueFrom({name: inputName});
  if (email) {
    I.seeInField({name: inputName}, email);
  } else {
    I.fillField({name: inputName}, text);
  }
});

When('Я ввожу имя {string} в поле {string}', async (text, inputName) => {
  const name = await I.grabValueFrom({name: inputName});
  if (name) {
    I.seeInField({name: inputName}, name);
    console.log(name);
  } else {
    I.fillField({name: inputName}, text);
    console.log(name)
  }
});

When('Я ввожу фамилию {string} в поле {string}', async (text, inputName) => {
  const surname = await I.grabValueFrom({name: inputName});
  if (surname) {
    I.seeInField({name: inputName}, surname);
  } else {
    I.fillField({name: inputName}, text);
  }
});

When('Я ввожу адрес {string} в поле {string}', async (text, inputName) => {
  const address = await I.grabValueFrom({name: inputName});
  if (address) {
    I.seeInField({name: inputName}, address);
  } else {
    I.fillField({name: inputName}, text);
  }
});

When('Я нажимаю на дату доставки {string}', async (inputName) => {
  I.click(inputName);
  I.click('26');
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
