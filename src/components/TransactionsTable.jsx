import { Radio, Select, Table } from "antd";
import React, { useState } from "react";
import searchImg from "../assets/search.svg";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";

const TransactionsTable = ({ transactions, addTransaction, fetchTransactions }) => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ammount",
      dataIndex: "ammount",
      key: "ammount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  let filteredTransactions = transactions.filter((transaction) => {
    if (transaction) return transaction.name.toLowerCase().includes(search.toLowerCase());
  });

  let sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === "date") {
      return new Date(a.date) - new Date(b.date);
    } else if (sortKey === "ammount") {
      return a.ammount - b.ammount;
    } else {
      return 0;
    }
  });

  function exportCSV() {
    var csv = unparse({
      fields: ["name", "amount", "tag", "type", "date"],
      data: transactions,
    });
    let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importCSV(e) {
    e.preventDefault();
    try {
      parse(e.target.files[0], {
        header: true,
        complete: async function (result) {
          for (const transaction of result.data) {
            const newTransaction = {
              ...transaction,
              ammount: parseFloat(transaction.ammount),
            };

            await addTransaction(newTransaction, true);
          }
        },
      });

      toast.success("All Transactions Added!");
      e.target.files = null;
      fetchTransactions();
    } catch (error) {
      // toast.error("erro.message");
    }
  }

  return (
    <>
      <div className="flex justify-between mx-auto items-center gap-4 w-11/12">
        <div className="flex p-2 justify-start items-center gap-2 h-10 w-full shadow-own-uday rounded-lg px-5">
          <img src={searchImg} width="16" />
          <input className="w-full border-0 outline-none" type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name" />
        </div>

        <Select
          variant="borderless"
          className="w-[20%] mr-2 border-none outline-none flex items-center rounded-lg h-10 transition-all duration-[0.2s] shadow-own-uday"
          placeholder="Filter"
          value={typeFilter}
          onChange={(val) => setTypeFilter(val)}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="income">Income</Select.Option>
          <Select.Option value="expense">Expense</Select.Option>
        </Select>
      </div>
      <div className="w-11/12 rounded-lg p-8 mx-auto flex flex-col gap-8 shadow-own-uday ">
        <div className="items-center flex justify-between flex-wrap">
          <h1 className="font-bold text-2xl">My Transactions</h1>
          <Radio.Group className="flex flex-wrap" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            <Radio.Button value="">No Sort</Radio.Button>
            <Radio.Button value="date">Sort By Date</Radio.Button>
            <Radio.Button value="ammount">Sort By Ammount</Radio.Button>
          </Radio.Group>

          <div className="flex gap-5 items-center justify-center w-[400px]">
            <button
              className="text-[var(--theme)] hover:bg-[var(--theme)] hover:text-[var(--white)] text-sm m-0 text-center w-full p-2 border-2 border-[var(--theme)] rounded cursor-pointer flex justify-center items-center h-auto"
              onClick={exportCSV}
            >
              Export to CSV
            </button>
            <label
              htmlFor="file-csv"
              className="text-sm m-0 text-center w-full p-2 border-2 border-[var(--theme)] rounded hover:text-[var(--theme)] cursor-pointer flex justify-center items-center h-aut hover:bg-[var(--white)] hover:rounded-md hover:text-blue-500 bg-[var(--theme)] text-[var(--white)]"
            >
              Import from CSV
            </label>
            <input type="file" id="file-csv" required accept=".csv" style={{ display: "none" }} onChange={importCSV} />
          </div>
        </div>
        <div>
          <Table dataSource={sortedTransactions} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default TransactionsTable;
