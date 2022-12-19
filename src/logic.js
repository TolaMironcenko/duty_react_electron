export const equals = (transactions, valuetransactions) => {
    if (transactions.length !== valuetransactions.length) {
        return false
    }
    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i] !== valuetransactions[i]) {
            return false
        }
    }
    return true
}