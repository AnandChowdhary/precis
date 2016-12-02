const Precis = {
	create: "http://localhost/shorten.php",
	analyze: "http://localhost/analytics.php"
};

const domain = document.domain;

let shortenURL = (url) => {
	$(".shorten-url").attr("disabled", "true");
	$.ajax({url: Precis.create + "?url=" + url + "&creator=" + domain, success: (result) => {
		$(".shorten-url").removeAttr("disabled");
		$(".shorten-url").val(location.protocol + "//" + domain + "/" + result).select();
		let urlx = url.replace("https://", "").replace("http://", "").replace("www.", "").substring(0, 20) + "...";
		$("<tr><td>" + result + "</td><td>" + urlx + "</td><td><a href='#'>View</a></td><td><a href='#'>Open</a></td></tr>").prependTo("[data-table]");
		$(".shorten-url").toggleClass("big");
		$("[data-shortened]").html(parseInt($("[data-shortened]").html())+1);
		setTimeout(() => {
			$(".shorten-url").toggleClass("big");
		}, 200);
	}});
};

$(".back-btn").click(() => {
	$(".card-content").show();
	$(".analytics-content").hide();
});

let viewAnalytics = (slug) => {
	$(".card-content").hide();
	$(".analytics-content").show();
	$.ajax({url: Precis.analyze + "?slug=" + slug + "&type=totalvisitors", success: (result) => {
		$("[data-totalvisitors]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?slug=" + slug + "&type=uniquevisitors", success: (result) => {
		$("[data-uniquevisitors]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?slug=" + slug + "&type=totalreferrers", success: (result) => {
		$("[data-referrers]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?slug=" + slug + "&type=uniquereferrers", success: (result) => {
		$("[data-ureferrers]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?slug=" + slug + "&type=useragents", success: (result) => {
		$("[data-uagents]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?slug=" + slug + "&type=infoanalytics", success: (result) => {
		$("[data-infoanalytics]").html(result);
	}});
}

$(".shorten-url").on("paste", () => {
	setTimeout(() => {
		shortenURL($(".shorten-url").val());
	}, 1);
});

$(".shorten-form").submit((e) => {
	shortenURL($(".shorten-url").val());
	e.preventDefault();
});

$(() => {
	$.ajax({url: Precis.analyze + "?creator=" + domain + "&type=shortened", success: (result) => {
		$("[data-shortened]").html(result);
	}});
	$(".domain-name").html(domain);
	$.ajax({url: Precis.analyze + "?creator=" + domain + "&type=shortened", success: (result) => {
		$("[data-shortened]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?creator=" + domain + "&type=limitleft", success: (result) => {
		$("[data-limitleft]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?creator=" + domain + "&type=total", success: (result) => {
		$("[data-total]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?creator=" + domain + "&type=table", success: (result) => {
		$("[data-table]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?creator=" + domain + "&type=recentip", success: (result) => {
		$("[data-recentip]").html(result);
	}});
	$.ajax({url: Precis.analyze + "?creator=" + domain + "&type=recent", success: (result) => {
		$("[data-recent]").html(result);
	}});
});

new Clipboard(".clipboard-btn");

$(".btn-show").click(() => {
	$(".table-limited").removeClass("table-limited");
	$(".btn-show").parent().hide();
	$(".glare").hide();
});