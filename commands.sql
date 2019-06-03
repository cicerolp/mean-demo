 /*
  mysql -u root -p
*/
 
 CREATE DATABASE mydb;
 
 CREATE USER 'ifrs'@'localhost' IDENTIFIED BY 'ifrs';
 GRANT ALL PRIVILEGES ON mydb.* TO 'ifrs'@'localhost';
 FLUSH PRIVILEGES;
 quit

 /*
  mysql -u ifrs -p
 */
 USE mydb;
CREATE TABLE mytable(_id INT PRIMARY KEY AUTO_INCREMENT, img INT NOT NULL, name TEXT NOT NULL, price FLOAT NOT NULL, description TEXT NOT NULL, rating INT NOT NULL);