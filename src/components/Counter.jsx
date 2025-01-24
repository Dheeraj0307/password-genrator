import React, { useState } from 'react'

const Query = () => {

    const [counter, setCouner] = useState(0);

    const add = () => {
        if (counter < 20) setCouner(counter + 1)
    }

    const sub = () => {
        if (counter > 0) setCouner(counter - 1)
    }

    const mul = () => {
        if (counter * 2 <= 20) setCouner(counter * 2)
    }
    const div = () => {

        if (counter / 2 > 1) setCouner(counter / 2)
    }

    return (
        <div>
            {parseFloat(counter.toPrecision(2))}
            <h2>counter</h2>

            <button disabled={counter < 1} onClick={sub}>Sub</button>

            <button disabled={counter === 20} onClick={add}>Add</button>

            <button disabled={counter * 2 > 20} onClick={mul}>mul</button>

            <button onClick={div}>div</button>

        </div>
    )
}