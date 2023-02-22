const db = require('../db');

module.exports = class ProductModel {

  //Gets all Products
  async find(options = {}) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM products`;
      const values = [];

      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];

    } catch(err) {
      throw err;
    }
  }

  /**
   * Retrieve product by ID
   * @param  {Object}      id [Product ID]
   * @return {Object|null}    [Product record]
   */
  async findOne(id) {
    try {
      // Generate SQL statement
      const statement = `SELECT *
                         FROM products
                         WHERE id = $1`;
      const values = [id];

      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0]
      }
  
      return null;

    } catch(err) {
      throw err;
    }
  }
}