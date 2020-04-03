module.exports = {
    // 如果想把最后编译的文件不压缩/半压缩(函数内为空)，命令行输入: webpack --development
    mode: "development",
    // 注意: 时 devtool 不是 devTools
    devtool: "source-map",
    entry: {
        animation: "./src/animation.js",
    },
    output: {
        path: __dirname + "/build",
        filename: "[name].js",
        library: "animation",
        libraryTarget: "umd",
    }
};