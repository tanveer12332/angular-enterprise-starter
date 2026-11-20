# Angular Enterprise Starter

Angular 18 + Standalone Components + Lazy Routes + Functional Guards/Interceptors + NgRx Signals Store.

## Run

```bash
npm install
npm start
```

Open http://localhost:4200

Login: koi bhi email/password (mock mode). Email mein `admin` likho to Users page ka access milega.

## Real backend

`src/environments/environment.ts` mein `useMock: false` karo aur `apiUrl` set karo.



## Structure

* `core/` — auth (store, guards, interceptor), layout, singleton services
* `shared/` — reusable UI, no business logic
* `features/` — lazy-loaded features (auth, dashboard, users), har ek apna routes + store
* `state/` — global stores (UI state)





src/

├── main.ts

├── app/

│   ├── app.component.ts

│   ├── app.config.ts            # providers (router, http, interceptors)

│   ├── app.routes.ts            # root routes (lazy)

│   │

│   ├── core/                    # singleton, app-wide cheezein (sirf 1 baar load)

│   │   ├── auth/

│   │   │   ├── auth.store.ts            # NgRx Signals Store

│   │   │   ├── auth.service.ts          # API calls

│   │   │   ├── auth.guard.ts            # authGuard, guestGuard

│   │   │   ├── role.guard.ts            # permission/role guard

│   │   │   ├── auth.interceptor.ts      # token attach + refresh

│   │   │   ├── token-storage.service.ts

│   │   │   └── auth.models.ts

│   │   ├── interceptors/

│   │   │   ├── error.interceptor.ts

│   │   │   └── loading.interceptor.ts

│   │   ├── services/

│   │   │   ├── api.service.ts           # base HttpClient wrapper

│   │   │   ├── notification.service.ts

│   │   │   └── logger.service.ts

│   │   ├── config/

│   │   │   ├── app-config.token.ts      # InjectionToken

│   │   │   └── environment.ts

│   │   └── layout/

│   │       ├── main-layout/

│   │       ├── auth-layout/

│   │       ├── header/

│   │       └── sidebar/

│   │

│   ├── shared/                  # reusable, no business logic

│   │   ├── ui/                  # button, modal, table, form-controls

│   │   ├── directives/

│   │   ├── pipes/

│   │   ├── utils/

│   │   └── models/

│   │

│   ├── features/                # business features (har ek lazy-loaded)

│   │   ├── auth/

│   │   │   ├── auth.routes.ts

│   │   │   ├── login/

│   │   │   ├── register/

│   │   │   └── forgot-password/

│   │   ├── dashboard/

│   │   │   ├── dashboard.routes.ts

│   │   │   └── dashboard.component.ts

│   │   ├── users/

│   │   │   ├── users.routes.ts

│   │   │   ├── data-access/

│   │   │   │   ├── users.api.ts

│   │   │   │   ├── users.store.ts       # feature-level signal store

│   │   │   │   └── users.models.ts

│   │   │   ├── pages/

│   │   │   │   ├── user-list/

│   │   │   │   └── user-detail/

│   │   │   └── components/

│   │   │       └── user-form/

│   │   └── orders/ ... (same pattern)

│   │

│   └── state/                   # global stores (agar chahiye)

│       ├── app.store.ts         # theme, language, sidebar state

│       └── ui.store.ts

│

├── assets/

├── environments/

└── styles/

&#x20;   ├── \_variables.scss

&#x20;   ├── \_mixins.scss

&#x20;   └── styles.scss

