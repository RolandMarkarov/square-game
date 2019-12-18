import React, {useEffect, useState} from 'react'
import "./statistics.scss"
import axios from "axios"

const urlWinners = "https://starnavi-frontend-test-task.herokuapp.com/winners";

const Statistics = ({start, username, gameOver}) => {
    const [leader, setLeaders] = useState([]);

    useEffect(() => {
        const resp = async () => {
            const res = await axios(urlWinners)
            setLeaders(res.data)
        }
        resp()
    }, [start]);


    useEffect(()=>{
        const sendData = async () => {
            const res = await axios.post(urlWinners, {
                winner: username,
                date: new Date()
            });
            setLeaders(res.data)

        };
        sendData()
    },[gameOver])



    return (
        <div>
            <h2>Leader Board</h2>

            <ul className="list">
                {leader.map(leader => (
                    <li className="list-item" key={leader.id}><span>{leader.winner}</span><span>{leader.date}</span></li>))}
            </ul>
        </div>

    )
}

export default Statistics