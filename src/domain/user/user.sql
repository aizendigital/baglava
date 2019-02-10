CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL,
  `company_id` INT NOT NULL,
  `username` CHAR(45) NOT NULL,
  `email` CHAR(45) NOT NULL,
  `password` CHAR(255) NOT NULL,
  `salt` CHAR(10) NOT NULL,
  `created_at` DATETIME NOT NULL,
  `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
   INDEX `email_UNIQUE` (`email` ASC)
  )
ENGINE = InnoDB