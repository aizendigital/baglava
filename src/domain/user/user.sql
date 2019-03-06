CREATE TABLE IF NOT EXISTS `Aizen_db`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` CHAR(45) NOT NULL,
  `company_role` CHAR(45) NULL,
  `active` BOOLEAN NOT NULL,
  `password` CHAR(255) NOT NULL,
  `token` CHAR(100),
  `expire_token` DATETIME,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `email_UNIQUE` (`email` ASC)
) ENGINE = InnoDB
