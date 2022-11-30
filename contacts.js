const fs = require('fs');
const path = require('path');
const nanoid = require("nanoid");
// import { nanoid } from 'nanoid'

const fsPromises = fs.promises;
const contactsPath = path.resolve('./db/contacts.json')
// console.log(fs)


/*
 * Розкоментуйте і запиши значення
 * const contactsPath = ;
 */

// TODO: задокументувати кожну функцію
async function listContacts() {
  const res = await fsPromises.readFile(contactsPath, 'utf8').then(r => JSON.parse(r)).catch(console.error);
  // console.log('res', res.map(it => it));
  return res;
}


async function getContactById(contactId) {
  const list = await listContacts().catch(console.error);
  const contact = list.find(it => contactId === it.id);
  return contact;
}

async function removeContact(contactId) {
  const list = await listContacts().catch(console.error);
  const newList = list.filter(it => contactId !== it.id);
  await fsPromises.writeFile(contactsPath, newList).catch();
}

async function addContact(name, email, phone) {
  const list = await listContacts().catch(console.error);
  const id = nanoid(5);
  console.log(id)
  const newList = [...list, {name, email, phone, id}];
  await fsPromises.writeFile(contactsPath, JSON.stringify(newList, null, 2)).catch(console.error);
}

addContact('Nick', 'nick@mail.com', 123412341234)

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}