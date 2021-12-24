import {
    TableCell,
    TableHead,
    TableRow,
    Table,
    TableBody,
} from "@mui/material";
import { useEffect, useState ,useContext} from "react";
import Button from "@mui/material/Button";
import ProductForm from "./ProductForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { Api } from "../../components/axios";
import DeleteDialog from "./dialog/deleteForm";


const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [productFormDialogStatus, setProductFormDialogStatus] = useState(false);
    const [productToEdit, setProductToEdit] = useState(null);
    // const { userInfo } = useContext(UserContext);
    const [deleteProductFormDialogStatus , setDeleteProductFormDialogStatus] = useState(false)


    useEffect(() => {
        Api("products/").then((res) => {
                setProducts(res.data)
                console.log(res.data)
        });
    }, []);

    return (
        <div>
            <h1>Products</h1>
            {/* <p>This is the author page</p> */}
            <Button
                color="primary"
                variant="contained"
                onClick={() => {
                    setProductFormDialogStatus(true)
                }}
            >
                {" "}
                Add Product
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {products.map((item) => (
                        <TableRow>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.price} </TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() => {
                                        setProductFormDialogStatus(true);
                                        setProductToEdit(item);
                                       
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        setDeleteProductFormDialogStatus(true);
                                        
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {productFormDialogStatus && (
                <ProductForm
                    open={productFormDialogStatus}
                    author={productToEdit}
                    closeHandler={() => {
                        setProductFormDialogStatus(false)
                    }}
                    submit={(data) => {
                        setProductFormDialogStatus(false);
                        if (productToEdit) {
                            console.log("update");
                            console.log(data);
                            Api.put(
                                `product/${productToEdit.id}`,
                                data
                            ).then((res) => {
                                const index = products.indexOf(
                                    productToEdit
                                );
                                
                                const newProducts = [...products];
                                newProducts[index] = res.data;
                                // newAuthors[index].name=data.name;
                                // newAuthors[index].age=data.age;
                                setProductFormDialogStatus(false)
                                setProducts(newProducts)
                            });
                        } else {
                            console.log("create");
                            Api.post("products", data).then((response) => {
                                console.log(response);
                                //data.id = response.data.id
                                const newProducts = [...products]
                                newProducts.push(response.data);
                                setProductFormDialogStatus(false)
                                setProducts(newProducts)
                               
                            });
                        }
                    }}
                />
            )}
            {deleteProductFormDialogStatus && (
                <DeleteDialog
                    open={deleteProductFormDialogStatus}
                    onCancel={() => {
                        setDeleteProductFormDialogStatus(false)
                    }}
                    onDelete={() => {
                        Api.delete(
                            `products/${products.productToDelete.id}`
                        ).then(() => {
                            setDeleteProductFormDialogStatus(false)
                            const newProducts = [...products];
                            const filteredAuthors = newProducts.filter(
                                (item) =>
                                    item.id !== products.productToDelete.id
                            );
                            setProducts(newProducts)
                        });
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
