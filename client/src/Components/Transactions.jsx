import React, { useState, useEffect } from 'react'
import axiosInstance from '../helpers/axios'
import loadingGif from '../img/loading-gif.gif';

/**
* @author
* @function Transactions
**/

const Transactions = (props) => {

  const [loading, setLoading] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  const loadTransactionHistory = () => {
    setLoading(true)
    axiosInstance.get('/transactions')
      .then((res) => {
        setLoading(false)
        setTransactionHistory(res.data.transactionHistory);
      })
      .catch((err) => {
        setLoading(false)
        setErrorMessage(err.response.data.error);
      })
  }

  useEffect(() => {
    loadTransactionHistory();
  }, [])

  return (
    <>
      <section className="transactions-view-section">
        {loading ?
          <>
            <div className="loading-table" style={{ textAlign: "center" }}>
              <img src={loadingGif} alt="Loading" />
            </div>
          </>
          :
          errorMessage ? errorMessage :
            <table className="table table-responsive-lg table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">S.No.</th>
                  <th scope="col">Sender Name</th>
                  <th scope="col">Receiver Name</th>
                  <th scope="col">Transaction Amount</th>
                  <th scope="col">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{transaction.sender_name}</td>
                      <td>{transaction.receiver_name}</td>
                      <td>₹{transaction.transaction_amount}</td>
                      <td>{transaction.date}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
        }
      </section>
    </>
  )
}

export default Transactions
