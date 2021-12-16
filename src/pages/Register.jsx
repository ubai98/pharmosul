import styled from "styled-components";
import { mobile } from "../responsive";
import React, { useState, useContext } from "react";
import {  useHistory } from "react-router-dom";
import { UserContext } from "../context/info";
import { Api } from "../components/axios";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
            rgba(255, 255, 255, 0.5),
            rgba(255, 255, 255, 0.5)
        ),
        url("https://images.unsplash.com/photo-1567427361984-0cbe7396fc6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=878&q=80")
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
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
    flex-wrap: wrap;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    margin: 10px;
`;

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [userName, setUserName] = useState("");
    const [errors, setError] = useState("");
    const { login } = useContext(UserContext);

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        const error = validation();
        if (error.length > 0) {
            setError(error);
            return;
        } else setError("");

        Api.post("signup", {
            name: userName,
            age: phoneNumber,
            email: email,
            password: password,
        }).then((res) => {
                console.log(res.data);
                login(res.data.token ,res.data.privileges)
                history.push("/");
            })
            .catch((err) => {
                console.log(err.message);
            });
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
                <Title>انشاء حساب جديد</Title>
                <Form onSubmit={submitHandler}>
                    {/* <Input placeholder="الاسم الاول" />
          <Input placeholder="الاسم الثاني" /> */}
                    <Input
                        placeholder="اسم المستخدم"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <Input
                        placeholder="البريد الالكتروني"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        placeholder="كلمة المرور"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        placeholder="رقم الهاتف "
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />

                    <Button type="submit">انشاء الحساب</Button> 
                    
                </Form>
                {errors && <p style={{ color: "red" }}>{errors.join("\n")}</p>}
            </Wrapper>
        </Container>
    );
};

export default Register;
