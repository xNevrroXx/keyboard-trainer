CREATE DATABASE  IF NOT EXISTS `keyboard_trainer`;
USE `keyboard_trainer`;


DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(250) NOT NULL,
  PRIMARY KEY (`id`)
);


DROP TABLE IF EXISTS `access_token`;
CREATE TABLE `access_token` (
  `user_id` int NOT NULL,
  `value` varchar(300) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `access_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);


DROP TABLE IF EXISTS `refresh_token`;
CREATE TABLE `refresh_token` (
  `user_id` int NOT NULL,
  `value` varchar(300) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `refresh_token_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

DROP TABLE IF EXISTS `temporary_code`;
CREATE TABLE `temporary_code` (
  `user_id` int NOT NULL,
  `user_email` varchar(150) NOT NULL,
  `value` int NOT NULL,
  `end_time` varchar(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `temporary_code_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);


DROP TABLE IF EXISTS `user_statistic_texts`;
CREATE TABLE `user_statistic_texts` (
  `user_id` int NOT NULL,
  `timestamp` varchar(20) NOT NULL,
  `value` text NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `user_statistic_texts_FK` (`user_id`),
  CONSTRAINT `user_statistic_texts_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);


DROP TABLE IF EXISTS `user_statistic_typing`;
CREATE TABLE `user_statistic_typing` (
  `user_id` int NOT NULL,
  `timestamp` varchar(20) NOT NULL,
  `char_value` varchar(10) NOT NULL,
  `speed_value` int NOT NULL,
  `accuracy_value` int NOT NULL,
  `total_number` int NOT NULL,
  `count_mistakes` int DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `user_statistic_typing_FK` (`user_id`),
  CONSTRAINT `user_statistic_typing_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);