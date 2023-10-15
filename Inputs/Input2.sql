DECLARE @nombre VARCHAR DEFAULT 'Brandon';
DECLARE @edad INT, @fecha DATE;

SET @edad = 21;
PRINT(@edad);
DECLARE @estado BOOLEAN DEFAULT TRUE;

declare @numero int default @edad + 9;

print(not (@numero > @edad + 8));

PRINT '';

PRINT '=== ESTRUCTURA IF ===';
DECLARE @nota INT;
SET @nota = 70;

IF @nota >= 61
BEGIN
    PRINT 'Ganó el curso';
END;

-- IF @nota >= 61 THEN
--     PRINT ('Ganó el laboratorio');
-- ELSE
--     PRINT 'Perdió el laboratorio';
-- END IF;

-- ========== ESTRUCTURA WHILE ==========
/*PRINT '=== ESTRUCTURA WHILE ===';
DECLARE @contador INT = 1;

WHILE @contador <= 10
BEGIN
    PRINT (@contador);
    SET @contador = @contador + 1;
END;*/

-- ========== ESTRUCTURA FOR ==========
print'========== ESTRUCTURA FOR ==========';
-- DECLARE @i INT;
FOR @i IN 3..7
BEGIN
    PRINT @i;
END LOOP;