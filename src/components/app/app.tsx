import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppHeader } from '../app-header/app-header';
import { HomePage } from '../../pages/home/home';

import styles from './app.module.css';

export const App = () => {
    return (
        <div className={styles.app}>
            <AppHeader />
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
