import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class AddCardComponent extends Component {

  constructor(props){
    super(props);
    this.state = {
    cardType: ""
    };
  }

  componentDidMount(){
    let token = sessionStorage.getItem("token");
    if(token === "undefined"|| token ==="" || token ==null){
      toast.error("Unauthorized Access");
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
    const { cardType } = this.state;

    // Do any validation or formatting of the data here
    let accountId = sessionStorage.getItem("accountId");
    const newTransaction = {
      accountId,
      cardType
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
    axios.post('http://localhost:8081/registercard',
      newTransaction
    ,{
      headers: headers
    })
    .then((response) => {
      console.log("responses "+ JSON.stringify(response));
      if(response.data === ""){
      toast.error(" Invalid Card Details ");  
      }else{
      toast.success(" Card Added " + response.data.cardId);
      }
    })
    .catch((error) => {
      toast.error(" Invalid Card Details ");
    });

    this.props.history.push("/cards");
  };

  render() {
    const { cardType } = this.state;

    return (
      
   <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Fill Card Form</h5>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="cardType">Card Type:</label>
                    <select
                      className="form-control"
                      id="cardType"
                      name="cardType"
                      value={cardType}
                      onChange={this.handleInputChange}
                      required
                    >
                      <option value="">Select Card type</option>
                      <option value="debit">Debit</option>
                      <option value="credit">Credit</option>
                    </select>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Add Card
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

export default AddCardComponent;
