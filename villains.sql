create database disney;

create user 'disney_user'@'localhost' IDENTIFIED with mysql_native_password BY 'disney1234';
GRANT ALL ON disney.* to 'disney_user'@'localhost';

use disney;

create table villains (
	name VARCHAR(255),
    movie VARCHAR(255),
    slug VARCHAR(255),
    createdAt DATETIME DEFAULT NOW(),
    updatedAt DATETIME DEFAULT NOW() ON UPDATE NOW(),
    deletedAt DATETIME,
    PRIMARY KEY (slug)
    
);

DESC villains;

INSERT into villains (name, movie, slug) VALUES ('Captain Hook', 'Peter Pan', 'captain-hook');
INSERT into villains (name, movie, slug) VALUES ('Cruella de Vil', 'One Hundred and One Dalmatians', 'cruella-de-vil');
INSERT into villains (name, movie, slug) VALUES ('Gaston', 'Beauty and the Beast', 'gaston');
INSERT into villains (name, movie, slug) VALUES ('Hades', 'Hercules', 'hades');
INSERT into villains (name, movie, slug) VALUES ('Scar', 'The Lion King', 'scar');

select * from villains;