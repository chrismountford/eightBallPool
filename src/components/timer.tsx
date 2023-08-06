import React, { useState, useEffect } from 'react'
import { View, Button, Text } from 'react-native'

const Timer = () => {
    const [display, setDisplay] = useState("00:45")
    const [totalTime, setTotalTime] = useState(45)
    let [secsFromInitialStart, setSecsFromInitialStart] = useState(0)
    const [clock, setClock] = useState<any | null>()
    const [isPaused, setIsPaused] = useState(false)
    const [redExt, setRedExt] = useState(false)
    const [yellowExt, setYellowExt] = useState(false)

    useEffect(() => {
        if(Number(secsFromInitialStart) === Number(totalTime)) {
            stopClockFn()
        }
    }, [secsFromInitialStart])

    const startClockFn = () => {
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

            if(redExt) {
                current += 15
            }

            let secs = (current % 60).toString().padStart(2, "0")
            setDisplay(`00:${secs}`)
        }, 1000))
    }

    const pauseClockFn = () => {
        setIsPaused(true)
        clearInterval(clock)
    }

    const stopClockFn = () => {
        clearInterval(clock)
    }

    const extensionCalled = (colour: string) => {
        if(colour === 'red' && !redExt) {
            console.log('Red ext called')
            setRedExt(true)
        }
        else if(colour === 'yellow' && !yellowExt){ 
            console.log('Yellow ext called')
            setYellowExt(true)
        }

        clearInterval(clock)
        startClockFn()
    }

    return (
        <View>
            <Text>{display}</Text>
            <Button onPress={() => {startClockFn()}} title="Start" />
            <Button onPress={pauseClockFn} title="Pause" />
            <Button onPress={() => extensionCalled('red')} title="Red Ext" />
            <Button onPress={() => extensionCalled('yellow')} title="Yellow Ext" />
        </View>
    )
}

export default Timer
