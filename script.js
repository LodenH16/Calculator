const { Provider, connect, useSelector } = ReactRedux;
const { applyMiddleware, createStore, combineReducers, bindActionCreators } = Redux;

function equate(saved) {
  //do multiplication and division
  while (saved.includes('*') || saved.includes('/')) {
    saved.map((value, index) =>
    {if (value == '*') {
        saved.splice(index - 1, 3, saved[index - 1] * saved[index + 1]);
      } else if (value == '/') {
        saved.splice(index - 1, 3, saved[index - 1] / saved[index + 1]);
      }
    });

  }
  //do addition and subtraction
  while (saved.includes('-') || saved.includes('+')) {
    saved.map((value, index) =>
    {if (value == '+') {
        saved.splice(index - 1, 3, saved[index - 1] + saved[index + 1]);
      } else if (value == '-') {
        saved.splice(index - 1, 3, saved[index - 1] - saved[index + 1]);
      }
    });

  }
  return saved;
};

const baseState = { string: '0', saved: [] };

function stringReducer(state = baseState, action) {
  switch (action.type) {
    case 'number':
      if (state.string === '0') {
        return { string: action.payload, saved: state.saved };
      } else if (state.string.slice(-2) === '.0') {
        if (action.payload !== '0') {
          return { saved: state.saved, string: state.string.substring(0, state.string.length - 1) + action.payload };
        } else {
          return { saved: state.saved, string: state.string + action.payload };
        }
      } else {
        return { string: state.string + action.payload, saved: state.saved };
      }
    case 'clear':
      if (state.string === '0') {
        return state = baseState;
      } else {
        return { string: '0', saved: state.saved };
      }
    case 'function':
      if (action.payload == '-' && state.string == 0) {
        return { saved: state.saved, string: '-' };
      } else if (typeof state.saved[state.saved.length - 1] === 'string' && (state.string == '0' || state.string == '-')) {
        return { string: '0', saved: [...state.saved.filter((value, index) => index !== state.saved.length - 1), action.payload] };
      } else {
        return { saved: [...state.saved, parseFloat(state.string), action.payload], string: '0' };}
    case 'equals':
      return { saved: [], string: equate([...state.saved, parseFloat(state.string)]) };

    case 'decimal':
      if (state.string.includes('.')) {
        return state;
      } else {
        return { string: state.string + '.', saved: state.saved };
      }
    default:
      return state;}

}

let store = createStore(stringReducer);

class Calcutator extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/(
      React.createElement(Provider, { store: store }, /*#__PURE__*/
      React.createElement("div", { id: "calcBody" }, /*#__PURE__*/
      React.createElement(Display, null), /*#__PURE__*/
      React.createElement(Functions, null), /*#__PURE__*/
      React.createElement(NumberPad, null), /*#__PURE__*/
      React.createElement(Clear, null), /*#__PURE__*/
      React.createElement(Decimal, null), /*#__PURE__*/
      React.createElement(Zero, null))));



  }}

function NumButton(props) {
  return /*#__PURE__*/(
    React.createElement("div", { class: "numBTN", onClick: () => store.dispatch({ type: 'number', payload: props.value.toString() }), id: props.id }, props.value));
}
class NumberPad extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "padOfNumbers" }, /*#__PURE__*/
      React.createElement(NumButton, { value: 1, id: "one" }), /*#__PURE__*/
      React.createElement(NumButton, { value: 2, id: "two" }), /*#__PURE__*/
      React.createElement(NumButton, { value: 3, id: "three" }), /*#__PURE__*/
      React.createElement(NumButton, { value: 4, id: "four" }), /*#__PURE__*/
      React.createElement(NumButton, { value: 5, id: "five" }), /*#__PURE__*/
      React.createElement(NumButton, { value: 6, id: "six" }), /*#__PURE__*/
      React.createElement(NumButton, { value: 7, id: "seven" }), /*#__PURE__*/
      React.createElement(NumButton, { value: 8, id: "eight" }), /*#__PURE__*/
      React.createElement(NumButton, { value: 9, id: "nine" })));


  }}

function Display() {
  const counter = useSelector(state => state.string);
  const savedDigits = useSelector(state => state.saved);
  return /*#__PURE__*/(
    React.createElement("div", { id: "display" }, /*#__PURE__*/
    React.createElement("div", { id: "saved" }, savedDigits), /*#__PURE__*/
    React.createElement("div", { id: "current" }, counter)));


}
function Funky(props) {
  return /*#__PURE__*/React.createElement("div", { class: "function", id: props.id, onClick: () => store.dispatch({ type: 'function', payload: props.symbol }) }, props.symbol);
}
function Equality(props) {
  return /*#__PURE__*/React.createElement("div", { class: "function", id: "equals", onClick: () => store.dispatch({ type: 'equals' }) }, props.symbol);
}
class Functions extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "functionList" }, /*#__PURE__*/
      React.createElement(Funky, { symbol: "+", id: "add" }), /*#__PURE__*/
      React.createElement(Funky, { symbol: "-", id: "subtract" }), /*#__PURE__*/
      React.createElement(Funky, { symbol: "/", id: "divide" }), /*#__PURE__*/
      React.createElement(Funky, { symbol: "*", id: "multiply" }), /*#__PURE__*/
      React.createElement(Equality, { symbol: "=" })));


  }}

class Clear extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "clear", onClick: () => store.dispatch({ type: 'clear' }) }, "Clear"));

  }}

function Decimal(props) {
  return /*#__PURE__*/(
    React.createElement("div", { id: "decimal", onClick: () => store.dispatch({ type: 'decimal' }) }, "."));

}
class Zero extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "zero", onClick: () => store.dispatch({ type: 'number', payload: '0' }) }, "0"));

  }}


ReactDOM.render( /*#__PURE__*/React.createElement(Calcutator, null), document.getElementById('container'));