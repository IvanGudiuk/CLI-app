const fs = require("fs/promises");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "/contacts.json");

const getAll = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await getAll();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getAll();
  const result = contacts.find((item) => item.id === contactId);
  console.log(result || null);
};

const removeContact = async (contactId) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === contactId);
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (name, email, phone) => {
  const contacts = await getAll();
  const newContact = { id: shortid.generate(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = {
  getAll,
  updateContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
