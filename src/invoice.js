import innitialRender from "./intialRender";
import listener from "./listener";
import observer from "./observer";


class Invoice {
    init(){
        console.log("Invoice app start");
        listener();
        innitialRender();
        observer();
    }
}

export default Invoice;