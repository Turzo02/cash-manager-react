import React from "react";

import { useEffect, useState } from "react";
import { DataProvider } from "./context/DataProvider";
import Layout from "./components/layout/Layout";
import BottomNav from "./components/layout/BottomNav";
import Dashboard from "./Pages/Dashboard";
import Books from "./Pages/Books";
import Toast from "./components/ui/Toast";


function AppContent() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!notification) return undefined;

    const timeoutId = window.setTimeout(() => setNotification(null), 3000);
    return () => window.clearTimeout(timeoutId);
  }, [notification]);

  const notify = (message, type = "success") => {
    setNotification({ id: Date.now(), message, type });
  };


  return (
    <>
      <Layout title={currentTab === "dashboard" ? "Home" : "My Books"}>
        {currentTab === "dashboard" && (
          <Dashboard
            isAddModalOpen={isAddModalOpen}
            closeAddModal={() => setIsAddModalOpen(false)}
            onNotify={notify}
          />
        )}
        {currentTab === "books" && <Books onNotify={notify} />}

        <BottomNav
          activeTab={currentTab}
          onTabChange={setCurrentTab}
          onAdd={() => {
            setCurrentTab("dashboard");
            setIsAddModalOpen(true);
          }}
        />
      </Layout>
      <Toast notification={notification} onClose={() => setNotification(null)} />
    </>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
