



//facebook share
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//makes whatever is brought into function, the title, sliding icon to the right, and making a title
$.fn.entitle = function(){
     var current = $(this).siblings('.item-name').text();
    $(this).addClass('entitled');
    $('#top-title').children('h2').replaceWith('<h2 class="item-name">'+ current +' </h2>');
    $('#top-title').css({'position' : 'relative'});
    var slide = $('#top-title h2').width() + 20 + 'px';
    $('#top-title').animate({"width" : slide},{ duration: 500, queue: false});
    $('#item-picker').animate({'width': '13em'},{ duration: 300, queue: false});
    
    $(this).delay(470).queue(function(next){
        $('.item').addClass('no-display');
        $(this).parents().removeClass('no-display');
        next();

    });
    $('#item-picker').addClass('hidden-sm hidden-xs');
};

// opposite of entitle
$.fn.unEntitle = function(){
    $('#top-title').animate({"width" : 0},{duration: 500, queue: false});
    $('#item-picker').animate({'width': '100%'},{duration: 500, queue: false});
    $(this).removeClass('entitled');
    $('.item').removeClass('no-display');
    $('#top-title').delay(470).queue(function(next){
        $('#item-picker').removeClass('hidden-sm hidden-xs');
        $(this).css('position' ,'absolute');
        //$('#top-title').children('h2').replaceWith('<h2 class="item-name"></h2>');
        next();
    });
        
};




$(document).ready(function() {


//delete unneeded search bar on page load

if($(document).width() > 480){
    $(".search2").replaceWith('');
}
else
    $(".search1").replaceWith('');

//FRONTPAGE - search ---------------------------------------------------------------------------------------------
//      SEARCH       ---------------------------------------------------------------------------------------------
    $('#searchText').on('input', function(){

        //unentitle item if any is entitled
        if($('.item-link').hasClass('entitled')){
            $('.entitled').unEntitle();
        }

        $(window).keyup(function(){
            "use strict";
            var searchquery = document.getElementById("searchText").value.toLowerCase();
            
            //hide and show items
            $(".item ul:contains('" + searchquery + "')").parentsUntil(this, '.item').removeClass('no-display');
            $(".item ul:not(:contains('" + searchquery + "'))").parentsUntil(this, '.item').addClass('no-display');


           //changes h2 to tag names 
            $(".tag:contains('" + searchquery + "')").each(function(){
                var current = $(this).text();
                $(this).parentsUntil(this, '.item').children('.item-name').replaceWith('<h2 class="item-name">'+ current +' </h2>');

    	        //capitalise first letter of element
    	        //$('.item-name').css('textTransform', 'capitalize');


            });

    		

        });
    });


//When a drug is in titlemode and clicked on, this will make the icon transition to a title  +  loads corresponding html into info
        $('.item-link').click(function(){
            var currentItem = $(this).siblings('ul').children().last().text();
            if ($(this).hasClass('entitled')){
                $(this).unEntitle();
                $('#info').removeClass(currentItem);
                $('#info').empty();
            }
            else{   
                $(this).entitle();
                $('#info').load("./" + currentItem + ".html");
                $('#info').addClass(currentItem);
            }
        });


        $('#top-title').click(function() {
            $('#info').removeClass();
            $('.entitled').unEntitle();
            $('#info').empty();
        });
        $('#welcome').click(function() {
            $('#info').removeClass();
            $('.entitled').unEntitle();
            $('#info').empty();
        });


        var titleWidth = $('#top-title h2').width() + 205;
        var wrapperWidth = $('#wrapper').width();

        if (titleWidth >= wrapperWidth) {
            console.log('too small');
            console.log(titleWidth + ", " + wrapperWidth);
        
            $('#item-picker').addClass('no-display');
        }
        else    
            $('#item-picker').removeClass('no-display');







});
   
