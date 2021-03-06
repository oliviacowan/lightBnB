const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');
const { query } = require('express');


const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});





/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  
  return pool.query(
    `SELECT *
    FROM users
    WHERE email = $1`, [email]
  )
  .then(res => {
    return res.rows[0]
  })
  .catch((err) => err.message);
 
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(
    `SELECT *
    FROM users
    WHERE id = $1`, [id]
  )
  .then(res => {
    return res.rows[0]
  })
  .catch((err) => err.message);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const name = user.name;
  const email = user.email;
  const password = user.password
  console.log(name, email, password);

   return pool.query(
    `INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)
    RETURNING *;`, [name, email, password]
  )

  .then(res => {
    return res.rows[0];
  })
  .catch((err) => err.message);

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  
  return pool.query(
  `SELECT reservations.*, properties.title, properties.cost_per_night, properties.thumbnail_photo_url, properties.number_of_bedrooms, properties.number_of_bathrooms, properties.parking_spaces, avg(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON properties.id = reservations.property_id
  JOIN property_reviews ON properties.id = property_reviews.property_id
  WHERE reservations.guest_id = $1
  GROUP BY properties.id, reservations.id
  LIMIT $2;`, [guest_id, limit]
  )
  .then(res => {
    return res.rows;
  })
  .catch((err) => err.message);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function(options, limit = 10) {
  
  const queryParams = [];

  let queryString = 
    `SELECT properties.*, avg(property_reviews.rating) as average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
    `;
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  if (options.minimum_price_per_night) {
    queryParams.push(parseInt(options.minimum_price_per_night));
    queryString += `AND cost_per_night >= $${queryParams.length}`;
  }

  if (options.maximum_price_per_night) {
    queryParams.push(parseInt(options.maximum_price_per_night));
    queryString += `AND cost_per_night <= $${queryParams.length}`;
  }


  if (options.owner_id) {
    queryParams.push(parseInt(options.owner_id));
    queryString += `
    JOIN users ON users.id = owner_id
    WHERE users.id = $${queryParams.length}`;
  }

  if (options.minimum_rating) {
    queryParams.push(parseInt(options.minimum_rating));
    queryString += `AND rating >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += ` 
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length}
  `;
  
  console.log(queryString, queryParams);
  return pool.query(queryString, queryParams).then((res) => res.rows);
  //.catch((err) => err.message);
}


exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
 
  const $1 = property.owner_id; 
  const $2 = property.title;
  const $3 = property.description; 
  const $4 = property.thumbnail_photo_url; 
  const $5 = property.cover_photo_url; 
  const $6 = parseInt(property.cost_per_night); 
  const $7 = parseInt(property.parking_spaces); 
  const $8 = parseInt(property.number_of_bathrooms); 
  const $9 = parseInt(property.number_of_bedrooms); 
  const $10 = property.country; 
  const $11 = property.street; 
  const $12 = property.city; 
  const $13 = property.province; 
  const $14 = property.post_code;
  let values = [$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14];
 
 console.log(values); 
 return pool.query(
    `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;`, values)
  .then(res => {
    return res.rows;
  })
  .catch((err) => err.message);
}
exports.addProperty = addProperty;
