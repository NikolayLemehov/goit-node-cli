const fs = require('fs');
const path = require('path');
const nanoid = require("nanoid");

const fsPromises = fs.promises;
const contactsPath = path.resolve('./db/contacts.json')

async function listContacts() {
  return await fsPromises.readFile(contactsPath, 'utf8')
    .then(r => JSON.parse(r)).catch(console.error);
}


async function getContactById(contactId) {
  const list = await listContacts().catch(console.error);
  const contact = list.find(it => contactId === it.id);
  return contact ? contact : false;
}

async function removeContact(contactId) {
  const list = await listContacts().catch(console.error);
  const index = list.findIndex(it => contactId === it.id);
  const removableContact = list[index];
  list.splice(index, 1);
  await fsPromises.writeFile(contactsPath, JSON.stringify(list, null, 2)).catch();
  return removableContact ? removableContact : false;
}

async function addContact(name, email, phone) {
  const list = await listContacts().catch(console.error);
  const id = nanoid(5);
  const newContact = {id, name, email, phone}
  const newList = [...list, newContact];
  await fsPromises.writeFile(contactsPath, JSON.stringify(newList, null, 2)).catch(console.error);
  return newContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}