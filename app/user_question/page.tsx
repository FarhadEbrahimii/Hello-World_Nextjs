// frontend/app/user_question/page.tsx

"use client";

import { useState, useEffect } from "react";
import { fetchCustomers, CustomerPage } from "@/lib/userQuestionService";

export default function CustomersPage() {
  const [data, setData] = useState<CustomerPage | null>(null);
  const [page, setPage] = useState(0);
  const size = 5;

  useEffect(() => {
    loadData();
  }, [page]);

  async function loadData() {
    try {
      const result = await fetchCustomers(page, size);
      setData(result);
    } catch (error) {
      console.error(error);
    }
  }

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">نام</th>
            <th className="border p-2">نام خانوادگی</th>
            <th className="border p-2">نمره</th>
          </tr>
        </thead>
        <tbody>
          {data.content.map((customer) => (
            <tr key={customer.id}>
              <td className="border p-2">{customer.id}</td>
              <td className="border p-2">{customer.firstName}</td>
                            <td className="border p-2">{customer.lastName}</td>

              <td className="border p-2">{customer.score}</td>

            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex items-center gap-4">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page + 1} of {data.totalPages}
        </span>

        <button
          disabled={page + 1 === data.totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}


