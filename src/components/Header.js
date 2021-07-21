import PropTypes from 'prop-types'
import Button from './Button'
import { FaTrademark } from 'react-icons/fa'


const Header = ({ title, onAdd, showAdd, onStats, showStats }) => {
    return (
        <header className='header'>
            <div className='logo'></div>
            {/* <h1 className='font-effect-anaglyph'>
                <div class="material-icons">model_training</div>
                {title}
                <FaTrademark className='tm'></FaTrademark>  
            </h1> */}
            <Button 
            color={showAdd ? '#aa5763' : '#5886ac'} 
            text={showAdd ? 'Stäng' : 'Lägg till'} 
            onClick={ onAdd } />
        </header>
    )
}

Header.defaultProps = {
    title: 'Propifier'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
