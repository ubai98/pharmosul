
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";



const Product = ({ item }) => {

    return (
        <Link to={`/product/${item.id}`} style={{ textDecoration: "none" }}>
            <Card
                sx={{ maxWidth: 345 }}
                style={{ margin: "10px", borderRadius: "0.5px solid gray" }}
            >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        width="100%"
                        height="150"
                        image={item.img}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {item.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
};

export default Product;
