import styled from "styled-components";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Container = styled.div`
  background-color: #fcf1ed;
`;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const {id} = useParams()
  let options =[]
  if (id==1)   options=["الكل","الجهاز التنفسي","الجهاز الهضمي","مسكنات","انف واذن وحنجرة"]
  else id==2?  options=["الكل","تغذية","نظافة"] : options=["الكل","البشرة","العناية بالشعر"]
  const [selectedOption, setSelectedOption] = useState(options[0]);



  return (
    <Container>
      <Navbar />
      <Title>المنتجات</Title>
      <FilterContainer>
        
        <Filter>
          <FilterText>تصنيف المنتجات</FilterText>
          <Select value={selectedOption}
           onChange={(e) => setSelectedOption(e.target.value)}>
            {options.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
          </Select>
        </Filter>
      </FilterContainer>
      <Products Cat={id} catCat={selectedOption}  />
      <Footer />
    </Container>
  );
};

export default ProductList;
