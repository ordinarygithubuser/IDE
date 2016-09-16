import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import config from './webpack.config';

const PORT = process.env.PORT || 3000;

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true
}).listen(PORT, 'localhost', function (err, result) {
    if (err) return console.log(err);
    console.log('Listening at http://localhost:3000/');
});