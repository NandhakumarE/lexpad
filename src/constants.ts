export const TABLE_COMMANDS = {
  BORDER_COLOR: "border-color",
  BACKGROUND_COLOR: "background-color",
  ADD_HEADER_ROW: "add-header-row",
  ADD_HEADER_COLUMN: "add-header-column",
  REMOVE_HEADER_COLUMN: "remove-header-column",
  REMOVE_HEADER_ROW: "remove-header-row",
  ROW_STRIPING: "row-striping",
  FREEZE_FIRST_COLUMN: "freeze-first-column",
  FREEZE_FIRST_ROW: "freeze-first-row",
  INSERT_ROW_ABOVE: "add-row-above",
  INSERT_ROW_BELOW: "add-row-below",
  INSERT_COLUMN_LEFT: "add-column-left",
  INSERT_COLUMN_RIGHT: "add-column-right",
  DELETE_ROW: "delete-row",
  DELETE_COLUMN: "delete-column",
  DELETE_TABLE: "delete-table",
};

/*
{
        label: "Add Header Row",
        value: TABLE_COMMANDS.ADD_HEADER_ROW,
    },
    {
        label: "Add Header Column",
        value: TABLE_COMMANDS.ADD_HEADER_COLUMN,
    },
    {
        label: "Remove Header Column",
        value: TABLE_COMMANDS.REMOVE_HEADER_COLUMN,
    },
    {
        label: "Remove Header Row",
        value: TABLE_COMMANDS.REMOVE_HEADER_ROW,
    },
*/
export const TABLE_COMMANDS_OPTIONS = [
    {
        label: "Background Color",
        value: TABLE_COMMANDS.BACKGROUND_COLOR,
    },
    {
        label: "Border Color",
        value: TABLE_COMMANDS.BORDER_COLOR,
    },
    {
        label: "Toggle Row Striping",
        value: TABLE_COMMANDS.ROW_STRIPING,
    },
    {
        label: "Freeze First Column",
        value: TABLE_COMMANDS.FREEZE_FIRST_COLUMN,
    },
    {
        label: "Freeze First Row",
        value: TABLE_COMMANDS.FREEZE_FIRST_ROW,
    },
    {
        label: "Insert Row Above",
        value: TABLE_COMMANDS.INSERT_ROW_ABOVE,
    },
    {
        label: "Insert Row Below",
        value: TABLE_COMMANDS.INSERT_ROW_BELOW,
    },
    {
        label: "Insert Column Left",
        value: TABLE_COMMANDS.INSERT_COLUMN_LEFT,
    },
    {
        label: "Insert Column Right",
        value: TABLE_COMMANDS.INSERT_COLUMN_RIGHT,
    },
    {
        label: "Delete Row",
        value: TABLE_COMMANDS.DELETE_ROW,
    },
    {
        label: "Delete Column",
        value: TABLE_COMMANDS.DELETE_COLUMN,
    },
    {
        label: "Delete Table",
        value: TABLE_COMMANDS.DELETE_TABLE,
    },
]