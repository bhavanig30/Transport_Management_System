import React, { useState } from "react";
import "./Transaction Details.css";

const TransactionDetails = () => {
    const [transactionData, setTransactionData] = useState({
        transactionId: "",
        accountNumber: "",
        amount: "",
        transactionType: "Credit",
        transactionDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTransactionData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Transaction Details:", transactionData);
        alert("Transaction submitted successfully!");
    };

    return (
        <div className="trans-form-container">
            <header className="trans-header">National Engineering College</header>
            <form className="trans-form" onSubmit={handleSubmit}>
                <h2 className="trans-title"> Transaction Details</h2>

                <div className="trans-form-group">
                    <label>Transaction ID</label>
                    <input
                        type="text"
                        name="transactionId"
                        value={transactionData.transactionId}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="trans-form-group">
                    <label>Account Number</label>
                    <input
                        type="text"
                        name="accountNumber"
                        value={transactionData.accountNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="trans-form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={transactionData.amount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="trans-form-group">
                    <label>Transaction Type</label>
                    <select
                        name="transactionType"
                        value={transactionData.transactionType}
                        onChange={handleChange}
                    >
                        <option value="Credit">Credit</option>
                        <option value="Debit">Debit</option>
                    </select>
                </div>

                <div className="trans-form-group">
                    <label>Transaction Date</label>
                    <input
                        type="date"
                        name="transactionDate"
                        value={transactionData.transactionDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="trans-submit-button">
                    Submit 
                </button>
            </form>
        </div>
    );
};

export default TransactionDetails;
