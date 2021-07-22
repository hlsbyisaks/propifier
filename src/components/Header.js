import PropTypes from 'prop-types'
import Button from './Button'
import { FaTrademark } from 'react-icons/fa'


const Header = ({ onAdd, showAdd, onDataSet, showDataSet }) => {
    return (
        <header className='header'>
            <div className='logo'></div>
            <div>
                <Button 
                color={showDataSet ? '#aa5763' : '#5886ac'} 
                text={showDataSet ? 'Stäng' : 'Dataset'} 
                onClick={ onDataSet } />
                <Button 
                color={showAdd ? '#aa5763' : '#5886ac'} 
                text={showAdd ? 'Stäng' : 'Lägg till'} 
                onClick={ onAdd } />
            </div>
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
