/**
 * Preset Types
 */

const Dir = (name, children = []) => ({
    name, type: 'dir', children
});

const File = (name, content = '') => ({
    name, type: 'file', content
});

export const LICENSES = [
    { name: 'MIT' },
    { name: 'BSD' },
    { name: 'GNU' },
    { name: 'Apache Common' },
    { name: 'Apache Common 2.0' }
];

/**
 * Preset Templates
 */

// Shared Templates

const Entry = () => `import { Run } from 'mva';
import App from './components/app';
import Store from './state/store';

import './style/app.scss';

Run(Store, App);`;

const Conf = options => `import webpack from 'webpack';
import path from 'path';

const port = process.env.PORT || 3000;

export default {
    debug: true,
    devtool: 'source-map',
    entry: [
        \`webpack-dev-server/client?http://localhost:\${port}\`,
        'webpack/hot/only-dev-server',
        './src/entry'
    ],
    output: {
        publicPath: \`http://localhost:\${port}/dist/\`,
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'react-hot!babel',
                exclude: /node_modules/
            }, {
                test: /\.(css|scss)$/,
                loader: 'style!css!sass'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
    ${options}
};`;

const Package = (props, devDeps = '') => `{
    "name": "${props.name}",
    "version": "0.0.1",
    "description": "${props.desc}",
    "main": "src/entry.js",
    "scripts": {
        "build": "npm run build",
        "watch": "npm run watch",
        "dev": "npm run build"
    },
    "devDependencies": {
        "babel-core": "^6.14.0",
        "babel-preset-es2015": "^6.14.0",
        "babel-preset-react": "^6.11.1",
        "css-loader": "^0.24.0",
        "node-sass": "^3.8.0",
        "react-hot-loader": "^1.3.0",
        "sass-loader": "^4.0.0",
        "style-loader": "^0.13.1",
        "webpack": "^1.13.2",
        "webpack-dev-server": "^1.15.0",
        ${devDeps}
    },
    "keywords": [],
    "author": "${props.author}",
    "license": "${props.license.name}",
    "dependencies": {
        "font-awesome": "^4.6.3",
        "mva": "^3.2.2",
    }
}`;

// Web Templates

const WebIndex = props => `<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>${props.name}</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="http://localhost:3000/build/bundle.js></script>
    </body>
</html>`;

const WebPackage = props => Package(props);

const WebConf = () => Conf({ options: '' });

// Desktop Templates

const DesktopConf = () => Conf(`target: 'electron-renderer'`);

const DekstopPackage = props => Package(props, `"babel-loader": "^6.2.5",
        "babel-polyfill": "^6.13.0",
        "babel-register": "^6.14.0",
        "devtron": "^1.3.0",
        "electron": "^1.3.4",
        "electron-rebuild": "^1.2.0"
`);

/**
 * Presets
 */

export const NoPreset = () => [];

export const WebPreset = props => [
    Dir('src', [
        Dir('actions'),
        Dir('components'),
        Dir('stores'),
        Dir('style'),
        File('entry.js', Entry())
    ]),
    Dir('model', [
        Dir('actions'),
        Dir('components'),
        Dir('stores')
    ]),
    File('index.html', WebIndex(props)),
    File('package.json', WebPackage(props)),
    File('webpack.config.js', WebConf())
];

export const DesktopPreset = props => [
    Dir('src', [
        Dir('actions'),
        Dir('components'),
        Dir('stores'),
        Dir('style'),
        File('app.html'),
        File('entry.js', Entry())
    ]),
    Dir('.babelrc'),
    Dir('model'),
    File('main.js'),
    File('package.json', DekstopPackage(props)),
    File('server.js'),
    File('webpack.config.js', DesktopConf())
];

export const Presets = [
    { name: 'None', create: NoPreset },
    { name: 'Web', create: WebPreset },
    { name: 'Desktop', create: DesktopPreset }
];