export const ADMIN_TEST_USERS = {
  admin: {
    email: "admin@weshow.ru",
    password: "password",
    role: "admin",
    name: "Администратор",
    company_name: "WeShow",
  },
  manager: {
    email: "manager@weshow.ru",
    password: "password",
    role: "manager",
    name: "Менеджер",
    company_name: "WeShow",
  },
};

export const isTestUser = (email: string, password: string) =>
  Object.values(ADMIN_TEST_USERS).find((u) => u.email === email && u.password === password) || null;







