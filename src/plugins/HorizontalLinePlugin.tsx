import { MdHorizontalRule } from "react-icons/md";
import IconButton from "../components/IconButton";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";

const HorizontalLine = () => {
  const [ editor ] = useLexicalComposerContext();

  const handleClick = () => {
    editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);
  };
  
  return (
    <IconButton
      id="horizontal-line"
      label="Horizontal Line"
      active={false}
      onClick={() => handleClick()}
    >
      <MdHorizontalRule />
    </IconButton>
  );
};

export default HorizontalLine;
