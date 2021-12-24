import { Add, Remove } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import { mobile } from "../responsive";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`

  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = ({ cartItems, onAdd, onRemove,onEmpty }) => {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qt * c.price, 0);
  const shippingPrice = itemsPrice ==0?0: itemsPrice > 5000 ? 0 : 250;
  const totalPrice = itemsPrice + shippingPrice;

  
  return (<>
    <Container>
      <Wrapper>
        <Title>عربتك</Title>
        <Top>
        <Link to={`/products/1`} style={{ textDecoration: "none" }} > <TopButton>متابعة التسوق</TopButton> </Link>
          
            
          <TopButton  onClick={()=>onEmpty()} >ازالة جميع العناصر</TopButton>

          <TopButton type="filled">اكمال الطلب</TopButton>
        </Top>
        <Bottom>
          <Info>
          {cartItems.length == 0 && <h3>لا توجد عناصر في العربة </h3>}

            {cartItems.map((item) => (
              <Product key={item.id}>
              <ProductDetail>
                <Image src={`http://localhost:5500/images/${item.imagePath.split("\\")[2]}`} />
                <Details>
                  <ProductName>
                    <b>المنتج:</b>  {item.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {item.id}
                  </ProductId>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add  onClick={() => onAdd(item)} style={{ cursor: "pointer" }}   />
                  <ProductAmount>{item.qt}</ProductAmount>
                  <Remove onClick={() => onRemove(item)} style={{ cursor: "pointer" }} />
                </ProductAmountContainer>
                <ProductPrice>IQD {item.price * item.qt}</ProductPrice>
              </PriceDetail>
            </Product>
            ) ) }
            
            
          </Info>
          <Summary>
            <SummaryTitle>معلومات الطلب</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>سعر المنتجات</SummaryItemText>
              <SummaryItemPrice>IQD {itemsPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>سعر التوصيل</SummaryItemText>
              <SummaryItemPrice>IQD {shippingPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>المجموع</SummaryItemText>
              <SummaryItemPrice>IQD {totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <Button>اكمال الطلب</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
    </>
  );
};

export default Cart;
