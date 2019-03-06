
CREATE TABLE IF NOT EXISTS `Aizen_db`.`user_company` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` CHAR(255) NOT NULL,
  `company_id` CHAR(100) NULL,
  `role` CHAR(100) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB