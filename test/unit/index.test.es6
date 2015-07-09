'use strict';
let assert = require('chai').assert;

import {
  add,
  all,
  any,
  compose,
  curry,
  filter,
  head,
  init,
  last,
  map,
  none,
  reduce,
  reduceRight,
  reverse,
  sequence,
  tail,
  zip
} from '../../src/index.es6';


describe('curry', () => {
  it('should curry functions', () => {
    var curriedAdd = curry((a,b)=>a+b);
    assert.equal(curriedAdd(1)(2),3);
  });
});

describe('add', () => {
    it('should add two values', () =>{
      assert.equal(add(1,2), 3);
    });

    it('should be curried', () => {
      assert.equal(add(1)(2), 3);
    });
})

describe('head', () => {
  it('should return the first element of an array', () => {
    assert.equal(head([1,2,3]), 1);
  });
});

describe('last', () => {
  it('should return the last element of an array', () => {
    assert.equal(last([1,2,3]), 3);
  });
});

describe('init', () => {
  it('should return all the elements of an array minus the last one', () => {
    assert.deepEqual(init([1,2,3]), [1,2]);
  });
});

describe('tail', () => {
  it('should return all the elements of an array minus the first one', () => {
    assert.deepEqual(tail([1,2,3]), [2,3]);
  });
});

describe('reduce', () => {
  const add =  (a,b) => a + b;
  it('should reduce arrays', () =>{
    assert.equal(reduce(add, 0, [0,1,2]), 3);
    assert.equal(reduce(add, '', ['0','1','2']), '012');
  });

  it('should be curried', () =>{
    let result = reduce(add)(0)([0,1,2]);
    assert.equal(result,3);
    result = reduce(add, 0)([0,1,2]);
    assert.equal(result,3);
    result = reduce(add)(0, [0,1,2]);
    assert.equal(result,3);
  });
});

describe('reduceRight', () => {
  const add =  (value, acc) => acc + value;

  it('should reduce arrays', () =>{
    const result = reduceRight(add, '', ['0','1','2']);
    assert.equal(result,'210');
  });

  it('should be curried', () =>{
    let result = reduceRight(add)('')(['0','1','2']);
    assert.equal(result,'210')
    result = reduceRight(add, '')(['0','1','2']);
    assert.equal(result,'210')
    result = reduceRight(add)('', ['0','1','2']);
    assert.equal(result,'210')
  });
});

describe('map', () => {
  const add2 =  a => a + 2;

  it('should map arrays', () =>{
    const result = map(add2, [0,1,2]);
    assert.deepEqual(result, [2,3,4]);
  });

  it('should be curried', () =>{
    const result = map(add2)([0,1,2]);
    assert.deepEqual(result, [2,3,4]);
  });
});

describe('filter', () => {
  const criteria =  a => a > 1;

  it('should filter arrays', () =>{
    const result = filter(criteria, [0,1,2]);
    assert.deepEqual(result, [2]);
  });

  it('should be curried', () =>{
    const result = filter(criteria)([0,1,2]);
    assert.deepEqual(result, [2]);
  });
});

describe('reverse', () => {
  it('should reverse arrays', () =>{
    const result = reverse([0,1,2]);
    assert.deepEqual(result, [2,1,0]);
  });
});

describe('sequence', () => {
  it('should create a function that executes a list in functions in sequence', () =>{
    const add3 = a => a + 3;
    const mult10 = a => a * 10;
    const seq = sequence(add3, mult10);
    const result = seq(2);
    assert.equal(result, 50);
  });
});

describe('compose', () => {
  it('should create a function that executes the composition of a list of functions', () =>{
    const add3 = a => a + 3;
    const mult10 = a => a * 10;
    const seq = compose(add3, mult10);
    const result = seq(2);
    assert.equal(result, 23);
  });
});

describe('all', () => {
  const pred = a => a > 2;
  it('should return true if and only if all the values match the predicate', () => {
    assert.notOk(all(pred, [1,2,3]));
    assert.ok(all(pred, [3,3,3]));
  });

  it('should return true on an empty list', () => {
    assert.ok(all(pred, []));
  });

  it('should be curried', () =>{
    assert.ok(all(pred)([3,3,3]));
  });
});

describe('any', () => {
  const pred = a => a > 2;

  it('should return true if any of the values match the predicate', () => {
    assert.notOk(any(pred, [1,1,1]));
    assert.ok(any(pred, [1,1,3]));
  });

  it('should return false on an empty list', () => {
    assert.notOk(any(pred, []));
  });

  it('should be curried', () =>{
      assert.ok(any(pred)([1,1,3]));
  });
});


describe('none', () => {
  const pred = a => a > 2;

  it('should return true if none of the values match the predicate', () => {
    assert.notOk(none(pred, [1,1,3]));
    assert.ok(none(pred, [1,1,1]));
  });

  it('should return true on an empty list', () => {
    assert.ok(none(pred, []));
  });

  it('should be curried', () =>{
      assert.ok(none(pred)([1,1,1]));
  });
});


describe('zip', () => {
  it('should zip two arrays', () => {
    assert.deepEqual(zip([1,2,3],[4,5,6]), [[1,4], [2,5], [3,6]] );
  });

  it('should zip two arrays stopping with the shortest one', () => {
    assert.deepEqual(zip([1,2,3,4],[4,5,6]), [[1,4], [2,5], [3,6]] );
    assert.deepEqual(zip([1,2,3],[4,5,6,7]), [[1,4], [2,5], [3,6]] );
  });

  it('should return an empty array for empty lists', () => {
    assert.deepEqual(zip([],[]), []);
  });

  it('should be curried', () =>{
      assert.deepEqual(zip([1,2,3])([4,5,6]), [[1,4], [2,5], [3,6]] );
  });

});
