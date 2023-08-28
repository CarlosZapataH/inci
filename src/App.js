import React from 'react';
import { RouterProvider } from 'react-router-dom';
import myRoutes from './routes/routes';

// if ('serviceWorker' in navigator) {
// 	window.addEventListener('load', () => {
// 		navigator.serviceWorker
// 			.register('/sw.js')
// 			.then((registration) => {
// 				alert('Service Worker registrado con éxito: ' + registration.scope);
// 				//console.log('Service Worker registrado con éxito:', registration.scope);
// 			})
// 			.catch((error) => {
// 				console.log('Error al registrar el Service Worker:', error);
// 			});
// 	});
// }

class App extends React.Component {
	render() {
		return <RouterProvider router={myRoutes} />;
	}
}

export default App;
