import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './Home';
import PaxCalculator from './PaxCalculator/PaxCalculator';
import Calendar from './Calendar/Calendar';
import './App.less';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/paxcalculator' element={<PaxCalculator />} />
                <Route path='/calendar' element={<Calendar />} />
            </Routes>
        </Router>
    );
};

export default App;
