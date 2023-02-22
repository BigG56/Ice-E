const db = require('../db')
const pgp = require('pg-promise')({ capSQL: true });

module.exports = class addressModel {
    async create(data) {
        try {
          console.log(data);
          // Generate SQL statement - using helper for dynamic parameter injection
          const statement = pgp.helpers.insert(data, null, 'address') + 'RETURNING *';
      
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

    async findById(userid) {
      try {
  
        // Generate SQL statement
        const statement = `SELECT *
                           FROM address
                           WHERE userid = $1`;
        const values = [userid];
    
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

    async delete(userid) {
      try {
  
        // Generate SQL statement
        const statement = `DELETE
                           FROM address
                           WHERE userid = $1
                           RETURNING *`;
        const values = [userid];
    
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