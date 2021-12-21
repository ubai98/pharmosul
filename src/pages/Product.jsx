import { Add, Remove } from "@material-ui/icons";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Api } from "../components/axios";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

const Container = styled.div`

`;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
  
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  border-radius:0 25px 25px 0;

  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  background-color: #fcf1ed;
  border-radius: 25px 0 0 25px ;

  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  padding: 20px;
  font-weight: 200;
`;

const Desc = styled.h1`
  padding: 20px;
  font-weight: 200;
`;

const Price = styled.h1`
  font-weight: 100;
  font-size: 40px;
  padding: 20px;
`;


const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Product = () => {
  const {id} = useParams()
  console.log(id);

  useEffect(() => {
    Api("http://localhost:8000/popularProducts/" + id).then((res) => {        
        console.log(res.data);
    });
}, []);

  return (
    <Container>
      <Navbar />
      <Wrapper>
        <ImgContainer>
          <Image src="https://i.ibb.co/S6qMxwr/jean.jpg" />
        </ImgContainer>
        <InfoContainer>
          <Title>اسم المنتج</Title>
          <Desc>
            وصف المنتج 
          </Desc>
          <Price>سعر المنتج</Price>
         
          <AddContainer>
            <AmountContainer>
              <Remove />
              <Amount>1</Amount>
              <Add />
            </AmountContainer>
            <Button>اضف اللى العربة</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Product;
