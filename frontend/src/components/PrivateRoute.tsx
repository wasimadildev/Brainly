import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
}
const PrivateRoute = ({ children } : PrivateRouteProps) => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;