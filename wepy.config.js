const path = require('path');
const fs = require('fs');
const env = process.env.NODE_ENV;
const debug = process.env.NODE_DEBUG === 'true';

module.exports = {
  wpyExt: '.vue',
  build: {
    web: {
      htmlTemplate: path.join('src', 'index.template.html'),
      htmlOutput: path.join('web', 'index.html'),
      jsOutput: path.join('web', 'index.js')
    }
  },
  resolve: {
    alias: {
      counter: path.join(__dirname, 'src/components/counter'),
      src: path.join(__dirname, 'src/')
    },
    modules: ['node_modules']
  },
  eslint: false,
  compilers: {
    // sass: {
    //   indentSyntax: true
    // },
    babel: {
      sourceMap: true,
      presets: [
        'es2015',
        'stage-1'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-export-extensions',
        'syntax-export-extensions'
      ]
    }
  },
  plugins: {
  }
};

// WORKAROUND: set environment by edit js file
let setEnv = function () {
  let envPath = path.resolve(__dirname, 'src/env.js');
  var content = `export default { env: '${env}', debug: ${debug} }`;
  fs.writeFileSync(envPath, content, 'utf8');
};
setEnv();

if (env === 'production' || env === 'test') {
  delete module.exports.compilers.babel.sourcesMap;
  // 压缩sass
  // module.exports.compilers['sass'] = { outputStyle: 'compressed' };
  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  };
}
