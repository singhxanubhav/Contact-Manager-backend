import asyncHandler from "express-async-handler";
import { constant } from "../constants.js";

import { Contact } from "../models/contact.model.js";

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  console.log("the request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are requried");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body, 
    {new: true});
  res.status(201).json(updateContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create contact" });
});

export { getContact, createContact, getContacts, updateContact, deleteContact };
