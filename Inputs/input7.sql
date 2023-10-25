create table Cliente (
    ID int,
    Nombre Varchar,
    NIT varchar,
    Estado varchar
);

create table producto (
    id int,
    nombre Varchar,
    precio double
);

-- drop table cliente;

-- truncate table cliente;

insert into Cliente(id, nombre, nit, estado) values(10, "Brandon", "987546123", "activo");
insert into Cliente(id, nombre, estado) values(18, "Andy", "activo");
insert into Cliente(id, nombre, estado) values(20, "Jefferson", "inactivo");
insert into Cliente(id, nombre, estado) values(20, "pako", "activo");

insert into Producto(id, nombre, precio) values(1, "Dorito", 4.0);
insert into Producto(id, nombre, precio) values(1, "Galleta Chiki", 3.75);

DELETE FROM Clientes WHERE Nombre = "Brandon";