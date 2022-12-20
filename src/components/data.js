import { Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { groupService } from "../services/group.service";
import Makedata from "./Makedata.json";

const groupsQuery = {
  queryKey: ["MyGroups"],
  queryFn: () => groupService.getUserGroups(),
  suspense: true,
};

const Data = () => {
  const { data } = useQuery(groupsQuery);
  const groups = data.groups;
  const navigate = useNavigate();

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="container-app">
        <h2 className="allgroups"> GROUPS</h2>
        <form className="form-data">
          <table className="table">
            <thead>
              <tr>
                <th className="th">NameGroup </th>
                <th className="th">Owner</th>
                <th className="th"> description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.id}>
                  <td>{group.name}</td>
                  <td>{group.user_id}</td>
                  <td>{group.description}</td>
                  <td style={{ display: "flex", columnGap: 4 }}>
                    <Button onClick={() => navigate(`${group.id}/showmember`)}>
                      Members
                    </Button>
                    <Button onClick={() => navigate(`${group.id}/adduser`)}>
                      Add member
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            <div>
              <button
                className=" btn-block"
                onClick={() => openInNewTab("./addgroup")}
              >
                ADD Group
              </button>
            </div>
          </table>
        </form>
      </div>
    </>
  );
};

export default Data;
