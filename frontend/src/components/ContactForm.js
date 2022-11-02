import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Send to server, check if updating or creating new
    reset();
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
                <select {...register("gender")}>
                  <option></option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
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
