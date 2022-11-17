import {CSSProperties} from "vue";

/**
 *
 * @param style
 * @example
 *    {width:'100px',height:'100px} ==> 'width:100px;height100px'
 */
export function Style(style:CSSProperties) {
    let cssP = ''
    for (const key in style) {
        cssP= cssP + key +':' + style[key] +';'
    }
    return cssP
}


const middleStyle = {
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
}

const fullStyle = {
    width:'100%',
    height:'100%'
}

export {
    middleStyle,
    fullStyle
}
