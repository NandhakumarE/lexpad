import { useState } from "react";
import IconButton from "../components/IconButton";
import useFormattedTextHelper from "../hooks/useFormattedTextHelper";
import { AiOutlineUnderline, AiOutlineStrikethrough } from "react-icons/ai";
import FlexContainer from "../components/FlexContainer";
import type { StringObject } from "../types";

const TEXT_DECORATOR = {
  UNDERLINE: "underline",
  STRIKE_THROUGH: "line-through",
} as const;

type TextDecoratorType = keyof typeof TEXT_DECORATOR;
type TextDecorationValue = (typeof TEXT_DECORATOR)[TextDecoratorType];

const getTextDecorationArray = (
  underline: boolean,
  strike: boolean
): TextDecorationValue[] => {
  const values: TextDecorationValue[] = [];
  if (underline) values.push(TEXT_DECORATOR.UNDERLINE);
  if (strike) values.push(TEXT_DECORATOR.STRIKE_THROUGH);
  return values;
};

const toggle = (array: string[] = [], value:string ): string[] => {
    console.log(array, value);
    if(!value) return array;
    return array.includes(value) ? array.filter((v) => v !== value) : [...array, value];
} 

const TextDecoration = () => {
  const [isUnderlineActive, setUnderlineActive] = useState(false);
  const [isStrikeActive, setStrikeActive] = useState(false);


  const getTrackingMetric = (style: StringObject = {}) => style.textDecoration || "";

  const retrieveTrackedDataCallBack = (list:string[] = []) => {
      if(list.length === 1) {
        const textDecoration:string = list[0] || "";
        setUnderlineActive(textDecoration.includes(TEXT_DECORATOR.UNDERLINE));
        setStrikeActive(textDecoration.includes(TEXT_DECORATOR.STRIKE_THROUGH));
      } else {
        setUnderlineActive(false);
        setStrikeActive(false);
      }
  }

  const { updateStyle } = useFormattedTextHelper({ getTrackingMetric, retrieveTrackedDataCallBack});

  const onChange = (id: string) => {
    const currentValues = getTextDecorationArray(isUnderlineActive, isStrikeActive);
    const updatedValue = toggle(currentValues, id);
    const tdStyle = (updatedValue.length > 0) ? updatedValue.join(" ") : 'default'
    updateStyle({ textDecoration: tdStyle});
  };

  return (
    <FlexContainer>
      <IconButton
        id={TEXT_DECORATOR.UNDERLINE}
        label="Underline"
        active={isUnderlineActive}
        onClick={() => onChange(TEXT_DECORATOR.UNDERLINE)}
      >
        <AiOutlineUnderline />
      </IconButton>
      <IconButton
        id={TEXT_DECORATOR.STRIKE_THROUGH}
        label="Strikethrough"
        active={isStrikeActive}
        onClick={() => onChange(TEXT_DECORATOR.STRIKE_THROUGH)}
      >
        <AiOutlineStrikethrough />
      </IconButton>
    </FlexContainer>
  );
};

export default TextDecoration;
