const { override, addWebpackAlias, addLessLoader, addWebpackPlugin, addWebpackModuleRule, fixBabelImports } = require('customize-cra');
const a = require('url-loader');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const path = require('path');

const progressBarPluginOption = {
    complete: "✔",
    format: `${chalk.green('Building')} [ ${chalk.green(':bar')} ] ${chalk.bold(':percent')}`,
    clear: true
}

module.exports = override(
    addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src')
    }),
    addLessLoader({
        // javascriptEnabled: true,
    }),
    addWebpackPlugin(new ProgressBarPlugin(progressBarPluginOption)),
    addWebpackModuleRule({
        test: /\.(ttf|eot|svg|woff|woff2)$/, use: [
            {
                loader: 'url-loader',
                options: {
                    // The `mimetype` and `encoding` arguments will be obtained from your options
                    // The `resourcePath` argument is path to file.
                    // generator: (content, mimetype, encoding, resourcePath) => {
                    //     console.log("资源路径:" + resourcePath);
                    // },
                },
            },
        ],
    }),
    addWebpackModuleRule(
        {
            test: /\.(less|css)$/,
            use: [
                {
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            strictMath: true,
                        },
                    },
                },
            ]
        }
    )
)