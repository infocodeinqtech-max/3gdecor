-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20250718.d42db65a1e
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 28, 2026 at 11:36 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `3gdeco`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('3g-deco-cache-enquiry_otp_rate:071f1e8ae68a7e120fc7569665fc5aed67f64c73', 'i:4;', 1785235712),
('3g-deco-cache-enquiry_otp:c7ff0a6c-3841-4a7a-a3ef-325ee98d4377', 'a:3:{s:8:\"otp_hash\";s:60:\"$2y$12$A03sjE0CAfgsDb2UugK0gOv8ZhQMDO2wkRe32iYbxABO/38BEnRey\";s:8:\"attempts\";i:0;s:7:\"payload\";a:5:{s:4:\"name\";s:5:\"jyoti\";s:5:\"email\";s:19:\"jyotibag9@gmail.com\";s:5:\"phone\";s:10:\"8167028450\";s:7:\"service\";s:18:\"Corporate Interior\";s:7:\"message\";s:7:\"testing\";}}', 1785232185),
('3g-deco-cache-enquiry_otp:cc44072b-2f35-4a6a-9518-bf169ee112cc', 'a:3:{s:8:\"otp_hash\";s:60:\"$2y$12$2haB5nTFVaPBz04H..x/Cus0kHM.B1LQx1Qn8OJSF4PUwoPSsvTHi\";s:8:\"attempts\";i:1;s:7:\"payload\";a:5:{s:4:\"name\";s:5:\"jyoti\";s:5:\"email\";s:19:\"jyotibag9@gmail.com\";s:5:\"phone\";s:10:\"8167028450\";s:7:\"service\";s:18:\"Corporate Interior\";s:7:\"message\";s:7:\"testing\";}}', 1785232004);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cms_contents`
--

CREATE TABLE `cms_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'json',
  `data` json NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `contact_office_contents`
--

CREATE TABLE `contact_office_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `studio_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hours` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `map_embed` text COLLATE utf8mb4_unicode_ci,
  `sort_order` int UNSIGNED NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_office_contents`
--

