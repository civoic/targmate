(function($) {
    var queueImpl = {
        add: function(node, queuedFunc) {
            var newFunc = function(){
                queuedFunc();
                $(this).dequeue();
            };

            node.queue(newFunc);
        },
    };

    var animateImpl = {
        base: function(srcNode, animateQueue) {

            if (Object.prototype.toString.call(animateQueue) != '[object Array]') {
                return;
            }

            for (var item in animateQueue) {
                queueImpl.add(srcNode, animateQueue[item]);
            }
        },
        start: function(node) {
            node.dequeue();
        },

        direct: function(srcNode, dstNode) {
            var cloneNode = $(srcNode).clone();
            var startPos = $(srcNode).offset();
            var endPos = dstNode.offset();
            var dstWidth = dstNode.width();

            $("body").append(cloneNode);
            cloneNode.css("position", "absolute");
            cloneNode.css("top", startPos.top);
            cloneNode.css("left", startPos.left);
            var funcs = [
                function() {
                    cloneNode.animate({top:endPos.top, left:endPos.left, width: dstWidth});
                   
                },
                function() {
                     cloneNode.fadeOut(3000);
                }
            ];

            animateImpl.base(cloneNode, funcs);
            animateImpl.start(cloneNode);
        },
        jump: function(srcNode, dstNode) {
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
                    animateImpl.direct(sourceNode, targetNode);
                }
                else if (options.type == "fall") {

                }
                else if (options.type == "custom") {

                }
                else {
                    // wrong, do nothing
                    return;
                }

            	
            });

        }
    });

})(jQuery);