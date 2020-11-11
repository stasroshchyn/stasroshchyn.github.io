import React from 'react';

const Employees = ({data, checkedHandler}) => {

    const createSections = () => {
        return(
            <div className='employees__sections'>
                {
                    alphabet.map(letter => {
                        const letterSection = data.filter(item => item.lastName[0] === letter);
                        return(
                            <div className='employees__section'>
                                <div className='employees__letter'>
                                    {letter}
                                </div>
                                <div className='employees__items'>
                                    {letterSection.length !== 0 ?
                                        letterSection.map(item => {
                                            return(
                                                <div className='employees__item'>
                                                    {item.lastName} {item.firstName}
                                                    <input
                                                        type="checkbox"
                                                        onClick={() => checkedHandler(item)}
                                                    ></input>
                                                </div>
                                            )
                                        }) :
                                        <div className='employees__item employees__item_empty'>-</div>
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        )
    }

    const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    return(
        <div className='employees'>
            <div className='employees__header'>
                Employees
            </div>
            {createSections()}
        </div>
    );
}

export default Employees;