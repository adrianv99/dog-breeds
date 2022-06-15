const Option = ({ option, handleClickOption }) => (
    <button 
        className="btn-option" 
        onClick={() => handleClickOption(option)}
    >
        { option.breed }
    </button>
)

export default Option