import { productRender } from "./inventory";
import { products } from "./state";

const innitialRender = () => {
    // console.log(productSideBar.classList.remove("translate-x-full"));
    productRender(products);
}

export default innitialRender;