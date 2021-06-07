import React from 'react'

export default function Square(props) {
    return (
        <div style={{backgroundColor:props.color}} className="Square">
            <div onClick={(e) => props.clickFunction(e,props.x,props.y)} style={{
                height:'100%',
                width:'100%',
                backgroundImage:`url(${props.piece + ".png"})`,
                backgroundSize:'100%'
            }}>
                
            </div>
        </div>
    )
}
