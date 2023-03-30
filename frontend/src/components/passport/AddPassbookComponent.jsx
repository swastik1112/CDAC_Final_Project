import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class AddPassbookComponent extends Component {
  state = {
    issuedDate: ""
  };

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
    const { issuedDate } = this.state;

    // Do any validation or formatting of the data here
    let accountId = sessionStorage.getItem("accountId");
    
    const newTransaction = {
      accountId,
      issuedDate
    };

    let token = sessionStorage.getItem("token");
     let role = sessionStorage.getItem("role");
    const headers = {
        authorization: `Bearer ${token}`,
        role: role,
        'content-type': 'application/json'
      };
    
    axios.post('http://localhost:8081/registerpassbook',
      newTransaction
    ,{
      headers: headers
    })
    .then((response) => {
      console.log("responses "+ JSON.stringify(response));
      if(response.data === ""){
      toast.error(" Passbook Issue Cancelled ");  
      }else{
      toast.success(" Passbook Issue Successful  " + response.data.passbookId);
      }
    })
    .catch((error) => {
      toast.error(" Passbook Issue Cancelled ");
    });

    this.props.history.push("/passbook");
  };

  render() {
        const { issuedDate } = this.state;

    return (
    <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card border-primary">
              <div className="card-header bg-primary text-white">
                <h1 className="mb-0">Request Passbook</h1>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="issuedDate">Issue Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="issuedDate"
                      name="issuedDate"
                      value={issuedDate}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Request Passbook
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

export default AddPassbookComponent;