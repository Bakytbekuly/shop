import { IconButton, styled } from "@mui/material";
import { Container, Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { fetchProducts } from "../fetchers/fetchProducts";
import { ProductItem } from "./ProductItem";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { BasketModal } from "./BasketModal";

const BasketButton = styled(IconButton)`
  position: fixed;
  right: 10px;
  top: 10px;
  border: 1px solid currentColor;
`;
export const ShopModule = () => {
    const [products, setProducts] = useState([]);
    const [openBasket, setOpenBasket] = useState(false);
    const [basket, setBasket] = useState([]);
    const [priceAll, setPrice] = useState([])



    useEffect(() => {
        fetchProducts().then(setProducts);

    }, []);


    // console.log(basket);
    let allprice = []
    const handleAddToBasket = useCallback(
        (product) => {
            const newBasket = [...basket];
            const elem = newBasket.find((item) => item.id === product.id);
            if (elem) {
                elem.count += 1;

            } else {
                newBasket.push({
                    ...product,
                    count: 1
                });

            }
            setBasket(newBasket);
            All(newBasket)

        },
        [basket]
    );

    const handleBasketItemCount = useCallback(
        (product, increment) => {
            const newBasket = [...basket];
            const elem = newBasket.find((item) => item.id === product.id);
            if (elem) {
                elem.count += increment;
                setBasket(newBasket);
            }
            if (elem?.count === 0) {
                setBasket(newBasket.filter((item) => item.id !== product.id));
            }
            All(newBasket)
        },
        [basket]
    );

    const handleBasketFullClear = () => {
        setBasket([])
        setPrice([])
    }

    const handleDeleteItem = (elem) => {

        const newBasket = [...basket]

        let newarr = newBasket.filter((item) => {
            if (item.title == elem.title) {
                return false
            }
            else {
                return true
            }
        })
        console.log(newarr);
        setBasket(newarr)
        All(newarr)

    }

    function All(newBasket) {

        allprice = newBasket.map((item) => {
            return item.price * item.count
        })
        setPrice(allprice.reduce((acc, item) => {
            return (acc + item)
        }, 0))
    }




    return (
        <>
            <BasketButton
                color="primary"
                size="large"
                onClick={() => setOpenBasket(true)}
            >
                <ShoppingBasketIcon />
            </BasketButton>
            <BasketModal
                open={openBasket}
                onClose={() => setOpenBasket(false)}
                basket={basket}
                priceAll={priceAll}
                onBasketItemCountChange={handleBasketItemCount}
                onBasketFullClear={handleBasketFullClear}
                onDeleteItem={handleDeleteItem}
            />
            <Container>
                <Grid container gap={2} justifyContent="center">
                    {products.map((product) => (
                        <Grid item xs={6} sm={4} md={3} key={product.id}>
                            <ProductItem
                                product={product}
                                onAddToBasket={() => handleAddToBasket(product)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};
