const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  getAll,
  updateContacts,
} = require("./contacts.js");
const { nanoid } = require("nanoid");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list": {
      return listContacts();
    }
    case "get": {
      return getContactById(id);
    }
    case "add": {
      return addContact(name, email, phone);
    }
    case "remove": {
      return removeContact(id);
    }
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
