import React from 'react'
import {useParams} from 'react-router-dom'

const ProjectNoteList = () => {
    console.log(useParams)
    let { id } = useParams();
    return (
        <div>
            <p>ID - {id}</p>
        </div>
    )
}

export default ProjectNoteList;