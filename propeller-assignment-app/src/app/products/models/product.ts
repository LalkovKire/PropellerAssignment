
export class Product {

    constructor(
        public id: number, 
        public name: string, 
        public description: string, 
        public createdAt: Date,
        public assets: Asset[]) {

    }
}

export interface Asset {
    source: string;
}