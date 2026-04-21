import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Stats {
    totalProducts: bigint;
    yearsInnovation: bigint;
    satisfaction: bigint;
    customers: bigint;
}
export type ProductId = string;
export interface CartItem {
    productId: ProductId;
    quantity: bigint;
}
export interface Product {
    id: ProductId;
    featured: boolean;
    name: string;
    description: string;
    imageEmoji: string;
    category: Category;
    price: bigint;
}
export enum Category {
    wearables = "wearables",
    audio = "audio",
    accessories = "accessories",
    hometech = "hometech",
    computing = "computing",
    mobile = "mobile"
}
export interface backendInterface {
    addToCart(productId: string): Promise<void>;
    clearCart(): Promise<void>;
    getCart(): Promise<Array<CartItem>>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProductById(id: string): Promise<Product | null>;
    getProducts(): Promise<Array<Product>>;
    getStats(): Promise<Stats>;
    removeFromCart(productId: string): Promise<void>;
}
