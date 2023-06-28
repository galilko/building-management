import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <div class="container mt-4">
      <h3>Welcome to Neighbors Management</h3>
      <p>
        This is the homepage of the Neighbors Management web application. You
        can use the navigation bar above to access different sections of the
        application.
      </p>
      <Link to="/login" className="btn btn-primary">
        Login
      </Link>
    </div>
  );
  return content;
};
export default Public;
