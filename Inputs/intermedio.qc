-- Crear tablas 
CREATE TABLE Clientes (
    ClienteID INT,
    Nombre VARCHAR,
    Email VARCHAR
);

CREATE TABLE Pedidos (
    PedidoID INT,
    ClienteID INT,
    Producto VARCHAR,
    Cantidad INT
);
CREATE TABLE Clientes2 (
    ClienteID INT,
    Nombre VARCHAR,
    Email VARCHAR
);

CREATE TABLE Pedidos2 (
    PedidoID INT,
    ClienteID INT,
    Producto VARCHAR,
    Cantidad INT
);
-- Alter
ALTER TABLE Pedidos
ADD Estado VARCHAR;

ALTER TABLE Pedidos
RENAME TO NewPedidos;

-- Drop tablas 
DROP TABLE Pedidos2;
DROP TABLE Clientes2;


-- Insertar datos
INSERT INTO Clientes (ClienteID, Nombre, Email)
VALUES (1, "Ana", "ana@example.com");
INSERT INTO Clientes (ClienteID, Nombre, Email)
VALUES (2, "Carlos", "carlos@example.com");

INSERT INTO NewPedidos (PedidoID, ClienteID, Producto, Cantidad, Estado)
VALUES (101, 1, "Producto A", 3, "En proceso");
INSERT INTO NewPedidos (PedidoID, ClienteID, Producto, Cantidad, Estado)
VALUES (102, 2, "Producto B", 5, "Pendiente");

-- Seleccionar datos con WHERE
SELECT * FROM Clientes WHERE ClienteID = 1;
SELECT * FROM NewPedidos WHERE Estado = "En proceso";

-- Actualizar datos
UPDATE NewPedidos
SET Estado = "Completado"
WHERE PedidoID = 101;
SELECT * from NewPedidos;

-- Truncar tabla
TRUNCATE TABLE NewPedidos;
SELECT * from NewPedidos;

-- Borrar datos
DELETE FROM Clientes WHERE ClienteID = 2;
SELECT * from Clientes;

BEGIN
    DECLARE @valor1 INT DEFAULT 25;
    DECLARE @valor2 INT DEFAULT 30;

    IF (@valor1 + @valor2) % 3 = 0 AND (@valor1 * @valor2) > 400 THEN
        PRINT "La suma es divisible por 3 y el producto es mayor que 400";
    ELSE
        PRINT "Al menos una de las condiciones no se cumple";
    END IF;

    DECLARE @cantidad INT DEFAULT 8;
    DECLARE @precio DOUBLE DEFAULT 20.25;

    IF @cantidad * @precio >= 160 OR (@cantidad % 2 = 0 AND @precio > 15) THEN
        PRINT "El total es mayor o igual a 160 o la cantidad es par y el precio es mayor a 15";
    ELSE
        PRINT "Al menos una de las condiciones no se cumple";
    END IF;

    DECLARE @edad INT DEFAULT 18;
    DECLARE @genero VARCHAR DEFAULT "M";

    CASE 
        WHEN @edad >= 18 AND @genero = "M" THEN "Hombre Adulto"
        WHEN @edad >= 18 AND @genero = "F" THEN "Mujer Adulta"
        WHEN @edad < 18 AND @genero = "M" THEN "Joven Hombre"
        WHEN @edad < 18 AND @genero = "F" THEN "Joven Mujer"
        ELSE "Otro"
    END;

END;

CREATE PROCEDURE CalcularSumaMultiplicacion
AS
BEGIN
    DECLARE @contador INT DEFAULT 1;
    DECLARE @sumaPares INT DEFAULT 0;

    WHILE @contador <= 10
    BEGIN
        IF @contador % 2 = 0 BEGIN
            SET @sumaPares = @sumaPares + @contador;
        END;

        IF @sumaPares > 15 BEGIN
            PRINT "La suma de números pares supera 15. Salir del bucle WHILE.";
            BREAK; -- Sale del bucle WHILE
        END;

        SET @contador = @contador + 1;
    END;

    PRINT "Suma de números pares menor o igual a 15. Continuar con el bucle FOR.";

    DECLARE @resultado INT DEFAULT 1;
    DECLARE @i INT DEFAULT 1;

    FOR @i IN 1..9
    BEGIN
        IF @resultado > 50 BEGIN
            PRINT "El resultado supera 50. Salir del bucle FOR.";
            BREAK; -- Sale del bucle FOR
        END;

        SET @resultado = @resultado * @i;

        IF @i = 5 BEGIN
            PRINT "Saltar el cálculo para i = 5.";
            CONTINUE; -- Salta a la siguiente iteración del bucle FOR
        END;

        PRINT "Resultado parcial para i = ";
        PRINT @i;
        PRINT " es ";
        PRINT @resultado;
    END LOOP;
END;
-- Función 
CREATE FUNCTION CalcularFactorial() RETURNS INT
BEGIN
    DECLARE @num INT;
    DECLARE @factorial INT;
    DECLARE @i INT;

    SET @num = 5; -- Número para el que se calculará el factorial
    SET @factorial = 1;
    SET @i = 1;

    WHILE @i <= @num 
    BEGIN
        SET @factorial = @factorial * @i;
        SET @i = @i + 1;
    END;

    RETURN @factorial;
END;

-- Llamada a la función sin parámetros
SELECT CalcularFactorial() AS FACTORIAL; -- Devuelve el factorial de 5 (5! = 120)

-- Llamadas a procedimientos y funciones sin parámetros
SELECT CalcularSumaMultiplicacion();