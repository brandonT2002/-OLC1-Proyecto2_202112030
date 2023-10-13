DECLARE @nombre VARCHAR DEFAULT 'Brandon';
DECLARE @edad INT, @fecha DATE;

SET @edad = 21;
PRINT(@edad);
DECLARE @estado BOOLEAN DEFAULT TRUE;

declare @numero int default @edad + 9;

print(not (@numero > @edad + 8));