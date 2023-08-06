import React, { useState, useEffect } from 'react'
import { View, Button, Text } from 'react-native'

const Timer = () => {
    const [display, setDisplay] = useState("00:45")
    const [totalTime] = useState(45)
    const [secsFromInitialStart, setSecsFromInitialStart] = useState(0)
    const [clock, setClock] = useState<any | null>()
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        if(Number(secsFromInitialStart) === Number(totalTime)) {
            pauseClockFn()
        }
    }, [secsFromInitialStart])

    const startTimerFn = () => {
        const start = new Date()

        let secsFromLastPaused = 0
        if(isPaused) {
            secsFromLastPaused += secsFromInitialStart
            setIsPaused(false)
        }
        setClock(setInterval(() => {
            let current
            current = Number(((new Date() - start) / 1000).toFixed())

            current += secsFromLastPaused

            setSecsFromInitialStart(current)
            current = totalTime - current
            let secs = (current % 60).toString().padStart(2, "0")
            setDisplay(`00:${secs}`)
        }, 1000))
    }
    const pauseClockFn = () => {
        setIsPaused(true)
        clearInterval(clock)
    }

    return (
        <View>
            <Text>{display}</Text>
            <Button onPress={startTimerFn} title="Start" />
            <Button onPress={pauseClockFn} title="Pause" />
        </View>
    )
}

export default Timer
