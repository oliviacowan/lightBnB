INSERT INTO users (name, email) VALUES ('Kevin Abstract', 'kaba@gmail.com');
INSERT INTO users (name, email) VALUES ('Frank Ocean', 'focean@gmail.com');
INSERT INTO users (name, email) VALUES ('Bad Bunny', 'bbunny@gmail.com');
INSERT INTO users (name, email) VALUES ('Matt Champ', 'mchamp@.com');
INSERT INTO users (name, email) VALUES ('Karol G', 'kg@gmail.com');

INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (1, 'The Hideaway', 'shorturl.at/bzQ17', 'shorturl.at/wKQZ7', 120, 1, 2, 4, 'Canada', 'Mill st', 'Vancouver', 'BC', 'Q5R 7Y2'),
(2, 'Parks', 'shorturl.at/bzQ17', 'shorturl.at/wKQZ7', 170, 2, 3, 3, 'Canada', 'grand st', 'Edmonton', 'AB', 'Q5T 8Y9'),
(4, 'Nested Crows', 'shorturl.at/bzQ17', 'shorturl.at/wKQZ7', 110, 4, 2, 4, 'Canada', 'end st', 'Huntsville', 'ON', 'R5T 8Y9'),
(1, 'GroundHog', 'shorturl.at/bzQ17', 'shorturl.at/wKQZ7', 190, 1, 3, 4, 'Canada', 'spot st', 'Castlegar', 'BC', 'L9P 7D4'),
(1, 'Water Hole', 'shorturl.at/bzQ17', 'shorturl.at/wKQZ7', 210, 2, 5, 3, 'Canada', 'Water st', 'Savary Island', 'BC', 'G7X 6D2');

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2018-02-12', '2018-02-15', 4, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2019-02-12', '2019-12-15', 3, 2);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2018-05-12', '2018-08-15', 2, 3);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2022-02-06', '2018-02-09', 3, 1);
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2020-03-16', '2020-03-25', 1, 5);



INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating)
VALUES (2, 4, 3, 5),
(1, 3, 2, 5),
(3, 4, 5, 1),
(4, 2, 4, 2),
(5, 1, 3, 3);