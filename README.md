<img width="1786" height="645" alt="image" src="https://github.com/user-attachments/assets/79cfaa8b-8bd8-445b-9630-8f94536c6178" />

# DevDash — Typed Async Dashboard

DevDash is a single-page data dashboard built using vanilla TypeScript and Bootstrap 5. The application fetches real-time product data asynchronously, transforms datasets on the client side using higher-order functions, and leverages advanced TypeScript features such as discriminated unions, generic constraints, and utility types for robust compile-time safety.

- **Demo URL:** [https://fef-shoplite-tienpq9.vercel.app](https://fef-shoplite-tienpq9.vercel.app/)
- **GitHub Repository:** [https://github.com/arsene193/fef-shoplite-tienpq9](https://github.com/arsene193/fef-shoplite-tienpq9)

## 📸 Screenshots
- **Homepage:**


- **List Products:**


- **Product Details:**




## 🛠️ Local Run Instructions

To run this project locally on your machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/arsene193/fef-shoplite-tienpq9.git
   ```
2. Navigate into the project folder:
   ```bash
   cd fef-shoplite-tienpq9
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser at `http://localhost:5173`

## 📝 Features Checklist (Self-Evaluation)

### 🟢 Pass Tier (Completed)
- [x] **Strict Compiler Compliance**: Built and compiled with `"strict": true` enabled in `tsconfig.json`, zero type errors.
- [x] **Domain Data Modeling**: Defined TypeScript interfaces (`Product`, `APIResponseProducts`) for all external API payloads, no `any` used for domain data.
- [x] **Async/Await Fetching**: List data loaded via native `async/await` syntax, updating the DOM directly without blocking the UI.
- [x] **Explicit Annotations**: All function parameters, return types, and local interfaces are fully type-annotated.
- [x] **Robust Error State**: API and network exceptions handled with `try/catch`, surfacing a visible error banner in the UI.
- [x] **Detailed Product View**: Individual product details loaded dynamically by `id`, rendered inside a modal layout.

### 🟡 Good Tier (Completed)
- [x] **HOF Search & Filter**: Search, category filtering, and price sorting implemented using array higher-order functions (`filter`, `sort`).
- [x] **Generic Fetch Helper**: Built a reusable `fetchJson<T>()` helper enforcing type safety on any returned JSON payload.
- [x] **Parallel Data Loading**: Used `Promise.all` to fetch the products list and category list concurrently during bootstrap.
- [x] **Union State Pattern**: Application state modeled via a discriminated union `AppState` (`idle | loading | success | error`).

### 🔵 Excellent Tier (Completed)
- [x] **Exhaustive Narrowing**: Applied exhaustive type narrowing via `assertNever()` to guarantee compile-time safety across all state branches.
- [x] **TS Utility Types**: Used `Omit` to derive `ProductPreview`  from the base `Product` type.
- [x] **Generic Constraint Registry**: Implemented `MemoryRegistry<K, T extends Identifiable<K>>`, a generic in-memory cache used for detail-view caching.
- [x] **Optimized Closures**: Implemented a debounced search input listener and a memoized currency formatter to improve execution efficiency.
- [x] **Clean Modular Architecture**: Logic separated into single-responsibility modules (`api.ts`, `state.ts`, `ui.ts`, `types.ts`, `utils.ts`) with clear local run instructions.




