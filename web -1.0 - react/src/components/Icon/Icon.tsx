import React, { CSSProperties } from 'react'

interface IconProps {
    logoName?: string
    logoStyle?: CSSProperties
}

export default function Icon(props: IconProps) {
    const { logoStyle, logoName } = props

    return (

        <i
            className={'icofont-' + logoName}
            style={{ ...logoStyle }} >

        </i>

    )
}
