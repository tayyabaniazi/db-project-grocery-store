-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2025 at 07:53 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fresh_mart`
--

DELIMITER $$
--
-- Procedures
--
DROP PROCEDURE IF EXISTS `place_order_simple`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `place_order_simple` (IN `p_user_id` INT, IN `p_total` DECIMAL(10,2), OUT `p_order_id` INT)   BEGIN
    INSERT INTO orders(user_id, total_amount) VALUES (p_user_id, p_total);
    SET p_order_id = LAST_INSERT_ID();
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `submitted_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `email`, `subject`, `message`, `submitted_at`) VALUES
(1, 'natasha', 'natasha@gmail.com', 'a', 'abc', '2025-05-30 13:12:54'),
(2, 'ayesha', 'ayesha@gmail.com', 'xyz', 'good\r\n', '2025-05-31 17:16:08');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_date` datetime DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `order_date`, `total_amount`) VALUES
(1, 3, '2025-06-01 08:54:48', 6.00),
(2, 3, '2025-06-01 08:57:28', 6.00),
(3, 3, '2025-06-01 09:03:34', 6.00),
(4, 3, '2025-06-01 09:05:48', 6.00),
(5, 3, '2025-06-01 09:11:40', 10.00),
(6, 3, '2025-06-01 10:31:35', 12.00);

--
-- Triggers `orders`
--
DROP TRIGGER IF EXISTS `after_order_insert`;
DELIMITER $$
CREATE TRIGGER `after_order_insert` AFTER INSERT ON `orders` FOR EACH ROW BEGIN
  INSERT INTO order_logs(order_id, message)
  VALUES (NEW.id, CONCAT('Order placed at ', NOW()));
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_name`, `quantity`, `price`) VALUES
(5, 5, 'Orange Juice', 1, 3.00),
(6, 5, 'rice', 1, 7.00),
(7, 6, 'Apple', 3, 2.00),
(8, 6, 'Banana', 1, 3.00),
(9, 6, 'Orange Juice', 1, 3.00);

-- --------------------------------------------------------

--
-- Table structure for table `order_logs`
--

DROP TABLE IF EXISTS `order_logs`;
CREATE TABLE `order_logs` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `log_time` datetime DEFAULT current_timestamp(),
  `message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_logs`
--

INSERT INTO `order_logs` (`id`, `order_id`, `log_time`, `message`) VALUES
(1, 1, '2025-06-01 08:54:48', 'Order placed at 2025-06-01 08:54:48'),
(2, 2, '2025-06-01 08:57:28', 'Order placed at 2025-06-01 08:57:28'),
(3, 3, '2025-06-01 09:03:34', 'Order placed at 2025-06-01 09:03:34'),
(4, 4, '2025-06-01 09:05:48', 'Order placed at 2025-06-01 09:05:48'),
(5, 5, '2025-06-01 09:11:40', 'Order placed at 2025-06-01 09:11:40'),
(6, 6, '2025-06-01 10:31:35', 'Order placed at 2025-06-01 10:31:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `registered_at`) VALUES
(1, 'tayyabaniazi', 'tayyabaniazi506@gmail.com', '$2y$10$PSZHJhrgyRE3jwDw5yAGTOasS37gNLjJTzHDV9BrTkBHZggyZbYxC', '2025-05-30 13:47:32'),
(2, 'ayesha', 'ayesha@gmail.com', '$2y$10$vNmwkl7bkpY/JisJQ.bqtujprTtKdd.rJH93esA9/wk6gfTbqw.Zi', '2025-05-31 17:17:11'),
(3, 'nat', 'nat@gmail.com', '$2y$10$8/TGdUQWGxJ/8SuPkEqGM.e5ootLlZ3g1U5bxvg4nYjH11iAyFFrS', '2025-05-31 18:10:18'),
(4, 'shahmeer', 'shahmeer@gmail.com', '$2y$10$oFgq1xIij5Y5ZuWAhmTFputia.7mPIee9PEcIhdUuYPguk6aidW2i', '2025-05-31 18:25:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `order_logs`
--
ALTER TABLE `order_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `order_logs`
--
ALTER TABLE `order_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
