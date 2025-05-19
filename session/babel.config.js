module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env.local',       // or '.env' if you prefer
      safe: false,
      allowUndefined: true,
    }],
  ],
};
