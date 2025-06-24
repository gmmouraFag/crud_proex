CREATE DATABASE IF NOT EXISTS cadastro_placa
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE cadastro_placa;


CREATE TABLE IF NOT EXISTS cadastro (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nome       VARCHAR(100) NOT NULL,
  cpf        CHAR(11)     NOT NULL,          
  placa      VARCHAR(7)   NOT NULL,          

  criado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  update_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                           ON UPDATE CURRENT_TIMESTAMP,

  UNIQUE KEY uk_cpf   (cpf),
  UNIQUE KEY uk_placa (placa)
) ENGINE = InnoDB;
