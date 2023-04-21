
const contacts = require("./db/contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case "list":
          const allContacts = await contacts.listContacts();
          return console.table(allContacts);
          break;

      case "get":
          const selectContact = await contacts.getContactById(id);
          return console.log(selectContact)
          break;

      case "add":
          const newContact = await contacts.addContact({ name, email, phone });
          return console.log(newContact);
          break;

      case "remove":
          const removeContact = await contacts.removeContact(id);
          return console.log(removeContact);
          break;

    default:
      console.warn("\x1B[31m Unknown action type!")
    }
};

invokeAction(argv);




