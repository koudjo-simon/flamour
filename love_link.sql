-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 22 avr. 2023 à 06:50
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `love_link`
--

-- --------------------------------------------------------

--
-- Structure de la table `conversation`
--

DROP TABLE IF EXISTS `conversation`;
CREATE TABLE IF NOT EXISTS `conversation` (
  `id_conv` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id_1` int UNSIGNED NOT NULL,
  `user_id_2` int UNSIGNED NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_conv`),
  KEY `fk_user_id_1` (`user_id_1`),
  KEY `fk_user_id_2` (`user_id_2`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id_mes` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `text` text COLLATE utf8mb4_general_ci,
  `media` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `message_sender` int UNSIGNED NOT NULL,
  `id_conversation` int UNSIGNED NOT NULL,
  `message_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_mes`),
  KEY `fk_id_message_sender` (`message_sender`),
  KEY `fk_id_conversation` (`id_conversation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `preference`
--

DROP TABLE IF EXISTS `preference`;
CREATE TABLE IF NOT EXISTS `preference` (
  `pref_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `sexe_id` int UNSIGNED DEFAULT NULL,
  `age` date DEFAULT NULL,
  `race` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`pref_id`),
  KEY `fk_sexe_pref` (`sexe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sexe`
--

DROP TABLE IF EXISTS `sexe`;
CREATE TABLE IF NOT EXISTS `sexe` (
  `sexe_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `libelle` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`sexe_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `prenom` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `pseudo` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `age` date NOT NULL,
  `sexe` smallint NOT NULL,
  `profession` varchar(250) COLLATE utf8mb4_general_ci NOT NULL,
  `pays` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `ville` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `photo_profil` text COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `pseudo` (`pseudo`),
  UNIQUE KEY `ind_nom_prenom_user` (`nom`,`prenom`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `conversation`
--
ALTER TABLE `conversation`
  ADD CONSTRAINT `fk_user_id_1` FOREIGN KEY (`user_id_1`) REFERENCES `utilisateur` (`user_id`),
  ADD CONSTRAINT `fk_user_id_2` FOREIGN KEY (`user_id_2`) REFERENCES `utilisateur` (`user_id`);

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_id_conversation` FOREIGN KEY (`id_conversation`) REFERENCES `conversation` (`id_conv`),
  ADD CONSTRAINT `fk_id_message_sender` FOREIGN KEY (`message_sender`) REFERENCES `utilisateur` (`user_id`);

--
-- Contraintes pour la table `preference`
--
ALTER TABLE `preference`
  ADD CONSTRAINT `fk_sexe_pref` FOREIGN KEY (`sexe_id`) REFERENCES `sexe` (`sexe_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
