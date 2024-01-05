import React, { useEffect, useState } from "react";
import Header from "../Home/Header/header";

import style from "./Community.module.scss"
import ModuleCard from "../Home/ModuleCard/ModuleCard";

const Community = () =>{
    const username = localStorage.getItem("username")
    const [data, setData] = useState()

    const handleLogout = async () =>{
        fetch("https://quizmentorbackend.onrender.com/logout", {
          method: "POST",
        }).then(response =>{
          if(response.ok){
            localStorage.removeItem('username')
            localStorage.removeItem("authenticated")
            navigate("/login")
          }
        })
      }

      useEffect(()=>{
        fetch("https://quizmentorbackend.onrender.com/modules/getALl")
        .then(response => response.json())
        .then(data => setData(data))
      }, [])
    return(
        <>
        <Header handleLogout={handleLogout} username={username} />
        <div className={style.wrapper}>
            <div className={style.about}>
                <p className={style.Title}>Community</p>
                <p className={style.description}>Explore the creativity of our community members.</p>
            </div>
            <div className={style.modulesWrapper}>
              {data && data.map((moduleData, index) => (
                <div className={style.moduleCardWrapper} key={index}>
                  < ModuleCard moduleId={index} {...moduleData} />
                </div>
              ))}
            </div>
        </div>
        </>
    )
}

export default Community;