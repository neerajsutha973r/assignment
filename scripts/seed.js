require("dotenv").config();

const pool = require("../src/db");

const categories = [
  "Electronics",
  "Books",
  "Clothing",
  "Sports",
  "Home"
];

async function seed() {
  const batchSize = 5000;

  for (let batch = 0; batch < 40; batch++) {

    const values = [];
    const placeholders = [];

    for (let i = 0; i < batchSize; i++) {

      const name = `Product-${batch}-${i}`;

      const category =
        categories[Math.floor(Math.random() * categories.length)];

      const price =
        (Math.random() * 1000).toFixed(2);

      const now = new Date(Date.now() - Math.floor(Math.random() * 1000000000));

      const index = values.length;

      placeholders.push(
        `($${index + 1},
          $${index + 2},
          $${index + 3},
          $${index + 4},
          $${index + 5})`
      );

      values.push(
        name,
        category,
        price,
        now,
        now
      );
    }

    await pool.query(
      `
      INSERT INTO products
      (
        name,
        category,
        price,
        created_at,
        updated_at
      )
      VALUES
      ${placeholders.join(",")}
      `,
      values
    );

    console.log(`Batch ${batch + 1} inserted`);
  }

  process.exit();
}

seed();