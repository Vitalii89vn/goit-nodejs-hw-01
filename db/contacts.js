const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const allContacts = await fs.readFile(contactsPath);
    return JSON.parse(allContacts)
};

async function getContactById(contactId) {
    const contacts = await listContacts();
    const findContact = contacts.find(contact => contact.id === contactId);
    return findContact || null;
};

async function removeContact(contactId) {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};

async function addContact({name, email, phone}) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone
  }
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};