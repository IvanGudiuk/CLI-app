const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const getAll = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error(`Error reading contacts from file: ${error.message}`);
    throw error;
  }
};

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(`Error updating contacts in file: ${error.message}`);
    throw error;
  }
};

const listContacts = async () => {
  const contacts = await getAll();
  console.table(contacts);
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
  console.log(result);
};

const addContact = async (name, email, phone) => {
  const contacts = await getAll();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  console.log(newContact);
};

module.exports = {
  getAll,
  updateContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
