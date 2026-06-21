export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}
export interface APIResponseProducts {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
export type ProductPreview = Omit<Product, 'images' | 'discountPercentage' | 'stock' | 'brand'>;
export interface FilterCriteria {
    searchTerm: string;
    category: string;
    sortByPrice: 'none' | 'asc' | 'desc';
}
export type AppState =
    | { status: 'idle' }
    | { status: 'loading' }
    | {
        status: 'success';
        products: Product[];
        categories: string[];
        filters: FilterCriteria;
        filteredProducts: Product[];
    }
    | { status: 'error'; message: string };