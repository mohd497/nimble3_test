$(document).ready(function(){



  $("#login-email").removeClass("has-error");
  $("#login-password").removeClass("has-error");
  $(".custom-alert").hide();

  $("#login-send").click(function () {


      email = $("#login-email");
      password = $("#login-password");
      custom = $(".custom-alert");

      if(email.val() == ""){
          email.addClass("has-error");
          custom.show();
          custom.text("Field's can't be empty");
      }

      if(password.val() == ""){
          password.addClass("has-error");
          custom.show();
          custom.text("Field's field can't be empty");
      }

      if(password.val() != "" && email.val() != "") {
          data = {
              "grant_type": password.val(),
              "email": email.val(),
              "password": password.val()
          }

          $.ajax({
              url: "/oauth/token",
              type: "post",
              datatype: "json",
              data: JSON.stringify(data),
              headers: {"content-type": "application/json"},
              success: function (response) {
                  Cookies.set("authorization","Bearer " + response.access_token);
                  window.location.href = window.location.protocol + "//" + window.location.host + "/" + "interface/results";
                  $("custom-container").hide();
              },
              error: function (response){
                  custom.show();
                  custom.text(response.statusText);
              }
          });
      }

  });
});
