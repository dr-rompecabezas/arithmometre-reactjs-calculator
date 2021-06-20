class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      prevkey: null, // number, operator, decimal, equals
      operator: null, // +, -, *, /, (*), (/)
      prevnum: null };

    this.resetCalculator = this.resetCalculator.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
  }

  resetCalculator() {
    this.setState({
      display: "0",
      prevkey: null,
      operator: null,
      prevnum: null });

  }

  incrementDisplay(char) {
    this.setState(state => {
      return { display: "" + state.display + char };
    });
  }

  handleNumber(x) {
    if (this.state.prevkey == "operator" || this.state.prevkey == "equals") {
      this.setState({ display: x.toString() });
    } else if (this.state.prevkey == "decimal") {
      this.incrementDisplay(x);
    } else if (this.state.display == 0) {
      this.setState({ display: x.toString() });
    } else {
      this.incrementDisplay(x);
    }
    this.setState({ prevkey: "number" });
  }

  handleDecimal() {
    if (this.state.prevkey == "operator" || this.state.prevkey == "equals") {
      this.setState({ display: "0." });
    } else if (!this.state.display.includes('.')) {
      this.incrementDisplay('.');
    }
    this.setState({ prevkey: "decimal" });
  }

  storePreviousNumber() {
    this.setState(state => {
      return { prevnum: state.display };
    });
  }

  handleOperator(op) {
    if (op == "-" &&
    this.state.prevnum &&
    this.state.prevkey == "operator" &&
    this.state.operator == "*") {
      this.setState({ negative: true, prevkey: "operator", operator: "(*)" });
      this.storePreviousNumber();
    } else if (op == "-" &&
    this.state.prevnum &&
    this.state.prevkey == "operator" &&
    this.state.operator == "/") {
      this.setState({ negative: true, prevkey: "operator", operator: "(/)" });
      this.storePreviousNumber();
    } else if (this.state.prevnum &&
    this.state.operator &&
    this.state.prevkey != "operator") {
      this.calculate();
      this.storePreviousNumber();
      this.setState({ prevkey: "operator", operator: op });
    } else {
      this.storePreviousNumber();
      this.setState({ prevkey: "operator", operator: op });
    }
  }

  calculate() {
    switch (this.state.operator) {
      case "+":
        this.setState(state => {
          return { display: parseFloat(state.prevnum) + parseFloat(state.display),
            operator: null };
        });
        break;
      case "-":
        this.setState(state => {
          return { display: parseFloat(state.prevnum) - parseFloat(state.display),
            operator: null };
        });
        break;
      case "*":
        this.setState(state => {
          return { display: parseFloat(state.prevnum) * parseFloat(state.display),
            operator: null };
        });
        break;
      case "/":
        this.setState(state => {
          return { display: parseFloat(state.prevnum) / parseFloat(state.display),
            operator: null };
        });
        break;
      case "(*)":
        this.setState(state => {
          return { display: parseFloat(state.prevnum) * -parseFloat(state.display),
            operator: null };
        });
        break;
      case "(/)":
        this.setState(state => {
          return { display: parseFloat(state.prevnum) / -parseFloat(state.display),
            operator: null };
        });
        break;}

  }

  handleEquals() {
    if (this.state.prevkey == "number") {
      this.calculate();
    }
    this.setState({ prevkey: "equals" });
  }

  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "calculator", className: "container" }, /*#__PURE__*/
      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { id: "display", className: "col alert alert-dark text-right", dangerouslySetInnerHTML: { __html: this.state.display } })), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { id: "clear", className: "col-3 btn btn-danger border", onClick: this.resetCalculator }, "AC"), /*#__PURE__*/
      React.createElement("div", { id: "arithmometre", className: "col-6 text-center" }, "Arithmometre"), /*#__PURE__*/
      React.createElement("div", { id: "divide", className: "col-3 btn btn-warning border", onClick: () => this.handleOperator("/") }, /*#__PURE__*/React.createElement("i", { title: "divide", class: "fas fa-divide" }))), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { id: "seven", className: "col btn btn-secondary border", onClick: () => {this.handleNumber(7);} }, "7"), /*#__PURE__*/
      React.createElement("div", { id: "eight", className: "col btn btn-secondary border", onClick: () => {this.handleNumber(8);} }, "8"), /*#__PURE__*/
      React.createElement("div", { id: "nine", className: "col btn btn-secondary border", onClick: () => {this.handleNumber(9);} }, "9"), /*#__PURE__*/
      React.createElement("div", { id: "multiply", className: "col btn btn-warning border", onClick: () => this.handleOperator("*") }, /*#__PURE__*/React.createElement("i", { title: "times", class: "fas fa-times" }))), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { id: "four", className: "col btn btn-secondary border", onClick: () => {this.handleNumber(4);} }, "4"), /*#__PURE__*/
      React.createElement("div", { id: "five", className: "col btn btn-secondary border", onClick: () => {this.handleNumber(5);} }, "5"), /*#__PURE__*/
      React.createElement("div", { id: "six", className: "col btn btn-secondary border", onClick: () => {this.handleNumber(6);} }, "6"), /*#__PURE__*/
      React.createElement("div", { id: "subtract", className: "col btn btn-warning border", onClick: () => this.handleOperator("-") }, /*#__PURE__*/React.createElement("i", { title: "minus", class: "fas fa-minus" }))), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { id: "one", className: "col btn btn-secondary border", onClick: () => {this.handleNumber(1);} }, "1"), /*#__PURE__*/
      React.createElement("div", { id: "two", className: "col btn btn-secondary border", onClick: () => {this.handleNumber(2);} }, "2"), /*#__PURE__*/
      React.createElement("div", { id: "three", className: "col btn btn-secondary border", onClick: () => {this.handleNumber(3);} }, "3"), /*#__PURE__*/
      React.createElement("div", { id: "add", className: "col btn btn-warning border", onClick: () => this.handleOperator("+") }, /*#__PURE__*/React.createElement("i", { title: "plus", class: "fas fa-plus" }))), /*#__PURE__*/

      React.createElement("div", { className: "row" }, /*#__PURE__*/
      React.createElement("div", { id: "zero", className: "col-6 btn btn-secondary border", onClick: () => {this.handleNumber(0);} }, "0"), /*#__PURE__*/
      React.createElement("div", { id: "decimal", className: "col-3 btn btn-secondary border", onClick: this.handleDecimal }, "."), /*#__PURE__*/
      React.createElement("div", { id: "equals", className: "col-3 btn btn-success border", onClick: this.handleEquals }, /*#__PURE__*/React.createElement("span", { className: "font-weight-bold" }, "=")))));



  }}


ReactDOM.render( /*#__PURE__*/
React.createElement(Calculator, null),
document.getElementById('root'));