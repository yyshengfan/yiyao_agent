# myvue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


我来做一下笔记吧，省的日后忘记了又来抱怨 ~V~
1.全局安装 vue-cli                命令 npm install vue-cli -g
2.初始化项目vue+webpack           命令 vue init webpack myvue
3.配置打包路径问题     config/index.js  ——assetsPublicPath: './'
                     build/util.js    ——publicPath: '../../' ——fallback下边

4.引入element-ui      下载 npm i -s element-ui
                      main中引入并且use

5.引入material        引入之後需要下載一系列的依赖包，自己解决一下。
                      scss依赖与{   
                         "node-sass": "^4.11.0",
                         "sass-loader": "^7.1.0",
                      }

