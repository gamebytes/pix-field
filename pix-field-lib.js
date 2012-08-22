// A collection of common utility methods.
// No dependencies on other scripts

var pix_field_lib = {
  // Returns a function(callback) for chaining animation frames.
  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  animation_frame_requester : function() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  },

  // Hooks into the document's onkeydown and onkeyup events.
  // Returns an object get(keycode) returns true if the key is pressed and falsy otherwise.
  key_state_tracker : function() {
    var _state = {};
    document.onkeydown = function(ev) {
      _state[ev.which] = true;
    };
    document.onkeyup = function(ev) {
      _state[ev.which] = false;
    };
    return {
      get : function(key) {
        return _state[key];
      }
    };
  },

  // Return the angle in the range (-PI,PI]
  bound_angle : function(angle) {
    while (angle > Math.PI) {
      angle -= Math.TwoPI;
    }
    while (angle <= -Math.PI) {
      angle += Math.TwoPI;
    }
    return angle;
  },

  // Resets a context to the standard transform and clears it.
  reset_context : function(context, fillStyle) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    if (fillStyle) {
      context.fillStyle = fillStyle;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    } else {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  },

  // Draws an array of pix to the context at the given angle.
  // A pix is an array of three elements [x, y, fillstyle].
  // Each pix is rendered as a square of size 1 centered at the given x and y.
  render_pix_array : function(context, pix_array, angle) {
    context.save();
    context.rotate(angle);
    pix_array.forEach(function(p) {
      context.save();
      context.translate(p[0], p[1]);
      context.rotate(-angle);
      context.fillStyle = p[2];
      context.fillRect(-0.5, -0.5, 1, 1);
      context.restore();
    });
    context.restore();
  }
};

Math.TwoPI = Math.PI * 2;
Math.PIOverTwo = Math.PI / 2;
