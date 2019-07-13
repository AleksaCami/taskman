import axios from 'axios'
import React, { Component } from 'react'

class NewProject extends Component {
    // props - pokazuje vam da ocekuje neke propertije koji se prosledjuju kroz parent element kada renderujete komponentu u App.js-u
    // Primer:
                        // function Welcome(props) {
                        //     return <h1>Hello, {props.name}</h1>;
                        // }
                        //
                        // function App() {
                        //     return (
                        //         <div>
                        //             <Welcome name="Sara" />
                        //             <Welcome name="Cahal" />
                        //             <Welcome name="Edite" />
                        //         </div>
                        //     );
                        // }
    constructor (props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            errors: []
        }
        // Unutar konstruktora mozete da definisete metode koje ce koristiti podatke koje injectujete direktno u konstruktor
        this.handleFieldChange = this.handleFieldChange.bind(this)
        this.handleCreateNewProject = this.handleCreateNewProject.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderErrorFor = this.renderErrorFor.bind(this)
    }

    // Metoda koja se poziva svaki put kada se vrednost polja u formi za kreiranje novog projekta promeni
    // Na osnovu tih promena se apdejtuju state promenljive name i description
    // Metodu dodeljujemo onChange eventu na svakom input polju
    handleFieldChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    // Poziva se posle submitovanja forme. Prosledjuje objekat project koji sadrzi trenutni state name i description
    // Zatim ih preko axios post poziva prosledjuje u bazu
    handleCreateNewProject (event) {
        event.preventDefault()

        const { history } = this.props

        const project = {
            name: this.state.name,
            description: this.state.description
        }

        axios.post('/api/projects', project)
            .then(response => {
                // redirect to the homepage
                history.push('/')
            })
            .catch(error => {
                this.setState({
                    errors: error.response.data.errors
                })
            })
    }

    // Proverava da li dato polje sadrzi gresku i vratice true ili false u odnosu na to da li postoji greska ili ne
    hasErrorFor (field) {
        return !!this.state.errors[field]
    }

    // Renderuje gresku za to polje gde je greska pronadjena
    renderErrorFor (field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    render () {
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-6'>
                        <div className='card'>
                            <div className='card-header'>Create new project</div>
                            <div className='card-body'>
                                <form onSubmit={this.handleCreateNewProject}>
                                    <div className='form-group'>
                                        <label htmlFor='name'>Project name</label>
                                        <input
                                            id='name'
                                            type='text'
                                            className={`form-control ${this.hasErrorFor('name') ? 'is-invalid' : ''}`}
                                            name='name'
                                            value={this.state.name}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('name')}
                                    </div>
                                    <div className='form-group'>
                                        <label htmlFor='description'>Project description</label>
                                        <textarea
                                            id='description'
                                            className={`form-control ${this.hasErrorFor('description') ? 'is-invalid' : ''}`}
                                            name='description'
                                            rows='10'
                                            value={this.state.description}
                                            onChange={this.handleFieldChange}
                                        />
                                        {this.renderErrorFor('description')}
                                    </div>
                                    <button className='btn btn-primary'>Create</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewProject
