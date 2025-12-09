const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async create(userData) {
    const { name, email, password, role = 'user' } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
      db.run(sql, [name, email, hashedPassword, role], function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, name, email, role });
        }
      });
    });
  }
  
  static findByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE email = ?';
      db.get(sql, [email], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
  
  static findById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM users WHERE id = ?';
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

module.exports = User;