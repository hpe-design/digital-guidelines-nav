import alias from '@rollup/plugin-alias';
import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';

const dev = 'development';
const prod = 'production';

const parseNodeEnv = (nodeEnv) => {
  if (!!nodeEnv && (nodeEnv.trim() === prod || nodeEnv.trim() === dev)) {
      return nodeEnv.trim();
  }
  return dev;
}

const nodeEnv = parseNodeEnv(process.env.NODE_ENV);

module.exports = {
  input: 'src/main.js',
  output: {
    file: 'build/dg-nav.js',
    format: 'esm'
  },
  plugins: [
    alias({
      entries: [
        { find: 'grommet-icons', replacement: 'grommet-icons/es6' },
      ]
    }),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      // exclude: [
      //   'node_modules/styled-components/**',
      //   'node_modules/grommet/**',
      //   'node_modules/grommet-icons/**',
      // ],
      namedExports: {
        // The commonjs plugin can't figure out the exports of some modules, so if rollup gives warnings like:
        // ⚠️   'render' is not exported by 'node_modules/react-dom/index.js'
        // Just add the mentioned file / export here
        'node_modules/react-dom/index.js': ['createPortal', 'findDOMNode', 'render'],
        'node_modules/react/index.js': ['Children', 'cloneElement', 'Component', 'createContext', 'createElement', 'createFactory', 'createRef', 'forwardRef', 'Fragment', 'isValidElement', 'useCallback', 'useContext', 'useDebugValue', 'useEffect', 'useMemo', 'useRef', 'useState'],
        'node_modules/react-is/index.js': ['isElement', 'isValidElementType'],
      },
    }),
    babel({ exclude: /node_modules/ }),
    replace({
      // The react sources include a reference to process.env.NODE_ENV so we need to replace it here with the actual value
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      "require('./doc').doc": '',
    }),
  ],
};

// console.log('!!!!', alias({
//   entries: [
//     { find: 'grommet-icons', replacement: 'grommet-icons/es6' },
//   ]
// }).resolveId())
