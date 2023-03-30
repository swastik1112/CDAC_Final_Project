import { toast } from "react-toastify";

import React, { Component } from "react";
import axios from "axios";

class RegistrationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
      registerrole: "customer",
      role: sessionStorage.getItem("role"),
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("role") !== "manager") {
      toast.error("Unauthorized Page Access");
      this.props.history.push("/accounts");
    }
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "firstname" || name === "lastname") {
      const regex = /^[a-zA-Z]+$/;
      if (!regex.test(value)) {
        toast.error(`${name} should only contain letters`);
        return;
      }
    }

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      firstname,
      lastname,
      email,
      password,
      registerrole,
      confirmpassword,
    } = this.state;

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password should be minimum 8 characters including alphabet, number and symbol."
      );
      return;
    }

    if (password !== confirmpassword) {
      toast.error("password did not match");
      return;
    }

    const newTransaction = {
      firstname,
      lastname,
      email,
      password,
      role: registerrole,
    };

    let token = sessionStorage.getItem("token");
    let role = sessionStorage.getItem("role");
    const headers = {
      authorization: `Bearer ${token}`,
      role: role,
      "content-type": "application/json",
    };

    axios
      .post("http://localhost:8081/registeruser", newTransaction, {
        headers: headers,
      })
      .then((response) => {
        console.log("responses " + JSON.stringify(response));
        if (response.data === "") {
          toast.error(" User Registeration Failed ");
        } else {
          toast.success(
            " User Registered Successfully with userid " + response.data.id
          );
        }
      })
      .catch((error) => {
        toast.error(" Account Request Cancelled ");
      });

    this.props.history.push("/accounts");

    // Reset the form fields
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      registerrole: "customer",
    });
  };

  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      registerrole,
      confirmpassword,
    } = this.state;

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      name="firstname"
                      value={firstname}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="name">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lastname"
                      value={lastname}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
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
                    <label htmlFor="confirmpassword">Confirm Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmpassword"
                      name="confirmpassword"
                      value={confirmpassword}
                      onChange={this.handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="registerrole">Role:</label>
                    <select
                      className="form-control"
                      id="registerrole"
                      name="registerrole"
                      value={registerrole}
                      onChange={this.handleInputChange}
                    >
                      <option value="customer">Customer</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Register
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

export default RegistrationComponent;
