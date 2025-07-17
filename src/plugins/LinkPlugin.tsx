import { IoIosLink } from "react-icons/io";
import IconButton from "../components/IconButton";
import { LinkNode } from "@lexical/link";
import { $insertNodes } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createFormattedText } from "../nodes/FormattedTextNode";

const LinkPlugin = () => {
  const isActive = false; // Replace with actual logic to determine if the link is active

  const [editor] = useLexicalComposerContext();
  const onChange = () => {
    editor.update(() => {
      const node = new LinkNode("https://example.com", {
        target: "_blank",
        rel: "noopener noreferrer",
        title: "Example Link",
      });
      node.append($createFormattedText("Example Data", "")); // Set the text content of the link
      $insertNodes([node]);
    });
  };

  return (
    <IconButton label="Link" onClick={onChange} active={isActive}>
      <IoIosLink data-testid="link-icon" />
    </IconButton>
  );
};

export default LinkPlugin;
