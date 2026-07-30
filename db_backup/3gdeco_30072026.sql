-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20250718.d42db65a1e
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 30, 2026 at 12:22 PM
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
-- Table structure for table `about_page_heroes`
--

CREATE TABLE `about_page_heroes` (
  `id` bigint UNSIGNED NOT NULL,
  `small_title` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `background_image` varchar(255) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `about_page_hero_features`
--

CREATE TABLE `about_page_hero_features` (
  `id` bigint UNSIGNED NOT NULL,
  `about_page_hero_id` bigint UNSIGNED NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `sort_order` int NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
('3g-deco-cache-cms.public.list.contact-offices', 'a:3:{i:0;a:10:{s:2:\"id\";i:14;s:5:\"label\";s:7:\"Kolkata\";s:7:\"heading\";s:15:\"Kolkata Address\";s:11:\"studioTitle\";s:24:\"Visit Our Kolkata Studio\";s:7:\"address\";s:93:\"14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India\";s:5:\"phone\";s:10:\"8167028450\";s:5:\"email\";s:21:\"info@3gdecorative.com\";s:5:\"hours\";s:32:\"Mon – Sat, 9:00 AM – 7:00 PM\";s:8:\"mapEmbed\";s:200:\"https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed\";s:6:\"active\";b:1;}i:1;a:10:{s:2:\"id\";i:15;s:5:\"label\";s:9:\"Bangalore\";s:7:\"heading\";s:17:\"Bangalore Address\";s:11:\"studioTitle\";s:26:\"Visit Our Bangalore Studio\";s:7:\"address\";s:93:\"14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India\";s:5:\"phone\";s:10:\"8167028450\";s:5:\"email\";s:21:\"info@3gdecorative.com\";s:5:\"hours\";s:32:\"Mon – Sat, 9:00 AM – 7:00 PM\";s:8:\"mapEmbed\";s:200:\"https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed\";s:6:\"active\";b:1;}i:2;a:10:{s:2:\"id\";i:16;s:5:\"label\";s:3:\"Goa\";s:7:\"heading\";s:11:\"Goa Address\";s:11:\"studioTitle\";s:20:\"Visit Our Goa Studio\";s:7:\"address\";s:93:\"14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India\";s:5:\"phone\";s:10:\"8167028450\";s:5:\"email\";s:21:\"info@3gdecorative.com\";s:5:\"hours\";s:32:\"Mon – Sat, 9:00 AM – 7:00 PM\";s:8:\"mapEmbed\";s:200:\"https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed\";s:6:\"active\";b:1;}}', 1785310149),
('3g-deco-cache-cms.public.list.expertise', 'a:3:{i:0;a:5:{s:2:\"id\";i:19;s:5:\"title\";s:28:\"Innovative Interior Concepts\";s:11:\"description\";s:85:\"Fresh and creative design solutions crafted to reflect personality and functionality.\";s:5:\"image\";s:34:\"/uploads/expertise/expertise-1.jpg\";s:6:\"active\";b:1;}i:1;a:5:{s:2:\"id\";i:20;s:5:\"title\";s:20:\"Luxury Living Spaces\";s:11:\"description\";s:76:\"Elegant interiors blending comfort, sophistication, and timeless aesthetics.\";s:5:\"image\";s:34:\"/uploads/expertise/expertise-2.jpg\";s:6:\"active\";b:1;}i:2;a:5:{s:2:\"id\";i:21;s:5:\"title\";s:27:\"Modern Architectural Vision\";s:11:\"description\";s:77:\"Bold architectural concepts designed with precision, balance, and innovation.\";s:5:\"image\";s:34:\"/uploads/expertise/expertise-3.jpg\";s:6:\"active\";b:1;}}', 1785310088),
('3g-deco-cache-cms.public.list.navigation', 'a:6:{i:0;a:6:{s:2:\"id\";i:43;s:5:\"label\";s:4:\"HOME\";s:4:\"link\";s:1:\"/\";s:5:\"order\";i:1;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:1;a:6:{s:2:\"id\";i:44;s:5:\"label\";s:9:\"EXPERTISE\";s:4:\"link\";s:10:\"/#features\";s:5:\"order\";i:2;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:2;a:6:{s:2:\"id\";i:45;s:5:\"label\";s:5:\"ABOUT\";s:4:\"link\";s:6:\"/about\";s:5:\"order\";i:3;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:3;a:6:{s:2:\"id\";i:46;s:5:\"label\";s:8:\"SERVICES\";s:4:\"link\";s:9:\"/services\";s:5:\"order\";i:4;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:4;a:6:{s:2:\"id\";i:47;s:5:\"label\";s:8:\"PROJECTS\";s:4:\"link\";s:10:\"/#projects\";s:5:\"order\";i:5;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:5;a:6:{s:2:\"id\";i:48;s:5:\"label\";s:7:\"CONTACT\";s:4:\"link\";s:8:\"/contact\";s:5:\"order\";i:6;s:7:\"visible\";b:1;s:6:\"active\";b:1;}}', 1785309848),
('3g-deco-cache-cms.public.list.process', 'a:5:{i:0;a:5:{s:2:\"id\";i:31;s:4:\"step\";s:2:\"01\";s:5:\"title\";s:12:\"Consultation\";s:11:\"description\";s:42:\"Understanding your vision and requirements\";s:6:\"active\";b:1;}i:1;a:5:{s:2:\"id\";i:32;s:4:\"step\";s:2:\"02\";s:5:\"title\";s:14:\"Concept Design\";s:11:\"description\";s:34:\"Creating detailed design proposals\";s:6:\"active\";b:1;}i:2;a:5:{s:2:\"id\";i:33;s:4:\"step\";s:2:\"03\";s:5:\"title\";s:8:\"Planning\";s:11:\"description\";s:35:\"Refining every detail to perfection\";s:6:\"active\";b:1;}i:3;a:5:{s:2:\"id\";i:34;s:4:\"step\";s:2:\"04\";s:5:\"title\";s:9:\"Execution\";s:11:\"description\";s:33:\"Bringing your dream space to life\";s:6:\"active\";b:1;}i:4;a:5:{s:2:\"id\";i:35;s:4:\"step\";s:2:\"05\";s:5:\"title\";s:8:\"Delivery\";s:11:\"description\";s:37:\"Final handover with quality assurance\";s:6:\"active\";b:1;}}', 1785310089),
('3g-deco-cache-cms.public.list.projects', 'a:5:{i:0;a:6:{s:2:\"id\";i:31;s:5:\"title\";s:21:\"Modern Elegance Villa\";s:8:\"category\";s:11:\"Residential\";s:5:\"image\";s:31:\"/uploads/projects/project-1.jpg\";s:8:\"featured\";b:1;s:6:\"active\";b:1;}i:1;a:6:{s:2:\"id\";i:32;s:5:\"title\";s:19:\"Contemporary Dining\";s:8:\"category\";s:10:\"Commercial\";s:5:\"image\";s:31:\"/uploads/projects/project-2.jpg\";s:8:\"featured\";b:0;s:6:\"active\";b:1;}i:2;a:6:{s:2:\"id\";i:33;s:5:\"title\";s:16:\"Luxury Penthouse\";s:8:\"category\";s:11:\"Residential\";s:5:\"image\";s:31:\"/uploads/projects/project-3.jpg\";s:8:\"featured\";b:0;s:6:\"active\";b:1;}i:3;a:6:{s:2:\"id\";i:34;s:5:\"title\";s:16:\"Executive Office\";s:8:\"category\";s:10:\"Commercial\";s:5:\"image\";s:31:\"/uploads/projects/project-4.jpg\";s:8:\"featured\";b:0;s:6:\"active\";b:1;}i:4;a:6:{s:2:\"id\";i:35;s:5:\"title\";s:17:\"Minimalist Lounge\";s:8:\"category\";s:11:\"Residential\";s:5:\"image\";s:31:\"/uploads/projects/project-5.jpg\";s:8:\"featured\";b:0;s:6:\"active\";b:1;}}', 1785310088),
('3g-deco-cache-cms.public.list.services', 'a:6:{i:0;a:6:{s:2:\"id\";i:37;s:5:\"title\";s:15:\"Interior Design\";s:8:\"category\";s:6:\"Design\";s:11:\"description\";s:106:\"Bespoke interior solutions that blend aesthetics with functionality for residential and commercial spaces.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-1.jpg\";s:6:\"active\";b:1;}i:1;a:6:{s:2:\"id\";i:38;s:5:\"title\";s:22:\"Architectural Planning\";s:8:\"category\";s:12:\"Architecture\";s:11:\"description\";s:99:\"Innovative architectural planning and design services that bring your vision to structural reality.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-2.jpg\";s:6:\"active\";b:1;}i:2;a:6:{s:2:\"id\";i:39;s:5:\"title\";s:16:\"Furniture Design\";s:8:\"category\";s:6:\"Custom\";s:11:\"description\";s:96:\"Custom furniture pieces crafted to perfection, combining luxury with comfort and timeless style.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-3.jpg\";s:6:\"active\";b:1;}i:3;a:6:{s:2:\"id\";i:40;s:5:\"title\";s:16:\"Turnkey Projects\";s:8:\"category\";s:11:\"Development\";s:11:\"description\";s:92:\"Complete end-to-end project execution from concept to completion with seamless coordination.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-4.jpg\";s:6:\"active\";b:1;}i:4;a:6:{s:2:\"id\";i:41;s:5:\"title\";s:20:\"Commercial Interiors\";s:8:\"category\";s:10:\"Commercial\";s:11:\"description\";s:94:\"Professional workspace design that enhances productivity while reflecting your brand identity.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-5.jpg\";s:6:\"active\";b:1;}i:5;a:6:{s:2:\"id\";i:42;s:5:\"title\";s:18:\"Luxury Renovations\";s:8:\"category\";s:10:\"Renovation\";s:11:\"description\";s:90:\"Transform existing spaces into luxurious environments with our expert renovation services.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-6.jpg\";s:6:\"active\";b:1;}}', 1785310089),
('3g-deco-cache-cms.public.list.testimonials', 'a:3:{i:0;a:7:{s:2:\"id\";i:19;s:5:\"quote\";s:198:\"3G Decorative Group\'s ability to create exceptional luxury interiors stands out. Their attention to architectural detail and refined aesthetics transformed our residence into a timeless masterpiece.\";s:6:\"author\";s:14:\"Sarah Mitchell\";s:4:\"role\";s:27:\"Luxury Homeowner, Manhattan\";s:5:\"image\";s:39:\"/uploads/testimonials/testimonial-1.jpg\";s:6:\"rating\";s:12:\"4.9 out of 5\";s:6:\"active\";b:1;}i:1;a:7:{s:2:\"id\";i:20;s:5:\"quote\";s:160:\"The level of sophistication and precision they bring to every design decision is remarkable. Our commercial space now reflects the premium quality we stand for.\";s:6:\"author\";s:10:\"David Chen\";s:4:\"role\";s:18:\"CEO, Design Studio\";s:5:\"image\";s:39:\"/uploads/testimonials/testimonial-2.jpg\";s:6:\"rating\";s:12:\"4.8 out of 5\";s:6:\"active\";b:1;}i:2;a:7:{s:2:\"id\";i:21;s:5:\"quote\";s:165:\"Working with 3G was an extraordinary experience. They understood our vision for luxury and elegance, delivering interior architecture that exceeds every expectation.\";s:6:\"author\";s:15:\"Emily Rodriguez\";s:4:\"role\";s:25:\"Property Developer, Miami\";s:5:\"image\";s:39:\"/uploads/testimonials/testimonial-3.jpg\";s:6:\"rating\";s:12:\"4.9 out of 5\";s:6:\"active\";b:1;}}', 1785310090),
('3g-deco-cache-cms.public.section.expertise-section', 'a:9:{s:5:\"label\";s:0:\"\";s:5:\"title\";s:0:\"\";s:10:\"titleLine1\";s:8:\"Crafting\";s:10:\"titleLine2\";s:18:\"Exceptional Spaces\";s:14:\"titleHighlight\";s:0:\"\";s:11:\"description\";s:83:\"Timeless interiors shaped through elegance, precision, and visionary craftsmanship.\";s:7:\"ctaText\";s:0:\"\";s:12:\"contentTable\";s:23:\"home_expertise_contents\";s:6:\"active\";b:1;}', 1785310087),
('3g-deco-cache-cms.public.section.process-section', 'a:9:{s:5:\"label\";s:11:\"OUR PROCESS\";s:5:\"title\";s:11:\"How We Work\";s:10:\"titleLine1\";s:0:\"\";s:10:\"titleLine2\";s:0:\"\";s:14:\"titleHighlight\";s:0:\"\";s:11:\"description\";s:45:\"A seamless journey from concept to completion\";s:7:\"ctaText\";s:0:\"\";s:12:\"contentTable\";s:21:\"home_process_contents\";s:6:\"active\";b:1;}', 1785310089),
('3g-deco-cache-cms.public.section.projects-section', 'a:9:{s:5:\"label\";s:9:\"PORTFOLIO\";s:5:\"title\";s:17:\"Featured Projects\";s:10:\"titleLine1\";s:0:\"\";s:10:\"titleLine2\";s:0:\"\";s:14:\"titleHighlight\";s:0:\"\";s:11:\"description\";s:68:\"A curated selection of our most prestigious interior design projects\";s:7:\"ctaText\";s:20:\"Explore All Projects\";s:12:\"contentTable\";s:22:\"home_projects_contents\";s:6:\"active\";b:1;}', 1785310088),
('3g-deco-cache-cms.public.section.services-section', 'a:9:{s:5:\"label\";s:8:\"Services\";s:5:\"title\";s:24:\"Services Crafted for You\";s:10:\"titleLine1\";s:0:\"\";s:10:\"titleLine2\";s:0:\"\";s:14:\"titleHighlight\";s:0:\"\";s:11:\"description\";s:0:\"\";s:7:\"ctaText\";s:0:\"\";s:12:\"contentTable\";s:22:\"home_services_contents\";s:6:\"active\";b:1;}', 1785310089),
('3g-deco-cache-cms.public.section.testimonials-section', 'a:9:{s:5:\"label\";s:12:\"TESTIMONIALS\";s:5:\"title\";s:0:\"\";s:10:\"titleLine1\";s:21:\"Genuine Feedback From\";s:10:\"titleLine2\";s:0:\"\";s:14:\"titleHighlight\";s:19:\"Our Loyal Customers\";s:11:\"description\";s:107:\"Trusted by homeowners and businesses for creating spaces defined by elegance, comfort, and timeless luxury.\";s:7:\"ctaText\";s:0:\"\";s:12:\"contentTable\";s:26:\"home_testimonials_contents\";s:6:\"active\";b:1;}', 1785310090),
('3g-deco-cache-cms.public.singleton.about', 'a:9:{s:5:\"label\";s:8:\"ABOUT US\";s:10:\"titleLine1\";s:15:\"Creating Spaces\";s:10:\"titleLine2\";s:4:\"That\";s:14:\"titleHighlight\";s:7:\"Inspire\";s:10:\"paragraph1\";s:175:\"With over 15 years of excellence in interior architecture, 3G Decorative Group transforms visions into timeless spaces blending luxury, innovation, and refined sophistication.\";s:10:\"paragraph2\";s:107:\"Every detail is carefully crafted to create environments that inspire comfort, beauty and lasting elegance.\";s:6:\"images\";a:4:{i:0;s:26:\"/uploads/about/about-1.jpg\";i:1;s:26:\"/uploads/about/about-2.jpg\";i:2;s:26:\"/uploads/about/about-3.jpg\";i:3;s:26:\"/uploads/about/about-4.jpg\";}s:10:\"badgeImage\";s:24:\"/uploads/about/badge.jpg\";s:6:\"active\";b:1;}', 1785310087),
('3g-deco-cache-cms.public.singleton.contact-page', 'a:14:{s:11:\"bannerImage\";s:41:\"/uploads/pages/contact/contact-banner.jpg\";s:11:\"heroEyebrow\";s:12:\"Get In Touch\";s:14:\"heroTitleLine1\";s:11:\"Let\'s Build\";s:14:\"heroTitleLine2\";s:9:\"Something\";s:18:\"heroTitleHighlight\";s:11:\"Remarkable.\";s:15:\"heroDescription\";s:119:\"Share your vision for corporate interiors, civil structures, or turnkey projects — our team responds within 24 hours.\";s:14:\"detailsEyebrow\";s:8:\"Reach Us\";s:12:\"detailsTitle\";s:17:\"Company Details &\";s:21:\"detailsTitleHighlight\";s:12:\"Inquiry Form\";s:18:\"detailsDescription\";s:125:\"Find our studios on the map or send us a message — tell us what your project is regarding and we will guide you from there.\";s:11:\"formEyebrow\";s:15:\"Send an Inquiry\";s:9:\"formTitle\";s:26:\"Tell us about your project\";s:15:\"formDescription\";s:55:\"Fields marked with your details help us respond faster.\";s:6:\"active\";b:1;}', 1785310148),
('3g-deco-cache-cms.public.site', 'a:16:{s:10:\"navigation\";a:6:{i:0;a:6:{s:2:\"id\";i:43;s:5:\"label\";s:4:\"HOME\";s:4:\"link\";s:1:\"/\";s:5:\"order\";i:1;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:1;a:6:{s:2:\"id\";i:44;s:5:\"label\";s:9:\"EXPERTISE\";s:4:\"link\";s:10:\"/#features\";s:5:\"order\";i:2;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:2;a:6:{s:2:\"id\";i:45;s:5:\"label\";s:5:\"ABOUT\";s:4:\"link\";s:6:\"/about\";s:5:\"order\";i:3;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:3;a:6:{s:2:\"id\";i:46;s:5:\"label\";s:8:\"SERVICES\";s:4:\"link\";s:9:\"/services\";s:5:\"order\";i:4;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:4;a:6:{s:2:\"id\";i:47;s:5:\"label\";s:8:\"PROJECTS\";s:4:\"link\";s:10:\"/#projects\";s:5:\"order\";i:5;s:7:\"visible\";b:1;s:6:\"active\";b:1;}i:5;a:6:{s:2:\"id\";i:48;s:5:\"label\";s:7:\"CONTACT\";s:4:\"link\";s:8:\"/contact\";s:5:\"order\";i:6;s:7:\"visible\";b:1;s:6:\"active\";b:1;}}s:4:\"hero\";a:14:{s:7:\"tagline\";s:20:\"SPACES THAT INSPIRE.\";s:13:\"headlineLine1\";s:20:\"Corporate Interiors.\";s:13:\"headlineLine2\";s:17:\"Civil Structures.\";s:10:\"scriptText\";s:17:\"Built to Elevate.\";s:11:\"description\";s:137:\"From modern workplaces to industrial landmarks — we design and build spaces that drive productivity, efficiency and sustainable growth.\";s:13:\"leftCardTitle\";s:19:\"Corporate\nInteriors\";s:14:\"rightCardTitle\";s:16:\"Civil\nStructures\";s:16:\"ctaCorporateText\";s:26:\"Explore Corporate Projects\";s:16:\"ctaCorporateLink\";s:19:\"#corporate-projects\";s:12:\"ctaCivilText\";s:22:\"Explore Civil Projects\";s:12:\"ctaCivilLink\";s:15:\"#civil-projects\";s:15:\"backgroundImage\";s:0:\"\";s:5:\"stats\";a:3:{i:0;a:3:{s:2:\"id\";i:1;s:5:\"label\";s:18:\"Projects Delivered\";s:6:\"number\";s:4:\"250+\";}i:1;a:3:{s:2:\"id\";i:2;s:5:\"label\";s:16:\"Years Experience\";s:6:\"number\";s:3:\"15+\";}i:2;a:3:{s:2:\"id\";i:3;s:5:\"label\";s:19:\"Client Satisfaction\";s:6:\"number\";s:4:\"100%\";}}s:6:\"active\";b:1;}s:6:\"footer\";a:10:{s:7:\"tagline\";s:89:\"Crafting luxurious interiors that blend elegance, innovation and timeless sophistication.\";s:7:\"address\";s:20:\"Kolkata, West Bengal\";s:7:\"country\";s:5:\"India\";s:5:\"phone\";s:10:\"8167028450\";s:5:\"email\";s:26:\"info@3gdecorativegroup.com\";s:5:\"hours\";s:24:\"Mon - Sat : 10 AM - 7 PM\";s:15:\"newsletterTitle\";s:13:\"STAY INSPIRED\";s:14:\"newsletterText\";s:89:\"Subscribe to our newsletter and be the first to know about our latest projects and ideas.\";s:9:\"copyright\";s:49:\"© 2025 3G Decorative Group. All Rights Reserved.\";s:6:\"active\";b:1;}s:5:\"about\";a:9:{s:5:\"label\";s:8:\"ABOUT US\";s:10:\"titleLine1\";s:15:\"Creating Spaces\";s:10:\"titleLine2\";s:4:\"That\";s:14:\"titleHighlight\";s:7:\"Inspire\";s:10:\"paragraph1\";s:175:\"With over 15 years of excellence in interior architecture, 3G Decorative Group transforms visions into timeless spaces blending luxury, innovation, and refined sophistication.\";s:10:\"paragraph2\";s:107:\"Every detail is carefully crafted to create environments that inspire comfort, beauty and lasting elegance.\";s:6:\"images\";a:4:{i:0;s:26:\"/uploads/about/about-1.jpg\";i:1;s:26:\"/uploads/about/about-2.jpg\";i:2;s:26:\"/uploads/about/about-3.jpg\";i:3;s:26:\"/uploads/about/about-4.jpg\";}s:10:\"badgeImage\";s:24:\"/uploads/about/badge.jpg\";s:6:\"active\";b:1;}s:11:\"contactPage\";a:14:{s:11:\"bannerImage\";s:41:\"/uploads/pages/contact/contact-banner.jpg\";s:11:\"heroEyebrow\";s:12:\"Get In Touch\";s:14:\"heroTitleLine1\";s:11:\"Let\'s Build\";s:14:\"heroTitleLine2\";s:9:\"Something\";s:18:\"heroTitleHighlight\";s:11:\"Remarkable.\";s:15:\"heroDescription\";s:119:\"Share your vision for corporate interiors, civil structures, or turnkey projects — our team responds within 24 hours.\";s:14:\"detailsEyebrow\";s:8:\"Reach Us\";s:12:\"detailsTitle\";s:17:\"Company Details &\";s:21:\"detailsTitleHighlight\";s:12:\"Inquiry Form\";s:18:\"detailsDescription\";s:125:\"Find our studios on the map or send us a message — tell us what your project is regarding and we will guide you from there.\";s:11:\"formEyebrow\";s:15:\"Send an Inquiry\";s:9:\"formTitle\";s:26:\"Tell us about your project\";s:15:\"formDescription\";s:55:\"Fields marked with your details help us respond faster.\";s:6:\"active\";b:1;}s:14:\"contactOffices\";a:3:{i:0;a:10:{s:2:\"id\";i:14;s:5:\"label\";s:7:\"Kolkata\";s:7:\"heading\";s:15:\"Kolkata Address\";s:11:\"studioTitle\";s:24:\"Visit Our Kolkata Studio\";s:7:\"address\";s:93:\"14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India\";s:5:\"phone\";s:10:\"8167028450\";s:5:\"email\";s:21:\"info@3gdecorative.com\";s:5:\"hours\";s:32:\"Mon – Sat, 9:00 AM – 7:00 PM\";s:8:\"mapEmbed\";s:200:\"https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed\";s:6:\"active\";b:1;}i:1;a:10:{s:2:\"id\";i:15;s:5:\"label\";s:9:\"Bangalore\";s:7:\"heading\";s:17:\"Bangalore Address\";s:11:\"studioTitle\";s:26:\"Visit Our Bangalore Studio\";s:7:\"address\";s:93:\"14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India\";s:5:\"phone\";s:10:\"8167028450\";s:5:\"email\";s:21:\"info@3gdecorative.com\";s:5:\"hours\";s:32:\"Mon – Sat, 9:00 AM – 7:00 PM\";s:8:\"mapEmbed\";s:200:\"https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed\";s:6:\"active\";b:1;}i:2;a:10:{s:2:\"id\";i:16;s:5:\"label\";s:3:\"Goa\";s:7:\"heading\";s:11:\"Goa Address\";s:11:\"studioTitle\";s:20:\"Visit Our Goa Studio\";s:7:\"address\";s:93:\"14, 16A, Golf Club Rd, Rajendra Prasad Colony, Tollygunge, Kolkata, West Bengal 700033, India\";s:5:\"phone\";s:10:\"8167028450\";s:5:\"email\";s:21:\"info@3gdecorative.com\";s:5:\"hours\";s:32:\"Mon – Sat, 9:00 AM – 7:00 PM\";s:8:\"mapEmbed\";s:200:\"https://maps.google.com/maps?q=14%2C%2016A%2C%20Golf%20Club%20Rd%2C%20Rajendra%20Prasad%20Colony%2C%20Tollygunge%2C%20Kolkata%2C%20West%20Bengal%20700033%2C%20India&t=&z=16&ie=UTF8&iwloc=&output=embed\";s:6:\"active\";b:1;}}s:16:\"expertiseSection\";a:9:{s:5:\"label\";s:0:\"\";s:5:\"title\";s:0:\"\";s:10:\"titleLine1\";s:8:\"Crafting\";s:10:\"titleLine2\";s:18:\"Exceptional Spaces\";s:14:\"titleHighlight\";s:0:\"\";s:11:\"description\";s:83:\"Timeless interiors shaped through elegance, precision, and visionary craftsmanship.\";s:7:\"ctaText\";s:0:\"\";s:12:\"contentTable\";s:23:\"home_expertise_contents\";s:6:\"active\";b:1;}s:9:\"expertise\";a:3:{i:0;a:5:{s:2:\"id\";i:19;s:5:\"title\";s:28:\"Innovative Interior Concepts\";s:11:\"description\";s:85:\"Fresh and creative design solutions crafted to reflect personality and functionality.\";s:5:\"image\";s:34:\"/uploads/expertise/expertise-1.jpg\";s:6:\"active\";b:1;}i:1;a:5:{s:2:\"id\";i:20;s:5:\"title\";s:20:\"Luxury Living Spaces\";s:11:\"description\";s:76:\"Elegant interiors blending comfort, sophistication, and timeless aesthetics.\";s:5:\"image\";s:34:\"/uploads/expertise/expertise-2.jpg\";s:6:\"active\";b:1;}i:2;a:5:{s:2:\"id\";i:21;s:5:\"title\";s:27:\"Modern Architectural Vision\";s:11:\"description\";s:77:\"Bold architectural concepts designed with precision, balance, and innovation.\";s:5:\"image\";s:34:\"/uploads/expertise/expertise-3.jpg\";s:6:\"active\";b:1;}}s:15:\"projectsSection\";a:9:{s:5:\"label\";s:9:\"PORTFOLIO\";s:5:\"title\";s:17:\"Featured Projects\";s:10:\"titleLine1\";s:0:\"\";s:10:\"titleLine2\";s:0:\"\";s:14:\"titleHighlight\";s:0:\"\";s:11:\"description\";s:68:\"A curated selection of our most prestigious interior design projects\";s:7:\"ctaText\";s:20:\"Explore All Projects\";s:12:\"contentTable\";s:22:\"home_projects_contents\";s:6:\"active\";b:1;}s:8:\"projects\";a:5:{i:0;a:6:{s:2:\"id\";i:31;s:5:\"title\";s:21:\"Modern Elegance Villa\";s:8:\"category\";s:11:\"Residential\";s:5:\"image\";s:31:\"/uploads/projects/project-1.jpg\";s:8:\"featured\";b:1;s:6:\"active\";b:1;}i:1;a:6:{s:2:\"id\";i:32;s:5:\"title\";s:19:\"Contemporary Dining\";s:8:\"category\";s:10:\"Commercial\";s:5:\"image\";s:31:\"/uploads/projects/project-2.jpg\";s:8:\"featured\";b:0;s:6:\"active\";b:1;}i:2;a:6:{s:2:\"id\";i:33;s:5:\"title\";s:16:\"Luxury Penthouse\";s:8:\"category\";s:11:\"Residential\";s:5:\"image\";s:31:\"/uploads/projects/project-3.jpg\";s:8:\"featured\";b:0;s:6:\"active\";b:1;}i:3;a:6:{s:2:\"id\";i:34;s:5:\"title\";s:16:\"Executive Office\";s:8:\"category\";s:10:\"Commercial\";s:5:\"image\";s:31:\"/uploads/projects/project-4.jpg\";s:8:\"featured\";b:0;s:6:\"active\";b:1;}i:4;a:6:{s:2:\"id\";i:35;s:5:\"title\";s:17:\"Minimalist Lounge\";s:8:\"category\";s:11:\"Residential\";s:5:\"image\";s:31:\"/uploads/projects/project-5.jpg\";s:8:\"featured\";b:0;s:6:\"active\";b:1;}}s:15:\"servicesSection\";a:9:{s:5:\"label\";s:8:\"Services\";s:5:\"title\";s:24:\"Services Crafted for You\";s:10:\"titleLine1\";s:0:\"\";s:10:\"titleLine2\";s:0:\"\";s:14:\"titleHighlight\";s:0:\"\";s:11:\"description\";s:0:\"\";s:7:\"ctaText\";s:0:\"\";s:12:\"contentTable\";s:22:\"home_services_contents\";s:6:\"active\";b:1;}s:8:\"services\";a:6:{i:0;a:6:{s:2:\"id\";i:37;s:5:\"title\";s:15:\"Interior Design\";s:8:\"category\";s:6:\"Design\";s:11:\"description\";s:106:\"Bespoke interior solutions that blend aesthetics with functionality for residential and commercial spaces.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-1.jpg\";s:6:\"active\";b:1;}i:1;a:6:{s:2:\"id\";i:38;s:5:\"title\";s:22:\"Architectural Planning\";s:8:\"category\";s:12:\"Architecture\";s:11:\"description\";s:99:\"Innovative architectural planning and design services that bring your vision to structural reality.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-2.jpg\";s:6:\"active\";b:1;}i:2;a:6:{s:2:\"id\";i:39;s:5:\"title\";s:16:\"Furniture Design\";s:8:\"category\";s:6:\"Custom\";s:11:\"description\";s:96:\"Custom furniture pieces crafted to perfection, combining luxury with comfort and timeless style.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-3.jpg\";s:6:\"active\";b:1;}i:3;a:6:{s:2:\"id\";i:40;s:5:\"title\";s:16:\"Turnkey Projects\";s:8:\"category\";s:11:\"Development\";s:11:\"description\";s:92:\"Complete end-to-end project execution from concept to completion with seamless coordination.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-4.jpg\";s:6:\"active\";b:1;}i:4;a:6:{s:2:\"id\";i:41;s:5:\"title\";s:20:\"Commercial Interiors\";s:8:\"category\";s:10:\"Commercial\";s:11:\"description\";s:94:\"Professional workspace design that enhances productivity while reflecting your brand identity.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-5.jpg\";s:6:\"active\";b:1;}i:5;a:6:{s:2:\"id\";i:42;s:5:\"title\";s:18:\"Luxury Renovations\";s:8:\"category\";s:10:\"Renovation\";s:11:\"description\";s:90:\"Transform existing spaces into luxurious environments with our expert renovation services.\";s:15:\"backgroundImage\";s:31:\"/uploads/services/service-6.jpg\";s:6:\"active\";b:1;}}s:14:\"processSection\";a:9:{s:5:\"label\";s:11:\"OUR PROCESS\";s:5:\"title\";s:11:\"How We Work\";s:10:\"titleLine1\";s:0:\"\";s:10:\"titleLine2\";s:0:\"\";s:14:\"titleHighlight\";s:0:\"\";s:11:\"description\";s:45:\"A seamless journey from concept to completion\";s:7:\"ctaText\";s:0:\"\";s:12:\"contentTable\";s:21:\"home_process_contents\";s:6:\"active\";b:1;}s:7:\"process\";a:5:{i:0;a:5:{s:2:\"id\";i:31;s:4:\"step\";s:2:\"01\";s:5:\"title\";s:12:\"Consultation\";s:11:\"description\";s:42:\"Understanding your vision and requirements\";s:6:\"active\";b:1;}i:1;a:5:{s:2:\"id\";i:32;s:4:\"step\";s:2:\"02\";s:5:\"title\";s:14:\"Concept Design\";s:11:\"description\";s:34:\"Creating detailed design proposals\";s:6:\"active\";b:1;}i:2;a:5:{s:2:\"id\";i:33;s:4:\"step\";s:2:\"03\";s:5:\"title\";s:8:\"Planning\";s:11:\"description\";s:35:\"Refining every detail to perfection\";s:6:\"active\";b:1;}i:3;a:5:{s:2:\"id\";i:34;s:4:\"step\";s:2:\"04\";s:5:\"title\";s:9:\"Execution\";s:11:\"description\";s:33:\"Bringing your dream space to life\";s:6:\"active\";b:1;}i:4;a:5:{s:2:\"id\";i:35;s:4:\"step\";s:2:\"05\";s:5:\"title\";s:8:\"Delivery\";s:11:\"description\";s:37:\"Final handover with quality assurance\";s:6:\"active\";b:1;}}s:19:\"testimonialsSection\";a:9:{s:5:\"label\";s:12:\"TESTIMONIALS\";s:5:\"title\";s:0:\"\";s:10:\"titleLine1\";s:21:\"Genuine Feedback From\";s:10:\"titleLine2\";s:0:\"\";s:14:\"titleHighlight\";s:19:\"Our Loyal Customers\";s:11:\"description\";s:107:\"Trusted by homeowners and businesses for creating spaces defined by elegance, comfort, and timeless luxury.\";s:7:\"ctaText\";s:0:\"\";s:12:\"contentTable\";s:26:\"home_testimonials_contents\";s:6:\"active\";b:1;}s:12:\"testimonials\";a:3:{i:0;a:7:{s:2:\"id\";i:19;s:5:\"quote\";s:198:\"3G Decorative Group\'s ability to create exceptional luxury interiors stands out. Their attention to architectural detail and refined aesthetics transformed our residence into a timeless masterpiece.\";s:6:\"author\";s:14:\"Sarah Mitchell\";s:4:\"role\";s:27:\"Luxury Homeowner, Manhattan\";s:5:\"image\";s:39:\"/uploads/testimonials/testimonial-1.jpg\";s:6:\"rating\";s:12:\"4.9 out of 5\";s:6:\"active\";b:1;}i:1;a:7:{s:2:\"id\";i:20;s:5:\"quote\";s:160:\"The level of sophistication and precision they bring to every design decision is remarkable. Our commercial space now reflects the premium quality we stand for.\";s:6:\"author\";s:10:\"David Chen\";s:4:\"role\";s:18:\"CEO, Design Studio\";s:5:\"image\";s:39:\"/uploads/testimonials/testimonial-2.jpg\";s:6:\"rating\";s:12:\"4.8 out of 5\";s:6:\"active\";b:1;}i:2;a:7:{s:2:\"id\";i:21;s:5:\"quote\";s:165:\"Working with 3G was an extraordinary experience. They understood our vision for luxury and elegance, delivering interior architecture that exceeds every expectation.\";s:6:\"author\";s:15:\"Emily Rodriguez\";s:4:\"role\";s:25:\"Property Developer, Miami\";s:5:\"image\";s:39:\"/uploads/testimonials/testimonial-3.jpg\";s:6:\"rating\";s:12:\"4.9 out of 5\";s:6:\"active\";b:1;}}}', 1785309946),
('3g-deco-cache-enquiry_otp_rate:071f1e8ae68a7e120fc7569665fc5aed67f64c73', 'i:1;', 1785312084),
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
(4, '/uploads/contact/contact_4.png', 'Get In Touch', 'Let\'s Build', 'Something', 'Remarkable.', 'Share your vision for corporate interiors, civil structures, or turnkey projects — our team responds within 24 hours.', 'Reach Us', 'Company Details &', 'Inquiry Form', 'Find our studios on the map or send us a message — tell us what your project is regarding and we will guide you from there.', 'Send an Inquiry', 'Tell us about your project', 'Fields marked with your details help us respond faster.', 1, '2026-07-28 05:56:18', '2026-07-29 02:36:19');

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
(16, 'Sneha Iyer', 'sneha@email.com', '+91 99887 76655', 'Luxury Renovation', 'Need consultation for penthouse interior.', 'in_progress', 1, '2026-07-28 05:56:18', '2026-07-28 05:56:18'),
(17, 'Jyoti', 'jyotibag9@gmail.com', '8167028450', 'Corporate Interior', 'testing', 'new', 1, '2026-07-29 01:32:09', '2026-07-29 01:32:09'),
(18, 'payel', 'info.payalkarmakar@gmail.com', '7896541235', 'Corporate Interior', 'testing', 'new', 1, '2026-07-29 05:26:30', '2026-07-29 05:26:30');

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
(6, 'Crafting luxurious interiors that blend elegance, innovation and timeless sophistication.', 'Kolkata, West Bengal', 'India', '8167028450', 'info@3gdecorativegroup.com', 'Mon - Sat : 10 AM - 7 PM', 'STAY INSPIRED', 'Subscribe to our newsletter and be the first to know about our latest projects and ideas.', '© 2025 3G Decorative Group. All Rights Reserved.', 1, '2026-07-28 05:56:18', '2026-07-29 05:37:18');

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
(7, 'ABOUT US', 'Creating Spaces', 'That', 'Inspire', 'With over 15 years of excellence in interior architecture, 3G Decorative Group transforms visions into timeless spaces blending luxury, innovation, and refined sophistication.', 'Every detail is carefully crafted to create environments that inspire comfort, beauty and lasting elegance.', '[\"/uploads/about/about-1.jpg\", \"/uploads/about/about-2.jpg\", \"/uploads/about/about-3.jpg\", \"data:image/jpeg;base64,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\"]', '/uploads/about/badge.jpg', 1, '2026-07-28 05:56:18', '2026-07-30 03:03:33');

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
(19, 'Innovative Interior Concepts', 'Fresh and creative design solutions crafted to reflect personality and functionality.', '/uploads/expertise/20260730104127-fj7z2lpt.jpg', 19, 1, '2026-07-28 05:56:18', '2026-07-30 05:11:38'),
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
(7, 'SPACES THAT INSPIRE.', 'Corporate Interiors.', 'Civil Structures.', 'Built to Elevate.', 'From modern workplaces to industrial landmarks — we design and build spaces that drive productivity, efficiency and sustainable growth.', 'Corporate\nInteriors', 'Civil\nStructures', 'Explore Corporate Projects', '#corporate-projects', 'Explore Civil Projects', '#civil-projects', '/uploads/hero/hero.png', '[{\"id\": 1, \"label\": \"Projects Delivered\", \"number\": \"250+\"}, {\"id\": 2, \"label\": \"Years Experience\", \"number\": \"15+\"}, {\"id\": 3, \"label\": \"Client Satisfaction\", \"number\": \"100%\"}]', 1, '2026-07-28 05:56:18', '2026-07-29 02:36:19');

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
(31, 'expertise', 'home_expertise_contents', NULL, NULL, 'Crafting', 'Exceptional Spaces', NULL, 'Timeless interiors shaped through elegance, precision, and visionary craftsmanship.', NULL, 1, '2026-07-28 05:56:18', '2026-07-29 07:08:20'),
(32, 'projects', 'home_projects_contents', 'PORTFOLIO', 'Featured Projects', NULL, NULL, NULL, 'A curated selection of our most prestigious interior design projects', 'Explore All Projects', 1, '2026-07-28 05:56:18', '2026-07-29 07:08:20'),
(33, 'services', 'home_services_contents', 'Services', 'Services Crafted for You', NULL, NULL, NULL, NULL, NULL, 1, '2026-07-28 05:56:18', '2026-07-29 07:08:20'),
(34, 'process', 'home_process_contents', 'OUR PROCESS', 'How We Work', NULL, NULL, NULL, 'A seamless journey from concept to completion', NULL, 1, '2026-07-28 05:56:18', '2026-07-29 07:08:20'),
(35, 'testimonials', 'home_testimonials_contents', 'TESTIMONIALS', NULL, 'Genuine Feedback From', NULL, 'Our Loyal Customers', 'Trusted by homeowners and businesses for creating spaces defined by elegance, comfort, and timeless luxury.', NULL, 1, '2026-07-28 05:56:18', '2026-07-29 07:08:20');

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
(67, 'Interior Design', 'Design', 'Bespoke interior solutions that blend aesthetics with functionality for residential and commercial spaces.', '/uploads/services/20260730102114-x3cspd8e.jpg', 1, 1, '2026-07-30 04:57:05', '2026-07-30 05:05:28'),
(68, 'Architectural Planning', 'Architecture', 'Innovative architectural planning and design services that bring your vision to structural reality.', '/uploads/services/20260730102405-n9jv5kfw.jpg', 2, 1, '2026-07-30 04:57:05', '2026-07-30 05:05:31'),
(69, 'Furniture Design', 'Custom', 'Custom furniture pieces crafted to perfection, combining luxury with comfort and timeless style.', '/uploads/services/20260730103524-7vqnnxg2.jpg', 3, 1, '2026-07-30 04:57:05', '2026-07-30 05:05:36'),
(70, 'Turnkey Projects', 'Development', 'Complete end-to-end project execution from concept to completion with seamless coordination.', '/uploads/services/20260730102654-8kjhq2aq.jpg', 4, 1, '2026-07-30 04:57:05', '2026-07-30 05:05:41'),
(71, 'Commercial Interiors', 'Commercial', 'Professional workspace design that enhances productivity while reflecting your brand identity.', '/uploads/services/service-5.jpg', 5, 1, '2026-07-30 04:57:05', '2026-07-30 05:05:47'),
(72, 'Luxury Renovations', 'Renovation', 'Transform existing spaces into luxurious environments with our expert renovation services.', '/uploads/services/service-6.jpg', 6, 1, '2026-07-30 04:57:05', '2026-07-30 05:05:52');

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
(14, '2026_07_28_200000_drop_service_page_cms_tables', 7),
(15, '2026_07_29_160000_add_whatsapp_number_to_footer_contents', 8),
(16, '2026_07_29_170000_create_site_contact_contents_table', 9);

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
(8, 'App\\Models\\User', 1, 'admin-token', 'b7d861a3cd4ba9078e06b75d73e8de8ab0d90ff06e9f9cd625ce5f3de905ebc5', '[\"*\"]', '2026-07-30 05:40:08', NULL, '2026-07-29 05:26:41', '2026-07-30 05:40:08'),
(9, 'App\\Models\\User', 1, 'admin-token', '60c28f987ddec38233704e0898822e3f122b616e2698756add0ee1d2f036c12c', '[\"*\"]', NULL, NULL, '2026-07-30 05:43:02', '2026-07-30 05:43:02'),
(10, 'App\\Models\\User', 1, 'admin-token', 'dbd665e972544a1eeda60c73dd77a6262c166f9fd24cf4330e0321257347c0ea', '[\"*\"]', NULL, NULL, '2026-07-30 05:43:16', '2026-07-30 05:43:16'),
(11, 'App\\Models\\User', 1, 'admin-token', 'fe8e052a78996d891de2589d84d0652cdc47a95810edc566492bbfd8fe3d95ce', '[\"*\"]', NULL, NULL, '2026-07-30 05:43:36', '2026-07-30 05:43:36'),
(12, 'App\\Models\\User', 1, 'admin-token', 'd64c8430e8531498fc4c3b5a2fdb7cfd117182d124457fd392d289c6dee2a7d3', '[\"*\"]', NULL, NULL, '2026-07-30 05:47:16', '2026-07-30 05:47:16'),
(13, 'App\\Models\\User', 1, 'admin-token', 'a807315ddeb05d01dfa0c63b315df4e2ffc617d09b35777209c306e7bc91793f', '[\"*\"]', NULL, NULL, '2026-07-30 05:48:36', '2026-07-30 05:48:36'),
(14, 'App\\Models\\User', 1, 'admin-token', 'e9767b5956ccbd977ace1581a0b3a4d4272f6f1d164f702c7b867c54783fa97d', '[\"*\"]', NULL, NULL, '2026-07-30 05:49:13', '2026-07-30 05:49:13'),
(16, 'App\\Models\\User', 1, 'admin-token', '70d9ed61b4b1043d880b7a99ffdbb2090bcf79c57a48bb85b14223bf9bd2b603', '[\"*\"]', '2026-07-30 06:10:11', NULL, '2026-07-30 05:52:42', '2026-07-30 06:10:11');

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
-- Table structure for table `site_contact_contents`
--

CREATE TABLE `site_contact_contents` (
  `id` bigint UNSIGNED NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(40) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(190) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hours` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `whatsapp_number` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_contact_contents`
--

INSERT INTO `site_contact_contents` (`id`, `address`, `country`, `phone`, `email`, `hours`, `whatsapp_number`, `active`, `created_at`, `updated_at`) VALUES
(1, 'Kolkata, West Bengal', 'India', '8167028450', 'info@3gdecorativegroup.com', 'Mon - Sat : 10 AM - 7 PM', '8167028450', 1, '2026-07-29 05:47:30', '2026-07-29 05:47:30');

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
-- Indexes for table `about_page_heroes`
--
ALTER TABLE `about_page_heroes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `about_page_hero_features`
--
ALTER TABLE `about_page_hero_features`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_about_page_hero` (`about_page_hero_id`);

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
-- Indexes for table `site_contact_contents`
--
ALTER TABLE `site_contact_contents`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `about_page_heroes`
--
ALTER TABLE `about_page_heroes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `about_page_hero_features`
--
ALTER TABLE `about_page_hero_features`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

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
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `home_section_headers`
--
ALTER TABLE `home_section_headers`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `home_services_contents`
--
ALTER TABLE `home_services_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

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
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `site_contact_contents`
--
ALTER TABLE `site_contact_contents`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `about_page_hero_features`
--
ALTER TABLE `about_page_hero_features`
  ADD CONSTRAINT `fk_about_page_hero` FOREIGN KEY (`about_page_hero_id`) REFERENCES `about_page_heroes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
