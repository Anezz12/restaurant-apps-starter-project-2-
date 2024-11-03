const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) =>
            url.href.startsWith('https://restaurant-api.dicoding.dev/list'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-api-dicoding-list',
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith('https://restaurant-api.dicoding.dev/images/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-api-dicoding-images',
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith('https://restaurant-api.dicoding.dev/detail/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'restaurant-api-dicoding-detail',
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-webfonts',
          },
        },
        {
          urlPattern: ({ url }) =>
            url.href.startsWith('https://kit.fontawesome.com/4d69af1ea6.js'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'fontawesome-kit',
          },
        },
      ],
    }),
  ],
});
