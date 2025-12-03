DROP DATABASE IF EXISTS KOUTRS;
CREATE DATABASE KOUTRS;
USE KOUTRS;

CREATE TABLE Jogador
(
  cidade VARCHAR(64) NOT NULL,
  bairro VARCHAR(64) NOT NULL,
  estado CHAR(2) NOT NULL,
  email VARCHAR(128) NOT NULL,
  cpf CHAR(11) NOT NULL,
  sobrenome VARCHAR(64) NOT NULL,
  nome VARCHAR(32) NOT NULL,
  idJogador INT NOT NULL,
  telefone CHAR(11) NOT NULL,
  usuario CHAR(30) NOT NULL,
  senha CHAR(32) NOT NULL,
  PRIMARY KEY (idJogador)
);

CREATE TABLE Funcionario
(
  idFuncionario INT NOT NULL,
  nome VARCHAR(32) NOT NULL,
  sobrenome VARCHAR(64) NOT NULL,
  email VARCHAR(64) NOT NULL,
  cpf CHAR(11) NOT NULL,
  telefone CHAR(11) NOT NULL,
  senha VARCHAR(32) NOT NULL,
  PRIMARY KEY (idFuncionario)
);

CREATE TABLE Horarios
(
  idHorario INT NOT NULL,
  inicio INT NOT NULL,
  PRIMARY KEY (idHorario)
);

CREATE TABLE Proprietario
(
  telefone CHAR(11) NOT NULL,
  cnpj CHAR(14) NOT NULL,
  idProprietario INT NOT NULL,
  senha VARCHAR(32) NOT NULL,
  nome VARCHAR(32) NOT NULL,
  email VARCHAR(64) NOT NULL,
  PRIMARY KEY (idProprietario)
);

CREATE TABLE Quadra
(
  rua VARCHAR(64) NOT NULL,
  bairro VARCHAR(64) NOT NULL,
  estado CHAR(2) NOT NULL,
  numero VARCHAR(8) NOT NULL,
  cidade VARCHAR(64) NOT NULL,
  cep CHAR(8) NOT NULL,
  idQuadra INT NOT NULL,
  nome VARCHAR(64) NOT NULL,
  tipoEsporte VARCHAR(32) NOT NULL,
  qtdJogadores INT NOT NULL,
  largura FLOAT NOT NULL,
  comprimento FLOAT NOT NULL,
  valor FLOAT NOT NULL,
  fotos INT NOT NULL,
  idProprietario INT NOT NULL,
  PRIMARY KEY (idQuadra),
  FOREIGN KEY (idProprietario) REFERENCES Proprietario(idProprietario)
);

CREATE TABLE Reserva
(
  idReserva INT NOT NULL,
  data DATE NOT NULL,
  duracao INT NOT NULL,
  idJogador INT NOT NULL,
  idFuncionario INT NOT NULL,
  idHorario INT NOT NULL,
  idQuadra INT NOT NULL,
  PRIMARY KEY (idReserva),
  FOREIGN KEY (idJogador) REFERENCES Jogador(idJogador),
  FOREIGN KEY (idFuncionario) REFERENCES Funcionario(idFuncionario),
  FOREIGN KEY (idHorario) REFERENCES Horarios(idHorario),
  FOREIGN KEY (idQuadra) REFERENCES Quadra(idQuadra)
);