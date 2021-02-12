/* custom JavaScript goes here */

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
//Closure - limits scope leak

"use strict";


((core) =>
{
    function displayHome()
    {
      $("button").on("mouseover", () =>{
        console.log("mouse over - jquery");
      });
      let myButton = document.querySelectorAll("button")[0];     
      myButton.addEventListener("click", () =>
      {
        console.log("clicked button - js");
      })

      //console.log(myButton);


        let paragraphOneText =
          "This is a simple site to demonstrate DOM Manipulation for ICE 1";

        let paragraphOneElement = document.getElementById("paragraphOne");

        paragraphOneElement.textContent = paragraphOneText;
        paragraphOneElement.className = "fs-5";

        // Step 1. document.createElement
        let newParagraph = document.createElement("p");
        // Step 2. configure the element
        newParagraph.setAttribute("id", "paragraphTwo");
        newParagraph.textContent = "...And this is paragraph two";
        // Step 3. select the parent element
        let mainContent = document.getElementsByTagName("main")[0];
        // Step 4. Add / Insert the element
        mainContent.appendChild(newParagraph);

        newParagraph.className = "fs-6";

        // another way of injecting content
        let paragraphDiv = document.createElement("div");
        let paragraphThree = `<p id="paragraphThree" class="fs-7 fw-bold">And this is the Third Paragraph</p>`;
        paragraphDiv.innerHTML = paragraphThree;

        // insertions

        // example of inserting before a node
        //newParagraph.before(paragraphDiv);

        // example of inserting after a node
        newParagraph.after(paragraphDiv);

        // deletions

        // example of removing a single element
        //paragraphOneElement.remove();

        // example of removeChild
        mainContent.removeChild(paragraphOneElement);

        // update / modification
        //mainContent.firstElementChild.textContent = "Welcome Home!";

        mainContent.innerHTML = `<h1 id="firstHeading">Welcome to WEBD6201 - Week5</h1>
         <p id="paragraphOne" class="fs-3 fw-bold">This is my first Paragraph</p>
        `;
        
    }

    function displayAbout()
    {

    }

    function displayProjects()
    {

    }

    function displayServices()
    {

    }
    function testFullName()
    {

    }
    function testContactNumber()
    {

    }
    function displayContact()
    {

      let messageArea = $("#messageArea").hide();
        $("#messageArea").hide();
        let fullNamePattern = /([A-Z][a-z]{1,25})+(\s|,|-)([A-Z][a-z]{1,25})+(\s|,|-)*/;
        // form validation
        $("#fullName").on("blur", function()
        {
            if($(this).val().length < 2)
            {
              $(this).trigger("focus").trigger("select");

              messageArea.show(500).addClass("alert alert-danger").text("Please enter an appropriate Name");
            }
            else
            {
              messageArea.removeAttr("class").hide();
            }
        });

        $("#subscribeCheckBox").on("change", function(){
            console.log("checkbox checked!")
          });

        let sendButton = document.getElementById("sendButton");
        $("#sendButton").on("click", (event)=>{
          
          if( $("#subscribeCheckBox")[0].checked)
          {
            let contact = new core.Contact(fullName.value, contactNumber.value, emailAddress.value);

            if(contact.serialize())
            {
              localStorage.setItem((localStorage.length + 1).toString(), contact.serialize());
            }
          }
          // document.getElementById("subscribeCheckBox").addEventListener();
           
        });
    }

    function displayContactList() 
    {
      if (localStorage.length > 0) 
      {
        let contactList = document.getElementById("contactList");

        let data = "";
        let index = 0; // sentinel variable
        // returns an array of keys from localStorage
        let keys = Object.keys(localStorage);
        for (const key of keys) {
          let contactData = localStorage.getItem(key);

          let contact = new core.Contact();
          contact.deserialize(contactData);

          data += `<tr>
          <th scope="row">${index}</th>
          <td>${contact.FullName}</td>
          <td>${contact.ContactNumber}</td>
          <td>${contact.EmailAddress}</td>
          <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
          <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
          </tr>`;

          index++;
        }

        contactList.innerHTML = data;
        
        $("button.edit").on("click", function(){
          location.href ="edit.html#" + $(this).val();
         });

         $("button.delete").on("click", function(){
           if(confirm("Are you sure?"))
           {
            localStorage.removeItem($(this).val());
            location.href = "contact-list.html"; // refresh the page
           }
         });
      }
      
      $("#addButton").on("click", function()
      {
        location.href = "edit.html";
      });

        
    }

     function displayEdit()
     {
      let key = location.hash.substring(1);

      console.log(key);

      let contact = new core.Contact("","","");

      // check to ensure that the key is not empty
      if(key != "")
      {
        // get contact info from localStorage
        contact.deserialize(localStorage.getItem(key));

        // display contact information in the form
        $("#fullName").val(contact.FullName);
        $("#contactNumber").val(contact.ContactNumber);
        $("#emailAddress").val(contact.EmailAddress);
      }
      else
      {
        // modify the page so that it shows "Add Contact" in the header 
        $("main>h1").text("Add Contact");
        // modify edit button so that it shows "Add" as well as the appropriate icon
        $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
      }

      // form validation
      formValidation();

      $("#editButton").on("click", function() 
      {
        // check to see if key is empty
        if(key == "")
        {
          // create a new key
          key = contact.FullName.substring(0, 1) + Date.now();
        }

        // copy contact info from form to contact object
        contact.FullName = $("#fullName").val();
        contact.ContactNumber = $("#contactNumber").val();
        contact.EmailAddress = $("#emailAddress").val();

        // add the contact info to localStorage
        localStorage.setItem(key, contact.serialize());

        // return to the contact list
        location.href = "contact-list.html";
      });

      $("#cancelButton").on("click", function()
      {
        // return to the contact list
        location.href = "contact-list.html";
      });

       
     }

    function Start()
    {
        console.log("App Started...");

        switch (document.title) 
        {
          case "Home":
              displayHome();
            break;
          case "About":
              displayAbout();
            break;
          case "Projects":
              displayProjects();
            break;
          case "Services":
              displayServices();
            break;
          case "Contact":
              displayContact();
            break;
          case "Contact-List":
            displayContactList();
          break;
          case "Edit":
            displayEdit();
          break;
        }
        
    }

    window.addEventListener("load", Start);

    core.Start = Start;

}) (core || (core={}));