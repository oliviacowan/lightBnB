
SELECT properties.*, avg(property_reviews.rating) as average_rating
FROM properties
JOIN property_reviews ON properties.id = property_id
WHERE city LIKE '%ancouv%'
GROUP BY properties.id
HAVING avg(property_reviews.rating) >= 4
ORDER BY cost_per_night
LIMIT 10;






-- SELECT avg(rating)
-- FROM property_reviews
-- WHERE rating >= 4
-- GROUP BY id;

-- SELECT avg(rating)
-- FROM property_reviews
-- WHERE rating >= 4
-- GROUP BY id;