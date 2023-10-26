# **PROYECTO 1 - COMPILADORES 1**
### **Query Crypter**

Brandon Andy Jefferson Tejaxún Pichiyá - 202112030

## 📌 **Manual de Usuario**

1. **Abrir Archivo**

    Se debe dar clic sobre la opción **File** en la barra de herramientas y seleccionar la opción correspondiente. Al haberlo abierto se mostrará el contenido del archivo en el editor.

2. **Nuevo Archivo / Guardar Como**

    Se debe dar clic sobre la opción **File** en la barra de herramientas y deberá seleccionar la extensión con la que se requiera guardar el nuevo archivo.

<p align="center">
    <img src="img/img1.png" width="450px">
</p>

3. **Analizador Query Crypter**

    Al seleccionar un archivo con la extension **.qc**, se debe dar clic en el botón **Run** para poder ejecutar el programa. En la consola se mostrará el resultado del código interpretado.

<p align="center">
    <img src="img/img3.png" width="450px">
</p>

4. **Reportes**

    En la opción **Reportes** de la barra de herramientas se encuentran los siguientes reportes:

    * Reportes de Errores
    * Áarbol de Análisis Sintáctico (AST)
    * Tabla de Simbolos
    * Reporte de Tokens

<p align="center">
    <img src="img/img2.png" width="300px">
    <img src="img/img4.png" width="300px">
</p>

<br>

## 📌 **Manual Técnico**

1. **Análisis Léxico**

    |Descripción|Patrón|Expresión Regular|Ejemplo|Nombre de Token|
    |:-|:-|:-|:-|:-|
    |Reservada main|Palabra main|main|main|RW_main|
    |Reservada void|Palabra void|void|void|RW_void|
    |Reservada int|Palabra int|int|int|RW_int|
    |Reservada double|Palabra double|double|double|RW_double|
    |Reservada char|Palabra char|char|char|RW_char|
    |Reservada bool|Palabra bool|bool|bool|RW_bool|
    |Reservada string|Palabra string|string|string|RW_string|
    |Reservada if|Palabra if|if|if|RW_if|
    |Reservada else|Palabra else|else|else|RW_else|
    |Reservada switch|Palabra switch|switch|switch|RW_switch|
    |Reservada case|Palabra case|case|case|RW_case|
    |Reservada default|Palabra default|default|default|RW_default|
    |Reservada break|Palabra break|break|break|RW_break|
    |Reservada for|Palabra for|for|for|RW_for|
    |Reservada while|Palabra while|while|while|RW_while|
    |Reservada do|Palabra do|do|do|RW_do|
    |Reservada true|Palabra true|true|true|RW_true|
    |Reservada false|Palabra false|false|false|RW_false|
    |Reservada Console.Write|Palabra Console.Write|Console.Write|Console.Write|RW_print|
    |Caracteres Alfabéticos|Caracter: a, b, c, ..., y,z, A, B, ..., Y, Z|\"({([^\n\"\\]\|\\.)}*)\"|a, c, D, E|TK_char|
    |Numeros enteros|Caracter: 0, 1, 2, ...|[0-9]+|0, 1, 2|Tk_int|
    |Numeros decimales|Caracter: 0.5, 1.5, 2.5, ...|[0-9]+\.[0-9]+|0.5, 1.5, 2.5|Tk_double|
    |Identificadores|Secuencia de caracteres alfanumericos|\"({([^\n\"\\]\|\\.)}*)\"|Cadena, num_pares|TK_string|
    |Incremento|Caracter ++|++|++|TK_inc|
    |Signo más|Caracter +|+|+|TK_plus|
    |Signo menos|Caracter -|-|-|TK_minus|
    |Signo multiplicacion|Caracter *|*|*|TK_mult|
    |Signo división|Caracter /|/|/|TK_div|
    |Comparación|Caracter ==|==|==|TK_equequ|
    |Diferente de|Caracter !=|!=|!=|TK_notequ|
    |Menor o igual|Caracter <=|<=|<=|TK_lessequ|
    |Mayor o igual|Caracter >=|>=|>=|TK_moreequ|
    |Igual|Caracter =|=|=|TK_equal|
    |Menor|Caracter <|<|<|TK_less|
    |Mayor|Caracter >|>|>|TK_more|
    |AND|Caracter AND|AND|AND|TK_and|
    |OR|Caracter OR|OR|OR|TK_or|
    |NOT|Caracter NOT|NOT|NOT|TK_not|
    |Parentesis abierto|Caracter (|(|(|TK_lpar|
    |Parentesis cerrado|Caracter )|)|)|TK_rpar|
    |Llave abierto|Caracter {|{|{|TK_lbrc|
    |Llave cerrado|Caracter }|}|}|TK_rbrc|
    |Corchete abierto|Caracter [|[|[|TK_lbrk|
    |Corchete cerrado|Caracter ]|]|]|TK_rbrk|
    |Coma|Caracter ,|,|,|TK_comma|
    |Dos puntos|Caracter :|:|:|TK_colon|
    |Puntos y coma|Caracter ;|;|;|TK_semicolon|
    |Comentarios Simple|Caracter --|"--"([^\r\n]*)?|-- comentario simple||
    |Comentarios Multilineas|Caracter /**/|[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]|// comentario simple||

2. **Análisis Sintáctico**

    [Gramática QueryCrypter](Gramatica.md)