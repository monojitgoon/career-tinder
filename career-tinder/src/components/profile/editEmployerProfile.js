import React from "react";
import { MDBInput, MDBBtn } from "mdbreact";
import "./profile.css";
import { connect } from "react-redux";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { Alert } from "reactstrap";
import { editEmployerProfile } from "../../store/actions/profileAction";
import * as ROUTES from "../../constants/routes";
import { firestoreConnect } from "react-redux-firebase";

//Entity to store employerProfile in DB
const employerProfileEntity = {
  employerName: null,
  industryName: null,
  employerAddress: null,
  employerDescription: null,
  contactName: null,
  contactEmail: null,
  contactPhone: null
};

class EditEmployerProfile extends React.Component {
  constructor(props) {
    super(props);

    var employerProfileProps = this.props.employer;
    var employerName =
      employerProfileProps && employerProfileProps.employerName;
    var industryName =
      employerProfileProps && employerProfileProps.industryName;
    var employerAddress =
      employerProfileProps && employerProfileProps.employerAddress;
    var employerDescription =
      employerProfileProps && employerProfileProps.employerDescription;
    var contactName = employerProfileProps && employerProfileProps.contactName;
    var contactEmail =
      employerProfileProps && employerProfileProps.contactEmail;
    var contactPhone =
      employerProfileProps && employerProfileProps.contactPhone;
    this.state = {
      employerName: employerName,
      industryName: industryName,
      employerAddress: employerAddress,
      employerDescription: employerDescription,
      contactName: contactName,
      contactEmail: contactEmail,
      contactPhone: contactPhone
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEmployerSubmit = this.handleEmployerSubmit.bind(this);
    this.onShowAlert = this.onShowAlert.bind(this);
  }
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleEmployerSubmit = e => {
    e.preventDefault();
    var employerProfile = employerProfileEntity;
    if (this.state.employerName) {
      employerProfileEntity.employerName = this.state.employerName;
    }
    if (this.state.industryName) {
      employerProfileEntity.industryName = this.state.industryName;
    }
    if (this.state.employerAddress) {
      employerProfileEntity.employerAddress = this.state.employerAddress;
    }
    if (this.state.employerDescription) {
      employerProfileEntity.employerDescription = this.state.employerDescription;
    }
    if (this.state.contactName) {
      employerProfileEntity.contactName = this.state.contactName;
    }
    if (this.state.contactEmail) {
      employerProfileEntity.contactEmail = this.state.contactEmail;
    }
    if (this.state.contactPhone) {
      employerProfileEntity.contactPhone = this.state.contactPhone;
    }

    this.props.editEmployerProfile(employerProfile);
  };

  onShowAlert = () => {
    this.setState({ visible: true }, () => {
      window.setTimeout(() => {
        this.setState({ visible: false });
      }, 2000);
    });
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid && !auth.emailVerified)
      return <Redirect to={ROUTES.LOG_IN} />;
    return (
      <div className="employer-profile">
        <Alert color="success" isOpen={this.state.visible}>
          <i className="fas fa-check" /> Profile updated!
        </Alert>
        <div className="profile-form-wrapper">
          <div className="card border-info card-container">
            <div className="card-header">
              <i className="fas fa-user-tie" /> Update your Employer profile
            </div>
            <div className="card-body text-info">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-company"
                  role="tabpanel"
                  aria-labelledby="pills-company-tab"
                >
                  <form
                    className="profile-form"
                    onSubmit={this.handleEmployerSubmit}
                  >
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            id="employerName"
                            value={this.state.employerName || ""}
                            label="Employer Name"
                            icon="pencil-alt"
                            type="text"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            id="industryName"
                            value={this.state.industryName || ""}
                            label="Industry"
                            type="text"
                            icon="industry"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            id="employerAddress"
                            value={this.state.employerAddress || ""}
                            label="Employer Address"
                            type="textarea"
                            rows="1"
                            icon="address-card"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            id="employerDescription"
                            value={this.state.employerDescription || ""}
                            label="Employer Description"
                            type="textarea"
                            rows="1"
                            icon="comment-alt"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            id="contactName"
                            value={this.state.contactName || ""}
                            label="Contact Name"
                            type="text"
                            icon="pencil-alt"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            id="contactEmail"
                            value={this.state.contactEmail || ""}
                            label="Contact Email"
                            type="email"
                            icon="envelope"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-4 col-sm-12">
                        <div className="form-group">
                          <MDBInput
                            id="contactPhone"
                            value={this.state.contactPhone || ""}
                            label="Contact Phone"
                            type="number"
                            icon="mobile-alt"
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12">
                        <MDBBtn
                          color="indigo"
                          className="float-right"
                          type="submit"
                          onClick={() => {
                            this.onShowAlert();
                          }}
                        >
                          <i className="fas fa-save" /> Save Profile
                        </MDBBtn>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const employers = state.firestore.data.employer;
  const auth = state.firebase.auth;
  const employer = employers ? employers[auth.uid] : null;
  return {
    auth: auth,
    employer: employer
  };
};

const mapDispatchToPropsEmployer = dispatch => {
  // console.log(state);
  return {
    editEmployerProfile: profile => dispatch(editEmployerProfile(profile))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToPropsEmployer
  ),
  firestoreConnect([
    {
      collection: "employer"
    }
  ])
)(EditEmployerProfile);
