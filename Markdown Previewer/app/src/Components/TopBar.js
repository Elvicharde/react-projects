const TopBar = (props) => {
    const JSX = (
        <>
            <div className="bar d-flex">
                <span>Logo</span>
                <span>{props.text}</span>
                <span>CollapseIcon</span>
            </div>
        </>
    );

    return JSX;
};

export default TopBar;
