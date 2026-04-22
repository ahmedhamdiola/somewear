import Database from "better-sqlite3";
console.log("Initializing database...");
const db = new Database("store.db");

db.pragma("foreign_keys = ON");


const tables = db.prepare(`
  SELECT name FROM sqlite_master WHERE type='table'
`).all();

console.log(tables);
//user
db.prepare(
  `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE, 
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  address TEXT,
  phone TEXT ,
  role TEXT NOT NULL DEFAULT 'customer'
);
`,
).run();

//product
db.prepare(
  `
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    imageUrl TEXT,
    category TEXT,
    subcategory TEXT
);
`,
).run();

//productvariant
db.prepare(
  `
CREATE TABLE IF NOT EXISTS product_variants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER NOT NULL,
    size TEXT,
    color TEXT,
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
    TotalPrice REAL NOT NULL,
    ShippingFees REAL NOT NULL,
    city TEXT NOT NULL,
    address TEXT NOT NULL,
    phone TEXT NOT NULL,
    status TEXT NOT NULL,
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
    product_variant_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    price REAL NOT NULL,
    FOREIGN KEY (orderId) REFERENCES orders(id),
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);
`,
).run();

//cart
db.prepare(
  `
CREATE TABLE IF NOT EXISTS carts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id)

);
`,
).run();

//cartitems
db.prepare(
  `
CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cartId INTEGER NOT NULL,
    product_variant_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (cartId) REFERENCES carts(id),
    FOREIGN KEY (product_variant_id) REFERENCES product_variants(id)
);
`,
).run();

export default db;
