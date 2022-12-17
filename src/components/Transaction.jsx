import React from 'react';

const Transaction = ({sum, children, ...props}) => {
    return (
        <div className={sum > 0 ? 'transaction plus' : 'transaction minus'} {...props}>
            <p className={'sum'}>{sum > 0 ? '+' + sum : sum}</p>
        </div>
    );
};

export default Transaction;