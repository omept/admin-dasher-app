import {
  Authenticated,
  // GitHubBanner,
  Refine,
  WelcomePage,
} from "@refinedev/core";
// import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, dataProvider, liveProvider } from "./providers";

import { Home, ForgotPassword, Login, Register } from "./pages";
import Layout from "./components/layouts";
import { resources } from "./config/resources";
import CompanyList from "./pages/company/list";
import CompanyCreate from "./pages/company/create";
import CompanyEdit from "./pages/company/edit";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <AntdApp>
          {/* <DevtoolsProvider> */}
          <Refine
            dataProvider={dataProvider}
            liveProvider={liveProvider}
            authProvider={authProvider}
            resources={resources}
            notificationProvider={useNotificationProvider}
            routerProvider={routerBindings}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              useNewQueryKeys: true,
              projectId: "SB7Z1V-uIfi8P-ZYiopt",
              liveMode: "auto",
            }}
          >
            <Routes>
              <Route index element={<WelcomePage />} />
              <Route path="register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                element={
                  <Authenticated
                    key="authenticated-layout"
                    fallback={<CatchAllNavigate to="/login" />}
                  >
                    <Layout>
                      <Outlet />
                    </Layout>
                  </Authenticated>
                }
              >
                <Route path="/home" element={<Home />} />
                <Route path="/companies">
                  <Route index element={<CompanyList />} />
                  <Route path="new" element={<CompanyCreate />} />
                  <Route path="edit/:id" element={<CompanyEdit />} />
                </Route>
              </Route>
            </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
          {/* <DevtoolsPanel /> */}
          {/* </DevtoolsProvider> */}
        </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
