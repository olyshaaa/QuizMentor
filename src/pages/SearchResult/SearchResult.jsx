import React, { useEffect, useState } from "react";
import Header from "../Home/Header/header";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import style from "./SearchResult.module.scss"
import ModuleCard from "../Home/ModuleCard/ModuleCard";

const SearchResult = () =>{
    const username = localStorage.getItem("username")
    const [data, setData] = useState()
    const [show, setShow] = useState()
    const navigate = useNavigate()

    const url = window.location.search;

    const styleDiv = {
        display: show ? "block" : "none",
        marginLeft: "40px",
    }

    const query = new URLSearchParams(url).get("query")
    const handleLogout = async () =>{
        fetch("https://quizmentorbackend.onrender.com/logout", {
          method: "POST",
          headers: {
            'Origin': 'https://quiz-mentor.vercel.app',
          },
        }).then(response =>{
          if(response.ok){
            localStorage.removeItem('username')
            localStorage.removeItem('authenticated');
            navigate('/login')
          }
        })

      }

      useEffect(() => {
        console.log("query changed" + query)
        const fetchData = async () => {
          try {
            const response = await fetch(`https://quizmentorbackend.onrender.com/search/${query}`);

            if (response.ok) {
              const data = await response.json();
              setData(data)
              setShow(false)
            } else {
                setShow(true)
                setData()
            }
          } catch (error) {
            alert("error")
          }
        };
        fetchData();
      }, [query, navigate]);

    return(
        <>
        <Header username={username} handleLogout={handleLogout} />
        <p className={style.title}>SearchResult</p>
        <div className={style.searchModulesWrapper}>
            {data && data.map((moduleData, index) => (
                <div className={style.moduleElement} key={index}>
                    <ModuleCard index={index} {...moduleData}/>
                </div>
            ))}
        </div>
        <div style={styleDiv}>No modules with name {query} were found</div>
        </>
    )
}

export default SearchResult;