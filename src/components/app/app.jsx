import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { DATA } from '../../utils/data';

import styles from './app.module.css';

function App() {
    return (
        <div className={styles.app}>
            <AppHeader />
            <div className={styles.container}>
                <h1 className="text text_type_main-large pt-10 pb-5">
                    Соберите бургер
                </h1>
                <main className={styles.main}>
                    <BurgerIngredients />
                    <BurgerConstructor
                        bunTop={DATA[0]}
                        bunBottom={DATA[0]}
                        ingredients={[
                            DATA[6],
                            DATA[5],
                            DATA[8],
                            DATA[10],
                            DATA[10],
                        ]}
                    />
                </main>
            </div>
        </div>
    );
}

export default App;
