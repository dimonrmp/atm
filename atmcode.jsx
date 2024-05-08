const ATMDeposit = ({ onChange, isDeposit, isValid, deposit }) => {
    const choice = ['Deposit', 'Cash Back'];
    console.log(`ATM isDeposit: ${isDeposit}`);
    return (
        <label className="label huge">
            <h3> {choice[Number(!isDeposit)]}</h3>
            <input id="number-input" type="number" width="200" onChange={onChange} value={deposit == 0 ? "" : deposit}></input>
            {/* <input id="number-input" type="number" width="200" onChange={onChange} value={deposit}></input> */}
            <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
        </label>
    );
};

const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState("");
    const [validTransaction, setValidTransaction] = React.useState(false);

    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
        let deposit = Number(event.target.value);
        console.log(`handleChange ${deposit}`);
        if (deposit < 0) {
            setValidTransaction(false);
            return;
        }
        if (atmMode == "Cash Back" && deposit > totalState) {
            setDeposit(deposit);
            setValidTransaction(false);
            return;
        }
        setDeposit(deposit);
        setValidTransaction(true);
    };
    const handleSubmit = (event) => {
        let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
        setTotalState(newTotal);
        setValidTransaction(false);
        setDeposit(0);
        event.preventDefault();
    };

    const handleModeSelect = (event) => {
        let atmMode = event.target.value;
        if (atmMode == "Deposit") { setIsDeposit(true); }
        else if (atmMode == "Cash Back") { setIsDeposit(false); }
        setAtmMode(event.target.value);
        setDeposit(0);
    }

    return (

        <form onSubmit={handleSubmit}>
            <h2 id="total">{status}</h2>
            <label>Select an action below to continue</label>
            <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
                <option id="no-selection" value=""></option>
                <option id="deposit-selection" value="Deposit">Deposit</option>
                <option id="cashback-selection" value="Cash Back">Cash Back</option>
            </select>
            <div>
                {atmMode && <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction} deposit={deposit}></ATMDeposit>}
            </div>
        </form>
    );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'))