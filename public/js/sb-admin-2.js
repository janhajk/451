var sbadmin_panel = function(type, btwidth, heading, body, footer){
   var ce = function(className) {
      var c = document.createElement('div');
      c.className = className;
      return c;
   };
   var dRow     = ce('row');
   var dCol     = ce('col-lg-' + btwidth);
   var dPanel   = ce('panel panel-' + type);
   var dHeading = ce('panel-heading');
   var dBody    = ce('panel-body');
   var dFooter  = ce('panel-footer');
   var dP;

   if(typeof heading === 'string') {
      dHeading.appendChild(document.createTextNode(heading));
   } else {
      dHeading.appendChild(heading);
   }

   if(typeof body === 'string') {
      dP  = document.createElement('p');
      dP.innerHTML = body;
      dBody.appendChild(dP);
   } else {
      dBody.appendChild(body);
   }

   if(typeof footer === 'string') {
      dFooter.appendChild(document.createTextNode(footer));
   } else {
      dFooter.appendChild(footer);
   }

   dPanel.appendChild(dHeading);
   dPanel.appendChild(dBody);
   dPanel.appendChild(dFooter);

   dCol.appendChild(dPanel);
   dRow.appendChild(dCol);
   return dRow;
};


$(function() {

    $('#side-menu').metisMenu();

});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});

