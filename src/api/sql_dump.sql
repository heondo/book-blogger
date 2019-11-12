-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 12, 2019 at 02:20 PM
-- Server version: 5.7.27-0ubuntu0.18.04.1
-- PHP Version: 7.2.19-0ubuntu0.18.04.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `book-blogger`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `id` varchar(20) NOT NULL,
  `authors` varchar(250) NOT NULL,
  `title` varchar(150) NOT NULL,
  `images` varchar(500) DEFAULT '{"thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvqH_jaoZOvRo6l76ULYm3Rja2vEsNcJ_YjLVE5SO64ijDrKWg&s"}',
  `links` text,
  `publisher` varchar(80) DEFAULT NULL,
  `publish_date` varchar(30) DEFAULT NULL,
  `lang` varchar(15) DEFAULT NULL,
  `description` text,
  `page_count` smallint(5) UNSIGNED DEFAULT NULL,
  `price` decimal(10,0) UNSIGNED DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `categories` varchar(120) DEFAULT NULL,
  `average_rating` decimal(10,0) UNSIGNED DEFAULT NULL,
  `rating_count` tinyint(3) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`id`, `authors`, `title`, `images`, `links`, `publisher`, `publish_date`, `lang`, `description`, `page_count`, `price`, `currency`, `categories`, `average_rating`, `rating_count`) VALUES
