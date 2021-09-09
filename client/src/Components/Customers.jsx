import React, { useEffect, useState } from 'react'
import axiosInstance from '../helpers/axios'
import loadingGif from '../img/loading-gif.gif';

/**
* @author 
* @function Customer
**/

const Customer = (props) => {

  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [sender, setSender] = useState([]);

  const loadCustomerList = () => {
    setLoading(true)
    axiosInstance.get('/customers')
      .then((res) => {
        setLoading(false)
        setCustomerList(res.data.customerList);
      })
      .catch((err) => {
        setLoading(false)
        setErrorMessage(err.response.data.error);
      })
  }

  const setSenderData = (sender) => {
    setSender(sender);
  }

  const displayModal = () => {
    const { name, email, account_balance, account_number } = sender;
    return (
      <div className="modal fade" id="transactionModal" tabIndex="-1" aria-labelledby="transactionModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="transactionModalLabel">Transaction Process</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {account_balance}
          </div>
        </div>
      </div>
    </div>
    )
  }

  useEffect(() => {
    loadCustomerList();
  }, [])

  return (
    <>
      <section className="customers-view-section">
        {displayModal()}
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
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">E-Mail</th>
                  <th scope="col">Account Number</th>
                  <th scope="col">Account Balance</th>
                  <th scope="col">Process Option</th>
                </tr>
              </thead>
              <tbody>
                {customerList.map((customer, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.account_number}</td>
                      <td>₹ {customer.account_balance}</td>
                      <td style={{ textAlign: "center" }}>
                        <button 
                          type="button" 
                          className="btn btn-outline-primary" 
                          data-toggle="modal" 
                          data-target="#transactionModal" 
                          onClick={setSenderData.bind(this,customer)}
                        >
                          Transfer
                        </button>
                      </td>
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

export default Customer
