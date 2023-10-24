DECLARE @nota INT;
SET @nota = 75;

CASE @nota
    WHEN 100 THEN "SOBRESALIENTE"
    WHEN 99 THEN "MUY BUENO"
    WHEN 98 THEN "BUENO"
    ELSE "PENDEJO"
END AS "Parcial 1";

CASE 
    WHEN @nota > 85 THEN "EXCELENTE"
    WHEN @nota >= 61 AND @nota <= 85 THEN "APROBADO"
    ELSE "PENDEJO"
END AS "Nota Final";
