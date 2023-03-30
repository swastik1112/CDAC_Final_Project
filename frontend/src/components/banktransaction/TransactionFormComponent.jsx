import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class TransactionFormComponent extends Component {
  state = {
    receiverAccount: 0,
    description: "",
    transactionDate: "",
    amount: "",
    beneficiaries:[]
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount(){
    let token = sessionStorage.getItem("token");
    if(token === "undefined"|| token ==="" || token ==null){
      this.props.history.push("/login");
      return;
    }

    let accountId = sessionStorage.getItem("accountId");
    if(accountId==="undefined" || accountId==="" || accountId===null){
      toast.error("Please select an account before proceeding");
      this.props.history.push("/accounts");
      return;
    }

    let role = sessionStorage.getItem("role");

    const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };

    let newTransaction = {
      accountId
    }

      axios.post('http://localhost:8081/fetchmybeneficiaries',
      newTransaction
    ,{
      headers: headers
    })
    .then((response) => {
      console.log(response.data)
      this.setState({
        beneficiaries:response.data
      })
    })
    .catch((error) => {
      toast.error(" Unable to fetch beneficiaries ");
    });

  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { receiverAccount, description, transactionDate, amount } = this.state;

    // Do any validation or formatting of the data here
    let senderAccount = sessionStorage.getItem("accountId");
    if(receiverAccount===0){
      toast.error("please enter a valid account number");
      return;
    }
    let accountbalance = sessionStorage.getItem("accountbalance");

    if(amount < accountbalance){
      console.log("account balance" + accountbalance);
      console.log("amount "+ amount);
      toast.error("Please maintain sufficient balance before proceeding");
      return;
    }
    
    const newTransaction = {
      senderAccount,
      receiverAccount,
      description,
      transactionDate,
      amount,
    };

    let token = sessionStorage.getItem("token");
     let role = sessionStorage.getItem("role");
    const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };
    
    axios.post('http://localhost:8081/transact',
      newTransaction
    ,{
      headers: headers
    })
    .then((response) => {
      console.log("responses "+ JSON.stringify(response));
      if(response.data === ""){
      toast.error(" Transaction Cancelled ");  
      }else{
      toast.success(" Transaction Successful  " + response.data.bankTransactionId);
      sessionStorage.setItem("accountbalance",accountbalance-response.data.amount);
      }
    })
    .catch((error) => {
      toast.error(" Transaction Cancelled ");
    });

    this.props.history.push("/banktransaction");
  };

  render() {
        const { receiverAccount, description, transactionDate, amount, beneficiaries } = this.state;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Proceed with performing a transaction</h5>
              </div>
              <div className="card-body">
      <form onSubmit={this.handleSubmit}>

        <div className="form-group">
        <label htmlFor="receiverAccount">Receiver Account:</label>
        <select
          className="form-control"
          id="receiverAccount"
          name="receiverAccount"
          value={receiverAccount}
          onChange={this.handleInputChange}
          required
        >
          <option value="">Select Beneficiary Account</option>
          {beneficiaries.map((option) => (
      <option key={option.beneficiaryAccount.accountId} value={option.beneficiaryAccount.accountId}>
        {option.beneficiaryName} : {option.beneficiaryAccount.accountId}
      </option>
    ))}
        </select>
        
      </div>

        {/* <div className="form-group">
          <label htmlFor="receiverAccount">Receiver Account:</label>
          <input
            type="number"
            className="form-control"
            id="receiverAccount"
            name="receiverAccount"
            value={receiverAccount}
            onChange={this.handleInputChange}
            required
          />
        </div> */}

        <div className="form-group">
          <label htmlFor="date">Transaction Date:</label>
          <input
            type="date"
            className="form-control"
            id="transactionDate"
            name="transactionDate"
            value={transactionDate}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={amount}
            onChange={this.handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Transaction
        </button>
      </form>
      </div>
      </div>
      </div>
      </div>
      </div>
      
    );
  }
}

export default TransactionFormComponent;
