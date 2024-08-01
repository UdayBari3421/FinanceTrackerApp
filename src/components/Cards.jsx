import { Row, Card } from "antd";
import React from "react";
import Button from "./Button";
// import { auth, db } from "../firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { toast } from "react-toastify";

const Cards = ({ showIncomeModal, showExpenseModal, income, expense, totalBalance, resetBalance }) => {
  return (
    <div className="flex justify-center items-center">
      <Row className="flex-wrap gap-12 flex justify-between items-center my-8 w-11/12">
        <Card className="font-[Montserrat,serif] font-semibold p-1 shadow-own-uday flex-1" bordered={true}>
          <h1 className="text-lg">Current Balance</h1>
          <p className="mb-5 font-normal">₹{totalBalance}</p>
          <Button text="Reset Balance" blue={true} onClick={resetBalance} />
        </Card>

        <Card className="font-[Montserrat,serif] font-semibold p-1 shadow-own-uday flex-1" bordered={true}>
          <h1 className="text-lg">Total Income</h1>
          <p className="mb-5 font-normal">₹{income}</p>
          <Button text="Add Income" blue={true} onClick={showIncomeModal} />
        </Card>

        <Card className="font-[Montserrat,serif] font-semibold p-1 shadow-own-uday flex-1" bordered={true}>
          <h1 className="text-lg">Total Expense</h1>
          <p className="mb-5 font-normal">₹{expense}</p>
          <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
        </Card>
      </Row>
    </div>
  );
};

export default Cards;
