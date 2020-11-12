import React from 'react';

import {months} from '../consts';

const Birthday = ({checkedData}) => {

    const parseDate = (date) => {
        const parsedDate = Date.parse(date),
              newDate = new Date(parsedDate),
              day = newDate.getDate(),
              month = newDate.getMonth(),
              year = newDate.getFullYear();

        return (`${day} ${months[month]}, ${year} year`);
    }

    return (
        <div className="birthday">
            <div className='birthday__header'>
                Employees birthday
            </div>
            <div className="birthday__sections">
                {checkedData.length === 0 ?
                    <div>No selected employees</div> :
                    months.map((curVal, index) => {
                        const monthSection = checkedData.filter(date => new Date(Date.parse(date.dob)).getMonth() === index);
                        return(
                            <div key={curVal}>
                                {monthSection.length !== 0 ? 
                                    <div className="birthday__section">
                                        <div className='birthday__month'>
                                            {months[index]}
                                        </div>
                                        <ul className='birthday__items'>
                                            {monthSection.map(item => {
                                                return(
                                                    <div className='birthday__item' key={item.id}>
                                                        {item.lastName} {item.firstName} - {parseDate(item.dob)}
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div> :
                                    null
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Birthday;