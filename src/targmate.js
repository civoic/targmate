(function($) {

	$.fn.extend({

        targmate: function(options) {

        	var defaults = {
                
            };

            var options = $.extend(defaults, options);

            var sourceNode = $(this);
            var targetNode = $("#target_node");
            sourceNode.click(function(){
            	var cloneNode = $(this).clone();

            	var sourcePos = $(this).offset();
            	var sourceTop = sourcePos.top;
            	var sourceLeft = sourcePos.left;

            	var targetPos = targetNode.offset();
            	var targetTop = targetPos.top;
            	var targetLeft = targetPos.left;

            	var firstLeft = Math.abs(targetLeft - sourceLeft)/2;
				var targetNodeWidth = targetNode.width();

            	$("body").append(cloneNode);
            	cloneNode.css("position", "absolute");
            	cloneNode.css("top", sourceTop);
            	cloneNode.css("left", sourceLeft);
            	cloneNode.animate({top:sourceTop - 100, left:sourceLeft + firstLeft}).animate({width:targetNodeWidth, top:targetTop, left:targetLeft}).fadeOut("slow");
            });

        }
    });

})(jQuery);