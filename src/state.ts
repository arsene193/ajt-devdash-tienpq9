import { AppState, FilterCriteria, Product } from "./types";
let currentState: AppState = {status:'idle'};

export function getState() : AppState{
    return{...currentState};
}
export function setState(newState : AppState) : void{
    currentState = newState;
}
export function assertNever(value: never): never {
  throw new Error(`Unexpected value in exhaustive type check: ${JSON.stringify(value)}`);
}

export function  applyFilters(products : Product[], filters : FilterCriteria) : Product[]{
    let result = [...products];

    if(filters.searchTerm.trim() !== ''){
        const keyword = filters.searchTerm.toLowerCase();
        result = result.filter(
            (p) => p.title.toLowerCase().includes(keyword) 
            || p.description.toLowerCase().includes(keyword) 
        )
    }
    if(filters.category !== 'all'){
        result = result.filter(
            (p) => p.category == filters.category
        )
    }
    if(filters.sortByPrice !== 'none'){
        result.sort((a,b)=>{
            return filters.sortByPrice == 'asc' ? a.price - b.price : b.price - a.price
        });
    }
    return result;    
    
}