const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  getAll,
  updateContacts,
} = require("./db/contacts.js");
const shortid = require("shortid");
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
      const contacts = await getAll();
      console.table(contacts);
    }
    case "get": {
      const contacts = await getAll();
      const result = contacts.find((item) => item.id === id);
      console.log(result || null);
    }
    case "add": {
      const contacts = await getAll();
      const newContact = { id: shortid.generate(), name, email, phone };
      contacts.push(newContact);
      await updateContacts(contacts);
      console.log(newContact);
    }
    case "remove": {
      const contacts = await getAll();
      const index = contacts.findIndex((item) => item.id === id);
      const [result] = contacts.splice(index, 1);
      await updateContacts(contacts);
      console.log(result);
    }
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
