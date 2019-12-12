const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './index.js',
    context: path.join(__dirname, 'src'),
    devServer: {
        host: 'localhost',
        publicPath: "/",
        contentBase: "./src",
        watchContentBase: true,
        noInfo: false,
        hot: true,
        inline: true,
        historyApiFallback: true,
        port: 8087,
        stats: {
            colors: true
        }
    },
    output: {
        path: path.join(__dirname, "/"),
        filename: "bundle.js",
        chunkFilename: './[name].bundle.js'
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules'),
        ],
        alias: {
            '~': path.resolve('./src'),
        },
        extensions: ['.js', '.es6', '.jsx', '.ts', '.tsx',],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    "awesome-typescript-loader",
                ],
            },
            {
                test: /\.(js|jsx|es6)$/,
                exclude: /(node_modules|bower_components)/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./Templates/index.html",
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules\/.*/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
};
