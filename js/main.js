var APP = {
  KEY: "dall0078",
  contactList: {},

  //MAIN INIT FUNCTION - CHECKS FOR LOCALSTORAGE AND ADD HANDLERS
  init: function () {
    let ls = localStorage.getItem(APP.KEY);
    if (ls == null) {
      APP.contactList.contacts = [];
      APP.addContact("Ernilo Dallagnolo Junior", "343-777-5936", "dall0078@algonquinlive.com", -1);
      APP.storeItems();
    } else {
      APP.contactList = JSON.parse(ls);
    }
    APP.genList();
    document.querySelector(".fab").addEventListener("click", APP.toogleOver);
    document.getElementById("close").addEventListener("click", APP.toogleOver);
    document.getElementById("save").addEventListener("click", APP.btnSave);
  },

  //FUNCTION THAT JUST STORES - SAVING TIME REWRITING CODE
  storeItems: function () {
    localStorage.setItem(APP.KEY, JSON.stringify(APP.contactList));
  },

  //MAIN FUNCTION TO GENERATE HTML PAGE DISPLAY 
  genList: function () {
    document.querySelectorAll(".delete").forEach(function (tar) {
      tar.removeEventListener("click", APP.btnDeleteClick);
    });
    document.querySelectorAll("li").forEach(function (li) {
      li.removeEventListener("click", APP.toggleOver);
    });

    let main = document.querySelector("main");
    document.querySelector("main").removeChild(main.firstChild);
    let ul = document.createElement("ul");
    ul.className = "contacts";
    APP.contactList.contacts.forEach(function (item, position) {
      ul.appendChild(APP.cardBuilder(item.fullname, item.phone, item.email, position));
    });
    main.appendChild(ul);
  },
  
  //FUNCTION TO BUILD THE HTML CARDS OF EACH CONTACT IN THE JSON FILE
  cardBuilder: function (fullname, phone, email, position) {
    let liItem = document.createElement("li");
    liItem.className = "contact";
    let btnDelete = document.createElement("span");
    btnDelete.className = "delete";
    btnDelete.addEventListener("click", APP.btnDelete);
    liItem.appendChild(btnDelete);
    let h3Name = document.createElement("h3");
    h3Name.textContent = fullname;
    liItem.appendChild(h3Name);
    let pEmail = document.createElement("p");
    pEmail.textContent = email;
    pEmail.className = "email";
    liItem.appendChild(pEmail);
    let pPhone = document.createElement("p");
    pPhone.textContent = phone;
    pPhone.className = "phone";
    liItem.appendChild(pPhone);
    liItem.setAttribute("data-position", position);
    liItem.addEventListener("click", APP.toogleOver);
    return liItem;
  },

  //FUNCTION TO TOOGLE BETWEEN THE STATES OF THE OVERLAY
  toogleOver: function () {
    let over = document.querySelector(".overlay")
    let state = over.getAttribute("data-state");
    if (state == "open") {
      over.setAttribute("data-state", "closed");
    } else {
      let mode = this.getAttribute("data-mode");
      if (mode == "add") {
        APP.fillModal();
      } else {
        APP.fillModal(this);
      }
      over.setAttribute("data-state", "open");
    }
  },

  //FUNCTION TO GENERATE THE 2 DIFFERENTS MODAL WINDOW TYPES ADD OR EDIT
  fillModal: function (liItem) {
    document.getElementById("name").className = "";
    if (liItem) {
      document.getElementById("name").value = liItem.querySelector("h3").textContent;
      document.getElementById("phone").value = liItem.querySelector(".phone").textContent;
      document.getElementById("email").value = liItem.querySelector(".email").textContent;
      document.querySelector(".modal").setAttribute("data-position", liItem.getAttribute("data-position"));
    } else {
      document.getElementById("name").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("email").value = "";
      document.querySelector(".modal").setAttribute("data-position", -1);
    }
  },

  //FUNCTION TO SAVE THE FORM INTO THE JSON AND LOCALSTORE IT
  btnSave: function () {
    let fullname = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let position = document.querySelector(".modal").getAttribute("data-position");
    APP.addContact(fullname, phone, email, position);
    APP.storeItems();
    APP.genList();
    APP.toogleOver();
  },

  //FUNCTION THAT ADDS AND SORT THE CONTACTS TO THE VARIABLE
  addContact: function (fullname, phone, email, position) {
    if (position == -1) {
      let contact = {
        "fullname": fullname,
        "phone": phone,
        "email": email
      }
      APP.contactList.contacts.push(contact);
    } else {
      APP.contactList.contacts[position].fullname = fullname;
      APP.contactList.contacts[position].phone = phone;
      APP.contactList.contacts[position].email = email;
    }
    APP.contactList.contacts.sort(function (a, b) {
      if (a.fullname.toUpperCase().trim() < b.fullname.toUpperCase().trim()) {
        return -1;
      } else if (a.fullname.toUpperCase().trim() > b.fullname.toUpperCase().trim()) {
        return 1;
      } else {
        return 0;
      }
    });
  },

  //FUNCTION FOR THE DELETE BUTTON - BASIC STUFF
  btnDelete: function (event) {
    event.stopPropagation();
    let position = this.parentElement.getAttribute("data-position");
    APP.contactList.contacts.splice(position, 1);
    APP.storeItems();
    APP.genList();
  }
}

document.addEventListener("DOMContentLoaded", APP.init);
