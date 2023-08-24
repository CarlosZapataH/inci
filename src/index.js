import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './features/store/index';
import { Provider } from 'react-redux';
import registerServiceWorker from './serviceWorkerRegistration';
import '@src/assets/scss/main.scss';

registerServiceWorker();

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
