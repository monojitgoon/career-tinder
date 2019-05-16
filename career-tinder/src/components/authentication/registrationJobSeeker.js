import React from 'react';
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { MDBMask, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBView, MDBContainer, MDBCard, MDBCardBody, MDBInput } from "mdbreact";
import "./registrationJobSeeker.css";

class RegistrationJobSeeker extends React.Component  {


  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

  render() {
    const overlay = (
      <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.toggleCollapse("navbarCollapse")} />
    );
    return (
    <div id="classicformpage">
      <Router>
        <div>          
          {this.state.collapseID && overlay}
        </div>
      </Router>

      <MDBView>
        <MDBMask className="d-flex justify-content-center align-items-center gradient">
          <MDBContainer>
            <MDBRow>
              <div className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5">
                <h1 className="h1-responsive font-weight-bold">
                  Sign up right now!{" "}
                </h1>
                <hr className="hr-light" />
                <h6 className="mb-4">
                Welcome to Career Tinder website.
                  This website is desgined for the companies which are looking
                  to hire new employees, as well as people how are looking for job.
                  To use the offered services of the web, please login with your account
                  or if you don't have an account yet, please click the signup button to register
                </h6>
                <MDBBtn outline color="white">
                  Learn More
                </MDBBtn>
              </div>
              <MDBCol md="6" xl="5" className="mb-4">
                <MDBCard id="classic-card">
                  <MDBCardBody className="z-depth-2 white-text">
                    <h3 className="text-center">
                      <MDBIcon icon="user" /> Job Seeker
                    </h3>
                    <hr className="hr-light" />
                    <div>
                    
                    <MDBInput label="First Name"  className="white-text"/>
                    <MDBInput label="Last Name"  className="white-text" />
                    </div>
                    
                    <MDBInput label="Email" icon="envelope" className="white-text"/>
                    <MDBInput label="Password" icon="lock" type="password" className="white-text"/>
                    
                    

                    <div className="text-center mt-4 black-text">
                      <MDBBtn color="indigo">Sign Up</MDBBtn>
                    </div>

                    <div className="text-center mt-4">    
                      <hr className="hr-light" />
                      <div className="text-center d-flex justify-content-center white-label"> 
                        <NavLink className="red-text" to="/registration/employer">
                          <i className="fas fa-user-plus"></i> Oops! I'm an Employer!
                        </NavLink>  
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBMask>
      </MDBView>

    </div>
    );
  }
}
  
export default RegistrationJobSeeker;