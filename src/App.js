import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Board from "./Board";
import Form from "./Form";


import {UserNameProvider} from "./UserNameContext";

function App() {
  return (
    <div className="App">
        <UserNameProvider>
            <Router basename="/FlipMaster-">
                <Routes>
                    <Route path="/" element={<Form />} />
                    <Route path="/board" element={<Board />} />
                </Routes>
            </Router>
        </UserNameProvider>



    </div>
  );
}

export default App;
