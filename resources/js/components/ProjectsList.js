// Komponenta u kojoj izlistavamo sve projekte

// axios - biblioteka koja mnogo olaksava komunikaciju sa bazom, get, put, delete, post requestovi
// Vraca promise!!!
import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ProjectsList extends Component {
    constructor () {
        // super() - JS govno koje morate da pozovete jer se referencira na parent constructor, u ovom slucaju na Component constructor
        // Ako ga ne pozovete, nece vam dozvoliti da koristite this unutar konstruktora
        super()
        // inicijalizujemo trenutno stanje podataka sa kojima zelimo da radimo unutar komponente
        this.state = {
            projects: []
        }
    }

    // Default React metoda, pokrece se odmah nakon sto se komponenta inicijalizuje
    // Nalik document.ready u vanilla JS
    componentDidMount () {
        axios.get('/api/projects').then(response => {
            this.setState({
                projects: response.data
            })
        })
    }

    render () {
        const { projects } = this.state
        return (
            <div className='container py-4'>
                <div className='row justify-content-center'>
                    <div className='col-md-8'>
                        <div className='card'>
                            <div className='card-header'>All projects</div>
                            <div className='card-body'>
                                <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                                    Create new project
                                </Link>
                                <ul className='list-group list-group-flush'>
                                    {/*Mapiranje svih projekata iz trenutnog state-a u promenljivu iz koje moze da se ispise sadrzaj svakog kroz kao kroz for petlju*/}
                                    {projects.map(project => (
                                        <Link className='list-group-item list-group-item-action d-flex justify-content-between align-items-center' to={`/${project.id}`} key={project.id}>
                                            {project.name}
                                            <span className='badge badge-primary badge-pill'>
                                                {/* Ne obracajte paznju na ovo, moram da sredim, ne ispisuje mi kolicinu taskova unutar projekta*/}
                                                {project.id}
                                            </span>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectsList
