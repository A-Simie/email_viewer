document.addEventListener("DOMContentLoaded", function () {
  // DOM is ready
  fetchUnreadEmails();
});

function fetchUnreadEmails() {
  const emailList = document.getElementById("emailList");
  const emailAmount = document.getElementById("emailAmount");

  // Make an AJAX request to fetch unread emails
  fetch("./fetch_emails.php")
    .then((response) => response.json())
    .then((data) => {
      // Process the data and display it
      if (data.length > 0) {
        emailList.innerHTML = "<ul>";
        emailAmount.innerHTML = `${data.length}`;
        data.forEach((email) => {
          emailList.innerHTML += `<li>
                        <strong>From:</strong> ${email.sender}<br/><br/>
                        <strong>Subject:</strong> ${email.subject}<br/><br/>
                        <div>${email.message}</div><br/><br/>
                        <div>${email.timestamp}</div><br/><br/>
                        <button onclick="markAsRead(${email.id})">Mark as Read</button>
                    </li>`;
        });
        emailList.innerHTML += "</ul>";
      } else {
        emailList.innerHTML = "No unread emails.";
      }
    })
    .catch((error) => {
      console.error("Error fetching emails:", error);
    });
}

function markAsRead(emailId) {
  // Make an AJAX request to mark an email as read
  fetch("../mark_as_read.php", {
    method: "POST",
    body: JSON.stringify({ emailId: emailId }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      // Refresh the email list
      fetchUnreadEmails();
    })
    .catch((error) => {
      console.error("Error marking email as read:", error);
    });
}
