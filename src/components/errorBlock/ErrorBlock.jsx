import React from 'react';

const ErrorBlock = ({children}) => {
    return (
        <span className={'text-sm text-red-600 -mt-2 block'}>{children}</span>
    );
};

export default ErrorBlock;