// Header komponenta u kojoj prikazujemo samo naslov sa linkom ka pocetnoj strani

import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <nav className='navbar navbar-expand-md navbar-light navbar-laravel'>
        <div className='container'>
            {/* Primetite kako se pravi hiperlink u reactu koriscenjem ove react-router-dom biblioteke*/}
            <Link className='navbar-brand' to='/'>Tasksman</Link>
        </div>
    </nav>
)
// Eksport promenljive Header
export default Header
