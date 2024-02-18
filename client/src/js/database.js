// I want to give a big thanks to josh
import { openDB } from 'idb';

// Initialize the 'jate' database with an object store
const initdb = async () => openDB('jate', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('jate')) {
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    } else {
      console.log('jate database already exists');
    }
  },
});

// Function to add or update content in the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Using .put() to add or update data; will overwrite data at id: 1
  //since we don't need multiple items here, we are just using it as a address to overwrite.
  const result = await store.put({ id: 1, value: content });
  console.log('Data saved to the database', result);
};

// Function to retrieve all content from the database
export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  const result = await store.getAll();
  console.log('result.value', result);
  return result?.value;
};

initdb();