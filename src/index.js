import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/info";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
