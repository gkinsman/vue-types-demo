import { CartItem } from '../store/CartModule';
export interface Product {
    id: number
    title: string
    price: number
    inventory: number
}

const _products = [
    { id: 1, title: "iPad 4 Mini", price: 500.01, "inventory": 2 },
    { id: 2, title: "H&M T-Shirt White", price: 10.99, "inventory": 10 },
    { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, "inventory": 5 }
]

export namespace Shop {
    export function getProducts(): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(_products), 100)
        });
    }

    export function buyProducts(products: CartItem[]) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
                    ? resolve()
                    : reject()
            }, 100)
        })
    }
}