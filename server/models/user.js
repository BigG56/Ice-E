const db = require('../db');
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class UserModel {
    async create(data) {
        try {
          console.log(data);
          // Generate SQL statement - using helper for dynamic parameter injection
          const statement = pgp.helpers.insert(data, null, 'users') + 'RETURNING *';
      
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

    async update(data) {
        try {
    
          const { id, ...params } = data;
    
          // Generate SQL statement - using helper for dynamic parameter injection
          const condition = pgp.as.format('WHERE id = ${id} RETURNING *', { id });
          const statement = pgp.helpers.update(params, null, 'users') + condition;
      
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

    async findOneByEmail(email) {
        try {
    
          // Generate SQL statement
          const statement = `SELECT *
                             FROM users
                             WHERE email = $1`;
          const values = [email];
      
          // Execute SQL statment
          const result = await db.query(statement, values);
    
          if (result.rows?.length) {
            return result.rows[0]
          }
      
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
    }

    async findOneById(id) {
        try {
    
          // Generate SQL statement
          const statement = `SELECT *
                             FROM users
                             WHERE id = $1`;
          const values = [id];
      
          // Execute SQL statment
          const result = await db.query(statement, values);
    
          if (result.rows?.length) {
            return result.rows[0]
          }
      
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
      }

      async findOneByGoogleId(id) {
        try {
    
          // Generate SQL statement
          const statement = `SELECT *
                             FROM users
                             WHERE google ->> 'id' = $1`;
          const values = [id];
      
          // Execute SQL statment
          const result = await db.query(statement, values);
    
          if (result.rows?.length) {
            return result.rows[0]
          }
      
          return null;
    
        } catch(err) {
          throw new Error(err);
        }
      }
}