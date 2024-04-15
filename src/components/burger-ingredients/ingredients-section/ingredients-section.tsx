import classNames from 'classnames';
import styles from './ingredients-section.module.css';

interface IIngredientsSection {
    name: string;
    children: React.ReactElement[];
}

export const IngredientsSection = ({ name, children }: IIngredientsSection) => {
    return (
        <section className="pt-10">
            <h2 className="text text_type_main-medium">{name}</h2>
            <div className={classNames('pt-6 pl-4', styles.grid)}>
                {children}
            </div>
        </section>
    );
};
