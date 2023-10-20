%{
    // imports
    let { errors } = require ('../Classes/Utils/Outs')
    const { Error } = require ('../Classes/Utils/Error')
    const { TypeError } = require ('../Classes/Utils/TypeError')
%}

// análisis léxico
%lex
%options case-insensitive

UNUSED      [\s\r\t]+
CONTENT     ([^\n\"\\]|\\.)
ID          \@(\_)*[a-zA-Z][a-zA-Z0-9\_]*
FIELD       (\_)*[a-zA-Z][a-zA-Z0-9\_]*
STRING      \"({CONTENT}*)\"
INTEGER     [0-9]+\b
DOUBLE       [0-9]+\.[0-9]+\b
DATE        \"\d\d\/\d\d\/\d\d\d\d\"
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
{FIELD}         {return 'TK_field'}
{DATE}          {yytext = yytext.substr(1,yyleng - 2); return 'TK_date'}
{STRING}        {yytext = yytext.substr(1,yyleng - 2); return 'TK_varchar'}
{DOUBLE}        {return 'TK_double'}
{INTEGER}       {return 'TK_int'}
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
.               {errors.push(new Error(yylloc.first_line, yylloc.first_column + 1, TypeError.LEXICAL, `Caracter no reconocido. «${yytext}»`))}
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
    const { If } = require('../Classes/Instructions/If')
    const { Block } = require('../Classes/Instructions/Block')
    const { Break } = require('../Classes/Instructions/Break')
    const { Continue } = require('../Classes/Instructions/Continue')
    const { While } = require('../Classes/Instructions/While')
    const { For } = require('../Classes/Instructions/For')
    const { When } = require('../Classes/Instructions/When')
    const { Case } = require('../Classes/Instructions/Case')
    const { CreateTable } = require('../Classes/Instructions/CreateTable')
    const { DropTable } = require('../Classes/Instructions/DropTable')
    const { TruncateTable } = require('../Classes/Instructions/TruncateTable')
    const { InsertTable } = require('../Classes/Instructions/InsertTable')
    const { Function } = require('../Classes/Instructions/Function')
    // Expresiones
    const { Primitive } = require('../Classes/Expressions/Primitive')
    const { AccessID } = require('../Classes/Expressions/AccessID')
    const { Arithmetic } = require('../Classes/Expressions/Arithmetic')
    const { Relational } = require('../Classes/Expressions/Relational')
    const { Logic } = require('../Classes/Expressions/Logic')
    const { Cast } = require('../Classes/Expressions/Cast')
    const { TypeOf } = require('../Classes/Expressions/TypeOf')
    const { Lower } = require('../Classes/Expressions/Lower')
    const { Upper } = require('../Classes/Expressions/Upper')
    const { Round } = require('../Classes/Expressions/Round')
    const { Len } = require('../Classes/Expressions/Len')
    const { Truncate } = require('../Classes/Expressions/Truncate')
    const { Parameter } = require('../Classes/Expressions/Parameter')
    const { CallFunction } = require('../Classes/Expressions/CallFunction')
    const { Return } = require('../Classes/Expressions/Return')
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
    CREATETABLE TK_semicolon   {$$ = $1} |
    ALTERTAB TK_semicolon      |
    DROPTAB TK_semicolon       {$$ = $1} |
    INSERTREG TK_semicolon     {$$ = $1} |
    UPDATETAB TK_semicolon     |
    TRUNCATETAB TK_semicolon   {$$ = $1} |
    DELETETAB TK_semicolon     |
    SELECT TK_semicolon        |
    DECLAREID TK_semicolon     {$$ = $1} |
    ASIGNID TK_semicolon       {$$ = $1} |
    IFSTRUCT TK_semicolon      {$$ = $1} |
    CASESTRUCT_S TK_semicolon  {$$ = $1} |
    WHILESTRUCT TK_semicolon   {$$ = $1} |
    FORSTRUCT TK_semicolon     {$$ = $1} |
    FUNCDEC TK_semicolon       {$$ = $1} |
    CALLFUNC TK_semicolon      {$$ = $1} |
    ENCAP TK_semicolon         {$$ = $1} |
    PRINT TK_semicolon         {$$ = $1} |
    RW_break TK_semicolon      {$$ = new Break(@1.first_line, @1.first_column)            } |
    RW_continue TK_semicolon   {$$ = new Continue(@1.first_line, @1.first_column)         } |
    RW_return EXP TK_semicolon {$$ = new Return(@1.first_line, @1.first_column, $2)       } |
    RW_return TK_semicolon     {$$ = new Return(@1.first_line, @1.first_column, undefined)} |
    error {errors.push(new Error(this._$.first_line, this._$.first_column + 1, TypeError.SYNTAX, `No se esperaba «${yytext}»`))} ;

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
    RW_select FIELDS RW_from TK_field RW_where EXP |
    RW_select FIELDS RW_from TK_field              |
    RW_select LIST_IDS                             ;

FIELDS :
    LIST_IDS |
    TK_mult  ;

// Creación de tablas
CREATETABLE :
    RW_create RW_table TK_field TK_lpar ATTRIBUTES TK_rpar {$$ = new CreateTable(@1.first_line, @1.first_column, $3, $5[0], $5[1])} ;

ATTRIBUTES :
    ATTRIBUTES TK_comma ATTRIBUTE {$$[0].push($3[0]); $$[1].push($3[1])} |
    ATTRIBUTE                     {$$ = [[$1[0]], [$1[1]]]                 } ;

ATTRIBUTE :
    TK_field TYPE {$$ = [$1, $2]} ;

// Alter table
ALTERTAB :
    RW_alter RW_table TK_id ACTION ;

ACTION :
    RW_add TK_field TYPE       |
    RW_drop RW_column TK_field |
    RW_rename RW_to TK_field   |
    RW_rename RW_column TK_field RW_to TK_field ;

// Elimnar tabla
DROPTAB :
    RW_drop RW_table TK_field {$$ = new DropTable(@1.first_line, @1.first_column, $3)} ;

// Insertar registros
INSERTREG :
    RW_insert RW_into TK_field TK_lpar LIST_ATTRIBS TK_rpar RW_values TK_lpar LIST_EXPS TK_rpar {$$ = new InsertTable(@1.first_line, @1.first_column, $3, $5, $9)} ;

LIST_ATTRIBS:
    LIST_ATTRIBS TK_comma TK_field {$$.push($3)} |
    TK_field                       {$$ = [$1]  } ;

LIST_EXPS :
    LIST_EXPS TK_comma EXP {$$.push($3)} |
    EXP                    {$$ = [$1]  } ;

// Obtener valores de tabla
SELECTREG :
    RW_select LIST_IDS RW_from TK_field RW_where EXP |
    RW_select LIST_IDS RW_from TK_field              |
    RW_select TK_mult RW_from TK_field ;

LIST_IDS :
    LIST_IDS TK_comma IDS {$$.push($3)} |
    IDS                   {$$ = [$1]  } ;

IDS :
    EXP RW_as TK_field {$$ = [$1, $3]} |
    EXP                {$$ = [$1, $1]} ;

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
    RW_truncate RW_table TK_id {$$ = new TruncateTable(@1.first_line, @1.first_column, $3)} ;

// Eliminar Registros
DELETETAB :
    RW_delete RW_from TK_id RW_where EXP ;

// Estructura IF
IFSTRUCT :
    RW_if EXP RW_then INSTRUCTIONS RW_else INSTRUCTIONS RW_end RW_if {$$ = new If(@1.first_line, @1.first_column, $2, new Block(@1.first_line, @1.first_column, $4), new Block(@1.first_line, @1.first_column, $6))} |
    RW_if EXP RW_then INSTRUCTIONS RW_end RW_if                      {$$ = new If(@1.first_line, @1.first_column, $2, new Block(@1.first_line, @1.first_column, $4), undefined)} |
    RW_if EXP RW_begin INSTRUCTIONS RW_end                           {$$ = new If(@1.first_line, @1.first_column, $2, new Block(@1.first_line, @1.first_column, $4), undefined)} ;

// Estructura CASE simple
CASESTRUCT_S :
    RW_case TK_id ENVCASE_S RW_end RW_as TK_field {$$ = new Case(@1.first_line, @1.first_column, $2, $3, undefined, $5)} |
    RW_case TK_id ENVCASE_S RW_end                {/*$$ = new Case(@1.first_line, @1.first_column, $2, $3, undefined)*/} |
    RW_case ENVCASE_S RW_end                      {/*$$ = new Case(@1.first_line, @1.first_column, undefined, $2, undefined)*/} ;

ENVCASE_S :
    RW_when EXP RW_then INSTRUCTIONS ENVCASE_S {$$ = new When(@1.first_line, @1.first_column, $2, new Block(@1.first_line, @1.first_column, $4))} |
    RW_when EXP RW_then INSTRUCTIONS           {$$ = new When(@1.first_line, @1.first_column, $2, new Block(@1.first_line, @1.first_column, $4))} |
    RW_else INSTRUCTIONS                       {$$ = new Block(@1.first_line, @1.first_column, $2)} ;

// PRINT
PRINT :
    RW_print EXP {$$ = new Print(@1.first_line, @1.first_column, $2)} ;

// Estructura WHILE
WHILESTRUCT :
    RW_while EXP ENCAP {$$ = new While(@1.first_line, @1.first_column, $2, $3)};

// Estructura FOR
FORSTRUCT :
    RW_for TK_id RW_in EXP TK_dot EXP ENCAP RW_loop {$$ = new For(@1.first_line, @1.first_column, $2, $4, $6, $7)};

// Funciones y Métodos
FUNCDEC :
    RW_create RW_function TK_field TK_lpar PARAMS TK_rpar RW_returns TYPE ENCAP {$$ = new Function(@1.first_line, @1.first_column, $3, $5, $9, $8)} |
    RW_create RW_function TK_field TK_lpar TK_rpar RW_returns TYPE ENCAP        {$$ = new Function(@1.first_line, @1.first_column, $3, [], $8, $7)} |
    RW_create RW_procedure TK_field PARAMS RW_as ENCAP                          {$$ = new Function(@1.first_line, @1.first_column, $3, $4, $6, Type.NULL)} |
    RW_create RW_procedure TK_field RW_as ENCAP                                 {$$ = new Function(@1.first_line, @1.first_column, $3, [], $5, Type.NULL)} |
    RW_create RW_procedure TK_field PARAMS ENCAP                                {$$ = new Function(@1.first_line, @1.first_column, $3, $4, $5, Type.NULL)} |
    RW_create RW_procedure TK_field ENCAP                                       {$$ = new Function(@1.first_line, @1.first_column, $3, [], $4, Type.NULL)} ;

PARAMS :
    PARAMS TK_comma PARAM {$$.push($3)} |
    PARAM                 {$$ = [$1]  } ;

PARAM :
    TK_id TYPE {$$ = new Parameter(@1.first_line, @1.first_column, $1, $2)} ;

// Encapsulamiento de Sentencias
ENCAP :
    RW_begin INSTRUCTIONS RW_end {$$ = new Block(@1.first_line, @1.first_column, $2)} ;

// Llamada a funciones y métodos
CALLFUNC :
    TK_field TK_lpar ARGS TK_rpar {$$ = new CallFunction(@1.first_line, @1.first_column, $1, $3)} |
    TK_field TK_lpar TK_rpar      {$$ = new CallFunction(@1.first_line, @1.first_column, $1, [])} ;

ARGS :
    ARGS TK_comma EXP {$$.push($3)} |
    EXP               {$$ = [$1]  } ;

EXP : 
    ARITHMETICS {$$ = $1} |
    RELATIONALS {$$ = $1} |
    LOGICS      {$$ = $1} |
    CAST        {$$ = $1} |
    NATIVEFUC   {$$ = $1} |
    CALLFUNC    {$$ = $1} |
    TK_id       {$$ = new AccessID(@1.first_line, @1.first_column, $1)} |
    TK_field    {} |
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
    RW_cast TK_lpar EXP RW_as TYPE TK_rpar {$$ = new Cast(@1.first_line, @1.first_column, $3, $5)};

// Funciones Nativas
NATIVEFUC :
    RW_lower TK_lpar EXP TK_rpar                 {$$ = new Lower(@1.first_line, @1.first_column, $3)       } |
    RW_upper TK_lpar EXP TK_rpar                 {$$ = new Upper(@1.first_line, @1.first_column, $3)       } |
    RW_round TK_lpar EXP TK_comma EXP TK_rpar    {$$ = new Round(@1.first_line, @1.first_column, $3, $5)   } |
    RW_len TK_lpar EXP TK_rpar                   {$$ = new Len(@1.first_line, @1.first_column, $3)         } |
    RW_truncate TK_lpar EXP TK_comma EXP TK_rpar {$$ = new Truncate(@1.first_line, @1.first_column, $3, $5)} |
    RW_typeof TK_lpar EXP TK_rpar                {$$ = new TypeOf(@1.first_line, @1.first_column, $3)      } ;

TYPE :
    RW_int     {$$ = Type.INT    } |
    RW_double  {$$ = Type.DOUBLE } |
    RW_date    {$$ = Type.DATE   } |
    RW_varchar {$$ = Type.VARCHAR} |
    RW_boolean {$$ = Type.BOOLEAN} ;