DECLARE @nombre VARCHAR DEFAULT "Brandon";
DECLARE @edad INT, @fecha DATE;

SET @edad = 21;
PRINT(@edad);
DECLARE @estado BOOLEAN DEFAULT TRUE;

declare @numero int default @edad + 9;

print(not (@numero > @edad + 8));

PRINT "=== ESTRUCTURA IF ===";
DECLARE @nota INT;
SET @nota = 70;

IF @nota >= 61
BEGIN
    PRINT "Ganó el curso";
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
-- print'========== ESTRUCTURA FOR ==========';
-- DECLARE @i INT;
-- FOR @i IN 1..10
-- BEGIN
--     IF @i = 5 THEN
--         PRINT 'LO VA SALTAR';
--         CONTINUE;
--     END IF;

--     IF @i = 8 THEN
--         PRINT 'TERMINA EL BUCLE';
--         BREAK;
--     END IF;
--     PRINT @i;
-- END LOOP;

-- print'========== ESTRUCTURA SWITCH ==========';
-- SET @nota = 70;

-- CASE @nota
--     WHEN 70 THEN
--         PRINT 'Excelente';
--     WHEN 61 THEN
--         PRINT 'Aprobado';
--     ELSE
--         PRINT 'No aprobado';
-- END AS resultado;

-- PRINT "========== VALUE OF ==========";
-- DECLARE @valueINT INT = 75;
-- DECLARE @valueDOUBLE DOUBLE = 75.5;
-- DECLARE @valueVARCHAR VARCHAR = "Hola Mundo :)";
-- DECLARE @valueDATE DATE = '2002-10-07';

-- PRINT TYPEOF(@valueINT);
-- PRINT TYPEOF(@valueDOUBLE + 75);
-- PRINT TYPEOF(@valueVARCHAR);
-- PRINT TYPEOF(@valueDATE);

-- print "\n========== ESTRUCTURA FOR ==========";
-- DECLARE @i INT;
-- FOR @i IN 1..10
-- BEGIN
--     PRINT "1 x " + CAST(@i AS VARCHAR) + " = " + CAST(@i * 10 AS VARCHAR);
-- END LOOP;


print "\n========== UPPER CASE / LOWER CASE ==========";
PRINT LOWER("HOLA MUNDO");
PRINT UPPER("hola mundo");
PRINT LEN("Hola mundo");
PRINT ROUND(3.141592, 4);
PRINT TRUNCATE(3.141592, 4);