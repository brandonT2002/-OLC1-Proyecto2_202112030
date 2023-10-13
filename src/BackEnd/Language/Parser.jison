%{
    // imports
    let { errors } = require ('../Classes/Utils/Outs')
    const { Error } = require ('../Classes/Utils/Error')
    const { TypeError } = require ('../Classes/Utils/TypeError')
%}

// análisis léxico
%lex
%options case-insensitive

UNUSED      [ \r\t]+
CONTENT     ([^\n\"\\]|\\.)
ID          \@?(\_)*[a-zA-Z][a-zA-Z0-9\_]*
STRING      (\"({CONTENT}*)\"|\'({CONTENT}*)\')
INTEGER     [0-9]+\b
DOUBLE       [0-9]+\.[0-9]+\b
DATE        (\d\d\d\d)\-(\d\d)-(\d\d)
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
'THEN'          {return 'RW_then'}
'WHEN'          {return 'RW_when'}
// EJECUCION DML
'IF'            {return 'RW_if'}
'ELSE'          {return 'RW_else'}
'CASE'          {return 'RW_case'}
'WHILE'         {return 'RW_while'}
'FOR'           {return 'RW_for'}
'IN'            {return 'RW_in'}
'LOOP'          {return 'RW_loop'}
'BREAK'         {return 'RW_break'}
'CONTINUE'      {return 'RW_continue'}
'FUNCTION'      {return 'RW_function'}
'RETURNS'       {return 'RW_returns'}
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
'DOUBLE'        {return 'RW_double'}
'DATE'          {return 'RW_date'}
'VARCHAR'       {return 'RW_varchar'}
'BOOLEAN'       {return 'RW_boolean'}
'TRUE'          {return 'RW_true'}
'FALSE'         {return 'RW_false'}
'NULL'          {return 'RW_null'}
// OPERADORES LOGICOS
'AND'           {return 'RW_and'}
'OR'            {return 'RW_or'}
'NOT'           {return 'RW_not'}
//EXPRESIONES
{ID}            {return 'TK_id'}
{STRING}        {yytext = yytext.substr(1,yyleng - 2); return 'TK_varchar'}
{DOUBLE}        {return 'TK_double'}
{INTEGER}       {return 'TK_int'}
{DATE}          {return 'TK_date'}
// SIGNOS DE AGRUPACION Y FINALIZACION
'('             {return 'TK_lpar'}
')'             {return 'TK_rpar'}
';'             {return 'TK_semicolon'}
','             {return 'TK_comma'}
'..'            {return 'TK_dot'}
// OPERADORES ARITMETICOS
'+'             {return 'TK_plus'}
'-'             {return 'TK_minus'}
'*'             {return 'TK_mult'}
'/'             {return 'TK_div'}
'%'             {return 'TK_mod'}
// OPERADORES RELACIONALES
'='             {return 'TK_equal'}
'!='            {return 'TK_notequal'}
'<='            {return 'TK_lessequal'}
'>='            {return 'TK_greatequal'}
'<'             {return 'TK_less'}
'>'             {return 'TK_great'}
//
.               {errors.push(new Error(yylloc.first_line, yylloc.first_column, TypeError.LEXICAL, `Caracter no reconocido. «${yytext}»`))}
<<EOF>>         {return 'EOF'}

/lex

/*
Como aclaración en la Práctica 4, en las operaciones a leer de archivos se tomarán
los números como si fuera de un solo dígito, para evitar ambigüedades y demás cuestiones.
*/

%{
    // imports
    // Tipos
    const { Type } = require('../Classes/Utils/Type')
    // Instrucciones
    const { Print } = require('../Classes/Instructions/Print')
    const { InitID } = require('../Classes/Instructions/InitID')
    const { AsignID } = require('../Classes/Instructions/AsignID')
    // Expresiones
    const { Primitive } = require('../Classes/Expressions/Primitive')
    const { AccessID } = require('../Classes/Expressions/AccessID')
    const { Arithmetic } = require('../Classes/Expressions/Arithmetic')
    const { Relational } = require('../Classes/Expressions/Relational')
    const { Logic } = require('../Classes/Expressions/Logic')
%}

// precedencia de operadores
%left 'RW_or'
%left 'RW_and'
%right 'RW_not'
%left 'TK_equal' 'TK_notequal'
%left 'TK_less' 'TK_lessequal' 'TK_great' 'TK_greatequal'
%left 'TK_plus' 'TK_minus'
%left 'TK_mult' 'TK_div' 'TK_mod'
%right TK_uminus

// gramática

%start INIT

%%

INIT :
    INSTRUCTIONS EOF {return $1} |
    EOF              {return []} ;

INSTRUCTIONS :
    INSTRUCTIONS INSTRUCTION {$$.push($2)} |
    INSTRUCTION              {$$ = [$1]  } ;

INSTRUCTION :
    DECLAREID TK_semicolon     {$$ = $1} |
    ASIGNID TK_semicolon       {$$ = $1} |
    SELECT TK_semicolon        |
    CREATETABLE TK_semicolon   |
    ALTERTAB TK_semicolon      |
    DROPTAB TK_semicolon       |
    INSERTREG TK_semicolon     |
    UPDATETAB TK_semicolon     |
    TRUNCATETAB TK_semicolon   |
    DELETETAB TK_semicolon     |
    IFSTRUCT TK_semicolon      |
    CASESTRUCT_S TK_semicolon  |
    WHILESTRUCT TK_semicolon   |
    FORSTRUCT TK_semicolon     |
    FUNCDEC TK_semicolon       |
    METODDEC TK_semicolon      |
    ENCAP TK_semicolon         |
    CALLFUNC TK_semicolon      |
    PRINT TK_semicolon         {$$ = $1} |
    RW_break TK_semicolon      |
    RW_continue TK_semicolon   |
    RW_return EXP TK_semicolon |
    error {errors.push(new Error(this._$.first_line, this._$.first_column + 1, TypeError.SYNTAX, `No se esperaba «${yytext}».`))} ;

// Declaración de variables
DECLAREID :
    RW_declare DECLIDS                   {$$ = new InitID(@1.first_line, @1.first_column, $2[0], $2[1], undefined)} |
    RW_declare TK_id TYPE TK_equal EXP   {$$ = new InitID(@1.first_line, @1.first_column, $2, $3, $5)             } |
    RW_declare TK_id TYPE RW_default EXP {$$ = new InitID(@1.first_line, @1.first_column, $2, $3, $5)             } ;

DECLIDS :
    DECLIDS TK_comma DECLID {$$[0].push($3[0]); $$[1].push($3[1])} |
    DECLID                  {$$ = [[$1[0]], [$1[1]]]             } ;

DECLID :
    TK_id TYPE {$$ = [$1, $2]} ;

// Asignación de variables
ASIGNID :
    RW_set TK_id TK_equal EXP {$$ = new AsignID(@1.first_line, @1.first_column, $2, $4)} ;

// Mostrar valor de variables
SELECT :
    RW_select FIELDS RW_from TK_id RW_where EXP |
    RW_select FIELDS RW_from TK_id              |
    RW_select LIST_IDS                            ;

FIELDS :
    LIST_IDS |
    TK_mult  ;

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

// Insertar registros
INSERTREG :
    RW_insert RW_into TK_id TK_lpar LIST_IDS TK_rpar RW_values TK_lpar LIST_EXPS TK_rpar ;

// Obtener valores de tabla
SELECTREG :
    RW_select LIST_IDS RW_from TK_id RW_where EXP |
    RW_select LIST_IDS RW_from TK_id              |
    RW_select TK_mult RW_from TK_id ;

// Actualizar tabla
UPDATETAB :
    RW_update TK_id RW_set VALUESTAB RW_where TK_id TK_equal EXP ;

VALUESTAB :
    VALUESTAB TK_comma VALUETAB |
    VALUETAB ;

VALUETAB :
    TK_id TK_equal EXP ;

// Truncate
TRUNCATETAB :
    RW_truncate RW_table TK_id ;

// Eliminar Registros
DELETETAB :
    RW_delete RW_from TK_id RW_where TK_id TK_equal EXP ;

LIST_IDS :
    LIST_IDS TK_comma IDS |
    IDS                   ;

IDS :
    EXP RW_as TK_id |
    EXP             ;

LIST_EXPS :
    LIST_EXPS TK_comma EXP|
    EXP ;

// Estructura IF
IFSTRUCT :
    RW_if EXP RW_then INSTRUCTIONS RW_else INSTRUCTIONS RW_end RW_if |
    RW_if EXP RW_then INSTRUCTIONS RW_end RW_if ;

// Estructura CASE simple
CASESTRUCT_S :
    RW_case TK_id ENVCASE_S RW_end RW_as TK_id |
    RW_case ENVCASE_S RW_end RW_as TK_id       |
    RW_case TK_id ENVCASE_S RW_end             |
    RW_case ENVCASE_S RW_end ;

ENVCASE_S :
    RW_when EXP RW_then EXP ENVCASE_S |
    RW_when EXP RW_then EXP           |
    RW_else EXP                       ;

// PRINT
PRINT :
    RW_print EXP {$$ = new Print(@1.first_line, @1.first_column, $2)} ;

// Estructura WHILE
WHILESTRUCT :
    RW_while EXP ENCAP ;

// Estructura FOR
FORSTRUCT :
    RW_for EXP RW_in TK_int TK_dot TK_int ENCAP RW_loop;

// Funciones
FUNCDEC :
    RW_create RW_function TK_id TK_lpar DECLIDS TK_rpar RW_returns TYPE ENCAP ;

// Metodos
METODDEC :
    RW_create RW_procedure TK_id DECLIDS RW_as ENCAP |
    RW_create RW_procedure TK_id DECLIDS ENCAP ;

// Encapsulamiento de Sentencias
ENCAP :
    RW_begin INSTRUCTIONS RW_end ;

// Llamada a funciones y métodos
CALLFUNC :
    SELECT TK_id TK_lpar LIST_IDS TK_rpar |
    RW_set TK_id TK_equal TK_id TK_lpar LIST_IDS TK_rpar ;

// Funciones Nativas
NATIVEFUC :
    RW_lower TK_lpar EXP TK_rpar                 |
    RW_upper TK_lpar EXP TK_rpar                 |
    RW_round TK_lpar EXP TK_comma EXP TK_rpar    |
    RW_len TK_lpar EXP TK_rpar                      |
    RW_truncate TK_lpar EXP TK_comma EXP TK_rpar |
    RW_typeof TK_lpar EXP TK_rpar                ;

EXP : 
    ARITHMETICS {$$ = $1} |
    RELATIONALS {$$ = $1} |
    LOGICS      {$$ = $1} |
    CAST        |
    NATIVEFUC   |
    TK_id       {$$ = new AccessID(@1.first_line, @1.first_column, $1)} |
    TK_varchar  {$$ = new Primitive(@1.first_line, @1.first_column, $1, Type.VARCHAR)} |
    TK_int      {$$ = new Primitive(@1.first_line, @1.first_column, $1, Type.INT)    } |
    TK_double   {$$ = new Primitive(@1.first_line, @1.first_column, $1, Type.DOUBLE) } |
    TK_date     {$$ = new Primitive(@1.first_line, @1.first_column, $1, Type.DATE)   } |
    RW_true     {$$ = new Primitive(@1.first_line, @1.first_column, $1, Type.BOOLEAN)} |
    RW_false    {$$ = new Primitive(@1.first_line, @1.first_column, $1, Type.BOOLEAN)} |
    TK_lpar EXP TK_rpar {$$ = $2} ;

ARITHMETICS :
    EXP TK_plus EXP  {$$ = new Arithmetic(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP TK_minus EXP {$$ = new Arithmetic(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP TK_mult EXP  {$$ = new Arithmetic(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP TK_div EXP   {$$ = new Arithmetic(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP TK_mod EXP   {$$ = new Arithmetic(@1.first_line, @1.first_column, $1, $2, $3)} |
    TK_minus EXP %prec TK_uminus {$$ = new Arithmetic(@1.first_line, @1.first_column, undefined, $1, $2)} ;

RELATIONALS :
    EXP TK_equal EXP      {$$ = new Relational(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP TK_notequal EXP   {$$ = new Relational(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP TK_lessequal EXP  {$$ = new Relational(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP TK_greatequal EXP {$$ = new Relational(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP TK_less EXP       {$$ = new Relational(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP TK_great EXP      {$$ = new Relational(@1.first_line, @1.first_column, $1, $2, $3)} ;

LOGICS :
    EXP RW_and EXP {$$ = new Logic(@1.first_line, @1.first_column, $1, $2, $3)} |
    EXP RW_or EXP  {$$ = new Logic(@1.first_line, @1.first_column, $1, $2, $3)} |
    RW_not EXP     {$$ = new Logic(@1.first_line, @1.first_column, undefined, $1, $2)} ;

CAST :
    RW_cast TK_lpar EXP RW_as TYPE TK_rpar ;

TYPE :
    RW_int     {$$ = Type.INT    } |
    RW_double  {$$ = Type.DOUBLE } |
    RW_date    {$$ = Type.DATE   } |
    RW_varchar {$$ = Type.VARCHAR} |
    RW_boolean {$$ = Type.BOOLEAN} ;