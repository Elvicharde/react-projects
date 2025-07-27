import type { EditorProps } from "./editor";
import { marked as markDownParser } from "marked";
import DOMPurify from "dompurify";
import TextAreaWrapper from "./shared/text-area-wrapper";
import { useRef } from "react";

const Previewer = ({ editorText }: Pick<EditorProps, "editorText">) => {
  const htmlText = DOMPurify.sanitize(
    markDownParser(editorText, { breaks: true }) as string
  );
  const previewRef = useRef<HTMLDivElement>(null);

  // Function to extract *visible text* from preview content
  const getPreviewText = () => previewRef.current?.innerText || "";

  return (
    <TextAreaWrapper headerName="PREVIEWER" childTextContext={getPreviewText}>
      <div
        id="preview"
        ref={previewRef}
        className="!pt-[70px] h-full overflow-auto bg-slate-100 shadow-inner rounded-md !p-8 prose hide-scrollbar border"
        dangerouslySetInnerHTML={{ __html: htmlText }}
      />
    </TextAreaWrapper>
  );
};

export default Previewer;
