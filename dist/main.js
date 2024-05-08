/*! For license information please see main.js.LICENSE.txt */
!(function () {
    var e = {
        348: function (e) {
          e.exports = (function () {
            "use strict";
            var e = document,
              t = e.createTextNode.bind(e);
            function r(e, t, r) {
              e.style.setProperty(t, r);
            }
            function n(e, t) {
              return e.appendChild(t);
            }
            function i(t, r, i, s) {
              var o = e.createElement("span");
              return (
                r && (o.className = r),
                i && (!s && o.setAttribute("data-" + r, i), (o.textContent = i)),
                (t && n(t, o)) || o
              );
            }
            function s(e, t) {
              return e.getAttribute("data-" + t);
            }
            function o(t, r) {
              return t && 0 != t.length
                ? t.nodeName
                  ? [t]
                  : [].slice.call(
                      t[0].nodeName ? t : (r || e).querySelectorAll(t)
                    )
                : [];
            }
            function a(e) {
              for (var t = []; e--; ) t[e] = [];
              return t;
            }
            function l(e, t) {
              e && e.some(t);
            }
            function c(e) {
              return function (t) {
                return e[t];
              };
            }
            function u(e, t, n) {
              var i = "--" + t,
                s = i + "-index";
              l(n, function (e, t) {
                Array.isArray(e)
                  ? l(e, function (e) {
                      r(e, s, t);
                    })
                  : r(e, s, t);
              }),
                r(e, i + "-total", n.length);
            }
            var d = {};
            function h(e, t, r) {
              var n = r.indexOf(e);
              if (-1 == n)
                r.unshift(e),
                  l(d[e].depends, function (t) {
                    h(t, e, r);
                  });
              else {
                var i = r.indexOf(t);
                r.splice(n, 1), r.splice(i, 0, e);
              }
              return r;
            }
            function p(e, t, r, n) {
              return { by: e, depends: t, key: r, split: n };
            }
            function f(e) {
              return h(e, 0, []).map(c(d));
            }
            function m(e) {
              d[e.by] = e;
            }
            function v(e, r, s, a, c) {
              e.normalize();
              var u = [],
                d = document.createDocumentFragment();
              a && u.push(e.previousSibling);
              var h = [];
              return (
                o(e.childNodes).some(function (e) {
                  if (!e.tagName || e.hasChildNodes()) {
                    if (e.childNodes && e.childNodes.length)
                      return h.push(e), void u.push.apply(u, v(e, r, s, a, c));
                    var n = e.wholeText || "",
                      o = n.trim();
                    o.length &&
                      (" " === n[0] && h.push(t(" ")),
                      l(o.split(s), function (e, t) {
                        t && c && h.push(i(d, "whitespace", " ", c));
                        var n = i(d, r, e);
                        u.push(n), h.push(n);
                      }),
                      " " === n[n.length - 1] && h.push(t(" ")));
                  } else h.push(e);
                }),
                l(h, function (e) {
                  n(d, e);
                }),
                (e.innerHTML = ""),
                n(e, d),
                u
              );
            }
            var g = 0;
            function y(e, t) {
              for (var r in t) e[r] = t[r];
              return e;
            }
            var w = "words",
              b = p(w, g, "word", function (e) {
                return v(e, "word", /\s+/, 0, 1);
              }),
              _ = "chars",
              T = p(_, [w], "char", function (e, t, r) {
                var n = [];
                return (
                  l(r[w], function (e, r) {
                    n.push.apply(n, v(e, "char", "", t.whitespace && r));
                  }),
                  n
                );
              });
            function E(e) {
              var t = (e = e || {}).key;
              return o(e.target || "[data-splitting]").map(function (r) {
                var n = r["🍌"];
                if (!e.force && n) return n;
                n = r["🍌"] = { el: r };
                var i = f(e.by || s(r, "splitting") || _),
                  o = y({}, e);
                return (
                  l(i, function (e) {
                    if (e.split) {
                      var i = e.by,
                        s = (t ? "-" + t : "") + e.key,
                        a = e.split(r, o, n);
                      s && u(r, s, a), (n[i] = a), r.classList.add(i);
                    }
                  }),
                  r.classList.add("splitting"),
                  n
                );
              });
            }
            function S(e) {
              var t = ((e = e || {}).target = i());
              return (t.innerHTML = e.content), E(e), t.outerHTML;
            }
            function x(e, t, r) {
              var n = o(t.matching || e.children, e),
                i = {};
              return (
                l(n, function (e) {
                  var t = Math.round(e[r]);
                  (i[t] || (i[t] = [])).push(e);
                }),
                Object.keys(i).map(Number).sort(k).map(c(i))
              );
            }
            function k(e, t) {
              return e - t;
            }
            (E.html = S), (E.add = m);
            var M = p("lines", [w], "line", function (e, t, r) {
                return x(e, { matching: r[w] }, "offsetTop");
              }),
              P = p("items", g, "item", function (e, t) {
                return o(t.matching || e.children, e);
              }),
              O = p("rows", g, "row", function (e, t) {
                return x(e, t, "offsetTop");
              }),
              C = p("cols", g, "col", function (e, t) {
                return x(e, t, "offsetLeft");
              }),
              A = p("grid", ["rows", "cols"]),
              I = "layout",
              L = p(I, g, g, function (e, t) {
                var a = (t.rows = +(t.rows || s(e, "rows") || 1)),
                  l = (t.columns = +(t.columns || s(e, "columns") || 1));
                if (
                  ((t.image = t.image || s(e, "image") || e.currentSrc || e.src),
                  t.image)
                ) {
                  var c = o("img", e)[0];
                  t.image = c && (c.currentSrc || c.src);
                }
                t.image && r(e, "background-image", "url(" + t.image + ")");
                for (var u = a * l, d = [], h = i(g, "cell-grid"); u--; ) {
                  var p = i(h, "cell");
                  i(p, "cell-inner"), d.push(p);
                }
                return n(e, h), d;
              }),
              R = p("cellRows", [I], "row", function (e, t, r) {
                var n = t.rows,
                  i = a(n);
                return (
                  l(r[I], function (e, t, r) {
                    i[Math.floor(t / (r.length / n))].push(e);
                  }),
                  i
                );
              }),
              z = p("cellColumns", [I], "col", function (e, t, r) {
                var n = t.columns,
                  i = a(n);
                return (
                  l(r[I], function (e, t) {
                    i[t % n].push(e);
                  }),
                  i
                );
              }),
              D = p(
                "cells",
                ["cellRows", "cellColumns"],
                "cell",
                function (e, t, r) {
                  return r[I];
                }
              );
            return (
              m(b), m(T), m(M), m(P), m(O), m(C), m(A), m(L), m(R), m(z), m(D), E
            );
          })();
        },
      },
      t = {};
    function r(n) {
      var i = t[n];
      if (void 0 !== i) return i.exports;
      var s = (t[n] = { exports: {} });
      return e[n].call(s.exports, s, s.exports, r), s.exports;
    }
    (r.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return r.d(t, { a: t }), t;
    }),
      (r.d = function (e, t) {
        for (var n in t)
          r.o(t, n) &&
            !r.o(e, n) &&
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
      }),
      (r.g = (function () {
        if ("object" == typeof globalThis) return globalThis;
        try {
          return this || new Function("return this")();
        } catch (e) {
          if ("object" == typeof window) return window;
        }
      })()),
      (r.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (r.r = function (e) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      }),
      (function () {
        "use strict";
        var e = {};
        function t(e) {
          return (
            (t =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (e) {
                    return typeof e;
                  }
                : function (e) {
                    return e &&
                      "function" == typeof Symbol &&
                      e.constructor === Symbol &&
                      e !== Symbol.prototype
                      ? "symbol"
                      : typeof e;
                  }),
            t(e)
          );
        }
        function n(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function i(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        function s(e, t, r) {
          return t && i(e.prototype, t), r && i(e, r), e;
        }
        function o(e, t, r) {
          return (
            t in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        function a(e, t) {
          return (
            (function (e) {
              if (Array.isArray(e)) return e;
            })(e) ||
            (function (e, t) {
              if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(e)))
                return;
              var r = [],
                n = !0,
                i = !1,
                s = void 0;
              try {
                for (
                  var o, a = e[Symbol.iterator]();
                  !(n = (o = a.next()).done) &&
                  (r.push(o.value), !t || r.length !== t);
                  n = !0
                );
              } catch (e) {
                (i = !0), (s = e);
              } finally {
                try {
                  n || null == a.return || a.return();
                } finally {
                  if (i) throw s;
                }
              }
              return r;
            })(e, t) ||
            c(e, t) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function l(e) {
          return (
            (function (e) {
              if (Array.isArray(e)) return u(e);
            })(e) ||
            (function (e) {
              if ("undefined" != typeof Symbol && Symbol.iterator in Object(e))
                return Array.from(e);
            })(e) ||
            c(e) ||
            (function () {
              throw new TypeError(
                "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
              );
            })()
          );
        }
        function c(e, t) {
          if (e) {
            if ("string" == typeof e) return u(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return (
              "Object" === r && e.constructor && (r = e.constructor.name),
              "Map" === r || "Set" === r
                ? Array.from(e)
                : "Arguments" === r ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                ? u(e, t)
                : void 0
            );
          }
        }
        function u(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
          return n;
        }
        r.r(e),
          r.d(e, {
            Bg: function () {
              return Md;
            },
            Carousel: function () {
              return wr;
            },
            Field: function () {
              return vn;
            },
            Form: function () {
              return bn;
            },
            Load: function () {
              return Qe;
            },
            Menu: function () {
              return yn;
            },
            MenuButton: function () {
              return wn;
            },
            Modal: function () {
              return _n;
            },
            ModalClose: function () {
              return Tn;
            },
            Nav: function () {
              return wt;
            },
            Scroll: function () {
              return yt;
            },
            ScrollTo: function () {
              return mn;
            },
            Split: function () {
              return v;
            },
            Video: function () {
              return fn;
            },
          });
        var d = (function () {
            function e(t) {
              n(this, e),
                (this.mAttr = "data-" + t.dataName),
                (this.mCaptureEvents = ["mouseenter", "mouseleave"]),
                (this.el = t.el);
            }
            return (
              s(e, [
                {
                  key: "mInit",
                  value: function (e) {
                    var t = this;
                    (this.modules = e),
                      (this.mCheckEventTarget =
                        this.mCheckEventTarget.bind(this)),
                      this.events &&
                        Object.keys(this.events).forEach(function (e) {
                          return t.mAddEvent(e);
                        });
                  },
                },
                {
                  key: "mUpdate",
                  value: function (e) {
                    this.modules = e;
                  },
                },
                {
                  key: "mDestroy",
                  value: function () {
                    var e = this;
                    this.events &&
                      Object.keys(this.events).forEach(function (t) {
                        return e.mRemoveEvent(t);
                      });
                  },
                },
                {
                  key: "mAddEvent",
                  value: function (e) {
                    var t = !!this.mCaptureEvents.includes(e);
                    this.el.addEventListener(e, this.mCheckEventTarget, t);
                  },
                },
                {
                  key: "mRemoveEvent",
                  value: function (e) {
                    var t = !!this.mCaptureEvents.includes(e);
                    this.el.removeEventListener(e, this.mCheckEventTarget, t);
                  },
                },
                {
                  key: "mCheckEventTarget",
                  value: function (e) {
                    var t = this.events[e.type];
                    if ("string" == typeof t) this[t](e);
                    else {
                      var r = "[" + this.mAttr + "]",
                        n = e.target;
                      if (this.mCaptureEvents.includes(e.type))
                        n.matches(r) && this.mCallEventMethod(e, t, n);
                      else
                        for (
                          ;
                          n &&
                          n !== document &&
                          (!n.matches(r) ||
                            "undefined" == this.mCallEventMethod(e, t, n));
  
                        )
                          n = n.parentNode;
                    }
                  },
                },
                {
                  key: "mCallEventMethod",
                  value: function (e, t, r) {
                    var n = r.getAttribute(this.mAttr);
                    if (t.hasOwnProperty(n)) {
                      var i = t[n];
                      e.hasOwnProperty("currentTarget") ||
                        Object.defineProperty(e, "currentTarget", { value: r }),
                        e.hasOwnProperty("curTarget") ||
                          Object.defineProperty(e, "curTarget", { value: r }),
                        this[i](e);
                    }
                  },
                },
                {
                  key: "$",
                  value: function (e, r) {
                    var n = [
                        e.indexOf("."),
                        e.indexOf("#"),
                        e.indexOf("["),
                      ].filter(function (e) {
                        return -1 != e;
                      }),
                      i = !1,
                      s = e,
                      o = "",
                      a = this.el;
                    return (
                      n.length &&
                        ((i = Math.min.apply(Math, l(n))),
                        (s = e.slice(0, i)),
                        (o = e.slice(i))),
                      "object" == t(r) && (a = r),
                      a.querySelectorAll("[" + this.mAttr + "=" + s + "]" + o)
                    );
                  },
                },
                {
                  key: "parent",
                  value: function (e, t) {
                    for (
                      var r = "[" + this.mAttr + "=" + e + "]", n = t.parentNode;
                      n && n !== document;
  
                    ) {
                      if (n.matches(r)) return n;
                      n = n.parentNode;
                    }
                  },
                },
                {
                  key: "getData",
                  value: function (e, t) {
                    return (t || this.el).getAttribute(this.mAttr + "-" + e);
                  },
                },
                {
                  key: "setData",
                  value: function (e, t, r) {
                    return (r || this.el).setAttribute(this.mAttr + "-" + e, t);
                  },
                },
                {
                  key: "call",
                  value: function (e, t, r, n) {
                    var i = this;
                    t && !r && ((r = t), (t = !1)),
                      this.modules[r] &&
                        (n
                          ? this.modules[r][n] && this.modules[r][n][e](t)
                          : Object.keys(this.modules[r]).forEach(function (n) {
                              i.modules[r][n][e](t);
                            }));
                  },
                },
                {
                  key: "on",
                  value: function (e, t, r, n) {
                    var i = this;
                    this.modules[t] &&
                      (n
                        ? this.modules[t][n].el.addEventListener(e, function (e) {
                            return r(e);
                          })
                        : Object.keys(this.modules[t]).forEach(function (n) {
                            i.modules[t][n].el.addEventListener(e, function (e) {
                              return r(e);
                            });
                          }));
                  },
                },
                { key: "init", value: function () {} },
                { key: "destroy", value: function () {} },
              ]),
              e
            );
          })(),
          h = (function () {
            function e(t) {
              n(this, e),
                this.app,
                (this.modules = t.modules),
                (this.currentModules = {}),
                (this.activeModules = {}),
                (this.newModules = {}),
                (this.moduleId = 0);
            }
            return (
              s(e, [
                {
                  key: "init",
                  value: function (e, t) {
                    var r = this,
                      n = (t || document).querySelectorAll("*");
                    e && !this.app && (this.app = e),
                      (this.activeModules.app = { app: this.app }),
                      n.forEach(function (e) {
                        Array.from(e.attributes).forEach(function (n) {
                          if (n.name.startsWith("data-module")) {
                            var i = !1,
                              s = n.name.split("-").splice(2),
                              o = r.toCamel(s);
                            if (
                              (r.modules[o]
                                ? (i = !0)
                                : r.modules[r.toUpper(o)] &&
                                  ((o = r.toUpper(o)), (i = !0)),
                              i)
                            ) {
                              var a = { el: e, name: o, dataName: s.join("-") },
                                l = new r.modules[o](a),
                                c = n.value;
                              c ||
                                (r.moduleId++,
                                (c = "m" + r.moduleId),
                                e.setAttribute(n.name, c)),
                                r.addActiveModule(o, c, l);
                              var u = o + "-" + c;
                              t
                                ? (r.newModules[u] = l)
                                : (r.currentModules[u] = l);
                            }
                          }
                        });
                      }),
                      Object.entries(this.currentModules).forEach(function (e) {
                        var n = a(e, 2),
                          i = n[0],
                          s = n[1];
                        if (t) {
                          var o = i.split("-"),
                            l = o.shift(),
                            c = o.pop();
                          r.addActiveModule(l, c, s);
                        } else r.initModule(s);
                      });
                  },
                },
                {
                  key: "initModule",
                  value: function (e) {
                    e.mInit(this.activeModules), e.init();
                  },
                },
                {
                  key: "addActiveModule",
                  value: function (e, t, r) {
                    this.activeModules[e]
                      ? Object.assign(this.activeModules[e], o({}, t, r))
                      : (this.activeModules[e] = o({}, t, r));
                  },
                },
                {
                  key: "update",
                  value: function (e) {
                    var t = this;
                    this.init(this.app, e),
                      Object.entries(this.currentModules).forEach(function (e) {
                        var r = a(e, 2);
                        r[0];
                        r[1].mUpdate(t.activeModules);
                      }),
                      Object.entries(this.newModules).forEach(function (e) {
                        var r = a(e, 2),
                          n = (r[0], r[1]);
                        t.initModule(n);
                      }),
                      Object.assign(this.currentModules, this.newModules);
                  },
                },
                {
                  key: "destroy",
                  value: function (e) {
                    e ? this.destroyScope(e) : this.destroyModules();
                  },
                },
                {
                  key: "destroyScope",
                  value: function (e) {
                    var t = this;
                    e.querySelectorAll("*").forEach(function (e) {
                      Array.from(e.attributes).forEach(function (e) {
                        if (e.name.startsWith("data-module")) {
                          var r = e.value,
                            n = e.name.split("-").splice(2),
                            i = t.toCamel(n) + "-" + r,
                            s = !1;
                          t.currentModules[i]
                            ? (s = !0)
                            : t.currentModules[t.toUpper(i)] &&
                              ((i = t.toUpper(i)), (s = !0)),
                            s &&
                              (t.destroyModule(t.currentModules[i]),
                              delete t.currentModules[i]);
                        }
                      });
                    }),
                      (this.activeModules = {}),
                      (this.newModules = {});
                  },
                },
                {
                  key: "destroyModules",
                  value: function () {
                    var e = this;
                    Object.entries(this.currentModules).forEach(function (t) {
                      var r = a(t, 2),
                        n = (r[0], r[1]);
                      e.destroyModule(n);
                    }),
                      (this.currentModules = []);
                  },
                },
                {
                  key: "destroyModule",
                  value: function (e) {
                    e.mDestroy(), e.destroy();
                  },
                },
                {
                  key: "toCamel",
                  value: function (e) {
                    var t = this;
                    return e.reduce(function (e, r) {
                      return e + t.toUpper(r);
                    });
                  },
                },
                {
                  key: "toUpper",
                  value: function (e) {
                    return e.charAt(0).toUpperCase() + e.slice(1);
                  },
                },
              ]),
              e
            );
          })(),
          p = h,
          f = r(348),
          m = r.n(f),
          v = class extends d {
            constructor(e) {
              super(e),
                (this.$el = this.el),
                (this.splitType = this.getData("type")
                  ? this.getData("type")
                  : "chars");
            }
            init() {
              this.split();
            }
            destroy() {
              super.destroy();
            }
            split() {
              m()({ target: this.$el, by: this.splitType });
            }
          };
        const g = new WeakMap();
        function y(e, t, r, n) {
          if (!e && !g.has(t)) return !1;
          const i = g.get(t) ?? new WeakMap();
          g.set(t, i);
          const s = i.get(r) ?? new Set();
          i.set(r, s);
          const o = s.has(n);
          return e ? s.add(n) : s.delete(n), o && e;
        }
        var w = function (e, t, r, n = {}) {
          const { signal: i, base: s = document } = n;
          if (i?.aborted) return;
          const { once: o, ...a } = n,
            l = s instanceof Document ? s.documentElement : s,
            c = Boolean("object" == typeof n ? n.capture : n),
            u = (n) => {
              const i = (function (e, t) {
                let r = e.target;
                if (
                  (r instanceof Text && (r = r.parentElement),
                  r instanceof Element && e.currentTarget instanceof Element)
                ) {
                  const n = r.closest(t);
                  if (n && e.currentTarget.contains(n)) return n;
                }
              })(n, e);
              if (i) {
                const e = Object.assign(n, { delegateTarget: i });
                r.call(l, e),
                  o && (l.removeEventListener(t, u, a), y(!1, l, r, d));
              }
            },
            d = JSON.stringify({ selector: e, type: t, capture: c });
          y(!0, l, r, d) || l.addEventListener(t, u, a),
            i?.addEventListener("abort", () => {
              y(!1, l, r, d);
            });
        };
        function b(e, t) {
          void 0 === t && (t = {});
          for (
            var r = (function (e) {
                for (var t = [], r = 0; r < e.length; ) {
                  var n = e[r];
                  if ("*" !== n && "+" !== n && "?" !== n)
                    if ("\\" !== n)
                      if ("{" !== n)
                        if ("}" !== n)
                          if (":" !== n)
                            if ("(" !== n)
                              t.push({ type: "CHAR", index: r, value: e[r++] });
                            else {
                              var i = 1,
                                s = "";
                              if ("?" === e[(a = r + 1)])
                                throw new TypeError(
                                  'Pattern cannot start with "?" at '.concat(a)
                                );
                              for (; a < e.length; )
                                if ("\\" !== e[a]) {
                                  if (")" === e[a]) {
                                    if (0 == --i) {
                                      a++;
                                      break;
                                    }
                                  } else if (
                                    "(" === e[a] &&
                                    (i++, "?" !== e[a + 1])
                                  )
                                    throw new TypeError(
                                      "Capturing groups are not allowed at ".concat(
                                        a
                                      )
                                    );
                                  s += e[a++];
                                } else s += e[a++] + e[a++];
                              if (i)
                                throw new TypeError(
                                  "Unbalanced pattern at ".concat(r)
                                );
                              if (!s)
                                throw new TypeError(
                                  "Missing pattern at ".concat(r)
                                );
                              t.push({ type: "PATTERN", index: r, value: s }),
                                (r = a);
                            }
                          else {
                            for (var o = "", a = r + 1; a < e.length; ) {
                              var l = e.charCodeAt(a);
                              if (
                                !(
                                  (l >= 48 && l <= 57) ||
                                  (l >= 65 && l <= 90) ||
                                  (l >= 97 && l <= 122) ||
                                  95 === l
                                )
                              )
                                break;
                              o += e[a++];
                            }
                            if (!o)
                              throw new TypeError(
                                "Missing parameter name at ".concat(r)
                              );
                            t.push({ type: "NAME", index: r, value: o }), (r = a);
                          }
                        else t.push({ type: "CLOSE", index: r, value: e[r++] });
                      else t.push({ type: "OPEN", index: r, value: e[r++] });
                    else
                      t.push({ type: "ESCAPED_CHAR", index: r++, value: e[r++] });
                  else t.push({ type: "MODIFIER", index: r, value: e[r++] });
                }
                return t.push({ type: "END", index: r, value: "" }), t;
              })(e),
              n = t.prefixes,
              i = void 0 === n ? "./" : n,
              s = "[^".concat(T(t.delimiter || "/#?"), "]+?"),
              o = [],
              a = 0,
              l = 0,
              c = "",
              u = function (e) {
                if (l < r.length && r[l].type === e) return r[l++].value;
              },
              d = function (e) {
                var t = u(e);
                if (void 0 !== t) return t;
                var n = r[l],
                  i = n.type,
                  s = n.index;
                throw new TypeError(
                  "Unexpected "
                    .concat(i, " at ")
                    .concat(s, ", expected ")
                    .concat(e)
                );
              },
              h = function () {
                for (var e, t = ""; (e = u("CHAR") || u("ESCAPED_CHAR")); )
                  t += e;
                return t;
              };
            l < r.length;
  
          ) {
            var p = u("CHAR"),
              f = u("NAME"),
              m = u("PATTERN");
            if (f || m) {
              var v = p || "";
              -1 === i.indexOf(v) && ((c += v), (v = "")),
                c && (o.push(c), (c = "")),
                o.push({
                  name: f || a++,
                  prefix: v,
                  suffix: "",
                  pattern: m || s,
                  modifier: u("MODIFIER") || "",
                });
            } else {
              var g = p || u("ESCAPED_CHAR");
              if (g) c += g;
              else if ((c && (o.push(c), (c = "")), u("OPEN"))) {
                v = h();
                var y = u("NAME") || "",
                  w = u("PATTERN") || "",
                  b = h();
                d("CLOSE"),
                  o.push({
                    name: y || (w ? a++ : ""),
                    pattern: y && !w ? s : w,
                    prefix: v,
                    suffix: b,
                    modifier: u("MODIFIER") || "",
                  });
              } else d("END");
            }
          }
          return o;
        }
        function _(e, t) {
          var r = [];
          return (function (e, t, r) {
            void 0 === r && (r = {});
            var n = r.decode,
              i =
                void 0 === n
                  ? function (e) {
                      return e;
                    }
                  : n;
            return function (r) {
              var n = e.exec(r);
              if (!n) return !1;
              for (
                var s = n[0],
                  o = n.index,
                  a = Object.create(null),
                  l = function (e) {
                    if (void 0 === n[e]) return "continue";
                    var r = t[e - 1];
                    "*" === r.modifier || "+" === r.modifier
                      ? (a[r.name] = n[e]
                          .split(r.prefix + r.suffix)
                          .map(function (e) {
                            return i(e, r);
                          }))
                      : (a[r.name] = i(n[e], r));
                  },
                  c = 1;
                c < n.length;
                c++
              )
                l(c);
              return { path: s, index: o, params: a };
            };
          })(x(e, r, t), r, t);
        }
        function T(e) {
          return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
        }
        function E(e) {
          return e && e.sensitive ? "" : "i";
        }
        function S(e, t, r) {
          return (function (e, t, r) {
            void 0 === r && (r = {});
            for (
              var n = r.strict,
                i = void 0 !== n && n,
                s = r.start,
                o = void 0 === s || s,
                a = r.end,
                l = void 0 === a || a,
                c = r.encode,
                u =
                  void 0 === c
                    ? function (e) {
                        return e;
                      }
                    : c,
                d = r.delimiter,
                h = void 0 === d ? "/#?" : d,
                p = r.endsWith,
                f = "[".concat(T(void 0 === p ? "" : p), "]|$"),
                m = "[".concat(T(h), "]"),
                v = o ? "^" : "",
                g = 0,
                y = e;
              g < y.length;
              g++
            ) {
              var w = y[g];
              if ("string" == typeof w) v += T(u(w));
              else {
                var b = T(u(w.prefix)),
                  _ = T(u(w.suffix));
                if (w.pattern)
                  if ((t && t.push(w), b || _))
                    if ("+" === w.modifier || "*" === w.modifier) {
                      var S = "*" === w.modifier ? "?" : "";
                      v += "(?:"
                        .concat(b, "((?:")
                        .concat(w.pattern, ")(?:")
                        .concat(_)
                        .concat(b, "(?:")
                        .concat(w.pattern, "))*)")
                        .concat(_, ")")
                        .concat(S);
                    } else
                      v += "(?:"
                        .concat(b, "(")
                        .concat(w.pattern, ")")
                        .concat(_, ")")
                        .concat(w.modifier);
                  else
                    "+" === w.modifier || "*" === w.modifier
                      ? (v += "((?:"
                          .concat(w.pattern, ")")
                          .concat(w.modifier, ")"))
                      : (v += "(".concat(w.pattern, ")").concat(w.modifier));
                else v += "(?:".concat(b).concat(_, ")").concat(w.modifier);
              }
            }
            if (l)
              i || (v += "".concat(m, "?")),
                (v += r.endsWith ? "(?=".concat(f, ")") : "$");
            else {
              var x = e[e.length - 1],
                k =
                  "string" == typeof x
                    ? m.indexOf(x[x.length - 1]) > -1
                    : void 0 === x;
              i || (v += "(?:".concat(m, "(?=").concat(f, "))?")),
                k || (v += "(?=".concat(m, "|").concat(f, ")"));
            }
            return new RegExp(v, E(r));
          })(b(e, r), t, r);
        }
        function x(e, t, r) {
          return e instanceof RegExp
            ? (function (e, t) {
                if (!t) return e;
                for (
                  var r = /\((?:\?<(.*?)>)?(?!\?)/g, n = 0, i = r.exec(e.source);
                  i;
  
                )
                  t.push({
                    name: i[1] || n++,
                    prefix: "",
                    suffix: "",
                    modifier: "",
                    pattern: "",
                  }),
                    (i = r.exec(e.source));
                return e;
              })(e, t)
            : Array.isArray(e)
            ? (function (e, t, r) {
                var n = e.map(function (e) {
                  return x(e, t, r).source;
                });
                return new RegExp("(?:".concat(n.join("|"), ")"), E(r));
              })(e, t, r)
            : S(e, t, r);
        }
        function k() {
          return (
            (k = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                  }
                  return e;
                }),
            k.apply(this, arguments)
          );
        }
        const M = (e, t) =>
            String(e)
              .toLowerCase()
              .replace(/[\s/_.]+/g, "-")
              .replace(/[^\w-]+/g, "")
              .replace(/--+/g, "-")
              .replace(/^-+|-+$/g, "") ||
            t ||
            "",
          P = ({ hash: e } = {}) =>
            window.location.pathname +
            window.location.search +
            (e ? window.location.hash : ""),
          O = (e, t = {}) => {
            const r = k(
              {
                url: (e = e || P({ hash: !0 })),
                random: Math.random(),
                source: "swup",
              },
              t
            );
            window.history.pushState(r, "", e);
          },
          C = (e = null, t = {}) => {
            e = e || P({ hash: !0 });
            const r = k(
              {},
              window.history.state || {},
              { url: e, random: Math.random(), source: "swup" },
              t
            );
            window.history.replaceState(r, "", e);
          },
          A = (e, t, r, n) => {
            const i = new AbortController();
            return (
              (n = k({}, n, { signal: i.signal })),
              w(e, t, r, n),
              { destroy: () => i.abort() }
            );
          };
        class I extends URL {
          constructor(e, t = document.baseURI) {
            super(e.toString(), t), Object.setPrototypeOf(this, I.prototype);
          }
          get url() {
            return this.pathname + this.search;
          }
          static fromElement(e) {
            const t =
              e.getAttribute("href") || e.getAttribute("xlink:href") || "";
            return new I(t);
          }
          static fromUrl(e) {
            return new I(e);
          }
        }
        const L = (e, t) => {
          try {
            return _(e, t);
          } catch (t) {
            throw new Error(
              `[swup] Error parsing path "${String(e)}":\n${String(t)}`
            );
          }
        };
        class R extends Error {
          constructor(e, t) {
            super(e),
              (this.url = void 0),
              (this.status = void 0),
              (this.aborted = void 0),
              (this.timedOut = void 0),
              (this.name = "FetchError"),
              (this.url = t.url),
              (this.status = t.status),
              (this.aborted = t.aborted || !1),
              (this.timedOut = t.timedOut || !1);
          }
        }
        async function z(e, t = {}) {
          var r;
          e = I.fromUrl(e).url;
          const { visit: n = this.visit } = t,
            i = k({}, this.options.requestHeaders, t.headers),
            s = null != (r = t.timeout) ? r : this.options.timeout,
            o = new AbortController(),
            { signal: a } = o;
          t = k({}, t, { headers: i, signal: a });
          let l,
            c = !1,
            u = null;
          s &&
            s > 0 &&
            (u = setTimeout(() => {
              (c = !0), o.abort("timeout");
            }, s));
          try {
            (l = await this.hooks.call(
              "fetch:request",
              n,
              { url: e, options: t },
              (e, { url: t, options: r }) => fetch(t, r)
            )),
              u && clearTimeout(u);
          } catch (t) {
            if (c)
              throw (
                (this.hooks.call("fetch:timeout", n, { url: e }),
                new R(`Request timed out: ${e}`, { url: e, timedOut: c }))
              );
            if ("AbortError" === (null == t ? void 0 : t.name) || a.aborted)
              throw new R(`Request aborted: ${e}`, { url: e, aborted: !0 });
            throw t;
          }
          const { status: d, url: h } = l,
            p = await l.text();
          if (500 === d)
            throw (
              (this.hooks.call("fetch:error", n, {
                status: d,
                response: l,
                url: h,
              }),
              new R(`Server error: ${h}`, { status: d, url: h }))
            );
          if (!p) throw new R(`Empty response: ${h}`, { status: d, url: h });
          const { url: f } = I.fromUrl(h),
            m = { url: f, html: p };
          return (
            !n.cache.write ||
              (t.method && "GET" !== t.method) ||
              e !== f ||
              this.cache.set(m.url, m),
            m
          );
        }
        class D {
          constructor(e) {
            (this.swup = void 0), (this.pages = new Map()), (this.swup = e);
          }
          get size() {
            return this.pages.size;
          }
          get all() {
            const e = new Map();
            return (
              this.pages.forEach((t, r) => {
                e.set(r, k({}, t));
              }),
              e
            );
          }
          has(e) {
            return this.pages.has(this.resolve(e));
          }
          get(e) {
            const t = this.pages.get(this.resolve(e));
            return t ? k({}, t) : t;
          }
          set(e, t) {
            (t = k({}, t, { url: (e = this.resolve(e)) })),
              this.pages.set(e, t),
              this.swup.hooks.callSync("cache:set", void 0, { page: t });
          }
          update(e, t) {
            e = this.resolve(e);
            const r = k({}, this.get(e), t, { url: e });
            this.pages.set(e, r);
          }
          delete(e) {
            this.pages.delete(this.resolve(e));
          }
          clear() {
            this.pages.clear(),
              this.swup.hooks.callSync("cache:clear", void 0, void 0);
          }
          prune(e) {
            this.pages.forEach((t, r) => {
              e(r, t) && this.delete(r);
            });
          }
          resolve(e) {
            const { url: t } = I.fromUrl(e);
            return this.swup.resolveUrl(t);
          }
        }
        const F = (e, t = document) => t.querySelector(e),
          $ = (e, t = document) => Array.from(t.querySelectorAll(e)),
          N = () =>
            new Promise((e) => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  e();
                });
              });
            });
        function j(e) {
          return (
            !!e &&
            ("object" == typeof e || "function" == typeof e) &&
            "function" == typeof e.then
          );
        }
        function V(e, t = []) {
          return new Promise((r, n) => {
            const i = e(...t);
            j(i) ? i.then(r, n) : r(i);
          });
        }
        const B = (e) => (window.CSS && window.CSS.escape ? CSS.escape(e) : e),
          q = (e) => 1e3 * Number(e.slice(0, -1).replace(",", "."));
        class U {
          constructor(e) {
            (this.swup = void 0),
              (this.swupClasses = [
                "to-",
                "is-changing",
                "is-rendering",
                "is-popstate",
                "is-animating",
                "is-leaving",
              ]),
              (this.swup = e);
          }
          get selectors() {
            const { scope: e } = this.swup.visit.animation;
            return "containers" === e
              ? this.swup.visit.containers
              : "html" === e
              ? ["html"]
              : Array.isArray(e)
              ? e
              : [];
          }
          get selector() {
            return this.selectors.join(",");
          }
          get targets() {
            return this.selector.trim() ? $(this.selector) : [];
          }
          add(...e) {
            this.targets.forEach((t) => t.classList.add(...e));
          }
          remove(...e) {
            this.targets.forEach((t) => t.classList.remove(...e));
          }
          clear() {
            this.targets.forEach((e) => {
              const t = e.className.split(" ").filter((e) => this.isSwupClass(e));
              e.classList.remove(...t);
            });
          }
          isSwupClass(e) {
            return this.swupClasses.some((t) => e.startsWith(t));
          }
        }
        class H {
          constructor(e, t) {
            (this.id = void 0),
              (this.state = void 0),
              (this.from = void 0),
              (this.to = void 0),
              (this.containers = void 0),
              (this.animation = void 0),
              (this.trigger = void 0),
              (this.cache = void 0),
              (this.history = void 0),
              (this.scroll = void 0);
            const {
              to: r,
              from: n = e.currentPageUrl,
              hash: i,
              el: s,
              event: o,
            } = t;
            (this.id = Math.random()),
              (this.state = 1),
              (this.from = { url: n }),
              (this.to = { url: r, hash: i }),
              (this.containers = e.options.containers),
              (this.animation = {
                animate: !0,
                wait: !1,
                name: void 0,
                native: e.options.native,
                scope: e.options.animationScope,
                selector: e.options.animationSelector,
              }),
              (this.trigger = { el: s, event: o }),
              (this.cache = { read: e.options.cache, write: e.options.cache }),
              (this.history = {
                action: "push",
                popstate: !1,
                direction: void 0,
              }),
              (this.scroll = { reset: !0, target: void 0 });
          }
          advance(e) {
            this.state < e && (this.state = e);
          }
          abort() {
            this.state = 8;
          }
          get done() {
            return this.state >= 7;
          }
        }
        function W(e) {
          return new H(this, e);
        }
        class G {
          constructor(e) {
            (this.swup = void 0),
              (this.registry = new Map()),
              (this.hooks = [
                "animation:out:start",
                "animation:out:await",
                "animation:out:end",
                "animation:in:start",
                "animation:in:await",
                "animation:in:end",
                "animation:skip",
                "cache:clear",
                "cache:set",
                "content:replace",
                "content:scroll",
                "enable",
                "disable",
                "fetch:request",
                "fetch:error",
                "fetch:timeout",
                "history:popstate",
                "link:click",
                "link:self",
                "link:anchor",
                "link:newtab",
                "page:load",
                "page:view",
                "scroll:top",
                "scroll:anchor",
                "visit:start",
                "visit:transition",
                "visit:abort",
                "visit:end",
              ]),
              (this.swup = e),
              this.init();
          }
          init() {
            this.hooks.forEach((e) => this.create(e));
          }
          create(e) {
            this.registry.has(e) || this.registry.set(e, new Map());
          }
          exists(e) {
            return this.registry.has(e);
          }
          get(e) {
            const t = this.registry.get(e);
            if (t) return t;
            console.error(`Unknown hook '${e}'`);
          }
          clear() {
            this.registry.forEach((e) => e.clear());
          }
          on(e, t, r = {}) {
            const n = this.get(e);
            if (!n) return console.warn(`Hook '${e}' not found.`), () => {};
            const i = k({}, r, { id: n.size + 1, hook: e, handler: t });
            return n.set(t, i), () => this.off(e, t);
          }
          before(e, t, r = {}) {
            return this.on(e, t, k({}, r, { before: !0 }));
          }
          replace(e, t, r = {}) {
            return this.on(e, t, k({}, r, { replace: !0 }));
          }
          once(e, t, r = {}) {
            return this.on(e, t, k({}, r, { once: !0 }));
          }
          off(e, t) {
            const r = this.get(e);
            r && t
              ? r.delete(t) || console.warn(`Handler for hook '${e}' not found.`)
              : r && r.clear();
          }
          async call(e, t, r, n) {
            const [i, s, o] = this.parseCallArgs(e, t, r, n),
              { before: a, handler: l, after: c } = this.getHandlers(e, o);
            await this.run(a, i, s);
            const [u] = await this.run(l, i, s, !0);
            return await this.run(c, i, s), this.dispatchDomEvent(e, i, s), u;
          }
          callSync(e, t, r, n) {
            const [i, s, o] = this.parseCallArgs(e, t, r, n),
              { before: a, handler: l, after: c } = this.getHandlers(e, o);
            this.runSync(a, i, s);
            const [u] = this.runSync(l, i, s, !0);
            return this.runSync(c, i, s), this.dispatchDomEvent(e, i, s), u;
          }
          parseCallArgs(e, t, r, n) {
            return t instanceof H ||
              ("object" != typeof t && "function" != typeof r)
              ? [t, r, n]
              : [void 0, t, r];
          }
          async run(e, t = this.swup.visit, r, n = !1) {
            const i = [];
            for (const { hook: s, handler: o, defaultHandler: a, once: l } of e)
              if (null == t || !t.done) {
                l && this.off(s, o);
                try {
                  const e = await V(o, [t, r, a]);
                  i.push(e);
                } catch (e) {
                  if (n) throw e;
                  console.error(`Error in hook '${s}':`, e);
                }
              }
            return i;
          }
          runSync(e, t = this.swup.visit, r, n = !1) {
            const i = [];
            for (const { hook: s, handler: o, defaultHandler: a, once: l } of e)
              if (null == t || !t.done) {
                l && this.off(s, o);
                try {
                  const e = o(t, r, a);
                  i.push(e),
                    j(e) &&
                      console.warn(
                        `Swup will not await Promises in handler for synchronous hook '${s}'.`
                      );
                } catch (e) {
                  if (n) throw e;
                  console.error(`Error in hook '${s}':`, e);
                }
              }
            return i;
          }
          getHandlers(e, t) {
            const r = this.get(e);
            if (!r)
              return {
                found: !1,
                before: [],
                handler: [],
                after: [],
                replaced: !1,
              };
            const n = Array.from(r.values()),
              i = this.sortRegistrations,
              s = n.filter(({ before: e, replace: t }) => e && !t).sort(i),
              o = n
                .filter(({ replace: e }) => e)
                .filter((e) => !0)
                .sort(i),
              a = n.filter(({ before: e, replace: t }) => !e && !t).sort(i),
              l = o.length > 0;
            let c = [];
            if (t && ((c = [{ id: 0, hook: e, handler: t }]), l)) {
              const r = o.length - 1,
                n = (e) => {
                  const r = o[e - 1];
                  return r ? (t, i) => r.handler(t, i, n(e - 1)) : t;
                };
              c = [
                { id: 0, hook: e, handler: o[r].handler, defaultHandler: n(r) },
              ];
            }
            return { found: !0, before: s, handler: c, after: a, replaced: l };
          }
          sortRegistrations(e, t) {
            var r, n;
            return (
              (null != (r = e.priority) ? r : 0) -
                (null != (n = t.priority) ? n : 0) ||
              e.id - t.id ||
              0
            );
          }
          dispatchDomEvent(e, t, r) {
            if (null != t && t.done) return;
            const n = { hook: e, args: r, visit: t || this.swup.visit };
            document.dispatchEvent(
              new CustomEvent("swup:any", { detail: n, bubbles: !0 })
            ),
              document.dispatchEvent(
                new CustomEvent(`swup:${e}`, { detail: n, bubbles: !0 })
              );
          }
        }
        const Y = (e) => {
            if ((e && "#" === e.charAt(0) && (e = e.substring(1)), !e))
              return null;
            const t = decodeURIComponent(e);
            let r =
              document.getElementById(e) ||
              document.getElementById(t) ||
              F(`a[name='${B(e)}']`) ||
              F(`a[name='${B(t)}']`);
            return r || "top" !== e || (r = document.body), r;
          },
          X = "transition",
          K = "animation";
        async function Q({ elements: e, selector: t }) {
          if (!1 === t && !e) return;
          let r = [];
          if (e) r = Array.from(e);
          else if (t && ((r = $(t, document.body)), !r.length))
            return void console.warn(
              `[swup] No elements found matching animationSelector \`${t}\``
            );
          const n = r.map((e) =>
            (function (e) {
              const {
                type: t,
                timeout: r,
                propCount: n,
              } = (function (e, t) {
                const r = window.getComputedStyle(e),
                  n = Z(r, `${X}Delay`),
                  i = Z(r, `${X}Duration`),
                  s = J(n, i),
                  o = Z(r, `${K}Delay`),
                  a = Z(r, `${K}Duration`),
                  l = J(o, a);
                let c = null,
                  u = 0,
                  d = 0;
                return (
                  (u = Math.max(s, l)),
                  (c = u > 0 ? (s > l ? X : K) : null),
                  (d = c ? (c === X ? i.length : a.length) : 0),
                  { type: c, timeout: u, propCount: d }
                );
              })(e);
              return (
                !(!t || !r) &&
                new Promise((i) => {
                  const s = `${t}end`,
                    o = performance.now();
                  let a = 0;
                  const l = () => {
                      e.removeEventListener(s, c), i();
                    },
                    c = (t) => {
                      if (t.target === e) {
                        if (
                          !(function (e) {
                            return [`${X}end`, `${K}end`].includes(e.type);
                          })(t)
                        )
                          throw new Error("Not a transition or animation event.");
                        (performance.now() - o) / 1e3 < t.elapsedTime ||
                          (++a >= n && l());
                      }
                    };
                  setTimeout(() => {
                    a < n && l();
                  }, r + 1),
                    e.addEventListener(s, c);
                })
              );
            })(e)
          );
          n.filter(Boolean).length > 0
            ? await Promise.all(n)
            : t &&
              console.warn(
                `[swup] No CSS animation duration defined on elements matching \`${t}\``
              );
        }
        function Z(e, t) {
          return (e[t] || "").split(", ");
        }
        function J(e, t) {
          for (; e.length < t.length; ) e = e.concat(e);
          return Math.max(...t.map((t, r) => q(t) + q(e[r])));
        }
        function ee(e, t = {}, r = {}) {
          if ("string" != typeof e)
            throw new Error("swup.navigate() requires a URL parameter");
          if (this.shouldIgnoreVisit(e, { el: r.el, event: r.event }))
            return void window.location.assign(e);
          const { url: n, hash: i } = I.fromUrl(e),
            s = this.createVisit(k({}, r, { to: n, hash: i }));
          this.performNavigation(s, t);
        }
        async function te(e, t = {}) {
          if (this.navigating) {
            if (this.visit.state >= 6)
              return (
                (e.state = 2),
                void (this.onVisitEnd = () => this.performNavigation(e, t))
              );
            await this.hooks.call("visit:abort", this.visit, void 0),
              delete this.visit.to.document,
              (this.visit.state = 8);
          }
          (this.navigating = !0), (this.visit = e);
          const { el: r } = e.trigger;
          (t.referrer = t.referrer || this.currentPageUrl),
            !1 === t.animate && (e.animation.animate = !1),
            e.animation.animate || this.classes.clear();
          const n =
            t.history ||
            (null == r ? void 0 : r.getAttribute("data-swup-history")) ||
            void 0;
          n && ["push", "replace"].includes(n) && (e.history.action = n);
          const i =
            t.animation ||
            (null == r ? void 0 : r.getAttribute("data-swup-animation")) ||
            void 0;
          var s, o;
          i && (e.animation.name = i),
            "object" == typeof t.cache
              ? ((e.cache.read = null != (s = t.cache.read) ? s : e.cache.read),
                (e.cache.write = null != (o = t.cache.write) ? o : e.cache.write))
              : void 0 !== t.cache &&
                (e.cache = { read: !!t.cache, write: !!t.cache }),
            delete t.cache;
          try {
            await this.hooks.call("visit:start", e, void 0), (e.state = 3);
            const r = this.hooks.call(
              "page:load",
              e,
              { options: t },
              async (e, t) => {
                let r;
                return (
                  e.cache.read && (r = this.cache.get(e.to.url)),
                  (t.page = r || (await this.fetchPage(e.to.url, t.options))),
                  (t.cache = !!r),
                  t.page
                );
              }
            );
            if (
              (r.then(({ html: t }) => {
                e.advance(5),
                  (e.to.html = t),
                  (e.to.document = new DOMParser().parseFromString(
                    t,
                    "text/html"
                  ));
              }),
              !e.history.popstate)
            ) {
              const t = e.to.url + e.to.hash;
              "replace" === e.history.action || e.to.url === this.currentPageUrl
                ? C(t)
                : (this.currentHistoryIndex++,
                  O(t, { index: this.currentHistoryIndex }));
            }
            if (
              ((this.currentPageUrl = P()),
              e.history.popstate && this.classes.add("is-popstate"),
              e.animation.name && this.classes.add(`to-${M(e.animation.name)}`),
              e.animation.wait && (await r),
              e.done)
            )
              return;
            if (
              (await this.hooks.call("visit:transition", e, void 0, async () => {
                if (!e.animation.animate)
                  return (
                    await this.hooks.call("animation:skip", void 0),
                    void (await this.renderPage(e, await r))
                  );
                e.advance(4),
                  await this.animatePageOut(e),
                  e.animation.native && document.startViewTransition
                    ? await document.startViewTransition(
                        async () => await this.renderPage(e, await r)
                      ).finished
                    : await this.renderPage(e, await r),
                  await this.animatePageIn(e);
              }),
              e.done)
            )
              return;
            await this.hooks.call("visit:end", e, void 0, () =>
              this.classes.clear()
            ),
              (e.state = 7),
              (this.navigating = !1),
              this.onVisitEnd && (this.onVisitEnd(), (this.onVisitEnd = void 0));
          } catch (t) {
            if (!t || (null != t && t.aborted)) return void (e.state = 8);
            (e.state = 9),
              console.error(t),
              (this.options.skipPopStateHandling = () => (
                window.location.assign(e.to.url + e.to.hash), !0
              )),
              window.history.back();
          } finally {
            delete e.to.document;
          }
        }
        const re = async function (e) {
            await this.hooks.call("animation:out:start", e, void 0, () => {
              this.classes.add("is-changing", "is-animating", "is-leaving");
            }),
              await this.hooks.call(
                "animation:out:await",
                e,
                { skip: !1 },
                (e, { skip: t }) => {
                  if (!t)
                    return this.awaitAnimations({
                      selector: e.animation.selector,
                    });
                }
              ),
              await this.hooks.call("animation:out:end", e, void 0);
          },
          ne = function (e) {
            var t;
            const r = e.to.document;
            if (!r) return !1;
            const n =
              (null == (t = r.querySelector("title")) ? void 0 : t.innerText) ||
              "";
            document.title = n;
            const i = $('[data-swup-persist]:not([data-swup-persist=""])'),
              s = e.containers
                .map((e) => {
                  const t = document.querySelector(e),
                    n = r.querySelector(e);
                  return t && n
                    ? (t.replaceWith(n.cloneNode(!0)), !0)
                    : (t ||
                        console.warn(
                          `[swup] Container missing in current document: ${e}`
                        ),
                      n ||
                        console.warn(
                          `[swup] Container missing in incoming document: ${e}`
                        ),
                      !1);
                })
                .filter(Boolean);
            return (
              i.forEach((e) => {
                const t = e.getAttribute("data-swup-persist"),
                  r = F(`[data-swup-persist="${t}"]`);
                r && r !== e && r.replaceWith(e);
              }),
              s.length === e.containers.length
            );
          },
          ie = function (e) {
            const t = { behavior: "auto" },
              { target: r, reset: n } = e.scroll,
              i = null != r ? r : e.to.hash;
            let s = !1;
            return (
              i &&
                (s = this.hooks.callSync(
                  "scroll:anchor",
                  e,
                  { hash: i, options: t },
                  (e, { hash: t, options: r }) => {
                    const n = this.getAnchorElement(t);
                    return n && n.scrollIntoView(r), !!n;
                  }
                )),
              n &&
                !s &&
                (s = this.hooks.callSync(
                  "scroll:top",
                  e,
                  { options: t },
                  (e, { options: t }) => (
                    window.scrollTo(k({ top: 0, left: 0 }, t)), !0
                  )
                )),
              s
            );
          },
          se = async function (e) {
            if (e.done) return;
            const t = this.hooks.call(
              "animation:in:await",
              e,
              { skip: !1 },
              (e, { skip: t }) => {
                if (!t)
                  return this.awaitAnimations({ selector: e.animation.selector });
              }
            );
            await N(),
              await this.hooks.call("animation:in:start", e, void 0, () => {
                this.classes.remove("is-animating");
              }),
              await t,
              await this.hooks.call("animation:in:end", e, void 0);
          },
          oe = async function (e, t) {
            if (e.done) return;
            e.advance(6);
            const { url: r } = t;
            this.isSameResolvedUrl(P(), r) ||
              (C(r),
              (this.currentPageUrl = P()),
              (e.to.url = this.currentPageUrl)),
              await this.hooks.call(
                "content:replace",
                e,
                { page: t },
                (e, {}) => {
                  if (
                    (this.classes.remove("is-leaving"),
                    e.animation.animate && this.classes.add("is-rendering"),
                    !this.replaceContent(e))
                  )
                    throw new Error("[swup] Container mismatch, aborting");
                  e.animation.animate &&
                    (this.classes.add(
                      "is-changing",
                      "is-animating",
                      "is-rendering"
                    ),
                    e.animation.name &&
                      this.classes.add(`to-${M(e.animation.name)}`));
                }
              ),
              await this.hooks.call("content:scroll", e, void 0, () =>
                this.scrollToContent(e)
              ),
              await this.hooks.call("page:view", e, {
                url: this.currentPageUrl,
                title: document.title,
              });
          },
          ae = function (e) {
            var t;
            if (((t = e), Boolean(null == t ? void 0 : t.isSwupPlugin))) {
              if (
                ((e.swup = this), !e._checkRequirements || e._checkRequirements())
              )
                return (
                  e._beforeMount && e._beforeMount(),
                  e.mount(),
                  this.plugins.push(e),
                  this.plugins
                );
            } else console.error("Not a swup plugin instance", e);
          };
        function le(e) {
          const t = this.findPlugin(e);
          if (t)
            return (
              t.unmount(),
              t._afterUnmount && t._afterUnmount(),
              (this.plugins = this.plugins.filter((e) => e !== t)),
              this.plugins
            );
          console.error("No such plugin", t);
        }
        function ce(e) {
          return this.plugins.find(
            (t) => t === e || t.name === e || t.name === `Swup${String(e)}`
          );
        }
        function ue(e) {
          if ("function" != typeof this.options.resolveUrl)
            return (
              console.warn(
                "[swup] options.resolveUrl expects a callback function."
              ),
              e
            );
          const t = this.options.resolveUrl(e);
          return t && "string" == typeof t
            ? t.startsWith("//") || t.startsWith("http")
              ? (console.warn(
                  "[swup] options.resolveUrl needs to return a relative url"
                ),
                e)
              : t
            : (console.warn("[swup] options.resolveUrl needs to return a url"),
              e);
        }
        function de(e, t) {
          return this.resolveUrl(e) === this.resolveUrl(t);
        }
        const he = {
          animateHistoryBrowsing: !1,
          animationSelector: '[class*="transition-"]',
          animationScope: "html",
          cache: !0,
          containers: ["#swup"],
          ignoreVisit: (e, { el: t } = {}) =>
            !(null == t || !t.closest("[data-no-swup]")),
          linkSelector: "a[href]",
          linkToSelf: "scroll",
          native: !1,
          plugins: [],
          resolveUrl: (e) => e,
          requestHeaders: {
            "X-Requested-With": "swup",
            Accept: "text/html, application/xhtml+xml",
          },
          skipPopStateHandling: (e) => {
            var t;
            return "swup" !== (null == (t = e.state) ? void 0 : t.source);
          },
          timeout: 0,
        };
        class pe {
          constructor(e = {}) {
            var t, r;
            (this.version = "4.6.0"),
              (this.options = void 0),
              (this.defaults = he),
              (this.plugins = []),
              (this.visit = void 0),
              (this.cache = void 0),
              (this.hooks = void 0),
              (this.classes = void 0),
              (this.currentPageUrl = P()),
              (this.currentHistoryIndex = void 0),
              (this.clickDelegate = void 0),
              (this.navigating = !1),
              (this.onVisitEnd = void 0),
              (this.use = ae),
              (this.unuse = le),
              (this.findPlugin = ce),
              (this.log = () => {}),
              (this.navigate = ee),
              (this.performNavigation = te),
              (this.createVisit = W),
              (this.delegateEvent = A),
              (this.fetchPage = z),
              (this.awaitAnimations = Q),
              (this.renderPage = oe),
              (this.replaceContent = ne),
              (this.animatePageIn = se),
              (this.animatePageOut = re),
              (this.scrollToContent = ie),
              (this.getAnchorElement = Y),
              (this.getCurrentUrl = P),
              (this.resolveUrl = ue),
              (this.isSameResolvedUrl = de),
              (this.options = k({}, this.defaults, e)),
              (this.handleLinkClick = this.handleLinkClick.bind(this)),
              (this.handlePopState = this.handlePopState.bind(this)),
              (this.cache = new D(this)),
              (this.classes = new U(this)),
              (this.hooks = new G(this)),
              (this.visit = this.createVisit({ to: "" })),
              (this.currentHistoryIndex =
                null !=
                (t = null == (r = window.history.state) ? void 0 : r.index)
                  ? t
                  : 1),
              this.checkRequirements() && this.enable();
          }
          checkRequirements() {
            return (
              "undefined" != typeof Promise ||
              (console.warn("Promise is not supported"), !1)
            );
          }
          async enable() {
            var e;
            const { linkSelector: t } = this.options;
            (this.clickDelegate = this.delegateEvent(
              t,
              "click",
              this.handleLinkClick
            )),
              window.addEventListener("popstate", this.handlePopState),
              this.options.animateHistoryBrowsing &&
                (window.history.scrollRestoration = "manual"),
              (this.options.native =
                this.options.native && !!document.startViewTransition),
              this.options.plugins.forEach((e) => this.use(e)),
              "swup" !==
                (null == (e = window.history.state) ? void 0 : e.source) &&
                C(null, { index: this.currentHistoryIndex }),
              await N(),
              await this.hooks.call("enable", void 0, void 0, () => {
                const e = document.documentElement;
                e.classList.add("swup-enabled"),
                  e.classList.toggle("swup-native", this.options.native);
              });
          }
          async destroy() {
            this.clickDelegate.destroy(),
              window.removeEventListener("popstate", this.handlePopState),
              this.cache.clear(),
              this.options.plugins.forEach((e) => this.unuse(e)),
              await this.hooks.call("disable", void 0, void 0, () => {
                const e = document.documentElement;
                e.classList.remove("swup-enabled"),
                  e.classList.remove("swup-native");
              }),
              this.hooks.clear();
          }
          shouldIgnoreVisit(e, { el: t, event: r } = {}) {
            const { origin: n, url: i, hash: s } = I.fromUrl(e);
            return (
              n !== window.location.origin ||
              !(!t || !this.triggerWillOpenNewWindow(t)) ||
              !!this.options.ignoreVisit(i + s, { el: t, event: r })
            );
          }
          handleLinkClick(e) {
            const t = e.delegateTarget,
              { href: r, url: n, hash: i } = I.fromElement(t);
            if (this.shouldIgnoreVisit(r, { el: t, event: e })) return;
            if (this.navigating && n === this.visit.to.url)
              return void e.preventDefault();
            const s = this.createVisit({ to: n, hash: i, el: t, event: e });
            e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
              ? this.hooks.callSync("link:newtab", s, { href: r })
              : 0 === e.button &&
                this.hooks.callSync("link:click", s, { el: t, event: e }, () => {
                  var t;
                  const r = null != (t = s.from.url) ? t : "";
                  e.preventDefault(),
                    n && n !== r
                      ? this.isSameResolvedUrl(n, r) || this.performNavigation(s)
                      : i
                      ? this.hooks.callSync("link:anchor", s, { hash: i }, () => {
                          C(n + i), this.scrollToContent(s);
                        })
                      : this.hooks.callSync("link:self", s, void 0, () => {
                          "navigate" === this.options.linkToSelf
                            ? this.performNavigation(s)
                            : (C(n), this.scrollToContent(s));
                        });
                });
          }
          handlePopState(e) {
            var t, r, n, i;
            const s =
              null != (t = null == (r = e.state) ? void 0 : r.url)
                ? t
                : window.location.href;
            if (this.options.skipPopStateHandling(e)) return;
            if (this.isSameResolvedUrl(P(), this.currentPageUrl)) return;
            const { url: o, hash: a } = I.fromUrl(s),
              l = this.createVisit({ to: o, hash: a, event: e });
            l.history.popstate = !0;
            const c =
              null != (n = null == (i = e.state) ? void 0 : i.index) ? n : 0;
            c &&
              c !== this.currentHistoryIndex &&
              ((l.history.direction =
                c - this.currentHistoryIndex > 0 ? "forwards" : "backwards"),
              (this.currentHistoryIndex = c)),
              (l.animation.animate = !1),
              (l.scroll.reset = !1),
              (l.scroll.target = !1),
              this.options.animateHistoryBrowsing &&
                ((l.animation.animate = !0), (l.scroll.reset = !0)),
              this.hooks.callSync("history:popstate", l, { event: e }, () => {
                this.performNavigation(l);
              });
          }
          triggerWillOpenNewWindow(e) {
            return !!e.matches('[download], [target="_blank"]');
          }
        }
        function fe() {
          return (
            (fe = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                  }
                  return e;
                }),
            fe.apply(this, arguments)
          );
        }
        const me = (e) =>
          String(e)
            .split(".")
            .map((e) => String(parseInt(e || "0", 10)))
            .concat(["0", "0"])
            .slice(0, 3)
            .join(".");
        class ve {
          constructor() {
            (this.isSwupPlugin = !0),
              (this.swup = void 0),
              (this.version = void 0),
              (this.requires = {}),
              (this.handlersToUnregister = []);
          }
          mount() {}
          unmount() {
            this.handlersToUnregister.forEach((e) => e()),
              (this.handlersToUnregister = []);
          }
          _beforeMount() {
            if (!this.name)
              throw new Error(
                "You must define a name of plugin when creating a class."
              );
          }
          _afterUnmount() {}
          _checkRequirements() {
            return (
              "object" != typeof this.requires ||
                Object.entries(this.requires).forEach(([e, t]) => {
                  if (
                    !(function (e, t, r) {
                      const n = (function (e, t) {
                        var r;
                        if ("swup" === e) return null != (r = t.version) ? r : "";
                        {
                          var n;
                          const r = t.findPlugin(e);
                          return null != (n = null == r ? void 0 : r.version)
                            ? n
                            : "";
                        }
                      })(e, r);
                      return (
                        !!n &&
                        ((e, t) =>
                          t.every((t) => {
                            const [, r, n] = t.match(/^([\D]+)?(.*)$/) || [];
                            var i, s;
                            return ((e, t) => {
                              const r = {
                                "": (e) => 0 === e,
                                ">": (e) => e > 0,
                                ">=": (e) => e >= 0,
                                "<": (e) => e < 0,
                                "<=": (e) => e <= 0,
                              };
                              return (r[t] || r[""])(e);
                            })(
                              ((s = n),
                              (i = me((i = e))),
                              (s = me(s)),
                              i.localeCompare(s, void 0, { numeric: !0 })),
                              r || ">="
                            );
                          }))(n, t)
                      );
                    })(e, (t = Array.isArray(t) ? t : [t]), this.swup)
                  ) {
                    const r = `${e} ${t.join(", ")}`;
                    throw new Error(
                      `Plugin version mismatch: ${this.name} requires ${r}`
                    );
                  }
                }),
              !0
            );
          }
          on(e, t, r = {}) {
            var n;
            t =
              !(n = t).name.startsWith("bound ") || n.hasOwnProperty("prototype")
                ? t.bind(this)
                : t;
            const i = this.swup.hooks.on(e, t, r);
            return this.handlersToUnregister.push(i), i;
          }
          once(e, t, r = {}) {
            return this.on(e, t, fe({}, r, { once: !0 }));
          }
          before(e, t, r = {}) {
            return this.on(e, t, fe({}, r, { before: !0 }));
          }
          replace(e, t, r = {}) {
            return this.on(e, t, fe({}, r, { replace: !0 }));
          }
          off(e, t) {
            return this.swup.hooks.off(e, t);
          }
        }
        function ge() {
          return (
            (ge = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                  }
                  return e;
                }),
            ge.apply(this, arguments)
          );
        }
        window.process || (window.process = {}),
          window.process.env || (window.process.env = {});
        const ye = ["test"].includes(String("production")),
          we = ["development", "test"].includes(String("production")),
          be = (e, t, r) => (null == e ? e : `[${t}m${String(e)}[${r}m`),
          _e = (e) => (ye ? e : `🧩 ${((e) => be(e, 1, 22))(e)}`),
          Te = (e) => (ye ? e : ((e) => be(e, 94, 39))(e));
        class Ee {
          log(...e) {
            const t = e.shift();
            console.log(_e(t), ...e);
          }
          warn(...e) {
            const t = e.shift();
            console.warn(_e(t), ...e);
          }
          error(...e) {
            const t = e.shift();
            console.error(_e(t), ...e);
          }
          logIf(e, ...t) {
            e && this.log(...t);
          }
          warnIf(e, ...t) {
            e && this.warn(...t);
          }
          errorIf(e, ...t) {
            e && this.error(...t);
          }
        }
        const Se = (e) => {
            !(function ({ parsedRules: e, swup: t, logger: r }) {
              const n = t.getCurrentUrl();
              e.filter((e) => e.matchesFrom(n) || e.matchesTo(n)).forEach((e) => {
                e.containers.forEach((e) => {
                  const i = Ie(`${e}:not([data-swup-fragment])`, t);
                  if (!i) return;
                  const s = i.getAttribute("data-swup-fragment-url");
                  s &&
                    we &&
                    (null == r ||
                      r.log(
                        `fragment url ${Te(s)} for ${Te(e)} provided by server`
                      ));
                  const { url: o } = I.fromUrl(s || n);
                  i.setAttribute("data-swup-fragment", ""),
                    (i.__swupFragment = { url: o, selector: e });
                });
              });
            })(e),
              (function ({ logger: e, swup: t }) {
                const r = "data-swup-link-to-fragment";
                document.querySelectorAll(`a[${r}]`).forEach((n) => {
                  var i;
                  const s = n.getAttribute(r);
                  if (!s)
                    return void (
                      we &&
                      (null == e ||
                        e.warn(
                          `[${r}] needs to contain a valid fragment selector`
                        ))
                    );
                  const o = Ie(s, t);
                  if (!o)
                    return void (
                      we &&
                      (null == e ||
                        e.log(
                          `ignoring ${Te(`[${r}="${s}"]`)} as ${Te(s)} is missing`
                        ))
                    );
                  const a = null == (i = o.__swupFragment) ? void 0 : i.url;
                  a
                    ? ke(a, t.getCurrentUrl())
                      ? we &&
                        (null == e ||
                          e.warn(
                            `The fragment URL of ${s} is identical to the current URL. This could mean that [data-swup-fragment-url] needs to be provided by the server.`
                          ))
                      : (n.href = a)
                    : we &&
                      (null == e || e.warn(`no fragment infos found on ${s}`));
                });
              })(e),
              (function ({ logger: e }) {
                document
                  .querySelectorAll("dialog[data-swup-fragment]")
                  .forEach((t) => {
                    t.__swupFragment
                      ? t.__swupFragment.modalShown ||
                        ((t.__swupFragment.modalShown = !0),
                        t.removeAttribute("open"),
                        null == t.showModal || t.showModal(),
                        t.addEventListener(
                          "keydown",
                          (e) => "Escape" === e.key && e.preventDefault()
                        ))
                      : we &&
                        (null == e ||
                          e.warn("fragment properties missing on element:", t));
                  });
              })(e);
          },
          xe = (e, t) => {
            var r;
            const n = null == (r = e.__swupFragment) ? void 0 : r.url;
            return !!n && ke(n, t);
          },
          ke = (e, t) => Me(e) === Me(t),
          Me = (e) => {
            if (!e.trim()) return e;
            const t = I.fromUrl(e);
            return (
              t.searchParams.sort(), t.pathname.replace(/\/+$/g, "") + t.search
            );
          },
          Pe = (e) => {
            const t = e.from.url,
              r = e.to.url;
            if (t && r) return { from: t, to: r };
          },
          Oe = (e, t) => {
            if (null == e || !e.name) return;
            const { name: r, containers: n } = e;
            n.forEach((e) => {
              var n;
              null == (n = document.querySelector(e)) ||
                n.classList.toggle(`to-${r}`, t);
            });
          },
          Ce = (e, t) => t.find((t) => t.matches(e));
        function Ae(e) {
          return (
            !!e &&
            e.containers.every((e) => {
              var t;
              return (
                "template" ===
                (null == (t = document.querySelector(e)) ||
                null == (t = t.tagName)
                  ? void 0
                  : t.toLowerCase())
              );
            })
          );
        }
        function Ie(e, t) {
          for (const r of t.options.containers) {
            const t = document.querySelector(r);
            if (null != t && t.matches(e)) return t;
            const n = null == t ? void 0 : t.querySelector(e);
            if (n) return n;
          }
        }
        function Le(e) {
          if (!Array.isArray(e))
            throw new Error("cloneRules() expects an array of rules");
          return e.map((e) =>
            ge({}, e, {
              from: Array.isArray(e.from) ? [...e.from] : e.from,
              to: Array.isArray(e.to) ? [...e.to] : e.to,
              containers: [...e.containers],
            })
          );
        }
        class Re {
          constructor(e) {
            var t, r;
            (this.matchesFrom = void 0),
              (this.matchesTo = void 0),
              (this.swup = void 0),
              (this.from = void 0),
              (this.to = void 0),
              (this.containers = void 0),
              (this.name = void 0),
              (this.scroll = !1),
              (this.focus = void 0),
              (this.logger = void 0),
              (this.swup = e.swup),
              (this.logger = e.logger),
              (this.from = e.from || ""),
              (this.to = e.to || ""),
              e.name && (this.name = M(e.name)),
              void 0 !== e.scroll && (this.scroll = e.scroll),
              void 0 !== e.focus && (this.focus = e.focus),
              (this.containers = this.parseContainers(e.containers)),
              we &&
                (null == (t = this.logger) ||
                  t.errorIf(
                    !this.to,
                    "Every fragment rule must contain a 'to' path",
                    this
                  ),
                null == (r = this.logger) ||
                  r.errorIf(
                    !this.from,
                    "Every fragment rule must contain a 'from' path",
                    this
                  )),
              (this.matchesFrom = L(this.from)),
              (this.matchesTo = L(this.to));
          }
          parseContainers(e) {
            var t, r;
            return Array.isArray(e) && e.length
              ? ((r = e.map((e) => e.trim())), [...new Set(r)]).filter((e) => {
                  var t;
                  const r = this.validateSelector(e);
                  return (
                    null == (t = this.logger) || t.errorIf(r instanceof Error, r),
                    !0 === r
                  );
                })
              : (we &&
                  (null == (t = this.logger) ||
                    t.error(
                      "Every fragment rule must contain an array of containers",
                      this.getDebugInfo()
                    )),
                []);
          }
          validateSelector(e) {
            return e.startsWith("#")
              ? !e.match(/\s|>/) ||
                  new Error(`fragment selectors must not be nested: ${e}`)
              : new Error(`fragment selectors must be IDs: ${e}`);
          }
          getDebugInfo() {
            const { from: e, to: t, containers: r } = this;
            return { from: String(e), to: String(t), containers: String(r) };
          }
          matches(e) {
            const { url: t } = I.fromUrl(e.from),
              { url: r } = I.fromUrl(e.to);
            if (!this.matchesFrom(t) || !this.matchesTo(r)) return !1;
            for (const e of this.containers) {
              const t = this.validateFragmentSelectorForMatch(e);
              var n;
              if (t instanceof Error)
                return (
                  we &&
                    (null == (n = this.logger) ||
                      n.error(t, this.getDebugInfo())),
                  !1
                );
            }
            return !0;
          }
          validateFragmentSelectorForMatch(e) {
            return document.querySelector(e)
              ? !!Ie(e, this.swup) ||
                  new Error(
                    `skipping rule since ${Te(
                      e
                    )} is outside of swup's default containers`
                  )
              : new Error(
                  `skipping rule since ${Te(
                    e
                  )} doesn't exist in the current document`
                );
          }
        }
        const ze = function (e) {
            const t = Pe(e);
            t && Ce(t, this.parsedRules) && (e.scroll.reset = !1);
          },
          De = async function (e) {
            const t = Pe(e);
            if (!t) return;
            const r = this.getFragmentVisit(t);
            if (!r) return;
            var n;
            (e.fragmentVisit = r),
              we &&
                (null == (n = this.logger) ||
                  n.log(
                    `fragment visit: ${Te(e.fragmentVisit.containers.join(", "))}`
                  )),
              (e.scroll = (function (e, t) {
                return "boolean" == typeof e.scroll
                  ? ge({}, t, { reset: e.scroll })
                  : "string" != typeof e.scroll || t.target
                  ? t
                  : ge({}, t, { target: e.scroll });
              })(r, e.scroll));
            const i = e.a11y;
            var s;
            void 0 !== r.focus &&
              (we &&
                (null == (s = this.logger) ||
                  s.errorIf(
                    !i,
                    "Can't set visit.a11y.focus. Is @swup/a11y-plugin installed?"
                  )),
              i && (i.focus = r.focus)),
              (e.animation.scope = e.fragmentVisit.containers),
              (e.containers = e.fragmentVisit.containers),
              (e.animation.selector = e.fragmentVisit.containers.join(",")),
              Oe(r, !0);
          },
          Fe = function (e, t) {
            var r, n;
            e.fragmentVisit &&
              Ae(e.fragmentVisit) &&
              (we &&
                (null == (r = this.logger) ||
                  r.log(
                    `${Te("out")}-animation skipped for ${Te(
                      null == (n = e.fragmentVisit)
                        ? void 0
                        : n.containers.toString()
                    )}`
                  )),
              (t.skip = !0));
          },
          $e = function (e, t) {
            var r, n;
            e.fragmentVisit &&
              Ae(e.fragmentVisit) &&
              (we &&
                (null == (r = this.logger) ||
                  r.log(
                    `${Te("in")}-animation skipped for ${Te(
                      null == (n = e.fragmentVisit)
                        ? void 0
                        : n.containers.toString()
                    )}`
                  )),
              (t.skip = !0));
          },
          Ne = function (e, t) {
            var r;
            if (e.trigger.el || !e.to.url) return;
            const n = this.swup.cache.get(e.to.url);
            n &&
              n.fragmentHtml &&
              ((t.page.html = n.fragmentHtml),
              we &&
                (null == (r = this.logger) ||
                  r.log(`fragment cache used for ${Te(e.to.url)}`)));
          },
          je = function (e) {
            Oe(e.fragmentVisit, !0),
              Se(this),
              (({ swup: e, logger: t }) => {
                const r = e.getCurrentUrl(),
                  n = e.cache,
                  i = n.get(r);
                if (!i) return;
                const s = new DOMParser().parseFromString(i.html, "text/html"),
                  o = [],
                  a = Array.from(
                    document.querySelectorAll("[data-swup-fragment]")
                  ).filter((e) => !e.matches("template") && !xe(e, r));
                a.length &&
                  (e.options.cache
                    ? (a.forEach((e) => {
                        var r, i;
                        if (null != e.querySelector("[data-swup-fragment]"))
                          return;
                        const a = null == (r = e.__swupFragment) ? void 0 : r.url;
                        if (!a)
                          return void (
                            we &&
                            (null == t || t.warn("no fragment url found:", e))
                          );
                        const l =
                          null == (i = e.__swupFragment) ? void 0 : i.selector;
                        if (!l)
                          return void (
                            we &&
                            (null == t ||
                              t.warn("no fragment selector found:", e))
                          );
                        const c = n.get(a);
                        if (!c) return;
                        const u = s.querySelector(l);
                        if (!u) return;
                        const d = new DOMParser()
                          .parseFromString(c.html, "text/html")
                          .querySelector(l);
                        d &&
                          (d.setAttribute("data-swup-fragment-url", a),
                          u.replaceWith(d),
                          o.push(e));
                      }),
                      o.length &&
                        (n.update(
                          r,
                          ge({}, i, { fragmentHtml: s.documentElement.outerHTML })
                        ),
                        o.forEach((e) => {
                          var r, n;
                          const i =
                              (null == (r = e.__swupFragment) ? void 0 : r.url) ||
                              "",
                            s =
                              (null == (n = e.__swupFragment)
                                ? void 0
                                : n.selector) || "";
                          we &&
                            (null == t ||
                              t.log(`updated cache with ${Te(s)} from ${Te(i)}`));
                        })))
                    : we &&
                      (null == t ||
                        t.warn(
                          "can't cache foreign fragment elements without swup's cache"
                        )));
              })(this);
          },
          Ve = function (e) {
            Oe(e.fragmentVisit, !1);
          };
        class Be extends ve {
          get parsedRules() {
            return this._parsedRules;
          }
          constructor(e) {
            super(),
              (this.name = "SwupFragmentPlugin"),
              (this.requires = { swup: ">=4" }),
              (this._rawRules = []),
              (this._parsedRules = []),
              (this.options = void 0),
              (this.defaults = { rules: [], debug: !1 }),
              (this.logger = void 0),
              (this.options = ge({}, this.defaults, e));
          }
          mount() {
            const e = this.swup;
            var t;
            this.setRules(this.options.rules),
              we && this.options.debug && (this.logger = new Ee()),
              this.before("link:self", ze),
              this.on("visit:start", De),
              this.before("animation:out:await", Fe),
              this.before("animation:in:await", $e),
              this.before("content:replace", Ne),
              this.on("content:replace", je),
              this.on("visit:end", Ve),
              we &&
                (null == (t = this.logger) ||
                  t.warnIf(
                    !e.options.cache,
                    "fragment caching will only work with swup's cache being active"
                  )),
              Se(this);
          }
          unmount() {
            super.unmount(),
              document.querySelectorAll("[data-swup-fragment]").forEach((e) => {
                e.removeAttribute("data-swup-fragment-url"),
                  delete e.__swupFragment;
              });
          }
          setRules(e) {
            var t;
            (this._rawRules = Le(e)),
              (this._parsedRules = e.map((e) => this.parseRule(e))),
              we &&
                (null == (t = this.logger) ||
                  t.log("Updated fragment rules", this.getRules()));
          }
          getRules() {
            return Le(this._rawRules);
          }
          prependRule(e) {
            this.setRules([e, ...this.getRules()]);
          }
          appendRule(e) {
            this.setRules([...this.getRules(), e]);
          }
          parseRule({
            from: e,
            to: t,
            containers: r,
            name: n,
            scroll: i,
            focus: s,
          }) {
            return new Re({
              from: e,
              to: t,
              containers: r,
              name: n,
              scroll: i,
              focus: s,
              logger: this.logger,
              swup: this.swup,
            });
          }
          getFragmentVisit(e) {
            const t = Ce(e, this.parsedRules);
            if (!t) return;
            const r = ((e, t, r, n) => {
              const i = ke(e.from, e.to);
              return t.filter((t) => {
                const s = document.querySelector(t);
                return s
                  ? Ie(t, r)
                    ? !(
                        !i &&
                        xe(s, e.to) &&
                        (we &&
                          (null == n ||
                            n.log(
                              `ignoring fragment ${Te(
                                t
                              )} as it already matches the current URL`
                            )),
                        1)
                      )
                    : (we &&
                        (null == n ||
                          n.error(
                            `${Te(t)} is outside of swup's default containers`
                          )),
                      !1)
                  : (we &&
                      (null == n ||
                        n.log(`${Te(t)} missing in current document`)),
                    !1);
              });
            })(e, t.containers, this.swup, this.logger);
            if (!r.length) return;
            const { name: n, scroll: i, focus: s } = t;
            return { containers: r, name: n, scroll: i, focus: s };
          }
        }
        function qe() {
          return (
            (qe = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                  }
                  return e;
                }),
            qe.apply(this, arguments)
          );
        }
        function Ue() {
          return window.matchMedia("(hover: hover)").matches;
        }
        function He(e) {
          return (
            !!e && (e instanceof HTMLAnchorElement || e instanceof SVGAElement)
          );
        }
        const We = window.requestIdleCallback || ((e) => setTimeout(e, 1)),
          Ge = ["preloadVisibleLinks"];
        class Ye extends ve {
          constructor(e = {}) {
            var t;
            super(),
              (t = this),
              (this.name = "SwupPreloadPlugin"),
              (this.requires = { swup: ">=4.5" }),
              (this.defaults = {
                throttle: 5,
                preloadInitialPage: !0,
                preloadHoveredLinks: !0,
                preloadVisibleLinks: {
                  enabled: !1,
                  threshold: 0.2,
                  delay: 500,
                  containers: ["body"],
                  ignore: () => !1,
                },
              }),
              (this.options = void 0),
              (this.queue = void 0),
              (this.preloadObserver = void 0),
              (this.preloadPromises = new Map()),
              (this.mouseEnterDelegate = void 0),
              (this.touchStartDelegate = void 0),
              (this.focusDelegate = void 0),
              (this.onPageLoad = (e, t, r) => {
                const { url: n } = e.to;
                return n && this.preloadPromises.has(n)
                  ? this.preloadPromises.get(n)
                  : r(e, t);
              }),
              (this.onMouseEnter = async function (e) {
                if (e.target !== e.delegateTarget) return;
                if (!Ue()) return;
                const r = e.delegateTarget;
                if (!He(r)) return;
                const { url: n, hash: i } = I.fromElement(r),
                  s = t.swup.createVisit({ to: n, hash: i, el: r, event: e });
                t.swup.hooks.callSync("link:hover", s, { el: r, event: e }),
                  t.preload(r, { priority: !0 });
              }),
              (this.onTouchStart = (e) => {
                if (Ue()) return;
                const t = e.delegateTarget;
                He(t) && this.preload(t, { priority: !0 });
              }),
              (this.onFocus = (e) => {
                const t = e.delegateTarget;
                He(t) && this.preload(t, { priority: !0 });
              });
            const { preloadVisibleLinks: r } = e,
              n = (function (e, t) {
                if (null == e) return {};
                var r,
                  n,
                  i = {},
                  s = Object.keys(e);
                for (n = 0; n < s.length; n++)
                  t.indexOf((r = s[n])) >= 0 || (i[r] = e[r]);
                return i;
              })(e, Ge);
            (this.options = qe({}, this.defaults, n)),
              "object" == typeof r
                ? (this.options.preloadVisibleLinks = qe(
                    {},
                    this.options.preloadVisibleLinks,
                    { enabled: !0 },
                    r
                  ))
                : (this.options.preloadVisibleLinks.enabled = Boolean(r)),
              (this.preload = this.preload.bind(this)),
              (this.queue = (function (e = 1) {
                const t = [],
                  r = [];
                let n = 0,
                  i = 0;
                function s() {
                  i < e &&
                    n > 0 &&
                    ((r.shift() || t.shift() || (() => {}))(), n--, i++);
                }
                return {
                  add: function (e, i = !1) {
                    if (e.__queued) {
                      if (!i) return;
                      {
                        const r = t.indexOf(e);
                        if (r >= 0) {
                          const e = t.splice(r, 1);
                          n -= e.length;
                        }
                      }
                    }
                    (e.__queued = !0), (i ? r : t).push(e), n++, n <= 1 && s();
                  },
                  next: function () {
                    i--, s();
                  },
                };
              })(this.options.throttle));
          }
          mount() {
            const e = this.swup;
            e.options.cache
              ? (e.hooks.create("page:preload"),
                e.hooks.create("link:hover"),
                (e.preload = this.preload),
                (e.preloadLinks = this.preloadLinks),
                this.replace("page:load", this.onPageLoad),
                this.preloadLinks(),
                this.on("page:view", () => this.preloadLinks()),
                this.options.preloadVisibleLinks.enabled &&
                  (this.preloadVisibleLinks(),
                  this.on("page:view", () => this.preloadVisibleLinks())),
                this.options.preloadHoveredLinks &&
                  this.preloadLinksOnAttention(),
                this.options.preloadInitialPage && this.preload(P()))
              : console.warn(
                  "SwupPreloadPlugin: swup cache needs to be enabled for preloading"
                );
          }
          unmount() {
            var e, t, r;
            (this.swup.preload = void 0),
              (this.swup.preloadLinks = void 0),
              this.preloadPromises.clear(),
              null == (e = this.mouseEnterDelegate) || e.destroy(),
              null == (t = this.touchStartDelegate) || t.destroy(),
              null == (r = this.focusDelegate) || r.destroy(),
              this.stopPreloadingVisibleLinks();
          }
          async preload(e, t = {}) {
            var r;
            let n, i;
            const s = null != (r = t.priority) && r;
            if (Array.isArray(e))
              return Promise.all(e.map((e) => this.preload(e)));
            if (He(e)) (i = e), ({ href: n } = I.fromElement(e));
            else {
              if ("string" != typeof e) return;
              n = e;
            }
            if (!n) return;
            if (this.preloadPromises.has(n)) return this.preloadPromises.get(n);
            if (!this.shouldPreload(n, { el: i })) return;
            const o = new Promise((e) => {
              this.queue.add(() => {
                this.performPreload(n)
                  .catch(() => {})
                  .then((t) => e(t))
                  .finally(() => {
                    this.queue.next(), this.preloadPromises.delete(n);
                  });
              }, s);
            });
            return this.preloadPromises.set(n, o), o;
          }
          preloadLinks() {
            We(() => {
              Array.from(
                document.querySelectorAll(
                  "a[data-swup-preload], [data-swup-preload-all] a"
                )
              ).forEach((e) => this.preload(e));
            });
          }
          preloadLinksOnAttention() {
            const { swup: e } = this,
              { linkSelector: t } = e.options,
              r = { passive: !0, capture: !0 };
            (this.mouseEnterDelegate = e.delegateEvent(
              t,
              "mouseenter",
              this.onMouseEnter,
              r
            )),
              (this.touchStartDelegate = e.delegateEvent(
                t,
                "touchstart",
                this.onTouchStart,
                r
              )),
              (this.focusDelegate = e.delegateEvent(t, "focus", this.onFocus, r));
          }
          preloadVisibleLinks() {
            if (this.preloadObserver) return void this.preloadObserver.update();
            const {
              threshold: e,
              delay: t,
              containers: r,
            } = this.options.preloadVisibleLinks;
            (this.preloadObserver = (function ({
              threshold: e,
              delay: t,
              containers: r,
              callback: n,
              filter: i,
            }) {
              const s = new Map(),
                o = new IntersectionObserver(
                  (e) => {
                    e.forEach((e) => {
                      e.isIntersecting ? a(e.target) : l(e.target);
                    });
                  },
                  { threshold: e }
                ),
                a = (e) => {
                  var r;
                  const { href: i } = I.fromElement(e),
                    a = null != (r = s.get(i)) ? r : new Set();
                  s.set(i, a),
                    a.add(e),
                    setTimeout(() => {
                      const t = s.get(i);
                      null != t && t.size && (n(e), o.unobserve(e), t.delete(e));
                    }, t);
                },
                l = (e) => {
                  var t;
                  const { href: r } = I.fromElement(e);
                  null == (t = s.get(r)) || t.delete(e);
                },
                c = () => {
                  We(() => {
                    const e = r.map((e) => `${e} a[*|href]`).join(", ");
                    Array.from(document.querySelectorAll(e))
                      .filter((e) => i(e))
                      .forEach((e) => o.observe(e));
                  });
                };
              return {
                start: () => c(),
                stop: () => o.disconnect(),
                update: () => (s.clear(), c()),
              };
            })({
              threshold: e,
              delay: t,
              containers: r,
              callback: (e) => this.preload(e),
              filter: (e) => {
                if (this.options.preloadVisibleLinks.ignore(e)) return !1;
                if (!e.matches(this.swup.options.linkSelector)) return !1;
                const { href: t } = I.fromElement(e);
                return this.shouldPreload(t, { el: e });
              },
            })),
              this.preloadObserver.start();
          }
          stopPreloadingVisibleLinks() {
            this.preloadObserver && this.preloadObserver.stop();
          }
          shouldPreload(e, { el: t } = {}) {
            const { url: r, href: n } = I.fromUrl(e);
            return !(
              !(function () {
                if (navigator.connection) {
                  var e;
                  if (navigator.connection.saveData) return !1;
                  if (
                    null != (e = navigator.connection.effectiveType) &&
                    e.endsWith("2g")
                  )
                    return !1;
                }
                return !0;
              })() ||
              this.swup.cache.has(r) ||
              this.preloadPromises.has(r) ||
              this.swup.shouldIgnoreVisit(n, { el: t }) ||
              (t && this.swup.resolveUrl(r) === this.swup.resolveUrl(P()))
            );
          }
          async performPreload(e) {
            var t = this;
            const { url: r } = I.fromUrl(e),
              n = this.swup.createVisit({ to: r }),
              i = await this.swup.hooks.call(
                "page:preload",
                n,
                { url: r },
                async function (r, n) {
                  return (
                    (n.page = await t.swup.fetchPage(e, { visit: r })), n.page
                  );
                }
              );
            return i;
          }
        }
        const Xe = document.documentElement,
          Ke = document.body;
        var Qe = class extends d {
          constructor(e) {
            super(e);
          }
          init() {
            this.setSizes();
            const e = new pe({
              animateHistoryBrowsing: !0,
              containers: ["[data-load-container]"],
              cache: !0,
              plugins: [
                new Ye(),
                new Be({
                  rules: [
                    {
                      from: ["/:page?"],
                      to: ["/agency"],
                      containers: ["#agency"],
                      name: "open-modal",
                    },
                    {
                      from: ["/:page?"],
                      to: ["/highlights"],
                      containers: ["#highlights"],
                      name: "open-modal",
                    },
                    {
                      from: ["/agency"],
                      to: ["/:page?"],
                      containers: ["#agency", "#scroll"],
                      name: "close-modal",
                    },
                    {
                      from: ["/highlights"],
                      to: ["/:page?"],
                      containers: ["#highlights", "#scroll"],
                      name: "close-modal",
                    },
                  ],
                }),
              ],
            });
            e.hooks.before("content:replace", async (e) => {
              for (let t of e.containers) {
                const e = this.el.querySelector(t);
                this.call("destroy", e, "app");
              }
            }),
              e.hooks.on("content:replace", (e) => {
                e.fragmentVisit &&
                  ("open-modal" == e.fragmentVisit.name
                    ? (Ke.classList.add("is-modal-active"),
                      setTimeout(() => {
                        this.call("update", null, "Scroll");
                      }, getComputedStyle(document.getElementById("agency")).getPropertyValue("--duration-in")))
                    : "close-modal" == e.fragmentVisit.name &&
                      Ke.classList.remove("is-modal-active"));
                for (let t of e.containers) {
                  const e = this.el.querySelector(t);
                  e.classList.add("transition-fade"),
                    this.call("update", e, "app");
                }
              });
          }
          setSizes() {
            window.innerHeight - document.documentElement.clientHeight > 0
              ? (Ke.classList.add("has-scrollbar-y"),
                document.documentElement.style.setProperty(
                  "--scrollbar",
                  window.innerHeight -
                    document.documentElement.clientHeight +
                    "px"
                ))
              : Ke.classList.remove("has-scrollbar-y"),
              document.documentElement.style.setProperty(
                "--app-availheight",
                `${window.screen.availHeight}px`
              ),
              document.documentElement.style.setProperty(
                "--app-height",
                `${window.innerHeight}px`
              ),
              document.documentElement.style.setProperty(
                "--app-height-negative",
                `-${window.innerHeight}px`
              ),
              window.addEventListener("resize", () => {
                window.isMobile ||
                  (document.documentElement.style.setProperty(
                    "--app-availheight",
                    `${window.screen.availHeight}px`
                  ),
                  document.documentElement.style.setProperty(
                    "--app-height",
                    `${window.innerHeight}px`
                  ),
                  document.documentElement.style.setProperty(
                    "--app-height-negative",
                    `-${window.innerHeight}px`
                  ));
              });
          }
        };
        const Ze = (e) => ({
            url: e.src,
            width: e.naturalWidth,
            height: e.naturalHeight,
            ratio: e.naturalWidth / e.naturalHeight,
          }),
          Je = [],
          et = async (e, t, r) => {
            let n = t || e.dataset.src,
              i = Je.find((e) => e.url === n);
            if (!i) {
              if (
                ((i = await ((e, t = {}) =>
                  new Promise((r, n) => {
                    const i = new Image();
                    t.crossOrigin && (i.crossOrigin = t.crossOrigin);
                    const s = () => {
                      r({ element: i, ...Ze(i) });
                    };
                    i.decode
                      ? ((i.src = e),
                        i
                          .decode()
                          .then(s)
                          .catch((e) => {
                            n(e);
                          }))
                      : ((i.onload = s),
                        (i.onerror = (e) => {
                          n(e);
                        }),
                        (i.src = e));
                  }))(n)),
                !i.url)
              )
                return;
              Je.push(i);
            }
            e.src !== n &&
              ("IMG" === e.tagName
                ? (e.src = i.url)
                : (e.style.backgroundImage = `url(${i.url})`),
              requestAnimationFrame(() => {
                let t = e.closest(".c-lazy");
                t &&
                  (t.classList.add("-lazy-loaded"),
                  (t.style.backgroundImage = "")),
                  e.classList.add("-lazy-loaded"),
                  r?.();
              }));
          };
        function tt() {
          return (
            (tt = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                  }
                  return e;
                }),
            tt.apply(this, arguments)
          );
        }
        function rt(e, t, r) {
          return Math.max(e, Math.min(t, r));
        }
        class nt {
          advance(e) {
            var t;
            if (!this.isRunning) return;
            let r = !1;
            if (this.lerp)
              (this.value =
                ((n = this.value),
                (i = this.to),
                (1 - (s = 1 - Math.exp(-60 * this.lerp * e))) * n + s * i)),
                Math.round(this.value) === this.to &&
                  ((this.value = this.to), (r = !0));
            else {
              this.currentTime += e;
              const t = rt(0, this.currentTime / this.duration, 1);
              r = t >= 1;
              const n = r ? 1 : this.easing(t);
              this.value = this.from + (this.to - this.from) * n;
            }
            var n, i, s;
            null == (t = this.onUpdate) || t.call(this, this.value, r),
              r && this.stop();
          }
          stop() {
            this.isRunning = !1;
          }
          fromTo(
            e,
            t,
            {
              lerp: r = 0.1,
              duration: n = 1,
              easing: i = (e) => e,
              onStart: s,
              onUpdate: o,
            }
          ) {
            (this.from = this.value = e),
              (this.to = t),
              (this.lerp = r),
              (this.duration = n),
              (this.easing = i),
              (this.currentTime = 0),
              (this.isRunning = !0),
              null == s || s(),
              (this.onUpdate = o);
          }
        }
        class it {
          constructor({ wrapper: e, content: t, autoResize: r = !0 } = {}) {
            if (
              ((this.resize = () => {
                this.onWrapperResize(), this.onContentResize();
              }),
              (this.onWrapperResize = () => {
                this.wrapper === window
                  ? ((this.width = window.innerWidth),
                    (this.height = window.innerHeight))
                  : ((this.width = this.wrapper.clientWidth),
                    (this.height = this.wrapper.clientHeight));
              }),
              (this.onContentResize = () => {
                (this.scrollHeight = this.content.scrollHeight),
                  (this.scrollWidth = this.content.scrollWidth);
              }),
              (this.wrapper = e),
              (this.content = t),
              r)
            ) {
              const e = (function (e, t) {
                let r;
                return function () {
                  let t = arguments,
                    n = this;
                  clearTimeout(r),
                    (r = setTimeout(function () {
                      e.apply(n, t);
                    }, 250));
                };
              })(this.resize);
              this.wrapper !== window &&
                ((this.wrapperResizeObserver = new ResizeObserver(e)),
                this.wrapperResizeObserver.observe(this.wrapper)),
                (this.contentResizeObserver = new ResizeObserver(e)),
                this.contentResizeObserver.observe(this.content);
            }
            this.resize();
          }
          destroy() {
            var e, t;
            null == (e = this.wrapperResizeObserver) || e.disconnect(),
              null == (t = this.contentResizeObserver) || t.disconnect();
          }
          get limit() {
            return {
              x: this.scrollWidth - this.width,
              y: this.scrollHeight - this.height,
            };
          }
        }
        class st {
          constructor() {
            this.events = {};
          }
          emit(e, ...t) {
            let r = this.events[e] || [];
            for (let e = 0, n = r.length; e < n; e++) r[e](...t);
          }
          on(e, t) {
            var r;
            return (
              (null == (r = this.events[e]) ? void 0 : r.push(t)) ||
                (this.events[e] = [t]),
              () => {
                var r;
                this.events[e] =
                  null == (r = this.events[e])
                    ? void 0
                    : r.filter((e) => t !== e);
              }
            );
          }
          off(e, t) {
            var r;
            this.events[e] =
              null == (r = this.events[e]) ? void 0 : r.filter((e) => t !== e);
          }
          destroy() {
            this.events = {};
          }
        }
        class ot {
          constructor(
            e,
            {
              wheelMultiplier: t = 1,
              touchMultiplier: r = 2,
              normalizeWheel: n = !1,
            }
          ) {
            (this.onTouchStart = (e) => {
              const { clientX: t, clientY: r } = e.targetTouches
                ? e.targetTouches[0]
                : e;
              (this.touchStart.x = t),
                (this.touchStart.y = r),
                (this.lastDelta = { x: 0, y: 0 });
            }),
              (this.onTouchMove = (e) => {
                const { clientX: t, clientY: r } = e.targetTouches
                    ? e.targetTouches[0]
                    : e,
                  n = -(t - this.touchStart.x) * this.touchMultiplier,
                  i = -(r - this.touchStart.y) * this.touchMultiplier;
                (this.touchStart.x = t),
                  (this.touchStart.y = r),
                  (this.lastDelta = { x: n, y: i }),
                  this.emitter.emit("scroll", { deltaX: n, deltaY: i, event: e });
              }),
              (this.onTouchEnd = (e) => {
                this.emitter.emit("scroll", {
                  deltaX: this.lastDelta.x,
                  deltaY: this.lastDelta.y,
                  event: e,
                });
              }),
              (this.onWheel = (e) => {
                let { deltaX: t, deltaY: r } = e;
                this.normalizeWheel &&
                  ((t = rt(-100, t, 100)), (r = rt(-100, r, 100))),
                  (t *= this.wheelMultiplier),
                  (r *= this.wheelMultiplier),
                  this.emitter.emit("scroll", { deltaX: t, deltaY: r, event: e });
              }),
              (this.element = e),
              (this.wheelMultiplier = t),
              (this.touchMultiplier = r),
              (this.normalizeWheel = n),
              (this.touchStart = { x: null, y: null }),
              (this.emitter = new st()),
              this.element.addEventListener("wheel", this.onWheel, {
                passive: !1,
              }),
              this.element.addEventListener("touchstart", this.onTouchStart, {
                passive: !1,
              }),
              this.element.addEventListener("touchmove", this.onTouchMove, {
                passive: !1,
              }),
              this.element.addEventListener("touchend", this.onTouchEnd, {
                passive: !1,
              });
          }
          on(e, t) {
            return this.emitter.on(e, t);
          }
          destroy() {
            this.emitter.destroy(),
              this.element.removeEventListener("wheel", this.onWheel, {
                passive: !1,
              }),
              this.element.removeEventListener("touchstart", this.onTouchStart, {
                passive: !1,
              }),
              this.element.removeEventListener("touchmove", this.onTouchMove, {
                passive: !1,
              }),
              this.element.removeEventListener("touchend", this.onTouchEnd, {
                passive: !1,
              });
          }
        }
        class at {
          constructor({
            wrapper: e = window,
            content: t = document.documentElement,
            wheelEventsTarget: r = e,
            eventsTarget: n = r,
            smoothWheel: i = !0,
            smoothTouch: s = !1,
            syncTouch: o = !1,
            syncTouchLerp: a = 0.1,
            __iosNoInertiaSyncTouchLerp: l = 0.4,
            touchInertiaMultiplier: c = 35,
            duration: u,
            easing: d = (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
            lerp: h = !u && 0.1,
            infinite: p = !1,
            orientation: f = "vertical",
            gestureOrientation: m = "vertical",
            touchMultiplier: v = 1,
            wheelMultiplier: g = 1,
            normalizeWheel: y = !1,
            autoResize: w = !0,
          } = {}) {
            (this.onVirtualScroll = ({ deltaX: e, deltaY: t, event: r }) => {
              if (r.ctrlKey) return;
              const n = r.type.includes("touch"),
                i = r.type.includes("wheel");
              if (
                ("both" === this.options.gestureOrientation &&
                  0 === e &&
                  0 === t) ||
                ("vertical" === this.options.gestureOrientation && 0 === t) ||
                ("horizontal" === this.options.gestureOrientation && 0 === e) ||
                (n &&
                  "vertical" === this.options.gestureOrientation &&
                  0 === this.scroll &&
                  !this.options.infinite &&
                  t <= 0)
              )
                return;
              let s = r.composedPath();
              if (
                ((s = s.slice(0, s.indexOf(this.rootElement))),
                s.find((e) => {
                  var t;
                  return (
                    (null == e.hasAttribute
                      ? void 0
                      : e.hasAttribute("data-lenis-prevent")) ||
                    (n &&
                      (null == e.hasAttribute
                        ? void 0
                        : e.hasAttribute("data-lenis-prevent-touch"))) ||
                    (i &&
                      (null == e.hasAttribute
                        ? void 0
                        : e.hasAttribute("data-lenis-prevent-wheel"))) ||
                    (null == (t = e.classList) ? void 0 : t.contains("lenis"))
                  );
                }))
              )
                return;
              if (this.isStopped || this.isLocked) return void r.preventDefault();
              if (
                ((this.isSmooth =
                  ((this.options.smoothTouch || this.options.syncTouch) && n) ||
                  (this.options.smoothWheel && i)),
                !this.isSmooth)
              )
                return (this.isScrolling = !1), void this.animate.stop();
              r.preventDefault();
              let o = t;
              "both" === this.options.gestureOrientation
                ? (o = Math.abs(t) > Math.abs(e) ? t : e)
                : "horizontal" === this.options.gestureOrientation && (o = e);
              const a = n && this.options.syncTouch,
                l = n && "touchend" === r.type && Math.abs(o) > 1;
              l && (o = this.velocity * this.options.touchInertiaMultiplier),
                this.scrollTo(
                  this.targetScroll + o,
                  tt(
                    { programmatic: !1 },
                    a && {
                      lerp: l
                        ? this.syncTouchLerp
                        : this.options.__iosNoInertiaSyncTouchLerp,
                    }
                  )
                );
            }),
              (this.onNativeScroll = () => {
                if (!this.__preventNextScrollEvent && !this.isScrolling) {
                  const e = this.animatedScroll;
                  (this.animatedScroll = this.targetScroll = this.actualScroll),
                    (this.velocity = 0),
                    (this.direction = Math.sign(this.animatedScroll - e)),
                    this.emit();
                }
              }),
              (window.lenisVersion = "1.0.29"),
              (e !== document.documentElement && e !== document.body) ||
                (e = window),
              (this.options = {
                wrapper: e,
                content: t,
                wheelEventsTarget: r,
                eventsTarget: n,
                smoothWheel: i,
                smoothTouch: s,
                syncTouch: o,
                syncTouchLerp: a,
                __iosNoInertiaSyncTouchLerp: l,
                touchInertiaMultiplier: c,
                duration: u,
                easing: d,
                lerp: h,
                infinite: p,
                gestureOrientation: m,
                orientation: f,
                touchMultiplier: v,
                wheelMultiplier: g,
                normalizeWheel: y,
                autoResize: w,
              }),
              (this.animate = new nt()),
              (this.emitter = new st()),
              (this.dimensions = new it({
                wrapper: e,
                content: t,
                autoResize: w,
              })),
              this.toggleClass("lenis", !0),
              (this.velocity = 0),
              (this.isLocked = !1),
              (this.isStopped = !1),
              (this.isSmooth = o || i || s),
              (this.isScrolling = !1),
              (this.targetScroll = this.animatedScroll = this.actualScroll),
              this.options.wrapper.addEventListener(
                "scroll",
                this.onNativeScroll,
                { passive: !1 }
              ),
              (this.virtualScroll = new ot(n, {
                touchMultiplier: v,
                wheelMultiplier: g,
                normalizeWheel: y,
              })),
              this.virtualScroll.on("scroll", this.onVirtualScroll);
          }
          destroy() {
            this.emitter.destroy(),
              this.options.wrapper.removeEventListener(
                "scroll",
                this.onNativeScroll,
                { passive: !1 }
              ),
              this.virtualScroll.destroy(),
              this.dimensions.destroy(),
              this.toggleClass("lenis", !1),
              this.toggleClass("lenis-smooth", !1),
              this.toggleClass("lenis-scrolling", !1),
              this.toggleClass("lenis-stopped", !1),
              this.toggleClass("lenis-locked", !1);
          }
          on(e, t) {
            return this.emitter.on(e, t);
          }
          off(e, t) {
            return this.emitter.off(e, t);
          }
          setScroll(e) {
            this.isHorizontal
              ? (this.rootElement.scrollLeft = e)
              : (this.rootElement.scrollTop = e);
          }
          resize() {
            this.dimensions.resize();
          }
          emit() {
            this.emitter.emit("scroll", this);
          }
          reset() {
            (this.isLocked = !1),
              (this.isScrolling = !1),
              (this.animatedScroll = this.targetScroll = this.actualScroll),
              (this.velocity = 0),
              this.animate.stop();
          }
          start() {
            (this.isStopped = !1), this.reset();
          }
          stop() {
            (this.isStopped = !0), this.animate.stop(), this.reset();
          }
          raf(e) {
            const t = e - (this.time || e);
            (this.time = e), this.animate.advance(0.001 * t);
          }
          scrollTo(
            e,
            {
              offset: t = 0,
              immediate: r = !1,
              lock: n = !1,
              duration: i = this.options.duration,
              easing: s = this.options.easing,
              lerp: o = !i && this.options.lerp,
              onComplete: a = null,
              force: l = !1,
              programmatic: c = !0,
            } = {}
          ) {
            if ((!this.isStopped && !this.isLocked) || l) {
              if (["top", "left", "start"].includes(e)) e = 0;
              else if (["bottom", "right", "end"].includes(e)) e = this.limit;
              else {
                var u;
                let r;
                if (
                  ("string" == typeof e
                    ? (r = document.querySelector(e))
                    : null != (u = e) && u.nodeType && (r = e),
                  r)
                ) {
                  if (this.options.wrapper !== window) {
                    const e = this.options.wrapper.getBoundingClientRect();
                    t -= this.isHorizontal ? e.left : e.top;
                  }
                  const n = r.getBoundingClientRect();
                  e = (this.isHorizontal ? n.left : n.top) + this.animatedScroll;
                }
              }
              if ("number" == typeof e) {
                if (
                  ((e += t),
                  (e = Math.round(e)),
                  this.options.infinite
                    ? c && (this.targetScroll = this.animatedScroll = this.scroll)
                    : (e = rt(0, e, this.limit)),
                  r)
                )
                  return (
                    (this.animatedScroll = this.targetScroll = e),
                    this.setScroll(this.scroll),
                    this.reset(),
                    void (null == a || a(this))
                  );
                if (!c) {
                  if (e === this.targetScroll) return;
                  this.targetScroll = e;
                }
                this.animate.fromTo(this.animatedScroll, e, {
                  duration: i,
                  easing: s,
                  lerp: o,
                  onStart: () => {
                    n && (this.isLocked = !0), (this.isScrolling = !0);
                  },
                  onUpdate: (e, t) => {
                    (this.isScrolling = !0),
                      (this.velocity = e - this.animatedScroll),
                      (this.direction = Math.sign(this.velocity)),
                      (this.animatedScroll = e),
                      this.setScroll(this.scroll),
                      c && (this.targetScroll = e),
                      t || this.emit(),
                      t &&
                        (this.reset(),
                        this.emit(),
                        null == a || a(this),
                        (this.__preventNextScrollEvent = !0),
                        requestAnimationFrame(() => {
                          delete this.__preventNextScrollEvent;
                        }));
                  },
                });
              }
            }
          }
          get rootElement() {
            return this.options.wrapper === window
              ? document.documentElement
              : this.options.wrapper;
          }
          get limit() {
            return this.dimensions.limit[this.isHorizontal ? "x" : "y"];
          }
          get isHorizontal() {
            return "horizontal" === this.options.orientation;
          }
          get actualScroll() {
            return this.isHorizontal
              ? this.rootElement.scrollLeft
              : this.rootElement.scrollTop;
          }
          get scroll() {
            return this.options.infinite
              ? ((this.animatedScroll % (e = this.limit)) + e) % e
              : this.animatedScroll;
            var e;
          }
          get progress() {
            return 0 === this.limit ? 1 : this.scroll / this.limit;
          }
          get isSmooth() {
            return this.__isSmooth;
          }
          set isSmooth(e) {
            this.__isSmooth !== e &&
              ((this.__isSmooth = e), this.toggleClass("lenis-smooth", e));
          }
          get isScrolling() {
            return this.__isScrolling;
          }
          set isScrolling(e) {
            this.__isScrolling !== e &&
              ((this.__isScrolling = e), this.toggleClass("lenis-scrolling", e));
          }
          get isStopped() {
            return this.__isStopped;
          }
          set isStopped(e) {
            this.__isStopped !== e &&
              ((this.__isStopped = e), this.toggleClass("lenis-stopped", e));
          }
          get isLocked() {
            return this.__isLocked;
          }
          set isLocked(e) {
            this.__isLocked !== e &&
              ((this.__isLocked = e), this.toggleClass("lenis-locked", e));
          }
          get className() {
            let e = "lenis";
            return (
              this.isStopped && (e += " lenis-stopped"),
              this.isLocked && (e += " lenis-locked"),
              this.isScrolling && (e += " lenis-scrolling"),
              this.isSmooth && (e += " lenis-smooth"),
              e
            );
          }
          toggleClass(e, t) {
            this.rootElement.classList.toggle(e, t),
              this.emitter.emit("className change", this);
          }
        }
        function lt() {
          return (
            (lt = Object.assign
              ? Object.assign.bind()
              : function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var r = arguments[t];
                    for (var n in r)
                      Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
                  }
                  return e;
                }),
            lt.apply(this, arguments)
          );
        }
        class ct {
          constructor({
            scrollElements: e,
            rootMargin: t = "-1px -1px -1px -1px",
            IORaf: r,
          }) {
            (this.scrollElements = void 0),
              (this.rootMargin = void 0),
              (this.IORaf = void 0),
              (this.observer = void 0),
              (this.scrollElements = e),
              (this.rootMargin = t),
              (this.IORaf = r),
              this._init();
          }
          _init() {
            this.observer = new IntersectionObserver(
              (e) => {
                e.forEach((e) => {
                  const t = this.scrollElements.find((t) => t.$el === e.target);
                  e.isIntersecting
                    ? (t && (t.isAlreadyIntersected = !0), this._setInview(e))
                    : t && t.isAlreadyIntersected && this._setOutOfView(e);
                });
              },
              { rootMargin: this.rootMargin }
            );
            for (const e of this.scrollElements) this.observe(e.$el);
          }
          destroy() {
            this.observer.disconnect();
          }
          observe(e) {
            e && this.observer.observe(e);
          }
          unobserve(e) {
            e && this.observer.unobserve(e);
          }
          _setInview(e) {
            const t = this.scrollElements.find((t) => t.$el === e.target);
            this.IORaf && (null == t || t.setInteractivityOn()),
              !this.IORaf && (null == t || t.setInview());
          }
          _setOutOfView(e) {
            const t = this.scrollElements.find((t) => t.$el === e.target);
            this.IORaf && (null == t || t.setInteractivityOff()),
              !this.IORaf && (null == t || t.setOutOfView()),
              (null != t && t.attributes.scrollRepeat) ||
                this.IORaf ||
                this.unobserve(e.target);
          }
        }
        function ut(e, t, r, n, i) {
          return r + (((i - e) / (t - e)) * (n - r) || 0);
        }
        function dt(e, t) {
          return e.reduce((e, r) => (Math.abs(r - t) < Math.abs(e - t) ? r : e));
        }
        class ht {
          constructor({
            $el: e,
            id: t,
            modularInstance: r,
            subscribeElementUpdateFn: n,
            unsubscribeElementUpdateFn: i,
            needRaf: s,
            scrollOrientation: o,
          }) {
            var a, l, c, u, d;
            (this.$el = void 0),
              (this.id = void 0),
              (this.needRaf = void 0),
              (this.attributes = void 0),
              (this.scrollOrientation = void 0),
              (this.isAlreadyIntersected = void 0),
              (this.intersection = void 0),
              (this.metrics = void 0),
              (this.currentScroll = void 0),
              (this.translateValue = void 0),
              (this.progress = void 0),
              (this.lastProgress = void 0),
              (this.modularInstance = void 0),
              (this.progressModularModules = void 0),
              (this.isInview = void 0),
              (this.isInteractive = void 0),
              (this.isInFold = void 0),
              (this.isFirstResize = void 0),
              (this.subscribeElementUpdateFn = void 0),
              (this.unsubscribeElementUpdateFn = void 0),
              (this.$el = e),
              (this.id = t),
              (this.needRaf = s),
              (this.scrollOrientation = o),
              (this.modularInstance = r),
              (this.subscribeElementUpdateFn = n),
              (this.unsubscribeElementUpdateFn = i),
              (this.attributes = {
                scrollClass:
                  null != (a = this.$el.dataset.scrollClass) ? a : "is-inview",
                scrollOffset:
                  null != (l = this.$el.dataset.scrollOffset) ? l : "0,0",
                scrollPosition:
                  null != (c = this.$el.dataset.scrollPosition) ? c : "start,end",
                scrollModuleProgress:
                  null != this.$el.dataset.scrollModuleProgress,
                scrollCssProgress: null != this.$el.dataset.scrollCssProgress,
                scrollEventProgress:
                  null != (u = this.$el.dataset.scrollEventProgress) ? u : null,
                scrollSpeed:
                  null != this.$el.dataset.scrollSpeed
                    ? parseFloat(this.$el.dataset.scrollSpeed)
                    : null,
                scrollRepeat: null != this.$el.dataset.scrollRepeat,
                scrollCall: null != (d = this.$el.dataset.scrollCall) ? d : null,
                scrollCallSelf: null != this.$el.dataset.scrollCallSelf,
                scrollIgnoreFold: null != this.$el.dataset.scrollIgnoreFold,
                scrollEnableTouchSpeed:
                  null != this.$el.dataset.scrollEnableTouchSpeed,
              }),
              (this.intersection = { start: 0, end: 0 }),
              (this.metrics = { offsetStart: 0, offsetEnd: 0, bcr: {} }),
              (this.currentScroll =
                "vertical" === this.scrollOrientation
                  ? window.scrollY
                  : window.scrollX),
              (this.translateValue = 0),
              (this.progress = 0),
              (this.lastProgress = null),
              (this.progressModularModules = []),
              (this.isInview = !1),
              (this.isInteractive = !1),
              (this.isAlreadyIntersected = !1),
              (this.isInFold = !1),
              (this.isFirstResize = !0),
              this._init();
          }
          _init() {
            this.needRaf &&
              (this.modularInstance &&
                this.attributes.scrollModuleProgress &&
                this._getProgressModularModules(),
              this._resize());
          }
          onResize({ currentScroll: e }) {
            (this.currentScroll = e), this._resize();
          }
          onRender({ currentScroll: e, smooth: t }) {
            const r =
              "vertical" === this.scrollOrientation
                ? window.innerHeight
                : window.innerWidth;
            if (
              ((this.currentScroll = e),
              this._computeProgress(),
              this.attributes.scrollSpeed && !isNaN(this.attributes.scrollSpeed))
            )
              if (this.attributes.scrollEnableTouchSpeed || t) {
                if (this.isInFold) {
                  const e = Math.max(0, this.progress);
                  this.translateValue = e * r * this.attributes.scrollSpeed * -1;
                } else {
                  const e = ut(0, 1, -1, 1, this.progress);
                  this.translateValue = e * r * this.attributes.scrollSpeed * -1;
                }
                this.$el.style.transform =
                  "vertical" === this.scrollOrientation
                    ? `translate3d(0, ${this.translateValue}px, 0)`
                    : `translate3d(${this.translateValue}px, 0, 0)`;
              } else
                this.translateValue &&
                  (this.$el.style.transform = "translate3d(0, 0, 0)"),
                  (this.translateValue = 0);
          }
          setInview() {
            if (this.isInview) return;
            (this.isInview = !0),
              this.$el.classList.add(this.attributes.scrollClass);
            const e = this._getScrollCallFrom();
            this.attributes.scrollCall && this._dispatchCall("enter", e);
          }
          setOutOfView() {
            if (!this.isInview || !this.attributes.scrollRepeat) return;
            (this.isInview = !1),
              this.$el.classList.remove(this.attributes.scrollClass);
            const e = this._getScrollCallFrom();
            this.attributes.scrollCall && this._dispatchCall("leave", e);
          }
          setInteractivityOn() {
            this.isInteractive ||
              ((this.isInteractive = !0), this.subscribeElementUpdateFn(this));
          }
          setInteractivityOff() {
            this.isInteractive &&
              ((this.isInteractive = !1),
              this.unsubscribeElementUpdateFn(this),
              null != this.lastProgress &&
                this._computeProgress(dt([0, 1], this.lastProgress)));
          }
          _resize() {
            (this.metrics.bcr = this.$el.getBoundingClientRect()),
              this._computeMetrics(),
              this._computeIntersection(),
              this.isFirstResize &&
                ((this.isFirstResize = !1), this.isInFold && this.setInview());
          }
          _computeMetrics() {
            const { top: e, left: t, height: r, width: n } = this.metrics.bcr,
              i =
                "vertical" === this.scrollOrientation
                  ? window.innerHeight
                  : window.innerWidth,
              s = "vertical" === this.scrollOrientation ? r : n;
            (this.metrics.offsetStart =
              this.currentScroll +
              ("vertical" === this.scrollOrientation ? e : t) -
              this.translateValue),
              (this.metrics.offsetEnd = this.metrics.offsetStart + s),
              (this.isInFold =
                this.metrics.offsetStart < i &&
                !this.attributes.scrollIgnoreFold);
          }
          _computeIntersection() {
            const e =
                "vertical" === this.scrollOrientation
                  ? window.innerHeight
                  : window.innerWidth,
              t =
                "vertical" === this.scrollOrientation
                  ? this.metrics.bcr.height
                  : this.metrics.bcr.width,
              r = this.attributes.scrollOffset.split(","),
              n = null != r[0] ? r[0].trim() : "0",
              i = null != r[1] ? r[1].trim() : "0",
              s = this.attributes.scrollPosition.split(",");
            let o = null != s[0] ? s[0].trim() : "start";
            const a = null != s[1] ? s[1].trim() : "end",
              l = n.includes("%")
                ? e * parseInt(n.replace("%", "").trim()) * 0.01
                : parseInt(n),
              c = i.includes("%")
                ? e * parseInt(i.replace("%", "").trim()) * 0.01
                : parseInt(i);
            switch ((this.isInFold && (o = "fold"), o)) {
              case "start":
              default:
                this.intersection.start = this.metrics.offsetStart - e + l;
                break;
              case "middle":
                this.intersection.start =
                  this.metrics.offsetStart - e + l + 0.5 * t;
                break;
              case "end":
                this.intersection.start = this.metrics.offsetStart - e + l + t;
                break;
              case "fold":
                this.intersection.start = 0;
            }
            switch (a) {
              case "start":
                this.intersection.end = this.metrics.offsetStart - c;
                break;
              case "middle":
                this.intersection.end = this.metrics.offsetStart - c + 0.5 * t;
                break;
              default:
                this.intersection.end = this.metrics.offsetStart - c + t;
            }
            if (this.intersection.end <= this.intersection.start)
              switch (a) {
                case "start":
                default:
                  this.intersection.end = this.intersection.start + 1;
                  break;
                case "middle":
                  this.intersection.end = this.intersection.start + 0.5 * t;
                  break;
                case "end":
                  this.intersection.end = this.intersection.start + t;
              }
          }
          _computeProgress(e) {
            const t =
              null != e
                ? e
                : (r = ut(
                    this.intersection.start,
                    this.intersection.end,
                    0,
                    1,
                    this.currentScroll
                  )) < 0
                ? 0
                : r > 1
                ? 1
                : r;
            var r;
            if (((this.progress = t), t != this.lastProgress)) {
              if (
                ((this.lastProgress = t),
                this.attributes.scrollCssProgress && this._setCssProgress(t),
                this.attributes.scrollEventProgress &&
                  this._setCustomEventProgress(t),
                this.attributes.scrollModuleProgress)
              )
                for (const e of this.progressModularModules)
                  this.modularInstance &&
                    this.modularInstance.call(
                      "onScrollProgress",
                      t,
                      e.moduleName,
                      e.moduleId
                    );
              t > 0 && t < 1 && this.setInview(),
                0 === t && this.setOutOfView(),
                1 === t && this.setOutOfView();
            }
          }
          _setCssProgress(e = 0) {
            this.$el.style.setProperty("--progress", e.toString());
          }
          _setCustomEventProgress(e = 0) {
            const t = this.attributes.scrollEventProgress;
            if (!t) return;
            const r = new CustomEvent(t, {
              detail: { target: this.$el, progress: e },
            });
            window.dispatchEvent(r);
          }
          _getProgressModularModules() {
            if (!this.modularInstance) return;
            const e = Object.keys(this.$el.dataset).filter((e) =>
                e.includes("module")
              ),
              t = Object.entries(this.modularInstance.modules);
            if (e.length)
              for (const r of e) {
                const e = this.$el.dataset[r];
                if (!e) return;
                for (const r of t) {
                  const [t, n] = r;
                  e in n &&
                    this.progressModularModules.push({
                      moduleName: t,
                      moduleId: e,
                    });
                }
              }
          }
          _getScrollCallFrom() {
            const e = dt(
              [this.intersection.start, this.intersection.end],
              this.currentScroll
            );
            return this.intersection.start === e ? "start" : "end";
          }
          _dispatchCall(e, t) {
            var r, n;
            const i =
                null == (r = this.attributes.scrollCall) ? void 0 : r.split(","),
              s = null == (n = this.attributes) ? void 0 : n.scrollCallSelf;
            if (i && i.length > 1) {
              var o;
              const [r, n, a] = i;
              let l;
              (l = s ? this.$el.dataset[`module${n.trim()}`] : a),
                this.modularInstance &&
                  this.modularInstance.call(
                    r.trim(),
                    { target: this.$el, way: e, from: t },
                    n.trim(),
                    null == (o = l) ? void 0 : o.trim()
                  );
            } else if (i) {
              const [r] = i,
                n = new CustomEvent(r, {
                  detail: { target: this.$el, way: e, from: t },
                });
              window.dispatchEvent(n);
            }
          }
        }
        const pt = [
          "scrollOffset",
          "scrollPosition",
          "scrollModuleProgress",
          "scrollCssProgress",
          "scrollEventProgress",
          "scrollSpeed",
        ];
        class ft {
          constructor({
            $el: e,
            modularInstance: t,
            triggerRootMargin: r,
            rafRootMargin: n,
            scrollOrientation: i,
          }) {
            (this.$scrollContainer = void 0),
              (this.modularInstance = void 0),
              (this.triggerRootMargin = void 0),
              (this.rafRootMargin = void 0),
              (this.scrollElements = void 0),
              (this.triggeredScrollElements = void 0),
              (this.RAFScrollElements = void 0),
              (this.scrollElementsToUpdate = void 0),
              (this.IOTriggerInstance = void 0),
              (this.IORafInstance = void 0),
              (this.scrollOrientation = void 0),
              e
                ? ((this.$scrollContainer = e),
                  (this.modularInstance = t),
                  (this.scrollOrientation = i),
                  (this.triggerRootMargin =
                    null != r ? r : "-1px -1px -1px -1px"),
                  (this.rafRootMargin = null != n ? n : "100% 100% 100% 100%"),
                  (this.scrollElements = []),
                  (this.triggeredScrollElements = []),
                  (this.RAFScrollElements = []),
                  (this.scrollElementsToUpdate = []),
                  this._init())
                : console.error(
                    "Please provide a DOM Element as scrollContainer"
                  );
          }
          _init() {
            const e = this.$scrollContainer.querySelectorAll("[data-scroll]"),
              t = Array.from(e);
            this._subscribeScrollElements(t),
              (this.IOTriggerInstance = new ct({
                scrollElements: [...this.triggeredScrollElements],
                rootMargin: this.triggerRootMargin,
                IORaf: !1,
              })),
              (this.IORafInstance = new ct({
                scrollElements: [...this.RAFScrollElements],
                rootMargin: this.rafRootMargin,
                IORaf: !0,
              }));
          }
          destroy() {
            this.IOTriggerInstance.destroy(),
              this.IORafInstance.destroy(),
              this._unsubscribeAllScrollElements();
          }
          onResize({ currentScroll: e }) {
            for (const t of this.RAFScrollElements)
              t.onResize({ currentScroll: e });
          }
          onRender({ currentScroll: e, smooth: t }) {
            for (const r of this.scrollElementsToUpdate)
              r.onRender({ currentScroll: e, smooth: t });
          }
          removeScrollElements(e) {
            const t = e.querySelectorAll("[data-scroll]");
            if (t.length) {
              for (let e = 0; e < this.triggeredScrollElements.length; e++) {
                const r = this.triggeredScrollElements[e];
                Array.from(t).indexOf(r.$el) > -1 &&
                  (this.IOTriggerInstance.unobserve(r.$el),
                  this.triggeredScrollElements.splice(e, 1));
              }
              for (let e = 0; e < this.RAFScrollElements.length; e++) {
                const r = this.RAFScrollElements[e];
                Array.from(t).indexOf(r.$el) > -1 &&
                  (this.IORafInstance.unobserve(r.$el),
                  this.RAFScrollElements.splice(e, 1));
              }
              t.forEach((e) => {
                const t = this.scrollElementsToUpdate.find((t) => t.$el === e),
                  r = this.scrollElements.find((t) => t.$el === e);
                t && this._unsubscribeElementUpdate(t),
                  r &&
                    (this.scrollElements = this.scrollElements.filter(
                      (e) => e.id != r.id
                    ));
              });
            }
          }
          addScrollElements(e) {
            const t = e.querySelectorAll("[data-scroll]"),
              r = [];
            this.scrollElements.forEach((e) => {
              r.push(e.id);
            });
            const n = Math.max(...r) + 1,
              i = Array.from(t);
            this._subscribeScrollElements(i, n, !0);
          }
          _subscribeScrollElements(e, t = 0, r = !1) {
            for (let n = 0; n < e.length; n++) {
              const i = e[n],
                s = this._checkRafNeeded(i),
                o = new ht({
                  $el: i,
                  id: t + n,
                  scrollOrientation: this.scrollOrientation,
                  modularInstance: this.modularInstance,
                  subscribeElementUpdateFn:
                    this._subscribeElementUpdate.bind(this),
                  unsubscribeElementUpdateFn:
                    this._unsubscribeElementUpdate.bind(this),
                  needRaf: s,
                });
              this.scrollElements.push(o),
                s
                  ? (this.RAFScrollElements.push(o),
                    r &&
                      (this.IORafInstance.scrollElements.push(o),
                      this.IORafInstance.observe(o.$el)))
                  : (this.triggeredScrollElements.push(o),
                    r &&
                      (this.IOTriggerInstance.scrollElements.push(o),
                      this.IOTriggerInstance.observe(o.$el)));
            }
          }
          _unsubscribeAllScrollElements() {
            (this.scrollElements = []),
              (this.RAFScrollElements = []),
              (this.triggeredScrollElements = []),
              (this.scrollElementsToUpdate = []);
          }
          _subscribeElementUpdate(e) {
            this.scrollElementsToUpdate.push(e);
          }
          _unsubscribeElementUpdate(e) {
            this.scrollElementsToUpdate = this.scrollElementsToUpdate.filter(
              (t) => t.id != e.id
            );
          }
          _checkRafNeeded(e) {
            let t = [...pt];
            const r = (e) => {
              t = t.filter((t) => t != e);
            };
            if (e.dataset.scrollOffset) {
              if (
                "0,0" !=
                e.dataset.scrollOffset
                  .split(",")
                  .map((e) => e.replace("%", "").trim())
                  .join(",")
              )
                return !0;
              r("scrollOffset");
            } else r("scrollOffset");
            if (e.dataset.scrollPosition) {
              if ("top,bottom" != e.dataset.scrollPosition.trim()) return !0;
              r("scrollPosition");
            } else r("scrollPosition");
            if (
              e.dataset.scrollSpeed &&
              !isNaN(parseFloat(e.dataset.scrollSpeed))
            )
              return !0;
            r("scrollSpeed");
            for (const r of t) if (r in e.dataset) return !0;
            return !1;
          }
        }
        class mt {
          constructor({ resizeElements: e, resizeCallback: t = () => {} }) {
            (this.$resizeElements = void 0),
              (this.isFirstObserve = void 0),
              (this.observer = void 0),
              (this.resizeCallback = void 0),
              (this.$resizeElements = e),
              (this.resizeCallback = t),
              (this.isFirstObserve = !0),
              this._init();
          }
          _init() {
            this.observer = new ResizeObserver((e) => {
              var t;
              !this.isFirstObserve &&
                (null == (t = this.resizeCallback) || t.call(this)),
                (this.isFirstObserve = !1);
            });
            for (const e of this.$resizeElements) this.observer.observe(e);
          }
          destroy() {
            this.observer.disconnect();
          }
        }
        const vt = {
          wrapper: window,
          content: document.documentElement,
          eventsTarget: window,
          lerp: 0.1,
          duration: 0.75,
          orientation: "vertical",
          gestureOrientation: "vertical",
          smoothWheel: !0,
          smoothTouch: !1,
          syncTouch: !1,
          syncTouchLerp: 0.1,
          touchInertiaMultiplier: 35,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          normalizeWheel: !1,
          autoResize: !0,
          easing: (e) => Math.min(1, 1.001 - Math.pow(2, -10 * e)),
        };
        class gt {
          constructor({
            lenisOptions: e = {},
            modularInstance: t,
            triggerRootMargin: r,
            rafRootMargin: n,
            autoResize: i = !0,
            autoStart: s = !0,
            scrollCallback: o = () => {},
            initCustomTicker: a,
            destroyCustomTicker: l,
          } = {}) {
            (this.rafPlaying = void 0),
              (this.lenisInstance = void 0),
              (this.coreInstance = void 0),
              (this.lenisOptions = void 0),
              (this.modularInstance = void 0),
              (this.triggerRootMargin = void 0),
              (this.rafRootMargin = void 0),
              (this.rafInstance = void 0),
              (this.autoResize = void 0),
              (this.autoStart = void 0),
              (this.ROInstance = void 0),
              (this.initCustomTicker = void 0),
              (this.destroyCustomTicker = void 0),
              (this._onRenderBind = void 0),
              (this._onResizeBind = void 0),
              (this._onScrollToBind = void 0),
              (this.lenisOptions = lt({}, vt, e)),
              Object.assign(this, {
                lenisOptions: e,
                modularInstance: t,
                triggerRootMargin: r,
                rafRootMargin: n,
                autoResize: i,
                autoStart: s,
                scrollCallback: o,
                initCustomTicker: a,
                destroyCustomTicker: l,
              }),
              (this._onRenderBind = this._onRender.bind(this)),
              (this._onScrollToBind = this._onScrollTo.bind(this)),
              (this._onResizeBind = this._onResize.bind(this)),
              (this.rafPlaying = !1),
              this._init();
          }
          _init() {
            var e;
            (this.lenisInstance = new at({
              wrapper: this.lenisOptions.wrapper,
              content: this.lenisOptions.content,
              eventsTarget: this.lenisOptions.eventsTarget,
              lerp: this.lenisOptions.lerp,
              duration: this.lenisOptions.duration,
              orientation: this.lenisOptions.orientation,
              gestureOrientation: this.lenisOptions.gestureOrientation,
              smoothWheel: this.lenisOptions.smoothWheel,
              smoothTouch: this.lenisOptions.smoothTouch,
              syncTouch: this.lenisOptions.syncTouch,
              syncTouchLerp: this.lenisOptions.syncTouchLerp,
              touchInertiaMultiplier: this.lenisOptions.touchInertiaMultiplier,
              wheelMultiplier: this.lenisOptions.wheelMultiplier,
              touchMultiplier: this.lenisOptions.touchMultiplier,
              normalizeWheel: this.lenisOptions.normalizeWheel,
              easing: this.lenisOptions.easing,
            })),
              null == (e = this.lenisInstance) ||
                e.on("scroll", this.scrollCallback),
              document.documentElement.setAttribute(
                "data-scroll-orientation",
                this.lenisInstance.options.orientation
              ),
              requestAnimationFrame(() => {
                (this.coreInstance = new ft({
                  $el: this.lenisInstance.rootElement,
                  modularInstance: this.modularInstance,
                  triggerRootMargin: this.triggerRootMargin,
                  rafRootMargin: this.rafRootMargin,
                  scrollOrientation: this.lenisInstance.options.orientation,
                })),
                  this._bindEvents(),
                  this.initCustomTicker && !this.destroyCustomTicker
                    ? console.warn(
                        "initCustomTicker callback is declared, but destroyCustomTicker is not. Please pay attention. It could cause trouble."
                      )
                    : !this.initCustomTicker &&
                      this.destroyCustomTicker &&
                      console.warn(
                        "destroyCustomTicker callback is declared, but initCustomTicker is not. Please pay attention. It could cause trouble."
                      ),
                  this.autoStart && this.start();
              });
          }
          destroy() {
            var e;
            this.stop(),
              this._unbindEvents(),
              this.lenisInstance.destroy(),
              null == (e = this.coreInstance) || e.destroy(),
              requestAnimationFrame(() => {
                var e;
                null == (e = this.coreInstance) || e.destroy();
              });
          }
          _bindEvents() {
            this._bindScrollToEvents(),
              this.autoResize &&
                ("ResizeObserver" in window
                  ? (this.ROInstance = new mt({
                      resizeElements: [document.body],
                      resizeCallback: this._onResizeBind,
                    }))
                  : window.addEventListener("resize", this._onResizeBind));
          }
          _unbindEvents() {
            this._unbindScrollToEvents(),
              this.autoResize &&
                ("ResizeObserver" in window
                  ? this.ROInstance && this.ROInstance.destroy()
                  : window.removeEventListener("resize", this._onResizeBind));
          }
          _bindScrollToEvents(e) {
            const t = e || this.lenisInstance.rootElement,
              r = null == t ? void 0 : t.querySelectorAll("[data-scroll-to]");
            (null == r ? void 0 : r.length) &&
              r.forEach((e) => {
                e.addEventListener("click", this._onScrollToBind, !1);
              });
          }
          _unbindScrollToEvents(e) {
            const t = e || this.lenisInstance.rootElement,
              r = null == t ? void 0 : t.querySelectorAll("[data-scroll-to]");
            (null == r ? void 0 : r.length) &&
              r.forEach((e) => {
                e.removeEventListener("click", this._onScrollToBind, !1);
              });
          }
          _onResize() {
            requestAnimationFrame(() => {
              var e;
              null == (e = this.coreInstance) ||
                e.onResize({ currentScroll: this.lenisInstance.scroll });
            });
          }
          _onRender() {
            var e, t;
            null == (e = this.lenisInstance) || e.raf(Date.now()),
              null == (t = this.coreInstance) ||
                t.onRender({
                  currentScroll: this.lenisInstance.scroll,
                  smooth: this.lenisInstance.isSmooth,
                });
          }
          _onScrollTo(e) {
            var t;
            e.preventDefault();
            const r = null != (t = e.currentTarget) ? t : null;
            if (!r) return;
            const n =
                r.getAttribute("data-scroll-to-href") || r.getAttribute("href"),
              i = r.getAttribute("data-scroll-to-offset") || 0,
              s =
                r.getAttribute("data-scroll-to-duration") ||
                this.lenisOptions.duration ||
                vt.duration;
            n &&
              this.scrollTo(n, {
                offset: "string" == typeof i ? parseInt(i) : i,
                duration: "string" == typeof s ? parseInt(s) : s,
              });
          }
          start() {
            var e;
            this.rafPlaying ||
              (null == (e = this.lenisInstance) || e.start(),
              (this.rafPlaying = !0),
              this.initCustomTicker
                ? this.initCustomTicker(this._onRenderBind)
                : this._raf());
          }
          stop() {
            var e;
            this.rafPlaying &&
              (null == (e = this.lenisInstance) || e.stop(),
              (this.rafPlaying = !1),
              this.destroyCustomTicker
                ? this.destroyCustomTicker(this._onRenderBind)
                : this.rafInstance && cancelAnimationFrame(this.rafInstance));
          }
          removeScrollElements(e) {
            var t;
            e
              ? (this._unbindScrollToEvents(e),
                null == (t = this.coreInstance) || t.removeScrollElements(e))
              : console.error("Please provide a DOM Element as $oldContainer");
          }
          addScrollElements(e) {
            var t;
            e
              ? (null == (t = this.coreInstance) || t.addScrollElements(e),
                requestAnimationFrame(() => {
                  this._bindScrollToEvents(e);
                }))
              : console.error("Please provide a DOM Element as $newContainer");
          }
          resize() {
            this._onResizeBind();
          }
          scrollTo(e, t) {
            var r;
            null == (r = this.lenisInstance) ||
              r.scrollTo(e, {
                offset: null == t ? void 0 : t.offset,
                lerp: null == t ? void 0 : t.lerp,
                duration: null == t ? void 0 : t.duration,
                immediate: null == t ? void 0 : t.immediate,
                lock: null == t ? void 0 : t.lock,
                force: null == t ? void 0 : t.force,
                easing: null == t ? void 0 : t.easing,
                onComplete: null == t ? void 0 : t.onComplete,
              });
          }
          _raf() {
            this._onRenderBind(),
              (this.rafInstance = requestAnimationFrame(() => this._raf()));
          }
        }
        var yt = class extends d {
            constructor(e) {
              super(e),
                history.scrollRestoration &&
                  ((history.scrollRestoration = "manual"), window.scrollTo(0, 0)),
                (this.onResizeBind = this.onResize.bind(this)),
                (this.$el = this.el),
                (this.$name = this.el.closest("[data-scroll-parent]")),
                (this.$wrapper =
                  "string" == typeof this.getData("wrapper")
                    ? document.querySelector(this.getData("wrapper"))
                    : window),
                (this.$item = this.$("item"));
            }
            init(e) {
              document.querySelectorAll("[data-scroll-to]").forEach((e) => {
                const t = e.getAttribute("href");
                e.addEventListener("click", (e) => {
                  e.preventDefault(),
                    e.stopImmediatePropagation(),
                    e.stopPropagation(),
                    this.scrollTo({ target: t });
                });
              }),
                this.scrollInit(),
                this.bindEvents();
            }
            scrollInit(e) {
              this.locomotiveScroll = new gt({
                triggerRootMargin: "-1px -5% -1px -5%",
                modularInstance: this,
                scrollCallback: this.onScrollBind,
                lenisOptions: {
                  wrapper: this.el.parentNode,
                  content: this.el,
                  smoothWheel: !0,
                  smoothTouch: !0,
                  duration: 1.2,
                  lerp: 0.1,
                  wheelMultiplier: 0.7,
                  touchMultiplier: 1.7,
                  touchInertiaMultiplier: 12,
                },
              });
            }
            onResize() {
              this.locomotiveScroll?.resize();
            }
            onScroll({
              scroll: e,
              limit: t,
              velocity: r,
              direction: n,
              progress: i,
            }) {
              (window.locomotiveScrollData = {
                scroll: e,
                limit: t,
                velocity: r,
                direction: n,
                progress: i,
              }),
                e > 100 && Xe.classList.add("has-scrolled"),
                e < 100 && Xe.classList.remove("has-scrolled");
            }
            bindEvents() {
              window.addEventListener("resize", this.onResizeBind);
            }
            unbindEvents() {
              window.removeEventListener("resize", this.onResizeBind);
            }
            lazyLoad(e) {
              et(e.target);
            }
            removeScrollElements(e) {
              console.log(e), this.locomotiveScroll?.removeScrollElements(e);
            }
            addScrollElements(e) {
              this.locomotiveScroll?.addScrollElements(e);
            }
            stop() {
              this.locomotiveScroll?.stop();
            }
            start() {
              this.locomotiveScroll?.start();
            }
            update() {
              this.locomotiveScroll?.resize();
            }
            scrollTo(e) {
              const { target: t, options: r } = e;
              this.locomotiveScroll?.scrollTo(t, r);
            }
            destroy() {
              super.destroy(),
                this.locomotiveScroll?.destroy(),
                this.unbindEvents();
            }
          },
          wt = class extends d {
            constructor(e) {
              super(e), (this.events = {});
            }
            init() {}
          };
        function bt(e) {
          return (
            null !== e &&
            "object" == typeof e &&
            "constructor" in e &&
            e.constructor === Object
          );
        }
        function _t(e, t) {
          void 0 === e && (e = {}),
            void 0 === t && (t = {}),
            Object.keys(t).forEach((r) => {
              void 0 === e[r]
                ? (e[r] = t[r])
                : bt(t[r]) &&
                  bt(e[r]) &&
                  Object.keys(t[r]).length > 0 &&
                  _t(e[r], t[r]);
            });
        }
        const Tt = {
          body: {},
          addEventListener() {},
          removeEventListener() {},
          activeElement: { blur() {}, nodeName: "" },
          querySelector() {
            return null;
          },
          querySelectorAll() {
            return [];
          },
          getElementById() {
            return null;
          },
          createEvent() {
            return { initEvent() {} };
          },
          createElement() {
            return {
              children: [],
              childNodes: [],
              style: {},
              setAttribute() {},
              getElementsByTagName() {
                return [];
              },
            };
          },
          createElementNS() {
            return {};
          },
          importNode() {
            return null;
          },
          location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: "",
          },
        };
        function Et() {
          const e = "undefined" != typeof document ? document : {};
          return _t(e, Tt), e;
        }
        const St = {
          document: Tt,
          navigator: { userAgent: "" },
          location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: "",
          },
          history: { replaceState() {}, pushState() {}, go() {}, back() {} },
          CustomEvent: function () {
            return this;
          },
          addEventListener() {},
          removeEventListener() {},
          getComputedStyle() {
            return {
              getPropertyValue() {
                return "";
              },
            };
          },
          Image() {},
          Date() {},
          screen: {},
          setTimeout() {},
          clearTimeout() {},
          matchMedia() {
            return {};
          },
          requestAnimationFrame(e) {
            return "undefined" == typeof setTimeout
              ? (e(), null)
              : setTimeout(e, 0);
          },
          cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e);
          },
        };
        function xt() {
          const e = "undefined" != typeof window ? window : {};
          return _t(e, St), e;
        }
        function kt(e, t) {
          return void 0 === t && (t = 0), setTimeout(e, t);
        }
        function Mt() {
          return Date.now();
        }
        function Pt(e, t) {
          void 0 === t && (t = "x");
          const r = xt();
          let n, i, s;
          const o = (function (e) {
            const t = xt();
            let r;
            return (
              t.getComputedStyle && (r = t.getComputedStyle(e, null)),
              !r && e.currentStyle && (r = e.currentStyle),
              r || (r = e.style),
              r
            );
          })(e);
          return (
            r.WebKitCSSMatrix
              ? ((i = o.transform || o.webkitTransform),
                i.split(",").length > 6 &&
                  (i = i
                    .split(", ")
                    .map((e) => e.replace(",", "."))
                    .join(", ")),
                (s = new r.WebKitCSSMatrix("none" === i ? "" : i)))
              : ((s =
                  o.MozTransform ||
                  o.OTransform ||
                  o.MsTransform ||
                  o.msTransform ||
                  o.transform ||
                  o
                    .getPropertyValue("transform")
                    .replace("translate(", "matrix(1, 0, 0, 1,")),
                (n = s.toString().split(","))),
            "x" === t &&
              (i = r.WebKitCSSMatrix
                ? s.m41
                : 16 === n.length
                ? parseFloat(n[12])
                : parseFloat(n[4])),
            "y" === t &&
              (i = r.WebKitCSSMatrix
                ? s.m42
                : 16 === n.length
                ? parseFloat(n[13])
                : parseFloat(n[5])),
            i || 0
          );
        }
        function Ot(e) {
          return (
            "object" == typeof e &&
            null !== e &&
            e.constructor &&
            "Object" === Object.prototype.toString.call(e).slice(8, -1)
          );
        }
        function Ct() {
          const e = Object(arguments.length <= 0 ? void 0 : arguments[0]),
            t = ["__proto__", "constructor", "prototype"];
          for (let n = 1; n < arguments.length; n += 1) {
            const i = n < 0 || arguments.length <= n ? void 0 : arguments[n];
            if (
              null != i &&
              ((r = i),
              !("undefined" != typeof window && void 0 !== window.HTMLElement
                ? r instanceof HTMLElement
                : r && (1 === r.nodeType || 11 === r.nodeType)))
            ) {
              const r = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
              for (let t = 0, n = r.length; t < n; t += 1) {
                const n = r[t],
                  s = Object.getOwnPropertyDescriptor(i, n);
                void 0 !== s &&
                  s.enumerable &&
                  (Ot(e[n]) && Ot(i[n])
                    ? i[n].__swiper__
                      ? (e[n] = i[n])
                      : Ct(e[n], i[n])
                    : !Ot(e[n]) && Ot(i[n])
                    ? ((e[n] = {}),
                      i[n].__swiper__ ? (e[n] = i[n]) : Ct(e[n], i[n]))
                    : (e[n] = i[n]));
              }
            }
          }
          var r;
          return e;
        }
        function At(e, t, r) {
          e.style.setProperty(t, r);
        }
        function It(e) {
          let { swiper: t, targetPosition: r, side: n } = e;
          const i = xt(),
            s = -t.translate;
          let o,
            a = null;
          const l = t.params.speed;
          (t.wrapperEl.style.scrollSnapType = "none"),
            i.cancelAnimationFrame(t.cssModeFrameID);
          const c = r > s ? "next" : "prev",
            u = (e, t) => ("next" === c && e >= t) || ("prev" === c && e <= t),
            d = () => {
              (o = new Date().getTime()), null === a && (a = o);
              const e = Math.max(Math.min((o - a) / l, 1), 0),
                c = 0.5 - Math.cos(e * Math.PI) / 2;
              let h = s + c * (r - s);
              if ((u(h, r) && (h = r), t.wrapperEl.scrollTo({ [n]: h }), u(h, r)))
                return (
                  (t.wrapperEl.style.overflow = "hidden"),
                  (t.wrapperEl.style.scrollSnapType = ""),
                  setTimeout(() => {
                    (t.wrapperEl.style.overflow = ""),
                      t.wrapperEl.scrollTo({ [n]: h });
                  }),
                  void i.cancelAnimationFrame(t.cssModeFrameID)
                );
              t.cssModeFrameID = i.requestAnimationFrame(d);
            };
          d();
        }
        function Lt(e, t) {
          return (
            void 0 === t && (t = ""), [...e.children].filter((e) => e.matches(t))
          );
        }
        function Rt(e) {
          try {
            return void console.warn(e);
          } catch (e) {}
        }
        function zt(e, t) {
          void 0 === t && (t = []);
          const r = document.createElement(e);
          return (
            r.classList.add(
              ...(Array.isArray(t)
                ? t
                : (function (e) {
                    return (
                      void 0 === e && (e = ""),
                      e
                        .trim()
                        .split(" ")
                        .filter((e) => !!e.trim())
                    );
                  })(t))
            ),
            r
          );
        }
        function Dt(e, t) {
          return xt().getComputedStyle(e, null).getPropertyValue(t);
        }
        function Ft(e) {
          let t,
            r = e;
          if (r) {
            for (t = 0; null !== (r = r.previousSibling); )
              1 === r.nodeType && (t += 1);
            return t;
          }
        }
        function $t(e, t, r) {
          const n = xt();
          return r
            ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
                parseFloat(
                  n
                    .getComputedStyle(e, null)
                    .getPropertyValue(
                      "width" === t ? "margin-right" : "margin-top"
                    )
                ) +
                parseFloat(
                  n
                    .getComputedStyle(e, null)
                    .getPropertyValue(
                      "width" === t ? "margin-left" : "margin-bottom"
                    )
                )
            : e.offsetWidth;
        }
        function Nt(e) {
          return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
        }
        let jt, Vt, Bt;
        function qt() {
          return (
            jt ||
              (jt = (function () {
                const e = xt(),
                  t = Et();
                return {
                  smoothScroll:
                    t.documentElement &&
                    t.documentElement.style &&
                    "scrollBehavior" in t.documentElement.style,
                  touch: !!(
                    "ontouchstart" in e ||
                    (e.DocumentTouch && t instanceof e.DocumentTouch)
                  ),
                };
              })()),
            jt
          );
        }
        function Ut(e) {
          return (
            void 0 === e && (e = {}),
            Vt ||
              (Vt = (function (e) {
                let { userAgent: t } = void 0 === e ? {} : e;
                const r = qt(),
                  n = xt(),
                  i = n.navigator.platform,
                  s = t || n.navigator.userAgent,
                  o = { ios: !1, android: !1 },
                  a = n.screen.width,
                  l = n.screen.height,
                  c = s.match(/(Android);?[\s\/]+([\d.]+)?/);
                let u = s.match(/(iPad).*OS\s([\d_]+)/);
                const d = s.match(/(iPod)(.*OS\s([\d_]+))?/),
                  h = !u && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                  p = "Win32" === i;
                let f = "MacIntel" === i;
                return (
                  !u &&
                    f &&
                    r.touch &&
                    [
                      "1024x1366",
                      "1366x1024",
                      "834x1194",
                      "1194x834",
                      "834x1112",
                      "1112x834",
                      "768x1024",
                      "1024x768",
                      "820x1180",
                      "1180x820",
                      "810x1080",
                      "1080x810",
                    ].indexOf(`${a}x${l}`) >= 0 &&
                    ((u = s.match(/(Version)\/([\d.]+)/)),
                    u || (u = [0, 1, "13_0_0"]),
                    (f = !1)),
                  c && !p && ((o.os = "android"), (o.android = !0)),
                  (u || h || d) && ((o.os = "ios"), (o.ios = !0)),
                  o
                );
              })(e)),
            Vt
          );
        }
        function Ht() {
          return (
            Bt ||
              (Bt = (function () {
                const e = xt(),
                  t = Ut();
                let r = !1;
                function n() {
                  const t = e.navigator.userAgent.toLowerCase();
                  return (
                    t.indexOf("safari") >= 0 &&
                    t.indexOf("chrome") < 0 &&
                    t.indexOf("android") < 0
                  );
                }
                if (n()) {
                  const t = String(e.navigator.userAgent);
                  if (t.includes("Version/")) {
                    const [e, n] = t
                      .split("Version/")[1]
                      .split(" ")[0]
                      .split(".")
                      .map((e) => Number(e));
                    r = e < 16 || (16 === e && n < 2);
                  }
                }
                const i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                    e.navigator.userAgent
                  ),
                  s = n();
                return {
                  isSafari: r || s,
                  needPerspectiveFix: r,
                  need3dFix: s || (i && t.ios),
                  isWebView: i,
                };
              })()),
            Bt
          );
        }
        var Wt = {
          on(e, t, r) {
            const n = this;
            if (!n.eventsListeners || n.destroyed) return n;
            if ("function" != typeof t) return n;
            const i = r ? "unshift" : "push";
            return (
              e.split(" ").forEach((e) => {
                n.eventsListeners[e] || (n.eventsListeners[e] = []),
                  n.eventsListeners[e][i](t);
              }),
              n
            );
          },
          once(e, t, r) {
            const n = this;
            if (!n.eventsListeners || n.destroyed) return n;
            if ("function" != typeof t) return n;
            function i() {
              n.off(e, i), i.__emitterProxy && delete i.__emitterProxy;
              for (var r = arguments.length, s = new Array(r), o = 0; o < r; o++)
                s[o] = arguments[o];
              t.apply(n, s);
            }
            return (i.__emitterProxy = t), n.on(e, i, r);
          },
          onAny(e, t) {
            const r = this;
            if (!r.eventsListeners || r.destroyed) return r;
            if ("function" != typeof e) return r;
            const n = t ? "unshift" : "push";
            return (
              r.eventsAnyListeners.indexOf(e) < 0 && r.eventsAnyListeners[n](e), r
            );
          },
          offAny(e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed) return t;
            if (!t.eventsAnyListeners) return t;
            const r = t.eventsAnyListeners.indexOf(e);
            return r >= 0 && t.eventsAnyListeners.splice(r, 1), t;
          },
          off(e, t) {
            const r = this;
            return !r.eventsListeners || r.destroyed
              ? r
              : r.eventsListeners
              ? (e.split(" ").forEach((e) => {
                  void 0 === t
                    ? (r.eventsListeners[e] = [])
                    : r.eventsListeners[e] &&
                      r.eventsListeners[e].forEach((n, i) => {
                        (n === t ||
                          (n.__emitterProxy && n.__emitterProxy === t)) &&
                          r.eventsListeners[e].splice(i, 1);
                      });
                }),
                r)
              : r;
          },
          emit() {
            const e = this;
            if (!e.eventsListeners || e.destroyed) return e;
            if (!e.eventsListeners) return e;
            let t, r, n;
            for (var i = arguments.length, s = new Array(i), o = 0; o < i; o++)
              s[o] = arguments[o];
            "string" == typeof s[0] || Array.isArray(s[0])
              ? ((t = s[0]), (r = s.slice(1, s.length)), (n = e))
              : ((t = s[0].events), (r = s[0].data), (n = s[0].context || e)),
              r.unshift(n);
            return (
              (Array.isArray(t) ? t : t.split(" ")).forEach((t) => {
                e.eventsAnyListeners &&
                  e.eventsAnyListeners.length &&
                  e.eventsAnyListeners.forEach((e) => {
                    e.apply(n, [t, ...r]);
                  }),
                  e.eventsListeners &&
                    e.eventsListeners[t] &&
                    e.eventsListeners[t].forEach((e) => {
                      e.apply(n, r);
                    });
              }),
              e
            );
          },
        };
        const Gt = (e, t) => {
            if (!e || e.destroyed || !e.params) return;
            const r = t.closest(
              e.isElement ? "swiper-slide" : `.${e.params.slideClass}`
            );
            if (r) {
              let t = r.querySelector(`.${e.params.lazyPreloaderClass}`);
              !t &&
                e.isElement &&
                (r.shadowRoot
                  ? (t = r.shadowRoot.querySelector(
                      `.${e.params.lazyPreloaderClass}`
                    ))
                  : requestAnimationFrame(() => {
                      r.shadowRoot &&
                        ((t = r.shadowRoot.querySelector(
                          `.${e.params.lazyPreloaderClass}`
                        )),
                        t && t.remove());
                    })),
                t && t.remove();
            }
          },
          Yt = (e, t) => {
            if (!e.slides[t]) return;
            const r = e.slides[t].querySelector('[loading="lazy"]');
            r && r.removeAttribute("loading");
          },
          Xt = (e) => {
            if (!e || e.destroyed || !e.params) return;
            let t = e.params.lazyPreloadPrevNext;
            const r = e.slides.length;
            if (!r || !t || t < 0) return;
            t = Math.min(t, r);
            const n =
                "auto" === e.params.slidesPerView
                  ? e.slidesPerViewDynamic()
                  : Math.ceil(e.params.slidesPerView),
              i = e.activeIndex;
            if (e.params.grid && e.params.grid.rows > 1) {
              const r = i,
                s = [r - t];
              return (
                s.push(...Array.from({ length: t }).map((e, t) => r + n + t)),
                void e.slides.forEach((t, r) => {
                  s.includes(t.column) && Yt(e, r);
                })
              );
            }
            const s = i + n - 1;
            if (e.params.rewind || e.params.loop)
              for (let n = i - t; n <= s + t; n += 1) {
                const t = ((n % r) + r) % r;
                (t < i || t > s) && Yt(e, t);
              }
            else
              for (
                let n = Math.max(i - t, 0);
                n <= Math.min(s + t, r - 1);
                n += 1
              )
                n !== i && (n > s || n < i) && Yt(e, n);
          };
        var Kt = {
          updateSize: function () {
            const e = this;
            let t, r;
            const n = e.el;
            (t =
              void 0 !== e.params.width && null !== e.params.width
                ? e.params.width
                : n.clientWidth),
              (r =
                void 0 !== e.params.height && null !== e.params.height
                  ? e.params.height
                  : n.clientHeight),
              (0 === t && e.isHorizontal()) ||
                (0 === r && e.isVertical()) ||
                ((t =
                  t -
                  parseInt(Dt(n, "padding-left") || 0, 10) -
                  parseInt(Dt(n, "padding-right") || 0, 10)),
                (r =
                  r -
                  parseInt(Dt(n, "padding-top") || 0, 10) -
                  parseInt(Dt(n, "padding-bottom") || 0, 10)),
                Number.isNaN(t) && (t = 0),
                Number.isNaN(r) && (r = 0),
                Object.assign(e, {
                  width: t,
                  height: r,
                  size: e.isHorizontal() ? t : r,
                }));
          },
          updateSlides: function () {
            const e = this;
            function t(t, r) {
              return parseFloat(t.getPropertyValue(e.getDirectionLabel(r)) || 0);
            }
            const r = e.params,
              {
                wrapperEl: n,
                slidesEl: i,
                size: s,
                rtlTranslate: o,
                wrongRTL: a,
              } = e,
              l = e.virtual && r.virtual.enabled,
              c = l ? e.virtual.slides.length : e.slides.length,
              u = Lt(i, `.${e.params.slideClass}, swiper-slide`),
              d = l ? e.virtual.slides.length : u.length;
            let h = [];
            const p = [],
              f = [];
            let m = r.slidesOffsetBefore;
            "function" == typeof m && (m = r.slidesOffsetBefore.call(e));
            let v = r.slidesOffsetAfter;
            "function" == typeof v && (v = r.slidesOffsetAfter.call(e));
            const g = e.snapGrid.length,
              y = e.slidesGrid.length;
            let w = r.spaceBetween,
              b = -m,
              _ = 0,
              T = 0;
            if (void 0 === s) return;
            "string" == typeof w && w.indexOf("%") >= 0
              ? (w = (parseFloat(w.replace("%", "")) / 100) * s)
              : "string" == typeof w && (w = parseFloat(w)),
              (e.virtualSize = -w),
              u.forEach((e) => {
                o ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
                  (e.style.marginBottom = ""),
                  (e.style.marginTop = "");
              }),
              r.centeredSlides &&
                r.cssMode &&
                (At(n, "--swiper-centered-offset-before", ""),
                At(n, "--swiper-centered-offset-after", ""));
            const E = r.grid && r.grid.rows > 1 && e.grid;
            let S;
            E ? e.grid.initSlides(u) : e.grid && e.grid.unsetSlides();
            const x =
              "auto" === r.slidesPerView &&
              r.breakpoints &&
              Object.keys(r.breakpoints).filter(
                (e) => void 0 !== r.breakpoints[e].slidesPerView
              ).length > 0;
            for (let n = 0; n < d; n += 1) {
              let i;
              if (
                ((S = 0),
                u[n] && (i = u[n]),
                E && e.grid.updateSlide(n, i, u),
                !u[n] || "none" !== Dt(i, "display"))
              ) {
                if ("auto" === r.slidesPerView) {
                  x && (u[n].style[e.getDirectionLabel("width")] = "");
                  const s = getComputedStyle(i),
                    o = i.style.transform,
                    a = i.style.webkitTransform;
                  if (
                    (o && (i.style.transform = "none"),
                    a && (i.style.webkitTransform = "none"),
                    r.roundLengths)
                  )
                    S = e.isHorizontal()
                      ? $t(i, "width", !0)
                      : $t(i, "height", !0);
                  else {
                    const e = t(s, "width"),
                      r = t(s, "padding-left"),
                      n = t(s, "padding-right"),
                      o = t(s, "margin-left"),
                      a = t(s, "margin-right"),
                      l = s.getPropertyValue("box-sizing");
                    if (l && "border-box" === l) S = e + o + a;
                    else {
                      const { clientWidth: t, offsetWidth: s } = i;
                      S = e + r + n + o + a + (s - t);
                    }
                  }
                  o && (i.style.transform = o),
                    a && (i.style.webkitTransform = a),
                    r.roundLengths && (S = Math.floor(S));
                } else
                  (S = (s - (r.slidesPerView - 1) * w) / r.slidesPerView),
                    r.roundLengths && (S = Math.floor(S)),
                    u[n] && (u[n].style[e.getDirectionLabel("width")] = `${S}px`);
                u[n] && (u[n].swiperSlideSize = S),
                  f.push(S),
                  r.centeredSlides
                    ? ((b = b + S / 2 + _ / 2 + w),
                      0 === _ && 0 !== n && (b = b - s / 2 - w),
                      0 === n && (b = b - s / 2 - w),
                      Math.abs(b) < 0.001 && (b = 0),
                      r.roundLengths && (b = Math.floor(b)),
                      T % r.slidesPerGroup == 0 && h.push(b),
                      p.push(b))
                    : (r.roundLengths && (b = Math.floor(b)),
                      (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                        e.params.slidesPerGroup ==
                        0 && h.push(b),
                      p.push(b),
                      (b = b + S + w)),
                  (e.virtualSize += S + w),
                  (_ = S),
                  (T += 1);
              }
            }
            if (
              ((e.virtualSize = Math.max(e.virtualSize, s) + v),
              o &&
                a &&
                ("slide" === r.effect || "coverflow" === r.effect) &&
                (n.style.width = `${e.virtualSize + w}px`),
              r.setWrapperSize &&
                (n.style[e.getDirectionLabel("width")] = `${
                  e.virtualSize + w
                }px`),
              E && e.grid.updateWrapperSize(S, h),
              !r.centeredSlides)
            ) {
              const t = [];
              for (let n = 0; n < h.length; n += 1) {
                let i = h[n];
                r.roundLengths && (i = Math.floor(i)),
                  h[n] <= e.virtualSize - s && t.push(i);
              }
              (h = t),
                Math.floor(e.virtualSize - s) - Math.floor(h[h.length - 1]) > 1 &&
                  h.push(e.virtualSize - s);
            }
            if (l && r.loop) {
              const t = f[0] + w;
              if (r.slidesPerGroup > 1) {
                const n = Math.ceil(
                    (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                      r.slidesPerGroup
                  ),
                  i = t * r.slidesPerGroup;
                for (let e = 0; e < n; e += 1) h.push(h[h.length - 1] + i);
              }
              for (
                let n = 0;
                n < e.virtual.slidesBefore + e.virtual.slidesAfter;
                n += 1
              )
                1 === r.slidesPerGroup && h.push(h[h.length - 1] + t),
                  p.push(p[p.length - 1] + t),
                  (e.virtualSize += t);
            }
            if ((0 === h.length && (h = [0]), 0 !== w)) {
              const t =
                e.isHorizontal() && o
                  ? "marginLeft"
                  : e.getDirectionLabel("marginRight");
              u.filter(
                (e, t) => !(r.cssMode && !r.loop) || t !== u.length - 1
              ).forEach((e) => {
                e.style[t] = `${w}px`;
              });
            }
            if (r.centeredSlides && r.centeredSlidesBounds) {
              let e = 0;
              f.forEach((t) => {
                e += t + (w || 0);
              }),
                (e -= w);
              const t = e - s;
              h = h.map((e) => (e <= 0 ? -m : e > t ? t + v : e));
            }
            if (r.centerInsufficientSlides) {
              let e = 0;
              if (
                (f.forEach((t) => {
                  e += t + (w || 0);
                }),
                (e -= w),
                e < s)
              ) {
                const t = (s - e) / 2;
                h.forEach((e, r) => {
                  h[r] = e - t;
                }),
                  p.forEach((e, r) => {
                    p[r] = e + t;
                  });
              }
            }
            if (
              (Object.assign(e, {
                slides: u,
                snapGrid: h,
                slidesGrid: p,
                slidesSizesGrid: f,
              }),
              r.centeredSlides && r.cssMode && !r.centeredSlidesBounds)
            ) {
              At(n, "--swiper-centered-offset-before", -h[0] + "px"),
                At(
                  n,
                  "--swiper-centered-offset-after",
                  e.size / 2 - f[f.length - 1] / 2 + "px"
                );
              const t = -e.snapGrid[0],
                r = -e.slidesGrid[0];
              (e.snapGrid = e.snapGrid.map((e) => e + t)),
                (e.slidesGrid = e.slidesGrid.map((e) => e + r));
            }
            if (
              (d !== c && e.emit("slidesLengthChange"),
              h.length !== g &&
                (e.params.watchOverflow && e.checkOverflow(),
                e.emit("snapGridLengthChange")),
              p.length !== y && e.emit("slidesGridLengthChange"),
              r.watchSlidesProgress && e.updateSlidesOffset(),
              e.emit("slidesUpdated"),
              !(l || r.cssMode || ("slide" !== r.effect && "fade" !== r.effect)))
            ) {
              const t = `${r.containerModifierClass}backface-hidden`,
                n = e.el.classList.contains(t);
              d <= r.maxBackfaceHiddenSlides
                ? n || e.el.classList.add(t)
                : n && e.el.classList.remove(t);
            }
          },
          updateAutoHeight: function (e) {
            const t = this,
              r = [],
              n = t.virtual && t.params.virtual.enabled;
            let i,
              s = 0;
            "number" == typeof e
              ? t.setTransition(e)
              : !0 === e && t.setTransition(t.params.speed);
            const o = (e) =>
              n ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
              if (t.params.centeredSlides)
                (t.visibleSlides || []).forEach((e) => {
                  r.push(e);
                });
              else
                for (i = 0; i < Math.ceil(t.params.slidesPerView); i += 1) {
                  const e = t.activeIndex + i;
                  if (e > t.slides.length && !n) break;
                  r.push(o(e));
                }
            else r.push(o(t.activeIndex));
            for (i = 0; i < r.length; i += 1)
              if (void 0 !== r[i]) {
                const e = r[i].offsetHeight;
                s = e > s ? e : s;
              }
            (s || 0 === s) && (t.wrapperEl.style.height = `${s}px`);
          },
          updateSlidesOffset: function () {
            const e = this,
              t = e.slides,
              r = e.isElement
                ? e.isHorizontal()
                  ? e.wrapperEl.offsetLeft
                  : e.wrapperEl.offsetTop
                : 0;
            for (let n = 0; n < t.length; n += 1)
              t[n].swiperSlideOffset =
                (e.isHorizontal() ? t[n].offsetLeft : t[n].offsetTop) -
                r -
                e.cssOverflowAdjustment();
          },
          updateSlidesProgress: function (e) {
            void 0 === e && (e = (this && this.translate) || 0);
            const t = this,
              r = t.params,
              { slides: n, rtlTranslate: i, snapGrid: s } = t;
            if (0 === n.length) return;
            void 0 === n[0].swiperSlideOffset && t.updateSlidesOffset();
            let o = -e;
            i && (o = e),
              n.forEach((e) => {
                e.classList.remove(r.slideVisibleClass, r.slideFullyVisibleClass);
              }),
              (t.visibleSlidesIndexes = []),
              (t.visibleSlides = []);
            let a = r.spaceBetween;
            "string" == typeof a && a.indexOf("%") >= 0
              ? (a = (parseFloat(a.replace("%", "")) / 100) * t.size)
              : "string" == typeof a && (a = parseFloat(a));
            for (let e = 0; e < n.length; e += 1) {
              const l = n[e];
              let c = l.swiperSlideOffset;
              r.cssMode && r.centeredSlides && (c -= n[0].swiperSlideOffset);
              const u =
                  (o + (r.centeredSlides ? t.minTranslate() : 0) - c) /
                  (l.swiperSlideSize + a),
                d =
                  (o - s[0] + (r.centeredSlides ? t.minTranslate() : 0) - c) /
                  (l.swiperSlideSize + a),
                h = -(o - c),
                p = h + t.slidesSizesGrid[e],
                f = h >= 0 && h <= t.size - t.slidesSizesGrid[e];
              ((h >= 0 && h < t.size - 1) ||
                (p > 1 && p <= t.size) ||
                (h <= 0 && p >= t.size)) &&
                (t.visibleSlides.push(l),
                t.visibleSlidesIndexes.push(e),
                n[e].classList.add(r.slideVisibleClass)),
                f && n[e].classList.add(r.slideFullyVisibleClass),
                (l.progress = i ? -u : u),
                (l.originalProgress = i ? -d : d);
            }
          },
          updateProgress: function (e) {
            const t = this;
            if (void 0 === e) {
              const r = t.rtlTranslate ? -1 : 1;
              e = (t && t.translate && t.translate * r) || 0;
            }
            const r = t.params,
              n = t.maxTranslate() - t.minTranslate();
            let { progress: i, isBeginning: s, isEnd: o, progressLoop: a } = t;
            const l = s,
              c = o;
            if (0 === n) (i = 0), (s = !0), (o = !0);
            else {
              i = (e - t.minTranslate()) / n;
              const r = Math.abs(e - t.minTranslate()) < 1,
                a = Math.abs(e - t.maxTranslate()) < 1;
              (s = r || i <= 0), (o = a || i >= 1), r && (i = 0), a && (i = 1);
            }
            if (r.loop) {
              const r = t.getSlideIndexByData(0),
                n = t.getSlideIndexByData(t.slides.length - 1),
                i = t.slidesGrid[r],
                s = t.slidesGrid[n],
                o = t.slidesGrid[t.slidesGrid.length - 1],
                l = Math.abs(e);
              (a = l >= i ? (l - i) / o : (l + o - s) / o), a > 1 && (a -= 1);
            }
            Object.assign(t, {
              progress: i,
              progressLoop: a,
              isBeginning: s,
              isEnd: o,
            }),
              (r.watchSlidesProgress || (r.centeredSlides && r.autoHeight)) &&
                t.updateSlidesProgress(e),
              s && !l && t.emit("reachBeginning toEdge"),
              o && !c && t.emit("reachEnd toEdge"),
              ((l && !s) || (c && !o)) && t.emit("fromEdge"),
              t.emit("progress", i);
          },
          updateSlidesClasses: function () {
            const e = this,
              { slides: t, params: r, slidesEl: n, activeIndex: i } = e,
              s = e.virtual && r.virtual.enabled,
              o = e.grid && r.grid && r.grid.rows > 1,
              a = (e) => Lt(n, `.${r.slideClass}${e}, swiper-slide${e}`)[0];
            let l, c, u;
            if (
              (t.forEach((e) => {
                e.classList.remove(
                  r.slideActiveClass,
                  r.slideNextClass,
                  r.slidePrevClass
                );
              }),
              s)
            )
              if (r.loop) {
                let t = i - e.virtual.slidesBefore;
                t < 0 && (t = e.virtual.slides.length + t),
                  t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
                  (l = a(`[data-swiper-slide-index="${t}"]`));
              } else l = a(`[data-swiper-slide-index="${i}"]`);
            else
              o
                ? ((l = t.filter((e) => e.column === i)[0]),
                  (u = t.filter((e) => e.column === i + 1)[0]),
                  (c = t.filter((e) => e.column === i - 1)[0]))
                : (l = t[i]);
            l &&
              (l.classList.add(r.slideActiveClass),
              o
                ? (u && u.classList.add(r.slideNextClass),
                  c && c.classList.add(r.slidePrevClass))
                : ((u = (function (e, t) {
                    const r = [];
                    for (; e.nextElementSibling; ) {
                      const n = e.nextElementSibling;
                      t ? n.matches(t) && r.push(n) : r.push(n), (e = n);
                    }
                    return r;
                  })(l, `.${r.slideClass}, swiper-slide`)[0]),
                  r.loop && !u && (u = t[0]),
                  u && u.classList.add(r.slideNextClass),
                  (c = (function (e, t) {
                    const r = [];
                    for (; e.previousElementSibling; ) {
                      const n = e.previousElementSibling;
                      t ? n.matches(t) && r.push(n) : r.push(n), (e = n);
                    }
                    return r;
                  })(l, `.${r.slideClass}, swiper-slide`)[0]),
                  r.loop && 0 === !c && (c = t[t.length - 1]),
                  c && c.classList.add(r.slidePrevClass))),
              e.emitSlidesClasses();
          },
          updateActiveIndex: function (e) {
            const t = this,
              r = t.rtlTranslate ? t.translate : -t.translate,
              {
                snapGrid: n,
                params: i,
                activeIndex: s,
                realIndex: o,
                snapIndex: a,
              } = t;
            let l,
              c = e;
            const u = (e) => {
              let r = e - t.virtual.slidesBefore;
              return (
                r < 0 && (r = t.virtual.slides.length + r),
                r >= t.virtual.slides.length && (r -= t.virtual.slides.length),
                r
              );
            };
            if (
              (void 0 === c &&
                (c = (function (e) {
                  const { slidesGrid: t, params: r } = e,
                    n = e.rtlTranslate ? e.translate : -e.translate;
                  let i;
                  for (let e = 0; e < t.length; e += 1)
                    void 0 !== t[e + 1]
                      ? n >= t[e] && n < t[e + 1] - (t[e + 1] - t[e]) / 2
                        ? (i = e)
                        : n >= t[e] && n < t[e + 1] && (i = e + 1)
                      : n >= t[e] && (i = e);
                  return (
                    r.normalizeSlideIndex && (i < 0 || void 0 === i) && (i = 0), i
                  );
                })(t)),
              n.indexOf(r) >= 0)
            )
              l = n.indexOf(r);
            else {
              const e = Math.min(i.slidesPerGroupSkip, c);
              l = e + Math.floor((c - e) / i.slidesPerGroup);
            }
            if ((l >= n.length && (l = n.length - 1), c === s && !t.params.loop))
              return void (
                l !== a && ((t.snapIndex = l), t.emit("snapIndexChange"))
              );
            if (c === s && t.params.loop && t.virtual && t.params.virtual.enabled)
              return void (t.realIndex = u(c));
            const d = t.grid && i.grid && i.grid.rows > 1;
            let h;
            if (t.virtual && i.virtual.enabled && i.loop) h = u(c);
            else if (d) {
              const e = t.slides.filter((e) => e.column === c)[0];
              let r = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
              Number.isNaN(r) && (r = Math.max(t.slides.indexOf(e), 0)),
                (h = Math.floor(r / i.grid.rows));
            } else if (t.slides[c]) {
              const e = t.slides[c].getAttribute("data-swiper-slide-index");
              h = e ? parseInt(e, 10) : c;
            } else h = c;
            Object.assign(t, {
              previousSnapIndex: a,
              snapIndex: l,
              previousRealIndex: o,
              realIndex: h,
              previousIndex: s,
              activeIndex: c,
            }),
              t.initialized && Xt(t),
              t.emit("activeIndexChange"),
              t.emit("snapIndexChange"),
              (t.initialized || t.params.runCallbacksOnInit) &&
                (o !== h && t.emit("realIndexChange"), t.emit("slideChange"));
          },
          updateClickedSlide: function (e, t) {
            const r = this,
              n = r.params;
            let i = e.closest(`.${n.slideClass}, swiper-slide`);
            !i &&
              r.isElement &&
              t &&
              t.length > 1 &&
              t.includes(e) &&
              [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
                !i &&
                  e.matches &&
                  e.matches(`.${n.slideClass}, swiper-slide`) &&
                  (i = e);
              });
            let s,
              o = !1;
            if (i)
              for (let e = 0; e < r.slides.length; e += 1)
                if (r.slides[e] === i) {
                  (o = !0), (s = e);
                  break;
                }
            if (!i || !o)
              return (r.clickedSlide = void 0), void (r.clickedIndex = void 0);
            (r.clickedSlide = i),
              r.virtual && r.params.virtual.enabled
                ? (r.clickedIndex = parseInt(
                    i.getAttribute("data-swiper-slide-index"),
                    10
                  ))
                : (r.clickedIndex = s),
              n.slideToClickedSlide &&
                void 0 !== r.clickedIndex &&
                r.clickedIndex !== r.activeIndex &&
                r.slideToClickedSlide();
          },
        };
        var Qt = {
          getTranslate: function (e) {
            void 0 === e && (e = this.isHorizontal() ? "x" : "y");
            const {
              params: t,
              rtlTranslate: r,
              translate: n,
              wrapperEl: i,
            } = this;
            if (t.virtualTranslate) return r ? -n : n;
            if (t.cssMode) return n;
            let s = Pt(i, e);
            return (s += this.cssOverflowAdjustment()), r && (s = -s), s || 0;
          },
          setTranslate: function (e, t) {
            const r = this,
              { rtlTranslate: n, params: i, wrapperEl: s, progress: o } = r;
            let a,
              l = 0,
              c = 0;
            r.isHorizontal() ? (l = n ? -e : e) : (c = e),
              i.roundLengths && ((l = Math.floor(l)), (c = Math.floor(c))),
              (r.previousTranslate = r.translate),
              (r.translate = r.isHorizontal() ? l : c),
              i.cssMode
                ? (s[r.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                    r.isHorizontal() ? -l : -c)
                : i.virtualTranslate ||
                  (r.isHorizontal()
                    ? (l -= r.cssOverflowAdjustment())
                    : (c -= r.cssOverflowAdjustment()),
                  (s.style.transform = `translate3d(${l}px, ${c}px, 0px)`));
            const u = r.maxTranslate() - r.minTranslate();
            (a = 0 === u ? 0 : (e - r.minTranslate()) / u),
              a !== o && r.updateProgress(e),
              r.emit("setTranslate", r.translate, t);
          },
          minTranslate: function () {
            return -this.snapGrid[0];
          },
          maxTranslate: function () {
            return -this.snapGrid[this.snapGrid.length - 1];
          },
          translateTo: function (e, t, r, n, i) {
            void 0 === e && (e = 0),
              void 0 === t && (t = this.params.speed),
              void 0 === r && (r = !0),
              void 0 === n && (n = !0);
            const s = this,
              { params: o, wrapperEl: a } = s;
            if (s.animating && o.preventInteractionOnTransition) return !1;
            const l = s.minTranslate(),
              c = s.maxTranslate();
            let u;
            if (
              ((u = n && e > l ? l : n && e < c ? c : e),
              s.updateProgress(u),
              o.cssMode)
            ) {
              const e = s.isHorizontal();
              if (0 === t) a[e ? "scrollLeft" : "scrollTop"] = -u;
              else {
                if (!s.support.smoothScroll)
                  return (
                    It({
                      swiper: s,
                      targetPosition: -u,
                      side: e ? "left" : "top",
                    }),
                    !0
                  );
                a.scrollTo({ [e ? "left" : "top"]: -u, behavior: "smooth" });
              }
              return !0;
            }
            return (
              0 === t
                ? (s.setTransition(0),
                  s.setTranslate(u),
                  r &&
                    (s.emit("beforeTransitionStart", t, i),
                    s.emit("transitionEnd")))
                : (s.setTransition(t),
                  s.setTranslate(u),
                  r &&
                    (s.emit("beforeTransitionStart", t, i),
                    s.emit("transitionStart")),
                  s.animating ||
                    ((s.animating = !0),
                    s.onTranslateToWrapperTransitionEnd ||
                      (s.onTranslateToWrapperTransitionEnd = function (e) {
                        s &&
                          !s.destroyed &&
                          e.target === this &&
                          (s.wrapperEl.removeEventListener(
                            "transitionend",
                            s.onTranslateToWrapperTransitionEnd
                          ),
                          (s.onTranslateToWrapperTransitionEnd = null),
                          delete s.onTranslateToWrapperTransitionEnd,
                          r && s.emit("transitionEnd"));
                      }),
                    s.wrapperEl.addEventListener(
                      "transitionend",
                      s.onTranslateToWrapperTransitionEnd
                    ))),
              !0
            );
          },
        };
        function Zt(e) {
          let { swiper: t, runCallbacks: r, direction: n, step: i } = e;
          const { activeIndex: s, previousIndex: o } = t;
          let a = n;
          if (
            (a || (a = s > o ? "next" : s < o ? "prev" : "reset"),
            t.emit(`transition${i}`),
            r && s !== o)
          ) {
            if ("reset" === a) return void t.emit(`slideResetTransition${i}`);
            t.emit(`slideChangeTransition${i}`),
              "next" === a
                ? t.emit(`slideNextTransition${i}`)
                : t.emit(`slidePrevTransition${i}`);
          }
        }
        var Jt = {
          slideTo: function (e, t, r, n, i) {
            void 0 === e && (e = 0),
              void 0 === t && (t = this.params.speed),
              void 0 === r && (r = !0),
              "string" == typeof e && (e = parseInt(e, 10));
            const s = this;
            let o = e;
            o < 0 && (o = 0);
            const {
              params: a,
              snapGrid: l,
              slidesGrid: c,
              previousIndex: u,
              activeIndex: d,
              rtlTranslate: h,
              wrapperEl: p,
              enabled: f,
            } = s;
            if (
              (s.animating && a.preventInteractionOnTransition) ||
              (!f && !n && !i) ||
              s.destroyed
            )
              return !1;
            const m = Math.min(s.params.slidesPerGroupSkip, o);
            let v = m + Math.floor((o - m) / s.params.slidesPerGroup);
            v >= l.length && (v = l.length - 1);
            const g = -l[v];
            if (a.normalizeSlideIndex)
              for (let e = 0; e < c.length; e += 1) {
                const t = -Math.floor(100 * g),
                  r = Math.floor(100 * c[e]),
                  n = Math.floor(100 * c[e + 1]);
                void 0 !== c[e + 1]
                  ? t >= r && t < n - (n - r) / 2
                    ? (o = e)
                    : t >= r && t < n && (o = e + 1)
                  : t >= r && (o = e);
              }
            if (s.initialized && o !== d) {
              if (
                !s.allowSlideNext &&
                (h
                  ? g > s.translate && g > s.minTranslate()
                  : g < s.translate && g < s.minTranslate())
              )
                return !1;
              if (
                !s.allowSlidePrev &&
                g > s.translate &&
                g > s.maxTranslate() &&
                (d || 0) !== o
              )
                return !1;
            }
            let y;
            if (
              (o !== (u || 0) && r && s.emit("beforeSlideChangeStart"),
              s.updateProgress(g),
              (y = o > d ? "next" : o < d ? "prev" : "reset"),
              (h && -g === s.translate) || (!h && g === s.translate))
            )
              return (
                s.updateActiveIndex(o),
                a.autoHeight && s.updateAutoHeight(),
                s.updateSlidesClasses(),
                "slide" !== a.effect && s.setTranslate(g),
                "reset" !== y && (s.transitionStart(r, y), s.transitionEnd(r, y)),
                !1
              );
            if (a.cssMode) {
              const e = s.isHorizontal(),
                r = h ? g : -g;
              if (0 === t) {
                const t = s.virtual && s.params.virtual.enabled;
                t &&
                  ((s.wrapperEl.style.scrollSnapType = "none"),
                  (s._immediateVirtual = !0)),
                  t && !s._cssModeVirtualInitialSet && s.params.initialSlide > 0
                    ? ((s._cssModeVirtualInitialSet = !0),
                      requestAnimationFrame(() => {
                        p[e ? "scrollLeft" : "scrollTop"] = r;
                      }))
                    : (p[e ? "scrollLeft" : "scrollTop"] = r),
                  t &&
                    requestAnimationFrame(() => {
                      (s.wrapperEl.style.scrollSnapType = ""),
                        (s._immediateVirtual = !1);
                    });
              } else {
                if (!s.support.smoothScroll)
                  return (
                    It({
                      swiper: s,
                      targetPosition: r,
                      side: e ? "left" : "top",
                    }),
                    !0
                  );
                p.scrollTo({ [e ? "left" : "top"]: r, behavior: "smooth" });
              }
              return !0;
            }
            return (
              s.setTransition(t),
              s.setTranslate(g),
              s.updateActiveIndex(o),
              s.updateSlidesClasses(),
              s.emit("beforeTransitionStart", t, n),
              s.transitionStart(r, y),
              0 === t
                ? s.transitionEnd(r, y)
                : s.animating ||
                  ((s.animating = !0),
                  s.onSlideToWrapperTransitionEnd ||
                    (s.onSlideToWrapperTransitionEnd = function (e) {
                      s &&
                        !s.destroyed &&
                        e.target === this &&
                        (s.wrapperEl.removeEventListener(
                          "transitionend",
                          s.onSlideToWrapperTransitionEnd
                        ),
                        (s.onSlideToWrapperTransitionEnd = null),
                        delete s.onSlideToWrapperTransitionEnd,
                        s.transitionEnd(r, y));
                    }),
                  s.wrapperEl.addEventListener(
                    "transitionend",
                    s.onSlideToWrapperTransitionEnd
                  )),
              !0
            );
          },
          slideToLoop: function (e, t, r, n) {
            if (
              (void 0 === e && (e = 0),
              void 0 === t && (t = this.params.speed),
              void 0 === r && (r = !0),
              "string" == typeof e)
            ) {
              e = parseInt(e, 10);
            }
            const i = this;
            if (i.destroyed) return;
            const s = i.grid && i.params.grid && i.params.grid.rows > 1;
            let o = e;
            if (i.params.loop)
              if (i.virtual && i.params.virtual.enabled)
                o += i.virtual.slidesBefore;
              else {
                let e;
                if (s) {
                  const t = o * i.params.grid.rows;
                  e = i.slides.filter(
                    (e) => 1 * e.getAttribute("data-swiper-slide-index") === t
                  )[0].column;
                } else e = i.getSlideIndexByData(o);
                const t = s
                    ? Math.ceil(i.slides.length / i.params.grid.rows)
                    : i.slides.length,
                  { centeredSlides: r } = i.params;
                let n = i.params.slidesPerView;
                "auto" === n
                  ? (n = i.slidesPerViewDynamic())
                  : ((n = Math.ceil(parseFloat(i.params.slidesPerView, 10))),
                    r && n % 2 == 0 && (n += 1));
                let a = t - e < n;
                if ((r && (a = a || e < Math.ceil(n / 2)), a)) {
                  const n = r
                    ? e < i.activeIndex
                      ? "prev"
                      : "next"
                    : e - i.activeIndex - 1 < i.params.slidesPerView
                    ? "next"
                    : "prev";
                  i.loopFix({
                    direction: n,
                    slideTo: !0,
                    activeSlideIndex: "next" === n ? e + 1 : e - t + 1,
                    slideRealIndex: "next" === n ? i.realIndex : void 0,
                  });
                }
                if (s) {
                  const e = o * i.params.grid.rows;
                  o = i.slides.filter(
                    (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
                  )[0].column;
                } else o = i.getSlideIndexByData(o);
              }
            return (
              requestAnimationFrame(() => {
                i.slideTo(o, t, r, n);
              }),
              i
            );
          },
          slideNext: function (e, t, r) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            const n = this,
              { enabled: i, params: s, animating: o } = n;
            if (!i || n.destroyed) return n;
            let a = s.slidesPerGroup;
            "auto" === s.slidesPerView &&
              1 === s.slidesPerGroup &&
              s.slidesPerGroupAuto &&
              (a = Math.max(n.slidesPerViewDynamic("current", !0), 1));
            const l = n.activeIndex < s.slidesPerGroupSkip ? 1 : a,
              c = n.virtual && s.virtual.enabled;
            if (s.loop) {
              if (o && !c && s.loopPreventsSliding) return !1;
              if (
                (n.loopFix({ direction: "next" }),
                (n._clientLeft = n.wrapperEl.clientLeft),
                n.activeIndex === n.slides.length - 1 && s.cssMode)
              )
                return (
                  requestAnimationFrame(() => {
                    n.slideTo(n.activeIndex + l, e, t, r);
                  }),
                  !0
                );
            }
            return s.rewind && n.isEnd
              ? n.slideTo(0, e, t, r)
              : n.slideTo(n.activeIndex + l, e, t, r);
          },
          slidePrev: function (e, t, r) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            const n = this,
              {
                params: i,
                snapGrid: s,
                slidesGrid: o,
                rtlTranslate: a,
                enabled: l,
                animating: c,
              } = n;
            if (!l || n.destroyed) return n;
            const u = n.virtual && i.virtual.enabled;
            if (i.loop) {
              if (c && !u && i.loopPreventsSliding) return !1;
              n.loopFix({ direction: "prev" }),
                (n._clientLeft = n.wrapperEl.clientLeft);
            }
            function d(e) {
              return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
            }
            const h = d(a ? n.translate : -n.translate),
              p = s.map((e) => d(e));
            let f = s[p.indexOf(h) - 1];
            if (void 0 === f && i.cssMode) {
              let e;
              s.forEach((t, r) => {
                h >= t && (e = r);
              }),
                void 0 !== e && (f = s[e > 0 ? e - 1 : e]);
            }
            let m = 0;
            if (
              (void 0 !== f &&
                ((m = o.indexOf(f)),
                m < 0 && (m = n.activeIndex - 1),
                "auto" === i.slidesPerView &&
                  1 === i.slidesPerGroup &&
                  i.slidesPerGroupAuto &&
                  ((m = m - n.slidesPerViewDynamic("previous", !0) + 1),
                  (m = Math.max(m, 0)))),
              i.rewind && n.isBeginning)
            ) {
              const i =
                n.params.virtual && n.params.virtual.enabled && n.virtual
                  ? n.virtual.slides.length - 1
                  : n.slides.length - 1;
              return n.slideTo(i, e, t, r);
            }
            return i.loop && 0 === n.activeIndex && i.cssMode
              ? (requestAnimationFrame(() => {
                  n.slideTo(m, e, t, r);
                }),
                !0)
              : n.slideTo(m, e, t, r);
          },
          slideReset: function (e, t, r) {
            void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
            const n = this;
            if (!n.destroyed) return n.slideTo(n.activeIndex, e, t, r);
          },
          slideToClosest: function (e, t, r, n) {
            void 0 === e && (e = this.params.speed),
              void 0 === t && (t = !0),
              void 0 === n && (n = 0.5);
            const i = this;
            if (i.destroyed) return;
            let s = i.activeIndex;
            const o = Math.min(i.params.slidesPerGroupSkip, s),
              a = o + Math.floor((s - o) / i.params.slidesPerGroup),
              l = i.rtlTranslate ? i.translate : -i.translate;
            if (l >= i.snapGrid[a]) {
              const e = i.snapGrid[a];
              l - e > (i.snapGrid[a + 1] - e) * n &&
                (s += i.params.slidesPerGroup);
            } else {
              const e = i.snapGrid[a - 1];
              l - e <= (i.snapGrid[a] - e) * n && (s -= i.params.slidesPerGroup);
            }
            return (
              (s = Math.max(s, 0)),
              (s = Math.min(s, i.slidesGrid.length - 1)),
              i.slideTo(s, e, t, r)
            );
          },
          slideToClickedSlide: function () {
            const e = this;
            if (e.destroyed) return;
            const { params: t, slidesEl: r } = e,
              n =
                "auto" === t.slidesPerView
                  ? e.slidesPerViewDynamic()
                  : t.slidesPerView;
            let i,
              s = e.clickedIndex;
            const o = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
            if (t.loop) {
              if (e.animating) return;
              (i = parseInt(
                e.clickedSlide.getAttribute("data-swiper-slide-index"),
                10
              )),
                t.centeredSlides
                  ? s < e.loopedSlides - n / 2 ||
                    s > e.slides.length - e.loopedSlides + n / 2
                    ? (e.loopFix(),
                      (s = e.getSlideIndex(
                        Lt(r, `${o}[data-swiper-slide-index="${i}"]`)[0]
                      )),
                      kt(() => {
                        e.slideTo(s);
                      }))
                    : e.slideTo(s)
                  : s > e.slides.length - n
                  ? (e.loopFix(),
                    (s = e.getSlideIndex(
                      Lt(r, `${o}[data-swiper-slide-index="${i}"]`)[0]
                    )),
                    kt(() => {
                      e.slideTo(s);
                    }))
                  : e.slideTo(s);
            } else e.slideTo(s);
          },
        };
        var er = {
          loopCreate: function (e) {
            const t = this,
              { params: r, slidesEl: n } = t;
            if (!r.loop || (t.virtual && t.params.virtual.enabled)) return;
            const i = () => {
                Lt(n, `.${r.slideClass}, swiper-slide`).forEach((e, t) => {
                  e.setAttribute("data-swiper-slide-index", t);
                });
              },
              s = t.grid && r.grid && r.grid.rows > 1,
              o = r.slidesPerGroup * (s ? r.grid.rows : 1),
              a = t.slides.length % o != 0,
              l = s && t.slides.length % r.grid.rows != 0,
              c = (e) => {
                for (let n = 0; n < e; n += 1) {
                  const e = t.isElement
                    ? zt("swiper-slide", [r.slideBlankClass])
                    : zt("div", [r.slideClass, r.slideBlankClass]);
                  t.slidesEl.append(e);
                }
              };
            if (a) {
              if (r.loopAddBlankSlides) {
                c(o - (t.slides.length % o)), t.recalcSlides(), t.updateSlides();
              } else
                Rt(
                  "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
                );
              i();
            } else if (l) {
              if (r.loopAddBlankSlides) {
                c(r.grid.rows - (t.slides.length % r.grid.rows)),
                  t.recalcSlides(),
                  t.updateSlides();
              } else
                Rt(
                  "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)"
                );
              i();
            } else i();
            t.loopFix({
              slideRealIndex: e,
              direction: r.centeredSlides ? void 0 : "next",
            });
          },
          loopFix: function (e) {
            let {
              slideRealIndex: t,
              slideTo: r = !0,
              direction: n,
              setTranslate: i,
              activeSlideIndex: s,
              byController: o,
              byMousewheel: a,
            } = void 0 === e ? {} : e;
            const l = this;
            if (!l.params.loop) return;
            l.emit("beforeLoopFix");
            const {
                slides: c,
                allowSlidePrev: u,
                allowSlideNext: d,
                slidesEl: h,
                params: p,
              } = l,
              { centeredSlides: f } = p;
            if (
              ((l.allowSlidePrev = !0),
              (l.allowSlideNext = !0),
              l.virtual && p.virtual.enabled)
            )
              return (
                r &&
                  (p.centeredSlides || 0 !== l.snapIndex
                    ? p.centeredSlides && l.snapIndex < p.slidesPerView
                      ? l.slideTo(
                          l.virtual.slides.length + l.snapIndex,
                          0,
                          !1,
                          !0
                        )
                      : l.snapIndex === l.snapGrid.length - 1 &&
                        l.slideTo(l.virtual.slidesBefore, 0, !1, !0)
                    : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
                (l.allowSlidePrev = u),
                (l.allowSlideNext = d),
                void l.emit("loopFix")
              );
            let m = p.slidesPerView;
            "auto" === m
              ? (m = l.slidesPerViewDynamic())
              : ((m = Math.ceil(parseFloat(p.slidesPerView, 10))),
                f && m % 2 == 0 && (m += 1));
            const v = p.slidesPerGroupAuto ? m : p.slidesPerGroup;
            let g = v;
            g % v != 0 && (g += v - (g % v)),
              (g += p.loopAdditionalSlides),
              (l.loopedSlides = g);
            const y = l.grid && p.grid && p.grid.rows > 1;
            c.length < m + g
              ? Rt(
                  "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"
                )
              : y &&
                "row" === p.grid.fill &&
                Rt(
                  "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`"
                );
            const w = [],
              b = [];
            let _ = l.activeIndex;
            void 0 === s
              ? (s = l.getSlideIndex(
                  c.filter((e) => e.classList.contains(p.slideActiveClass))[0]
                ))
              : (_ = s);
            const T = "next" === n || !n,
              E = "prev" === n || !n;
            let S = 0,
              x = 0;
            const k = y ? Math.ceil(c.length / p.grid.rows) : c.length,
              M = (y ? c[s].column : s) + (f && void 0 === i ? -m / 2 + 0.5 : 0);
            if (M < g) {
              S = Math.max(g - M, v);
              for (let e = 0; e < g - M; e += 1) {
                const t = e - Math.floor(e / k) * k;
                if (y) {
                  const e = k - t - 1;
                  for (let t = c.length - 1; t >= 0; t -= 1)
                    c[t].column === e && w.push(t);
                } else w.push(k - t - 1);
              }
            } else if (M + m > k - g) {
              x = Math.max(M - (k - 2 * g), v);
              for (let e = 0; e < x; e += 1) {
                const t = e - Math.floor(e / k) * k;
                y
                  ? c.forEach((e, r) => {
                      e.column === t && b.push(r);
                    })
                  : b.push(t);
              }
            }
            if (
              ((l.__preventObserver__ = !0),
              requestAnimationFrame(() => {
                l.__preventObserver__ = !1;
              }),
              E &&
                w.forEach((e) => {
                  (c[e].swiperLoopMoveDOM = !0),
                    h.prepend(c[e]),
                    (c[e].swiperLoopMoveDOM = !1);
                }),
              T &&
                b.forEach((e) => {
                  (c[e].swiperLoopMoveDOM = !0),
                    h.append(c[e]),
                    (c[e].swiperLoopMoveDOM = !1);
                }),
              l.recalcSlides(),
              "auto" === p.slidesPerView
                ? l.updateSlides()
                : y &&
                  ((w.length > 0 && E) || (b.length > 0 && T)) &&
                  l.slides.forEach((e, t) => {
                    l.grid.updateSlide(t, e, l.slides);
                  }),
              p.watchSlidesProgress && l.updateSlidesOffset(),
              r)
            )
              if (w.length > 0 && E) {
                if (void 0 === t) {
                  const e = l.slidesGrid[_],
                    t = l.slidesGrid[_ + S] - e;
                  a
                    ? l.setTranslate(l.translate - t)
                    : (l.slideTo(_ + Math.ceil(S), 0, !1, !0),
                      i &&
                        ((l.touchEventsData.startTranslate =
                          l.touchEventsData.startTranslate - t),
                        (l.touchEventsData.currentTranslate =
                          l.touchEventsData.currentTranslate - t)));
                } else if (i) {
                  const e = y ? w.length / p.grid.rows : w.length;
                  l.slideTo(l.activeIndex + e, 0, !1, !0),
                    (l.touchEventsData.currentTranslate = l.translate);
                }
              } else if (b.length > 0 && T)
                if (void 0 === t) {
                  const e = l.slidesGrid[_],
                    t = l.slidesGrid[_ - x] - e;
                  a
                    ? l.setTranslate(l.translate - t)
                    : (l.slideTo(_ - x, 0, !1, !0),
                      i &&
                        ((l.touchEventsData.startTranslate =
                          l.touchEventsData.startTranslate - t),
                        (l.touchEventsData.currentTranslate =
                          l.touchEventsData.currentTranslate - t)));
                } else {
                  const e = y ? b.length / p.grid.rows : b.length;
                  l.slideTo(l.activeIndex - e, 0, !1, !0);
                }
            if (
              ((l.allowSlidePrev = u),
              (l.allowSlideNext = d),
              l.controller && l.controller.control && !o)
            ) {
              const e = {
                slideRealIndex: t,
                direction: n,
                setTranslate: i,
                activeSlideIndex: s,
                byController: !0,
              };
              Array.isArray(l.controller.control)
                ? l.controller.control.forEach((t) => {
                    !t.destroyed &&
                      t.params.loop &&
                      t.loopFix({
                        ...e,
                        slideTo: t.params.slidesPerView === p.slidesPerView && r,
                      });
                  })
                : l.controller.control instanceof l.constructor &&
                  l.controller.control.params.loop &&
                  l.controller.control.loopFix({
                    ...e,
                    slideTo:
                      l.controller.control.params.slidesPerView ===
                        p.slidesPerView && r,
                  });
            }
            l.emit("loopFix");
          },
          loopDestroy: function () {
            const e = this,
              { params: t, slidesEl: r } = e;
            if (!t.loop || (e.virtual && e.params.virtual.enabled)) return;
            e.recalcSlides();
            const n = [];
            e.slides.forEach((e) => {
              const t =
                void 0 === e.swiperSlideIndex
                  ? 1 * e.getAttribute("data-swiper-slide-index")
                  : e.swiperSlideIndex;
              n[t] = e;
            }),
              e.slides.forEach((e) => {
                e.removeAttribute("data-swiper-slide-index");
              }),
              n.forEach((e) => {
                r.append(e);
              }),
              e.recalcSlides(),
              e.slideTo(e.realIndex, 0);
          },
        };
        function tr(e, t, r) {
          const n = xt(),
            { params: i } = e,
            s = i.edgeSwipeDetection,
            o = i.edgeSwipeThreshold;
          return (
            !s ||
            !(r <= o || r >= n.innerWidth - o) ||
            ("prevent" === s && (t.preventDefault(), !0))
          );
        }
        function rr(e) {
          const t = this,
            r = Et();
          let n = e;
          n.originalEvent && (n = n.originalEvent);
          const i = t.touchEventsData;
          if ("pointerdown" === n.type) {
            if (null !== i.pointerId && i.pointerId !== n.pointerId) return;
            i.pointerId = n.pointerId;
          } else
            "touchstart" === n.type &&
              1 === n.targetTouches.length &&
              (i.touchId = n.targetTouches[0].identifier);
          if ("touchstart" === n.type)
            return void tr(t, n, n.targetTouches[0].pageX);
          const { params: s, touches: o, enabled: a } = t;
          if (!a) return;
          if (!s.simulateTouch && "mouse" === n.pointerType) return;
          if (t.animating && s.preventInteractionOnTransition) return;
          !t.animating && s.cssMode && s.loop && t.loopFix();
          let l = n.target;
          if ("wrapper" === s.touchEventsTarget && !t.wrapperEl.contains(l))
            return;
          if ("which" in n && 3 === n.which) return;
          if ("button" in n && n.button > 0) return;
          if (i.isTouched && i.isMoved) return;
          const c = !!s.noSwipingClass && "" !== s.noSwipingClass,
            u = n.composedPath ? n.composedPath() : n.path;
          c && n.target && n.target.shadowRoot && u && (l = u[0]);
          const d = s.noSwipingSelector
              ? s.noSwipingSelector
              : `.${s.noSwipingClass}`,
            h = !(!n.target || !n.target.shadowRoot);
          if (
            s.noSwiping &&
            (h
              ? (function (e, t) {
                  return (
                    void 0 === t && (t = this),
                    (function t(r) {
                      if (!r || r === Et() || r === xt()) return null;
                      r.assignedSlot && (r = r.assignedSlot);
                      const n = r.closest(e);
                      return n || r.getRootNode
                        ? n || t(r.getRootNode().host)
                        : null;
                    })(t)
                  );
                })(d, l)
              : l.closest(d))
          )
            return void (t.allowClick = !0);
          if (s.swipeHandler && !l.closest(s.swipeHandler)) return;
          (o.currentX = n.pageX), (o.currentY = n.pageY);
          const p = o.currentX,
            f = o.currentY;
          if (!tr(t, n, p)) return;
          Object.assign(i, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
          }),
            (o.startX = p),
            (o.startY = f),
            (i.touchStartTime = Mt()),
            (t.allowClick = !0),
            t.updateSize(),
            (t.swipeDirection = void 0),
            s.threshold > 0 && (i.allowThresholdMove = !1);
          let m = !0;
          l.matches(i.focusableElements) &&
            ((m = !1), "SELECT" === l.nodeName && (i.isTouched = !1)),
            r.activeElement &&
              r.activeElement.matches(i.focusableElements) &&
              r.activeElement !== l &&
              r.activeElement.blur();
          const v = m && t.allowTouchMove && s.touchStartPreventDefault;
          (!s.touchStartForcePreventDefault && !v) ||
            l.isContentEditable ||
            n.preventDefault(),
            s.freeMode &&
              s.freeMode.enabled &&
              t.freeMode &&
              t.animating &&
              !s.cssMode &&
              t.freeMode.onTouchStart(),
            t.emit("touchStart", n);
        }
        function nr(e) {
          const t = Et(),
            r = this,
            n = r.touchEventsData,
            { params: i, touches: s, rtlTranslate: o, enabled: a } = r;
          if (!a) return;
          if (!i.simulateTouch && "mouse" === e.pointerType) return;
          let l,
            c = e;
          if (
            (c.originalEvent && (c = c.originalEvent), "pointermove" === c.type)
          ) {
            if (null !== n.touchId) return;
            if (c.pointerId !== n.pointerId) return;
          }
          if ("touchmove" === c.type) {
            if (
              ((l = [...c.changedTouches].filter(
                (e) => e.identifier === n.touchId
              )[0]),
              !l || l.identifier !== n.touchId)
            )
              return;
          } else l = c;
          if (!n.isTouched)
            return void (
              n.startMoving &&
              n.isScrolling &&
              r.emit("touchMoveOpposite", c)
            );
          const u = l.pageX,
            d = l.pageY;
          if (c.preventedByNestedSwiper)
            return (s.startX = u), void (s.startY = d);
          if (!r.allowTouchMove)
            return (
              c.target.matches(n.focusableElements) || (r.allowClick = !1),
              void (
                n.isTouched &&
                (Object.assign(s, {
                  startX: u,
                  startY: d,
                  currentX: u,
                  currentY: d,
                }),
                (n.touchStartTime = Mt()))
              )
            );
          if (i.touchReleaseOnEdges && !i.loop)
            if (r.isVertical()) {
              if (
                (d < s.startY && r.translate <= r.maxTranslate()) ||
                (d > s.startY && r.translate >= r.minTranslate())
              )
                return (n.isTouched = !1), void (n.isMoved = !1);
            } else if (
              (u < s.startX && r.translate <= r.maxTranslate()) ||
              (u > s.startX && r.translate >= r.minTranslate())
            )
              return;
          if (
            t.activeElement &&
            c.target === t.activeElement &&
            c.target.matches(n.focusableElements)
          )
            return (n.isMoved = !0), void (r.allowClick = !1);
          n.allowTouchCallbacks && r.emit("touchMove", c),
            (s.previousX = s.currentX),
            (s.previousY = s.currentY),
            (s.currentX = u),
            (s.currentY = d);
          const h = s.currentX - s.startX,
            p = s.currentY - s.startY;
          if (
            r.params.threshold &&
            Math.sqrt(h ** 2 + p ** 2) < r.params.threshold
          )
            return;
          if (void 0 === n.isScrolling) {
            let e;
            (r.isHorizontal() && s.currentY === s.startY) ||
            (r.isVertical() && s.currentX === s.startX)
              ? (n.isScrolling = !1)
              : h * h + p * p >= 25 &&
                ((e = (180 * Math.atan2(Math.abs(p), Math.abs(h))) / Math.PI),
                (n.isScrolling = r.isHorizontal()
                  ? e > i.touchAngle
                  : 90 - e > i.touchAngle));
          }
          if (
            (n.isScrolling && r.emit("touchMoveOpposite", c),
            void 0 === n.startMoving &&
              ((s.currentX === s.startX && s.currentY === s.startY) ||
                (n.startMoving = !0)),
            n.isScrolling)
          )
            return void (n.isTouched = !1);
          if (!n.startMoving) return;
          (r.allowClick = !1),
            !i.cssMode && c.cancelable && c.preventDefault(),
            i.touchMoveStopPropagation && !i.nested && c.stopPropagation();
          let f = r.isHorizontal() ? h : p,
            m = r.isHorizontal()
              ? s.currentX - s.previousX
              : s.currentY - s.previousY;
          i.oneWayMovement &&
            ((f = Math.abs(f) * (o ? 1 : -1)), (m = Math.abs(m) * (o ? 1 : -1))),
            (s.diff = f),
            (f *= i.touchRatio),
            o && ((f = -f), (m = -m));
          const v = r.touchesDirection;
          (r.swipeDirection = f > 0 ? "prev" : "next"),
            (r.touchesDirection = m > 0 ? "prev" : "next");
          const g = r.params.loop && !i.cssMode,
            y =
              ("next" === r.touchesDirection && r.allowSlideNext) ||
              ("prev" === r.touchesDirection && r.allowSlidePrev);
          if (!n.isMoved) {
            if (
              (g && y && r.loopFix({ direction: r.swipeDirection }),
              (n.startTranslate = r.getTranslate()),
              r.setTransition(0),
              r.animating)
            ) {
              const e = new window.CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0,
              });
              r.wrapperEl.dispatchEvent(e);
            }
            (n.allowMomentumBounce = !1),
              !i.grabCursor ||
                (!0 !== r.allowSlideNext && !0 !== r.allowSlidePrev) ||
                r.setGrabCursor(!0),
              r.emit("sliderFirstMove", c);
          }
          if (
            (new Date().getTime(),
            n.isMoved &&
              n.allowThresholdMove &&
              v !== r.touchesDirection &&
              g &&
              y &&
              Math.abs(f) >= 1)
          )
            return (
              Object.assign(s, {
                startX: u,
                startY: d,
                currentX: u,
                currentY: d,
                startTranslate: n.currentTranslate,
              }),
              (n.loopSwapReset = !0),
              void (n.startTranslate = n.currentTranslate)
            );
          r.emit("sliderMove", c),
            (n.isMoved = !0),
            (n.currentTranslate = f + n.startTranslate);
          let w = !0,
            b = i.resistanceRatio;
          if (
            (i.touchReleaseOnEdges && (b = 0),
            f > 0
              ? (g &&
                  y &&
                  n.allowThresholdMove &&
                  n.currentTranslate >
                    (i.centeredSlides
                      ? r.minTranslate() - r.slidesSizesGrid[r.activeIndex + 1]
                      : r.minTranslate()) &&
                  r.loopFix({
                    direction: "prev",
                    setTranslate: !0,
                    activeSlideIndex: 0,
                  }),
                n.currentTranslate > r.minTranslate() &&
                  ((w = !1),
                  i.resistance &&
                    (n.currentTranslate =
                      r.minTranslate() -
                      1 +
                      (-r.minTranslate() + n.startTranslate + f) ** b)))
              : f < 0 &&
                (g &&
                  y &&
                  n.allowThresholdMove &&
                  n.currentTranslate <
                    (i.centeredSlides
                      ? r.maxTranslate() +
                        r.slidesSizesGrid[r.slidesSizesGrid.length - 1]
                      : r.maxTranslate()) &&
                  r.loopFix({
                    direction: "next",
                    setTranslate: !0,
                    activeSlideIndex:
                      r.slides.length -
                      ("auto" === i.slidesPerView
                        ? r.slidesPerViewDynamic()
                        : Math.ceil(parseFloat(i.slidesPerView, 10))),
                  }),
                n.currentTranslate < r.maxTranslate() &&
                  ((w = !1),
                  i.resistance &&
                    (n.currentTranslate =
                      r.maxTranslate() +
                      1 -
                      (r.maxTranslate() - n.startTranslate - f) ** b))),
            w && (c.preventedByNestedSwiper = !0),
            !r.allowSlideNext &&
              "next" === r.swipeDirection &&
              n.currentTranslate < n.startTranslate &&
              (n.currentTranslate = n.startTranslate),
            !r.allowSlidePrev &&
              "prev" === r.swipeDirection &&
              n.currentTranslate > n.startTranslate &&
              (n.currentTranslate = n.startTranslate),
            r.allowSlidePrev ||
              r.allowSlideNext ||
              (n.currentTranslate = n.startTranslate),
            i.threshold > 0)
          ) {
            if (!(Math.abs(f) > i.threshold || n.allowThresholdMove))
              return void (n.currentTranslate = n.startTranslate);
            if (!n.allowThresholdMove)
              return (
                (n.allowThresholdMove = !0),
                (s.startX = s.currentX),
                (s.startY = s.currentY),
                (n.currentTranslate = n.startTranslate),
                void (s.diff = r.isHorizontal()
                  ? s.currentX - s.startX
                  : s.currentY - s.startY)
              );
          }
          i.followFinger &&
            !i.cssMode &&
            (((i.freeMode && i.freeMode.enabled && r.freeMode) ||
              i.watchSlidesProgress) &&
              (r.updateActiveIndex(), r.updateSlidesClasses()),
            i.freeMode &&
              i.freeMode.enabled &&
              r.freeMode &&
              r.freeMode.onTouchMove(),
            r.updateProgress(n.currentTranslate),
            r.setTranslate(n.currentTranslate));
        }
        function ir(e) {
          const t = this,
            r = t.touchEventsData;
          let n,
            i = e;
          i.originalEvent && (i = i.originalEvent);
          if ("touchend" === i.type || "touchcancel" === i.type) {
            if (
              ((n = [...i.changedTouches].filter(
                (e) => e.identifier === r.touchId
              )[0]),
              !n || n.identifier !== r.touchId)
            )
              return;
          } else {
            if (null !== r.touchId) return;
            if (i.pointerId !== r.pointerId) return;
            n = i;
          }
          if (
            [
              "pointercancel",
              "pointerout",
              "pointerleave",
              "contextmenu",
            ].includes(i.type)
          ) {
            if (
              !(
                ["pointercancel", "contextmenu"].includes(i.type) &&
                (t.browser.isSafari || t.browser.isWebView)
              )
            )
              return;
          }
          (r.pointerId = null), (r.touchId = null);
          const {
            params: s,
            touches: o,
            rtlTranslate: a,
            slidesGrid: l,
            enabled: c,
          } = t;
          if (!c) return;
          if (!s.simulateTouch && "mouse" === i.pointerType) return;
          if (
            (r.allowTouchCallbacks && t.emit("touchEnd", i),
            (r.allowTouchCallbacks = !1),
            !r.isTouched)
          )
            return (
              r.isMoved && s.grabCursor && t.setGrabCursor(!1),
              (r.isMoved = !1),
              void (r.startMoving = !1)
            );
          s.grabCursor &&
            r.isMoved &&
            r.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1);
          const u = Mt(),
            d = u - r.touchStartTime;
          if (t.allowClick) {
            const e = i.path || (i.composedPath && i.composedPath());
            t.updateClickedSlide((e && e[0]) || i.target, e),
              t.emit("tap click", i),
              d < 300 &&
                u - r.lastClickTime < 300 &&
                t.emit("doubleTap doubleClick", i);
          }
          if (
            ((r.lastClickTime = Mt()),
            kt(() => {
              t.destroyed || (t.allowClick = !0);
            }),
            !r.isTouched ||
              !r.isMoved ||
              !t.swipeDirection ||
              (0 === o.diff && !r.loopSwapReset) ||
              (r.currentTranslate === r.startTranslate && !r.loopSwapReset))
          )
            return (
              (r.isTouched = !1), (r.isMoved = !1), void (r.startMoving = !1)
            );
          let h;
          if (
            ((r.isTouched = !1),
            (r.isMoved = !1),
            (r.startMoving = !1),
            (h = s.followFinger
              ? a
                ? t.translate
                : -t.translate
              : -r.currentTranslate),
            s.cssMode)
          )
            return;
          if (s.freeMode && s.freeMode.enabled)
            return void t.freeMode.onTouchEnd({ currentPos: h });
          const p = h >= -t.maxTranslate() && !t.params.loop;
          let f = 0,
            m = t.slidesSizesGrid[0];
          for (
            let e = 0;
            e < l.length;
            e += e < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
          ) {
            const t = e < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
            void 0 !== l[e + t]
              ? (p || (h >= l[e] && h < l[e + t])) &&
                ((f = e), (m = l[e + t] - l[e]))
              : (p || h >= l[e]) &&
                ((f = e), (m = l[l.length - 1] - l[l.length - 2]));
          }
          let v = null,
            g = null;
          s.rewind &&
            (t.isBeginning
              ? (g =
                  s.virtual && s.virtual.enabled && t.virtual
                    ? t.virtual.slides.length - 1
                    : t.slides.length - 1)
              : t.isEnd && (v = 0));
          const y = (h - l[f]) / m,
            w = f < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
          if (d > s.longSwipesMs) {
            if (!s.longSwipes) return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection &&
              (y >= s.longSwipesRatio
                ? t.slideTo(s.rewind && t.isEnd ? v : f + w)
                : t.slideTo(f)),
              "prev" === t.swipeDirection &&
                (y > 1 - s.longSwipesRatio
                  ? t.slideTo(f + w)
                  : null !== g && y < 0 && Math.abs(y) > s.longSwipesRatio
                  ? t.slideTo(g)
                  : t.slideTo(f));
          } else {
            if (!s.shortSwipes) return void t.slideTo(t.activeIndex);
            t.navigation &&
            (i.target === t.navigation.nextEl || i.target === t.navigation.prevEl)
              ? i.target === t.navigation.nextEl
                ? t.slideTo(f + w)
                : t.slideTo(f)
              : ("next" === t.swipeDirection && t.slideTo(null !== v ? v : f + w),
                "prev" === t.swipeDirection && t.slideTo(null !== g ? g : f));
          }
        }
        function sr() {
          const e = this,
            { params: t, el: r } = e;
          if (r && 0 === r.offsetWidth) return;
          t.breakpoints && e.setBreakpoint();
          const { allowSlideNext: n, allowSlidePrev: i, snapGrid: s } = e,
            o = e.virtual && e.params.virtual.enabled;
          (e.allowSlideNext = !0),
            (e.allowSlidePrev = !0),
            e.updateSize(),
            e.updateSlides(),
            e.updateSlidesClasses();
          const a = o && t.loop;
          !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
          !e.isEnd ||
          e.isBeginning ||
          e.params.centeredSlides ||
          a
            ? e.params.loop && !o
              ? e.slideToLoop(e.realIndex, 0, !1, !0)
              : e.slideTo(e.activeIndex, 0, !1, !0)
            : e.slideTo(e.slides.length - 1, 0, !1, !0),
            e.autoplay &&
              e.autoplay.running &&
              e.autoplay.paused &&
              (clearTimeout(e.autoplay.resizeTimeout),
              (e.autoplay.resizeTimeout = setTimeout(() => {
                e.autoplay &&
                  e.autoplay.running &&
                  e.autoplay.paused &&
                  e.autoplay.resume();
              }, 500))),
            (e.allowSlidePrev = i),
            (e.allowSlideNext = n),
            e.params.watchOverflow && s !== e.snapGrid && e.checkOverflow();
        }
        function or(e) {
          const t = this;
          t.enabled &&
            (t.allowClick ||
              (t.params.preventClicks && e.preventDefault(),
              t.params.preventClicksPropagation &&
                t.animating &&
                (e.stopPropagation(), e.stopImmediatePropagation())));
        }
        function ar() {
          const e = this,
            { wrapperEl: t, rtlTranslate: r, enabled: n } = e;
          if (!n) return;
          let i;
          (e.previousTranslate = e.translate),
            e.isHorizontal()
              ? (e.translate = -t.scrollLeft)
              : (e.translate = -t.scrollTop),
            0 === e.translate && (e.translate = 0),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
          const s = e.maxTranslate() - e.minTranslate();
          (i = 0 === s ? 0 : (e.translate - e.minTranslate()) / s),
            i !== e.progress && e.updateProgress(r ? -e.translate : e.translate),
            e.emit("setTranslate", e.translate, !1);
        }
        function lr(e) {
          const t = this;
          Gt(t, e.target),
            t.params.cssMode ||
              ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
              t.update();
        }
        function cr() {
          const e = this;
          e.documentTouchHandlerProceeded ||
            ((e.documentTouchHandlerProceeded = !0),
            e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
        }
        const ur = (e, t) => {
          const r = Et(),
            { params: n, el: i, wrapperEl: s, device: o } = e,
            a = !!n.nested,
            l = "on" === t ? "addEventListener" : "removeEventListener",
            c = t;
          r[l]("touchstart", e.onDocumentTouchStart, { passive: !1, capture: a }),
            i[l]("touchstart", e.onTouchStart, { passive: !1 }),
            i[l]("pointerdown", e.onTouchStart, { passive: !1 }),
            r[l]("touchmove", e.onTouchMove, { passive: !1, capture: a }),
            r[l]("pointermove", e.onTouchMove, { passive: !1, capture: a }),
            r[l]("touchend", e.onTouchEnd, { passive: !0 }),
            r[l]("pointerup", e.onTouchEnd, { passive: !0 }),
            r[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
            r[l]("touchcancel", e.onTouchEnd, { passive: !0 }),
            r[l]("pointerout", e.onTouchEnd, { passive: !0 }),
            r[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
            r[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
            (n.preventClicks || n.preventClicksPropagation) &&
              i[l]("click", e.onClick, !0),
            n.cssMode && s[l]("scroll", e.onScroll),
            n.updateOnWindowResize
              ? e[c](
                  o.ios || o.android
                    ? "resize orientationchange observerUpdate"
                    : "resize observerUpdate",
                  sr,
                  !0
                )
              : e[c]("observerUpdate", sr, !0),
            i[l]("load", e.onLoad, { capture: !0 });
        };
        const dr = (e, t) => e.grid && t.grid && t.grid.rows > 1;
        var hr = {
          setBreakpoint: function () {
            const e = this,
              { realIndex: t, initialized: r, params: n, el: i } = e,
              s = n.breakpoints;
            if (!s || (s && 0 === Object.keys(s).length)) return;
            const o = e.getBreakpoint(s, e.params.breakpointsBase, e.el);
            if (!o || e.currentBreakpoint === o) return;
            const a = (o in s ? s[o] : void 0) || e.originalParams,
              l = dr(e, n),
              c = dr(e, a),
              u = n.enabled;
            l && !c
              ? (i.classList.remove(
                  `${n.containerModifierClass}grid`,
                  `${n.containerModifierClass}grid-column`
                ),
                e.emitContainerClasses())
              : !l &&
                c &&
                (i.classList.add(`${n.containerModifierClass}grid`),
                ((a.grid.fill && "column" === a.grid.fill) ||
                  (!a.grid.fill && "column" === n.grid.fill)) &&
                  i.classList.add(`${n.containerModifierClass}grid-column`),
                e.emitContainerClasses()),
              ["navigation", "pagination", "scrollbar"].forEach((t) => {
                if (void 0 === a[t]) return;
                const r = n[t] && n[t].enabled,
                  i = a[t] && a[t].enabled;
                r && !i && e[t].disable(), !r && i && e[t].enable();
              });
            const d = a.direction && a.direction !== n.direction,
              h = n.loop && (a.slidesPerView !== n.slidesPerView || d),
              p = n.loop;
            d && r && e.changeDirection(), Ct(e.params, a);
            const f = e.params.enabled,
              m = e.params.loop;
            Object.assign(e, {
              allowTouchMove: e.params.allowTouchMove,
              allowSlideNext: e.params.allowSlideNext,
              allowSlidePrev: e.params.allowSlidePrev,
            }),
              u && !f ? e.disable() : !u && f && e.enable(),
              (e.currentBreakpoint = o),
              e.emit("_beforeBreakpoint", a),
              r &&
                (h
                  ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                  : !p && m
                  ? (e.loopCreate(t), e.updateSlides())
                  : p && !m && e.loopDestroy()),
              e.emit("breakpoint", a);
          },
          getBreakpoint: function (e, t, r) {
            if ((void 0 === t && (t = "window"), !e || ("container" === t && !r)))
              return;
            let n = !1;
            const i = xt(),
              s = "window" === t ? i.innerHeight : r.clientHeight,
              o = Object.keys(e).map((e) => {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                  const t = parseFloat(e.substr(1));
                  return { value: s * t, point: e };
                }
                return { value: e, point: e };
              });
            o.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < o.length; e += 1) {
              const { point: s, value: a } = o[e];
              "window" === t
                ? i.matchMedia(`(min-width: ${a}px)`).matches && (n = s)
                : a <= r.clientWidth && (n = s);
            }
            return n || "max";
          },
        };
        var pr = {
          init: !0,
          direction: "horizontal",
          oneWayMovement: !1,
          swiperElementNodeName: "SWIPER-CONTAINER",
          touchEventsTarget: "wrapper",
          initialSlide: 0,
          speed: 300,
          cssMode: !1,
          updateOnWindowResize: !0,
          resizeObserver: !0,
          nested: !1,
          createElements: !1,
          eventsPrefix: "swiper",
          enabled: !0,
          focusableElements:
            "input, select, option, textarea, button, video, label",
          width: null,
          height: null,
          preventInteractionOnTransition: !1,
          userAgent: null,
          url: null,
          edgeSwipeDetection: !1,
          edgeSwipeThreshold: 20,
          autoHeight: !1,
          setWrapperSize: !1,
          virtualTranslate: !1,
          effect: "slide",
          breakpoints: void 0,
          breakpointsBase: "window",
          spaceBetween: 0,
          slidesPerView: 1,
          slidesPerGroup: 1,
          slidesPerGroupSkip: 0,
          slidesPerGroupAuto: !1,
          centeredSlides: !1,
          centeredSlidesBounds: !1,
          slidesOffsetBefore: 0,
          slidesOffsetAfter: 0,
          normalizeSlideIndex: !0,
          centerInsufficientSlides: !1,
          watchOverflow: !0,
          roundLengths: !1,
          touchRatio: 1,
          touchAngle: 45,
          simulateTouch: !0,
          shortSwipes: !0,
          longSwipes: !0,
          longSwipesRatio: 0.5,
          longSwipesMs: 300,
          followFinger: !0,
          allowTouchMove: !0,
          threshold: 5,
          touchMoveStopPropagation: !1,
          touchStartPreventDefault: !0,
          touchStartForcePreventDefault: !1,
          touchReleaseOnEdges: !1,
          uniqueNavElements: !0,
          resistance: !0,
          resistanceRatio: 0.85,
          watchSlidesProgress: !1,
          grabCursor: !1,
          preventClicks: !0,
          preventClicksPropagation: !0,
          slideToClickedSlide: !1,
          loop: !1,
          loopAddBlankSlides: !0,
          loopAdditionalSlides: 0,
          loopPreventsSliding: !0,
          rewind: !1,
          allowSlidePrev: !0,
          allowSlideNext: !0,
          swipeHandler: null,
          noSwiping: !0,
          noSwipingClass: "swiper-no-swiping",
          noSwipingSelector: null,
          passiveListeners: !0,
          maxBackfaceHiddenSlides: 10,
          containerModifierClass: "swiper-",
          slideClass: "swiper-slide",
          slideBlankClass: "swiper-slide-blank",
          slideActiveClass: "swiper-slide-active",
          slideVisibleClass: "swiper-slide-visible",
          slideFullyVisibleClass: "swiper-slide-fully-visible",
          slideNextClass: "swiper-slide-next",
          slidePrevClass: "swiper-slide-prev",
          wrapperClass: "swiper-wrapper",
          lazyPreloaderClass: "swiper-lazy-preloader",
          lazyPreloadPrevNext: 0,
          runCallbacksOnInit: !0,
          _emitClasses: !1,
        };
        function fr(e, t) {
          return function (r) {
            void 0 === r && (r = {});
            const n = Object.keys(r)[0],
              i = r[n];
            "object" == typeof i && null !== i
              ? (!0 === e[n] && (e[n] = { enabled: !0 }),
                "navigation" === n &&
                  e[n] &&
                  e[n].enabled &&
                  !e[n].prevEl &&
                  !e[n].nextEl &&
                  (e[n].auto = !0),
                ["pagination", "scrollbar"].indexOf(n) >= 0 &&
                  e[n] &&
                  e[n].enabled &&
                  !e[n].el &&
                  (e[n].auto = !0),
                n in e && "enabled" in i
                  ? ("object" != typeof e[n] ||
                      "enabled" in e[n] ||
                      (e[n].enabled = !0),
                    e[n] || (e[n] = { enabled: !1 }),
                    Ct(t, r))
                  : Ct(t, r))
              : Ct(t, r);
          };
        }
        const mr = {
            eventsEmitter: Wt,
            update: Kt,
            translate: Qt,
            transition: {
              setTransition: function (e, t) {
                const r = this;
                r.params.cssMode ||
                  ((r.wrapperEl.style.transitionDuration = `${e}ms`),
                  (r.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
                  r.emit("setTransition", e, t);
              },
              transitionStart: function (e, t) {
                void 0 === e && (e = !0);
                const r = this,
                  { params: n } = r;
                n.cssMode ||
                  (n.autoHeight && r.updateAutoHeight(),
                  Zt({
                    swiper: r,
                    runCallbacks: e,
                    direction: t,
                    step: "Start",
                  }));
              },
              transitionEnd: function (e, t) {
                void 0 === e && (e = !0);
                const r = this,
                  { params: n } = r;
                (r.animating = !1),
                  n.cssMode ||
                    (r.setTransition(0),
                    Zt({
                      swiper: r,
                      runCallbacks: e,
                      direction: t,
                      step: "End",
                    }));
              },
            },
            slide: Jt,
            loop: er,
            grabCursor: {
              setGrabCursor: function (e) {
                const t = this;
                if (
                  !t.params.simulateTouch ||
                  (t.params.watchOverflow && t.isLocked) ||
                  t.params.cssMode
                )
                  return;
                const r =
                  "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                t.isElement && (t.__preventObserver__ = !0),
                  (r.style.cursor = "move"),
                  (r.style.cursor = e ? "grabbing" : "grab"),
                  t.isElement &&
                    requestAnimationFrame(() => {
                      t.__preventObserver__ = !1;
                    });
              },
              unsetGrabCursor: function () {
                const e = this;
                (e.params.watchOverflow && e.isLocked) ||
                  e.params.cssMode ||
                  (e.isElement && (e.__preventObserver__ = !0),
                  (e[
                    "container" === e.params.touchEventsTarget
                      ? "el"
                      : "wrapperEl"
                  ].style.cursor = ""),
                  e.isElement &&
                    requestAnimationFrame(() => {
                      e.__preventObserver__ = !1;
                    }));
              },
            },
            events: {
              attachEvents: function () {
                const e = this,
                  { params: t } = e;
                (e.onTouchStart = rr.bind(e)),
                  (e.onTouchMove = nr.bind(e)),
                  (e.onTouchEnd = ir.bind(e)),
                  (e.onDocumentTouchStart = cr.bind(e)),
                  t.cssMode && (e.onScroll = ar.bind(e)),
                  (e.onClick = or.bind(e)),
                  (e.onLoad = lr.bind(e)),
                  ur(e, "on");
              },
              detachEvents: function () {
                ur(this, "off");
              },
            },
            breakpoints: hr,
            checkOverflow: {
              checkOverflow: function () {
                const e = this,
                  { isLocked: t, params: r } = e,
                  { slidesOffsetBefore: n } = r;
                if (n) {
                  const t = e.slides.length - 1,
                    r = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * n;
                  e.isLocked = e.size > r;
                } else e.isLocked = 1 === e.snapGrid.length;
                !0 === r.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                  !0 === r.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                  t && t !== e.isLocked && (e.isEnd = !1),
                  t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
              },
            },
            classes: {
              addClasses: function () {
                const e = this,
                  { classNames: t, params: r, rtl: n, el: i, device: s } = e,
                  o = (function (e, t) {
                    const r = [];
                    return (
                      e.forEach((e) => {
                        "object" == typeof e
                          ? Object.keys(e).forEach((n) => {
                              e[n] && r.push(t + n);
                            })
                          : "string" == typeof e && r.push(t + e);
                      }),
                      r
                    );
                  })(
                    [
                      "initialized",
                      r.direction,
                      { "free-mode": e.params.freeMode && r.freeMode.enabled },
                      { autoheight: r.autoHeight },
                      { rtl: n },
                      { grid: r.grid && r.grid.rows > 1 },
                      {
                        "grid-column":
                          r.grid && r.grid.rows > 1 && "column" === r.grid.fill,
                      },
                      { android: s.android },
                      { ios: s.ios },
                      { "css-mode": r.cssMode },
                      { centered: r.cssMode && r.centeredSlides },
                      { "watch-progress": r.watchSlidesProgress },
                    ],
                    r.containerModifierClass
                  );
                t.push(...o), i.classList.add(...t), e.emitContainerClasses();
              },
              removeClasses: function () {
                const { el: e, classNames: t } = this;
                e.classList.remove(...t), this.emitContainerClasses();
              },
            },
          },
          vr = {};
        class gr {
          constructor() {
            let e, t;
            for (var r = arguments.length, n = new Array(r), i = 0; i < r; i++)
              n[i] = arguments[i];
            1 === n.length &&
            n[0].constructor &&
            "Object" === Object.prototype.toString.call(n[0]).slice(8, -1)
              ? (t = n[0])
              : ([e, t] = n),
              t || (t = {}),
              (t = Ct({}, t)),
              e && !t.el && (t.el = e);
            const s = Et();
            if (
              t.el &&
              "string" == typeof t.el &&
              s.querySelectorAll(t.el).length > 1
            ) {
              const e = [];
              return (
                s.querySelectorAll(t.el).forEach((r) => {
                  const n = Ct({}, t, { el: r });
                  e.push(new gr(n));
                }),
                e
              );
            }
            const o = this;
            (o.__swiper__ = !0),
              (o.support = qt()),
              (o.device = Ut({ userAgent: t.userAgent })),
              (o.browser = Ht()),
              (o.eventsListeners = {}),
              (o.eventsAnyListeners = []),
              (o.modules = [...o.__modules__]),
              t.modules &&
                Array.isArray(t.modules) &&
                o.modules.push(...t.modules);
            const a = {};
            o.modules.forEach((e) => {
              e({
                params: t,
                swiper: o,
                extendParams: fr(t, a),
                on: o.on.bind(o),
                once: o.once.bind(o),
                off: o.off.bind(o),
                emit: o.emit.bind(o),
              });
            });
            const l = Ct({}, pr, a);
            return (
              (o.params = Ct({}, l, vr, t)),
              (o.originalParams = Ct({}, o.params)),
              (o.passedParams = Ct({}, t)),
              o.params &&
                o.params.on &&
                Object.keys(o.params.on).forEach((e) => {
                  o.on(e, o.params.on[e]);
                }),
              o.params && o.params.onAny && o.onAny(o.params.onAny),
              Object.assign(o, {
                enabled: o.params.enabled,
                el: e,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal() {
                  return "horizontal" === o.params.direction;
                },
                isVertical() {
                  return "vertical" === o.params.direction;
                },
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                  return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
                },
                allowSlideNext: o.params.allowSlideNext,
                allowSlidePrev: o.params.allowSlidePrev,
                touchEventsData: {
                  isTouched: void 0,
                  isMoved: void 0,
                  allowTouchCallbacks: void 0,
                  touchStartTime: void 0,
                  isScrolling: void 0,
                  currentTranslate: void 0,
                  startTranslate: void 0,
                  allowThresholdMove: void 0,
                  focusableElements: o.params.focusableElements,
                  lastClickTime: 0,
                  clickTimeout: void 0,
                  velocities: [],
                  allowMomentumBounce: void 0,
                  startMoving: void 0,
                  pointerId: null,
                  touchId: null,
                },
                allowClick: !0,
                allowTouchMove: o.params.allowTouchMove,
                touches: {
                  startX: 0,
                  startY: 0,
                  currentX: 0,
                  currentY: 0,
                  diff: 0,
                },
                imagesToLoad: [],
                imagesLoaded: 0,
              }),
              o.emit("_swiper"),
              o.params.init && o.init(),
              o
            );
          }
          getDirectionLabel(e) {
            return this.isHorizontal()
              ? e
              : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
                }[e];
          }
          getSlideIndex(e) {
            const { slidesEl: t, params: r } = this,
              n = Ft(Lt(t, `.${r.slideClass}, swiper-slide`)[0]);
            return Ft(e) - n;
          }
          getSlideIndexByData(e) {
            return this.getSlideIndex(
              this.slides.filter(
                (t) => 1 * t.getAttribute("data-swiper-slide-index") === e
              )[0]
            );
          }
          recalcSlides() {
            const { slidesEl: e, params: t } = this;
            this.slides = Lt(e, `.${t.slideClass}, swiper-slide`);
          }
          enable() {
            const e = this;
            e.enabled ||
              ((e.enabled = !0),
              e.params.grabCursor && e.setGrabCursor(),
              e.emit("enable"));
          }
          disable() {
            const e = this;
            e.enabled &&
              ((e.enabled = !1),
              e.params.grabCursor && e.unsetGrabCursor(),
              e.emit("disable"));
          }
          setProgress(e, t) {
            const r = this;
            e = Math.min(Math.max(e, 0), 1);
            const n = r.minTranslate(),
              i = (r.maxTranslate() - n) * e + n;
            r.translateTo(i, void 0 === t ? 0 : t),
              r.updateActiveIndex(),
              r.updateSlidesClasses();
          }
          emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = e.el.className
              .split(" ")
              .filter(
                (t) =>
                  0 === t.indexOf("swiper") ||
                  0 === t.indexOf(e.params.containerModifierClass)
              );
            e.emit("_containerClasses", t.join(" "));
          }
          getSlideClasses(e) {
            const t = this;
            return t.destroyed
              ? ""
              : e.className
                  .split(" ")
                  .filter(
                    (e) =>
                      0 === e.indexOf("swiper-slide") ||
                      0 === e.indexOf(t.params.slideClass)
                  )
                  .join(" ");
          }
          emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el) return;
            const t = [];
            e.slides.forEach((r) => {
              const n = e.getSlideClasses(r);
              t.push({ slideEl: r, classNames: n }), e.emit("_slideClass", r, n);
            }),
              e.emit("_slideClasses", t);
          }
          slidesPerViewDynamic(e, t) {
            void 0 === e && (e = "current"), void 0 === t && (t = !1);
            const {
              params: r,
              slides: n,
              slidesGrid: i,
              slidesSizesGrid: s,
              size: o,
              activeIndex: a,
            } = this;
            let l = 1;
            if ("number" == typeof r.slidesPerView) return r.slidesPerView;
            if (r.centeredSlides) {
              let e,
                t = n[a] ? Math.ceil(n[a].swiperSlideSize) : 0;
              for (let r = a + 1; r < n.length; r += 1)
                n[r] &&
                  !e &&
                  ((t += Math.ceil(n[r].swiperSlideSize)),
                  (l += 1),
                  t > o && (e = !0));
              for (let r = a - 1; r >= 0; r -= 1)
                n[r] &&
                  !e &&
                  ((t += n[r].swiperSlideSize), (l += 1), t > o && (e = !0));
            } else if ("current" === e)
              for (let e = a + 1; e < n.length; e += 1) {
                (t ? i[e] + s[e] - i[a] < o : i[e] - i[a] < o) && (l += 1);
              }
            else
              for (let e = a - 1; e >= 0; e -= 1) {
                i[a] - i[e] < o && (l += 1);
              }
            return l;
          }
          update() {
            const e = this;
            if (!e || e.destroyed) return;
            const { snapGrid: t, params: r } = e;
            function n() {
              const t = e.rtlTranslate ? -1 * e.translate : e.translate,
                r = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
              e.setTranslate(r), e.updateActiveIndex(), e.updateSlidesClasses();
            }
            let i;
            if (
              (r.breakpoints && e.setBreakpoint(),
              [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
                t.complete && Gt(e, t);
              }),
              e.updateSize(),
              e.updateSlides(),
              e.updateProgress(),
              e.updateSlidesClasses(),
              r.freeMode && r.freeMode.enabled && !r.cssMode)
            )
              n(), r.autoHeight && e.updateAutoHeight();
            else {
              if (
                ("auto" === r.slidesPerView || r.slidesPerView > 1) &&
                e.isEnd &&
                !r.centeredSlides
              ) {
                const t =
                  e.virtual && r.virtual.enabled ? e.virtual.slides : e.slides;
                i = e.slideTo(t.length - 1, 0, !1, !0);
              } else i = e.slideTo(e.activeIndex, 0, !1, !0);
              i || n();
            }
            r.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
              e.emit("update");
          }
          changeDirection(e, t) {
            void 0 === t && (t = !0);
            const r = this,
              n = r.params.direction;
            return (
              e || (e = "horizontal" === n ? "vertical" : "horizontal"),
              e === n ||
                ("horizontal" !== e && "vertical" !== e) ||
                (r.el.classList.remove(`${r.params.containerModifierClass}${n}`),
                r.el.classList.add(`${r.params.containerModifierClass}${e}`),
                r.emitContainerClasses(),
                (r.params.direction = e),
                r.slides.forEach((t) => {
                  "vertical" === e ? (t.style.width = "") : (t.style.height = "");
                }),
                r.emit("changeDirection"),
                t && r.update()),
              r
            );
          }
          changeLanguageDirection(e) {
            const t = this;
            (t.rtl && "rtl" === e) ||
              (!t.rtl && "ltr" === e) ||
              ((t.rtl = "rtl" === e),
              (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
              t.rtl
                ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
                  (t.el.dir = "rtl"))
                : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
                  (t.el.dir = "ltr")),
              t.update());
          }
          mount(e) {
            const t = this;
            if (t.mounted) return !0;
            let r = e || t.params.el;
            if (("string" == typeof r && (r = document.querySelector(r)), !r))
              return !1;
            (r.swiper = t),
              r.parentNode &&
                r.parentNode.host &&
                r.parentNode.host.nodeName ===
                  t.params.swiperElementNodeName.toUpperCase() &&
                (t.isElement = !0);
            const n = () =>
              `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
            let i = (() => {
              if (r && r.shadowRoot && r.shadowRoot.querySelector) {
                return r.shadowRoot.querySelector(n());
              }
              return Lt(r, n())[0];
            })();
            return (
              !i &&
                t.params.createElements &&
                ((i = zt("div", t.params.wrapperClass)),
                r.append(i),
                Lt(r, `.${t.params.slideClass}`).forEach((e) => {
                  i.append(e);
                })),
              Object.assign(t, {
                el: r,
                wrapperEl: i,
                slidesEl:
                  t.isElement && !r.parentNode.host.slideSlots
                    ? r.parentNode.host
                    : i,
                hostEl: t.isElement ? r.parentNode.host : r,
                mounted: !0,
                rtl:
                  "rtl" === r.dir.toLowerCase() || "rtl" === Dt(r, "direction"),
                rtlTranslate:
                  "horizontal" === t.params.direction &&
                  ("rtl" === r.dir.toLowerCase() || "rtl" === Dt(r, "direction")),
                wrongRTL: "-webkit-box" === Dt(i, "display"),
              }),
              !0
            );
          }
          init(e) {
            const t = this;
            if (t.initialized) return t;
            if (!1 === t.mount(e)) return t;
            t.emit("beforeInit"),
              t.params.breakpoints && t.setBreakpoint(),
              t.addClasses(),
              t.updateSize(),
              t.updateSlides(),
              t.params.watchOverflow && t.checkOverflow(),
              t.params.grabCursor && t.enabled && t.setGrabCursor(),
              t.params.loop && t.virtual && t.params.virtual.enabled
                ? t.slideTo(
                    t.params.initialSlide + t.virtual.slidesBefore,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  )
                : t.slideTo(
                    t.params.initialSlide,
                    0,
                    t.params.runCallbacksOnInit,
                    !1,
                    !0
                  ),
              t.params.loop && t.loopCreate(),
              t.attachEvents();
            const r = [...t.el.querySelectorAll('[loading="lazy"]')];
            return (
              t.isElement &&
                r.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
              r.forEach((e) => {
                e.complete
                  ? Gt(t, e)
                  : e.addEventListener("load", (e) => {
                      Gt(t, e.target);
                    });
              }),
              Xt(t),
              (t.initialized = !0),
              Xt(t),
              t.emit("init"),
              t.emit("afterInit"),
              t
            );
          }
          destroy(e, t) {
            void 0 === e && (e = !0), void 0 === t && (t = !0);
            const r = this,
              { params: n, el: i, wrapperEl: s, slides: o } = r;
            return (
              void 0 === r.params ||
                r.destroyed ||
                (r.emit("beforeDestroy"),
                (r.initialized = !1),
                r.detachEvents(),
                n.loop && r.loopDestroy(),
                t &&
                  (r.removeClasses(),
                  i.removeAttribute("style"),
                  s.removeAttribute("style"),
                  o &&
                    o.length &&
                    o.forEach((e) => {
                      e.classList.remove(
                        n.slideVisibleClass,
                        n.slideFullyVisibleClass,
                        n.slideActiveClass,
                        n.slideNextClass,
                        n.slidePrevClass
                      ),
                        e.removeAttribute("style"),
                        e.removeAttribute("data-swiper-slide-index");
                    })),
                r.emit("destroy"),
                Object.keys(r.eventsListeners).forEach((e) => {
                  r.off(e);
                }),
                !1 !== e &&
                  ((r.el.swiper = null),
                  (function (e) {
                    const t = e;
                    Object.keys(t).forEach((e) => {
                      try {
                        t[e] = null;
                      } catch (e) {}
                      try {
                        delete t[e];
                      } catch (e) {}
                    });
                  })(r)),
                (r.destroyed = !0)),
              null
            );
          }
          static extendDefaults(e) {
            Ct(vr, e);
          }
          static get extendedDefaults() {
            return vr;
          }
          static get defaults() {
            return pr;
          }
          static installModule(e) {
            gr.prototype.__modules__ || (gr.prototype.__modules__ = []);
            const t = gr.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
          }
          static use(e) {
            return Array.isArray(e)
              ? (e.forEach((e) => gr.installModule(e)), gr)
              : (gr.installModule(e), gr);
          }
        }
        function yr(e) {
          let { swiper: t, extendParams: r, on: n, emit: i } = e;
          function s(e) {
            let r;
            return e &&
              "string" == typeof e &&
              t.isElement &&
              ((r = t.el.querySelector(e)), r)
              ? r
              : (e &&
                  ("string" == typeof e &&
                    (r = [...document.querySelectorAll(e)]),
                  t.params.uniqueNavElements &&
                    "string" == typeof e &&
                    r.length > 1 &&
                    1 === t.el.querySelectorAll(e).length &&
                    (r = t.el.querySelector(e))),
                e && !r ? e : r);
          }
          function o(e, r) {
            const n = t.params.navigation;
            (e = Nt(e)).forEach((e) => {
              e &&
                (e.classList[r ? "add" : "remove"](...n.disabledClass.split(" ")),
                "BUTTON" === e.tagName && (e.disabled = r),
                t.params.watchOverflow &&
                  t.enabled &&
                  e.classList[t.isLocked ? "add" : "remove"](n.lockClass));
            });
          }
          function a() {
            const { nextEl: e, prevEl: r } = t.navigation;
            if (t.params.loop) return o(r, !1), void o(e, !1);
            o(r, t.isBeginning && !t.params.rewind),
              o(e, t.isEnd && !t.params.rewind);
          }
          function l(e) {
            e.preventDefault(),
              (!t.isBeginning || t.params.loop || t.params.rewind) &&
                (t.slidePrev(), i("navigationPrev"));
          }
          function c(e) {
            e.preventDefault(),
              (!t.isEnd || t.params.loop || t.params.rewind) &&
                (t.slideNext(), i("navigationNext"));
          }
          function u() {
            const e = t.params.navigation;
            if (
              ((t.params.navigation = (function (e, t, r, n) {
                return (
                  e.params.createElements &&
                    Object.keys(n).forEach((i) => {
                      if (!r[i] && !0 === r.auto) {
                        let s = Lt(e.el, `.${n[i]}`)[0];
                        s ||
                          ((s = zt("div", n[i])),
                          (s.className = n[i]),
                          e.el.append(s)),
                          (r[i] = s),
                          (t[i] = s);
                      }
                    }),
                  r
                );
              })(t, t.originalParams.navigation, t.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev",
              })),
              !e.nextEl && !e.prevEl)
            )
              return;
            let r = s(e.nextEl),
              n = s(e.prevEl);
            Object.assign(t.navigation, { nextEl: r, prevEl: n }),
              (r = Nt(r)),
              (n = Nt(n));
            const i = (r, n) => {
              r && r.addEventListener("click", "next" === n ? c : l),
                !t.enabled && r && r.classList.add(...e.lockClass.split(" "));
            };
            r.forEach((e) => i(e, "next")), n.forEach((e) => i(e, "prev"));
          }
          function d() {
            let { nextEl: e, prevEl: r } = t.navigation;
            (e = Nt(e)), (r = Nt(r));
            const n = (e, r) => {
              e.removeEventListener("click", "next" === r ? c : l),
                e.classList.remove(
                  ...t.params.navigation.disabledClass.split(" ")
                );
            };
            e.forEach((e) => n(e, "next")), r.forEach((e) => n(e, "prev"));
          }
          r({
            navigation: {
              nextEl: null,
              prevEl: null,
              hideOnClick: !1,
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
              lockClass: "swiper-button-lock",
              navigationDisabledClass: "swiper-navigation-disabled",
            },
          }),
            (t.navigation = { nextEl: null, prevEl: null }),
            n("init", () => {
              !1 === t.params.navigation.enabled ? h() : (u(), a());
            }),
            n("toEdge fromEdge lock unlock", () => {
              a();
            }),
            n("destroy", () => {
              d();
            }),
            n("enable disable", () => {
              let { nextEl: e, prevEl: r } = t.navigation;
              (e = Nt(e)),
                (r = Nt(r)),
                t.enabled
                  ? a()
                  : [...e, ...r]
                      .filter((e) => !!e)
                      .forEach((e) =>
                        e.classList.add(t.params.navigation.lockClass)
                      );
            }),
            n("click", (e, r) => {
              let { nextEl: n, prevEl: s } = t.navigation;
              (n = Nt(n)), (s = Nt(s));
              const o = r.target;
              if (
                t.params.navigation.hideOnClick &&
                !s.includes(o) &&
                !n.includes(o)
              ) {
                if (
                  t.pagination &&
                  t.params.pagination &&
                  t.params.pagination.clickable &&
                  (t.pagination.el === o || t.pagination.el.contains(o))
                )
                  return;
                let e;
                n.length
                  ? (e = n[0].classList.contains(t.params.navigation.hiddenClass))
                  : s.length &&
                    (e = s[0].classList.contains(
                      t.params.navigation.hiddenClass
                    )),
                  i(!0 === e ? "navigationShow" : "navigationHide"),
                  [...n, ...s]
                    .filter((e) => !!e)
                    .forEach((e) =>
                      e.classList.toggle(t.params.navigation.hiddenClass)
                    );
              }
            });
          const h = () => {
            t.el.classList.add(
              ...t.params.navigation.navigationDisabledClass.split(" ")
            ),
              d();
          };
          Object.assign(t.navigation, {
            enable: () => {
              t.el.classList.remove(
                ...t.params.navigation.navigationDisabledClass.split(" ")
              ),
                u(),
                a();
            },
            disable: h,
            update: a,
            init: u,
            destroy: d,
          });
        }
        Object.keys(mr).forEach((e) => {
          Object.keys(mr[e]).forEach((t) => {
            gr.prototype[t] = mr[e][t];
          });
        }),
          gr.use([
            function (e) {
              let { swiper: t, on: r, emit: n } = e;
              const i = xt();
              let s = null,
                o = null;
              const a = () => {
                  t &&
                    !t.destroyed &&
                    t.initialized &&
                    (n("beforeResize"), n("resize"));
                },
                l = () => {
                  t && !t.destroyed && t.initialized && n("orientationchange");
                };
              r("init", () => {
                t.params.resizeObserver && void 0 !== i.ResizeObserver
                  ? t &&
                    !t.destroyed &&
                    t.initialized &&
                    ((s = new ResizeObserver((e) => {
                      o = i.requestAnimationFrame(() => {
                        const { width: r, height: n } = t;
                        let i = r,
                          s = n;
                        e.forEach((e) => {
                          let {
                            contentBoxSize: r,
                            contentRect: n,
                            target: o,
                          } = e;
                          (o && o !== t.el) ||
                            ((i = n ? n.width : (r[0] || r).inlineSize),
                            (s = n ? n.height : (r[0] || r).blockSize));
                        }),
                          (i === r && s === n) || a();
                      });
                    })),
                    s.observe(t.el))
                  : (i.addEventListener("resize", a),
                    i.addEventListener("orientationchange", l));
              }),
                r("destroy", () => {
                  o && i.cancelAnimationFrame(o),
                    s && s.unobserve && t.el && (s.unobserve(t.el), (s = null)),
                    i.removeEventListener("resize", a),
                    i.removeEventListener("orientationchange", l);
                });
            },
            function (e) {
              let { swiper: t, extendParams: r, on: n, emit: i } = e;
              const s = [],
                o = xt(),
                a = function (e, r) {
                  void 0 === r && (r = {});
                  const n = new (o.MutationObserver || o.WebkitMutationObserver)(
                    (e) => {
                      if (t.__preventObserver__) return;
                      if (1 === e.length) return void i("observerUpdate", e[0]);
                      const r = function () {
                        i("observerUpdate", e[0]);
                      };
                      o.requestAnimationFrame
                        ? o.requestAnimationFrame(r)
                        : o.setTimeout(r, 0);
                    }
                  );
                  n.observe(e, {
                    attributes: void 0 === r.attributes || r.attributes,
                    childList: void 0 === r.childList || r.childList,
                    characterData: void 0 === r.characterData || r.characterData,
                  }),
                    s.push(n);
                };
              r({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
                n("init", () => {
                  if (t.params.observer) {
                    if (t.params.observeParents) {
                      const e = (function (e, t) {
                        const r = [];
                        let n = e.parentElement;
                        for (; n; )
                          t ? n.matches(t) && r.push(n) : r.push(n),
                            (n = n.parentElement);
                        return r;
                      })(t.hostEl);
                      for (let t = 0; t < e.length; t += 1) a(e[t]);
                    }
                    a(t.hostEl, { childList: t.params.observeSlideChildren }),
                      a(t.wrapperEl, { attributes: !1 });
                  }
                }),
                n("destroy", () => {
                  s.forEach((e) => {
                    e.disconnect();
                  }),
                    s.splice(0, s.length);
                });
            },
          ]);
        var wr = class extends d {
          constructor(e) {
            super(e),
              (this.$el = this.el),
              (this.$swiper = this.$("swiper")[0]),
              (this.$prev = this.$("prev")[0]),
              (this.$next = this.$("next")[0]);
          }
          init() {
            gr.use([yr]),
              (this.swiper = new gr(this.$swiper, {
                speed: 600,
                spaceBetween: 0,
                slideClass: "w-embed",
                slidesPerView: "auto",
                navigation: { nextEl: this.$next, prevEl: this.$prev },
              }));
          }
          destroy() {
            super.destroy();
          }
        };
        function br(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function _r(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? br(Object(r), !0).forEach(function (t) {
                  Pr(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : br(Object(r)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(r, t)
                  );
                });
          }
          return e;
        }
        function Tr() {
          Tr = function () {
            return e;
          };
          var e = {},
            t = Object.prototype,
            r = t.hasOwnProperty,
            n =
              Object.defineProperty ||
              function (e, t, r) {
                e[t] = r.value;
              },
            i = "function" == typeof Symbol ? Symbol : {},
            s = i.iterator || "@@iterator",
            o = i.asyncIterator || "@@asyncIterator",
            a = i.toStringTag || "@@toStringTag";
          function l(e, t, r) {
            return (
              Object.defineProperty(e, t, {
                value: r,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              e[t]
            );
          }
          try {
            l({}, "");
          } catch (e) {
            l = function (e, t, r) {
              return (e[t] = r);
            };
          }
          function c(e, t, r, i) {
            var s = t && t.prototype instanceof h ? t : h,
              o = Object.create(s.prototype),
              a = new x(i || []);
            return n(o, "_invoke", { value: _(e, r, a) }), o;
          }
          function u(e, t, r) {
            try {
              return { type: "normal", arg: e.call(t, r) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          e.wrap = c;
          var d = {};
          function h() {}
          function p() {}
          function f() {}
          var m = {};
          l(m, s, function () {
            return this;
          });
          var v = Object.getPrototypeOf,
            g = v && v(v(k([])));
          g && g !== t && r.call(g, s) && (m = g);
          var y = (f.prototype = h.prototype = Object.create(m));
          function w(e) {
            ["next", "throw", "return"].forEach(function (t) {
              l(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function b(e, t) {
            function i(n, s, o, a) {
              var l = u(e[n], e, s);
              if ("throw" !== l.type) {
                var c = l.arg,
                  d = c.value;
                return d && "object" == typeof d && r.call(d, "__await")
                  ? t.resolve(d.__await).then(
                      function (e) {
                        i("next", e, o, a);
                      },
                      function (e) {
                        i("throw", e, o, a);
                      }
                    )
                  : t.resolve(d).then(
                      function (e) {
                        (c.value = e), o(c);
                      },
                      function (e) {
                        return i("throw", e, o, a);
                      }
                    );
              }
              a(l.arg);
            }
            var s;
            n(this, "_invoke", {
              value: function (e, r) {
                function n() {
                  return new t(function (t, n) {
                    i(e, r, t, n);
                  });
                }
                return (s = s ? s.then(n, n) : n());
              },
            });
          }
          function _(e, t, r) {
            var n = "suspendedStart";
            return function (i, s) {
              if ("executing" === n)
                throw new Error("Generator is already running");
              if ("completed" === n) {
                if ("throw" === i) throw s;
                return M();
              }
              for (r.method = i, r.arg = s; ; ) {
                var o = r.delegate;
                if (o) {
                  var a = T(o, r);
                  if (a) {
                    if (a === d) continue;
                    return a;
                  }
                }
                if ("next" === r.method) r.sent = r._sent = r.arg;
                else if ("throw" === r.method) {
                  if ("suspendedStart" === n) throw ((n = "completed"), r.arg);
                  r.dispatchException(r.arg);
                } else "return" === r.method && r.abrupt("return", r.arg);
                n = "executing";
                var l = u(e, t, r);
                if ("normal" === l.type) {
                  if (
                    ((n = r.done ? "completed" : "suspendedYield"), l.arg === d)
                  )
                    continue;
                  return { value: l.arg, done: r.done };
                }
                "throw" === l.type &&
                  ((n = "completed"), (r.method = "throw"), (r.arg = l.arg));
              }
            };
          }
          function T(e, t) {
            var r = t.method,
              n = e.iterator[r];
            if (void 0 === n)
              return (
                (t.delegate = null),
                ("throw" === r &&
                  e.iterator.return &&
                  ((t.method = "return"),
                  (t.arg = void 0),
                  T(e, t),
                  "throw" === t.method)) ||
                  ("return" !== r &&
                    ((t.method = "throw"),
                    (t.arg = new TypeError(
                      "The iterator does not provide a '" + r + "' method"
                    )))),
                d
              );
            var i = u(n, e.iterator, t.arg);
            if ("throw" === i.type)
              return (
                (t.method = "throw"), (t.arg = i.arg), (t.delegate = null), d
              );
            var s = i.arg;
            return s
              ? s.done
                ? ((t[e.resultName] = s.value),
                  (t.next = e.nextLoc),
                  "return" !== t.method &&
                    ((t.method = "next"), (t.arg = void 0)),
                  (t.delegate = null),
                  d)
                : s
              : ((t.method = "throw"),
                (t.arg = new TypeError("iterator result is not an object")),
                (t.delegate = null),
                d);
          }
          function E(e) {
            var t = { tryLoc: e[0] };
            1 in e && (t.catchLoc = e[1]),
              2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
              this.tryEntries.push(t);
          }
          function S(e) {
            var t = e.completion || {};
            (t.type = "normal"), delete t.arg, (e.completion = t);
          }
          function x(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(E, this),
              this.reset(!0);
          }
          function k(e) {
            if (e) {
              var t = e[s];
              if (t) return t.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var n = -1,
                  i = function t() {
                    for (; ++n < e.length; )
                      if (r.call(e, n)) return (t.value = e[n]), (t.done = !1), t;
                    return (t.value = void 0), (t.done = !0), t;
                  };
                return (i.next = i);
              }
            }
            return { next: M };
          }
          function M() {
            return { value: void 0, done: !0 };
          }
          return (
            (p.prototype = f),
            n(y, "constructor", { value: f, configurable: !0 }),
            n(f, "constructor", { value: p, configurable: !0 }),
            (p.displayName = l(f, a, "GeneratorFunction")),
            (e.isGeneratorFunction = function (e) {
              var t = "function" == typeof e && e.constructor;
              return (
                !!t &&
                (t === p || "GeneratorFunction" === (t.displayName || t.name))
              );
            }),
            (e.mark = function (e) {
              return (
                Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, f)
                  : ((e.__proto__ = f), l(e, a, "GeneratorFunction")),
                (e.prototype = Object.create(y)),
                e
              );
            }),
            (e.awrap = function (e) {
              return { __await: e };
            }),
            w(b.prototype),
            l(b.prototype, o, function () {
              return this;
            }),
            (e.AsyncIterator = b),
            (e.async = function (t, r, n, i, s) {
              void 0 === s && (s = Promise);
              var o = new b(c(t, r, n, i), s);
              return e.isGeneratorFunction(r)
                ? o
                : o.next().then(function (e) {
                    return e.done ? e.value : o.next();
                  });
            }),
            w(y),
            l(y, a, "Generator"),
            l(y, s, function () {
              return this;
            }),
            l(y, "toString", function () {
              return "[object Generator]";
            }),
            (e.keys = function (e) {
              var t = Object(e),
                r = [];
              for (var n in t) r.push(n);
              return (
                r.reverse(),
                function e() {
                  for (; r.length; ) {
                    var n = r.pop();
                    if (n in t) return (e.value = n), (e.done = !1), e;
                  }
                  return (e.done = !0), e;
                }
              );
            }),
            (e.values = k),
            (x.prototype = {
              constructor: x,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = void 0),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = void 0),
                  this.tryEntries.forEach(S),
                  !e)
                )
                  for (var t in this)
                    "t" === t.charAt(0) &&
                      r.call(this, t) &&
                      !isNaN(+t.slice(1)) &&
                      (this[t] = void 0);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var t = this;
                function n(r, n) {
                  return (
                    (o.type = "throw"),
                    (o.arg = e),
                    (t.next = r),
                    n && ((t.method = "next"), (t.arg = void 0)),
                    !!n
                  );
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                  var s = this.tryEntries[i],
                    o = s.completion;
                  if ("root" === s.tryLoc) return n("end");
                  if (s.tryLoc <= this.prev) {
                    var a = r.call(s, "catchLoc"),
                      l = r.call(s, "finallyLoc");
                    if (a && l) {
                      if (this.prev < s.catchLoc) return n(s.catchLoc, !0);
                      if (this.prev < s.finallyLoc) return n(s.finallyLoc);
                    } else if (a) {
                      if (this.prev < s.catchLoc) return n(s.catchLoc, !0);
                    } else {
                      if (!l)
                        throw new Error("try statement without catch or finally");
                      if (this.prev < s.finallyLoc) return n(s.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, t) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var i = this.tryEntries[n];
                  if (
                    i.tryLoc <= this.prev &&
                    r.call(i, "finallyLoc") &&
                    this.prev < i.finallyLoc
                  ) {
                    var s = i;
                    break;
                  }
                }
                s &&
                  ("break" === e || "continue" === e) &&
                  s.tryLoc <= t &&
                  t <= s.finallyLoc &&
                  (s = null);
                var o = s ? s.completion : {};
                return (
                  (o.type = e),
                  (o.arg = t),
                  s
                    ? ((this.method = "next"), (this.next = s.finallyLoc), d)
                    : this.complete(o)
                );
              },
              complete: function (e, t) {
                if ("throw" === e.type) throw e.arg;
                return (
                  "break" === e.type || "continue" === e.type
                    ? (this.next = e.arg)
                    : "return" === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === e.type && t && (this.next = t),
                  d
                );
              },
              finish: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r.finallyLoc === e)
                    return this.complete(r.completion, r.afterLoc), S(r), d;
                }
              },
              catch: function (e) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var r = this.tryEntries[t];
                  if (r.tryLoc === e) {
                    var n = r.completion;
                    if ("throw" === n.type) {
                      var i = n.arg;
                      S(r);
                    }
                    return i;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (e, t, r) {
                return (
                  (this.delegate = { iterator: k(e), resultName: t, nextLoc: r }),
                  "next" === this.method && (this.arg = void 0),
                  d
                );
              },
            }),
            e
          );
        }
        function Er(e, t, r, n, i, s, o) {
          try {
            var a = e[s](o),
              l = a.value;
          } catch (e) {
            return void r(e);
          }
          a.done ? t(l) : Promise.resolve(l).then(n, i);
        }
        function Sr(e) {
          return function () {
            var t = this,
              r = arguments;
            return new Promise(function (n, i) {
              var s = e.apply(t, r);
              function o(e) {
                Er(s, n, i, o, a, "next", e);
              }
              function a(e) {
                Er(s, n, i, o, a, "throw", e);
              }
              o(void 0);
            });
          };
        }
        function xr(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function kr(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, Dr(n.key), n);
          }
        }
        function Mr(e, t, r) {
          return (
            t && kr(e.prototype, t),
            r && kr(e, r),
            Object.defineProperty(e, "prototype", { writable: !1 }),
            e
          );
        }
        function Pr(e, t, r) {
          return (
            (t = Dr(t)) in e
              ? Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0,
                })
              : (e[t] = r),
            e
          );
        }
        function Or(e) {
          return (
            (Or = Object.setPrototypeOf
              ? Object.getPrototypeOf.bind()
              : function (e) {
                  return e.__proto__ || Object.getPrototypeOf(e);
                }),
            Or(e)
          );
        }
        function Cr(e, t) {
          return (
            (Cr = Object.setPrototypeOf
              ? Object.setPrototypeOf.bind()
              : function (e, t) {
                  return (e.__proto__ = t), e;
                }),
            Cr(e, t)
          );
        }
        function Ar() {
          if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
          if (Reflect.construct.sham) return !1;
          if ("function" == typeof Proxy) return !0;
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            );
          } catch (e) {
            return !1;
          }
        }
        function Ir(e, t, r) {
          return (
            (Ir = Ar()
              ? Reflect.construct.bind()
              : function (e, t, r) {
                  var n = [null];
                  n.push.apply(n, t);
                  var i = new (Function.bind.apply(e, n))();
                  return r && Cr(i, r.prototype), i;
                }),
            Ir.apply(null, arguments)
          );
        }
        function Lr(e) {
          var t = "function" == typeof Map ? new Map() : void 0;
          return (
            (Lr = function (e) {
              if (
                null === e ||
                ((r = e),
                -1 === Function.toString.call(r).indexOf("[native code]"))
              )
                return e;
              var r;
              if ("function" != typeof e)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              if (void 0 !== t) {
                if (t.has(e)) return t.get(e);
                t.set(e, n);
              }
              function n() {
                return Ir(e, arguments, Or(this).constructor);
              }
              return (
                (n.prototype = Object.create(e.prototype, {
                  constructor: {
                    value: n,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                  },
                })),
                Cr(n, e)
              );
            }),
            Lr(e)
          );
        }
        function Rr(e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        }
        function zr(e) {
          var t = Ar();
          return function () {
            var r,
              n = Or(e);
            if (t) {
              var i = Or(this).constructor;
              r = Reflect.construct(n, arguments, i);
            } else r = n.apply(this, arguments);
            return (function (e, t) {
              if (t && ("object" == typeof t || "function" == typeof t)) return t;
              if (void 0 !== t)
                throw new TypeError(
                  "Derived constructors may only return object or undefined"
                );
              return Rr(e);
            })(this, r);
          };
        }
        function Dr(e) {
          var t = (function (e, t) {
            if ("object" != typeof e || null === e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
              var n = r.call(e, t || "default");
              if ("object" != typeof n) return n;
              throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t ? String : Number)(e);
          })(e, "string");
          return "symbol" == typeof t ? t : String(t);
        }
        var Fr = void 0 !== r.g && "[object global]" === {}.toString.call(r.g);
        function $r(e, t) {
          return 0 === e.indexOf(t.toLowerCase())
            ? e
            : ""
                .concat(t.toLowerCase())
                .concat(e.substr(0, 1).toUpperCase())
                .concat(e.substr(1));
        }
        function Nr(e) {
          return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(e);
        }
        function jr(e) {
          return /^https:\/\/player\.vimeo\.com\/video\/\d+/.test(e);
        }
        function Vr() {
          var e,
            t =
              arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            r = t.id,
            n = t.url,
            i = r || n;
          if (!i)
            throw new Error(
              "An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute."
            );
          if (
            ((e = i), !isNaN(parseFloat(e)) && isFinite(e) && Math.floor(e) == e)
          )
            return "https://vimeo.com/".concat(i);
          if (Nr(i)) return i.replace("http:", "https:");
          if (r) throw new TypeError("“".concat(r, "” is not a valid video id."));
          throw new TypeError("“".concat(i, "” is not a vimeo.com url."));
        }
        var Br = function (e, t, r) {
            var n =
                arguments.length > 3 && void 0 !== arguments[3]
                  ? arguments[3]
                  : "addEventListener",
              i =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : "removeEventListener",
              s = "string" == typeof t ? [t] : t;
            return (
              s.forEach(function (t) {
                e[n](t, r);
              }),
              {
                cancel: function () {
                  return s.forEach(function (t) {
                    return e[i](t, r);
                  });
                },
              }
            );
          },
          qr = void 0 !== Array.prototype.indexOf,
          Ur = "undefined" != typeof window && void 0 !== window.postMessage;
        if (!(Fr || (qr && Ur)))
          throw new Error(
            "Sorry, the Vimeo Player API is not available in this browser."
          );
        var Hr =
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : void 0 !== r.g
            ? r.g
            : "undefined" != typeof self
            ? self
            : {};
        !(function (e) {
          if (!e.WeakMap) {
            var t = Object.prototype.hasOwnProperty,
              r =
                Object.defineProperty &&
                (function () {
                  try {
                    return 1 === Object.defineProperty({}, "x", { value: 1 }).x;
                  } catch (e) {}
                })(),
              n = function (e, t, n) {
                r
                  ? Object.defineProperty(e, t, {
                      configurable: !0,
                      writable: !0,
                      value: n,
                    })
                  : (e[t] = n);
              };
            e.WeakMap = (function () {
              function e() {
                if (void 0 === this)
                  throw new TypeError("Constructor WeakMap requires 'new'");
                if (
                  (n(this, "_id", "_WeakMap" + "_" + s() + "." + s()),
                  arguments.length > 0)
                )
                  throw new TypeError("WeakMap iterable is not supported");
              }
              function r(e, r) {
                if (!i(e) || !t.call(e, "_id"))
                  throw new TypeError(
                    r + " method called on incompatible receiver " + typeof e
                  );
              }
              function s() {
                return Math.random().toString().substring(2);
              }
              return (
                n(e.prototype, "delete", function (e) {
                  if ((r(this, "delete"), !i(e))) return !1;
                  var t = e[this._id];
                  return !(!t || t[0] !== e) && (delete e[this._id], !0);
                }),
                n(e.prototype, "get", function (e) {
                  if ((r(this, "get"), i(e))) {
                    var t = e[this._id];
                    return t && t[0] === e ? t[1] : void 0;
                  }
                }),
                n(e.prototype, "has", function (e) {
                  if ((r(this, "has"), !i(e))) return !1;
                  var t = e[this._id];
                  return !(!t || t[0] !== e);
                }),
                n(e.prototype, "set", function (e, t) {
                  if ((r(this, "set"), !i(e)))
                    throw new TypeError("Invalid value used as weak map key");
                  var s = e[this._id];
                  return s && s[0] === e
                    ? ((s[1] = t), this)
                    : (n(e, this._id, [e, t]), this);
                }),
                n(e, "_polyfill", !0),
                e
              );
            })();
          }
          function i(e) {
            return Object(e) === e;
          }
        })(
          "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof self
            ? self
            : "undefined" != typeof window
            ? window
            : Hr
        );
        var Wr,
          Gr,
          Yr =
            ((Wr = function (e) {
              var t, r, n;
              (n = function () {
                var e,
                  t,
                  r,
                  n = Object.prototype.toString,
                  i =
                    "undefined" != typeof setImmediate
                      ? function (e) {
                          return setImmediate(e);
                        }
                      : setTimeout;
                try {
                  Object.defineProperty({}, "x", {}),
                    (e = function (e, t, r, n) {
                      return Object.defineProperty(e, t, {
                        value: r,
                        writable: !0,
                        configurable: !1 !== n,
                      });
                    });
                } catch (t) {
                  e = function (e, t, r) {
                    return (e[t] = r), e;
                  };
                }
                function s(e, n) {
                  r.add(e, n), t || (t = i(r.drain));
                }
                function o(e) {
                  var t,
                    r = typeof e;
                  return (
                    null == e ||
                      ("object" != r && "function" != r) ||
                      (t = e.then),
                    "function" == typeof t && t
                  );
                }
                function a() {
                  for (var e = 0; e < this.chain.length; e++)
                    l(
                      this,
                      1 === this.state
                        ? this.chain[e].success
                        : this.chain[e].failure,
                      this.chain[e]
                    );
                  this.chain.length = 0;
                }
                function l(e, t, r) {
                  var n, i;
                  try {
                    !1 === t
                      ? r.reject(e.msg)
                      : (n = !0 === t ? e.msg : t.call(void 0, e.msg)) ===
                        r.promise
                      ? r.reject(TypeError("Promise-chain cycle"))
                      : (i = o(n))
                      ? i.call(n, r.resolve, r.reject)
                      : r.resolve(n);
                  } catch (e) {
                    r.reject(e);
                  }
                }
                function c(e) {
                  var t,
                    r = this;
                  if (!r.triggered) {
                    (r.triggered = !0), r.def && (r = r.def);
                    try {
                      (t = o(e))
                        ? s(function () {
                            var n = new h(r);
                            try {
                              t.call(
                                e,
                                function () {
                                  c.apply(n, arguments);
                                },
                                function () {
                                  u.apply(n, arguments);
                                }
                              );
                            } catch (e) {
                              u.call(n, e);
                            }
                          })
                        : ((r.msg = e),
                          (r.state = 1),
                          r.chain.length > 0 && s(a, r));
                    } catch (e) {
                      u.call(new h(r), e);
                    }
                  }
                }
                function u(e) {
                  var t = this;
                  t.triggered ||
                    ((t.triggered = !0),
                    t.def && (t = t.def),
                    (t.msg = e),
                    (t.state = 2),
                    t.chain.length > 0 && s(a, t));
                }
                function d(e, t, r, n) {
                  for (var i = 0; i < t.length; i++)
                    !(function (i) {
                      e.resolve(t[i]).then(function (e) {
                        r(i, e);
                      }, n);
                    })(i);
                }
                function h(e) {
                  (this.def = e), (this.triggered = !1);
                }
                function p(e) {
                  (this.promise = e),
                    (this.state = 0),
                    (this.triggered = !1),
                    (this.chain = []),
                    (this.msg = void 0);
                }
                function f(e) {
                  if ("function" != typeof e) throw TypeError("Not a function");
                  if (0 !== this.__NPO__) throw TypeError("Not a promise");
                  this.__NPO__ = 1;
                  var t = new p(this);
                  (this.then = function (e, r) {
                    var n = {
                      success: "function" != typeof e || e,
                      failure: "function" == typeof r && r,
                    };
                    return (
                      (n.promise = new this.constructor(function (e, t) {
                        if ("function" != typeof e || "function" != typeof t)
                          throw TypeError("Not a function");
                        (n.resolve = e), (n.reject = t);
                      })),
                      t.chain.push(n),
                      0 !== t.state && s(a, t),
                      n.promise
                    );
                  }),
                    (this.catch = function (e) {
                      return this.then(void 0, e);
                    });
                  try {
                    e.call(
                      void 0,
                      function (e) {
                        c.call(t, e);
                      },
                      function (e) {
                        u.call(t, e);
                      }
                    );
                  } catch (e) {
                    u.call(t, e);
                  }
                }
                r = (function () {
                  var e, r, n;
                  function i(e, t) {
                    (this.fn = e), (this.self = t), (this.next = void 0);
                  }
                  return {
                    add: function (t, s) {
                      (n = new i(t, s)),
                        r ? (r.next = n) : (e = n),
                        (r = n),
                        (n = void 0);
                    },
                    drain: function () {
                      var n = e;
                      for (e = r = t = void 0; n; )
                        n.fn.call(n.self), (n = n.next);
                    },
                  };
                })();
                var m = e({}, "constructor", f, !1);
                return (
                  (f.prototype = m),
                  e(m, "__NPO__", 0, !1),
                  e(f, "resolve", function (e) {
                    return e && "object" == typeof e && 1 === e.__NPO__
                      ? e
                      : new this(function (t, r) {
                          if ("function" != typeof t || "function" != typeof r)
                            throw TypeError("Not a function");
                          t(e);
                        });
                  }),
                  e(f, "reject", function (e) {
                    return new this(function (t, r) {
                      if ("function" != typeof t || "function" != typeof r)
                        throw TypeError("Not a function");
                      r(e);
                    });
                  }),
                  e(f, "all", function (e) {
                    var t = this;
                    return "[object Array]" != n.call(e)
                      ? t.reject(TypeError("Not an array"))
                      : 0 === e.length
                      ? t.resolve([])
                      : new t(function (r, n) {
                          if ("function" != typeof r || "function" != typeof n)
                            throw TypeError("Not a function");
                          var i = e.length,
                            s = Array(i),
                            o = 0;
                          d(
                            t,
                            e,
                            function (e, t) {
                              (s[e] = t), ++o === i && r(s);
                            },
                            n
                          );
                        });
                  }),
                  e(f, "race", function (e) {
                    var t = this;
                    return "[object Array]" != n.call(e)
                      ? t.reject(TypeError("Not an array"))
                      : new t(function (r, n) {
                          if ("function" != typeof r || "function" != typeof n)
                            throw TypeError("Not a function");
                          d(
                            t,
                            e,
                            function (e, t) {
                              r(t);
                            },
                            n
                          );
                        });
                  }),
                  f
                );
              }),
                ((r = Hr)[(t = "Promise")] = r[t] || n()),
                e.exports && (e.exports = r[t]);
            }),
            Wr((Gr = { exports: {} }), Gr.exports),
            Gr.exports),
          Xr = new WeakMap();
        function Kr(e, t, r) {
          var n = Xr.get(e.element) || {};
          t in n || (n[t] = []), n[t].push(r), Xr.set(e.element, n);
        }
        function Qr(e, t) {
          return (Xr.get(e.element) || {})[t] || [];
        }
        function Zr(e, t, r) {
          var n = Xr.get(e.element) || {};
          if (!n[t]) return !0;
          if (!r) return (n[t] = []), Xr.set(e.element, n), !0;
          var i = n[t].indexOf(r);
          return (
            -1 !== i && n[t].splice(i, 1),
            Xr.set(e.element, n),
            n[t] && 0 === n[t].length
          );
        }
        function Jr(e) {
          if ("string" == typeof e)
            try {
              e = JSON.parse(e);
            } catch (e) {
              return console.warn(e), {};
            }
          return e;
        }
        function en(e, t, r) {
          if (e.element.contentWindow && e.element.contentWindow.postMessage) {
            var n = { method: t };
            void 0 !== r && (n.value = r);
            var i = parseFloat(
              navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1")
            );
            i >= 8 && i < 10 && (n = JSON.stringify(n)),
              e.element.contentWindow.postMessage(n, e.origin);
          }
        }
        function tn(e, t) {
          var r,
            n = [];
          if ((t = Jr(t)).event) {
            if ("error" === t.event)
              Qr(e, t.data.method).forEach(function (r) {
                var n = new Error(t.data.message);
                (n.name = t.data.name), r.reject(n), Zr(e, t.data.method, r);
              });
            (n = Qr(e, "event:".concat(t.event))), (r = t.data);
          } else if (t.method) {
            var i = (function (e, t) {
              var r = Qr(e, t);
              if (r.length < 1) return !1;
              var n = r.shift();
              return Zr(e, t, n), n;
            })(e, t.method);
            i && (n.push(i), (r = t.value));
          }
          n.forEach(function (t) {
            try {
              if ("function" == typeof t) return void t.call(e, r);
              t.resolve(r);
            } catch (e) {}
          });
        }
        var rn = [
          "autopause",
          "autoplay",
          "background",
          "byline",
          "color",
          "colors",
          "controls",
          "dnt",
          "height",
          "id",
          "interactive_params",
          "keyboard",
          "loop",
          "maxheight",
          "maxwidth",
          "muted",
          "playsinline",
          "portrait",
          "responsive",
          "speed",
          "texttrack",
          "title",
          "transparent",
          "url",
          "width",
        ];
        function nn(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          return rn.reduce(function (t, r) {
            var n = e.getAttribute("data-vimeo-".concat(r));
            return (n || "" === n) && (t[r] = "" === n ? 1 : n), t;
          }, t);
        }
        function sn(e, t) {
          var r = e.html;
          if (!t) throw new TypeError("An element must be provided");
          if (null !== t.getAttribute("data-vimeo-initialized"))
            return t.querySelector("iframe");
          var n = document.createElement("div");
          return (
            (n.innerHTML = r),
            t.appendChild(n.firstChild),
            t.setAttribute("data-vimeo-initialized", "true"),
            t.querySelector("iframe")
          );
        }
        function on(e) {
          var t =
              arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
            r = arguments.length > 2 ? arguments[2] : void 0;
          return new Promise(function (n, i) {
            if (!Nr(e))
              throw new TypeError("“".concat(e, "” is not a vimeo.com url."));
            var s = "https://vimeo.com/api/oembed.json?url=".concat(
              encodeURIComponent(e)
            );
            for (var o in t)
              t.hasOwnProperty(o) &&
                (s += "&".concat(o, "=").concat(encodeURIComponent(t[o])));
            var a =
              "XDomainRequest" in window
                ? new XDomainRequest()
                : new XMLHttpRequest();
            a.open("GET", s, !0),
              (a.onload = function () {
                if (404 !== a.status)
                  if (403 !== a.status)
                    try {
                      var t = JSON.parse(a.responseText);
                      if (403 === t.domain_status_code)
                        return (
                          sn(t, r),
                          void i(new Error("“".concat(e, "” is not embeddable.")))
                        );
                      n(t);
                    } catch (e) {
                      i(e);
                    }
                  else i(new Error("“".concat(e, "” is not embeddable.")));
                else i(new Error("“".concat(e, "” was not found.")));
              }),
              (a.onerror = function () {
                var e = a.status ? " (".concat(a.status, ")") : "";
                i(
                  new Error(
                    "There was an error fetching the embed code from Vimeo".concat(
                      e,
                      "."
                    )
                  )
                );
              }),
              a.send();
          });
        }
        var an = {
            role: "viewer",
            autoPlayMuted: !0,
            allowedDrift: 0.3,
            maxAllowedDrift: 1,
            minCheckInterval: 0.1,
            maxRateAdjustment: 0.2,
            maxTimeToCatchUp: 1,
          },
          ln = (function (e) {
            !(function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Super expression must either be null or a function"
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
              })),
                Object.defineProperty(e, "prototype", { writable: !1 }),
                t && Cr(e, t);
            })(s, e);
            var t,
              r,
              n,
              i = zr(s);
            function s(e, t) {
              var r,
                n =
                  arguments.length > 2 && void 0 !== arguments[2]
                    ? arguments[2]
                    : {},
                o = arguments.length > 3 ? arguments[3] : void 0;
              return (
                xr(this, s),
                Pr(Rr((r = i.call(this))), "logger", void 0),
                Pr(Rr(r), "speedAdjustment", 0),
                Pr(
                  Rr(r),
                  "adjustSpeed",
                  (function () {
                    var e = Sr(
                      Tr().mark(function e(t, n) {
                        var i;
                        return Tr().wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (r.speedAdjustment !== n) {
                                  e.next = 2;
                                  break;
                                }
                                return e.abrupt("return");
                              case 2:
                                return (e.next = 4), t.getPlaybackRate();
                              case 4:
                                return (
                                  (e.t0 = e.sent),
                                  (e.t1 = r.speedAdjustment),
                                  (e.t2 = e.t0 - e.t1),
                                  (e.t3 = n),
                                  (i = e.t2 + e.t3),
                                  r.log("New playbackRate:  ".concat(i)),
                                  (e.next = 12),
                                  t.setPlaybackRate(i)
                                );
                              case 12:
                                r.speedAdjustment = n;
                              case 13:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    );
                    return function (t, r) {
                      return e.apply(this, arguments);
                    };
                  })()
                ),
                (r.logger = o),
                r.init(t, e, _r(_r({}, an), n)),
                r
              );
            }
            return (
              Mr(s, [
                {
                  key: "disconnect",
                  value: function () {
                    this.dispatchEvent(new Event("disconnect"));
                  },
                },
                {
                  key: "init",
                  value:
                    ((n = Sr(
                      Tr().mark(function e(t, r, n) {
                        var i,
                          s,
                          o,
                          a = this;
                        return Tr().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (e.next = 2),
                                    this.waitForTOReadyState(t, "open")
                                  );
                                case 2:
                                  if ("viewer" !== n.role) {
                                    e.next = 10;
                                    break;
                                  }
                                  return (e.next = 5), this.updatePlayer(t, r, n);
                                case 5:
                                  (i = Br(t, "change", function () {
                                    return a.updatePlayer(t, r, n);
                                  })),
                                    (s = this.maintainPlaybackPosition(t, r, n)),
                                    this.addEventListener(
                                      "disconnect",
                                      function () {
                                        s.cancel(), i.cancel();
                                      }
                                    ),
                                    (e.next = 14);
                                  break;
                                case 10:
                                  return (
                                    (e.next = 12), this.updateTimingObject(t, r)
                                  );
                                case 12:
                                  (o = Br(
                                    r,
                                    ["seeked", "play", "pause", "ratechange"],
                                    function () {
                                      return a.updateTimingObject(t, r);
                                    },
                                    "on",
                                    "off"
                                  )),
                                    this.addEventListener(
                                      "disconnect",
                                      function () {
                                        return o.cancel();
                                      }
                                    );
                                case 14:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function (e, t, r) {
                      return n.apply(this, arguments);
                    }),
                },
                {
                  key: "updateTimingObject",
                  value:
                    ((r = Sr(
                      Tr().mark(function e(t, r) {
                        return Tr().wrap(function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  (e.t0 = t), (e.next = 3), r.getCurrentTime()
                                );
                              case 3:
                                return (
                                  (e.t1 = e.sent), (e.next = 6), r.getPaused()
                                );
                              case 6:
                                if (!e.sent) {
                                  e.next = 10;
                                  break;
                                }
                                (e.t2 = 0), (e.next = 13);
                                break;
                              case 10:
                                return (e.next = 12), r.getPlaybackRate();
                              case 12:
                                e.t2 = e.sent;
                              case 13:
                                (e.t3 = e.t2),
                                  (e.t4 = { position: e.t1, velocity: e.t3 }),
                                  e.t0.update.call(e.t0, e.t4);
                              case 16:
                              case "end":
                                return e.stop();
                            }
                        }, e);
                      })
                    )),
                    function (e, t) {
                      return r.apply(this, arguments);
                    }),
                },
                {
                  key: "updatePlayer",
                  value:
                    ((t = Sr(
                      Tr().mark(function e(t, r, n) {
                        var i, s, o;
                        return Tr().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (
                                    ((i = t.query()),
                                    (s = i.position),
                                    (o = i.velocity),
                                    "number" == typeof s && r.setCurrentTime(s),
                                    "number" != typeof o)
                                  ) {
                                    e.next = 25;
                                    break;
                                  }
                                  if (0 !== o) {
                                    e.next = 11;
                                    break;
                                  }
                                  return (e.next = 6), r.getPaused();
                                case 6:
                                  if (((e.t0 = e.sent), !1 !== e.t0)) {
                                    e.next = 9;
                                    break;
                                  }
                                  r.pause();
                                case 9:
                                  e.next = 25;
                                  break;
                                case 11:
                                  if (!(o > 0)) {
                                    e.next = 25;
                                    break;
                                  }
                                  return (e.next = 14), r.getPaused();
                                case 14:
                                  if (((e.t1 = e.sent), !0 !== e.t1)) {
                                    e.next = 19;
                                    break;
                                  }
                                  return (
                                    (e.next = 18),
                                    r.play().catch(
                                      (function () {
                                        var e = Sr(
                                          Tr().mark(function e(t) {
                                            return Tr().wrap(function (e) {
                                              for (;;)
                                                switch ((e.prev = e.next)) {
                                                  case 0:
                                                    if (
                                                      "NotAllowedError" !==
                                                        t.name ||
                                                      !n.autoPlayMuted
                                                    ) {
                                                      e.next = 5;
                                                      break;
                                                    }
                                                    return (
                                                      (e.next = 3), r.setMuted(!0)
                                                    );
                                                  case 3:
                                                    return (
                                                      (e.next = 5),
                                                      r
                                                        .play()
                                                        .catch(function (e) {
                                                          return console.error(
                                                            "Couldn't play the video from TimingSrcConnector. Error:",
                                                            e
                                                          );
                                                        })
                                                    );
                                                  case 5:
                                                  case "end":
                                                    return e.stop();
                                                }
                                            }, e);
                                          })
                                        );
                                        return function (t) {
                                          return e.apply(this, arguments);
                                        };
                                      })()
                                    )
                                  );
                                case 18:
                                  this.updatePlayer(t, r, n);
                                case 19:
                                  return (e.next = 21), r.getPlaybackRate();
                                case 21:
                                  if (
                                    ((e.t2 = e.sent), (e.t3 = o), e.t2 === e.t3)
                                  ) {
                                    e.next = 25;
                                    break;
                                  }
                                  r.setPlaybackRate(o);
                                case 25:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function (e, r, n) {
                      return t.apply(this, arguments);
                    }),
                },
                {
                  key: "maintainPlaybackPosition",
                  value: function (e, t, r) {
                    var n = this,
                      i = r.allowedDrift,
                      s = r.maxAllowedDrift,
                      o = r.minCheckInterval,
                      a = r.maxRateAdjustment,
                      l = r.maxTimeToCatchUp,
                      c = 1e3 * Math.min(l, Math.max(o, s)),
                      u = (function () {
                        var r = Sr(
                          Tr().mark(function r() {
                            var o, c, u, d, h;
                            return Tr().wrap(function (r) {
                              for (;;)
                                switch ((r.prev = r.next)) {
                                  case 0:
                                    if (
                                      ((r.t0 = 0 === e.query().velocity), r.t0)
                                    ) {
                                      r.next = 6;
                                      break;
                                    }
                                    return (r.next = 4), t.getPaused();
                                  case 4:
                                    (r.t1 = r.sent), (r.t0 = !0 === r.t1);
                                  case 6:
                                    if (!r.t0) {
                                      r.next = 8;
                                      break;
                                    }
                                    return r.abrupt("return");
                                  case 8:
                                    return (
                                      (r.t2 = e.query().position),
                                      (r.next = 11),
                                      t.getCurrentTime()
                                    );
                                  case 11:
                                    if (
                                      ((r.t3 = r.sent),
                                      (o = r.t2 - r.t3),
                                      (c = Math.abs(o)),
                                      n.log("Drift: ".concat(o)),
                                      !(c > s))
                                    ) {
                                      r.next = 22;
                                      break;
                                    }
                                    return (r.next = 18), n.adjustSpeed(t, 0);
                                  case 18:
                                    t.setCurrentTime(e.query().position),
                                      n.log("Resync by currentTime"),
                                      (r.next = 29);
                                    break;
                                  case 22:
                                    if (!(c > i)) {
                                      r.next = 29;
                                      break;
                                    }
                                    return (
                                      (h =
                                        (u = c / l) < (d = a) ? (d - u) / 2 : d),
                                      (r.next = 28),
                                      n.adjustSpeed(t, h * Math.sign(o))
                                    );
                                  case 28:
                                    n.log("Resync by playbackRate");
                                  case 29:
                                  case "end":
                                    return r.stop();
                                }
                            }, r);
                          })
                        );
                        return function () {
                          return r.apply(this, arguments);
                        };
                      })(),
                      d = setInterval(function () {
                        return u();
                      }, c);
                    return {
                      cancel: function () {
                        return clearInterval(d);
                      },
                    };
                  },
                },
                {
                  key: "log",
                  value: function (e) {
                    var t;
                    null === (t = this.logger) ||
                      void 0 === t ||
                      t.call(this, "TimingSrcConnector: ".concat(e));
                  },
                },
                {
                  key: "waitForTOReadyState",
                  value: function (e, t) {
                    return new Promise(function (r) {
                      !(function n() {
                        e.readyState === t
                          ? r()
                          : e.addEventListener("readystatechange", n, {
                              once: !0,
                            });
                      })();
                    });
                  },
                },
              ]),
              s
            );
          })(Lr(EventTarget)),
          cn = new WeakMap(),
          un = new WeakMap(),
          dn = {},
          hn = (function () {
            function e(t) {
              var r = this,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : {};
              if (
                (xr(this, e),
                window.jQuery &&
                  t instanceof jQuery &&
                  (t.length > 1 &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      "A jQuery object with multiple elements was passed, using the first element."
                    ),
                  (t = t[0])),
                "undefined" != typeof document &&
                  "string" == typeof t &&
                  (t = document.getElementById(t)),
                !(function (e) {
                  return Boolean(
                    e &&
                      1 === e.nodeType &&
                      "nodeName" in e &&
                      e.ownerDocument &&
                      e.ownerDocument.defaultView
                  );
                })(t))
              )
                throw new TypeError(
                  "You must pass either a valid element or a valid id."
                );
              if ("IFRAME" !== t.nodeName) {
                var i = t.querySelector("iframe");
                i && (t = i);
              }
              if ("IFRAME" === t.nodeName && !Nr(t.getAttribute("src") || ""))
                throw new Error("The player element passed isn’t a Vimeo embed.");
              if (cn.has(t)) return cn.get(t);
              (this._window = t.ownerDocument.defaultView),
                (this.element = t),
                (this.origin = "*");
              var s = new Yr(function (e, i) {
                if (
                  ((r._onMessage = function (t) {
                    if (Nr(t.origin) && r.element.contentWindow === t.source) {
                      "*" === r.origin && (r.origin = t.origin);
                      var n = Jr(t.data);
                      if (
                        n &&
                        "error" === n.event &&
                        n.data &&
                        "ready" === n.data.method
                      ) {
                        var s = new Error(n.data.message);
                        return (s.name = n.data.name), void i(s);
                      }
                      var o = n && "ready" === n.event,
                        a = n && "ping" === n.method;
                      if (o || a)
                        return (
                          r.element.setAttribute("data-ready", "true"), void e()
                        );
                      tn(r, n);
                    }
                  }),
                  r._window.addEventListener("message", r._onMessage),
                  "IFRAME" !== r.element.nodeName)
                ) {
                  var s = nn(t, n);
                  on(Vr(s), s, t)
                    .then(function (e) {
                      var n,
                        i,
                        s,
                        o = sn(e, t);
                      return (
                        (r.element = o),
                        (r._originalElement = t),
                        (n = t),
                        (i = o),
                        (s = Xr.get(n)),
                        Xr.set(i, s),
                        Xr.delete(n),
                        cn.set(r.element, r),
                        e
                      );
                    })
                    .catch(i);
                }
              });
              if (
                (un.set(this, s),
                cn.set(this.element, this),
                "IFRAME" === this.element.nodeName && en(this, "ping"),
                dn.isEnabled)
              ) {
                var o = function () {
                  return dn.exit();
                };
                (this.fullscreenchangeHandler = function () {
                  dn.isFullscreen
                    ? Kr(r, "event:exitFullscreen", o)
                    : Zr(r, "event:exitFullscreen", o),
                    r.ready().then(function () {
                      en(r, "fullscreenchange", dn.isFullscreen);
                    });
                }),
                  dn.on("fullscreenchange", this.fullscreenchangeHandler);
              }
              return this;
            }
            var t;
            return (
              Mr(e, [
                {
                  key: "callMethod",
                  value: function (e) {
                    var t = this,
                      r =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {};
                    return new Yr(function (n, i) {
                      return t
                        .ready()
                        .then(function () {
                          Kr(t, e, { resolve: n, reject: i }), en(t, e, r);
                        })
                        .catch(i);
                    });
                  },
                },
                {
                  key: "get",
                  value: function (e) {
                    var t = this;
                    return new Yr(function (r, n) {
                      return (
                        (e = $r(e, "get")),
                        t
                          .ready()
                          .then(function () {
                            Kr(t, e, { resolve: r, reject: n }), en(t, e);
                          })
                          .catch(n)
                      );
                    });
                  },
                },
                {
                  key: "set",
                  value: function (e, t) {
                    var r = this;
                    return new Yr(function (n, i) {
                      if (((e = $r(e, "set")), null == t))
                        throw new TypeError("There must be a value to set.");
                      return r
                        .ready()
                        .then(function () {
                          Kr(r, e, { resolve: n, reject: i }), en(r, e, t);
                        })
                        .catch(i);
                    });
                  },
                },
                {
                  key: "on",
                  value: function (e, t) {
                    if (!e) throw new TypeError("You must pass an event name.");
                    if (!t)
                      throw new TypeError("You must pass a callback function.");
                    if ("function" != typeof t)
                      throw new TypeError("The callback must be a function.");
                    0 === Qr(this, "event:".concat(e)).length &&
                      this.callMethod("addEventListener", e).catch(
                        function () {}
                      ),
                      Kr(this, "event:".concat(e), t);
                  },
                },
                {
                  key: "off",
                  value: function (e, t) {
                    if (!e) throw new TypeError("You must pass an event name.");
                    if (t && "function" != typeof t)
                      throw new TypeError("The callback must be a function.");
                    Zr(this, "event:".concat(e), t) &&
                      this.callMethod("removeEventListener", e).catch(function (
                        e
                      ) {});
                  },
                },
                {
                  key: "loadVideo",
                  value: function (e) {
                    return this.callMethod("loadVideo", e);
                  },
                },
                {
                  key: "ready",
                  value: function () {
                    var e =
                      un.get(this) ||
                      new Yr(function (e, t) {
                        t(new Error("Unknown player. Probably unloaded."));
                      });
                    return Yr.resolve(e);
                  },
                },
                {
                  key: "addCuePoint",
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                    return this.callMethod("addCuePoint", { time: e, data: t });
                  },
                },
                {
                  key: "removeCuePoint",
                  value: function (e) {
                    return this.callMethod("removeCuePoint", e);
                  },
                },
                {
                  key: "enableTextTrack",
                  value: function (e, t) {
                    if (!e) throw new TypeError("You must pass a language.");
                    return this.callMethod("enableTextTrack", {
                      language: e,
                      kind: t,
                    });
                  },
                },
                {
                  key: "disableTextTrack",
                  value: function () {
                    return this.callMethod("disableTextTrack");
                  },
                },
                {
                  key: "pause",
                  value: function () {
                    return this.callMethod("pause");
                  },
                },
                {
                  key: "play",
                  value: function () {
                    return this.callMethod("play");
                  },
                },
                {
                  key: "requestFullscreen",
                  value: function () {
                    return dn.isEnabled
                      ? dn.request(this.element)
                      : this.callMethod("requestFullscreen");
                  },
                },
                {
                  key: "exitFullscreen",
                  value: function () {
                    return dn.isEnabled
                      ? dn.exit()
                      : this.callMethod("exitFullscreen");
                  },
                },
                {
                  key: "getFullscreen",
                  value: function () {
                    return dn.isEnabled
                      ? Yr.resolve(dn.isFullscreen)
                      : this.get("fullscreen");
                  },
                },
                {
                  key: "requestPictureInPicture",
                  value: function () {
                    return this.callMethod("requestPictureInPicture");
                  },
                },
                {
                  key: "exitPictureInPicture",
                  value: function () {
                    return this.callMethod("exitPictureInPicture");
                  },
                },
                {
                  key: "getPictureInPicture",
                  value: function () {
                    return this.get("pictureInPicture");
                  },
                },
                {
                  key: "remotePlaybackPrompt",
                  value: function () {
                    return this.callMethod("remotePlaybackPrompt");
                  },
                },
                {
                  key: "unload",
                  value: function () {
                    return this.callMethod("unload");
                  },
                },
                {
                  key: "destroy",
                  value: function () {
                    var e = this;
                    return new Yr(function (t) {
                      if (
                        (un.delete(e),
                        cn.delete(e.element),
                        e._originalElement &&
                          (cn.delete(e._originalElement),
                          e._originalElement.removeAttribute(
                            "data-vimeo-initialized"
                          )),
                        e.element &&
                          "IFRAME" === e.element.nodeName &&
                          e.element.parentNode &&
                          (e.element.parentNode.parentNode &&
                          e._originalElement &&
                          e._originalElement !== e.element.parentNode
                            ? e.element.parentNode.parentNode.removeChild(
                                e.element.parentNode
                              )
                            : e.element.parentNode.removeChild(e.element)),
                        e.element &&
                          "DIV" === e.element.nodeName &&
                          e.element.parentNode)
                      ) {
                        e.element.removeAttribute("data-vimeo-initialized");
                        var r = e.element.querySelector("iframe");
                        r &&
                          r.parentNode &&
                          (r.parentNode.parentNode &&
                          e._originalElement &&
                          e._originalElement !== r.parentNode
                            ? r.parentNode.parentNode.removeChild(r.parentNode)
                            : r.parentNode.removeChild(r));
                      }
                      e._window.removeEventListener("message", e._onMessage),
                        dn.isEnabled &&
                          dn.off("fullscreenchange", e.fullscreenchangeHandler),
                        t();
                    });
                  },
                },
                {
                  key: "getAutopause",
                  value: function () {
                    return this.get("autopause");
                  },
                },
                {
                  key: "setAutopause",
                  value: function (e) {
                    return this.set("autopause", e);
                  },
                },
                {
                  key: "getBuffered",
                  value: function () {
                    return this.get("buffered");
                  },
                },
                {
                  key: "getCameraProps",
                  value: function () {
                    return this.get("cameraProps");
                  },
                },
                {
                  key: "setCameraProps",
                  value: function (e) {
                    return this.set("cameraProps", e);
                  },
                },
                {
                  key: "getChapters",
                  value: function () {
                    return this.get("chapters");
                  },
                },
                {
                  key: "getCurrentChapter",
                  value: function () {
                    return this.get("currentChapter");
                  },
                },
                {
                  key: "getColor",
                  value: function () {
                    return this.get("color");
                  },
                },
                {
                  key: "getColors",
                  value: function () {
                    return Yr.all([
                      this.get("colorOne"),
                      this.get("colorTwo"),
                      this.get("colorThree"),
                      this.get("colorFour"),
                    ]);
                  },
                },
                {
                  key: "setColor",
                  value: function (e) {
                    return this.set("color", e);
                  },
                },
                {
                  key: "setColors",
                  value: function (e) {
                    if (!Array.isArray(e))
                      return new Yr(function (e, t) {
                        return t(new TypeError("Argument must be an array."));
                      });
                    var t = new Yr(function (e) {
                        return e(null);
                      }),
                      r = [
                        e[0] ? this.set("colorOne", e[0]) : t,
                        e[1] ? this.set("colorTwo", e[1]) : t,
                        e[2] ? this.set("colorThree", e[2]) : t,
                        e[3] ? this.set("colorFour", e[3]) : t,
                      ];
                    return Yr.all(r);
                  },
                },
                {
                  key: "getCuePoints",
                  value: function () {
                    return this.get("cuePoints");
                  },
                },
                {
                  key: "getCurrentTime",
                  value: function () {
                    return this.get("currentTime");
                  },
                },
                {
                  key: "setCurrentTime",
                  value: function (e) {
                    return this.set("currentTime", e);
                  },
                },
                {
                  key: "getDuration",
                  value: function () {
                    return this.get("duration");
                  },
                },
                {
                  key: "getEnded",
                  value: function () {
                    return this.get("ended");
                  },
                },
                {
                  key: "getLoop",
                  value: function () {
                    return this.get("loop");
                  },
                },
                {
                  key: "setLoop",
                  value: function (e) {
                    return this.set("loop", e);
                  },
                },
                {
                  key: "setMuted",
                  value: function (e) {
                    return this.set("muted", e);
                  },
                },
                {
                  key: "getMuted",
                  value: function () {
                    return this.get("muted");
                  },
                },
                {
                  key: "getPaused",
                  value: function () {
                    return this.get("paused");
                  },
                },
                {
                  key: "getPlaybackRate",
                  value: function () {
                    return this.get("playbackRate");
                  },
                },
                {
                  key: "setPlaybackRate",
                  value: function (e) {
                    return this.set("playbackRate", e);
                  },
                },
                {
                  key: "getPlayed",
                  value: function () {
                    return this.get("played");
                  },
                },
                {
                  key: "getQualities",
                  value: function () {
                    return this.get("qualities");
                  },
                },
                {
                  key: "getQuality",
                  value: function () {
                    return this.get("quality");
                  },
                },
                {
                  key: "setQuality",
                  value: function (e) {
                    return this.set("quality", e);
                  },
                },
                {
                  key: "getRemotePlaybackAvailability",
                  value: function () {
                    return this.get("remotePlaybackAvailability");
                  },
                },
                {
                  key: "getRemotePlaybackState",
                  value: function () {
                    return this.get("remotePlaybackState");
                  },
                },
                {
                  key: "getSeekable",
                  value: function () {
                    return this.get("seekable");
                  },
                },
                {
                  key: "getSeeking",
                  value: function () {
                    return this.get("seeking");
                  },
                },
                {
                  key: "getTextTracks",
                  value: function () {
                    return this.get("textTracks");
                  },
                },
                {
                  key: "getVideoEmbedCode",
                  value: function () {
                    return this.get("videoEmbedCode");
                  },
                },
                {
                  key: "getVideoId",
                  value: function () {
                    return this.get("videoId");
                  },
                },
                {
                  key: "getVideoTitle",
                  value: function () {
                    return this.get("videoTitle");
                  },
                },
                {
                  key: "getVideoWidth",
                  value: function () {
                    return this.get("videoWidth");
                  },
                },
                {
                  key: "getVideoHeight",
                  value: function () {
                    return this.get("videoHeight");
                  },
                },
                {
                  key: "getVideoUrl",
                  value: function () {
                    return this.get("videoUrl");
                  },
                },
                {
                  key: "getVolume",
                  value: function () {
                    return this.get("volume");
                  },
                },
                {
                  key: "setVolume",
                  value: function (e) {
                    return this.set("volume", e);
                  },
                },
                {
                  key: "setTimingSrc",
                  value:
                    ((t = Sr(
                      Tr().mark(function e(t, r) {
                        var n,
                          i = this;
                        return Tr().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  if (t) {
                                    e.next = 2;
                                    break;
                                  }
                                  throw new TypeError(
                                    "A Timing Object must be provided."
                                  );
                                case 2:
                                  return (e.next = 4), this.ready();
                                case 4:
                                  return (
                                    (n = new ln(this, t, r)),
                                    en(this, "notifyTimingObjectConnect"),
                                    n.addEventListener("disconnect", function () {
                                      return en(
                                        i,
                                        "notifyTimingObjectDisconnect"
                                      );
                                    }),
                                    e.abrupt("return", n)
                                  );
                                case 8:
                                case "end":
                                  return e.stop();
                              }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function (e, r) {
                      return t.apply(this, arguments);
                    }),
                },
              ]),
              e
            );
          })();
        Fr ||
          ((dn = (function () {
            var e = (function () {
                for (
                  var e,
                    t = [
                      [
                        "requestFullscreen",
                        "exitFullscreen",
                        "fullscreenElement",
                        "fullscreenEnabled",
                        "fullscreenchange",
                        "fullscreenerror",
                      ],
                      [
                        "webkitRequestFullscreen",
                        "webkitExitFullscreen",
                        "webkitFullscreenElement",
                        "webkitFullscreenEnabled",
                        "webkitfullscreenchange",
                        "webkitfullscreenerror",
                      ],
                      [
                        "webkitRequestFullScreen",
                        "webkitCancelFullScreen",
                        "webkitCurrentFullScreenElement",
                        "webkitCancelFullScreen",
                        "webkitfullscreenchange",
                        "webkitfullscreenerror",
                      ],
                      [
                        "mozRequestFullScreen",
                        "mozCancelFullScreen",
                        "mozFullScreenElement",
                        "mozFullScreenEnabled",
                        "mozfullscreenchange",
                        "mozfullscreenerror",
                      ],
                      [
                        "msRequestFullscreen",
                        "msExitFullscreen",
                        "msFullscreenElement",
                        "msFullscreenEnabled",
                        "MSFullscreenChange",
                        "MSFullscreenError",
                      ],
                    ],
                    r = 0,
                    n = t.length,
                    i = {};
                  r < n;
                  r++
                )
                  if ((e = t[r]) && e[1] in document) {
                    for (r = 0; r < e.length; r++) i[t[0][r]] = e[r];
                    return i;
                  }
                return !1;
              })(),
              t = {
                fullscreenchange: e.fullscreenchange,
                fullscreenerror: e.fullscreenerror,
              },
              r = {
                request: function (t) {
                  return new Promise(function (n, i) {
                    var s = function e() {
                      r.off("fullscreenchange", e), n();
                    };
                    r.on("fullscreenchange", s);
                    var o = (t = t || document.documentElement)[
                      e.requestFullscreen
                    ]();
                    o instanceof Promise && o.then(s).catch(i);
                  });
                },
                exit: function () {
                  return new Promise(function (t, n) {
                    if (r.isFullscreen) {
                      var i = function e() {
                        r.off("fullscreenchange", e), t();
                      };
                      r.on("fullscreenchange", i);
                      var s = document[e.exitFullscreen]();
                      s instanceof Promise && s.then(i).catch(n);
                    } else t();
                  });
                },
                on: function (e, r) {
                  var n = t[e];
                  n && document.addEventListener(n, r);
                },
                off: function (e, r) {
                  var n = t[e];
                  n && document.removeEventListener(n, r);
                },
              };
            return (
              Object.defineProperties(r, {
                isFullscreen: {
                  get: function () {
                    return Boolean(document[e.fullscreenElement]);
                  },
                },
                element: {
                  enumerable: !0,
                  get: function () {
                    return document[e.fullscreenElement];
                  },
                },
                isEnabled: {
                  enumerable: !0,
                  get: function () {
                    return Boolean(document[e.fullscreenEnabled]);
                  },
                },
              }),
              r
            );
          })()),
          (function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : document,
              t = [].slice.call(
                e.querySelectorAll("[data-vimeo-id], [data-vimeo-url]")
              ),
              r = function (e) {
                "console" in window &&
                  console.error &&
                  console.error(
                    "There was an error creating an embed: ".concat(e)
                  );
              };
            t.forEach(function (e) {
              try {
                if (null !== e.getAttribute("data-vimeo-defer")) return;
                var t = nn(e);
                on(Vr(t), t, e)
                  .then(function (t) {
                    return sn(t, e);
                  })
                  .catch(r);
              } catch (e) {
                r(e);
              }
            });
          })(),
          (function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : document;
            window.VimeoPlayerResizeEmbeds_ ||
              ((window.VimeoPlayerResizeEmbeds_ = !0),
              window.addEventListener("message", function (t) {
                if (Nr(t.origin) && t.data && "spacechange" === t.data.event)
                  for (
                    var r = e.querySelectorAll("iframe"), n = 0;
                    n < r.length;
                    n++
                  )
                    if (r[n].contentWindow === t.source) {
                      r[n].parentElement.style.paddingBottom = "".concat(
                        t.data.data[0].bottom,
                        "px"
                      );
                      break;
                    }
              }));
          })(),
          (function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : document;
            window.VimeoSeoMetadataAppended ||
              ((window.VimeoSeoMetadataAppended = !0),
              window.addEventListener("message", function (t) {
                if (Nr(t.origin)) {
                  var r = Jr(t.data);
                  if (r && "ready" === r.event)
                    for (
                      var n = e.querySelectorAll("iframe"), i = 0;
                      i < n.length;
                      i++
                    ) {
                      var s = n[i],
                        o = s.contentWindow === t.source;
                      jr(s.src) &&
                        o &&
                        new hn(s).callMethod(
                          "appendVideoMetadata",
                          window.location.href
                        );
                    }
                }
              }));
          })(),
          (function () {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : document;
            if (!window.VimeoCheckedUrlTimeParam) {
              window.VimeoCheckedUrlTimeParam = !0;
              var t = function (e) {
                "console" in window &&
                  console.error &&
                  console.error(
                    "There was an error getting video Id: ".concat(e)
                  );
              };
              window.addEventListener("message", function (r) {
                if (Nr(r.origin)) {
                  var n = Jr(r.data);
                  if (n && "ready" === n.event)
                    for (
                      var i = e.querySelectorAll("iframe"),
                        s = function () {
                          var e = i[o],
                            n = e.contentWindow === r.source;
                          if (jr(e.src) && n) {
                            var s = new hn(e);
                            s.getVideoId()
                              .then(function (e) {
                                var t = new RegExp(
                                  "[?&]vimeo_t_".concat(e, "=([^&#]*)")
                                ).exec(window.location.href);
                                if (t && t[1]) {
                                  var r = decodeURI(t[1]);
                                  s.setCurrentTime(r);
                                }
                              })
                              .catch(t);
                          }
                        },
                        o = 0;
                      o < i.length;
                      o++
                    )
                      s();
                }
              });
            }
          })());
        var pn = hn,
          fn = class extends d {
            constructor(e) {
              super(e),
                (this.$el = this.el),
                (this.$video = this.$("video")[0]),
                (this.events = { click: { toggler: "toggleVideo" } });
            }
            init() {
              (this.player = new pn(this.$video)),
                this.player.pause(),
                (this.$observer = new IntersectionObserver((e) => {
                  e.forEach((e) => {
                    e.isIntersecting
                      ? (this.player.play(),
                        this.updateVideo(),
                        this.$video.classList.add("is-loaded"))
                      : this.player.pause();
                  });
                })),
                this.$observer.observe(this.$el);
            }
            play(e) {}
            toggleVideo() {
              const e = document.querySelectorAll('[data-video="toggler"]');
              if (this.$el.classList.contains("has-played")) this.muteVideo();
              else {
                for (let t = 0; t < e.length; t++)
                  if (e[t] !== this.$video) {
                    const r = new pn(e[t]);
                    e[t].classList.remove("has-played"), r.setVolume(0);
                  }
                this.unmuteVideo();
              }
            }
            muteVideo() {
              this.player.setVolume(0), this.$el.classList.remove("has-played");
            }
            unmuteVideo() {
              this.player.setVolume(1), this.$el.classList.add("has-played");
            }
            updateVideo() {
              const e = this.$el;
              this.player.on("timeupdate", function (t) {
                e.style.setProperty("--progress", t.percent);
              });
            }
          },
          mn = class extends d {
            constructor(e) {
              super(e),
                (this.$el = this.el),
                (this.$target = this.el.getAttribute("href")),
                (this.onClickBind = this.onClick.bind(this));
            }
            init() {
              this.bindEvents();
            }
            bindEvents() {
              this.el.addEventListener("click", this.onClickBind);
            }
            unbindEvents() {
              this.el.removeEventListener("click", this.onClickBind);
            }
            onClick() {
              this.call("scrollTo", { target: this.$target }, "Scroll");
            }
            destroy() {
              super.destroy(), this.unbindEvents();
            }
          },
          vn = class extends d {
            constructor(e) {
              super(e),
                (this.$el = this.el),
                (this.$input = this.$("input")[0]),
                (this.$inputCaret = this.$("caret")[0]);
            }
            init() {
              this.$input.addEventListener("focus", this.clickField.bind(this)),
                this.$input.addEventListener("blur", this.clickField.bind(this)),
                this.caret();
            }
            clickField(e) {
              this.$el.classList.toggle("active");
            }
            blurField(e) {
              this.$el.classList.remove("active");
            }
            caret() {
              const e = this.$input,
                t = this.$inputCaret;
              e.addEventListener(
                "keyup",
                function (r) {
                  (t.textContent = e.value), e.setAttribute("value", e.value);
                },
                !1
              );
            }
            destroy() {
              super.destroy();
            }
          };
        const gn = { OPEN: "has-menu-open" };
        var yn = class extends d {
            constructor(e) {
              super(e),
                (this.events = { click: { open: "open", close: "close" } });
            }
            close() {
              Xe.classList.remove(gn.OPEN);
            }
            open() {
              Xe.classList.add(gn.OPEN);
            }
            destroy() {
              document.removeEventListener("keyup", this.closeBind);
            }
          },
          wn = class extends d {
            constructor(e) {
              super(e), (this.events = { click: { open: "openMenu" } });
            }
            openMenu() {
              this.call("open", null, "Menu");
            }
          },
          bn = class extends d {
            constructor(e) {
              super(e),
                (this.events = {
                  submit: { submit: "onSubmit" },
                  click: { calendly: "showCalendly" },
                }),
                (this.$inputs = Array.from(this.$("input"))),
                (this.$calendlyName = this.getData("calendly-name")),
                (this.$calendlyUser = this.getData("calendly-user")),
                (this.$calendlyURL = `https://calendly.com/${this.$calendlyUser}/${this.$calendlyName}`);
            }
            onInputFocus(e) {
              this.$inputs.forEach((t, r) => {
                t.classList.toggle("active", r === e);
              });
            }
            init() {
              this.$inputs.forEach((e, t) => {
                e.addEventListener("keydown", (e) => this.onInputKeyDown(e, t));
              });
            }
            onInputKeyDown(e, t) {
              if ("Enter" === e.key) {
                e.preventDefault();
                const r = this.$inputs[t],
                  n = t + 1;
                if ("" === r.value) {
                  console.log("Current input is empty."),
                    r.classList.add("error");
                  const e = r.closest(".c-form__field");
                  e && e.classList.add("error");
                } else if (
                  (r.closest(".c-form__field").classList.remove("error"),
                  n < this.$inputs.length)
                ) {
                  this.$inputs[n].focus(), this.onInputFocus(n);
                } else
                  console.log("This is the last input. Form can be submitted.");
              }
            }
            hideCalendly() {
              document.getElementById("main-container").style.display = "none";
            }
            showCalendly() {
              Calendly.initPopupWidget({
                url: this.$calendlyURL,
                prefill: {
                  name: this.$inputs[0].value,
                  email: this.$inputs[1].value,
                  customAnswers: { a1: this.$inputs[2].value },
                },
              });
            }
            destroy() {
              document.removeEventListener("keyup", this.closeBind);
            }
          },
          _n = class extends d {
            constructor(e) {
              super(e);
            }
            close() {
              console.log("back"), history.back();
            }
            destroy() {
              document.removeEventListener("keyup", this.closeBind);
            }
          },
          Tn = class extends d {
            constructor(e) {
              super(e), (this.events = { click: { link: "handleClick" } });
            }
            handleClick(e) {
              e.preventDefault(), console.log("handleClick", e);
              const t = e.curTarget.href;
              this.call("goTo", { url: t, transition: "home" }, "Load");
            }
          };
        function En(e) {
          if (void 0 === e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return e;
        }
        function Sn(e, t) {
          (e.prototype = Object.create(t.prototype)),
            (e.prototype.constructor = e),
            (e.__proto__ = t);
        }
        var xn,
          kn,
          Mn,
          Pn,
          On,
          Cn,
          An,
          In,
          Ln,
          Rn,
          zn,
          Dn = {
            autoSleep: 120,
            force3D: "auto",
            nullTargetWarn: 1,
            units: { lineHeight: "" },
          },
          Fn = { duration: 0.5, overwrite: !1, delay: 0 },
          $n = 1e8,
          Nn = 1e-8,
          jn = 2 * Math.PI,
          Vn = jn / 4,
          Bn = 0,
          qn = Math.sqrt,
          Un = Math.cos,
          Hn = Math.sin,
          Wn = function (e) {
            return "string" == typeof e;
          },
          Gn = function (e) {
            return "function" == typeof e;
          },
          Yn = function (e) {
            return "number" == typeof e;
          },
          Xn = function (e) {
            return void 0 === e;
          },
          Kn = function (e) {
            return "object" == typeof e;
          },
          Qn = function (e) {
            return !1 !== e;
          },
          Zn = function () {
            return "undefined" != typeof window;
          },
          Jn = function (e) {
            return Gn(e) || Wn(e);
          },
          ei =
            ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
            function () {},
          ti = Array.isArray,
          ri = /(?:-?\.?\d|\.)+/gi,
          ni = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
          ii = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
          si = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
          oi = /[+-]=-?[.\d]+/,
          ai = /[^,'"\[\]\s]+/gi,
          li = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
          ci = {},
          ui = {},
          di = function (e) {
            return (ui = ji(e, ci)) && Bo;
          },
          hi = function (e, t) {
            return console.warn(
              "Invalid property",
              e,
              "set to",
              t,
              "Missing plugin? gsap.registerPlugin()"
            );
          },
          pi = function (e, t) {
            return !t && console.warn(e);
          },
          fi = function (e, t) {
            return (e && (ci[e] = t) && ui && (ui[e] = t)) || ci;
          },
          mi = function () {
            return 0;
          },
          vi = { suppressEvents: !0, isStart: !0, kill: !1 },
          gi = { suppressEvents: !0, kill: !1 },
          yi = { suppressEvents: !0 },
          wi = {},
          bi = [],
          _i = {},
          Ti = {},
          Ei = {},
          Si = 30,
          xi = [],
          ki = "",
          Mi = function (e) {
            var t,
              r,
              n = e[0];
            if ((Kn(n) || Gn(n) || (e = [e]), !(t = (n._gsap || {}).harness))) {
              for (r = xi.length; r-- && !xi[r].targetTest(n); );
              t = xi[r];
            }
            for (r = e.length; r--; )
              (e[r] && (e[r]._gsap || (e[r]._gsap = new to(e[r], t)))) ||
                e.splice(r, 1);
            return e;
          },
          Pi = function (e) {
            return e._gsap || Mi(ys(e))[0]._gsap;
          },
          Oi = function (e, t, r) {
            return (r = e[t]) && Gn(r)
              ? e[t]()
              : (Xn(r) && e.getAttribute && e.getAttribute(t)) || r;
          },
          Ci = function (e, t) {
            return (e = e.split(",")).forEach(t) || e;
          },
          Ai = function (e) {
            return Math.round(1e5 * e) / 1e5 || 0;
          },
          Ii = function (e) {
            return Math.round(1e7 * e) / 1e7 || 0;
          },
          Li = function (e, t) {
            var r = t.charAt(0),
              n = parseFloat(t.substr(2));
            return (
              (e = parseFloat(e)),
              "+" === r ? e + n : "-" === r ? e - n : "*" === r ? e * n : e / n
            );
          },
          Ri = function (e, t) {
            for (var r = t.length, n = 0; e.indexOf(t[n]) < 0 && ++n < r; );
            return n < r;
          },
          zi = function () {
            var e,
              t,
              r = bi.length,
              n = bi.slice(0);
            for (_i = {}, bi.length = 0, e = 0; e < r; e++)
              (t = n[e]) &&
                t._lazy &&
                (t.render(t._lazy[0], t._lazy[1], !0)._lazy = 0);
          },
          Di = function (e, t, r, n) {
            bi.length && !kn && zi(),
              e.render(t, r, n || (kn && t < 0 && (e._initted || e._startAt))),
              bi.length && !kn && zi();
          },
          Fi = function (e) {
            var t = parseFloat(e);
            return (t || 0 === t) && (e + "").match(ai).length < 2
              ? t
              : Wn(e)
              ? e.trim()
              : e;
          },
          $i = function (e) {
            return e;
          },
          Ni = function (e, t) {
            for (var r in t) r in e || (e[r] = t[r]);
            return e;
          },
          ji = function (e, t) {
            for (var r in t) e[r] = t[r];
            return e;
          },
          Vi = function e(t, r) {
            for (var n in r)
              "__proto__" !== n &&
                "constructor" !== n &&
                "prototype" !== n &&
                (t[n] = Kn(r[n]) ? e(t[n] || (t[n] = {}), r[n]) : r[n]);
            return t;
          },
          Bi = function (e, t) {
            var r,
              n = {};
            for (r in e) r in t || (n[r] = e[r]);
            return n;
          },
          qi = function (e) {
            var t,
              r = e.parent || Pn,
              n = e.keyframes
                ? ((t = ti(e.keyframes)),
                  function (e, r) {
                    for (var n in r)
                      n in e ||
                        ("duration" === n && t) ||
                        "ease" === n ||
                        (e[n] = r[n]);
                  })
                : Ni;
            if (Qn(e.inherit))
              for (; r; ) n(e, r.vars.defaults), (r = r.parent || r._dp);
            return e;
          },
          Ui = function (e, t, r, n, i) {
            void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
            var s,
              o = e[n];
            if (i) for (s = t[i]; o && o[i] > s; ) o = o._prev;
            return (
              o
                ? ((t._next = o._next), (o._next = t))
                : ((t._next = e[r]), (e[r] = t)),
              t._next ? (t._next._prev = t) : (e[n] = t),
              (t._prev = o),
              (t.parent = t._dp = e),
              t
            );
          },
          Hi = function (e, t, r, n) {
            void 0 === r && (r = "_first"), void 0 === n && (n = "_last");
            var i = t._prev,
              s = t._next;
            i ? (i._next = s) : e[r] === t && (e[r] = s),
              s ? (s._prev = i) : e[n] === t && (e[n] = i),
              (t._next = t._prev = t.parent = null);
          },
          Wi = function (e, t) {
            e.parent &&
              (!t || e.parent.autoRemoveChildren) &&
              e.parent.remove &&
              e.parent.remove(e),
              (e._act = 0);
          },
          Gi = function (e, t) {
            if (e && (!t || t._end > e._dur || t._start < 0))
              for (var r = e; r; ) (r._dirty = 1), (r = r.parent);
            return e;
          },
          Yi = function (e, t, r, n) {
            return (
              e._startAt &&
              (kn
                ? e._startAt.revert(gi)
                : (e.vars.immediateRender && !e.vars.autoRevert) ||
                  e._startAt.render(t, !0, n))
            );
          },
          Xi = function e(t) {
            return !t || (t._ts && e(t.parent));
          },
          Ki = function (e) {
            return e._repeat
              ? Qi(e._tTime, (e = e.duration() + e._rDelay)) * e
              : 0;
          },
          Qi = function (e, t) {
            var r = Math.floor((e /= t));
            return e && r === e ? r - 1 : r;
          },
          Zi = function (e, t) {
            return (
              (e - t._start) * t._ts +
              (t._ts >= 0 ? 0 : t._dirty ? t.totalDuration() : t._tDur)
            );
          },
          Ji = function (e) {
            return (e._end = Ii(
              e._start + (e._tDur / Math.abs(e._ts || e._rts || Nn) || 0)
            ));
          },
          es = function (e, t) {
            var r = e._dp;
            return (
              r &&
                r.smoothChildTiming &&
                e._ts &&
                ((e._start = Ii(
                  r._time -
                    (e._ts > 0
                      ? t / e._ts
                      : ((e._dirty ? e.totalDuration() : e._tDur) - t) / -e._ts)
                )),
                Ji(e),
                r._dirty || Gi(r, e)),
              e
            );
          },
          ts = function (e, t) {
            var r;
            if (
              ((t._time ||
                (!t._dur && t._initted) ||
                (t._start < e._time && (t._dur || !t.add))) &&
                ((r = Zi(e.rawTime(), t)),
                (!t._dur || ps(0, t.totalDuration(), r) - t._tTime > Nn) &&
                  t.render(r, !0)),
              Gi(e, t)._dp && e._initted && e._time >= e._dur && e._ts)
            ) {
              if (e._dur < e.duration())
                for (r = e; r._dp; )
                  r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
              e._zTime = -1e-8;
            }
          },
          rs = function (e, t, r, n) {
            return (
              t.parent && Wi(t),
              (t._start = Ii(
                (Yn(r) ? r : r || e !== Pn ? us(e, r, t) : e._time) + t._delay
              )),
              (t._end = Ii(
                t._start + (t.totalDuration() / Math.abs(t.timeScale()) || 0)
              )),
              Ui(e, t, "_first", "_last", e._sort ? "_start" : 0),
              os(t) || (e._recent = t),
              n || ts(e, t),
              e._ts < 0 && es(e, e._tTime),
              e
            );
          },
          ns = function (e, t) {
            return (
              (ci.ScrollTrigger || hi("scrollTrigger", t)) &&
              ci.ScrollTrigger.create(t, e)
            );
          },
          is = function (e, t, r, n, i) {
            return (
              co(e, t, i),
              e._initted
                ? !r &&
                  e._pt &&
                  !kn &&
                  ((e._dur && !1 !== e.vars.lazy) || (!e._dur && e.vars.lazy)) &&
                  Ln !== Bs.frame
                  ? (bi.push(e), (e._lazy = [i, n]), 1)
                  : void 0
                : 1
            );
          },
          ss = function e(t) {
            var r = t.parent;
            return (
              r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || e(r))
            );
          },
          os = function (e) {
            var t = e.data;
            return "isFromStart" === t || "isStart" === t;
          },
          as = function (e, t, r, n) {
            var i = e._repeat,
              s = Ii(t) || 0,
              o = e._tTime / e._tDur;
            return (
              o && !n && (e._time *= s / e._dur),
              (e._dur = s),
              (e._tDur = i
                ? i < 0
                  ? 1e10
                  : Ii(s * (i + 1) + e._rDelay * i)
                : s),
              o > 0 && !n && es(e, (e._tTime = e._tDur * o)),
              e.parent && Ji(e),
              r || Gi(e.parent, e),
              e
            );
          },
          ls = function (e) {
            return e instanceof no ? Gi(e) : as(e, e._dur);
          },
          cs = { _start: 0, endTime: mi, totalDuration: mi },
          us = function e(t, r, n) {
            var i,
              s,
              o,
              a = t.labels,
              l = t._recent || cs,
              c = t.duration() >= $n ? l.endTime(!1) : t._dur;
            return Wn(r) && (isNaN(r) || r in a)
              ? ((s = r.charAt(0)),
                (o = "%" === r.substr(-1)),
                (i = r.indexOf("=")),
                "<" === s || ">" === s
                  ? (i >= 0 && (r = r.replace(/=/, "")),
                    ("<" === s ? l._start : l.endTime(l._repeat >= 0)) +
                      (parseFloat(r.substr(1)) || 0) *
                        (o ? (i < 0 ? l : n).totalDuration() / 100 : 1))
                  : i < 0
                  ? (r in a || (a[r] = c), a[r])
                  : ((s = parseFloat(r.charAt(i - 1) + r.substr(i + 1))),
                    o &&
                      n &&
                      (s = (s / 100) * (ti(n) ? n[0] : n).totalDuration()),
                    i > 1 ? e(t, r.substr(0, i - 1), n) + s : c + s))
              : null == r
              ? c
              : +r;
          },
          ds = function (e, t, r) {
            var n,
              i,
              s = Yn(t[1]),
              o = (s ? 2 : 1) + (e < 2 ? 0 : 1),
              a = t[o];
            if ((s && (a.duration = t[1]), (a.parent = r), e)) {
              for (n = a, i = r; i && !("immediateRender" in n); )
                (n = i.vars.defaults || {}), (i = Qn(i.vars.inherit) && i.parent);
              (a.immediateRender = Qn(n.immediateRender)),
                e < 2 ? (a.runBackwards = 1) : (a.startAt = t[o - 1]);
            }
            return new mo(t[0], a, t[o + 1]);
          },
          hs = function (e, t) {
            return e || 0 === e ? t(e) : t;
          },
          ps = function (e, t, r) {
            return r < e ? e : r > t ? t : r;
          },
          fs = function (e, t) {
            return Wn(e) && (t = li.exec(e)) ? t[1] : "";
          },
          ms = [].slice,
          vs = function (e, t) {
            return (
              e &&
              Kn(e) &&
              "length" in e &&
              ((!t && !e.length) || (e.length - 1 in e && Kn(e[0]))) &&
              !e.nodeType &&
              e !== On
            );
          },
          gs = function (e, t, r) {
            return (
              void 0 === r && (r = []),
              e.forEach(function (e) {
                var n;
                return (Wn(e) && !t) || vs(e, 1)
                  ? (n = r).push.apply(n, ys(e))
                  : r.push(e);
              }) || r
            );
          },
          ys = function (e, t, r) {
            return Mn && !t && Mn.selector
              ? Mn.selector(e)
              : !Wn(e) || r || (!Cn && qs())
              ? ti(e)
                ? gs(e, r)
                : vs(e)
                ? ms.call(e, 0)
                : e
                ? [e]
                : []
              : ms.call((t || An).querySelectorAll(e), 0);
          },
          ws = function (e) {
            return (
              (e = ys(e)[0] || pi("Invalid scope") || {}),
              function (t) {
                var r = e.current || e.nativeElement || e;
                return ys(
                  t,
                  r.querySelectorAll
                    ? r
                    : r === e
                    ? pi("Invalid scope") || An.createElement("div")
                    : e
                );
              }
            );
          },
          bs = function (e) {
            return e.sort(function () {
              return 0.5 - Math.random();
            });
          },
          _s = function (e) {
            if (Gn(e)) return e;
            var t = Kn(e) ? e : { each: e },
              r = Ks(t.ease),
              n = t.from || 0,
              i = parseFloat(t.base) || 0,
              s = {},
              o = n > 0 && n < 1,
              a = isNaN(n) || o,
              l = t.axis,
              c = n,
              u = n;
            return (
              Wn(n)
                ? (c = u = { center: 0.5, edges: 0.5, end: 1 }[n] || 0)
                : !o && a && ((c = n[0]), (u = n[1])),
              function (e, o, d) {
                var h,
                  p,
                  f,
                  m,
                  v,
                  g,
                  y,
                  w,
                  b,
                  _ = (d || t).length,
                  T = s[_];
                if (!T) {
                  if (!(b = "auto" === t.grid ? 0 : (t.grid || [1, $n])[1])) {
                    for (
                      y = -$n;
                      y < (y = d[b++].getBoundingClientRect().left) && b < _;
  
                    );
                    b < _ && b--;
                  }
                  for (
                    T = s[_] = [],
                      h = a ? Math.min(b, _) * c - 0.5 : n % b,
                      p = b === $n ? 0 : a ? (_ * u) / b - 0.5 : (n / b) | 0,
                      y = 0,
                      w = $n,
                      g = 0;
                    g < _;
                    g++
                  )
                    (f = (g % b) - h),
                      (m = p - ((g / b) | 0)),
                      (T[g] = v =
                        l ? Math.abs("y" === l ? m : f) : qn(f * f + m * m)),
                      v > y && (y = v),
                      v < w && (w = v);
                  "random" === n && bs(T),
                    (T.max = y - w),
                    (T.min = w),
                    (T.v = _ =
                      (parseFloat(t.amount) ||
                        parseFloat(t.each) *
                          (b > _
                            ? _ - 1
                            : l
                            ? "y" === l
                              ? _ / b
                              : b
                            : Math.max(b, _ / b)) ||
                        0) * ("edges" === n ? -1 : 1)),
                    (T.b = _ < 0 ? i - _ : i),
                    (T.u = fs(t.amount || t.each) || 0),
                    (r = r && _ < 0 ? Ys(r) : r);
                }
                return (
                  (_ = (T[e] - T.min) / T.max || 0),
                  Ii(T.b + (r ? r(_) : _) * T.v) + T.u
                );
              }
            );
          },
          Ts = function (e) {
            var t = Math.pow(10, ((e + "").split(".")[1] || "").length);
            return function (r) {
              var n = Ii(Math.round(parseFloat(r) / e) * e * t);
              return (n - (n % 1)) / t + (Yn(r) ? 0 : fs(r));
            };
          },
          Es = function (e, t) {
            var r,
              n,
              i = ti(e);
            return (
              !i &&
                Kn(e) &&
                ((r = i = e.radius || $n),
                e.values
                  ? ((e = ys(e.values)), (n = !Yn(e[0])) && (r *= r))
                  : (e = Ts(e.increment))),
              hs(
                t,
                i
                  ? Gn(e)
                    ? function (t) {
                        return (n = e(t)), Math.abs(n - t) <= r ? n : t;
                      }
                    : function (t) {
                        for (
                          var i,
                            s,
                            o = parseFloat(n ? t.x : t),
                            a = parseFloat(n ? t.y : 0),
                            l = $n,
                            c = 0,
                            u = e.length;
                          u--;
  
                        )
                          (i = n
                            ? (i = e[u].x - o) * i + (s = e[u].y - a) * s
                            : Math.abs(e[u] - o)) < l && ((l = i), (c = u));
                        return (
                          (c = !r || l <= r ? e[c] : t),
                          n || c === t || Yn(t) ? c : c + fs(t)
                        );
                      }
                  : Ts(e)
              )
            );
          },
          Ss = function (e, t, r, n) {
            return hs(ti(e) ? !t : !0 === r ? !!(r = 0) : !n, function () {
              return ti(e)
                ? e[~~(Math.random() * e.length)]
                : (r = r || 1e-5) &&
                    (n = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
                    Math.floor(
                      Math.round(
                        (e - r / 2 + Math.random() * (t - e + 0.99 * r)) / r
                      ) *
                        r *
                        n
                    ) / n;
            });
          },
          xs = function (e, t, r) {
            return hs(r, function (r) {
              return e[~~t(r)];
            });
          },
          ks = function (e) {
            for (var t, r, n, i, s = 0, o = ""; ~(t = e.indexOf("random(", s)); )
              (n = e.indexOf(")", t)),
                (i = "[" === e.charAt(t + 7)),
                (r = e.substr(t + 7, n - t - 7).match(i ? ai : ri)),
                (o +=
                  e.substr(s, t - s) +
                  Ss(i ? r : +r[0], i ? 0 : +r[1], +r[2] || 1e-5)),
                (s = n + 1);
            return o + e.substr(s, e.length - s);
          },
          Ms = function (e, t, r, n, i) {
            var s = t - e,
              o = n - r;
            return hs(i, function (t) {
              return r + (((t - e) / s) * o || 0);
            });
          },
          Ps = function (e, t, r) {
            var n,
              i,
              s,
              o = e.labels,
              a = $n;
            for (n in o)
              (i = o[n] - t) < 0 == !!r &&
                i &&
                a > (i = Math.abs(i)) &&
                ((s = n), (a = i));
            return s;
          },
          Os = function (e, t, r) {
            var n,
              i,
              s,
              o = e.vars,
              a = o[t],
              l = Mn,
              c = e._ctx;
            if (a)
              return (
                (n = o[t + "Params"]),
                (i = o.callbackScope || e),
                r && bi.length && zi(),
                c && (Mn = c),
                (s = n ? a.apply(i, n) : a.call(i)),
                (Mn = l),
                s
              );
          },
          Cs = function (e) {
            return (
              Wi(e),
              e.scrollTrigger && e.scrollTrigger.kill(!!kn),
              e.progress() < 1 && Os(e, "onInterrupt"),
              e
            );
          },
          As = [],
          Is = function (e) {
            if (e)
              if (((e = (!e.name && e.default) || e), Zn() || e.headless)) {
                var t = e.name,
                  r = Gn(e),
                  n =
                    t && !r && e.init
                      ? function () {
                          this._props = [];
                        }
                      : e,
                  i = {
                    init: mi,
                    render: So,
                    add: ao,
                    kill: ko,
                    modifier: xo,
                    rawVars: 0,
                  },
                  s = {
                    targetTest: 0,
                    get: 0,
                    getSetter: bo,
                    aliases: {},
                    register: 0,
                  };
                if ((qs(), e !== n)) {
                  if (Ti[t]) return;
                  Ni(n, Ni(Bi(e, i), s)),
                    ji(n.prototype, ji(i, Bi(e, s))),
                    (Ti[(n.prop = t)] = n),
                    e.targetTest && (xi.push(n), (wi[t] = 1)),
                    (t =
                      ("css" === t
                        ? "CSS"
                        : t.charAt(0).toUpperCase() + t.substr(1)) + "Plugin");
                }
                fi(t, n), e.register && e.register(Bo, n, Oo);
              } else As.push(e);
          },
          Ls = 255,
          Rs = {
            aqua: [0, Ls, Ls],
            lime: [0, Ls, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, Ls],
            navy: [0, 0, 128],
            white: [Ls, Ls, Ls],
            olive: [128, 128, 0],
            yellow: [Ls, Ls, 0],
            orange: [Ls, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [Ls, 0, 0],
            pink: [Ls, 192, 203],
            cyan: [0, Ls, Ls],
            transparent: [Ls, Ls, Ls, 0],
          },
          zs = function (e, t, r) {
            return (
              ((6 * (e += e < 0 ? 1 : e > 1 ? -1 : 0) < 1
                ? t + (r - t) * e * 6
                : e < 0.5
                ? r
                : 3 * e < 2
                ? t + (r - t) * (2 / 3 - e) * 6
                : t) *
                Ls +
                0.5) |
              0
            );
          },
          Ds = function (e, t, r) {
            var n,
              i,
              s,
              o,
              a,
              l,
              c,
              u,
              d,
              h,
              p = e ? (Yn(e) ? [e >> 16, (e >> 8) & Ls, e & Ls] : 0) : Rs.black;
            if (!p) {
              if (
                ("," === e.substr(-1) && (e = e.substr(0, e.length - 1)), Rs[e])
              )
                p = Rs[e];
              else if ("#" === e.charAt(0)) {
                if (
                  (e.length < 6 &&
                    ((n = e.charAt(1)),
                    (i = e.charAt(2)),
                    (s = e.charAt(3)),
                    (e =
                      "#" +
                      n +
                      n +
                      i +
                      i +
                      s +
                      s +
                      (5 === e.length ? e.charAt(4) + e.charAt(4) : ""))),
                  9 === e.length)
                )
                  return [
                    (p = parseInt(e.substr(1, 6), 16)) >> 16,
                    (p >> 8) & Ls,
                    p & Ls,
                    parseInt(e.substr(7), 16) / 255,
                  ];
                p = [
                  (e = parseInt(e.substr(1), 16)) >> 16,
                  (e >> 8) & Ls,
                  e & Ls,
                ];
              } else if ("hsl" === e.substr(0, 3))
                if (((p = h = e.match(ri)), t)) {
                  if (~e.indexOf("="))
                    return (p = e.match(ni)), r && p.length < 4 && (p[3] = 1), p;
                } else
                  (o = (+p[0] % 360) / 360),
                    (a = +p[1] / 100),
                    (n =
                      2 * (l = +p[2] / 100) -
                      (i = l <= 0.5 ? l * (a + 1) : l + a - l * a)),
                    p.length > 3 && (p[3] *= 1),
                    (p[0] = zs(o + 1 / 3, n, i)),
                    (p[1] = zs(o, n, i)),
                    (p[2] = zs(o - 1 / 3, n, i));
              else p = e.match(ri) || Rs.transparent;
              p = p.map(Number);
            }
            return (
              t &&
                !h &&
                ((n = p[0] / Ls),
                (i = p[1] / Ls),
                (s = p[2] / Ls),
                (l = ((c = Math.max(n, i, s)) + (u = Math.min(n, i, s))) / 2),
                c === u
                  ? (o = a = 0)
                  : ((d = c - u),
                    (a = l > 0.5 ? d / (2 - c - u) : d / (c + u)),
                    (o =
                      c === n
                        ? (i - s) / d + (i < s ? 6 : 0)
                        : c === i
                        ? (s - n) / d + 2
                        : (n - i) / d + 4),
                    (o *= 60)),
                (p[0] = ~~(o + 0.5)),
                (p[1] = ~~(100 * a + 0.5)),
                (p[2] = ~~(100 * l + 0.5))),
              r && p.length < 4 && (p[3] = 1),
              p
            );
          },
          Fs = function (e) {
            var t = [],
              r = [],
              n = -1;
            return (
              e.split(Ns).forEach(function (e) {
                var i = e.match(ii) || [];
                t.push.apply(t, i), r.push((n += i.length + 1));
              }),
              (t.c = r),
              t
            );
          },
          $s = function (e, t, r) {
            var n,
              i,
              s,
              o,
              a = "",
              l = (e + a).match(Ns),
              c = t ? "hsla(" : "rgba(",
              u = 0;
            if (!l) return e;
            if (
              ((l = l.map(function (e) {
                return (
                  (e = Ds(e, t, 1)) &&
                  c +
                    (t
                      ? e[0] + "," + e[1] + "%," + e[2] + "%," + e[3]
                      : e.join(",")) +
                    ")"
                );
              })),
              r && ((s = Fs(e)), (n = r.c).join(a) !== s.c.join(a)))
            )
              for (o = (i = e.replace(Ns, "1").split(ii)).length - 1; u < o; u++)
                a +=
                  i[u] +
                  (~n.indexOf(u)
                    ? l.shift() || c + "0,0,0,0)"
                    : (s.length ? s : l.length ? l : r).shift());
            if (!i)
              for (o = (i = e.split(Ns)).length - 1; u < o; u++) a += i[u] + l[u];
            return a + i[o];
          },
          Ns = (function () {
            var e,
              t =
                "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
            for (e in Rs) t += "|" + e + "\\b";
            return new RegExp(t + ")", "gi");
          })(),
          js = /hsl[a]?\(/,
          Vs = function (e) {
            var t,
              r = e.join(" ");
            if (((Ns.lastIndex = 0), Ns.test(r)))
              return (
                (t = js.test(r)),
                (e[1] = $s(e[1], t)),
                (e[0] = $s(e[0], t, Fs(e[1]))),
                !0
              );
          },
          Bs = (function () {
            var e,
              t,
              r,
              n,
              i,
              s,
              o = Date.now,
              a = 500,
              l = 33,
              c = o(),
              u = c,
              d = 1e3 / 240,
              h = d,
              p = [],
              f = function r(f) {
                var m,
                  v,
                  g,
                  y,
                  w = o() - u,
                  b = !0 === f;
                if (
                  ((w > a || w < 0) && (c += w - l),
                  ((m = (g = (u += w) - c) - h) > 0 || b) &&
                    ((y = ++n.frame),
                    (i = g - 1e3 * n.time),
                    (n.time = g /= 1e3),
                    (h += m + (m >= d ? 4 : d - m)),
                    (v = 1)),
                  b || (e = t(r)),
                  v)
                )
                  for (s = 0; s < p.length; s++) p[s](g, i, y, f);
              };
            return (
              (n = {
                time: 0,
                frame: 0,
                tick: function () {
                  f(!0);
                },
                deltaRatio: function (e) {
                  return i / (1e3 / (e || 60));
                },
                wake: function () {
                  In &&
                    (!Cn &&
                      Zn() &&
                      ((On = Cn = window),
                      (An = On.document || {}),
                      (ci.gsap = Bo),
                      (On.gsapVersions || (On.gsapVersions = [])).push(
                        Bo.version
                      ),
                      di(ui || On.GreenSockGlobals || (!On.gsap && On) || {}),
                      As.forEach(Is)),
                    (r =
                      "undefined" != typeof requestAnimationFrame &&
                      requestAnimationFrame),
                    e && n.sleep(),
                    (t =
                      r ||
                      function (e) {
                        return setTimeout(e, (h - 1e3 * n.time + 1) | 0);
                      }),
                    (zn = 1),
                    f(2));
                },
                sleep: function () {
                  (r ? cancelAnimationFrame : clearTimeout)(e),
                    (zn = 0),
                    (t = mi);
                },
                lagSmoothing: function (e, t) {
                  (a = e || 1 / 0), (l = Math.min(t || 33, a));
                },
                fps: function (e) {
                  (d = 1e3 / (e || 240)), (h = 1e3 * n.time + d);
                },
                add: function (e, t, r) {
                  var i = t
                    ? function (t, r, s, o) {
                        e(t, r, s, o), n.remove(i);
                      }
                    : e;
                  return n.remove(e), p[r ? "unshift" : "push"](i), qs(), i;
                },
                remove: function (e, t) {
                  ~(t = p.indexOf(e)) && p.splice(t, 1) && s >= t && s--;
                },
                _listeners: p,
              }),
              n
            );
          })(),
          qs = function () {
            return !zn && Bs.wake();
          },
          Us = {},
          Hs = /^[\d.\-M][\d.\-,\s]/,
          Ws = /["']/g,
          Gs = function (e) {
            for (
              var t,
                r,
                n,
                i = {},
                s = e.substr(1, e.length - 3).split(":"),
                o = s[0],
                a = 1,
                l = s.length;
              a < l;
              a++
            )
              (r = s[a]),
                (t = a !== l - 1 ? r.lastIndexOf(",") : r.length),
                (n = r.substr(0, t)),
                (i[o] = isNaN(n) ? n.replace(Ws, "").trim() : +n),
                (o = r.substr(t + 1).trim());
            return i;
          },
          Ys = function (e) {
            return function (t) {
              return 1 - e(1 - t);
            };
          },
          Xs = function e(t, r) {
            for (var n, i = t._first; i; )
              i instanceof no
                ? e(i, r)
                : !i.vars.yoyoEase ||
                  (i._yoyo && i._repeat) ||
                  i._yoyo === r ||
                  (i.timeline
                    ? e(i.timeline, r)
                    : ((n = i._ease),
                      (i._ease = i._yEase),
                      (i._yEase = n),
                      (i._yoyo = r))),
                (i = i._next);
          },
          Ks = function (e, t) {
            return (
              (e &&
                (Gn(e)
                  ? e
                  : Us[e] ||
                    (function (e) {
                      var t,
                        r,
                        n,
                        i,
                        s = (e + "").split("("),
                        o = Us[s[0]];
                      return o && s.length > 1 && o.config
                        ? o.config.apply(
                            null,
                            ~e.indexOf("{")
                              ? [Gs(s[1])]
                              : ((t = e),
                                (r = t.indexOf("(") + 1),
                                (n = t.indexOf(")")),
                                (i = t.indexOf("(", r)),
                                t.substring(
                                  r,
                                  ~i && i < n ? t.indexOf(")", n + 1) : n
                                ))
                                  .split(",")
                                  .map(Fi)
                          )
                        : Us._CE && Hs.test(e)
                        ? Us._CE("", e)
                        : o;
                    })(e))) ||
              t
            );
          },
          Qs = function (e, t, r, n) {
            void 0 === r &&
              (r = function (e) {
                return 1 - t(1 - e);
              }),
              void 0 === n &&
                (n = function (e) {
                  return e < 0.5 ? t(2 * e) / 2 : 1 - t(2 * (1 - e)) / 2;
                });
            var i,
              s = { easeIn: t, easeOut: r, easeInOut: n };
            return (
              Ci(e, function (e) {
                for (var t in ((Us[e] = ci[e] = s),
                (Us[(i = e.toLowerCase())] = r),
                s))
                  Us[
                    i +
                      ("easeIn" === t
                        ? ".in"
                        : "easeOut" === t
                        ? ".out"
                        : ".inOut")
                  ] = Us[e + "." + t] = s[t];
              }),
              s
            );
          },
          Zs = function (e) {
            return function (t) {
              return t < 0.5
                ? (1 - e(1 - 2 * t)) / 2
                : 0.5 + e(2 * (t - 0.5)) / 2;
            };
          },
          Js = function e(t, r, n) {
            var i = r >= 1 ? r : 1,
              s = (n || (t ? 0.3 : 0.45)) / (r < 1 ? r : 1),
              o = (s / jn) * (Math.asin(1 / i) || 0),
              a = function (e) {
                return 1 === e
                  ? 1
                  : i * Math.pow(2, -10 * e) * Hn((e - o) * s) + 1;
              },
              l =
                "out" === t
                  ? a
                  : "in" === t
                  ? function (e) {
                      return 1 - a(1 - e);
                    }
                  : Zs(a);
            return (
              (s = jn / s),
              (l.config = function (r, n) {
                return e(t, r, n);
              }),
              l
            );
          },
          eo = function e(t, r) {
            void 0 === r && (r = 1.70158);
            var n = function (e) {
                return e ? --e * e * ((r + 1) * e + r) + 1 : 0;
              },
              i =
                "out" === t
                  ? n
                  : "in" === t
                  ? function (e) {
                      return 1 - n(1 - e);
                    }
                  : Zs(n);
            return (
              (i.config = function (r) {
                return e(t, r);
              }),
              i
            );
          };
        Ci("Linear,Quad,Cubic,Quart,Quint,Strong", function (e, t) {
          var r = t < 5 ? t + 1 : t;
          Qs(
            e + ",Power" + (r - 1),
            t
              ? function (e) {
                  return Math.pow(e, r);
                }
              : function (e) {
                  return e;
                },
            function (e) {
              return 1 - Math.pow(1 - e, r);
            },
            function (e) {
              return e < 0.5
                ? Math.pow(2 * e, r) / 2
                : 1 - Math.pow(2 * (1 - e), r) / 2;
            }
          );
        }),
          (Us.Linear.easeNone = Us.none = Us.Linear.easeIn),
          Qs("Elastic", Js("in"), Js("out"), Js()),
          (function (e, t) {
            var r = 1 / t,
              n = function (n) {
                return n < r
                  ? e * n * n
                  : n < 0.7272727272727273
                  ? e * Math.pow(n - 1.5 / t, 2) + 0.75
                  : n < 0.9090909090909092
                  ? e * (n -= 2.25 / t) * n + 0.9375
                  : e * Math.pow(n - 2.625 / t, 2) + 0.984375;
              };
            Qs(
              "Bounce",
              function (e) {
                return 1 - n(1 - e);
              },
              n
            );
          })(7.5625, 2.75),
          Qs("Expo", function (e) {
            return e ? Math.pow(2, 10 * (e - 1)) : 0;
          }),
          Qs("Circ", function (e) {
            return -(qn(1 - e * e) - 1);
          }),
          Qs("Sine", function (e) {
            return 1 === e ? 1 : 1 - Un(e * Vn);
          }),
          Qs("Back", eo("in"), eo("out"), eo()),
          (Us.SteppedEase =
            Us.steps =
            ci.SteppedEase =
              {
                config: function (e, t) {
                  void 0 === e && (e = 1);
                  var r = 1 / e,
                    n = e + (t ? 0 : 1),
                    i = t ? 1 : 0;
                  return function (e) {
                    return (((n * ps(0, 0.99999999, e)) | 0) + i) * r;
                  };
                },
              }),
          (Fn.ease = Us["quad.out"]),
          Ci(
            "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
            function (e) {
              return (ki += e + "," + e + "Params,");
            }
          );
        var to = function (e, t) {
            (this.id = Bn++),
              (e._gsap = this),
              (this.target = e),
              (this.harness = t),
              (this.get = t ? t.get : Oi),
              (this.set = t ? t.getSetter : bo);
          },
          ro = (function () {
            function e(e) {
              (this.vars = e),
                (this._delay = +e.delay || 0),
                (this._repeat = e.repeat === 1 / 0 ? -2 : e.repeat || 0) &&
                  ((this._rDelay = e.repeatDelay || 0),
                  (this._yoyo = !!e.yoyo || !!e.yoyoEase)),
                (this._ts = 1),
                as(this, +e.duration, 1, 1),
                (this.data = e.data),
                Mn && ((this._ctx = Mn), Mn.data.push(this)),
                zn || Bs.wake();
            }
            var t = e.prototype;
            return (
              (t.delay = function (e) {
                return e || 0 === e
                  ? (this.parent &&
                      this.parent.smoothChildTiming &&
                      this.startTime(this._start + e - this._delay),
                    (this._delay = e),
                    this)
                  : this._delay;
              }),
              (t.duration = function (e) {
                return arguments.length
                  ? this.totalDuration(
                      this._repeat > 0 ? e + (e + this._rDelay) * this._repeat : e
                    )
                  : this.totalDuration() && this._dur;
              }),
              (t.totalDuration = function (e) {
                return arguments.length
                  ? ((this._dirty = 0),
                    as(
                      this,
                      this._repeat < 0
                        ? e
                        : (e - this._repeat * this._rDelay) / (this._repeat + 1)
                    ))
                  : this._tDur;
              }),
              (t.totalTime = function (e, t) {
                if ((qs(), !arguments.length)) return this._tTime;
                var r = this._dp;
                if (r && r.smoothChildTiming && this._ts) {
                  for (
                    es(this, e), !r._dp || r.parent || ts(r, this);
                    r && r.parent;
  
                  )
                    r.parent._time !==
                      r._start +
                        (r._ts >= 0
                          ? r._tTime / r._ts
                          : (r.totalDuration() - r._tTime) / -r._ts) &&
                      r.totalTime(r._tTime, !0),
                      (r = r.parent);
                  !this.parent &&
                    this._dp.autoRemoveChildren &&
                    ((this._ts > 0 && e < this._tDur) ||
                      (this._ts < 0 && e > 0) ||
                      (!this._tDur && !e)) &&
                    rs(this._dp, this, this._start - this._delay);
                }
                return (
                  (this._tTime !== e ||
                    (!this._dur && !t) ||
                    (this._initted && Math.abs(this._zTime) === Nn) ||
                    (!e && !this._initted && (this.add || this._ptLookup))) &&
                    (this._ts || (this._pTime = e), Di(this, e, t)),
                  this
                );
              }),
              (t.time = function (e, t) {
                return arguments.length
                  ? this.totalTime(
                      Math.min(this.totalDuration(), e + Ki(this)) %
                        (this._dur + this._rDelay) || (e ? this._dur : 0),
                      t
                    )
                  : this._time;
              }),
              (t.totalProgress = function (e, t) {
                return arguments.length
                  ? this.totalTime(this.totalDuration() * e, t)
                  : this.totalDuration()
                  ? Math.min(1, this._tTime / this._tDur)
                  : this.rawTime() > 0
                  ? 1
                  : 0;
              }),
              (t.progress = function (e, t) {
                return arguments.length
                  ? this.totalTime(
                      this.duration() *
                        (!this._yoyo || 1 & this.iteration() ? e : 1 - e) +
                        Ki(this),
                      t
                    )
                  : this.duration()
                  ? Math.min(1, this._time / this._dur)
                  : this.rawTime() > 0
                  ? 1
                  : 0;
              }),
              (t.iteration = function (e, t) {
                var r = this.duration() + this._rDelay;
                return arguments.length
                  ? this.totalTime(this._time + (e - 1) * r, t)
                  : this._repeat
                  ? Qi(this._tTime, r) + 1
                  : 1;
              }),
              (t.timeScale = function (e, t) {
                if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
                if (this._rts === e) return this;
                var r =
                  this.parent && this._ts
                    ? Zi(this.parent._time, this)
                    : this._tTime;
                return (
                  (this._rts = +e || 0),
                  (this._ts = this._ps || -1e-8 === e ? 0 : this._rts),
                  this.totalTime(
                    ps(-Math.abs(this._delay), this._tDur, r),
                    !1 !== t
                  ),
                  Ji(this),
                  (function (e) {
                    for (var t = e.parent; t && t.parent; )
                      (t._dirty = 1), t.totalDuration(), (t = t.parent);
                    return e;
                  })(this)
                );
              }),
              (t.paused = function (e) {
                return arguments.length
                  ? (this._ps !== e &&
                      ((this._ps = e),
                      e
                        ? ((this._pTime =
                            this._tTime ||
                            Math.max(-this._delay, this.rawTime())),
                          (this._ts = this._act = 0))
                        : (qs(),
                          (this._ts = this._rts),
                          this.totalTime(
                            this.parent && !this.parent.smoothChildTiming
                              ? this.rawTime()
                              : this._tTime || this._pTime,
                            1 === this.progress() &&
                              Math.abs(this._zTime) !== Nn &&
                              (this._tTime -= Nn)
                          ))),
                    this)
                  : this._ps;
              }),
              (t.startTime = function (e) {
                if (arguments.length) {
                  this._start = e;
                  var t = this.parent || this._dp;
                  return (
                    t &&
                      (t._sort || !this.parent) &&
                      rs(t, this, e - this._delay),
                    this
                  );
                }
                return this._start;
              }),
              (t.endTime = function (e) {
                return (
                  this._start +
                  (Qn(e) ? this.totalDuration() : this.duration()) /
                    Math.abs(this._ts || 1)
                );
              }),
              (t.rawTime = function (e) {
                var t = this.parent || this._dp;
                return t
                  ? e &&
                    (!this._ts ||
                      (this._repeat && this._time && this.totalProgress() < 1))
                    ? this._tTime % (this._dur + this._rDelay)
                    : this._ts
                    ? Zi(t.rawTime(e), this)
                    : this._tTime
                  : this._tTime;
              }),
              (t.revert = function (e) {
                void 0 === e && (e = yi);
                var t = kn;
                return (
                  (kn = e),
                  (this._initted || this._startAt) &&
                    (this.timeline && this.timeline.revert(e),
                    this.totalTime(-0.01, e.suppressEvents)),
                  "nested" !== this.data && !1 !== e.kill && this.kill(),
                  (kn = t),
                  this
                );
              }),
              (t.globalTime = function (e) {
                for (var t = this, r = arguments.length ? e : t.rawTime(); t; )
                  (r = t._start + r / (Math.abs(t._ts) || 1)), (t = t._dp);
                return !this.parent && this._sat ? this._sat.globalTime(e) : r;
              }),
              (t.repeat = function (e) {
                return arguments.length
                  ? ((this._repeat = e === 1 / 0 ? -2 : e), ls(this))
                  : -2 === this._repeat
                  ? 1 / 0
                  : this._repeat;
              }),
              (t.repeatDelay = function (e) {
                if (arguments.length) {
                  var t = this._time;
                  return (this._rDelay = e), ls(this), t ? this.time(t) : this;
                }
                return this._rDelay;
              }),
              (t.yoyo = function (e) {
                return arguments.length ? ((this._yoyo = e), this) : this._yoyo;
              }),
              (t.seek = function (e, t) {
                return this.totalTime(us(this, e), Qn(t));
              }),
              (t.restart = function (e, t) {
                return this.play().totalTime(e ? -this._delay : 0, Qn(t));
              }),
              (t.play = function (e, t) {
                return null != e && this.seek(e, t), this.reversed(!1).paused(!1);
              }),
              (t.reverse = function (e, t) {
                return (
                  null != e && this.seek(e || this.totalDuration(), t),
                  this.reversed(!0).paused(!1)
                );
              }),
              (t.pause = function (e, t) {
                return null != e && this.seek(e, t), this.paused(!0);
              }),
              (t.resume = function () {
                return this.paused(!1);
              }),
              (t.reversed = function (e) {
                return arguments.length
                  ? (!!e !== this.reversed() &&
                      this.timeScale(-this._rts || (e ? -1e-8 : 0)),
                    this)
                  : this._rts < 0;
              }),
              (t.invalidate = function () {
                return (
                  (this._initted = this._act = 0), (this._zTime = -1e-8), this
                );
              }),
              (t.isActive = function () {
                var e,
                  t = this.parent || this._dp,
                  r = this._start;
                return !(
                  t &&
                  !(
                    this._ts &&
                    this._initted &&
                    t.isActive() &&
                    (e = t.rawTime(!0)) >= r &&
                    e < this.endTime(!0) - Nn
                  )
                );
              }),
              (t.eventCallback = function (e, t, r) {
                var n = this.vars;
                return arguments.length > 1
                  ? (t
                      ? ((n[e] = t),
                        r && (n[e + "Params"] = r),
                        "onUpdate" === e && (this._onUpdate = t))
                      : delete n[e],
                    this)
                  : n[e];
              }),
              (t.then = function (e) {
                var t = this;
                return new Promise(function (r) {
                  var n = Gn(e) ? e : $i,
                    i = function () {
                      var e = t.then;
                      (t.then = null),
                        Gn(n) &&
                          (n = n(t)) &&
                          (n.then || n === t) &&
                          (t.then = e),
                        r(n),
                        (t.then = e);
                    };
                  (t._initted && 1 === t.totalProgress() && t._ts >= 0) ||
                  (!t._tTime && t._ts < 0)
                    ? i()
                    : (t._prom = i);
                });
              }),
              (t.kill = function () {
                Cs(this);
              }),
              e
            );
          })();
        Ni(ro.prototype, {
          _time: 0,
          _start: 0,
          _end: 0,
          _tTime: 0,
          _tDur: 0,
          _dirty: 0,
          _repeat: 0,
          _yoyo: !1,
          parent: null,
          _initted: !1,
          _rDelay: 0,
          _ts: 1,
          _dp: 0,
          ratio: 0,
          _zTime: -1e-8,
          _prom: 0,
          _ps: !1,
          _rts: 1,
        });
        var no = (function (e) {
          function t(t, r) {
            var n;
            return (
              void 0 === t && (t = {}),
              ((n = e.call(this, t) || this).labels = {}),
              (n.smoothChildTiming = !!t.smoothChildTiming),
              (n.autoRemoveChildren = !!t.autoRemoveChildren),
              (n._sort = Qn(t.sortChildren)),
              Pn && rs(t.parent || Pn, En(n), r),
              t.reversed && n.reverse(),
              t.paused && n.paused(!0),
              t.scrollTrigger && ns(En(n), t.scrollTrigger),
              n
            );
          }
          Sn(t, e);
          var r = t.prototype;
          return (
            (r.to = function (e, t, r) {
              return ds(0, arguments, this), this;
            }),
            (r.from = function (e, t, r) {
              return ds(1, arguments, this), this;
            }),
            (r.fromTo = function (e, t, r, n) {
              return ds(2, arguments, this), this;
            }),
            (r.set = function (e, t, r) {
              return (
                (t.duration = 0),
                (t.parent = this),
                qi(t).repeatDelay || (t.repeat = 0),
                (t.immediateRender = !!t.immediateRender),
                new mo(e, t, us(this, r), 1),
                this
              );
            }),
            (r.call = function (e, t, r) {
              return rs(this, mo.delayedCall(0, e, t), r);
            }),
            (r.staggerTo = function (e, t, r, n, i, s, o) {
              return (
                (r.duration = t),
                (r.stagger = r.stagger || n),
                (r.onComplete = s),
                (r.onCompleteParams = o),
                (r.parent = this),
                new mo(e, r, us(this, i)),
                this
              );
            }),
            (r.staggerFrom = function (e, t, r, n, i, s, o) {
              return (
                (r.runBackwards = 1),
                (qi(r).immediateRender = Qn(r.immediateRender)),
                this.staggerTo(e, t, r, n, i, s, o)
              );
            }),
            (r.staggerFromTo = function (e, t, r, n, i, s, o, a) {
              return (
                (n.startAt = r),
                (qi(n).immediateRender = Qn(n.immediateRender)),
                this.staggerTo(e, t, n, i, s, o, a)
              );
            }),
            (r.render = function (e, t, r) {
              var n,
                i,
                s,
                o,
                a,
                l,
                c,
                u,
                d,
                h,
                p,
                f,
                m = this._time,
                v = this._dirty ? this.totalDuration() : this._tDur,
                g = this._dur,
                y = e <= 0 ? 0 : Ii(e),
                w = this._zTime < 0 != e < 0 && (this._initted || !g);
              if (
                (this !== Pn && y > v && e >= 0 && (y = v),
                y !== this._tTime || r || w)
              ) {
                if (
                  (m !== this._time &&
                    g &&
                    ((y += this._time - m), (e += this._time - m)),
                  (n = y),
                  (d = this._start),
                  (l = !(u = this._ts)),
                  w && (g || (m = this._zTime), (e || !t) && (this._zTime = e)),
                  this._repeat)
                ) {
                  if (
                    ((p = this._yoyo),
                    (a = g + this._rDelay),
                    this._repeat < -1 && e < 0)
                  )
                    return this.totalTime(100 * a + e, t, r);
                  if (
                    ((n = Ii(y % a)),
                    y === v
                      ? ((o = this._repeat), (n = g))
                      : ((o = ~~(y / a)) && o === y / a && ((n = g), o--),
                        n > g && (n = g)),
                    (h = Qi(this._tTime, a)),
                    !m &&
                      this._tTime &&
                      h !== o &&
                      this._tTime - h * a - this._dur <= 0 &&
                      (h = o),
                    p && 1 & o && ((n = g - n), (f = 1)),
                    o !== h && !this._lock)
                  ) {
                    var b = p && 1 & h,
                      _ = b === (p && 1 & o);
                    if (
                      (o < h && (b = !b),
                      (m = b ? 0 : y % g ? g : y),
                      (this._lock = 1),
                      (this.render(m || (f ? 0 : Ii(o * a)), t, !g)._lock = 0),
                      (this._tTime = y),
                      !t && this.parent && Os(this, "onRepeat"),
                      this.vars.repeatRefresh &&
                        !f &&
                        (this.invalidate()._lock = 1),
                      (m && m !== this._time) ||
                        l !== !this._ts ||
                        (this.vars.onRepeat && !this.parent && !this._act))
                    )
                      return this;
                    if (
                      ((g = this._dur),
                      (v = this._tDur),
                      _ &&
                        ((this._lock = 2),
                        (m = b ? g : -1e-4),
                        this.render(m, !0),
                        this.vars.repeatRefresh && !f && this.invalidate()),
                      (this._lock = 0),
                      !this._ts && !l)
                    )
                      return this;
                    Xs(this, f);
                  }
                }
                if (
                  (this._hasPause &&
                    !this._forcing &&
                    this._lock < 2 &&
                    ((c = (function (e, t, r) {
                      var n;
                      if (r > t)
                        for (n = e._first; n && n._start <= r; ) {
                          if ("isPause" === n.data && n._start > t) return n;
                          n = n._next;
                        }
                      else
                        for (n = e._last; n && n._start >= r; ) {
                          if ("isPause" === n.data && n._start < t) return n;
                          n = n._prev;
                        }
                    })(this, Ii(m), Ii(n))),
                    c && (y -= n - (n = c._start))),
                  (this._tTime = y),
                  (this._time = n),
                  (this._act = !u),
                  this._initted ||
                    ((this._onUpdate = this.vars.onUpdate),
                    (this._initted = 1),
                    (this._zTime = e),
                    (m = 0)),
                  !m && n && !t && !o && (Os(this, "onStart"), this._tTime !== y))
                )
                  return this;
                if (n >= m && e >= 0)
                  for (i = this._first; i; ) {
                    if (
                      ((s = i._next),
                      (i._act || n >= i._start) && i._ts && c !== i)
                    ) {
                      if (i.parent !== this) return this.render(e, t, r);
                      if (
                        (i.render(
                          i._ts > 0
                            ? (n - i._start) * i._ts
                            : (i._dirty ? i.totalDuration() : i._tDur) +
                                (n - i._start) * i._ts,
                          t,
                          r
                        ),
                        n !== this._time || (!this._ts && !l))
                      ) {
                        (c = 0), s && (y += this._zTime = -1e-8);
                        break;
                      }
                    }
                    i = s;
                  }
                else {
                  i = this._last;
                  for (var T = e < 0 ? e : n; i; ) {
                    if (
                      ((s = i._prev), (i._act || T <= i._end) && i._ts && c !== i)
                    ) {
                      if (i.parent !== this) return this.render(e, t, r);
                      if (
                        (i.render(
                          i._ts > 0
                            ? (T - i._start) * i._ts
                            : (i._dirty ? i.totalDuration() : i._tDur) +
                                (T - i._start) * i._ts,
                          t,
                          r || (kn && (i._initted || i._startAt))
                        ),
                        n !== this._time || (!this._ts && !l))
                      ) {
                        (c = 0), s && (y += this._zTime = T ? -1e-8 : Nn);
                        break;
                      }
                    }
                    i = s;
                  }
                }
                if (
                  c &&
                  !t &&
                  (this.pause(),
                  (c.render(n >= m ? 0 : -1e-8)._zTime = n >= m ? 1 : -1),
                  this._ts)
                )
                  return (this._start = d), Ji(this), this.render(e, t, r);
                this._onUpdate && !t && Os(this, "onUpdate", !0),
                  ((y === v && this._tTime >= this.totalDuration()) ||
                    (!y && m)) &&
                    ((d !== this._start && Math.abs(u) === Math.abs(this._ts)) ||
                      this._lock ||
                      ((e || !g) &&
                        ((y === v && this._ts > 0) || (!y && this._ts < 0)) &&
                        Wi(this, 1),
                      t ||
                        (e < 0 && !m) ||
                        (!y && !m && v) ||
                        (Os(
                          this,
                          y === v && e >= 0 ? "onComplete" : "onReverseComplete",
                          !0
                        ),
                        this._prom &&
                          !(y < v && this.timeScale() > 0) &&
                          this._prom())));
              }
              return this;
            }),
            (r.add = function (e, t) {
              var r = this;
              if ((Yn(t) || (t = us(this, t, e)), !(e instanceof ro))) {
                if (ti(e))
                  return (
                    e.forEach(function (e) {
                      return r.add(e, t);
                    }),
                    this
                  );
                if (Wn(e)) return this.addLabel(e, t);
                if (!Gn(e)) return this;
                e = mo.delayedCall(0, e);
              }
              return this !== e ? rs(this, e, t) : this;
            }),
            (r.getChildren = function (e, t, r, n) {
              void 0 === e && (e = !0),
                void 0 === t && (t = !0),
                void 0 === r && (r = !0),
                void 0 === n && (n = -$n);
              for (var i = [], s = this._first; s; )
                s._start >= n &&
                  (s instanceof mo
                    ? t && i.push(s)
                    : (r && i.push(s),
                      e && i.push.apply(i, s.getChildren(!0, t, r)))),
                  (s = s._next);
              return i;
            }),
            (r.getById = function (e) {
              for (var t = this.getChildren(1, 1, 1), r = t.length; r--; )
                if (t[r].vars.id === e) return t[r];
            }),
            (r.remove = function (e) {
              return Wn(e)
                ? this.removeLabel(e)
                : Gn(e)
                ? this.killTweensOf(e)
                : (Hi(this, e),
                  e === this._recent && (this._recent = this._last),
                  Gi(this));
            }),
            (r.totalTime = function (t, r) {
              return arguments.length
                ? ((this._forcing = 1),
                  !this._dp &&
                    this._ts &&
                    (this._start = Ii(
                      Bs.time -
                        (this._ts > 0
                          ? t / this._ts
                          : (this.totalDuration() - t) / -this._ts)
                    )),
                  e.prototype.totalTime.call(this, t, r),
                  (this._forcing = 0),
                  this)
                : this._tTime;
            }),
            (r.addLabel = function (e, t) {
              return (this.labels[e] = us(this, t)), this;
            }),
            (r.removeLabel = function (e) {
              return delete this.labels[e], this;
            }),
            (r.addPause = function (e, t, r) {
              var n = mo.delayedCall(0, t || mi, r);
              return (
                (n.data = "isPause"),
                (this._hasPause = 1),
                rs(this, n, us(this, e))
              );
            }),
            (r.removePause = function (e) {
              var t = this._first;
              for (e = us(this, e); t; )
                t._start === e && "isPause" === t.data && Wi(t), (t = t._next);
            }),
            (r.killTweensOf = function (e, t, r) {
              for (var n = this.getTweensOf(e, r), i = n.length; i--; )
                io !== n[i] && n[i].kill(e, t);
              return this;
            }),
            (r.getTweensOf = function (e, t) {
              for (var r, n = [], i = ys(e), s = this._first, o = Yn(t); s; )
                s instanceof mo
                  ? Ri(s._targets, i) &&
                    (o
                      ? (!io || (s._initted && s._ts)) &&
                        s.globalTime(0) <= t &&
                        s.globalTime(s.totalDuration()) > t
                      : !t || s.isActive()) &&
                    n.push(s)
                  : (r = s.getTweensOf(i, t)).length && n.push.apply(n, r),
                  (s = s._next);
              return n;
            }),
            (r.tweenTo = function (e, t) {
              t = t || {};
              var r,
                n = this,
                i = us(n, e),
                s = t,
                o = s.startAt,
                a = s.onStart,
                l = s.onStartParams,
                c = s.immediateRender,
                u = mo.to(
                  n,
                  Ni(
                    {
                      ease: t.ease || "none",
                      lazy: !1,
                      immediateRender: !1,
                      time: i,
                      overwrite: "auto",
                      duration:
                        t.duration ||
                        Math.abs(
                          (i - (o && "time" in o ? o.time : n._time)) /
                            n.timeScale()
                        ) ||
                        Nn,
                      onStart: function () {
                        if ((n.pause(), !r)) {
                          var e =
                            t.duration ||
                            Math.abs(
                              (i - (o && "time" in o ? o.time : n._time)) /
                                n.timeScale()
                            );
                          u._dur !== e && as(u, e, 0, 1).render(u._time, !0, !0),
                            (r = 1);
                        }
                        a && a.apply(u, l || []);
                      },
                    },
                    t
                  )
                );
              return c ? u.render(0) : u;
            }),
            (r.tweenFromTo = function (e, t, r) {
              return this.tweenTo(t, Ni({ startAt: { time: us(this, e) } }, r));
            }),
            (r.recent = function () {
              return this._recent;
            }),
            (r.nextLabel = function (e) {
              return void 0 === e && (e = this._time), Ps(this, us(this, e));
            }),
            (r.previousLabel = function (e) {
              return void 0 === e && (e = this._time), Ps(this, us(this, e), 1);
            }),
            (r.currentLabel = function (e) {
              return arguments.length
                ? this.seek(e, !0)
                : this.previousLabel(this._time + Nn);
            }),
            (r.shiftChildren = function (e, t, r) {
              void 0 === r && (r = 0);
              for (var n, i = this._first, s = this.labels; i; )
                i._start >= r && ((i._start += e), (i._end += e)), (i = i._next);
              if (t) for (n in s) s[n] >= r && (s[n] += e);
              return Gi(this);
            }),
            (r.invalidate = function (t) {
              var r = this._first;
              for (this._lock = 0; r; ) r.invalidate(t), (r = r._next);
              return e.prototype.invalidate.call(this, t);
            }),
            (r.clear = function (e) {
              void 0 === e && (e = !0);
              for (var t, r = this._first; r; )
                (t = r._next), this.remove(r), (r = t);
              return (
                this._dp && (this._time = this._tTime = this._pTime = 0),
                e && (this.labels = {}),
                Gi(this)
              );
            }),
            (r.totalDuration = function (e) {
              var t,
                r,
                n,
                i = 0,
                s = this,
                o = s._last,
                a = $n;
              if (arguments.length)
                return s.timeScale(
                  (s._repeat < 0 ? s.duration() : s.totalDuration()) /
                    (s.reversed() ? -e : e)
                );
              if (s._dirty) {
                for (n = s.parent; o; )
                  (t = o._prev),
                    o._dirty && o.totalDuration(),
                    (r = o._start) > a && s._sort && o._ts && !s._lock
                      ? ((s._lock = 1), (rs(s, o, r - o._delay, 1)._lock = 0))
                      : (a = r),
                    r < 0 &&
                      o._ts &&
                      ((i -= r),
                      ((!n && !s._dp) || (n && n.smoothChildTiming)) &&
                        ((s._start += r / s._ts),
                        (s._time -= r),
                        (s._tTime -= r)),
                      s.shiftChildren(-r, !1, -Infinity),
                      (a = 0)),
                    o._end > i && o._ts && (i = o._end),
                    (o = t);
                as(s, s === Pn && s._time > i ? s._time : i, 1, 1),
                  (s._dirty = 0);
              }
              return s._tDur;
            }),
            (t.updateRoot = function (e) {
              if (
                (Pn._ts && (Di(Pn, Zi(e, Pn)), (Ln = Bs.frame)), Bs.frame >= Si)
              ) {
                Si += Dn.autoSleep || 120;
                var t = Pn._first;
                if ((!t || !t._ts) && Dn.autoSleep && Bs._listeners.length < 2) {
                  for (; t && !t._ts; ) t = t._next;
                  t || Bs.sleep();
                }
              }
            }),
            t
          );
        })(ro);
        Ni(no.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
        var io,
          so,
          oo = function (e, t, r, n, i, s, o) {
            var a,
              l,
              c,
              u,
              d,
              h,
              p,
              f,
              m = new Oo(this._pt, e, t, 0, 1, Eo, null, i),
              v = 0,
              g = 0;
            for (
              m.b = r,
                m.e = n,
                r += "",
                (p = ~(n += "").indexOf("random(")) && (n = ks(n)),
                s && (s((f = [r, n]), e, t), (r = f[0]), (n = f[1])),
                l = r.match(si) || [];
              (a = si.exec(n));
  
            )
              (u = a[0]),
                (d = n.substring(v, a.index)),
                c ? (c = (c + 1) % 5) : "rgba(" === d.substr(-5) && (c = 1),
                u !== l[g++] &&
                  ((h = parseFloat(l[g - 1]) || 0),
                  (m._pt = {
                    _next: m._pt,
                    p: d || 1 === g ? d : ",",
                    s: h,
                    c: "=" === u.charAt(1) ? Li(h, u) - h : parseFloat(u) - h,
                    m: c && c < 4 ? Math.round : 0,
                  }),
                  (v = si.lastIndex));
            return (
              (m.c = v < n.length ? n.substring(v, n.length) : ""),
              (m.fp = o),
              (oi.test(n) || p) && (m.e = 0),
              (this._pt = m),
              m
            );
          },
          ao = function (e, t, r, n, i, s, o, a, l, c) {
            Gn(n) && (n = n(i || 0, e, s));
            var u,
              d = e[t],
              h =
                "get" !== r
                  ? r
                  : Gn(d)
                  ? l
                    ? e[
                        t.indexOf("set") || !Gn(e["get" + t.substr(3)])
                          ? t
                          : "get" + t.substr(3)
                      ](l)
                    : e[t]()
                  : d,
              p = Gn(d) ? (l ? yo : go) : vo;
            if (
              (Wn(n) &&
                (~n.indexOf("random(") && (n = ks(n)),
                "=" === n.charAt(1) &&
                  ((u = Li(h, n) + (fs(h) || 0)) || 0 === u) &&
                  (n = u)),
              !c || h !== n || so)
            )
              return isNaN(h * n) || "" === n
                ? (!d && !(t in e) && hi(t, n),
                  oo.call(this, e, t, h, n, p, a || Dn.stringFilter, l))
                : ((u = new Oo(
                    this._pt,
                    e,
                    t,
                    +h || 0,
                    n - (h || 0),
                    "boolean" == typeof d ? To : _o,
                    0,
                    p
                  )),
                  l && (u.fp = l),
                  o && u.modifier(o, this, e),
                  (this._pt = u));
          },
          lo = function (e, t, r, n, i, s) {
            var o, a, l, c;
            if (
              Ti[e] &&
              !1 !==
                (o = new Ti[e]()).init(
                  i,
                  o.rawVars
                    ? t[e]
                    : (function (e, t, r, n, i) {
                        if (
                          (Gn(e) && (e = ho(e, i, t, r, n)),
                          !Kn(e) || (e.style && e.nodeType) || ti(e) || ei(e))
                        )
                          return Wn(e) ? ho(e, i, t, r, n) : e;
                        var s,
                          o = {};
                        for (s in e) o[s] = ho(e[s], i, t, r, n);
                        return o;
                      })(t[e], n, i, s, r),
                  r,
                  n,
                  s
                ) &&
              ((r._pt = a =
                new Oo(r._pt, i, e, 0, 1, o.render, o, 0, o.priority)),
              r !== Rn)
            )
              for (
                l = r._ptLookup[r._targets.indexOf(i)], c = o._props.length;
                c--;
  
              )
                l[o._props[c]] = a;
            return o;
          },
          co = function e(t, r, n) {
            var i,
              s,
              o,
              a,
              l,
              c,
              u,
              d,
              h,
              p,
              f,
              m,
              v,
              g = t.vars,
              y = g.ease,
              w = g.startAt,
              b = g.immediateRender,
              _ = g.lazy,
              T = g.onUpdate,
              E = g.runBackwards,
              S = g.yoyoEase,
              x = g.keyframes,
              k = g.autoRevert,
              M = t._dur,
              P = t._startAt,
              O = t._targets,
              C = t.parent,
              A = C && "nested" === C.data ? C.vars.targets : O,
              I = "auto" === t._overwrite && !xn,
              L = t.timeline;
            if (
              (L && (!x || !y) && (y = "none"),
              (t._ease = Ks(y, Fn.ease)),
              (t._yEase = S ? Ys(Ks(!0 === S ? y : S, Fn.ease)) : 0),
              S &&
                t._yoyo &&
                !t._repeat &&
                ((S = t._yEase), (t._yEase = t._ease), (t._ease = S)),
              (t._from = !L && !!g.runBackwards),
              !L || (x && !g.stagger))
            ) {
              if (
                ((m = (d = O[0] ? Pi(O[0]).harness : 0) && g[d.prop]),
                (i = Bi(g, wi)),
                P &&
                  (P._zTime < 0 && P.progress(1),
                  r < 0 && E && b && !k
                    ? P.render(-1, !0)
                    : P.revert(E && M ? gi : vi),
                  (P._lazy = 0)),
                w)
              ) {
                if (
                  (Wi(
                    (t._startAt = mo.set(
                      O,
                      Ni(
                        {
                          data: "isStart",
                          overwrite: !1,
                          parent: C,
                          immediateRender: !0,
                          lazy: !P && Qn(_),
                          startAt: null,
                          delay: 0,
                          onUpdate:
                            T &&
                            function () {
                              return Os(t, "onUpdate");
                            },
                          stagger: 0,
                        },
                        w
                      )
                    ))
                  ),
                  (t._startAt._dp = 0),
                  (t._startAt._sat = t),
                  r < 0 && (kn || (!b && !k)) && t._startAt.revert(gi),
                  b && M && r <= 0 && n <= 0)
                )
                  return void (r && (t._zTime = r));
              } else if (E && M && !P)
                if (
                  (r && (b = !1),
                  (o = Ni(
                    {
                      overwrite: !1,
                      data: "isFromStart",
                      lazy: b && !P && Qn(_),
                      immediateRender: b,
                      stagger: 0,
                      parent: C,
                    },
                    i
                  )),
                  m && (o[d.prop] = m),
                  Wi((t._startAt = mo.set(O, o))),
                  (t._startAt._dp = 0),
                  (t._startAt._sat = t),
                  r < 0 &&
                    (kn ? t._startAt.revert(gi) : t._startAt.render(-1, !0)),
                  (t._zTime = r),
                  b)
                ) {
                  if (!r) return;
                } else e(t._startAt, Nn, Nn);
              for (
                t._pt = t._ptCache = 0, _ = (M && Qn(_)) || (_ && !M), s = 0;
                s < O.length;
                s++
              ) {
                if (
                  ((u = (l = O[s])._gsap || Mi(O)[s]._gsap),
                  (t._ptLookup[s] = p = {}),
                  _i[u.id] && bi.length && zi(),
                  (f = A === O ? s : A.indexOf(l)),
                  d &&
                    !1 !== (h = new d()).init(l, m || i, t, f, A) &&
                    ((t._pt = a =
                      new Oo(t._pt, l, h.name, 0, 1, h.render, h, 0, h.priority)),
                    h._props.forEach(function (e) {
                      p[e] = a;
                    }),
                    h.priority && (c = 1)),
                  !d || m)
                )
                  for (o in i)
                    Ti[o] && (h = lo(o, i, t, f, l, A))
                      ? h.priority && (c = 1)
                      : (p[o] = a =
                          ao.call(t, l, o, "get", i[o], f, A, 0, g.stringFilter));
                t._op && t._op[s] && t.kill(l, t._op[s]),
                  I &&
                    t._pt &&
                    ((io = t),
                    Pn.killTweensOf(l, p, t.globalTime(r)),
                    (v = !t.parent),
                    (io = 0)),
                  t._pt && _ && (_i[u.id] = 1);
              }
              c && Po(t), t._onInit && t._onInit(t);
            }
            (t._onUpdate = T),
              (t._initted = (!t._op || t._pt) && !v),
              x && r <= 0 && L.render($n, !0, !0);
          },
          uo = function (e, t, r, n) {
            var i,
              s,
              o = t.ease || n || "power1.inOut";
            if (ti(t))
              (s = r[e] || (r[e] = [])),
                t.forEach(function (e, r) {
                  return s.push({ t: (r / (t.length - 1)) * 100, v: e, e: o });
                });
            else
              for (i in t)
                (s = r[i] || (r[i] = [])),
                  "ease" === i || s.push({ t: parseFloat(e), v: t[i], e: o });
          },
          ho = function (e, t, r, n, i) {
            return Gn(e)
              ? e.call(t, r, n, i)
              : Wn(e) && ~e.indexOf("random(")
              ? ks(e)
              : e;
          },
          po = ki + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
          fo = {};
        Ci(po + ",id,stagger,delay,duration,paused,scrollTrigger", function (e) {
          return (fo[e] = 1);
        });
        var mo = (function (e) {
          function t(t, r, n, i) {
            var s;
            "number" == typeof r && ((n.duration = r), (r = n), (n = null));
            var o,
              a,
              l,
              c,
              u,
              d,
              h,
              p,
              f = (s = e.call(this, i ? r : qi(r)) || this).vars,
              m = f.duration,
              v = f.delay,
              g = f.immediateRender,
              y = f.stagger,
              w = f.overwrite,
              b = f.keyframes,
              _ = f.defaults,
              T = f.scrollTrigger,
              E = f.yoyoEase,
              S = r.parent || Pn,
              x = (ti(t) || ei(t) ? Yn(t[0]) : "length" in r) ? [t] : ys(t);
            if (
              ((s._targets = x.length
                ? Mi(x)
                : pi(
                    "GSAP target " + t + " not found. https://gsap.com",
                    !Dn.nullTargetWarn
                  ) || []),
              (s._ptLookup = []),
              (s._overwrite = w),
              b || y || Jn(m) || Jn(v))
            ) {
              if (
                ((r = s.vars),
                (o = s.timeline =
                  new no({
                    data: "nested",
                    defaults: _ || {},
                    targets: S && "nested" === S.data ? S.vars.targets : x,
                  })).kill(),
                (o.parent = o._dp = En(s)),
                (o._start = 0),
                y || Jn(m) || Jn(v))
              ) {
                if (((c = x.length), (h = y && _s(y)), Kn(y)))
                  for (u in y) ~po.indexOf(u) && (p || (p = {}), (p[u] = y[u]));
                for (a = 0; a < c; a++)
                  ((l = Bi(r, fo)).stagger = 0),
                    E && (l.yoyoEase = E),
                    p && ji(l, p),
                    (d = x[a]),
                    (l.duration = +ho(m, En(s), a, d, x)),
                    (l.delay = (+ho(v, En(s), a, d, x) || 0) - s._delay),
                    !y &&
                      1 === c &&
                      l.delay &&
                      ((s._delay = v = l.delay), (s._start += v), (l.delay = 0)),
                    o.to(d, l, h ? h(a, d, x) : 0),
                    (o._ease = Us.none);
                o.duration() ? (m = v = 0) : (s.timeline = 0);
              } else if (b) {
                qi(Ni(o.vars.defaults, { ease: "none" })),
                  (o._ease = Ks(b.ease || r.ease || "none"));
                var k,
                  M,
                  P,
                  O = 0;
                if (ti(b))
                  b.forEach(function (e) {
                    return o.to(x, e, ">");
                  }),
                    o.duration();
                else {
                  for (u in ((l = {}), b))
                    "ease" === u ||
                      "easeEach" === u ||
                      uo(u, b[u], l, b.easeEach);
                  for (u in l)
                    for (
                      k = l[u].sort(function (e, t) {
                        return e.t - t.t;
                      }),
                        O = 0,
                        a = 0;
                      a < k.length;
                      a++
                    )
                      ((P = {
                        ease: (M = k[a]).e,
                        duration: ((M.t - (a ? k[a - 1].t : 0)) / 100) * m,
                      })[u] = M.v),
                        o.to(x, P, O),
                        (O += P.duration);
                  o.duration() < m && o.to({}, { duration: m - o.duration() });
                }
              }
              m || s.duration((m = o.duration()));
            } else s.timeline = 0;
            return (
              !0 !== w || xn || ((io = En(s)), Pn.killTweensOf(x), (io = 0)),
              rs(S, En(s), n),
              r.reversed && s.reverse(),
              r.paused && s.paused(!0),
              (g ||
                (!m &&
                  !b &&
                  s._start === Ii(S._time) &&
                  Qn(g) &&
                  Xi(En(s)) &&
                  "nested" !== S.data)) &&
                ((s._tTime = -1e-8), s.render(Math.max(0, -v) || 0)),
              T && ns(En(s), T),
              s
            );
          }
          Sn(t, e);
          var r = t.prototype;
          return (
            (r.render = function (e, t, r) {
              var n,
                i,
                s,
                o,
                a,
                l,
                c,
                u,
                d,
                h = this._time,
                p = this._tDur,
                f = this._dur,
                m = e < 0,
                v = e > p - Nn && !m ? p : e < Nn ? 0 : e;
              if (f) {
                if (
                  v !== this._tTime ||
                  !e ||
                  r ||
                  (!this._initted && this._tTime) ||
                  (this._startAt && this._zTime < 0 !== m)
                ) {
                  if (((n = v), (u = this.timeline), this._repeat)) {
                    if (((o = f + this._rDelay), this._repeat < -1 && m))
                      return this.totalTime(100 * o + e, t, r);
                    if (
                      ((n = Ii(v % o)),
                      v === p
                        ? ((s = this._repeat), (n = f))
                        : ((s = ~~(v / o)) && s === Ii(v / o) && ((n = f), s--),
                          n > f && (n = f)),
                      (l = this._yoyo && 1 & s) &&
                        ((d = this._yEase), (n = f - n)),
                      (a = Qi(this._tTime, o)),
                      n === h && !r && this._initted && s === a)
                    )
                      return (this._tTime = v), this;
                    s !== a &&
                      (u && this._yEase && Xs(u, l),
                      this.vars.repeatRefresh &&
                        !l &&
                        !this._lock &&
                        this._time !== o &&
                        this._initted &&
                        ((this._lock = r = 1),
                        (this.render(Ii(o * s), !0).invalidate()._lock = 0)));
                  }
                  if (!this._initted) {
                    if (is(this, m ? e : n, r, t, v))
                      return (this._tTime = 0), this;
                    if (
                      !(
                        h === this._time ||
                        (r && this.vars.repeatRefresh && s !== a)
                      )
                    )
                      return this;
                    if (f !== this._dur) return this.render(e, t, r);
                  }
                  if (
                    ((this._tTime = v),
                    (this._time = n),
                    !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
                    (this.ratio = c = (d || this._ease)(n / f)),
                    this._from && (this.ratio = c = 1 - c),
                    n &&
                      !h &&
                      !t &&
                      !s &&
                      (Os(this, "onStart"), this._tTime !== v))
                  )
                    return this;
                  for (i = this._pt; i; ) i.r(c, i.d), (i = i._next);
                  (u &&
                    u.render(
                      e < 0 ? e : u._dur * u._ease(n / this._dur),
                      t,
                      r
                    )) ||
                    (this._startAt && (this._zTime = e)),
                    this._onUpdate &&
                      !t &&
                      (m && Yi(this, e, 0, r), Os(this, "onUpdate")),
                    this._repeat &&
                      s !== a &&
                      this.vars.onRepeat &&
                      !t &&
                      this.parent &&
                      Os(this, "onRepeat"),
                    (v !== this._tDur && v) ||
                      this._tTime !== v ||
                      (m && !this._onUpdate && Yi(this, e, 0, !0),
                      (e || !f) &&
                        ((v === this._tDur && this._ts > 0) ||
                          (!v && this._ts < 0)) &&
                        Wi(this, 1),
                      t ||
                        (m && !h) ||
                        !(v || h || l) ||
                        (Os(
                          this,
                          v === p ? "onComplete" : "onReverseComplete",
                          !0
                        ),
                        this._prom &&
                          !(v < p && this.timeScale() > 0) &&
                          this._prom()));
                }
              } else
                !(function (e, t, r, n) {
                  var i,
                    s,
                    o,
                    a = e.ratio,
                    l =
                      t < 0 ||
                      (!t &&
                        ((!e._start && ss(e) && (e._initted || !os(e))) ||
                          ((e._ts < 0 || e._dp._ts < 0) && !os(e))))
                        ? 0
                        : 1,
                    c = e._rDelay,
                    u = 0;
                  if (
                    (c &&
                      e._repeat &&
                      ((u = ps(0, e._tDur, t)),
                      (s = Qi(u, c)),
                      e._yoyo && 1 & s && (l = 1 - l),
                      s !== Qi(e._tTime, c) &&
                        ((a = 1 - l),
                        e.vars.repeatRefresh && e._initted && e.invalidate())),
                    l !== a || kn || n || e._zTime === Nn || (!t && e._zTime))
                  ) {
                    if (!e._initted && is(e, t, n, r, u)) return;
                    for (
                      o = e._zTime,
                        e._zTime = t || (r ? Nn : 0),
                        r || (r = t && !o),
                        e.ratio = l,
                        e._from && (l = 1 - l),
                        e._time = 0,
                        e._tTime = u,
                        i = e._pt;
                      i;
  
                    )
                      i.r(l, i.d), (i = i._next);
                    t < 0 && Yi(e, t, 0, !0),
                      e._onUpdate && !r && Os(e, "onUpdate"),
                      u && e._repeat && !r && e.parent && Os(e, "onRepeat"),
                      (t >= e._tDur || t < 0) &&
                        e.ratio === l &&
                        (l && Wi(e, 1),
                        r ||
                          kn ||
                          (Os(e, l ? "onComplete" : "onReverseComplete", !0),
                          e._prom && e._prom()));
                  } else e._zTime || (e._zTime = t);
                })(this, e, t, r);
              return this;
            }),
            (r.targets = function () {
              return this._targets;
            }),
            (r.invalidate = function (t) {
              return (
                (!t || !this.vars.runBackwards) && (this._startAt = 0),
                (this._pt =
                  this._op =
                  this._onUpdate =
                  this._lazy =
                  this.ratio =
                    0),
                (this._ptLookup = []),
                this.timeline && this.timeline.invalidate(t),
                e.prototype.invalidate.call(this, t)
              );
            }),
            (r.resetTo = function (e, t, r, n, i) {
              zn || Bs.wake(), this._ts || this.play();
              var s = Math.min(
                this._dur,
                (this._dp._time - this._start) * this._ts
              );
              return (
                this._initted || co(this, s),
                (function (e, t, r, n, i, s, o, a) {
                  var l,
                    c,
                    u,
                    d,
                    h = ((e._pt && e._ptCache) || (e._ptCache = {}))[t];
                  if (!h)
                    for (
                      h = e._ptCache[t] = [],
                        u = e._ptLookup,
                        d = e._targets.length;
                      d--;
  
                    ) {
                      if ((l = u[d][t]) && l.d && l.d._pt)
                        for (l = l.d._pt; l && l.p !== t && l.fp !== t; )
                          l = l._next;
                      if (!l)
                        return (
                          (so = 1),
                          (e.vars[t] = "+=0"),
                          co(e, o),
                          (so = 0),
                          a ? pi(t + " not eligible for reset") : 1
                        );
                      h.push(l);
                    }
                  for (d = h.length; d--; )
                    ((l = (c = h[d])._pt || c).s =
                      (!n && 0 !== n) || i ? l.s + (n || 0) + s * l.c : n),
                      (l.c = r - l.s),
                      c.e && (c.e = Ai(r) + fs(c.e)),
                      c.b && (c.b = l.s + fs(c.b));
                })(this, e, t, r, n, this._ease(s / this._dur), s, i)
                  ? this.resetTo(e, t, r, n, 1)
                  : (es(this, 0),
                    this.parent ||
                      Ui(
                        this._dp,
                        this,
                        "_first",
                        "_last",
                        this._dp._sort ? "_start" : 0
                      ),
                    this.render(0))
              );
            }),
            (r.kill = function (e, t) {
              if ((void 0 === t && (t = "all"), !(e || (t && "all" !== t))))
                return (this._lazy = this._pt = 0), this.parent ? Cs(this) : this;
              if (this.timeline) {
                var r = this.timeline.totalDuration();
                return (
                  this.timeline.killTweensOf(e, t, io && !0 !== io.vars.overwrite)
                    ._first || Cs(this),
                  this.parent &&
                    r !== this.timeline.totalDuration() &&
                    as(this, (this._dur * this.timeline._tDur) / r, 0, 1),
                  this
                );
              }
              var n,
                i,
                s,
                o,
                a,
                l,
                c,
                u = this._targets,
                d = e ? ys(e) : u,
                h = this._ptLookup,
                p = this._pt;
              if (
                (!t || "all" === t) &&
                (function (e, t) {
                  for (
                    var r = e.length, n = r === t.length;
                    n && r-- && e[r] === t[r];
  
                  );
                  return r < 0;
                })(u, d)
              )
                return "all" === t && (this._pt = 0), Cs(this);
              for (
                n = this._op = this._op || [],
                  "all" !== t &&
                    (Wn(t) &&
                      ((a = {}),
                      Ci(t, function (e) {
                        return (a[e] = 1);
                      }),
                      (t = a)),
                    (t = (function (e, t) {
                      var r,
                        n,
                        i,
                        s,
                        o = e[0] ? Pi(e[0]).harness : 0,
                        a = o && o.aliases;
                      if (!a) return t;
                      for (n in ((r = ji({}, t)), a))
                        if ((n in r))
                          for (i = (s = a[n].split(",")).length; i--; )
                            r[s[i]] = r[n];
                      return r;
                    })(u, t))),
                  c = u.length;
                c--;
  
              )
                if (~d.indexOf(u[c]))
                  for (a in ((i = h[c]),
                  "all" === t
                    ? ((n[c] = t), (o = i), (s = {}))
                    : ((s = n[c] = n[c] || {}), (o = t)),
                  o))
                    (l = i && i[a]) &&
                      (("kill" in l.d && !0 !== l.d.kill(a)) ||
                        Hi(this, l, "_pt"),
                      delete i[a]),
                      "all" !== s && (s[a] = 1);
              return this._initted && !this._pt && p && Cs(this), this;
            }),
            (t.to = function (e, r) {
              return new t(e, r, arguments[2]);
            }),
            (t.from = function (e, t) {
              return ds(1, arguments);
            }),
            (t.delayedCall = function (e, r, n, i) {
              return new t(r, 0, {
                immediateRender: !1,
                lazy: !1,
                overwrite: !1,
                delay: e,
                onComplete: r,
                onReverseComplete: r,
                onCompleteParams: n,
                onReverseCompleteParams: n,
                callbackScope: i,
              });
            }),
            (t.fromTo = function (e, t, r) {
              return ds(2, arguments);
            }),
            (t.set = function (e, r) {
              return (
                (r.duration = 0), r.repeatDelay || (r.repeat = 0), new t(e, r)
              );
            }),
            (t.killTweensOf = function (e, t, r) {
              return Pn.killTweensOf(e, t, r);
            }),
            t
          );
        })(ro);
        Ni(mo.prototype, {
          _targets: [],
          _lazy: 0,
          _startAt: 0,
          _op: 0,
          _onInit: 0,
        }),
          Ci("staggerTo,staggerFrom,staggerFromTo", function (e) {
            mo[e] = function () {
              var t = new no(),
                r = ms.call(arguments, 0);
              return (
                r.splice("staggerFromTo" === e ? 5 : 4, 0, 0), t[e].apply(t, r)
              );
            };
          });
        var vo = function (e, t, r) {
            return (e[t] = r);
          },
          go = function (e, t, r) {
            return e[t](r);
          },
          yo = function (e, t, r, n) {
            return e[t](n.fp, r);
          },
          wo = function (e, t, r) {
            return e.setAttribute(t, r);
          },
          bo = function (e, t) {
            return Gn(e[t]) ? go : Xn(e[t]) && e.setAttribute ? wo : vo;
          },
          _o = function (e, t) {
            return t.set(t.t, t.p, Math.round(1e6 * (t.s + t.c * e)) / 1e6, t);
          },
          To = function (e, t) {
            return t.set(t.t, t.p, !!(t.s + t.c * e), t);
          },
          Eo = function (e, t) {
            var r = t._pt,
              n = "";
            if (!e && t.b) n = t.b;
            else if (1 === e && t.e) n = t.e;
            else {
              for (; r; )
                (n =
                  r.p +
                  (r.m
                    ? r.m(r.s + r.c * e)
                    : Math.round(1e4 * (r.s + r.c * e)) / 1e4) +
                  n),
                  (r = r._next);
              n += t.c;
            }
            t.set(t.t, t.p, n, t);
          },
          So = function (e, t) {
            for (var r = t._pt; r; ) r.r(e, r.d), (r = r._next);
          },
          xo = function (e, t, r, n) {
            for (var i, s = this._pt; s; )
              (i = s._next), s.p === n && s.modifier(e, t, r), (s = i);
          },
          ko = function (e) {
            for (var t, r, n = this._pt; n; )
              (r = n._next),
                (n.p === e && !n.op) || n.op === e
                  ? Hi(this, n, "_pt")
                  : n.dep || (t = 1),
                (n = r);
            return !t;
          },
          Mo = function (e, t, r, n) {
            n.mSet(e, t, n.m.call(n.tween, r, n.mt), n);
          },
          Po = function (e) {
            for (var t, r, n, i, s = e._pt; s; ) {
              for (t = s._next, r = n; r && r.pr > s.pr; ) r = r._next;
              (s._prev = r ? r._prev : i) ? (s._prev._next = s) : (n = s),
                (s._next = r) ? (r._prev = s) : (i = s),
                (s = t);
            }
            e._pt = n;
          },
          Oo = (function () {
            function e(e, t, r, n, i, s, o, a, l) {
              (this.t = t),
                (this.s = n),
                (this.c = i),
                (this.p = r),
                (this.r = s || _o),
                (this.d = o || this),
                (this.set = a || vo),
                (this.pr = l || 0),
                (this._next = e),
                e && (e._prev = this);
            }
            return (
              (e.prototype.modifier = function (e, t, r) {
                (this.mSet = this.mSet || this.set),
                  (this.set = Mo),
                  (this.m = e),
                  (this.mt = r),
                  (this.tween = t);
              }),
              e
            );
          })();
        Ci(
          ki +
            "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
          function (e) {
            return (wi[e] = 1);
          }
        ),
          (ci.TweenMax = ci.TweenLite = mo),
          (ci.TimelineLite = ci.TimelineMax = no),
          (Pn = new no({
            sortChildren: !1,
            defaults: Fn,
            autoRemoveChildren: !0,
            id: "root",
            smoothChildTiming: !0,
          })),
          (Dn.stringFilter = Vs);
        var Co = [],
          Ao = {},
          Io = [],
          Lo = 0,
          Ro = 0,
          zo = function (e) {
            return (Ao[e] || Io).map(function (e) {
              return e();
            });
          },
          Do = function () {
            var e = Date.now(),
              t = [];
            e - Lo > 2 &&
              (zo("matchMediaInit"),
              Co.forEach(function (e) {
                var r,
                  n,
                  i,
                  s,
                  o = e.queries,
                  a = e.conditions;
                for (n in o)
                  (r = On.matchMedia(o[n]).matches) && (i = 1),
                    r !== a[n] && ((a[n] = r), (s = 1));
                s && (e.revert(), i && t.push(e));
              }),
              zo("matchMediaRevert"),
              t.forEach(function (e) {
                return e.onMatch(e, function (t) {
                  return e.add(null, t);
                });
              }),
              (Lo = e),
              zo("matchMedia"));
          },
          Fo = (function () {
            function e(e, t) {
              (this.selector = t && ws(t)),
                (this.data = []),
                (this._r = []),
                (this.isReverted = !1),
                (this.id = Ro++),
                e && this.add(e);
            }
            var t = e.prototype;
            return (
              (t.add = function (e, t, r) {
                Gn(e) && ((r = t), (t = e), (e = Gn));
                var n = this,
                  i = function () {
                    var e,
                      i = Mn,
                      s = n.selector;
                    return (
                      i && i !== n && i.data.push(n),
                      r && (n.selector = ws(r)),
                      (Mn = n),
                      (e = t.apply(n, arguments)),
                      Gn(e) && n._r.push(e),
                      (Mn = i),
                      (n.selector = s),
                      (n.isReverted = !1),
                      e
                    );
                  };
                return (
                  (n.last = i),
                  e === Gn
                    ? i(n, function (e) {
                        return n.add(null, e);
                      })
                    : e
                    ? (n[e] = i)
                    : i
                );
              }),
              (t.ignore = function (e) {
                var t = Mn;
                (Mn = null), e(this), (Mn = t);
              }),
              (t.getTweens = function () {
                var t = [];
                return (
                  this.data.forEach(function (r) {
                    return r instanceof e
                      ? t.push.apply(t, r.getTweens())
                      : r instanceof mo &&
                          !(r.parent && "nested" === r.parent.data) &&
                          t.push(r);
                  }),
                  t
                );
              }),
              (t.clear = function () {
                this._r.length = this.data.length = 0;
              }),
              (t.kill = function (e, t) {
                var r = this;
                if (
                  (e
                    ? (function () {
                        for (var t, n = r.getTweens(), i = r.data.length; i--; )
                          "isFlip" === (t = r.data[i]).data &&
                            (t.revert(),
                            t.getChildren(!0, !0, !1).forEach(function (e) {
                              return n.splice(n.indexOf(e), 1);
                            }));
                        for (
                          n
                            .map(function (e) {
                              return {
                                g:
                                  e._dur ||
                                  e._delay ||
                                  (e._sat && !e._sat.vars.immediateRender)
                                    ? e.globalTime(0)
                                    : -1 / 0,
                                t: e,
                              };
                            })
                            .sort(function (e, t) {
                              return t.g - e.g || -1 / 0;
                            })
                            .forEach(function (t) {
                              return t.t.revert(e);
                            }),
                            i = r.data.length;
                          i--;
  
                        )
                          (t = r.data[i]) instanceof no
                            ? "nested" !== t.data &&
                              (t.scrollTrigger && t.scrollTrigger.revert(),
                              t.kill())
                            : !(t instanceof mo) && t.revert && t.revert(e);
                        r._r.forEach(function (t) {
                          return t(e, r);
                        }),
                          (r.isReverted = !0);
                      })()
                    : this.data.forEach(function (e) {
                        return e.kill && e.kill();
                      }),
                  this.clear(),
                  t)
                )
                  for (var n = Co.length; n--; )
                    Co[n].id === this.id && Co.splice(n, 1);
              }),
              (t.revert = function (e) {
                this.kill(e || {});
              }),
              e
            );
          })(),
          $o = (function () {
            function e(e) {
              (this.contexts = []), (this.scope = e), Mn && Mn.data.push(this);
            }
            var t = e.prototype;
            return (
              (t.add = function (e, t, r) {
                Kn(e) || (e = { matches: e });
                var n,
                  i,
                  s,
                  o = new Fo(0, r || this.scope),
                  a = (o.conditions = {});
                for (i in (Mn && !o.selector && (o.selector = Mn.selector),
                this.contexts.push(o),
                (t = o.add("onMatch", t)),
                (o.queries = e),
                e))
                  "all" === i
                    ? (s = 1)
                    : (n = On.matchMedia(e[i])) &&
                      (Co.indexOf(o) < 0 && Co.push(o),
                      (a[i] = n.matches) && (s = 1),
                      n.addListener
                        ? n.addListener(Do)
                        : n.addEventListener("change", Do));
                return (
                  s &&
                    t(o, function (e) {
                      return o.add(null, e);
                    }),
                  this
                );
              }),
              (t.revert = function (e) {
                this.kill(e || {});
              }),
              (t.kill = function (e) {
                this.contexts.forEach(function (t) {
                  return t.kill(e, !0);
                });
              }),
              e
            );
          })(),
          No = {
            registerPlugin: function () {
              for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
                t[r] = arguments[r];
              t.forEach(function (e) {
                return Is(e);
              });
            },
            timeline: function (e) {
              return new no(e);
            },
            getTweensOf: function (e, t) {
              return Pn.getTweensOf(e, t);
            },
            getProperty: function (e, t, r, n) {
              Wn(e) && (e = ys(e)[0]);
              var i = Pi(e || {}).get,
                s = r ? $i : Fi;
              return (
                "native" === r && (r = ""),
                e
                  ? t
                    ? s(((Ti[t] && Ti[t].get) || i)(e, t, r, n))
                    : function (t, r, n) {
                        return s(((Ti[t] && Ti[t].get) || i)(e, t, r, n));
                      }
                  : e
              );
            },
            quickSetter: function (e, t, r) {
              if ((e = ys(e)).length > 1) {
                var n = e.map(function (e) {
                    return Bo.quickSetter(e, t, r);
                  }),
                  i = n.length;
                return function (e) {
                  for (var t = i; t--; ) n[t](e);
                };
              }
              e = e[0] || {};
              var s = Ti[t],
                o = Pi(e),
                a = (o.harness && (o.harness.aliases || {})[t]) || t,
                l = s
                  ? function (t) {
                      var n = new s();
                      (Rn._pt = 0),
                        n.init(e, r ? t + r : t, Rn, 0, [e]),
                        n.render(1, n),
                        Rn._pt && So(1, Rn);
                    }
                  : o.set(e, a);
              return s
                ? l
                : function (t) {
                    return l(e, a, r ? t + r : t, o, 1);
                  };
            },
            quickTo: function (e, t, r) {
              var n,
                i = Bo.to(
                  e,
                  ji((((n = {})[t] = "+=0.1"), (n.paused = !0), n), r || {})
                ),
                s = function (e, r, n) {
                  return i.resetTo(t, e, r, n);
                };
              return (s.tween = i), s;
            },
            isTweening: function (e) {
              return Pn.getTweensOf(e, !0).length > 0;
            },
            defaults: function (e) {
              return (
                e && e.ease && (e.ease = Ks(e.ease, Fn.ease)), Vi(Fn, e || {})
              );
            },
            config: function (e) {
              return Vi(Dn, e || {});
            },
            registerEffect: function (e) {
              var t = e.name,
                r = e.effect,
                n = e.plugins,
                i = e.defaults,
                s = e.extendTimeline;
              (n || "").split(",").forEach(function (e) {
                return (
                  e &&
                  !Ti[e] &&
                  !ci[e] &&
                  pi(t + " effect requires " + e + " plugin.")
                );
              }),
                (Ei[t] = function (e, t, n) {
                  return r(ys(e), Ni(t || {}, i), n);
                }),
                s &&
                  (no.prototype[t] = function (e, r, n) {
                    return this.add(Ei[t](e, Kn(r) ? r : (n = r) && {}, this), n);
                  });
            },
            registerEase: function (e, t) {
              Us[e] = Ks(t);
            },
            parseEase: function (e, t) {
              return arguments.length ? Ks(e, t) : Us;
            },
            getById: function (e) {
              return Pn.getById(e);
            },
            exportRoot: function (e, t) {
              void 0 === e && (e = {});
              var r,
                n,
                i = new no(e);
              for (
                i.smoothChildTiming = Qn(e.smoothChildTiming),
                  Pn.remove(i),
                  i._dp = 0,
                  i._time = i._tTime = Pn._time,
                  r = Pn._first;
                r;
  
              )
                (n = r._next),
                  (!t &&
                    !r._dur &&
                    r instanceof mo &&
                    r.vars.onComplete === r._targets[0]) ||
                    rs(i, r, r._start - r._delay),
                  (r = n);
              return rs(Pn, i, 0), i;
            },
            context: function (e, t) {
              return e ? new Fo(e, t) : Mn;
            },
            matchMedia: function (e) {
              return new $o(e);
            },
            matchMediaRefresh: function () {
              return (
                Co.forEach(function (e) {
                  var t,
                    r,
                    n = e.conditions;
                  for (r in n) n[r] && ((n[r] = !1), (t = 1));
                  t && e.revert();
                }) || Do()
              );
            },
            addEventListener: function (e, t) {
              var r = Ao[e] || (Ao[e] = []);
              ~r.indexOf(t) || r.push(t);
            },
            removeEventListener: function (e, t) {
              var r = Ao[e],
                n = r && r.indexOf(t);
              n >= 0 && r.splice(n, 1);
            },
            utils: {
              wrap: function e(t, r, n) {
                var i = r - t;
                return ti(t)
                  ? xs(t, e(0, t.length), r)
                  : hs(n, function (e) {
                      return ((i + ((e - t) % i)) % i) + t;
                    });
              },
              wrapYoyo: function e(t, r, n) {
                var i = r - t,
                  s = 2 * i;
                return ti(t)
                  ? xs(t, e(0, t.length - 1), r)
                  : hs(n, function (e) {
                      return (
                        t + ((e = (s + ((e - t) % s)) % s || 0) > i ? s - e : e)
                      );
                    });
              },
              distribute: _s,
              random: Ss,
              snap: Es,
              normalize: function (e, t, r) {
                return Ms(e, t, 0, 1, r);
              },
              getUnit: fs,
              clamp: function (e, t, r) {
                return hs(r, function (r) {
                  return ps(e, t, r);
                });
              },
              splitColor: Ds,
              toArray: ys,
              selector: ws,
              mapRange: Ms,
              pipe: function () {
                for (
                  var e = arguments.length, t = new Array(e), r = 0;
                  r < e;
                  r++
                )
                  t[r] = arguments[r];
                return function (e) {
                  return t.reduce(function (e, t) {
                    return t(e);
                  }, e);
                };
              },
              unitize: function (e, t) {
                return function (r) {
                  return e(parseFloat(r)) + (t || fs(r));
                };
              },
              interpolate: function e(t, r, n, i) {
                var s = isNaN(t + r)
                  ? 0
                  : function (e) {
                      return (1 - e) * t + e * r;
                    };
                if (!s) {
                  var o,
                    a,
                    l,
                    c,
                    u,
                    d = Wn(t),
                    h = {};
                  if ((!0 === n && (i = 1) && (n = null), d))
                    (t = { p: t }), (r = { p: r });
                  else if (ti(t) && !ti(r)) {
                    for (l = [], c = t.length, u = c - 2, a = 1; a < c; a++)
                      l.push(e(t[a - 1], t[a]));
                    c--,
                      (s = function (e) {
                        e *= c;
                        var t = Math.min(u, ~~e);
                        return l[t](e - t);
                      }),
                      (n = r);
                  } else i || (t = ji(ti(t) ? [] : {}, t));
                  if (!l) {
                    for (o in r) ao.call(h, t, o, "get", r[o]);
                    s = function (e) {
                      return So(e, h) || (d ? t.p : t);
                    };
                  }
                }
                return hs(n, s);
              },
              shuffle: bs,
            },
            install: di,
            effects: Ei,
            ticker: Bs,
            updateRoot: no.updateRoot,
            plugins: Ti,
            globalTimeline: Pn,
            core: {
              PropTween: Oo,
              globals: fi,
              Tween: mo,
              Timeline: no,
              Animation: ro,
              getCache: Pi,
              _removeLinkedListItem: Hi,
              reverting: function () {
                return kn;
              },
              context: function (e) {
                return e && Mn && (Mn.data.push(e), (e._ctx = Mn)), Mn;
              },
              suppressOverwrites: function (e) {
                return (xn = e);
              },
            },
          };
        Ci("to,from,fromTo,delayedCall,set,killTweensOf", function (e) {
          return (No[e] = mo[e]);
        }),
          Bs.add(no.updateRoot),
          (Rn = No.to({}, { duration: 0 }));
        var jo = function (e, t) {
            for (var r = e._pt; r && r.p !== t && r.op !== t && r.fp !== t; )
              r = r._next;
            return r;
          },
          Vo = function (e, t) {
            return {
              name: e,
              rawVars: 1,
              init: function (e, r, n) {
                n._onInit = function (e) {
                  var n, i;
                  if (
                    (Wn(r) &&
                      ((n = {}),
                      Ci(r, function (e) {
                        return (n[e] = 1);
                      }),
                      (r = n)),
                    t)
                  ) {
                    for (i in ((n = {}), r)) n[i] = t(r[i]);
                    r = n;
                  }
                  !(function (e, t) {
                    var r,
                      n,
                      i,
                      s = e._targets;
                    for (r in t)
                      for (n = s.length; n--; )
                        (i = e._ptLookup[n][r]) &&
                          (i = i.d) &&
                          (i._pt && (i = jo(i, r)),
                          i && i.modifier && i.modifier(t[r], e, s[n], r));
                  })(e, r);
                };
              },
            };
          },
          Bo =
            No.registerPlugin(
              {
                name: "attr",
                init: function (e, t, r, n, i) {
                  var s, o, a;
                  for (s in ((this.tween = r), t))
                    (a = e.getAttribute(s) || ""),
                      ((o = this.add(
                        e,
                        "setAttribute",
                        (a || 0) + "",
                        t[s],
                        n,
                        i,
                        0,
                        0,
                        s
                      )).op = s),
                      (o.b = a),
                      this._props.push(s);
                },
                render: function (e, t) {
                  for (var r = t._pt; r; )
                    kn ? r.set(r.t, r.p, r.b, r) : r.r(e, r.d), (r = r._next);
                },
              },
              {
                name: "endArray",
                init: function (e, t) {
                  for (var r = t.length; r--; )
                    this.add(e, r, e[r] || 0, t[r], 0, 0, 0, 0, 0, 1);
                },
              },
              Vo("roundProps", Ts),
              Vo("modifiers"),
              Vo("snap", Es)
            ) || No;
        (mo.version = no.version = Bo.version = "3.12.5"), (In = 1), Zn() && qs();
        Us.Power0,
          Us.Power1,
          Us.Power2,
          Us.Power3,
          Us.Power4,
          Us.Linear,
          Us.Quad,
          Us.Cubic,
          Us.Quart,
          Us.Quint,
          Us.Strong,
          Us.Elastic,
          Us.Back,
          Us.SteppedEase,
          Us.Bounce,
          Us.Sine,
          Us.Expo,
          Us.Circ;
        var qo,
          Uo,
          Ho,
          Wo,
          Go,
          Yo,
          Xo,
          Ko,
          Qo = {},
          Zo = 180 / Math.PI,
          Jo = Math.PI / 180,
          ea = Math.atan2,
          ta = /([A-Z])/g,
          ra = /(left|right|width|margin|padding|x)/i,
          na = /[\s,\(]\S/,
          ia = {
            autoAlpha: "opacity,visibility",
            scale: "scaleX,scaleY",
            alpha: "opacity",
          },
          sa = function (e, t) {
            return t.set(
              t.t,
              t.p,
              Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u,
              t
            );
          },
          oa = function (e, t) {
            return t.set(
              t.t,
              t.p,
              1 === e ? t.e : Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u,
              t
            );
          },
          aa = function (e, t) {
            return t.set(
              t.t,
              t.p,
              e ? Math.round(1e4 * (t.s + t.c * e)) / 1e4 + t.u : t.b,
              t
            );
          },
          la = function (e, t) {
            var r = t.s + t.c * e;
            t.set(t.t, t.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + t.u, t);
          },
          ca = function (e, t) {
            return t.set(t.t, t.p, e ? t.e : t.b, t);
          },
          ua = function (e, t) {
            return t.set(t.t, t.p, 1 !== e ? t.b : t.e, t);
          },
          da = function (e, t, r) {
            return (e.style[t] = r);
          },
          ha = function (e, t, r) {
            return e.style.setProperty(t, r);
          },
          pa = function (e, t, r) {
            return (e._gsap[t] = r);
          },
          fa = function (e, t, r) {
            return (e._gsap.scaleX = e._gsap.scaleY = r);
          },
          ma = function (e, t, r, n, i) {
            var s = e._gsap;
            (s.scaleX = s.scaleY = r), s.renderTransform(i, s);
          },
          va = function (e, t, r, n, i) {
            var s = e._gsap;
            (s[t] = r), s.renderTransform(i, s);
          },
          ga = "transform",
          ya = ga + "Origin",
          wa = function e(t, r) {
            var n = this,
              i = this.target,
              s = i.style,
              o = i._gsap;
            if (t in Qo && s) {
              if (((this.tfm = this.tfm || {}), "transform" === t))
                return ia.transform.split(",").forEach(function (t) {
                  return e.call(n, t, r);
                });
              if (
                (~(t = ia[t] || t).indexOf(",")
                  ? t.split(",").forEach(function (e) {
                      return (n.tfm[e] = Fa(i, e));
                    })
                  : (this.tfm[t] = o.x ? o[t] : Fa(i, t)),
                t === ya && (this.tfm.zOrigin = o.zOrigin),
                this.props.indexOf(ga) >= 0)
              )
                return;
              o.svg &&
                ((this.svgo = i.getAttribute("data-svg-origin")),
                this.props.push(ya, r, "")),
                (t = ga);
            }
            (s || r) && this.props.push(t, r, s[t]);
          },
          ba = function (e) {
            e.translate &&
              (e.removeProperty("translate"),
              e.removeProperty("scale"),
              e.removeProperty("rotate"));
          },
          _a = function () {
            var e,
              t,
              r = this.props,
              n = this.target,
              i = n.style,
              s = n._gsap;
            for (e = 0; e < r.length; e += 3)
              r[e + 1]
                ? (n[r[e]] = r[e + 2])
                : r[e + 2]
                ? (i[r[e]] = r[e + 2])
                : i.removeProperty(
                    "--" === r[e].substr(0, 2)
                      ? r[e]
                      : r[e].replace(ta, "-$1").toLowerCase()
                  );
            if (this.tfm) {
              for (t in this.tfm) s[t] = this.tfm[t];
              s.svg &&
                (s.renderTransform(),
                n.setAttribute("data-svg-origin", this.svgo || "")),
                ((e = Xo()) && e.isStart) ||
                  i[ga] ||
                  (ba(i),
                  s.zOrigin &&
                    i[ya] &&
                    ((i[ya] += " " + s.zOrigin + "px"),
                    (s.zOrigin = 0),
                    s.renderTransform()),
                  (s.uncache = 1));
            }
          },
          Ta = function (e, t) {
            var r = { target: e, props: [], revert: _a, save: wa };
            return (
              e._gsap || Bo.core.getCache(e),
              t &&
                t.split(",").forEach(function (e) {
                  return r.save(e);
                }),
              r
            );
          },
          Ea = function (e, t) {
            var r = Uo.createElementNS
              ? Uo.createElementNS(
                  (t || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
                  e
                )
              : Uo.createElement(e);
            return r && r.style ? r : Uo.createElement(e);
          },
          Sa = function e(t, r, n) {
            var i = getComputedStyle(t);
            return (
              i[r] ||
              i.getPropertyValue(r.replace(ta, "-$1").toLowerCase()) ||
              i.getPropertyValue(r) ||
              (!n && e(t, ka(r) || r, 1)) ||
              ""
            );
          },
          xa = "O,Moz,ms,Ms,Webkit".split(","),
          ka = function (e, t, r) {
            var n = (t || Go).style,
              i = 5;
            if (e in n && !r) return e;
            for (
              e = e.charAt(0).toUpperCase() + e.substr(1);
              i-- && !(xa[i] + e in n);
  
            );
            return i < 0 ? null : (3 === i ? "ms" : i >= 0 ? xa[i] : "") + e;
          },
          Ma = function () {
            "undefined" != typeof window &&
              window.document &&
              ((qo = window),
              (Uo = qo.document),
              (Ho = Uo.documentElement),
              (Go = Ea("div") || { style: {} }),
              Ea("div"),
              (ga = ka(ga)),
              (ya = ga + "Origin"),
              (Go.style.cssText =
                "border-width:0;line-height:0;position:absolute;padding:0"),
              (Ko = !!ka("perspective")),
              (Xo = Bo.core.reverting),
              (Wo = 1));
          },
          Pa = function e(t) {
            var r,
              n = Ea(
                "svg",
                (this.ownerSVGElement &&
                  this.ownerSVGElement.getAttribute("xmlns")) ||
                  "http://www.w3.org/2000/svg"
              ),
              i = this.parentNode,
              s = this.nextSibling,
              o = this.style.cssText;
            if (
              (Ho.appendChild(n),
              n.appendChild(this),
              (this.style.display = "block"),
              t)
            )
              try {
                (r = this.getBBox()),
                  (this._gsapBBox = this.getBBox),
                  (this.getBBox = e);
              } catch (e) {}
            else this._gsapBBox && (r = this._gsapBBox());
            return (
              i && (s ? i.insertBefore(this, s) : i.appendChild(this)),
              Ho.removeChild(n),
              (this.style.cssText = o),
              r
            );
          },
          Oa = function (e, t) {
            for (var r = t.length; r--; )
              if (e.hasAttribute(t[r])) return e.getAttribute(t[r]);
          },
          Ca = function (e) {
            var t;
            try {
              t = e.getBBox();
            } catch (r) {
              t = Pa.call(e, !0);
            }
            return (
              (t && (t.width || t.height)) ||
                e.getBBox === Pa ||
                (t = Pa.call(e, !0)),
              !t || t.width || t.x || t.y
                ? t
                : {
                    x: +Oa(e, ["x", "cx", "x1"]) || 0,
                    y: +Oa(e, ["y", "cy", "y1"]) || 0,
                    width: 0,
                    height: 0,
                  }
            );
          },
          Aa = function (e) {
            return !(!e.getCTM || (e.parentNode && !e.ownerSVGElement) || !Ca(e));
          },
          Ia = function (e, t) {
            if (t) {
              var r,
                n = e.style;
              t in Qo && t !== ya && (t = ga),
                n.removeProperty
                  ? (("ms" !== (r = t.substr(0, 2)) &&
                      "webkit" !== t.substr(0, 6)) ||
                      (t = "-" + t),
                    n.removeProperty(
                      "--" === r ? t : t.replace(ta, "-$1").toLowerCase()
                    ))
                  : n.removeAttribute(t);
            }
          },
          La = function (e, t, r, n, i, s) {
            var o = new Oo(e._pt, t, r, 0, 1, s ? ua : ca);
            return (e._pt = o), (o.b = n), (o.e = i), e._props.push(r), o;
          },
          Ra = { deg: 1, rad: 1, turn: 1 },
          za = { grid: 1, flex: 1 },
          Da = function e(t, r, n, i) {
            var s,
              o,
              a,
              l,
              c = parseFloat(n) || 0,
              u = (n + "").trim().substr((c + "").length) || "px",
              d = Go.style,
              h = ra.test(r),
              p = "svg" === t.tagName.toLowerCase(),
              f = (p ? "client" : "offset") + (h ? "Width" : "Height"),
              m = 100,
              v = "px" === i,
              g = "%" === i;
            if (i === u || !c || Ra[i] || Ra[u]) return c;
            if (
              ("px" !== u && !v && (c = e(t, r, n, "px")),
              (l = t.getCTM && Aa(t)),
              (g || "%" === u) && (Qo[r] || ~r.indexOf("adius")))
            )
              return (
                (s = l ? t.getBBox()[h ? "width" : "height"] : t[f]),
                Ai(g ? (c / s) * m : (c / 100) * s)
              );
            if (
              ((d[h ? "width" : "height"] = m + (v ? u : i)),
              (o =
                ~r.indexOf("adius") || ("em" === i && t.appendChild && !p)
                  ? t
                  : t.parentNode),
              l && (o = (t.ownerSVGElement || {}).parentNode),
              (o && o !== Uo && o.appendChild) || (o = Uo.body),
              (a = o._gsap) &&
                g &&
                a.width &&
                h &&
                a.time === Bs.time &&
                !a.uncache)
            )
              return Ai((c / a.width) * m);
            if (!g || ("height" !== r && "width" !== r))
              (g || "%" === u) &&
                !za[Sa(o, "display")] &&
                (d.position = Sa(t, "position")),
                o === t && (d.position = "static"),
                o.appendChild(Go),
                (s = Go[f]),
                o.removeChild(Go),
                (d.position = "absolute");
            else {
              var y = t.style[r];
              (t.style[r] = m + i), (s = t[f]), y ? (t.style[r] = y) : Ia(t, r);
            }
            return (
              h && g && (((a = Pi(o)).time = Bs.time), (a.width = o[f])),
              Ai(v ? (s * c) / m : s && c ? (m / s) * c : 0)
            );
          },
          Fa = function (e, t, r, n) {
            var i;
            return (
              Wo || Ma(),
              t in ia &&
                "transform" !== t &&
                ~(t = ia[t]).indexOf(",") &&
                (t = t.split(",")[0]),
              Qo[t] && "transform" !== t
                ? ((i = Xa(e, n)),
                  (i =
                    "transformOrigin" !== t
                      ? i[t]
                      : i.svg
                      ? i.origin
                      : Ka(Sa(e, ya)) + " " + i.zOrigin + "px"))
                : (!(i = e.style[t]) ||
                    "auto" === i ||
                    n ||
                    ~(i + "").indexOf("calc(")) &&
                  (i =
                    (Ba[t] && Ba[t](e, t, r)) ||
                    Sa(e, t) ||
                    Oi(e, t) ||
                    ("opacity" === t ? 1 : 0)),
              r && !~(i + "").trim().indexOf(" ") ? Da(e, t, i, r) + r : i
            );
          },
          $a = function (e, t, r, n) {
            if (!r || "none" === r) {
              var i = ka(t, e, 1),
                s = i && Sa(e, i, 1);
              s && s !== r
                ? ((t = i), (r = s))
                : "borderColor" === t && (r = Sa(e, "borderTopColor"));
            }
            var o,
              a,
              l,
              c,
              u,
              d,
              h,
              p,
              f,
              m,
              v,
              g = new Oo(this._pt, e.style, t, 0, 1, Eo),
              y = 0,
              w = 0;
            if (
              ((g.b = r),
              (g.e = n),
              (r += ""),
              "auto" === (n += "") &&
                ((d = e.style[t]),
                (e.style[t] = n),
                (n = Sa(e, t) || n),
                d ? (e.style[t] = d) : Ia(e, t)),
              Vs((o = [r, n])),
              (n = o[1]),
              (l = (r = o[0]).match(ii) || []),
              (n.match(ii) || []).length)
            ) {
              for (; (a = ii.exec(n)); )
                (h = a[0]),
                  (f = n.substring(y, a.index)),
                  u
                    ? (u = (u + 1) % 5)
                    : ("rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5)) ||
                      (u = 1),
                  h !== (d = l[w++] || "") &&
                    ((c = parseFloat(d) || 0),
                    (v = d.substr((c + "").length)),
                    "=" === h.charAt(1) && (h = Li(c, h) + v),
                    (p = parseFloat(h)),
                    (m = h.substr((p + "").length)),
                    (y = ii.lastIndex - m.length),
                    m ||
                      ((m = m || Dn.units[t] || v),
                      y === n.length && ((n += m), (g.e += m))),
                    v !== m && (c = Da(e, t, d, m) || 0),
                    (g._pt = {
                      _next: g._pt,
                      p: f || 1 === w ? f : ",",
                      s: c,
                      c: p - c,
                      m: (u && u < 4) || "zIndex" === t ? Math.round : 0,
                    }));
              g.c = y < n.length ? n.substring(y, n.length) : "";
            } else g.r = "display" === t && "none" === n ? ua : ca;
            return oi.test(n) && (g.e = 0), (this._pt = g), g;
          },
          Na = {
            top: "0%",
            bottom: "100%",
            left: "0%",
            right: "100%",
            center: "50%",
          },
          ja = function (e) {
            var t = e.split(" "),
              r = t[0],
              n = t[1] || "50%";
            return (
              ("top" !== r && "bottom" !== r && "left" !== n && "right" !== n) ||
                ((e = r), (r = n), (n = e)),
              (t[0] = Na[r] || r),
              (t[1] = Na[n] || n),
              t.join(" ")
            );
          },
          Va = function (e, t) {
            if (t.tween && t.tween._time === t.tween._dur) {
              var r,
                n,
                i,
                s = t.t,
                o = s.style,
                a = t.u,
                l = s._gsap;
              if ("all" === a || !0 === a) (o.cssText = ""), (n = 1);
              else
                for (i = (a = a.split(",")).length; --i > -1; )
                  (r = a[i]),
                    Qo[r] && ((n = 1), (r = "transformOrigin" === r ? ya : ga)),
                    Ia(s, r);
              n &&
                (Ia(s, ga),
                l &&
                  (l.svg && s.removeAttribute("transform"),
                  Xa(s, 1),
                  (l.uncache = 1),
                  ba(o)));
            }
          },
          Ba = {
            clearProps: function (e, t, r, n, i) {
              if ("isFromStart" !== i.data) {
                var s = (e._pt = new Oo(e._pt, t, r, 0, 0, Va));
                return (
                  (s.u = n), (s.pr = -10), (s.tween = i), e._props.push(r), 1
                );
              }
            },
          },
          qa = [1, 0, 0, 1, 0, 0],
          Ua = {},
          Ha = function (e) {
            return "matrix(1, 0, 0, 1, 0, 0)" === e || "none" === e || !e;
          },
          Wa = function (e) {
            var t = Sa(e, ga);
            return Ha(t) ? qa : t.substr(7).match(ni).map(Ai);
          },
          Ga = function (e, t) {
            var r,
              n,
              i,
              s,
              o = e._gsap || Pi(e),
              a = e.style,
              l = Wa(e);
            return o.svg && e.getAttribute("transform")
              ? "1,0,0,1,0,0" ===
                (l = [
                  (i = e.transform.baseVal.consolidate().matrix).a,
                  i.b,
                  i.c,
                  i.d,
                  i.e,
                  i.f,
                ]).join(",")
                ? qa
                : l
              : (l !== qa ||
                  e.offsetParent ||
                  e === Ho ||
                  o.svg ||
                  ((i = a.display),
                  (a.display = "block"),
                  ((r = e.parentNode) && e.offsetParent) ||
                    ((s = 1), (n = e.nextElementSibling), Ho.appendChild(e)),
                  (l = Wa(e)),
                  i ? (a.display = i) : Ia(e, "display"),
                  s &&
                    (n
                      ? r.insertBefore(e, n)
                      : r
                      ? r.appendChild(e)
                      : Ho.removeChild(e))),
                t && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l);
          },
          Ya = function (e, t, r, n, i, s) {
            var o,
              a,
              l,
              c = e._gsap,
              u = i || Ga(e, !0),
              d = c.xOrigin || 0,
              h = c.yOrigin || 0,
              p = c.xOffset || 0,
              f = c.yOffset || 0,
              m = u[0],
              v = u[1],
              g = u[2],
              y = u[3],
              w = u[4],
              b = u[5],
              _ = t.split(" "),
              T = parseFloat(_[0]) || 0,
              E = parseFloat(_[1]) || 0;
            r
              ? u !== qa &&
                (a = m * y - v * g) &&
                ((l = T * (-v / a) + E * (m / a) - (m * b - v * w) / a),
                (T = T * (y / a) + E * (-g / a) + (g * b - y * w) / a),
                (E = l))
              : ((T =
                  (o = Ca(e)).x + (~_[0].indexOf("%") ? (T / 100) * o.width : T)),
                (E =
                  o.y +
                  (~(_[1] || _[0]).indexOf("%") ? (E / 100) * o.height : E))),
              n || (!1 !== n && c.smooth)
                ? ((w = T - d),
                  (b = E - h),
                  (c.xOffset = p + (w * m + b * g) - w),
                  (c.yOffset = f + (w * v + b * y) - b))
                : (c.xOffset = c.yOffset = 0),
              (c.xOrigin = T),
              (c.yOrigin = E),
              (c.smooth = !!n),
              (c.origin = t),
              (c.originIsAbsolute = !!r),
              (e.style[ya] = "0px 0px"),
              s &&
                (La(s, c, "xOrigin", d, T),
                La(s, c, "yOrigin", h, E),
                La(s, c, "xOffset", p, c.xOffset),
                La(s, c, "yOffset", f, c.yOffset)),
              e.setAttribute("data-svg-origin", T + " " + E);
          },
          Xa = function (e, t) {
            var r = e._gsap || new to(e);
            if ("x" in r && !t && !r.uncache) return r;
            var n,
              i,
              s,
              o,
              a,
              l,
              c,
              u,
              d,
              h,
              p,
              f,
              m,
              v,
              g,
              y,
              w,
              b,
              _,
              T,
              E,
              S,
              x,
              k,
              M,
              P,
              O,
              C,
              A,
              I,
              L,
              R,
              z = e.style,
              D = r.scaleX < 0,
              F = "px",
              $ = "deg",
              N = getComputedStyle(e),
              j = Sa(e, ya) || "0";
            return (
              (n = i = s = l = c = u = d = h = p = 0),
              (o = a = 1),
              (r.svg = !(!e.getCTM || !Aa(e))),
              N.translate &&
                (("none" === N.translate &&
                  "none" === N.scale &&
                  "none" === N.rotate) ||
                  (z[ga] =
                    ("none" !== N.translate
                      ? "translate3d(" +
                        (N.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                        ") "
                      : "") +
                    ("none" !== N.rotate ? "rotate(" + N.rotate + ") " : "") +
                    ("none" !== N.scale
                      ? "scale(" + N.scale.split(" ").join(",") + ") "
                      : "") +
                    ("none" !== N[ga] ? N[ga] : "")),
                (z.scale = z.rotate = z.translate = "none")),
              (v = Ga(e, r.svg)),
              r.svg &&
                (r.uncache
                  ? ((M = e.getBBox()),
                    (j = r.xOrigin - M.x + "px " + (r.yOrigin - M.y) + "px"),
                    (k = ""))
                  : (k = !t && e.getAttribute("data-svg-origin")),
                Ya(e, k || j, !!k || r.originIsAbsolute, !1 !== r.smooth, v)),
              (f = r.xOrigin || 0),
              (m = r.yOrigin || 0),
              v !== qa &&
                ((b = v[0]),
                (_ = v[1]),
                (T = v[2]),
                (E = v[3]),
                (n = S = v[4]),
                (i = x = v[5]),
                6 === v.length
                  ? ((o = Math.sqrt(b * b + _ * _)),
                    (a = Math.sqrt(E * E + T * T)),
                    (l = b || _ ? ea(_, b) * Zo : 0),
                    (d = T || E ? ea(T, E) * Zo + l : 0) &&
                      (a *= Math.abs(Math.cos(d * Jo))),
                    r.svg &&
                      ((n -= f - (f * b + m * T)), (i -= m - (f * _ + m * E))))
                  : ((R = v[6]),
                    (I = v[7]),
                    (O = v[8]),
                    (C = v[9]),
                    (A = v[10]),
                    (L = v[11]),
                    (n = v[12]),
                    (i = v[13]),
                    (s = v[14]),
                    (c = (g = ea(R, A)) * Zo),
                    g &&
                      ((k = S * (y = Math.cos(-g)) + O * (w = Math.sin(-g))),
                      (M = x * y + C * w),
                      (P = R * y + A * w),
                      (O = S * -w + O * y),
                      (C = x * -w + C * y),
                      (A = R * -w + A * y),
                      (L = I * -w + L * y),
                      (S = k),
                      (x = M),
                      (R = P)),
                    (u = (g = ea(-T, A)) * Zo),
                    g &&
                      ((y = Math.cos(-g)),
                      (L = E * (w = Math.sin(-g)) + L * y),
                      (b = k = b * y - O * w),
                      (_ = M = _ * y - C * w),
                      (T = P = T * y - A * w)),
                    (l = (g = ea(_, b)) * Zo),
                    g &&
                      ((k = b * (y = Math.cos(g)) + _ * (w = Math.sin(g))),
                      (M = S * y + x * w),
                      (_ = _ * y - b * w),
                      (x = x * y - S * w),
                      (b = k),
                      (S = M)),
                    c &&
                      Math.abs(c) + Math.abs(l) > 359.9 &&
                      ((c = l = 0), (u = 180 - u)),
                    (o = Ai(Math.sqrt(b * b + _ * _ + T * T))),
                    (a = Ai(Math.sqrt(x * x + R * R))),
                    (g = ea(S, x)),
                    (d = Math.abs(g) > 2e-4 ? g * Zo : 0),
                    (p = L ? 1 / (L < 0 ? -L : L) : 0)),
                r.svg &&
                  ((k = e.getAttribute("transform")),
                  (r.forceCSS =
                    e.setAttribute("transform", "") || !Ha(Sa(e, ga))),
                  k && e.setAttribute("transform", k))),
              Math.abs(d) > 90 &&
                Math.abs(d) < 270 &&
                (D
                  ? ((o *= -1),
                    (d += l <= 0 ? 180 : -180),
                    (l += l <= 0 ? 180 : -180))
                  : ((a *= -1), (d += d <= 0 ? 180 : -180))),
              (t = t || r.uncache),
              (r.x =
                n -
                ((r.xPercent =
                  n &&
                  ((!t && r.xPercent) ||
                    (Math.round(e.offsetWidth / 2) === Math.round(-n) ? -50 : 0)))
                  ? (e.offsetWidth * r.xPercent) / 100
                  : 0) +
                F),
              (r.y =
                i -
                ((r.yPercent =
                  i &&
                  ((!t && r.yPercent) ||
                    (Math.round(e.offsetHeight / 2) === Math.round(-i)
                      ? -50
                      : 0)))
                  ? (e.offsetHeight * r.yPercent) / 100
                  : 0) +
                F),
              (r.z = s + F),
              (r.scaleX = Ai(o)),
              (r.scaleY = Ai(a)),
              (r.rotation = Ai(l) + $),
              (r.rotationX = Ai(c) + $),
              (r.rotationY = Ai(u) + $),
              (r.skewX = d + $),
              (r.skewY = h + $),
              (r.transformPerspective = p + F),
              (r.zOrigin =
                parseFloat(j.split(" ")[2]) || (!t && r.zOrigin) || 0) &&
                (z[ya] = Ka(j)),
              (r.xOffset = r.yOffset = 0),
              (r.force3D = Dn.force3D),
              (r.renderTransform = r.svg ? nl : Ko ? rl : Za),
              (r.uncache = 0),
              r
            );
          },
          Ka = function (e) {
            return (e = e.split(" "))[0] + " " + e[1];
          },
          Qa = function (e, t, r) {
            var n = fs(t);
            return Ai(parseFloat(t) + parseFloat(Da(e, "x", r + "px", n))) + n;
          },
          Za = function (e, t) {
            (t.z = "0px"),
              (t.rotationY = t.rotationX = "0deg"),
              (t.force3D = 0),
              rl(e, t);
          },
          Ja = "0deg",
          el = "0px",
          tl = ") ",
          rl = function (e, t) {
            var r = t || this,
              n = r.xPercent,
              i = r.yPercent,
              s = r.x,
              o = r.y,
              a = r.z,
              l = r.rotation,
              c = r.rotationY,
              u = r.rotationX,
              d = r.skewX,
              h = r.skewY,
              p = r.scaleX,
              f = r.scaleY,
              m = r.transformPerspective,
              v = r.force3D,
              g = r.target,
              y = r.zOrigin,
              w = "",
              b = ("auto" === v && e && 1 !== e) || !0 === v;
            if (y && (u !== Ja || c !== Ja)) {
              var _,
                T = parseFloat(c) * Jo,
                E = Math.sin(T),
                S = Math.cos(T);
              (T = parseFloat(u) * Jo),
                (_ = Math.cos(T)),
                (s = Qa(g, s, E * _ * -y)),
                (o = Qa(g, o, -Math.sin(T) * -y)),
                (a = Qa(g, a, S * _ * -y + y));
            }
            m !== el && (w += "perspective(" + m + tl),
              (n || i) && (w += "translate(" + n + "%, " + i + "%) "),
              (b || s !== el || o !== el || a !== el) &&
                (w +=
                  a !== el || b
                    ? "translate3d(" + s + ", " + o + ", " + a + ") "
                    : "translate(" + s + ", " + o + tl),
              l !== Ja && (w += "rotate(" + l + tl),
              c !== Ja && (w += "rotateY(" + c + tl),
              u !== Ja && (w += "rotateX(" + u + tl),
              (d === Ja && h === Ja) || (w += "skew(" + d + ", " + h + tl),
              (1 === p && 1 === f) || (w += "scale(" + p + ", " + f + tl),
              (g.style[ga] = w || "translate(0, 0)");
          },
          nl = function (e, t) {
            var r,
              n,
              i,
              s,
              o,
              a = t || this,
              l = a.xPercent,
              c = a.yPercent,
              u = a.x,
              d = a.y,
              h = a.rotation,
              p = a.skewX,
              f = a.skewY,
              m = a.scaleX,
              v = a.scaleY,
              g = a.target,
              y = a.xOrigin,
              w = a.yOrigin,
              b = a.xOffset,
              _ = a.yOffset,
              T = a.forceCSS,
              E = parseFloat(u),
              S = parseFloat(d);
            (h = parseFloat(h)),
              (p = parseFloat(p)),
              (f = parseFloat(f)) && ((p += f = parseFloat(f)), (h += f)),
              h || p
                ? ((h *= Jo),
                  (p *= Jo),
                  (r = Math.cos(h) * m),
                  (n = Math.sin(h) * m),
                  (i = Math.sin(h - p) * -v),
                  (s = Math.cos(h - p) * v),
                  p &&
                    ((f *= Jo),
                    (o = Math.tan(p - f)),
                    (i *= o = Math.sqrt(1 + o * o)),
                    (s *= o),
                    f &&
                      ((o = Math.tan(f)),
                      (r *= o = Math.sqrt(1 + o * o)),
                      (n *= o))),
                  (r = Ai(r)),
                  (n = Ai(n)),
                  (i = Ai(i)),
                  (s = Ai(s)))
                : ((r = m), (s = v), (n = i = 0)),
              ((E && !~(u + "").indexOf("px")) ||
                (S && !~(d + "").indexOf("px"))) &&
                ((E = Da(g, "x", u, "px")), (S = Da(g, "y", d, "px"))),
              (y || w || b || _) &&
                ((E = Ai(E + y - (y * r + w * i) + b)),
                (S = Ai(S + w - (y * n + w * s) + _))),
              (l || c) &&
                ((o = g.getBBox()),
                (E = Ai(E + (l / 100) * o.width)),
                (S = Ai(S + (c / 100) * o.height))),
              (o =
                "matrix(" +
                r +
                "," +
                n +
                "," +
                i +
                "," +
                s +
                "," +
                E +
                "," +
                S +
                ")"),
              g.setAttribute("transform", o),
              T && (g.style[ga] = o);
          },
          il = function (e, t, r, n, i) {
            var s,
              o,
              a = 360,
              l = Wn(i),
              c = parseFloat(i) * (l && ~i.indexOf("rad") ? Zo : 1) - n,
              u = n + c + "deg";
            return (
              l &&
                ("short" === (s = i.split("_")[1]) &&
                  (c %= a) !== c % 180 &&
                  (c += c < 0 ? a : -360),
                "cw" === s && c < 0
                  ? (c = ((c + 36e9) % a) - ~~(c / a) * a)
                  : "ccw" === s &&
                    c > 0 &&
                    (c = ((c - 36e9) % a) - ~~(c / a) * a)),
              (e._pt = o = new Oo(e._pt, t, r, n, c, oa)),
              (o.e = u),
              (o.u = "deg"),
              e._props.push(r),
              o
            );
          },
          sl = function (e, t) {
            for (var r in t) e[r] = t[r];
            return e;
          },
          ol = function (e, t, r) {
            var n,
              i,
              s,
              o,
              a,
              l,
              c,
              u = sl({}, r._gsap),
              d = r.style;
            for (i in (u.svg
              ? ((s = r.getAttribute("transform")),
                r.setAttribute("transform", ""),
                (d[ga] = t),
                (n = Xa(r, 1)),
                Ia(r, ga),
                r.setAttribute("transform", s))
              : ((s = getComputedStyle(r)[ga]),
                (d[ga] = t),
                (n = Xa(r, 1)),
                (d[ga] = s)),
            Qo))
              (s = u[i]) !== (o = n[i]) &&
                "perspective,force3D,transformOrigin,svgOrigin".indexOf(i) < 0 &&
                ((a = fs(s) !== (c = fs(o)) ? Da(r, i, s, c) : parseFloat(s)),
                (l = parseFloat(o)),
                (e._pt = new Oo(e._pt, n, i, a, l - a, sa)),
                (e._pt.u = c || 0),
                e._props.push(i));
            sl(n, u);
          };
        Ci("padding,margin,Width,Radius", function (e, t) {
          var r = "Top",
            n = "Right",
            i = "Bottom",
            s = "Left",
            o = (t < 3 ? [r, n, i, s] : [r + s, r + n, i + n, i + s]).map(
              function (r) {
                return t < 2 ? e + r : "border" + r + e;
              }
            );
          Ba[t > 1 ? "border" + e : e] = function (e, t, r, n, i) {
            var s, a;
            if (arguments.length < 4)
              return (
                (s = o.map(function (t) {
                  return Fa(e, t, r);
                })),
                5 === (a = s.join(" ")).split(s[0]).length ? s[0] : a
              );
            (s = (n + "").split(" ")),
              (a = {}),
              o.forEach(function (e, t) {
                return (a[e] = s[t] = s[t] || s[((t - 1) / 2) | 0]);
              }),
              e.init(t, a, i);
          };
        });
        var al,
          ll,
          cl,
          ul = {
            name: "css",
            register: Ma,
            targetTest: function (e) {
              return e.style && e.nodeType;
            },
            init: function (e, t, r, n, i) {
              var s,
                o,
                a,
                l,
                c,
                u,
                d,
                h,
                p,
                f,
                m,
                v,
                g,
                y,
                w,
                b,
                _ = this._props,
                T = e.style,
                E = r.vars.startAt;
              for (d in (Wo || Ma(),
              (this.styles = this.styles || Ta(e)),
              (b = this.styles.props),
              (this.tween = r),
              t))
                if (
                  "autoRound" !== d &&
                  ((o = t[d]), !Ti[d] || !lo(d, t, r, n, e, i))
                )
                  if (
                    ((c = typeof o),
                    (u = Ba[d]),
                    "function" === c && (c = typeof (o = o.call(r, n, e, i))),
                    "string" === c && ~o.indexOf("random(") && (o = ks(o)),
                    u)
                  )
                    u(this, e, d, o, r) && (w = 1);
                  else if ("--" === d.substr(0, 2))
                    (s = (getComputedStyle(e).getPropertyValue(d) + "").trim()),
                      (o += ""),
                      (Ns.lastIndex = 0),
                      Ns.test(s) || ((h = fs(s)), (p = fs(o))),
                      p ? h !== p && (s = Da(e, d, s, p) + p) : h && (o += h),
                      this.add(T, "setProperty", s, o, n, i, 0, 0, d),
                      _.push(d),
                      b.push(d, 0, T[d]);
                  else if ("undefined" !== c) {
                    if (
                      (E && d in E
                        ? ((s =
                            "function" == typeof E[d]
                              ? E[d].call(r, n, e, i)
                              : E[d]),
                          Wn(s) && ~s.indexOf("random(") && (s = ks(s)),
                          fs(s + "") ||
                            "auto" === s ||
                            (s += Dn.units[d] || fs(Fa(e, d)) || ""),
                          "=" === (s + "").charAt(1) && (s = Fa(e, d)))
                        : (s = Fa(e, d)),
                      (l = parseFloat(s)),
                      (f =
                        "string" === c &&
                        "=" === o.charAt(1) &&
                        o.substr(0, 2)) && (o = o.substr(2)),
                      (a = parseFloat(o)),
                      d in ia &&
                        ("autoAlpha" === d &&
                          (1 === l &&
                            "hidden" === Fa(e, "visibility") &&
                            a &&
                            (l = 0),
                          b.push("visibility", 0, T.visibility),
                          La(
                            this,
                            T,
                            "visibility",
                            l ? "inherit" : "hidden",
                            a ? "inherit" : "hidden",
                            !a
                          )),
                        "scale" !== d &&
                          "transform" !== d &&
                          ~(d = ia[d]).indexOf(",") &&
                          (d = d.split(",")[0])),
                      (m = d in Qo))
                    )
                      if (
                        (this.styles.save(d),
                        v ||
                          (((g = e._gsap).renderTransform && !t.parseTransform) ||
                            Xa(e, t.parseTransform),
                          (y = !1 !== t.smoothOrigin && g.smooth),
                          ((v = this._pt =
                            new Oo(
                              this._pt,
                              T,
                              ga,
                              0,
                              1,
                              g.renderTransform,
                              g,
                              0,
                              -1
                            )).dep = 1)),
                        "scale" === d)
                      )
                        (this._pt = new Oo(
                          this._pt,
                          g,
                          "scaleY",
                          g.scaleY,
                          (f ? Li(g.scaleY, f + a) : a) - g.scaleY || 0,
                          sa
                        )),
                          (this._pt.u = 0),
                          _.push("scaleY", d),
                          (d += "X");
                      else {
                        if ("transformOrigin" === d) {
                          b.push(ya, 0, T[ya]),
                            (o = ja(o)),
                            g.svg
                              ? Ya(e, o, 0, y, 0, this)
                              : ((p = parseFloat(o.split(" ")[2]) || 0) !==
                                  g.zOrigin &&
                                  La(this, g, "zOrigin", g.zOrigin, p),
                                La(this, T, d, Ka(s), Ka(o)));
                          continue;
                        }
                        if ("svgOrigin" === d) {
                          Ya(e, o, 1, y, 0, this);
                          continue;
                        }
                        if (d in Ua) {
                          il(this, g, d, l, f ? Li(l, f + o) : o);
                          continue;
                        }
                        if ("smoothOrigin" === d) {
                          La(this, g, "smooth", g.smooth, o);
                          continue;
                        }
                        if ("force3D" === d) {
                          g[d] = o;
                          continue;
                        }
                        if ("transform" === d) {
                          ol(this, o, e);
                          continue;
                        }
                      }
                    else d in T || (d = ka(d) || d);
                    if (
                      m ||
                      ((a || 0 === a) && (l || 0 === l) && !na.test(o) && d in T)
                    )
                      a || (a = 0),
                        (h = (s + "").substr((l + "").length)) !==
                          (p = fs(o) || (d in Dn.units ? Dn.units[d] : h)) &&
                          (l = Da(e, d, s, p)),
                        (this._pt = new Oo(
                          this._pt,
                          m ? g : T,
                          d,
                          l,
                          (f ? Li(l, f + a) : a) - l,
                          m ||
                          ("px" !== p && "zIndex" !== d) ||
                          !1 === t.autoRound
                            ? sa
                            : la
                        )),
                        (this._pt.u = p || 0),
                        h !== p &&
                          "%" !== p &&
                          ((this._pt.b = s), (this._pt.r = aa));
                    else if (d in T) $a.call(this, e, d, s, f ? f + o : o);
                    else if (d in e)
                      this.add(e, d, s || e[d], f ? f + o : o, n, i);
                    else if ("parseTransform" !== d) {
                      hi(d, o);
                      continue;
                    }
                    m || (d in T ? b.push(d, 0, T[d]) : b.push(d, 1, s || e[d])),
                      _.push(d);
                  }
              w && Po(this);
            },
            render: function (e, t) {
              if (t.tween._time || !Xo())
                for (var r = t._pt; r; ) r.r(e, r.d), (r = r._next);
              else t.styles.revert();
            },
            get: Fa,
            aliases: ia,
            getSetter: function (e, t, r) {
              var n = ia[t];
              return (
                n && n.indexOf(",") < 0 && (t = n),
                t in Qo && t !== ya && (e._gsap.x || Fa(e, "x"))
                  ? r && Yo === r
                    ? "scale" === t
                      ? fa
                      : pa
                    : (Yo = r || {}) && ("scale" === t ? ma : va)
                  : e.style && !Xn(e.style[t])
                  ? da
                  : ~t.indexOf("-")
                  ? ha
                  : bo(e, t)
              );
            },
            core: { _removeProperty: Ia, _getMatrix: Ga },
          };
        (Bo.utils.checkPrefix = ka),
          (Bo.core.getStyleSaver = Ta),
          (cl = Ci(
            (al = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") +
              "," +
              (ll = "rotation,rotationX,rotationY,skewX,skewY") +
              ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
            function (e) {
              Qo[e] = 1;
            }
          )),
          Ci(ll, function (e) {
            (Dn.units[e] = "deg"), (Ua[e] = 1);
          }),
          (ia[cl[13]] = al + "," + ll),
          Ci(
            "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
            function (e) {
              var t = e.split(":");
              ia[t[1]] = cl[t[0]];
            }
          ),
          Ci(
            "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
            function (e) {
              Dn.units[e] = "px";
            }
          ),
          Bo.registerPlugin(ul);
        var dl = Bo.registerPlugin(ul) || Bo;
        dl.core.Tween;
        function hl(e, t) {
          for (var r = 0; r < t.length; r++) {
            var n = t[r];
            (n.enumerable = n.enumerable || !1),
              (n.configurable = !0),
              "value" in n && (n.writable = !0),
              Object.defineProperty(e, n.key, n);
          }
        }
        var pl,
          fl,
          ml,
          vl,
          gl,
          yl,
          wl,
          bl,
          _l,
          Tl,
          El,
          Sl,
          xl,
          kl = function () {
            return (
              pl ||
              ("undefined" != typeof window &&
                (pl = window.gsap) &&
                pl.registerPlugin &&
                pl)
            );
          },
          Ml = 1,
          Pl = [],
          Ol = [],
          Cl = [],
          Al = Date.now,
          Il = function (e, t) {
            return t;
          },
          Ll = function (e, t) {
            return ~Cl.indexOf(e) && Cl[Cl.indexOf(e) + 1][t];
          },
          Rl = function (e) {
            return !!~Tl.indexOf(e);
          },
          zl = function (e, t, r, n, i) {
            return e.addEventListener(t, r, { passive: !1 !== n, capture: !!i });
          },
          Dl = function (e, t, r, n) {
            return e.removeEventListener(t, r, !!n);
          },
          Fl = "scrollLeft",
          $l = "scrollTop",
          Nl = function () {
            return (El && El.isPressed) || Ol.cache++;
          },
          jl = function (e, t) {
            var r = function r(n) {
              if (n || 0 === n) {
                Ml && (ml.history.scrollRestoration = "manual");
                var i = El && El.isPressed;
                (n = r.v = Math.round(n) || (El && El.iOS ? 1 : 0)),
                  e(n),
                  (r.cacheID = Ol.cache),
                  i && Il("ss", n);
              } else
                (t || Ol.cache !== r.cacheID || Il("ref")) &&
                  ((r.cacheID = Ol.cache), (r.v = e()));
              return r.v + r.offset;
            };
            return (r.offset = 0), e && r;
          },
          Vl = {
            s: Fl,
            p: "left",
            p2: "Left",
            os: "right",
            os2: "Right",
            d: "width",
            d2: "Width",
            a: "x",
            sc: jl(function (e) {
              return arguments.length
                ? ml.scrollTo(e, Bl.sc())
                : ml.pageXOffset || vl[Fl] || gl[Fl] || yl[Fl] || 0;
            }),
          },
          Bl = {
            s: $l,
            p: "top",
            p2: "Top",
            os: "bottom",
            os2: "Bottom",
            d: "height",
            d2: "Height",
            a: "y",
            op: Vl,
            sc: jl(function (e) {
              return arguments.length
                ? ml.scrollTo(Vl.sc(), e)
                : ml.pageYOffset || vl[$l] || gl[$l] || yl[$l] || 0;
            }),
          },
          ql = function (e, t) {
            return (
              ((t && t._ctx && t._ctx.selector) || pl.utils.toArray)(e)[0] ||
              ("string" == typeof e && !1 !== pl.config().nullTargetWarn
                ? console.warn("Element not found:", e)
                : null)
            );
          },
          Ul = function (e, t) {
            var r = t.s,
              n = t.sc;
            Rl(e) && (e = vl.scrollingElement || gl);
            var i = Ol.indexOf(e),
              s = n === Bl.sc ? 1 : 2;
            !~i && (i = Ol.push(e) - 1), Ol[i + s] || zl(e, "scroll", Nl);
            var o = Ol[i + s],
              a =
                o ||
                (Ol[i + s] =
                  jl(Ll(e, r), !0) ||
                  (Rl(e)
                    ? n
                    : jl(function (t) {
                        return arguments.length ? (e[r] = t) : e[r];
                      })));
            return (
              (a.target = e),
              o || (a.smooth = "smooth" === pl.getProperty(e, "scrollBehavior")),
              a
            );
          },
          Hl = function (e, t, r) {
            var n = e,
              i = e,
              s = Al(),
              o = s,
              a = t || 50,
              l = Math.max(500, 3 * a),
              c = function (e, t) {
                var l = Al();
                t || l - s > a
                  ? ((i = n), (n = e), (o = s), (s = l))
                  : r
                  ? (n += e)
                  : (n = i + ((e - i) / (l - o)) * (s - o));
              };
            return {
              update: c,
              reset: function () {
                (i = n = r ? 0 : n), (o = s = 0);
              },
              getVelocity: function (e) {
                var t = o,
                  a = i,
                  u = Al();
                return (
                  (e || 0 === e) && e !== n && c(e),
                  s === o || u - o > l
                    ? 0
                    : ((n + (r ? a : -a)) / ((r ? u : s) - t)) * 1e3
                );
              },
            };
          },
          Wl = function (e, t) {
            return (
              t && !e._gsapAllow && e.preventDefault(),
              e.changedTouches ? e.changedTouches[0] : e
            );
          },
          Gl = function (e) {
            var t = Math.max.apply(Math, e),
              r = Math.min.apply(Math, e);
            return Math.abs(t) >= Math.abs(r) ? t : r;
          },
          Yl = function () {
            var e, t, r, n;
            (_l = pl.core.globals().ScrollTrigger) &&
              _l.core &&
              ((e = _l.core),
              (t = e.bridge || {}),
              (r = e._scrollers),
              (n = e._proxies),
              r.push.apply(r, Ol),
              n.push.apply(n, Cl),
              (Ol = r),
              (Cl = n),
              (Il = function (e, r) {
                return t[e](r);
              }));
          },
          Xl = function (e) {
            return (
              (pl = e || kl()),
              !fl &&
                pl &&
                "undefined" != typeof document &&
                document.body &&
                ((ml = window),
                (vl = document),
                (gl = vl.documentElement),
                (yl = vl.body),
                (Tl = [ml, vl, gl, yl]),
                pl.utils.clamp,
                (xl = pl.core.context || function () {}),
                (bl = "onpointerenter" in yl ? "pointer" : "mouse"),
                (wl = Kl.isTouch =
                  ml.matchMedia &&
                  ml.matchMedia("(hover: none), (pointer: coarse)").matches
                    ? 1
                    : "ontouchstart" in ml ||
                      navigator.maxTouchPoints > 0 ||
                      navigator.msMaxTouchPoints > 0
                    ? 2
                    : 0),
                (Sl = Kl.eventTypes =
                  (
                    "ontouchstart" in gl
                      ? "touchstart,touchmove,touchcancel,touchend"
                      : "onpointerdown" in gl
                      ? "pointerdown,pointermove,pointercancel,pointerup"
                      : "mousedown,mousemove,mouseup,mouseup"
                  ).split(",")),
                setTimeout(function () {
                  return (Ml = 0);
                }, 500),
                Yl(),
                (fl = 1)),
              fl
            );
          };
        (Vl.op = Bl), (Ol.cache = 0);
        var Kl = (function () {
          function e(e) {
            this.init(e);
          }
          var t, r, n;
          return (
            (e.prototype.init = function (e) {
              fl ||
                Xl(pl) ||
                console.warn("Please gsap.registerPlugin(Observer)"),
                _l || Yl();
              var t = e.tolerance,
                r = e.dragMinimum,
                n = e.type,
                i = e.target,
                s = e.lineHeight,
                o = e.debounce,
                a = e.preventDefault,
                l = e.onStop,
                c = e.onStopDelay,
                u = e.ignore,
                d = e.wheelSpeed,
                h = e.event,
                p = e.onDragStart,
                f = e.onDragEnd,
                m = e.onDrag,
                v = e.onPress,
                g = e.onRelease,
                y = e.onRight,
                w = e.onLeft,
                b = e.onUp,
                _ = e.onDown,
                T = e.onChangeX,
                E = e.onChangeY,
                S = e.onChange,
                x = e.onToggleX,
                k = e.onToggleY,
                M = e.onHover,
                P = e.onHoverEnd,
                O = e.onMove,
                C = e.ignoreCheck,
                A = e.isNormalizer,
                I = e.onGestureStart,
                L = e.onGestureEnd,
                R = e.onWheel,
                z = e.onEnable,
                D = e.onDisable,
                F = e.onClick,
                $ = e.scrollSpeed,
                N = e.capture,
                j = e.allowClicks,
                V = e.lockAxis,
                B = e.onLockAxis;
              (this.target = i = ql(i) || gl),
                (this.vars = e),
                u && (u = pl.utils.toArray(u)),
                (t = t || 1e-9),
                (r = r || 0),
                (d = d || 1),
                ($ = $ || 1),
                (n = n || "wheel,touch,pointer"),
                (o = !1 !== o),
                s || (s = parseFloat(ml.getComputedStyle(yl).lineHeight) || 22);
              var q,
                U,
                H,
                W,
                G,
                Y,
                X,
                K = this,
                Q = 0,
                Z = 0,
                J = e.passive || !a,
                ee = Ul(i, Vl),
                te = Ul(i, Bl),
                re = ee(),
                ne = te(),
                ie =
                  ~n.indexOf("touch") &&
                  !~n.indexOf("pointer") &&
                  "pointerdown" === Sl[0],
                se = Rl(i),
                oe = i.ownerDocument || vl,
                ae = [0, 0, 0],
                le = [0, 0, 0],
                ce = 0,
                ue = function () {
                  return (ce = Al());
                },
                de = function (e, t) {
                  return (
                    ((K.event = e) && u && ~u.indexOf(e.target)) ||
                    (t && ie && "touch" !== e.pointerType) ||
                    (C && C(e, t))
                  );
                },
                he = function () {
                  var e = (K.deltaX = Gl(ae)),
                    r = (K.deltaY = Gl(le)),
                    n = Math.abs(e) >= t,
                    i = Math.abs(r) >= t;
                  S && (n || i) && S(K, e, r, ae, le),
                    n &&
                      (y && K.deltaX > 0 && y(K),
                      w && K.deltaX < 0 && w(K),
                      T && T(K),
                      x && K.deltaX < 0 != Q < 0 && x(K),
                      (Q = K.deltaX),
                      (ae[0] = ae[1] = ae[2] = 0)),
                    i &&
                      (_ && K.deltaY > 0 && _(K),
                      b && K.deltaY < 0 && b(K),
                      E && E(K),
                      k && K.deltaY < 0 != Z < 0 && k(K),
                      (Z = K.deltaY),
                      (le[0] = le[1] = le[2] = 0)),
                    (W || H) && (O && O(K), H && (m(K), (H = !1)), (W = !1)),
                    Y && !(Y = !1) && B && B(K),
                    G && (R(K), (G = !1)),
                    (q = 0);
                },
                pe = function (e, t, r) {
                  (ae[r] += e),
                    (le[r] += t),
                    K._vx.update(e),
                    K._vy.update(t),
                    o ? q || (q = requestAnimationFrame(he)) : he();
                },
                fe = function (e, t) {
                  V &&
                    !X &&
                    ((K.axis = X = Math.abs(e) > Math.abs(t) ? "x" : "y"),
                    (Y = !0)),
                    "y" !== X && ((ae[2] += e), K._vx.update(e, !0)),
                    "x" !== X && ((le[2] += t), K._vy.update(t, !0)),
                    o ? q || (q = requestAnimationFrame(he)) : he();
                },
                me = function (e) {
                  if (!de(e, 1)) {
                    var t = (e = Wl(e, a)).clientX,
                      n = e.clientY,
                      i = t - K.x,
                      s = n - K.y,
                      o = K.isDragging;
                    (K.x = t),
                      (K.y = n),
                      (o ||
                        Math.abs(K.startX - t) >= r ||
                        Math.abs(K.startY - n) >= r) &&
                        (m && (H = !0),
                        o || (K.isDragging = !0),
                        fe(i, s),
                        o || (p && p(K)));
                  }
                },
                ve = (K.onPress = function (e) {
                  de(e, 1) ||
                    (e && e.button) ||
                    ((K.axis = X = null),
                    U.pause(),
                    (K.isPressed = !0),
                    (e = Wl(e)),
                    (Q = Z = 0),
                    (K.startX = K.x = e.clientX),
                    (K.startY = K.y = e.clientY),
                    K._vx.reset(),
                    K._vy.reset(),
                    zl(A ? i : oe, Sl[1], me, J, !0),
                    (K.deltaX = K.deltaY = 0),
                    v && v(K));
                }),
                ge = (K.onRelease = function (e) {
                  if (!de(e, 1)) {
                    Dl(A ? i : oe, Sl[1], me, !0);
                    var t = !isNaN(K.y - K.startY),
                      r = K.isDragging,
                      n =
                        r &&
                        (Math.abs(K.x - K.startX) > 3 ||
                          Math.abs(K.y - K.startY) > 3),
                      s = Wl(e);
                    !n &&
                      t &&
                      (K._vx.reset(),
                      K._vy.reset(),
                      a &&
                        j &&
                        pl.delayedCall(0.08, function () {
                          if (Al() - ce > 300 && !e.defaultPrevented)
                            if (e.target.click) e.target.click();
                            else if (oe.createEvent) {
                              var t = oe.createEvent("MouseEvents");
                              t.initMouseEvent(
                                "click",
                                !0,
                                !0,
                                ml,
                                1,
                                s.screenX,
                                s.screenY,
                                s.clientX,
                                s.clientY,
                                !1,
                                !1,
                                !1,
                                !1,
                                0,
                                null
                              ),
                                e.target.dispatchEvent(t);
                            }
                        })),
                      (K.isDragging = K.isGesturing = K.isPressed = !1),
                      l && r && !A && U.restart(!0),
                      f && r && f(K),
                      g && g(K, n);
                  }
                }),
                ye = function (e) {
                  return (
                    e.touches &&
                    e.touches.length > 1 &&
                    (K.isGesturing = !0) &&
                    I(e, K.isDragging)
                  );
                },
                we = function () {
                  return (K.isGesturing = !1) || L(K);
                },
                be = function (e) {
                  if (!de(e)) {
                    var t = ee(),
                      r = te();
                    pe((t - re) * $, (r - ne) * $, 1),
                      (re = t),
                      (ne = r),
                      l && U.restart(!0);
                  }
                },
                _e = function (e) {
                  if (!de(e)) {
                    (e = Wl(e, a)), R && (G = !0);
                    var t =
                      (1 === e.deltaMode
                        ? s
                        : 2 === e.deltaMode
                        ? ml.innerHeight
                        : 1) * d;
                    pe(e.deltaX * t, e.deltaY * t, 0), l && !A && U.restart(!0);
                  }
                },
                Te = function (e) {
                  if (!de(e)) {
                    var t = e.clientX,
                      r = e.clientY,
                      n = t - K.x,
                      i = r - K.y;
                    (K.x = t),
                      (K.y = r),
                      (W = !0),
                      l && U.restart(!0),
                      (n || i) && fe(n, i);
                  }
                },
                Ee = function (e) {
                  (K.event = e), M(K);
                },
                Se = function (e) {
                  (K.event = e), P(K);
                },
                xe = function (e) {
                  return de(e) || (Wl(e, a) && F(K));
                };
              (U = K._dc =
                pl
                  .delayedCall(c || 0.25, function () {
                    K._vx.reset(), K._vy.reset(), U.pause(), l && l(K);
                  })
                  .pause()),
                (K.deltaX = K.deltaY = 0),
                (K._vx = Hl(0, 50, !0)),
                (K._vy = Hl(0, 50, !0)),
                (K.scrollX = ee),
                (K.scrollY = te),
                (K.isDragging = K.isGesturing = K.isPressed = !1),
                xl(this),
                (K.enable = function (e) {
                  return (
                    K.isEnabled ||
                      (zl(se ? oe : i, "scroll", Nl),
                      n.indexOf("scroll") >= 0 &&
                        zl(se ? oe : i, "scroll", be, J, N),
                      n.indexOf("wheel") >= 0 && zl(i, "wheel", _e, J, N),
                      ((n.indexOf("touch") >= 0 && wl) ||
                        n.indexOf("pointer") >= 0) &&
                        (zl(i, Sl[0], ve, J, N),
                        zl(oe, Sl[2], ge),
                        zl(oe, Sl[3], ge),
                        j && zl(i, "click", ue, !0, !0),
                        F && zl(i, "click", xe),
                        I && zl(oe, "gesturestart", ye),
                        L && zl(oe, "gestureend", we),
                        M && zl(i, bl + "enter", Ee),
                        P && zl(i, bl + "leave", Se),
                        O && zl(i, bl + "move", Te)),
                      (K.isEnabled = !0),
                      e && e.type && ve(e),
                      z && z(K)),
                    K
                  );
                }),
                (K.disable = function () {
                  K.isEnabled &&
                    (Pl.filter(function (e) {
                      return e !== K && Rl(e.target);
                    }).length || Dl(se ? oe : i, "scroll", Nl),
                    K.isPressed &&
                      (K._vx.reset(),
                      K._vy.reset(),
                      Dl(A ? i : oe, Sl[1], me, !0)),
                    Dl(se ? oe : i, "scroll", be, N),
                    Dl(i, "wheel", _e, N),
                    Dl(i, Sl[0], ve, N),
                    Dl(oe, Sl[2], ge),
                    Dl(oe, Sl[3], ge),
                    Dl(i, "click", ue, !0),
                    Dl(i, "click", xe),
                    Dl(oe, "gesturestart", ye),
                    Dl(oe, "gestureend", we),
                    Dl(i, bl + "enter", Ee),
                    Dl(i, bl + "leave", Se),
                    Dl(i, bl + "move", Te),
                    (K.isEnabled = K.isPressed = K.isDragging = !1),
                    D && D(K));
                }),
                (K.kill = K.revert =
                  function () {
                    K.disable();
                    var e = Pl.indexOf(K);
                    e >= 0 && Pl.splice(e, 1), El === K && (El = 0);
                  }),
                Pl.push(K),
                A && Rl(i) && (El = K),
                K.enable(h);
            }),
            (t = e),
            (r = [
              {
                key: "velocityX",
                get: function () {
                  return this._vx.getVelocity();
                },
              },
              {
                key: "velocityY",
                get: function () {
                  return this._vy.getVelocity();
                },
              },
            ]) && hl(t.prototype, r),
            n && hl(t, n),
            e
          );
        })();
        (Kl.version = "3.12.5"),
          (Kl.create = function (e) {
            return new Kl(e);
          }),
          (Kl.register = Xl),
          (Kl.getAll = function () {
            return Pl.slice();
          }),
          (Kl.getById = function (e) {
            return Pl.filter(function (t) {
              return t.vars.id === e;
            })[0];
          }),
          kl() && pl.registerPlugin(Kl);
        var Ql,
          Zl,
          Jl,
          ec,
          tc,
          rc,
          nc,
          ic,
          sc,
          oc,
          ac,
          lc,
          cc,
          uc,
          dc,
          hc,
          pc,
          fc,
          mc,
          vc,
          gc,
          yc,
          wc,
          bc,
          _c,
          Tc,
          Ec,
          Sc,
          xc,
          kc,
          Mc,
          Pc,
          Oc,
          Cc,
          Ac,
          Ic,
          Lc,
          Rc,
          zc = 1,
          Dc = Date.now,
          Fc = Dc(),
          $c = 0,
          Nc = 0,
          jc = function (e, t, r) {
            var n =
              eu(e) && ("clamp(" === e.substr(0, 6) || e.indexOf("max") > -1);
            return (r["_" + t + "Clamp"] = n), n ? e.substr(6, e.length - 7) : e;
          },
          Vc = function (e, t) {
            return !t || (eu(e) && "clamp(" === e.substr(0, 6))
              ? e
              : "clamp(" + e + ")";
          },
          Bc = function e() {
            return Nc && requestAnimationFrame(e);
          },
          qc = function () {
            return (uc = 1);
          },
          Uc = function () {
            return (uc = 0);
          },
          Hc = function (e) {
            return e;
          },
          Wc = function (e) {
            return Math.round(1e5 * e) / 1e5 || 0;
          },
          Gc = function () {
            return "undefined" != typeof window;
          },
          Yc = function () {
            return Ql || (Gc() && (Ql = window.gsap) && Ql.registerPlugin && Ql);
          },
          Xc = function (e) {
            return !!~nc.indexOf(e);
          },
          Kc = function (e) {
            return (
              ("Height" === e ? Mc : Jl["inner" + e]) ||
              tc["client" + e] ||
              rc["client" + e]
            );
          },
          Qc = function (e) {
            return (
              Ll(e, "getBoundingClientRect") ||
              (Xc(e)
                ? function () {
                    return (ud.width = Jl.innerWidth), (ud.height = Mc), ud;
                  }
                : function () {
                    return Eu(e);
                  })
            );
          },
          Zc = function (e, t) {
            var r = t.s,
              n = t.d2,
              i = t.d,
              s = t.a;
            return Math.max(
              0,
              (r = "scroll" + n) && (s = Ll(e, r))
                ? s() - Qc(e)()[i]
                : Xc(e)
                ? (tc[r] || rc[r]) - Kc(n)
                : e[r] - e["offset" + n]
            );
          },
          Jc = function (e, t) {
            for (var r = 0; r < mc.length; r += 3)
              (!t || ~t.indexOf(mc[r + 1])) && e(mc[r], mc[r + 1], mc[r + 2]);
          },
          eu = function (e) {
            return "string" == typeof e;
          },
          tu = function (e) {
            return "function" == typeof e;
          },
          ru = function (e) {
            return "number" == typeof e;
          },
          nu = function (e) {
            return "object" == typeof e;
          },
          iu = function (e, t, r) {
            return e && e.progress(t ? 0 : 1) && r && e.pause();
          },
          su = function (e, t) {
            if (e.enabled) {
              var r = e._ctx
                ? e._ctx.add(function () {
                    return t(e);
                  })
                : t(e);
              r && r.totalTime && (e.callbackAnimation = r);
            }
          },
          ou = Math.abs,
          au = "left",
          lu = "right",
          cu = "bottom",
          uu = "width",
          du = "height",
          hu = "Right",
          pu = "Left",
          fu = "Top",
          mu = "Bottom",
          vu = "padding",
          gu = "margin",
          yu = "Width",
          wu = "Height",
          bu = "px",
          _u = function (e) {
            return Jl.getComputedStyle(e);
          },
          Tu = function (e, t) {
            for (var r in t) r in e || (e[r] = t[r]);
            return e;
          },
          Eu = function (e, t) {
            var r =
                t &&
                "matrix(1, 0, 0, 1, 0, 0)" !== _u(e)[dc] &&
                Ql.to(e, {
                  x: 0,
                  y: 0,
                  xPercent: 0,
                  yPercent: 0,
                  rotation: 0,
                  rotationX: 0,
                  rotationY: 0,
                  scale: 1,
                  skewX: 0,
                  skewY: 0,
                }).progress(1),
              n = e.getBoundingClientRect();
            return r && r.progress(0).kill(), n;
          },
          Su = function (e, t) {
            var r = t.d2;
            return e["offset" + r] || e["client" + r] || 0;
          },
          xu = function (e) {
            var t,
              r = [],
              n = e.labels,
              i = e.duration();
            for (t in n) r.push(n[t] / i);
            return r;
          },
          ku = function (e) {
            var t = Ql.utils.snap(e),
              r =
                Array.isArray(e) &&
                e.slice(0).sort(function (e, t) {
                  return e - t;
                });
            return r
              ? function (e, n, i) {
                  var s;
                  if ((void 0 === i && (i = 0.001), !n)) return t(e);
                  if (n > 0) {
                    for (e -= i, s = 0; s < r.length; s++)
                      if (r[s] >= e) return r[s];
                    return r[s - 1];
                  }
                  for (s = r.length, e += i; s--; ) if (r[s] <= e) return r[s];
                  return r[0];
                }
              : function (r, n, i) {
                  void 0 === i && (i = 0.001);
                  var s = t(r);
                  return !n || Math.abs(s - r) < i || s - r < 0 == n < 0
                    ? s
                    : t(n < 0 ? r - e : r + e);
                };
          },
          Mu = function (e, t, r, n) {
            return r.split(",").forEach(function (r) {
              return e(t, r, n);
            });
          },
          Pu = function (e, t, r, n, i) {
            return e.addEventListener(t, r, { passive: !n, capture: !!i });
          },
          Ou = function (e, t, r, n) {
            return e.removeEventListener(t, r, !!n);
          },
          Cu = function (e, t, r) {
            (r = r && r.wheelHandler) && (e(t, "wheel", r), e(t, "touchmove", r));
          },
          Au = {
            startColor: "green",
            endColor: "red",
            indent: 0,
            fontSize: "16px",
            fontWeight: "normal",
          },
          Iu = { toggleActions: "play", anticipatePin: 0 },
          Lu = { top: 0, left: 0, center: 0.5, bottom: 1, right: 1 },
          Ru = function (e, t) {
            if (eu(e)) {
              var r = e.indexOf("="),
                n = ~r ? +(e.charAt(r - 1) + 1) * parseFloat(e.substr(r + 1)) : 0;
              ~r &&
                (e.indexOf("%") > r && (n *= t / 100), (e = e.substr(0, r - 1))),
                (e =
                  n +
                  (e in Lu
                    ? Lu[e] * t
                    : ~e.indexOf("%")
                    ? (parseFloat(e) * t) / 100
                    : parseFloat(e) || 0));
            }
            return e;
          },
          zu = function (e, t, r, n, i, s, o, a) {
            var l = i.startColor,
              c = i.endColor,
              u = i.fontSize,
              d = i.indent,
              h = i.fontWeight,
              p = ec.createElement("div"),
              f = Xc(r) || "fixed" === Ll(r, "pinType"),
              m = -1 !== e.indexOf("scroller"),
              v = f ? rc : r,
              g = -1 !== e.indexOf("start"),
              y = g ? l : c,
              w =
                "border-color:" +
                y +
                ";font-size:" +
                u +
                ";color:" +
                y +
                ";font-weight:" +
                h +
                ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
            return (
              (w += "position:" + ((m || a) && f ? "fixed;" : "absolute;")),
              (m || a || !f) &&
                (w += (n === Bl ? lu : cu) + ":" + (s + parseFloat(d)) + "px;"),
              o &&
                (w +=
                  "box-sizing:border-box;text-align:left;width:" +
                  o.offsetWidth +
                  "px;"),
              (p._isStart = g),
              p.setAttribute(
                "class",
                "gsap-marker-" + e + (t ? " marker-" + t : "")
              ),
              (p.style.cssText = w),
              (p.innerText = t || 0 === t ? e + "-" + t : e),
              v.children[0] ? v.insertBefore(p, v.children[0]) : v.appendChild(p),
              (p._offset = p["offset" + n.op.d2]),
              Du(p, 0, n, g),
              p
            );
          },
          Du = function (e, t, r, n) {
            var i = { display: "block" },
              s = r[n ? "os2" : "p2"],
              o = r[n ? "p2" : "os2"];
            (e._isFlipped = n),
              (i[r.a + "Percent"] = n ? -100 : 0),
              (i[r.a] = n ? "1px" : 0),
              (i["border" + s + yu] = 1),
              (i["border" + o + yu] = 0),
              (i[r.p] = t + "px"),
              Ql.set(e, i);
          },
          Fu = [],
          $u = {},
          Nu = function () {
            return Dc() - $c > 34 && (Ac || (Ac = requestAnimationFrame(nd)));
          },
          ju = function () {
            (!wc || !wc.isPressed || wc.startX > rc.clientWidth) &&
              (Ol.cache++,
              wc ? Ac || (Ac = requestAnimationFrame(nd)) : nd(),
              $c || Wu("scrollStart"),
              ($c = Dc()));
          },
          Vu = function () {
            (Tc = Jl.innerWidth), (_c = Jl.innerHeight);
          },
          Bu = function () {
            Ol.cache++,
              !cc &&
                !yc &&
                !ec.fullscreenElement &&
                !ec.webkitFullscreenElement &&
                (!bc ||
                  Tc !== Jl.innerWidth ||
                  Math.abs(Jl.innerHeight - _c) > 0.25 * Jl.innerHeight) &&
                ic.restart(!0);
          },
          qu = {},
          Uu = [],
          Hu = function e() {
            return Ou(gd, "scrollEnd", e) || ed(!0);
          },
          Wu = function (e) {
            return (
              (qu[e] &&
                qu[e].map(function (e) {
                  return e();
                })) ||
              Uu
            );
          },
          Gu = [],
          Yu = function (e) {
            for (var t = 0; t < Gu.length; t += 5)
              (!e || (Gu[t + 4] && Gu[t + 4].query === e)) &&
                ((Gu[t].style.cssText = Gu[t + 1]),
                Gu[t].getBBox && Gu[t].setAttribute("transform", Gu[t + 2] || ""),
                (Gu[t + 3].uncache = 1));
          },
          Xu = function (e, t) {
            var r;
            for (hc = 0; hc < Fu.length; hc++)
              !(r = Fu[hc]) ||
                (t && r._ctx !== t) ||
                (e ? r.kill(1) : r.revert(!0, !0));
            (Pc = !0), t && Yu(t), t || Wu("revert");
          },
          Ku = function (e, t) {
            Ol.cache++,
              (t || !Ic) &&
                Ol.forEach(function (e) {
                  return tu(e) && e.cacheID++ && (e.rec = 0);
                }),
              eu(e) && (Jl.history.scrollRestoration = xc = e);
          },
          Qu = 0,
          Zu = function () {
            rc.appendChild(kc),
              (Mc = (!wc && kc.offsetHeight) || Jl.innerHeight),
              rc.removeChild(kc);
          },
          Ju = function (e) {
            return sc(
              ".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end"
            ).forEach(function (t) {
              return (t.style.display = e ? "none" : "block");
            });
          },
          ed = function (e, t) {
            if (!$c || e || Pc) {
              Zu(),
                (Ic = gd.isRefreshing = !0),
                Ol.forEach(function (e) {
                  return tu(e) && ++e.cacheID && (e.rec = e());
                });
              var r = Wu("refreshInit");
              vc && gd.sort(),
                t || Xu(),
                Ol.forEach(function (e) {
                  tu(e) &&
                    (e.smooth && (e.target.style.scrollBehavior = "auto"), e(0));
                }),
                Fu.slice(0).forEach(function (e) {
                  return e.refresh();
                }),
                (Pc = !1),
                Fu.forEach(function (e) {
                  if (e._subPinOffset && e.pin) {
                    var t = e.vars.horizontal ? "offsetWidth" : "offsetHeight",
                      r = e.pin[t];
                    e.revert(!0, 1),
                      e.adjustPinSpacing(e.pin[t] - r),
                      e.refresh();
                  }
                }),
                (Oc = 1),
                Ju(!0),
                Fu.forEach(function (e) {
                  var t = Zc(e.scroller, e._dir),
                    r = "max" === e.vars.end || (e._endClamp && e.end > t),
                    n = e._startClamp && e.start >= t;
                  (r || n) &&
                    e.setPositions(
                      n ? t - 1 : e.start,
                      r ? Math.max(n ? t : e.start + 1, t) : e.end,
                      !0
                    );
                }),
                Ju(!1),
                (Oc = 0),
                r.forEach(function (e) {
                  return e && e.render && e.render(-1);
                }),
                Ol.forEach(function (e) {
                  tu(e) &&
                    (e.smooth &&
                      requestAnimationFrame(function () {
                        return (e.target.style.scrollBehavior = "smooth");
                      }),
                    e.rec && e(e.rec));
                }),
                Ku(xc, 1),
                ic.pause(),
                Qu++,
                (Ic = 2),
                nd(2),
                Fu.forEach(function (e) {
                  return tu(e.vars.onRefresh) && e.vars.onRefresh(e);
                }),
                (Ic = gd.isRefreshing = !1),
                Wu("refresh");
            } else Pu(gd, "scrollEnd", Hu);
          },
          td = 0,
          rd = 1,
          nd = function (e) {
            if (2 === e || (!Ic && !Pc)) {
              (gd.isUpdating = !0), Rc && Rc.update(0);
              var t = Fu.length,
                r = Dc(),
                n = r - Fc >= 50,
                i = t && Fu[0].scroll();
              if (
                ((rd = td > i ? -1 : 1),
                Ic || (td = i),
                n &&
                  ($c && !uc && r - $c > 200 && (($c = 0), Wu("scrollEnd")),
                  (ac = Fc),
                  (Fc = r)),
                rd < 0)
              ) {
                for (hc = t; hc-- > 0; ) Fu[hc] && Fu[hc].update(0, n);
                rd = 1;
              } else for (hc = 0; hc < t; hc++) Fu[hc] && Fu[hc].update(0, n);
              gd.isUpdating = !1;
            }
            Ac = 0;
          },
          id = [
            au,
            "top",
            cu,
            lu,
            gu + mu,
            gu + hu,
            gu + fu,
            gu + pu,
            "display",
            "flexShrink",
            "float",
            "zIndex",
            "gridColumnStart",
            "gridColumnEnd",
            "gridRowStart",
            "gridRowEnd",
            "gridArea",
            "justifySelf",
            "alignSelf",
            "placeSelf",
            "order",
          ],
          sd = id.concat([
            uu,
            du,
            "boxSizing",
            "max" + yu,
            "max" + wu,
            "position",
            gu,
            vu,
            vu + fu,
            vu + hu,
            vu + mu,
            vu + pu,
          ]),
          od = function (e, t, r, n) {
            if (!e._gsap.swappedIn) {
              for (var i, s = id.length, o = t.style, a = e.style; s--; )
                o[(i = id[s])] = r[i];
              (o.position = "absolute" === r.position ? "absolute" : "relative"),
                "inline" === r.display && (o.display = "inline-block"),
                (a[cu] = a[lu] = "auto"),
                (o.flexBasis = r.flexBasis || "auto"),
                (o.overflow = "visible"),
                (o.boxSizing = "border-box"),
                (o[uu] = Su(e, Vl) + bu),
                (o[du] = Su(e, Bl) + bu),
                (o[vu] = a[gu] = a.top = a[au] = "0"),
                ld(n),
                (a[uu] = a["max" + yu] = r[uu]),
                (a[du] = a["max" + wu] = r[du]),
                (a[vu] = r[vu]),
                e.parentNode !== t &&
                  (e.parentNode.insertBefore(t, e), t.appendChild(e)),
                (e._gsap.swappedIn = !0);
            }
          },
          ad = /([A-Z])/g,
          ld = function (e) {
            if (e) {
              var t,
                r,
                n = e.t.style,
                i = e.length,
                s = 0;
              for (
                (e.t._gsap || Ql.core.getCache(e.t)).uncache = 1;
                s < i;
                s += 2
              )
                (r = e[s + 1]),
                  (t = e[s]),
                  r
                    ? (n[t] = r)
                    : n[t] &&
                      n.removeProperty(t.replace(ad, "-$1").toLowerCase());
            }
          },
          cd = function (e) {
            for (var t = sd.length, r = e.style, n = [], i = 0; i < t; i++)
              n.push(sd[i], r[sd[i]]);
            return (n.t = e), n;
          },
          ud = { left: 0, top: 0 },
          dd = function (e, t, r, n, i, s, o, a, l, c, u, d, h, p) {
            tu(e) && (e = e(a)),
              eu(e) &&
                "max" === e.substr(0, 3) &&
                (e = d + ("=" === e.charAt(4) ? Ru("0" + e.substr(3), r) : 0));
            var f,
              m,
              v,
              g = h ? h.time() : 0;
            if ((h && h.seek(0), isNaN(e) || (e = +e), ru(e)))
              h &&
                (e = Ql.utils.mapRange(
                  h.scrollTrigger.start,
                  h.scrollTrigger.end,
                  0,
                  d,
                  e
                )),
                o && Du(o, r, n, !0);
            else {
              tu(t) && (t = t(a));
              var y,
                w,
                b,
                _,
                T = (e || "0").split(" ");
              (v = ql(t, a) || rc),
                ((y = Eu(v) || {}) && (y.left || y.top)) ||
                  "none" !== _u(v).display ||
                  ((_ = v.style.display),
                  (v.style.display = "block"),
                  (y = Eu(v)),
                  _ ? (v.style.display = _) : v.style.removeProperty("display")),
                (w = Ru(T[0], y[n.d])),
                (b = Ru(T[1] || "0", r)),
                (e = y[n.p] - l[n.p] - c + w + i - b),
                o && Du(o, b, n, r - b < 20 || (o._isStart && b > 20)),
                (r -= r - b);
            }
            if ((p && ((a[p] = e || -0.001), e < 0 && (e = 0)), s)) {
              var E = e + r,
                S = s._isStart;
              (f = "scroll" + n.d2),
                Du(
                  s,
                  E,
                  n,
                  (S && E > 20) ||
                    (!S &&
                      (u ? Math.max(rc[f], tc[f]) : s.parentNode[f]) <= E + 1)
                ),
                u &&
                  ((l = Eu(o)),
                  u && (s.style[n.op.p] = l[n.op.p] - n.op.m - s._offset + bu));
            }
            return (
              h &&
                v &&
                ((f = Eu(v)),
                h.seek(d),
                (m = Eu(v)),
                (h._caScrollDist = f[n.p] - m[n.p]),
                (e = (e / h._caScrollDist) * d)),
              h && h.seek(g),
              h ? e : Math.round(e)
            );
          },
          hd = /(webkit|moz|length|cssText|inset)/i,
          pd = function (e, t, r, n) {
            if (e.parentNode !== t) {
              var i,
                s,
                o = e.style;
              if (t === rc) {
                for (i in ((e._stOrig = o.cssText), (s = _u(e))))
                  +i ||
                    hd.test(i) ||
                    !s[i] ||
                    "string" != typeof o[i] ||
                    "0" === i ||
                    (o[i] = s[i]);
                (o.top = r), (o.left = n);
              } else o.cssText = e._stOrig;
              (Ql.core.getCache(e).uncache = 1), t.appendChild(e);
            }
          },
          fd = function (e, t, r) {
            var n = t,
              i = n;
            return function (t) {
              var s = Math.round(e());
              return (
                s !== n &&
                  s !== i &&
                  Math.abs(s - n) > 3 &&
                  Math.abs(s - i) > 3 &&
                  ((t = s), r && r()),
                (i = n),
                (n = t),
                t
              );
            };
          },
          md = function (e, t, r) {
            var n = {};
            (n[t.p] = "+=" + r), Ql.set(e, n);
          },
          vd = function (e, t) {
            var r = Ul(e, t),
              n = "_scroll" + t.p2,
              i = function t(i, s, o, a, l) {
                var c = t.tween,
                  u = s.onComplete,
                  d = {};
                o = o || r();
                var h = fd(r, o, function () {
                  c.kill(), (t.tween = 0);
                });
                return (
                  (l = (a && l) || 0),
                  (a = a || i - o),
                  c && c.kill(),
                  (s[n] = i),
                  (s.inherit = !1),
                  (s.modifiers = d),
                  (d[n] = function () {
                    return h(o + a * c.ratio + l * c.ratio * c.ratio);
                  }),
                  (s.onUpdate = function () {
                    Ol.cache++, t.tween && nd();
                  }),
                  (s.onComplete = function () {
                    (t.tween = 0), u && u.call(c);
                  }),
                  (c = t.tween = Ql.to(e, s))
                );
              };
            return (
              (e[n] = r),
              (r.wheelHandler = function () {
                return i.tween && i.tween.kill() && (i.tween = 0);
              }),
              Pu(e, "wheel", r.wheelHandler),
              gd.isTouch && Pu(e, "touchmove", r.wheelHandler),
              i
            );
          },
          gd = (function () {
            function e(t, r) {
              Zl ||
                e.register(Ql) ||
                console.warn("Please gsap.registerPlugin(ScrollTrigger)"),
                Sc(this),
                this.init(t, r);
            }
            return (
              (e.prototype.init = function (t, r) {
                if (
                  ((this.progress = this.start = 0),
                  this.vars && this.kill(!0, !0),
                  Nc)
                ) {
                  var n,
                    i,
                    s,
                    o,
                    a,
                    l,
                    c,
                    u,
                    d,
                    h,
                    p,
                    f,
                    m,
                    v,
                    g,
                    y,
                    w,
                    b,
                    _,
                    T,
                    E,
                    S,
                    x,
                    k,
                    M,
                    P,
                    O,
                    C,
                    A,
                    I,
                    L,
                    R,
                    z,
                    D,
                    F,
                    $,
                    N,
                    j,
                    V,
                    B,
                    q,
                    U,
                    H = (t = Tu(
                      eu(t) || ru(t) || t.nodeType ? { trigger: t } : t,
                      Iu
                    )),
                    W = H.onUpdate,
                    G = H.toggleClass,
                    Y = H.id,
                    X = H.onToggle,
                    K = H.onRefresh,
                    Q = H.scrub,
                    Z = H.trigger,
                    J = H.pin,
                    ee = H.pinSpacing,
                    te = H.invalidateOnRefresh,
                    re = H.anticipatePin,
                    ne = H.onScrubComplete,
                    ie = H.onSnapComplete,
                    se = H.once,
                    oe = H.snap,
                    ae = H.pinReparent,
                    le = H.pinSpacer,
                    ce = H.containerAnimation,
                    ue = H.fastScrollEnd,
                    de = H.preventOverlaps,
                    he =
                      t.horizontal ||
                      (t.containerAnimation && !1 !== t.horizontal)
                        ? Vl
                        : Bl,
                    pe = !Q && 0 !== Q,
                    fe = ql(t.scroller || Jl),
                    me = Ql.core.getCache(fe),
                    ve = Xc(fe),
                    ge =
                      "fixed" ===
                      ("pinType" in t
                        ? t.pinType
                        : Ll(fe, "pinType") || (ve && "fixed")),
                    ye = [t.onEnter, t.onLeave, t.onEnterBack, t.onLeaveBack],
                    we = pe && t.toggleActions.split(" "),
                    be = "markers" in t ? t.markers : Iu.markers,
                    _e = ve ? 0 : parseFloat(_u(fe)["border" + he.p2 + yu]) || 0,
                    Te = this,
                    Ee =
                      t.onRefreshInit &&
                      function () {
                        return t.onRefreshInit(Te);
                      },
                    Se = (function (e, t, r) {
                      var n = r.d,
                        i = r.d2,
                        s = r.a;
                      return (s = Ll(e, "getBoundingClientRect"))
                        ? function () {
                            return s()[n];
                          }
                        : function () {
                            return (t ? Kc(i) : e["client" + i]) || 0;
                          };
                    })(fe, ve, he),
                    xe = (function (e, t) {
                      return !t || ~Cl.indexOf(e)
                        ? Qc(e)
                        : function () {
                            return ud;
                          };
                    })(fe, ve),
                    ke = 0,
                    Me = 0,
                    Pe = 0,
                    Oe = Ul(fe, he);
                  if (
                    ((Te._startClamp = Te._endClamp = !1),
                    (Te._dir = he),
                    (re *= 45),
                    (Te.scroller = fe),
                    (Te.scroll = ce ? ce.time.bind(ce) : Oe),
                    (o = Oe()),
                    (Te.vars = t),
                    (r = r || t.animation),
                    "refreshPriority" in t &&
                      ((vc = 1), -9999 === t.refreshPriority && (Rc = Te)),
                    (me.tweenScroll = me.tweenScroll || {
                      top: vd(fe, Bl),
                      left: vd(fe, Vl),
                    }),
                    (Te.tweenTo = n = me.tweenScroll[he.p]),
                    (Te.scrubDuration = function (e) {
                      (z = ru(e) && e)
                        ? R
                          ? R.duration(e)
                          : (R = Ql.to(r, {
                              ease: "expo",
                              totalProgress: "+=0",
                              inherit: !1,
                              duration: z,
                              paused: !0,
                              onComplete: function () {
                                return ne && ne(Te);
                              },
                            }))
                        : (R && R.progress(1).kill(), (R = 0));
                    }),
                    r &&
                      ((r.vars.lazy = !1),
                      (r._initted && !Te.isReverted) ||
                        (!1 !== r.vars.immediateRender &&
                          !1 !== t.immediateRender &&
                          r.duration() &&
                          r.render(0, !0, !0)),
                      (Te.animation = r.pause()),
                      (r.scrollTrigger = Te),
                      Te.scrubDuration(Q),
                      (I = 0),
                      Y || (Y = r.vars.id)),
                    oe &&
                      ((nu(oe) && !oe.push) || (oe = { snapTo: oe }),
                      "scrollBehavior" in rc.style &&
                        Ql.set(ve ? [rc, tc] : fe, { scrollBehavior: "auto" }),
                      Ol.forEach(function (e) {
                        return (
                          tu(e) &&
                          e.target === (ve ? ec.scrollingElement || tc : fe) &&
                          (e.smooth = !1)
                        );
                      }),
                      (s = tu(oe.snapTo)
                        ? oe.snapTo
                        : "labels" === oe.snapTo
                        ? (function (e) {
                            return function (t) {
                              return Ql.utils.snap(xu(e), t);
                            };
                          })(r)
                        : "labelsDirectional" === oe.snapTo
                        ? ((B = r),
                          function (e, t) {
                            return ku(xu(B))(e, t.direction);
                          })
                        : !1 !== oe.directional
                        ? function (e, t) {
                            return ku(oe.snapTo)(
                              e,
                              Dc() - Me < 500 ? 0 : t.direction
                            );
                          }
                        : Ql.utils.snap(oe.snapTo)),
                      (D = oe.duration || { min: 0.1, max: 2 }),
                      (D = nu(D) ? oc(D.min, D.max) : oc(D, D)),
                      (F = Ql.delayedCall(oe.delay || z / 2 || 0.1, function () {
                        var e = Oe(),
                          t = Dc() - Me < 500,
                          i = n.tween;
                        if (
                          !(t || Math.abs(Te.getVelocity()) < 10) ||
                          i ||
                          uc ||
                          ke === e
                        )
                          Te.isActive && ke !== e && F.restart(!0);
                        else {
                          var o,
                            a,
                            u = (e - l) / v,
                            d = r && !pe ? r.totalProgress() : u,
                            h = t ? 0 : ((d - L) / (Dc() - ac)) * 1e3 || 0,
                            p = Ql.utils.clamp(
                              -u,
                              1 - u,
                              (ou(h / 2) * h) / 0.185
                            ),
                            f = u + (!1 === oe.inertia ? 0 : p),
                            m = oe,
                            g = m.onStart,
                            y = m.onInterrupt,
                            w = m.onComplete;
                          if (
                            ((o = s(f, Te)),
                            ru(o) || (o = f),
                            (a = Math.round(l + o * v)),
                            e <= c && e >= l && a !== e)
                          ) {
                            if (i && !i._initted && i.data <= ou(a - e)) return;
                            !1 === oe.inertia && (p = o - u),
                              n(
                                a,
                                {
                                  duration: D(
                                    ou(
                                      (0.185 * Math.max(ou(f - d), ou(o - d))) /
                                        h /
                                        0.05 || 0
                                    )
                                  ),
                                  ease: oe.ease || "power3",
                                  data: ou(a - e),
                                  onInterrupt: function () {
                                    return F.restart(!0) && y && y(Te);
                                  },
                                  onComplete: function () {
                                    Te.update(),
                                      (ke = Oe()),
                                      r &&
                                        (R
                                          ? R.resetTo(
                                              "totalProgress",
                                              o,
                                              r._tTime / r._tDur
                                            )
                                          : r.progress(o)),
                                      (I = L =
                                        r && !pe
                                          ? r.totalProgress()
                                          : Te.progress),
                                      ie && ie(Te),
                                      w && w(Te);
                                  },
                                },
                                e,
                                p * v,
                                a - e - p * v
                              ),
                              g && g(Te, n.tween);
                          }
                        }
                      }).pause())),
                    Y && ($u[Y] = Te),
                    (V =
                      (Z = Te.trigger = ql(Z || (!0 !== J && J))) &&
                      Z._gsap &&
                      Z._gsap.stRevert) && (V = V(Te)),
                    (J = !0 === J ? Z : ql(J)),
                    eu(G) && (G = { targets: Z, className: G }),
                    J &&
                      (!1 === ee ||
                        ee === gu ||
                        (ee =
                          !(
                            !ee &&
                            J.parentNode &&
                            J.parentNode.style &&
                            "flex" === _u(J.parentNode).display
                          ) && vu),
                      (Te.pin = J),
                      (i = Ql.core.getCache(J)).spacer
                        ? (g = i.pinState)
                        : (le &&
                            ((le = ql(le)) &&
                              !le.nodeType &&
                              (le = le.current || le.nativeElement),
                            (i.spacerIsNative = !!le),
                            le && (i.spacerState = cd(le))),
                          (i.spacer = b = le || ec.createElement("div")),
                          b.classList.add("pin-spacer"),
                          Y && b.classList.add("pin-spacer-" + Y),
                          (i.pinState = g = cd(J))),
                      !1 !== t.force3D && Ql.set(J, { force3D: !0 }),
                      (Te.spacer = b = i.spacer),
                      (A = _u(J)),
                      (k = A[ee + he.os2]),
                      (T = Ql.getProperty(J)),
                      (E = Ql.quickSetter(J, he.a, bu)),
                      od(J, b, A),
                      (w = cd(J))),
                    be)
                  ) {
                    (f = nu(be) ? Tu(be, Au) : Au),
                      (h = zu("scroller-start", Y, fe, he, f, 0)),
                      (p = zu("scroller-end", Y, fe, he, f, 0, h)),
                      (_ = h["offset" + he.op.d2]);
                    var Ce = ql(Ll(fe, "content") || fe);
                    (u = this.markerStart = zu("start", Y, Ce, he, f, _, 0, ce)),
                      (d = this.markerEnd = zu("end", Y, Ce, he, f, _, 0, ce)),
                      ce && (j = Ql.quickSetter([u, d], he.a, bu)),
                      ge ||
                        (Cl.length && !0 === Ll(fe, "fixedMarkers")) ||
                        ((U = _u((q = ve ? rc : fe)).position),
                        (q.style.position =
                          "absolute" === U || "fixed" === U ? U : "relative"),
                        Ql.set([h, p], { force3D: !0 }),
                        (P = Ql.quickSetter(h, he.a, bu)),
                        (C = Ql.quickSetter(p, he.a, bu)));
                  }
                  if (ce) {
                    var Ae = ce.vars.onUpdate,
                      Ie = ce.vars.onUpdateParams;
                    ce.eventCallback("onUpdate", function () {
                      Te.update(0, 0, 1), Ae && Ae.apply(ce, Ie || []);
                    });
                  }
                  if (
                    ((Te.previous = function () {
                      return Fu[Fu.indexOf(Te) - 1];
                    }),
                    (Te.next = function () {
                      return Fu[Fu.indexOf(Te) + 1];
                    }),
                    (Te.revert = function (e, t) {
                      if (!t) return Te.kill(!0);
                      var n = !1 !== e || !Te.enabled,
                        i = cc;
                      n !== Te.isReverted &&
                        (n &&
                          (($ = Math.max(Oe(), Te.scroll.rec || 0)),
                          (Pe = Te.progress),
                          (N = r && r.progress())),
                        u &&
                          [u, d, h, p].forEach(function (e) {
                            return (e.style.display = n ? "none" : "block");
                          }),
                        n && ((cc = Te), Te.update(n)),
                        !J ||
                          (ae && Te.isActive) ||
                          (n
                            ? (function (e, t, r) {
                                ld(r);
                                var n = e._gsap;
                                if (n.spacerIsNative) ld(n.spacerState);
                                else if (e._gsap.swappedIn) {
                                  var i = t.parentNode;
                                  i && (i.insertBefore(e, t), i.removeChild(t));
                                }
                                e._gsap.swappedIn = !1;
                              })(J, b, g)
                            : od(J, b, _u(J), M)),
                        n || Te.update(n),
                        (cc = i),
                        (Te.isReverted = n));
                    }),
                    (Te.refresh = function (i, s, f, _) {
                      if ((!cc && Te.enabled) || s)
                        if (J && i && $c) Pu(e, "scrollEnd", Hu);
                        else {
                          !Ic && Ee && Ee(Te),
                            (cc = Te),
                            n.tween && !f && (n.tween.kill(), (n.tween = 0)),
                            R && R.pause(),
                            te && r && r.revert({ kill: !1 }).invalidate(),
                            Te.isReverted || Te.revert(!0, !0),
                            (Te._subPinOffset = !1);
                          var E,
                            k,
                            P,
                            C,
                            A,
                            I,
                            L,
                            z,
                            D,
                            j,
                            V,
                            B,
                            q,
                            U = Se(),
                            H = xe(),
                            W = ce ? ce.duration() : Zc(fe, he),
                            G = v <= 0.01,
                            Y = 0,
                            X = _ || 0,
                            Q = nu(f) ? f.end : t.end,
                            re = t.endTrigger || Z,
                            ne = nu(f)
                              ? f.start
                              : t.start ||
                                (0 !== t.start && Z ? (J ? "0 0" : "0 100%") : 0),
                            ie = (Te.pinnedContainer =
                              t.pinnedContainer && ql(t.pinnedContainer, Te)),
                            se = (Z && Math.max(0, Fu.indexOf(Te))) || 0,
                            oe = se;
                          for (
                            be &&
                            nu(f) &&
                            ((B = Ql.getProperty(h, he.p)),
                            (q = Ql.getProperty(p, he.p)));
                            oe--;
  
                          )
                            (I = Fu[oe]).end || I.refresh(0, 1) || (cc = Te),
                              !(L = I.pin) ||
                                (L !== Z && L !== J && L !== ie) ||
                                I.isReverted ||
                                (j || (j = []), j.unshift(I), I.revert(!0, !0)),
                              I !== Fu[oe] && (se--, oe--);
                          for (
                            tu(ne) && (ne = ne(Te)),
                              ne = jc(ne, "start", Te),
                              l =
                                dd(
                                  ne,
                                  Z,
                                  U,
                                  he,
                                  Oe(),
                                  u,
                                  h,
                                  Te,
                                  H,
                                  _e,
                                  ge,
                                  W,
                                  ce,
                                  Te._startClamp && "_startClamp"
                                ) || (J ? -0.001 : 0),
                              tu(Q) && (Q = Q(Te)),
                              eu(Q) &&
                                !Q.indexOf("+=") &&
                                (~Q.indexOf(" ")
                                  ? (Q = (eu(ne) ? ne.split(" ")[0] : "") + Q)
                                  : ((Y = Ru(Q.substr(2), U)),
                                    (Q = eu(ne)
                                      ? ne
                                      : (ce
                                          ? Ql.utils.mapRange(
                                              0,
                                              ce.duration(),
                                              ce.scrollTrigger.start,
                                              ce.scrollTrigger.end,
                                              l
                                            )
                                          : l) + Y),
                                    (re = Z))),
                              Q = jc(Q, "end", Te),
                              c =
                                Math.max(
                                  l,
                                  dd(
                                    Q || (re ? "100% 0" : W),
                                    re,
                                    U,
                                    he,
                                    Oe() + Y,
                                    d,
                                    p,
                                    Te,
                                    H,
                                    _e,
                                    ge,
                                    W,
                                    ce,
                                    Te._endClamp && "_endClamp"
                                  )
                                ) || -0.001,
                              Y = 0,
                              oe = se;
                            oe--;
  
                          )
                            (L = (I = Fu[oe]).pin) &&
                              I.start - I._pinPush <= l &&
                              !ce &&
                              I.end > 0 &&
                              ((E =
                                I.end -
                                (Te._startClamp
                                  ? Math.max(0, I.start)
                                  : I.start)),
                              ((L === Z && I.start - I._pinPush < l) ||
                                L === ie) &&
                                isNaN(ne) &&
                                (Y += E * (1 - I.progress)),
                              L === J && (X += E));
                          if (
                            ((l += Y),
                            (c += Y),
                            Te._startClamp && (Te._startClamp += Y),
                            Te._endClamp &&
                              !Ic &&
                              ((Te._endClamp = c || -0.001),
                              (c = Math.min(c, Zc(fe, he)))),
                            (v = c - l || ((l -= 0.01) && 0.001)),
                            G &&
                              (Pe = Ql.utils.clamp(
                                0,
                                1,
                                Ql.utils.normalize(l, c, $)
                              )),
                            (Te._pinPush = X),
                            u &&
                              Y &&
                              (((E = {})[he.a] = "+=" + Y),
                              ie && (E[he.p] = "-=" + Oe()),
                              Ql.set([u, d], E)),
                            !J || (Oc && Te.end >= Zc(fe, he)))
                          ) {
                            if (Z && Oe() && !ce)
                              for (k = Z.parentNode; k && k !== rc; )
                                k._pinOffset &&
                                  ((l -= k._pinOffset), (c -= k._pinOffset)),
                                  (k = k.parentNode);
                          } else
                            (E = _u(J)),
                              (C = he === Bl),
                              (P = Oe()),
                              (S = parseFloat(T(he.a)) + X),
                              !W &&
                                c > 1 &&
                                ((V = {
                                  style: (V = (
                                    ve ? ec.scrollingElement || tc : fe
                                  ).style),
                                  value: V["overflow" + he.a.toUpperCase()],
                                }),
                                ve &&
                                  "scroll" !==
                                    _u(rc)["overflow" + he.a.toUpperCase()] &&
                                  (V.style["overflow" + he.a.toUpperCase()] =
                                    "scroll")),
                              od(J, b, E),
                              (w = cd(J)),
                              (k = Eu(J, !0)),
                              (z = ge && Ul(fe, C ? Vl : Bl)()),
                              ee
                                ? (((M = [ee + he.os2, v + X + bu]).t = b),
                                  (oe = ee === vu ? Su(J, he) + v + X : 0) &&
                                    (M.push(he.d, oe + bu),
                                    "auto" !== b.style.flexBasis &&
                                      (b.style.flexBasis = oe + bu)),
                                  ld(M),
                                  ie &&
                                    Fu.forEach(function (e) {
                                      e.pin === ie &&
                                        !1 !== e.vars.pinSpacing &&
                                        (e._subPinOffset = !0);
                                    }),
                                  ge && Oe($))
                                : (oe = Su(J, he)) &&
                                  "auto" !== b.style.flexBasis &&
                                  (b.style.flexBasis = oe + bu),
                              ge &&
                                (((A = {
                                  top: k.top + (C ? P - l : z) + bu,
                                  left: k.left + (C ? z : P - l) + bu,
                                  boxSizing: "border-box",
                                  position: "fixed",
                                })[uu] = A["max" + yu] =
                                  Math.ceil(k.width) + bu),
                                (A[du] = A["max" + wu] =
                                  Math.ceil(k.height) + bu),
                                (A[gu] =
                                  A[gu + fu] =
                                  A[gu + hu] =
                                  A[gu + mu] =
                                  A[gu + pu] =
                                    "0"),
                                (A[vu] = E[vu]),
                                (A[vu + fu] = E[vu + fu]),
                                (A[vu + hu] = E[vu + hu]),
                                (A[vu + mu] = E[vu + mu]),
                                (A[vu + pu] = E[vu + pu]),
                                (y = (function (e, t, r) {
                                  for (
                                    var n, i = [], s = e.length, o = r ? 8 : 0;
                                    o < s;
                                    o += 2
                                  )
                                    (n = e[o]),
                                      i.push(n, n in t ? t[n] : e[o + 1]);
                                  return (i.t = e.t), i;
                                })(g, A, ae)),
                                Ic && Oe(0)),
                              r
                                ? ((D = r._initted),
                                  gc(1),
                                  r.render(r.duration(), !0, !0),
                                  (x = T(he.a) - S + v + X),
                                  (O = Math.abs(v - x) > 1),
                                  ge && O && y.splice(y.length - 2, 2),
                                  r.render(0, !0, !0),
                                  D || r.invalidate(!0),
                                  r.parent || r.totalTime(r.totalTime()),
                                  gc(0))
                                : (x = v),
                              V &&
                                (V.value
                                  ? (V.style["overflow" + he.a.toUpperCase()] =
                                      V.value)
                                  : V.style.removeProperty("overflow-" + he.a));
                          j &&
                            j.forEach(function (e) {
                              return e.revert(!1, !0);
                            }),
                            (Te.start = l),
                            (Te.end = c),
                            (o = a = Ic ? $ : Oe()),
                            ce || Ic || (o < $ && Oe($), (Te.scroll.rec = 0)),
                            Te.revert(!1, !0),
                            (Me = Dc()),
                            F && ((ke = -1), F.restart(!0)),
                            (cc = 0),
                            r &&
                              pe &&
                              (r._initted || N) &&
                              r.progress() !== N &&
                              r.progress(N || 0, !0).render(r.time(), !0, !0),
                            (G || Pe !== Te.progress || ce || te) &&
                              (r &&
                                !pe &&
                                r.totalProgress(
                                  ce && l < -0.001 && !Pe
                                    ? Ql.utils.normalize(l, c, 0)
                                    : Pe,
                                  !0
                                ),
                              (Te.progress = G || (o - l) / v === Pe ? 0 : Pe)),
                            J &&
                              ee &&
                              (b._pinOffset = Math.round(Te.progress * x)),
                            R && R.invalidate(),
                            isNaN(B) ||
                              ((B -= Ql.getProperty(h, he.p)),
                              (q -= Ql.getProperty(p, he.p)),
                              md(h, he, B),
                              md(u, he, B - (_ || 0)),
                              md(p, he, q),
                              md(d, he, q - (_ || 0))),
                            G && !Ic && Te.update(),
                            !K || Ic || m || ((m = !0), K(Te), (m = !1));
                        }
                    }),
                    (Te.getVelocity = function () {
                      return ((Oe() - a) / (Dc() - ac)) * 1e3 || 0;
                    }),
                    (Te.endAnimation = function () {
                      iu(Te.callbackAnimation),
                        r &&
                          (R
                            ? R.progress(1)
                            : r.paused()
                            ? pe || iu(r, Te.direction < 0, 1)
                            : iu(r, r.reversed()));
                    }),
                    (Te.labelToScroll = function (e) {
                      return (
                        (r &&
                          r.labels &&
                          (l || Te.refresh() || l) +
                            (r.labels[e] / r.duration()) * v) ||
                        0
                      );
                    }),
                    (Te.getTrailing = function (e) {
                      var t = Fu.indexOf(Te),
                        r =
                          Te.direction > 0
                            ? Fu.slice(0, t).reverse()
                            : Fu.slice(t + 1);
                      return (
                        eu(e)
                          ? r.filter(function (t) {
                              return t.vars.preventOverlaps === e;
                            })
                          : r
                      ).filter(function (e) {
                        return Te.direction > 0 ? e.end <= l : e.start >= c;
                      });
                    }),
                    (Te.update = function (e, t, i) {
                      if (!ce || i || e) {
                        var s,
                          u,
                          d,
                          p,
                          f,
                          m,
                          g,
                          _ = !0 === Ic ? $ : Te.scroll(),
                          T = e ? 0 : (_ - l) / v,
                          M = T < 0 ? 0 : T > 1 ? 1 : T || 0,
                          A = Te.progress;
                        if (
                          (t &&
                            ((a = o),
                            (o = ce ? Oe() : _),
                            oe &&
                              ((L = I), (I = r && !pe ? r.totalProgress() : M))),
                          re &&
                            J &&
                            !cc &&
                            !zc &&
                            $c &&
                            (!M && l < _ + ((_ - a) / (Dc() - ac)) * re
                              ? (M = 1e-4)
                              : 1 === M &&
                                c > _ + ((_ - a) / (Dc() - ac)) * re &&
                                (M = 0.9999)),
                          M !== A && Te.enabled)
                        ) {
                          if (
                            ((p =
                              (f =
                                (s = Te.isActive = !!M && M < 1) !==
                                (!!A && A < 1)) || !!M != !!A),
                            (Te.direction = M > A ? 1 : -1),
                            (Te.progress = M),
                            p &&
                              !cc &&
                              ((u = M && !A ? 0 : 1 === M ? 1 : 1 === A ? 2 : 3),
                              pe &&
                                ((d =
                                  (!f && "none" !== we[u + 1] && we[u + 1]) ||
                                  we[u]),
                                (g =
                                  r &&
                                  ("complete" === d ||
                                    "reset" === d ||
                                    d in r)))),
                            de &&
                              (f || g) &&
                              (g || Q || !r) &&
                              (tu(de)
                                ? de(Te)
                                : Te.getTrailing(de).forEach(function (e) {
                                    return e.endAnimation();
                                  })),
                            pe ||
                              (!R || cc || zc
                                ? r && r.totalProgress(M, !(!cc || (!Me && !e)))
                                : (R._dp._time - R._start !== R._time &&
                                    R.render(R._dp._time - R._start),
                                  R.resetTo
                                    ? R.resetTo(
                                        "totalProgress",
                                        M,
                                        r._tTime / r._tDur
                                      )
                                    : ((R.vars.totalProgress = M),
                                      R.invalidate().restart()))),
                            J)
                          )
                            if ((e && ee && (b.style[ee + he.os2] = k), ge)) {
                              if (p) {
                                if (
                                  ((m =
                                    !e &&
                                    M > A &&
                                    c + 1 > _ &&
                                    _ + 1 >= Zc(fe, he)),
                                  ae)
                                )
                                  if (e || (!s && !m)) pd(J, b);
                                  else {
                                    var z = Eu(J, !0),
                                      D = _ - l;
                                    pd(
                                      J,
                                      rc,
                                      z.top + (he === Bl ? D : 0) + bu,
                                      z.left + (he === Bl ? 0 : D) + bu
                                    );
                                  }
                                ld(s || m ? y : w),
                                  (O && M < 1 && s) ||
                                    E(S + (1 !== M || m ? 0 : x));
                              }
                            } else E(Wc(S + x * M));
                          oe && !n.tween && !cc && !zc && F.restart(!0),
                            G &&
                              (f || (se && M && (M < 1 || !Cc))) &&
                              sc(G.targets).forEach(function (e) {
                                return e.classList[s || se ? "add" : "remove"](
                                  G.className
                                );
                              }),
                            W && !pe && !e && W(Te),
                            p && !cc
                              ? (pe &&
                                  (g &&
                                    ("complete" === d
                                      ? r.pause().totalProgress(1)
                                      : "reset" === d
                                      ? r.restart(!0).pause()
                                      : "restart" === d
                                      ? r.restart(!0)
                                      : r[d]()),
                                  W && W(Te)),
                                (!f && Cc) ||
                                  (X && f && su(Te, X),
                                  ye[u] && su(Te, ye[u]),
                                  se && (1 === M ? Te.kill(!1, 1) : (ye[u] = 0)),
                                  f ||
                                    (ye[(u = 1 === M ? 1 : 3)] && su(Te, ye[u]))),
                                ue &&
                                  !s &&
                                  Math.abs(Te.getVelocity()) >
                                    (ru(ue) ? ue : 2500) &&
                                  (iu(Te.callbackAnimation),
                                  R
                                    ? R.progress(1)
                                    : iu(r, "reverse" === d ? 1 : !M, 1)))
                              : pe && W && !cc && W(Te);
                        }
                        if (C) {
                          var N = ce
                            ? (_ / ce.duration()) * (ce._caScrollDist || 0)
                            : _;
                          P(N + (h._isFlipped ? 1 : 0)), C(N);
                        }
                        j && j((-_ / ce.duration()) * (ce._caScrollDist || 0));
                      }
                    }),
                    (Te.enable = function (t, r) {
                      Te.enabled ||
                        ((Te.enabled = !0),
                        Pu(fe, "resize", Bu),
                        ve || Pu(fe, "scroll", ju),
                        Ee && Pu(e, "refreshInit", Ee),
                        !1 !== t && ((Te.progress = Pe = 0), (o = a = ke = Oe())),
                        !1 !== r && Te.refresh());
                    }),
                    (Te.getTween = function (e) {
                      return e && n ? n.tween : R;
                    }),
                    (Te.setPositions = function (e, t, r, n) {
                      if (ce) {
                        var i = ce.scrollTrigger,
                          s = ce.duration(),
                          o = i.end - i.start;
                        (e = i.start + (o * e) / s), (t = i.start + (o * t) / s);
                      }
                      Te.refresh(
                        !1,
                        !1,
                        {
                          start: Vc(e, r && !!Te._startClamp),
                          end: Vc(t, r && !!Te._endClamp),
                        },
                        n
                      ),
                        Te.update();
                    }),
                    (Te.adjustPinSpacing = function (e) {
                      if (M && e) {
                        var t = M.indexOf(he.d) + 1;
                        (M[t] = parseFloat(M[t]) + e + bu),
                          (M[1] = parseFloat(M[1]) + e + bu),
                          ld(M);
                      }
                    }),
                    (Te.disable = function (t, r) {
                      if (
                        Te.enabled &&
                        (!1 !== t && Te.revert(!0, !0),
                        (Te.enabled = Te.isActive = !1),
                        r || (R && R.pause()),
                        ($ = 0),
                        i && (i.uncache = 1),
                        Ee && Ou(e, "refreshInit", Ee),
                        F &&
                          (F.pause(), n.tween && n.tween.kill() && (n.tween = 0)),
                        !ve)
                      ) {
                        for (var s = Fu.length; s--; )
                          if (Fu[s].scroller === fe && Fu[s] !== Te) return;
                        Ou(fe, "resize", Bu), ve || Ou(fe, "scroll", ju);
                      }
                    }),
                    (Te.kill = function (e, n) {
                      Te.disable(e, n), R && !n && R.kill(), Y && delete $u[Y];
                      var s = Fu.indexOf(Te);
                      s >= 0 && Fu.splice(s, 1),
                        s === hc && rd > 0 && hc--,
                        (s = 0),
                        Fu.forEach(function (e) {
                          return e.scroller === Te.scroller && (s = 1);
                        }),
                        s || Ic || (Te.scroll.rec = 0),
                        r &&
                          ((r.scrollTrigger = null),
                          e && r.revert({ kill: !1 }),
                          n || r.kill()),
                        u &&
                          [u, d, h, p].forEach(function (e) {
                            return e.parentNode && e.parentNode.removeChild(e);
                          }),
                        Rc === Te && (Rc = 0),
                        J &&
                          (i && (i.uncache = 1),
                          (s = 0),
                          Fu.forEach(function (e) {
                            return e.pin === J && s++;
                          }),
                          s || (i.spacer = 0)),
                        t.onKill && t.onKill(Te);
                    }),
                    Fu.push(Te),
                    Te.enable(!1, !1),
                    V && V(Te),
                    r && r.add && !v)
                  ) {
                    var Le = Te.update;
                    (Te.update = function () {
                      (Te.update = Le), l || c || Te.refresh();
                    }),
                      Ql.delayedCall(0.01, Te.update),
                      (v = 0.01),
                      (l = c = 0);
                  } else Te.refresh();
                  J &&
                    (function () {
                      if (Lc !== Qu) {
                        var e = (Lc = Qu);
                        requestAnimationFrame(function () {
                          return e === Qu && ed(!0);
                        });
                      }
                    })();
                } else this.update = this.refresh = this.kill = Hc;
              }),
              (e.register = function (t) {
                return (
                  Zl ||
                    ((Ql = t || Yc()),
                    Gc() && window.document && e.enable(),
                    (Zl = Nc)),
                  Zl
                );
              }),
              (e.defaults = function (e) {
                if (e) for (var t in e) Iu[t] = e[t];
                return Iu;
              }),
              (e.disable = function (e, t) {
                (Nc = 0),
                  Fu.forEach(function (r) {
                    return r[t ? "kill" : "disable"](e);
                  }),
                  Ou(Jl, "wheel", ju),
                  Ou(ec, "scroll", ju),
                  clearInterval(lc),
                  Ou(ec, "touchcancel", Hc),
                  Ou(rc, "touchstart", Hc),
                  Mu(Ou, ec, "pointerdown,touchstart,mousedown", qc),
                  Mu(Ou, ec, "pointerup,touchend,mouseup", Uc),
                  ic.kill(),
                  Jc(Ou);
                for (var r = 0; r < Ol.length; r += 3)
                  Cu(Ou, Ol[r], Ol[r + 1]), Cu(Ou, Ol[r], Ol[r + 2]);
              }),
              (e.enable = function () {
                if (
                  ((Jl = window),
                  (ec = document),
                  (tc = ec.documentElement),
                  (rc = ec.body),
                  Ql &&
                    ((sc = Ql.utils.toArray),
                    (oc = Ql.utils.clamp),
                    (Sc = Ql.core.context || Hc),
                    (gc = Ql.core.suppressOverwrites || Hc),
                    (xc = Jl.history.scrollRestoration || "auto"),
                    (td = Jl.pageYOffset),
                    Ql.core.globals("ScrollTrigger", e),
                    rc))
                ) {
                  (Nc = 1),
                    ((kc = document.createElement("div")).style.height = "100vh"),
                    (kc.style.position = "absolute"),
                    Zu(),
                    Bc(),
                    Kl.register(Ql),
                    (e.isTouch = Kl.isTouch),
                    (Ec =
                      Kl.isTouch &&
                      /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent)),
                    (bc = 1 === Kl.isTouch),
                    Pu(Jl, "wheel", ju),
                    (nc = [Jl, ec, tc, rc]),
                    Ql.matchMedia
                      ? ((e.matchMedia = function (e) {
                          var t,
                            r = Ql.matchMedia();
                          for (t in e) r.add(t, e[t]);
                          return r;
                        }),
                        Ql.addEventListener("matchMediaInit", function () {
                          return Xu();
                        }),
                        Ql.addEventListener("matchMediaRevert", function () {
                          return Yu();
                        }),
                        Ql.addEventListener("matchMedia", function () {
                          ed(0, 1), Wu("matchMedia");
                        }),
                        Ql.matchMedia("(orientation: portrait)", function () {
                          return Vu(), Vu;
                        }))
                      : console.warn("Requires GSAP 3.11.0 or later"),
                    Vu(),
                    Pu(ec, "scroll", ju);
                  var t,
                    r,
                    n = rc.style,
                    i = n.borderTopStyle,
                    s = Ql.core.Animation.prototype;
                  for (
                    s.revert ||
                      Object.defineProperty(s, "revert", {
                        value: function () {
                          return this.time(-0.01, !0);
                        },
                      }),
                      n.borderTopStyle = "solid",
                      t = Eu(rc),
                      Bl.m = Math.round(t.top + Bl.sc()) || 0,
                      Vl.m = Math.round(t.left + Vl.sc()) || 0,
                      i
                        ? (n.borderTopStyle = i)
                        : n.removeProperty("border-top-style"),
                      lc = setInterval(Nu, 250),
                      Ql.delayedCall(0.5, function () {
                        return (zc = 0);
                      }),
                      Pu(ec, "touchcancel", Hc),
                      Pu(rc, "touchstart", Hc),
                      Mu(Pu, ec, "pointerdown,touchstart,mousedown", qc),
                      Mu(Pu, ec, "pointerup,touchend,mouseup", Uc),
                      dc = Ql.utils.checkPrefix("transform"),
                      sd.push(dc),
                      Zl = Dc(),
                      ic = Ql.delayedCall(0.2, ed).pause(),
                      mc = [
                        ec,
                        "visibilitychange",
                        function () {
                          var e = Jl.innerWidth,
                            t = Jl.innerHeight;
                          ec.hidden
                            ? ((pc = e), (fc = t))
                            : (pc === e && fc === t) || Bu();
                        },
                        ec,
                        "DOMContentLoaded",
                        ed,
                        Jl,
                        "load",
                        ed,
                        Jl,
                        "resize",
                        Bu,
                      ],
                      Jc(Pu),
                      Fu.forEach(function (e) {
                        return e.enable(0, 1);
                      }),
                      r = 0;
                    r < Ol.length;
                    r += 3
                  )
                    Cu(Ou, Ol[r], Ol[r + 1]), Cu(Ou, Ol[r], Ol[r + 2]);
                }
              }),
              (e.config = function (t) {
                "limitCallbacks" in t && (Cc = !!t.limitCallbacks);
                var r = t.syncInterval;
                (r && clearInterval(lc)) || ((lc = r) && setInterval(Nu, r)),
                  "ignoreMobileResize" in t &&
                    (bc = 1 === e.isTouch && t.ignoreMobileResize),
                  "autoRefreshEvents" in t &&
                    (Jc(Ou) || Jc(Pu, t.autoRefreshEvents || "none"),
                    (yc = -1 === (t.autoRefreshEvents + "").indexOf("resize")));
              }),
              (e.scrollerProxy = function (e, t) {
                var r = ql(e),
                  n = Ol.indexOf(r),
                  i = Xc(r);
                ~n && Ol.splice(n, i ? 6 : 2),
                  t && (i ? Cl.unshift(Jl, t, rc, t, tc, t) : Cl.unshift(r, t));
              }),
              (e.clearMatchMedia = function (e) {
                Fu.forEach(function (t) {
                  return t._ctx && t._ctx.query === e && t._ctx.kill(!0, !0);
                });
              }),
              (e.isInViewport = function (e, t, r) {
                var n = (eu(e) ? ql(e) : e).getBoundingClientRect(),
                  i = n[r ? uu : du] * t || 0;
                return r
                  ? n.right - i > 0 && n.left + i < Jl.innerWidth
                  : n.bottom - i > 0 && n.top + i < Jl.innerHeight;
              }),
              (e.positionInViewport = function (e, t, r) {
                eu(e) && (e = ql(e));
                var n = e.getBoundingClientRect(),
                  i = n[r ? uu : du],
                  s =
                    null == t
                      ? i / 2
                      : t in Lu
                      ? Lu[t] * i
                      : ~t.indexOf("%")
                      ? (parseFloat(t) * i) / 100
                      : parseFloat(t) || 0;
                return r
                  ? (n.left + s) / Jl.innerWidth
                  : (n.top + s) / Jl.innerHeight;
              }),
              (e.killAll = function (e) {
                if (
                  (Fu.slice(0).forEach(function (e) {
                    return "ScrollSmoother" !== e.vars.id && e.kill();
                  }),
                  !0 !== e)
                ) {
                  var t = qu.killAll || [];
                  (qu = {}),
                    t.forEach(function (e) {
                      return e();
                    });
                }
              }),
              e
            );
          })();
        (gd.version = "3.12.5"),
          (gd.saveStyles = function (e) {
            return e
              ? sc(e).forEach(function (e) {
                  if (e && e.style) {
                    var t = Gu.indexOf(e);
                    t >= 0 && Gu.splice(t, 5),
                      Gu.push(
                        e,
                        e.style.cssText,
                        e.getBBox && e.getAttribute("transform"),
                        Ql.core.getCache(e),
                        Sc()
                      );
                  }
                })
              : Gu;
          }),
          (gd.revert = function (e, t) {
            return Xu(!e, t);
          }),
          (gd.create = function (e, t) {
            return new gd(e, t);
          }),
          (gd.refresh = function (e) {
            return e ? Bu() : (Zl || gd.register()) && ed(!0);
          }),
          (gd.update = function (e) {
            return ++Ol.cache && nd(!0 === e ? 2 : 0);
          }),
          (gd.clearScrollMemory = Ku),
          (gd.maxScroll = function (e, t) {
            return Zc(e, t ? Vl : Bl);
          }),
          (gd.getScrollFunc = function (e, t) {
            return Ul(ql(e), t ? Vl : Bl);
          }),
          (gd.getById = function (e) {
            return $u[e];
          }),
          (gd.getAll = function () {
            return Fu.filter(function (e) {
              return "ScrollSmoother" !== e.vars.id;
            });
          }),
          (gd.isScrolling = function () {
            return !!$c;
          }),
          (gd.snapDirectional = ku),
          (gd.addEventListener = function (e, t) {
            var r = qu[e] || (qu[e] = []);
            ~r.indexOf(t) || r.push(t);
          }),
          (gd.removeEventListener = function (e, t) {
            var r = qu[e],
              n = r && r.indexOf(t);
            n >= 0 && r.splice(n, 1);
          }),
          (gd.batch = function (e, t) {
            var r,
              n = [],
              i = {},
              s = t.interval || 0.016,
              o = t.batchMax || 1e9,
              a = function (e, t) {
                var r = [],
                  n = [],
                  i = Ql.delayedCall(s, function () {
                    t(r, n), (r = []), (n = []);
                  }).pause();
                return function (e) {
                  r.length || i.restart(!0),
                    r.push(e.trigger),
                    n.push(e),
                    o <= r.length && i.progress(1);
                };
              };
            for (r in t)
              i[r] =
                "on" === r.substr(0, 2) && tu(t[r]) && "onRefreshInit" !== r
                  ? a(0, t[r])
                  : t[r];
            return (
              tu(o) &&
                ((o = o()),
                Pu(gd, "refresh", function () {
                  return (o = t.batchMax());
                })),
              sc(e).forEach(function (e) {
                var t = {};
                for (r in i) t[r] = i[r];
                (t.trigger = e), n.push(gd.create(t));
              }),
              n
            );
          });
        var yd,
          wd = function (e, t, r, n) {
            return (
              t > n ? e(n) : t < 0 && e(0),
              r > n ? (n - t) / (r - t) : r < 0 ? t / (t - r) : 1
            );
          },
          bd = function e(t, r) {
            !0 === r
              ? t.style.removeProperty("touch-action")
              : (t.style.touchAction =
                  !0 === r
                    ? "auto"
                    : r
                    ? "pan-" + r + (Kl.isTouch ? " pinch-zoom" : "")
                    : "none"),
              t === tc && e(rc, r);
          },
          _d = { auto: 1, scroll: 1 },
          Td = function (e) {
            var t,
              r = e.event,
              n = e.target,
              i = e.axis,
              s = (r.changedTouches ? r.changedTouches[0] : r).target,
              o = s._gsap || Ql.core.getCache(s),
              a = Dc();
            if (!o._isScrollT || a - o._isScrollT > 2e3) {
              for (
                ;
                s &&
                s !== rc &&
                ((s.scrollHeight <= s.clientHeight &&
                  s.scrollWidth <= s.clientWidth) ||
                  (!_d[(t = _u(s)).overflowY] && !_d[t.overflowX]));
  
              )
                s = s.parentNode;
              (o._isScroll =
                s &&
                s !== n &&
                !Xc(s) &&
                (_d[(t = _u(s)).overflowY] || _d[t.overflowX])),
                (o._isScrollT = a);
            }
            (o._isScroll || "x" === i) &&
              (r.stopPropagation(), (r._gsapAllow = !0));
          },
          Ed = function (e, t, r, n) {
            return Kl.create({
              target: e,
              capture: !0,
              debounce: !1,
              lockAxis: !0,
              type: t,
              onWheel: (n = n && Td),
              onPress: n,
              onDrag: n,
              onScroll: n,
              onEnable: function () {
                return r && Pu(ec, Kl.eventTypes[0], xd, !1, !0);
              },
              onDisable: function () {
                return Ou(ec, Kl.eventTypes[0], xd, !0);
              },
            });
          },
          Sd = /(input|label|select|textarea)/i,
          xd = function (e) {
            var t = Sd.test(e.target.tagName);
            (t || yd) && ((e._gsapAllow = !0), (yd = t));
          },
          kd = function (e) {
            nu(e) || (e = {}),
              (e.preventDefault = e.isNormalizer = e.allowClicks = !0),
              e.type || (e.type = "wheel,touch"),
              (e.debounce = !!e.debounce),
              (e.id = e.id || "normalizer");
            var t,
              r,
              n,
              i,
              s,
              o,
              a,
              l,
              c = e,
              u = c.normalizeScrollX,
              d = c.momentum,
              h = c.allowNestedScroll,
              p = c.onRelease,
              f = ql(e.target) || tc,
              m = Ql.core.globals().ScrollSmoother,
              v = m && m.get(),
              g =
                Ec &&
                ((e.content && ql(e.content)) ||
                  (v && !1 !== e.content && !v.smooth() && v.content())),
              y = Ul(f, Bl),
              w = Ul(f, Vl),
              b = 1,
              _ =
                (Kl.isTouch && Jl.visualViewport
                  ? Jl.visualViewport.scale * Jl.visualViewport.width
                  : Jl.outerWidth) / Jl.innerWidth,
              T = 0,
              E = tu(d)
                ? function () {
                    return d(t);
                  }
                : function () {
                    return d || 2.8;
                  },
              S = Ed(f, e.type, !0, h),
              x = function () {
                return (i = !1);
              },
              k = Hc,
              M = Hc,
              P = function () {
                (r = Zc(f, Bl)),
                  (M = oc(Ec ? 1 : 0, r)),
                  u && (k = oc(0, Zc(f, Vl))),
                  (n = Qu);
              },
              O = function () {
                (g._gsap.y = Wc(parseFloat(g._gsap.y) + y.offset) + "px"),
                  (g.style.transform =
                    "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                    parseFloat(g._gsap.y) +
                    ", 0, 1)"),
                  (y.offset = y.cacheID = 0);
              },
              C = function () {
                P(),
                  s.isActive() &&
                    s.vars.scrollY > r &&
                    (y() > r ? s.progress(1) && y(r) : s.resetTo("scrollY", r));
              };
            return (
              g && Ql.set(g, { y: "+=0" }),
              (e.ignoreCheck = function (e) {
                return (
                  (Ec &&
                    "touchmove" === e.type &&
                    (function () {
                      if (i) {
                        requestAnimationFrame(x);
                        var e = Wc(t.deltaY / 2),
                          r = M(y.v - e);
                        if (g && r !== y.v + y.offset) {
                          y.offset = r - y.v;
                          var n = Wc(
                            (parseFloat(g && g._gsap.y) || 0) - y.offset
                          );
                          (g.style.transform =
                            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " +
                            n +
                            ", 0, 1)"),
                            (g._gsap.y = n + "px"),
                            (y.cacheID = Ol.cache),
                            nd();
                        }
                        return !0;
                      }
                      y.offset && O(), (i = !0);
                    })()) ||
                  (b > 1.05 && "touchstart" !== e.type) ||
                  t.isGesturing ||
                  (e.touches && e.touches.length > 1)
                );
              }),
              (e.onPress = function () {
                i = !1;
                var e = b;
                (b = Wc(
                  ((Jl.visualViewport && Jl.visualViewport.scale) || 1) / _
                )),
                  s.pause(),
                  e !== b && bd(f, b > 1.01 || (!u && "x")),
                  (o = w()),
                  (a = y()),
                  P(),
                  (n = Qu);
              }),
              (e.onRelease = e.onGestureStart =
                function (e, t) {
                  if ((y.offset && O(), t)) {
                    Ol.cache++;
                    var n,
                      i,
                      o = E();
                    u &&
                      ((i = (n = w()) + (0.05 * o * -e.velocityX) / 0.227),
                      (o *= wd(w, n, i, Zc(f, Vl))),
                      (s.vars.scrollX = k(i))),
                      (i = (n = y()) + (0.05 * o * -e.velocityY) / 0.227),
                      (o *= wd(y, n, i, Zc(f, Bl))),
                      (s.vars.scrollY = M(i)),
                      s.invalidate().duration(o).play(0.01),
                      ((Ec && s.vars.scrollY >= r) || n >= r - 1) &&
                        Ql.to({}, { onUpdate: C, duration: o });
                  } else l.restart(!0);
                  p && p(e);
                }),
              (e.onWheel = function () {
                s._ts && s.pause(), Dc() - T > 1e3 && ((n = 0), (T = Dc()));
              }),
              (e.onChange = function (e, t, r, i, s) {
                if (
                  (Qu !== n && P(),
                  t &&
                    u &&
                    w(k(i[2] === t ? o + (e.startX - e.x) : w() + t - i[1])),
                  r)
                ) {
                  y.offset && O();
                  var l = s[2] === r,
                    c = l ? a + e.startY - e.y : y() + r - s[1],
                    d = M(c);
                  l && c !== d && (a += d - c), y(d);
                }
                (r || t) && nd();
              }),
              (e.onEnable = function () {
                bd(f, !u && "x"),
                  gd.addEventListener("refresh", C),
                  Pu(Jl, "resize", C),
                  y.smooth &&
                    ((y.target.style.scrollBehavior = "auto"),
                    (y.smooth = w.smooth = !1)),
                  S.enable();
              }),
              (e.onDisable = function () {
                bd(f, !0),
                  Ou(Jl, "resize", C),
                  gd.removeEventListener("refresh", C),
                  S.kill();
              }),
              (e.lockAxis = !1 !== e.lockAxis),
              ((t = new Kl(e)).iOS = Ec),
              Ec && !y() && y(1),
              Ec && Ql.ticker.add(Hc),
              (l = t._dc),
              (s = Ql.to(t, {
                ease: "power4",
                paused: !0,
                inherit: !1,
                scrollX: u ? "+=0.1" : "+=0",
                scrollY: "+=0.1",
                modifiers: {
                  scrollY: fd(y, y(), function () {
                    return s.pause();
                  }),
                },
                onUpdate: nd,
                onComplete: l.vars.onComplete,
              })),
              t
            );
          };
        (gd.sort = function (e) {
          return Fu.sort(
            e ||
              function (e, t) {
                return (
                  -1e6 * (e.vars.refreshPriority || 0) +
                  e.start -
                  (t.start + -1e6 * (t.vars.refreshPriority || 0))
                );
              }
          );
        }),
          (gd.observe = function (e) {
            return new Kl(e);
          }),
          (gd.normalizeScroll = function (e) {
            if (void 0 === e) return wc;
            if (!0 === e && wc) return wc.enable();
            if (!1 === e) return wc && wc.kill(), void (wc = e);
            var t = e instanceof Kl ? e : kd(e);
            return (
              wc && wc.target === t.target && wc.kill(),
              Xc(t.target) && (wc = t),
              t
            );
          }),
          (gd.core = {
            _getVelocityProp: Hl,
            _inputObserver: Ed,
            _scrollers: Ol,
            _proxies: Cl,
            bridge: {
              ss: function () {
                $c || Wu("scrollStart"), ($c = Dc());
              },
              ref: function () {
                return cc;
              },
            },
          }),
          Yc() && Ql.registerPlugin(gd),
          dl.registerPlugin(gd);
        var Md = class extends d {
          constructor(e) {
            super(e),
              (this.$item = dl.utils.toArray(this.$("item"))),
              (this.$scroller = document.querySelector(
                ".c-scroll-wrapper_inner"
              ));
          }
          init() {
            const e = !1,
              t = dl.timeline({
                scrollTrigger: {
                  trigger: this.$item[0],
                  scroller: this.$scroller,
                  start: "top top",
                  end: "bottom top",
                  scrub: !0,
                  markers: e,
                  id: 1,
                },
              }),
              r = dl.timeline({
                scrollTrigger: {
                  trigger: this.$item[2],
                  scroller: this.$scroller,
                  start: "-25% center",
                  end: "25% center",
                  scrub: !0,
                  markers: e,
                  id: 2,
                },
              }),
              n = dl.timeline({
                scrollTrigger: {
                  trigger: this.$item[3],
                  scroller: this.$scroller,
                  start: "-25% center",
                  end: "25% center",
                  scrub: !0,
                  markers: e,
                  id: 3,
                },
              }),
              i = dl.timeline({
                scrollTrigger: {
                  trigger: this.$item[4],
                  scroller: this.$scroller,
                  start: "-25% center",
                  end: "25% center",
                  scrub: !0,
                  markers: e,
                  id: 4,
                },
              });
            t.fromTo(
              document.body,
              { backgroundColor: "#fff" },
              { backgroundColor: "#edf2f9" }
            ),
              r.fromTo(
                document.body,
                { backgroundColor: "#fff" },
                { backgroundColor: "#edf2f9" }
              ),
              n.fromTo(
                document.body,
                { backgroundColor: "#edf2f9" },
                { backgroundColor: "#fff" }
              ),
              i.fromTo(
                document.body,
                { backgroundColor: "#fff" },
                { backgroundColor: "#edf2f9" }
              );
          }
        };
        Object.freeze({
          LOADING: "is-loading",
          LOADED: "is-loaded",
          READY: "is-ready",
          FIRST_LOADED: "is-first-loaded",
          FONTS_LOADED: "fonts-loaded",
          LAZY_CONTAINER: "c-lazy",
          LAZY_LOADED: "-lazy-loaded",
        });
        const Pd = Object.freeze({ RESIZE_END: "loco.resizeEnd" }),
          Od = new p({ modules: e });
        function Cd() {
          Od.init(Od);
          const e = document.createComment(" This site was created by nickxsy ");
          document.insertBefore(e, document.documentElement),
            (function () {
              let e = window.innerWidth;
              Xe.style.setProperty("--vh", 0.01 * window.innerHeight + "px"),
                window.addEventListener("resize", () => {
                  window.innerWidth != e &&
                    window.matchMedia("(hover: none)") &&
                    ((e = window.innerWidth),
                    Xe.style.setProperty(
                      "--vh",
                      0.01 * window.innerHeight + "px"
                    ));
                });
            })(),
            Xe.classList.remove("is-loading"),
            Xe.classList.add("is-first-load"),
            dl.delayedCall(3.6, () => {
              Xe.classList.add("is-finish-load");
            }),
            dl.delayedCall(1, () => {
              Xe.classList.add("has-dom-ready"),
                Xe.classList.add("is-loaded"),
                Xe.classList.add("is-ready");
            });
        }
        (window.onload = (e) => {
          const t = document.getElementById("main-css");
          t
            ? t.isLoaded
              ? Cd()
              : t.addEventListener("load", (e) => {
                  Cd();
                })
            : console.warn('The "main-css" stylesheet not found');
        }),
          (window.isMobile =
            /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
              navigator.userAgent
            ) ||
            ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1)),
          window.isMobile
            ? Xe.classList.add("is-mobile")
            : Xe.classList.add("is-desktop"),
          window.isMobile && window.innerWidth > 1e3 && (window.isTablet = !0),
          (window.isWindows = navigator.platform.indexOf("Win") > -1),
          window.isWindows && Xe.classList.add("is-windows"),
          (window.isIos =
            /iPad|iPhone|iPod/.test(navigator.platform) ||
            ("MacIntel" === navigator.platform && navigator.maxTouchPoints > 1)),
          window.isIos && Xe.classList.add("is-ios"),
          (window.firstHit = !0),
          (window.readyDelay = 0.6),
          (window.modalDelay = 0.8),
          (window.readyCallbackDelay = 0);
        const Ad = new CustomEvent(Pd.RESIZE_END);
        function Id() {
          Xe.style.setProperty(
            "--vw",
            0.01 * document.documentElement.clientWidth + "px"
          ),
            Xe.style.setProperty(
              "--vh",
              0.01 * document.documentElement.clientHeight + "px"
            ),
            window.dispatchEvent(Ad);
        }
        window.addEventListener(
          "resize",
          ((e, t, r = !1) => {
            let n = null;
            return (...i) => {
              clearTimeout(n);
              r && !n && e(...i),
                (n = setTimeout(() => {
                  (n = null), r || e(...i);
                }, t));
            };
          })(Id, 200)
        ),
          Id(),
          console.log("init");
      })();
  })();
  