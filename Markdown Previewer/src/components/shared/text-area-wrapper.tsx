import {
  PencilSquareIcon,
  WindowIcon,
  ClipboardDocumentCheckIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { useCopyText } from "../../hooks/use-copy-text";

interface TextAreaWrapperProps {
  headerName: HeaderNames;
  children: React.ReactNode;
  childTextContext: string | (() => string);
}

type HeaderNames = "EDITOR" | "PREVIEWER";

const HeaderIcons: Record<HeaderNames, React.ReactNode> = {
  EDITOR: <PencilSquareIcon className="w-5 h-5" />,
  PREVIEWER: <WindowIcon className="w-5 h-5" />,
};

const TextAreaWrapper = ({
  headerName,
  children,
  childTextContext,
}: TextAreaWrapperProps) => {
  const { copy, copied } = useCopyText();

  const handleCopy = () => {
    const text =
      typeof childTextContext === "function"
        ? childTextContext()
        : childTextContext;

    copy(text);
  };

  return (
    <div className="sticky top-0 self-start w-full md:max-w-[50%] md:flex-1 h-full">
      <div className="absolute h-[50px] bg-[#7ed7ef] w-full rounded-t-md border text-lg font-bold flex items-center justify-between !px-8">
        <div className="flex items-center">
          {HeaderIcons[headerName]}&nbsp;
          {headerName}
        </div>
        {copied ? (
          <span className="flex items-center font-normal">
            <CheckIcon className="w-5 h-5" />
            &nbsp;Copied!
          </span>
        ) : (
          <span className="flex items-center font-normal">
            <ClipboardDocumentCheckIcon
              className="w-5 h-5 cursor-pointer"
              onClick={handleCopy}
            />
            &nbsp;Copy
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

export default TextAreaWrapper;
