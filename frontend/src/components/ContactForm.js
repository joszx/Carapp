import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm({
  contact,
  addContact,
  updateContact,
  updateContactsList,
  setEditState,
}) {
  const defaultValues = {
    name: contact != null ? contact.name : "",
    email: contact != null ? contact.email : "",
    phone: contact != null ? contact.phone : "",
    gender: contact != null ? contact.gender : "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
  });

  const onSubmit = (data) => {
    if (contact != null) {
      // contact exits, update this contact
      updateContact(data.name, data.email, data.phone, data.gender);
    } else {
      // contact doesnt exist, create new contact
      addContact(data.name, data.email, data.phone, data.gender);
    }
    reset();
    updateContactsList();
    setEditState("");
  };

  useEffect(() => {
    reset(defaultValues);
  }, [contact]);

  return (
    <form className="has-text-left" onSubmit={handleSubmit(onSubmit)}>
      <div className="field">
        <label className="label has-text-white">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="John Doe"
            {...register("name", {
              required: "Name is required",
              maxLength: 100,
            })}
          />
          <p class="help is-danger">{errors.name?.message}</p>
        </div>
      </div>

      <div className="field">
        <label className="label has-text-white">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="example@email.com"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email is invalid",
              },
            })}
          />
          <p class="help is-danger">{errors.email?.message}</p>
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
                {...register("phone", {
                  required: false,
                  pattern: {
                    value: /^[0-9]{8}$/i,
                    message: "Phone number required 8 digits",
                  },
                })}
              />
              <p class="help is-danger">{errors.phone?.message}</p>
            </div>
          </div>
        </div>

        <div className="column">
          <div className="field">
            <label className="label has-text-white">Gender</label>
            <div className="control">
              <div className="select">
                <select {...register("gender")}>
                  <option value=""></option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Non-binary">Non-binary</option>
                </select>
                {/* <p class="help is-danger">{errors.gender?.message}</p> // gender has no error currently */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <input
        className="button mt-3 is-fullwidth is-link"
        type="submit"
        value={contact != null ? "Edit contact" : "Add contact"}
      ></input>
    </form>
  );
}
