import { MdInsertPageBreak } from "react-icons/md";
import IconButton from "../components/IconButton";
import { $createPageBreakNode } from "../nodes/PageBreak/PageBreakNode";
import { $insertNodes } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

const PageBreak = () => {
  const [editor] = useLexicalComposerContext();
  const handleClick = () => {
    editor.update(() => {
      const pageBreakNode = $createPageBreakNode();
      $insertNodes([pageBreakNode]);
    });
  };
  return (
    <IconButton
      id="page-break"
      label="Page Break"
      active={false}
      onClick={() => handleClick()}
    >
      <MdInsertPageBreak />
    </IconButton>
  );
};

export default PageBreak;
