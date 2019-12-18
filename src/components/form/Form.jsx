import React from 'react'
import "./form.scss"

const Form = ({handleDificulty, handleUsername, username, startGame, handleStartGame}) => {
    return (
        <div className="form-wrapper">
            <select name="" defaultValue={'DEFAULT'} onChange={handleDificulty}>
                <option value="DEFAULT" disabled>Select Dificulty</option>
                <option value="easyMode" disabled={startGame}>Easy mode</option>
                <option value="normalMode" disabled={startGame}>Normal mode</option>
                <option value="hardMode" disabled={startGame}>Hard mode</option>
            </select>
            {
                !startGame ?
                    <input type="text"
                           value={username}
                           name="name"
                           onChange={handleUsername}
                           placeholder={"Enter your name"}/> :
                    <p>{username}</p>
            }
            <button  onClick={handleStartGame}>{startGame? "Stop" : "Start"}</button>
        </div>
    )
}

export default Form