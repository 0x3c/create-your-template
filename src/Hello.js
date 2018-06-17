import react, { Component } from "react";
import { connect } from "react-redux";
import "./Hello.less";

@connect(state => ({}))
class Hello extends Component {
  state = {};
  componentDidMount() {}
  render() {
    return <div>Hello</div>;
  }
}

export default Hello;
