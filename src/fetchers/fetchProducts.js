import axios from "axios";

export function fetchProducts() {
    return axios.get("https://fakestoreapi.com/products").then((res) => {
        return res.data;
    });
}
