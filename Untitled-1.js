// var markers = [{ "client_id": "http://734433196319-tpaf59d232ethh3mn66pfbbha1cegk1p.apps.googleusercontent.com"},
//                { "client_secret": "POTbeSPFBg7BKFh1YhSAFpD7"},
//                { "refresh_token": refresh_token},
//                { "grant_type": "refresh_token"}];

loadJSON('https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day&endDate='+youtube_end_date+'&ids=channel%3D%3DMINE&metrics=comments%2Cshares%2Clikes%2Cdislikes%2Cviews%2CestimatedMinutesWatched%2CaverageViewDuration%2CsubscribersGained%2CsubscribersLost&sort=day'+'&startDate='+youtube_start_date+'&access_token='+youtube_token,
    function(data) {
    	for (let i = 0; i < 8; i++) {
            var youtube_names = ''+data.rows[i]+'';
            var youtube_nameArr = youtube_names.split(',');
            var youtube_date = youtube_nameArr[0];
            var youtube_comments = youtube_nameArr[1];
            var youtube_shares = youtube_nameArr[2];
            var youtube_likes = youtube_nameArr[3];
            var youtube_dislikes = youtube_nameArr[4];
            var youtube_views = youtube_nameArr[5];
            var youtube_estimatedMinutesWatched = youtube_nameArr[6];
            var youtube_averageViewDuration = youtube_nameArr[7];
            var youtube_subscribersGained = youtube_nameArr[8];
            var youtube_subscribersLost = youtube_nameArr[9];
                                        
            document.getElementById('youtube_comments_day_'+i).innerHTML = youtube_comments;
            document.getElementById('youtube_shares_day_'+i).innerHTML = youtube_shares;
            document.getElementById('youtube_likes_day_'+i).innerHTML = youtube_likes;
            document.getElementById('youtube_dislikes_day_'+i).innerHTML = youtube_dislikes;
            document.getElementById('youtube_views_day_'+i).innerHTML = youtube_views;
            document.getElementById('youtube_estimatedMinutesWatched_day_'+i).innerHTML = youtube_estimatedMinutesWatched;
            document.getElementById('youtube_averageViewDuration_day_'+i).innerHTML = youtube_averageViewDuration;
		}
	},
	function(xhr) {
	   	console.error(xhr);
	}
);