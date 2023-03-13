// describe('Test example', function () {
//   it('should display the correct title', function () {
//     browser.get('https://www.example.com/');
//     expect(browser.getTitle()).toEqual('Example Domain');
//   });
// });

// describe('A suite', function () {
//   it('contains spec with an expectation', function () {
//     expect(true).toBe(true);
//   });
//   browser.sleep(10000);
// });

describe('A suite is just a function', function () {
  let a;

  it('and so is a spec', function () {
    a = true;

    expect(a).toBe(true);
  });
  browser.sleep(10000);
});
