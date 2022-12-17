import React from 'react';

const Balance = ({changeactivemodal, balance, children, setTransactiontype, ...props}) => {
    return (
        <div className="balance" {...props}>
            <div className="balance-block">
                <h1 className="header-balance">{balance}</h1>
                <div className="header-buttons">
                    <button onClick={() => {setTransactiontype('plus'); changeactivemodal()}} className="button plus">+</button>
                    <button onClick={() => {setTransactiontype('minus'); changeactivemodal()}} className="button minus">-</button>
                </div>
            </div>
        </div>
    );
};

export default Balance;