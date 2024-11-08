
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.jsx';
import "flowbite/dist/flowbite.min.js";
import { Provider } from 'react-redux'; // Import Provider từ react-redux
import { store } from './Form/Redux/store.js'; // Import store của bạn

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
