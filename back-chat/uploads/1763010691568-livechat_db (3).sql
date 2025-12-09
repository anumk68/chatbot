-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 12, 2025 at 02:35 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `livechat_db`
--

-- --------

--
-- Table structure for table `agent_invites`
--

CREATE TABLE `agent_invites` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `chatbot_id` int(11) DEFAULT NULL,
  `role` varchar(50) DEFAULT 'agent',
  `group_name` varchar(100) DEFAULT NULL,
  `token` text NOT NULL,
  `status` enum('pending','accepted') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `agent_invites`
--

INSERT INTO `agent_invites` (`id`, `email`, `chatbot_id`, `role`, `group_name`, `token`, `status`, `created_at`) VALUES
(1, 'test@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiaWF0IjoxNzYyODY0OTYzLCJleHAiOjE3NjI5NTEzNjN9.XvBGtKrLsm8Moeh19IFgqk9XPNXbc6SiSCxwjC6qcZM', 'pending', '2025-11-11 12:42:43'),
(2, 'test@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiaWF0IjoxNzYyODY1MDIxLCJleHAiOjE3NjI5NTE0MjF9.q7gAGDTme-H1zpu-fdu8w0PazqTAY3XW8kSSX8Ex5cw', 'pending', '2025-11-11 12:43:41'),
(3, 'test@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiaWF0IjoxNzYyODY1MTM5LCJleHAiOjE3NjI5NTE1Mzl9.m_0U3_UXzfdJB-BWDBKIaSE-GkChPsllWBBa1_gHq64', 'pending', '2025-11-11 12:45:39'),
(4, 'test@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiaWF0IjoxNzYyODY1MjUzLCJleHAiOjE3NjI5NTE2NTN9.wUw0GxykrWPZ-NQ-qkAUAyVb-jfiHmA_mon_iaCjiL4', 'pending', '2025-11-11 12:47:33'),
(5, 'test@gmail.com', 101, 'Agent', 'General', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiZ3JvdXBOYW1lIjoiR2VuZXJhbCIsImNoYXRib3RJZCI6MTAxLCJpYXQiOjE3NjI4NjU0NjgsImV4cCI6MTc2Mjk1MTg2OH0.GGh1Zu3cN4dwPXMbkqvYOkQ9tVdkFHVzW0s-V90uEQE', 'pending', '2025-11-11 12:51:08'),
(6, 'abc@gmail.com', 101, 'Agent', 'General', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJyb2xlIjoiQWdlbnQiLCJncm91cE5hbWUiOiJHZW5lcmFsIiwiY2hhdGJvdElkIjoxMDEsImlhdCI6MTc2Mjg2NTQ3MiwiZXhwIjoxNzYyOTUxODcyfQ.eqXoczOHruVmScm5lFI5ZE5-ndUfRPoD__0m2CSjgsk', 'pending', '2025-11-11 12:51:12'),
(7, 'test@gmail.com', 101, 'Agent', 'General', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiZ3JvdXBOYW1lIjoiR2VuZXJhbCIsImNoYXRib3RJZCI6MTAxLCJpYXQiOjE3NjI4NjU1MjQsImV4cCI6MTc2Mjk1MTkyNH0.if932IHAiOQylJ6RylmuyiYRBnRqSU-leO7rWgNns3Y', 'pending', '2025-11-11 12:52:04'),
(8, 'abc@gmail.com', 101, 'Agent', 'General', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJyb2xlIjoiQWdlbnQiLCJncm91cE5hbWUiOiJHZW5lcmFsIiwiY2hhdGJvdElkIjoxMDEsImlhdCI6MTc2Mjg2NTUyOCwiZXhwIjoxNzYyOTUxOTI4fQ.0Li5N-jJCpl-U1K2Ig63e1OOFfmGtyNM-jFAXvuAj58', 'pending', '2025-11-11 12:52:08'),
(9, 'test@gmail.com', 101, 'Agent', 'General', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiZ3JvdXBOYW1lIjoiR2VuZXJhbCIsImNoYXRib3RJZCI6MTAxLCJpYXQiOjE3NjI4NjU1NzksImV4cCI6MTc2Mjk1MTk3OX0.DbC1enI-kyepbbqlMbbCuffi7XzVjbjCzT8Mkqyt4V8', 'pending', '2025-11-11 12:52:59'),
(10, 'test@gmail.com', 101, 'Agent', 'General', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiZ3JvdXBOYW1lIjoiR2VuZXJhbCIsImNoYXRib3RJZCI6MTAxLCJpYXQiOjE3NjI4NjU3MjMsImV4cCI6MTc2Mjk1MjEyM30.iAo925nCqnjAX880HN6JrRT8EallCey_v6lEjeqTGnM', 'pending', '2025-11-11 12:55:23'),
(11, 'a@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiY2hhdGJvdElkIjpudWxsLCJpYXQiOjE3NjI4NjU5MDUsImV4cCI6MTc2Mjk1MjMwNX0.s6C5jZQ3p1X32TaWqe622Y9WwsD8XYhJU89PsssMBK0', 'pending', '2025-11-11 12:58:25'),
(12, 'ayu@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dUBnbWFpbC5jb20iLCJyb2xlIjoiQWdlbnQiLCJjaGF0Ym90SWQiOm51bGwsImlhdCI6MTc2MjkyMzE0MywiZXhwIjoxNzYzMDA5NTQzfQ.in5IclAQE2ILnrLUo10HrKqSucyxu5WEB5MoG3xuajo', 'pending', '2025-11-12 04:52:23'),
(13, 'ayu@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dUBnbWFpbC5jb20iLCJyb2xlIjoiQWdlbnQiLCJjaGF0Ym90SWQiOm51bGwsImlhdCI6MTc2MjkyMzE0NCwiZXhwIjoxNzYzMDA5NTQ0fQ.EkvmvWLaMXbwkYAO_mwdqnFg5aIKG0f_ny9Q4obas8s', 'pending', '2025-11-12 04:52:24'),
(14, 'ayu@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dUBnbWFpbC5jb20iLCJyb2xlIjoiQWdlbnQiLCJjaGF0Ym90SWQiOm51bGwsImlhdCI6MTc2MjkyMzE0NCwiZXhwIjoxNzYzMDA5NTQ0fQ.EkvmvWLaMXbwkYAO_mwdqnFg5aIKG0f_ny9Q4obas8s', 'pending', '2025-11-12 04:52:24'),
(15, 'aa@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhQGdtYWlsLmNvbSIsInJvbGUiOiJBZ2VudCIsImNoYXRib3RJZCI6bnVsbCwiaWF0IjoxNzYyOTIzMTU0LCJleHAiOjE3NjMwMDk1NTR9.HO_IxAimxDrHFyAl5FIignh9nzRCS0QN7OFK88-5i3A', 'pending', '2025-11-12 04:52:34'),
(16, 'aa@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhQGdtYWlsLmNvbSIsInJvbGUiOiJBZ2VudCIsImNoYXRib3RJZCI6bnVsbCwiaWF0IjoxNzYyOTIzMTU1LCJleHAiOjE3NjMwMDk1NTV9.6r7K51RJomTN-So5jOmMWCsj62HLg_6S_1VYhzlXPU0', 'pending', '2025-11-12 04:52:35'),
(17, 'aa@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhQGdtYWlsLmNvbSIsInJvbGUiOiJBZ2VudCIsImNoYXRib3RJZCI6bnVsbCwiaWF0IjoxNzYyOTIzMTU1LCJleHAiOjE3NjMwMDk1NTV9.6r7K51RJomTN-So5jOmMWCsj62HLg_6S_1VYhzlXPU0', 'pending', '2025-11-12 04:52:35'),
(18, 'aa@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhQGdtYWlsLmNvbSIsInJvbGUiOiJBZ2VudCIsImNoYXRib3RJZCI6bnVsbCwiaWF0IjoxNzYyOTIzMTU1LCJleHAiOjE3NjMwMDk1NTV9.6r7K51RJomTN-So5jOmMWCsj62HLg_6S_1VYhzlXPU0', 'pending', '2025-11-12 04:52:35'),
(19, 'aa@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhQGdtYWlsLmNvbSIsInJvbGUiOiJBZ2VudCIsImNoYXRib3RJZCI6bnVsbCwiaWF0IjoxNzYyOTIzMTU1LCJleHAiOjE3NjMwMDk1NTV9.6r7K51RJomTN-So5jOmMWCsj62HLg_6S_1VYhzlXPU0', 'pending', '2025-11-12 04:52:35'),
(20, 'aa@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhQGdtYWlsLmNvbSIsInJvbGUiOiJBZ2VudCIsImNoYXRib3RJZCI6bnVsbCwiaWF0IjoxNzYyOTIzMTU1LCJleHAiOjE3NjMwMDk1NTV9.6r7K51RJomTN-So5jOmMWCsj62HLg_6S_1VYhzlXPU0', 'pending', '2025-11-12 04:52:35'),
(21, 'aa@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhQGdtYWlsLmNvbSIsInJvbGUiOiJBZ2VudCIsImNoYXRib3RJZCI6bnVsbCwiaWF0IjoxNzYyOTIzMTU4LCJleHAiOjE3NjMwMDk1NTh9.-DYuSBUOrpbipmhqGzYAF03NFgP11R9hPM7vjy2dH88', 'pending', '2025-11-12 04:52:38'),
(22, 'puneet@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InB1bmVldEBnbWFpbC5jb20iLCJyb2xlIjoiQWdlbnQiLCJjaGF0Ym90SWQiOm51bGwsImlhdCI6MTc2MjkyMzY5MSwiZXhwIjoxNzYzMDEwMDkxfQ.81sNCe5aVuCVqi2Kg5ZdGLmmRAmmFubYnJCs8sDICiI', 'pending', '2025-11-12 05:01:31'),
(23, 'aman@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5AZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiY2hhdGJvdElkIjpudWxsLCJpYXQiOjE3NjI5NDAzNDUsImV4cCI6MTc2MzAyNjc0NX0.3uzj2PhY_HwgAsaVT_MJd2gg6t5A-QKUFUEA3sWbvKI', 'pending', '2025-11-12 09:39:05'),
(24, 'a@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiY2hhdGJvdElkIjpudWxsLCJhZG1pbkNoYXRib3RJZCI6IiIsImlhdCI6MTc2Mjk0MTc5OCwiZXhwIjoxNzYzMDI4MTk4fQ.TFzdOJ9QUSPCpzjgRkkyZMroDQw5rPWEJjZ8Z2Luq5U', 'pending', '2025-11-12 10:03:18'),
(25, 'a@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiY2hhdGJvdElkIjpudWxsLCJhZG1pbkNoYXRib3RJZCI6IiIsImlhdCI6MTc2Mjk0MTg1NywiZXhwIjoxNzYzMDI4MjU3fQ.GrQlL7TtwuBzUjfzWbb4xOR-_1Q3eKN22Sm-LaFuqYI', 'pending', '2025-11-12 10:04:17'),
(26, 'a@co.in', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAY28uaW4iLCJyb2xlIjoiQWdlbnQiLCJjaGF0Ym90SWQiOm51bGwsImFkbWluQ2hhdGJvdElkIjoiIiwiaWF0IjoxNzYyOTQxODg2LCJleHAiOjE3NjMwMjgyODZ9.3PSBPNa7GYRRzfa8OL_qZevSUOzwsnsfiJDBjqjOoWw', 'pending', '2025-11-12 10:04:46'),
(27, 'a@co.in', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAY28uaW4iLCJyb2xlIjoiQWdlbnQiLCJjaGF0Ym90SWQiOm51bGwsImFkbWluQ2hhdGJvdElkIjoiIiwiaWF0IjoxNzYyOTQyMDQ4LCJleHAiOjE3NjMwMjg0NDh9.A1VwGInvllQRuiqq6E8Fzb7y3WkHlmB8evVF1uPL9eQ', 'pending', '2025-11-12 10:07:28'),
(28, 'a@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiY2hhdGJvdElkIjpudWxsLCJhZG1pbkNoYXRib3RJZCI6IiIsImlhdCI6MTc2Mjk0MjE1NSwiZXhwIjoxNzYzMDI4NTU1fQ.j7Ftk_pCTKlgRxFKIz5Al2CQLSv6kGsg4u6x_EoAFAg', 'pending', '2025-11-12 10:09:15'),
(29, 'aman@gmail.com', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYW5AZ21haWwuY29tIiwicm9sZSI6IkFnZW50IiwiY2hhdGJvdElkIjpudWxsLCJhZG1pbkNoYXRib3RJZCI6IiIsImlhdCI6MTc2Mjk0MzE2NCwiZXhwIjoxNzYzMDI5NTY0fQ.FhOpGOlmleKNg4zOdtpAnzkdjUTOT-raLnurDVPjbpc', 'pending', '2025-11-12 10:26:04'),
(30, 'sun@co.in', NULL, 'Agent', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1bkBjby5pbiIsInJvbGUiOiJBZ2VudCIsImNoYXRib3RJZCI6bnVsbCwiYWRtaW5DaGF0Ym90SWQiOiIiLCJpYXQiOjE3NjI5NDM1NTYsImV4cCI6MTc2MzAyOTk1Nn0.KvNtlHpJ2xdwb24bkneaLjpCO3yUovEirXZJEYb96Hw', 'pending', '2025-11-12 10:32:36');

-- --------

--
-- Table structure for table `assigned_customers`
--

CREATE TABLE `assigned_customers` (
  `conversation_id` varchar(255) NOT NULL,
  `temp_user_id` varchar(255) NOT NULL,
  `agent_id` varchar(255) NOT NULL,
  `agent_name` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `assigned_customers`
--

INSERT INTO `assigned_customers` (`conversation_id`, `temp_user_id`, `agent_id`, `agent_name`, `customer_name`) VALUES
('cust_102_agent_', 'cust_102', 'agent_', 'Puneet', 'AAYush');

-- --------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` bigint(20) NOT NULL,
  `chatbot_id` varchar(50) NOT NULL,
  `customer_temp_id` varchar(50) NOT NULL,
  `agent_id` bigint(20) DEFAULT NULL,
  `status` enum('open','closed') DEFAULT 'open',
  `last_message` text DEFAULT NULL,
  `last_sender` enum('user','agent','bot') DEFAULT NULL,
  `last_message_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversations`
--

INSERT INTO `conversations` (`id`, `chatbot_id`, `customer_temp_id`, `agent_id`, `status`, `last_message`, `last_sender`, `last_message_at`, `created_at`, `updated_at`) VALUES
(1, 'CHAT_CU2R', 'temp_1762932000000', NULL, 'open', '', 'user', '2025-11-12 07:41:35', '2025-11-12 07:41:35', '2025-11-12 07:41:35'),
(2, 'CHAT_CU2R', 'temp_1762933325413', NULL, 'open', '', 'user', '2025-11-12 07:42:05', '2025-11-12 07:42:05', '2025-11-12 07:42:05'),
(3, 'CHAT_CU2R', 'temp_1762933500373', NULL, 'open', '', 'user', '2025-11-12 07:45:00', '2025-11-12 07:45:00', '2025-11-12 07:45:00'),
(4, 'CHAT_CU2R', 'temp_1762934082973', NULL, 'open', '', 'user', '2025-11-12 07:54:42', '2025-11-12 07:54:42', '2025-11-12 07:54:42'),
(5, 'CHAT_CU2R', 'temp_1762938059509', NULL, 'open', '', 'user', '2025-11-12 09:00:59', '2025-11-12 09:00:59', '2025-11-12 09:00:59'),
(6, 'CHAT_T1WZ', 'temp_1762938832277', NULL, 'open', '', 'user', '2025-11-12 09:13:52', '2025-11-12 09:13:52', '2025-11-12 09:13:52'),
(7, 'CHAT_T1WZ', 'temp_1762938902773', NULL, 'open', '', 'user', '2025-11-12 09:15:02', '2025-11-12 09:15:02', '2025-11-12 09:15:02'),
(8, 'CHAT_MQOY', 'temp_1762945568884', NULL, 'open', '', 'user', '2025-11-12 11:06:08', '2025-11-12 11:06:08', '2025-11-12 11:06:08'),
(9, 'CHAT_MQOY', 'temp_1762945752317', NULL, 'open', '', 'user', '2025-11-12 11:09:12', '2025-11-12 11:09:12', '2025-11-12 11:09:12');

-- --------

--
-- Table structure for table `customer_prechat`
--

CREATE TABLE `customer_prechat` (
  `id` int(11) NOT NULL,
  `chatbot_id` varchar(255) NOT NULL,
  `temp_user_id` varchar(255) NOT NULL,
  `responses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`responses`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_prechat`
--

INSERT INTO `customer_prechat` (`id`, `chatbot_id`, `temp_user_id`, `responses`, `created_at`) VALUES
(1, 'abc123', 'temp_1699999999999', '[{\"label\":\"Name\",\"value\":\"John Doe\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"john@example.com\",\"type\":\"text\"}]', '2025-11-11 09:15:17'),
(2, 'CHAT_HWAG', 'temp_1762852546431', '[{\"label\":\"Name\",\"value\":\"aa\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"aa\",\"type\":\"text\"},{\"label\":\"Phone Number\",\"value\":\"aa\",\"type\":\"phone\"},{\"label\":\"New Field\",\"value\":\"aaa\",\"type\":\"text\"}]', '2025-11-11 09:15:46'),
(3, 'CHAT_CU2R', 'temp_1762922865221', '[{\"label\":\"Name\",\"value\":\"Puneet\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"asija@gmail.com\",\"type\":\"text\"},{\"label\":\"Phone Number\",\"value\":\"8307807580\",\"type\":\"phone\"}]', '2025-11-12 04:47:45'),
(4, 'CHAT_CU2R', 'temp_1762930732845', '[{\"label\":\"Name\",\"value\":\"aman\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"aman@gmail.co,\",\"type\":\"text\"}]', '2025-11-12 06:58:52'),
(5, 'CHAT_CU2R', 'temp_1762930829461', '[{\"label\":\"Name\",\"value\":\"ankit\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"ankit@gmail.com\",\"type\":\"text\"}]', '2025-11-12 07:00:29'),
(6, 'CHAT_CU2R', 'temp_1762930908053', '[{\"label\":\"Name\",\"value\":\"dcdb\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"vhbh@gmail.com\",\"type\":\"text\"}]', '2025-11-12 07:01:48'),
(7, 'CHAT_CU2R', 'temp_1762930948621', '[{\"label\":\"Name\",\"value\":\"a@\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"a@gail.com\",\"type\":\"text\"}]', '2025-11-12 07:02:28'),
(8, 'CHAT_CU2R', 'temp_1762931051989', '[{\"label\":\"Name\",\"value\":\"a\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"a\",\"type\":\"text\"}]', '2025-11-12 07:04:11'),
(9, 'CHAT_CU2R', 'temp_1762931310541', '[{\"label\":\"Name\",\"value\":\"a\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"a\",\"type\":\"text\"}]', '2025-11-12 07:08:30'),
(10, 'CHAT_CU2R', 'temp_1762931348613', '[{\"label\":\"Name\",\"value\":\"a\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"a\",\"type\":\"text\"}]', '2025-11-12 07:09:08'),
(11, 'CHAT_CU2R', 'temp_1762931386485', '[{\"label\":\"Name\",\"value\":\"q`a\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"aa\",\"type\":\"text\"}]', '2025-11-12 07:09:46'),
(12, 'CHAT_CU2R', 'temp_1762931532197', '[{\"label\":\"Name\",\"value\":\"a\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"a\",\"type\":\"text\"}]', '2025-11-12 07:12:12'),
(13, 'CHAT_CU2R', 'temp_1762932000000', '[{\"label\":\"Name\",\"value\":\"Test User\",\"type\":\"text\"}]', '2025-11-12 07:41:35'),
(14, 'CHAT_CU2R', 'temp_1762933325413', '[{\"label\":\"Name\",\"value\":\"a\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"a@\",\"type\":\"text\"}]', '2025-11-12 07:42:05'),
(15, 'CHAT_CU2R', 'temp_1762933500373', '[{\"label\":\"Name\",\"value\":\"a\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"aa\",\"type\":\"text\"}]', '2025-11-12 07:45:00'),
(16, 'CHAT_CU2R', 'temp_1762934082973', '[{\"label\":\"Name\",\"value\":\"a\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"a\",\"type\":\"text\"},{\"label\":\"New Field\",\"value\":\"a\",\"type\":\"text\"}]', '2025-11-12 07:54:42'),
(17, 'CHAT_CU2R', 'temp_1762938059509', '[{\"label\":\"Name\",\"value\":\"hindi\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"hindi@gmail.com\",\"type\":\"text\"}]', '2025-11-12 09:00:59'),
(18, 'CHAT_T1WZ', 'temp_1762938832277', '[{\"label\":\"Name\",\"value\":\"hnji\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"hnji@gmail.com\",\"type\":\"text\"}]', '2025-11-12 09:13:52'),
(19, 'CHAT_T1WZ', 'temp_1762938902773', '[{\"label\":\"Name\",\"value\":\"suni\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"u\",\"type\":\"text\"}]', '2025-11-12 09:15:02'),
(20, 'CHAT_MQOY', 'temp_1762945568884', '[{\"label\":\"Name\",\"value\":\"aman\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"aman@gmail.com\",\"type\":\"text\"}]', '2025-11-12 11:06:08'),
(21, 'CHAT_MQOY', 'temp_1762945752317', '[{\"label\":\"Name\",\"value\":\"aa\",\"type\":\"text\"},{\"label\":\"Email\",\"value\":\"aa@gmail.o\",\"type\":\"text\"}]', '2025-11-12 11:09:12');

-- --------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `conversation_id` varchar(255) DEFAULT NULL,
  `chatbot_id` int(11) NOT NULL,
  `temp_user_id` varchar(255) NOT NULL,
  `sender` enum('user','bot') NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------

--
-- Table structure for table `online_customers`
--

CREATE TABLE `online_customers` (
  `id` int(11) NOT NULL,
  `chatbot_id` varchar(50) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `status` enum('online','offline') DEFAULT 'online',
  `last_active` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `online_customers`
--

INSERT INTO `online_customers` (`id`, `chatbot_id`, `customer_id`, `status`, `last_active`) VALUES
(1, '123', 0, 'online', '2025-11-11 05:19:53');

-- --------

--
-- Table structure for table `prechat_fields`
--

CREATE TABLE `prechat_fields` (
  `id` int(11) NOT NULL,
  `form_id` int(11) NOT NULL,
  `type` enum('text','phone','dropdown') NOT NULL,
  `label` varchar(255) NOT NULL,
  `placeholder` varchar(255) DEFAULT '',
  `required` tinyint(1) DEFAULT 0,
  `field_order` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prechat_fields`
--

INSERT INTO `prechat_fields` (`id`, `form_id`, `type`, `label`, `placeholder`, `required`, `field_order`, `created_at`, `updated_at`) VALUES
(2, 1, 'dropdown', 'Select Option', '', 0, 2, '2025-11-09 18:47:00', '2025-11-09 18:47:00'),
(10, 2, 'text', 'Name', 'Enter your name', 1, 1, '2025-11-09 20:00:19', '2025-11-09 20:00:19'),
(14, 3, 'text', 'Name', 'Enter your name', 1, 1, '2025-11-10 06:39:52', '2025-11-10 06:39:52'),
(15, 3, 'text', 'Email', 'Enter your email', 0, 2, '2025-11-10 06:39:53', '2025-11-10 06:39:53'),
(42, 4, 'text', 'Name', 'Enter your name', 1, 1, '2025-11-11 05:17:40', '2025-11-11 05:17:40'),
(43, 4, 'text', 'Email', 'Enter your email', 1, 2, '2025-11-11 05:17:40', '2025-11-11 05:17:40'),
(44, 4, 'phone', 'Phone Number', 'Enter phone number', 0, 3, '2025-11-11 05:17:40', '2025-11-11 05:17:40'),
(51, 5, 'text', 'Name', 'Enter your name', 1, 1, '2025-11-11 08:41:16', '2025-11-11 08:41:16'),
(52, 5, 'text', 'Email', 'Enter your email', 1, 2, '2025-11-11 08:41:16', '2025-11-11 08:41:16'),
(53, 5, 'phone', 'Phone Number', 'Enter phone number', 0, 3, '2025-11-11 08:41:16', '2025-11-11 08:41:16'),
(69, 6, 'text', 'Name', 'Enter your name', 1, 1, '2025-11-11 09:17:11', '2025-11-11 09:17:11'),
(70, 6, 'text', 'Email', 'Enter your email', 1, 2, '2025-11-11 09:17:11', '2025-11-11 09:17:11'),
(94, 7, 'text', 'Name', 'Enter your name', 1, 1, '2025-11-12 08:42:17', '2025-11-12 08:42:17'),
(95, 7, 'text', 'Email', 'Enter your email', 1, 2, '2025-11-12 08:42:17', '2025-11-12 08:42:17'),
(99, 8, 'text', 'Name', 'Enter your name', 1, 1, '2025-11-12 11:06:02', '2025-11-12 11:06:02'),
(100, 8, 'text', 'Email', 'Enter your email', 1, 2, '2025-11-12 11:06:02', '2025-11-12 11:06:02');

-- --------

--
-- Table structure for table `prechat_forms`
--

CREATE TABLE `prechat_forms` (
  `id` int(11) NOT NULL,
  `chatbot_id` varchar(255) NOT NULL,
  `info` text DEFAULT NULL,
  `button_text` varchar(255) DEFAULT 'Start Chat',
  `status` enum('enabled','disabled') DEFAULT 'enabled',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prechat_forms`
--

INSERT INTO `prechat_forms` (`id`, `chatbot_id`, `info`, `button_text`, `status`, `created_at`, `updated_at`) VALUES
(1, 'CHAT_YOURID', 'This is test form', 'Start Chat', 'enabled', '2025-11-09 18:47:00', '2025-11-09 18:47:00'),
(2, 'CHAT_FAYL', 'Let’s chat! Fill in a few details to get started.', 'Start Chat', 'disabled', '2025-11-09 18:49:01', '2025-11-09 20:24:01'),
(3, 'CHAT_T1WZ', 'Let’s chat! Fill in a few details to get started.', 'Start Chat', 'enabled', '2025-11-10 06:02:38', '2025-11-12 09:14:55'),
(4, 'CHAT_AZFV', 'Let’s chat! Fill in a few details to get started.', 'Start the Chat', 'disabled', '2025-11-10 09:42:29', '2025-11-11 06:48:12'),
(5, 'CHAT_TLYJ', 'Let’s chat! Fill in a few details to get started.', 'Start Chat', 'enabled', '2025-11-11 08:36:35', '2025-11-11 08:36:35'),
(6, 'CHAT_HWAG', 'Let’s chat! Fill in a few details to get started.', 'Start Chat', 'enabled', '2025-11-11 08:50:38', '2025-11-11 09:16:57'),
(7, 'CHAT_CU2R', 'Let’s chat! Fill in a few details to get started.', 'Start Chat', 'enabled', '2025-11-11 13:37:12', '2025-11-12 07:54:23'),
(8, 'CHAT_MQOY', 'Let’s chat! Fill in a few details to get started.', 'Start Chat', 'enabled', '2025-11-12 10:46:49', '2025-11-12 11:05:55');

-- --------

--
-- Table structure for table `prechat_options`
--

CREATE TABLE `prechat_options` (
  `id` int(11) NOT NULL,
  `field_id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prechat_options`
--

INSERT INTO `prechat_options` (`id`, `field_id`, `value`, `created_at`) VALUES
(1, 2, 'Option A', '2025-11-09 18:47:00'),
(2, 2, 'Option B', '2025-11-09 18:47:00');

-- --------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','agent') DEFAULT 'admin',
  `status` enum('active','inactive') DEFAULT 'inactive',
  `chatbot_id` varchar(50) DEFAULT NULL,
  `admin_chatbot_id` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expire` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `status`, `chatbot_id`, `admin_chatbot_id`, `created_at`, `reset_token`, `reset_expire`) VALUES
(1, 'puneet', 'puneet@gmail.com', '$2b$10$FP2DL2NoItZ3eRRnnIG72O4Z3ROZVOuGFbztZwW3z.O7me3fjx7OW', 'admin', 'active', 'CHAT_MQOY', NULL, '2025-11-12 09:38:38', NULL, NULL),
(4, 'aman', 'aman@gmail.com', '$2b$10$STNytW6QHlZa2Ziwn5KM5eMdZKvEYh6gGshxB4eZnEFTfnFAit6Hi', 'agent', 'inactive', NULL, '', '2025-11-12 10:26:29', NULL, NULL),
(5, 'sun', 'sun@co.in', '$2b$10$BAm0wTeuVW2MWyc5izZcyeXgCICL2mW4Lw4kGou/43.ClUJIWqDOq', 'agent', 'inactive', NULL, '', '2025-11-12 10:33:05', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agent_invites`
--
ALTER TABLE `agent_invites`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assigned_customers`
--
ALTER TABLE `assigned_customers`
  ADD PRIMARY KEY (`conversation_id`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_prechat`
--
ALTER TABLE `customer_prechat`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `online_customers`
--
ALTER TABLE `online_customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prechat_fields`
--
ALTER TABLE `prechat_fields`
  ADD PRIMARY KEY (`id`),
  ADD KEY `form_id` (`form_id`);

--
-- Indexes for table `prechat_forms`
--
ALTER TABLE `prechat_forms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `chatbot_id` (`chatbot_id`);

--
-- Indexes for table `prechat_options`
--
ALTER TABLE `prechat_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `field_id` (`field_id`);

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
-- AUTO_INCREMENT for table `agent_invites`
--
ALTER TABLE `agent_invites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `customer_prechat`
--
ALTER TABLE `customer_prechat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `online_customers`
--
ALTER TABLE `online_customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `prechat_fields`
--
ALTER TABLE `prechat_fields`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT for table `prechat_forms`
--
ALTER TABLE `prechat_forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `prechat_options`
--
ALTER TABLE `prechat_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `prechat_fields`
--
ALTER TABLE `prechat_fields`
  ADD CONSTRAINT `prechat_fields_ibfk_1` FOREIGN KEY (`form_id`) REFERENCES `prechat_forms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `prechat_options`
--
ALTER TABLE `prechat_options`
  ADD CONSTRAINT `prechat_options_ibfk_1` FOREIGN KEY (`field_id`) REFERENCES `prechat_fields` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
