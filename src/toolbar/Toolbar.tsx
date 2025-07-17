import FlexContainer from "../components/FlexContainer";
import Separator from "../components/Separator";
import BackgroundColor from "../plugins/BackgroundColor";
import BoldPlugin from "../plugins/BoldPlugin";
import FontSize from "../plugins/FontSize";
import ItalicsPlugin from "../plugins/ItalicsPlugin";
import TextDecoration from "../plugins/TextDecoration";
import FontColor from "../plugins/FontColor";
import Alignment from "../plugins/Alignment";
import Table from "../plugins/Table";
import LinkPlugin from "../plugins/LinkPlugin";

const Toolbar = () => {
  return (
    <FlexContainer>
      <BoldPlugin />
      <ItalicsPlugin />
      <TextDecoration />
      <Separator />
      <FontSize />
      <Separator />
      <Alignment/>
      <FontColor />
      <BackgroundColor />
      <Separator />
      <Table/>
      <LinkPlugin/>
    </FlexContainer>
  );
};

export default Toolbar;
