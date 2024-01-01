import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import MainPage from "./pages/MainPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import User from "./pages/User";
import MyCards from "./pages/MyCards";
import { Navigate } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Card from "./pages/Card";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
            <Route path="main" element={<MainPage />} />
            <Route index element={<Navigate replace to="main" />} />
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
