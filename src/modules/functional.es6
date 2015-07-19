import * as _curry from './functional/curry';
import * as _identity from './functional/identity';
import * as _memoize from './functional/memoize';
import * as _t from './functional/t';
import * as _f from './functional/f';
import {map, reduce, reverse} from './list';

export const curry = _curry.curry;
export const identity = _identity.identity;
export const memoize = _memoize.memoize;
export const f = _f.f;
export const t = _t.t;


export
  const always = a => () => a;

export
  const apply = (fns, arr) => reduce((acc, fn) => [...acc, ...map(fn, arr)], [], fns);


export
  const sequence = (...fns) => a => reduce((a, fn) => fn(a), a, fns);

export
  const compose = (...fns) => sequence(...reverse(fns));

export
  const once = fn => ((executed, value) =>
    (...args) => executed ? value
                          : (executed = true, value = fn(...args))
  )();

export
  const lift = (fn, arity) => curry((x, ...args) => reduce(apply, map(curry(fn, arity), x), args), arity);
