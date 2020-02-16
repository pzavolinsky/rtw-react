const root = document.getElementById('root');
if (!root) throw new Error('root not found');

const div = document.createElement('div');
root.appendChild(div);

const h1 = document.createElement('h1');
h1.textContent = 'This is the title';
div.appendChild(h1);

const h2 = document.createElement('h2');
h2.textContent = 'This is the subtitle';
h2.setAttribute('style', 'background: #ffaaaa');
div.appendChild(h2);
