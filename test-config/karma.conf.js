var webpackConfig = require("./webpack.test.js");

module.exports = function(config) {
    var _config = {
        basePath: "",

        frameworks: ["jasmine"],

        files: [{ pattern: "./karma-test-shim.js", watched: true }],

        preprocessors: {
            "./karma-test-shim.js": ["webpack", "sourcemap"]
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: "errors-only"
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ["kjhtml", "dots"],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ["Chrome"],
        singleRun: false,
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        }
    };

    config.set(_config);
};
