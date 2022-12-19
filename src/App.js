import './css/App.css';
import Balance from "./components/Balance";
import {useEffect, useState} from "react";
import TransactionModal from "./components/TransactionModal";
import Transaction from "./components/Transaction";
import {equals} from "./logic";

function App() {

    const [sum, setSum] = useState('')
    const [transactions, setTransactions] = useState([])
    const [transactiontype, setTransactiontype] = useState('')
    const [activemodal, setActivemodal] = useState(false)
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        const interval = setInterval(async () => {
            await window.versions.get_balance().then(
                (value) => {
                    setBalance(value)
                }
            )
            await window.versions.get_transactions().then(
                (value) => {
                    if (value !== '') {
                        if (!equals(transactions, value.split('\n'))) {
                            setTransactions(value.split('\n'))
                        }
                    }
                }
            )
        }, 500)
        return () => clearInterval(interval);
        // eslint-disable-next-line
    }, [])

    const changeactivemodal = () => {
        activemodal ? setActivemodal(false) : setActivemodal(true)
    }

    const add_transaction = async () => {
        if (transactiontype === 'plus') {
            await window.versions.add_transaction(sum)
        } else if (transactiontype === 'minus') {
            await window.versions.add_transaction(0 - sum)
        }

        setSum('')
        setTransactiontype('')
        setActivemodal(false)
    }

    return (
        <>
            <Balance
                balance={balance}
                setTransactiontype={setTransactiontype}
                changeactivemodal={changeactivemodal}
            />

            <div className="transactions">
                {
                    transactions.map((transaction, index) => {
                        if (transaction !== '') {
                            return (
                                <Transaction
                                    key={index}
                                    sum={transaction}
                                />
                            )
                        } else {
                            return (
                                <></>
                            )
                        }
                    })
                }
            </div>

            <TransactionModal
                active={activemodal}
                setActive={setActivemodal}
                type={transactiontype}
                sum={sum}
                setSum={setSum}
                add_transaction={add_transaction}
            />
        </>
    );
}

export default App;
