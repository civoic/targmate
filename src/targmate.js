(function($) {
    var animateImpl = {
        base: function(srcNode, animateQueue) {
            if (Object.prototype.toString.call(animateQueue) != '[object Array]') {
                return;
            }

            for (var item in animateQueue) {
                queueImpl.add(srcNode, animateQueue[item]);
            }
        },
        /*
        add: function(node, queuedFunc) {
            var newFunc = function(){
                queuedFunc();
                $(this).dequeue();
            };

            node.queue(newFunc);
        },

        start: function(node) {
            node.dequeue();
        },
        */

        direct: function(srcNode, dstNode) {
            var cloneNode = $(srcNode).clone();
            var startPos = $(srcNode).offset();
            var endPos = dstNode.offset();
            var dstWidth = dstNode.width();

            $("body").append(cloneNode);
            cloneNode.css("position", "absolute");
            cloneNode.css("top", startPos.top);
            cloneNode.css("left", startPos.left);
            cloneNode.animate({top:endPos.top, left:endPos.left, width: dstWidth}).fadeOut("slow");
        },
        jump: function(srcNode, dstNode, firstJumpPos) {
            var cloneNode = $(srcNode).clone();
            var startPos = $(srcNode).offset();
            var endPos = dstNode.offset();
            var dstWidth = dstNode.width();

            $("body").append(cloneNode);
            cloneNode.css("position", "absolute");
            cloneNode.css("top", startPos.top);
            cloneNode.css("left", startPos.left);

            var firstAnimateLenOfTop = (startPos.top - endPos.top) / 4;
            var firstAnimateLenOfLeft = (endPos.left - startPos.left) / 4;

            cloneNode.animate({top:startPos.top + firstAnimateLenOfTop, left: startPos.left + firstAnimateLenOfLeft}).animate({top:endPos.top, left:endPos.left, width: dstWidth}).fadeOut("slow");
        },
    };

	$.fn.extend({

        targmate: function(options) {
            

            /*paramters in options
            type:direct, jump, fall, custom
            postions:array of the points which define the line of the animation, only used when type is custom
            */
        	var defaults = {
                type : "direct",
            };

            var options = $.extend(defaults, options);

            var sourceNode = $(this);
            var targetNode = $("#target_node");

            sourceNode.click(function(){

                if (options.type == "direct") {
                    animateImpl.direct(sourceNode, targetNode);
                }
                else if (options.type == "jump") {
                    animateImpl.jump(sourceNode, targetNode);
                }
                else {
                    // wrong, do nothing
                    return;
                }

            	
            });

        }
    });

})(jQuery);