('0pESodzfIvEC', 'Bodhi Oser', 'Fuck This Book', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=0pESodzfIvEC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=0pESodzfIvEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=0pESodzfIvEC&printsec=frontcover&dq=fuck&hl=&cd=1&source=gbs_api\",\"infoLink\":\"http://books.google.com/books?id=0pESodzfIvEC&dq=fuck&hl=&source=gbs_api\",\"canonicalVolumeLink\":\"https://books.google.com/books/about/Fuck_This_Book.html?hl=&id=0pESodzfIvEC\"}', 'Chronicle Books', '2005-07-28', 'en', 'Presents a collection of images of real public signs and billboards that have been altered by stickers bearing profane four-letter words.', 160, NULL, NULL, 'Humor', '3', 2),
('4DYXAAAAIAAJ', 'James Bryce Bryce (Viscount)', 'The American Commonwealth', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=4DYXAAAAIAAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=4DYXAAAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=4DYXAAAAIAAJ&pg=PP1&dq=hi&hl=&cd=1&source=gbs_api\",\"infoLink\":\"https://play.google.com/store/books/details?id=4DYXAAAAIAAJ&source=gbs_api\",\"canonicalVolumeLink\":\"https://play.google.com/store/books/details?id=4DYXAAAAIAAJ\"}', NULL, '1896', 'en', NULL, 547, NULL, NULL, 'United States', NULL, NULL),
('5wBQEp6ruIAC', 'Andrew Hunt,David Thomas', 'The Pragmatic Programmer', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=5wBQEp6ruIAC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=5wBQEp6ruIAC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=5wBQEp6ruIAC&printsec=frontcover&dq=programmer&hl=&cd=1&source=gbs_api\",\"infoLink\":\"https://play.google.com/store/books/details?id=5wBQEp6ruIAC&source=gbs_api\",\"canonicalVolumeLink\":\"https://play.google.com/store/books/details?id=5wBQEp6ruIAC\"}', 'Addison-Wesley Professional', '1999-10-20', 'en', 'What others in the trenches say about The Pragmatic Programmer... “The cool thing about this book is that it’s great for keeping the programming process fresh. The book helps you to continue to grow and clearly comes from people who have been there.” —Kent Beck, author of Extreme Programming Explained: Embrace Change “I found this book to be a great mix of solid advice and wonderful analogies!” —Martin Fowler, author of Refactoring and UML Distilled “I would buy a copy, read it twice, then tell all my colleagues to run out and grab a copy. This is a book I would never loan because I would worry about it being lost.” —Kevin Ruland, Management Science, MSG-Logistics “The wisdom and practical experience of the authors is obvious. The topics presented are relevant and useful.... By far its greatest strength for me has been the outstanding analogies—tracer bullets, broken windows, and the fabulous helicopter-based explanation of the need for orthogonality, especially in a crisis situation. I have little doubt that this book will eventually become an excellent source of useful information for journeymen programmers and expert mentors alike.” —John Lakos, author of Large-Scale C++ Software Design “This is the sort of book I will buy a dozen copies of when it comes out so I can give it to my clients.” —Eric Vought, Software Engineer “Most modern books on software development fail to cover the basics of what makes a great software developer, instead spending their time on syntax or technology where in reality the greatest leverage possible for any software team is in having talented developers who really know their craft well. An excellent book.” —Pete McBreen, Independent Consultant “Since reading this book, I have implemented many of the practical suggestions and tips it contains. Across the board, they have saved my company time and money while helping me get my job done quicker! This should be a desktop reference for everyone who works with code for a living.” —Jared Richardson, Senior Software Developer, iRenaissance, Inc. “I would like to see this issued to every new employee at my company....” —Chris Cleeland, Senior Software Engineer, Object Computing, Inc. “If I’m putting together a project, it’s the authors of this book that I want. . . . And failing that I’d settle for people who’ve read their book.” —Ward Cunningham Straight from the programming trenches, The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code that delights its users. It covers topics ranging from personal responsibility and career development to architectural techniques for keeping your code flexible and easy to adapt and reuse. Read this book, and you\'ll learn how to Fight software rot; Avoid the trap of duplicating knowledge; Write flexible, dynamic, and adaptable code; Avoid programming by coincidence; Bullet-proof your code with contracts, assertions, and exceptions; Capture real requirements; Test ruthlessly and effectively; Delight your users; Build teams of pragmatic programmers; and Make your developments more precise with automation. Written as a series of self-contained sections and filled with entertaining anecdotes, thoughtful examples, and interesting analogies, The Pragmatic Programmer illustrates the best practices and major pitfalls of many different aspects of software development. Whether you\'re a new coder, an experienced programmer, or a manager responsible for software projects, use these lessons daily, and you\'ll quickly see improvements in personal productivity, accuracy, and job satisfaction. You\'ll learn skills and develop habits and attitudes that form the foundation for long-term success in your career. You\'ll become a Pragmatic Programmer.', 352, '40', 'USD', 'Computers', '5', 14),
('a9kmAAAAMAAJ', 'Robert C. Bruce', 'Software Debugging for Microcomputers', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=a9kmAAAAMAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=a9kmAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=a9kmAAAAMAAJ&dq=intitle:Software+intitle:Debugging+intitle:for+intitle:Microcomputers&hl=&cd=1&source=gbs_api\",\"infoLink\":\"http://books.google.com/books?id=a9kmAAAAMAAJ&dq=intitle:Software+intitle:Debugging+intitle:for+intitle:Microcomputers&hl=&source=gbs_api\",\"canonicalVolumeLink\":\"https://books.google.com/books/about/Software_Debugging_for_Microcomputers.html?hl=&id=a9kmAAAAMAAJ\"}', NULL, '1980', 'en', 'Illustrates How Bugs Are Discovered, Tracked Down & Eradicated', 351, NULL, NULL, 'Robert C. Bruce', NULL, NULL),
('aGWMDwAAQBAJ', 'Jacqueline Woodson', 'Red at the Bone', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=aGWMDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=aGWMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=aGWMDwAAQBAJ&printsec=frontcover&dq=intitle:red+intitle:at+intitle:the+intitle:bone&hl=&cd=1&source=gbs_api\",\"infoLink\":\"https://play.google.com/store/books/details?id=aGWMDwAAQBAJ&source=gbs_api\",\"canonicalVolumeLink\":\"https://play.google.com/store/books/details?id=aGWMDwAAQBAJ\"}', 'Penguin', '2019-09-17', 'en', '\"Gorgeous, moving…A story of love—romantic and familial—and alienation, grief and triumph, disaster and surviva.\" —Nylon \"For those still mourning the loss of Toni Morrison, it’s essential that you direct your attention to National Book Award winner Jacqueline Woodson.\" –The Observer Named a Most Anticipated Book of Fall by People, Entertainment Weekly, The New York Times, Parade, Vox, Time and more An unexpected teenage pregnancy pulls together two families from different social classes, and exposes the private hopes, disappointments, and longings that can bind or divide us from each other, from the New York Times-bestselling and National Book Award-winning author of Another Brooklyn and Brown Girl Dreaming. Moving forward and backward in time, Jacqueline Woodson\'s taut and powerful new novel uncovers the role that history and community have played in the experiences, decisions, and relationships of these families, and in the life of the new child. As the book opens in 2001, it is the evening of sixteen-year-old Melody\'s coming of age ceremony in her grandparents\' Brooklyn brownstone. Watched lovingly by her relatives and friends, making her entrance to the music of Prince, she wears a special custom-made dress. But the event is not without poignancy. Sixteen years earlier, that very dress was measured and sewn for a different wearer: Melody\'s mother, for her own ceremony-- a celebration that ultimately never took place. Unfurling the history of Melody\'s parents and grandparents to show how they all arrived at this moment, Woodson considers not just their ambitions and successes but also the costs, the tolls they\'ve paid for striving to overcome expectations and escape the pull of history. As it explores sexual desire and identity, ambition, gentrification, education, class and status, and the life-altering facts of parenthood, Red at the Bone most strikingly looks at the ways in which young people must so often make long-lasting decisions about their lives--even before they have begun to figure out who they are and what they want to be.', 208, '14', 'USD', 'Jacqueline Woodson', '5', 7),
('cT5U7IlC_ugC', 'Sarfraz Zaidi, MD', 'Power of Vitamin D', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=cT5U7IlC_ugC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=cT5U7IlC_ugC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=cT5U7IlC_ugC&printsec=frontcover&dq=d&hl=&cd=1&source=gbs_api\",\"infoLink\":\"http://books.google.com/books?id=cT5U7IlC_ugC&dq=d&hl=&source=gbs_api\",\"canonicalVolumeLink\":\"https://books.google.com/books/about/Power_of_Vitamin_D.html?hl=&id=cT5U7IlC_ugC\"}', 'Sarfraz Zaidi, MD', '2013-08-29', 'en', 'Vitamin D is crucial to our health, yet most people are low in this vital vitamin - despite the vitamins they take, the foods they eat, the milk they drink or the sun exposure they receive. In Power of Vitamin D you will learn:?Çó Why we are facing a true Epidemic of Vitamin D deficiency.?Çó The crucial role Vitamin D can play in the Prevention as well as Treatment of various Cancers.?Çó How Vitamin D can help Prevent Diabetes, Coronary Heart Disease, Hypertension and Kidney Disease.?Çó How Vitamin D can Prevent as well as Treat Muscle Aches, Chronic Fatigue, Fibromyalgia, Bone Pains and Osteoporosis.?Çó The vital role of Vitamin D in the normal functioning of the Immune System.?Çó How Vitamin D can Prevent as well as Treat the Common Cold, Tuberculosis, Asthma, Thyroid Diseases, M.S., Lupus and Arthritis.?Çó The essential role of Vitamin D during Pregnancy for Mothers and Babies.?Çó Doctors frequently miss the Diagnosis of Vitamin D deficiency because they often order the wrong test.?Çó The right test to Diagnose Vitamin D deficiency.?Çó The best way to Prevent and Treat Vitamin D deficiency. ?Çó Vitamin D Toxicity and how to Prevent it. ?Çó Not just theoretical knowledge, but detailed, practical information from actual Case Studies.', 236, NULL, NULL, 'Health & Fitness', '5', 2),
('ia7xAwAAQBAJ', 'Dr. Seuss', 'The Cat in the Hat', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=ia7xAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=ia7xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=ia7xAwAAQBAJ&printsec=frontcover&dq=cat+in+the+hat&hl=&cd=2&source=gbs_api\",\"infoLink\":\"https://play.google.com/store/books/details?id=ia7xAwAAQBAJ&source=gbs_api\",\"canonicalVolumeLink\":\"https://play.google.com/store/books/details?id=ia7xAwAAQBAJ\"}', 'RH Childrens Books', '2013-09-24', 'en', 'Join the Cat in the Hat as he makes learning to read a joy! It’s a rainy day and Dick and Sally can’t find anything to do . . . until the Cat in the Hat unexpectedly appears and turns their dreary afternoon into a fun-filled extravaganza! This beloved Beginner Book by Dr. Seuss, which also features timeless Dr. Seuss characters such as Fish and Thing 1 and Thing 2, is fun to read aloud and easy to read alone. Written using 236 different words that any first or second grader can read, it’s a fixture in home and school libraries and a favorite among parents, beginning readers, teachers, and librarians. Originally created by Dr. Seuss, Beginner Books encourage children to read all by themselves, with simple words and illustrations that give clues to their meaning.', 72, '8', 'USD', 'Juvenile Fiction', '4', 255),
('lPV1CQAAQBAJ', 'Mikael Krogerus,Roman Tschäppeler', 'The Test Book', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=lPV1CQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=lPV1CQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=lPV1CQAAQBAJ&printsec=frontcover&dq=test&hl=&cd=1&source=gbs_api\",\"infoLink\":\"https://play.google.com/store/books/details?id=lPV1CQAAQBAJ&source=gbs_api\",\"canonicalVolumeLink\":\"https://play.google.com/store/books/details?id=lPV1CQAAQBAJ\"}', 'W. W. Norton & Company', '2015-10-05', 'en', 'An essential library of tests for self-knowledge and success, from the strategic thinking experts behind the international bestseller The Decision Book. Are you clever? Can you self-motivate? Are you creative? How do you handle money? Can you lead others well? With their trademark style and wit, best-selling authors Mikael Krogerus and Roman Tschäppeler present sixty-four tests spanning intelligence and personality type; creativity and leadership skills; fitness and lifestyle; and knowledge and belief. From what you see in a Rorschach test to comparing your workout against a Navy SEAL’s, from EQ to IQ and Myers-Briggs in between, The Test Book offers a panoply of ways to assess yourself and decide what you need to succeed. As Krogerus and Tschäppeler highlight, you can only know whether you have the right skills, the right job, or the right partner when you know where you stand right now. Small enough to fit in your pocket but packed with insight and good humor, The Test Book delivers a quick, fun way to evaluate your life and happiness.', 208, '18', 'USD', 'Self-Help', NULL, NULL),
('o53ilir4yXcC', 'Stieg Larsson', 'The Girl with the Dragon Tattoo', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=o53ilir4yXcC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=o53ilir4yXcC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=o53ilir4yXcC&printsec=frontcover&dq=girl+with+the+dragon+tattoo&hl=&cd=1&source=gbs_api\",\"infoLink\":\"http://books.google.com/books?id=o53ilir4yXcC&dq=girl+with+the+dragon+tattoo&hl=&source=gbs_api\",\"canonicalVolumeLink\":\"https://books.google.com/books/about/The_Girl_with_the_Dragon_Tattoo.html?hl=&id=o53ilir4yXcC\"}', 'Vintage', '2009', 'en', 'Forty years after the disappearance of Harriet Vanger from the secluded island owned and inhabited by the powerful Vanger family, her octogenarian uncle hires journalist Mikael Blomqvist and Lisbeth Salander, an unconventional young hacker, to investigate.', 600, NULL, NULL, 'Fiction', '4', 255),
('pIs9Em38dAoC', 'Bert Coules,Daniel Keyes', 'The Play of Daniel Keyes\' Flowers for Algernon', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=pIs9Em38dAoC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=pIs9Em38dAoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=pIs9Em38dAoC&printsec=frontcover&dq=flowers+for+algernon&hl=&cd=1&source=gbs_api\",\"infoLink\":\"http://books.google.com/books?id=pIs9Em38dAoC&dq=flowers+for+algernon&hl=&source=gbs_api\",\"canonicalVolumeLink\":\"https://books.google.com/books/about/The_Play_of_Daniel_Keyes_Flowers_for_Alg.html?hl=&id=pIs9Em38dAoC\"}', 'Heinemann', '1993', 'en', 'The Heinemann Plays series offers contemporary drama and classic plays in durable classroom editions. Many have large casts and an equal mix of boy and girl parts. This play is a dramatization of Daniel Keyes\'s story about a retarded adult who desperately wants to be able to read and write.', 128, NULL, NULL, 'English drama', '5', 3),
('pza-vgEACAAJ', 'Theodor Seuss Geisel', 'The Cat in the Hat', '{\"thumbnail\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvqH_jaoZOvRo6l76ULYm3Rja2vEsNcJ_YjLVE5SO64ijDrKWg&s\"}	', '{\"previewLink\":\"http://books.google.com/books?id=pza-vgEACAAJ&dq=Cat+in+the+hat&hl=&cd=1&source=gbs_api\",\"infoLink\":\"http://books.google.com/books?id=pza-vgEACAAJ&dq=Cat+in+the+hat&hl=&source=gbs_api\",\"canonicalVolumeLink\":\"https://books.google.com/books/about/The_Cat_in_the_Hat.html?hl=&id=pza-vgEACAAJ\"}', NULL, '1957', 'en', 'Two children sitting at home on a rainy day meet the cat in the hat who shows them some tricks and games.', 61, NULL, NULL, 'Cats', NULL, NULL),
('tLdiDwAAQBAJ', 'Alex Michaelides', 'The Silent Patient', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=tLdiDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=tLdiDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=tLdiDwAAQBAJ&printsec=frontcover&dq=intitle:the+intitle:silent+intitle:patient&hl=&cd=1&source=gbs_api\",\"infoLink\":\"https://play.google.com/store/books/details?id=tLdiDwAAQBAJ&source=gbs_api\",\"canonicalVolumeLink\":\"https://play.google.com/store/books/details?id=tLdiDwAAQBAJ\"}', 'Celadon Books', '2019-02-05', 'en', 'The instant #1 New York Times bestseller \"An unforgettable—and Hollywood-bound—new thriller... A mix of Hitchcockian suspense, Agatha Christie plotting, and Greek tragedy.\" —Entertainment Weekly The Silent Patient is a shocking psychological thriller of a woman’s act of violence against her husband—and of the therapist obsessed with uncovering her motive. Alicia Berenson’s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London’s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word. Alicia’s refusal to talk, or give any kind of explanation, turns a domestic tragedy into something far grander, a mystery that captures the public imagination and casts Alicia into notoriety. The price of her art skyrockets, and she, the silent patient, is hidden away from the tabloids and spotlight at the Grove, a secure forensic unit in North London. Theo Faber is a criminal psychotherapist who has waited a long time for the opportunity to work with Alicia. His determination to get her to talk and unravel the mystery of why she shot her husband takes him down a twisting path into his own motivations—a search for the truth that threatens to consume him....', 304, '14', 'USD', 'Alex Michaelides', '4', 54),
('wFamCQAAQBAJ', 'Albert B. Ulrich III', 'How to Frag Corals', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=wFamCQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=wFamCQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=wFamCQAAQBAJ&printsec=frontcover&dq=frag&hl=&cd=1&source=gbs_api\",\"infoLink\":\"https://play.google.com/store/books/details?id=wFamCQAAQBAJ&source=gbs_api\",\"canonicalVolumeLink\":\"https://play.google.com/store/books/details?id=wFamCQAAQBAJ\"}', 'Albert B Ulrich III', NULL, 'en', 'Step-by-step instructions Be confident and successful fragging corals. What does your ideal coral aquarium look like? Do you want a mixed coral reef tank, buzzing with color and energy as fish and invertebrates fill every level with the colors and textures of a coral reef? It is a devastating feeling to buy a new coral and watch it shrivel away and die in your tank. Wild-collected corals travel long distances in some challenging living conditions before they make it to your home aquarium, and many of those specimens are damaged and dying before you get them home. In this book, I will show you how some successful reef aquarium hobbyists are able to fill their tanks with corals that are already proven to grow well in their tanks. These aquarists are also able to trade with other hobbyists to acquire some of the corals that are grow best for them, and many are even able to use these secrets to make a little money on the side. Ok, they aren’t really secrets, but what I am talking about is fragging corals. Hi, I’m Albert Ulrich, the author of The New Saltwater Aquarium Guide and 107 Tips for the Marine Reef Aquarium. I have been published in Aquarium Fish International and Aquariums USA magazines and I have been blogging online about the hobby for years at www.SaltwaterAquariumBlog.com. This book will show you how to frag corals for your marine aquarium with step-by-step instructions. Get your copy today!', NULL, '8', 'USD', 'Pets', NULL, NULL),
('zbyA2clW0h0C', 'Bodhi Oser', 'Fuck the World', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=zbyA2clW0h0C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=zbyA2clW0h0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=zbyA2clW0h0C&pg=PT79&dq=fuck&hl=&cd=8&source=gbs_api\",\"infoLink\":\"https://play.google.com/store/books/details?id=zbyA2clW0h0C&source=gbs_api\",\"canonicalVolumeLink\":\"https://play.google.com/store/books/details?id=zbyA2clW0h0C\"}', 'Chronicle Books', '2012-10-26', 'en', 'Juvenile, profane, and timeless, Bodhi Oser\'s first collection of photographs, Fuck this Book, featured images of real public signs that had been mischievously altered by stickers bearing the most expressive of all four-letter words. For this all-new collection, Oser embarked on a globe-trotting odyssey, spending countless hours on the hunt for the almost-perfect sign, in need of just the slightest improvement. Addictively hilarious, the results show a world persuasively transformed. Is it any wonder tourists flock to Fuckingham Palace? All photographs are unretouched—all real stickers, all real signs, all in good humor. Also included are the best submissions sent in by fans around the world.', 160, '14', 'USD', 'Humor', NULL, NULL),
('_oG_iTxP1pIC', 'Daniel Keyes', 'Flowers for Algernon', '{\"smallThumbnail\":\"http://books.google.com/books/content?id=_oG_iTxP1pIC&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api\",\"thumbnail\":\"http://books.google.com/books/content?id=_oG_iTxP1pIC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api\"}', '{\"previewLink\":\"http://books.google.com/books?id=_oG_iTxP1pIC&printsec=frontcover&dq=intitle:flowers+intitle:for+intitle:algernon&hl=&cd=1&source=gbs_api\",\"infoLink\":\"https://play.google.com/store/books/details?id=_oG_iTxP1pIC&source=gbs_api\",\"canonicalVolumeLink\":\"https://play.google.com/store/books/details?id=_oG_iTxP1pIC\"}', 'Houghton Mifflin Harcourt', '2007-12-01', 'en', 'Oscar-winning film Charly starring Cliff Robertson and Claire Bloom-a mentally challenged man receives an operation that turns him into a genius...and introduces him to heartache.', 304, '9', 'USD', 'Daniel Keyes', '4', 171);

-- --------------------------------------------------------

--
-- Table structure for table `bookmark`
--

CREATE TABLE `bookmark` (
  `id` int(11) NOT NULL,
  `review_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookmark`
--

INSERT INTO `bookmark` (`id`, `review_id`, `user_id`) VALUES
(75, 5, 4),
(72, 6, 1),
(2, 6, 3),
(81, 6, 4),
(23, 14, 1),
(82, 14, 4);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL DEFAULT '5',
  `review_id` int(10) UNSIGNED NOT NULL,
  `comment_date` varchar(32) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `user_id`, `review_id`, `comment_date`, `comment`) VALUES
(2, 5, 6, '1573337586', 'Helloooooo this is the first comment for flowers for algernon by a guest'),
(3, 5, 4, '1573337609', 'Second comment by a random guest'),
(4, 1, 4, '1573338207', 'Third comment by a different user for multiple reviews for thing'),
(5, 5, 6, '1573349516', 'Is this going to work?'),
(6, 5, 6, '1573349609', 'Definitely not working'),
(7, 5, 6, '1573349651', 'dammit'),
(8, 5, 6, '1573349693', 'Please?'),
(9, 5, 5, '1573349811', 'This is not going to work'),
(10, 5, 5, '1573349894', 'LORD'),
(11, 5, 5, '1573349934', 'YES'),
(12, 5, 4, '1573349963', 'YES I CAN FINALLY COMMENT'),
(13, 6, 5, '1573352617', 'YSes'),
(14, 5, 6, '1573352665', 'Works'),
(15, 5, 5, '1573354744', 'wait'),
(16, 5, 6, '1573354797', 'sooo'),
(17, 5, 4, '1573354816', 'savior'),
(18, 1, 6, '1573361183', 'time to break'),
(19, 3, 4, '1573453575', 'sdfasdf'),
(20, 3, 4, '1573453622', 'another random one by a guest'),
(21, 5, 5, '1573453644', 'last review by a guest'),
(22, 5, 4, '1573453655', 'does the count go up'),
(23, 4, 14, '1573535266', 'zcv'),
(24, 4, 14, '1573535312', 'yoooooo whats up aaron thats a dope review'),
(25, 4, 14, '1573585698', 'dfgsdfgdfgdf'),
(26, 4, 14, '1573587325', 'Im dane right now');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `book_id` varchar(20) NOT NULL,
  `upload_date` varchar(32) NOT NULL,
  `review` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `user_id`, `book_id`, `upload_date`, `review`) VALUES
(5, 2, 'tLdiDwAAQBAJ', '1573071806', 'My thanks to Ben Willis at Orion Publishing Group for sending me a paperback copy of ‘The Silent Patient’ I have given an honest unbiased review in exchange*\n\nAlicia Berenson was discovered standing over her husband - he’d been tied to a chair and shot in the face five times. Alicia gives no explanation and refuses to speak. She’s admitted to a psychiatric unit, ‘The Grove’ in North London, and six years later she still hasn’t spoken - not one single word!\n\nTheo Faber is a criminal psychotherapist who has always been obsessed with Alicia’s story, and when a position presents itself at The Grove for someone with his qualifications, he applies for the job and is successful. Theo is certain that he can get her to talk, even though others have tried and failed.\n\nAlthough Alicia is silent, the narrative speaks to us in a way that she can’t or won’t, throwing the spotlight on the minutiae of her life as a talented artist, and ultimately what led to the events of that fateful night.\n\nTheo’s own personal life is laid bare too, and he’s also a very complex character - indeed not unlike Alicia. If Theo’s attempts to encourage Alicia to speak are successful, will it be something he wants to hear? Because beneath Alicia’s silent exterior, she has plenty to say!\n\nClever, and compelling, with a humdinger of a twist- I hope the ‘Silent’ Patient ‘speaks’ to you too!'),
(6, 2, '_oG_iTxP1pIC', '1573105218', 'I read this 2 years ago, before I started writing more detailed reviews. I am not planning to modify my thoughts from back then but I want to add my father\'s thoughts. I gifted this book to him last Christmas and he finally got to read it. He was as deeply moved by this magnificent heart wrenching novel as I was and he felt the need to send me a message when he finished to tell how impressed he was. It was the first time he sent me an emotional message about a book so with his permission, I will paste here most of his words:\n\n\"Intelligence, a gift or a course? Yes, I finished the book and I am overwhelmed by many thoughts. Flowers for Algernon is one of those books that after you read you realize how much you would have lost if you hadn\'t read it. We can think of Charlie or of each of us who, as he does, we accumulate and then we loose what we got through hard work. However, as he, we need to know that it wasn\'t for nothing. Knowledge, accumulation, though, happiness, sadness, they all come from learning, books, from the ones around us. Intelligence might be a gift but it still has a price which we have to pay.\" There is more but that is a private daddy-daughter talk. I love sharing my love of books with my dad and I am emotional each time he loves one of the books i recommend.\n\nRead Flowers for Algernon! It is amazing, words cannot describe it.\n\n\nMy original review:\nThis book is extraordinary, one of my favorites. It is a fast read but is is very powerful and heartbreaking. I read it in the plane and I felt a little embarrassed when I started to weep at the end of the book. Even though I was expecting the ending the way it is written still broke my heart.\n\nI loved the way the book is written, as journal entries of an adult retard which is the subject of an experiment that makes him smart (a lot smarter). The writing at first is very childish but as the narrator changes so does the writing. Very clever.\n\nOne of the things that I found to be most powerful was the way the narrator changed his view of others after becoming more intelligent and the way others changed their attitude towards him.\n\n\nI believe this should be read by everybody. Highly recommended. '),
(14, 3, 'pIs9Em38dAoC', '1573454531', 'reviewed the play of the dude below me lol'),
(15, 4, 'o53ilir4yXcC', '1573535500', 'SO GOOD. This book was fantastic. Long, and lots of swedish names that take some time to learn and it will have you going back. But its all worth it in the end. Seriously I could not put it down for weeks while I was busy with the entire trilogy.\nsdfsdfsdfasfsdfds');

-- --------------------------------------------------------

--
-- Table structure for table `review_tag`
--

CREATE TABLE `review_tag` (
  `id` int(10) UNSIGNED NOT NULL,
  `review_id` int(10) UNSIGNED NOT NULL,
  `tag_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `review_tag`
--

INSERT INTO `review_tag` (`id`, `review_id`, `tag_id`) VALUES
(19, 5, 5),
(20, 5, 8),
(21, 5, 22),
(22, 6, 18),
(23, 6, 17),
(24, 6, 4),
(36, 14, 25),
(37, 14, 24),
(38, 14, 9),
(39, 15, 5),
(40, 15, 3),
(41, 15, 8),
(42, 15, 22);

-- --------------------------------------------------------

--
-- Table structure for table `tag`
--

CREATE TABLE `tag` (
  `id` int(10) UNSIGNED NOT NULL,
  `tag` varchar(30) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tag`
--

INSERT INTO `tag` (`id`, `tag`) VALUES
(25, 'ASDF'),
(9, 'BIOGRAPHY'),
(24, 'CODING'),
(3, 'DIFFICULT READ'),
(10, 'FANTASY'),
(5, 'FICTION'),
(4, 'GOOD REREAD'),
(2, 'HISTORY'),
(23, 'MAFSD'),
(22, 'MURDER MYSTERY'),
(7, 'MYSTERY'),
(20, 'NEW TAG FOR TESTING'),
(6, 'NON-FICTION'),
(17, 'SCIENCE FICTION'),
(1, 'SELF HELP'),
(18, 'THOUGHT PROVOKING'),
(8, 'THRILLER');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `join_date` varchar(32) DEFAULT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(60) NOT NULL,
  `first` varchar(30) NOT NULL,
  `last` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `join_date`, `email`, `password`, `first`, `last`) VALUES
(1, '1573071380', 'heondokim@gmail.com', '$2a$10$d2FM9VdPfmb8z4UWjtjSxOa7Zf53ZoJI0Jng3N/Lz1670.gO2mTBW', 'heondo', 'kim'),
(2, '1573071380', 'jan@gmail.com', '$2a$10$d2FM9VdPfmb8z4UWjtjSxOa7Zf53ZoJI0Jng3N/Lz1670.gO2mTBW', 'jan', 'to-ong'),
(3, '1573071380', 'adomingo@b.com', '$2a$10$d2FM9VdPfmb8z4UWjtjSxOa7Zf53ZoJI0Jng3N/Lz1670.gO2mTBW', 'aaron', 'domingo'),
(4, '1573071380', 'dmaison@b.com', '$2a$10$d2FM9VdPfmb8z4UWjtjSxOa7Zf53ZoJI0Jng3N/Lz1670.gO2mTBW', 'dane', 'maison'),
(5, NULL, 'Guest', 'Guest', 'Guest', 'Guest'),
(6, '1573071380', '1@t.com', '$2a$10$/CBzZveDsRu65NlCg0FqCOmAr/rmMO6FfpUI5u6JNNNuEHVIt/qbS', 'some', 'newguy');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookmark`
--
ALTER TABLE `bookmark`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `review_id` (`review_id`,`user_id`),
  ADD UNIQUE KEY `review_user` (`review_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_ibfk_1` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Indexes for table `review_tag`
--
ALTER TABLE `review_tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `review_tag_ibfk_1` (`review_id`),
  ADD KEY `review_tag_ibfk_2` (`tag_id`);

--
-- Indexes for table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tag` (`tag`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookmark`
--
ALTER TABLE `bookmark`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;
--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `review_tag`
--
ALTER TABLE `review_tag`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookmark`
--
ALTER TABLE `bookmark`
  ADD CONSTRAINT `bookmark_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookmark_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`);

--
-- Constraints for table `review_tag`
--
ALTER TABLE `review_tag`
  ADD CONSTRAINT `review_tag_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `review_tag_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
