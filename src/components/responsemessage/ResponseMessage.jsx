import React from 'react';

const ResponseMessage = ({children}) => {
    return (
        <p className={'w-full text-center absolute top-1/2 -translate-y-1/2 left-0 z-10 px-4'}>
            {children}
        </p>
    );
};

export default ResponseMessage;