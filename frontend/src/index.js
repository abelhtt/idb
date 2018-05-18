import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './css/index.css';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker.js';
import {CookiesProvider} from 'react-cookie';

ReactDOM.render((
	<BrowserRouter>
		<CookiesProvider>
			<App />
		</CookiesProvider>
	</BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
