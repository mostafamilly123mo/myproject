import * as React from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CheckButton from "react-validation/build/button";
import InputBase from "@mui/material/InputBase";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "../Navbar";
import { groupService } from "../services/group.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const getMembersByEmail = {
  mutationFn: (email) => groupService.getMemberByEmail(email),
};

const saveMembersMutation = {
  mutationFn: ({ groupId, userIds }) =>
    groupService.addMembersToGroup(groupId, userIds),
};

export default function AddUser() {
  const { groupId } = useParams();
  const client = useQueryClient();
  const { data, mutate: searchByEmail } = useMutation(getMembersByEmail);
  const { mutate: saveMembers } = useMutation(saveMembersMutation);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const members = data?.users?.data || [];

  const handleAddMembers = () => {
    const userIds = selectedMembers.map((member) => member.id);
    saveMembers(
      { groupId: Number(groupId), userIds },
      {
        onSuccess: () => {
          client.invalidateQueries("Members");
          toast.success("Users added successfully");
        },
      }
    );
  };

  return (
    <>
      <div className="add-card">
        <div className="card1">
          <h2 className="title"> NameGroup</h2>

          <Box sx={{ flexGrow: 1 }} className="box">
            <AppBar position="static" className="appbar">
              <Toolbar className="toolbar">
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
              </Toolbar>
            </AppBar>
          </Box>

          <Stack spacing={3} sx={{ width: 400 }} padding={5}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={members}
              getOptionLabel={(option) => option.name}
              value={selectedMembers}
              onChange={(_, values) => {
                setSelectedMembers((prev) => [...prev, ...values]);
              }}
              renderInput={(params) => (
                <TextField
                  className="text"
                  {...params}
                  variant="standard"
                  label="Multiple values"
                  placeholder="search..."
                  onChange={(e) => searchByEmail(e.target.value)}
                />
              )}
            />
          </Stack>
          <div>
            <button className="rev" onClick={handleAddMembers}>
              ADD
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
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
