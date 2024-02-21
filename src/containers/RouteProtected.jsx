import {Outlet, Navigate} from 'react-router-dom';

function RouteProtected({session}) {
    return (session) ? <Outlet /> : <Navigate to="/" />
}

export default RouteProtected;