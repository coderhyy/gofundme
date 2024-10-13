const mysql = require('mysql');
require('dotenv').config();

// 创建数据库连接池配置
const poolConfig = {
  host: process.env.HOST,
  user: process.env.ROOT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10
};

const pool = mysql.createPool(poolConfig);

// 通用查询函数
const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (err, results) => {
      if (err) {
        console.error('数据库查询错误:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// 数据库操作函数
const dbOperations = {
  allFundraiser: (filters = {}) => {
    let sql = `
    SELECT F.*, C.NAME AS CATEGORY_NAME 
    FROM FUNDRAISER F
    LEFT JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
    WHERE 1=1
  `;
    const values = [];

    if (filters.organizer && filters.organizer.trim() !== '') {
      sql += ' AND F.ORGANIZER LIKE ?';
      values.push(`%${filters.organizer}%`);
    }

    if (filters.city && filters.city.trim() !== '') {
      sql += ' AND F.CITY LIKE ?';
      values.push(`%${filters.city}%`);
    }

    if (filters.category) {
      sql += ' AND F.CATEGORY_ID = ?';
      values.push(filters.category);
    }

    if (filters.active !== undefined) {
      sql += ' AND F.ACTIVE = ?';
      values.push(filters.active);
    }

    return query(sql, values);
  },

  findFundraiserById: (fundraiserId) => {
    const sql = `
      SELECT F.*, C.NAME AS CATEGORY_NAME 
      FROM FUNDRAISER F
      LEFT JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
      WHERE F.FUNDRAISER_ID = ?
    `;
    return query(sql, [fundraiserId]);
  },

  allCategories: () => query('SELECT * FROM CATEGORY'),

  insertDonationForFundraiser: (values) => {
    const sql = `INSERT INTO DONATION (DATE, AMOUNT, GIVER, FUNDRAISER_ID)
    VALUES (?)`;
    return query(sql, [values]);
  },

  findFundraisersByCategory: (categoryId) => {
    const sql = `
      SELECT F.*, C.NAME AS CATEGORY_NAME 
      FROM FUNDRAISER F
      LEFT JOIN CATEGORY C ON F.CATEGORY_ID = C.CATEGORY_ID
      WHERE F.CATEGORY_ID = ?
    `;
    return query(sql, [categoryId]);
  },

  insertFundraiser: (values) => {
    const sql = `INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID)
    VALUES (?)`;
    return query(sql, [values]);
  },
  updateFundraiser: (values) => {
    const sql = `
      UPDATE FUNDRAISER 
      SET 
        ORGANIZER = ?, 
        CAPTION = ?, 
        TARGET_FUNDING = ?, 
        CURRENT_FUNDING = ?, 
        CITY = ?, 
        ACTIVE = ?, 
        CATEGORY_ID = ?
      WHERE FUNDRAISER_ID = ?
    `;
    return query(sql, values);
  },

  findDonationbyFundraiserId: (fundraiserId) => {
    const sql = `select * from DONATION where FUNDRAISER_ID = ?`;
    return query(sql, fundraiserId)
  },
  deleteFundraiser: (fundraiserId) => {
    const sql = `DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?`;
    return query(sql, [fundraiserId]);
  },
};
module.exports = dbOperations;