import React from "react"

const ProgressBar = ({progress}) =>{
    const progressStyle = {
        width: `${progress}%`,
        background: '#3498db',
        height: '100%',
        transition: "width 0.5s ease"
      };
    return(
        <div style={{ width: '100%', background: '#bdc3c7', height: '20px' }}>
            <div style={progressStyle}></div>
        </div>
    )
}

export default ProgressBar;