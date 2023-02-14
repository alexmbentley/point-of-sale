import { useState, useEffect } from 'react';
import '../App.scss';
import { db } from '../firebase-config';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { UserAuth } from './context/AuthContext';
import Keypad from './StaffLogin/KeyPad';

function CreateUsers() {
  const { user } = UserAuth();
  let userName = user.email;
  const [newName, setNewName] = useState('');
  const [newlevel, setNewlevel] = useState(0);
  const [newPasscode, setNewPasscode] = useState('');
  const [counter, setNewCounter] = useState(0);

  const [users, setusers] = useState([]);
  const createusers = async () => {
    setNewCounter(counter + 1);
    await addDoc(collection(db, `${userName}/users/user`), {
      name: newName,
      staffPasscode: Number(newPasscode),
      level: Number(newlevel),
    });
  };

  const updateusers = async (id, level) => {
    const usersDoc = doc(db, `${userName}/users/user`, id);
    const newFields = { level: level + 1 };

    setNewCounter(counter + 1);
    await updateDoc(usersDoc, newFields);
  };

  const deleteusers = async (id) => {
    const usersDoc = doc(db, `${userName}/users/user`, id);
    setNewCounter(counter + 1);
    await deleteDoc(usersDoc);
  };

  useEffect(() => {
    const getusers = async () => {
      const data = await getDocs(collection(db, `${userName}/users/user`));
      setusers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getusers();
  }, [counter, userName]);

  return (
    <div className="createuser">
      <div className="createuser__staff">
        <div className="createuser__staff--flex">
          {users.map((users) => {
            return (
              <div key={users.name}>
                <p>Name: {users.name}</p>
                <p> level: {`${users.level}`}</p>

                <button
                  className="btn btn-light m-1"
                  onClick={() => {
                    updateusers(users.id, users.level);
                  }}
                >
                  {' '}
                  Increase level
                </button>
                <button
                  className="btn btn-light m-1"
                  onClick={() => {
                    deleteusers(users.id);
                  }}
                >
                  Delete users
                </button>
              </div>
            );
          })}
        </div>

        <div className="createuser__staff--button"></div>
      </div>

      <div className="createuser__keypad">
        <div className="createuser__keypad--numbers">
          <Keypad
            passcodeGuess={newPasscode}
            setPasscodeGuess={setNewPasscode}
          />
        </div>

        <input
          type="number"
          placeholder="level..."
          onChange={(event) => {
            setNewlevel(event.target.value);
          }}
        />

        <p className="">Create new user</p>
        <input
          type="text"
          id="form12"
          className="form-control"
          placeholder="Name..."
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <button className="" onClick={createusers}>
          {' '}
          Create users
        </button>
      </div>
    </div>
  );
}

export default CreateUsers;
