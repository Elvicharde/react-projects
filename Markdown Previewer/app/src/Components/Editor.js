import TopBar from "./TopBar";
function Editor() {
    const JSX = (
        <>
            <div className="container">
                <TopBar text="Editor" />
                <textarea
                    name="Editor"
                    id="editor"
                    cols="30"
                    rows="10"
                    placeholder="This is a sample text"
                ></textarea>
            </div>
        </>
    );

    return JSX;
}

export default Editor;
