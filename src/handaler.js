import { productSideBar } from "./selectors";


export const manageInventoryBtnHandaler = () => {
    productSideBar.classList.remove("translate-x-full");
    productSideBar.classList.add("duration-300");

}

export const removeSideBarBtnHandaler = () => {
    productSideBar.classList.add("translate-x-full");
    productSideBar.classList.add("duration-300");
}

export const checkoutHandaler = () => {
    console.log("Checkout");
    window.print();
}