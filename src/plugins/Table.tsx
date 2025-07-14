import { TbTableDashed } from "react-icons/tb";
import { $createParagraphNode, $insertNodes } from "lexical";
import IconButton from "../components/IconButton";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createCustomTable } from "../nodes/Table";

const Table = () => {
  const [editor] = useLexicalComposerContext();

  const handleClick = () => {
    editor.update(() => {
      const table = $createCustomTable(4, 4);
      $insertNodes([table, $createParagraphNode()]);
    });
  };

  return (
    <IconButton id="table" label="Table" onClick={handleClick}>
      <TbTableDashed />
    </IconButton>
  );
};

export default Table;
