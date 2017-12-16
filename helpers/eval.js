const Handlebars = require('handlebars');

module.exports = function(context, options) {
  return Handlebars.compile(context)(options.data.root);
}