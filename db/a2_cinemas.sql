-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2022 at 04:51 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `a2_cinemas`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `addressID` int(11) NOT NULL,
  `street` text NOT NULL,
  `city` text NOT NULL,
  `state` text NOT NULL,
  `zipCode` smallint(7) DEFAULT NULL,
  `country` text NOT NULL DEFAULT '\'USA\''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`addressID`, `street`, `city`, `state`, `zipCode`, `country`) VALUES
(1, '124 Sesame Street', 'New York City', 'NY', 30506, 'USA'),
(3, '1312 Coral Ln', 'Bikini Bottom', 'HI', 12357, '\'USA\''),
(4, '467 Worm Way', 'Braselton', 'GA', 30517, '\'USA\''),
(5, '27 Birch Street', 'Atlanta', 'GA', 30307, '\'USA\''),
(7, '17 South Lumpkin Street', 'Athens', 'GA', 30603, '\'USA\''),
(8, '26 Thomas Street', 'Athens', 'GA', 30603, '\'USA\'');

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `bookingID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `paymentCardID` int(11) DEFAULT NULL,
  `promotionID` int(11) DEFAULT NULL,
  `dateOfPurchase` date NOT NULL,
  `total` float NOT NULL,
  `subtotal` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `booking_fee`
--

CREATE TABLE `booking_fee` (
  `bookingID` int(11) NOT NULL,
  `feeID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `fee`
--

