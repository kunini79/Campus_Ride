module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            "@/components": "./components",
            "@/constants": "./constants",
            "@/lib": "./lib",
            "@/app": "./app"
          },
          extensions: [
            ".js",
            ".jsx",
            ".ts",
            ".tsx",
            ".android.js",
            ".android.tsx",
            ".ios.js",
            ".ios.tsx"
          ]
        },
      ],
      'react-native-reanimated/plugin' // Keep this if you use reanimated
    ],
  };
};