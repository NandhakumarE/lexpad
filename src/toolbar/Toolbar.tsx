import FlexContainer from "../components/FlexContainer";
import Separator from "../components/Separator";
import BackgroundColor from "../plugins/BackgroundColor";
import BoldPlugin from "../plugins/BoldPlugin";
import FontSizePlugin from "../plugins/FontSizePlugin";
import ItalicsPlugin from "../plugins/ItalicsPlugin";
import TextDecoration from "../plugins/TextDecoration";
import TextColor from "../plugins/TextColor";
import Alignment from "../plugins/Alignment";

const Toolbar = () => {
  return (
    <FlexContainer>
      <BoldPlugin />
      <ItalicsPlugin />
      <TextDecoration />
      <Separator />
      <FontSizePlugin />
      <Separator />
      <Alignment/>
      <TextColor />
      <BackgroundColor />
      <Separator />
    </FlexContainer>
  );
};

export default Toolbar;
