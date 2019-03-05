export class Product{
    constructor(
        public $key:string,
        public code:string,
        public name:string,
        public brand:string,
        public quantity:string,
        public price:string,
        public description:string,
        public image:string,
        public sl:string,
        public totalPrice: string
    ){    }


    static fromJSon({$key, code, name, brand, quantity, price, description, image, sl, totalPrice}):Product{
        return new Product(
            $key, 
            code, 
            name, 
            brand, 
            quantity, 
            price, 
            description, 
            image,
            sl,
            totalPrice);
    }

    static fromJSonArray(json : any[]): Product[]{
        return json.map(Product.fromJSon);
    }
}