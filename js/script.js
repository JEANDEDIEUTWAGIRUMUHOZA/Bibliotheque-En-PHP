
$(document).ready(function () {
	window.setTimeout(function() {
		$(".alert").fadeTo(1000, 50).slideUp(1000, function(){
			$(this).remove();
		});
	}, 5000);
});

function addRecord() {
    // get values
    var title = $("#title").val();
    title = title.trim();
    var price = $("#price").val();
    price = price.trim();
 
    if (title == "") {
        alert("Title field is required!");
    }
    else if (price == "") {
        alert("Price field is required!");
    }
    else {
        // Add record
        $.post("ajax/create.php", {
            title: title,
            price: price
        }, function (data, status) {
            // close the popup
            $("#add_new_record_modal").modal("hide");
 
            // read records again
            readRecords();
 
            // clear fields from the popup
            $("#title").val("");
            $("#price").val("");
        });
    }
}

// READ records
function readRecords() {
    $.get("ajax/read.php", {}, function (data, status) {
        $(".records_content").html(data);
    });
}

function GetBookDetails(id) {
    // Add Book ID to the hidden field
    $("#hidden_book_id").val(id);
    $.post("ajax/details.php", {
            id: id
        },
        function (data, status) {
            // PARSE json data
            var book = JSON.parse(data);
            // Assign existing values to the modal popup fields
            $("#update_title").val(book.title);
            $("#update_price").val(book.price);
        }
    );
    // Open modal popup
    $("#update_book_modal").modal("show");
}

function UpdateBookDetails() {
    // get values
    var title = $("#update_title").val();
    title = title.trim();
    var price = $("#update_price").val();
    price = price.trim();

    if (title == "") {
        alert("First name field is required!");
    }
    else if (price == "") {
        alert("Last name field is required!");
    }
    else {
        // get hidden field value
        var id = $("#hidden_book_id").val();

        // Update the details by requesting to the server using ajax
        $.post("ajax/update.php", {
                id: id,
                title: title,
                price: price,
            },
            function (data, status) {
                // hide modal popup
                $("#update_book_modal").modal("hide");
                // reload Books by using readRecords();
                readRecords();
            }
        );
    }
}

function DeleteBook(id) {
    var conf = confirm("Are you sure, do you really want to delete Book?");
    if (conf == true) {
        $.post("ajax/delete.php", {
                id: id
            },
            function (data, status) {
                // reload Books by using readRecords();
                readRecords();
            }
        );
    }
}

$(document).ready(function () {
    // READ records on page load
    readRecords(); // calling function
});

