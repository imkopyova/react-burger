import classNames from 'classnames';
import styles from './ingredients-section.module.css';

export const IngredientsSection = ({ name, children }) => {
    return (
        <section className="pt-10">
            <h2 className="text text_type_main-medium">{name}</h2>
            <div className={classNames('pt-6 pl-4', styles.grid)}>
                {children}
            </div>
        </section>
    );
};
