import React, {useState, useEffect} from 'react';

import Employees from './components/employees';
import Birthday from './components/birthday';

import './styles/app.sass';

const App = () => {
	const [data, setData] = useState([]);

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
                data.map(item => item.checked = false);
				setData(data);
			});
    }, []);

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
    }

	return (
	<div className="App">
		<Employees
			data={data}
			checkedHandler={checkedHandler}
		/>
		<Birthday
            data={data}
		/>
	</div>
  );
}

export default App;
