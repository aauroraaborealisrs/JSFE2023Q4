const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 mode: 'production',
 entry: './src/index.ts',
 output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`,
 },
 module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
 },
 resolve: {
    extensions: ['.tsx', '.ts', '.js'],
 },
 plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
 ],
 devServer: {
  static: {
    directory: path.join(__dirname, 'dist'), 
  },
  compress: true, 
  port: 9000, 
},
};
