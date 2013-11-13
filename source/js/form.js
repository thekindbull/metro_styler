$(document).ready(function style(){
		var defaultSelectWidth = "100px";		
		$(this).find('select').each(function(){
			styleSelect($(this).attr('id'));
		});
		
		$(this).find('[type=checkbox]').each(function(){
			styleCheckbox($(this).attr('id'));
		});

	
	function styleSelect(objectId){
		var object 	= null;
		var new_object 	= null;
		var posX 	= 0;
		var posY 	= 0;
		
		if (!objectId) return;
		object 		= $("#" + objectId);
		if (object.attr('size') && object.attr('size')>1) return;
		
		position 	= object.position();
		posX		= position.left;
		posY 		= position.top;
		
		$('#id_' + object.attr("id")).remove();
		$('.styled_select_list').each(function(){
			if ( $(this).attr('data-for')=='id_' + object.attr("id") ) $(this).remove();
		});
		//Заменяю старый select на новый тег div
		new_select = $('<div />',{
			"id": 'id_' + object.attr("id"),
			"class": 'styled_select',
			"style": 'top:' + posY + 'px;left:' + posX + 'px;' + object.attr("style")+';display:block;',
			"data-value": object.val(),
			click: function(e) {
				//Это место нужно заменить
				$('.styled_select_list').not("[data-for=" + $(this).attr('id') + "]").slideUp(100);
				position 	= $(this).position();
				posX		= position.left;
				posY 		= position.top + 28;
				$('.styled_select_list').each(function(){
					if ($(this).attr('data-for')=='id_' + object.attr("id")) {
						$(this).css('left',posX+'px');
						$(this).css('max-height',($(document).height()*70/100)+'px');
						$(this).css('top',(posY)+'px');
						if (posY+$(this).height()>$(document).height()) {
							newPosition = posY - ( posY + $(this).height() - $(document).height() ) - 20 ;
							$(this).slideToggle(100).delay(120).animate({
								'top': newPosition
							},200);
							;
						}else{
							$(this).slideToggle(100);
						};
					};
				});
			}
		});
		
		
		//Вставляю замененный select
		object.css("display","none");
		new_select.text(object.find("option:selected").text());
		object.after(new_select);
		//$('#id_' + object.attr("id")).width($('#id_' + object.attr("id")).width()+20);
		
		
		//Создаю новый выпадающий список
		position 	= new_select.position();
		posX		= position.left;
		posY 		= position.top;
		new_list = $('<div />',{
			"class": 'styled_select_list',
			"style": 'top:' + (posY+28) + 'px; left:' + (posX) + 'px; width:' + (25+$('#id_' + object.attr("id")).width()-23) + 'px',
			'data-for': new_select.attr('id')
		});	
		
		//Заполняю новый выпадающий список
		object.find('option').each(function() {
			new_item = $('<div />',{
				"class": 'item',
				'data-value': $(this).val(),
				click: function() {
					var value = $(this).attr('data-value');
					var select_id = $(this).parent().attr('data-for').substr(3,$(this).parent().attr('data-for').length);
					$('#' + $(this).parent().attr('data-for')).text($(this).text());
					$('#' + $(this).parent().attr('data-for')).attr('data-value',value);
					$(this).parent().slideUp(100);
					//Вызываю событие клик на родном select'е
					$("#" + select_id).find('option').each(function() {
						if ( $(this).val() == value ) {
							$(this).parent().val(value);
							$(this).parent().change();
						};
					});
				}
			});
			new_item.html($(this).text());
			new_list.append(new_item);
		});
		new_select.after(new_list);		
	}//styleSelect(selectId)
	
	function styleCheckbox(objectId){
		var object 		= null;
		var new_object 	= null;
		var posX 		= 0;
		var posY 		= 0;
		
		if (!objectId) return;
		object = $('#'+objectId+'');
		
		//position 		= object.position();		
		//posX			= position.left;
		//posY 			= position.top;
		$('label').each(function(){
			if ( $(this).attr('for')==objectId ) $(this).remove();
		});
		
		
		label = $('<label />',{
			'for': objectId,
			"class": "styled_checkbox_label",
			"title": object.attr('data-text'),
			//style: ';' + object.attr("style"),
			click: function(e) {				
			}
		});
		//label = '<label for="'+objectId+'" class="styled_checkbox_label">'+object.attr('data-text')+'</label>';
		//alert(label);
		label.text(object.attr('data-text'));
		object.after(label);
		
		object.css("display","none");		
	}//styleCheckbox(objectId)
});
