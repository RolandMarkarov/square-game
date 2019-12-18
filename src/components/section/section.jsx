import React, {useEffect, useState} from 'react';
import "./section.scss"

const Section = ({id, activeField, time, action, dificulty, cleanField}) => {
    const [color, setColor] = useState("");
    const [intime, setIntime] =useState(false);
    const [attempt, setAttempt] = useState(false);
    const [clicked, setClicked] = useState(false);


    useEffect(() => {
        if (cleanField) {
            setColor("");
            setClicked(false);
            setIntime(false);
            setAttempt(false);
        }
    }, [cleanField])

    useEffect(()=>{
        if(activeField === id){
            setColor("blue")
            setIntime(true)
            setAttempt(true);
        }
    },[activeField]);

    useEffect(()=>{
        if(attempt && !intime && !clicked){
            setColor('red')
        }
        const timeout = setTimeout(()=>{
            if (intime){
                setIntime(false)
            }
        }, time)
        return ()=> clearTimeout(timeout);
    },[intime]);

    function handleClick() {
        if (intime & (activeField === id)) {
            setClicked(true);
            action();
        }
    }

    function fieldClass() {
        let result = "";
        if (time === dificulty.delay) {
            result = "medium";
        }
        if (time === dificulty.delay) {
            result = "small";
        }
        return result;
    }


    return (
        <div onClick={handleClick}
             className={`section ${clicked ? "green" : color} ${fieldClass()}`}
             >
        </div>
    );
};

export default Section;