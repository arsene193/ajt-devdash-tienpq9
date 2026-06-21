import { APIResponseProducts, Product } from "./types";
const API_BASE = 'https://dummyjson.com';

export async function fetchJson<T>(url:string) : Promise<T> {
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Server connection error (Status code: ${response.status})`);
    }
    const data: T = await response.json();
    return data;
}
export async function fetchDashboardData():Promise<[APIResponseProducts, string[]]> {
    return Promise.all([
        fetchJson<APIResponseProducts>(`${API_BASE}/products?limit=100`),
        fetchJson<string[]>(`${API_BASE}/products/category-list`)
    ]);
}

export async function fetchProductById(id:number):Promise<Product> {
    return fetchJson<Product>(`${API_BASE}/products/${id}`);
}