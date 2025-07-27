import { Textarea } from "./shared/text-area";
import TextAreaWrapper from "./shared/text-area-wrapper";

export interface EditorProps {
  editorText: string;
  setEditorText: React.Dispatch<React.SetStateAction<string>>;
}

const Editor = ({ editorText, setEditorText }: EditorProps) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    return setEditorText(event.currentTarget.value);
  };
  return (
    <TextAreaWrapper headerName="EDITOR" childTextContext={editorText}>
      <Textarea
        id="editor"
        onChange={handleTextChange}
        className="!pt-[70px] overflow-auto hide-scrollbar !px-8 shadow-inner bg-slate-100 h-full"
        autoFocus
      >
        {editorText}
      </Textarea>
    </TextAreaWrapper>
  );
};

export default Editor;
