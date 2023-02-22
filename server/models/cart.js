const db = require('../db');
const moment = require('moment');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class CartModel {

  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.modified = moment.utc().toISOString();
  }

  //Create user cart
  async create(userid) {
    try {
      console.log(userid)
      const data = { userid, ...this}
      console.log(data);

      // Generate SQL statement - using helper for dynamic parameter injection
      const statement = pgp.helpers.insert(data, null, 'carts') + 'RETURNING *';
  
      // Execute SQL statment
      const result = await db.query(statement);
      console.log(result);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;

    } catch(err) {
      throw new Error(err);
    }
  }

  //Find cart by userId
  static async findOneByUser(userId) {
    try {

      // Generate SQL statement
      const statement = `SELECT *
                         FROM carts
                         WHERE "userid" = $1`;
      const values = [userId];
  
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

  //Find cart by cartId
  static async findOneById(cartId) {
    try {
      console.log(cartId)

      // Generate SQL statement
      const statement = `SELECT *
                         FROM carts
                         WHERE "id" = $1`;
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