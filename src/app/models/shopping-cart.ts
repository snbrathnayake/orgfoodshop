import { ShoppingCartItem } from './shopping-cart-item';
import { ProductModel } from './product-model';

// ItemMapObject: { [ key: string ]: ShoppingCartItem }
export interface ItemMapObject {
    // array type : ShoppingCartItem
    [key: string]: ShoppingCartItem;
}

export class ShoppingCart {

    /**
     * array to keep object of items
     * properties : product & quantity
     */
    items: ShoppingCartItem[] = [];

    constructor(public itemMap: ItemMapObject) {
        // if null object pass => no items under shopping-cart
        this.itemMap = itemMap || {};

        for (const key in itemMap) {
            if (itemMap.hasOwnProperty(key)) {
                const item = itemMap[key];
                /**
                 * ({
                 *  title: item.title,
                 *  imageUrl: item.imageUrl ..../
                 * })
                 * ...item => will used spread operator in typescript
                 */
                this.items.push(new ShoppingCartItem({...item, $key: key}));
            }
        }
    }
    /**
     * send product detail to find the qty of it.
     * @param product
     */
    qtyInCart(product: ProductModel): number {
        const item = this.itemMap[product.$key];
        return item ? item.quantity : 0;
    }

    get totalPrice(): number {
        let sum = 0;
        const { items } = this;

        for (const itemKey in items) {
            if (items.hasOwnProperty(itemKey)) { sum += items[itemKey].quantity; }
        }
        return sum;
    }

    get totalItemsCount(): number {
        let count = 0;
        const { itemMap } = this;

        for (const itemKey in itemMap) {
            if (itemMap.hasOwnProperty(itemKey)) { count += itemMap[itemKey].quantity; }
        }
        return count;
    }

    /**
  * "-LTqzdd-NbbMMkqZR5I4" : { itemKey || key : ShoppingCartItem(type)
        "product" : {
        "category" : "fruits",
        "imageUrl" : "https://upload.wikimedia.org/wikipedia/commons/4/40/Watermelons.jpg",
        "price" : 1.2,
        "title" : "Watermelons"
        },
        "quantity" : 3
    },
     */
}
