CREATE TABLE IF NOT EXISTS `Aizen_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `company_id` INT NOT NULL,
  `username` CHAR(45) NOT NULL,
  `email` CHAR(45) NOT NULL,
  `company_role` CHAR(45) NOT NULL,
  `active` BOOLEAN NOT NULL,
  `password` CHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
   INDEX `email_UNIQUE` (`email` ASC)
  )
ENGINE = InnoDB
