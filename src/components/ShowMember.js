import React, { Fragment, useState } from "react";
import EditableRow from "./EditableRow";
import ReadOnlyRow from "./DeletetableRow";
import Makedata from "./Makedata.json";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { styled, alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../Navbar";
import { groupService } from "../services/group.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

const getMembersQuery = (groupId, search = "") => ({
  queryKey: ["Members", { groupId, search }],
  queryFn: () => groupService.getGroupMembers(groupId, search),
});

const deleteMemberMutation = {
  mutationFn: ({ groupId, userId }) =>
    groupService.deleteMember(groupId, userId),
};

const ShowMember = () => {
  const [contacts, setContacts] = useState(Makedata);
  const client = useQueryClient();

  const [editFormData, setEditFormData] = useState({
    NameUser: "",
    Owner: "",
    description: "",
  });

  const { groupId } = useParams();
  const [editContactId, setEditContactId] = useState(null);
  const [search, setSearch] = useState("");
  const { mutate: deleteMember } = useMutation(deleteMemberMutation);
  const { data } = useQuery(getMembersQuery(Number(groupId), search));
  const members = data?.["$group_member"]?.data || [];

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      NameUser: editFormData.NameUser,
      Owner: editFormData.Owner,
      description: editFormData.description,
    };
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === editContactId);
    newContacts[index] = editedContact;
    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      NameUser: contact.NameUser,
      Owner: contact.Owner,
      description: contact.description,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (userId) => {
    deleteMember(
      {
        groupId: Number(groupId),
        userId: userId,
      },
      {
        onSuccess: (res) => {
          client.resetQueries("Members");
          if (res.errNum !== "200") {
            toast.error(res?.msg);
          } else {
            toast.success(res?.msg);
          }
        },
      }
    );
  };

  return (
    <>
      <div className="container-app">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" className="appbar1">
            <Toolbar className="toolbar1">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  value={search}
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Search>
            </Toolbar>
          </AppBar>
        </Box>
        <h2 className="allgroups"> GROUPS</h2>
        <form className="form-data" onSubmit={handleEditFormSubmit}>
          <table className="table">
            <thead>
              <tr>
                <th className="th">Name </th>
                <th className="th">Email</th>
                <th className="th">Gender</th>
                <th className="th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.gender}</td>
                  <td>
                    <Button onClick={() => handleDeleteClick(member.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

export default ShowMember;
