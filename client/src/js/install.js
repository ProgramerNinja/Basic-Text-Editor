const butInstall = document.getElementById('buttonInstall');

// Adds an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    
    window.deferredPrompt = event;

    // Removes the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }
  
    // Shows the prompt
    promptEvent.prompt();
    
    // Reset the deferred prompt variable so it can only be used once.
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
      // Clear prompt
  window.deferredPrompt = null;
});
