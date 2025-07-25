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
import ListPlugin from "../plugins/ListPlugin";
import LineHeightPlugin from "../plugins/LineHeightPlugin";
import HorizontalLine from "../plugins/HorizontalLinePlugin";
import PageBreak from "../plugins/PageBreakPlugin";

const Toolbar = () => {
  return (
    <>
      <BoldPlugin />
      <ItalicsPlugin />
      <TextDecoration />
      <Separator />
      <FontSize />
      <Separator />
      <FontColor />
      <BackgroundColor />
      <Separator />
      <Alignment/>
      <LineHeightPlugin/>
      <ListPlugin/>
      <Separator />
      <Table/>
      <LinkPlugin/>
      <HorizontalLine/>
      <PageBreak/>
    </>
  );
};

export default Toolbar;
