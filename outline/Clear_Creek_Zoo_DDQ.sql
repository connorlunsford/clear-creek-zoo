-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 22, 2020 at 08:12 PM
-- Server version: 10.4.15-MariaDB-log
-- PHP Version: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `clearCreekZoo`
--

-- --------------------------------------------------------

--
-- Table structure for table `Animal`
--

CREATE TABLE `Animal` (
  `aid` int(11) NOT NULL,
  `sid` int(11) NOT NULL,
  `exid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `sex` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `notes` text(64000) DEFAULT NULL,
  `img_link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Animal`
--

INSERT INTO `Animal` (`aid`, `sid`, `exid`, `name`, `sex`, `age`,`img_link`) VALUES
(1, 1, 1, 'Nanuk', 'Male', 14, 'https://upload.wikimedia.org/wikipedia/commons/6/66/Polar_Bear_-_Alaska_%28cropped%29.jpg'),
(2, 2, 2, 'Kala', 'Female', 20, 'https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg'),
(3, 2, 2, 'Kerchak', 'Male', 25, 'https://upload.wikimedia.org/wikipedia/commons/5/50/Male_gorilla_in_SF_zoo.jpg'),
(4, 2, 2, 'Terk', 'Female', 3, 'https://i1.wp.com/www.jacksonvillemag.com/wp-content/uploads/2019/09/Gandai-by-Lynde-Nunn.jpg?resize=768%2C576&ssl=1'),
(5, 2, 2, 'Tarzan', 'Male', 3, 'https://i1.wp.com/www.jacksonvillemag.com/wp-content/uploads/2019/09/Gandai-by-Lynde-Nunn.jpg?resize=768%2C576&ssl=1'),
(6, 3, 3, 'Simba', 'Male', 10, 'https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg'),
(7, 3, 3, 'Nala', 'Female', 10, 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Okonjima_Lioness.jpg'),
(8, 5, 5, 'Freedom', 'Female', 3, 'https://upload.wikimedia.org/wikipedia/commons/1/1a/About_to_Launch_%2826075320352%29.jpg'),
(9, 5, 5, 'Liberty', 'Female', 4, 'https://upload.wikimedia.org/wikipedia/commons/1/1a/About_to_Launch_%2826075320352%29.jpg'),
(10, 6, 6, 'Pastel', 'Female', 2, 'https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/A-G/flamingo-standing.ngsversion.1396530994611.adapt.1900.1.jpg'),
(11, 6, 6, 'Champagne', 'Female', 2, 'https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/A-G/flamingo-standing.ngsversion.1396530994611.adapt.1900.1.jpg'),
(12, 6, 6, 'Orchid', 'Female', 2, 'https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/A-G/flamingo-standing.ngsversion.1396530994611.adapt.1900.1.jpg'),
(13, 6, 6, 'Carnation', 'Female', 2, 'https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/A-G/flamingo-standing.ngsversion.1396530994611.adapt.1900.1.jpg'),
(14, 6, 6, 'Tango', 'Female', 2, 'https://kids.nationalgeographic.com/content/dam/kids/photos/animals/Birds/A-G/flamingo-standing.ngsversion.1396530994611.adapt.1900.1.jpg'),
(15, 7, 7, 'Bubba', 'Male', 5, 'https://nationalzoo.si.edu/sites/default/files/styles/1400_scale/public/animals/americanalligator-003.jpg?itok=dSRgXWU-'),
(16, 7, 7, 'Mardi', 'Female', 3, 'https://nationalzoo.si.edu/sites/default/files/styles/1400_scale/public/animals/americanalligator-003.jpg?itok=dSRgXWU-'),
(17, 7, 7, 'Gras', 'Female', 4, 'https://nationalzoo.si.edu/sites/default/files/styles/1400_scale/public/animals/americanalligator-003.jpg?itok=dSRgXWU-'),
(18, 8, 7, 'Michelangelo', 'Male', 10, 'https://upload.wikimedia.org/wikipedia/commons/f/f8/2009-Western-pond-turtle.jpg'),
(19, 8, 7, 'Raphael', 'Male', 10, 'https://upload.wikimedia.org/wikipedia/commons/f/f8/2009-Western-pond-turtle.jpg'),
(20, 8, 7, 'Donatello', 'Male', 10, 'https://upload.wikimedia.org/wikipedia/commons/f/f8/2009-Western-pond-turtle.jpg'),
(21, 8, 7, 'Leonardo', 'Male', 10, 'https://upload.wikimedia.org/wikipedia/commons/f/f8/2009-Western-pond-turtle.jpg'),
(22, 9, 8, 'Kellan', 'Male', 5, 'https://upload.wikimedia.org/wikipedia/commons/5/53/West_Coast_National_Park_%2811356314336%29.jpg'),
(23, 9, 8, 'Imani', 'Female', 6, 'https://upload.wikimedia.org/wikipedia/commons/5/53/West_Coast_National_Park_%2811356314336%29.jpg'),
(24, 10, 8, 'Taj', 'Male', 15, 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Giraffe_Mikumi_National_Park.jpg'),
(25, 10, 8, 'Jina', 'Female', 13, 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Giraffe_Mikumi_National_Park.jpg'),
(26, 10, 8, 'Bahati', 'Female', 14, 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Giraffe_Mikumi_National_Park.jpg'),
(27, 11, 8, 'Omari', 'Male', 10, 'https://www.africansky.com/img/img_hero/mammals/000-sable.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `Employee`
--

CREATE TABLE `Employee` (
  `emid` int(11) NOT NULL,
  `jid` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `salary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Employee`
--

INSERT INTO `Employee` (`emid`, `jid`, `fname`, `lname`, `salary`) VALUES
(1, 3, 'John', 'Hammond', 100000),
(2, 1, 'Alan', 'Grant', 50000),
(3, 1, 'Ian', 'Malcom', 60000),
(4, 1, 'Robert', 'Muldoon', 55000),
(5, 2, 'Ellie', 'Satler', 80000),
(6, 3, 'Henry', 'Wu', 90000);

-- --------------------------------------------------------

--
-- Table structure for table `Enrichment`
--

CREATE TABLE `Enrichment` (
  `enid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `sid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Enrichment`
--

INSERT INTO `Enrichment` (`enid`, `name`, `type`, `sid`) VALUES
(1, 'Frozen Meat', 'Food', 1),
(2, 'Climbing Logs', 'Structural', 2),
(3, 'Large Ball', 'Tactile', 3),
(4, 'Scratch Pole', 'Sensory', 3),
(5, 'Hanging Meat', 'Food', 5),
(6, 'Guest Feeding', 'Food', 10);

-- --------------------------------------------------------

--
-- Table structure for table `Exhibit`
--

CREATE TABLE `Exhibit` (
  `exid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `biome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Exhibit`
--

INSERT INTO `Exhibit` (`exid`, `name`, `biome`) VALUES
(1, 'Polar Bear Iceberg', 'Arctic'),
(2, 'Gorilla Jungle', 'Rainforest'),
(3, 'Pride Rock', 'Savannah'),
(4, 'Bison Plains', 'Grassland'),
(5, 'Eagle Eyrie', 'Arctic'),
(6, 'Flamingo River', 'Wetland'),
(7, 'Reptile Swamp', 'Wetland'),
(8, 'African Safari', 'Savannah'),
(9, 'Holding Exhibit', 'Climate Controlled');

-- --------------------------------------------------------

--
-- Table structure for table `Exhibit_Employee`
--

CREATE TABLE `Exhibit_Employee` (
  `exid` int(11) NOT NULL,
  `emid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Exhibit_Employee`
--

INSERT INTO `Exhibit_Employee` (`exid`, `emid`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(1, 2),
(3, 2),
(5, 2),
(7, 2),
(2, 3),
(6, 3),
(8, 3),
(8, 4),
(9, 4),
(2, 5),
(6, 5),
(8, 5),
(1, 5),
(1, 6),
(3, 6),
(5, 6),
(7, 6),
(8, 6),
(9, 6);

-- --------------------------------------------------------

--
-- Table structure for table `Exhibit_Enrichment`
--

CREATE TABLE `Exhibit_Enrichment` (
  `exid` int(11) NOT NULL,
  `enid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Exhibit_Enrichment`
--

INSERT INTO `Exhibit_Enrichment` (`exid`, `enid`) VALUES
(1, 1),
(2, 2),
(3, 3),
(3, 4),
(5, 5),
(8, 6);

-- --------------------------------------------------------

--
-- Table structure for table `Job`
--

CREATE TABLE `Job` (
  `jid` int(11) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Job`
--

INSERT INTO `Job` (`jid`, `title`) VALUES
(1, 'Keeper'),
(2, 'Vet'),
(3, 'Director');

-- --------------------------------------------------------

--
-- Table structure for table `Species`
--

CREATE TABLE `Species` (
  `sid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `diet` varchar(255) NOT NULL,
  `habitat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `Species`
--

INSERT INTO `Species` (`sid`, `name`, `diet`, `habitat`) VALUES
(1, 'Polar Bear', 'Carnivore', 'Arctic'),
(2, 'Lowland Gorilla', 'Omnivore', 'Rainforest'),
(3, 'African Lion', 'Carnivore', 'Savannah'),
(4, 'North American Bison', 'Herbivore', 'Grassland'),
(5, 'Bald Eagle', 'Carnivore', 'Arctic'),
(6, 'Lesser Flamingo', 'Omnivore', 'Wetland'),
(7, 'American Alligator', 'Carnivore', 'Wetland'),
(8, 'Western Pond Turtle', 'Omnivore', 'Wetland'),
(9, 'Common Ostrich', 'Herbivore', 'Savannah'),
(10, 'Reticulated Giraffe', 'Herbivore', 'Savannah'),
(11, 'Sable Antelope', 'Herbivore', 'Savannah');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Animal`
--
ALTER TABLE `Animal`
  ADD PRIMARY KEY (`aid`),
  ADD KEY `FK_AnimalSpecies` (`sid`),
  ADD KEY `FK_AnimalExhibit` (`exid`);

--
-- Indexes for table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`emid`),
  ADD KEY `jid` (`jid`);

--
-- Indexes for table `Enrichment`
--
ALTER TABLE `Enrichment`
  ADD PRIMARY KEY (`enid`),
  ADD KEY `sid` (`sid`);

--
-- Indexes for table `Exhibit`
--
ALTER TABLE `Exhibit`
  ADD PRIMARY KEY (`exid`);

--
-- Indexes for table `Exhibit_Employee`
--
ALTER TABLE `Exhibit_Employee`
  ADD KEY `exid` (`exid`),
  ADD KEY `emid` (`emid`);

--
-- Indexes for table `Exhibit_Enrichment`
--
ALTER TABLE `Exhibit_Enrichment`
  ADD KEY `exid` (`exid`),
  ADD KEY `enid` (`enid`);

--
-- Indexes for table `Job`
--
ALTER TABLE `Job`
  ADD PRIMARY KEY (`jid`);

--
-- Indexes for table `Species`
--
ALTER TABLE `Species`
  ADD PRIMARY KEY (`sid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Animal`
--
ALTER TABLE `Animal`
  MODIFY `aid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `Employee`
--
ALTER TABLE `Employee`
  MODIFY `emid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Enrichment`
--
ALTER TABLE `Enrichment`
  MODIFY `enid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Exhibit`
--
ALTER TABLE `Exhibit`
  MODIFY `exid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Job`
--
ALTER TABLE `Job`
  MODIFY `jid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Species`
--
ALTER TABLE `Species`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Animal`
--
ALTER TABLE `Animal`
  ADD CONSTRAINT `FK_AnimalExhibit` FOREIGN KEY (`exid`) REFERENCES `Exhibit` (`exid`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AnimalSpecies` FOREIGN KEY (`sid`) REFERENCES `Species` (`sid`) ON DELETE CASCADE;

--
-- Constraints for table `Employee`
--
ALTER TABLE `Employee`
  ADD CONSTRAINT `FK_EmployeeJob` FOREIGN KEY (`jid`) REFERENCES `Job` (`jid`) ON DELETE CASCADE;

--
-- Constraints for table `Enrichment`
--
ALTER TABLE `Enrichment`
  ADD CONSTRAINT `FK_EnrichmentSpecies` FOREIGN KEY (`sid`) REFERENCES `Species` (`sid`) ON DELETE CASCADE;

--
-- Constraints for table `Exhibit_Employee`
--
ALTER TABLE `Exhibit_Employee`
  ADD CONSTRAINT `FK_EmployeeExhibit` FOREIGN KEY (`emid`) REFERENCES `Employee` (`emid`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_ExhibitEmployee` FOREIGN KEY (`exid`) REFERENCES `Exhibit` (`exid`) ON DELETE CASCADE;

--
-- Constraints for table `Exhibit_Enrichment`
--
ALTER TABLE `Exhibit_Enrichment`
  ADD CONSTRAINT `FK_EnrichmentExhibit` FOREIGN KEY (`enid`) REFERENCES `Enrichment` (`enid`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_ExhibitEnrichment` FOREIGN KEY (`exid`) REFERENCES `Exhibit` (`exid`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
