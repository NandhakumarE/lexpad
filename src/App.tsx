import { useState } from "react";
import RichTextEditor from "./editor/RichTextEditor";


function App() {
  const [html, setHtml] = useState<string>("");

  return (
    <div>
      <RichTextEditor
        name="text-editor"
        placeholder="Provide your content here..."
        value={html}
        onChange={(value) => setHtml(value)}
      />
    </div>
  );
}

export default App;
