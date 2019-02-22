CREATE TABLE IF NOT EXISTS `Aizen_db`.`sql_session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `state_id` CHAR(100) NOT NULL,
  `data` CHAR(255) NULL,
  `user_id` CHAR(100) NULL,
  `created_at` DATETIME NOT NULL,
  `last_visit` DATETIME NOT NULL,
  `active` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `key_UNIQUE` (`state_id` ASC))
ENGINE = InnoDB