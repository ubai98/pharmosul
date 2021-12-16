import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
    const [userInfo, setUserInfo] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [priv, setPriv] = useState(false);

    const login = async (token, privileges) => {
        await localStorage.setItem("user", JSON.stringify(token));
        await localStorage.setItem("priv", JSON.stringify(privileges));
        setUserInfo(token);
        setIsAuth(true);
        {
            privileges == 1 ? setPriv(true) : setPriv(false);
        }
        // console.log(priv);
    };

    const logout = () => {
        setUserInfo("error"); // this should be empty
        localStorage.removeItem("user");
        localStorage.removeItem("priv");
        setIsAuth(false);
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        const isAdmin = localStorage.getItem("priv");
        if (user && user !== "undefined") {
            setUserInfo(JSON.parse(user));
            setIsAuth(true);
        }
        {
            isAdmin == 1 ? setPriv(true) : setPriv(false);
        }
        // console.log(isAdmin);
        // console.log(priv);
    }, []);

    return (
        <UserContext.Provider value={{ isAuth, userInfo, login, logout, priv }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
