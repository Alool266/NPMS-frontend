module.exports = {

    lintOnSave: false,

    publicPath: '/',

    /** Distinguish between packaging environment and development environment
     * process.env.NODE_ENV==='production' (packaging environment)
     * process.env.NODE_ENV==='development' (development environment)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */

    // The base path of project deployment

    // We assume by default that your application will be deployed at the root of the domain name,

    // eg https://www.my-app.com/

    // If your application is deployed in a subpath, then you need to go here

    // Specify the subpath. For example, deploy your application on

    // https://www.foobar.com/my-app/

    // then change this value to '/my-app/'

    // baseUrl: "./", // Where to output the built file

    outputDir: "dist", // where to put static assets (js/css/img/font/...) // whether to use 'eslint-loader' to check when saving // valid values: true | false | 'error' // when set to ' error', the detected error will trigger compilation failure

    lintOnSave: true, // Use full build with in-browser compiler // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
    runtimeCompiler: false, // babel-loader will skip `node_modules` dependencies by default. // Through this option, a dependency can be displayed and translated
    transpileDependencies: [
        /* string or regex */
    ], // Whether to generate sourceMap for production environment build?

    productionSourceMap: false, // Adjust the internal webpack configuration. // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},

    configureWebpack: () => {}, // CSS related options

    css: {
       // Extract the css inside the component to a separate css file (only used in production environment)

        // Can also be an options object passed to extract-text-webpack-plugin

        extract: true, // Allow generating CSS source maps?

        sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }

        loaderOptions: {}, // Enable CSS modules for all css / pre-processor files. // This option does not affect *.vue files.

        modules: false
    }, // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores

    parallel: require("os").cpus().length > 1, // PWA 插件相关配置 // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

    pwa: {}, // configure webpack-dev-server behavior

    devServer: {
        
         
        open: process.platform === "darwin",

        disableHostCheck: false,

        host: "127.0.0.1",

        port: 8088,

        https: false,

        hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        
        // assetsSubDirectory: 'static',
        // assetsPublicPath: '/',
        // proxy: null // string | Object
        proxy: {
        //   '/Ajax_Json': {
            '/npmsBackEndServer': {
            target: 'http://127.0.0.1:8001',
            // ws: true,
            changeOrigin: true,
            pathRewrite: { '^/npmsBackEndServer': '' },
          },
        },
        // proxy: 'http://127.0.0.1:8080',
        // before: app => {}
    }, // Third-party plug-in configuration

    pluginOptions: {
        // ...
        
    }
};