import React from 'react';
import { Provider } from 'react-redux';

// custom imports
import store from "./src/redux/store";
import HomeScreen from './src/screens/HomeScreen';


const App = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default App;