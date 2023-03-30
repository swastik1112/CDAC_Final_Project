import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class AddLoanComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
    loanType: "",
    loanAmount: 0,
    loanInterest: 0,
    loanCompletionDate: ""
    };
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
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { loanType, loanAmount, loanInterest, loanCompletionDate } = this.state;

    // Do any validation or formatting of the data here
    let accountId = sessionStorage.getItem("accountId");
    const newTransaction = {
      accountId,
      loanType,
      loanAmount,
      loanInterest,
      loanCompletionDate,
      status: "pending"
    };

    let token = sessionStorage.getItem("token");
     let role = sessionStorage.getItem("role");
    const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };

    // Call your backend endpoint here to submit the new transaction data
    // For example, using the fetch API or Axios library
    axios.post('http://localhost:8081/registerloan',
      newTransaction
    ,{
      headers: headers
    })
    .then((response) => {
      console.log("responses "+ JSON.stringify(response));
      if(response.data === ""){
      toast.error(" Invalid Loan Details ");  
      }else{
      toast.success(" Loan Added " + response.data.loanId);
      }
    })
    .catch((error) => {
      toast.error(" Invalid Loan Details ");
    });

    // Reset the form state after the data has been submitted
    this.setState({
      loanType: "",
      loanAmount: 0,
      loanInterest: 0,
      loanCompletionDate: ""
    });
    this.props.history.push("/loan");
  };

  render() {
    const { loanType, loanAmount, loanInterest, loanCompletionDate } = this.state;

    return (
      
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0"> Fill Loan Application Form </h5>
              </div>
              <div className="card-body">
      <form onSubmit={this.handleSubmit}>


        <div className="form-group">
        <label htmlFor="cardType">Loan Type:</label>
        <select
          className="form-control"
          id="loanType"
          name="loanType"
          value={loanType}
          onChange={this.handleInputChange}
          required
        >
          <option value="">Select Loan type</option>
          <option value="homeloan">Home Loan</option>
          <option value="personalloan">Personal Loan</option>
        </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Loan Amount:</label>
          <input
            type="number"
            className="form-control"
            id="loanAmount"
            name="loanAmount"
            value={loanAmount}
            onChange={this.handleInputChange}
            required
          />
        </div>

          <div className="form-group">
          <label htmlFor="amount">Loan Interest:</label>
          <input
            type="number"
            className="form-control"
            id="loanInterest"
            name="loanInterest"
            value={loanInterest}
            onChange={this.handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Loan Completion Date</label>
          <input
            type="date"
            className="form-control"
            id="loanCompletionDate"
            name="loanCompletionDate"
            value={loanCompletionDate}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Loan
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

export default AddLoanComponent;
