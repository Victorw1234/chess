import React from 'react'

export default function NameInput(props) {

    function nameInputField(e) {
        props.setName(e.target.value)
    }

    async function sendForm(e) {
        console.log(props.connection)
        if (props.connection) {
            props.setFormSent(true)
            console.log(await props.connection.invoke("JoinRoom",props.name,props.gameId))
        }
    }
    

    return (
        <div id="nameInput">
            <h2>Enter name:</h2>
            <input value={props.name} onChange={nameInputField} type="text">

            </input>
            <input type="submit" onClick={sendForm} value="Enter"/>
        </div>
    )
}
