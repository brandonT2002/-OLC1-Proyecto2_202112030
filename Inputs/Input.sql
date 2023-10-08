-- Este es un comentario de una línea
-- SELECT * FROM users WHERE name = 'John Doe';

/*
Este es un comentario
de varias líneas
*/

SET @variable_name = value;
-- Declara una variable de tipo `VARCHAR`
DECLARE @nombre VARCHAR, @edad INT;
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

-- ========== CASTEOS ==========
SELECT CAST(Salario AS VARCHAR) FROM Empleados;

-- ========== ESTRUCTURA IF ==========
DECLARE @nota INT;
SET @nota = 70;

IF @nota >= 61 THEN
    PRINT 'Ganó el laboratorio';
ELSE
    PRINT 'Perdió el laboratorio';
END IF;

-- ========== ESTRUCTURA CASE ==========
DECLARE @nota INT;
SET @nota = 70;

CASE nota
    WHEN nota > 85 THEN 'Excelente'
    WHEN nota >= 61 AND nota <= 85 THEN 'Aprobado'
    ELSE 'No aprobado'
END AS resultado;

-- ========== ESTRUCTURA WHILE ==========
DECLARE @contador INT = 0;

WHILE @contador < 10
BEGIN
    PRINT 'Contador: ' + CAST(@contador AS VARCHAR);
    SET @contador = @contador + 1;
END;

-- ========== ESTRUCTURA FOR ==========
FOR contador IN 1..10
BEGIN
    PRINT 'Contador: ' + CAST(contador AS VARCHAR);
END LOOP;

-- ========== BREAK Y CONTINUE ==========
DECLARE @contador INT = 1;

WHILE @contador <= 10
BEGIN
    IF @contador = 5 THEN
        BREAK;
    END IF;

    IF @contador = 3 THEN
        SET @contador = @contador + 1;
        CONTINUE;
    END IF;

    PRINT 'Contador: ' + CAST(@contador AS VARCHAR);
    SET @contador = @contador + 1;
END;

-- ========== FUNCIONES ==========
CREATE FUNCTION CalcularAreaCirctulo(@pi FLOAT, @radio FLOAT)
RETURNS FLOAT
BEGIN
    DECLARE @area FLOAT;
    SET @area = @pi * @radio * @radio;
    RETURN @area;
END;

-- ========== FUNCIONES ==========
CREATE PROCEDURE SumarNumeros
    @numero1 INT,
    @numero2 INT,
    @resultado INT
AS
BEGIN
    SET @resultado = @numero1 + @numero2;
    PRINT 'La suma es: ' + CAST(@resultado AS VARCHAR);
END;

-- ========== LLAMDAS FUNC ==========
DECLARE @radioCirculo FLOAT = 5.0;
DECLARE @pi FLOAT = 3.14159265359;
DECLARE @areaCirculo FLOAT;

SET @areaCirculo = CalcularAreaCirctulo(@pi, @radioCirculo);

PRINT 'eL ÁREA DEL CÍRCULO CON RADIO ' + CAST(@radioCirculo AS VARCHAR) + ' es ' + CAST(@areaCirculo AS VARCHAR);