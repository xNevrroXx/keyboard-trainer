const mysql = require("mysql");


/*
* find user in db. Will return some error or statisticData of an existing user.
* @param {Object} db
*   Pool to the database.
* @param {String || Number} userData
*   Email isToggle or index isToggle that the user should have.
* @param {String} nameColumn
*   Describes required type of column, where "userData" should be found. Example: "email":
* */
async function searchData(db, tableName, data, nameColumn) {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      const searchStrSQL = `SELECT * FROM ${tableName} WHERE ${nameColumn} = ?`;
      const searchQuerySQL = mysql.format(searchStrSQL, [data]);

      connection.query(searchQuerySQL, (error, result) => {
        connection.release();

        if (error) {
          return reject(error);
        }

        if (!result || result.length === 0) {
          return reject({
            status: 404,
            message: `${data} does not exist`
          });
        }

        resolve({
          status: 200,
          message: `${data} exist`,
          data: result
        })
      })
    })
  })
}

async function searchDataCustom(db, searchStrSQL) {
  return new Promise((resolve, reject) => {
    db.getConnection(async (error, connection) => {
      const searchQuerySQL = mysql.format(searchStrSQL);

      connection.query(searchQuerySQL, (error, result) => {
        connection.release();

        if (error) {
          return reject(error);
        }

        if (!result || result.length === 0) {
          return reject({
            status: 404,
            message: `data does not exist`
          });
        }

        resolve({
          status: 200,
          message: `data exist`,
          data: result
        })
      })
    })
  })
}

async function createUser(db, userData) {
  return new Promise((resolve, reject) => {
    db.getConnection((error, connection) => {
      const insertStrSQL = "INSERT INTO user(name, password, email) VALUES (?, ?, ?)";
      const insertQuerySQL = mysql.format(insertStrSQL, [userData.name, userData.hashedPassword, userData.email]);

      connection.query(insertQuerySQL, (error, result) => {
        connection.release();

        if (error) {
          return reject(error);
        }

        resolve();
      })
    })
  })
}

async function changeData(db, tableName, valueStrFind, nameColumnFind, newUserDataStr, nameNewColumn) {
  return new Promise((resolve, reject) => {
    db.getConnection((error, connection) => {
      if (error) {
        return reject(error);
      }

      const updateStrSQL = `UPDATE ${tableName} SET ${nameNewColumn} = ? WHERE ${nameColumnFind} = ?`;
      const updateQuerySQL = mysql.format(updateStrSQL, [newUserDataStr, valueStrFind]);

      connection.query(updateQuerySQL, (error, result) => {
        connection.release();

        if (error) {
          return reject(error);
        }

        resolve({
          status: 200,
          message: "statisticData updated"
        })
      })
    });
  })
}

async function createTemporaryCode(db, tableName, userId, userEmail, value, endTime) {
  try {
    const findingResultToken = await searchData(db, tableName, userId, "user_id");

    return new Promise((resolve, reject) => {
      db.getConnection((error, connection) => {
        const updateStrSQL = `UPDATE ${tableName} SET value = ?, end_time = ? WHERE user_id = ?`;
        const updateQuerySql = mysql.format(updateStrSQL, [value, endTime, userId]);

        connection.query(updateQuerySql, (error, result) => {
          connection.release();

          if (error) {
            return reject(error);
          }

          resolve({
            status: 200,
            message: "temporary code created"
          })
        })
      })
    })
  }
  catch {
    return new Promise((resolve, reject) => {
      db.getConnection((error, connection) => {
        if (error) {
          reject(error);
        }

        const insertStrSQL = `INSERT INTO ${tableName}(user_id, user_email, value, end_time) VALUES (?, ?, ?, ?)`;
        const insertQuerySQL = mysql.format(insertStrSQL, [userId, userEmail, value, endTime]);

        connection.query(insertQuerySQL, (error, result) => {
          connection.release();

          if (error) {
            reject(error);
          }

          resolve({
            status: 200,
            message: "Temporary code created"
          })
        })
      })
    })
  }
}

/*
* @param {String} tableName
*   Table name which include/will include required token of the user. Example "access_token" or "refresh_token"
* */
async function changeToken(db, tableName, userId, value) {
  try {
    const findingResultToken = await searchData(db, tableName, userId, "user_id");

    return new Promise((resolve, reject) => {
      db.getConnection((error, connection) => {
        if (error) {
          return reject(error);
        }

        const updateStrSQL = `UPDATE ${tableName} SET value = ? WHERE user_id = ?`;
        const updateQuerySQL = mysql.format(updateStrSQL, [value, userId]);

        connection.query(updateQuerySQL, (error, result) => {
          connection.release();

          if (error) {
            return reject(error);
          }

          resolve({
            status: 200,
            message: "Access token refresh"
          })
        })
      });
    })
  }
  catch { // there is no token yet
    return new Promise((resolve, reject) => {
      db.getConnection((error, connection) => {
        if (error) {
          return reject(error);
        }

        const insertStrSQL = `INSERT INTO ${tableName} (user_id, value) VALUES (?, ?)`;
        const insertQuerySQL = mysql.format(insertStrSQL, [userId, value]);

        connection.query(insertQuerySQL, (error, result) => {
          connection.release();

          if (error) {
            return reject(error);
          }

          resolve({
            status: 200,
            message: "Access token created"
          })
        })
      });
    })
  }
}

function createUserStatistic(db, tableName, timestamp, userId, charValue, speedValue) {
  return new Promise((resolve, reject) => {
    db.getConnection((error, connection) => {
      if(error) {
        throw error;
      }

      const createStrSql = `INSERT INTO ${tableName} (timestamp, user_id, char_value, speed_value) VALUES(?, ?, ?, ?)`;
      const createQuerySql = mysql.format(createStrSql, [timestamp, userId, charValue, speedValue]);

      connection.query(createQuerySql, (error, result) => {
        connection.release();

        if(error) {
          reject(error);
        }

        resolve();
      })
    })
  })
}

function createUserStatisticText(db, tableName, timestamp, userId, value) {
  return new Promise((resolve, reject) => {
    db.getConnection((error, connection) => {
      if(error) {
        throw error;
      }

      const createStrSql = `INSERT INTO ${tableName} (timestamp, user_id, value) VALUES(?, ?, ?)`;
      const createQuerySql = mysql.format(createStrSql, [timestamp, userId, value]);

      connection.query(createQuerySql, (error, result) => {
        connection.release();

        if(error) {
          reject(error);
        }

        resolve();
      })
    })
  })
}

module.exports = {searchData, createUser, changeToken, createTemporaryCode, changeData, createUserStatistic, createUserStatisticText, searchDataCustom}