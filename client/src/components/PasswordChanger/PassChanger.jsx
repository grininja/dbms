import React from "react";
import { Paper, TextField, Snackbar, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";
import { styles } from "./style";
import MuiAlert from "@material-ui/lab/Alert";
import Loading from "./progress";
import cookies from "js-cookie";
import apiCall from "../../apiCall";
let error = "";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class PassChanger extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassFirst: "",
      newPassSecond: "",
      loading: false,
      [error]: true, // error status for each specific field
      form: {}, // output form with data
      open: false,
      variant: "",
      message: "",
    };
  }

  componentDidMount() {
    // this.props.passView(true); // Header and footer switching
  }

  componentWillUnmount() {
    // this.props.passView(false);
  }

  changePassword = async (data) => {
    const res = await apiCall(
      "/updatepassword",
      "PUT",
      data,
      cookies.get("token")
    );
    alert(res.data.message);
  };

  validateFields = (form) => {
    if (!form.newPassFirst || !form.newPassSecond) {
      Object.entries(form).forEach((item, index) =>
        [0, 1, 2, 3].includes(index) && !item[1]
          ? this.setState({ ["error" + item[0]]: true })
          : this.setState({ ["error" + item[0]]: false })
      );
      this.setState({
        message: `Fill in the field - ${`${
          !form.newPassFirst ? "New password, " : ""
        }${!form.newPassSecond ? "Repeat new password, " : ""}`
          .trim()
          .replace(/,$/g, "")}!`,
        variant: "warning",
        open: true,
      });
      return true;
    }

    if (
      form.newPassFirst &&
      form.newPassSecond &&
      form.newPassFirst !== form.newPassSecond
    ) {
      this.setState({
        message: "New password and retype new password do not match",
        variant: "warning",
        open: true,
      });
      return true;
    }

    if (form.oldPass && form.oldPass === form.newPassFirst) {
      this.setState({
        message: "New password and current password match",
        variant: "warning",
        open: true,
      });
      return true;
    }
    return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.submit();
  };

  async submit() {
    const { form } = this.state;
    const data = {
      password: form.newPassFirst,
    };
    let errorMessage;

    if (this.validateFields(form)) return;

    try {
      this.setState({ loading: true });
      await this.changePassword(data);
    } catch (error) {
      errorMessage = error.response.data;
    }

    if (errorMessage) {
      this.setState({
        loading: false,
        message: errorMessage,
        variant: "error",
        open: true,
      });
      return;
    }
    this.setState({
      loading: false,
      message: "Password changed successfully!",
      variant: "success",
      open: true,
    });
  }

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleButtonClick();
    }
  };

  // checks the empty value of required fields
  clickField(field, value) {
    !value && this.setState({ ["error" + field]: true });
  }
  // removes red warning from empty values of required fields when focus is lost
  blurField(field) {
    this.setState({ ["error" + field]: false });
  }

  // value entry monitoring + empty value validation
  setFieldValue(field, value) {
    !value
      ? this.setState({ ["error" + field]: true })
      : this.setState({ ["error" + field]: false });
    const newForm = {
      ...this.state.form,
      [field]: value,
    };

    this.setState({
      form: newForm,
    });
  }

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    const { newPassFirst, newPassSecond } = this.state.form;

    // display diagnostic messages
    const snackbarMessage = (
      <Snackbar
        className={classes.snack}
        open={this.state.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        autoHideDuration={3000}
        onClose={this.handleClose}
      >
        <Alert severity={this.state.variant}>{this.state.message}</Alert>
      </Snackbar>
    );

    return (
      <div className="main-container" style={{ textAlign: "center" }}>
        <h3 className="title">Change Password</h3>
        <Paper elevation={5} className={classes.paper}>
          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <label className={classes.field}>
              <span className={classes.name}>New password *</span>
              <TextField
                onClick={(e) => this.clickField("newPassFirst", e.target.value)}
                onBlur={() => this.blurField("newPassFirst")}
                onChange={(e) => {
                  this.setFieldValue("newPassFirst", e.target.value);
                }}
                type="password"
                value={newPassFirst}
                className={classes.formItem__textField}
                placeholder="Enter new password"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="new-password"
                inputProps={{
                  className: classes.input,
                }}
                error={this.state.errornewPassFirst}
              />
            </label>
            <label className={classes.field}>
              <span className={classes.name}>Repeat new password *</span>
              <TextField
                onClick={(e) =>
                  this.clickField("newPassSecond", e.target.value)
                }
                onBlur={() => this.blurField("newPassSecond")}
                onChange={(e) => {
                  this.setFieldValue("newPassSecond", e.target.value);
                }}
                type="password"
                value={newPassSecond}
                className={classes.formItem__textField}
                placeholder="Repeat new password"
                variant="outlined"
                fullWidth
                margin="normal"
                autoComplete="new-password"
                inputProps={{
                  className: classes.input,
                }}
                error={this.state.errornewPassSecond}
              />
            </label>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.action}
            >
              {" "}
              <SendIcon className={classes.leftIcon} /> Send{" "}
            </Button>
          </form>
        </Paper>
        {snackbarMessage}
        {loading && <Loading />}
      </div>
    );
  }
}

export default withStyles(styles)(PassChanger);
