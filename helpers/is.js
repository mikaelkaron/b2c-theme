module.exports = (a, b, options) => {
  // compare
  var is = Object.is(a, b);
  // check if we're called as a block
  return options.fn && options.inverse
    ? is
      ? options.fn(this)
      : options.inverse(this)
    : is;
};