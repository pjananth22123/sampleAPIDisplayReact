import React from 'react';

function ExpandableComponent(props) {
    const {data} = props; 
    return (
        <p>
        {data.subscriber_id}
    </p>
    );
}

export default ExpandableComponent;
