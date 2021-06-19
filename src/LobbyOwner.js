import React from 'react'

export default function LobbyOwner(props) {
    return (
        <div id="lobbyOwner">
                <h2>your name: {props.name}</h2>
                <h3>Invite a friend!</h3>
                <input id="url" type="text" value={props.url+"/" + props.gameId}/><br/>
                <button id="startGame" onClick={props.startGame}>Start Game!</button> <br/>
                Opponent: {props.otherPlayerName}
            </div>
    )
}
