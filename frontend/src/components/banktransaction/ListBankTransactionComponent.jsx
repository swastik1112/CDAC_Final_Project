import React, { Component } from 'react';
import axios from "axios";
import NavbarComponent from "../common/NavbarComponent";
import { toast } from "react-toastify";

class ListBankTransactionComponent extends Component {
 
   constructor(props){
    super(props);
    this.state = {
    transactions: [],
    };
  }

  handleAddTransaction = () => {
    this.props.history.push("/addtransaction");
  }

   componentDidMount(){
     let token = sessionStorage.getItem("token");
    if(token === "undefined"|| token ==="" || token ==null){
      this.props.history.push("/login");
    }

    let accountId = sessionStorage.getItem("accountId");
    if(accountId==="undefined" || accountId==="" || accountId===null){
      toast.error("Please select an account before proceeding");
      this.props.history.push("/accounts");
    }

     let role = sessionStorage.getItem("role");

     const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };

      if(role==="manager"){
    axios.get('http://localhost:8081/getalltransactions',{
    headers: headers
    })
  .then((response) => {
    console.log(response);
    console.log(response.status);
    this.setState({ transactions: response.data});
  })
  .catch((error) => {
    if (error instanceof axios.AxiosError) {
      console.log(" need to renew the token ");
      this.props.history.push("/");
    } else {
    console.log("errors are : "+ error)
    }
  });
      } else
      {

      axios.post('http://localhost:8081/getmytransactions',{
          "accountId": accountId
        },{
        headers: headers
        })
      .then((response) => {
        console.log(response);
        console.log(response.status);
        this.setState({ transactions: response.data});
      })
      .catch((error) => {
        if (error instanceof axios.AxiosError) {
          console.log(" need to renew the token ");
          this.props.history.push("/");
        } else {
        console.log("errors are : "+ error)
        }
      });
    }
  }

   render() {
    const { transactions } = this.state;

    return (
      <div className="displayflex">
        {/* <div className="row">
          <div className="col-lg-12"> */}
          <NavbarComponent/>
            <div className="card displayinlineblock">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Bank Transactions</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleAddTransaction}
                  >
                    Perform Transaction
                  </button>
                </div>
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>Bank Transaction Id</th>
                      <th>Sender Account</th>
                      <th>Receiver Account</th>
                      <th>Transaction Date</th>
                      <th>Amount</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.bankTransactionId}</td>
                        <td>{transaction.senderAccount.user.email}</td>
                        <td>{transaction.receiverAccount.user.email}</td>
                        <td>{transaction.transactionDate}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      //   </div>
      // </div>
    );
  }
}

export default ListBankTransactionComponent;
