
import React from 'react'

const Filter = ({condition, handleFiltering}) => {
    return(
      <form>
        <div>
          rajaa näytettäviä <input value={condition} onChange={handleFiltering}/>
        </div>
      </form>
    )
  }

export default Filter