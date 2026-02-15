import React from 'react'

function Card({children, className=''}) {
    return (
        <section className={`card ${className}`}>
            {children}
        </section>
    )
}


export default Card
