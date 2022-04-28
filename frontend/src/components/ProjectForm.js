import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        console.log(this.state)
        this.state = {projectName: '', repo: ''}
    }

    handleChange(event) {
        this.setState( {
            [event.target.name]: event.target.value }
        );
    }

    handleSubmit(event) {
        this.props.createProject(this.state.projectName, this.state.workers)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="name">Project name</label>
                    <input type="text" name="name" value={this.state.projectName} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="repo">repo</label>
                    <input type="text" name="repo" value={this.state.repo} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" value="Save" />
            </form>
        );
    }
}

export default ProjectForm