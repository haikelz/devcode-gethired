import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LazyMotion, domAnimation } from "framer-motion";
import { Provider } from "jotai";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFoundPage from "./pages/404";
import Details from "./pages/Details";
import Home from "./pages/Home";
import TestingPage from "./pages/TestingPage";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <LazyMotion features={domAnimation}>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/testing" element={<TestingPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </LazyMotion>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}
