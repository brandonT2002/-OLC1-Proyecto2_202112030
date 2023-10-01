-- Este es un comentario de una línea
SELECT * FROM users WHERE name = 'John Doe';

/*
Este es un comentario
de varias líneas
*/

SET @variable_name = value;
-- Declara una variable de tipo `VARCHAR`
DECLARE @nombre VARCHAR;
-- Declara una variable de tipo `INT` con un valor predeterminado de 10
DECLARE @edad INT DEFAULT 10;
-- Asigna el valor 'Juan Pérez' a la variable @nombre
SET @nombre = 'Juan Pérez';
-- Asigna el valor 25 a la variable @edad
SET @edad = 25;
-- Imprime el valor de la variable @nombre
SELECT @nombre;
-- Imprime el valor de la variable @edad
SELECT @edad;

CREATE TABLE Clientes
(
ID_Cliente INT,
Nombre VARCHAR,
CorreoElectronico VARCHAR
);

ALTER TABLE Clientes
ADD CUI STRING;

ALTER TABLE Clientes
DROP COLUMN Clientes;
