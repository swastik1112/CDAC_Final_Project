import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";


class LoginComponent extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      email: "",
      password: "",
      role: "customer"
    }
  }

  componentDidMount(){
    sessionStorage.clear();
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};


  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, role } = this.state;

    // Do any validation or formatting of the data here
  if (!this.validateEmail(email)) {
    toast.error('Please enter a valid email address');
    return;
  }

    // Call your backend endpoint here to check the login credentials
    // using the Axios library
    axios.post("http://localhost:8081/authenticate", {
      email: email,
      password: password,
      role: role
    })
    .then(response => {
      // Handle the response from the backend here, e.g. redirect the user
      // to the dashboard page if the login is successful
      const token = response.data.jwtToken;
      const userid = response.data.userId;
      const email = response.data.email;
      const role = response.data.role;
      const firstname = response.data.firstname;
      const lastname = response.data.lastname;
      console.log(response)
      if ( response.status===401 || response.status===403){
         toast.error("Login failed. Please try again.");
         console.log("user id is underfined");
      }else{
         toast.success("Login successful. you are directed to home page.");
      }
    sessionStorage.clear();
    sessionStorage.setItem('userid', userid);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('firstname',firstname);
    sessionStorage.setItem('lastname',lastname);
    console.log("history : " +this.props.history.data);
    this.props.history.push("/accounts");
    })
    .catch(error => {
      toast.error("Login failed. Please try again.");
      sessionStorage.clear();
    });
  };

  render() {
    const { email, password, role } = this.state;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      name="email"
                      value={email}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={password}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select
                      className="form-control"
                      id="role"
                      name="role"
                      value={role}
                      onChange={this.handleInputChange}
                    >
                      <option value="customer">Customer</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
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

export default LoginComponent;
