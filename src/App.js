import './css/App.css';
import Balance from "./components/Balance";
import {useState} from "react";
import TransactionModal from "./components/TransactionModal";
import Transaction from "./components/Transaction";

function App() {

    const [sum, setSum] = useState(0)
    const [transactions, setTransactions] = useState([12, 23, 234, 123, -123, -4, -2, -5])
    const [transactiontype, setTransactiontype] = useState('')
    const [activemodal, setActivemodal] = useState(false)

    const changeactivemodal = () => {
        activemodal ? setActivemodal(false) : setActivemodal(true)
    }

    return (
        <>
            <Balance balance={0} setTransactiontype={setTransactiontype} changeactivemodal={changeactivemodal}/>
            <div className="transactions">
                {
                    transactions.map((transaction, index) => {
                        return(
                            <Transaction
                                key={index}
                                sum={transaction}
                            />
                        )
                    })
                }
            </div>

            <TransactionModal active={activemodal} setActive={setActivemodal} type={transactiontype}/>
        </>
    );
}

export default App;
