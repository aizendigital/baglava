CREATE TABLE IF NOT EXISTS `Aizen_db`.`session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `session_key` CHAR(100) NOT NULL,
  `data` CHAR(100) NULL,
  `max_age` CHAR(100) NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `key_UNIQUE` (`sess` ASC))
ENGINE = InnoDB