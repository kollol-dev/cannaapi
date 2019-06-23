-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 23, 2019 at 07:46 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adonis_blog_demo`
--

-- --------------------------------------------------------

--
-- Table structure for table `adonis_schema`
--

CREATE TABLE `adonis_schema` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `adonis_schema`
--

INSERT INTO `adonis_schema` (`id`, `name`, `batch`, `migration_time`) VALUES
(1, '1503248427885_user', 1, '2019-06-22 14:01:33'),
(2, '1503248427886_token', 1, '2019-06-22 14:01:35'),
(3, '1561186677908_cannago_schema', 1, '2019-06-22 14:01:35'),
(4, '1561186684250_cannadrive_schema', 1, '2019-06-22 14:01:36'),
(6, '1561195287362_dispensary_schema', 1, '2019-06-22 14:01:36'),
(7, '1561208762422_questionnaire_schema', 1, '2019-06-22 14:01:37'),
(8, '1561274569773_user_report_schema', 2, '2019-06-23 08:26:35'),
(9, '1561274590959_driver_report_schema', 2, '2019-06-23 08:26:36'),
(11, '1561278258866_tag_schema', 2, '2019-06-23 08:26:36'),
(12, '1561278322423_item_tag_schema', 2, '2019-06-23 08:26:36'),
(15, '1561186689805_cannagrow_schema', 4, '2019-06-23 09:41:17'),
(16, '1561277729673_item_schema', 5, '2019-06-23 10:05:49'),
(17, '1561284733903_curt_schema', 6, '2019-06-23 10:37:25'),
(18, '1561284752408_order_schema', 6, '2019-06-23 10:37:26'),
(19, '1561284761339_order_details_schema', 6, '2019-06-23 10:37:26');

-- --------------------------------------------------------

--
-- Table structure for table `cannadrives`
--

CREATE TABLE `cannadrives` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `license` varchar(255) DEFAULT NULL,
  `licenseExpiration` varchar(255) DEFAULT NULL,
  `carBrand` varchar(255) DEFAULT NULL,
  `carModel` varchar(255) DEFAULT NULL,
  `carColor` varchar(255) DEFAULT NULL,
  `carPlateNumber` varchar(255) DEFAULT NULL,
  `carInsurance` varchar(255) DEFAULT NULL,
  `codeReferral` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cannadrives`
--

INSERT INTO `cannadrives` (`id`, `userId`, `license`, `licenseExpiration`, `carBrand`, `carModel`, `carColor`, `carPlateNumber`, `carInsurance`, `codeReferral`, `created_at`, `updated_at`) VALUES
(1, 2, '123456789', '20-12-2020', 'Toyota', NULL, NULL, NULL, NULL, NULL, '2019-06-23 01:47:27', '2019-06-23 01:47:27');

-- --------------------------------------------------------

--
-- Table structure for table `cannagos`
--

CREATE TABLE `cannagos` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `medicalCannabis` varchar(255) DEFAULT NULL,
  `medicalCannabisExpiration` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cannagos`
--

INSERT INTO `cannagos` (`id`, `userId`, `medicalCannabis`, `medicalCannabisExpiration`, `created_at`, `updated_at`) VALUES
(1, 1, '23456451', '20-12-2020', '2019-06-23 01:17:26', '2019-06-23 01:17:26');

-- --------------------------------------------------------

--
-- Table structure for table `cannagrows`
--

CREATE TABLE `cannagrows` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `license` varchar(255) DEFAULT NULL,
  `licenseExpiration` varchar(255) DEFAULT NULL,
  `licenseType` varchar(255) DEFAULT NULL,
  `growingType` varchar(255) DEFAULT NULL,
  `seedType` varchar(255) DEFAULT NULL,
  `ownerNameFirst` varchar(255) DEFAULT NULL,
  `ownerNameLast` varchar(255) DEFAULT NULL,
  `deliver` tinyint(1) DEFAULT NULL,
  `sharingInventory` tinyint(1) DEFAULT NULL,
  `yearlyRevenue` varchar(255) DEFAULT NULL,
  `RecreationalOrMedicinal` tinyint(1) DEFAULT NULL,
  `growerType` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `curts`
--

CREATE TABLE `curts` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `dispensaries`
--

CREATE TABLE `dispensaries` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `yearlyRevenue` varchar(255) DEFAULT NULL,
  `license` varchar(255) DEFAULT NULL,
  `licenseType` varchar(255) DEFAULT NULL,
  `ownerNameFirst` varchar(255) DEFAULT NULL,
  `ownerNameLast` varchar(255) DEFAULT NULL,
  `deliver` tinyint(1) DEFAULT NULL,
  `sharingInventory` tinyint(1) DEFAULT NULL,
  `RecreationalOrMedicinal` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `driver_reports`
--

CREATE TABLE `driver_reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `name` int(11) DEFAULT NULL,
  `email` int(11) DEFAULT NULL,
  `description` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `growId` int(11) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `deliveryFee` varchar(255) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `netPrice` varchar(255) DEFAULT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `item_tags`
