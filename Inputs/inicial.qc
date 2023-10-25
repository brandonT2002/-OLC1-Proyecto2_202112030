-- Crear tablas
CREATE TABLE Empleados (
    ID INT,
    Nombre VARCHAR,
    Salario DOUBLE
);
CREATE TABLE Empleados2 (
    ID INT,
    Nombre VARCHAR,
    Salario DOUBLE
);
CREATE TABLE Venta (
    VentaId INT,
    ProductoId INT,
    Cantidad INT
);
-- Alter
ALTER TABLE Empleados
ADD Edad INT;

-- Drop
DROP TABLE Empleados2;


-- Insertar datos
INSERT INTO Empleados (ID, Nombre, Salario, Edad)
VALUES (1, "Juan", 2500.00, 30);

INSERT INTO Venta(VentaId, ProductoId, Cantidad) VALUES (1, 1, 10);

-- Seleccionar datos
SELECT * FROM Empleados;

-- Actualizar datos
UPDATE Empleados
SET Salario = 2800.00
WHERE ID = 1;
SELECT * from Empleados;

-- Truncar tabla
TRUNCATE TABLE Venta;
SELECT * FROM Venta;

-- Borrar datos
DELETE FROM Empleados WHERE ID = 1;
SELECT * FROM Empleados;



BEGIN
    DECLARE @num1 INT DEFAULT 10;
    DECLARE @num2 INT DEFAULT 5;

    IF @num1 + @num2 > 15 THEN
        PRINT "La suma es mayor que 15";
    ELSE
        PRINT "La suma es menor o igual a 15";
    END IF;

    IF @num1 * @num2 < 30 AND @num1 > @num2 THEN
        PRINT "El producto es menor que 30 y num1 es mayor que num2";
    ELSE
        PRINT "Al menos una de las condiciones no se cumple";
    END IF;


    DECLARE @nota INT;
    SET @nota = 70;
    CASE
        WHEN @nota > 85 THEN "Excelente"
        WHEN @nota >= 61 AND @nota <= 85 THEN "Aprobado"
        ELSE "No Aprobado"
    END;
END;

BEGIN
    DECLARE @contador INT DEFAULT 1;
    DECLARE @suma INT DEFAULT 0;

    WHILE @contador <= 10
    BEGIN
        IF @contador % 2 = 0 BEGIN
            SET @suma = @suma + @contador;
        END;
        SET @contador = @contador + 1;
    END;
    PRINT "La suma de los números pares del 1 al 10 es: "; 
    PRINT @suma;

    DECLARE @i INT DEFAULT 1;
    DECLARE @resultado INT DEFAULT 1;

    FOR @i IN 1..9
    BEGIN
        SET @resultado = @resultado * @i;
    END LOOP;
    PRINT "El resultado es ";
    PRINT @resultado;
END;

-- funciones nativas

select LOWER("HOLA MUNDO") AS "LOWER"; -- hola mundo
select UPPER("hola mundo") AS "UPPER"; -- HOLA MUNDO
select ROUND(125.678980, 3) AS "ROUND"; -- 125.679
select LEN("ganare el curso de compiladores 1") AS "LEN"; -- 33 caracteres
select TRUNCATE(8.965, 1) AS "TRUNCATE"; -- 8.9
select TYPEOF(245.5) AS "TYPEOF"; -- DOUBLE 