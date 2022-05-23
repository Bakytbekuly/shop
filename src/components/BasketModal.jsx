import {
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    styled
} from "@mui/material";
import { Box, Modal, Typography, Drawer } from "@mui/material";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DeleteIcon from '@mui/icons-material/Delete';


const StyledBox = styled(Box)`
width: 400px;
background: white;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
border: 1px solid #acacac;
box-shadow: 24px;
padding: 8px;
border-radius: 8px;
`;

const DrawerBox = styled(Box)`
width: 400px;
background: white;

`


export const BasketModal = ({ basket, onBasketItemCountChange, onBasketFullClear, priceAll, onDeleteItem, ...props }) => {

    return (
        <Modal {...props}
            anchor='right'
            open={props.open}
            onClose={props.onClose}

        >
            <StyledBox>
                <Typography

                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    align="center"

                >
                    Your Basket
                </Typography>

                <List
                    sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                >
                    {basket.map((item, index) => (
                        <>
                            {index !== 0 && (
                                <Divider
                                    key={"divider_" + item.id}
                                    variant="inset"
                                    component="li"
                                />
                            )}
                            <ListItem key={item.id} alignItems="flex-start">
                                <ListItemAvatar sx={{ mr: 1 }}>
                                    <img
                                        alt=""
                                        src={item.image}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "contain"
                                        }}
                                    />
                                </ListItemAvatar>
                                <ListItemText

                                    primary={`${item.title} x${item.count}`}
                                    secondary={
                                        <Typography
                                            sx={{ display: "inline" }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            ${item.price * item.count}
                                            {item.count > 1 && <>(${item.price} per item)</>}
                                        </Typography>
                                    }
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >
                                    <Button onClick={() => onBasketItemCountChange(item, 1)}>
                                        <KeyboardArrowUpIcon />
                                    </Button>
                                    {item.count}
                                    <Button onClick={() => onBasketItemCountChange(item, -1)}>
                                        <KeyboardArrowDownIcon />
                                    </Button>
                                </div>
                                <Button onClick={() => onDeleteItem(item)} ><DeleteIcon /></Button>

                            </ListItem>


                        </>
                    ))}
                    <Typography ml={1} mb={1} align='inherit'>Sum Total: ${priceAll}</Typography>
                    <Button onClick={() => onBasketFullClear()} >Basket Clear  <DeleteIcon /></Button>

                </List>
            </StyledBox>
        </Modal>
    );
};
