import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./Join";
import After from "./pages/member/After";
import GoogleAfter from "./pages/member/GoogleAfter";
import AnimePage from "./pages/AnimePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/join" element={<Join />} />
        <Route path="/login" element={<h1>로그인 페이지</h1>} />
        <Route path="/user" element={<h1>유저 로그인 성공</h1>} />
        <Route path="/member/kko" element={<After />} />
        <Route path="/member/google" element={<GoogleAfter />} />
        <Route path="/anime" element={<AnimePage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
