import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { Fragment, useState } from "react";
import Form from "react-validation/build/form";

import Navbar from "../Navbar";
import { groupService } from "../services/group.service";

const addGroupMutation = {
  mutationKey: "addGroupMutation",
  mutationFn: (group) => groupService.addNewGroup(group),
};

const ADD = () => {
  const client = useQueryClient();

  const [addFormData, setAddFormData] = useState({
    NameUser: "",
    Owner: "",
    description: "",
  });

  const [editFormData, setEditFormData] = useState({
    NameUser: "",
    Owner: "",
    description: "",
  });

  const { mutate } = useMutation(addGroupMutation);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const group = {
      name: addFormData.NameUser,
      description: addFormData.description,
    };
    mutate(group, {
      onSuccess: () => {
        client.invalidateQueries("MyGroups");
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="col-md-12">
        <div className="container-apps">
          <h2 className="addgruop">ADD GROUP</h2>
          <Form onSubmit={handleAddFormSubmit}>
            <input
              className="td"
              type="text"
              name="NameUser"
              required="required"
              placeholder="Enter a NameUser..."
              onChange={handleAddFormChange}
            />
            <input
              className="td"
              type="text"
              name="description"
              required="required"
              placeholder="Enter a description..."
              onChange={handleAddFormChange}
            />

            <div>
              <button className="btn-block1" type="submit">
                Add
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ADD;
