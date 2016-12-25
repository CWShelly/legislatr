var path = require('path');
var express = require('express');
var app = express();

const usSenatorRouter = require(__dirname + '/routes/usSenators.js');

app.use('/api', usSenatorRouter);
app.set('port', process.env.PORT || 4000);

if(process.env.NODE_ENV !== 'production') {
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var webpack = require('webpack');
    var config = require('../webpack.config');
    var compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
    app.use(webpackHotMiddleware(compiler));
}





app.use(express.static(path.join(__dirname, '../src')));

app.get('/', function(request, response) {
    response.sendFile(__dirname + '../src/index.html');
});

module.exports = exports = app.listen(app.get('port'), ()=>{
    console.log('up on ', app.get('port'));
});
