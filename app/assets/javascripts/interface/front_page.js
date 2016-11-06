$(document).ready(function(){

  $("#login-email").removeClass("has-error");
  $("#login-password").removeClass("has-error");
  $(".custom-alert").hide();
  $(".alert-success").hide();

  $("#login-send").click(function () {

      email = $("#login-email");
      password = $("#login-password");
      custom = $(".custom-alert");
      success = $(".alert-success");

      if(email.val() == ""){
          email.addClass("has-error");
          custom.show();
          success.hide();
          custom.text("Field's can't be empty");
      }

      if(password.val() == ""){
          password.addClass("has-error");
          custom.show();
          success.hide();
          custom.text("Field's field can't be empty");
      }

      if(password.val() != "" && email.val() != "") {
          data = {
              "grant_type": "password",
              "email": email.val(),
              "password": password.val()
          };

          $.ajax({
              url: "/oauth/token",
              type: "post",
              datatype: "json",
              data: JSON.stringify(data),
              headers: {"content-type": "application/json"},
              success: function (response) {
                  Cookies.set("authorization","Bearer " + response.access_token);
                  Cookies.set("access_token",response.access_token);
                  window.location.href = window.location.protocol + "//" + window.location.host + "/" + "interface/results";

              },
              error: function (response){
                  custom.show();
                  custom.text(response.statusText);
              }
          });
      }

  });

    $("#logout-send").click(function () {

        $.ajax({
            url: "/oauth/revoke",
            type: "post",
            datatype: "json",
            data: JSON.stringify({"token": Cookies.get("access_token")}),
            headers: {"content-type": "application/json", "Authorization": Cookies.get("authorization")},
            success: function (response) {
               Cookies.remove("authorization");
               Cookies.remove("access_token");
               window.location.href = window.location.protocol + "//" + window.location.host + "/" + "interface/home";
            },
            error: function (response){
               custom.show();
               custom.text(response.statusText);
               success_banner.hide();
            }
        });
    });

    $("#reg-send").click(function () {

        email = $("#reg-email");
        password = $("#reg-pass");
        password_confirm = $("#reg-pass-confirm");
        custom = $(".custom-alert");
        success_banner = $(".alert-success");

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

        if(password_confirm.val() == ""){
            password_confirm.addClass("has-error");
            custom.show();
            custom.text("Field's field can't be empty");
        }

        if(password.val() != "" && email.val() != "" && password_confirm.val() != "") {
            data = {
                "user": {
                    "email": email.val(),
                    "password": password.val(),
                    "password_confirmation": password_confirm.val()
                }
            };

            $.ajax({
                url: "/users.json",
                type: "post",
                datatype: "json",
                data: JSON.stringify(data),
                headers: {"content-type": "application/json"},
                success: function (response) {
                    success_banner.show();
                    success_banner.text("Registered successfully. Please login.");
                    email.val("");
                    password.val("");
                    password_confirm.val("");
                    custom.hide();

                },
                error: function (response){
                    custom.show();
                    success_banner.hide();
                    custom.text(response.responseText);
                }
            });
        }

    });
});
