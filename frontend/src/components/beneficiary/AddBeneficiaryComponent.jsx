import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class AddBeneficiaryComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
    beneficiaryName: "",
    beneficiaryEmail: "",
    beneficiaryAccount: 0
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
    const { beneficiaryName, beneficiaryEmail,  beneficiaryAccount } = this.state;

    // Do any validation or formatting of the data here
    let senderAccount = sessionStorage.getItem("accountId");
    const newTransaction = {
      beneficiaryName,
      beneficiaryEmail,
      beneficiaryAccount,
      senderAccount
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
    axios.post('http://localhost:8081/addbeneficiary',
      newTransaction
    ,{
      headers: headers
    })
    .then((response) => {
      console.log("responses "+ JSON.stringify(response));
      if(response.data === ""){
      toast.error(" Invalid Beneficiary Details ");  
      }else{
      toast.success(" Beneficiary Added " + response.data.beneficiaryId);
      }
    })
    .catch((error) => {
      toast.error(" Invalid Beneficiary Details ");
    });

    // Reset the form state after the data has been submitted
    this.setState({
      beneficiaryName: "",
      beneficiaryEmail: "",
      beneficiaryAccount: null
    });
    this.props.history.push("/beneficiaries");
  };

  render() {
    const { beneficiaryName, beneficiaryEmail, beneficiaryAccount } = this.state;

    return (
      
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
      <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Fill Beneficiary Form </h5>
              </div>
              <div className="card-body">
      <form onSubmit={this.handleSubmit}>

        <div className="form-group">
          <label htmlFor="amount">Beneficiary Name:</label>
          <input
            type="text"
            className="form-control"
            id="beneficiaryName"
            name="beneficiaryName"
            value={beneficiaryName}
            onChange={this.handleInputChange}
            required
          />
          </div>
        
        <div className="form-group">
          <label htmlFor="amount">Beneficiary Email:</label>
          <input
            type="text"
            className="form-control"
            id="beneficiaryEmail"
            name="beneficiaryEmail"
            value={beneficiaryEmail}
            onChange={this.handleInputChange}
            required
          />
          </div>
        
        <div className="form-group">
          <label htmlFor="beneficiaryAccount">Beneficiary Account:</label>
          <input
            type="number"
            className="form-control"
            id="beneficiaryAccount"
            name="beneficiaryAccount"
            value={beneficiaryAccount}
            onChange={this.handleInputChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Beneficiary
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

export default AddBeneficiaryComponent;
