import React from 'react';
import getStore from './app/router';
import { Provider } from 'react-redux';
import store from './app/redux/store'

const App = () => {
	return (
		<Provider store={store}>
			{getStore()}
		</Provider>
	);
};

export default App;