INSERT INTO `contact_office_contents` (`id`, `label`, `heading`, `studio_title`, `address`, `phone`, `email`, `hours`, `map_embed`, `sort_order`, `active`, `created_at`, `updated_at`) VALUES
(14, 'Kolkata', 'Kolkata Address', 'Visit Our Kolkata Studio', '14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India', '8167028450', 'info@3gdecorative.com', 'Mon – Sat, 9:00 AM – 7:00 PM', 'https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed', 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(15, 'Bangalore', 'Bangalore Address', 'Visit Our Bangalore Studio', '14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India', '8167028450', 'info@3gdecorative.com', 'Mon – Sat, 9:00 AM – 7:00 PM', 'https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed', 2, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(16, 'Goa', 'Goa Address', 'Visit Our Goa Studio', '14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India', '8167028450', 'info@3gdecorative.com', 'Mon – Sat, 9:00 AM – 7:00 PM', 'https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed', 3, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `contact_page_contents`
--

CREATE TABLE `contact_page_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `banner_image` longtext COLLATE utf8mb4_unicode_ci,
  `hero_eyebrow` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_title_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_title_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_title_highlight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hero_description` text COLLATE utf8mb4_unicode_ci,
  `details_eyebrow` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details_title_highlight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `details_description` text COLLATE utf8mb4_unicode_ci,
  `form_eyebrow` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `form_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `form_description` text COLLATE utf8mb4_unicode_ci,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contact_page_contents`
--

INSERT INTO `contact_page_contents` (`id`, `banner_image`, `hero_eyebrow`, `hero_title_line1`, `hero_title_line2`, `hero_title_highlight`, `hero_description`, `details_eyebrow`, `details_title`, `details_title_highlight`, `details_description`, `form_eyebrow`, `form_title`, `form_description`, `active`, `created_at`, `updated_at`) VALUES
(4, '/uploads/pages/contact/contact-banner.jpg', 'Get In Touch', 'Let\'s Build', 'Something', 'Remarkable.', 'Share your vision for corporate interiors, civil structures, or turnkey projects — our team responds within 24 hours.', 'Reach Us', 'Company Details &', 'Inquiry Form', 'Find our studios on the map or send us a message — tell us what your project is regarding and we will guide you from there.', 'Send an Inquiry', 'Tell us about your project', 'Fields marked with your details help us respond faster.', 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `enquiries`
--

CREATE TABLE `enquiries` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `service` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'new',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `enquiries`
--

INSERT INTO `enquiries` (`id`, `name`, `email`, `phone`, `service`, `message`, `status`, `active`, `created_at`, `updated_at`) VALUES
(15, 'Amit Kumar', 'amit@email.com', '+91 98765 43210', 'Corporate Interior', 'Looking for office renovation in Kolkata.', 'new', 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(16, 'Sneha Iyer', 'sneha@email.com', '+91 99887 76655', 'Luxury Renovation', 'Need consultation for penthouse interior.', 'in_progress', 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `footer_contents`
--

CREATE TABLE `footer_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `tagline` text COLLATE utf8mb4_unicode_ci,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hours` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `newsletter_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `newsletter_text` text COLLATE utf8mb4_unicode_ci,
  `copyright` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `footer_contents`
--

INSERT INTO `footer_contents` (`id`, `tagline`, `address`, `country`, `phone`, `email`, `hours`, `newsletter_title`, `newsletter_text`, `copyright`, `active`, `created_at`, `updated_at`) VALUES
(6, 'Crafting luxurious interiors that blend elegance, innovation and timeless sophistication.', 'Kolkata, West Bengal', 'India', '8167028450', 'info@3gdecorativegroup.com', 'Mon - Sat : 10 AM - 7 PM', 'STAY INSPIRED', 'Subscribe to our newsletter and be the first to know about our latest projects and ideas.', '© 2025 3G Decorative Group. All Rights Reserved.', 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `home_about_contents`
--

CREATE TABLE `home_about_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_highlight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paragraph1` text COLLATE utf8mb4_unicode_ci,
  `paragraph2` text COLLATE utf8mb4_unicode_ci,
  `images` json DEFAULT NULL,
  `badge_image` longtext COLLATE utf8mb4_unicode_ci,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_about_contents`
--

INSERT INTO `home_about_contents` (`id`, `label`, `title_line1`, `title_line2`, `title_highlight`, `paragraph1`, `paragraph2`, `images`, `badge_image`, `active`, `created_at`, `updated_at`) VALUES
(7, 'ABOUT US', 'Creating Spaces', 'That', 'Inspire', 'With over 15 years of excellence in interior architecture, 3G Decorative Group transforms visions into timeless spaces blending luxury, innovation, and refined sophistication.', 'Every detail is carefully crafted to create environments that inspire comfort, beauty and lasting elegance.', '[\"/uploads/about/about-1.jpg\", \"/uploads/about/about-2.jpg\", \"/uploads/about/about-3.jpg\", \"/uploads/about/about-4.jpg\"]', '/uploads/about/badge.jpg', 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `home_expertise_contents`
--

CREATE TABLE `home_expertise_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` longtext COLLATE utf8mb4_unicode_ci,
  `sort_order` int UNSIGNED NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_expertise_contents`
--

INSERT INTO `home_expertise_contents` (`id`, `title`, `description`, `image`, `sort_order`, `active`, `created_at`, `updated_at`) VALUES
(19, 'Innovative Interior Concepts', 'Fresh and creative design solutions crafted to reflect personality and functionality.', '/uploads/expertise/expertise-1.jpg', 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(20, 'Luxury Living Spaces', 'Elegant interiors blending comfort, sophistication, and timeless aesthetics.', '/uploads/expertise/expertise-2.jpg', 2, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(21, 'Modern Architectural Vision', 'Bold architectural concepts designed with precision, balance, and innovation.', '/uploads/expertise/expertise-3.jpg', 3, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `home_hero_contents`
--

CREATE TABLE `home_hero_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `tagline` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `headline_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `headline_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `script_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `left_card_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `right_card_title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_corporate_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_corporate_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_civil_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cta_civil_link` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `background_image` longtext COLLATE utf8mb4_unicode_ci,
  `stats` json DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_hero_contents`
--

INSERT INTO `home_hero_contents` (`id`, `tagline`, `headline_line1`, `headline_line2`, `script_text`, `description`, `left_card_title`, `right_card_title`, `cta_corporate_text`, `cta_corporate_link`, `cta_civil_text`, `cta_civil_link`, `background_image`, `stats`, `active`, `created_at`, `updated_at`) VALUES
(7, 'SPACES THAT INSPIRE.', 'Corporate Interiors.', 'Civil Structures.', 'Built to Elevate.', 'From modern workplaces to industrial landmarks — we design and build spaces that drive productivity, efficiency and sustainable growth.', 'Corporate\nInteriors', 'Civil\nStructures', 'Explore Corporate Projects', '#corporate-projects', 'Explore Civil Projects', '#civil-projects', '', '[{\"id\": 1, \"label\": \"Projects Delivered\", \"number\": \"250+\"}, {\"id\": 2, \"label\": \"Years Experience\", \"number\": \"15+\"}, {\"id\": 3, \"label\": \"Client Satisfaction\", \"number\": \"100%\"}]', 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `home_navigation_menus`
--

CREATE TABLE `home_navigation_menus` (
  `id` bigint UNSIGNED NOT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int UNSIGNED NOT NULL DEFAULT '0',
  `visible` tinyint(1) NOT NULL DEFAULT '1',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_navigation_menus`
--

INSERT INTO `home_navigation_menus` (`id`, `label`, `link`, `sort_order`, `visible`, `active`, `created_at`, `updated_at`) VALUES
(43, 'HOME', '/', 1, 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(44, 'EXPERTISE', '/#features', 2, 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(45, 'ABOUT', '/about', 3, 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(46, 'SERVICES', '/services', 4, 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(47, 'PROJECTS', '/#projects', 5, 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(48, 'CONTACT', '/contact', 6, 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `home_process_contents`
--

CREATE TABLE `home_process_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `step` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `sort_order` int UNSIGNED NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_process_contents`
--

INSERT INTO `home_process_contents` (`id`, `step`, `title`, `description`, `sort_order`, `active`, `created_at`, `updated_at`) VALUES
(31, '01', 'Consultation', 'Understanding your vision and requirements', 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(32, '02', 'Concept Design', 'Creating detailed design proposals', 2, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(33, '03', 'Planning', 'Refining every detail to perfection', 3, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(34, '04', 'Execution', 'Bringing your dream space to life', 4, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(35, '05', 'Delivery', 'Final handover with quality assurance', 5, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `home_projects_contents`
--

CREATE TABLE `home_projects_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci,
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `sort_order` int UNSIGNED NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_projects_contents`
--

INSERT INTO `home_projects_contents` (`id`, `title`, `category`, `image`, `featured`, `sort_order`, `active`, `created_at`, `updated_at`) VALUES
(31, 'Modern Elegance Villa', 'Residential', '/uploads/projects/project-1.jpg', 1, 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(32, 'Contemporary Dining', 'Commercial', '/uploads/projects/project-2.jpg', 0, 2, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(33, 'Luxury Penthouse', 'Residential', '/uploads/projects/project-3.jpg', 0, 3, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(34, 'Executive Office', 'Commercial', '/uploads/projects/project-4.jpg', 0, 4, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(35, 'Minimalist Lounge', 'Residential', '/uploads/projects/project-5.jpg', 0, 5, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `home_section_headers`
--

CREATE TABLE `home_section_headers` (
  `id` bigint UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content_table` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `label` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_line1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title_highlight` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `cta_text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_section_headers`
--

INSERT INTO `home_section_headers` (`id`, `key`, `content_table`, `label`, `title`, `title_line1`, `title_line2`, `title_highlight`, `description`, `cta_text`, `active`, `created_at`, `updated_at`) VALUES
(31, 'expertise', 'home_expertise_contents', NULL, NULL, 'Crafting', 'Exceptional Spaces', NULL, 'Timeless interiors shaped through elegance, precision, and visionary craftsmanship.', NULL, 1, '2026-07-28 05:56:18', '2026-07-28 06:06:09'),
(32, 'projects', 'home_projects_contents', 'PORTFOLIO', 'Featured Projects', NULL, NULL, NULL, 'A curated selection of our most prestigious interior design projects', 'Explore All Projects', 1, '2026-07-28 05:56:18', '2026-07-28 06:06:09'),
(33, 'services', 'home_services_contents', 'Services', 'Services Crafted for You', NULL, NULL, NULL, NULL, NULL, 1, '2026-07-28 05:56:18', '2026-07-28 06:06:09'),
(34, 'process', 'home_process_contents', 'OUR PROCESS', 'How We Work', NULL, NULL, NULL, 'A seamless journey from concept to completion', NULL, 1, '2026-07-28 05:56:18', '2026-07-28 06:06:09'),
(35, 'testimonials', 'home_testimonials_contents', 'TESTIMONIALS', NULL, 'Genuine Feedback From', NULL, 'Our Loyal Customers', 'Trusted by homeowners and businesses for creating spaces defined by elegance, comfort, and timeless luxury.', NULL, 1, '2026-07-28 05:56:18', '2026-07-28 06:06:09');

-- --------------------------------------------------------

--
-- Table structure for table `home_services_contents`
--

CREATE TABLE `home_services_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `background_image` longtext COLLATE utf8mb4_unicode_ci,
  `sort_order` int UNSIGNED NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_services_contents`
--

INSERT INTO `home_services_contents` (`id`, `title`, `category`, `description`, `background_image`, `sort_order`, `active`, `created_at`, `updated_at`) VALUES
(37, 'Interior Design', 'Design', 'Bespoke interior solutions that blend aesthetics with functionality for residential and commercial spaces.', '/uploads/services/service-1.jpg', 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(38, 'Architectural Planning', 'Architecture', 'Innovative architectural planning and design services that bring your vision to structural reality.', '/uploads/services/service-2.jpg', 2, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(39, 'Furniture Design', 'Custom', 'Custom furniture pieces crafted to perfection, combining luxury with comfort and timeless style.', '/uploads/services/service-3.jpg', 3, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(40, 'Turnkey Projects', 'Development', 'Complete end-to-end project execution from concept to completion with seamless coordination.', '/uploads/services/service-4.jpg', 4, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(41, 'Commercial Interiors', 'Commercial', 'Professional workspace design that enhances productivity while reflecting your brand identity.', '/uploads/services/service-5.jpg', 5, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(42, 'Luxury Renovations', 'Renovation', 'Transform existing spaces into luxurious environments with our expert renovation services.', '/uploads/services/service-6.jpg', 6, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `home_testimonials_contents`
--

CREATE TABLE `home_testimonials_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `quote` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `author` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci,
  `rating` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int UNSIGNED NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `home_testimonials_contents`
--

INSERT INTO `home_testimonials_contents` (`id`, `quote`, `author`, `role`, `image`, `rating`, `sort_order`, `active`, `created_at`, `updated_at`) VALUES
(19, '3G Decorative Group\'s ability to create exceptional luxury interiors stands out. Their attention to architectural detail and refined aesthetics transformed our residence into a timeless masterpiece.', 'Sarah Mitchell', 'Luxury Homeowner, Manhattan', '/uploads/testimonials/testimonial-1.jpg', '4.9 out of 5', 1, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(20, 'The level of sophistication and precision they bring to every design decision is remarkable. Our commercial space now reflects the premium quality we stand for.', 'David Chen', 'CEO, Design Studio', '/uploads/testimonials/testimonial-2.jpg', '4.8 out of 5', 2, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(21, 'Working with 3G was an extraordinary experience. They understood our vision for luxury and elegance, delivering interior architecture that exceeds every expectation.', 'Emily Rodriguez', 'Property Developer, Miami', '/uploads/testimonials/testimonial-3.jpg', '4.9 out of 5', 3, 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` smallint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_07_13_104734_create_personal_access_tokens_table', 1),
(5, '2026_07_13_110000_create_cms_contents_table', 1),
(6, '2026_07_13_110100_create_enquiries_table', 1),
(7, '2026_07_13_120000_create_cms_tables', 1),
(8, '2026_07_13_180000_rename_cms_tables_and_add_active', 1),
(9, '2026_07_14_140000_create_contact_office_contents_table', 2),
(10, '2026_07_28_160000_create_contact_page_contents_table', 3),
(11, '2026_07_28_170000_rename_home_page_section_tables', 4),
(12, '2026_07_28_180000_create_service_page_tables', 5),
(13, '2026_07_28_190000_consolidate_service_page_tables', 6),
(14, '2026_07_28_200000_drop_service_page_cms_tables', 7);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'admin-token', '6d87c1ba0481df7d32fb6155332c9ea085e588de21e0aceb39223cc4d2bb02e4', '[\"*\"]', '2026-07-14 05:45:36', NULL, '2026-07-14 02:06:58', '2026-07-14 05:45:36'),
(2, 'App\\Models\\User', 2, 'admin-token', 'd49c5a3a3d90f9e9a39596db02ab727bdb802712b3d66beae85de4efd0a2aed8', '[\"*\"]', NULL, NULL, '2026-07-14 02:12:46', '2026-07-14 02:12:46'),
(3, 'App\\Models\\User', 1, 'admin-token', 'c9496983a1fa4a09405b7e4d733e5fe42176bde8e3112e1734ab7d5b27f6efee', '[\"*\"]', '2026-07-14 06:38:17', NULL, '2026-07-14 06:36:02', '2026-07-14 06:38:17'),
(6, 'App\\Models\\User', 1, 'admin-token', 'fd6d72542a3bd619dd4dcb7bfbf776bf4f8bde37d794efa5725a6bbbc38e233e', '[\"*\"]', '2026-07-28 04:21:02', NULL, '2026-07-28 03:54:01', '2026-07-28 04:21:02'),
(7, 'App\\Models\\User', 1, 'admin-token', '5f699e2a9f6cb37488881293b7491a7dd26349bda0e570bb79010d4cdb36afaa', '[\"*\"]', '2026-07-28 06:06:09', NULL, '2026-07-28 04:27:36', '2026-07-28 06:06:09');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `permissions` json DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `role`, `permissions`, `active`, `email_verified_at`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Super Admin', 'super@3gdeco.com', NULL, '$2y$12$UYLsZ7Q8B./PLDtZ6XieU.wDlAdfICQUdQu2h83Up5CmGpBdc2OfC', 'superadmin', '[\"*\"]', 1, NULL, NULL, '2026-07-13 06:29:07', '2026-07-14 04:00:53'),
(2, 'Admin', 'admin@3gdeco.com', NULL, '$2y$12$9gk3sLQ8cGff2jrhWVfNZeAqda2z.K6bqHSfu9SyUUoOnGZsyzYtG', 'admin', '[\"dashboard\", \"navigation\", \"hero\", \"about\", \"expertise\", \"projects\", \"services\", \"process\", \"testimonials\", \"footer\", \"contact-offices\", \"enquiries\", \"profile\"]', 1, NULL, NULL, '2026-07-13 06:29:07', '2026-07-14 04:00:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `cms_contents`
--
ALTER TABLE `cms_contents`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cms_contents_key_unique` (`key`);

--
-- Indexes for table `contact_office_contents`
--
ALTER TABLE `contact_office_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_page_contents`
--
ALTER TABLE `contact_page_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `enquiries`
--
ALTER TABLE `enquiries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Indexes for table `footer_contents`
--
ALTER TABLE `footer_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_about_contents`
--
ALTER TABLE `home_about_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_expertise_contents`
--
ALTER TABLE `home_expertise_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_hero_contents`
--
ALTER TABLE `home_hero_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_navigation_menus`
--
ALTER TABLE `home_navigation_menus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_process_contents`
--
ALTER TABLE `home_process_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_projects_contents`
--
ALTER TABLE `home_projects_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_section_headers`
--
ALTER TABLE `home_section_headers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `section_headers_key_unique` (`key`);

--
-- Indexes for table `home_services_contents`
--
ALTER TABLE `home_services_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `home_testimonials_contents`
--
ALTER TABLE `home_testimonials_contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cms_contents`
--
ALTER TABLE `cms_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `contact_office_contents`
--
ALTER TABLE `contact_office_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `contact_page_contents`
--
ALTER TABLE `contact_page_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `enquiries`
--
ALTER TABLE `enquiries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `footer_contents`
--
ALTER TABLE `footer_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `home_about_contents`
--
ALTER TABLE `home_about_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `home_expertise_contents`
--
ALTER TABLE `home_expertise_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `home_hero_contents`
--
ALTER TABLE `home_hero_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `home_navigation_menus`
--
ALTER TABLE `home_navigation_menus`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `home_process_contents`
--
ALTER TABLE `home_process_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `home_projects_contents`
--
ALTER TABLE `home_projects_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `home_section_headers`
--
ALTER TABLE `home_section_headers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `home_services_contents`
--
ALTER TABLE `home_services_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `home_testimonials_contents`
--
ALTER TABLE `home_testimonials_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
