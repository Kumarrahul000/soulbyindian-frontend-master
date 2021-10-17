// import React from 'react'

// const PaymentRazorpay = () => {
// const[values,setValues]=useState({
//     amount:0,
//     orderId: ''
// })
//    const{amount,orderId}=values
//     const showPaymentRazorpay=()=>{
//         const form=document.createElement('form');
//         form.setAttribute('action',process.env.REACT_APP_BACKEND);
//         form.setAttribute('method',"POST");
//         const script=document.createElement('script');
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.setAttribute("data-key", process.env.REACT_APP_DATA_KEY);
//         script.setAttribute("data-amount", amount);
//         script.setAttribute("data-profill.contact", "7978837141");
//         script.setAttribute("data-order_id", orderId);
//         script.setAttribute("data-profill.name","Priyaranjan");
//         script.setAttribute("data-buttontext", "Buy Now!!!");
//         document.body.appendChild(form);
//         form.appendChild(script);
//         const input = document.createElement("input");
//         input.type = "hidden";
//         input.custom = "Hidden Element";
//         input.name = "hidden";
//         form.appendChild(input);
//     };
// }


import React from "react";
// import logo from "./logo.svg";
// import "./App.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function CardPayment() {
  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_0tpemkHKm5K1Bc",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      image: "http://localhost:1337/logo.svg",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);

        alert("Transaction successful");
      },
      prefill: {
        name: "Rajat",
        email: "rajat@rajat.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Razorpay payment portal ezzzz</p>
        <a
          className="App-link"
          onClick={showRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay now
        </a>
      </header>
    </div>
  );
}

export default CardPayment;
