import { useState } from "react";
import "./App.css";
import Editor from "./components/editor";
import Previewer from "./components/previewer";
import { defaultEditorText } from "./interfaces/editor";

function App() {
  const [editorText, setEditorText] = useState<string>(defaultEditorText);
  return (
    <main className="bg-[#fafdfe] h-full flex flex-col md:flex-row !p-4 md:!py-8 md:!px-16 gap-4 md:gap-16">
      <Editor {...{ editorText, setEditorText }} />
      <Previewer editorText={editorText} />
    </main>
  );
}

export default App;
