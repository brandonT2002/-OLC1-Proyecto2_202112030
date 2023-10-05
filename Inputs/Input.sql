-- Este es un comentario de una línea
-- SELECT * FROM users WHERE name = 'John Doe';

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
SET @nombre = 'Juan Perez';
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
ADD CUI VARCHAR;

ALTER TABLE Clientes
DROP COLUMN Nombre;

ALTER TABLE Clientes
RENAME TO Empleados;

DROP TABLE Clientes;

INSERT INTO Empleados (CUI, CorreoElectronico)
VALUES ('159', 'pkg@email.com');

SELECT Nombre, edad
FROM Empleados
WHERE Departamento = 'Ventas';

DECLARE @precio1 INT;
SET @precio1 = 50.00;

SELECT Nombre, precio
FROM Productos
WHERE Precio = @precio1;

SELECT @precio1 AS valor_precio;

UPDATE Empleados
SET Salario = 55000
WHERE Departamento = 'Ventas';

TRUNCATE TABLE Empleados;

DELETE FROM Clientes
WHERE Estado = 'Inactivo';

SELECT CAST(Salario AS VARCHAR) FROM Empleados;

DECLARE @nota INT;
SET @nota = 70;

IF @nota >= 61 THEN
    PRINT 'Ganó el laboratorio';
ELSE
    PRINT 'Perdió el laboratorio';
END IF;

DECLARE @nota INT;
SET @nota = 70;

CASE nota
    WHEN nota > 85 THEN 'Excelente'
    WHEN nota >= 61 AND nota <= 85 THEN 'Aprobado'
    ELSE 'No aprobado'
END AS resultado;