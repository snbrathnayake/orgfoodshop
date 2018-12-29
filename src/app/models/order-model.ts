import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
    datePlaced: number;
    items: any[];
    /**
     *
     * @param userId: public set value from checkout-componet (no responsibility to set uid at here)
     * @param shipping: public set value from checkout-componet
     * @param shoppingCart
     */
    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        // here inclued : userId
        // here inclued : shipping
        this.datePlaced = new Date().getTime();
        this.items = shoppingCart.items.map((i: ShoppingCartItem) => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            };
        });
    }
}
