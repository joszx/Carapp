import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm({
  contact,
  addContact,
  updateContactsList,
}) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Send to server, check if updating or creating new
    addContact(data.name, data.email, data.phone, data.gender);
    reset();
    updateContactsList();
    console.log(data);
  };

  return (
    <form className="has-text-left" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label has-text-white">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="John Doe"
            defaultValue={contact != null ? contact.name : ""}
            {...register("name", { required: true, maxLength: 100 })}
          />
        </div>
      </div>

      <div className="field">
        <label className="label has-text-white">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="example@email.com"
            defaultValue={contact != null ? contact.email : ""}
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
        </div>
        {/* <p class="help is-danger">This email is invalid</p> */}
      </div>

      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label has-text-white">Phone</label>
            <div className="control">
              <input
                className="input"
                type="undefined"
                placeholder="91234567"
                defaultValue={contact != null ? contact.phone : ""}
                {...register("phone", {
                  required: false,
                  pattern: /^[0-9]{8}$/i,
                })}
              />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label className="label has-text-white">Gender</label>
            <div className="control">
              <div className="select">
                <select
                  {...register("gender")}
                  defaultValue={contact != null ? contact.gender : ""}
                >
                  <option></option>
                  <option
                    selected={
                      contact != null && contact.gender === "Male"
                        ? "selected"
                        : ""
                    }
                  >
                    Male
                  </option>
                  <option
                    selected={
                      contact != null && contact.gender === "Female"
                        ? "selected"
                        : ""
                    }
                  >
                    Female
                  </option>
                  <option
                    selected={
                      contact != null && contact.gender === "Non-binary"
                        ? "selected"
                        : ""
                    }
                  >
                    Non-binary
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        className="button mt-3 is-fullwidth is-link"
        type="submit"
        value="Add contact"
      ></input>
    </form>
  );
}
