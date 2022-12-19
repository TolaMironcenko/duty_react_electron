import React from 'react';

const TransactionModal = ({active, setActive, type, children, sum, setSum, add_transaction, ...props}) => {
    return (
        <div
            className={!active ? "transaction-modal" : "transaction-modal active"}
            id={type}
            {...props}
        >
            <div className="transaction-modal-content">
                <button onClick={() => {setActive(false)}} className="exit">✖</button>
                <h3 className="transaction-modal-header">Sum</h3>
                <input
                    className="transaction-modal-input"
                    type="number"
                    min="0"
                    placeholder="100"
                    value={sum}
                    onChange={(e) => {setSum(parseFloat(e.target.value))}}
                />
                <button onClick={add_transaction} className="button modal">Add</button>
            </div>
        </div>
    );
};

export default TransactionModal;