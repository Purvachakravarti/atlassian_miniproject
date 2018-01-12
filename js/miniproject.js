// JavaScript Document
var sessionJSON;

var tracks =[];

$.getJSON("sessions.json", function(result){
		
        $.each(result, function(index, field){
            $.each(field, function(i, content) {
				var track = content['Track']['Title'];
				
				//get unique track titles
				if (jQuery.inArray(track, tracks) == -1) {
					tracks.push(track);
				  }
				
				
			});
			sessionJSON = result;
        });
	
	$.each(tracks , function(index, tab){
		var id= jQuery.trim(tab.toLowerCase());
		var active_class = '';
		if(index == 0){
			active_class = " active";
		}
		
		//top navbar
		$( "#navtabs" ).append('<li class ="'+active_class+'"><a data-toggle="tab" href="#'+id+'">'+tab+'</a></li>');
		
		//container of right and left part
		$('.content-wrapper').append('<div id="'+id+'" class="tab-pane fade in'+active_class+'" role="tab-panel"><div class="tab-content col-xs-4" id="'+id+'_sidemenu"><h4 class="padding-top-left-header font-color">'+tab+'</h4><ul class="nav nav-pills nav-stacked" id="'+id+'_tablist" role="tablist"></ul></div><div class = "tab-content col-xs-8" id="'+id+'_content-wrapper" role="tablist"></div></div>');
		
		
	});
	
	$.each(sessionJSON, function(index, field){
            $.each(field, function(i, content) {
				
				var title = content['Title'];	
				var menuid = jQuery.trim(content['Track']['Title'].toLowerCase());
				var speakers = [];
				var speakersdetails = [];
				var speakertitle = "";
				var bio ="";
				if(content['Speakers']){
					speakersdetails.push('<h3 class="font-color">About the speaker</h3><p>');
					$.each(content['Speakers'], function(j, speakerlist) 
					{
						speakers.push(speakerlist['FirstName']+' '+speakerlist['LastName']+', '+speakerlist['Company']);
						if(speakerlist['Title'])
							{
								speakertitle = ', '+speakerlist['Title'];
							}
						if(speakerlist['Biography']){
							bio = '<br><p class="qa_url_p">'+speakerlist['Biography']+'</p>';
						}
						
						speakersdetails.push('<strong>'+speakerlist['FirstName']+' '+speakerlist['LastName']+'</strong>'+speakertitle+', '+speakerlist['Company']+bio);
						
						
					});
					speakersdetails.push('</p>');
						
				}
				//left side menu
				$( "#"+menuid+"_tablist" ).append('<li><a data-toggle="tab" href="#content_'+content['Id']+'">'+title+'<br><span class="font">'+speakers.join(" | ")+'</span></a></li>');
				
				//right side content
				$('#'+menuid+'_content-wrapper').append('<div id="content_'+content['Id']+'" class="tab-pane fade in " role="tabpanel"><h2 class="padding-top-right-header font-color">'+title+'</h2><p class="font-color"><strong>'+speakers.join(" | ")+'</strong></p><p>'+content['Description']+'</p><p class="qa_url_p"><a href="#" class="qa_url">See the Q&A from this talk and others here.</a></p><div>'+speakersdetails.join("<br>")+'</div>');
	
			
			});
	});
	
	$.each(tracks , function(index, tab){
		var id= jQuery.trim(tab.toLowerCase());
		
	
		$("#"+id+"_tablist li:first").addClass('active');
		$("#"+id+"_content-wrapper div:first").addClass('active');

	});
		

	
});

