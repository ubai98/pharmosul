import { Add, Remove } from "@material-ui/icons";
import { CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Api } from "../components/axios";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    

    ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
    flex: 1;
    
`;

const Image = styled.img`
    width: 25%;
    height:20vh;
    display: flex;
    border-radius: 25px 0 25px 25px;

    ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    background-color: #fcf1ed;
    border-radius: 25px 0 0 25px;

    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    padding: 20px;
    font-weight: 200;
`;

const Desc = styled.h2`
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

    &:hover {
        background-color: #f8f4f4;
    }
`;

const Product = ({onAdd}) => {
    const { id } = useParams();
    const [pro, setPro] = useState({});
    const [qty, setQty] = useState(1);

    useEffect(() => {
        Api("products/"+id).then((res) => {
          setPro(res.data);

        });
    }, []);
    console.log(pro);
    
    const splitting = () => {
        return `http://localhost:5500/images/${pro.imagePath.split("\\")[2]}`;
    };
    return (
        <Container>
            <Wrapper>
                <ImgContainer >
                   
                </ImgContainer>
                <InfoContainer>
                    <Title>{pro.title}</Title>
                    {/* <Image src={splitting()} /> */}
                    <CardMedia
                        component="img"
                        width="100%"
                        height="150"
                        objectFit = "cover"
                        image={`http://localhost:5500/images/${pro.imagePath}`} 
                        alt="green iguana"
                        
                    />
                    <Desc>{pro.description}</Desc>
                    <Price>{pro.Price}</Price>

                    <AddContainer>
                        <AmountContainer>
                            <Remove onClick={() => qty!=1?setQty(qty-1):setQty(qty)} style={{ cursor: "pointer" }} />
                            <Amount>{qty}</Amount>
                            <Add onClick={() => setQty(qty+1)} style={{ cursor: "pointer" }} />
                        </AmountContainer>
                        <Button onClick={() =>onAdd(pro , qty)}>اضف اللى العربة</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Footer />
        </Container>
    );
};

export default Product;
