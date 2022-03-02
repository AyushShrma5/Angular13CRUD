-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 02, 2022 at 11:38 AM
-- Server version: 5.7.31
-- PHP Version: 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `a13crud`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `p_id` int(11) NOT NULL AUTO_INCREMENT,
  `p_name` varchar(128) NOT NULL,
  `p_description` text NOT NULL,
  `p_price` double NOT NULL,
  `p_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `p_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`p_id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`p_id`, `p_name`, `p_description`, `p_price`, `p_created`, `p_modified`) VALUES
(1, 'Test Product 1', 'Test Product Description 1', 10, '2022-02-08 11:33:54', '2022-02-08 06:03:54'),
(2, 'Test Product 2', 'Test Product Description 2', 20, '2022-02-08 11:34:19', '2022-02-08 06:04:19'),
(3, 'Test Product 3', 'Test Product Description 3', 30, '2022-02-08 11:35:05', '2022-02-08 06:05:05'),
(4, 'Test Product 4 update', 'Test Description 4 update', 40, '2022-02-08 11:35:44', '2022-02-08 06:06:55'),
(6, 'ayush', 'ayush description 12', 35, '2022-02-09 09:29:48', '2022-02-09 04:04:29'),
(8, 'sdasd', 'gsdgdfgdf', 23, '2022-02-15 19:19:24', '2022-02-15 13:49:24');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `mobile`) VALUES
(1, 'ayush', 'ayush@mailinator.com', '12345678', 34534),
(2, 'jon', 'jon@mailinator.com', '12345678', 34534),
(3, 'james', 'james@mailinator.com', '12345678', 34534),
(9, 'ayush', 'a@mailinator.com', '4563463', 34534),
(8, 'asda', 'a12@mailinator.com', '12345678', 1231234244),
(7, 'ayush', 'a@mailinator.com', '4563463', 34534),
(10, 'asasdfas', 'a33@mailinator.com', '12345678', 1234567890),
(11, 'asdasd', 'a22@mailinator.com', '12345678', 1234567890),
(12, 'Ayush Sharma', 'jon@mailinator.com', '12345678', 945645455),
(13, 'Ayush Sharma', 'a@mailinator.com', '12345678', 945656667),
(14, 'aasdfsdf', 'a@mailinator.com', '12345678', 979666666),
(15, 'aasdfsdf', 'a@mailinator.com', '12345678', 979666666),
(16, 'aasdfsdf', 'a@mailinator.com', '12345678', 979666666),
(17, 'Ayush Sharma', 'jon@mailinator.com', '12345678', 979999656),
(18, 'Ayush Sharma', 'jon@mailinator.com', '12345678', 979999656),
(19, 'Piyush', 'piyush@mailinator.com', '12345678', 1234765489);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
