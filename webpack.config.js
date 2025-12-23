const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/logbrowser.js',
    output: {
        filename: 'logbrowser.bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'LogBrowser',   // UMD global name
        libraryTarget: 'umd',    // UMD output
        globalObject: 'self'     
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "> 0.25%, not dead" }]
                        ]
                    }
                }
            }
        ]
    },
    devtool: false
};
