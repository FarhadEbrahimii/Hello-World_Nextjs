// frontend/lib/userQuestionService.ts

export interface UserQuestion {
  id: number;
  firstName: string;
  lastName: string;
  score: number;
}

export interface CustomerPage {
  content: UserQuestion[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export async function fetchCustomers(page: number, size: number): Promise<CustomerPage> {
  const res = await fetch(`http://localhost:8081/api/user-questions?page=${page}&size=${size}`, {
    cache: "no-store", // برای dev mode، همیشه fresh fetch
  });

  if (!res.ok) {
    throw new Error("Failed to fetch customers");
  }

  return res.json();
}


