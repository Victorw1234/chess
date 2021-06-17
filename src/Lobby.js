import React,{useEffect,useState} from 'react'
import cryptoRandomString from 'crypto-random-string';
import { HubConnectionBuilder } from '@microsoft/signalr';
import ChessBoard from './ChessBoard';
export default function Lobby(props) {

    
    var url = "localhost:3000"
    const [formSent,setFormSent] = useState(false)
    const [name,setName] = useState('')
    const [otherPlayerName,setOtherPlayerName] = useState(null)
    const [connection,setConnection] = useState(null)
    const [gameId,setGameId] = useState(null)
    const [gameStarted,setGameStarted] = useState(false)
    const [color,setColor] = useState('w')


    useEffect(() => {
        if (props.match.params.id === undefined) {
            setGameId(cryptoRandomString({length : 10}))
        }
        else {
            setGameId(props.match.params.id)
        }

        const newConnection = new HubConnectionBuilder()
        .withUrl('http://localhost:60232/hubs/chess')
        .withAutomaticReconnect()
        .build();


        setConnection(newConnection);
    },[]);

    useEffect(() => {
        if (connection) {
            connection.start()
            .then(result => {
                console.log("Connected!");

                connection.on("joined",message => {
                    setOtherPlayerName(message)
                })

                connection.on("gameStarted",message => {
                    if (message) {
                        setColor('b')
                        setGameStarted(true)
                    }
                })



            })
            .catch(e => console.log("connection failed"))
        }
    },[connection])

    function nameInputField(e) {
        setName(e.target.value)
    }
    
    async function sendForm(e) {
        console.log(connection)
        if (connection) {

            setFormSent(true)
            if (props.match.params.id === undefined) {
                console.log("Invoking poop")
                console.log(await connection.invoke("JoinRoom",name,gameId))
            }
            else {
                console.log(await connection.invoke("JoinRoom",name,gameId))
            }
 
        }
        
    }

    async function startGame(e) {
        if (otherPlayerName !== null) {
            if (connection) {
                await connection.invoke("StartGame",gameId)
                await connection.stop();
                setGameStarted(true);

            }
        }
    }

    return (

        gameStarted === true ? <ChessBoard connection={connection}
                                           gameId={gameId}
                                           name={name}
                                           otherPlayerName={otherPlayerName}
                                           color={color}/> :
        formSent === false ? 
        <div>
            <span>enter name:</span>
            <input value={name} onChange={nameInputField} type="text">

            </input>
            <input type="submit" onClick={sendForm} value="enter"/>
        </div>
        :
            props.match.params.id === undefined ? 
            <div>
                your name: {name} <br/>
                Invite a friend! {url}/{gameId} <br/>
                <button onClick={startGame}>Start Game!</button> <br/>
                Opponent: {otherPlayerName}
            </div>
            
            :
            <div>
                Waiting for the game to start!
            </div>


    )
}
