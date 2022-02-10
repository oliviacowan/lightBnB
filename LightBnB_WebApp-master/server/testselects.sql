SELECT *
FROM users
LIMIT 10;

-- INSERT INTO users (name, email, password) 
-- VALUES ('Hey Grandma', 'gma@gmail.com', 'password')
-- RETURNING *;

SELECT reservations.guest_id, reservations.start_date, reservations.end_date, properties.thumbnail_photo_url, properties.number_of_bedrooms, properties.number_of_bathrooms, properties.parking_spaces
FROM reservations
WHERE guest_id = 12
LIMIT 10;

  -- return pool.query(
  -- `SELECT reservations.*, properties
  -- FROM reservations
  -- WHERE guest_id = $1
  -- JOIN properties ON properties.id = property_id
  -- LIMIT $2;`, [guest_id, limit]
  -- )
