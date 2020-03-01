const root = document.getElementById('root');
if (!root) throw new Error('root not found');

import App from './app';

root.appendChild(App());
