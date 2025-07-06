import { useState } from "react";
import IconButton from "../components/IconButton";
import useFormattedTextHelper from "../hooks/useFormattedTextHelper";
import { AiOutlineBold } from "react-icons/ai";

const BoldPlugin = () => {
  const [isActive, setIsActive] = useState(false);

  const { updateStyle } = useFormattedTextHelper({
     getTrackingMetric: (style) => style.fontWeight ? style.fontWeight : "",
     retrieveTrackedDataCallBack: (list = []) => {
        const isActive = (list.length === 1 && list[0] === 'bold');
        setIsActive((prev) => isActive === prev ? prev : isActive);
     }
  })

  const onChange = () => {
       const style = isActive ? { fontWeight: 'default' }: { fontWeight: 'bold' }
       updateStyle(style)
  }

  return (
    <IconButton label="bold" onClick={onChange} active={isActive}>
      <AiOutlineBold />
    </IconButton>
  );
};


export default BoldPlugin;