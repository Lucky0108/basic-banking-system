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
  const [receiverId, setReceiverId] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

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

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    axiosInstance.put(`/transfer/${sender._id}/${receiverId}`, { transferAmount })
      .then((res) => {
        setLoading(false)
        alert(res.data.message);
        // eslint-disable-next-line no-restricted-globals
        location.reload()
      })
      .catch((err) => {
        setLoading(false)
        alert(err)
        // eslint-disable-next-line no-restricted-globals
        location.reload()
      })
  }

  // Setting Sender Data For Modal on button click
  const setSenderData = (sender) => {
    setSender(sender);
  }

  const displayModal = () => {
    const { name, email, account_balance, account_number } = sender;

    const receiverList = customerList.filter((customer) => {
      return customer.name !== name;
    })

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
              <div className="row">
                <div className="col-3">
                  <p>Name: </p>
                </div>
                <div className="col-9">
                  <p>{name}</p>
                </div>
                <div className="col-3">
                  <p>Email: </p>
                </div>
                <div className="col-9">
                  <p>{email}</p>
                </div>
                <div className="col-3">
                  <p>Account Number: </p>
                </div>
                <div className="col-9">
                  <p>{account_number}</p>
                </div>
                <div className="col-3">
                  <p>Account Balance: </p>
                </div>
                <div className="col-9">
                  <p>₹ {account_balance}</p>
                </div>
                <div className="col-12">
                  <form onSubmit={onSubmit}>
                    <div className="form-group">
                      <label htmlFor="transferAmount">Enter Amount: (in Rs.) </label>
                      <input type="number" className="form-control" id="transferAmount" aria-describedby="transferAmount" value={transferAmount} onChange={(e) => { setTransferAmount(e.target.value) }} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="receiverSelect">Select Receiver:</label>
                      <select className="form-control" id="receiverSelect" onChange={(e) => { setReceiverId(e.target.value) }} required>
                        <option value="" selected disabled>Select Receiver</option>
                        {receiverList.map((receiver, index) => {
                          return (
                            <option key={index} value={receiver._id}>{receiver.name}</option>
                          )
                        })}
                      </select>
                    </div>
                    <button type="submit" className="btn btn-outline-success mt-2 w-100">Depsoit</button>
                  </form>
                </div>
              </div>
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
                          onClick={setSenderData.bind(this, customer)}
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
