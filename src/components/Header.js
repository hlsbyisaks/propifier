import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({ title, onAdd, showAdd, onStats, showStats }) => {
    return (
        <header className='header'>
            <h1 className='font-effect-anaglyph'>
                <div class="material-icons">model_training</div>
                {title}
            </h1>
            {/* <Button 
            color={showStats ? 'red' : '#005ca9'} 
            text={showStats ? 'Close' : 'Stats'} 
            onClick={onStats} /> */}
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

// CSS in JS
/* const headingStyle = {
    color: 'red',
    backgroundColor: 'black'
} */

export default Header
