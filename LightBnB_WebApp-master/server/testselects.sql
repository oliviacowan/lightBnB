SELECT *
FROM users
LIMIT 10;

-- INSERT INTO users (name, email, password) 
-- VALUES ('Hey Grandma', 'gma@gmail.com', 'password')
-- RETURNING *;

SELECT reservations.guest_id, reservations.start_date, 
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

 INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
 VALUES ()
