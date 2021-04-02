import { Component } from "react";
import { signUp } from "../../utilities/users-service";
import { Box, Button, Input } from "@material-ui/core";

export default class SignUpForm extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
      error: "",
    });
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const formData = { ...this.state };
      delete formData.error;
      delete formData.confirm;
      const user = await signUp(formData);
      this.props.setUser(user);
    } catch {
      // An error occurred
      this.setState({ error: "Sign Up Failed - Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <form
        autoComplete="off"
        className="SignUpForm"
        onSubmit={this.handleSubmit}
      >
        <Input
        id="username"
        name="name"
        type="text"
        placeholder="Username"
        required={true}
        autoFocus={true}
        fullWidth={true}
        value={this.state.name}
        onChange={this.handleChange}
        />
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required={true}
          autoFocus={true}
          fullWidth={true}
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required={true}
          fullWidth={true}
          value={this.state.password}
          onChange={this.handleChange}
        />
        <Input
          id="password"
          name="confirm"
          type="password"
          placeholder="Verify Password"
          required={true}
          fullWidth={true}
          value={this.state.confirm}
          onChange={this.handleChange}
        />

        <Box display="flex" justifyContent="center">
          <Button type="submit" size="large" id="login" disabled={disable}>
            SIGN UP
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <p className="error-message">&nbsp;{this.state.error}</p>
        </Box>
      </form>
    );
  }
}