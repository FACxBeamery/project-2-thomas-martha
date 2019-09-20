var test = require('tape');
var validatePostcode = require('./index.js');

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
});

test('Test validatePostcode()', (t) => {
  let actual = validatePostcode('UBBDD');
  let expected = false;
  t.equal(actual,expected, 'UBBDD should return False');
  t.end();
});

test('Test validatePostcode()', (t) => {
  let actual = typeof(validatePostcode('EC2A 1NT'));
  let expected = "boolean";
  t.equal(actual, expected, 'EC2A 1NT should return a boolean');
  t.end();
});

test('Test validatePostcode()', (t) => {
  let actual = validatePostcode('EC2A1NT');
  let expected = true;
  t.equal(actual, expected, 'EC2A1NT should return true');
  t.end();
});

test('Test validatePostcode()', (t) => {
  let actual = validatePostcode('ub55dd');
  let expected = true;
  t.equal(actual, expected, 'ub55dd should return true');
  t.end()
});

test('Test validatePostcode()', (t) => {
  let actual = validatePostcode('ubhghds');
  let expected = false;
  t.equal(actual, expected, 'ubhghds should return false');
  t.end();
});

test('Test validatePostcode()', (t) => {
  let actual = validatePostcode('YIHDKE');
  let expected = false;
  t.equal(actual, expected, 'YIHDKE should return false');
  t.end();
});

test('Test validatePostcode()', (t) => {
  let actual = validatePostcode('2475893');
  let expected = false;
  t.equal(actual, expected, '2475893 should return false');
  t.end();
});

test('Test validatePostcode()', (t) => {
  let actual = validatePostcode('B4IRNKK');
  let expected = false;
  t.equal(actual, expected, 'B4IRNKK should return false');
  t.end();
});