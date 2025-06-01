import { createRecordForm, recordGroup, recordNetTotal, recordRowTemplate, recordTax, recordTotal } from "./selectors";
import { products } from "./state";
import { v4 as uuidv4 } from 'uuid';

export const createRecordFormHandaler = (event) => {
    event.preventDefault();
    // console.log("U Submit Form");
    const formData = new FormData(createRecordForm);
    // console.log(formData.get("product_select"));
    // console.log(formData.get("quantity"));



    const currentProduct = products.find(({ id }) => id == formData.get
        ("product_select"));

    const isExitedRecord = document.querySelector(`[product-id='${currentProduct.id}']`);


    if (isExitedRecord == null) {
        recordGroup.append(createRecordRow(currentProduct, formData.get("quantity")));

    } else {
        Swal.fire({
            title: `Are you sure to add quantity to ${currentProduct.name} ?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        }).then((result) => {
            if (result.isConfirmed) {

                // recordGroup.querySelector(`#${rowId}`).remove();

                quantityAdd(isExitedRecord.getAttribute("row-id"),
                    parseInt(formData.get("quantity"))
                );



                Swal.fire({
                    title: "Added!",
                    text: "Your record has been added.",
                    icon: "success"
                });
            }
        });
    };

    createRecordForm.reset();


};



export const createRecordRow = ({ id, name, price }, quantity) => {
    const recordRow = recordRowTemplate.content.cloneNode(true);
    const recordProductName = recordRow.querySelector(".record-product-name");
    const recordProductPrice = recordRow.querySelector(".record-product-price");
    const recordProductQuantity = recordRow.querySelector(".record-product-quantity");
    const recordCost = recordRow.querySelector(".record-cost");

    const currentRecordRow = recordRow.querySelector(".record-row");
    currentRecordRow.setAttribute("product-id", id);
    currentRecordRow.setAttribute("row-id", uuidv4())

    recordProductName.innerText = name;
    recordProductPrice.innerText = price;
    recordProductQuantity.innerText = quantity;
    recordCost.innerText = price * quantity;

    return recordRow;
};

export const calculateTax = (amount, percentage = 5) =>
    (amount / 100) * percentage;

export const calculateRecordCostTotal = () => {
    let total = 0;
    recordGroup
        .querySelectorAll(".record-cost")
        .forEach((el) => (total += parseFloat(el.innerText)));
    return total;
};

export const removeRecord = (rowId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {

            // recordGroup.querySelector(`#${rowId}`).remove();

            const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
            currentRecordRow.remove();



            Swal.fire({
                title: "Deleted!",
                text: "Your record has been deleted.",
                icon: "success"
            });
        }
    });
};

export const quantityAdd = (rowId) => {
    const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
    const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
    const recordProductQuantity = currentRecordRow.querySelector(".record-product-quantity");
    const recordCost = currentRecordRow.querySelector(".record-cost");

    recordProductQuantity.innerText = parseInt(recordProductQuantity.innerText) + 1;
    recordCost.innerText = parseFloat(recordProductPrice.innerText) * parseInt(recordProductQuantity.innerText);
};

export const quantitySub = (rowId) => {
    const currentRecordRow = document.querySelector(`[row-id='${rowId}']`);
    const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
    const recordProductQuantity = currentRecordRow.querySelector(".record-product-quantity");
    const recordCost = currentRecordRow.querySelector(".record-cost");

    if (recordProductQuantity.innerText > 1) {
        recordProductQuantity.innerText = parseInt(recordProductQuantity.innerText) - 1;
        recordCost.innerText = parseFloat(recordProductPrice.innerText) * parseInt(recordProductQuantity.innerText);

    }
};

export const recordGroupHandaler = (event) => {
    if (event.target.classList.contains("record-remove")) {
        const currentRecordRow = event.target.closest(".record-row");
        removeRecord(currentRecordRow.getAttribute("row-id"));

    } else if (event.target.classList.contains("quantity-add")) {
        const currentRecordRow = event.target.closest(".record-row");
        quantityAdd(currentRecordRow.getAttribute("row-id"));
    }
    else if (event.target.classList.contains("quantity-sub")) {
        const currentRecordRow = event.target.closest(".record-row");
        quantitySub(currentRecordRow.getAttribute("row-id"));
    }
};

export const recordGroupObserver = () => {
    const observerOptions = {
        childList: true,
        subtree: true,
    };

    const updateTotal = () => {
        const total = calculateRecordCostTotal();
        const tax = calculateTax(total);
        recordTotal.innerText = total;
        recordTax.innerText = tax;
        recordNetTotal.innerText = total + tax;
    };

    const observer = new MutationObserver(updateTotal);
    observer.observe(recordGroup, observerOptions)
};