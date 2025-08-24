import { useState } from "react";
import RichTextEditor from "./editor/RichTextEditor";


function App() {
  const [html, setHtml] = useState<string>("");

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <RichTextEditor
        name="text-editor"
        placeholder="Provide your content here..."
        value={html}
        onChange={(value) => setHtml(value)}
        autoFocus
        // readOnly
        debounce={300}
        className=" w-[70vw] !border-0 gap-4 "
        toolbarClassName="shadow-lg rounded-xl bg-white flex-wrap"
        editorContainerClassName="shadow-xl rounded-xl bg-white"
        editorClassName="min-h-[50vh]"
        plugins={[]}
      />
    </div>
  );
}

export default App;
