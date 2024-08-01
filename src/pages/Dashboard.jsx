import React, { useEffect, useState } from "react";
import { AddExpense, AddIncome, Cards, Charts, Header, NoTransaction, TransactionsTable } from "../components";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, getDocs, query } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      ammount: parseFloat(values.ammount),
      tag: values.tag,
      name: values.name,
    };

    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(collection(db, `users/${user.uid}/transactions`), transaction);
      console.log("Document written with ID: ", docRef.id);
      if (!many) toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.log("Error adding document: ", e);
      if (!many) toast.error("Error adding transaction!");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.ammount;
      } else {
        expenseTotal += transaction.ammount;
      }
    });

    setIncome(incomeTotal);
    setExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }

  function resetBalance() {
    if (transactions.length == 0) return toast.error("No transactions should be present to reset the balance!");

    let confirm = window.confirm("Are you sure you want to reset the balance?");
    if (confirm) {
      setIncome(0);
      setExpense(0);
      setTotalBalance(0);

      transactions.forEach((transaction) => {
        deleteTransaction(transaction);
      });
      setTransactions([]);
      toast.success("Balance Reset!");
    }
  }

  async function deleteTransaction(transaction) {
    const q = query(collection(db, `users/${user.uid}/transactions`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.data().date === transaction.date) {
        deleteDoc(doc.ref);
        let newArr = transactions.filter((item) => item.date !== transaction.date);
        setTransactions(newArr);
        calculateBalance();

        toast.success("Transaction Deleted!");
      }
    });
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        transactionsArray.push(doc.data());
      });
      setTransactions(transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  let sortedTransactions = transactions.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
      <Header />
      {loading ? (
        <div className="h-screen flex w-full text-5xl items-center justify-center">
          <span className="flex gap-3 items-center justify-center">
            <p className="border-4 border-white border-t-black border-r-black rounded-[50%] w-[50px] h-[50px] animate-spin"></p>
            <p>Loading...</p>
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-between">
          <Cards resetBalance={resetBalance} income={income} expense={expense} totalBalance={totalBalance} showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal} />
          {transactions.length != 0 ? <Charts sortedTransactions={sortedTransactions} /> : <NoTransaction />}
          <AddExpense isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancel={handleExpenseCancel} onFinish={onFinish} />
          <AddIncome isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancel={handleIncomeCancel} onFinish={onFinish} />
          <TransactionsTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
