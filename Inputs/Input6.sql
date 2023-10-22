begin
    print "hola mundo";
    print "feliz navidad";
end;

begin
    print "si sale compi 1";
    print "sale en vacas";
end;

declare @n1 int, @n2 varchar, @n3 boolean, @n4 date, @n5 double;
DECLARE @fecha date default "20/10/2023";
print "Fecha: " + cast(@fecha as varchar);
begin
    declare @var1 varchar default "USAC";
    if @var1 = "USAC" then
        print "Es USAC" + "!";
        print "Guatemala";
    else
        print "No es USAC" + "!" + " :(";
        set @var1 = "Guatemala" + " - " + Cast(500 + 2 as varchar);
        print @var1;
    end if;
end;