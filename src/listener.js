import { checkoutHandaler, manageInventoryBtnHandaler, removeSideBarBtnHandaler } from "./handaler"
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandaler, recordGroupHandaler } from "./record";
import {addNewProductBtn, checkout, createRecordForm, manageInventoryBtn, recordGroup, removeSIdeBarBtn } from "./selectors"

const listener = () => {
    manageInventoryBtn.addEventListener("click", manageInventoryBtnHandaler);
    removeSIdeBarBtn.addEventListener("click",removeSideBarBtnHandaler);
    addNewProductBtn.addEventListener("click", addNewProductBtnHandler);
    createRecordForm.addEventListener("submit", createRecordFormHandaler);
    recordGroup.addEventListener("click", recordGroupHandaler);
    checkout.addEventListener("click", checkoutHandaler);
};

export default listener;