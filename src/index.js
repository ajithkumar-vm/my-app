import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+ uses 'react-dom/client'
import App from './App'; // Import the main App component
import { BrowserRouter} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root')); // Find the 'root' div from index.html

root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
); // Render the App component inside the 'root' div

