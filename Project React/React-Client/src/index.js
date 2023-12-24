import 'react/jsx-runtime'; // This is an experimental feature
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./components/App";



const root = createRoot(document.getElementById('root'));
root.render(< App />);
