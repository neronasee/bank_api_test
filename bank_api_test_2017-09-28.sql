# ************************************************************
# Sequel Pro SQL dump
# Версия 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Адрес: 127.0.0.1 (MySQL 5.7.19)
# Схема: bank_api_test
# Время создания: 2017-09-28 13:15:33 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Дамп таблицы Customers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Customers`;

CREATE TABLE `Customers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `cnp` bigint(20) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cnp` (`cnp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;

INSERT INTO `Customers` (`id`, `name`, `cnp`, `createdAt`)
VALUES
	(1,'test2',21233,'2017-09-25 00:00:00'),
	(2,'test2',212333,'2017-09-25 00:00:00'),
	(5,'test32',2123333,'2017-09-26 00:00:00'),
	(6,'test32',21213333,'2017-09-26 00:00:00'),
	(7,'test32',2121331333,'2017-09-27 12:45:16'),
	(9,'test',123,'2017-09-28 16:14:23'),
	(10,'test',1234,'2017-09-28 16:14:26'),
	(11,'test',12345,'2017-09-28 16:14:29');

/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы Transactions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Transactions`;

CREATE TABLE `Transactions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` float NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customerId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  CONSTRAINT `transactions_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Transactions` WRITE;
/*!40000 ALTER TABLE `Transactions` DISABLE KEYS */;

INSERT INTO `Transactions` (`id`, `amount`, `createdAt`, `customerId`)
VALUES
	(23,1,'2017-09-27 13:40:03',1),
	(28,2233,'2017-09-28 13:36:55',1),
	(29,2233,'2017-09-27 13:39:03',1),
	(30,2233,'2017-09-27 13:39:43',2),
	(31,2233,'2017-09-28 16:14:32',1),
	(32,2233,'2017-09-28 16:14:32',1),
	(33,2233,'2017-09-28 16:14:33',1),
	(34,223333,'2017-09-28 16:14:35',1);

/*!40000 ALTER TABLE `Transactions` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `salt` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

INSERT INTO `Users` (`id`, `username`, `password_hash`, `salt`, `createdAt`)
VALUES
	(20,'testUser','$2a$10$fHWO0nIqG2pL7WVgtG8bWe7bB9cHkbljzXO68qAfpi9TwCcQllMDK','$2a$10$fHWO0nIqG2pL7WVgtG8bWe','2017-09-28 16:15:02');

/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
