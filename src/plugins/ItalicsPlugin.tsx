import { useState } from "react";
import IconButton from "../components/IconButton";
import useFormattedTextHelper from "../hooks/useFormattedTextHelper";
import { AiOutlineItalic } from "react-icons/ai";

const ItalicsPlugin = () => {
  const [isActive, setIsActive] = useState(false);

  const { updateStyle } = useFormattedTextHelper({
     getTrackingMetric: (style) => style.fontStyle ? style.fontStyle : "",
     retrieveTrackedDataCallBack: (list = []) => {
        const isActive = (list.length === 1 && list[0] === 'italic');
        setIsActive((prev) => isActive === prev ? prev : isActive);
     }
  })

  const onChange = () => {
       const style = isActive ? { fontStyle: 'default' } : { fontStyle: 'italic' }
       updateStyle(style)
  }

  return (
    <IconButton id="italic-plugin" label="italic" onClick={onChange} active={isActive}>
      <AiOutlineItalic data-testid="italic-icon"/>
    </IconButton>
  );
};


export default ItalicsPlugin;