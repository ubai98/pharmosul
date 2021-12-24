import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

const ProductForm = (props) => {
    const [name, setName] = useState(props?.author?.name ?? "");
    const [age, setAge] = useState(props?.author?.age ?? 1);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const submitHandler = (e) => {
        e.preventDefault();
        props.author
            ? props.submit({
                  name,
                  age,
              })
            : props.submit({
                  name,
                  age,
                  email,
                  password,
              });
       
    };

    return (
        <Dialog fullWidth open={props.open} onClose={props.closeHandler}>
            <DialogTitle>
                {props.author ? "edit author" : "add author"}
            </DialogTitle>
            <form onSubmit={submitHandler}>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="name"
                        margin="dense"
                        id="name"
                        label="name"
                        value={name}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        name="age"
                        margin="dense"
                        id="age"
                        label="age"
                        value={age}
                        type="number"
                        onChange={(e) => setAge(e.target.value)}
                    />
                    {!props.author && (
                        <TextField
                            name="email"
                            margin="dense"
                            id="email"
                            label="email"
                            value={email}
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    )}

                    {!props.author && (
                        <TextField
                            name="password"
                            margin="dense"
                            id="password"
                            label="password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.closeHandler} color="primary">
                        cancel
                    </Button>
                    <Button type="submit" color="primary">
                        submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ProductForm;
