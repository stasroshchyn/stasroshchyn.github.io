import React from 'react';

const Birthday = ({data}) => {

    const dates = data.filter(item => item.checked === true).sort((a, b) => {
        const nameA = new Date(Date.parse(a.dob)).getMonth(),
            nameB = new Date(Date.parse(b.dob)).getMonth();
        if (nameA < nameB) {
            return -1;
        } else if (nameA > nameB) {
            return 1;
        } else {
            return 0;
        }
    });

    const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

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
                {dates.length === 0 ?
                    <div>No selected employees</div> :
                    months.map((curVal, index) => {
                        const monthSection = dates.filter(date => new Date(Date.parse(date.dob)).getMonth() === index);
                        return(
                            <>
                                {monthSection.length !== 0 ? 
                                    <div className="birthday__section">
                                        <div className='birthday__month'>
                                            {months[index]}
                                        </div>
                                        <ul className='birthday__items'>
                                            {monthSection.map(item => {
                                                return(
                                                    <div className='birthday__item'>
                                                        {item.lastName} {item.firstName} - {parseDate(item.dob)}
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </div> :
                                    null
                                }
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Birthday;