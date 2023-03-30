import React, { Component } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import NavbarComponent from "../common/NavbarComponent";

class ListAccountsComponent extends Component {
 
  constructor(props){
    super(props);
    this.state = {
        transactions: [ ],
        role: sessionStorage.getItem("role")
      };
  }

  componentDidMount(){
     let token = sessionStorage.getItem("token");
     let role = sessionStorage.getItem("role");
     let email = sessionStorage.getItem("email");

    if(token === "undefined"|| token ==="" || token ==null){
      this.props.history.push("/login");
    }

     const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };

      if(role === "manager"){
       axios.get('http://localhost:8081/getallaccounts',{
        headers: headers
        })
      .then((response) => {
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
      }else
      {
    axios.post('http://localhost:8081/getmyaccounts',{
      "email":email
        },{
        headers: headers
        })
      .then((response) => {
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
    } //else
  }

    handleAddTransaction = () => {
    this.props.history.push("/addaccount");
  }

  updateAccountStatus(targetvalue,accountId){

    console.log("target value "+ targetvalue);
    console.log("accountId value "+ accountId);

     let token = sessionStorage.getItem("token");
     let role = sessionStorage.getItem("role");
     const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };


     axios.post('http://localhost:8081/updateaccount',{
      "status":targetvalue,
      accountId
        },{
        headers: headers
        })
      .then((response) => {
        toast.success(" Account Updated Successfully  " + response.data);
        this.props.history.push("/accounts");
      })
      .catch((error) => {
        toast.error(" Account Updated failed ");
        if (error instanceof axios.AxiosError) {
          console.log(" need to renew the token ");
          this.props.history.push("/");
        } else {
        console.log("errors are : "+ error)
        }
      });
  }

  handleSelectTransaction = (accountId,accounttype,balance) => {
    sessionStorage.setItem("accountId",accountId);
    sessionStorage.setItem("accounttype",accounttype);
    sessionStorage.setItem("accountbalance",balance);
    this.props.history.push("/homepage")
  }


 render() {
  const { transactions } = this.state;

  return (
    <div className="displayflex">
      {/* <div className="row">
        <div className="col-lg-12"> */}
        <NavbarComponent/>
          <div className="card displatinlineblock">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">My Bank Accounts</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  onClick={this.handleAddTransaction}
                >
                  Apply for Account
                </button>
              </div>
              <table className="table table-hover table-striped">
                <thead>
                  <tr>
                    <th>User email</th>
                    <th>AccountId</th>
                    <th>AccountType</th>
                    <th>Balance</th>
                    <th>Action</th>
                    <th>Account Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>{transaction.user.email}</td>
                      <td>{transaction.accountId}</td>
                      <td>{transaction.accounttype}</td>
                      <td>{transaction.balance}</td>
                      <td>
                        {transaction.status==="approved"?
                        <button className="btn btn-sm btn-primary"
                          onClick={() => this.handleSelectTransaction(transaction.accountId,transaction.accounttype,transaction.balance)}
                        >Select</button>
                        :
                        <button className="btn btn-sm btn-primary" disabled>Select</button>
                        }
                        {this.state.role==="manager"?
                        transaction.status==="pending" ? 
                          <> <button className='btn btn-sm btn-success' value="approved" onClick={(e) => this.updateAccountStatus(e.target.value,transaction.accountId)}>Approve</button> 
                          <button className='btn btn-sm btn-danger' value="declined" onClick={(e) => this.updateAccountStatus(e.target.value,transaction.accountId)}>Decline</button> </>
                        :''
                        :''
                      }
                      </td>
                      <td>{transaction.status==="approved" ? <button className='btn btn-sm btn-success'>Approved</button>
                      : transaction.status==="pending" ? <button className='btn btn-sm btn-warning'>Pending</button> 
                      : transaction.status==="declined" ? <button className='btn btn-sm btn-danger'>Declined</button> 
                      : <button className='btn btn-sm btn-warning'>No Update</button> 
                    }</td>
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

export default ListAccountsComponent;
