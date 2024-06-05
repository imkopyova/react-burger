import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { geUserState } from '../../services/selectors/selectors';

interface IProtectedRoute {
    unauthorizedOnly?: boolean;
    component: React.ReactElement;
}

export const ProtectedRoute = ({
    unauthorizedOnly,
    component,
}: IProtectedRoute) => {
    const { isAuthChecked, user } = useSelector(geUserState);
    const location = useLocation();

    const { from } = location.state || { from: { pathname: '/' } };

    if (!isAuthChecked) {
        return <p>Loading...</p>;
    }

    if (unauthorizedOnly && user) {
        return <Navigate to={from} />;
    }

    if (!unauthorizedOnly && !user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
};
