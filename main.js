const API = 'https://www.googleapis.com/youtube/v3/';
const APIKey = "AIzaSyCx-Av3jyP6h0jIcppzbThxtNfMelRwaU8";

var testChannelID = 'UCq22aK0t0mrOEq676Be4ezw';

function getChannelId(){
	let formBox = document.querySelector(".box");
	let sectionMeta = document.querySelector(".meta");
	let channelIDvalue = document.querySelector("#channelID").value;
	//console.log(channelIDvalue);
	formBox.style.display = "none";
	sectionMeta.style.display = "block";
	/* TODO processing */
	testChannelID = channelIDvalue;
	refresh();
}

function checkChannelId(channelID) {
	/* TODO */
}

function loadJSON(path, success, error){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

/**_______________________ MAIN STAT _______________________**/
async function refresh() {

	let parsedPart = 'brandingSettings%2Cid%2Csnippet%2Cstatistics%2Cstatus%2CtopicDetails&id';
	let parsedCat = 'channels';

	loadJSON(`${API}${parsedCat}?part=${parsedPart}=${testChannelID}&maxResults=5&key=${APIKey}`,
		function (data) {
			/*STAT*/
			let youtubePreview = data.items[0].snippet.thumbnails.default.url;
			let youtubeChannelName = data.items[0].snippet.title;
			let youtubeAllViews = data.items[0].statistics.viewCount;
			let youtubeAllVideos = data.items[0].statistics.videoCount;
			let youtubeAllSubs = data.items[0].statistics.subscriberCount;
			let youtubeKeywords = data.items[0].brandingSettings.channel.keywords;
			let youtubeDesc = data.items[0].brandingSettings.channel.description;
			let youtubeCounry = data.items[0].brandingSettings.channel.country;
			let youtubeCats = data.items[0].topicDetails.topicCategories.join('<br>');
			let youtubeDate = data.items[0].snippet.publishedAt;
			let bannerUrl = data.items[0].brandingSettings.image.bannerExternalUrl;
			let youtubeForKids = data.items[0].status.madeForKids;
			let youtubeStatus = data.items[0].status.privacyStatus;

			document.querySelector('.preview').src = youtubePreview;
			document.querySelector('.collapsible h1').innerText = youtubeChannelName;
			document.getElementById('youtube_all_views').innerHTML = youtubeAllViews;
			document.getElementById('youtube_all_videos').innerHTML = youtubeAllVideos;
			document.getElementById('youtube_all_subs').innerHTML = youtubeAllSubs;
			document.getElementById('youtube_for_kids').innerHTML = youtubeForKids;
			document.getElementById('youtube_status').innerHTML = youtubeStatus;

			let bannerCSS = `
				.banner{
					display: flex;
					justify-content: space-around;
					align-items: center;
					background-image: linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('${bannerUrl}');
					background-repeat: no-repeat;
					background-size: 100% auto;
					background-position: 0;
					z-index: -1;
				}
				.banner:hover{
					background-image: linear-gradient(rgba(0, 0, 0, 0.25),rgba(0, 0, 0, 0.25)),url('${bannerUrl}');
				}
			`;
			let style = document.createElement('style');
			if (style.styleSheet) {
				style.styleSheet.cssText = bannerCSS;
			} else {
				style.appendChild(document.createTextNode(bannerCSS));
			}
			document.getElementsByTagName('head')[0].appendChild(style);

			document.getElementById('youtube_keywords').innerHTML = youtubeKeywords || 'No keywords';
			document.getElementById('youtube_desc').innerHTML = youtubeDesc || 'No description';
			document.getElementById('youtube_counry').innerHTML = youtubeCounry;
			document.getElementById('youtube_cats').innerHTML = youtubeCats;
			document.getElementById('youtube_date').innerHTML = youtubeDate;

		},
		function (xhr) {
			console.error(xhr);
		}
	);
}

/**_______________________ TOP VIDEOS _______________________**/
function makeTable(totalNum) {
	'use strict';

	document.getElementById('top_video_youtube').innerHTML = `
		<table class="table_sort">
			<thead><tr>
				<th>Превью</th>
				<th>Время создания</th>
				<th>Название</th>
				<th>Просмотров</th>
				<th>Лайков</th>
				<th>Дизлайков</th>
				<th>Комментариев</th>
			</thead></tr>
			<tbody id="youtube_video">

			</tbody>
		</table>
	`;

	var youtube_video = document.getElementById('youtube_video');

	let rows = totalNum;

	for (let i = 0; i < rows; i++) {

		let tr = document.createElement('tr');
		youtube_video.append(tr);
		let td0 = document.createElement('td');
		let td1 = document.createElement('td');
		let td2 = document.createElement('td');
		let td3 = document.createElement('td');
		let td4 = document.createElement('td');
		let td5 = document.createElement('td');
		let td6 = document.createElement('td');
		// let td7 = document.createElement('td');
		// let td8 = document.createElement('td');
		// let td9 = document.createElement('td');
		let youtube_preview = document.createElement('img');

		let youtube_video_link = document.createElement('a');
		youtube_video_link.setAttribute("id", "youtube_video_link_" + i);

		youtube_preview.setAttribute("id", "youtube_preview_" + i);
		youtube_preview.style.width = '150px';

		td0.setAttribute("id", "youtube_preview_p_" + i);
		td0.append(youtube_preview);
		td1.setAttribute("id", "youtube_posted_time_" + i);
		td2.setAttribute("id", "youtube_title_" + i);
		td2.append(youtube_video_link);
		td3.setAttribute("id", "youtube_views_" + i);
		td4.setAttribute("id", "youtube_likes_" + i);
		td5.setAttribute("id", "youtube_comments_" + i);
		td6.setAttribute("id", "youtube_dislikes_" + i);
		// td7.setAttribute("id", "youtube_shares_" + i);
		// td8.setAttribute("id", "youtube_est_time_" + i);
		// td9.setAttribute("id", "youtube_avg_time_" + i);
		tr.append(td0);
		tr.append(td1);
		tr.append(td2);
		tr.append(td3);
		tr.append(td4);
		tr.append(td5);
		tr.append(td6);
		// tr.append(td7);
		// tr.append(td8);
		// tr.append(td9);
	}
}

function getListVideos(totalNum, orderType) {

	makeTable(totalNum);

	let part = 'id%2C%20snippet';

	loadJSON(`${API}search?part=${part}&channelId=${testChannelID}&order=${orderType}&maxResults=${totalNum}&key=${APIKey}`,
		function (data) {

			for (let i = 0; i < totalNum; i++) {
				var youtube_video_id = data.items[i].id.videoId;
				//preview
				var youtube_preview_thumbnails = data.items[i].snippet.thumbnails.medium.url;
				var youtube_preview_src = document.getElementById('youtube_preview_' + i);
				youtube_preview_src.src = youtube_preview_thumbnails;

				//posted_time
				var youtube_posted_time = data.items[i].snippet.publishedAt;
				document.getElementById("youtube_posted_time_" + i).innerHTML = youtube_posted_time;

				//youtube_title //title_link
				var youtube_title = data.items[i].snippet.title;
				var youtube_a = document.getElementById("youtube_video_link_" + i);
				youtube_a.innerHTML = youtube_title;
				youtube_a.href = 'https://www.youtube.com/watch?v=' + youtube_video_id;
				youtube_a.target = "_blank";

				loadJSON(`${API}videos?part=statistics&id=${youtube_video_id}&maxResults=1&key=${APIKey}`,
					function (data) {
						var youtube_viewCount = data.items[0].statistics.viewCount;
						var youtube_likeCount = data.items[0].statistics.likeCount;
						var youtube_dislikeCount = data.items[0].statistics.dislikeCount;
						var youtube_commentCount = data.items[0].statistics.commentCount;
						document.getElementById('youtube_views_' + i).innerHTML = youtube_viewCount;
						document.getElementById('youtube_likes_' + i).innerHTML = youtube_likeCount;
						document.getElementById('youtube_comments_' + i).innerHTML = youtube_dislikeCount;
						document.getElementById('youtube_dislikes_' + i).innerHTML = youtube_commentCount;
					},
					function (xhr) {
						console.error(xhr);
					}
				);
			}
		},
		function (xhr) {
			console.error(xhr);
		}
	);
}

function makeYoutubeTable(totalNum) {

	let orderType = document.getElementById("order_type").value;

	switch (orderType) {
		case '0':
			getListVideos(totalNum, 'date');
			break;
		case '1':
			getListVideos(totalNum, 'rating');
			break;
		case '2':
			getListVideos(totalNum, 'relevance');
			break;
		case '3':
			getListVideos(totalNum, 'title');
			break;
		case '4':
			getListVideos(totalNum, 'videoCount');
			break;

		case '5':
			getListVideos(totalNum, 'viewCount');
			break;
		default:
			console.log("bad request");
			break;
	}
	listener_table();
}

/*_____________________ listener ____________________ */
function listener_table() {

	const getSort = ({ target }) => {
		const order = (target.dataset.order = -(target.dataset.order || -1));
		const index = [...target.parentNode.cells].indexOf(target);
		const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
		const comparator = (index, order) => (a, b) => order * collator.compare(
			a.children[index].innerHTML,
			b.children[index].innerHTML
		);

		for (const tBody of target.closest('table').tBodies)
			tBody.append(...[...tBody.rows].sort(comparator(index, order)));

		for (const cell of target.parentNode.cells)
			cell.classList.toggle('sorted', cell === target);
	};

	document.querySelectorAll('.table_sort thead').forEach(tableTH => tableTH.addEventListener('click', () => getSort(event)));

}

/* test */
function test(){
	refresh();
	makeYoutubeTable(5);
}

test();