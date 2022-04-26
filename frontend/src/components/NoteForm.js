import React from 'react'


class NoteForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            project: props.projects,
            users: props.users,
            text: ''
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
    }

    handleSubmit(event) {
        this.props.createNote(this.state.project, this.state.createdBy, this.state.text)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="project">project</label>
                    <select name="project"
                             onChange={(event) => this.handleChange(event)}>
                         {this.props.projects.map((project) => <option value={project.id}>{project.projectName}</option>)}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="user">user</label>
                    <input type="number" className="form-control" name="user" value={this.state.createdBy}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="text">text</label>
                    <input type="text" className="form-control" name="text" value={this.state.text}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }
}

export default NoteForm