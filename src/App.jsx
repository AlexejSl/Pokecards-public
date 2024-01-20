import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./components/main/AppLayout";
import MainPage from "./components/main/MainPage";
import Login from "./components/signupAndLogin/Login";
import Signup from "./components/signupAndLogin/Signup";
import User from "./components/myAccount/User";
import MyCards from "./components/myCards/MyCards";
import PageNotFound from "./components/other_LoadErrBtns/PageNotFound";
import Card from "./components/cardPage/Card";

import ProtectedRoute from "./api/ProtectedRoute";
import ProvideUserInfo from "./api/ProvideUserInfo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const toastOptions = {
  style: {
    fontSize: "1.6rem",
  },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/main" element={<MainPage />} />
            <Route index element={<Navigate replace to="/main" />} />
            <Route
              path="card/:id"
              element={
                <ProvideUserInfo>
                  <Card />
                </ProvideUserInfo>
              }
            />
            <Route
              path="my-cards"
              element={
                <ProtectedRoute>
                  <MyCards />
                </ProtectedRoute>
              }
            />
            <Route
              path="user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster toastOptions={toastOptions} />
    </QueryClientProvider>
  );
}

export default App;
