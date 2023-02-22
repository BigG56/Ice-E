const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartItemModel {

  static async create(data) {
    try {
        //console.log(data)
    
      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(data, null, 'cartitems') + 'RETURNING *';
     
      // Execute SQL statment
      const result = await db.query(statement);
        if (result.rows?.length) {
          return result.rows[0];
        }
    
        return null;
    
        } catch(err) {
          throw new Error(err);
        }
    }

  // Updates cart items
  static async update(qty, cartitemid) {
    try {

      // Generate SQL statement
      const statement = `UPDATE cartitems 
                         SET qty = $1
                         WHERE id = $2`;
      const values = [qty, cartitemid]
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  // Get cart items for cart
  static async find(cartId) {
    try {

      // Generate SQL statement
      const statement = `SELECT 
                            cartitems.qty,
                            cartitems.id AS cartItemId, 
                            products.*
                         FROM cartitems
                         INNER JOIN products ON products.id = cartitems.productid
                         WHERE cartid = $1`
      const values = [cartId];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];

    } catch(err) {
      throw new Error(err);
    }
  }

  // Deletes cart item line
  static async delete(cartitemid) {
    try {

      // Generate SQL statement
      const statement = `DELETE
                         FROM cartitems
                         WHERE id = $1
                         RETURNING *`;
      const values = [cartitemid];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  static async deleteAll(cartId) {
    try {

      // Generate SQL statement
      const statement = `DELETE
                         FROM cartitems
                         WHERE cartid = $1
                         RETURNING *`;
      const values = [cartId];
  
      // Execute SQL statment
      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

}