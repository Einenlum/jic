const container = require('../index');
const test = require('tape');

container.register(
  [
    {
      id: 'curryWurst',
      path: './curryWurst',
      dependencies: ['sausage', 'ketchup', 'curry', 'nop']
    },
    { id: 'nop', path: 'nop' },
    { id: 'curry', path: './curry' },
    { id: 'ketchup', path: './ketchup' },
    { id: 'sausage', path: './sausage' }
  ],
  `${__dirname}/fake/`
);

test('it injects internal services', function(assert) {
  assert.equals('object', typeof container.get('curry'));
  assert.equals('object', typeof container.get('ketchup'));
  assert.equals('object', typeof container.get('sausage'));
  assert.equals('object', typeof container.get('curryWurst'));
  assert.equals(
    `Yummy! I mean... I guess... I mean... yeah. Could be worse. I still wonder why it is still a popular dish in there. Anyway. I'm composed of a sausage with ketchup and curry.`,
    container.get('curryWurst').eat()
  );
  assert.end();
});

test('it injects external modules', function(assert) {
  assert.equals('function', typeof container.get('nop'));
  assert.equals(container.get('nop'), container.get('curryWurst').returnNop());
  assert.end();
});

test('it returns a singleton', function(assert) {
  assert.equals(container.get('curryWurst'), container.get('curryWurst'));
  assert.end();
});

test('it throws an error if trying to register after booting', function(assert) {
  try {
    container.register([{ id: 'some-id', path: 'some-path' }], __dirname);
  } catch (error) {
    assert.end();
    return;
  }

  assert.fail();
});

test('it throws an error if trying to register without root directory', function(assert) {
  const newContainer = require('../index');
  try {
    newContainer.register([{ id: 'some-id', path: 'some-path' }]);
  } catch (error) {
    assert.end();
    return;
  }
  assert.fail();
});
