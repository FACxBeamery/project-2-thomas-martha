var test = require('tape');
var fizzbuzz = require('./script.js');

// to test:
test('Testing Tape is working', (t) => {
    t.equal(1, 1, 'One should equal one');
    t.end();
  });

test('Test validatePostcode()', (t) => {
    let actual = validatePostcode('UB5 5DD')
    let expected = true;
    t.equal(actual,expected, 'UB5 5DD should return true');
    t.end()
})


