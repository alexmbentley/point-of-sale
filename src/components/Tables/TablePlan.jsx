import { addDoc, collection, getDocs, } from "firebase/firestore";
import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import { db } from "../../firebase-config";
import { UserAuth } from "../context/AuthContext";
import IndividualTable from "./draggableButtons";

const TablePlan1 = () => {
  const { user } = UserAuth();
  let userName = user.email;
  const [tempTables, setTables] = useState([])
  const [count, setCount] = useState(0)
  const [tableName, setTableName] = useState('table1')
  console.log(tempTables, '<temp tables')

  useEffect(() => {
    const getdrinks = async () => {
      const data = await getDocs(collection(db, `${userName}/tablePlan/tables`));
      setTables(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("warning for if this is running too many times");
    };

    getdrinks();
  }, [userName, count]);

  let tables = ["table 1"];

  if (tempTables.length > 0) {
    tables = tempTables
  }

  const [positions, setPositions] = useState({});

  console.log(positions, '<<< global positions')

  const [hasLoaded, setHasLoaded] = useState(false);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (tempTables.length > 0) {
      const existingDivPositions = tempTables;
      setPositions(existingDivPositions);
      setHasLoaded(true);
      console.log("has loaded");
    }
  }, [tempTables]);

  function handleStop(e, data) {
    console.log(e)
    let dummyPositions = {};
    const itemId = 'currentTable';
    dummyPositions[itemId] = {};
    dummyPositions[itemId]["x"] = data.x;
    dummyPositions[itemId]["y"] = data.y;
    console.log(dummyPositions, 'dummy pos')
    setPositions(dummyPositions);
  }


  const createTable = async () => {
    setCount(count + 1);
    await addDoc(collection(db, `${userName}/tablePlan/tables`), {
      name: tableName,
      x: 0,
      y: 0,
    });
  };


  return (
    <div>
      <input
        placeholder="Name..."
        onChange={(event) => {
          setTableName(event.target.value);
        }}
      />
      <button
        onClick={() => {
          createTable();
        }}
      >
        Create Table +
      </button>
      {hasLoaded ?
        <div>
          {tables.map((item) => {
            return (
              <div key={item.id}>
                <Draggable
                  defaultPosition={
                    { x: item.x, y: item.y }
                  }
                  grid={[25, 25]}
                  nodeRef={nodeRef}
                  onStop={handleStop}
                >
                  <div ref={nodeRef}>
                    <IndividualTable
                      id={item.id}
                      theName={item.name}
                      positions={positions} />
                  </div>
                </Draggable>
              </div>
            );
          })}
        </div> : null}
    </div>
  );
}

export default TablePlan1;



