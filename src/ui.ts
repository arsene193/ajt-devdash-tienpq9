import { fetchProductById } from './api';
import { assertNever, getState } from './state';
import { FilterCriteria, Product } from './types';
import { MemoryRegistry, formatUSD } from './utils';


const detailCache = new MemoryRegistry<number, Product>();
const elements = {
    controls: document.getElementById('controls') as HTMLDivElement,
    searchInput: document.getElementById('search-input') as HTMLInputElement,
    categoryFilter: document.getElementById('category-filter') as HTMLSelectElement,
    sortSelect: document.getElementById('sort-select') as HTMLSelectElement,
    loadingIndicator: document.getElementById('loading-indicator') as HTMLDivElement,
    errorIndicator: document.getElementById('error-indicator') as HTMLDivElement,
    productGrid: document.getElementById('product-grid') as HTMLDivElement,
    modal: document.getElementById('detail-modal') as HTMLDivElement,
    modalBody: document.getElementById('modal-body') as HTMLDivElement,
    closeModal: document.getElementById('close-modal') as HTMLButtonElement,
};

export function initModalEvents(): void {
    elements.closeModal.addEventListener('click', () => {
        elements.modal.classList.add('d-none');
        elements.modal.classList.remove('d-block');
    });

    window.addEventListener('click', (event) => {
        if (event.target === elements.modal) {
            elements.modal.classList.add('d-none');
            elements.modal.classList.remove('d-block');
        }
    });
}

async function showDetail(productId: number): Promise<void> {
    elements.modal.classList.remove('d-none');
    elements.modal.classList.add('d-block');
    elements.modalBody.innerHTML = `
    <div class="text-center py-4">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted mb-0">Loading details...</p>
    </div>
  `;

    try {
        let product: Product;

        if (detailCache.has(productId)) {
            product = detailCache.fetch(productId)!;
        } else {
            product = await fetchProductById(productId);
            detailCache.save(product);
        }

        const { title, description, price, category, rating, brand, thumbnail, stock } = product;

        elements.modalBody.innerHTML = `
      <div class="row g-4">
        <div class="col-md-5">
          <div class="modal-detail-img-wrapper border rounded">
            <img src="${thumbnail}" alt="${title}" class="modal-detail-img" />
          </div>
        </div>
        <div class="col-md-7 d-flex flex-column justify-content-between">
          <div>
            <span class="badge bg-primary mb-2 text-uppercase">${category}</span>
            <h3 class="h4 fw-bold text-dark mb-1">${title}</h3>
            <p class="text-muted small mb-3">Brand: <span class="fw-semibold">${brand || 'N/A'}</span></p>
            <p class="text-secondary" style="font-size: 0.95rem; line-height: 1.5;">${description}</p>
          </div>
          <div class="border-top pt-3 mt-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <span class="text-muted small d-block">Price</span>
                <span class="fs-3 fw-bold text-primary">${formatUSD(price)}</span>
              </div>
              <div class="text-end">
                <span class="badge bg-warning text-dark mb-1">★ ${rating}</span>
                <span class="text-muted small d-block">Stock: ${stock} units</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    } catch (error) {
        elements.modalBody.innerHTML = `
      <div class="alert alert-danger mb-0" role="alert">
        <h6 class="alert-heading fw-bold">An error occurred!</h6>
        <p class="mb-0 small">${error instanceof Error ? error.message : 'Could not load product details.'}</p>
      </div>
    `;
    }
}


function createProductCard(product: Product): HTMLDivElement {
    const { id, title, price, category, rating, thumbnail } = product;
    const col = document.createElement('div');
    col.className = 'col';

    col.innerHTML = `
    <div class="card h-100 product-card border shadow-sm rounded-3 overflow-hidden">
      <div class="card-img-wrapper border-bottom">
        <img src="${thumbnail}" alt="${title}" class="card-img-custom" loading="lazy" />
      </div>
      <div class="card-body d-flex flex-column p-3">
        <span class="badge bg-light text-primary text-uppercase border align-self-start mb-2 px-2 py-1" style="font-size: 0.7rem;">
          ${category}
        </span>
        <h6 class="card-title text-dark fw-bold mb-2 text-truncate-2" style="height: 2.4rem; font-size: 0.95rem; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
          ${title}
        </h6>
        <div class="mt-auto d-flex justify-content-between align-items-center pt-2 border-top">
          <span class="text-primary fw-bold fs-5">${formatUSD(price)}</span>
          <span class="text-warning small fw-bold">★ ${rating}</span>
        </div>
      </div>
    </div>
  `;

    col.querySelector('.product-card')?.addEventListener('click', () => showDetail(id));
    return col;
}


function populateCategories(categories: string[]): void {
    if (elements.categoryFilter.options.length > 1) return;
    categories.forEach((cat) => {
        const opt = document.createElement(`option`);
        opt.value = cat;
        opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        elements.categoryFilter.appendChild(opt);
    })
}

export function renderUI(): void {
    const state = getState();
    switch (state.status) {
        case 'idle':
            elements.loadingIndicator.classList.add('d-none');
            elements.errorIndicator.classList.add('d-none');
            elements.controls.classList.add('d-none');
            elements.productGrid.innerHTML = '';
            break;

        case 'loading':
            elements.loadingIndicator.classList.remove('d-none');
            elements.errorIndicator.classList.add('d-none');
            elements.controls.classList.add('d-none');
            elements.productGrid.innerHTML = '';
            break;
        case 'error':
            elements.loadingIndicator.classList.add('d-none');
            elements.errorIndicator.classList.remove('d-none');
            elements.errorIndicator.textContent = state.message;
            elements.controls.classList.add('d-none');
            elements.productGrid.innerHTML = '';
            break;
        case 'success': {
            elements.loadingIndicator.classList.add('d-none');
            elements.errorIndicator.classList.add('d-none');
            elements.controls.classList.remove('d-none');

            populateCategories(state.categories);
            elements.productGrid.innerHTML = '';

            if (state.filteredProducts.length === 0) {
                elements.productGrid.innerHTML = `
          <div class="col-12 text-center py-5">
            <p class="text-muted mb-0 fs-5">No products matched your search criteria.</p>
          </div>
        `;
            } else {
                const fragment = document.createDocumentFragment();
                state.filteredProducts.forEach((product) => {
                    const cardCol = createProductCard(product);
                    fragment.appendChild(cardCol);
                });
                elements.productGrid.appendChild(fragment);
            }
            break;
        }
         default:
            assertNever(state);
    }
}
export function setupInputListeners(onFilterChange: (filters: FilterCriteria) => void): void {
    const triggerUpdate = () => {
        onFilterChange({
            searchTerm: elements.searchInput.value,
            category: elements.categoryFilter.value,
            sortByPrice: elements.sortSelect.value as 'none' | 'asc' | 'desc',
        });
    };

    elements.searchInput.addEventListener('input', triggerUpdate);
    elements.categoryFilter.addEventListener('change', triggerUpdate);
    elements.sortSelect.addEventListener('change', triggerUpdate);
}