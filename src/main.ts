import '../style.css';
import { fetchDashboardData } from './api';
import { applyFilters, getState, setState } from './state';
import { FilterCriteria } from './types';
import { initModalEvents, renderUI, setupInputListeners } from './ui';
import { debounce } from './utils';
async function loadDashboard(): Promise<void> {
  setState({ status: 'loading' });
  renderUI();
  try {
    const [rawProducts, categories] = await fetchDashboardData();
    setState({
      status: 'success',
      products: rawProducts.products,
      categories: categories,
      filters: {
        searchTerm: '',
        category: 'all',
        sortByPrice: 'none',
      },
      filteredProducts: rawProducts.products,
    });
    renderUI();
  } catch (error) {
    setState({
      status: 'error',
      message: error instanceof Error ? error.message : 'An error occurred while loading dashboard data.',
    });
    renderUI();
  }
}
const handleFilterChange = debounce((newFilters: FilterCriteria) => {
  const state = getState();
  if (state.status === 'success') {
    const nextFiltered = applyFilters(state.products, newFilters);

    setState({
      ...state,
      filters: newFilters,
      filteredProducts: nextFiltered,
    });

    renderUI();
  }
}, 300);
document.addEventListener('DOMContentLoaded', () => {
  initModalEvents();
  setupInputListeners(handleFilterChange);
  loadDashboard();
});
