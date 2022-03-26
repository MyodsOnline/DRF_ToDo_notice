import React from 'react'
import {useParams} from 'react-router-dom'

const ProjectNoteList = ({notes}) => {
    let { uid } = useParams();
    console.log('yes')
    return (
        <div>
            <p>ID - {uid}</p>
        </div>
    )
}

export default ProjectNoteList;