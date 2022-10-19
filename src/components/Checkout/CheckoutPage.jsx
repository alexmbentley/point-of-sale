import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";
import { UserAuth } from "../context/AuthContext";
import { StaffContext } from "../StaffLogin/LoggedInStaff";
import PaymentKeypad from "./PaymentKeypad";


const CheckoutPage = ({ userOrTable, tableName, basketTotal }) => {
  const { loggedInUser } = useContext(StaffContext);
  let staffUsername = loggedInUser.username
  const { user } = UserAuth();
  let userName = user.email;
  const navigate = useNavigate();

  const [items, setItems] = useState([])
  const [totalAmount, setTotalAmount] = useState('0.00')

  let docLink = ''
  if (!userOrTable) { docLink = `${userName}/${tableName}/drinks` } else {
    docLink = `${userName}/currentOrders/${staffUsername}`
  }

  let trueTotal = basketTotal.toFixed(2)
  const ClearDrinkWindow = async () => {
    console.log('clearDrinkwindow')
    const data = await getDocs(collection(db, docLink));
    setItems(data.docs.map((docu) => (deleteDoc(doc(db, docLink, docu.id)))));
  };

  return (
    <div>
      <h3>Checkout</h3>
      <h2>total to pay: £{trueTotal}</h2>
      {console.log(parseInt(trueTotal) < parseInt(totalAmount))}
      <PaymentKeypad setTotalAmount={setTotalAmount} totalAmount={totalAmount} />
      <button
        onClick={() => {
          if (parseInt(trueTotal) < parseInt(totalAmount)) {
            ClearDrinkWindow()
            navigate('/staffLogin');
          }
        }}
      >
        Pay
      </button>
    </div>
  );
};

export default CheckoutPage;
