create table Cliente (
    ID int,
    Nombre Varchar,
    NIT varchar
);

create table producto (
    id int,
    nombre Varchar,
    precio double
);

-- drop table cliente;

-- truncate table cliente;

insert into Cliente(id, nombre, nit) values(10, "Brandon", "987546123");
insert into Cliente(id, nombre) values(18, "Andy");
insert into Cliente(id, nombre) values(20, "Jefferson");

insert into Producto(id, nombre, precio) values(1, "Dorito", 4.0);
insert into Producto(id, nombre, precio) values(1, "Galleta Chiki", 3.75);

declare @numero int default 10;

CREATE FUNCTION calcularAreaCirculo(@pi DOUBLE, @radio DOUBLE)
RETURNS DOUBLE
BEGIN
    DECLARE @area DOUBLE;
    SET @area = @pi * @radio * @radio;
    RETURN @area;
END;

print "llega aquí";

PRINT calcularAreaCirculo(3.1416, 2);

DECLARE @fecha DATE = "07/10/2002";
print @fecha;