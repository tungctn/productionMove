// describe('Protractor Demo App', function () {
//   it('should have a title', function () {
//     browser.waitForAngularEnabled(false);
//     browser.get('http://localhost:5001');
//     const email = element(by.id('basic_email'));
//     email.sendKeys('store1@gmail.com');
//     const password = element(by.id('basic_password'));
//     password.sendKeys('123456');
//     const button = element(by.css('button.ant-btn'));
//     button.getText().then((text) => {
//       if (text === 'Đăng nhập') {
//         button.click();
//       }
//     });

//     browser.sleep(5000);
//   });
// });

console.log(process.env.APP_URL);
