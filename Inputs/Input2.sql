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