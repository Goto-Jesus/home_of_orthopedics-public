$(window).load(function () {
  var paths = {
    sector_1: {
      path: "M386.26,387.29L390.7,388.26L391.03,389.",
      name: "Севастополь",
    },
    sector_2: {
      path: "M490.96,359.66L489.75,361.56L485.35,361.23L485.13,",
      name: "Крим",
    }
  };

  graph = {
    sz: 5,
    point: function (x, y) {
      $("#map").append("<div class='point'></div>");
      var ob = $(".point:last").offset({
        top: y * this.sz - 2.5,
        left: x * this.sz - 2.5,
      });
      ob.css("width", this.sz).css("height", this.sz);
      return ob;
    },
  };

  $(function () {
    var r = Raphael("map", 615, 415),
      attributes = {
        fill: "#EA8529",
        stroke: "#FBE7D4",
        "stroke-width": 1,
        "stroke-linejoin": "round",
        opacity: "1",
        transform: "translate(623.5801,201.2119)",
        transform: "matrix(1.25,0,0,-1.25,0,950)",
      };

    for (var region in paths) {
      var obj = r.path(paths[region].path);
      obj.attr(attributes);

      var $title = $(".title");
      obj
        .hover(
          function () {
            this.animate({ opacity: "0.35", "stroke-width": 2 }, 300);
          },
          function () {
            this.animate(
              { opacity: attributes.opacity, "stroke-width": 1 },
              300
            );
          }
        )
        .data("title", paths[region].name)
        .mousemove(function (ttl) {
          $title.css({
            display: "block",
            top: ttl.pageY - 10,
            left: ttl.pageX + 20,
          });
          $title.html(this.data("title"));
        })
        .mouseout(function () {
          $title.css("display", "none");
        })
        .click(function (e) {
          graph.point(e.pageX / graph.sz, e.pageY / graph.sz);
        });
    }
  });
});
