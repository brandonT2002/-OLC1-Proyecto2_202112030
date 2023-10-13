DECLARE @nombre VARCHAR DEFAULT 'Brandon';
DECLARE @edad INT, @fecha DATE;
PRINT(edad);

SET @edad = 21;

PRINT(@nombre);
SET @nombre = 'Andy';
PRINT(@nombre);
PRINT(12 + 12);
PRINT(12.5 - 10);
PRINT(25 * 5);
PRINT(15 / 2);
PRINT(15 % 2);
PRINT(-(5 + 2));

PRINT('=== RELACIONALES ===');
PRINT(12 = 15);
PRINT(12 = 12);
PRINT(10 != 12);
PRINT(10 != 10);
PRINT(10 >= 10);
PRINT(10 <= 10);
PRINT(@edad + 9);
PRINT(10 < 10);