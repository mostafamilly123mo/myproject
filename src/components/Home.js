import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { testService } from "../services/test.service";

const UserQuery = {
  queryKey: ["UserInfo"],
  queryFn: () => testService.testGet(),
  suspense: true,
};

const Home = () => {
  const { data } = useQuery(UserQuery);

  return data ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Home;
