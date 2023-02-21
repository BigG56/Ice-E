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
}