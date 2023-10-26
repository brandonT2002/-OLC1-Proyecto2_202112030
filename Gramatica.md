```javascript
INIT :
    INSTRUCTIONS EOF |
    EOF

INSTRUCTIONS :
    INSTRUCTIONS INSTRUCTION |
    INSTRUCTION

INSTRUCTION :
    CREATETABLE  ';' |
    ALTERTAB     ';' |
    DROPTAB      ';' |
    INSERTREG    ';' |
    UPDATETAB    ';' |
    TRUNCATETAB  ';' |
    DELETETAB    ';' |
    SELECT       ';' |
    DECLAREID    ';' |
    ASIGNID      ';' |
    IFSTRUCT     ';' |
    CASESTRUCT_S ';' |
    WHILESTRUCT  ';' |
    FORSTRUCT    ';' |
    FUNCDEC      ';' |
    CALLFUNC     ';' |
    ENCAP        ';' |
    PRINT        ';' |
    'break'      ';' |
    'continue'   ';' |
    'return' EXP ';' |
    'return' ';'     |
    error

DECLAREID :
    'declare' DECLIDS                   |
    'declare' TK_id TYPE '=' EXP        |
    'declare' TK_id TYPE 'default' EXP

DECLIDS :
    DECLIDS ',' DECLID |
    DECLID

DECLID :
    TK_id TYPE

ASIGNID :
    'set' TK_id '=' EXP

SELECT :
    'select' FIELDS 'from' TK_field 'where' EXP
    'select' FIELDS 'from' TK_field
    'select' LIST_IDS

FIELDS :
    LIST_IDS |
    '*'

LIST_IDS :
    LIST_IDS ',' IDS |
    IDS

CREATETABLE :
    'create' 'table' TK_field '(' ATTRIBUTES ')'

ATTRIBUTES :
    ATTRIBUTES ',' ATTRIBUTE |
    ATTRIBUTE

ATTRIBUTE :
    TK_field TYPE

ALTERTAB :
    'alter' 'table' TK_field ACTION

ACTION :
    'add'    TK_field TYPE                   |
    'drop'   'column' TK_field               |
    'rename' 'to'     TK_field               |
    'rename' 'column' TK_field 'to' TK_field

DROPTAB :
    'drop' 'table' TK_field

INSERTREG :
    'insert' 'into' TK_field '(' LIST_ATTRIBS ')' 'values' '(' LIST_EXPS ')'

LIST_ATTRIBS:
    LIST_ATTRIBS ',' TK_field |
    TK_field

LIST_EXPS :
    LIST_EXPS ',' EXP |
    EXP

IDS :
    EXP 'as' TK_field |
    EXP

UPDATETAB :
    'update' TK_id 'set' VALUESTAB 'where' TK_id '=' EXP ;

VALUESTAB :
    VALUESTAB ',' VALUETAB |
    VALUETAB ;

VALUETAB :
    TK_id '=' EXP

TRUNCATETAB :
    'truncate' 'table' TK_id

DELETETAB :
    'delete' 'from' TK_field 'where' EXP

IFSTRUCT :
    'if' EXP 'then'  INSTRUCTIONS 'else' INSTRUCTIONS 'end' 'if' |
    'if' EXP 'then'  INSTRUCTIONS 'end' 'if'                     |
    'if' EXP 'begin' INSTRUCTIONS 'end'

CASESTRUCT_S :
    'case' EXP WHENSELSE 'end' 'as' TK_field   |
    'case' EXP WHENSELSE 'end' 'as' TK_varchar |
    'case' EXP WHENSELSE 'end'                  |
    'case' WHENSELSE 'end' 'as' TK_field       |
    'case' WHENSELSE 'end' 'as' TK_varchar     |
    'case' WHENSELSE 'end'

WHENSELSE :
    WHENS ELSE |
    WHENS      |
    ELSE

WHENS :
    WHENS WHEN |
    WHEN

WHEN :
    'when' EXP 'then' EXP

ELSE :
    'else' EXP

PRINT :
    'print' EXP

WHILESTRUCT :
    'while' EXP ENCAP

FORSTRUCT :
    'for' TK_id 'in' EXP '..' EXP ENCAP 'loop'

FUNCDEC :
    'create' 'function'  TK_field '(' PARAMS ')' 'returns' TYPE ENCAP |
    'create' 'function'  TK_field '(' ')' 'returns' TYPE ENCAP        |
    'create' 'procedure' TK_field PARAMS 'as' ENCAP                   |
    'create' 'procedure' TK_field 'as' ENCAP                          |
    'create' 'procedure' TK_field PARAMS ENCAP                        |
    'create' 'procedure' TK_field ENCAP                                       

PARAMS :
    PARAMS ',' PARAM |
    PARAM

PARAM :
    TK_id TYPE ;

ENCAP :
    'begin' INSTRUCTIONS 'end' |
    'begin' 'end'

CALLFUNC :
    TK_field '(' ARGS ')' |
    TK_field '(' ')'

ARGS :
    ARGS ',' EXP |
    EXP

EXP : 
    ARITHMETICS |
    RELATIONALS |
    LOGICS      |
    CAST        |
    NATIVEFUC   |
    CALLFUNC    |
    TK_id       |
    TK_field    |
    TK_varchar  |
    TK_int      |
    TK_double   |
    TK_date     |
    'true'      |
    'false'     |
    '(' EXP ')'

ARITHMETICS :
    EXP '+' EXP  |
    EXP '-' EXP  |
    EXP '*' EXP  |
    EXP '/' EXP  |
    EXP '%' EXP  |
    '-' EXP

RELATIONALS :
    EXP '='  EXP |
    EXP '!=' EXP |
    EXP '<=' EXP |
    EXP '>=' EXP |
    EXP '<'  EXP |
    EXP '>'  EXP

LOGICS :
    EXP 'and' EXP |
    EXP 'or'  EXP |
    'not'     EXP

CAST :
    RW_cast '(' EXP 'as' TYPE ')'

NATIVEFUC :
    'upper'    '(' EXP ')'         |
    'lower'    '(' EXP ')'         |
    'round'    '(' EXP ',' EXP ')' |
    'len'      '(' EXP ')'         |
    'truncate' '(' EXP ',' EXP ')' |
    'typeof'   '(' EXP ')'

TYPE :
    'int'     |
    'double'  |
    'date'    |
    'varchar' |
    'boolean'
```