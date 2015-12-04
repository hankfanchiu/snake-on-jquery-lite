(function() {

  // Queue for all $l functions called before the document is fully loaded:

  var fnQueue = [];
  var runQueue = function() {
    var fn;

    for (var i = 0; i < fnQueue.length; i++) {
      fn = fnQueue.shift();
      fn();
    }
  };

  if (document.readyState === "complete") {
    runQueue();
  } else {
    document.addEventListener("DOMContentLoaded", runQueue);
  }


  // jQuery-lite constructor:

  window.$l = function (input) {
    if (typeof input === "function") {
      fnQueue.push(input);

    } else if (typeof input === "string") {

      if (isTagString(input)) {
        return newElement(input);
      } else {
        return selectElement(input);
      }

    } else if (input instanceof HTMLElement) {
      return new DOMNodeCollection(input);
    }
  };


  // Helper functions for jQuery-lite constructor:

  var isTagString = function(string) {
    return (string[0] === "<") && (string[string.length - 1] === ">");
  };

  var newElement = function(string) {
    var tagName = string.slice(1, string.length - 1);
    var domElement = document.createElement(tagName);

    return new DOMNodeCollection([domElement]);
  };

  var selectElement = function(string) {
    var domElements = document.querySelectorAll(string);
    var returnEl = Array.prototype.slice.call(domElements);

    return new DOMNodeCollection(returnEl);
  };


  // Extend function merges objects:

  window.$l.extend = function () {
    var objects = Array.prototype.slice.call(arguments);
    var extended = objects.shift();

    objects.forEach(function (object) {
      for (var attr in object) {
        extended[attr] = object[attr];
      }
    });

    return extended;
  };


  // Basic jQuery-lite AJAX function:

  window.$l.ajax = function (object) {
    var defaults = {
      success: function () {
        console.log("Request successful");
      },
      error: function () {
        console.error("Request erred");
      },
      url: "",
      method:'GET',
      data: {},
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
    };

    var options = $l.extend(defaults, object);
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState === XMLHttpRequest.DONE) {
        if (xmlhttp.status === 200) {
          var response = JSON.parse(xmlhttp.responseText);
          options.success(response);
        } else {
          options.error();
        }
      }
    };

    xmlhttp.open(options.method, options.url, true);
    xmlhttp.send(JSON.stringify(options.data));
  };


  // DOM Node Collection Class:

  function DOMNodeCollection(collection) {
    this.collection = collection;
  }

  DOMNodeCollection.prototype.html = function(input) {
    if (typeof input === "string") {
      for (var i = 0; i < this.collection.length; i++) {
        this.collection[i].innerHTML = input;
      }

    } else {
      return this.collection[0].innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    this.html("");
  };

  DOMNodeCollection.prototype.append = function (arg) {
    if (arg instanceof DOMNodeCollection) {

      for (var i = 0; i < this.collection.length; i++) {
        for (var j = 0; j < arg.collection.length; j++) {
          this.collection[i].appendChild(arg.collection[j]);
        }
      }

    } else if (typeof arg === "string" || arg instanceof HTMLElement) {
      for (var i = 0; i < this.collection.length; i++) {
        this.collection[i].appendChild(arg);
      }
    }

    return this;
  };

  DOMNodeCollection.prototype.attr = function (attribute, value) {
    if (value === undefined) {
      return this.collection[0].getAttribute(attribute);

    } else {
      for (var i = 0; i < this.collection.length; i++) {
        this.collection[i].setAttribute(attribute, value);
      }

      return this;
    }
  };

  DOMNodeCollection.prototype.addClass = function (cls) {
    var current, classListArray;

    for (var i = 0; i < this.collection.length; i++) {
      current = this.collection[i];
      classListArray = Array.prototype.slice.call(current.classList);

      if (classListArray.indexOf(cls) === -1) {
        current.className = [current.className, cls].join(" ");
      }
    }

    return this;
  };

  DOMNodeCollection.prototype.removeClass = function (cls) {
    var classes = cls.split(" ");

    for (var i = 0; i < this.collection.length; i++) {
      for (var j = 0; j < classes.length; j++) {
        this.collection[i].classList.remove(classes[j]);
      }
    }

    return this;
  };

  DOMNodeCollection.prototype.children = function () {
    var children = this.collection.map(function(element) {
      return element.innerHTML;
    });

    return new DOMNodeCollection(children);
  };

  DOMNodeCollection.prototype.parent = function () {
    var parents = this.collection.map(function(element) {
      return element.parentNode();
    });

    return new DOMNodeCollection(parents);
  };

  DOMNodeCollection.prototype.find = function (selector) {
    var found;
    var foundElements = [];

    for (var i = 0; i < this.collection.length; i++) {
      found = this.collection[i].querySelector(selector);

      if (found) {
        foundElements.push(found);
      }
    }

    return new DOMNodeCollection(foundElements);
  };

  DOMNodeCollection.prototype.remove = function () {
    var elem;

    for (var i = 0; i < this.collection.length; i++) {
      elem = this.collection[i];
      elem.parentNode.removeChild(elem);
    }
  };

  // Add and remove event listeners without event delegation:

  DOMNodeCollection.prototype.on = function (action, listener) {
    for (var i = 0; i < this.collection.length; i++) {
      this.collection[i].addEventListener(action, listener);
    }
  };

  DOMNodeCollection.prototype.off = function (action, listener) {
    for (var i = 0; i < this.collection.length; i++) {
      this.collection[i].removeEventListener(action, listener);
    }
  };

}());
