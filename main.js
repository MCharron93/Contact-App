let contacts = []

/**
 * Called when submitting the new Contact Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the contacts list.
 * Then reset the form
 * *** hints:
 * *** push: resources/push.jpg
 */

function createContact(){
  document.getElementById("new-contact-form").classList.remove("hidden")
}

function deleteForm(){
  document.getElementById("new-contact-form").classList.add("hidden")
}

 function addContact(event) {
  event.preventDefault()
  let form = event.target

  let contact = {
    id: generateId(),
    name: form.name.value,
    number: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }

  contacts.push(contact)
  saveContacts()
  form.reset()
  document.getElementById("new-contact-form").classList.add("hidden")
  drawContacts()
}

/**
 * Converts the contacts array to a JSON string then
 * Saves the string to localstorage at the key contacts 
 */
function saveContacts() {
 window.localStorage.setItem("contacts", JSON.stringify(contacts))
 drawContacts()
}

/**
 * Attempts to retrieve the contacts string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the contacts array to the retrieved array
 */
function loadContacts() {
  let contactData = JSON.parse(window.localStorage.getItem("contacts"))

  if(contactData){
    contacts = contactData
  }

}

/**
 * This function targets the contacts-list on the 
 * DOM and adds a new div element for each of the
 * contacts in the contacts array
 */
function drawContacts() {
  let template = ""

  contacts.forEach(contacts => {
    template += `
    <div class="container card mt-2 mb-2 ${contacts.emergencyContact ? 'emergency-contact' : ''}">
    <h3 class="mt-1 mb-1">${contacts.name}</h3>
    <p class="d-flex">
    <i class="fa fa-mobile" aria-hidden="true"></i>
    <span>${contacts.number}</span>
    </p>
    <p class="d-flex space-right mt-1 mb-1">
    <i class="action fa fa-trash text-danger" onclick="removeContact('${contacts.id}')"></i>
    </p>
    </div>`
  })

  document.getElementById("contact-list").innerHTML = template
}

/**
 * This function is called with a contact id
 * and will use the id to find and remove the 
 * contact by their id from the list of contacts
 * *** hints: 
 * *** findIndex: resources/findIndex.jpg
 * *** splice: resources/splice.jpg
 * @param {string} contactId 
 */
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  if(index == -1) {
    throw new Error("Invalid Contact Id")
  }
  contacts.splice(index, 1)
  saveContacts()
}

/**
 * Toggles the visibility of the AddContact Form
 */
function toggleAddContactForm() {

}


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()