export type User = {
  id: string;
  name: string;
  email: string;
    phone: string; 
};

// fake DB
let users: User[] = [
  { id: "1", name: "Ziad", email: "ziad@gmail.com" , phone: "01012345678" },
  { id: "2", name: "Ahmed", email: "ahmed@gmail.com", phone: "01123456789" },
];

// GET
export const getUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users), 300);
  });
};

// DELETE
export const deleteUser = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    users = users.filter((u) => u.id !== id);
    setTimeout(() => resolve(), 200);
  });
};