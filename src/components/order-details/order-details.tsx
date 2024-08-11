import classNames from 'classnames';
import styles from './order-details.module.css';
import DoneImage from '../../images/done.png';

interface IOrderDetails {
    number?: number;
}

export const OrderDetails = ({ number }: IOrderDetails) => {
    return (
        <div
            className={classNames(styles.container, 'p-30 pl-10 pr-10')}
            data-testid="order-details"
        >
            <h3 className="text text_type_digits-large">{number}</h3>
            <p className="text text_type_main-medium mt-8">
                идентификатор заказа
            </p>
            <img
                alt="Ваш заказ начали готовить"
                src={DoneImage}
                width={120}
                height={120}
                className="mt-15"
            />
            <p className="text text_type_main-default mt-15">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive mt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
};
