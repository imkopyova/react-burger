import classNames from 'classnames';
import styles from './ingredient-details.module.css';

interface IIngredientDetails {
    name: string;
    image: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
}

export const IngredientDetails = ({
    name,
    image,
    proteins,
    carbohydrates,
    calories,
    fat,
}: IIngredientDetails) => {
    console.log(name, image, proteins, carbohydrates, calories, fat);
    return (
        <div className={classNames(styles.container, 'p-10 pb-15')}>
            <h3
                className={classNames(
                    styles.title,
                    'text text_type_main-large mt-3',
                )}
            >
                Детали ингредиента
            </h3>
            <img
                className={classNames(styles.image, 'mt-5')}
                alt={name}
                src={image}
                width={520}
                height={240}
            />
            <p className="text text_type_main-medium mt-2">{name}</p>
            <div
                className={classNames(
                    styles.nutrients_layout,
                    'text text_type_main-default text_color_inactive pt-8',
                )}
            >
                <div className={styles.nutrients_item}>
                    <span className="text text_type_main-default text_color_inactive">
                        Калории,ккал
                    </span>
                    <span className="text text_type_digits-default pt-2">
                        {calories}
                    </span>
                </div>
                <div className={styles.nutrients_item}>
                    <span className="text text_type_main-default text_color_inactive">
                        Белки, г
                    </span>
                    <span className="text text_type_digits-default pt-2">
                        {proteins}
                    </span>
                </div>
                <div className={styles.nutrients_item}>
                    <span className="text text_type_main-default text_color_inactive">
                        Жиры, г
                    </span>
                    <span className="text text_type_digits-default pt-2">
                        {fat}
                    </span>
                </div>
                <div className={styles.nutrients_item}>
                    <span className="text text_type_main-default text_color_inactive">
                        Углеводы, г
                    </span>
                    <span className="text text_type_digits-default pt-2">
                        {carbohydrates}
                    </span>
                </div>
            </div>
        </div>
    );
};
