import React, { Component } from "react";

class SignoutComponent extends Component {
  componentDidMount(){
    sessionStorage.clear();
    this.props.history.push("/");
  }

  render() {

    return (
      <div className="container mt-5">
              </div>
    );
  }
}

export default SignoutComponent;
