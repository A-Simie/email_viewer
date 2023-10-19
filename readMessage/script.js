document.addEventListener("DOMContentLoaded", function () {
  // DOM is ready
  fetchUnreadEmails();
});

function fetchUnreadEmails() {
  const emailList = document.getElementById("emailList");

  // Make an AJAX request to fetch unread emails
  fetch("./fetch_emails.php")
    .then((response) => response.json())
    .then((data) => {
      // Process the data and display it
      if (data.length > 0) {
        emailList.innerHTML = "<ul>";
        data.forEach((email) => {
          emailList.innerHTML += `<li>
                          <strong>From:</strong> ${email.sender}<br/><br/>
                          <strong>Subject:</strong> ${email.subject}<br/><br/>
                          <div>${email.message}</div><br/><br/>
                          <div>${email.timestamp}</div><br/><br/>
                      </li>`;
        });
        emailList.innerHTML += "</ul>";
      } else {
        emailList.innerHTML = "No emails found.";
      }
    })
    .catch((error) => {
      console.error("Error fetching emails:", error);
    });
}
