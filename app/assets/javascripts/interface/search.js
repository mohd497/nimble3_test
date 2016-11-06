$(document).ready(function(){
    $("#keyword-send").click(function(){

        keyword = $("#keyword-search").val();

        if(keyword == ""){
            custom.show();
            custom.text("Can't perform an empty search");
        }

        if(keyword != "") {
            $.ajax({
                url: "/api/v1/search?keyword=" + keyword,
                type: "get",
                datatype: "json",
                headers: {"content-type": "application/json", "Authorization": Cookies.get("authorization")},
                success: function (response) {
                    $(".answer").text("Count got is: " + response.count);
                    custom.hide();

                },
                error: function (response) {
                    custom.show();
                    custom.text("Something went wrong");
                }
            });
        }

    });

    $("#url-send").click(function(){

        keyword = $("#url-search").val();

        if(keyword == ""){
            custom.show();
            custom.text("Can't perform an empty search");
        }

        if(keyword != "") {
            $.ajax({
                url: "/api/v1/search?url=" + keyword,
                type: "get",
                datatype: "json",
                headers: {"content-type": "application/json", "Authorization": Cookies.get("authorization")},
                success: function (response) {
                    $(".answer").text("Count got is: " + response.count);
                    custom.hide();

                },
                error: function (response) {
                    custom.show();
                    custom.text("Something went wrong");
                }
            });
        }

    });

    $('.report').click(function() {
        window.location.href = window.location.protocol + "//" + window.location.host + "/" + "interface/results";
    });
});