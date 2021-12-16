import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Switch, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/info";
import { useHistory } from "react-router-dom";


const App = () => {
    const{isAuth} =useContext(UserContext)
    const history= useHistory()

    let routes = (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/products">
                <ProductList />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/cart">
                {!isAuth ? <Login /> : <Cart />}
                
                {/* {!isAuth && <Login /> }
                {isAuth && <Cart />} */}
                
            </Route>
            <Route path="/product/:id">
                <Product />
            </Route>
        </Switch>
    );

    return <div>{routes}</div>;
};

export default App;
