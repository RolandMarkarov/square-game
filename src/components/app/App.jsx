// import React, {Component} from 'react'

import axios from "axios"
import Form from '../form/Form';
import Statistics from '../statistics/Statistics';
import Dashboard from '../dashboard/Dashboard';

import React, {useState, useEffect} from 'react';
import './App.scss';

const url = "https://starnavi-frontend-test-task.herokuapp.com/game-settings";


const App = () => {
    const [username, setUserame] = useState('');
    const [gameDif, setGameDif] = useState("easyMode");
    const [maxClick, setMaxClick] = useState(13);
    const [dataFetch, setDataFetch] = useState({field: 5, delay: 2000});
    const [fields, setFields] = useState({fields: randomFields()})
    const [start, setStart] = useState(false);


    useEffect(() => {
        const fields = Math.pow(dataFetch.field, 2);
        setMaxClick(Math.floor(fields / 2 + 1));
        setFields(randomFields())
    }, [gameDif, dataFetch]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios(url);
            setDataFetch(res.data[gameDif])
        };
        fetchData()
    }, [gameDif]);

    const handleStartGame = (e) => {
        e.preventDefault();
        setStart(!start)
      if (start){
        handleStop()
      }
    };

    function randomFields() {
        const x = Math.pow(dataFetch.field, 2)
        let result = [];
        for (let i = 0; i < x; i++) {
            result.push(i)
        }
        result.sort(() => Math.random() - 0.5).splice(x / 2 + 2, 1000)
        return result
    }

    function handleStop(e) {
        if (e) {
            e.preventDefault();
        }
        setFields({fields: randomFields()})
        setStart(false);
    }

    const handleDificulty = (e) => {
        const val = e.target.value;
        setGameDif(val)
    };
    const handleUsername = (e) => {
        const val = e.target.value;
        setUserame(val)
    };

    function handleEndGame() {
        setStart(false);
    }


    return (
        <div className={"App"}>
            <Form
                handleDificulty={handleDificulty}
                handleUsername={handleUsername}
                username={username}
                handleStartGame={handleStartGame}
                startGame={start}

            />
            <Dashboard
                dificulty={gameDif}
                fields={fields}
                start={start}
                maxClick={maxClick}
                dataFetch={dataFetch}
                endGame={handleEndGame}
                username={username}
            />

        </div>
    );
};

export default App;