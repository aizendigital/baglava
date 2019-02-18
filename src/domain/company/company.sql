CREATE TABLE IF NOT EXISTS `Aizen_db`.`company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` CHAR(100) NOT NULL,
  `slug` CHAR(150) NOT NULL,
  `overview` MEDIUMTEXT NULL,
  `website` CHAR(250) NULL,
  `size` INT NULL,
  `foundDate` DATETIME NULL,
  `industry` CHAR(100) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  `location_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB