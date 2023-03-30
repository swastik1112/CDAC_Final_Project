import "./App.css";
import HeaderComponent from "./components/common/HeaderComponent";
import FooterComponent from "./components/common/FooterComponent";
import LoginComponent from "./components/common/LoginComponent";
import ListLoanComponent from "./components/loan/ListLoanComponent";
import ListBankTransactionComponent from "./components/banktransaction/ListBankTransactionComponent";
import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";
import ListCardComponent from "./components/card/ListCardComponent";
import ListPassbookComponent from "./components/passport/ListPassbookComponent";
import TransactionFormComponent from "./components/banktransaction/TransactionFormComponent";
import ListAccountsComponent from "./components/accounts/ListAccountsComponent";
import ListBeneficiaryComponent from "./components/beneficiary/ListBeneficiaryComponent";
import HomepageComponent from "./components/common/HomepageComponent";
import AddBeneficiaryComponent from "./components/beneficiary/AddBeneficiaryComponent";
import AddCardComponent from "./components/card/AddCardComponent";
import AddLoanComponent from "./components/loan/AddLoanComponent";
import AddPassbookComponent from "./components/passport/AddPassbookComponent";
import AddAccountComponent from "./components/accounts/AddAccountComponent";
import SignoutComponent from "./components/common/SignoutComponent";
import RegistrationComponent from "./components/common/RegistrationComponent";
import ProfileComponent from "./components/common/ProfileComponent";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <HeaderComponent />
        <div className="flex-container bg-color">
          <div className="body-container">
            <Switch>
              <Route path="/cards" component={ListCardComponent}></Route>
              <Route path="/addcard" component={AddCardComponent}></Route>
              <Route path="/homepage" component={HomepageComponent}></Route>
              <Route path="/" exact component={LoginComponent}></Route>
              <Route path="/login" exact component={LoginComponent}></Route>
              <Route
                path="/register"
                exact
                component={RegistrationComponent}
              ></Route>
              <Route
                path="/passbook"
                exact
                component={ListPassbookComponent}
              ></Route>

              <Route
                path="/addpassbook"
                exact
                component={AddPassbookComponent}
              ></Route>

              <Route path="/loan" exact component={ListLoanComponent}></Route>
              <Route path="/addloan" exact component={AddLoanComponent}></Route>
              <Route
                path="/banktransaction"
                exact
                component={ListBankTransactionComponent}
              ></Route>
              <Route
                path="/addtransaction"
                exact
                component={TransactionFormComponent}
              ></Route>
              <Route path="/accounts" component={ListAccountsComponent}></Route>
              <Route path="/addaccount" component={AddAccountComponent}></Route>

              <Route
                path="/beneficiaries"
                component={ListBeneficiaryComponent}
              ></Route>
              <Route
                path="/addbeneficiary"
                exact
                component={AddBeneficiaryComponent}
              ></Route>
              <Route path="/profile" component={ProfileComponent}></Route>
              <Route path="/signout" component={SignoutComponent}></Route>
            </Switch>
          </div>
        </div>
        <FooterComponent />
      </BrowserRouter>
    );
  }
}

export default App;
