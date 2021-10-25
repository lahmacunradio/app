module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['react', 'react-hooks'],
  rules: {
    'comma-dangle': ['off'],
    'arrow-body-style': ['error', 'as-needed'],
    'react/jsx-pascal-case': 'error'
  }
};
