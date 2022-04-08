import React, { ReactElement, useState } from 'react'
import { TransitioningView } from 'react-native-reanimated'
import {ScrollView } from 'react-native'
interface Props {
    a: number , 
    b: number, 

}

function test1({ a,  b }: Props): ReactElement {

    const [test, setTest] = useState(false)

    return (
        <div>
            
        </div>
    )
}

export default test1
