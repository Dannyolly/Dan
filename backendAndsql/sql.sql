/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 8.0.23 : Database - chatroom
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`chatroom` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `chatroom`;

/*Table structure for table `chat_msg` */

DROP TABLE IF EXISTS `chat_msg`;

CREATE TABLE `chat_msg` (
  `id` int NOT NULL AUTO_INCREMENT,
  `send_user_id` int DEFAULT NULL,
  `receive_user_id` int DEFAULT NULL,
  `msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `sign_flag` int DEFAULT NULL COMMENT '0是未發 1是發送了',
  `create_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=580 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `chat_msg` */

insert  into `chat_msg`(`id`,`send_user_id`,`receive_user_id`,`msg`,`sign_flag`,`create_time`) values 
(468,2,3,'?',1,'2021-10-23 11:57:06'),
(469,2,3,'/img/message/1634990572005.png',1,'2021-10-23 12:02:52'),
(470,3,2,'Yy',1,'2021-10-23 12:03:01'),
(471,3,2,'/img/message/1634990593403.png',1,'2021-10-23 12:03:13'),
(472,3,2,'/img/message/1634991119648.png',1,'2021-10-23 12:12:00'),
(473,2,3,'Ttt',1,'2021-10-23 12:21:32'),
(474,2,3,'/img/message/1634991737670.png',1,'2021-10-23 12:22:18'),
(475,3,2,'/img/message/1634991961961.png',1,'2021-10-23 12:26:02'),
(476,3,2,'/img/message/1634992218424.png',1,'2021-10-23 12:30:18'),
(477,3,2,'/img/message/1634992753451.png',1,'2021-10-23 12:39:13'),
(478,3,2,'/img/message/1634992931716.png',1,'2021-10-23 12:42:12'),
(479,3,2,'Hi',1,'2021-10-28 08:41:22'),
(480,2,3,'/img/message/1635410646416.png',1,'2021-10-28 08:44:06'),
(481,3,2,'/img/message/1635418738184.png',1,'2021-10-28 10:58:58'),
(482,3,2,'??',1,'2021-10-28 13:13:59'),
(483,3,1,'Hi?',1,'2021-10-30 06:06:14'),
(484,3,2,'/img/message/1637074165545.png',1,'2021-11-16 14:49:26'),
(485,3,2,'/img/message/1637324356452.png',1,'2021-11-19 12:19:16'),
(486,1,3,'?',1,'2021-11-24 03:35:17'),
(487,3,1,'？',1,'2021-11-24 03:36:23'),
(488,1,3,'?',1,'2021-11-24 03:39:37'),
(489,1,3,'?',1,'2021-11-24 03:40:49'),
(490,3,2,'/img/message/1638360806994.png',1,'2021-12-01 12:13:27'),
(491,3,2,'/img/message/1638779832711.png',1,'2021-12-06 08:37:13'),
(492,3,2,'?',1,'2021-12-06 12:33:42'),
(493,3,2,'/img/message/1639580246178.png',1,'2021-12-15 14:57:26'),
(494,3,2,'/img/message/1640230371882.png',1,'2021-12-23 03:32:52'),
(495,1,3,'?',1,'2021-12-26 11:11:15'),
(496,1,3,'?',1,'2021-12-26 11:15:08'),
(497,1,3,'?',1,'2021-12-26 11:21:23'),
(498,1,3,'?',1,'2021-12-26 11:46:33'),
(499,1,3,'Aaaa',1,'2021-12-26 11:48:19'),
(500,1,3,'***',1,'2021-12-26 11:48:39'),
(501,2,3,'?',1,'2021-12-26 11:55:04'),
(502,1,3,'Ssss',1,'2021-12-26 12:01:37'),
(503,1,3,'?',1,'2021-12-26 12:05:30'),
(504,1,3,'?',1,'2021-12-26 12:06:05'),
(505,1,3,'?',1,'2021-12-26 12:06:26'),
(506,1,3,'!',1,'2021-12-26 14:55:02'),
(507,2,3,'?',1,'2021-12-28 08:09:34'),
(508,1,3,'?',1,'2021-12-28 08:15:04'),
(509,2,3,'****',1,'2021-12-28 08:17:25'),
(510,2,3,'****',1,'2021-12-28 08:17:46'),
(511,3,2,'/img/message/1640679489088.png',1,'2021-12-28 08:18:09'),
(512,3,2,'？',1,'2021-12-28 08:19:14'),
(513,3,2,'/img/message/1640679572640.png',1,'2021-12-28 08:19:33'),
(514,3,24,'Hi',1,'2021-12-28 08:33:38'),
(515,24,19,'Hello?',1,'2021-12-28 09:08:14'),
(516,19,24,'? ',1,'2021-12-28 09:09:10'),
(517,19,24,'Wdn ',1,'2021-12-28 09:10:57'),
(518,19,24,'Yy',1,'2021-12-28 09:11:11'),
(519,24,19,'?',1,'2021-12-28 09:13:44'),
(520,24,19,'Ff',1,'2021-12-28 09:14:04'),
(521,24,19,'?',1,'2021-12-28 09:15:40'),
(522,24,19,'Eee',1,'2021-12-28 09:16:19'),
(523,24,19,'?',1,'2021-12-28 09:16:46'),
(524,24,19,'?',1,'2021-12-28 09:17:25'),
(525,24,19,'!',1,'2021-12-28 09:18:17'),
(526,24,19,'*****',1,'2021-12-28 09:18:33'),
(527,24,19,'Eee',1,'2021-12-28 09:19:31'),
(528,24,19,'Sss',1,'2021-12-28 09:20:07'),
(529,24,19,'?',1,'2021-12-28 09:20:35'),
(530,24,19,'Ss',1,'2021-12-28 09:21:32'),
(531,24,19,'?',1,'2021-12-28 09:21:52'),
(532,24,19,'Rrr',1,'2021-12-28 09:22:16'),
(533,24,19,'Tttt',1,'2021-12-28 09:22:26'),
(534,24,19,'????',1,'2021-12-28 09:22:48'),
(535,24,19,'Ttt',1,'2021-12-28 09:23:35'),
(536,24,19,'Rrrr',1,'2021-12-28 09:24:37'),
(537,24,19,'?',1,'2021-12-28 09:26:39'),
(538,24,19,'Yy',1,'2021-12-28 09:27:33'),
(539,24,19,'Ttttt',1,'2021-12-28 09:27:58'),
(540,24,19,'Ggg',1,'2021-12-28 10:07:16'),
(541,24,3,'Dddd',1,'2021-12-28 10:07:42'),
(542,24,3,'Ooooo',1,'2021-12-28 14:43:19'),
(543,3,2,'?',1,'2021-12-30 08:47:49'),
(544,2,3,'???',1,'2021-12-30 08:54:13'),
(545,3,24,'Haha',1,'2022-01-01 11:59:05'),
(546,3,1,'/img/message/1641038361652.png',1,'2022-01-01 11:59:22'),
(547,3,1,'/img/message/1641038433907.png',1,'2022-01-01 12:00:34'),
(548,3,1,'/img/message/1641038745686.png',1,'2022-01-01 12:05:46'),
(549,3,1,'/img/message/1641038809353.png',1,'2022-01-01 12:06:49'),
(550,3,1,'/img/message/1641038960392.png',1,'2022-01-01 12:09:20'),
(551,3,1,'/img/message/1641041666048.png',1,'2022-01-01 12:54:26'),
(552,3,1,'/img/message/1641041806290.png',1,'2022-01-01 12:56:46'),
(553,3,1,'/img/message/1641041962319.png',1,'2022-01-01 12:59:22'),
(554,3,1,'/img/message/1641042013337.png',1,'2022-01-01 13:00:13'),
(555,3,1,'/img/message/1641101127027.png',1,'2022-01-02 05:25:27'),
(556,3,24,'/img/message/1641101255548.png',1,'2022-01-02 05:27:36'),
(557,3,1,'/img/message/1641101321363.png',1,'2022-01-02 05:28:41'),
(558,3,24,'/img/message/1641101417645.png',1,'2022-01-02 05:30:18'),
(559,3,24,'/img/message/1641102234017.png',1,'2022-01-02 05:43:54'),
(560,3,24,'/img/message/1641102709169.png',1,'2022-01-02 05:51:49'),
(561,3,24,'/img/message/1641102844306.png',1,'2022-01-02 05:54:04'),
(562,3,24,'/img/message/1641102935234.png',1,'2022-01-02 05:55:35'),
(563,3,2,'/img/message/1641103037396.png',1,'2022-01-02 05:57:17'),
(564,3,24,'/img/message/1641103270640.png',1,'2022-01-02 06:01:11'),
(565,3,24,'/img/message/1641103420098.png',1,'2022-01-02 06:03:40'),
(566,3,1,'/img/message/1641103743799.png',1,'2022-01-02 06:09:04'),
(567,3,24,'/img/message/1641103818514.png',1,'2022-01-02 06:10:19'),
(568,3,24,'/img/message/1641103953576.png',1,'2022-01-02 06:12:34'),
(569,3,2,'/img/message/1641186960357.png',1,'2022-01-03 05:16:00'),
(570,3,2,'/img/message/1642247953067.png',1,'2022-01-15 11:59:13'),
(571,3,1,'/img/message/1642408204610.png',1,'2022-01-17 08:30:05'),
(572,3,2,'/img/message/1644580556225.png',1,'2022-02-11 11:55:56'),
(573,3,24,'/img/message/1645098782069.png',0,'2022-02-17 11:53:02'),
(574,3,1,'/img/message/1645098806757.png',0,'2022-02-17 11:53:27'),
(575,3,24,'/img/message/1645098866008.png',0,'2022-02-17 11:54:26'),
(576,3,24,'/img/message/1645098898732.png',0,'2022-02-17 11:54:59'),
(577,3,24,'/img/message/1649407437704.png',0,'2022-04-08 08:43:58'),
(578,3,24,'/img/message/1649407460161.png',0,'2022-04-08 08:44:20'),
(579,3,24,'/img/message/1649407464862.png',0,'2022-04-08 08:44:25');

/*Table structure for table `friend_request` */

DROP TABLE IF EXISTS `friend_request`;

CREATE TABLE `friend_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `send_user_id` int DEFAULT NULL,
  `receive_user_id` int DEFAULT NULL,
  `request_date_time` datetime DEFAULT NULL,
  `request_message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int DEFAULT NULL,
  `read` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `friend_request` */

insert  into `friend_request`(`id`,`send_user_id`,`receive_user_id`,`request_date_time`,`request_message`,`status`,`read`) values 
(10,2,1,'2021-09-21 10:37:14','Sz',1,1),
(11,3,2,'2021-09-30 10:15:30','Hi',1,1),
(17,1,3,'2021-10-30 05:45:53','',1,1),
(18,24,3,'2021-12-28 08:31:03','',1,1),
(19,24,19,'2021-12-28 08:58:39','',1,1);

/*Table structure for table `like_relationship` */

DROP TABLE IF EXISTS `like_relationship`;

CREATE TABLE `like_relationship` (
  `id` int NOT NULL AUTO_INCREMENT,
  `post_Id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `like_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `like_relationship` */

insert  into `like_relationship`(`id`,`post_Id`,`user_id`,`like_date`) values 
(2,2,3,NULL),
(4,4,2,NULL),
(5,7,3,NULL),
(8,11,3,NULL),
(9,10,3,NULL),
(15,9,3,NULL),
(20,14,3,NULL),
(46,15,3,NULL),
(47,16,3,NULL),
(51,6,3,NULL),
(52,8,3,NULL),
(55,19,3,NULL),
(56,18,3,NULL),
(61,20,3,NULL),
(62,21,3,NULL),
(74,23,3,NULL),
(84,1,3,NULL),
(85,24,3,NULL),
(92,26,3,NULL),
(94,30,3,NULL),
(118,29,3,NULL),
(120,27,3,NULL),
(124,28,3,NULL),
(125,25,3,NULL),
(131,17,3,NULL),
(134,4,2,NULL),
(135,34,3,NULL),
(136,37,3,NULL),
(137,31,3,NULL),
(138,39,3,NULL),
(139,38,3,NULL),
(140,42,2,NULL);

/*Table structure for table `my_friends` */

DROP TABLE IF EXISTS `my_friends`;

CREATE TABLE `my_friends` (
  `id` int NOT NULL AUTO_INCREMENT,
  `my_user_id` int DEFAULT NULL,
  `my_friends_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `my_friends` */

insert  into `my_friends`(`id`,`my_user_id`,`my_friends_id`) values 
(6,2,1),
(7,1,2),
(8,3,2),
(9,2,3),
(12,1,3),
(13,3,1),
(14,24,3),
(15,3,24),
(16,24,19),
(17,19,24);

/*Table structure for table `post_comment` */

DROP TABLE IF EXISTS `post_comment`;

CREATE TABLE `post_comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `comment_info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `commet_date` datetime DEFAULT NULL,
  `like_count` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `post_comment` */

insert  into `post_comment`(`id`,`user_id`,`comment_info`,`commet_date`,`like_count`,`post_id`) values 
(2,3,'？','2021-10-05 10:43:21',0,1),
(3,3,'Fantastic ','2021-10-05 12:12:44',0,1),
(4,3,'Cool','2021-10-05 12:14:39',0,1),
(5,3,'Cool man ','2021-10-05 12:18:09',0,1),
(6,3,'哈哈','2021-10-05 12:29:43',0,1),
(7,3,'Shit...','2021-10-05 12:30:52',0,1),
(8,3,'？','2021-10-05 12:33:53',0,2),
(9,3,'？？？','2021-10-06 10:46:16',0,1),
(10,3,'Hello?','2021-10-07 03:29:45',0,4),
(11,3,'哈哈','2021-10-07 03:31:22',0,4),
(12,3,'Cool','2021-10-07 07:16:19',0,1),
(13,3,'Yo','2021-10-07 15:18:38',0,10),
(14,3,'Hello','2021-10-07 15:20:29',0,14),
(15,3,'Helloaaa','2021-10-07 15:20:53',0,11),
(16,3,'Hello—','2021-10-10 04:53:04',0,1),
(17,3,'?','2021-10-10 04:53:56',0,1),
(18,3,'Hi','2021-10-10 04:55:17',0,1),
(19,3,'Haha','2021-10-10 04:55:38',0,1),
(20,3,'Yo','2021-10-10 05:18:16',0,11),
(21,3,'So,where are you now?','2021-10-10 05:23:11',0,15),
(22,3,'正?','2021-10-12 03:48:13',0,16),
(23,3,'唔錯?','2021-10-12 03:49:27',0,6),
(24,3,'哈?','2021-10-13 04:41:23',0,16),
(25,3,'Finish the up animation !','2021-10-21 10:22:40',0,23),
(26,3,'?','2021-11-06 10:36:38',0,23),
(27,3,'???','2021-11-06 15:45:29',0,23),
(28,3,'Hi ','2021-12-06 12:36:29',0,30),
(29,3,'正','2021-12-22 11:52:30',0,30),
(30,3,'哈哈','2021-12-23 06:02:41',0,30),
(31,3,'Hi?','2021-12-24 09:11:24',0,26),
(32,3,'？','2021-12-24 15:20:38',0,31),
(33,3,'咁快返？','2021-12-24 15:20:50',0,31),
(34,2,'Cool','2021-12-26 09:34:53',0,31),
(35,2,'？','2021-12-26 09:35:19',0,30),
(36,2,'？','2021-12-26 09:35:50',0,29),
(37,2,'：）??','2021-12-26 09:40:36',0,31),
(38,3,'哈哈','2021-12-29 04:32:53',0,29),
(39,3,'。。?','2021-12-29 07:25:10',0,31),
(40,3,'？','2021-12-29 08:09:42',0,31),
(41,3,'：）','2021-12-29 08:17:55',0,31),
(42,3,'藍藍','2021-12-29 08:18:12',0,31),
(43,3,'哈','2021-12-29 08:22:22',0,30),
(44,3,'??','2022-01-01 09:08:16',0,31),
(45,3,'???','2022-01-01 09:24:28',0,29),
(46,3,'屈','2022-01-01 09:24:38',0,29),
(47,3,'?','2022-01-03 05:20:13',0,30),
(48,3,'ummm ? ','2022-01-16 09:39:02',0,37),
(49,3,'？','2022-01-16 09:39:16',0,37),
(50,3,'finished!!','2022-01-17 08:28:46',0,37),
(51,1,'hello?','2022-02-11 11:43:12',0,38),
(52,2,'well ..','2022-02-17 07:37:22',0,42),
(53,3,'aa','2022-02-22 11:06:35',0,39);

/*Table structure for table `user_post` */

DROP TABLE IF EXISTS `user_post`;

CREATE TABLE `user_post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `post_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `like_count` int DEFAULT NULL,
  `introduction` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `user_post` */

insert  into `user_post`(`id`,`user_id`,`post_image`,`like_count`,`introduction`,`post_date`) values 
(1,3,'/img/post/1633349753845.png,/img/post/1633349753845.png',1,'Hi','2021-10-04 09:38:55'),
(2,3,'/img/post/1633349753845.png',2,'So bad...','2021-10-04 12:15:54'),
(3,1,'/img/post/1633349753845.png',0,'111','2021-10-04 12:15:54'),
(4,2,'/img/post/1633349753845.png',1,'ttt','2021-10-04 12:15:54'),
(6,3,'/img/post/1633603363794.png,/img/post/1633603363795.png',5,'爽喔肥牛。','2021-10-07 10:42:44'),
(7,3,'/img/post/1633603626505.png,/img/post/1633603626507.png',5,'.....good luck ','2021-10-07 10:47:07'),
(8,3,'/img/post/1633604243097.png',1,'Yodjjerj','2021-10-07 10:57:23'),
(9,3,'/img/post/1633604576077.png',1,'Testing——','2021-10-07 11:02:56'),
(10,3,'/img/post/1633605112566.png',1,'淦。','2021-10-07 11:11:53'),
(11,3,'/img/post/1633608012386.png',2,'Hello?','2021-10-07 12:00:12'),
(14,3,'/img/post/1633608416343.png',2,'Last testing !','2021-10-07 12:06:56'),
(15,3,'/img/post/1633843154292.png',1,'Macao, I’m back!!!','2021-10-10 05:19:14'),
(16,3,'/img/post/1633850469374.png',1,'A8 和牛','2021-10-10 07:21:09'),
(17,3,'/img/post/1634126317474.png',1,'Shit????','2021-10-13 11:58:37'),
(18,3,'/img/post/1634126435123.png',1,'Ohha ????','2021-10-13 12:00:35'),
(19,3,'/img/post/1634126521924.png,/img/post/1634126521927.png',1,'Hhhhhhhh','2021-10-13 12:02:02'),
(20,3,'/img/post/1634126662442.png',3,'Hyyhyy??','2021-10-13 12:04:22'),
(21,3,'/img/post/1634198659239.png,/img/post/1634198659240.png',3,'Last testing :::','2021-10-14 08:04:19'),
(22,3,'/img/post/1634268114526.png,/img/post/1634268114527.png',2,'Testiinf ...???????','2021-10-15 03:21:55'),
(23,3,'/img/post/1634268250515.png,/img/post/1634268250516.png',4,'Dannnyhb','2021-10-15 03:24:11'),
(24,3,'/img/post/1637117619690.png',3,'????很難不流汗','2021-11-17 02:53:40'),
(25,3,'/img/post/1638780203832.png',3,'三星挑戰','2021-12-06 08:43:24'),
(26,3,'/img/post/1638780311153.png',4,'哈哈','2021-12-06 08:45:11'),
(27,3,'/img/post/1638780706287.png',3,'Wow','2021-12-06 08:51:46'),
(28,3,'/img/post/1638780842809.png',4,'Last','2021-12-06 08:54:03'),
(29,3,'/img/post/1638781092633.png',4,'Dfff','2021-12-06 08:58:13'),
(30,3,'/img/post/1638781244559.png,/img/post/1638781244560.png',4,'Hi hi','2021-12-06 09:00:45'),
(31,3,'/img/post/1640359218072.png',4,'走lu走lu','2021-12-24 15:20:18'),
(33,3,'/img/post/1641037019209.png',0,'新杉','2022-01-01 11:36:59'),
(34,3,'/img/post/1641037156036.png,/img/post/1641037156037.png,/img/post/1641037156038.png',1,'新年新杉\n#Beaster\n@Danny','2022-01-01 11:39:16'),
(35,3,'/img/post/1641187347685.png',0,'正！','2022-01-03 05:22:28'),
(36,3,'/img/post/1641187565812.png',0,'完喇完喇～\n#v3.0','2022-01-03 05:26:06'),
(37,3,'/img/post/1641188049181.png',2,'Last testing \n# Version 3.0.1','2022-01-03 05:34:09'),
(38,3,'/img/post/1642408248230.png',1,'哈','2022-01-17 08:30:48'),
(39,3,'/img/post/1642408308968.png',2,'code~','2022-01-17 08:31:49'),
(40,2,'/img/post/1644580474942.png',0,'???','2022-02-11 11:54:35'),
(41,2,'/img/post/1644580506973.png',0,'bug?','2022-02-11 11:55:07'),
(42,2,'/img/post/1645083424167.png',1,'溜了溜了','2022-02-17 07:37:04'),
(43,2,'/img/post/1649399289206.png,/img/post/1649399289207.png',0,'asdasdsad','2022-04-08 06:28:09'),
(44,2,'/img/post/1649399415543.png,/img/post/1649399415544.png',0,'asdasdsad','2022-04-08 06:30:16'),
(45,2,'/img/post/1649400490801.png',0,'asdasd','2022-04-08 06:48:11'),
(46,2,'/img/post/1649400550607.png',0,'aaaa hihihihih','2022-04-08 06:49:11');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `icon` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `qrcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `cid` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `online` int DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `background_image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQUE` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`password`,`icon`,`qrcode`,`cid`,`online`,`introduction`,`background_image`) values 
(1,'danny','123456','/img/icon/1635572614036.png','/img/QRcode/1.png','456912',1,NULL,NULL),
(2,'admin','123456','/img/icon/1632050670366.png','/img/QRcode/1.png',NULL,1,NULL,'/img/backgroundImage/1649407111157.png'),
(3,'admin1','123456','/img/icon/1648883019818.png','/img/QRcode/1.png','456913',1,'V3.0','/img/backgroundImage/1649408147681.png'),
(19,'Dannya','28300136','/img/icon/1634270165157.png','/img/QRcode/1.png',NULL,0,'Some time we have to do a promise ,even we can’t','/img/backgroundImage/1634270165164.png'),
(24,'Tom','111','/img/icon/1640680127496.png','/img/QRcode/1.png',NULL,0,'Sss','/img/backgroundImage/1640680127499.png');

/*Table structure for table `test` */

DROP TABLE IF EXISTS `test`;

/*!50001 DROP VIEW IF EXISTS `test` */;
/*!50001 DROP TABLE IF EXISTS `test` */;

/*!50001 CREATE TABLE  `test`(
 `id` int ,
 `username` varchar(255) ,
 `password` varchar(64) ,
 `icon` varchar(255) ,
 `qrcode` varchar(255) ,
 `cid` varchar(255) ,
 `online` int ,
 `introduction` varchar(255) ,
 `background_image` varchar(255) 
)*/;

/*View structure for view test */

/*!50001 DROP TABLE IF EXISTS `test` */;
/*!50001 DROP VIEW IF EXISTS `test` */;

/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `test` AS select `users`.`id` AS `id`,`users`.`username` AS `username`,`users`.`password` AS `password`,`users`.`icon` AS `icon`,`users`.`qrcode` AS `qrcode`,`users`.`cid` AS `cid`,`users`.`online` AS `online`,`users`.`introduction` AS `introduction`,`users`.`background_image` AS `background_image` from `users` where (`users`.`id` = 1) */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
