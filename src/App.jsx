import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashbord/Dashbord";
import { Switch, Route } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./context/info";
import Navbar from "./components/Navbar";


const App = () => {
    const { isAuth  } = useContext(UserContext);
    const [cartItems, setCartItems] = useState([]);

    const onAdd = (product, qtr) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === product.id
                        ? qtr
                            ? { ...exist, qt: exist.qt + qtr }
                            : { ...exist, qt: exist.qt + 1 }
                        : x
                )
            );
        } else {
            setCartItems([...cartItems, { ...product, qt: qtr }]);
        }
    };
    const onRemove = (product) => {
        const exist = cartItems.find((x) => x.id === product.id);
        if (exist.qt == 1) {
            setCartItems(cartItems.filter((x) => x.id !== product.id));
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id == product.id ? { ...exist, qt: exist.qt - 1 } : x
                )
            );
        }
    };

    const onEmpty = () => {
        setCartItems([]);
    };

    let routes = (
        <>
            <Navbar countCartItems={cartItems.length} />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/products/:id">
                    <ProductList />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/cart">
                    {!isAuth ? (
                        <Login />
                    ) : (
                        <Cart
                            cartItems={cartItems}
                            onAdd={onAdd}
                            onRemove={onRemove}
                            onEmpty={onEmpty}
                        />
                    )}
                </Route>
                <Route path="/product/:id">
                    <Product onAdd={onAdd} />
                </Route>

                <Route path="dashboard">
                        <Dashboard />
                </Route>

            </Switch>
        </>
    );

    return <div>{routes}</div>;
};

export default App;
