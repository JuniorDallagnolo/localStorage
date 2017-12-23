var APP = {
  KEY : "dall0078",
  contacts : [],

  init: function () {
    if (!localStorage.getItem(APP.KEY)) {
      contacts = [{"fullname":"Ernilo Dallagnolo Junior", "phone":"343-777-5936", "email":"dall0078@algonquinlive.com"}];
      localStorage.setItem(APP.KEY, JSON.stringify(APP.contacts));
    } else {
      APP.contacts = JSON.parse(localStorage.getItem(APP.KEY));
    }
    APP.updateList();
    document.querySelector(".fab").addEventListener("click", APP.showForm);
    document.getElementById("close").addEventListener("click", APP.hideForm);
    document.getElementById("save").addEventListener("click", APP.addContact);
  },

  updateList: function () {
    let ul = document.querySelector('.contacts');
    ul.innerHTML = '';
    let df = new DocumentFragment();
    APP.contacts.forEach((contact) => {
      console.log(contact);
      df.appendChild(APP.createContact(contact));
    });
    ul.appendChild(df);
  },

  showForm: function (ev) {
    ev.preventDefault();
    document.querySelector('.overlay').style.display = 'block';
    document.querySelector('.contactForm').style.display = 'block';
  },

  hideForm: function (ev) {
    ev.preventDefault();
    document.querySelector('.overlay').style.display = 'none';
    document.querySelector('.contactForm').style.display = 'none';
    document.querySelector('.contactForm form').reset();
  },

  addContact: function (ev) {
    ev.preventDefault();
    let fullname = document.getElementById('input-name').value.trim();
    let email = document.getElementById('input-email').value.trim();
    let phone = document.getElementById('input-phone').value.trim();
    if (fullname && email && phone) {
      let container = {
        fullname,
        email,
        phone
      };
      console.log(contacts.push(container));
      localStorage.setItem(KEY, JSON.stringify(contacts));
      document.querySelector('.contactform form').reset();
      app.hideForm(ev);
      app.updateList();
    }
  },

  deleteContact: (ev) => {
    ev.preventDefault();
    let email = ev.target.getAttribute('data-key');
    contacts = contacts.filter((contact) => {
      return !(contact.email == email);
    });
    localStorage.setItem(KEY, contacts);
    app.updateList();
  },

  createContact: function (contact) {
    let li = document.createElement('li');
    li.className = 'contact';
    let del = document.createElement('span');
    del.className = 'delete';
    del.setAttribute('data-key', contact.email);
    del.addEventListener('click', APP.deleteContact);
    li.appendChild(del);
    let h3 = document.createElement('h3');
    h3.innerText = contact.fullname;
    li.appendChild(h3);
    let email = document.createElement('p');
    email.className = 'email'
    email.innerText = contact.email;
    li.appendChild(email);
    let num = document.createElement('p');
    num.className = 'phone';
    num.innerText = contact.phone;
    li.appendChild(num);
    return li;
  }
}

document.addEventListener('DOMContentLoaded', APP.init);
