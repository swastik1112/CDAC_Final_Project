import React, { Component } from 'react';
import NavbarComponent from "../common/NavbarComponent";
import axios  from 'axios';
import { toast } from "react-toastify";

class LoanList extends Component {
   constructor(props){
    super(props);
    this.state = {
    transactions: [],
    role : sessionStorage.getItem("role")
    };
  }

   componentDidMount(){
     let token = sessionStorage.getItem("token");
    
    if(token === "undefined"|| token ==="" || token ==null){
      this.props.history.push("/login");
    }

     let role = sessionStorage.getItem("role");
     let accountId = sessionStorage.getItem("accountId");
     const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };

      if(role==="manager"){
    axios.get('http://localhost:8081/getallloans',{
    headers: headers
    })
  .then((response) => {
    console.log(response);
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
      }else{

let accountId = sessionStorage.getItem("accountId");
    if(accountId==="undefined" || accountId==="" || accountId===null){
      toast.error("Please select an account before proceeding");
      this.props.history.push("/accounts");
    }
  axios.post('http://localhost:8081/getmyloans',{
  "accountId":accountId
  },{
    headers: headers
    })
  .then((response) => {
    console.log(response);
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

    updateLoanStatus(targetvalue,loanId){

    console.log("target value "+ targetvalue);
    console.log("loanId value "+ loanId);

     let token = sessionStorage.getItem("token");
     let role = sessionStorage.getItem("role");
     const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };


     axios.post('http://localhost:8081/updateloan',{
      "status":targetvalue,
      loanId
        },{
        headers: headers
        })
      .then((response) => {
        toast.success(" Loan Updated Successfully  " + response.data);
        this.props.history.push("/loan");
      })
      .catch((error) => {
        toast.error(" Loan Updated failed ");
        if (error instanceof axios.AxiosError) {
          console.log(" need to renew the token ");
          this.props.history.push("/");
        } else {
        console.log("errors are : "+ error)
        }
      });
  }


    handleAddTransaction = () => {
    this.props.history.push("/addloan");
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
                <h5 className="mb-0">My Loans</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleAddTransaction}
                  >
                    Apply for a Loan
                  </button>
                </div>
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>User Email</th>
                      <th>Loan Id</th>
                      <th>Loan Type</th>
                      <th>Loan Interest</th>
                      <th>Loan Amount</th>
                      <th>Account Id</th>
                      <th>Account Type</th>
                      <th>Loan Status</th>
                      {this.state.role==="manager"?<th>Action</th>: <th></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.accountId.user.email}</td>
                        <td>{transaction.loanId}</td>
                        <td>{transaction.loanType}</td>
                        <td>{transaction.loanInterest}</td>
                        <td>{transaction.loanAmount}</td>
                        <td>{transaction.accountId.accountId}</td>
                        <td>{transaction.accountId.accounttype}</td>
                        
                          <td>{transaction.status==="approved" ? <button className='btn btn-sm btn-success'>Approved</button>
                      : transaction.status==="pending" ? <button className='btn btn-sm btn-warning'>Pending</button> 
                      : transaction.status==="declined" ? <button className='btn btn-sm btn-danger'>Declined</button> 
                      : <button className='btn btn-sm btn-warning'>No Update</button> 
                    }</td>
                        <td>{this.state.role==="manager" && transaction.status==="pending" ? 
                          <> <button className='btn btn-sm btn-success' value="approved" onClick={(e) => this.updateLoanStatus(e.target.value,transaction.loanId)}>Approve</button> 
                          <button className='btn btn-sm btn-danger' value="declined" onClick={(e) => this.updateLoanStatus(e.target.value,transaction.loanId)}>Decline</button> </>
                        :<button className='btn btn-sm btn-warning' >No Action</button>
                        
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

export default LoanList;
