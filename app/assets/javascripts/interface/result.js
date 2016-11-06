$(".results").ready(function(){

    $.ajax({
        url: "/api/v1/report",
        type: "get",
        datatype: "json",
        headers: {"Authorization": Cookies.get("authorization")},
        success: function (response) {
            $.each(response, function( index, value ) {

                var url_bottom_div = url_list(value.url_bottom);
                var url_top_div = url_list(value.url_top);
                var url_no_ad_div = url_list(value.url_no_ad);
                $(".result-list").append(
                    $("<div>")
                        .append("<div><h2>" + value.keyword + "</h2></div>")
                        .append("<table border='1'>")
                        .append("<tr>")
                        .append("<th>top advertisement count</th>")
                        .append("<th>bottom advertisement count</th>")
                        .append("<th>total advertisement count</th>")
                        .append("<th>non advertisement link count</th>")
                        .append("<th>total link count</th>")
                        .append("<th>total search result</th>")
                        .append("</tr>").append("<tr>")
                        .append("<td>" + value.top_ad_count   + "</td>")
                        .append("<td>" + value.bottom_ad_count   + "</td>")
                        .append("<td>" + value.total_ad_count   + "</td>")
                        .append("<td>" + value.no_ad_count   + "</td>")
                        .append("<td>" + value.total_link_count   + "</td>")
                        .append("<td>" + value.total_search_result   + "</td>")
                        .append("</tr>").append("</table>")
                        .append("<div><b>Top ad urls: </b></div>")
                        .append(url_top_div)
                        .append("<div style='padding-bottom: 10px;'></div>")
                        .append("<div><b>Botton ad urls: </b></div>")
                        .append(url_bottom_div)
                        .append("<div style='padding-bottom: 10px;'></div>")
                        .append("<div><b>Non ad urls: </b></div>")
                        .append(url_no_ad_div)
                        .append("<div style='padding-bottom: 10px;'></div>")
                        .append("<div><b>Open the keyword link:</b></div>")
                        .append("<div><a class='btn btn-info' target='_blank' href='/interface/target/?id=" + value.id + "' >link</a></div>")
                    .append("</div>")


                );
            });
        }
    });


    function url_list(value) {
        var url_div = "<ul>";

        $.each(value, function(b_index, b_value){
            b_value = b_value.replace(/\/$/, '');

            if(b_value.substr(0,7) != 'http://' && b_value.substr(0,8) != 'https://'){
                b_value = 'http://' + b_value;
            }

            url_div += "<li><a target='_blank' href=" + b_value + ">" + b_value + "</a></li>"
        })

        url_div += "</ul>";
        return url_div
    }

    $('#file').on('change', function(){

        var data = new FormData();
        data.append("csv", $("#file")[0].files[0]);

        custom = $(".custom-alert");
        success_banner = $(".alert-success");


        $.ajax({
            url: "/api/v1/upload",
            type: "post",
            cache: false,
            data: data,
            headers: {"Authorization": Cookies.get("authorization")},
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false,
            success: function (response) {
                success_banner.show();
                success_banner.text("Uploaded Successfully");
                
            },
            error: function (response) {
                custom.show();
                success_banner.hide();
                custom.text(response.responseText);

            }
        });
    });

    $('.query').click(function() {
        window.location.href = window.location.protocol + "//" + window.location.host + "/" + "interface/query";
    });


});