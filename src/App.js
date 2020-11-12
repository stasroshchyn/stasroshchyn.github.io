import React, {useState, useEffect} from 'react';

import Employees from './components/Employees';
import Birthday from './components/Birthday';

import './styles/app.sass';

const App = () => {
    const [data, setData] = useState([]);
    const [checkedData, setCheckedData] = useState([]);

    useEffect(() => {
        fetch('https://yalantis-react-school-api.yalantis.com/api/task0/users')
            .then(data => data.json())
            .then(data => {
                data.sort((a, b) => {
                    const nameA = a.lastName.toLowerCase(),
                          nameB = b.lastName.toLowerCase();
                    if (nameA < nameB) {
                        return -1;
                    } else if (nameA > nameB) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

                const parsedStorageData = JSON.parse(localStorage.getItem('checkedData'));

                if (parsedStorageData) {
                    setCheckedData(parsedStorageData);

                    const newData = data.map(dataItem => {
                        const indexData = parsedStorageData.find(parsedStorageDataItem => parsedStorageDataItem.id === dataItem.id);
                        if (indexData) {
                            return {...dataItem, checked: true}
                        } else {
                            return {...dataItem}
                        }
                    });
                    setData(newData);
                } else {
                    setData(data);
                }
			});
    }, []);

    const checkedArray = (newData) => {
        return newData.filter(item => item.checked === true).sort((a, b) => {
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
    }

    const checkedHandler = (item) => {
        const newData = data.map(dataItem => {
            if (dataItem.id === item.id) {
                return {...dataItem, checked: !dataItem.checked}
            } else if (dataItem.checked) {
                return {...dataItem};
            } else {
                return {...dataItem, checked: false};
            }
        });
        setData(newData);

        const dates = checkedArray(newData);
        setCheckedData(dates);

        localStorage.setItem('checkedData', JSON.stringify(dates));
    }

	return (
	<div className="App">
		<Employees
			data={data}
			checkedHandler={checkedHandler}
		/>
		<Birthday
            checkedData={checkedData}
		/>
	</div>
  );
}

export default App;
