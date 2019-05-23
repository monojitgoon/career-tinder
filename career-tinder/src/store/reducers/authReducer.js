const initState = {
  authError: null,
  emailIsSent: false,
  userType: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
      return {
        ...state,
        authError: "Login failed"
      };

    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null
      };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null
      };

    case "SIGNUP_ERROR":
      console.log("signup error");
      return {
        ...state,
        authError: action.err.message
      };
    case "EMAIL_SENT_SUCCESS":
      console.log("Email sent success");
      return {
        ...state,
        authError: null,
        emailIsSent: true
      };

    case "EMAIL_SENT_ERROR":
      console.log("Email sent error");
      return {
        ...state,
        authError: action.err.message,
        emailIsSent: false
      };
    //@begin Reset (Forgot) Password - Abel
    case "PWFORGET_SUCCESS":
      console.log("Password FORGET - success");
      return {
        ...state,
        authStatus: "OK",
        authMsg: "Email sent."
      };

    case "PWFORGET_ERROR":
      console.log("Password FORGET - error");
      return {
        ...state,
        authStatus: "ERROR",
        authMsg: action.err.message
      };
    //@end Reset (Forgot) Password - Abel

    default:
      return state;
  }
};

export default authReducer;
