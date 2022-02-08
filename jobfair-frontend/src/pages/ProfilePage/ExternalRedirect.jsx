import React, {useEffect} from 'react';

const ExternalRedirect = ({location}) => {

    return (
        <a onClick={(e) => {
            if (location !== undefined) {
                window.open(`${location}`, '_blank').focus();
            }
        }}>Certification link</a>
    );
};

export default ExternalRedirect;