
CREATE TABLE IF NOT EXISTS `Aizen_db`.`job` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` CHAR(255) NOT NULL,
  `departmant` CHAR(100) NULL,
  `region` CHAR(100) NULL,
  `isRemote` BOOLEAN NOT NULL,
  `description` MEDIUMTEXT NOT NULL,
  `requirements` MEDIUMTEXT NOT NULL,
  `benefits` MEDIUMTEXT NOT NULL,
  `companyIndustry` CHAR(100) NULL,
  `jobFunction` CHAR(100) NULL,
  `isAgency` BOOLEAN NOT NULL,
  `employmentType` CHAR(100) NULL,
  `experience` CHAR(100) NULL,
  `education` CHAR(100) NULL,
  `keywords` JSON NULL,
  `form` INT NULL,
  `to` INT NULL,
  `currency` CHAR(100) NULL,
  `company_id` CHAR(100) NULL,
  `creator_id` INT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME ON UPDATE CURRENT_TIMESTAMP
  PRIMARY KEY (`id`))
ENGINE = InnoDB