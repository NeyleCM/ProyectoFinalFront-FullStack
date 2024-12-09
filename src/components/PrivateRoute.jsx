import { Navigate } from 'react-router-dom';
import { useUser } from '../context/useUser';
import PropTypes from 'prop-types'; 

const PrivateRoute = ({ children }) => {
  const { user } = useUser();

  return user ? 
  children : 
  <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, 
};

export default PrivateRoute;
