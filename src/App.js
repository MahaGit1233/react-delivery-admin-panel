import { BrowserRouter } from "react-router-dom";
import Front from "./components/Common/Front";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Menu from "./components/AdminPanel/Menu";
import Admin from "./components/AdminPanel/Admin";
import UserInterface from "./components/UserInterface/UserInterface";
import MenuList from "./components/AdminPanel/MenuList";
import Recipe from "./components/AdminPanel/Recipe";
import UsersRecipe from "./components/UserInterface/UsersRecipe";
import UserMenuList from "./components/UserInterface/UserMenuLIst";
import Profile from "./components/UserInterface/Profile";
import Footer from "./components/Common/Footer";
import AdminOrders from "./components/AdminPanel/AdminOrders";
import UserOrders from "./components/UserInterface/UserOrders";
import ForgotPassword from "./components/UserInterface/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" exact component={Front} />
          <Route path="/menu/:category" component={MenuList} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/admin/:category/:itemName" component={Recipe} />
          <Route path="/adminorders" component={AdminOrders} />
          <Route path="/admin" component={Admin} />
          <Route path="/users/:category/:itemName" component={UsersRecipe} />
          <Route path="/users/:category" component={UserMenuList} />
          <Route path="/userorders" component={UserOrders} />
          <Route path="/users" component={UserInterface} />
          <Route path="/profile" component={Profile} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
        <div>
          <Footer style={{ position: 'fixed' }} />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
