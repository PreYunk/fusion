import React, { Component, Fragment } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";
import { MetroSpinner } from "react-spinners-kit";

const withAuth = (ProtectedComponent, mobile) => {
  return class extends Component {
    state = {
      verified: true,
      checkedFromBackend: false,
      loading: true,
    };

    componentDidMount() {
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      axios
        .get("/verifyToken", { headers })
        .then((res) => {
          this.setState({ checkedFromBackend: true, loading: false });
          this.setState({ verified: res.data.success });
        })
        .catch((err) => console.log(err));
    }

    render() {
      if (!this.state.verified) {
        return <Redirect to="/login" />;
      } else {
        return (
          <Fragment>
            {this.state.checkedFromBackend ? (
              <ProtectedComponent {...this.props} />
            ) : (
              <div style={{ position: "absolute", top: "40vh", left: "45vw" }}>
                <LoadingOverlay
                  active={this.state.loading}
                  spinner={
                    <MetroSpinner size={100} sizeUnit="px" color="#313131" />
                  }
                  text={
                    <span style={{ color: "#313131", paddingTop: "20px" }}>
                      Verifying...
                    </span>
                  }
                />
              </div>
            )}
          </Fragment>
        );
      }
    }
  };
};

export default withAuth;
