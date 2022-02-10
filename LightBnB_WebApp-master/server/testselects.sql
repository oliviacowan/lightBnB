SELECT *
FROM users
WHERE email = 'g@com';

INSERT INTO users (name, email, password) 
VALUES ('Hey Grandma', 'gma@gmail.com', 'password')
RETURNING *;