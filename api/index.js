/** api入口 */
var routes = require('./routes/index');
module.exports = function( app ) {
  app.use('/api', routes);
}
