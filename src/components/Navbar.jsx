import { Badge } from "@material-ui/core";
import {  ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useContext } from "react";
import { UserContext } from "../context/info";

const Container = styled.div`
  height: 70px;
  background-color: #f8e0d7;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;



const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const{isAuth , logout} =useContext(UserContext)
  const history= useHistory()
  return (
    <Container>
      <Wrapper>
        <Right>
          <Link to={"/"} style={{textDecoration:"none" , color: "black"}}>    <Logo>صيدليتي</Logo> </Link>
        </Right>
        <Left>
          {!isAuth && <MenuItem onClick={() => history.push('/register')} > انشئ حساب </MenuItem>}
          {!isAuth && <MenuItem onClick={() => history.push('/login')} >تسجيل دخول</MenuItem>}
          {isAuth && <MenuItem onClick={logout} >تسجيل الخروج</MenuItem>}
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined onClick={() => history.push('/cart')} />
            </Badge>
          </MenuItem>
        </Left>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
