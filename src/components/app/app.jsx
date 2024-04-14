import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

import styles from './app.module.css';

function App() {
    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={styles.container}>
                <h1 className="text text_type_main-large pt-10 pb-5">
                    Соберите бургер
                </h1>
                <main>
                    <BurgerIngredients />
                </main>
                <aside></aside>
            </div>
        </div>
    );
}

export default App;
