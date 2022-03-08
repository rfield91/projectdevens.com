import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/project_devens_logo.png';
import './Home.less';

const Home = () => {
    return (
        <div>
            <div className='logo'>
                <Link to='/'>
                    <img src={logo} />
                </Link>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link to='/paxcalculator'>PAX Calculator</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
