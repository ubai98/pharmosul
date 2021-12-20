import styled from "styled-components";
import { mobile } from "../responsive";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
  background-color: #edf1fc ;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}

`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const Title = styled.h1`
    color:white;
    margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: #f8e0d7;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = ({ item }) => {
  const history = useHistory();

  return (
    <Container >
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button onClick={() => history.push("/products")}  >SHOP NOW</Button>
      </Info>
    </Container>
  );
};

export default CategoryItem;
