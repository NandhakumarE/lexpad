import IconButton from "../components/IconButton";
import { LinkNode } from "@lexical/link";
import { $getSelection, $insertNodes, $isRangeSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createFormattedText } from "../nodes/FormattedTextNode";
import { HiLink } from "react-icons/hi";

const LinkPlugin = () => {
  const isActive = false; // Replace with actual logic to determine if the link is active

  const [editor] = useLexicalComposerContext();
  const onChange = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) && selection.getTextContent()) {
        const content = selection.getTextContent();
        const node = new LinkNode("https://", {
          target: "_blank",
          rel: "noopener noreferrer",
          title: content,
        });
        const formattedText = $createFormattedText(content, "");
        node.append(formattedText); // Set the text content of the link
        $insertNodes([node]);

        // Move caret to the beginning of the inserted node
        const size = content.length - 1;
        selection.setTextNodeRange(formattedText, size, formattedText, size);
      
      } else {
        console.log('No valid selection for link insertion / deletion');
      }
    });
  };

  return (
    <IconButton label="Link" onClick={onChange} active={isActive}>
      <HiLink data-testid="link-icon" />
    </IconButton>
  );
};

export default LinkPlugin;
