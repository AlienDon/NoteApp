const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, './src'),
	entry: { app: './index.ts' },
	module: {
		rules: [
			{ test: /\.ts?$/, use: 'ts-loader', exclude: /node_modules/ },
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			}
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [
		new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, "src", "index.html"),
			title: 'Noteapp by Don',
			filename: "index.html",
			chunks: ['vendors', 'app'],
		})
	],
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
};
