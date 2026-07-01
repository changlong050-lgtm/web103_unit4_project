# WEB103 Project 4 - *Bolt Bucket*

Submitted by: **Liam Wu**

About this web app: **Bolt Bucket is a car customizer app where users can build their own custom car by choosing from options for exterior color, roof, wheels, and interior. Users can toggle convertible mode, which restricts incompatible roof options. Each saved car is stored in a PostgreSQL database and can be viewed, edited, or deleted.**

Time spent: **10** hours

## Required Features

The following **required** functionality is completed:

- [x] **The web app uses React to display data from the API.**
- [x] **The web app is connected to a PostgreSQL database, with an appropriately structured `CustomItem` table.**
  - [x] **NOTE: Your walkthrough added to the README must include a view of your Render dashboard demonstrating that your Postgres database is available**
  - [x] **NOTE: Your walkthrough added to the README must include a demonstration of your table contents. Use the psql command 'SELECT * FROM tablename;' to display your table contents.**
- [x] **Users can view multiple features of the `CustomItem` (e.g. car) they can customize (e.g. wheels, exterior, etc.)**
- [x] **Each customizable feature has multiple options to choose from (e.g. exterior could be red, blue, black, etc.)**
- [x] **On selecting each option, the displayed visual icon for the `CustomItem` updates to match the option the user chose.**
- [x] **The price of the `CustomItem` changes dynamically as different options are selected.**
- [x] **The visual interface changes in response to at least one customizable feature.**
- [x] **The user can submit their choices to save the item to the list of created `CustomItem`s.**
- [x] **If a user submits a feature combo that is impossible, they should receive an appropriate error message and the item should not be saved to the database.**
- [x] **Users can view a list of all submitted `CustomItem`s.**
- [x] **Users can edit a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can delete a submitted `CustomItem` from the list view of submitted `CustomItem`s.**
- [x] **Users can update or delete `CustomItem`s that have been created from the detail page.**

The following **optional** features are implemented:

- [x] Selecting particular options prevents incompatible options from being selected even before form submission

The following **additional** features are implemented:

- [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented required features:

GIF created with **LICECap**

## Notes

### What I learned building this app

**Database design comes second, not first.** I first had to understand what the app does — its features and pages — before I could design the tables. The schema sits at the bottom of everything; changing a column later means updating reset.js, models, controllers, and the frontend.

**Two tables: `options` and `cars`.**
- `options` stores every selectable choice (exterior colors, roofs, wheels, interiors) with category, name, and price. It's read-only — users never create or delete options.
- `cars` stores each saved car with 4 foreign keys pointing to `options(id)` — one per category.
- `options` must be seeded before `cars` because of the foreign key dependency.

**The convertible/coupe rule** — some roofs are convertible-only (Dual Roof, Transparent Roof), others are coupe-only. Since there are only 5 roofs total, this rule is hardcoded in the frontend as arrays rather than adding an extra column to the database.

**`await` matters in reset.js** — without it, `seedOptions` and `seedCars` could run before the tables even exist, breaking foreign key references. `await` ensures: tables created → options inserted → cars inserted.

**SSL on Render** — Render's hosted PostgreSQL requires SSL. The database config must include `ssl: { rejectUnauthorized: false }`. Without it, the connection is rejected. `rejectUnauthorized: false` skips certificate verification, which is fine for a small project.

**dotenv and script order** — `"reset": "cd config && node --require dotenv/config reset.js"` first `cd`s into the config directory so the relative path `'../.env'` correctly resolves to `server/.env`, then loads env variables before running the reset script.

**onClick must be a function reference**, not a function call:
- ❌ `onClick={carsApi.deleteCar(id)}` — calls immediately, passes the result (an object) as the handler
- ✅ `onClick={() => carsApi.deleteCar(id)}` — passes a function that calls it on click

**Promise.all for parallel fetching** — when loading a car's detail page, all 4 option lookups (exterior, roof, wheels, interior) run in parallel with `Promise.all` instead of one by one, which is faster.

### Challenges

- SSL configuration went back and forth between "SSL required" and "SSL not supported" — root cause was that environment variables weren't loading correctly, so the DB was connecting to a wrong host.
- Foreign key order in reset.js: had to drop `cars` before `options`, and create/seed `options` before `cars`.
- `npm run dev` didn't work until `--require dotenv/config` was added to the nodemon command in the root `package.json`.



## License

Copyright [2026] [Liam Wu]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
