%{
    // imports
%}

// análisis léxico
%lex
%options case-insensitive

UNUSED      [ \r\t]+
CONTENT     ([^\n\"\\]|\\.)
ID          \@?(\_)*[a-zA-Z][a-zA-Z0-9\_]*
STRING      \"({CONTENT}*)\"
CHAR        \'({CONTENT})\'
INTEGER     [0-9]+\b
DOUBLE      [0-9]+\.[0-9]+\b
COMMENTS    \-\-([^\r\n]*)?
COMMENTM    [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

%%

// tokens
// EJECUCION DDL
'BEGIN'         {return 'RW_begin'}
'END'           {return 'RW_end'}
'SELECT'        {return 'RW_select'}
'FROM'          {return 'RW_from'}
'WHERE'         {return 'RW_where'}
'DECLARE'       {return 'RW_declare'}
'DEFAULT'       {return 'RW_default'}
'SET'           {return 'RW_set'}
'CREATE'        {return 'RW_create'}
'TABLE'         {return 'RW_table'}
'ALTER'         {return 'RW_alter'}
'ADD'           {return 'RW_add'}
'DROP'          {return 'RW_drop'}
'COLUMN'        {return 'RW_column'}
'RENAME'        {return 'RW_rename'}
'TO'            {return 'RW_to'}
'INSERT'        {return 'RW_insert'}
'INTO'          {return 'RW_into'}
'VALUES'        {return 'RW_values'}
'AS'            {return 'RW_as'}
'UPDATE'        {return 'RW_update'}
'TRUNCATE'      {return 'RW_truncate'}
'DELETE'        {return 'RW_delete'}
'CAST'          {return 'RW_cast'}
// EJECUCION DML
'IF'            {return 'RW_if'}
'ELSE'          {return 'RW_else'}
'CASE'          {return 'RW_case'}
'WHILE'         {return 'RW_while'}
'FOR'           {return 'RW_for'}
'IN'            {return 'RW_in'}
'BREAK'         {return 'RW_break'}
'CONTINUE'      {return 'RW_continue'}
'FUNCTION'      {return 'RW_function'}
'RETURN'        {return 'RW_return'}
'PROCEDURE'     {return 'RW_procedure'}
'PRINT'         {return 'RW_print'}
'LOWER'         {return 'RW_lower'}
'UPPER'         {return 'RW_upper'}
'ROUND'         {return 'RW_round'}
'LEN'           {return 'RW_len'}
'TRUNCATE'      {return 'RW_truncate'}
'TYPEOF'        {return 'RW_typeof'}
// TIPOS DE DATOS
'INT'           {return 'RW_int'}
'FLOAT'         {return 'RW_float'}
'DATE'          {return 'RW_date'}
'VARCHAR'       {return 'RW_varchar'}
'TRUE'          {return 'RW_true'}
'FALSE'         {return 'RW_false'}
'NULL'          {return 'RW_null'}
//EXPRESIONES
{ID}            {return 'TK_id'}
{INTEGER}       {return 'TK_int'}
{DOUBLE}        {return 'TK_double'}
// OPERADORES LOGICOS
'AND'           {return 'RW_and'}
'OR'            {return 'RW_or'}
'NOT'           {return 'RW_not'}
// SIGNOS DE AGRUPACION Y FINALIZACION
'('             {return 'TK_lpar'}
')'             {return 'TK_rpar'}
';'             {return 'RW_semicolon'}
','             {return 'TOK_comma'}
// OPERADORES ARITMETICOS
'+'             {return 'TK_plus'}
'-'             {return 'TK_minus'}
'*'             {return 'TK_mult'}
'/'             {return 'TK_div'}
// OPERADORES RELACIONALES
'%'             {return 'TK_mod'}
'='             {return 'TK_equal'}
'!='            {return 'TK_notequal'}
'<'             {return 'TK_less'}
'<='            {return 'TK_lessequal'}
'>'             {return 'TK_more'}
'>='            {return 'TK_moreequal'}
<<EOF>>         {return 'EOF'}

/lex

/*
Como aclaración en la Práctica 4, en las operaciones a leer de archivos se tomarán
los números como si fuera de un solo dígito, para evitar ambigüedades y demás cuestiones.
*/

%{
    // imports
%}

// precedencia de operadores

// gramática

%start INIT

%%

INIT :
    EOF ;