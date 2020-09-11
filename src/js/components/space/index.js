import React from "react";

const Index = props => {
    const { width = 3 } = props;
    return (
        <span style={{
            display: "inline-block",
            width: `${width}px`,
        }}></span>
    )
}

export default Index;