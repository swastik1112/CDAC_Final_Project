import React, { Component } from "react";
import NavbarComponent from "./../common/NavbarComponent"
import axios from "axios";
import { toast } from "react-toastify";


class ListPassbookComponent extends Component {
  constructor(props){
    super(props);
    this.state = {
    transactions: [],
    };
  }

  handleAddTransaction = () => {
    this.props.history.push("/addpassbook");
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
    axios.get('http://localhost:8081/getallpassbooks',{
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

   axios.post('http://localhost:8081/getmypassbooks',{
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

   render() {
    const { transactions } = this.state;

    return (
      <div className="displayflex">
        {/* <div className="row">
          <div className="col-lg-12"> */}
          <NavbarComponent/>
            <div className="card displatinlineblock">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">My Passbooks</h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleAddTransaction}
                  >
                    Apply for a Passbook
                  </button>
                </div>
                <table className="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>User Email</th>
                      <th>PassbookId Id</th>
                      <th>Issued Date</th>
                      <th>Account Id</th>
                      <th>Account Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td>{transaction.accountId.user.email}</td>
                        <td>{transaction.passbookId}</td>
                        <td>{transaction.issuedDate}</td>
                        <td>{transaction.accountId.accountId}</td>
                        <td>{transaction.accountId.accounttype}</td>
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

export default ListPassbookComponent;
