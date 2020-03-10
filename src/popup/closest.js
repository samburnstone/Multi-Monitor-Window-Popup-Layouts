// From: https://github.com/ColinEberhardt/yahoo-finance-d3fc/blob/11c6f8e6e9702ab046a86796fdb3901e8df7f509/util.js
export default (arr, fn) =>
  arr.reduce(
    (acc, value, index) =>
      fn(value) < acc.distance ? { distance: fn(value), index, value } : acc,
    {
      distance: Number.MAX_VALUE,
      index: 0,
      value: arr[0]
    }
  ).value;
