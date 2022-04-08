import React from 'react'
import './style.scss'

import { pagesStore } from '../../store/pages'
import { observer } from 'mobx-react'

function Top() {

  return (
    <div className='middle-top-container'>
        <div className='middle-top-title' style={{display:'flex',}}>
          {pagesStore.currentPage}
        </div>

        {/*  public something you want border  */}
        
    </div>
  )
}

export default observer(Top)
