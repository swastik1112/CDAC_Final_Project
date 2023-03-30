import React, { Component } from "react";
import NavbarComponent from "../common/NavbarComponent";


class HomepageComponent extends Component {

  componentDidMount(){
    let token = sessionStorage.getItem("token");
    if(token === "undefined"|| token ==="" || token ==null){
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      // <div className="">
       <NavbarComponent/>
      // </div>
    );
  }
}

export default HomepageComponent;
