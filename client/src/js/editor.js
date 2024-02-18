import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
    const localData = localStorage.getItem('content');

    // check if the CodeMirror repo is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    //set the editor to what is in local storage unless there is nothing there or it can't be found
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Saves the content of the editor when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}