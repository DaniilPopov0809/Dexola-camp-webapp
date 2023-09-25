import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";

const Stake = lazy(() => import("../pages/Stake/Stake"));
const Withdraw = lazy(() => import("../pages/Withdraw/Withdraw"));
const ClaimRewards = lazy(() => import("../pages/ClaimRewards/ClaimRewards"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Stake />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/claim" element={<ClaimRewards />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
