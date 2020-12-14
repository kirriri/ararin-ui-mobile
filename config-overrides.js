const { override, fixBabelImports,addWebpackAlias,addDecoratorsLegacy } = require('customize-cra');
const path = require('path')

module.exports = override(
    fixBabelImports('import', {
        libraryDirectory: 'es',
        style: true,
    }),
    addWebpackAlias({
        ['@']: path.resolve(__dirname, './src'),
    }),
    addDecoratorsLegacy(),
);