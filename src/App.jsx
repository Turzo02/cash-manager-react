import React from "react";

import { useState } from "react";
import { ThemeProvider } from "./context/ThemeProvider";
import { DataProvider } from "./context/DataProvider";
import Layout from "./components/layout/Layout";
import BottomNav from "./components/layout/BottomNav";
import Dashboard from "./Pages/Dashboard";
import Books from "./Pages/Books";

function AppContent() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <Layout  title={currentTab === "dashboard" ? "Overview" : "My Books"}>
      {currentTab === "dashboard" && (
        <Dashboard
          isAddModalOpen={isAddModalOpen}
          closeAddModal={() => setIsAddModalOpen(false)}
        />
      )}

      {currentTab === "books" && <Books />}

      <BottomNav
        activeTab={currentTab}
        onTabChange={setCurrentTab}
        onAdd={() => {
          setCurrentTab("dashboard");
          setIsAddModalOpen(true);
        }}
      />
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </ThemeProvider>
  );
}
