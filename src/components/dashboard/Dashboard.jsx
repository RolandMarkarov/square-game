import "./dashboard.scss"
import Section from "../section/section";
//
// class Dashboard extends Component {
//     state = {
//         dashboard: [],
//         serverData: null
//     }
//
//     dashboarCreator = () => {
//         let serverData = this.props.serverFetch
//         this.setState({
//             serverData: serverData
//         })
//
//     }
//     someFn = ()=>{
//         if (this.state.serverData){
//             const {field, delay} = this.state.serverData
//             let x =null;
//             if(field){
//                 return x = Math.pow(field)
//             }
//             console.log(x)
//         }
//         }
//
//
//     componentDidMount() {
//     }
//     componentDidUpdate(prevProps, prevState, snapshot) {
//         // this.dashboarCreator()
//
//         this.someFn()
//     }
//
//     dashboardRender = () => {
//         if (this.props) {
//             let field = this.props.serverFetch;
//             let newProps = this.props.serverFetch;
//             let x = newProps.field.field
//
//             let fieldQuantity = x * x;
//             console.log(newProps.field.field)
//             let result = [];
//             let spanStyles = {
//                 border: "1px solid grey"
//             };
//
//             if (x === 5) {
//                 spanStyles.width = "20%";
//                 spanStyles.height = "20%";
//             }
//
//             if (x === 10) {
//                 spanStyles.width = "10%";
//                 spanStyles.height = "10%";
//             }
//
//             if (x === 15) {
//                 spanStyles.width = "6.6%";
//                 spanStyles.height = "6.6%";
//             }
//
//
//             for (let i = 0; i < fieldQuantity; i++) {
//                 let obj = {
//                     isActive: false,
//                     isChecked: false,
//                     id: i
//                 };
//                 result.push(obj)
//             }
//             result.map(el => <span className={"small"} style={spanStyles} key={el.id}></span>)
//             console.log(result)
//             // this.setState({
//             //     dashboard: result
//             // })
//         }
//
//     };
//
//
//     render() {
//
//         const {startGame} = this.props;
//         const {dashboard} = this.state
//         return (
//             <div className="dashboard-wrapper">
//                 <h2>Message Here</h2>
//                 <div className="dashboard">
//
//                     <Section/>
//                 </div>
//             </div>
//         )
//     }
// }
//
// export default Dashboard
import React, {useEffect, useState} from 'react';
import Statistics from "../statistics/Statistics";

const Dashboard = ({dificulty, fields, dataFetch, start, maxClick, endGame, username}) => {

    const [time, setTime] = useState(null);
    const [activeField, setActiveField] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [click, setClick] = useState(0);
    const [message, setMessage] = useState("");
    const [cleanField, setCleanField] = useState(false);

    useEffect(() => {

    });

    useEffect(() => {
        setTime(setTimeout(() => {
            if (start) {
                const newField = fields;
                const id = fields.length - 1
                newField.shift();
                setActiveField(newField[0]);
                if (!newField.length) {
                    setGameOver(true)
                }
            }
        }, dataFetch.delay))
        return () => clearTimeout(time);
    }, [start, activeField, dificulty]);

    useEffect(() => {
        if (gameOver && click >= maxClick) {
            setMessage("You Win");
            endGame()
        } else if (gameOver && click < maxClick) {
            setMessage(`You missed ${maxClick - click}  blocks`);
            endGame()
        }
    }, [gameOver]);

    const handleInTime = () => {
        setClick(click => click + 1)
    };

    const gameBoard = (field, time) => {
        if (start){
            let total = [], rows = [];
            for (let i = 0; i <= field * field; i++) {
                if (i % field === 0) {
                    total.push(<tr key={i}>{rows}</tr>);
                    rows = []
                }
                rows.push(<td>
                    <Section
                        key={i}
                        id={i}
                        activeField={activeField}
                        time={time}
                        action={handleInTime}
                        dificulty={dificulty}
                        cleanField={cleanField}
                    /></td>)

            }
            return total
        }

    };

    return (
        <div className={"dashboard"}>
            <div>
                <table>
                    <tbody>
                    {gameBoard(dataFetch.field, dataFetch.delay)}
                    </tbody>
                </table>
            </div>
          <div>
              <Statistics start={start} username={username} gameOver={gameOver}/>
          </div>
        </div>
    );
};

export default Dashboard;