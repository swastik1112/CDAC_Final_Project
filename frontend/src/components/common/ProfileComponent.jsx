import { toast } from "react-toastify";


import React, { Component } from "react";
import axios from "axios";


class ProfileComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            id:"",
            firstname:"",
            lastname:"",
            email:"",
            profilerole:""
        }
        
    }


    componentDidMount() {

    // Reset the form fields
    this.setState({
      firstname: sessionStorage.getItem('firstname'),
      lastname: sessionStorage.getItem('lastname'),
      email: sessionStorage.getItem('email'),
      profilerole: sessionStorage.getItem('role'),
      id: sessionStorage.getItem('id'),
    });
  }
    
  render() {
    const { firstname, lastname, email, profilerole, id } = this.state;
    return (
      <div className="container mt-5">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Profile</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    value={firstname}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="lastname">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    value={lastname}
                    readOnly
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    readOnly
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="profilerole">Role:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="profilerole"
                    name="profilerole"
                    value={profilerole}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileComponent;
