const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const webpackPlugins = [
	new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'public/index.html'),
		filename: 'index.html',
		favicon: './src/favicon.ico',
		manifest: './src/manifest.json',
		logo192: './src/logo192.png',
		logo512: './src/logo512.png',
	}),
	new Dotenv({
		path: './.env', // Path to .env file (this is the default)
		systemvars: true,
	}),
	new CopyPlugin({
		patterns: [
			{ from: './src/favicon.ico', to: 'favicon.ico' },
			{ from: './src/manifest.json', to: 'manifest.json' },
			{ from: './src/logo192.png', to: 'logo192.png' },
			{ from: './src/logo512.png', to: 'logo512.png' },
		],
	}),
];

if ('production' === process.env.NODE_ENV) {
	webpackPlugins.push(
		new InjectManifest({
			swSrc: './src/src-sw.js',
			swDest: 'sw.js',
		})
	);
}

module.exports = {
	context: __dirname,
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		publicPath: '/',
	},
	devServer: {
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css?$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|svg|gif|ico)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: './images/[name].[ext]',
					},
				},
			},
			// {
			//   test: /\.(png|jpe?g|svg|gif)?$/,
			//   use: "file-loader?name=./images/[name].[ext]",
			// },
		],
	},
	plugins: webpackPlugins,
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			'@src': path.resolve(__dirname, 'src'),
		},
	},
};
