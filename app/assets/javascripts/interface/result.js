$(".results").ready(function(){

    $.ajax({
        url: "/api/v1/report",
        type: "get",
        datatype: "json",
        headers: {"Authorization": Cookies.get("authorization")},
        success: function (response) {
            $.each(response, function( index, value ) {

                var url_bottom_div = "<div>";

                $.each(value.url_bottom, function(b_index, b_value){
                   url_bottom_div += "<div><a>" + b_value + "</a></div>"
                })

                url_bottom_div += "</div>";

                var url_top_div = "<div>";

                $.each(value.url_top, function(t_index, t_value){
                    url_top_div += "<div><a>" + t_value + "</a></div>"
                })

                url_top_div += "</div>";



                var url_no_ad_div = "<div>";

                $.each(value.url_no_ad, function(t_index, t_value){
                    url_no_ad_div += "<div><a>" + t_value + "</a></div>"
                })

                url_no_ad_div += "</div>";


                $(".result-list").append(
                    $("<div>")
                        .append("<div>top advertisement count:" + value.top_ad_count + "</div>")
                        .append("<div>bottom advertisement count:" + value.bottom_ad_count + "</div>")
                        .append("<div>total advertisement count:" + value.total_ad_count + "</div>")
                        .append("<div>non advertisement link count:" + value.no_ad_count + "</div>")
                        .append("<div>total link count:" + value.total_link_count + "</div>")
                        .append("<div>total search result:" + value.total_search_result + "</div>")
                        .append(url_bottom_div)
                        .append(url_top_div)
                        .append(url_no_ad_div)
                    .append("</div>")


                );
            });
        },
        error: function (response){

        }
    });



});