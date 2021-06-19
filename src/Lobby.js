import React,{useEffect,useState} from 'react'
import cryptoRandomString from 'crypto-random-string';
import LobbyOwner from './LobbyOwner';
import { HubConnectionBuilder } from '@microsoft/signalr';
import LobbyWaiting from './LobbyWaiting';
import ChessBoard from './ChessBoard';
import NameInput from './NameInput';
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
        // if url parameters are empty, u create a game id
        // if u have url parameters, you are expected to join that game
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
    },[props.match.params.id]);

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
        <NameInput setName={setName}
                   connection={connection}
                   setFormSent={setFormSent}
                   name={name}
                   urlParameters={props.match.params}
                   gameId={gameId}/>
        :
            props.match.params.id === undefined ? 
            <LobbyOwner name={name}
                        url={url}
                        gameId={gameId}
                        startGame={startGame}
                        otherPlayerName={otherPlayerName}
                        />
            :
            <LobbyWaiting/>


    )
}
