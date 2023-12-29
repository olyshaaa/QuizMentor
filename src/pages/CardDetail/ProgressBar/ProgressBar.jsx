import React from "react"

const ProgressBar = ({progress}) =>{
    const progressStyle = {
        width: `${progress}%`,
        background: '#586380',
        height: '100%',
        transition: "width 0.5s ease",
        borderRadius: "0.25rem",
      };
    return(
        <div style={{ width: '80%', background: '#D9DDE8', height: '3px', borderRadius: "0.25rem", marginTop: "50px" }}>
            <div style={progressStyle}></div>
        </div>
    )
}

export default ProgressBar;