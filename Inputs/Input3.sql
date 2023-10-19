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

declare @numero int default 10;