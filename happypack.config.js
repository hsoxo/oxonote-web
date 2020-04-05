const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: 4});

module.exports = [
 new HappyPack({
   id: 'css',
   threadPool : happyThreadPool,
   threads : 4,
   loaders : [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        localsConvention: 'camelCaseOnly',
        importLoaders: 1,
      }
    },
    // 'sass-loader'
   ]
 }),
]
