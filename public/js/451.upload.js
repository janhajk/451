(function() {
   $(document).ready(function() {

      // Upload Formular
      var upload_form = function() {
         var uploadform = document.createElement('div');
         var uploadbuttons = document.createElement('div');
         var btnSpan = document.createElement('span');
         var input = document.createElement('input');
         var btnText = document.createTextNode('Datei auswählen');

         btnSpan.className = 'btn btn-default btn-file';
         btnSpan.style.position = 'overflow';
         btnSpan.style.overflow = 'hidden';
         // File Input
         input.type = 'file';
         var styles = {
            position: 'absolute',
            top: '0',
            right: '0',
            minWidth: '100%',
            minHeight: '100%',
            fontSize: '100px',
            textAlign: 'right',
            filter: 'alpha(opacity=0)',
            opacity: '0',
            outline: 'none',
            background: 'white',
            cursor: 'inherit',
            display: 'block'
         };
         for (var key in styles) {
            if (styles.hasOwnProperty(key)) {
               input.style[key] = styles[key];
            }
         }

         input.onchange = function(){
            var xhr = new XMLHttpRequest();
            var formData = new FormData();
            xhr.open('POST', '/fileupload', true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Handle response.
                    alert(xhr.responseText); // handle response.
                }
            };
            formData.append('siafile', this.files[0]);
            xhr.send(formData);
         };

         btnSpan.appendChild(btnText);
         btnSpan.appendChild(input);
         uploadform.appendChild(btnSpan);

         var form = sbadmin_panel('info', '4', 'Neue 01s-Datei hochladen', uploadform, uploadbuttons);
         return form;
      };

      // Upload Menu Link
      (function(){
         var linktext  = 'Neue Offerte hochladen';
         var menu_link = document.createElement('li');
         var a         = document.createElement('a');
         var i         = document.createElement('i');
         var text      = document.createTextNode(' ' + linktext);

         i.className   = 'fa fa-list fa-fw';
         a.onclick = function(){
            var title = document.getElementById('page-title');
            title.parentNode.insertBefore(upload_form(), title.nextSibling);
         };

         a.appendChild(i);
         a.appendChild(text);
         menu_link.appendChild(a);

         $('#menu_erstellen ul').append(menu_link);
      })();

   });
})();