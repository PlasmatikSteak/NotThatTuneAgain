<!DOCTYPE html>
<html>
<head>
	<title>Not That Tune Again</title>
	<link rel="stylesheet" href="css/style.css" type="text/css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
</head>
<body>
	<div class="wrapper">
		<div class="datagrid">
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Station</th>
						<th>Artist</th>
						<th>Track</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td colspan="4">Loading data...</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</body>
<script>
	jQuery(document).ready(function(){
		var check_playing = setInterval(checkplaying, 3000);
	});

	function checkplaying(){
		var datagrid_tbody = jQuery('.datagrid tbody');
		jQuery.getJSON('ajax.php', { 'action': 'get_playing' }, function(data){
			var html = '';
			if(data){
				if(data.playing){
					jQuery.each(data.playing, function( index, value ){
						html += '<tr>';
						html += '<td>'+value.name+'</td>';
						html += '<td>'+value.station+'</td>';
						html += '<td>'+value.artist+'</td>';
						html += '<td>'+value.track+'</td>';
						html += '</tr>';
					});
					datagrid_tbody.html(html);
				}
			}else{
				html = '<tr>';
				html += '<td colspan="4">Nobody playing!</td>';
				html += '</tr>';
				datagrid_tbody.html(html);
			}
		});
	}
</script>
</html>
