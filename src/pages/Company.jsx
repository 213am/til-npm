import { Outlet } from "react-router-dom";

const Company = () => {
  return (
    <>
      <h1>회사</h1>
      <Outlet />
    </>
  );
};

export default Company;
