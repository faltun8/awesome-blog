import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function AppRouter() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/login" component={SignIn} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
