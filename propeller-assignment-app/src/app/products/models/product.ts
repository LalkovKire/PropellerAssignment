
export class Product {

    constructor(
        public id: number, 
        public name: string, 
        public description: string, 
        public createdAt: Date,
        public assets: Asset[],
        public variants: Variants[]) {

    }
}

export interface Asset {
    source: string;
}

export interface Variants {
    name: string;
    price: number;
    stockLevel: string;
    sku: string;
}