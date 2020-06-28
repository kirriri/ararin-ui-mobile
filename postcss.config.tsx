module.exports = {
    plugins: {
      // ...
      'postcss-px-to-viewport': {
          unitToConvert: 'px',
          viewportWidth: 375,
          viewportHeight: 1334,
          unitPrecision: 5,
          propList: ['*'],
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: [],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: undefined,
          include: undefined,
          landscape: false,
          landscapeUnit: 'vw',
          landscapeWidth: 568
      }
    }
  }