import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import { Api } from "./axios";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: #fcf1ed;
  border-radius: 25px;
`;

const Products = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        Api("products/").then((res) => {
            setProducts(
                res.data.filter((product) =>
                    props.catCat == "الكل"
                        ? product.category == props.Cat
                        : product.catcategory == props.catCat
                )
            );
        });
    }, [props.catCat]);

    return (
        <Container>
            {products.map((item) => (
                <Product item={item} key={item.id} />
            ))}
        </Container>
    );
};

export default Products;