CREATE TABLE `fee` (
  `feeID` int(11) NOT NULL,
  `title` text NOT NULL COMMENT 'i.e. "tax", "online booking fee"',
  `amount` float NOT NULL COMMENT 'percentage upcharge for this fee',
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fee`
--

INSERT INTO `fee` (`feeID`, `title`, `amount`, `active`) VALUES
(1, 'Sales Tax', 7.4, 1),
(2, 'Online Booking Fee', 3.5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movieID` int(11) NOT NULL,
  `title` text NOT NULL,
  `director` text DEFAULT NULL,
  `producer` varchar(255) DEFAULT NULL,
  `Cast` text DEFAULT NULL,
  `category` varchar(255) NOT NULL,
  `synopsis` text DEFAULT NULL,
  `releaseDate` date DEFAULT NULL COMMENT 'The original release date in ISO 8601',
  `rating` varchar(16) DEFAULT NULL COMMENT 'MPAA-US Film rating',
  `trailer` text DEFAULT NULL COMMENT 'URL link to a Youtube Trailer',
  `imageRef` text DEFAULT NULL COMMENT 'A reference (path, link) to some thumbnail image for this movie.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movieID`, `title`, `director`, `producer`, `Cast`, `category`, `synopsis`, `releaseDate`, `rating`, `trailer`, `imageRef`) VALUES
(1, 'Shrek', 'Andrew Adamson', 'Aron Warner', 'Mike Myers, Eddie Murphy, Cameron Diaz', 'Comedy', 'Shrek finds his swamp overrun by fairy tale creatures banished by Lord Farquad. With the help of Donkey, Shrek agrees to rescue princess Fiona to regain his swamp. (Wikipedia)', '2001-04-22', 'PG-13', 'https://www.youtube.com/watch?v=CwXOrWvPBPk', 'https://pics.filmaffinity.com/Shrek-903764423-large.jpg'),
(2, 'Black Panther: Wakanda Forever', 'Ryan Coogler', 'Kevin Feige', 'Letitia Wright, Lupita Nyong\'o, Danai Gurira', 'Action', 'Queen Ramonda, Shuri, M\'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T\'Challa\'s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with Nakia and Everett Ross to forge a new path for their beloved kingdom.', '2022-11-11', 'PG-13', 'https://www.youtube.com/watch?v=_Z3QKkl1WyM', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcS0IwkvMt37zyh1VbWdz4hZEF1CdSmYj4qsiqQPCaKlcR_EZFfP'),
(3, 'The Menu', 'Mark Mylod', 'Adam McKay', 'Ralph Fiennes, Anna Taylor-Joy, Hong Chau', 'Suspense', 'A couple (Anya Taylor-Joy and Nicholas Hoult) travels to a coastal island to eat at an exclusive restaurant where the chef (Ralph Fiennes) has prepared a lavish menu, with some shocking surprises.', '2022-11-18', 'R', 'https://www.youtube.com/watch?v=Kx55Rkynhtk', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ9SPqhKYwf42LQRSuAeXY2iKn83aNsJo8fm0jAd6eoNKogfGy-'),
(4, 'Black Adam', 'Jaume Collet-Serra', 'Beau Flynn', 'Dwayne Johnson, Aldis Hodge, Pierce Brosnan', 'Action', 'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam (Johnson) is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.', '2022-10-21', 'PG-13', 'https://www.youtube.com/watch?v=X0tOpBuYasI', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ7z46quZTThLvU4GVoaKuD0at1K9oUCdnI8C4O8lwm6F1KpYFt'),
(5, 'She Said', 'Maria Schrader', 'Dede Gardner', 'Maria Lenkiewicz, Zoe Kazan, Patricia Clarkson', 'Drama', 'Two-time Academy Award? nominee Carey Mulligan (PROMISING YOUNG WOMAN, AN EDUCATION) and Zoe Kazan (THE PLOT AGAINST AMERICA limited series, THE BIG SICK) star as New York Times reporters Megan Twohey and Jodi Kantor, who together broke one of the most important stories in a generation -- a story that helped launch the #MeToo movement, shattered decades of silence around the subject of sexual assault in Hollywood and altered American culture forever. From the Academy Award? winning producers of 12 YEARS A SLAVE, MOONLIGHT, MINARI, SELMA and THE BIG SHORT and the Oscar?-nominated producer of ZERO DARK THIRTY and AMERICAN HUSTLE, the film is based on the New York Times bestseller, \'She Said: Breaking the Sexual Harassment Story That Helped Ignite a Movement.\' SHE SAID is directed by Emmy winner Maria Schrader (UNORTHODOX limited series) from a screenplay by Oscar? winner Rebecca Lenkiewicz (IDA). The film is produced by Academy Award? winners Brad Pitt, Dede Gardner and Jeremy Kleiner for Plan B Entertainment and is executive produced by Oscar? nominee Megan Ellison and Sue Naegle for Annapurna Pictures.', '2022-11-18', 'R', 'https://www.youtube.com/watch?v=i5pxUQecM3Y', 'https://m.media-amazon.com/images/M/MV5BNjA3NzFmOWItY2VjOC00YTVhLWIxYjMtN2UyMjA4NDk1YTA5XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg'),
(6, 'The Chosen Season 3: Episodes 1 & 2', 'Dallas Jenkins', 'Dallas Jenkins', 'Colin Farrell, Brendan Gleeson, Kerry Condon', 'Special Event', 'What now? After Jesus completes a sermon that turns the world upside down, all 12 disciples (including newcomer Judas) are ready to follow him to the ends of the earth. But problems remain. Matthew wrestles with estrangement from his family. Andrew visits an imprisoned John the Baptist. Mary and the women must find a source of income. Simon and Eden face the costs of following Jesus. Most importantly, the disciples face their biggest challenge yet when Jesus sends them out, two by two, to preach and perform miracles without him. Episodes 1 & 2 of Season Three pick up where Season Two left off, and in this unique theatrical experience, launch the most emotional and consequential season of The Chosen to date.', '2022-11-18', 'PG-13', 'https://www.youtube.com/watch?v=Y7z868kEl5s', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3DNsVUM_8Iq9CGg9cAnLhkO1zQs7plieaueIdPTGVwE6x-BEf'),
(7, 'Ticket to Paradise', 'Ol Parker', 'Tim Bevan', 'George Clooney, Sean Lynch, Julia Roberts', 'Comedy', 'Academy Award(R) winners George Clooney and Julia Roberts team up as exes who find themselves on a shared mission: to stop their lovestruck daughter from making the same mistake they once made. Ticket to Paradise is a romantic comedy about the sweet surprise of second chances.', '2022-10-21', 'PG-13', 'https://www.youtube.com/watch?v=hkP4tVTdsz8', 'https://m.media-amazon.com/images/M/MV5BMWE0MmEwMWUtZjRjOC00YzE3LWI2MjctNjc3NWQ0YTVmNDQ4XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg'),
(8, 'Lyle, Lyle, Crocodile', 'Will Speck', 'Josh Gordon', 'Ralph Fiennes, Anna Taylor-Joy, Hong Chau', 'Family', 'Based on the best-selling book series by Bernard Waber, Lyle, Lyle, Crocodile, starring Academy Award-winner Javier Bardem, Constance Wu and Shawn Mendes, is a live-action/CGI musical comedy that brings this beloved character to a new, global audience. When the Primm family (Wu, Scoot McNairy, Winslow Fegley) moves to New York City, their young son Josh struggles to adapt to his new school and new friends. All of that changes when he discovers Lyle - a singing crocodile (Mendes) who loves baths, caviar and great music-living in the attic of his new home. The two become fast friends, but when Lyle’s existence is threatened by evil neighbor Mr. Grumps (Brett Gelman), the Primms must band together with Lyle’s charismatic owner, Hector P. Valenti (Bardem), to show the world that family can come from the most unexpected places and there’s nothing wrong with a big singing crocodile with an even bigger personality. Lyle, Lyle, Crocodile will feature original songs performed by Shawn Mendes, Javier Bardem, and Constance Wu, written by the songwriting team behind The Greatest Showman, Benj Pasek & Justin Paul. Joining Pasek and Paul in writing original songs for the film are Ari Afsar, Emily Gardner Xu Hall, Mark Sonnenblick, and Joriah Kwamé. Directed and produced by Will Speck and Josh Gordon, the screenplay is by Will Davies. The film is produced by Hutch Parker and executive produced by Kevin K. Vafi, Dan Wilson, Robert J. Dohrmann, Benj Pasek, Justin Paul, Tarak Ben Ammar and Andy Mitchell. The Sony Pictures film will release in the US on October 7, 2022.', '2022-10-07', 'PG', 'https://www.youtube.com/watch?v=s0W6O7mSlaU', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRNTauUBqxbjLkChRAYke1krm7LXrBRWiXww1E2VLuN17Tbbx-U'),
(9, 'Smile', 'Parker Finn', 'Marty Bowen', 'Sosie Bacon, Jessica T. Usher, Kyle Gallner', 'Horror', 'After witnessing a bizarre, traumatic incident involving a patient, Dr. Rose Cotter (Sosie Bacon) starts experiencing frightening occurrences that she can\'t explain. As an overwhelming terror begins taking over her life, Rose must confront her troubling past in order to survive and escape her horrifying new reality.', '2022-09-30', 'R', 'https://www.youtube.com/watch?v=BcDK7lkzzsU', 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTXOqk88VKA4kRPSu6bde9Xnx2eFnYT-epQXqOo_Dx-5df0eCVb'),
(10, 'The Banshees of Inisherin', 'Martin McDonagh', 'Peter Czernin', 'Colin Farrell, Brendan Gleeson, Kerry Condon', 'Drama', 'Set on a remote island off the west coast of Ireland, THE BANSHEES OF INISHERIN follows lifelong friends Pádraic (Colin Farrell) and Colm (Brendan Gleeson), who find themselves at an impasse when Colm unexpectedly puts an end to their friendship. A stunned Pádraic, aided by his sister Siobhán (Kerry Condon) and troubled young islander Dominic (Barry Keoghan), endeavours to repair the relationship, refusing to take no for an answer. But Pádraic\'s repeated efforts only strengthen his former friend’s resolve and when Colm delivers a desperate ultimatum, events swiftly escalate, with shocking consequences.', '2022-10-21', 'R', 'https://www.youtube.com/watch?v=uRu3zLOJN2c', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTJSb2Ru-Duzl8OegIgEy_F2wDl0uUzqJx5PMRI34mNlYKxT_e'),
(22, 'Violent Night', 'Tommy Wirkola', 'David Leitch', 'David Harbour, John Leguizamo, Alex Hassell, Alexis Louder, Cam Gigandet, Edi Patterson, Beverly D\'Angelo, Leah Brady', 'Action', 'David Harbour (\'Black Widow\') stars in this thrilling holiday movie about a team of mercenaries who take a group of people hostage on Christmas Eve, never expecting their biggest combatant to be Santa Claus. Action producer David Leitch (\'John Wick\') teams with the writers of the \'Sonic the Hedgehog\' franchise (Patrick Casey and Josh Miller), bringing an edge to the classic holiday cheer and showing why this Nick is no saint.', '2022-12-20', 'R', 'https://www.youtube.com/watch?v=a53e4HHnx_s', 'https://m.media-amazon.com/images/M/MV5BYzg2NWNhOWItYjA3Yi00MzhhLTg4ZmItYzM3ZTIwN2U0ZGQ5XkEyXkFqcGdeQXVyMzEyMDQzNzY@._V1_FMjpg_UX1000_.jpg'),
(23, 'I Heard the Bells', 'Joshua Enck', 'Stephen Atherholt', 'Stephen Atherholt, Jonathan Blair, Rachel Day Hughes, Zach Meeker', 'Drama', 'I HEARD THE BELLS tells the inspiring true story behind the beloved Christmas carol and its author, Henry Wadsworth Longfellow. Known as America’s Poet, Henry leads an idyllic life – until the day his world is shattered by tragedy. With a nation divided by Civil War and his family torn apart, Henry puts down his pen, silenced by grief. But it’s the sound of Christmas morning that reignites the poet’s lost voice as he discovers the resounding hope of rekindled faith. Experience I HEARD THE BELLS this holiday season in this debut feature by Sight & Sound Films.', '2022-12-11', 'NR', 'https://www.youtube.com/watch?v=DKRc3BykJvg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk4jK-N8T7r10aYkZNF7QrDgir0DeCaUJpdn__dehVU_HjRDfw'),
(24, 'Spirited', 'Sean Anders', 'Charles Dickens', 'Will Ferrell, Ryan Reynolds, Octavia Spencer, Patrick Page, Sunita Mani', 'Comedy', 'Imagine Charles Dickens\' heartwarming tale of a scrooge visited by four ghosts on Christmas Eve--but funnier. And with Will Ferrell, Ryan Reynolds, and Octavia Spencer. Including, huge musical numbers!', '2022-11-11', 'PG-13', 'https://www.youtube.com/watch?v=kiuns7T8viw', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ9U4u12W3bEfj3a6iBxENTMcL9Is2uvchq4MEwaQIrkzI9Yij-');

-- --------------------------------------------------------

--
-- Table structure for table `paymentcard`
--

CREATE TABLE `paymentcard` (
  `paymentCardID` int(11) NOT NULL,
  `CardType` text NOT NULL,
  `CVV` int(11) NOT NULL,
  `ExpirationDate` int(4) NOT NULL,
  `holderName` text NOT NULL,
  `number` varchar(64) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `addressID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `paymentcard`
--

INSERT INTO `paymentcard` (`paymentCardID`, `CardType`, `CVV`, `ExpirationDate`, `holderName`, `number`, `userID`, `addressID`) VALUES
(2, 'VISA', 123, 1022, 'Dummy W. Jones', '1234123412341234', 1, 1),
(3, 'MasterCard', 234, 1023, 'Evan U. Kelly', '789278922131234', 4, 5),
(4, 'VISA', 236, 623, 'Evan U. Kelly', '1427742828749863', 4, 5),
(5, 'American Express', 12, 124, 'Eugene H. Krabs', '890138562904783', 6, 3);

-- --------------------------------------------------------

--
-- Table structure for table `promotion`
--

CREATE TABLE `promotion` (
  `promotionID` int(11) NOT NULL,
  `title` text NOT NULL,
  `endDate` datetime NOT NULL,
  `startDate` datetime DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL COMMENT 'determines the ability for this promotion to be used.',
  `percentOff` float NOT NULL,
  `promoCode` varchar(6) NOT NULL COMMENT '6-digit code the user will provide to apply this promotion'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promotion`
--

INSERT INTO `promotion` (`promotionID`, `title`, `endDate`, `startDate`, `active`, `percentOff`, `promoCode`) VALUES
(14, 'Student Discount', '2022-12-10 00:00:00', '2022-10-31 00:00:00', 1, 12, 'GODAWG'),
(16, 'Free Drink', '2023-12-07 00:00:00', '2022-12-17 23:59:59', 1, 100, 'FR33DR'),
(17, 'Children Discount', '2022-12-20 21:00:00', '2022-12-05 23:11:59', 1, 25, 'CH1LDR'),
(18, 'Elderly Discount', '2023-12-20 21:00:00', '2022-12-05 23:11:59', 1, 43, 'GR4NDP'),
(19, 'Christmas Discount', '2023-12-20 23:11:59', '2022-12-29 00:00:00', 1, 55, 'H0LID4');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `reviewID` int(11) NOT NULL,
  `authorID` int(11) NOT NULL,
  `movieID` int(11) NOT NULL,
  `review` text NOT NULL COMMENT 'author''s opinion of the movie in text',
  `rating` int(1) NOT NULL COMMENT 'a rating out of 5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`reviewID`, `authorID`, `movieID`, `review`, `rating`) VALUES
(1, 1, 1, 'pretty nice', 4),
(3, 3, 1, 'epic cast here', 5),
(4, 4, 2, 'could have had more explosions', 2),
(5, 6, 2, 'pretty cool movie to watch', 4),
(6, 8, 2, 'bro that one scene was cool', 5),
(7, 9, 3, 'the ending was super well done', 5),
(8, 1, 3, 'perfecto', 5),
(9, 3, 3, 'left much to be desired', 1),
(10, 4, 4, 'would have appreciated more dogs', 2),
(11, 6, 4, 'man this movie\'s editing was clean', 5),
(12, 8, 5, 'i really enjoyed when the protag said cool story bro', 5),
(13, 9, 5, 'pretty good i guess', 3),
(14, 1, 5, 'jaw dropping', 5),
(15, 3, 5, 'mehh', 3),
(16, 4, 6, 'alright', 3),
(17, 6, 7, 'this movie was lit af', 5),
(18, 8, 7, 'this movie was resident sleeper', 2),
(19, 9, 8, 'absolutely beautiful acting by that one guy', 5),
(20, 1, 8, 'imagine liking this movie eww', 1),
(21, 3, 8, 'pretty boring tbh', 2),
(22, 4, 9, 'movie was nice', 4),
(23, 6, 9, 'movie was pretty neato burrito', 4),
(24, 8, 10, 'epic epic epic', 5),
(25, 9, 10, 'this movie had a good story and loveable cast', 5),
(26, 1, 10, 'this is a pretty good movie', 4),
(28, 3, 22, 'one of the most movies out there', 4),
(29, 4, 22, 'yikes', 2),
(30, 8, 22, 'beautifully crafted', 5),
(31, 9, 22, 'crafted beautifully', 5),
(32, 1, 23, 'I left this movie thinking about life', 5),
(33, 3, 23, 'very memorable scenes', 4),
(34, 4, 23, 'boomers would like this one', 1),
(35, 6, 24, 'hilarious', 5),
(36, 8, 24, 'kinda boring', 3),
(37, 9, 24, 'bro that one scene where he did that one thing EPIC', 5);

-- --------------------------------------------------------

--
-- Table structure for table `seat`
--

CREATE TABLE `seat` (
  `seatID` int(11) NOT NULL,
  `location` varchar(8) NOT NULL COMMENT 'column  row location, in the format [ColRow] i.e A2.',
  `theaterID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seat`
--

INSERT INTO `seat` (`seatID`, `location`, `theaterID`) VALUES
(106, 'A1', 42),
(107, 'A2', 42),
(108, 'A3', 42),
(109, 'A4', 42),
(110, 'A5', 42),
(111, 'A6', 42),
(112, 'A7', 42),
(113, 'A8', 42),
(114, 'A9', 42),
(115, 'A10', 42),
(116, 'B1', 42),
(117, 'B2', 42),
(118, 'B3', 42),
(119, 'B4', 42),
(120, 'B5', 42),
(121, 'B6', 42),
(122, 'B7', 42),
(123, 'B8', 42),
(124, 'B9', 42),
(125, 'B10', 42),
(126, 'C1', 42),
(127, 'C2', 42),
(128, 'C3', 42),
(129, 'C4', 42),
(130, 'C5', 42),
(131, 'C6', 42),
(132, 'C7', 42),
(133, 'C8', 42),
(134, 'C9', 42),
(135, 'C10', 42),
(136, 'D1', 42),
(137, 'D2', 42),
(138, 'D3', 42),
(139, 'D4', 42),
(140, 'D5', 42),
(141, 'D6', 42),
(142, 'D7', 42),
(143, 'D8', 42),
(144, 'D9', 42),
(145, 'D10', 42),
(146, 'E1', 42),
(147, 'E2', 42),
(148, 'E3', 42),
(149, 'E4', 42),
(150, 'E5', 42),
(151, 'E6', 42),
(152, 'E7', 42),
(153, 'E8', 42),
(154, 'E9', 42),
(155, 'E10', 42),
(156, 'F1', 42),
(157, 'F2', 42),
(158, 'F3', 42),
(159, 'F4', 42),
(160, 'F5', 42),
(161, 'F6', 42),
(162, 'F7', 42),
(163, 'F8', 42),
(164, 'F9', 42),
(165, 'F10', 42),
(166, 'G1', 42),
(167, 'G2', 42),
(168, 'G3', 42),
(169, 'G4', 42),
(170, 'G5', 42),
(171, 'G6', 42),
(172, 'G7', 42),
(173, 'G8', 42),
(174, 'G9', 42),
(175, 'G10', 42),
(176, 'H1', 42),
(177, 'H2', 42),
(178, 'H3', 42),
(179, 'H4', 42),
(180, 'H5', 42),
(181, 'H6', 42),
(182, 'H7', 42),
(183, 'H8', 42),
(184, 'H9', 42),
(185, 'H10', 42),
(186, 'I1', 42),
(187, 'I2', 42),
(188, 'I3', 42),
(189, 'I4', 42),
(190, 'I5', 42),
(191, 'I6', 42),
(192, 'I7', 42),
(193, 'I8', 42),
(194, 'I9', 42),
(195, 'I10', 42),
(196, 'J1', 42),
(197, 'J2', 42),
(198, 'J3', 42),
(199, 'J4', 42),
(200, 'J5', 42),
(201, 'J6', 42),
(202, 'J7', 42),
(203, 'J8', 42),
(204, 'J9', 42),
(205, 'J10', 42),
(206, 'A1', 43),
(207, 'A2', 43),
(208, 'A3', 43),
(209, 'A4', 43),
(210, 'A5', 43),
(211, 'A6', 43),
(212, 'A7', 43),
(213, 'A8', 43),
(214, 'A9', 43),
(215, 'A10', 43),
(216, 'B1', 43),
(217, 'B2', 43),
(218, 'B3', 43),
(219, 'B4', 43),
(220, 'B5', 43),
(221, 'B6', 43),
(222, 'B7', 43),
(223, 'B8', 43),
(224, 'B9', 43),
(225, 'B10', 43),
(226, 'C1', 43),
(227, 'C2', 43),
(228, 'C3', 43),
(229, 'C4', 43),
(230, 'C5', 43),
(231, 'C6', 43),
(232, 'C7', 43),
(233, 'C8', 43),
(234, 'C9', 43),
(235, 'C10', 43),
(236, 'D1', 43),
(237, 'D2', 43),
(238, 'D3', 43),
(239, 'D4', 43),
(240, 'D5', 43),
(241, 'D6', 43),
(242, 'D7', 43),
(243, 'D8', 43),
(244, 'D9', 43),
(245, 'D10', 43),
(246, 'E1', 43),
(247, 'E2', 43),
(248, 'E3', 43),
(249, 'E4', 43),
(250, 'E5', 43),
(251, 'E6', 43),
(252, 'E7', 43),
(253, 'E8', 43),
(254, 'E9', 43),
(255, 'E10', 43),
(256, 'F1', 43),
(257, 'F2', 43),
(258, 'F3', 43),
(259, 'F4', 43),
(260, 'F5', 43),
(261, 'F6', 43),
(262, 'F7', 43),
(263, 'F8', 43),
(264, 'F9', 43),
(265, 'F10', 43),
(266, 'G1', 43),
(267, 'G2', 43),
(268, 'G3', 43),
(269, 'G4', 43),
(270, 'G5', 43),
(271, 'G6', 43),
(272, 'G7', 43),
(273, 'G8', 43),
(274, 'G9', 43),
(275, 'G10', 43),
(276, 'H1', 43),
(277, 'H2', 43),
(278, 'H3', 43),
(279, 'H4', 43),
(280, 'H5', 43),
(281, 'H6', 43),
(282, 'H7', 43),
(283, 'H8', 43),
(284, 'H9', 43),
(285, 'H10', 43),
(286, 'I1', 43),
(287, 'I2', 43),
(288, 'I3', 43),
(289, 'I4', 43),
(290, 'I5', 43),
(291, 'I6', 43),
(292, 'I7', 43),
(293, 'I8', 43),
(294, 'I9', 43),
(295, 'I10', 43),
(296, 'J1', 43),
(297, 'J2', 43),
(298, 'J3', 43),
(299, 'J4', 43),
(300, 'J5', 43),
(301, 'J6', 43),
(302, 'J7', 43),
(303, 'J8', 43),
(304, 'J9', 43),
(305, 'J10', 43),
(306, 'A1', 44),
(307, 'A2', 44),
(308, 'A3', 44),
(309, 'A4', 44),
(310, 'A5', 44),
(311, 'A6', 44),
(312, 'A7', 44),
(313, 'A8', 44),
(314, 'B1', 44),
(315, 'B2', 44),
(316, 'B3', 44),
(317, 'B4', 44),
(318, 'B5', 44),
(319, 'B6', 44),
(320, 'B7', 44),
(321, 'B8', 44),
(322, 'C1', 44),
(323, 'C2', 44),
(324, 'C3', 44),
(325, 'C4', 44),
(326, 'C5', 44),
(327, 'C6', 44),
(328, 'C7', 44),
(329, 'C8', 44),
(330, 'D1', 44),
(331, 'D2', 44),
(332, 'D3', 44),
(333, 'D4', 44),
(334, 'D5', 44),
(335, 'D6', 44),
(336, 'D7', 44),
(337, 'D8', 44),
(338, 'E1', 44),
(339, 'E2', 44),
(340, 'E3', 44),
(341, 'E4', 44),
(342, 'E5', 44),
(343, 'E6', 44),
(344, 'E7', 44),
(345, 'E8', 44),
(346, 'F1', 44),
(347, 'F2', 44),
(348, 'F3', 44),
(349, 'F4', 44),
(350, 'F5', 44),
(351, 'F6', 44),
(352, 'F7', 44),
(353, 'F8', 44),
(354, 'G1', 44),
(355, 'G2', 44),
(356, 'G3', 44),
(357, 'G4', 44),
(358, 'G5', 44),
(359, 'G6', 44),
(360, 'G7', 44),
(361, 'G8', 44),
(362, 'H1', 44),
(363, 'H2', 44),
(364, 'H3', 44),
(365, 'H4', 44),
(366, 'H5', 44),
(367, 'H6', 44),
(368, 'H7', 44),
(369, 'H8', 44),
(370, 'I1', 44),
(371, 'I2', 44),
(372, 'I3', 44),
(373, 'I4', 44),
(374, 'I5', 44),
(375, 'I6', 44),
(376, 'I7', 44),
(377, 'I8', 44),
(378, 'J1', 44),
(379, 'J2', 44),
(380, 'J3', 44),
(381, 'J4', 44),
(382, 'J5', 44),
(383, 'J6', 44),
(384, 'J7', 44),
(385, 'J8', 44),
(386, 'K1', 44),
(387, 'K2', 44),
(388, 'K3', 44),
(389, 'K4', 44),
(390, 'K5', 44),
(391, 'K6', 44),
(392, 'K7', 44),
(393, 'K8', 44),
(394, 'L1', 44),
(395, 'L2', 44),
(396, 'L3', 44),
(397, 'L4', 44),
(398, 'L5', 44),
(399, 'L6', 44),
(400, 'L7', 44),
(401, 'L8', 44),
(402, 'M1', 44),
(403, 'M2', 44),
(404, 'M3', 44),
(405, 'M4', 44),
(406, 'M5', 44),
(407, 'M6', 44),
(408, 'M7', 44),
(409, 'M8', 44),
(410, 'N1', 44),
(411, 'N2', 44),
(412, 'N3', 44),
(413, 'N4', 44),
(414, 'N5', 44),
(415, 'N6', 44),
(416, 'N7', 44),
(417, 'N8', 44),
(418, 'O1', 44),
(419, 'O2', 44),
(420, 'O3', 44),
(421, 'O4', 44),
(422, 'O5', 44),
(423, 'O6', 44),
(424, 'O7', 44),
(425, 'O8', 44),
(426, 'P1', 44),
(427, 'P2', 44),
(428, 'P3', 44),
(429, 'P4', 44),
(430, 'P5', 44),
(431, 'P6', 44),
(432, 'P7', 44),
(433, 'P8', 44),
(434, 'Q1', 44),
(435, 'Q2', 44),
(436, 'Q3', 44),
(437, 'Q4', 44),
(438, 'Q5', 44),
(439, 'Q6', 44),
(440, 'Q7', 44),
(441, 'Q8', 44),
(442, 'R1', 44),
(443, 'R2', 44),
(444, 'R3', 44),
(445, 'R4', 44),
(446, 'R5', 44),
(447, 'R6', 44),
(448, 'R7', 44),
(449, 'R8', 44),
(450, 'A1', 45),
(451, 'A2', 45),
(452, 'A3', 45),
(453, 'A4', 45),
(454, 'A5', 45),
(455, 'A6', 45),
(456, 'A7', 45),
(457, 'A8', 45),
(458, 'A9', 45),
(459, 'A10', 45),
(460, 'A11', 45),
(461, 'A12', 45),
(462, 'A13', 45),
(463, 'A14', 45),
(464, 'A15', 45),
(465, 'A16', 45),
(466, 'A17', 45),
(467, 'A18', 45),
(468, 'B1', 45),
(469, 'B2', 45),
(470, 'B3', 45),
(471, 'B4', 45),
(472, 'B5', 45),
(473, 'B6', 45),
(474, 'B7', 45),
(475, 'B8', 45),
(476, 'B9', 45),
(477, 'B10', 45),
(478, 'B11', 45),
(479, 'B12', 45),
(480, 'B13', 45),
(481, 'B14', 45),
(482, 'B15', 45),
(483, 'B16', 45),
(484, 'B17', 45),
(485, 'B18', 45),
(486, 'C1', 45),
(487, 'C2', 45),
(488, 'C3', 45),
(489, 'C4', 45),
(490, 'C5', 45),
(491, 'C6', 45),
(492, 'C7', 45),
(493, 'C8', 45),
(494, 'C9', 45),
(495, 'C10', 45),
(496, 'C11', 45),
(497, 'C12', 45),
(498, 'C13', 45),
(499, 'C14', 45),
(500, 'C15', 45),
(501, 'C16', 45),
(502, 'C17', 45),
(503, 'C18', 45),
(504, 'D1', 45),
(505, 'D2', 45),
(506, 'D3', 45),
(507, 'D4', 45),
(508, 'D5', 45),
(509, 'D6', 45),
(510, 'D7', 45),
(511, 'D8', 45),
(512, 'D9', 45),
(513, 'D10', 45),
(514, 'D11', 45),
(515, 'D12', 45),
(516, 'D13', 45),
(517, 'D14', 45),
(518, 'D15', 45),
(519, 'D16', 45),
(520, 'D17', 45),
(521, 'D18', 45),
(522, 'E1', 45),
(523, 'E2', 45),
(524, 'E3', 45),
(525, 'E4', 45),
(526, 'E5', 45),
(527, 'E6', 45),
(528, 'E7', 45),
(529, 'E8', 45),
(530, 'E9', 45),
(531, 'E10', 45),
(532, 'E11', 45),
(533, 'E12', 45),
(534, 'E13', 45),
(535, 'E14', 45),
(536, 'E15', 45),
(537, 'E16', 45),
(538, 'E17', 45),
(539, 'E18', 45),
(540, 'F1', 45),
(541, 'F2', 45),
(542, 'F3', 45),
(543, 'F4', 45),
(544, 'F5', 45),
(545, 'F6', 45),
(546, 'F7', 45),
(547, 'F8', 45),
(548, 'F9', 45),
(549, 'F10', 45),
(550, 'F11', 45),
(551, 'F12', 45),
(552, 'F13', 45),
(553, 'F14', 45),
(554, 'F15', 45),
(555, 'F16', 45),
(556, 'F17', 45),
(557, 'F18', 45),
(558, 'G1', 45),
(559, 'G2', 45),
(560, 'G3', 45),
(561, 'G4', 45),
(562, 'G5', 45),
(563, 'G6', 45),
(564, 'G7', 45),
(565, 'G8', 45),
(566, 'G9', 45),
(567, 'G10', 45),
(568, 'G11', 45),
(569, 'G12', 45),
(570, 'G13', 45),
(571, 'G14', 45),
(572, 'G15', 45),
(573, 'G16', 45),
(574, 'G17', 45),
(575, 'G18', 45),
(576, 'H1', 45),
(577, 'H2', 45),
(578, 'H3', 45),
(579, 'H4', 45),
(580, 'H5', 45),
(581, 'H6', 45),
(582, 'H7', 45),
(583, 'H8', 45),
(584, 'H9', 45),
(585, 'H10', 45),
(586, 'H11', 45),
(587, 'H12', 45),
(588, 'H13', 45),
(589, 'H14', 45),
(590, 'H15', 45),
(591, 'H16', 45),
(592, 'H17', 45),
(593, 'H18', 45),
(594, 'A1', 46),
(595, 'A2', 46),
(596, 'A3', 46),
(597, 'A4', 46),
(598, 'A5', 46),
(599, 'A6', 46),
(600, 'A7', 46),
(601, 'A8', 46),
(602, 'A9', 46),
(603, 'A10', 46),
(604, 'A11', 46),
(605, 'A12', 46),
(606, 'A13', 46),
(607, 'A14', 46),
(608, 'A15', 46),
(609, 'A16', 46),
(610, 'A17', 46),
(611, 'A18', 46),
(612, 'A19', 46),
(613, 'A20', 46),
(614, 'B1', 46),
(615, 'B2', 46),
(616, 'B3', 46),
(617, 'B4', 46),
(618, 'B5', 46),
(619, 'B6', 46),
(620, 'B7', 46),
(621, 'B8', 46),
(622, 'B9', 46),
(623, 'B10', 46),
(624, 'B11', 46),
(625, 'B12', 46),
(626, 'B13', 46),
(627, 'B14', 46),
(628, 'B15', 46),
(629, 'B16', 46),
(630, 'B17', 46),
(631, 'B18', 46),
(632, 'B19', 46),
(633, 'B20', 46),
(634, 'C1', 46),
(635, 'C2', 46),
(636, 'C3', 46),
(637, 'C4', 46),
(638, 'C5', 46),
(639, 'C6', 46),
(640, 'C7', 46),
(641, 'C8', 46),
(642, 'C9', 46),
(643, 'C10', 46),
(644, 'C11', 46),
(645, 'C12', 46),
(646, 'C13', 46),
(647, 'C14', 46),
(648, 'C15', 46),
(649, 'C16', 46),
(650, 'C17', 46),
(651, 'C18', 46),
(652, 'C19', 46),
(653, 'C20', 46),
(654, 'D1', 46),
(655, 'D2', 46),
(656, 'D3', 46),
(657, 'D4', 46),
(658, 'D5', 46),
(659, 'D6', 46),
(660, 'D7', 46),
(661, 'D8', 46),
(662, 'D9', 46),
(663, 'D10', 46),
(664, 'D11', 46),
(665, 'D12', 46),
(666, 'D13', 46),
(667, 'D14', 46),
(668, 'D15', 46),
(669, 'D16', 46),
(670, 'D17', 46),
(671, 'D18', 46),
(672, 'D19', 46),
(673, 'D20', 46),
(674, 'E1', 46),
(675, 'E2', 46),
(676, 'E3', 46),
(677, 'E4', 46),
(678, 'E5', 46),
(679, 'E6', 46),
(680, 'E7', 46),
(681, 'E8', 46),
(682, 'E9', 46),
(683, 'E10', 46),
(684, 'E11', 46),
(685, 'E12', 46),
(686, 'E13', 46),
(687, 'E14', 46),
(688, 'E15', 46),
(689, 'E16', 46),
(690, 'E17', 46),
(691, 'E18', 46),
(692, 'E19', 46),
(693, 'E20', 46),
(694, 'F1', 46),
(695, 'F2', 46),
(696, 'F3', 46),
(697, 'F4', 46),
(698, 'F5', 46),
(699, 'F6', 46),
(700, 'F7', 46),
(701, 'F8', 46),
(702, 'F9', 46),
(703, 'F10', 46),
(704, 'F11', 46),
(705, 'F12', 46),
(706, 'F13', 46),
(707, 'F14', 46),
(708, 'F15', 46),
(709, 'F16', 46),
(710, 'F17', 46),
(711, 'F18', 46),
(712, 'F19', 46),
(713, 'F20', 46),
(714, 'G1', 46),
(715, 'G2', 46),
(716, 'G3', 46),
(717, 'G4', 46),
(718, 'G5', 46),
(719, 'G6', 46),
(720, 'G7', 46),
(721, 'G8', 46),
(722, 'G9', 46),
(723, 'G10', 46),
(724, 'G11', 46),
(725, 'G12', 46),
(726, 'G13', 46),
(727, 'G14', 46),
(728, 'G15', 46),
(729, 'G16', 46),
(730, 'G17', 46),
(731, 'G18', 46),
(732, 'G19', 46),
(733, 'G20', 46),
(734, 'H1', 46),
(735, 'H2', 46),
(736, 'H3', 46),
(737, 'H4', 46),
(738, 'H5', 46),
(739, 'H6', 46),
(740, 'H7', 46),
(741, 'H8', 46),
(742, 'H9', 46),
(743, 'H10', 46),
(744, 'H11', 46),
(745, 'H12', 46),
(746, 'H13', 46),
(747, 'H14', 46),
(748, 'H15', 46),
(749, 'H16', 46),
(750, 'H17', 46),
(751, 'H18', 46),
(752, 'H19', 46),
(753, 'H20', 46),
(754, 'I1', 46),
(755, 'I2', 46),
(756, 'I3', 46),
(757, 'I4', 46),
(758, 'I5', 46),
(759, 'I6', 46),
(760, 'I7', 46),
(761, 'I8', 46),
(762, 'I9', 46),
(763, 'I10', 46),
(764, 'I11', 46),
(765, 'I12', 46),
(766, 'I13', 46),
(767, 'I14', 46),
(768, 'I15', 46),
(769, 'I16', 46),
(770, 'I17', 46),
(771, 'I18', 46),
(772, 'I19', 46),
(773, 'I20', 46),
(774, 'J1', 46),
(775, 'J2', 46),
(776, 'J3', 46),
(777, 'J4', 46),
(778, 'J5', 46),
(779, 'J6', 46),
(780, 'J7', 46),
(781, 'J8', 46),
(782, 'J9', 46),
(783, 'J10', 46),
(784, 'J11', 46),
(785, 'J12', 46),
(786, 'J13', 46),
(787, 'J14', 46),
(788, 'J15', 46),
(789, 'J16', 46),
(790, 'J17', 46),
(791, 'J18', 46),
(792, 'J19', 46),
(793, 'J20', 46),
(794, 'K1', 46),
(795, 'K2', 46),
(796, 'K3', 46),
(797, 'K4', 46),
(798, 'K5', 46),
(799, 'K6', 46),
(800, 'K7', 46),
(801, 'K8', 46),
(802, 'K9', 46),
(803, 'K10', 46),
(804, 'K11', 46),
(805, 'K12', 46),
(806, 'K13', 46),
(807, 'K14', 46),
(808, 'K15', 46),
(809, 'K16', 46),
(810, 'K17', 46),
(811, 'K18', 46),
(812, 'K19', 46),
(813, 'K20', 46),
(814, 'L1', 46),
(815, 'L2', 46),
(816, 'L3', 46),
(817, 'L4', 46),
(818, 'L5', 46),
(819, 'L6', 46),
(820, 'L7', 46),
(821, 'L8', 46),
(822, 'L9', 46),
(823, 'L10', 46),
(824, 'L11', 46),
(825, 'L12', 46),
(826, 'L13', 46),
(827, 'L14', 46),
(828, 'L15', 46),
(829, 'L16', 46),
(830, 'L17', 46),
(831, 'L18', 46),
(832, 'L19', 46),
(833, 'L20', 46),
(834, 'M1', 46),
(835, 'M2', 46),
(836, 'M3', 46),
(837, 'M4', 46),
(838, 'M5', 46),
(839, 'M6', 46),
(840, 'M7', 46),
(841, 'M8', 46),
(842, 'M9', 46),
(843, 'M10', 46),
(844, 'M11', 46),
(845, 'M12', 46),
(846, 'M13', 46),
(847, 'M14', 46),
(848, 'M15', 46),
(849, 'M16', 46),
(850, 'M17', 46),
(851, 'M18', 46),
(852, 'M19', 46),
(853, 'M20', 46),
(854, 'N1', 46),
(855, 'N2', 46),
(856, 'N3', 46),
(857, 'N4', 46),
(858, 'N5', 46),
(859, 'N6', 46),
(860, 'N7', 46),
(861, 'N8', 46),
(862, 'N9', 46),
(863, 'N10', 46),
(864, 'N11', 46),
(865, 'N12', 46),
(866, 'N13', 46),
(867, 'N14', 46),
(868, 'N15', 46),
(869, 'N16', 46),
(870, 'N17', 46),
(871, 'N18', 46),
(872, 'N19', 46),
(873, 'N20', 46),
(874, 'O1', 46),
(875, 'O2', 46),
(876, 'O3', 46),
(877, 'O4', 46),
(878, 'O5', 46),
(879, 'O6', 46),
(880, 'O7', 46),
(881, 'O8', 46),
(882, 'O9', 46),
(883, 'O10', 46),
(884, 'O11', 46),
(885, 'O12', 46),
(886, 'O13', 46),
(887, 'O14', 46),
(888, 'O15', 46),
(889, 'O16', 46),
(890, 'O17', 46),
(891, 'O18', 46),
(892, 'O19', 46),
(893, 'O20', 46),
(894, 'P1', 46),
(895, 'P2', 46),
(896, 'P3', 46),
(897, 'P4', 46),
(898, 'P5', 46),
(899, 'P6', 46),
(900, 'P7', 46),
(901, 'P8', 46),
(902, 'P9', 46),
(903, 'P10', 46),
(904, 'P11', 46),
(905, 'P12', 46),
(906, 'P13', 46),
(907, 'P14', 46),
(908, 'P15', 46),
(909, 'P16', 46),
(910, 'P17', 46),
(911, 'P18', 46),
(912, 'P19', 46),
(913, 'P20', 46),
(914, 'Q1', 46),
(915, 'Q2', 46),
(916, 'Q3', 46),
(917, 'Q4', 46),
(918, 'Q5', 46),
(919, 'Q6', 46),
(920, 'Q7', 46),
(921, 'Q8', 46),
(922, 'Q9', 46),
(923, 'Q10', 46),
(924, 'Q11', 46),
(925, 'Q12', 46),
(926, 'Q13', 46),
(927, 'Q14', 46),
(928, 'Q15', 46),
(929, 'Q16', 46),
(930, 'Q17', 46),
(931, 'Q18', 46),
(932, 'Q19', 46),
(933, 'Q20', 46),
(934, 'R1', 46),
(935, 'R2', 46),
(936, 'R3', 46),
(937, 'R4', 46),
(938, 'R5', 46),
(939, 'R6', 46),
(940, 'R7', 46),
(941, 'R8', 46),
(942, 'R9', 46),
(943, 'R10', 46),
(944, 'R11', 46),
(945, 'R12', 46),
(946, 'R13', 46),
(947, 'R14', 46),
(948, 'R15', 46),
(949, 'R16', 46),
(950, 'R17', 46),
(951, 'R18', 46),
(952, 'R19', 46),
(953, 'R20', 46),
(954, 'S1', 46),
(955, 'S2', 46),
(956, 'S3', 46),
(957, 'S4', 46),
(958, 'S5', 46),
(959, 'S6', 46),
(960, 'S7', 46),
(961, 'S8', 46),
(962, 'S9', 46),
(963, 'S10', 46),
(964, 'S11', 46),
(965, 'S12', 46),
(966, 'S13', 46),
(967, 'S14', 46),
(968, 'S15', 46),
(969, 'S16', 46),
(970, 'S17', 46),
(971, 'S18', 46),
(972, 'S19', 46),
(973, 'S20', 46),
(974, 'T1', 46),
(975, 'T2', 46),
(976, 'T3', 46),
(977, 'T4', 46),
(978, 'T5', 46),
(979, 'T6', 46),
(980, 'T7', 46),
(981, 'T8', 46),
(982, 'T9', 46),
(983, 'T10', 46),
(984, 'T11', 46),
(985, 'T12', 46),
(986, 'T13', 46),
(987, 'T14', 46),
(988, 'T15', 46),
(989, 'T16', 46),
(990, 'T17', 46),
(991, 'T18', 46),
(992, 'T19', 46),
(993, 'T20', 46);

-- --------------------------------------------------------

--
-- Table structure for table `showing`
--

CREATE TABLE `showing` (
  `showingID` int(11) NOT NULL,
  `movieID` int(11) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `available` tinyint(1) NOT NULL COMMENT 'availability for booking by customer',
  `theaterID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `showing`
--

INSERT INTO `showing` (`showingID`, `movieID`, `startTime`, `endTime`, `available`, `theaterID`) VALUES
(1, 1, '2023-04-22 09:00:00', '2023-04-22 11:00:00', 1, 42),
(2, 1, '2023-04-22 11:00:00', '2023-04-22 13:00:00', 0, 43),
(3, 1, '2023-04-22 13:00:00', '2023-04-22 15:00:00', 1, 44),
(4, 1, '2023-04-22 15:00:00', '2023-04-22 17:00:00', 1, 45),
(5, 1, '2023-04-22 17:00:00', '2023-04-22 19:00:00', 1, 46),
(6, 2, '2022-11-11 09:00:00', '2022-11-11 11:00:00', 1, 42),
(7, 2, '2022-11-11 11:00:00', '2022-11-11 13:00:00', 1, 43),
(8, 2, '2022-11-22 13:00:00', '2022-11-22 15:00:00', 1, 44),
(9, 2, '2022-11-23 15:00:00', '2022-11-23 17:00:00', 1, 45),
(10, 2, '2022-11-24 17:00:00', '2022-11-24 19:00:00', 1, 46),
(11, 3, '2022-11-24 09:00:00', '2022-11-24 11:00:00', 1, 42),
(12, 3, '2022-11-23 07:00:00', '2022-11-23 09:00:00', 1, 43),
(13, 3, '2022-11-25 08:00:00', '2022-11-25 10:00:00', 1, 44),
(14, 3, '2022-11-26 15:00:00', '2022-11-26 17:00:00', 1, 45),
(15, 3, '2022-11-27 20:00:00', '2022-11-27 22:00:00', 1, 46),
(16, 4, '2022-11-27 00:00:00', '2022-11-27 02:00:00', 1, 42),
(17, 4, '2022-11-27 02:00:00', '2022-11-27 04:00:00', 1, 43),
(18, 4, '2022-11-28 12:00:00', '2022-11-28 14:00:00', 1, 44),
(19, 4, '2022-11-29 15:00:00', '2022-11-29 17:00:00', 1, 45),
(20, 4, '2022-11-29 20:00:00', '2022-11-29 22:00:00', 1, 46),
(21, 5, '2022-11-30 00:00:00', '2022-11-30 02:00:00', 1, 42),
(22, 5, '2022-11-30 02:00:00', '2022-11-30 04:00:00', 1, 43),
(23, 5, '2022-11-30 10:00:00', '2022-11-30 12:00:00', 1, 44),
(24, 5, '2022-11-30 13:00:00', '2022-11-30 15:00:00', 1, 45),
(25, 5, '2022-11-30 19:00:00', '2022-11-30 21:00:00', 1, 46),
(26, 6, '2022-12-01 01:00:00', '2022-12-01 03:00:00', 1, 42),
(27, 6, '2022-12-01 11:00:00', '2022-12-01 13:00:00', 1, 43),
(28, 6, '2022-12-01 15:00:00', '2022-12-01 17:00:00', 1, 44),
(29, 6, '2022-12-01 17:00:00', '2022-12-01 19:00:00', 1, 45),
(30, 6, '2022-12-01 21:00:00', '2022-12-01 23:00:00', 1, 46),
(31, 7, '2022-10-22 21:00:00', '2022-10-22 23:00:00', 0, 42),
(32, 7, '2022-10-22 10:00:00', '2022-10-22 12:00:00', 0, 43),
(33, 7, '2022-10-22 14:00:00', '2022-10-22 16:00:00', 0, 44),
(34, 7, '2022-12-02 14:00:00', '2022-10-02 16:00:00', 1, 45),
(35, 7, '2022-12-02 17:00:00', '2022-10-02 19:00:00', 1, 46),
(36, 8, '2022-10-07 17:00:00', '2022-10-07 19:00:00', 0, 42),
(37, 8, '2022-10-07 10:00:00', '2022-10-07 12:00:00', 0, 43),
(38, 8, '2022-12-02 11:00:00', '2022-10-02 13:00:00', 1, 44),
(39, 8, '2022-12-02 15:00:00', '2022-10-02 17:00:00', 1, 45),
(40, 8, '2022-12-02 18:00:00', '2022-10-02 20:00:00', 1, 46),
(41, 9, '2022-09-30 18:00:00', '2022-09-30 20:00:00', 0, 42),
(42, 9, '2022-10-30 19:00:00', '2022-10-30 21:00:00', 0, 43),
(43, 9, '2022-11-01 12:00:00', '2022-11-01 14:00:00', 0, 44),
(44, 9, '2022-11-29 12:00:00', '2022-11-29 14:00:00', 1, 45),
(45, 9, '2022-11-29 17:00:00', '2022-11-29 19:00:00', 1, 46),
(46, 10, '2022-11-29 17:00:00', '2022-11-29 19:00:00', 1, 42),
(47, 10, '2022-11-29 10:00:00', '2022-11-29 12:00:00', 1, 43),
(48, 10, '2022-11-27 06:00:00', '2022-11-27 08:00:00', 1, 44),
(49, 10, '2022-11-27 16:00:00', '2022-11-27 18:00:00', 1, 45),
(50, 10, '2022-11-28 16:00:00', '2022-11-28 18:00:00', 1, 46),
(55, 24, '2022-12-22 08:00:00', '2022-12-22 10:00:00', 1, 46),
(56, 24, '2022-12-23 12:00:00', '2022-12-23 14:00:00', 1, 42);

-- --------------------------------------------------------

--
-- Table structure for table `theater`
--

CREATE TABLE `theater` (
  `theaterID` int(11) NOT NULL,
  `capacity` smallint(6) NOT NULL,
  `available` tinyint(1) NOT NULL COMMENT 'availability to be assigned showings.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `theater`
--

INSERT INTO `theater` (`theaterID`, `capacity`, `available`) VALUES
(42, 100, 1),
(43, 100, 1),
(44, 144, 1),
(45, 144, 1),
(46, 400, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE `ticket` (
  `ticketID` int(11) NOT NULL,
  `ticketTypeID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `bookingID` int(11) NOT NULL,
  `seatID` int(11) NOT NULL,
  `showingID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tickettype`
--

CREATE TABLE `tickettype` (
  `typeID` int(11) NOT NULL,
  `type` varchar(64) NOT NULL COMMENT 'the name for this type of ticket. e.g. "child" or "adult"',
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tickettype`
--

INSERT INTO `tickettype` (`typeID`, `type`, `price`) VALUES
(0, 'Adult', 11.5),
(1, 'Child', 5.5),
(2, 'Senior', 6.5);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `firstName` text NOT NULL,
  `lastName` text NOT NULL,
  `email` text NOT NULL,
  `phoneNumber` varchar(16) NOT NULL,
  `password` text NOT NULL,
  `homeAddressID` int(11) DEFAULT NULL,
  `promotion` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'has this user opted in to receiving promotions digitally?',
  `userStatusID` smallint(1) NOT NULL DEFAULT 0,
  `admin` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'is this user a system admin?',
  `verificationToken` smallint(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `firstName`, `lastName`, `email`, `phoneNumber`, `password`, `homeAddressID`, `promotion`, `userStatusID`, `admin`, `verificationToken`) VALUES
(1, 'Dummy', 'Jones', 'dummy@hotmail.com', '1231231234', 'b60b0f694e9c63d76f919fe6e9c87c0b23d932e27dfc30cda6bfa1cc645dbc054c9b73f10d9c79bb949ae7dea9d6145bc702d04b0b4119f1438dee459591d852', 1, 0, 1, 0, NULL),
(3, 'Squidward', 'Tentacles ', 'stentacles84@krustykrab.net', '1112223333', '8a4a4fc08688f4881222d6d26bbe50af4438ee594709cdea1055d4c9f88dec70545433cafc147e25f12b0d497f7d29b362d92a685d258d873a3f8bafc096fe29', NULL, 1, 2, 0, NULL),
(4, 'Evan', 'Kelly', 'eukelly@gmail.com', '7701237781', '9180dec11df1e2f3471bb1df9842f9b2f80225688e0949eb4f5a08b49fa64e2743f054248749b7e9076afbb87eca730c00246ec3bd84228bdffe9f3c950b6b3e', NULL, 1, 1, 0, 15),
(6, 'Eugene', 'Krabs', 'kmoney@krustykrab.net', '1112348931', '44d5e0d24dca3939b2de1b741e2ca86274f71975afd3e71f704888795f26fe6927df90a267b2c5ff0d8c45c69b4d2fcd9406a83e8352530be9c114f8be1fecf7', 3, 0, 0, 0, NULL),
(8, 'Block', 'Buster', 'bbuster96@gmail.com', '7707831289', 'ad1cfa3ff762b343291c7fb3fa717be6a0c2ca569dfbfacc613133c62f03f03ee050025577df39e8f1c9b7212c43b107652b3c0f1eb6f682966a4e8df373ba1a', NULL, 0, 1, 0, NULL),
(9, 'Dobby', 'FromHarryPotter', 'dobby@gmail.com', '4041234872', 'caea78228f20acc90dd3f0c82164bd42eba4ce17e1bf8e41116cca6d596b3e4fa6789d27c425143eaaadb9546f0196471ffd369df56e2c40742769d44fd60989', 8, 0, 1, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `userstatus`
--

CREATE TABLE `userstatus` (
  `statusID` smallint(1) NOT NULL,
  `status` text NOT NULL COMMENT 'user''s activity status. e.g. "inactive" or "suspended"'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userstatus`
--

INSERT INTO `userstatus` (`statusID`, `status`) VALUES
(0, 'Inactive'),
(1, 'Active'),
(2, 'Suspended');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressID`);

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`bookingID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `paymentCardID` (`paymentCardID`),
  ADD KEY `promotionID` (`promotionID`);

--
-- Indexes for table `booking_fee`
--
ALTER TABLE `booking_fee`
  ADD PRIMARY KEY (`bookingID`,`feeID`),
  ADD KEY `FK_Fee` (`feeID`);

--
-- Indexes for table `fee`
--
ALTER TABLE `fee`
  ADD PRIMARY KEY (`feeID`);

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movieID`);

--
-- Indexes for table `paymentcard`
--
ALTER TABLE `paymentcard`
  ADD PRIMARY KEY (`paymentCardID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `addressID` (`addressID`);

--
-- Indexes for table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`promotionID`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`reviewID`),
  ADD KEY `movieID` (`movieID`),
  ADD KEY `authorID` (`authorID`);

--
-- Indexes for table `seat`
--
ALTER TABLE `seat`
  ADD PRIMARY KEY (`seatID`),
  ADD KEY `theaterID` (`theaterID`);

--
-- Indexes for table `showing`
--
ALTER TABLE `showing`
  ADD PRIMARY KEY (`showingID`),
  ADD KEY `movieID` (`movieID`),
  ADD KEY `theaterID` (`theaterID`);

--
-- Indexes for table `theater`
--
ALTER TABLE `theater`
  ADD PRIMARY KEY (`theaterID`);

--
-- Indexes for table `ticket`
--
ALTER TABLE `ticket`
  ADD PRIMARY KEY (`ticketID`),
  ADD KEY `ticketType` (`ticketTypeID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `bookingID` (`bookingID`),
  ADD KEY `seatID` (`seatID`),
  ADD KEY `showingID` (`showingID`);

--
-- Indexes for table `tickettype`
--
ALTER TABLE `tickettype`
  ADD PRIMARY KEY (`typeID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `email` (`email`) USING HASH,
  ADD KEY `userStatus` (`userStatusID`),
  ADD KEY `homeAddressID` (`homeAddressID`);

--
-- Indexes for table `userstatus`
--
ALTER TABLE `userstatus`
  ADD PRIMARY KEY (`statusID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `addressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `bookingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fee`
--
ALTER TABLE `fee`
  MODIFY `feeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movieID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `paymentcard`
--
ALTER TABLE `paymentcard`
  MODIFY `paymentCardID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `promotionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `reviewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `seat`
--
ALTER TABLE `seat`
  MODIFY `seatID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=994;

--
-- AUTO_INCREMENT for table `showing`
--
ALTER TABLE `showing`
  MODIFY `showingID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `theater`
--
ALTER TABLE `theater`
  MODIFY `theaterID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `ticket`
--
ALTER TABLE `ticket`
  MODIFY `ticketID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tickettype`
--
ALTER TABLE `tickettype`
  MODIFY `typeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `FK_PaymentCardBooking` FOREIGN KEY (`paymentCardID`) REFERENCES `paymentcard` (`paymentCardID`),
  ADD CONSTRAINT `FK_PromotionBooking` FOREIGN KEY (`promotionID`) REFERENCES `promotion` (`promotionID`),
  ADD CONSTRAINT `FK_UserBooking` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `booking_fee`
--
ALTER TABLE `booking_fee`
  ADD CONSTRAINT `FK_BookingFee` FOREIGN KEY (`bookingID`) REFERENCES `booking` (`bookingID`),
  ADD CONSTRAINT `FK_Fee` FOREIGN KEY (`feeID`) REFERENCES `fee` (`feeID`);

--
-- Constraints for table `paymentcard`
--
ALTER TABLE `paymentcard`
  ADD CONSTRAINT `FK_AddressPaymentCard` FOREIGN KEY (`addressID`) REFERENCES `address` (`addressID`),
  ADD CONSTRAINT `FK_UserPaymentCard` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_MovieReview` FOREIGN KEY (`movieID`) REFERENCES `movie` (`movieID`),
  ADD CONSTRAINT `FK_UserReview` FOREIGN KEY (`authorID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `seat`
--
ALTER TABLE `seat`
  ADD CONSTRAINT `FK_TheaterSeat` FOREIGN KEY (`theaterID`) REFERENCES `theater` (`theaterID`);

--
-- Constraints for table `showing`
--
ALTER TABLE `showing`
  ADD CONSTRAINT `FK_ShowingMovie` FOREIGN KEY (`movieID`) REFERENCES `movie` (`movieID`),
  ADD CONSTRAINT `FK_ShowingTheater` FOREIGN KEY (`theaterID`) REFERENCES `theater` (`theaterID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_AddressUser` FOREIGN KEY (`homeAddressID`) REFERENCES `address` (`addressID`),
  ADD CONSTRAINT `FK_UserStatusUser` FOREIGN KEY (`userStatusID`) REFERENCES `userstatus` (`statusID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