--

CREATE TABLE `item_tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `itemId` int(11) DEFAULT NULL,
  `tagId` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `driverId` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `netPrice` int(11) DEFAULT NULL,
  `commend` varchar(255) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(10) UNSIGNED NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `questionnaires`
--

CREATE TABLE `questionnaires` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `questionnaires`
--

INSERT INTO `questionnaires` (`id`, `userId`, `question`, `answer`, `created_at`, `updated_at`) VALUES
(1, 1, 'How comfortable are you with the use of cannabis?”', 'Intermediate,', '2019-06-23 12:26:56', '2019-06-23 12:26:56');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `isaActive` tinyint(1) DEFAULT '1',
  `userType` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `img`, `country`, `state`, `birthday`, `phone`, `isaActive`, `userType`, `created_at`, `updated_at`) VALUES
(1, 'nazmul@gmail.com', '$2a$10$Tk6rnC7mm3WKx1hO3WKBAu/82F8Tub/ILkJE0kn4gTnQZxzvzPe/G', 'Nazmul Chowdhury', '/pyramid.png', 'BD', 'Sylhet', '1994-07-20', '01681189844', 1, 1, '2019-06-22 20:06:44', '2019-06-23 01:17:26'),
(2, 'sadek@gmail.com', '$2a$10$2et2dDdokUD65zy1dmJyCuunfCwMaG8afEGOOsi.4xUEAUPkxx./C', 'Sadek ahmed', 'something', NULL, NULL, NULL, NULL, 1, 3, '2019-06-22 21:26:55', '2019-06-23 13:56:39');

-- --------------------------------------------------------

--
-- Table structure for table `user_reports`
--

CREATE TABLE `user_reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `orderId` int(11) DEFAULT NULL,
  `name` int(11) DEFAULT NULL,
  `email` int(11) DEFAULT NULL,
  `description` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cannadrives`
--
ALTER TABLE `cannadrives`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cannagos`
--
ALTER TABLE `cannagos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cannagrows`
--
ALTER TABLE `cannagrows`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `curts`
--
ALTER TABLE `curts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `dispensaries`
--
ALTER TABLE `dispensaries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driver_reports`
--
ALTER TABLE `driver_reports`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_tags`
--
ALTER TABLE `item_tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questionnaires`
--
ALTER TABLE `questionnaires`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tokens_token_unique` (`token`),
  ADD KEY `tokens_user_id_foreign` (`user_id`),
  ADD KEY `tokens_token_index` (`token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_reports`
--
ALTER TABLE `user_reports`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adonis_schema`
--
ALTER TABLE `adonis_schema`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `cannadrives`
--
ALTER TABLE `cannadrives`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cannagos`
--
ALTER TABLE `cannagos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cannagrows`
--
ALTER TABLE `cannagrows`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `curts`
--
ALTER TABLE `curts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dispensaries`
--
ALTER TABLE `dispensaries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `driver_reports`
--
ALTER TABLE `driver_reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `item_tags`
--
ALTER TABLE `item_tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `questionnaires`
--
ALTER TABLE `questionnaires`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_reports`
--
ALTER TABLE `user_reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tokens`
--
ALTER TABLE `tokens`
  ADD CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
