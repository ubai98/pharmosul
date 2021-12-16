import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Api } from "../components/axios";
import { UserContext } from "../context/info";


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://images.unsplash.com/photo-1624204921625-49bb8dce6730?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
    ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin-bottom: 10px;
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setError] = useState("");
    const { login } = useContext(UserContext);

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        const error = validation();
        if (error.length>0) {
            setError(error);
            return;
        }
        else  setError("")

        Api.post("login", {
            email: email,
            password: password
        }).then((res) => {
          login(res.data.token ,res.data.privileges);
          history.push("/")
        }).catch((err) => {console.log(err.message) });
    };

    const validation = () => {
        const errors = [];
        if (email.length === 0) {
            errors.push("email is required");
        }
        if (password.length === 0) {
            errors.push("password is required");
        }
        if (password.length <= 8) {
            errors.push("password must be at least 8 characters");
        }
        return errors;
    };


    return (
        <Container>
            <Wrapper>
                <Title>تسجيل دخول</Title>
                <Form onSubmit={submitHandler}>
                    <Input 
                    placeholder="اليريد الالكتروني"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    />
                    <Input
                     placeholder="كلمة المرور" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)} 
                    />
                    <Button type="submit" >الدخول</Button>
                    {/* <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link> */}
                    <div style={{display: "flex" ,flexDirection: "row" ,justifyContent: "space-between"}}>
                      <Link
                        style={{
                            margin: "5px 0px",
                            fontSize: "12px",
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "black",
                           
                        }}
                        to="/register"
                    >
                        انشاء حساب جديد
                    </Link>
                    <Link
                        style={{
                            margin: "5px 0px",
                            fontSize: "12px",
                            textDecoration: "none",
                            cursor: "pointer",
                            color: "black"
                        }}
                        to="/"
                    >
                        الواجهة الرئيسية
                    </Link>  
                    </div>
                    
                </Form>

            </Wrapper>
                {errors && <p style={{ color: "red" }}> {errors.join("\n")}</p>}
        </Container>
    );
};

export default Login;
