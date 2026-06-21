<img width="1749" height="864" alt="image" src="https://github.com/user-attachments/assets/6cb5c254-c5e6-4121-870e-583dc73a195b" />


# DevDash — Typed Async Dashboard

DevDash is a single-page data dashboard built using vanilla TypeScript. The application fetches real-time product data asynchronously, transforms datasets on the client side using higher-order functions, and leverages advanced TypeScript features such as discriminated unions, generic constraints, and utility types for robust compile-time safety.

- **Demo URL:** [https://ajt-devdash-tienpq9.vercel.app](https://ajt-devdash-tienpq9.vercel.app)
- **GitHub Repository:** [https://github.com/arsene193/ajt-devdash-tienpq9](https://github.com/arsene193/ajt-devdash-tienpq9)

## 📸 Screenshots
- **Homepage:**

<img width="1749" height="864" alt="image" src="https://github.com/user-attachments/assets/6cb5c254-c5e6-4121-870e-583dc73a195b" />

- **List Products:**
<img width="1743" height="866" alt="image" src="https://github.com/user-attachments/assets/b2e677e4-b9d2-49f7-9eed-e81bd1f66514" />


- **Product Details:**

<img width="1396" height="831" alt="image" src="https://github.com/user-attachments/assets/e2840e42-da67-41c6-8129-acc694a70fd2" />



## 🛠️ Local Run Instructions

To run this project locally on your machine:

1. Clone the repository:
   ```bash
   git clone https://github.com/arsene193/ajt-devdash-tienpq9.git
   ```
2. Navigate into the project folder:
   ```bash
   cd ajt-devdash-tienpq9
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




