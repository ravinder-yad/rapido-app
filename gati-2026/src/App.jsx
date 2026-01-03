import { BrowserRouter, Routes, Route } from "react-router-dom";
import MobileLayout from "./layouts/MobileLayout";
import { RideProvider } from "./context/RideContext";

// Pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import MapRoute from "./pages/MapRoute";
import SelectRide from "./pages/SelectRide";
import RideRunning from "./pages/RideRunning";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Wallet from "./pages/Wallet";
import AddMoney from "./pages/AddMoney";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";

import OTPVerification from "./pages/OTPVerification";
import Signup from "./pages/Signup";
import HelpSupport from "./pages/HelpSupport";
import Language from "./pages/Language";
import Notifications from "./pages/Notifications";
import RequireAuth from "./components/RequireAuth";
import FinishProfile from "./pages/FinishProfile";

function App() {
    return (
        <RideProvider>
            <BrowserRouter>
                <MobileLayout>
                    <Routes>
                        {/* Protected Routes - Now including Home as per 'Strict Login' requirement */}
                        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
                        <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
                        <Route path="/map" element={<RequireAuth><MapRoute /></RequireAuth>} />

                        <Route path="/select-ride" element={<RequireAuth><SelectRide /></RequireAuth>} />
                        <Route path="/ride" element={<RequireAuth><RideRunning /></RequireAuth>} />
                        <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
                        <Route path="/order-details" element={<RequireAuth><OrderDetails /></RequireAuth>} />
                        <Route path="/wallet" element={<RequireAuth><Wallet /></RequireAuth>} />
                        <Route path="/add-money" element={<RequireAuth><AddMoney /></RequireAuth>} />
                        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
                        <Route path="/edit-profile" element={<RequireAuth><EditProfile /></RequireAuth>} />
                        <Route path="/notifications" element={<RequireAuth><Notifications /></RequireAuth>} />

                        {/* Auth Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/otp" element={<OTPVerification />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/finish-profile" element={<FinishProfile />} />

                        <Route path="/support" element={<HelpSupport />} />
                        <Route path="/language" element={<Language />} />
                    </Routes>
                </MobileLayout>
            </BrowserRouter>
        </RideProvider>
    );
}

export default App;
