import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Customer from './Containers';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customer/>} exact/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
