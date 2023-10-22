hanoi(3, "A", "C", "B");

create procedure hanoi
    @n int,
    @origen varchar,
    @destino varchar,
    @medio varchar
begin
    if @n = 1 then
        print "Mover disco: 1, desde: "+ @origen+ " hasta: "+ @destino;
        return;
    end if;
    hanoi(@n - 1, @origen, @medio, @destino);
    print "Mover disco: "+ cast(@n as varchar) + ", desde: "+ @origen+ " hasta: "+ @destino;
    hanoi(@n - 1, @medio, @destino, @origen);
end;