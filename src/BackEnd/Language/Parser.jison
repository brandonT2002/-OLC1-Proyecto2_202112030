%{
    // imports
%}

// análisis léxico
%lex
%options case-insensitive

UNUSED      [ \r\t]+
CONTENT     ([^\n\"\\]|\\.)
ID          \@?(\_)*[a-zA-Z][a-zA-Z0-9\_]*
STRING      (\"({CONTENT}*)\"|\'({CONTENT}*)\')
INTEGER     [0-9]+\b
DOUBLE      [0-9]+\.[0-9]+\b
COMMENTS    \-\-([^\r\n]*)?
COMMENTM    [/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]

%%

\n              {}
{COMMENTS}      {}
{COMMENTM}      {}
{UNUSED}        {}
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
'BOOLEAN'       {return 'RW_boolean'}
'TRUE'          {return 'RW_true'}
'FALSE'         {return 'RW_false'}
'NULL'          {return 'RW_null'}
//EXPRESIONES
{ID}            {return 'TK_id'}
{STRING}        {return 'TK_str'}
{INTEGER}       {return 'TK_int'}
{DOUBLE}        {return 'TK_double'}
// OPERADORES LOGICOS
'AND'           {return 'RW_and'}
'OR'            {return 'RW_or'}
'NOT'           {return 'RW_not'}
// SIGNOS DE AGRUPACION Y FINALIZACION
'('             {return 'TK_lpar'}
')'             {return 'TK_rpar'}
';'             {return 'TK_semicolon'}
','             {return 'TK_comma'}
// OPERADORES ARITMETICOS
'+'             {return 'TK_plus'}
'-'             {return 'TK_minus'}
'*'             {return 'TK_mult'}
'/'             {return 'TK_div'}
'%'             {return 'TK_mod'}
// OPERADORES RELACIONALES
'=='            {return 'TK_equalequal'}
'='             {return 'TK_equal'}
'!='            {return 'TK_notequal'}
'<='            {return 'TK_lessequal'}
'>='            {return 'TK_greatequal'}
'<'             {return 'TK_less'}
'>'             {return 'TK_great'}
//
.               {console.log(`Error Lexico: ${yytext}`)}
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
%left 'RW_or'
%left 'RW_and'
%right 'RW_not'
%left 'TK_equalequal' 'TK_notequal'
%left 'TK_less' 'TK_lessequal' 'TK_great' 'TK_greatequal'
%left 'TK_plus' 'TK_minus'
%left 'TK_mult' 'TK_div' 'TK_mod'
%right TK_uminus
%left 'TOK_incr' 'TOK_decr'

// gramática

%start INIT

%%

INIT :
    INSTRUCTIONS EOF    |
    EOF ;

INSTRUCTIONS :
    INSTRUCTIONS INSTRUCTION |
    INSTRUCTION ;

INSTRUCTION :
    DECLAREID TK_semicolon   |
    ASIGNID TK_semicolon     |
    SELECT TK_semicolon      |
    CREATETABLE TK_semicolon |
    ALTERTAB TK_semicolon    |
    DROPTAB TK_semicolon     |
    error {console.log(`Error SINTÁCTICO: ${yytext}. ${this._$.first_line}:${this._$.first_column + 1}`)} ;

// Declaración de variables
DECLAREID :
    RW_declare DECLIDS |
    RW_declare TK_id TYPE RW_default VALUE ;

DECLIDS :
    DECLIDS TK_comma DECLID |
    DECLID ;

DECLID :
    TK_id TYPE ;

// Asignación de variables
ASIGNID :
    RW_set TK_id TK_equal VALUE ;

// Mostrar valor de variables
SELECT :
    RW_select TK_id ;

// Creación de tablas
CREATETABLE :
    RW_create RW_table TK_id TK_lpar ATTRIBUTES TK_rpar ;

ATTRIBUTES :
    ATTRIBUTES TK_comma ATTRIBUTE |
    ATTRIBUTE ;

ATTRIBUTE :
    TK_id TYPE ;

// Alter table
ALTERTAB :
    RW_alter RW_table TK_id ACTION ;

ACTION :
    RW_add TK_id TYPE       |
    RW_drop RW_column TK_id |
    RW_rename RW_to TK_id   |
    RW_rename RW_column TK_id RW_to TK_id ;

// Elimnar tabla
DROPTAB :
    RW_drop RW_table TK_id ;

VALUE :
    TK_id     |
    TK_str    |
    TK_int    |
    TK_double |
    RW_true   |
    RW_false ;

TYPE :
    RW_int     |
    RW_float   |
    RW_date    |
    RW_varchar |
    RW_boolean ;