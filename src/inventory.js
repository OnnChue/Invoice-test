import { newProductName, newProductPrice, productCardTemplate, productGroup, productSelect } from "./selectors";
import { v4 as uuidv4 } from 'uuid';
import { products } from "./state";


export const addNewProductBtnHandler = () => {
    const createId = uuidv4();
      
    productGroup.append(
        createProductCard(createId, newProductName.value, newProductPrice.valueAsNumber)

    );

    productSelect.append(new Option(`${newProductName.value} - ${newProductPrice.valueAsNumber}`,createId));

    

    products.push({
        id: createId,
        name: newProductName.value,
        price: newProductPrice.valueAsNumber,
    });


    newProductName.value = null;
    newProductPrice.value = null;
};

export const productRender = (products) => {
    products.forEach(({id, name, price}) => {
        productGroup.append(createProductCard(id, name, price));
        productSelect.append(new Option(`${name} - ${price}`, id));
    }

    );
};

export const createProductCard = (id, name, price) => {

    //create new product
    const productCard = productCardTemplate.content.cloneNode(true);
    const productName = productCard.querySelector(".product-name");
    const productPrice = productCard.querySelector(".product-price");
    const currentproductCard = productCard.querySelector(".product-card")

    currentproductCard.id = uuidv4();

    productName.innerText = name;
    productPrice.innerText = price + " " + "MMK";


    return productCard;
};