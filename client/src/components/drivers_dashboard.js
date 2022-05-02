import React from 'react';
import {useLocation} from 'react-router-dom'
function Dashboard(props) {
    const location = useLocation();
    return (
        <div>
            Hello {location.state.first_name}
            {console.log(location.state.first_name)}
        </div>
        
    );
}

export default Dashboard;