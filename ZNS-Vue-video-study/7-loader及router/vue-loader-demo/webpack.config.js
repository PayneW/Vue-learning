module.exports = {
    entry: "./main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [
            {test: /\.vue$/, loaders: "vue"},
            {test: /\.js$/, loaders: "babel", exclude: /node_modules/},
        ]
    },
    babel: {
        presets: ["es2015"],
        plugins: ["transform-runtime"]
    }
};