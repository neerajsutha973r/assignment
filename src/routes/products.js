const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {
  try {

    const limit = Number(req.query.limit) || 20;

    const category = req.query.category;

    const cursorUpdatedAt = req.query.cursorUpdatedAt;

    const cursorId = Number(req.query.cursorId);

    let query = `
      SELECT *
      FROM products
    `;

    const values = [];
    const conditions = [];

    // Category filter
    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    // Cursor pagination
    if (cursorUpdatedAt && cursorId) {

      values.push(cursorUpdatedAt);
      const updatedIndex = values.length;

      values.push(cursorId);
      const idIndex = values.length;

      conditions.push(`
      (
        updated_at < $${updatedIndex}
        OR
        (
          updated_at = $${updatedIndex}
          AND id < $${idIndex}
        )
      )
      `);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }

    values.push(limit);

    query += `
      ORDER BY updated_at DESC, id DESC
      LIMIT $${values.length}
    `;

    const result = await pool.query(query, values);

    const products = result.rows;

    let nextCursor = null;

    if (products.length > 0) {

      const last = products[products.length - 1];

      nextCursor = {
        updated_at: last.updated_at,
        id: last.id
      };
    }

    res.json({
      count: products.length,
      nextCursor,
      data: products
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Server Error"
    });
  }
});


router.post("/", async (req, res) => {
  try {
    const { name, category, price } = req.body;

    const result = await pool.query(
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
      (
        $1,
        $2,
        $3,
        NOW(),
        NOW()
      )
      RETURNING *
      `,
      [name, category, price]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Server Error"
    });
  }
});

module.exports = router;