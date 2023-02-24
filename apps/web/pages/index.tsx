import { useEffect } from 'react'
import { fn } from 'shared'

export default function Web() {
    const mirror = () => fn.mirror(1).then(console.log)

    return (
        <div>
            <h1>Web</h1>
            <button onClick={mirror}>Mirror</button>
        </div>
    )
}
