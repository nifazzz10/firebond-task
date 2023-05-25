
import React, { useState } from "react";

function App() {
  const [args, setArgs] = useState([]);
  const [operations, setOperations] = useState([]);

  function addArg() {
    setArgs([...args, { value: "", bool: "true" }]);
  }

  function updateArg(index, value) {
    let newArgs = [...args];
    newArgs[index].value = value;
    setArgs(newArgs);
  }

  function updateBool(index, bool) {
    let newArgs = [...args];
    newArgs[index].bool = bool;
    setArgs(newArgs);
  }

  function addOperation() {
    setOperations([...operations, { type: "and", arg1Index: 0, arg2Index: 0 }]);
  }

  function updateOperationType(index, type) {
    let newOperations = [...operations];
    newOperations[index].type = type;
    setOperations(newOperations);
  }

  function updateOperationArg1(index, arg1Index) {
    let newOperations = [...operations];
    newOperations[index].arg1Index = arg1Index;
    setOperations(newOperations);
  }

  function updateOperationArg2(index, arg2Index) {
    let newOperations = [...operations];
    newOperations[index].arg2Index = arg2Index;
    setOperations(newOperations);
  }

  let result = operations.reduce((acc, operation) => {
    if (operation.type === "and") {
      return (
        acc &&
        args[operation.arg1Index] &&
        args[operation.arg2Index] &&
        args[operation.arg1Index].bool === "true" &&
        args[operation.arg2Index].bool === "true"
      );
    } else if (operation.type === "or") {
      return (
        acc ||
        (args[operation.arg1Index] &&
          args[operation.arg2Index] &&
          (args[operation.arg1Index].bool === "true" ||
            args[operation.arg2Index].bool === "true"))
      );
    }
  }, operations.length > 0 && operations[0].type === "or" ? false : true);

  return (
    <div>
      {args.map((arg, index) => (
        <div key={index}>
          <input
            value={arg.value}
            onChange={e => updateArg(index, e.target.value)}
          />
          <select
            value={arg.bool}
            onChange={e => updateBool(index, e.target.value)}
          >
            <option>true</option>
            <option>false</option>
          </select>
        </div>
      ))}
      <button onClick={addArg}>Add Arg</button>
      <br />
      {operations.map((operation, index) => (
        <div key={index}>
          <select
            value={operation.type}
            onChange={e => updateOperationType(index, e.target.value)}
          >
            <option>and</option>
            <option>or</option>
          </select>
          <select
            value={operation.arg1Index}
            onChange={e => updateOperationArg1(index, e.target.value)}
          >
            {args.map((arg, index) => (
              <option key={index} value={index}>
                {arg.value}
              </option>
            ))}
          </select>
          <select
            value={operation.arg2Index}
            onChange={e => updateOperationArg2(index, e.target.value)}
          >
            {args.map((arg, index) => (
              <option key={index} value={index}>
                {arg.value}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button onClick={addOperation}>Add Operation</button>
      <br />
      Result: {result ? "true" : "false"}
    </div>
  );
}

export default App;