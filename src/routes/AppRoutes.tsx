import { Route, Routes, Navigate } from 'react-router-dom';
import MainLayout from '../layout/MainLayout/MainLayout';
import Stake from '../pages/Stake/Stake';
import Withdraw from '../pages/Withdraw/Withdraw';
import ClaimRewards from '../pages/ClaimRewards/ClaimRewards';

const AppRoutes = () => {
    return (
        <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Stake />} />
          <Route
            path="/withdraw"
            element={<Withdraw/>}
          />
          <Route
            path="/claim"
            element={<ClaimRewards/>}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    )
}

export default AppRoutes;