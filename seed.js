import chalk from "chalk";
import sequelize from "./db/index.js";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";
import "./db/associations.js";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seed() {
  try {
    await sequelize.sync({ force: true }); 
    console.log(chalk.bgCyan("DB synced"));

    const users = await User.bulkCreate(
      [
        { name: "Alice", email: "alice@example.com", password: "password1" },
        { name: "Bob", email: "bob@example.com", password: "password2" },
        { name: "Charlie", email: "charlie@example.com", password: "password3" },
        { name: "Diana", email: "diana@example.com", password: "password4" },
        { name: "Ethan", email: "ethan@example.com", password: "password5" },
        { name: "Fiona", email: "fiona@example.com", password: "password6" },
        { name: "George", email: "george@example.com", password: "password7" },
        { name: "Hannah", email: "hannah@example.com", password: "password8" },
        { name: "Ivan", email: "ivan@example.com", password: "password9" },
        { name: "Julia", email: "julia@example.com", password: "password10" }
      ],
      { returning: true }
    );

    console.log(chalk.bgGreen("Users created"));


    const categories = await Category.bulkCreate(
      [
        { name: "Electronics" },
        { name: "Software" },
        { name: "Computers" },
        { name: "Accessories" },
        { name: "Components" }
      ],
      { returning: true }
    );

    console.log(chalk.bgGreen("Categories created"));

    const products = await Product.bulkCreate(
      [
        { name: "Smartphone", description: "Latest 5G smartphone", price: 699.99, categoryId: categories[0].id },
        { name: "Laptop", description: "High-performance laptop", price: 1199.99, categoryId: categories[2].id },
        { name: "Wireless Mouse", description: "Ergonomic wireless mouse", price: 29.99, categoryId: categories[3].id },
        { name: "Mechanical Keyboard", description: "RGB gaming keyboard", price: 89.99, categoryId: categories[3].id },
        { name: "Antivirus Software", description: "Complete protection suite", price: 49.99, categoryId: categories[1].id },
        { name: "Operating System", description: "Latest OS version", price: 139.99, categoryId: categories[1].id },
        { name: "Graphics Card", description: "High-end GPU for gaming", price: 499.99, categoryId: categories[4].id },
        { name: "Processor", description: "Multi-core CPU", price: 299.99, categoryId: categories[4].id },
        { name: "Tablet", description: "Lightweight 10-inch tablet", price: 349.99, categoryId: categories[0].id },
        { name: "Headphones", description: "Noise-cancelling headphones", price: 149.99, categoryId: categories[3].id }
      ],
      { returning: true }
    );

    console.log(chalk.bgGreen("Products created"));

    for (const user of users) {
      // Jeder User bekommt 1–3 Orders
      const orderCount = getRandomInt(1, 3);

      for (let i = 0; i < orderCount; i++) {
        // Pro Order zufällig 2–4 Produkte
        const productCount = getRandomInt(2, 4);
        const orderProducts = [];

        const chosen = new Set();
        while (orderProducts.length < productCount) {
          const randomProduct = products[getRandomInt(0, products.length - 1)];
          if (!chosen.has(randomProduct.id)) {
            chosen.add(randomProduct.id);
            orderProducts.push({
              productId: randomProduct.id,
              quantity: getRandomInt(1, 3)
            });
          }
        }

        // Total berechnen
        const total = orderProducts.reduce((sum, item) => {
          const product = products.find(p => p.id === item.productId);
          return sum + product.price * item.quantity;
        }, 0);

        await Order.create({
          userId: user.id,
          products: orderProducts,
          total
        });
      }
    }

    console.log(chalk.bgCyan("Random Orders created for all users"));
    console.log(chalk.bgMagenta("Seed data successfully inserted"));
    process.exit(0);
  } catch (error) {
    console.error(chalk.bgRed("Error during seeding:"), error);
    process.exit(1);
  }
}

seed();
