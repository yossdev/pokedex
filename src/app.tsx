import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { MetaProvider } from "@solidjs/meta";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <MainLayout>
            <Suspense fallback={<div>App Loading ...</div>}>
              {props.children}
            </Suspense>
          </MainLayout>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
