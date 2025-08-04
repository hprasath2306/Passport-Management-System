import { useAppContext } from "../../context/AppContext";
import "./Home.css";

export const Home = () => {
  const { isLoggedIn, userData } = useAppContext();
  return (
    <div>
      {isLoggedIn && userData ? (
        <div>
          <h2>Welcome, {userData.user.firstName}!</h2>
          <p>Token: {userData.token}</p>
          <p>Email: {userData.user.email}</p>
          <p>Phone: {userData.user.phoneNumber}</p>
        </div>
      ) : (
        <div>Please log in to see your information.</div>
      )}
    </div>
  );
};
