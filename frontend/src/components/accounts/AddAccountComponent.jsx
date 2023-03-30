import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class AddAccountComponent extends Component {
  state = {
    accounttype:"",
    balance: 0
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
    }
    
    // let role = sessionStorage.getItem("role");
    // if(role!=="manager"){
    //   toast.error("You are trying to access privilleged page");
    //   this.props.history.push("/login");
    // }
    
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { accounttype, balance } = this.state;

    // Do any validation or formatting of the data here
    let email = sessionStorage.getItem("email");
    
    const newTransaction = {
      email,
      balance,
      accounttype,
      status:"pending"
    };

    let token = sessionStorage.getItem("token");
     let role = sessionStorage.getItem("role");
    const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };
    
    axios.post('http://localhost:8081/registeraccount',
      newTransaction
    ,{
      headers: headers
    })
    .then((response) => {
      console.log("responses "+ JSON.stringify(response));
      if(response.data === ""){
      toast.error(" Account Request Cancelled ");  
      }else{
      toast.success(" Account Created Successfully  " + response.data.accountId);
      }
    })
    .catch((error) => {
      toast.error(" Account Request Cancelled ");
    });

    this.props.history.push("/accounts");
  };

  render() {
        const { accounttype, balance } = this.state;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Proceed with request for Account Creation </h5>
              </div>
              <div className="card-body">
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
        <label htmlFor="accounttype">Account Type:</label>
        <select
          className="form-control"
          id="accounttype"
          name="accounttype"
          value={accounttype}
          onChange={this.handleInputChange}
          required
        >
          <option value="">Select Account type</option>
          <option value="savings">Savings</option>
          <option value="current">Current</option>
        </select>
      </div>

      <div className="form-group">
          <label htmlFor="amount">Balance:</label>
          <input
            type="number"
            className="form-control"
            id="balance"
            name="balance"
            value={balance}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Request Account
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

export default AddAccountComponent;