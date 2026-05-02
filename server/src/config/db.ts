import Database from "better-sqlite3";
console.log("Initializing database...");
const db = new Database("store.db");

db.pragma("foreign_keys = ON");

const tables = db
  .prepare(
    `
  SELECT name FROM sqlite_master WHERE type='table'
`,
  )
  .all();

console.log(tables);


//user
db.prepare(
  `
  
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE, 
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer'
);
`,
).run();

//product
db.prepare(
  `
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    imageUrl TEXT NOT NULL,
    category TEXT NOT NULL,
    subcategory TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    soldAmount INTEGER NOT NULL DEFAULT 0

);
`,
).run();

//productvariant
db.prepare(
  `
CREATE TABLE IF NOT EXISTS product_variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER NOT NULL,
    size TEXT NOT NULL,
    stock INTEGER NOT NULL,
    FOREIGN KEY (productId) REFERENCES products(id) on DELETE CASCADE
);
`,
).run();

//order
db.prepare(
  `
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    totalPrice REAL NOT NULL,
    shippingFees REAL NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT "pending",
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (userId) REFERENCES users(id)
);
`,
).run();

//orderitems
db.prepare(
  `
CREATE TABLE IF NOT EXISTS order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    orderId INTEGER NOT NULL,
    productVariantId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (productVariantId) REFERENCES product_variants(id)
);
`,
).run();

//cartitems
db.prepare(
  `
CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT ,
    userId INTEGER NOT NULL,
    productVariantId INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (productVariantId) REFERENCES product_variants(id)
);
`,
).run();


//contact us
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS contact_us (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt TEXT NOT NULL DEFAULT (datetime('now'))
  );
`,
).run();


export default db;
