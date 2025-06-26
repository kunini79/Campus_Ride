const { getDefaultConfig } = require('expo/metro-config');
const path = require('path'); // Added back path, as it was in my previous full snippet

const config = getDefaultConfig(__dirname);

// This is the key part for transpiling node_modules.
// It tells Metro's Babel transformer to process code from specific packages
// inside node_modules that might not be pre-transpiled.
config.transformer.babelTransformerPath = require.resolve('metro-react-native-babel-transformer');

// Add these packages to the list of packages that Babel should transpile
// This includes `react-native-maps` which often causes issues.
// You might need to add other packages here if they cause similar syntax errors.
config.resolver.blacklistRE = config.resolver.blacklistRE || []; // Initialize if not present
// Removed specific blacklist for @expo/cli unless you have a known reason for it
// config.resolver.blacklistRE.push(/\/node_modules\/@expo\/cli\/.*/);

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, './node_modules'), // Using path module here
];

// Explicitly include packages that need transpilation
const excluded = [
  'react-native-maps', // This is the one we want to transpile
  // Add other modules here if you encounter similar syntax errors from them
];

// Corrected line: Removed the type hint comment that was causing the SyntaxError
config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
  nonExternalModules: excluded // This is a common way to include external modules for transpilation
});


module.exports = config;