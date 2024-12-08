import { Navigate } from 'react-router-dom';
import { useUser } from '../context/useUser';
import PropTypes from 'prop-types'; 

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default PrivateRoute;
