"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to2, from2, except, desc) => {
  if (from2 && typeof from2 === "object" || typeof from2 === "function") {
    for (let key of __getOwnPropNames(from2))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
  }
  return to2;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
module.exports = __toCommonJS(main_exports);

// src/core/tracker-plugin.ts
var import_obsidian10 = require("obsidian");

// src/ui/tracker-block-render-child.tsx
var import_obsidian = require("obsidian");

// node_modules/preact/dist/preact.module.js
var n;
var l;
var u;
var t;
var i;
var r;
var o;
var e;
var f;
var c;
var s;
var a;
var h;
var p = {};
var v = [];
var y = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;
var w = Array.isArray;
function d(n2, l3) {
  for (var u4 in l3) n2[u4] = l3[u4];
  return n2;
}
function g(n2) {
  n2 && n2.parentNode && n2.parentNode.removeChild(n2);
}
function _(l3, u4, t3) {
  var i4, r3, o3, e3 = {};
  for (o3 in u4) "key" == o3 ? i4 = u4[o3] : "ref" == o3 ? r3 = u4[o3] : e3[o3] = u4[o3];
  if (arguments.length > 2 && (e3.children = arguments.length > 3 ? n.call(arguments, 2) : t3), "function" == typeof l3 && null != l3.defaultProps) for (o3 in l3.defaultProps) void 0 === e3[o3] && (e3[o3] = l3.defaultProps[o3]);
  return m(l3, e3, i4, r3, null);
}
function m(n2, t3, i4, r3, o3) {
  var e3 = { type: n2, props: t3, key: i4, ref: r3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: null == o3 ? ++u : o3, __i: -1, __u: 0 };
  return null == o3 && null != l.vnode && l.vnode(e3), e3;
}
function k(n2) {
  return n2.children;
}
function x(n2, l3) {
  this.props = n2, this.context = l3;
}
function S(n2, l3) {
  if (null == l3) return n2.__ ? S(n2.__, n2.__i + 1) : null;
  for (var u4; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) return u4.__e;
  return "function" == typeof n2.type ? S(n2) : null;
}
function C(n2) {
  var l3, u4;
  if (null != (n2 = n2.__) && null != n2.__c) {
    for (n2.__e = n2.__c.base = null, l3 = 0; l3 < n2.__k.length; l3++) if (null != (u4 = n2.__k[l3]) && null != u4.__e) {
      n2.__e = n2.__c.base = u4.__e;
      break;
    }
    return C(n2);
  }
}
function M(n2) {
  (!n2.__d && (n2.__d = true) && i.push(n2) && !$.__r++ || r != l.debounceRendering) && ((r = l.debounceRendering) || o)($);
}
function $() {
  for (var n2, u4, t3, r3, o3, f4, c3, s3 = 1; i.length; ) i.length > s3 && i.sort(e), n2 = i.shift(), s3 = i.length, n2.__d && (t3 = void 0, r3 = void 0, o3 = (r3 = (u4 = n2).__v).__e, f4 = [], c3 = [], u4.__P && ((t3 = d({}, r3)).__v = r3.__v + 1, l.vnode && l.vnode(t3), O(u4.__P, t3, r3, u4.__n, u4.__P.namespaceURI, 32 & r3.__u ? [o3] : null, f4, null == o3 ? S(r3) : o3, !!(32 & r3.__u), c3), t3.__v = r3.__v, t3.__.__k[t3.__i] = t3, N(f4, t3, c3), r3.__e = r3.__ = null, t3.__e != o3 && C(t3)));
  $.__r = 0;
}
function I(n2, l3, u4, t3, i4, r3, o3, e3, f4, c3, s3) {
  var a3, h3, y3, w3, d3, g4, _3, m3 = t3 && t3.__k || v, b2 = l3.length;
  for (f4 = P(u4, l3, m3, f4, b2), a3 = 0; a3 < b2; a3++) null != (y3 = u4.__k[a3]) && (h3 = -1 == y3.__i ? p : m3[y3.__i] || p, y3.__i = a3, g4 = O(n2, y3, h3, i4, r3, o3, e3, f4, c3, s3), w3 = y3.__e, y3.ref && h3.ref != y3.ref && (h3.ref && B(h3.ref, null, y3), s3.push(y3.ref, y3.__c || w3, y3)), null == d3 && null != w3 && (d3 = w3), (_3 = !!(4 & y3.__u)) || h3.__k === y3.__k ? f4 = A(y3, f4, n2, _3) : "function" == typeof y3.type && void 0 !== g4 ? f4 = g4 : w3 && (f4 = w3.nextSibling), y3.__u &= -7);
  return u4.__e = d3, f4;
}
function P(n2, l3, u4, t3, i4) {
  var r3, o3, e3, f4, c3, s3 = u4.length, a3 = s3, h3 = 0;
  for (n2.__k = new Array(i4), r3 = 0; r3 < i4; r3++) null != (o3 = l3[r3]) && "boolean" != typeof o3 && "function" != typeof o3 ? (f4 = r3 + h3, (o3 = n2.__k[r3] = "string" == typeof o3 || "number" == typeof o3 || "bigint" == typeof o3 || o3.constructor == String ? m(null, o3, null, null, null) : w(o3) ? m(k, { children: o3 }, null, null, null) : null == o3.constructor && o3.__b > 0 ? m(o3.type, o3.props, o3.key, o3.ref ? o3.ref : null, o3.__v) : o3).__ = n2, o3.__b = n2.__b + 1, e3 = null, -1 != (c3 = o3.__i = L(o3, u4, f4, a3)) && (a3--, (e3 = u4[c3]) && (e3.__u |= 2)), null == e3 || null == e3.__v ? (-1 == c3 && (i4 > s3 ? h3-- : i4 < s3 && h3++), "function" != typeof o3.type && (o3.__u |= 4)) : c3 != f4 && (c3 == f4 - 1 ? h3-- : c3 == f4 + 1 ? h3++ : (c3 > f4 ? h3-- : h3++, o3.__u |= 4))) : n2.__k[r3] = null;
  if (a3) for (r3 = 0; r3 < s3; r3++) null != (e3 = u4[r3]) && 0 == (2 & e3.__u) && (e3.__e == t3 && (t3 = S(e3)), D(e3, e3));
  return t3;
}
function A(n2, l3, u4, t3) {
  var i4, r3;
  if ("function" == typeof n2.type) {
    for (i4 = n2.__k, r3 = 0; i4 && r3 < i4.length; r3++) i4[r3] && (i4[r3].__ = n2, l3 = A(i4[r3], l3, u4, t3));
    return l3;
  }
  n2.__e != l3 && (t3 && (l3 && n2.type && !l3.parentNode && (l3 = S(n2)), u4.insertBefore(n2.__e, l3 || null)), l3 = n2.__e);
  do {
    l3 = l3 && l3.nextSibling;
  } while (null != l3 && 8 == l3.nodeType);
  return l3;
}
function H(n2, l3) {
  return l3 = l3 || [], null == n2 || "boolean" == typeof n2 || (w(n2) ? n2.some(function(n3) {
    H(n3, l3);
  }) : l3.push(n2)), l3;
}
function L(n2, l3, u4, t3) {
  var i4, r3, o3, e3 = n2.key, f4 = n2.type, c3 = l3[u4], s3 = null != c3 && 0 == (2 & c3.__u);
  if (null === c3 && null == n2.key || s3 && e3 == c3.key && f4 == c3.type) return u4;
  if (t3 > (s3 ? 1 : 0)) {
    for (i4 = u4 - 1, r3 = u4 + 1; i4 >= 0 || r3 < l3.length; ) if (null != (c3 = l3[o3 = i4 >= 0 ? i4-- : r3++]) && 0 == (2 & c3.__u) && e3 == c3.key && f4 == c3.type) return o3;
  }
  return -1;
}
function T(n2, l3, u4) {
  "-" == l3[0] ? n2.setProperty(l3, null == u4 ? "" : u4) : n2[l3] = null == u4 ? "" : "number" != typeof u4 || y.test(l3) ? u4 : u4 + "px";
}
function j(n2, l3, u4, t3, i4) {
  var r3, o3;
  n: if ("style" == l3) if ("string" == typeof u4) n2.style.cssText = u4;
  else {
    if ("string" == typeof t3 && (n2.style.cssText = t3 = ""), t3) for (l3 in t3) u4 && l3 in u4 || T(n2.style, l3, "");
    if (u4) for (l3 in u4) t3 && u4[l3] == t3[l3] || T(n2.style, l3, u4[l3]);
  }
  else if ("o" == l3[0] && "n" == l3[1]) r3 = l3 != (l3 = l3.replace(f, "$1")), o3 = l3.toLowerCase(), l3 = o3 in n2 || "onFocusOut" == l3 || "onFocusIn" == l3 ? o3.slice(2) : l3.slice(2), n2.l || (n2.l = {}), n2.l[l3 + r3] = u4, u4 ? t3 ? u4.u = t3.u : (u4.u = c, n2.addEventListener(l3, r3 ? a : s, r3)) : n2.removeEventListener(l3, r3 ? a : s, r3);
  else {
    if ("http://www.w3.org/2000/svg" == i4) l3 = l3.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if ("width" != l3 && "height" != l3 && "href" != l3 && "list" != l3 && "form" != l3 && "tabIndex" != l3 && "download" != l3 && "rowSpan" != l3 && "colSpan" != l3 && "role" != l3 && "popover" != l3 && l3 in n2) try {
      n2[l3] = null == u4 ? "" : u4;
      break n;
    } catch (n3) {
    }
    "function" == typeof u4 || (null == u4 || false === u4 && "-" != l3[4] ? n2.removeAttribute(l3) : n2.setAttribute(l3, "popover" == l3 && 1 == u4 ? "" : u4));
  }
}
function F(n2) {
  return function(u4) {
    if (this.l) {
      var t3 = this.l[u4.type + n2];
      if (null == u4.t) u4.t = c++;
      else if (u4.t < t3.u) return;
      return t3(l.event ? l.event(u4) : u4);
    }
  };
}
function O(n2, u4, t3, i4, r3, o3, e3, f4, c3, s3) {
  var a3, h3, p3, v3, y3, _3, m3, b2, S2, C3, M3, $2, P4, A4, H3, L2, T4, j4 = u4.type;
  if (null != u4.constructor) return null;
  128 & t3.__u && (c3 = !!(32 & t3.__u), o3 = [f4 = u4.__e = t3.__e]), (a3 = l.__b) && a3(u4);
  n: if ("function" == typeof j4) try {
    if (b2 = u4.props, S2 = "prototype" in j4 && j4.prototype.render, C3 = (a3 = j4.contextType) && i4[a3.__c], M3 = a3 ? C3 ? C3.props.value : a3.__ : i4, t3.__c ? m3 = (h3 = u4.__c = t3.__c).__ = h3.__E : (S2 ? u4.__c = h3 = new j4(b2, M3) : (u4.__c = h3 = new x(b2, M3), h3.constructor = j4, h3.render = E), C3 && C3.sub(h3), h3.props = b2, h3.state || (h3.state = {}), h3.context = M3, h3.__n = i4, p3 = h3.__d = true, h3.__h = [], h3._sb = []), S2 && null == h3.__s && (h3.__s = h3.state), S2 && null != j4.getDerivedStateFromProps && (h3.__s == h3.state && (h3.__s = d({}, h3.__s)), d(h3.__s, j4.getDerivedStateFromProps(b2, h3.__s))), v3 = h3.props, y3 = h3.state, h3.__v = u4, p3) S2 && null == j4.getDerivedStateFromProps && null != h3.componentWillMount && h3.componentWillMount(), S2 && null != h3.componentDidMount && h3.__h.push(h3.componentDidMount);
    else {
      if (S2 && null == j4.getDerivedStateFromProps && b2 !== v3 && null != h3.componentWillReceiveProps && h3.componentWillReceiveProps(b2, M3), !h3.__e && null != h3.shouldComponentUpdate && false === h3.shouldComponentUpdate(b2, h3.__s, M3) || u4.__v == t3.__v) {
        for (u4.__v != t3.__v && (h3.props = b2, h3.state = h3.__s, h3.__d = false), u4.__e = t3.__e, u4.__k = t3.__k, u4.__k.some(function(n3) {
          n3 && (n3.__ = u4);
        }), $2 = 0; $2 < h3._sb.length; $2++) h3.__h.push(h3._sb[$2]);
        h3._sb = [], h3.__h.length && e3.push(h3);
        break n;
      }
      null != h3.componentWillUpdate && h3.componentWillUpdate(b2, h3.__s, M3), S2 && null != h3.componentDidUpdate && h3.__h.push(function() {
        h3.componentDidUpdate(v3, y3, _3);
      });
    }
    if (h3.context = M3, h3.props = b2, h3.__P = n2, h3.__e = false, P4 = l.__r, A4 = 0, S2) {
      for (h3.state = h3.__s, h3.__d = false, P4 && P4(u4), a3 = h3.render(h3.props, h3.state, h3.context), H3 = 0; H3 < h3._sb.length; H3++) h3.__h.push(h3._sb[H3]);
      h3._sb = [];
    } else do {
      h3.__d = false, P4 && P4(u4), a3 = h3.render(h3.props, h3.state, h3.context), h3.state = h3.__s;
    } while (h3.__d && ++A4 < 25);
    h3.state = h3.__s, null != h3.getChildContext && (i4 = d(d({}, i4), h3.getChildContext())), S2 && !p3 && null != h3.getSnapshotBeforeUpdate && (_3 = h3.getSnapshotBeforeUpdate(v3, y3)), L2 = a3, null != a3 && a3.type === k && null == a3.key && (L2 = V(a3.props.children)), f4 = I(n2, w(L2) ? L2 : [L2], u4, t3, i4, r3, o3, e3, f4, c3, s3), h3.base = u4.__e, u4.__u &= -161, h3.__h.length && e3.push(h3), m3 && (h3.__E = h3.__ = null);
  } catch (n3) {
    if (u4.__v = null, c3 || null != o3) if (n3.then) {
      for (u4.__u |= c3 ? 160 : 128; f4 && 8 == f4.nodeType && f4.nextSibling; ) f4 = f4.nextSibling;
      o3[o3.indexOf(f4)] = null, u4.__e = f4;
    } else {
      for (T4 = o3.length; T4--; ) g(o3[T4]);
      z(u4);
    }
    else u4.__e = t3.__e, u4.__k = t3.__k, n3.then || z(u4);
    l.__e(n3, u4, t3);
  }
  else null == o3 && u4.__v == t3.__v ? (u4.__k = t3.__k, u4.__e = t3.__e) : f4 = u4.__e = q(t3.__e, u4, t3, i4, r3, o3, e3, c3, s3);
  return (a3 = l.diffed) && a3(u4), 128 & u4.__u ? void 0 : f4;
}
function z(n2) {
  n2 && n2.__c && (n2.__c.__e = true), n2 && n2.__k && n2.__k.forEach(z);
}
function N(n2, u4, t3) {
  for (var i4 = 0; i4 < t3.length; i4++) B(t3[i4], t3[++i4], t3[++i4]);
  l.__c && l.__c(u4, n2), n2.some(function(u5) {
    try {
      n2 = u5.__h, u5.__h = [], n2.some(function(n3) {
        n3.call(u5);
      });
    } catch (n3) {
      l.__e(n3, u5.__v);
    }
  });
}
function V(n2) {
  return "object" != typeof n2 || null == n2 || n2.__b && n2.__b > 0 ? n2 : w(n2) ? n2.map(V) : d({}, n2);
}
function q(u4, t3, i4, r3, o3, e3, f4, c3, s3) {
  var a3, h3, v3, y3, d3, _3, m3, b2 = i4.props, k3 = t3.props, x3 = t3.type;
  if ("svg" == x3 ? o3 = "http://www.w3.org/2000/svg" : "math" == x3 ? o3 = "http://www.w3.org/1998/Math/MathML" : o3 || (o3 = "http://www.w3.org/1999/xhtml"), null != e3) {
    for (a3 = 0; a3 < e3.length; a3++) if ((d3 = e3[a3]) && "setAttribute" in d3 == !!x3 && (x3 ? d3.localName == x3 : 3 == d3.nodeType)) {
      u4 = d3, e3[a3] = null;
      break;
    }
  }
  if (null == u4) {
    if (null == x3) return document.createTextNode(k3);
    u4 = document.createElementNS(o3, x3, k3.is && k3), c3 && (l.__m && l.__m(t3, e3), c3 = false), e3 = null;
  }
  if (null == x3) b2 === k3 || c3 && u4.data == k3 || (u4.data = k3);
  else {
    if (e3 = e3 && n.call(u4.childNodes), b2 = i4.props || p, !c3 && null != e3) for (b2 = {}, a3 = 0; a3 < u4.attributes.length; a3++) b2[(d3 = u4.attributes[a3]).name] = d3.value;
    for (a3 in b2) if (d3 = b2[a3], "children" == a3) ;
    else if ("dangerouslySetInnerHTML" == a3) v3 = d3;
    else if (!(a3 in k3)) {
      if ("value" == a3 && "defaultValue" in k3 || "checked" == a3 && "defaultChecked" in k3) continue;
      j(u4, a3, null, d3, o3);
    }
    for (a3 in k3) d3 = k3[a3], "children" == a3 ? y3 = d3 : "dangerouslySetInnerHTML" == a3 ? h3 = d3 : "value" == a3 ? _3 = d3 : "checked" == a3 ? m3 = d3 : c3 && "function" != typeof d3 || b2[a3] === d3 || j(u4, a3, d3, b2[a3], o3);
    if (h3) c3 || v3 && (h3.__html == v3.__html || h3.__html == u4.innerHTML) || (u4.innerHTML = h3.__html), t3.__k = [];
    else if (v3 && (u4.innerHTML = ""), I("template" == t3.type ? u4.content : u4, w(y3) ? y3 : [y3], t3, i4, r3, "foreignObject" == x3 ? "http://www.w3.org/1999/xhtml" : o3, e3, f4, e3 ? e3[0] : i4.__k && S(i4, 0), c3, s3), null != e3) for (a3 = e3.length; a3--; ) g(e3[a3]);
    c3 || (a3 = "value", "progress" == x3 && null == _3 ? u4.removeAttribute("value") : null != _3 && (_3 !== u4[a3] || "progress" == x3 && !_3 || "option" == x3 && _3 != b2[a3]) && j(u4, a3, _3, b2[a3], o3), a3 = "checked", null != m3 && m3 != u4[a3] && j(u4, a3, m3, b2[a3], o3));
  }
  return u4;
}
function B(n2, u4, t3) {
  try {
    if ("function" == typeof n2) {
      var i4 = "function" == typeof n2.__u;
      i4 && n2.__u(), i4 && null == u4 || (n2.__u = n2(u4));
    } else n2.current = u4;
  } catch (n3) {
    l.__e(n3, t3);
  }
}
function D(n2, u4, t3) {
  var i4, r3;
  if (l.unmount && l.unmount(n2), (i4 = n2.ref) && (i4.current && i4.current != n2.__e || B(i4, null, u4)), null != (i4 = n2.__c)) {
    if (i4.componentWillUnmount) try {
      i4.componentWillUnmount();
    } catch (n3) {
      l.__e(n3, u4);
    }
    i4.base = i4.__P = null;
  }
  if (i4 = n2.__k) for (r3 = 0; r3 < i4.length; r3++) i4[r3] && D(i4[r3], u4, t3 || "function" != typeof n2.type);
  t3 || g(n2.__e), n2.__c = n2.__ = n2.__e = void 0;
}
function E(n2, l3, u4) {
  return this.constructor(n2, u4);
}
function G(u4, t3, i4) {
  var r3, o3, e3, f4;
  t3 == document && (t3 = document.documentElement), l.__ && l.__(u4, t3), o3 = (r3 = "function" == typeof i4) ? null : i4 && i4.__k || t3.__k, e3 = [], f4 = [], O(t3, u4 = (!r3 && i4 || t3).__k = _(k, null, [u4]), o3 || p, p, t3.namespaceURI, !r3 && i4 ? [i4] : o3 ? null : t3.firstChild ? n.call(t3.childNodes) : null, e3, !r3 && i4 ? i4 : o3 ? o3.__e : t3.firstChild, r3, f4), N(e3, u4, f4);
}
function Q(n2) {
  function l3(n3) {
    var u4, t3;
    return this.getChildContext || (u4 = /* @__PURE__ */ new Set(), (t3 = {})[l3.__c] = this, this.getChildContext = function() {
      return t3;
    }, this.componentWillUnmount = function() {
      u4 = null;
    }, this.shouldComponentUpdate = function(n4) {
      this.props.value != n4.value && u4.forEach(function(n5) {
        n5.__e = true, M(n5);
      });
    }, this.sub = function(n4) {
      u4.add(n4);
      var l4 = n4.componentWillUnmount;
      n4.componentWillUnmount = function() {
        u4 && u4.delete(n4), l4 && l4.call(n4);
      };
    }), n3.children;
  }
  return l3.__c = "__cC" + h++, l3.__ = n2, l3.Provider = l3.__l = (l3.Consumer = function(n3, l4) {
    return n3.children(l4);
  }).contextType = l3, l3;
}
n = v.slice, l = { __e: function(n2, l3, u4, t3) {
  for (var i4, r3, o3; l3 = l3.__; ) if ((i4 = l3.__c) && !i4.__) try {
    if ((r3 = i4.constructor) && null != r3.getDerivedStateFromError && (i4.setState(r3.getDerivedStateFromError(n2)), o3 = i4.__d), null != i4.componentDidCatch && (i4.componentDidCatch(n2, t3 || {}), o3 = i4.__d), o3) return i4.__E = i4;
  } catch (l4) {
    n2 = l4;
  }
  throw n2;
} }, u = 0, t = function(n2) {
  return null != n2 && null == n2.constructor;
}, x.prototype.setState = function(n2, l3) {
  var u4;
  u4 = null != this.__s && this.__s != this.state ? this.__s : this.__s = d({}, this.state), "function" == typeof n2 && (n2 = n2(d({}, u4), this.props)), n2 && d(u4, n2), null != n2 && this.__v && (l3 && this._sb.push(l3), M(this));
}, x.prototype.forceUpdate = function(n2) {
  this.__v && (this.__e = true, n2 && this.__h.push(n2), M(this));
}, x.prototype.render = k, i = [], o = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, e = function(n2, l3) {
  return n2.__v.__b - l3.__v.__b;
}, $.__r = 0, f = /(PointerCapture)$|Capture$/i, c = 0, s = F(false), a = F(true), h = 0;

// src/utils/options.ts
function parseOptions(src) {
  const options = {};
  src.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^\s*([a-zA-Z_]+)\s*:\s*(.+)\s*$/);
    if (match) {
      options[match[1].trim()] = match[2].trim();
    }
  });
  return options;
}

// src/services/date-service.ts
var DateService = class {
  static momentAvailable() {
    if (this._momentAvailable === null) {
      this._momentAvailable = typeof window.moment !== "undefined";
      if (this._momentAvailable) {
        this._moment = window.moment;
      }
    }
    return this._momentAvailable;
  }
  static getMoment() {
    if (this._moment === null && this.momentAvailable()) {
      this._moment = window.moment;
    }
    return this._moment;
  }
  /**
   * Create a DateWrapper from a date string and format
   */
  static parse(dateStr, format) {
    const m3 = this.getMoment();
    if (m3) {
      const parsed = m3(dateStr, format, true);
      if (parsed.isValid()) {
        return this.wrapMoment(parsed);
      }
    }
    return this.wrapDate(this.parseNativeDate(dateStr, format));
  }
  /**
   * Create a DateWrapper from multiple possible formats
   */
  static parseMultiple(dateStr, formats) {
    const m3 = this.getMoment();
    if (m3) {
      const parsed = m3(dateStr, formats, true);
      if (parsed.isValid()) {
        return this.wrapMoment(parsed);
      }
    }
    for (const fmt of formats) {
      try {
        const date = this.parseNativeDate(dateStr, fmt);
        if (!isNaN(date.getTime())) {
          return this.wrapDate(date);
        }
      } catch {
      }
    }
    return this.now();
  }
  /**
   * Get current date/time
   */
  static now() {
    const m3 = this.getMoment();
    if (m3) {
      return this.wrapMoment(m3());
    }
    return this.wrapDate(/* @__PURE__ */ new Date());
  }
  /**
   * Create DateWrapper from native Date
   */
  static fromDate(date) {
    const m3 = this.getMoment();
    if (m3) {
      return this.wrapMoment(m3(date));
    }
    return this.wrapDate(new Date(date.getTime()));
  }
  /**
   * Format date to string
   */
  static format(date, format) {
    if (date instanceof Date) {
      return this.formatNativeDate(date, format);
    }
    return date.format(format);
  }
  /**
   * Add days to date
   */
  static addDays(date, days) {
    if (date instanceof Date) {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return this.wrapDate(result);
    }
    return date.clone().add(days, "days");
  }
  /**
   * Subtract days from date
   */
  static subtractDays(date, days) {
    if (date instanceof Date) {
      const result = new Date(date);
      result.setDate(result.getDate() - days);
      return this.wrapDate(result);
    }
    return date.clone().subtract(days, "days");
  }
  /**
   * Check if date is before another date
   */
  static isBefore(date, other) {
    const date1 = date instanceof Date ? this.wrapDate(date) : date;
    const date2 = other instanceof Date ? this.wrapDate(other) : other;
    return date1.isBefore(date2);
  }
  /**
   * Check if date is after another date
   */
  static isAfter(date, other) {
    const date1 = date instanceof Date ? this.wrapDate(date) : date;
    const date2 = other instanceof Date ? this.wrapDate(other) : other;
    return date1.isAfter(date2);
  }
  /**
   * Start of day
   */
  static startOfDay(date) {
    if (date instanceof Date) {
      const result = new Date(date);
      result.setHours(0, 0, 0, 0);
      return this.wrapDate(result);
    }
    return date.clone().startOf("day");
  }
  /**
   * Resolve date string to ISO format
   */
  static resolveDateIso(input, fmt) {
    if (!input || input.toLowerCase() === "today") {
      return this.format(this.now(), fmt);
    }
    const m3 = this.getMoment();
    if (m3) {
      const tryParse = m3(input, ["YYYY-MM-DD", "YYYY/MM/DD", "DD.MM.YYYY"], true);
      if (tryParse.isValid()) {
        return tryParse.format(fmt);
      }
      return m3().format(fmt);
    }
    const today = /* @__PURE__ */ new Date();
    const parsed = new Date(input);
    if (isNaN(parsed.getTime())) {
      return this.formatNativeDate(today, fmt);
    }
    return this.formatNativeDate(parsed, fmt);
  }
  // Private helper methods
  static wrapMoment(momentObj) {
    const m3 = this.getMoment();
    return {
      format: (fmt) => momentObj.format(fmt),
      date: () => momentObj.date(),
      month: () => momentObj.month() + 1,
      // moment uses 0-based, we use 1-based
      year: () => momentObj.year(),
      getDate: () => momentObj.date(),
      getMonth: () => momentObj.month(),
      getFullYear: () => momentObj.year(),
      getTime: () => momentObj.valueOf(),
      isBefore: (other) => {
        if (other instanceof Date) {
          return momentObj.isBefore(m3 ? m3(other) : other);
        }
        return momentObj.isBefore(other.toDate ? other.toDate() : other);
      },
      isAfter: (other) => {
        if (other instanceof Date) {
          return momentObj.isAfter(m3 ? m3(other) : other);
        }
        return momentObj.isAfter(other.toDate ? other.toDate() : other);
      },
      isValid: () => momentObj.isValid(),
      clone: () => this.wrapMoment(momentObj.clone()),
      add: (amount, unit) => {
        return this.wrapMoment(momentObj.clone().add(amount, unit));
      },
      subtract: (amount, unit) => {
        return this.wrapMoment(momentObj.clone().subtract(amount, unit));
      },
      startOf: (unit) => {
        return this.wrapMoment(momentObj.clone().startOf(unit));
      },
      toDate: () => momentObj.toDate()
    };
  }
  static wrapDate(date) {
    return {
      format: (fmt) => this.formatNativeDate(date, fmt),
      date: () => date.getDate(),
      month: () => date.getMonth() + 1,
      year: () => date.getFullYear(),
      getDate: () => date.getDate(),
      getMonth: () => date.getMonth(),
      getFullYear: () => date.getFullYear(),
      getTime: () => date.getTime(),
      isBefore: (other) => {
        const otherDate = other instanceof Date ? other : other.toDate();
        return date < otherDate;
      },
      isAfter: (other) => {
        const otherDate = other instanceof Date ? other : other.toDate();
        return date > otherDate;
      },
      isValid: () => !isNaN(date.getTime()),
      clone: () => this.wrapDate(new Date(date.getTime())),
      add: (amount, unit) => {
        const result = new Date(date);
        if (unit === "days") {
          result.setDate(result.getDate() + amount);
        } else if (unit === "months") {
          result.setMonth(result.getMonth() + amount);
        } else if (unit === "years") {
          result.setFullYear(result.getFullYear() + amount);
        }
        return this.wrapDate(result);
      },
      subtract: (amount, unit) => {
        const result = new Date(date);
        if (unit === "days") {
          result.setDate(result.getDate() - amount);
        } else if (unit === "months") {
          result.setMonth(result.getMonth() - amount);
        } else if (unit === "years") {
          result.setFullYear(result.getFullYear() - amount);
        }
        return this.wrapDate(result);
      },
      startOf: (unit) => {
        const result = new Date(date);
        if (unit === "day") {
          result.setHours(0, 0, 0, 0);
        } else if (unit === "month") {
          result.setDate(1);
          result.setHours(0, 0, 0, 0);
        } else if (unit === "year") {
          result.setMonth(0, 1);
          result.setHours(0, 0, 0, 0);
        }
        return this.wrapDate(result);
      },
      toDate: () => new Date(date.getTime())
    };
  }
  static parseNativeDate(dateStr, format) {
    if (format === "YYYY-MM-DD") {
      const parts = dateStr.split("-");
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        return new Date(year, month, day);
      }
    }
    return new Date(dateStr);
  }
  static formatNativeDate(date, format) {
    if (format === "YYYY-MM-DD") {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
    return date.toISOString().split("T")[0];
  }
};
// Cache moment availability check
DateService._momentAvailable = null;
DateService._moment = null;

// src/constants/index.ts
var MOBILE_BREAKPOINT = 768;
var MAX_DAYS_BACK = 3650;
var CACHE_TTL_MS = 5 * 60 * 1e3;
var MAX_CACHE_SIZE = 100;
var DEBOUNCE_DELAY_MS = 300;
var ANIMATION_DURATION_MS = 300;
var SCROLL_RESTORE_DELAY_2_MS = 100;
var IMMEDIATE_TIMEOUT_MS = 0;
var TrackerType = {
  GOOD_HABIT: "good-habit",
  BAD_HABIT: "bad-habit",
  NUMBER: "number",
  SCALE: "scale",
  PLUSMINUS: "plusminus",
  TEXT: "text"
};
var ViewMode = {
  CONTROL: "control",
  DISPLAY: "display"
};
var CSS_CLASSES = {
  // Main container
  TRACKER_NOTES: "tracker-notes",
  TRACKER_NOTES_HEADER: "tracker-notes__header",
  TRACKER_NOTES_HIERARCHY: "tracker-notes__hierarchy",
  // Tracker item
  TRACKER: "tracker-notes__tracker",
  TRACKER_HEADER: "tracker-notes__tracker-header",
  TRACKER_TITLE: "tracker-notes__tracker-title",
  TRACKER_CONTROLS: "tracker-notes__controls",
  SETTINGS_BTN: "tracker-notes__settings-btn",
  ORDER_BTN_CONTAINER: "tracker-notes__order-btns",
  ORDER_BTN_UP: "tracker-notes__order-btn-up",
  ORDER_BTN_DOWN: "tracker-notes__order-btn-down",
  // Controls
  ROW: "tracker-notes__row",
  VALUE: "tracker-notes__value",
  VALUE_UPDATED: "updated",
  // Text input
  TEXT_INPUT: "tracker-notes__text-input",
  // Scale/Progress bar
  PROGRESS_BAR_WRAPPER: "tracker-notes__progress-bar-wrapper",
  PROGRESS_BAR_INPUT: "tracker-notes__progress-bar-input",
  PROGRESS_BAR_PROGRESS: "tracker-notes__progress-bar-progress",
  PROGRESS_BAR_VALUE: "tracker-notes__progress-bar-value",
  PROGRESS_BAR_LABEL_LEFT: "tracker-notes__progress-bar-label-left",
  PROGRESS_BAR_LABEL_RIGHT: "tracker-notes__progress-bar-label-right",
  // Heatmap
  HEATMAP: "tracker-notes__heatmap",
  HEATMAP_DAY: "tracker-notes__heatmap-day",
  HEATMAP_DAY_HAS_VALUE: "has-value",
  HEATMAP_DAY_START: "start-day",
  // Calendar
  CALENDAR: "tracker-notes__calendar",
  CALENDAR_DAY: "tracker-notes__calendar-day",
  CALENDAR_DAY_HAS_VALUE: "has-value",
  CALENDAR_DAY_START: "start-day",
  // Visualizations
  CHART: "tracker-notes__chart",
  STATS: "tracker-notes__stats",
  // Date picker
  DATE_PICKER_CONTAINER: "tracker-notes__date-picker-container",
  DATE_PICKER: "tracker-notes__date-picker",
  DATE_INPUT: "tracker-notes__date-input",
  DATE_INPUT_UPDATING: "is-updating",
  DATE_NAV_BTN: "tracker-notes__date-nav-btn",
  DATE_NAV_BTN_LEFT: "tracker-notes__date-nav-btn-left",
  DATE_NAV_BTN_RIGHT: "tracker-notes__date-nav-btn-right",
  // Loading
  LOADING: "tracker-notes__loading",
  LOADING_ACTIVE: "is-active",
  LOADING_DOT: "tracker-notes__loading-dot",
  // Folder structure
  FOLDER_NODE: "tracker-notes__folder-node",
  FOLDER_HEADER: "tracker-notes__folder-header",
  TRACKERS_CONTAINER: "tracker-notes__trackers",
  // Messages
  ERROR: "tracker-notes__error",
  SUCCESS: "tracker-notes__success",
  // Limit indicators
  LIMIT_ERROR: "tracker-notes__limit-error",
  LIMIT_SUCCESS: "tracker-notes__limit-success"
};
var CSS_VARIABLES = {
  // Colors
  INTERACTIVE_ACCENT: "--interactive-accent",
  COLOR_ACCENT: "--color-accent",
  ACCENT_COLOR: "--accent-color",
  TEXT_MUTED: "--text-muted",
  TEXT_FAINT: "--text-faint",
  TEXT_NORMAL: "--text-normal",
  TEXT_ERROR: "--text-error",
  TEXT_SUCCESS: "--text-success",
  TEXT_ACCENT: "--text-accent",
  TEXT_ON_ACCENT: "--text-on-accent",
  // Backgrounds
  BACKGROUND_PRIMARY: "--background-primary",
  BACKGROUND_SECONDARY: "--background-secondary",
  BACKGROUND_MODIFIER_BORDER: "--background-modifier-border",
  BACKGROUND_MODIFIER_BORDER_HOVER: "--background-modifier-border-hover",
  BACKGROUND_MODIFIER_BORDER_FOCUS: "--background-modifier-border-focus",
  // Interactive
  INTERACTIVE_NORMAL: "--interactive-normal",
  INTERACTIVE_HOVER: "--interactive-hover",
  INTERACTIVE_ACCENT_HOVER: "--interactive-accent-hover",
  // Fonts
  FONT_TEXT: "--font-text",
  FONT_UI_SMALL: "--font-ui-small"
};
var FALLBACK_COLORS = {
  ACCENT: "#7f6df2",
  TEXT_MUTED: "#999999",
  TEXT_FAINT: "#666666",
  TEXT_ERROR: "#c00000",
  TEXT_SUCCESS: "#00c000",
  BORDER: "#e0e0e0",
  BG_PRIMARY: "#ffffff"
};
var CHART_CONFIG = {
  DEFAULT_HEIGHT: 200,
  CANVAS_HEIGHT: 180,
  POINT_RADIUS: 3,
  POINT_BORDER_WIDTH: 2,
  POINT_HOVER_RADIUS: 5,
  POINT_HIT_RADIUS: 10,
  BORDER_WIDTH: 2.5,
  LINE_TENSION: 0.4,
  MAX_TICKS_LIMIT: 10,
  GRID_LINE_WIDTH: 1,
  FONT_SIZE_SMALL: 11,
  FUTURE_DAYS_OFFSET: 5,
  // Show 5 days ahead in chart
  GRADIENT_HEIGHT: 180,
  OPACITY_LIGHT: 0.25,
  OPACITY_DARK: 0.1,
  OPACITY_MEDIUM: 0.3,
  PADDING_FACTOR: 0.1,
  LINE_WIDTH: 2
};
var DATE_FORMATS = {
  ISO: "YYYY-MM-DD",
  ISO_SLASH: "YYYY/MM/DD",
  EU: "DD.MM.YYYY",
  DISPLAY_SHORT: "D MMM"
};
var ERROR_MESSAGES = {
  NO_TRACKERS: "no trackers found in folder",
  NO_FRONTMATTER: "Frontmatter not found",
  ENTER_NAME: "Enter name",
  CREATE_ERROR: "Error creating tracker",
  UPDATE_ERROR: "Error updating tracker",
  WRITE_ERROR: "Write error",
  READ_ERROR: "Read error",
  RENDER_ERROR: "error processing block"
};
var SUCCESS_MESSAGES = {
  TRACKER_CREATED: "Tracker created",
  TRACKER_UPDATED: "Tracker updated",
  TRACKER_DELETED: "Tracker deleted",
  VALUE_SAVED: "\u2713 Saved"
};
var PLACEHOLDERS = {
  TRACKER_NAME: "e.g., Morning workout",
  UNIT: "Default: none",
  TEXT_INPUT: "Enter text...",
  NUMBER_INPUT: "0",
  LIMIT_NONE: "Default: none"
};
var TRACKER_TYPE_LABELS = {
  [TrackerType.GOOD_HABIT]: "Good habit",
  [TrackerType.BAD_HABIT]: "Bad habit",
  [TrackerType.NUMBER]: "Number",
  [TrackerType.SCALE]: "Scale",
  [TrackerType.PLUSMINUS]: "Counter (+/-)",
  [TrackerType.TEXT]: "Text"
};
var MODAL_LABELS = {
  CREATE_TRACKER: "Create new tracker",
  EDIT_TRACKER: "Edit tracker",
  NAME: "Name",
  PATH: "Path",
  TYPE: "Type",
  PARAMETERS: "Parameters",
  UNIT: "Unit",
  STEP: "Step",
  VALUE_FROM: 'Value "from"',
  VALUE_TO: 'Value "to"',
  LIMITS: "Success limits",
  LOWER_LIMIT: "Lower limit",
  UPPER_LIMIT: "Upper limit",
  CREATE: "Create",
  SAVE: "Save",
  DELETE: "Delete",
  DELETE_CONFIRM_TITLE: "Delete tracker?",
  DELETE_CONFIRM_MESSAGE: 'Are you sure you want to delete tracker "{name}"? This action cannot be undone.',
  CANCEL: "Cancel",
  HABITS_GROUP: "Habits",
  METRICS_GROUP: "Metrics",
  START_DATE: "Tracking start date",
  LIMITS_DESCRIPTION: "Optionally, you can make the metric limiting and set desired threshold values, they will be displayed on the chart. If the value does not fall within the specified range, you will see a color response.",
  ROOT_FOLDER: "/ (root folder)",
  NO_TRACKERS_FOUND: "No trackers found",
  SELECT_TRACKER: "Select tracker",
  YESTERDAY: "Yesterday",
  TOMORROW: "Tomorrow",
  UPDATING: "Updating\u2026",
  MOVE_UP: "Move up",
  MOVE_DOWN: "Move down",
  TRACKER_SETTINGS: "Tracker settings",
  UPPER_LIMIT_MUST_BE_GREATER: "Upper limit must be greater than lower limit",
  ENTER_NAME: "Enter name",
  TRACKER_UPDATED: "Tracker updated",
  WARNING_RECORDS_BEFORE_DATE: "Warning: found {count} {records} BEFORE date {date}, which will be deleted when saving.",
  RECORD_SINGULAR: "record",
  RECORDS_PLURAL: "records"
};
var DEFAULTS = {
  STEP: 1,
  MIN_VALUE: 0,
  MAX_VALUE: 10,
  TEXT_UNIT: "words"
};
var UI_CONSTANTS = {
  FONT_WEIGHT_BOLD: "600",
  TRANSITION_OPACITY_DURATION_MS: 200
};
var STATS_LABELS = {
  TOTAL_RECORDS: "Total records",
  LAST_DAYS: "Sum",
  CURRENT_STREAK: "Current streak",
  DAYS_SINGULAR: "day",
  DAYS_PLURAL_2_4: "days",
  DAYS_PLURAL_5_PLUS: "days",
  AVERAGE: "Average",
  MIN: "Min",
  MAX: "Max",
  MEDIAN: "Median",
  COMPLETION_RATE: "Completed",
  ACTIVE_DAYS: "Active days",
  BEST_STREAK: "Best streak"
};

// node_modules/preact/hooks/dist/hooks.module.js
var t2;
var r2;
var u2;
var i2;
var o2 = 0;
var f2 = [];
var c2 = l;
var e2 = c2.__b;
var a2 = c2.__r;
var v2 = c2.diffed;
var l2 = c2.__c;
var m2 = c2.unmount;
var s2 = c2.__;
function p2(n2, t3) {
  c2.__h && c2.__h(r2, n2, o2 || t3), o2 = 0;
  var u4 = r2.__H || (r2.__H = { __: [], __h: [] });
  return n2 >= u4.__.length && u4.__.push({}), u4.__[n2];
}
function d2(n2) {
  return o2 = 1, h2(D2, n2);
}
function h2(n2, u4, i4) {
  var o3 = p2(t2++, 2);
  if (o3.t = n2, !o3.__c && (o3.__ = [i4 ? i4(u4) : D2(void 0, u4), function(n3) {
    var t3 = o3.__N ? o3.__N[0] : o3.__[0], r3 = o3.t(t3, n3);
    t3 !== r3 && (o3.__N = [r3, o3.__[1]], o3.__c.setState({}));
  }], o3.__c = r2, !r2.__f)) {
    var f4 = function(n3, t3, r3) {
      if (!o3.__c.__H) return true;
      var u5 = o3.__c.__H.__.filter(function(n4) {
        return !!n4.__c;
      });
      if (u5.every(function(n4) {
        return !n4.__N;
      })) return !c3 || c3.call(this, n3, t3, r3);
      var i5 = o3.__c.props !== n3;
      return u5.forEach(function(n4) {
        if (n4.__N) {
          var t4 = n4.__[0];
          n4.__ = n4.__N, n4.__N = void 0, t4 !== n4.__[0] && (i5 = true);
        }
      }), c3 && c3.call(this, n3, t3, r3) || i5;
    };
    r2.__f = true;
    var c3 = r2.shouldComponentUpdate, e3 = r2.componentWillUpdate;
    r2.componentWillUpdate = function(n3, t3, r3) {
      if (this.__e) {
        var u5 = c3;
        c3 = void 0, f4(n3, t3, r3), c3 = u5;
      }
      e3 && e3.call(this, n3, t3, r3);
    }, r2.shouldComponentUpdate = f4;
  }
  return o3.__N || o3.__;
}
function y2(n2, u4) {
  var i4 = p2(t2++, 3);
  !c2.__s && C2(i4.__H, u4) && (i4.__ = n2, i4.u = u4, r2.__H.__h.push(i4));
}
function A2(n2) {
  return o2 = 5, T2(function() {
    return { current: n2 };
  }, []);
}
function T2(n2, r3) {
  var u4 = p2(t2++, 7);
  return C2(u4.__H, r3) && (u4.__ = n2(), u4.__H = r3, u4.__h = n2), u4.__;
}
function q2(n2, t3) {
  return o2 = 8, T2(function() {
    return n2;
  }, t3);
}
function x2(n2) {
  var u4 = r2.context[n2.__c], i4 = p2(t2++, 9);
  return i4.c = n2, u4 ? (null == i4.__ && (i4.__ = true, u4.sub(r2)), u4.props.value) : n2.__;
}
function j2() {
  for (var n2; n2 = f2.shift(); ) if (n2.__P && n2.__H) try {
    n2.__H.__h.forEach(z2), n2.__H.__h.forEach(B2), n2.__H.__h = [];
  } catch (t3) {
    n2.__H.__h = [], c2.__e(t3, n2.__v);
  }
}
c2.__b = function(n2) {
  r2 = null, e2 && e2(n2);
}, c2.__ = function(n2, t3) {
  n2 && t3.__k && t3.__k.__m && (n2.__m = t3.__k.__m), s2 && s2(n2, t3);
}, c2.__r = function(n2) {
  a2 && a2(n2), t2 = 0;
  var i4 = (r2 = n2.__c).__H;
  i4 && (u2 === r2 ? (i4.__h = [], r2.__h = [], i4.__.forEach(function(n3) {
    n3.__N && (n3.__ = n3.__N), n3.u = n3.__N = void 0;
  })) : (i4.__h.forEach(z2), i4.__h.forEach(B2), i4.__h = [], t2 = 0)), u2 = r2;
}, c2.diffed = function(n2) {
  v2 && v2(n2);
  var t3 = n2.__c;
  t3 && t3.__H && (t3.__H.__h.length && (1 !== f2.push(t3) && i2 === c2.requestAnimationFrame || ((i2 = c2.requestAnimationFrame) || w2)(j2)), t3.__H.__.forEach(function(n3) {
    n3.u && (n3.__H = n3.u), n3.u = void 0;
  })), u2 = r2 = null;
}, c2.__c = function(n2, t3) {
  t3.some(function(n3) {
    try {
      n3.__h.forEach(z2), n3.__h = n3.__h.filter(function(n4) {
        return !n4.__ || B2(n4);
      });
    } catch (r3) {
      t3.some(function(n4) {
        n4.__h && (n4.__h = []);
      }), t3 = [], c2.__e(r3, n3.__v);
    }
  }), l2 && l2(n2, t3);
}, c2.unmount = function(n2) {
  m2 && m2(n2);
  var t3, r3 = n2.__c;
  r3 && r3.__H && (r3.__H.__.forEach(function(n3) {
    try {
      z2(n3);
    } catch (n4) {
      t3 = n4;
    }
  }), r3.__H = void 0, t3 && c2.__e(t3, r3.__v));
};
var k2 = "function" == typeof requestAnimationFrame;
function w2(n2) {
  var t3, r3 = function() {
    clearTimeout(u4), k2 && cancelAnimationFrame(t3), setTimeout(n2);
  }, u4 = setTimeout(r3, 35);
  k2 && (t3 = requestAnimationFrame(r3));
}
function z2(n2) {
  var t3 = r2, u4 = n2.__c;
  "function" == typeof u4 && (n2.__c = void 0, u4()), r2 = t3;
}
function B2(n2) {
  var t3 = r2;
  n2.__c = n2.__(), r2 = t3;
}
function C2(n2, t3) {
  return !n2 || n2.length !== t3.length || t3.some(function(t4, r3) {
    return t4 !== n2[r3];
  });
}
function D2(n2, t3) {
  return "function" == typeof t3 ? t3(n2) : t3;
}

// src/components/TrackerContext.tsx
var TrackerContext = Q(null);
function useTrackerContext() {
  const context = x2(TrackerContext);
  if (!context) {
    throw new Error("useTrackerContext must be used within TrackerContext.Provider");
  }
  return context;
}

// node_modules/preact/jsx-runtime/dist/jsxRuntime.module.js
var f3 = 0;
var i3 = Array.isArray;
function u3(e3, t3, n2, o3, i4, u4) {
  t3 || (t3 = {});
  var a3, c3, p3 = t3;
  if ("ref" in p3) for (c3 in p3 = {}, t3) "ref" == c3 ? a3 = t3[c3] : p3[c3] = t3[c3];
  var l3 = { type: e3, props: p3, key: n2, ref: a3, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --f3, __i: -1, __u: 0, __source: i4, __self: u4 };
  if ("function" == typeof e3 && (a3 = e3.defaultProps)) for (c3 in a3) void 0 === p3[c3] && (p3[c3] = a3[c3]);
  return l.vnode && l.vnode(l3), l3;
}

// src/components/TrackerBlock/DatePicker.tsx
function DatePicker({ dateIso, onDateChange, onNavigate, isUpdating }) {
  const handleInputChange = q2((e3) => {
    const target = e3.target;
    onDateChange(target.value);
  }, [onDateChange]);
  const handlePrevDay = q2(() => {
    onNavigate(-1);
  }, [onNavigate]);
  const handleNextDay = q2(() => {
    onNavigate(1);
  }, [onNavigate]);
  return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.DATE_PICKER_CONTAINER, children: /* @__PURE__ */ u3("div", { class: CSS_CLASSES.DATE_PICKER, children: [
    /* @__PURE__ */ u3(
      "button",
      {
        type: "button",
        class: `${CSS_CLASSES.DATE_NAV_BTN} ${CSS_CLASSES.DATE_NAV_BTN_LEFT}`,
        onClick: handlePrevDay,
        disabled: isUpdating,
        title: MODAL_LABELS.YESTERDAY,
        children: "\u25C0"
      }
    ),
    /* @__PURE__ */ u3(
      "input",
      {
        type: "date",
        class: `${CSS_CLASSES.DATE_INPUT}${isUpdating ? ` ${CSS_CLASSES.DATE_INPUT_UPDATING}` : ""}`,
        value: dateIso,
        onChange: handleInputChange,
        disabled: isUpdating
      }
    ),
    /* @__PURE__ */ u3(
      "button",
      {
        type: "button",
        class: `${CSS_CLASSES.DATE_NAV_BTN} ${CSS_CLASSES.DATE_NAV_BTN_RIGHT}`,
        onClick: handleNextDay,
        disabled: isUpdating,
        title: MODAL_LABELS.TOMORROW,
        children: "\u25B6"
      }
    )
  ] }) });
}

// src/components/TrackerBlock/LoadingIndicator.tsx
function LoadingIndicator({ isActive }) {
  return /* @__PURE__ */ u3("div", { class: `${CSS_CLASSES.LOADING}${isActive ? ` ${CSS_CLASSES.LOADING_ACTIVE}` : ""}`, children: [
    /* @__PURE__ */ u3("div", { class: CSS_CLASSES.LOADING_DOT }),
    /* @__PURE__ */ u3("span", { children: MODAL_LABELS.UPDATING })
  ] });
}

// node_modules/preact/compat/dist/compat.module.js
function g3(n2, t3) {
  for (var e3 in t3) n2[e3] = t3[e3];
  return n2;
}
function E2(n2, t3) {
  for (var e3 in n2) if ("__source" !== e3 && !(e3 in t3)) return true;
  for (var r3 in t3) if ("__source" !== r3 && n2[r3] !== t3[r3]) return true;
  return false;
}
function N2(n2, t3) {
  this.props = n2, this.context = t3;
}
function M2(n2, e3) {
  function r3(n3) {
    var t3 = this.props.ref, r4 = t3 == n3.ref;
    return !r4 && t3 && (t3.call ? t3(null) : t3.current = null), e3 ? !e3(this.props, n3) || !r4 : E2(this.props, n3);
  }
  function u4(e4) {
    return this.shouldComponentUpdate = r3, _(n2, e4);
  }
  return u4.displayName = "Memo(" + (n2.displayName || n2.name) + ")", u4.prototype.isReactComponent = true, u4.__f = true, u4.type = n2, u4;
}
(N2.prototype = new x()).isPureReactComponent = true, N2.prototype.shouldComponentUpdate = function(n2, t3) {
  return E2(this.props, n2) || E2(this.state, t3);
};
var T3 = l.__b;
l.__b = function(n2) {
  n2.type && n2.type.__f && n2.ref && (n2.props.ref = n2.ref, n2.ref = null), T3 && T3(n2);
};
var A3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
var F3 = l.__e;
l.__e = function(n2, t3, e3, r3) {
  if (n2.then) {
    for (var u4, o3 = t3; o3 = o3.__; ) if ((u4 = o3.__c) && u4.__c) return null == t3.__e && (t3.__e = e3.__e, t3.__k = e3.__k), u4.__c(n2, t3);
  }
  F3(n2, t3, e3, r3);
};
var U = l.unmount;
function V2(n2, t3, e3) {
  return n2 && (n2.__c && n2.__c.__H && (n2.__c.__H.__.forEach(function(n3) {
    "function" == typeof n3.__c && n3.__c();
  }), n2.__c.__H = null), null != (n2 = g3({}, n2)).__c && (n2.__c.__P === e3 && (n2.__c.__P = t3), n2.__c.__e = true, n2.__c = null), n2.__k = n2.__k && n2.__k.map(function(n3) {
    return V2(n3, t3, e3);
  })), n2;
}
function W(n2, t3, e3) {
  return n2 && e3 && (n2.__v = null, n2.__k = n2.__k && n2.__k.map(function(n3) {
    return W(n3, t3, e3);
  }), n2.__c && n2.__c.__P === t3 && (n2.__e && e3.appendChild(n2.__e), n2.__c.__e = true, n2.__c.__P = e3)), n2;
}
function P3() {
  this.__u = 0, this.o = null, this.__b = null;
}
function j3(n2) {
  var t3 = n2.__.__c;
  return t3 && t3.__a && t3.__a(n2);
}
function B3() {
  this.i = null, this.l = null;
}
l.unmount = function(n2) {
  var t3 = n2.__c;
  t3 && t3.__R && t3.__R(), t3 && 32 & n2.__u && (n2.type = null), U && U(n2);
}, (P3.prototype = new x()).__c = function(n2, t3) {
  var e3 = t3.__c, r3 = this;
  null == r3.o && (r3.o = []), r3.o.push(e3);
  var u4 = j3(r3.__v), o3 = false, i4 = function() {
    o3 || (o3 = true, e3.__R = null, u4 ? u4(l3) : l3());
  };
  e3.__R = i4;
  var l3 = function() {
    if (!--r3.__u) {
      if (r3.state.__a) {
        var n3 = r3.state.__a;
        r3.__v.__k[0] = W(n3, n3.__c.__P, n3.__c.__O);
      }
      var t4;
      for (r3.setState({ __a: r3.__b = null }); t4 = r3.o.pop(); ) t4.forceUpdate();
    }
  };
  r3.__u++ || 32 & t3.__u || r3.setState({ __a: r3.__b = r3.__v.__k[0] }), n2.then(i4, i4);
}, P3.prototype.componentWillUnmount = function() {
  this.o = [];
}, P3.prototype.render = function(n2, e3) {
  if (this.__b) {
    if (this.__v.__k) {
      var r3 = document.createElement("div"), o3 = this.__v.__k[0].__c;
      this.__v.__k[0] = V2(this.__b, r3, o3.__O = o3.__P);
    }
    this.__b = null;
  }
  var i4 = e3.__a && _(k, null, n2.fallback);
  return i4 && (i4.__u &= -33), [_(k, null, e3.__a ? null : n2.children), i4];
};
var H2 = function(n2, t3, e3) {
  if (++e3[1] === e3[0] && n2.l.delete(t3), n2.props.revealOrder && ("t" !== n2.props.revealOrder[0] || !n2.l.size)) for (e3 = n2.i; e3; ) {
    for (; e3.length > 3; ) e3.pop()();
    if (e3[1] < e3[0]) break;
    n2.i = e3 = e3[2];
  }
};
(B3.prototype = new x()).__a = function(n2) {
  var t3 = this, e3 = j3(t3.__v), r3 = t3.l.get(n2);
  return r3[0]++, function(u4) {
    var o3 = function() {
      t3.props.revealOrder ? (r3.push(u4), H2(t3, n2, r3)) : u4();
    };
    e3 ? e3(o3) : o3();
  };
}, B3.prototype.render = function(n2) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var t3 = H(n2.children);
  n2.revealOrder && "b" === n2.revealOrder[0] && t3.reverse();
  for (var e3 = t3.length; e3--; ) this.l.set(t3[e3], this.i = [1, 0, this.i]);
  return n2.children;
}, B3.prototype.componentDidUpdate = B3.prototype.componentDidMount = function() {
  var n2 = this;
  this.l.forEach(function(t3, e3) {
    H2(n2, e3, t3);
  });
};
var q3 = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
var G2 = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;
var J2 = /^on(Ani|Tra|Tou|BeforeInp|Compo)/;
var K2 = /[A-Z0-9]/g;
var Q2 = "undefined" != typeof document;
var X = function(n2) {
  return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(n2);
};
x.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(t3) {
  Object.defineProperty(x.prototype, t3, { configurable: true, get: function() {
    return this["UNSAFE_" + t3];
  }, set: function(n2) {
    Object.defineProperty(this, t3, { configurable: true, writable: true, value: n2 });
  } });
});
var en = l.event;
function rn() {
}
function un() {
  return this.cancelBubble;
}
function on() {
  return this.defaultPrevented;
}
l.event = function(n2) {
  return en && (n2 = en(n2)), n2.persist = rn, n2.isPropagationStopped = un, n2.isDefaultPrevented = on, n2.nativeEvent = n2;
};
var ln;
var cn = { enumerable: false, configurable: true, get: function() {
  return this.class;
} };
var fn = l.vnode;
l.vnode = function(n2) {
  "string" == typeof n2.type && function(n3) {
    var t3 = n3.props, e3 = n3.type, u4 = {}, o3 = -1 === e3.indexOf("-");
    for (var i4 in t3) {
      var l3 = t3[i4];
      if (!("value" === i4 && "defaultValue" in t3 && null == l3 || Q2 && "children" === i4 && "noscript" === e3 || "class" === i4 || "className" === i4)) {
        var c3 = i4.toLowerCase();
        "defaultValue" === i4 && "value" in t3 && null == t3.value ? i4 = "value" : "download" === i4 && true === l3 ? l3 = "" : "translate" === c3 && "no" === l3 ? l3 = false : "o" === c3[0] && "n" === c3[1] ? "ondoubleclick" === c3 ? i4 = "ondblclick" : "onchange" !== c3 || "input" !== e3 && "textarea" !== e3 || X(t3.type) ? "onfocus" === c3 ? i4 = "onfocusin" : "onblur" === c3 ? i4 = "onfocusout" : J2.test(i4) && (i4 = c3) : c3 = i4 = "oninput" : o3 && G2.test(i4) ? i4 = i4.replace(K2, "-$&").toLowerCase() : null === l3 && (l3 = void 0), "oninput" === c3 && u4[i4 = c3] && (i4 = "oninputCapture"), u4[i4] = l3;
      }
    }
    "select" == e3 && u4.multiple && Array.isArray(u4.value) && (u4.value = H(t3.children).forEach(function(n4) {
      n4.props.selected = -1 != u4.value.indexOf(n4.props.value);
    })), "select" == e3 && null != u4.defaultValue && (u4.value = H(t3.children).forEach(function(n4) {
      n4.props.selected = u4.multiple ? -1 != u4.defaultValue.indexOf(n4.props.value) : u4.defaultValue == n4.props.value;
    })), t3.class && !t3.className ? (u4.class = t3.class, Object.defineProperty(u4, "className", cn)) : (t3.className && !t3.class || t3.class && t3.className) && (u4.class = u4.className = t3.className), n3.props = u4;
  }(n2), n2.$$typeof = q3, fn && fn(n2);
};
var an = l.__r;
l.__r = function(n2) {
  an && an(n2), ln = n2.__c;
};
var sn = l.diffed;
l.diffed = function(n2) {
  sn && sn(n2);
  var t3 = n2.props, e3 = n2.__e;
  null != e3 && "textarea" === n2.type && "value" in t3 && t3.value !== e3.value && (e3.value = null == t3.value ? "" : t3.value), ln = null;
};

// src/utils/path.ts
function normalizePath(path) {
  if (!path) return "";
  return path.trim().replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\/+/, "").replace(/\/$/, "");
}

// src/components/TrackerItem/TrackerHeader.tsx
function TrackerHeader({
  file,
  displayName,
  plugin,
  onEdit,
  onMoveUp,
  onMoveDown,
  limitProgress
}) {
  const headerRef = A2(null);
  const iconContainerRef = A2(null);
  y2(() => {
    if (iconContainerRef.current) {
      const trackerIcon = plugin.getIconForPath(file.path, true);
      if (trackerIcon) {
        iconContainerRef.current.innerHTML = "";
        plugin.renderIcon(trackerIcon, iconContainerRef.current);
      }
    }
  }, [plugin, file.path]);
  y2(() => {
    if (headerRef.current) {
      if (limitProgress) {
        headerRef.current.style.setProperty("--limit-progress-width", limitProgress.width);
        headerRef.current.style.setProperty("--limit-progress-color", limitProgress.color);
      } else {
        headerRef.current.style.setProperty("--limit-progress-width", "0%");
        headerRef.current.style.setProperty("--limit-progress-color", "transparent");
      }
    }
  }, [limitProgress]);
  const handleTitleClick = q2((e3) => {
    e3.preventDefault();
    e3.stopPropagation();
    plugin.app.workspace.openLinkText(file.path, "", false);
  }, [plugin, file.path]);
  return /* @__PURE__ */ u3("div", { ref: headerRef, class: CSS_CLASSES.TRACKER_HEADER, children: [
    /* @__PURE__ */ u3("div", { class: CSS_CLASSES.TRACKER_TITLE, children: [
      /* @__PURE__ */ u3("span", { ref: iconContainerRef, class: "tracker-notes__tracker-icon" }),
      /* @__PURE__ */ u3(
        "a",
        {
          class: "internal-link",
          href: file.path,
          "data-href": file.path,
          onClick: handleTitleClick,
          children: displayName
        }
      )
    ] }),
    (onMoveUp || onMoveDown) && /* @__PURE__ */ u3("div", { class: CSS_CLASSES.ORDER_BTN_CONTAINER, children: [
      onMoveUp && /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          class: CSS_CLASSES.ORDER_BTN_UP,
          onClick: onMoveUp,
          title: MODAL_LABELS.MOVE_UP,
          children: "\u2191"
        }
      ),
      onMoveDown && /* @__PURE__ */ u3(
        "button",
        {
          type: "button",
          class: CSS_CLASSES.ORDER_BTN_DOWN,
          onClick: onMoveDown,
          title: MODAL_LABELS.MOVE_DOWN,
          children: "\u2193"
        }
      )
    ] }),
    onEdit && /* @__PURE__ */ u3(
      "button",
      {
        type: "button",
        class: CSS_CLASSES.SETTINGS_BTN,
        onClick: onEdit,
        title: MODAL_LABELS.TRACKER_SETTINGS,
        children: "\u2699\uFE0F"
      }
    )
  ] });
}

// src/components/controls/NumberControl.tsx
function NumberControl({ file, dateIso, plugin, fileOptions, entries, onValueChange }) {
  const currentValue = entries.get(dateIso);
  const initialValue = currentValue != null && !isNaN(Number(currentValue)) ? String(currentValue) : "";
  const [inputValue, setInputValue] = d2(initialValue);
  const inputRef = A2(null);
  const debounceRef = A2(null);
  y2(() => {
    const newValue = entries.get(dateIso);
    const newInputValue = newValue != null && !isNaN(Number(newValue)) ? String(newValue) : "";
    setInputValue(newInputValue);
  }, [entries, dateIso]);
  const writeValue = q2(async (value, immediate = false) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    if (value === "" || value.trim() === "") {
      const doDelete = async () => {
        try {
          await plugin.deleteEntry(file, dateIso);
          await onValueChange();
        } catch (err) {
          console.error("NumberControl: delete error", err);
        }
      };
      if (immediate) {
        await doDelete();
      } else {
        debounceRef.current = setTimeout(doDelete, DEBOUNCE_DELAY_MS);
      }
      return;
    }
    const numVal = Number(value);
    if (isNaN(numVal)) return;
    const doWrite = async () => {
      try {
        await plugin.writeLogLine(file, dateIso, String(numVal));
        await onValueChange();
      } catch (err) {
        console.error("NumberControl: write error", err);
      }
    };
    if (immediate) {
      await doWrite();
    } else {
      debounceRef.current = setTimeout(doWrite, DEBOUNCE_DELAY_MS);
    }
  }, [plugin, file, dateIso, onValueChange]);
  const handleChange = q2((e3) => {
    const target = e3.target;
    setInputValue(target.value);
    writeValue(target.value, false);
    if (inputRef.current) {
      inputRef.current.style.transform = "scale(0.98)";
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.style.transform = "";
        }
      }, ANIMATION_DURATION_MS);
    }
  }, [writeValue]);
  const handleKeyPress = q2((e3) => {
    if (e3.key === "Enter") {
      writeValue(inputValue, true);
    }
  }, [inputValue, writeValue]);
  const handleBlur = q2(() => {
    writeValue(inputValue, true);
  }, [inputValue, writeValue]);
  return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.ROW, children: /* @__PURE__ */ u3(
    "input",
    {
      ref: inputRef,
      type: "number",
      placeholder: "0",
      value: inputValue,
      onInput: handleChange,
      onKeyPress: handleKeyPress,
      onBlur: handleBlur
    }
  ) });
}

// src/components/controls/PlusMinusControl.tsx
function PlusMinusControl({ file, dateIso, plugin, fileOptions, entries, onValueChange }) {
  const step = parseFloat(fileOptions.step || String(DEFAULTS.STEP)) || DEFAULTS.STEP;
  const currentValue = entries.get(dateIso);
  const initialValue = currentValue != null && !isNaN(Number(currentValue)) ? Number(currentValue) : 0;
  const [value, setValue] = d2(initialValue);
  const [isUpdated, setIsUpdated] = d2(false);
  const valueRef = A2(null);
  y2(() => {
    const newValue = entries.get(dateIso);
    const newNumValue = newValue != null && !isNaN(Number(newValue)) ? Number(newValue) : 0;
    setValue(newNumValue);
  }, [entries, dateIso]);
  const writeValue = q2(async (newValue) => {
    try {
      await plugin.writeLogLine(file, dateIso, String(newValue));
      await onValueChange();
    } catch (err) {
      console.error("PlusMinusControl: write error", err);
    }
  }, [plugin, file, dateIso, onValueChange]);
  const handleMinus = q2(async () => {
    const newValue = (Number.isFinite(value) ? value : 0) - step;
    setValue(newValue);
    setIsUpdated(true);
    await writeValue(newValue);
    setTimeout(() => setIsUpdated(false), ANIMATION_DURATION_MS);
  }, [value, step, writeValue]);
  const handlePlus = q2(async () => {
    const newValue = (Number.isFinite(value) ? value : 0) + step;
    setValue(newValue);
    setIsUpdated(true);
    await writeValue(newValue);
    setTimeout(() => setIsUpdated(false), ANIMATION_DURATION_MS);
  }, [value, step, writeValue]);
  return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.ROW, children: [
    /* @__PURE__ */ u3("button", { type: "button", onClick: handleMinus, children: "\u2212" }),
    /* @__PURE__ */ u3(
      "span",
      {
        ref: valueRef,
        class: `${CSS_CLASSES.VALUE}${isUpdated ? ` ${CSS_CLASSES.VALUE_UPDATED}` : ""}`,
        children: value
      }
    ),
    /* @__PURE__ */ u3("button", { type: "button", onClick: handlePlus, children: "+" })
  ] });
}

// src/components/controls/TextControl.tsx
function TextControl({ file, dateIso, plugin, fileOptions, entries, onValueChange }) {
  const currentValue = entries.get(dateIso);
  const initialValue = currentValue != null && typeof currentValue === "string" ? currentValue : "";
  const [inputValue, setInputValue] = d2(initialValue);
  const buttonRef = A2(null);
  y2(() => {
    const newValue = entries.get(dateIso);
    const newInputValue = newValue != null && typeof newValue === "string" ? newValue : "";
    setInputValue(newInputValue);
  }, [entries, dateIso]);
  const handleChange = q2((e3) => {
    const target = e3.target;
    setInputValue(target.value);
  }, []);
  const handleSave = q2(async () => {
    try {
      const val = inputValue.trim();
      await plugin.writeLogLine(file, dateIso, val);
      await onValueChange();
      if (buttonRef.current) {
        buttonRef.current.style.transform = "scale(0.95)";
        setTimeout(() => {
          if (buttonRef.current) {
            buttonRef.current.style.transform = "";
          }
        }, ANIMATION_DURATION_MS);
      }
    } catch (err) {
      console.error("TextControl: write error", err);
    }
  }, [plugin, file, dateIso, inputValue, onValueChange]);
  return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.ROW, children: [
    /* @__PURE__ */ u3(
      "textarea",
      {
        class: CSS_CLASSES.TEXT_INPUT,
        placeholder: PLACEHOLDERS.TEXT_INPUT,
        value: inputValue,
        onInput: handleChange
      }
    ),
    /* @__PURE__ */ u3("button", { ref: buttonRef, type: "button", onClick: handleSave, children: MODAL_LABELS.SAVE })
  ] });
}

// src/components/controls/ScaleControl.tsx
function ScaleControl({ file, dateIso, plugin, fileOptions, entries, onValueChange }) {
  const minValue = parseFloat(fileOptions.minValue || String(DEFAULTS.MIN_VALUE)) || DEFAULTS.MIN_VALUE;
  const maxValue = parseFloat(fileOptions.maxValue || String(DEFAULTS.MAX_VALUE)) || DEFAULTS.MAX_VALUE;
  const step = parseFloat(fileOptions.step || String(DEFAULTS.STEP)) || DEFAULTS.STEP;
  const currentValue = entries.get(dateIso);
  let initialValue = minValue;
  if (currentValue != null && !isNaN(Number(currentValue))) {
    initialValue = Math.max(minValue, Math.min(maxValue, Number(currentValue)));
  }
  const [value, setValue] = d2(initialValue);
  const [isDragging, setIsDragging] = d2(false);
  const progressBarRef = A2(null);
  const hasMoved = A2(false);
  y2(() => {
    const newValue = entries.get(dateIso);
    if (newValue != null && !isNaN(Number(newValue))) {
      const numVal = Math.max(minValue, Math.min(maxValue, Number(newValue)));
      setValue(numVal);
    }
  }, [entries, dateIso, minValue, maxValue]);
  const calculateValue = q2((clientX) => {
    if (!progressBarRef.current) return minValue;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = clientX - rect.left;
    const percentage2 = Math.max(0, Math.min(1, clickX / rect.width));
    const rawValue = minValue + (maxValue - minValue) * percentage2;
    const steppedValue = Math.round((rawValue - minValue) / step) * step + minValue;
    return Math.max(minValue, Math.min(maxValue, steppedValue));
  }, [minValue, maxValue, step]);
  const writeValue = q2(async (newValue) => {
    try {
      await plugin.writeLogLine(file, dateIso, String(newValue));
      await onValueChange();
    } catch (err) {
      console.error("ScaleControl: write error", err);
    }
  }, [plugin, file, dateIso, onValueChange]);
  const handleMouseDown = q2((e3) => {
    if (e3.button !== 0) return;
    setIsDragging(true);
    hasMoved.current = false;
    const newValue = calculateValue(e3.clientX);
    setValue(newValue);
    e3.preventDefault();
  }, [calculateValue]);
  const handleMouseMove = q2((e3) => {
    if (!isDragging) return;
    hasMoved.current = true;
    const newValue = calculateValue(e3.clientX);
    setValue(newValue);
  }, [isDragging, calculateValue]);
  const handleMouseUp = q2(async () => {
    if (isDragging) {
      setIsDragging(false);
      if (hasMoved.current) {
        await writeValue(value);
      }
    }
  }, [isDragging, value, writeValue]);
  const handleClick = q2(async (e3) => {
    if (hasMoved.current) {
      hasMoved.current = false;
      return;
    }
    const target = e3.target;
    if (target.classList.contains(CSS_CLASSES.PROGRESS_BAR_PROGRESS) || target.classList.contains(CSS_CLASSES.PROGRESS_BAR_VALUE) || target.classList.contains(CSS_CLASSES.PROGRESS_BAR_LABEL_LEFT) || target.classList.contains(CSS_CLASSES.PROGRESS_BAR_LABEL_RIGHT)) {
      return;
    }
    const newValue = calculateValue(e3.clientX);
    setValue(newValue);
    await writeValue(newValue);
  }, [calculateValue, writeValue]);
  const handleKeyDown = q2((e3) => {
    let newValue = value;
    if (e3.key === "ArrowLeft" || e3.key === "ArrowDown") {
      e3.preventDefault();
      newValue = Math.max(minValue, value - step);
    } else if (e3.key === "ArrowRight" || e3.key === "ArrowUp") {
      e3.preventDefault();
      newValue = Math.min(maxValue, value + step);
    } else if (e3.key === "Home") {
      e3.preventDefault();
      newValue = minValue;
    } else if (e3.key === "End") {
      e3.preventDefault();
      newValue = maxValue;
    } else {
      return;
    }
    setValue(newValue);
  }, [value, minValue, maxValue, step]);
  const handleKeyUp = q2(async (e3) => {
    if (["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Home", "End"].includes(e3.key)) {
      await writeValue(value);
    }
  }, [value, writeValue]);
  y2(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
  const percentage = (value - minValue) / (maxValue - minValue) * 100;
  return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.PROGRESS_BAR_WRAPPER, "data-internal-value": value, children: /* @__PURE__ */ u3(
    "div",
    {
      ref: progressBarRef,
      class: CSS_CLASSES.PROGRESS_BAR_INPUT,
      tabIndex: 0,
      role: "button",
      "aria-label": String(value),
      "aria-valuemin": minValue,
      "aria-valuemax": maxValue,
      "aria-valuenow": value,
      onClick: handleClick,
      onMouseDown: handleMouseDown,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
      style: { cursor: isDragging ? "col-resize" : void 0 },
      children: [
        /* @__PURE__ */ u3(
          "div",
          {
            class: CSS_CLASSES.PROGRESS_BAR_PROGRESS,
            role: "slider",
            tabIndex: 0,
            "aria-valuemin": minValue,
            "aria-valuemax": maxValue,
            "aria-valuenow": value,
            style: { width: `${percentage}%` }
          }
        ),
        /* @__PURE__ */ u3("span", { class: CSS_CLASSES.PROGRESS_BAR_VALUE, children: value }),
        /* @__PURE__ */ u3("span", { class: CSS_CLASSES.PROGRESS_BAR_LABEL_LEFT, children: minValue }),
        /* @__PURE__ */ u3("span", { class: CSS_CLASSES.PROGRESS_BAR_LABEL_RIGHT, children: maxValue })
      ]
    }
  ) });
}

// src/utils/validation.ts
function sanitizeFileName(name) {
  return name.replace(/[<>:"/\\|?*]/g, "_");
}
function isTrackerValueTrue(value) {
  if (value === null || value === void 0) {
    return false;
  }
  if (typeof value === "number") {
    return value !== 0;
  }
  const str = String(value);
  return str === "1" || str === "true" || str.trim() !== "";
}

// src/components/controls/Heatmap.tsx
function Heatmap({
  file,
  dateIso,
  plugin,
  fileOptions,
  entries,
  onValueChange,
  daysToShow,
  trackerType,
  startTrackingDate
}) {
  const heatmapRef = A2(null);
  const touchStartRef = A2({ x: 0, y: 0, isScrolling: false });
  const days = T2(() => {
    const endDate = DateService.parse(dateIso, plugin.settings.dateFormat);
    const today = DateService.now();
    const todayStart = DateService.startOfDay(today);
    const todayStr = DateService.format(todayStart, plugin.settings.dateFormat);
    const result = [];
    for (let i4 = 0; i4 < daysToShow; i4++) {
      const date = endDate.clone().subtract(i4, "days");
      const dateStr = DateService.format(date, plugin.settings.dateFormat);
      const dayNum = date.getDate();
      const value = entries.get(dateStr);
      const hasValue = isTrackerValueTrue(value);
      const isStartDay = dateStr === startTrackingDate;
      let isBeforeStart = false;
      let isAfterToday = false;
      if (DateService.isAfter(date, todayStart)) {
        isAfterToday = true;
      } else if (startTrackingDate) {
        try {
          const startDateObj = DateService.parseMultiple(startTrackingDate, [
            plugin.settings.dateFormat,
            "YYYY-MM-DD",
            "DD.MM.YYYY",
            "MM/DD/YYYY"
          ]);
          if (DateService.isBefore(date, startDateObj)) {
            isBeforeStart = true;
          }
        } catch (e3) {
        }
      }
      result.push({
        dateStr,
        dayNum,
        hasValue,
        isStartDay,
        isBeforeStart,
        isAfterToday
      });
    }
    return result;
  }, [dateIso, daysToShow, entries, plugin.settings.dateFormat, startTrackingDate]);
  const handleContainerClick = q2(async (e3) => {
    const target = e3.target;
    if (!target.classList.contains(CSS_CLASSES.HEATMAP_DAY)) return;
    const dateStr = target.dataset.dateStr;
    if (!dateStr) return;
    const day = days.find((d3) => d3.dateStr === dateStr);
    if (!day) return;
    if (day.isAfterToday || day.isBeforeStart) {
      return;
    }
    const isChecked = day.hasValue;
    const newValue = isChecked ? 0 : 1;
    try {
      await plugin.writeLogLine(file, day.dateStr, String(newValue));
      await onValueChange();
    } catch (err) {
      console.error("Heatmap: write error", err);
    }
  }, [plugin, file, onValueChange, days]);
  const handleTouchStart = q2((e3) => {
    if (e3.touches.length === 1) {
      touchStartRef.current = {
        x: e3.touches[0].clientX,
        y: e3.touches[0].clientY,
        isScrolling: false
      };
    }
  }, []);
  const handleTouchMove = q2((e3) => {
    if (e3.touches.length === 1 && touchStartRef.current.x !== 0) {
      const deltaX = Math.abs(e3.touches[0].clientX - touchStartRef.current.x);
      const deltaY = Math.abs(e3.touches[0].clientY - touchStartRef.current.y);
      if (deltaX > deltaY * 1.5 && deltaX > 10) {
        touchStartRef.current.isScrolling = true;
        e3.stopPropagation();
      } else {
        touchStartRef.current.isScrolling = false;
      }
    }
  }, []);
  const handleTouchEnd = q2((e3) => {
    if (touchStartRef.current.isScrolling) {
      e3.stopPropagation();
    }
    touchStartRef.current = { x: 0, y: 0, isScrolling: false };
  }, []);
  const getDayClassName = q2((day) => {
    const classes = [CSS_CLASSES.HEATMAP_DAY, trackerType];
    if (day.hasValue) classes.push("has-value");
    if (day.isStartDay) classes.push("start-day");
    if (day.isBeforeStart) classes.push("before-start");
    if (day.isAfterToday) classes.push("after-today");
    return classes.join(" ");
  }, [trackerType]);
  return /* @__PURE__ */ u3(
    "div",
    {
      ref: heatmapRef,
      class: CSS_CLASSES.HEATMAP,
      onClick: handleContainerClick,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      children: days.map((day) => /* @__PURE__ */ u3(
        "div",
        {
          class: getDayClassName(day),
          "data-date-str": day.dateStr,
          children: day.dayNum
        },
        day.dateStr
      ))
    }
  );
}

// src/utils/misc.ts
function parseMaybeNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : value;
}
function countWords(text) {
  const trimmed = text.trim();
  if (trimmed === "") return 0;
  return trimmed.split(/\s+/).filter((word) => word.length > 0).length;
}

// src/services/entry-utils.ts
var DATE_FORMATS2 = [
  "YYYY-MM-DD",
  "DD.MM.YYYY",
  "MM/DD/YYYY",
  "YYYY/MM/DD"
];
function getEntryValueByDate(entries, date, settings) {
  const formats = [
    settings.dateFormat,
    ...DATE_FORMATS2
  ];
  const uniqueFormats = [...new Set(formats)];
  for (const format of uniqueFormats) {
    const dateStr = DateService.format(date, format);
    const val = entries.get(dateStr);
    if (val !== void 0) {
      return val;
    }
  }
  return void 0;
}
function determineStartTrackingDate(startTrackingDateStr, file, entries, settings, currentDate) {
  let startTrackingDate = null;
  const parseFormats = ["YYYY-MM-DD", settings.dateFormat, ...DATE_FORMATS2];
  const uniqueParseFormats = [...new Set(parseFormats)];
  if (startTrackingDateStr) {
    startTrackingDate = DateService.parseMultiple(startTrackingDateStr, uniqueParseFormats);
    if (startTrackingDate.isValid()) {
      startTrackingDate = DateService.startOfDay(startTrackingDate);
    } else {
      startTrackingDate = null;
    }
  }
  if (!startTrackingDate && file?.stat?.ctime) {
    startTrackingDate = DateService.startOfDay(DateService.fromDate(new Date(file.stat.ctime)));
  }
  if (entries.size > 0) {
    const sortedDates = Array.from(entries.keys()).sort();
    const firstDateStr = sortedDates[0];
    const firstDate = DateService.parseMultiple(firstDateStr, [
      settings.dateFormat,
      ...DATE_FORMATS2
    ]);
    if (firstDate.isValid()) {
      const firstDateNormalized = DateService.startOfDay(firstDate);
      if (!startTrackingDate || DateService.isBefore(firstDateNormalized, startTrackingDate)) {
        startTrackingDate = firstDateNormalized;
      }
    }
  }
  if (!startTrackingDate) {
    startTrackingDate = DateService.startOfDay(DateService.subtractDays(currentDate, 365));
  }
  return startTrackingDate;
}

// src/services/statistics-service.ts
var StatisticsService = class {
  /**
   * Calculates statistics for habits (good-habit and bad-habit)
   */
  calculateHabitStatistics(entries, settings, dateIso, daysToShow, trackerType, startTrackingDateStr) {
    const endDate = DateService.parse(dateIso, settings.dateFormat);
    const startDate = endDate.clone().subtract(daysToShow - 1, "days");
    let actualStartDate = startDate;
    if (startTrackingDateStr) {
      const trackingStartDate = DateService.parseMultiple(startTrackingDateStr, [
        settings.dateFormat,
        ...DATE_FORMATS2
      ]);
      if (trackingStartDate.isValid() && DateService.isAfter(trackingStartDate, startDate)) {
        actualStartDate = trackingStartDate;
      }
    }
    const periodDays = [];
    const metricType = trackerType.toLowerCase();
    const isBadHabit = metricType === TrackerType.BAD_HABIT;
    let actualDaysCount = 0;
    let currentDate = actualStartDate.clone();
    while (!DateService.isAfter(currentDate, endDate)) {
      const dateStr = DateService.format(currentDate, settings.dateFormat);
      const val = entries.get(dateStr);
      let numVal = 0;
      if (val != null) {
        if (typeof val === "number") {
          numVal = val;
        } else if (val === "1" || String(val) === "true") {
          numVal = 1;
        } else {
          numVal = Number(val) || 0;
        }
      }
      if (isBadHabit) {
        numVal = numVal === 0 || val == null ? 1 : 0;
      } else {
        numVal = val != null && numVal > 0 ? 1 : 0;
      }
      periodDays.push(numVal);
      actualDaysCount++;
      currentDate = currentDate.add(1, "days");
    }
    const sum = periodDays.reduce((a3, b2) => a3 + b2, 0);
    const avg = actualDaysCount > 0 ? sum / actualDaysCount : 0;
    const totalRecords = entries.size;
    const activeDays = periodDays.filter((v3) => v3 > 0).length;
    const completionRate = actualDaysCount > 0 ? activeDays / actualDaysCount * 100 : 0;
    return {
      totalRecords,
      periodDays,
      actualDaysCount,
      completionRate,
      activeDays,
      sum,
      avg
    };
  }
  /**
   * Calculates statistics for metrics (number, scale, plusminus, text)
   */
  calculateMetricStatistics(entries, settings, dateIso, daysToShow, trackerType, startTrackingDateStr) {
    const endDate = DateService.parse(dateIso, settings.dateFormat);
    const startDate = endDate.clone().subtract(daysToShow - 1, "days");
    let actualStartDate = startDate;
    if (startTrackingDateStr) {
      const trackingStartDate = DateService.parseMultiple(startTrackingDateStr, [
        settings.dateFormat,
        ...DATE_FORMATS2
      ]);
      if (trackingStartDate.isValid() && DateService.isAfter(trackingStartDate, startDate)) {
        actualStartDate = trackingStartDate;
      }
    }
    const periodDays = [];
    const metricType = trackerType.toLowerCase();
    let actualDaysCount = 0;
    let currentDate = actualStartDate.clone();
    while (!DateService.isAfter(currentDate, endDate)) {
      const dateStr = DateService.format(currentDate, settings.dateFormat);
      const val = entries.get(dateStr);
      let numVal = 0;
      if (val != null) {
        if (metricType === TrackerType.TEXT) {
          numVal = countWords(String(val));
        } else if (typeof val === "number") {
          numVal = val;
        } else if (val === "1" || String(val) === "true") {
          numVal = 1;
        } else {
          numVal = Number(val) || 0;
        }
      }
      periodDays.push(numVal);
      actualDaysCount++;
      currentDate = currentDate.add(1, "days");
    }
    const sum = periodDays.reduce((a3, b2) => a3 + b2, 0);
    const avg = actualDaysCount > 0 ? sum / actualDaysCount : 0;
    const totalRecords = entries.size;
    let min = null;
    let max = null;
    let median = null;
    const nonZeroValues = periodDays.filter((v3) => v3 > 0);
    if (periodDays.length > 0) {
      const sortedValues = [...periodDays].sort((a3, b2) => a3 - b2);
      min = sortedValues[0];
      max = sortedValues[sortedValues.length - 1];
      const mid = Math.floor(sortedValues.length / 2);
      if (sortedValues.length % 2 === 0) {
        median = (sortedValues[mid - 1] + sortedValues[mid]) / 2;
      } else {
        median = sortedValues[mid];
      }
    }
    const activeDays = nonZeroValues.length;
    return {
      totalRecords,
      periodDays,
      actualDaysCount,
      sum,
      avg,
      min,
      max,
      median,
      activeDays
    };
  }
  /**
   * Calculates streak information (current and best streak)
   */
  calculateStreaks(entries, settings, endDate, trackerType, file, startTrackingDateStr) {
    const metricType = trackerType.toLowerCase();
    const isBadHabit = metricType === TrackerType.BAD_HABIT;
    let currentDate;
    if (endDate instanceof Date) {
      currentDate = DateService.fromDate(endDate);
    } else if (endDate && typeof endDate.isValid === "function" && typeof endDate.clone === "function") {
      currentDate = endDate.clone();
    } else {
      currentDate = DateService.fromDate(new Date(endDate));
    }
    if (!currentDate || !currentDate.isValid || !currentDate.isValid()) {
      return { current: 0, best: 0 };
    }
    currentDate = DateService.startOfDay(currentDate);
    const startTrackingDate = determineStartTrackingDate(
      startTrackingDateStr,
      file,
      entries,
      settings,
      currentDate
    );
    if (!startTrackingDate || !startTrackingDate.isValid()) {
      return { current: 0, best: 0 };
    }
    let currentStreak = 0;
    let daysChecked = 0;
    let checkDate = currentDate.clone();
    while (daysChecked < MAX_DAYS_BACK) {
      if (DateService.isBefore(checkDate, startTrackingDate)) {
        break;
      }
      const val = getEntryValueByDate(entries, checkDate, settings);
      let isSuccess = false;
      if (isBadHabit) {
        if (val == null || val === void 0) {
          isSuccess = true;
        } else {
          const hasValue = isTrackerValueTrue(val);
          isSuccess = !hasValue;
        }
      } else {
        if (val != null && val !== void 0) {
          isSuccess = isTrackerValueTrue(val);
        }
      }
      if (isSuccess) {
        currentStreak++;
      } else {
        break;
      }
      checkDate = checkDate.subtract(1, "days");
      daysChecked++;
    }
    let bestStreak = 0;
    let bestCurrentStreak = 0;
    daysChecked = 0;
    let bestCheckDate = currentDate.clone();
    while (!DateService.isBefore(bestCheckDate, startTrackingDate) && daysChecked < MAX_DAYS_BACK) {
      const val = getEntryValueByDate(entries, bestCheckDate, settings);
      let isSuccess = false;
      if (isBadHabit) {
        if (val == null || val === void 0) {
          isSuccess = true;
        } else {
          const hasValue = isTrackerValueTrue(val);
          isSuccess = !hasValue;
        }
      } else {
        if (val != null && val !== void 0) {
          isSuccess = isTrackerValueTrue(val);
        }
      }
      if (isSuccess) {
        bestCurrentStreak++;
        bestStreak = Math.max(bestStreak, bestCurrentStreak);
      } else {
        bestCurrentStreak = 0;
      }
      bestCheckDate = bestCheckDate.subtract(1, "days");
      daysChecked++;
    }
    return {
      current: currentStreak,
      best: bestStreak
    };
  }
  /**
   * Calculates complete statistics for a tracker
   */
  calculateStatistics(entries, settings, dateIso, daysToShow, trackerType, endDate, file, startTrackingDateStr) {
    const metricType = trackerType.toLowerCase();
    const isHabit = metricType === TrackerType.GOOD_HABIT || metricType === TrackerType.BAD_HABIT;
    const streaks = this.calculateStreaks(
      entries,
      settings,
      endDate,
      trackerType,
      file,
      startTrackingDateStr
    );
    let habit = null;
    let metric = null;
    let base;
    if (isHabit) {
      habit = this.calculateHabitStatistics(
        entries,
        settings,
        dateIso,
        daysToShow,
        trackerType,
        startTrackingDateStr
      );
      base = {
        totalRecords: habit.totalRecords,
        periodDays: habit.periodDays,
        actualDaysCount: habit.actualDaysCount
      };
    } else {
      metric = this.calculateMetricStatistics(
        entries,
        settings,
        dateIso,
        daysToShow,
        trackerType,
        startTrackingDateStr
      );
      base = {
        totalRecords: metric.totalRecords,
        periodDays: metric.periodDays,
        actualDaysCount: metric.actualDaysCount
      };
    }
    return {
      base,
      habit,
      metric,
      streaks,
      trackerType
    };
  }
};

// src/components/Statistics/Statistics.tsx
function getCompletionColorClass(rate) {
  if (rate >= 80) return "tracker-notes__stats-value--success";
  if (rate >= 50) return "tracker-notes__stats-value--warning";
  return "tracker-notes__stats-value--error";
}
function formatValue(value, decimals = 1, unit = "") {
  const formatted = value.toFixed(decimals);
  return unit ? `${formatted} ${unit}` : formatted;
}
function getDaysLabel(count) {
  if (count === 1) return STATS_LABELS.DAYS_SINGULAR;
  if (count < 5) return STATS_LABELS.DAYS_PLURAL_2_4;
  return STATS_LABELS.DAYS_PLURAL_5_PLUS;
}
function Section({ title, children }) {
  return /* @__PURE__ */ u3("div", { class: "tracker-notes__stats-section tracker-notes__stats-card", children: [
    title && /* @__PURE__ */ u3("div", { class: "tracker-notes__stats-section-title", children: /* @__PURE__ */ u3("span", { children: title }) }),
    children
  ] });
}
function MetricItem({ label, value, valueClass, icon }) {
  return /* @__PURE__ */ u3("div", { class: "tracker-notes__stats-metric", children: [
    icon && /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-icon", children: icon }),
    /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-label", children: [
      label,
      ": "
    ] }),
    /* @__PURE__ */ u3("span", { class: `tracker-notes__stats-value ${valueClass || ""}`.trim(), children: value })
  ] });
}
function CompletionRate({ rate, activeDays, totalDays, label }) {
  const rateValue = Math.round(rate);
  const colorClass = getCompletionColorClass(rateValue);
  return /* @__PURE__ */ u3("div", { class: "tracker-notes__stats-metric tracker-notes__stats-metric--completion", children: [
    /* @__PURE__ */ u3("div", { class: "tracker-notes__stats-completion-header", children: [
      /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-icon", children: "\u2705" }),
      /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-label", children: [
        label,
        ": "
      ] }),
      /* @__PURE__ */ u3("span", { class: `tracker-notes__stats-value ${colorClass}`, children: [
        rateValue,
        "%"
      ] }),
      /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-value-sub", children: [
        " (",
        activeDays,
        "/",
        totalDays,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ u3("div", { class: "tracker-notes__stats-progress-bar", children: /* @__PURE__ */ u3(
      "div",
      {
        class: `tracker-notes__stats-progress-fill ${colorClass}`,
        style: { width: `${rate}%` }
      }
    ) })
  ] });
}
function Streak({ streak, label, isCurrent = false }) {
  const icon = isCurrent ? "\u{1F525}" : "\u2B50";
  const daysLabel = getDaysLabel(streak);
  return /* @__PURE__ */ u3("div", { class: `tracker-notes__stats-metric tracker-notes__stats-metric--streak ${isCurrent ? "tracker-notes__stats-metric--current" : ""}`, children: [
    /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-icon tracker-notes__stats-icon--streak", children: icon }),
    /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-label", children: [
      label,
      ": "
    ] }),
    /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-value", children: [
      streak,
      " ",
      daysLabel
    ] })
  ] });
}
function HabitStats({ result }) {
  if (!result.habit) return null;
  const stats = result.habit;
  const isBadHabit = result.trackerType.toLowerCase() === TrackerType.BAD_HABIT;
  const completionLabel = isBadHabit ? "Days without" : STATS_LABELS.COMPLETION_RATE;
  return /* @__PURE__ */ u3(k, { children: [
    /* @__PURE__ */ u3(Section, { title: "PERIOD", children: /* @__PURE__ */ u3(
      CompletionRate,
      {
        rate: stats.completionRate,
        activeDays: stats.activeDays,
        totalDays: stats.actualDaysCount,
        label: completionLabel
      }
    ) }),
    /* @__PURE__ */ u3(Section, { title: "STREAKS", children: [
      /* @__PURE__ */ u3(
        Streak,
        {
          streak: result.streaks.current,
          label: STATS_LABELS.CURRENT_STREAK,
          isCurrent: true
        }
      ),
      /* @__PURE__ */ u3(
        Streak,
        {
          streak: result.streaks.best,
          label: STATS_LABELS.BEST_STREAK
        }
      )
    ] })
  ] });
}
function MetricStats({ result, unit }) {
  if (!result.metric) return null;
  const stats = result.metric;
  return /* @__PURE__ */ u3(Section, { title: "PERIOD", children: [
    /* @__PURE__ */ u3(
      MetricItem,
      {
        label: STATS_LABELS.ACTIVE_DAYS,
        value: `${stats.activeDays}/${stats.actualDaysCount}`,
        icon: "\u{1F4C5}"
      }
    ),
    /* @__PURE__ */ u3(
      MetricItem,
      {
        label: STATS_LABELS.LAST_DAYS,
        value: formatValue(stats.sum, 1, unit),
        icon: "\u{1F4C8}"
      }
    ),
    /* @__PURE__ */ u3(
      MetricItem,
      {
        label: STATS_LABELS.AVERAGE,
        value: formatValue(stats.avg, 1, unit),
        icon: "\u{1F4CA}"
      }
    ),
    stats.min !== null && stats.max !== null && /* @__PURE__ */ u3("div", { class: "tracker-notes__stats-metric tracker-notes__stats-metric--minmax", children: [
      /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-icon", children: "\u{1F4C9}" }),
      /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-label", children: [
        STATS_LABELS.MIN,
        ": "
      ] }),
      /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-value", children: formatValue(stats.min, 1, unit) }),
      /* @__PURE__ */ u3("span", { children: " | " }),
      /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-label", children: [
        STATS_LABELS.MAX,
        ": "
      ] }),
      /* @__PURE__ */ u3("span", { class: "tracker-notes__stats-value", children: formatValue(stats.max, 1, unit) })
    ] }),
    stats.median !== null && /* @__PURE__ */ u3(
      MetricItem,
      {
        label: STATS_LABELS.MEDIAN,
        value: formatValue(stats.median, 1, unit),
        icon: "\u{1F4CA}"
      }
    )
  ] });
}
var statisticsService = new StatisticsService();
function Statistics({
  file,
  plugin,
  dateIso,
  daysToShow,
  trackerType,
  entries,
  fileOptions
}) {
  const statisticsResult = T2(() => {
    try {
      const endDate = DateService.parse(dateIso, plugin.settings.dateFormat);
      const startTrackingDateStr = plugin.getStartTrackingDate(entries, fileOptions);
      return statisticsService.calculateStatistics(
        entries,
        plugin.settings,
        dateIso,
        daysToShow,
        trackerType,
        endDate,
        file,
        startTrackingDateStr
      );
    } catch (error) {
      console.error("Statistics: error calculating statistics", error);
      return null;
    }
  }, [file, plugin, dateIso, daysToShow, trackerType, entries, fileOptions]);
  if (!statisticsResult) return null;
  const isHabit = trackerType === TrackerType.GOOD_HABIT || trackerType === TrackerType.BAD_HABIT;
  const unit = fileOptions?.unit || "";
  return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.STATS, children: isHabit ? /* @__PURE__ */ u3(HabitStats, { result: statisticsResult }) : /* @__PURE__ */ u3(MetricStats, { result: statisticsResult, unit }) });
}

// node_modules/@kurkle/color/dist/color.esm.js
function round(v3) {
  return v3 + 0.5 | 0;
}
var lim = (v3, l3, h3) => Math.max(Math.min(v3, h3), l3);
function p2b(v3) {
  return lim(round(v3 * 2.55), 0, 255);
}
function n2b(v3) {
  return lim(round(v3 * 255), 0, 255);
}
function b2n(v3) {
  return lim(round(v3 / 2.55) / 100, 0, 1);
}
function n2p(v3) {
  return lim(round(v3 * 100), 0, 100);
}
var map$1 = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, a: 10, b: 11, c: 12, d: 13, e: 14, f: 15 };
var hex = [..."0123456789ABCDEF"];
var h1 = (b2) => hex[b2 & 15];
var h22 = (b2) => hex[(b2 & 240) >> 4] + hex[b2 & 15];
var eq = (b2) => (b2 & 240) >> 4 === (b2 & 15);
var isShort = (v3) => eq(v3.r) && eq(v3.g) && eq(v3.b) && eq(v3.a);
function hexParse(str) {
  var len = str.length;
  var ret;
  if (str[0] === "#") {
    if (len === 4 || len === 5) {
      ret = {
        r: 255 & map$1[str[1]] * 17,
        g: 255 & map$1[str[2]] * 17,
        b: 255 & map$1[str[3]] * 17,
        a: len === 5 ? map$1[str[4]] * 17 : 255
      };
    } else if (len === 7 || len === 9) {
      ret = {
        r: map$1[str[1]] << 4 | map$1[str[2]],
        g: map$1[str[3]] << 4 | map$1[str[4]],
        b: map$1[str[5]] << 4 | map$1[str[6]],
        a: len === 9 ? map$1[str[7]] << 4 | map$1[str[8]] : 255
      };
    }
  }
  return ret;
}
var alpha = (a3, f4) => a3 < 255 ? f4(a3) : "";
function hexString(v3) {
  var f4 = isShort(v3) ? h1 : h22;
  return v3 ? "#" + f4(v3.r) + f4(v3.g) + f4(v3.b) + alpha(v3.a, f4) : void 0;
}
var HUE_RE = /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hsl2rgbn(h3, s3, l3) {
  const a3 = s3 * Math.min(l3, 1 - l3);
  const f4 = (n2, k3 = (n2 + h3 / 30) % 12) => l3 - a3 * Math.max(Math.min(k3 - 3, 9 - k3, 1), -1);
  return [f4(0), f4(8), f4(4)];
}
function hsv2rgbn(h3, s3, v3) {
  const f4 = (n2, k3 = (n2 + h3 / 60) % 6) => v3 - v3 * s3 * Math.max(Math.min(k3, 4 - k3, 1), 0);
  return [f4(5), f4(3), f4(1)];
}
function hwb2rgbn(h3, w3, b2) {
  const rgb = hsl2rgbn(h3, 1, 0.5);
  let i4;
  if (w3 + b2 > 1) {
    i4 = 1 / (w3 + b2);
    w3 *= i4;
    b2 *= i4;
  }
  for (i4 = 0; i4 < 3; i4++) {
    rgb[i4] *= 1 - w3 - b2;
    rgb[i4] += w3;
  }
  return rgb;
}
function hueValue(r3, g4, b2, d3, max) {
  if (r3 === max) {
    return (g4 - b2) / d3 + (g4 < b2 ? 6 : 0);
  }
  if (g4 === max) {
    return (b2 - r3) / d3 + 2;
  }
  return (r3 - g4) / d3 + 4;
}
function rgb2hsl(v3) {
  const range = 255;
  const r3 = v3.r / range;
  const g4 = v3.g / range;
  const b2 = v3.b / range;
  const max = Math.max(r3, g4, b2);
  const min = Math.min(r3, g4, b2);
  const l3 = (max + min) / 2;
  let h3, s3, d3;
  if (max !== min) {
    d3 = max - min;
    s3 = l3 > 0.5 ? d3 / (2 - max - min) : d3 / (max + min);
    h3 = hueValue(r3, g4, b2, d3, max);
    h3 = h3 * 60 + 0.5;
  }
  return [h3 | 0, s3 || 0, l3];
}
function calln(f4, a3, b2, c3) {
  return (Array.isArray(a3) ? f4(a3[0], a3[1], a3[2]) : f4(a3, b2, c3)).map(n2b);
}
function hsl2rgb(h3, s3, l3) {
  return calln(hsl2rgbn, h3, s3, l3);
}
function hwb2rgb(h3, w3, b2) {
  return calln(hwb2rgbn, h3, w3, b2);
}
function hsv2rgb(h3, s3, v3) {
  return calln(hsv2rgbn, h3, s3, v3);
}
function hue(h3) {
  return (h3 % 360 + 360) % 360;
}
function hueParse(str) {
  const m3 = HUE_RE.exec(str);
  let a3 = 255;
  let v3;
  if (!m3) {
    return;
  }
  if (m3[5] !== v3) {
    a3 = m3[6] ? p2b(+m3[5]) : n2b(+m3[5]);
  }
  const h3 = hue(+m3[2]);
  const p1 = +m3[3] / 100;
  const p22 = +m3[4] / 100;
  if (m3[1] === "hwb") {
    v3 = hwb2rgb(h3, p1, p22);
  } else if (m3[1] === "hsv") {
    v3 = hsv2rgb(h3, p1, p22);
  } else {
    v3 = hsl2rgb(h3, p1, p22);
  }
  return {
    r: v3[0],
    g: v3[1],
    b: v3[2],
    a: a3
  };
}
function rotate(v3, deg) {
  var h3 = rgb2hsl(v3);
  h3[0] = hue(h3[0] + deg);
  h3 = hsl2rgb(h3);
  v3.r = h3[0];
  v3.g = h3[1];
  v3.b = h3[2];
}
function hslString(v3) {
  if (!v3) {
    return;
  }
  const a3 = rgb2hsl(v3);
  const h3 = a3[0];
  const s3 = n2p(a3[1]);
  const l3 = n2p(a3[2]);
  return v3.a < 255 ? `hsla(${h3}, ${s3}%, ${l3}%, ${b2n(v3.a)})` : `hsl(${h3}, ${s3}%, ${l3}%)`;
}
var map = {
  x: "dark",
  Z: "light",
  Y: "re",
  X: "blu",
  W: "gr",
  V: "medium",
  U: "slate",
  A: "ee",
  T: "ol",
  S: "or",
  B: "ra",
  C: "lateg",
  D: "ights",
  R: "in",
  Q: "turquois",
  E: "hi",
  P: "ro",
  O: "al",
  N: "le",
  M: "de",
  L: "yello",
  F: "en",
  K: "ch",
  G: "arks",
  H: "ea",
  I: "ightg",
  J: "wh"
};
var names$1 = {
  OiceXe: "f0f8ff",
  antiquewEte: "faebd7",
  aqua: "ffff",
  aquamarRe: "7fffd4",
  azuY: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "0",
  blanKedOmond: "ffebcd",
  Xe: "ff",
  XeviTet: "8a2be2",
  bPwn: "a52a2a",
  burlywood: "deb887",
  caMtXe: "5f9ea0",
  KartYuse: "7fff00",
  KocTate: "d2691e",
  cSO: "ff7f50",
  cSnflowerXe: "6495ed",
  cSnsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "ffff",
  xXe: "8b",
  xcyan: "8b8b",
  xgTMnPd: "b8860b",
  xWay: "a9a9a9",
  xgYF: "6400",
  xgYy: "a9a9a9",
  xkhaki: "bdb76b",
  xmagFta: "8b008b",
  xTivegYF: "556b2f",
  xSange: "ff8c00",
  xScEd: "9932cc",
  xYd: "8b0000",
  xsOmon: "e9967a",
  xsHgYF: "8fbc8f",
  xUXe: "483d8b",
  xUWay: "2f4f4f",
  xUgYy: "2f4f4f",
  xQe: "ced1",
  xviTet: "9400d3",
  dAppRk: "ff1493",
  dApskyXe: "bfff",
  dimWay: "696969",
  dimgYy: "696969",
  dodgerXe: "1e90ff",
  fiYbrick: "b22222",
  flSOwEte: "fffaf0",
  foYstWAn: "228b22",
  fuKsia: "ff00ff",
  gaRsbSo: "dcdcdc",
  ghostwEte: "f8f8ff",
  gTd: "ffd700",
  gTMnPd: "daa520",
  Way: "808080",
  gYF: "8000",
  gYFLw: "adff2f",
  gYy: "808080",
  honeyMw: "f0fff0",
  hotpRk: "ff69b4",
  RdianYd: "cd5c5c",
  Rdigo: "4b0082",
  ivSy: "fffff0",
  khaki: "f0e68c",
  lavFMr: "e6e6fa",
  lavFMrXsh: "fff0f5",
  lawngYF: "7cfc00",
  NmoncEffon: "fffacd",
  ZXe: "add8e6",
  ZcSO: "f08080",
  Zcyan: "e0ffff",
  ZgTMnPdLw: "fafad2",
  ZWay: "d3d3d3",
  ZgYF: "90ee90",
  ZgYy: "d3d3d3",
  ZpRk: "ffb6c1",
  ZsOmon: "ffa07a",
  ZsHgYF: "20b2aa",
  ZskyXe: "87cefa",
  ZUWay: "778899",
  ZUgYy: "778899",
  ZstAlXe: "b0c4de",
  ZLw: "ffffe0",
  lime: "ff00",
  limegYF: "32cd32",
  lRF: "faf0e6",
  magFta: "ff00ff",
  maPon: "800000",
  VaquamarRe: "66cdaa",
  VXe: "cd",
  VScEd: "ba55d3",
  VpurpN: "9370db",
  VsHgYF: "3cb371",
  VUXe: "7b68ee",
  VsprRggYF: "fa9a",
  VQe: "48d1cc",
  VviTetYd: "c71585",
  midnightXe: "191970",
  mRtcYam: "f5fffa",
  mistyPse: "ffe4e1",
  moccasR: "ffe4b5",
  navajowEte: "ffdead",
  navy: "80",
  Tdlace: "fdf5e6",
  Tive: "808000",
  TivedBb: "6b8e23",
  Sange: "ffa500",
  SangeYd: "ff4500",
  ScEd: "da70d6",
  pOegTMnPd: "eee8aa",
  pOegYF: "98fb98",
  pOeQe: "afeeee",
  pOeviTetYd: "db7093",
  papayawEp: "ffefd5",
  pHKpuff: "ffdab9",
  peru: "cd853f",
  pRk: "ffc0cb",
  plum: "dda0dd",
  powMrXe: "b0e0e6",
  purpN: "800080",
  YbeccapurpN: "663399",
  Yd: "ff0000",
  Psybrown: "bc8f8f",
  PyOXe: "4169e1",
  saddNbPwn: "8b4513",
  sOmon: "fa8072",
  sandybPwn: "f4a460",
  sHgYF: "2e8b57",
  sHshell: "fff5ee",
  siFna: "a0522d",
  silver: "c0c0c0",
  skyXe: "87ceeb",
  UXe: "6a5acd",
  UWay: "708090",
  UgYy: "708090",
  snow: "fffafa",
  sprRggYF: "ff7f",
  stAlXe: "4682b4",
  tan: "d2b48c",
  teO: "8080",
  tEstN: "d8bfd8",
  tomato: "ff6347",
  Qe: "40e0d0",
  viTet: "ee82ee",
  JHt: "f5deb3",
  wEte: "ffffff",
  wEtesmoke: "f5f5f5",
  Lw: "ffff00",
  LwgYF: "9acd32"
};
function unpack() {
  const unpacked = {};
  const keys = Object.keys(names$1);
  const tkeys = Object.keys(map);
  let i4, j4, k3, ok, nk;
  for (i4 = 0; i4 < keys.length; i4++) {
    ok = nk = keys[i4];
    for (j4 = 0; j4 < tkeys.length; j4++) {
      k3 = tkeys[j4];
      nk = nk.replace(k3, map[k3]);
    }
    k3 = parseInt(names$1[ok], 16);
    unpacked[nk] = [k3 >> 16 & 255, k3 >> 8 & 255, k3 & 255];
  }
  return unpacked;
}
var names;
function nameParse(str) {
  if (!names) {
    names = unpack();
    names.transparent = [0, 0, 0, 0];
  }
  const a3 = names[str.toLowerCase()];
  return a3 && {
    r: a3[0],
    g: a3[1],
    b: a3[2],
    a: a3.length === 4 ? a3[3] : 255
  };
}
var RGB_RE = /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function rgbParse(str) {
  const m3 = RGB_RE.exec(str);
  let a3 = 255;
  let r3, g4, b2;
  if (!m3) {
    return;
  }
  if (m3[7] !== r3) {
    const v3 = +m3[7];
    a3 = m3[8] ? p2b(v3) : lim(v3 * 255, 0, 255);
  }
  r3 = +m3[1];
  g4 = +m3[3];
  b2 = +m3[5];
  r3 = 255 & (m3[2] ? p2b(r3) : lim(r3, 0, 255));
  g4 = 255 & (m3[4] ? p2b(g4) : lim(g4, 0, 255));
  b2 = 255 & (m3[6] ? p2b(b2) : lim(b2, 0, 255));
  return {
    r: r3,
    g: g4,
    b: b2,
    a: a3
  };
}
function rgbString(v3) {
  return v3 && (v3.a < 255 ? `rgba(${v3.r}, ${v3.g}, ${v3.b}, ${b2n(v3.a)})` : `rgb(${v3.r}, ${v3.g}, ${v3.b})`);
}
var to = (v3) => v3 <= 31308e-7 ? v3 * 12.92 : Math.pow(v3, 1 / 2.4) * 1.055 - 0.055;
var from = (v3) => v3 <= 0.04045 ? v3 / 12.92 : Math.pow((v3 + 0.055) / 1.055, 2.4);
function interpolate(rgb1, rgb2, t3) {
  const r3 = from(b2n(rgb1.r));
  const g4 = from(b2n(rgb1.g));
  const b2 = from(b2n(rgb1.b));
  return {
    r: n2b(to(r3 + t3 * (from(b2n(rgb2.r)) - r3))),
    g: n2b(to(g4 + t3 * (from(b2n(rgb2.g)) - g4))),
    b: n2b(to(b2 + t3 * (from(b2n(rgb2.b)) - b2))),
    a: rgb1.a + t3 * (rgb2.a - rgb1.a)
  };
}
function modHSL(v3, i4, ratio) {
  if (v3) {
    let tmp = rgb2hsl(v3);
    tmp[i4] = Math.max(0, Math.min(tmp[i4] + tmp[i4] * ratio, i4 === 0 ? 360 : 1));
    tmp = hsl2rgb(tmp);
    v3.r = tmp[0];
    v3.g = tmp[1];
    v3.b = tmp[2];
  }
}
function clone(v3, proto) {
  return v3 ? Object.assign(proto || {}, v3) : v3;
}
function fromObject(input) {
  var v3 = { r: 0, g: 0, b: 0, a: 255 };
  if (Array.isArray(input)) {
    if (input.length >= 3) {
      v3 = { r: input[0], g: input[1], b: input[2], a: 255 };
      if (input.length > 3) {
        v3.a = n2b(input[3]);
      }
    }
  } else {
    v3 = clone(input, { r: 0, g: 0, b: 0, a: 1 });
    v3.a = n2b(v3.a);
  }
  return v3;
}
function functionParse(str) {
  if (str.charAt(0) === "r") {
    return rgbParse(str);
  }
  return hueParse(str);
}
var Color = class _Color {
  constructor(input) {
    if (input instanceof _Color) {
      return input;
    }
    const type = typeof input;
    let v3;
    if (type === "object") {
      v3 = fromObject(input);
    } else if (type === "string") {
      v3 = hexParse(input) || nameParse(input) || functionParse(input);
    }
    this._rgb = v3;
    this._valid = !!v3;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var v3 = clone(this._rgb);
    if (v3) {
      v3.a = b2n(v3.a);
    }
    return v3;
  }
  set rgb(obj) {
    this._rgb = fromObject(obj);
  }
  rgbString() {
    return this._valid ? rgbString(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? hexString(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? hslString(this._rgb) : void 0;
  }
  mix(color2, weight) {
    if (color2) {
      const c1 = this.rgb;
      const c22 = color2.rgb;
      let w22;
      const p3 = weight === w22 ? 0.5 : weight;
      const w3 = 2 * p3 - 1;
      const a3 = c1.a - c22.a;
      const w1 = ((w3 * a3 === -1 ? w3 : (w3 + a3) / (1 + w3 * a3)) + 1) / 2;
      w22 = 1 - w1;
      c1.r = 255 & w1 * c1.r + w22 * c22.r + 0.5;
      c1.g = 255 & w1 * c1.g + w22 * c22.g + 0.5;
      c1.b = 255 & w1 * c1.b + w22 * c22.b + 0.5;
      c1.a = p3 * c1.a + (1 - p3) * c22.a;
      this.rgb = c1;
    }
    return this;
  }
  interpolate(color2, t3) {
    if (color2) {
      this._rgb = interpolate(this._rgb, color2._rgb, t3);
    }
    return this;
  }
  clone() {
    return new _Color(this.rgb);
  }
  alpha(a3) {
    this._rgb.a = n2b(a3);
    return this;
  }
  clearer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 - ratio;
    return this;
  }
  greyscale() {
    const rgb = this._rgb;
    const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
    rgb.r = rgb.g = rgb.b = val;
    return this;
  }
  opaquer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 + ratio;
    return this;
  }
  negate() {
    const v3 = this._rgb;
    v3.r = 255 - v3.r;
    v3.g = 255 - v3.g;
    v3.b = 255 - v3.b;
    return this;
  }
  lighten(ratio) {
    modHSL(this._rgb, 2, ratio);
    return this;
  }
  darken(ratio) {
    modHSL(this._rgb, 2, -ratio);
    return this;
  }
  saturate(ratio) {
    modHSL(this._rgb, 1, ratio);
    return this;
  }
  desaturate(ratio) {
    modHSL(this._rgb, 1, -ratio);
    return this;
  }
  rotate(deg) {
    rotate(this._rgb, deg);
    return this;
  }
};

// node_modules/chart.js/dist/chunks/helpers.dataset.js
function noop() {
}
var uid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => id++;
})();
function isNullOrUndef(value) {
  return value === null || value === void 0;
}
function isArray(value) {
  if (Array.isArray && Array.isArray(value)) {
    return true;
  }
  const type = Object.prototype.toString.call(value);
  if (type.slice(0, 7) === "[object" && type.slice(-6) === "Array]") {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && Object.prototype.toString.call(value) === "[object Object]";
}
function isNumberFinite(value) {
  return (typeof value === "number" || value instanceof Number) && isFinite(+value);
}
function finiteOrDefault(value, defaultValue) {
  return isNumberFinite(value) ? value : defaultValue;
}
function valueOrDefault(value, defaultValue) {
  return typeof value === "undefined" ? defaultValue : value;
}
var toPercentage = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 : +value / dimension;
var toDimension = (value, dimension) => typeof value === "string" && value.endsWith("%") ? parseFloat(value) / 100 * dimension : +value;
function callback(fn2, args, thisArg) {
  if (fn2 && typeof fn2.call === "function") {
    return fn2.apply(thisArg, args);
  }
}
function each(loopable, fn2, thisArg, reverse) {
  let i4, len, keys;
  if (isArray(loopable)) {
    len = loopable.length;
    if (reverse) {
      for (i4 = len - 1; i4 >= 0; i4--) {
        fn2.call(thisArg, loopable[i4], i4);
      }
    } else {
      for (i4 = 0; i4 < len; i4++) {
        fn2.call(thisArg, loopable[i4], i4);
      }
    }
  } else if (isObject(loopable)) {
    keys = Object.keys(loopable);
    len = keys.length;
    for (i4 = 0; i4 < len; i4++) {
      fn2.call(thisArg, loopable[keys[i4]], keys[i4]);
    }
  }
}
function _elementsEqual(a0, a1) {
  let i4, ilen, v0, v1;
  if (!a0 || !a1 || a0.length !== a1.length) {
    return false;
  }
  for (i4 = 0, ilen = a0.length; i4 < ilen; ++i4) {
    v0 = a0[i4];
    v1 = a1[i4];
    if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
      return false;
    }
  }
  return true;
}
function clone2(source) {
  if (isArray(source)) {
    return source.map(clone2);
  }
  if (isObject(source)) {
    const target = /* @__PURE__ */ Object.create(null);
    const keys = Object.keys(source);
    const klen = keys.length;
    let k3 = 0;
    for (; k3 < klen; ++k3) {
      target[keys[k3]] = clone2(source[keys[k3]]);
    }
    return target;
  }
  return source;
}
function isValidKey(key) {
  return [
    "__proto__",
    "prototype",
    "constructor"
  ].indexOf(key) === -1;
}
function _merger(key, target, source, options) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    merge(tval, sval, options);
  } else {
    target[key] = clone2(sval);
  }
}
function merge(target, source, options) {
  const sources = isArray(source) ? source : [
    source
  ];
  const ilen = sources.length;
  if (!isObject(target)) {
    return target;
  }
  options = options || {};
  const merger = options.merger || _merger;
  let current;
  for (let i4 = 0; i4 < ilen; ++i4) {
    current = sources[i4];
    if (!isObject(current)) {
      continue;
    }
    const keys = Object.keys(current);
    for (let k3 = 0, klen = keys.length; k3 < klen; ++k3) {
      merger(keys[k3], target, current, options);
    }
  }
  return target;
}
function mergeIf(target, source) {
  return merge(target, source, {
    merger: _mergerIf
  });
}
function _mergerIf(key, target, source) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    mergeIf(tval, sval);
  } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
    target[key] = clone2(sval);
  }
}
var keyResolvers = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  "": (v3) => v3,
  // default resolvers
  x: (o3) => o3.x,
  y: (o3) => o3.y
};
function _splitKey(key) {
  const parts = key.split(".");
  const keys = [];
  let tmp = "";
  for (const part of parts) {
    tmp += part;
    if (tmp.endsWith("\\")) {
      tmp = tmp.slice(0, -1) + ".";
    } else {
      keys.push(tmp);
      tmp = "";
    }
  }
  return keys;
}
function _getKeyResolver(key) {
  const keys = _splitKey(key);
  return (obj) => {
    for (const k3 of keys) {
      if (k3 === "") {
        break;
      }
      obj = obj && obj[k3];
    }
    return obj;
  };
}
function resolveObjectKey(obj, key) {
  const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
  return resolver(obj);
}
function _capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
var defined = (value) => typeof value !== "undefined";
var isFunction = (value) => typeof value === "function";
var setsEqual = (a3, b2) => {
  if (a3.size !== b2.size) {
    return false;
  }
  for (const item of a3) {
    if (!b2.has(item)) {
      return false;
    }
  }
  return true;
};
function _isClickEvent(e3) {
  return e3.type === "mouseup" || e3.type === "click" || e3.type === "contextmenu";
}
var PI = Math.PI;
var TAU = 2 * PI;
var PITAU = TAU + PI;
var INFINITY = Number.POSITIVE_INFINITY;
var RAD_PER_DEG = PI / 180;
var HALF_PI = PI / 2;
var QUARTER_PI = PI / 4;
var TWO_THIRDS_PI = PI * 2 / 3;
var log10 = Math.log10;
var sign = Math.sign;
function almostEquals(x3, y3, epsilon) {
  return Math.abs(x3 - y3) < epsilon;
}
function niceNum(range) {
  const roundedRange = Math.round(range);
  range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
  const niceRange = Math.pow(10, Math.floor(log10(range)));
  const fraction = range / niceRange;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * niceRange;
}
function _factorize(value) {
  const result = [];
  const sqrt = Math.sqrt(value);
  let i4;
  for (i4 = 1; i4 < sqrt; i4++) {
    if (value % i4 === 0) {
      result.push(i4);
      result.push(value / i4);
    }
  }
  if (sqrt === (sqrt | 0)) {
    result.push(sqrt);
  }
  result.sort((a3, b2) => a3 - b2).pop();
  return result;
}
function isNonPrimitive(n2) {
  return typeof n2 === "symbol" || typeof n2 === "object" && n2 !== null && !(Symbol.toPrimitive in n2 || "toString" in n2 || "valueOf" in n2);
}
function isNumber(n2) {
  return !isNonPrimitive(n2) && !isNaN(parseFloat(n2)) && isFinite(n2);
}
function almostWhole(x3, epsilon) {
  const rounded = Math.round(x3);
  return rounded - epsilon <= x3 && rounded + epsilon >= x3;
}
function _setMinAndMaxByKey(array, target, property) {
  let i4, ilen, value;
  for (i4 = 0, ilen = array.length; i4 < ilen; i4++) {
    value = array[i4][property];
    if (!isNaN(value)) {
      target.min = Math.min(target.min, value);
      target.max = Math.max(target.max, value);
    }
  }
}
function toRadians(degrees) {
  return degrees * (PI / 180);
}
function toDegrees(radians) {
  return radians * (180 / PI);
}
function _decimalPlaces(x3) {
  if (!isNumberFinite(x3)) {
    return;
  }
  let e3 = 1;
  let p3 = 0;
  while (Math.round(x3 * e3) / e3 !== x3) {
    e3 *= 10;
    p3++;
  }
  return p3;
}
function getAngleFromPoint(centrePoint, anglePoint) {
  const distanceFromXCenter = anglePoint.x - centrePoint.x;
  const distanceFromYCenter = anglePoint.y - centrePoint.y;
  const radialDistanceFromCenter = Math.sqrt(distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter);
  let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
  if (angle < -0.5 * PI) {
    angle += TAU;
  }
  return {
    angle,
    distance: radialDistanceFromCenter
  };
}
function distanceBetweenPoints(pt1, pt2) {
  return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
function _angleDiff(a3, b2) {
  return (a3 - b2 + PITAU) % TAU - PI;
}
function _normalizeAngle(a3) {
  return (a3 % TAU + TAU) % TAU;
}
function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
  const a3 = _normalizeAngle(angle);
  const s3 = _normalizeAngle(start);
  const e3 = _normalizeAngle(end);
  const angleToStart = _normalizeAngle(s3 - a3);
  const angleToEnd = _normalizeAngle(e3 - a3);
  const startToAngle = _normalizeAngle(a3 - s3);
  const endToAngle = _normalizeAngle(a3 - e3);
  return a3 === s3 || a3 === e3 || sameAngleIsFullCircle && s3 === e3 || angleToStart > angleToEnd && startToAngle < endToAngle;
}
function _limitValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function _int16Range(value) {
  return _limitValue(value, -32768, 32767);
}
function _isBetween(value, start, end, epsilon = 1e-6) {
  return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
}
function _lookup(table, value, cmp) {
  cmp = cmp || ((index2) => table[index2] < value);
  let hi = table.length - 1;
  let lo = 0;
  let mid;
  while (hi - lo > 1) {
    mid = lo + hi >> 1;
    if (cmp(mid)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return {
    lo,
    hi
  };
}
var _lookupByKey = (table, key, value, last) => _lookup(table, value, last ? (index2) => {
  const ti = table[index2][key];
  return ti < value || ti === value && table[index2 + 1][key] === value;
} : (index2) => table[index2][key] < value);
var _rlookupByKey = (table, key, value) => _lookup(table, value, (index2) => table[index2][key] >= value);
function _filterBetween(values, min, max) {
  let start = 0;
  let end = values.length;
  while (start < end && values[start] < min) {
    start++;
  }
  while (end > start && values[end - 1] > max) {
    end--;
  }
  return start > 0 || end < values.length ? values.slice(start, end) : values;
}
var arrayEvents = [
  "push",
  "pop",
  "shift",
  "splice",
  "unshift"
];
function listenArrayEvents(array, listener) {
  if (array._chartjs) {
    array._chartjs.listeners.push(listener);
    return;
  }
  Object.defineProperty(array, "_chartjs", {
    configurable: true,
    enumerable: false,
    value: {
      listeners: [
        listener
      ]
    }
  });
  arrayEvents.forEach((key) => {
    const method = "_onData" + _capitalize(key);
    const base = array[key];
    Object.defineProperty(array, key, {
      configurable: true,
      enumerable: false,
      value(...args) {
        const res = base.apply(this, args);
        array._chartjs.listeners.forEach((object) => {
          if (typeof object[method] === "function") {
            object[method](...args);
          }
        });
        return res;
      }
    });
  });
}
function unlistenArrayEvents(array, listener) {
  const stub = array._chartjs;
  if (!stub) {
    return;
  }
  const listeners = stub.listeners;
  const index2 = listeners.indexOf(listener);
  if (index2 !== -1) {
    listeners.splice(index2, 1);
  }
  if (listeners.length > 0) {
    return;
  }
  arrayEvents.forEach((key) => {
    delete array[key];
  });
  delete array._chartjs;
}
function _arrayUnique(items) {
  const set2 = new Set(items);
  if (set2.size === items.length) {
    return items;
  }
  return Array.from(set2);
}
var requestAnimFrame = function() {
  if (typeof window === "undefined") {
    return function(callback2) {
      return callback2();
    };
  }
  return window.requestAnimationFrame;
}();
function throttled(fn2, thisArg) {
  let argsToUse = [];
  let ticking = false;
  return function(...args) {
    argsToUse = args;
    if (!ticking) {
      ticking = true;
      requestAnimFrame.call(window, () => {
        ticking = false;
        fn2.apply(thisArg, argsToUse);
      });
    }
  };
}
function debounce(fn2, delay) {
  let timeout;
  return function(...args) {
    if (delay) {
      clearTimeout(timeout);
      timeout = setTimeout(fn2, delay, args);
    } else {
      fn2.apply(this, args);
    }
    return delay;
  };
}
var _toLeftRightCenter = (align) => align === "start" ? "left" : align === "end" ? "right" : "center";
var _alignStartEnd = (align, start, end) => align === "start" ? start : align === "end" ? end : (start + end) / 2;
var _textX = (align, left, right, rtl) => {
  const check = rtl ? "left" : "right";
  return align === check ? right : align === "center" ? (left + right) / 2 : left;
};
function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
  const pointCount = points.length;
  let start = 0;
  let count = pointCount;
  if (meta._sorted) {
    const { iScale, vScale, _parsed } = meta;
    const spanGaps = meta.dataset ? meta.dataset.options ? meta.dataset.options.spanGaps : null : null;
    const axis = iScale.axis;
    const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
    if (minDefined) {
      start = Math.min(
        // @ts-expect-error Need to type _parsed
        _lookupByKey(_parsed, axis, min).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        animationsDisabled ? pointCount : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo
      );
      if (spanGaps) {
        const distanceToDefinedLo = _parsed.slice(0, start + 1).reverse().findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        start -= Math.max(0, distanceToDefinedLo);
      }
      start = _limitValue(start, 0, pointCount - 1);
    }
    if (maxDefined) {
      let end = Math.max(
        // @ts-expect-error Need to type _parsed
        _lookupByKey(_parsed, iScale.axis, max, true).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        animationsDisabled ? 0 : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1
      );
      if (spanGaps) {
        const distanceToDefinedHi = _parsed.slice(end - 1).findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        end += Math.max(0, distanceToDefinedHi);
      }
      count = _limitValue(end, start, pointCount) - start;
    } else {
      count = pointCount - start;
    }
  }
  return {
    start,
    count
  };
}
function _scaleRangesChanged(meta) {
  const { xScale, yScale, _scaleRanges } = meta;
  const newRanges = {
    xmin: xScale.min,
    xmax: xScale.max,
    ymin: yScale.min,
    ymax: yScale.max
  };
  if (!_scaleRanges) {
    meta._scaleRanges = newRanges;
    return true;
  }
  const changed = _scaleRanges.xmin !== xScale.min || _scaleRanges.xmax !== xScale.max || _scaleRanges.ymin !== yScale.min || _scaleRanges.ymax !== yScale.max;
  Object.assign(_scaleRanges, newRanges);
  return changed;
}
var atEdge = (t3) => t3 === 0 || t3 === 1;
var elasticIn = (t3, s3, p3) => -(Math.pow(2, 10 * (t3 -= 1)) * Math.sin((t3 - s3) * TAU / p3));
var elasticOut = (t3, s3, p3) => Math.pow(2, -10 * t3) * Math.sin((t3 - s3) * TAU / p3) + 1;
var effects = {
  linear: (t3) => t3,
  easeInQuad: (t3) => t3 * t3,
  easeOutQuad: (t3) => -t3 * (t3 - 2),
  easeInOutQuad: (t3) => (t3 /= 0.5) < 1 ? 0.5 * t3 * t3 : -0.5 * (--t3 * (t3 - 2) - 1),
  easeInCubic: (t3) => t3 * t3 * t3,
  easeOutCubic: (t3) => (t3 -= 1) * t3 * t3 + 1,
  easeInOutCubic: (t3) => (t3 /= 0.5) < 1 ? 0.5 * t3 * t3 * t3 : 0.5 * ((t3 -= 2) * t3 * t3 + 2),
  easeInQuart: (t3) => t3 * t3 * t3 * t3,
  easeOutQuart: (t3) => -((t3 -= 1) * t3 * t3 * t3 - 1),
  easeInOutQuart: (t3) => (t3 /= 0.5) < 1 ? 0.5 * t3 * t3 * t3 * t3 : -0.5 * ((t3 -= 2) * t3 * t3 * t3 - 2),
  easeInQuint: (t3) => t3 * t3 * t3 * t3 * t3,
  easeOutQuint: (t3) => (t3 -= 1) * t3 * t3 * t3 * t3 + 1,
  easeInOutQuint: (t3) => (t3 /= 0.5) < 1 ? 0.5 * t3 * t3 * t3 * t3 * t3 : 0.5 * ((t3 -= 2) * t3 * t3 * t3 * t3 + 2),
  easeInSine: (t3) => -Math.cos(t3 * HALF_PI) + 1,
  easeOutSine: (t3) => Math.sin(t3 * HALF_PI),
  easeInOutSine: (t3) => -0.5 * (Math.cos(PI * t3) - 1),
  easeInExpo: (t3) => t3 === 0 ? 0 : Math.pow(2, 10 * (t3 - 1)),
  easeOutExpo: (t3) => t3 === 1 ? 1 : -Math.pow(2, -10 * t3) + 1,
  easeInOutExpo: (t3) => atEdge(t3) ? t3 : t3 < 0.5 ? 0.5 * Math.pow(2, 10 * (t3 * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (t3 * 2 - 1)) + 2),
  easeInCirc: (t3) => t3 >= 1 ? t3 : -(Math.sqrt(1 - t3 * t3) - 1),
  easeOutCirc: (t3) => Math.sqrt(1 - (t3 -= 1) * t3),
  easeInOutCirc: (t3) => (t3 /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t3 * t3) - 1) : 0.5 * (Math.sqrt(1 - (t3 -= 2) * t3) + 1),
  easeInElastic: (t3) => atEdge(t3) ? t3 : elasticIn(t3, 0.075, 0.3),
  easeOutElastic: (t3) => atEdge(t3) ? t3 : elasticOut(t3, 0.075, 0.3),
  easeInOutElastic(t3) {
    const s3 = 0.1125;
    const p3 = 0.45;
    return atEdge(t3) ? t3 : t3 < 0.5 ? 0.5 * elasticIn(t3 * 2, s3, p3) : 0.5 + 0.5 * elasticOut(t3 * 2 - 1, s3, p3);
  },
  easeInBack(t3) {
    const s3 = 1.70158;
    return t3 * t3 * ((s3 + 1) * t3 - s3);
  },
  easeOutBack(t3) {
    const s3 = 1.70158;
    return (t3 -= 1) * t3 * ((s3 + 1) * t3 + s3) + 1;
  },
  easeInOutBack(t3) {
    let s3 = 1.70158;
    if ((t3 /= 0.5) < 1) {
      return 0.5 * (t3 * t3 * (((s3 *= 1.525) + 1) * t3 - s3));
    }
    return 0.5 * ((t3 -= 2) * t3 * (((s3 *= 1.525) + 1) * t3 + s3) + 2);
  },
  easeInBounce: (t3) => 1 - effects.easeOutBounce(1 - t3),
  easeOutBounce(t3) {
    const m3 = 7.5625;
    const d3 = 2.75;
    if (t3 < 1 / d3) {
      return m3 * t3 * t3;
    }
    if (t3 < 2 / d3) {
      return m3 * (t3 -= 1.5 / d3) * t3 + 0.75;
    }
    if (t3 < 2.5 / d3) {
      return m3 * (t3 -= 2.25 / d3) * t3 + 0.9375;
    }
    return m3 * (t3 -= 2.625 / d3) * t3 + 0.984375;
  },
  easeInOutBounce: (t3) => t3 < 0.5 ? effects.easeInBounce(t3 * 2) * 0.5 : effects.easeOutBounce(t3 * 2 - 1) * 0.5 + 0.5
};
function isPatternOrGradient(value) {
  if (value && typeof value === "object") {
    const type = value.toString();
    return type === "[object CanvasPattern]" || type === "[object CanvasGradient]";
  }
  return false;
}
function color(value) {
  return isPatternOrGradient(value) ? value : new Color(value);
}
function getHoverColor(value) {
  return isPatternOrGradient(value) ? value : new Color(value).saturate(0.5).darken(0.1).hexString();
}
var numbers = [
  "x",
  "y",
  "borderWidth",
  "radius",
  "tension"
];
var colors = [
  "color",
  "borderColor",
  "backgroundColor"
];
function applyAnimationsDefaults(defaults2) {
  defaults2.set("animation", {
    delay: void 0,
    duration: 1e3,
    easing: "easeOutQuart",
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0
  });
  defaults2.describe("animation", {
    _fallback: false,
    _indexable: false,
    _scriptable: (name) => name !== "onProgress" && name !== "onComplete" && name !== "fn"
  });
  defaults2.set("animations", {
    colors: {
      type: "color",
      properties: colors
    },
    numbers: {
      type: "number",
      properties: numbers
    }
  });
  defaults2.describe("animations", {
    _fallback: "animation"
  });
  defaults2.set("transitions", {
    active: {
      animation: {
        duration: 400
      }
    },
    resize: {
      animation: {
        duration: 0
      }
    },
    show: {
      animations: {
        colors: {
          from: "transparent"
        },
        visible: {
          type: "boolean",
          duration: 0
        }
      }
    },
    hide: {
      animations: {
        colors: {
          to: "transparent"
        },
        visible: {
          type: "boolean",
          easing: "linear",
          fn: (v3) => v3 | 0
        }
      }
    }
  });
}
function applyLayoutsDefaults(defaults2) {
  defaults2.set("layout", {
    autoPadding: true,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  });
}
var intlCache = /* @__PURE__ */ new Map();
function getNumberFormat(locale, options) {
  options = options || {};
  const cacheKey = locale + JSON.stringify(options);
  let formatter = intlCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    intlCache.set(cacheKey, formatter);
  }
  return formatter;
}
function formatNumber(num, locale, options) {
  return getNumberFormat(locale, options).format(num);
}
var formatters = {
  values(value) {
    return isArray(value) ? value : "" + value;
  },
  numeric(tickValue, index2, ticks) {
    if (tickValue === 0) {
      return "0";
    }
    const locale = this.chart.options.locale;
    let notation;
    let delta = tickValue;
    if (ticks.length > 1) {
      const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
      if (maxTick < 1e-4 || maxTick > 1e15) {
        notation = "scientific";
      }
      delta = calculateDelta(tickValue, ticks);
    }
    const logDelta = log10(Math.abs(delta));
    const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
    const options = {
      notation,
      minimumFractionDigits: numDecimal,
      maximumFractionDigits: numDecimal
    };
    Object.assign(options, this.options.ticks.format);
    return formatNumber(tickValue, locale, options);
  },
  logarithmic(tickValue, index2, ticks) {
    if (tickValue === 0) {
      return "0";
    }
    const remain = ticks[index2].significand || tickValue / Math.pow(10, Math.floor(log10(tickValue)));
    if ([
      1,
      2,
      3,
      5,
      10,
      15
    ].includes(remain) || index2 > 0.8 * ticks.length) {
      return formatters.numeric.call(this, tickValue, index2, ticks);
    }
    return "";
  }
};
function calculateDelta(tickValue, ticks) {
  let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
  if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
    delta = tickValue - Math.floor(tickValue);
  }
  return delta;
}
var Ticks = {
  formatters
};
function applyScaleDefaults(defaults2) {
  defaults2.set("scale", {
    display: true,
    offset: false,
    reverse: false,
    beginAtZero: false,
    bounds: "ticks",
    clip: true,
    grace: 0,
    grid: {
      display: true,
      lineWidth: 1,
      drawOnChartArea: true,
      drawTicks: true,
      tickLength: 8,
      tickWidth: (_ctx, options) => options.lineWidth,
      tickColor: (_ctx, options) => options.color,
      offset: false
    },
    border: {
      display: true,
      dash: [],
      dashOffset: 0,
      width: 1
    },
    title: {
      display: false,
      text: "",
      padding: {
        top: 4,
        bottom: 4
      }
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: false,
      textStrokeWidth: 0,
      textStrokeColor: "",
      padding: 3,
      display: true,
      autoSkip: true,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Ticks.formatters.values,
      minor: {},
      major: {},
      align: "center",
      crossAlign: "near",
      showLabelBackdrop: false,
      backdropColor: "rgba(255, 255, 255, 0.75)",
      backdropPadding: 2
    }
  });
  defaults2.route("scale.ticks", "color", "", "color");
  defaults2.route("scale.grid", "color", "", "borderColor");
  defaults2.route("scale.border", "color", "", "borderColor");
  defaults2.route("scale.title", "color", "", "color");
  defaults2.describe("scale", {
    _fallback: false,
    _scriptable: (name) => !name.startsWith("before") && !name.startsWith("after") && name !== "callback" && name !== "parser",
    _indexable: (name) => name !== "borderDash" && name !== "tickBorderDash" && name !== "dash"
  });
  defaults2.describe("scales", {
    _fallback: "scale"
  });
  defaults2.describe("scale.ticks", {
    _scriptable: (name) => name !== "backdropPadding" && name !== "callback",
    _indexable: (name) => name !== "backdropPadding"
  });
}
var overrides = /* @__PURE__ */ Object.create(null);
var descriptors = /* @__PURE__ */ Object.create(null);
function getScope$1(node, key) {
  if (!key) {
    return node;
  }
  const keys = key.split(".");
  for (let i4 = 0, n2 = keys.length; i4 < n2; ++i4) {
    const k3 = keys[i4];
    node = node[k3] || (node[k3] = /* @__PURE__ */ Object.create(null));
  }
  return node;
}
function set(root, scope, values) {
  if (typeof scope === "string") {
    return merge(getScope$1(root, scope), values);
  }
  return merge(getScope$1(root, ""), scope);
}
var Defaults = class {
  constructor(_descriptors2, _appliers) {
    this.animation = void 0;
    this.backgroundColor = "rgba(0,0,0,0.1)";
    this.borderColor = "rgba(0,0,0,0.1)";
    this.color = "#666";
    this.datasets = {};
    this.devicePixelRatio = (context) => context.chart.platform.getDevicePixelRatio();
    this.elements = {};
    this.events = [
      "mousemove",
      "mouseout",
      "click",
      "touchstart",
      "touchmove"
    ];
    this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: "normal",
      lineHeight: 1.2,
      weight: null
    };
    this.hover = {};
    this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
    this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
    this.hoverColor = (ctx, options) => getHoverColor(options.color);
    this.indexAxis = "x";
    this.interaction = {
      mode: "nearest",
      intersect: true,
      includeInvisible: false
    };
    this.maintainAspectRatio = true;
    this.onHover = null;
    this.onClick = null;
    this.parsing = true;
    this.plugins = {};
    this.responsive = true;
    this.scale = void 0;
    this.scales = {};
    this.showLine = true;
    this.drawActiveElementsOnTop = true;
    this.describe(_descriptors2);
    this.apply(_appliers);
  }
  set(scope, values) {
    return set(this, scope, values);
  }
  get(scope) {
    return getScope$1(this, scope);
  }
  describe(scope, values) {
    return set(descriptors, scope, values);
  }
  override(scope, values) {
    return set(overrides, scope, values);
  }
  route(scope, name, targetScope, targetName) {
    const scopeObject = getScope$1(this, scope);
    const targetScopeObject = getScope$1(this, targetScope);
    const privateName = "_" + name;
    Object.defineProperties(scopeObject, {
      [privateName]: {
        value: scopeObject[name],
        writable: true
      },
      [name]: {
        enumerable: true,
        get() {
          const local = this[privateName];
          const target = targetScopeObject[targetName];
          if (isObject(local)) {
            return Object.assign({}, target, local);
          }
          return valueOrDefault(local, target);
        },
        set(value) {
          this[privateName] = value;
        }
      }
    });
  }
  apply(appliers) {
    appliers.forEach((apply) => apply(this));
  }
};
var defaults = /* @__PURE__ */ new Defaults({
  _scriptable: (name) => !name.startsWith("on"),
  _indexable: (name) => name !== "events",
  hover: {
    _fallback: "interaction"
  },
  interaction: {
    _scriptable: false,
    _indexable: false
  }
}, [
  applyAnimationsDefaults,
  applyLayoutsDefaults,
  applyScaleDefaults
]);
function toFontString(font) {
  if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
    return null;
  }
  return (font.style ? font.style + " " : "") + (font.weight ? font.weight + " " : "") + font.size + "px " + font.family;
}
function _measureText(ctx, data, gc, longest, string) {
  let textWidth = data[string];
  if (!textWidth) {
    textWidth = data[string] = ctx.measureText(string).width;
    gc.push(string);
  }
  if (textWidth > longest) {
    longest = textWidth;
  }
  return longest;
}
function _longestText(ctx, font, arrayOfThings, cache) {
  cache = cache || {};
  let data = cache.data = cache.data || {};
  let gc = cache.garbageCollect = cache.garbageCollect || [];
  if (cache.font !== font) {
    data = cache.data = {};
    gc = cache.garbageCollect = [];
    cache.font = font;
  }
  ctx.save();
  ctx.font = font;
  let longest = 0;
  const ilen = arrayOfThings.length;
  let i4, j4, jlen, thing, nestedThing;
  for (i4 = 0; i4 < ilen; i4++) {
    thing = arrayOfThings[i4];
    if (thing !== void 0 && thing !== null && !isArray(thing)) {
      longest = _measureText(ctx, data, gc, longest, thing);
    } else if (isArray(thing)) {
      for (j4 = 0, jlen = thing.length; j4 < jlen; j4++) {
        nestedThing = thing[j4];
        if (nestedThing !== void 0 && nestedThing !== null && !isArray(nestedThing)) {
          longest = _measureText(ctx, data, gc, longest, nestedThing);
        }
      }
    }
  }
  ctx.restore();
  const gcLen = gc.length / 2;
  if (gcLen > arrayOfThings.length) {
    for (i4 = 0; i4 < gcLen; i4++) {
      delete data[gc[i4]];
    }
    gc.splice(0, gcLen);
  }
  return longest;
}
function _alignPixel(chart, pixel, width) {
  const devicePixelRatio = chart.currentDevicePixelRatio;
  const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
  return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
function clearCanvas(canvas, ctx) {
  if (!ctx && !canvas) {
    return;
  }
  ctx = ctx || canvas.getContext("2d");
  ctx.save();
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
function drawPoint(ctx, options, x3, y3) {
  drawPointLegend(ctx, options, x3, y3, null);
}
function drawPointLegend(ctx, options, x3, y3, w3) {
  let type, xOffset, yOffset, size, cornerRadius, width, xOffsetW, yOffsetW;
  const style = options.pointStyle;
  const rotation = options.rotation;
  const radius = options.radius;
  let rad = (rotation || 0) * RAD_PER_DEG;
  if (style && typeof style === "object") {
    type = style.toString();
    if (type === "[object HTMLImageElement]" || type === "[object HTMLCanvasElement]") {
      ctx.save();
      ctx.translate(x3, y3);
      ctx.rotate(rad);
      ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
      ctx.restore();
      return;
    }
  }
  if (isNaN(radius) || radius <= 0) {
    return;
  }
  ctx.beginPath();
  switch (style) {
    // Default includes circle
    default:
      if (w3) {
        ctx.ellipse(x3, y3, w3 / 2, radius, 0, 0, TAU);
      } else {
        ctx.arc(x3, y3, radius, 0, TAU);
      }
      ctx.closePath();
      break;
    case "triangle":
      width = w3 ? w3 / 2 : radius;
      ctx.moveTo(x3 + Math.sin(rad) * width, y3 - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x3 + Math.sin(rad) * width, y3 - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x3 + Math.sin(rad) * width, y3 - Math.cos(rad) * radius);
      ctx.closePath();
      break;
    case "rectRounded":
      cornerRadius = radius * 0.516;
      size = radius - cornerRadius;
      xOffset = Math.cos(rad + QUARTER_PI) * size;
      xOffsetW = Math.cos(rad + QUARTER_PI) * (w3 ? w3 / 2 - cornerRadius : size);
      yOffset = Math.sin(rad + QUARTER_PI) * size;
      yOffsetW = Math.sin(rad + QUARTER_PI) * (w3 ? w3 / 2 - cornerRadius : size);
      ctx.arc(x3 - xOffsetW, y3 - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
      ctx.arc(x3 + yOffsetW, y3 - xOffset, cornerRadius, rad - HALF_PI, rad);
      ctx.arc(x3 + xOffsetW, y3 + yOffset, cornerRadius, rad, rad + HALF_PI);
      ctx.arc(x3 - yOffsetW, y3 + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
      ctx.closePath();
      break;
    case "rect":
      if (!rotation) {
        size = Math.SQRT1_2 * radius;
        width = w3 ? w3 / 2 : size;
        ctx.rect(x3 - width, y3 - size, 2 * width, 2 * size);
        break;
      }
      rad += QUARTER_PI;
    /* falls through */
    case "rectRot":
      xOffsetW = Math.cos(rad) * (w3 ? w3 / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w3 ? w3 / 2 : radius);
      ctx.moveTo(x3 - xOffsetW, y3 - yOffset);
      ctx.lineTo(x3 + yOffsetW, y3 - xOffset);
      ctx.lineTo(x3 + xOffsetW, y3 + yOffset);
      ctx.lineTo(x3 - yOffsetW, y3 + xOffset);
      ctx.closePath();
      break;
    case "crossRot":
      rad += QUARTER_PI;
    /* falls through */
    case "cross":
      xOffsetW = Math.cos(rad) * (w3 ? w3 / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w3 ? w3 / 2 : radius);
      ctx.moveTo(x3 - xOffsetW, y3 - yOffset);
      ctx.lineTo(x3 + xOffsetW, y3 + yOffset);
      ctx.moveTo(x3 + yOffsetW, y3 - xOffset);
      ctx.lineTo(x3 - yOffsetW, y3 + xOffset);
      break;
    case "star":
      xOffsetW = Math.cos(rad) * (w3 ? w3 / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w3 ? w3 / 2 : radius);
      ctx.moveTo(x3 - xOffsetW, y3 - yOffset);
      ctx.lineTo(x3 + xOffsetW, y3 + yOffset);
      ctx.moveTo(x3 + yOffsetW, y3 - xOffset);
      ctx.lineTo(x3 - yOffsetW, y3 + xOffset);
      rad += QUARTER_PI;
      xOffsetW = Math.cos(rad) * (w3 ? w3 / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w3 ? w3 / 2 : radius);
      ctx.moveTo(x3 - xOffsetW, y3 - yOffset);
      ctx.lineTo(x3 + xOffsetW, y3 + yOffset);
      ctx.moveTo(x3 + yOffsetW, y3 - xOffset);
      ctx.lineTo(x3 - yOffsetW, y3 + xOffset);
      break;
    case "line":
      xOffset = w3 ? w3 / 2 : Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      ctx.moveTo(x3 - xOffset, y3 - yOffset);
      ctx.lineTo(x3 + xOffset, y3 + yOffset);
      break;
    case "dash":
      ctx.moveTo(x3, y3);
      ctx.lineTo(x3 + Math.cos(rad) * (w3 ? w3 / 2 : radius), y3 + Math.sin(rad) * radius);
      break;
    case false:
      ctx.closePath();
      break;
  }
  ctx.fill();
  if (options.borderWidth > 0) {
    ctx.stroke();
  }
}
function _isPointInArea(point, area, margin) {
  margin = margin || 0.5;
  return !area || point && point.x > area.left - margin && point.x < area.right + margin && point.y > area.top - margin && point.y < area.bottom + margin;
}
function clipArea(ctx, area) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
  ctx.clip();
}
function unclipArea(ctx) {
  ctx.restore();
}
function _steppedLineTo(ctx, previous, target, flip, mode) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  if (mode === "middle") {
    const midpoint = (previous.x + target.x) / 2;
    ctx.lineTo(midpoint, previous.y);
    ctx.lineTo(midpoint, target.y);
  } else if (mode === "after" !== !!flip) {
    ctx.lineTo(previous.x, target.y);
  } else {
    ctx.lineTo(target.x, previous.y);
  }
  ctx.lineTo(target.x, target.y);
}
function _bezierCurveTo(ctx, previous, target, flip) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  ctx.bezierCurveTo(flip ? previous.cp1x : previous.cp2x, flip ? previous.cp1y : previous.cp2y, flip ? target.cp2x : target.cp1x, flip ? target.cp2y : target.cp1y, target.x, target.y);
}
function setRenderOpts(ctx, opts) {
  if (opts.translation) {
    ctx.translate(opts.translation[0], opts.translation[1]);
  }
  if (!isNullOrUndef(opts.rotation)) {
    ctx.rotate(opts.rotation);
  }
  if (opts.color) {
    ctx.fillStyle = opts.color;
  }
  if (opts.textAlign) {
    ctx.textAlign = opts.textAlign;
  }
  if (opts.textBaseline) {
    ctx.textBaseline = opts.textBaseline;
  }
}
function decorateText(ctx, x3, y3, line, opts) {
  if (opts.strikethrough || opts.underline) {
    const metrics = ctx.measureText(line);
    const left = x3 - metrics.actualBoundingBoxLeft;
    const right = x3 + metrics.actualBoundingBoxRight;
    const top = y3 - metrics.actualBoundingBoxAscent;
    const bottom = y3 + metrics.actualBoundingBoxDescent;
    const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.lineWidth = opts.decorationWidth || 2;
    ctx.moveTo(left, yDecoration);
    ctx.lineTo(right, yDecoration);
    ctx.stroke();
  }
}
function drawBackdrop(ctx, opts) {
  const oldColor = ctx.fillStyle;
  ctx.fillStyle = opts.color;
  ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
  ctx.fillStyle = oldColor;
}
function renderText(ctx, text, x3, y3, font, opts = {}) {
  const lines = isArray(text) ? text : [
    text
  ];
  const stroke = opts.strokeWidth > 0 && opts.strokeColor !== "";
  let i4, line;
  ctx.save();
  ctx.font = font.string;
  setRenderOpts(ctx, opts);
  for (i4 = 0; i4 < lines.length; ++i4) {
    line = lines[i4];
    if (opts.backdrop) {
      drawBackdrop(ctx, opts.backdrop);
    }
    if (stroke) {
      if (opts.strokeColor) {
        ctx.strokeStyle = opts.strokeColor;
      }
      if (!isNullOrUndef(opts.strokeWidth)) {
        ctx.lineWidth = opts.strokeWidth;
      }
      ctx.strokeText(line, x3, y3, opts.maxWidth);
    }
    ctx.fillText(line, x3, y3, opts.maxWidth);
    decorateText(ctx, x3, y3, line, opts);
    y3 += Number(font.lineHeight);
  }
  ctx.restore();
}
function addRoundedRectPath(ctx, rect) {
  const { x: x3, y: y3, w: w3, h: h3, radius } = rect;
  ctx.arc(x3 + radius.topLeft, y3 + radius.topLeft, radius.topLeft, 1.5 * PI, PI, true);
  ctx.lineTo(x3, y3 + h3 - radius.bottomLeft);
  ctx.arc(x3 + radius.bottomLeft, y3 + h3 - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
  ctx.lineTo(x3 + w3 - radius.bottomRight, y3 + h3);
  ctx.arc(x3 + w3 - radius.bottomRight, y3 + h3 - radius.bottomRight, radius.bottomRight, HALF_PI, 0, true);
  ctx.lineTo(x3 + w3, y3 + radius.topRight);
  ctx.arc(x3 + w3 - radius.topRight, y3 + radius.topRight, radius.topRight, 0, -HALF_PI, true);
  ctx.lineTo(x3 + radius.topLeft, y3);
}
var LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
var FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function toLineHeight(value, size) {
  const matches = ("" + value).match(LINE_HEIGHT);
  if (!matches || matches[1] === "normal") {
    return size * 1.2;
  }
  value = +matches[2];
  switch (matches[3]) {
    case "px":
      return value;
    case "%":
      value /= 100;
      break;
  }
  return size * value;
}
var numberOrZero = (v3) => +v3 || 0;
function _readValueToProps(value, props) {
  const ret = {};
  const objProps = isObject(props);
  const keys = objProps ? Object.keys(props) : props;
  const read = isObject(value) ? objProps ? (prop) => valueOrDefault(value[prop], value[props[prop]]) : (prop) => value[prop] : () => value;
  for (const prop of keys) {
    ret[prop] = numberOrZero(read(prop));
  }
  return ret;
}
function toTRBL(value) {
  return _readValueToProps(value, {
    top: "y",
    right: "x",
    bottom: "y",
    left: "x"
  });
}
function toTRBLCorners(value) {
  return _readValueToProps(value, [
    "topLeft",
    "topRight",
    "bottomLeft",
    "bottomRight"
  ]);
}
function toPadding(value) {
  const obj = toTRBL(value);
  obj.width = obj.left + obj.right;
  obj.height = obj.top + obj.bottom;
  return obj;
}
function toFont(options, fallback) {
  options = options || {};
  fallback = fallback || defaults.font;
  let size = valueOrDefault(options.size, fallback.size);
  if (typeof size === "string") {
    size = parseInt(size, 10);
  }
  let style = valueOrDefault(options.style, fallback.style);
  if (style && !("" + style).match(FONT_STYLE)) {
    console.warn('Invalid font style specified: "' + style + '"');
    style = void 0;
  }
  const font = {
    family: valueOrDefault(options.family, fallback.family),
    lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
    size,
    style,
    weight: valueOrDefault(options.weight, fallback.weight),
    string: ""
  };
  font.string = toFontString(font);
  return font;
}
function resolve(inputs, context, index2, info) {
  let cacheable = true;
  let i4, ilen, value;
  for (i4 = 0, ilen = inputs.length; i4 < ilen; ++i4) {
    value = inputs[i4];
    if (value === void 0) {
      continue;
    }
    if (context !== void 0 && typeof value === "function") {
      value = value(context);
      cacheable = false;
    }
    if (index2 !== void 0 && isArray(value)) {
      value = value[index2 % value.length];
      cacheable = false;
    }
    if (value !== void 0) {
      if (info && !cacheable) {
        info.cacheable = false;
      }
      return value;
    }
  }
}
function _addGrace(minmax, grace, beginAtZero) {
  const { min, max } = minmax;
  const change = toDimension(grace, (max - min) / 2);
  const keepZero = (value, add) => beginAtZero && value === 0 ? 0 : value + add;
  return {
    min: keepZero(min, -Math.abs(change)),
    max: keepZero(max, change)
  };
}
function createContext(parentContext, context) {
  return Object.assign(Object.create(parentContext), context);
}
function _createResolver(scopes, prefixes = [
  ""
], rootScopes, fallback, getTarget = () => scopes[0]) {
  const finalRootScopes = rootScopes || scopes;
  if (typeof fallback === "undefined") {
    fallback = _resolve("_fallback", scopes);
  }
  const cache = {
    [Symbol.toStringTag]: "Object",
    _cacheable: true,
    _scopes: scopes,
    _rootScopes: finalRootScopes,
    _fallback: fallback,
    _getTarget: getTarget,
    override: (scope) => _createResolver([
      scope,
      ...scopes
    ], prefixes, finalRootScopes, fallback)
  };
  return new Proxy(cache, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(target, prop) {
      delete target[prop];
      delete target._keys;
      delete scopes[0][prop];
      return true;
    },
    /**
    * A trap for getting property values.
    */
    get(target, prop) {
      return _cached(target, prop, () => _resolveWithPrefixes(prop, prefixes, scopes, target));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(target, prop) {
      return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(scopes[0]);
    },
    /**
    * A trap for the in operator.
    */
    has(target, prop) {
      return getKeysFromAllScopes(target).includes(prop);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys(target) {
      return getKeysFromAllScopes(target);
    },
    /**
    * A trap for setting property values.
    */
    set(target, prop, value) {
      const storage = target._storage || (target._storage = getTarget());
      target[prop] = storage[prop] = value;
      delete target._keys;
      return true;
    }
  });
}
function _attachContext(proxy, context, subProxy, descriptorDefaults) {
  const cache = {
    _cacheable: false,
    _proxy: proxy,
    _context: context,
    _subProxy: subProxy,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: _descriptors(proxy, descriptorDefaults),
    setContext: (ctx) => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
    override: (scope) => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults)
  };
  return new Proxy(cache, {
    /**
    * A trap for the delete operator.
    */
    deleteProperty(target, prop) {
      delete target[prop];
      delete proxy[prop];
      return true;
    },
    /**
    * A trap for getting property values.
    */
    get(target, prop, receiver) {
      return _cached(target, prop, () => _resolveWithContext(target, prop, receiver));
    },
    /**
    * A trap for Object.getOwnPropertyDescriptor.
    * Also used by Object.hasOwnProperty.
    */
    getOwnPropertyDescriptor(target, prop) {
      return target._descriptors.allKeys ? Reflect.has(proxy, prop) ? {
        enumerable: true,
        configurable: true
      } : void 0 : Reflect.getOwnPropertyDescriptor(proxy, prop);
    },
    /**
    * A trap for Object.getPrototypeOf.
    */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(proxy);
    },
    /**
    * A trap for the in operator.
    */
    has(target, prop) {
      return Reflect.has(proxy, prop);
    },
    /**
    * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
    */
    ownKeys() {
      return Reflect.ownKeys(proxy);
    },
    /**
    * A trap for setting property values.
    */
    set(target, prop, value) {
      proxy[prop] = value;
      delete target[prop];
      return true;
    }
  });
}
function _descriptors(proxy, defaults2 = {
  scriptable: true,
  indexable: true
}) {
  const { _scriptable = defaults2.scriptable, _indexable = defaults2.indexable, _allKeys = defaults2.allKeys } = proxy;
  return {
    allKeys: _allKeys,
    scriptable: _scriptable,
    indexable: _indexable,
    isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
    isIndexable: isFunction(_indexable) ? _indexable : () => _indexable
  };
}
var readKey = (prefix, name) => prefix ? prefix + _capitalize(name) : name;
var needsSubResolver = (prop, value) => isObject(value) && prop !== "adapters" && (Object.getPrototypeOf(value) === null || value.constructor === Object);
function _cached(target, prop, resolve2) {
  if (Object.prototype.hasOwnProperty.call(target, prop) || prop === "constructor") {
    return target[prop];
  }
  const value = resolve2();
  target[prop] = value;
  return value;
}
function _resolveWithContext(target, prop, receiver) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  let value = _proxy[prop];
  if (isFunction(value) && descriptors2.isScriptable(prop)) {
    value = _resolveScriptable(prop, value, target, receiver);
  }
  if (isArray(value) && value.length) {
    value = _resolveArray(prop, value, target, descriptors2.isIndexable);
  }
  if (needsSubResolver(prop, value)) {
    value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors2);
  }
  return value;
}
function _resolveScriptable(prop, getValue, target, receiver) {
  const { _proxy, _context, _subProxy, _stack } = target;
  if (_stack.has(prop)) {
    throw new Error("Recursion detected: " + Array.from(_stack).join("->") + "->" + prop);
  }
  _stack.add(prop);
  let value = getValue(_context, _subProxy || receiver);
  _stack.delete(prop);
  if (needsSubResolver(prop, value)) {
    value = createSubResolver(_proxy._scopes, _proxy, prop, value);
  }
  return value;
}
function _resolveArray(prop, value, target, isIndexable) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  if (typeof _context.index !== "undefined" && isIndexable(prop)) {
    return value[_context.index % value.length];
  } else if (isObject(value[0])) {
    const arr = value;
    const scopes = _proxy._scopes.filter((s3) => s3 !== arr);
    value = [];
    for (const item of arr) {
      const resolver = createSubResolver(scopes, _proxy, prop, item);
      value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors2));
    }
  }
  return value;
}
function resolveFallback(fallback, prop, value) {
  return isFunction(fallback) ? fallback(prop, value) : fallback;
}
var getScope = (key, parent) => key === true ? parent : typeof key === "string" ? resolveObjectKey(parent, key) : void 0;
function addScopes(set2, parentScopes, key, parentFallback, value) {
  for (const parent of parentScopes) {
    const scope = getScope(key, parent);
    if (scope) {
      set2.add(scope);
      const fallback = resolveFallback(scope._fallback, key, value);
      if (typeof fallback !== "undefined" && fallback !== key && fallback !== parentFallback) {
        return fallback;
      }
    } else if (scope === false && typeof parentFallback !== "undefined" && key !== parentFallback) {
      return null;
    }
  }
  return false;
}
function createSubResolver(parentScopes, resolver, prop, value) {
  const rootScopes = resolver._rootScopes;
  const fallback = resolveFallback(resolver._fallback, prop, value);
  const allScopes = [
    ...parentScopes,
    ...rootScopes
  ];
  const set2 = /* @__PURE__ */ new Set();
  set2.add(value);
  let key = addScopesFromKey(set2, allScopes, prop, fallback || prop, value);
  if (key === null) {
    return false;
  }
  if (typeof fallback !== "undefined" && fallback !== prop) {
    key = addScopesFromKey(set2, allScopes, fallback, key, value);
    if (key === null) {
      return false;
    }
  }
  return _createResolver(Array.from(set2), [
    ""
  ], rootScopes, fallback, () => subGetTarget(resolver, prop, value));
}
function addScopesFromKey(set2, allScopes, key, fallback, item) {
  while (key) {
    key = addScopes(set2, allScopes, key, fallback, item);
  }
  return key;
}
function subGetTarget(resolver, prop, value) {
  const parent = resolver._getTarget();
  if (!(prop in parent)) {
    parent[prop] = {};
  }
  const target = parent[prop];
  if (isArray(target) && isObject(value)) {
    return value;
  }
  return target || {};
}
function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
  let value;
  for (const prefix of prefixes) {
    value = _resolve(readKey(prefix, prop), scopes);
    if (typeof value !== "undefined") {
      return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
    }
  }
}
function _resolve(key, scopes) {
  for (const scope of scopes) {
    if (!scope) {
      continue;
    }
    const value = scope[key];
    if (typeof value !== "undefined") {
      return value;
    }
  }
}
function getKeysFromAllScopes(target) {
  let keys = target._keys;
  if (!keys) {
    keys = target._keys = resolveKeysFromAllScopes(target._scopes);
  }
  return keys;
}
function resolveKeysFromAllScopes(scopes) {
  const set2 = /* @__PURE__ */ new Set();
  for (const scope of scopes) {
    for (const key of Object.keys(scope).filter((k3) => !k3.startsWith("_"))) {
      set2.add(key);
    }
  }
  return Array.from(set2);
}
function _parseObjectDataRadialScale(meta, data, start, count) {
  const { iScale } = meta;
  const { key = "r" } = this._parsing;
  const parsed = new Array(count);
  let i4, ilen, index2, item;
  for (i4 = 0, ilen = count; i4 < ilen; ++i4) {
    index2 = i4 + start;
    item = data[index2];
    parsed[i4] = {
      r: iScale.parse(resolveObjectKey(item, key), index2)
    };
  }
  return parsed;
}
var EPSILON = Number.EPSILON || 1e-14;
var getPoint = (points, i4) => i4 < points.length && !points[i4].skip && points[i4];
var getValueAxis = (indexAxis) => indexAxis === "x" ? "y" : "x";
function splineCurve(firstPoint, middlePoint, afterPoint, t3) {
  const previous = firstPoint.skip ? middlePoint : firstPoint;
  const current = middlePoint;
  const next = afterPoint.skip ? middlePoint : afterPoint;
  const d01 = distanceBetweenPoints(current, previous);
  const d12 = distanceBetweenPoints(next, current);
  let s01 = d01 / (d01 + d12);
  let s12 = d12 / (d01 + d12);
  s01 = isNaN(s01) ? 0 : s01;
  s12 = isNaN(s12) ? 0 : s12;
  const fa = t3 * s01;
  const fb = t3 * s12;
  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y)
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y)
    }
  };
}
function monotoneAdjust(points, deltaK, mK) {
  const pointsLen = points.length;
  let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i4 = 0; i4 < pointsLen - 1; ++i4) {
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i4 + 1);
    if (!pointCurrent || !pointAfter) {
      continue;
    }
    if (almostEquals(deltaK[i4], 0, EPSILON)) {
      mK[i4] = mK[i4 + 1] = 0;
      continue;
    }
    alphaK = mK[i4] / deltaK[i4];
    betaK = mK[i4 + 1] / deltaK[i4];
    squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
    if (squaredMagnitude <= 9) {
      continue;
    }
    tauK = 3 / Math.sqrt(squaredMagnitude);
    mK[i4] = alphaK * tauK * deltaK[i4];
    mK[i4 + 1] = betaK * tauK * deltaK[i4];
  }
}
function monotoneCompute(points, mK, indexAxis = "x") {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  let delta, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i4 = 0; i4 < pointsLen; ++i4) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i4 + 1);
    if (!pointCurrent) {
      continue;
    }
    const iPixel = pointCurrent[indexAxis];
    const vPixel = pointCurrent[valueAxis];
    if (pointBefore) {
      delta = (iPixel - pointBefore[indexAxis]) / 3;
      pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
      pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i4];
    }
    if (pointAfter) {
      delta = (pointAfter[indexAxis] - iPixel) / 3;
      pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
      pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i4];
    }
  }
}
function splineCurveMonotone(points, indexAxis = "x") {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  const deltaK = Array(pointsLen).fill(0);
  const mK = Array(pointsLen);
  let i4, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (i4 = 0; i4 < pointsLen; ++i4) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i4 + 1);
    if (!pointCurrent) {
      continue;
    }
    if (pointAfter) {
      const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
      deltaK[i4] = slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
    }
    mK[i4] = !pointBefore ? deltaK[i4] : !pointAfter ? deltaK[i4 - 1] : sign(deltaK[i4 - 1]) !== sign(deltaK[i4]) ? 0 : (deltaK[i4 - 1] + deltaK[i4]) / 2;
  }
  monotoneAdjust(points, deltaK, mK);
  monotoneCompute(points, mK, indexAxis);
}
function capControlPoint(pt, min, max) {
  return Math.max(Math.min(pt, max), min);
}
function capBezierPoints(points, area) {
  let i4, ilen, point, inArea, inAreaPrev;
  let inAreaNext = _isPointInArea(points[0], area);
  for (i4 = 0, ilen = points.length; i4 < ilen; ++i4) {
    inAreaPrev = inArea;
    inArea = inAreaNext;
    inAreaNext = i4 < ilen - 1 && _isPointInArea(points[i4 + 1], area);
    if (!inArea) {
      continue;
    }
    point = points[i4];
    if (inAreaPrev) {
      point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
      point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
    }
    if (inAreaNext) {
      point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
      point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
    }
  }
}
function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
  let i4, ilen, point, controlPoints;
  if (options.spanGaps) {
    points = points.filter((pt) => !pt.skip);
  }
  if (options.cubicInterpolationMode === "monotone") {
    splineCurveMonotone(points, indexAxis);
  } else {
    let prev = loop ? points[points.length - 1] : points[0];
    for (i4 = 0, ilen = points.length; i4 < ilen; ++i4) {
      point = points[i4];
      controlPoints = splineCurve(prev, point, points[Math.min(i4 + 1, ilen - (loop ? 0 : 1)) % ilen], options.tension);
      point.cp1x = controlPoints.previous.x;
      point.cp1y = controlPoints.previous.y;
      point.cp2x = controlPoints.next.x;
      point.cp2y = controlPoints.next.y;
      prev = point;
    }
  }
  if (options.capBezierPoints) {
    capBezierPoints(points, area);
  }
}
function _isDomSupported() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}
function _getParentNode(domNode) {
  let parent = domNode.parentNode;
  if (parent && parent.toString() === "[object ShadowRoot]") {
    parent = parent.host;
  }
  return parent;
}
function parseMaxStyle(styleValue, node, parentProperty) {
  let valueInPixels;
  if (typeof styleValue === "string") {
    valueInPixels = parseInt(styleValue, 10);
    if (styleValue.indexOf("%") !== -1) {
      valueInPixels = valueInPixels / 100 * node.parentNode[parentProperty];
    }
  } else {
    valueInPixels = styleValue;
  }
  return valueInPixels;
}
var getComputedStyle2 = (element) => element.ownerDocument.defaultView.getComputedStyle(element, null);
function getStyle(el, property) {
  return getComputedStyle2(el).getPropertyValue(property);
}
var positions = [
  "top",
  "right",
  "bottom",
  "left"
];
function getPositionedStyle(styles, style, suffix) {
  const result = {};
  suffix = suffix ? "-" + suffix : "";
  for (let i4 = 0; i4 < 4; i4++) {
    const pos = positions[i4];
    result[pos] = parseFloat(styles[style + "-" + pos + suffix]) || 0;
  }
  result.width = result.left + result.right;
  result.height = result.top + result.bottom;
  return result;
}
var useOffsetPos = (x3, y3, target) => (x3 > 0 || y3 > 0) && (!target || !target.shadowRoot);
function getCanvasPosition(e3, canvas) {
  const touches = e3.touches;
  const source = touches && touches.length ? touches[0] : e3;
  const { offsetX, offsetY } = source;
  let box = false;
  let x3, y3;
  if (useOffsetPos(offsetX, offsetY, e3.target)) {
    x3 = offsetX;
    y3 = offsetY;
  } else {
    const rect = canvas.getBoundingClientRect();
    x3 = source.clientX - rect.left;
    y3 = source.clientY - rect.top;
    box = true;
  }
  return {
    x: x3,
    y: y3,
    box
  };
}
function getRelativePosition(event, chart) {
  if ("native" in event) {
    return event;
  }
  const { canvas, currentDevicePixelRatio } = chart;
  const style = getComputedStyle2(canvas);
  const borderBox = style.boxSizing === "border-box";
  const paddings = getPositionedStyle(style, "padding");
  const borders = getPositionedStyle(style, "border", "width");
  const { x: x3, y: y3, box } = getCanvasPosition(event, canvas);
  const xOffset = paddings.left + (box && borders.left);
  const yOffset = paddings.top + (box && borders.top);
  let { width, height } = chart;
  if (borderBox) {
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  return {
    x: Math.round((x3 - xOffset) / width * canvas.width / currentDevicePixelRatio),
    y: Math.round((y3 - yOffset) / height * canvas.height / currentDevicePixelRatio)
  };
}
function getContainerSize(canvas, width, height) {
  let maxWidth, maxHeight;
  if (width === void 0 || height === void 0) {
    const container = canvas && _getParentNode(canvas);
    if (!container) {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
    } else {
      const rect = container.getBoundingClientRect();
      const containerStyle = getComputedStyle2(container);
      const containerBorder = getPositionedStyle(containerStyle, "border", "width");
      const containerPadding = getPositionedStyle(containerStyle, "padding");
      width = rect.width - containerPadding.width - containerBorder.width;
      height = rect.height - containerPadding.height - containerBorder.height;
      maxWidth = parseMaxStyle(containerStyle.maxWidth, container, "clientWidth");
      maxHeight = parseMaxStyle(containerStyle.maxHeight, container, "clientHeight");
    }
  }
  return {
    width,
    height,
    maxWidth: maxWidth || INFINITY,
    maxHeight: maxHeight || INFINITY
  };
}
var round1 = (v3) => Math.round(v3 * 10) / 10;
function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
  const style = getComputedStyle2(canvas);
  const margins = getPositionedStyle(style, "margin");
  const maxWidth = parseMaxStyle(style.maxWidth, canvas, "clientWidth") || INFINITY;
  const maxHeight = parseMaxStyle(style.maxHeight, canvas, "clientHeight") || INFINITY;
  const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
  let { width, height } = containerSize;
  if (style.boxSizing === "content-box") {
    const borders = getPositionedStyle(style, "border", "width");
    const paddings = getPositionedStyle(style, "padding");
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  width = Math.max(0, width - margins.width);
  height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
  width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
  height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
  if (width && !height) {
    height = round1(width / 2);
  }
  const maintainHeight = bbWidth !== void 0 || bbHeight !== void 0;
  if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
    height = containerSize.height;
    width = round1(Math.floor(height * aspectRatio));
  }
  return {
    width,
    height
  };
}
function retinaScale(chart, forceRatio, forceStyle) {
  const pixelRatio = forceRatio || 1;
  const deviceHeight = round1(chart.height * pixelRatio);
  const deviceWidth = round1(chart.width * pixelRatio);
  chart.height = round1(chart.height);
  chart.width = round1(chart.width);
  const canvas = chart.canvas;
  if (canvas.style && (forceStyle || !canvas.style.height && !canvas.style.width)) {
    canvas.style.height = `${chart.height}px`;
    canvas.style.width = `${chart.width}px`;
  }
  if (chart.currentDevicePixelRatio !== pixelRatio || canvas.height !== deviceHeight || canvas.width !== deviceWidth) {
    chart.currentDevicePixelRatio = pixelRatio;
    canvas.height = deviceHeight;
    canvas.width = deviceWidth;
    chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return true;
  }
  return false;
}
var supportsEventListenerOptions = function() {
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      }
    };
    if (_isDomSupported()) {
      window.addEventListener("test", null, options);
      window.removeEventListener("test", null, options);
    }
  } catch (e3) {
  }
  return passiveSupported;
}();
function readUsedSize(element, property) {
  const value = getStyle(element, property);
  const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : void 0;
}
function _pointInLine(p1, p22, t3, mode) {
  return {
    x: p1.x + t3 * (p22.x - p1.x),
    y: p1.y + t3 * (p22.y - p1.y)
  };
}
function _steppedInterpolation(p1, p22, t3, mode) {
  return {
    x: p1.x + t3 * (p22.x - p1.x),
    y: mode === "middle" ? t3 < 0.5 ? p1.y : p22.y : mode === "after" ? t3 < 1 ? p1.y : p22.y : t3 > 0 ? p22.y : p1.y
  };
}
function _bezierInterpolation(p1, p22, t3, mode) {
  const cp1 = {
    x: p1.cp2x,
    y: p1.cp2y
  };
  const cp2 = {
    x: p22.cp1x,
    y: p22.cp1y
  };
  const a3 = _pointInLine(p1, cp1, t3);
  const b2 = _pointInLine(cp1, cp2, t3);
  const c3 = _pointInLine(cp2, p22, t3);
  const d3 = _pointInLine(a3, b2, t3);
  const e3 = _pointInLine(b2, c3, t3);
  return _pointInLine(d3, e3, t3);
}
var getRightToLeftAdapter = function(rectX, width) {
  return {
    x(x3) {
      return rectX + rectX + width - x3;
    },
    setWidth(w3) {
      width = w3;
    },
    textAlign(align) {
      if (align === "center") {
        return align;
      }
      return align === "right" ? "left" : "right";
    },
    xPlus(x3, value) {
      return x3 - value;
    },
    leftForLtr(x3, itemWidth) {
      return x3 - itemWidth;
    }
  };
};
var getLeftToRightAdapter = function() {
  return {
    x(x3) {
      return x3;
    },
    setWidth(w3) {
    },
    textAlign(align) {
      return align;
    },
    xPlus(x3, value) {
      return x3 + value;
    },
    leftForLtr(x3, _itemWidth) {
      return x3;
    }
  };
};
function getRtlAdapter(rtl, rectX, width) {
  return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
}
function overrideTextDirection(ctx, direction) {
  let style, original;
  if (direction === "ltr" || direction === "rtl") {
    style = ctx.canvas.style;
    original = [
      style.getPropertyValue("direction"),
      style.getPropertyPriority("direction")
    ];
    style.setProperty("direction", direction, "important");
    ctx.prevTextDirection = original;
  }
}
function restoreTextDirection(ctx, original) {
  if (original !== void 0) {
    delete ctx.prevTextDirection;
    ctx.canvas.style.setProperty("direction", original[0], original[1]);
  }
}
function propertyFn(property) {
  if (property === "angle") {
    return {
      between: _angleBetween,
      compare: _angleDiff,
      normalize: _normalizeAngle
    };
  }
  return {
    between: _isBetween,
    compare: (a3, b2) => a3 - b2,
    normalize: (x3) => x3
  };
}
function normalizeSegment({ start, end, count, loop, style }) {
  return {
    start: start % count,
    end: end % count,
    loop: loop && (end - start + 1) % count === 0,
    style
  };
}
function getSegment(segment, points, bounds) {
  const { property, start: startBound, end: endBound } = bounds;
  const { between, normalize } = propertyFn(property);
  const count = points.length;
  let { start, end, loop } = segment;
  let i4, ilen;
  if (loop) {
    start += count;
    end += count;
    for (i4 = 0, ilen = count; i4 < ilen; ++i4) {
      if (!between(normalize(points[start % count][property]), startBound, endBound)) {
        break;
      }
      start--;
      end--;
    }
    start %= count;
    end %= count;
  }
  if (end < start) {
    end += count;
  }
  return {
    start,
    end,
    loop,
    style: segment.style
  };
}
function _boundSegment(segment, points, bounds) {
  if (!bounds) {
    return [
      segment
    ];
  }
  const { property, start: startBound, end: endBound } = bounds;
  const count = points.length;
  const { compare, between, normalize } = propertyFn(property);
  const { start, end, loop, style } = getSegment(segment, points, bounds);
  const result = [];
  let inside = false;
  let subStart = null;
  let value, point, prevValue;
  const startIsBefore = () => between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
  const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
  const shouldStart = () => inside || startIsBefore();
  const shouldStop = () => !inside || endIsBefore();
  for (let i4 = start, prev = start; i4 <= end; ++i4) {
    point = points[i4 % count];
    if (point.skip) {
      continue;
    }
    value = normalize(point[property]);
    if (value === prevValue) {
      continue;
    }
    inside = between(value, startBound, endBound);
    if (subStart === null && shouldStart()) {
      subStart = compare(value, startBound) === 0 ? i4 : prev;
    }
    if (subStart !== null && shouldStop()) {
      result.push(normalizeSegment({
        start: subStart,
        end: i4,
        loop,
        count,
        style
      }));
      subStart = null;
    }
    prev = i4;
    prevValue = value;
  }
  if (subStart !== null) {
    result.push(normalizeSegment({
      start: subStart,
      end,
      loop,
      count,
      style
    }));
  }
  return result;
}
function _boundSegments(line, bounds) {
  const result = [];
  const segments = line.segments;
  for (let i4 = 0; i4 < segments.length; i4++) {
    const sub = _boundSegment(segments[i4], line.points, bounds);
    if (sub.length) {
      result.push(...sub);
    }
  }
  return result;
}
function findStartAndEnd(points, count, loop, spanGaps) {
  let start = 0;
  let end = count - 1;
  if (loop && !spanGaps) {
    while (start < count && !points[start].skip) {
      start++;
    }
  }
  while (start < count && points[start].skip) {
    start++;
  }
  start %= count;
  if (loop) {
    end += start;
  }
  while (end > start && points[end % count].skip) {
    end--;
  }
  end %= count;
  return {
    start,
    end
  };
}
function solidSegments(points, start, max, loop) {
  const count = points.length;
  const result = [];
  let last = start;
  let prev = points[start];
  let end;
  for (end = start + 1; end <= max; ++end) {
    const cur = points[end % count];
    if (cur.skip || cur.stop) {
      if (!prev.skip) {
        loop = false;
        result.push({
          start: start % count,
          end: (end - 1) % count,
          loop
        });
        start = last = cur.stop ? end : null;
      }
    } else {
      last = end;
      if (prev.skip) {
        start = end;
      }
    }
    prev = cur;
  }
  if (last !== null) {
    result.push({
      start: start % count,
      end: last % count,
      loop
    });
  }
  return result;
}
function _computeSegments(line, segmentOptions) {
  const points = line.points;
  const spanGaps = line.options.spanGaps;
  const count = points.length;
  if (!count) {
    return [];
  }
  const loop = !!line._loop;
  const { start, end } = findStartAndEnd(points, count, loop, spanGaps);
  if (spanGaps === true) {
    return splitByStyles(line, [
      {
        start,
        end,
        loop
      }
    ], points, segmentOptions);
  }
  const max = end < start ? end + count : end;
  const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
  return splitByStyles(line, solidSegments(points, start, max, completeLoop), points, segmentOptions);
}
function splitByStyles(line, segments, points, segmentOptions) {
  if (!segmentOptions || !segmentOptions.setContext || !points) {
    return segments;
  }
  return doSplitByStyles(line, segments, points, segmentOptions);
}
function doSplitByStyles(line, segments, points, segmentOptions) {
  const chartContext = line._chart.getContext();
  const baseStyle = readStyle(line.options);
  const { _datasetIndex: datasetIndex, options: { spanGaps } } = line;
  const count = points.length;
  const result = [];
  let prevStyle = baseStyle;
  let start = segments[0].start;
  let i4 = start;
  function addStyle(s3, e3, l3, st) {
    const dir = spanGaps ? -1 : 1;
    if (s3 === e3) {
      return;
    }
    s3 += count;
    while (points[s3 % count].skip) {
      s3 -= dir;
    }
    while (points[e3 % count].skip) {
      e3 += dir;
    }
    if (s3 % count !== e3 % count) {
      result.push({
        start: s3 % count,
        end: e3 % count,
        loop: l3,
        style: st
      });
      prevStyle = st;
      start = e3 % count;
    }
  }
  for (const segment of segments) {
    start = spanGaps ? start : segment.start;
    let prev = points[start % count];
    let style;
    for (i4 = start + 1; i4 <= segment.end; i4++) {
      const pt = points[i4 % count];
      style = readStyle(segmentOptions.setContext(createContext(chartContext, {
        type: "segment",
        p0: prev,
        p1: pt,
        p0DataIndex: (i4 - 1) % count,
        p1DataIndex: i4 % count,
        datasetIndex
      })));
      if (styleChanged(style, prevStyle)) {
        addStyle(start, i4 - 1, segment.loop, prevStyle);
      }
      prev = pt;
      prevStyle = style;
    }
    if (start < i4 - 1) {
      addStyle(start, i4 - 1, segment.loop, prevStyle);
    }
  }
  return result;
}
function readStyle(options) {
  return {
    backgroundColor: options.backgroundColor,
    borderCapStyle: options.borderCapStyle,
    borderDash: options.borderDash,
    borderDashOffset: options.borderDashOffset,
    borderJoinStyle: options.borderJoinStyle,
    borderWidth: options.borderWidth,
    borderColor: options.borderColor
  };
}
function styleChanged(style, prevStyle) {
  if (!prevStyle) {
    return false;
  }
  const cache = [];
  const replacer = function(key, value) {
    if (!isPatternOrGradient(value)) {
      return value;
    }
    if (!cache.includes(value)) {
      cache.push(value);
    }
    return cache.indexOf(value);
  };
  return JSON.stringify(style, replacer) !== JSON.stringify(prevStyle, replacer);
}
function getSizeForArea(scale, chartArea, field) {
  return scale.options.clip ? scale[field] : chartArea[field];
}
function getDatasetArea(meta, chartArea) {
  const { xScale, yScale } = meta;
  if (xScale && yScale) {
    return {
      left: getSizeForArea(xScale, chartArea, "left"),
      right: getSizeForArea(xScale, chartArea, "right"),
      top: getSizeForArea(yScale, chartArea, "top"),
      bottom: getSizeForArea(yScale, chartArea, "bottom")
    };
  }
  return chartArea;
}
function getDatasetClipArea(chart, meta) {
  const clip = meta._clip;
  if (clip.disabled) {
    return false;
  }
  const area = getDatasetArea(meta, chart.chartArea);
  return {
    left: clip.left === false ? 0 : area.left - (clip.left === true ? 0 : clip.left),
    right: clip.right === false ? chart.width : area.right + (clip.right === true ? 0 : clip.right),
    top: clip.top === false ? 0 : area.top - (clip.top === true ? 0 : clip.top),
    bottom: clip.bottom === false ? chart.height : area.bottom + (clip.bottom === true ? 0 : clip.bottom)
  };
}

// node_modules/chart.js/dist/chart.js
var Animator = class {
  constructor() {
    this._request = null;
    this._charts = /* @__PURE__ */ new Map();
    this._running = false;
    this._lastDate = void 0;
  }
  _notify(chart, anims, date, type) {
    const callbacks = anims.listeners[type];
    const numSteps = anims.duration;
    callbacks.forEach((fn2) => fn2({
      chart,
      initial: anims.initial,
      numSteps,
      currentStep: Math.min(date - anims.start, numSteps)
    }));
  }
  _refresh() {
    if (this._request) {
      return;
    }
    this._running = true;
    this._request = requestAnimFrame.call(window, () => {
      this._update();
      this._request = null;
      if (this._running) {
        this._refresh();
      }
    });
  }
  _update(date = Date.now()) {
    let remaining = 0;
    this._charts.forEach((anims, chart) => {
      if (!anims.running || !anims.items.length) {
        return;
      }
      const items = anims.items;
      let i4 = items.length - 1;
      let draw2 = false;
      let item;
      for (; i4 >= 0; --i4) {
        item = items[i4];
        if (item._active) {
          if (item._total > anims.duration) {
            anims.duration = item._total;
          }
          item.tick(date);
          draw2 = true;
        } else {
          items[i4] = items[items.length - 1];
          items.pop();
        }
      }
      if (draw2) {
        chart.draw();
        this._notify(chart, anims, date, "progress");
      }
      if (!items.length) {
        anims.running = false;
        this._notify(chart, anims, date, "complete");
        anims.initial = false;
      }
      remaining += items.length;
    });
    this._lastDate = date;
    if (remaining === 0) {
      this._running = false;
    }
  }
  _getAnims(chart) {
    const charts = this._charts;
    let anims = charts.get(chart);
    if (!anims) {
      anims = {
        running: false,
        initial: true,
        items: [],
        listeners: {
          complete: [],
          progress: []
        }
      };
      charts.set(chart, anims);
    }
    return anims;
  }
  listen(chart, event, cb) {
    this._getAnims(chart).listeners[event].push(cb);
  }
  add(chart, items) {
    if (!items || !items.length) {
      return;
    }
    this._getAnims(chart).items.push(...items);
  }
  has(chart) {
    return this._getAnims(chart).items.length > 0;
  }
  start(chart) {
    const anims = this._charts.get(chart);
    if (!anims) {
      return;
    }
    anims.running = true;
    anims.start = Date.now();
    anims.duration = anims.items.reduce((acc, cur) => Math.max(acc, cur._duration), 0);
    this._refresh();
  }
  running(chart) {
    if (!this._running) {
      return false;
    }
    const anims = this._charts.get(chart);
    if (!anims || !anims.running || !anims.items.length) {
      return false;
    }
    return true;
  }
  stop(chart) {
    const anims = this._charts.get(chart);
    if (!anims || !anims.items.length) {
      return;
    }
    const items = anims.items;
    let i4 = items.length - 1;
    for (; i4 >= 0; --i4) {
      items[i4].cancel();
    }
    anims.items = [];
    this._notify(chart, anims, Date.now(), "complete");
  }
  remove(chart) {
    return this._charts.delete(chart);
  }
};
var animator = /* @__PURE__ */ new Animator();
var transparent = "transparent";
var interpolators = {
  boolean(from2, to2, factor) {
    return factor > 0.5 ? to2 : from2;
  },
  color(from2, to2, factor) {
    const c0 = color(from2 || transparent);
    const c1 = c0.valid && color(to2 || transparent);
    return c1 && c1.valid ? c1.mix(c0, factor).hexString() : to2;
  },
  number(from2, to2, factor) {
    return from2 + (to2 - from2) * factor;
  }
};
var Animation = class {
  constructor(cfg, target, prop, to2) {
    const currentValue = target[prop];
    to2 = resolve([
      cfg.to,
      to2,
      currentValue,
      cfg.from
    ]);
    const from2 = resolve([
      cfg.from,
      currentValue,
      to2
    ]);
    this._active = true;
    this._fn = cfg.fn || interpolators[cfg.type || typeof from2];
    this._easing = effects[cfg.easing] || effects.linear;
    this._start = Math.floor(Date.now() + (cfg.delay || 0));
    this._duration = this._total = Math.floor(cfg.duration);
    this._loop = !!cfg.loop;
    this._target = target;
    this._prop = prop;
    this._from = from2;
    this._to = to2;
    this._promises = void 0;
  }
  active() {
    return this._active;
  }
  update(cfg, to2, date) {
    if (this._active) {
      this._notify(false);
      const currentValue = this._target[this._prop];
      const elapsed = date - this._start;
      const remain = this._duration - elapsed;
      this._start = date;
      this._duration = Math.floor(Math.max(remain, cfg.duration));
      this._total += elapsed;
      this._loop = !!cfg.loop;
      this._to = resolve([
        cfg.to,
        to2,
        currentValue,
        cfg.from
      ]);
      this._from = resolve([
        cfg.from,
        currentValue,
        to2
      ]);
    }
  }
  cancel() {
    if (this._active) {
      this.tick(Date.now());
      this._active = false;
      this._notify(false);
    }
  }
  tick(date) {
    const elapsed = date - this._start;
    const duration = this._duration;
    const prop = this._prop;
    const from2 = this._from;
    const loop = this._loop;
    const to2 = this._to;
    let factor;
    this._active = from2 !== to2 && (loop || elapsed < duration);
    if (!this._active) {
      this._target[prop] = to2;
      this._notify(true);
      return;
    }
    if (elapsed < 0) {
      this._target[prop] = from2;
      return;
    }
    factor = elapsed / duration % 2;
    factor = loop && factor > 1 ? 2 - factor : factor;
    factor = this._easing(Math.min(1, Math.max(0, factor)));
    this._target[prop] = this._fn(from2, to2, factor);
  }
  wait() {
    const promises = this._promises || (this._promises = []);
    return new Promise((res, rej) => {
      promises.push({
        res,
        rej
      });
    });
  }
  _notify(resolved) {
    const method = resolved ? "res" : "rej";
    const promises = this._promises || [];
    for (let i4 = 0; i4 < promises.length; i4++) {
      promises[i4][method]();
    }
  }
};
var Animations = class {
  constructor(chart, config) {
    this._chart = chart;
    this._properties = /* @__PURE__ */ new Map();
    this.configure(config);
  }
  configure(config) {
    if (!isObject(config)) {
      return;
    }
    const animationOptions = Object.keys(defaults.animation);
    const animatedProps = this._properties;
    Object.getOwnPropertyNames(config).forEach((key) => {
      const cfg = config[key];
      if (!isObject(cfg)) {
        return;
      }
      const resolved = {};
      for (const option of animationOptions) {
        resolved[option] = cfg[option];
      }
      (isArray(cfg.properties) && cfg.properties || [
        key
      ]).forEach((prop) => {
        if (prop === key || !animatedProps.has(prop)) {
          animatedProps.set(prop, resolved);
        }
      });
    });
  }
  _animateOptions(target, values) {
    const newOptions = values.options;
    const options = resolveTargetOptions(target, newOptions);
    if (!options) {
      return [];
    }
    const animations = this._createAnimations(options, newOptions);
    if (newOptions.$shared) {
      awaitAll(target.options.$animations, newOptions).then(() => {
        target.options = newOptions;
      }, () => {
      });
    }
    return animations;
  }
  _createAnimations(target, values) {
    const animatedProps = this._properties;
    const animations = [];
    const running = target.$animations || (target.$animations = {});
    const props = Object.keys(values);
    const date = Date.now();
    let i4;
    for (i4 = props.length - 1; i4 >= 0; --i4) {
      const prop = props[i4];
      if (prop.charAt(0) === "$") {
        continue;
      }
      if (prop === "options") {
        animations.push(...this._animateOptions(target, values));
        continue;
      }
      const value = values[prop];
      let animation = running[prop];
      const cfg = animatedProps.get(prop);
      if (animation) {
        if (cfg && animation.active()) {
          animation.update(cfg, value, date);
          continue;
        } else {
          animation.cancel();
        }
      }
      if (!cfg || !cfg.duration) {
        target[prop] = value;
        continue;
      }
      running[prop] = animation = new Animation(cfg, target, prop, value);
      animations.push(animation);
    }
    return animations;
  }
  update(target, values) {
    if (this._properties.size === 0) {
      Object.assign(target, values);
      return;
    }
    const animations = this._createAnimations(target, values);
    if (animations.length) {
      animator.add(this._chart, animations);
      return true;
    }
  }
};
function awaitAll(animations, properties) {
  const running = [];
  const keys = Object.keys(properties);
  for (let i4 = 0; i4 < keys.length; i4++) {
    const anim = animations[keys[i4]];
    if (anim && anim.active()) {
      running.push(anim.wait());
    }
  }
  return Promise.all(running);
}
function resolveTargetOptions(target, newOptions) {
  if (!newOptions) {
    return;
  }
  let options = target.options;
  if (!options) {
    target.options = newOptions;
    return;
  }
  if (options.$shared) {
    target.options = options = Object.assign({}, options, {
      $shared: false,
      $animations: {}
    });
  }
  return options;
}
function scaleClip(scale, allowedOverflow) {
  const opts = scale && scale.options || {};
  const reverse = opts.reverse;
  const min = opts.min === void 0 ? allowedOverflow : 0;
  const max = opts.max === void 0 ? allowedOverflow : 0;
  return {
    start: reverse ? max : min,
    end: reverse ? min : max
  };
}
function defaultClip(xScale, yScale, allowedOverflow) {
  if (allowedOverflow === false) {
    return false;
  }
  const x3 = scaleClip(xScale, allowedOverflow);
  const y3 = scaleClip(yScale, allowedOverflow);
  return {
    top: y3.end,
    right: x3.end,
    bottom: y3.start,
    left: x3.start
  };
}
function toClip(value) {
  let t3, r3, b2, l3;
  if (isObject(value)) {
    t3 = value.top;
    r3 = value.right;
    b2 = value.bottom;
    l3 = value.left;
  } else {
    t3 = r3 = b2 = l3 = value;
  }
  return {
    top: t3,
    right: r3,
    bottom: b2,
    left: l3,
    disabled: value === false
  };
}
function getSortedDatasetIndices(chart, filterVisible) {
  const keys = [];
  const metasets = chart._getSortedDatasetMetas(filterVisible);
  let i4, ilen;
  for (i4 = 0, ilen = metasets.length; i4 < ilen; ++i4) {
    keys.push(metasets[i4].index);
  }
  return keys;
}
function applyStack(stack, value, dsIndex, options = {}) {
  const keys = stack.keys;
  const singleMode = options.mode === "single";
  let i4, ilen, datasetIndex, otherValue;
  if (value === null) {
    return;
  }
  let found = false;
  for (i4 = 0, ilen = keys.length; i4 < ilen; ++i4) {
    datasetIndex = +keys[i4];
    if (datasetIndex === dsIndex) {
      found = true;
      if (options.all) {
        continue;
      }
      break;
    }
    otherValue = stack.values[datasetIndex];
    if (isNumberFinite(otherValue) && (singleMode || value === 0 || sign(value) === sign(otherValue))) {
      value += otherValue;
    }
  }
  if (!found && !options.all) {
    return 0;
  }
  return value;
}
function convertObjectDataToArray(data, meta) {
  const { iScale, vScale } = meta;
  const iAxisKey = iScale.axis === "x" ? "x" : "y";
  const vAxisKey = vScale.axis === "x" ? "x" : "y";
  const keys = Object.keys(data);
  const adata = new Array(keys.length);
  let i4, ilen, key;
  for (i4 = 0, ilen = keys.length; i4 < ilen; ++i4) {
    key = keys[i4];
    adata[i4] = {
      [iAxisKey]: key,
      [vAxisKey]: data[key]
    };
  }
  return adata;
}
function isStacked(scale, meta) {
  const stacked = scale && scale.options.stacked;
  return stacked || stacked === void 0 && meta.stack !== void 0;
}
function getStackKey(indexScale, valueScale, meta) {
  return `${indexScale.id}.${valueScale.id}.${meta.stack || meta.type}`;
}
function getUserBounds(scale) {
  const { min, max, minDefined, maxDefined } = scale.getUserBounds();
  return {
    min: minDefined ? min : Number.NEGATIVE_INFINITY,
    max: maxDefined ? max : Number.POSITIVE_INFINITY
  };
}
function getOrCreateStack(stacks, stackKey, indexValue) {
  const subStack = stacks[stackKey] || (stacks[stackKey] = {});
  return subStack[indexValue] || (subStack[indexValue] = {});
}
function getLastIndexInStack(stack, vScale, positive, type) {
  for (const meta of vScale.getMatchingVisibleMetas(type).reverse()) {
    const value = stack[meta.index];
    if (positive && value > 0 || !positive && value < 0) {
      return meta.index;
    }
  }
  return null;
}
function updateStacks(controller, parsed) {
  const { chart, _cachedMeta: meta } = controller;
  const stacks = chart._stacks || (chart._stacks = {});
  const { iScale, vScale, index: datasetIndex } = meta;
  const iAxis = iScale.axis;
  const vAxis = vScale.axis;
  const key = getStackKey(iScale, vScale, meta);
  const ilen = parsed.length;
  let stack;
  for (let i4 = 0; i4 < ilen; ++i4) {
    const item = parsed[i4];
    const { [iAxis]: index2, [vAxis]: value } = item;
    const itemStacks = item._stacks || (item._stacks = {});
    stack = itemStacks[vAxis] = getOrCreateStack(stacks, key, index2);
    stack[datasetIndex] = value;
    stack._top = getLastIndexInStack(stack, vScale, true, meta.type);
    stack._bottom = getLastIndexInStack(stack, vScale, false, meta.type);
    const visualValues = stack._visualValues || (stack._visualValues = {});
    visualValues[datasetIndex] = value;
  }
}
function getFirstScaleId(chart, axis) {
  const scales2 = chart.scales;
  return Object.keys(scales2).filter((key) => scales2[key].axis === axis).shift();
}
function createDatasetContext(parent, index2) {
  return createContext(parent, {
    active: false,
    dataset: void 0,
    datasetIndex: index2,
    index: index2,
    mode: "default",
    type: "dataset"
  });
}
function createDataContext(parent, index2, element) {
  return createContext(parent, {
    active: false,
    dataIndex: index2,
    parsed: void 0,
    raw: void 0,
    element,
    index: index2,
    mode: "default",
    type: "data"
  });
}
function clearStacks(meta, items) {
  const datasetIndex = meta.controller.index;
  const axis = meta.vScale && meta.vScale.axis;
  if (!axis) {
    return;
  }
  items = items || meta._parsed;
  for (const parsed of items) {
    const stacks = parsed._stacks;
    if (!stacks || stacks[axis] === void 0 || stacks[axis][datasetIndex] === void 0) {
      return;
    }
    delete stacks[axis][datasetIndex];
    if (stacks[axis]._visualValues !== void 0 && stacks[axis]._visualValues[datasetIndex] !== void 0) {
      delete stacks[axis]._visualValues[datasetIndex];
    }
  }
}
var isDirectUpdateMode = (mode) => mode === "reset" || mode === "none";
var cloneIfNotShared = (cached, shared) => shared ? cached : Object.assign({}, cached);
var createStack = (canStack, meta, chart) => canStack && !meta.hidden && meta._stacked && {
  keys: getSortedDatasetIndices(chart, true),
  values: null
};
var DatasetController = class {
  constructor(chart, datasetIndex) {
    this.chart = chart;
    this._ctx = chart.ctx;
    this.index = datasetIndex;
    this._cachedDataOpts = {};
    this._cachedMeta = this.getMeta();
    this._type = this._cachedMeta.type;
    this.options = void 0;
    this._parsing = false;
    this._data = void 0;
    this._objectData = void 0;
    this._sharedOptions = void 0;
    this._drawStart = void 0;
    this._drawCount = void 0;
    this.enableOptionSharing = false;
    this.supportsDecimation = false;
    this.$context = void 0;
    this._syncList = [];
    this.datasetElementType = new.target.datasetElementType;
    this.dataElementType = new.target.dataElementType;
    this.initialize();
  }
  initialize() {
    const meta = this._cachedMeta;
    this.configure();
    this.linkScales();
    meta._stacked = isStacked(meta.vScale, meta);
    this.addElements();
    if (this.options.fill && !this.chart.isPluginEnabled("filler")) {
      console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options");
    }
  }
  updateIndex(datasetIndex) {
    if (this.index !== datasetIndex) {
      clearStacks(this._cachedMeta);
    }
    this.index = datasetIndex;
  }
  linkScales() {
    const chart = this.chart;
    const meta = this._cachedMeta;
    const dataset = this.getDataset();
    const chooseId = (axis, x3, y3, r3) => axis === "x" ? x3 : axis === "r" ? r3 : y3;
    const xid = meta.xAxisID = valueOrDefault(dataset.xAxisID, getFirstScaleId(chart, "x"));
    const yid = meta.yAxisID = valueOrDefault(dataset.yAxisID, getFirstScaleId(chart, "y"));
    const rid = meta.rAxisID = valueOrDefault(dataset.rAxisID, getFirstScaleId(chart, "r"));
    const indexAxis = meta.indexAxis;
    const iid = meta.iAxisID = chooseId(indexAxis, xid, yid, rid);
    const vid = meta.vAxisID = chooseId(indexAxis, yid, xid, rid);
    meta.xScale = this.getScaleForId(xid);
    meta.yScale = this.getScaleForId(yid);
    meta.rScale = this.getScaleForId(rid);
    meta.iScale = this.getScaleForId(iid);
    meta.vScale = this.getScaleForId(vid);
  }
  getDataset() {
    return this.chart.data.datasets[this.index];
  }
  getMeta() {
    return this.chart.getDatasetMeta(this.index);
  }
  getScaleForId(scaleID) {
    return this.chart.scales[scaleID];
  }
  _getOtherScale(scale) {
    const meta = this._cachedMeta;
    return scale === meta.iScale ? meta.vScale : meta.iScale;
  }
  reset() {
    this._update("reset");
  }
  _destroy() {
    const meta = this._cachedMeta;
    if (this._data) {
      unlistenArrayEvents(this._data, this);
    }
    if (meta._stacked) {
      clearStacks(meta);
    }
  }
  _dataCheck() {
    const dataset = this.getDataset();
    const data = dataset.data || (dataset.data = []);
    const _data = this._data;
    if (isObject(data)) {
      const meta = this._cachedMeta;
      this._data = convertObjectDataToArray(data, meta);
    } else if (_data !== data) {
      if (_data) {
        unlistenArrayEvents(_data, this);
        const meta = this._cachedMeta;
        clearStacks(meta);
        meta._parsed = [];
      }
      if (data && Object.isExtensible(data)) {
        listenArrayEvents(data, this);
      }
      this._syncList = [];
      this._data = data;
    }
  }
  addElements() {
    const meta = this._cachedMeta;
    this._dataCheck();
    if (this.datasetElementType) {
      meta.dataset = new this.datasetElementType();
    }
  }
  buildOrUpdateElements(resetNewElements) {
    const meta = this._cachedMeta;
    const dataset = this.getDataset();
    let stackChanged = false;
    this._dataCheck();
    const oldStacked = meta._stacked;
    meta._stacked = isStacked(meta.vScale, meta);
    if (meta.stack !== dataset.stack) {
      stackChanged = true;
      clearStacks(meta);
      meta.stack = dataset.stack;
    }
    this._resyncElements(resetNewElements);
    if (stackChanged || oldStacked !== meta._stacked) {
      updateStacks(this, meta._parsed);
      meta._stacked = isStacked(meta.vScale, meta);
    }
  }
  configure() {
    const config = this.chart.config;
    const scopeKeys = config.datasetScopeKeys(this._type);
    const scopes = config.getOptionScopes(this.getDataset(), scopeKeys, true);
    this.options = config.createResolver(scopes, this.getContext());
    this._parsing = this.options.parsing;
    this._cachedDataOpts = {};
  }
  parse(start, count) {
    const { _cachedMeta: meta, _data: data } = this;
    const { iScale, _stacked } = meta;
    const iAxis = iScale.axis;
    let sorted = start === 0 && count === data.length ? true : meta._sorted;
    let prev = start > 0 && meta._parsed[start - 1];
    let i4, cur, parsed;
    if (this._parsing === false) {
      meta._parsed = data;
      meta._sorted = true;
      parsed = data;
    } else {
      if (isArray(data[start])) {
        parsed = this.parseArrayData(meta, data, start, count);
      } else if (isObject(data[start])) {
        parsed = this.parseObjectData(meta, data, start, count);
      } else {
        parsed = this.parsePrimitiveData(meta, data, start, count);
      }
      const isNotInOrderComparedToPrev = () => cur[iAxis] === null || prev && cur[iAxis] < prev[iAxis];
      for (i4 = 0; i4 < count; ++i4) {
        meta._parsed[i4 + start] = cur = parsed[i4];
        if (sorted) {
          if (isNotInOrderComparedToPrev()) {
            sorted = false;
          }
          prev = cur;
        }
      }
      meta._sorted = sorted;
    }
    if (_stacked) {
      updateStacks(this, parsed);
    }
  }
  parsePrimitiveData(meta, data, start, count) {
    const { iScale, vScale } = meta;
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const labels = iScale.getLabels();
    const singleScale = iScale === vScale;
    const parsed = new Array(count);
    let i4, ilen, index2;
    for (i4 = 0, ilen = count; i4 < ilen; ++i4) {
      index2 = i4 + start;
      parsed[i4] = {
        [iAxis]: singleScale || iScale.parse(labels[index2], index2),
        [vAxis]: vScale.parse(data[index2], index2)
      };
    }
    return parsed;
  }
  parseArrayData(meta, data, start, count) {
    const { xScale, yScale } = meta;
    const parsed = new Array(count);
    let i4, ilen, index2, item;
    for (i4 = 0, ilen = count; i4 < ilen; ++i4) {
      index2 = i4 + start;
      item = data[index2];
      parsed[i4] = {
        x: xScale.parse(item[0], index2),
        y: yScale.parse(item[1], index2)
      };
    }
    return parsed;
  }
  parseObjectData(meta, data, start, count) {
    const { xScale, yScale } = meta;
    const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
    const parsed = new Array(count);
    let i4, ilen, index2, item;
    for (i4 = 0, ilen = count; i4 < ilen; ++i4) {
      index2 = i4 + start;
      item = data[index2];
      parsed[i4] = {
        x: xScale.parse(resolveObjectKey(item, xAxisKey), index2),
        y: yScale.parse(resolveObjectKey(item, yAxisKey), index2)
      };
    }
    return parsed;
  }
  getParsed(index2) {
    return this._cachedMeta._parsed[index2];
  }
  getDataElement(index2) {
    return this._cachedMeta.data[index2];
  }
  applyStack(scale, parsed, mode) {
    const chart = this.chart;
    const meta = this._cachedMeta;
    const value = parsed[scale.axis];
    const stack = {
      keys: getSortedDatasetIndices(chart, true),
      values: parsed._stacks[scale.axis]._visualValues
    };
    return applyStack(stack, value, meta.index, {
      mode
    });
  }
  updateRangeFromParsed(range, scale, parsed, stack) {
    const parsedValue = parsed[scale.axis];
    let value = parsedValue === null ? NaN : parsedValue;
    const values = stack && parsed._stacks[scale.axis];
    if (stack && values) {
      stack.values = values;
      value = applyStack(stack, parsedValue, this._cachedMeta.index);
    }
    range.min = Math.min(range.min, value);
    range.max = Math.max(range.max, value);
  }
  getMinMax(scale, canStack) {
    const meta = this._cachedMeta;
    const _parsed = meta._parsed;
    const sorted = meta._sorted && scale === meta.iScale;
    const ilen = _parsed.length;
    const otherScale = this._getOtherScale(scale);
    const stack = createStack(canStack, meta, this.chart);
    const range = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    const { min: otherMin, max: otherMax } = getUserBounds(otherScale);
    let i4, parsed;
    function _skip() {
      parsed = _parsed[i4];
      const otherValue = parsed[otherScale.axis];
      return !isNumberFinite(parsed[scale.axis]) || otherMin > otherValue || otherMax < otherValue;
    }
    for (i4 = 0; i4 < ilen; ++i4) {
      if (_skip()) {
        continue;
      }
      this.updateRangeFromParsed(range, scale, parsed, stack);
      if (sorted) {
        break;
      }
    }
    if (sorted) {
      for (i4 = ilen - 1; i4 >= 0; --i4) {
        if (_skip()) {
          continue;
        }
        this.updateRangeFromParsed(range, scale, parsed, stack);
        break;
      }
    }
    return range;
  }
  getAllParsedValues(scale) {
    const parsed = this._cachedMeta._parsed;
    const values = [];
    let i4, ilen, value;
    for (i4 = 0, ilen = parsed.length; i4 < ilen; ++i4) {
      value = parsed[i4][scale.axis];
      if (isNumberFinite(value)) {
        values.push(value);
      }
    }
    return values;
  }
  getMaxOverflow() {
    return false;
  }
  getLabelAndValue(index2) {
    const meta = this._cachedMeta;
    const iScale = meta.iScale;
    const vScale = meta.vScale;
    const parsed = this.getParsed(index2);
    return {
      label: iScale ? "" + iScale.getLabelForValue(parsed[iScale.axis]) : "",
      value: vScale ? "" + vScale.getLabelForValue(parsed[vScale.axis]) : ""
    };
  }
  _update(mode) {
    const meta = this._cachedMeta;
    this.update(mode || "default");
    meta._clip = toClip(valueOrDefault(this.options.clip, defaultClip(meta.xScale, meta.yScale, this.getMaxOverflow())));
  }
  update(mode) {
  }
  draw() {
    const ctx = this._ctx;
    const chart = this.chart;
    const meta = this._cachedMeta;
    const elements2 = meta.data || [];
    const area = chart.chartArea;
    const active = [];
    const start = this._drawStart || 0;
    const count = this._drawCount || elements2.length - start;
    const drawActiveElementsOnTop = this.options.drawActiveElementsOnTop;
    let i4;
    if (meta.dataset) {
      meta.dataset.draw(ctx, area, start, count);
    }
    for (i4 = start; i4 < start + count; ++i4) {
      const element = elements2[i4];
      if (element.hidden) {
        continue;
      }
      if (element.active && drawActiveElementsOnTop) {
        active.push(element);
      } else {
        element.draw(ctx, area);
      }
    }
    for (i4 = 0; i4 < active.length; ++i4) {
      active[i4].draw(ctx, area);
    }
  }
  getStyle(index2, active) {
    const mode = active ? "active" : "default";
    return index2 === void 0 && this._cachedMeta.dataset ? this.resolveDatasetElementOptions(mode) : this.resolveDataElementOptions(index2 || 0, mode);
  }
  getContext(index2, active, mode) {
    const dataset = this.getDataset();
    let context;
    if (index2 >= 0 && index2 < this._cachedMeta.data.length) {
      const element = this._cachedMeta.data[index2];
      context = element.$context || (element.$context = createDataContext(this.getContext(), index2, element));
      context.parsed = this.getParsed(index2);
      context.raw = dataset.data[index2];
      context.index = context.dataIndex = index2;
    } else {
      context = this.$context || (this.$context = createDatasetContext(this.chart.getContext(), this.index));
      context.dataset = dataset;
      context.index = context.datasetIndex = this.index;
    }
    context.active = !!active;
    context.mode = mode;
    return context;
  }
  resolveDatasetElementOptions(mode) {
    return this._resolveElementOptions(this.datasetElementType.id, mode);
  }
  resolveDataElementOptions(index2, mode) {
    return this._resolveElementOptions(this.dataElementType.id, mode, index2);
  }
  _resolveElementOptions(elementType, mode = "default", index2) {
    const active = mode === "active";
    const cache = this._cachedDataOpts;
    const cacheKey = elementType + "-" + mode;
    const cached = cache[cacheKey];
    const sharing = this.enableOptionSharing && defined(index2);
    if (cached) {
      return cloneIfNotShared(cached, sharing);
    }
    const config = this.chart.config;
    const scopeKeys = config.datasetElementScopeKeys(this._type, elementType);
    const prefixes = active ? [
      `${elementType}Hover`,
      "hover",
      elementType,
      ""
    ] : [
      elementType,
      ""
    ];
    const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
    const names2 = Object.keys(defaults.elements[elementType]);
    const context = () => this.getContext(index2, active, mode);
    const values = config.resolveNamedOptions(scopes, names2, context, prefixes);
    if (values.$shared) {
      values.$shared = sharing;
      cache[cacheKey] = Object.freeze(cloneIfNotShared(values, sharing));
    }
    return values;
  }
  _resolveAnimations(index2, transition, active) {
    const chart = this.chart;
    const cache = this._cachedDataOpts;
    const cacheKey = `animation-${transition}`;
    const cached = cache[cacheKey];
    if (cached) {
      return cached;
    }
    let options;
    if (chart.options.animation !== false) {
      const config = this.chart.config;
      const scopeKeys = config.datasetAnimationScopeKeys(this._type, transition);
      const scopes = config.getOptionScopes(this.getDataset(), scopeKeys);
      options = config.createResolver(scopes, this.getContext(index2, active, transition));
    }
    const animations = new Animations(chart, options && options.animations);
    if (options && options._cacheable) {
      cache[cacheKey] = Object.freeze(animations);
    }
    return animations;
  }
  getSharedOptions(options) {
    if (!options.$shared) {
      return;
    }
    return this._sharedOptions || (this._sharedOptions = Object.assign({}, options));
  }
  includeOptions(mode, sharedOptions) {
    return !sharedOptions || isDirectUpdateMode(mode) || this.chart._animationsDisabled;
  }
  _getSharedOptions(start, mode) {
    const firstOpts = this.resolveDataElementOptions(start, mode);
    const previouslySharedOptions = this._sharedOptions;
    const sharedOptions = this.getSharedOptions(firstOpts);
    const includeOptions = this.includeOptions(mode, sharedOptions) || sharedOptions !== previouslySharedOptions;
    this.updateSharedOptions(sharedOptions, mode, firstOpts);
    return {
      sharedOptions,
      includeOptions
    };
  }
  updateElement(element, index2, properties, mode) {
    if (isDirectUpdateMode(mode)) {
      Object.assign(element, properties);
    } else {
      this._resolveAnimations(index2, mode).update(element, properties);
    }
  }
  updateSharedOptions(sharedOptions, mode, newOptions) {
    if (sharedOptions && !isDirectUpdateMode(mode)) {
      this._resolveAnimations(void 0, mode).update(sharedOptions, newOptions);
    }
  }
  _setStyle(element, index2, mode, active) {
    element.active = active;
    const options = this.getStyle(index2, active);
    this._resolveAnimations(index2, mode, active).update(element, {
      options: !active && this.getSharedOptions(options) || options
    });
  }
  removeHoverStyle(element, datasetIndex, index2) {
    this._setStyle(element, index2, "active", false);
  }
  setHoverStyle(element, datasetIndex, index2) {
    this._setStyle(element, index2, "active", true);
  }
  _removeDatasetHoverStyle() {
    const element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, void 0, "active", false);
    }
  }
  _setDatasetHoverStyle() {
    const element = this._cachedMeta.dataset;
    if (element) {
      this._setStyle(element, void 0, "active", true);
    }
  }
  _resyncElements(resetNewElements) {
    const data = this._data;
    const elements2 = this._cachedMeta.data;
    for (const [method, arg1, arg2] of this._syncList) {
      this[method](arg1, arg2);
    }
    this._syncList = [];
    const numMeta = elements2.length;
    const numData = data.length;
    const count = Math.min(numData, numMeta);
    if (count) {
      this.parse(0, count);
    }
    if (numData > numMeta) {
      this._insertElements(numMeta, numData - numMeta, resetNewElements);
    } else if (numData < numMeta) {
      this._removeElements(numData, numMeta - numData);
    }
  }
  _insertElements(start, count, resetNewElements = true) {
    const meta = this._cachedMeta;
    const data = meta.data;
    const end = start + count;
    let i4;
    const move = (arr) => {
      arr.length += count;
      for (i4 = arr.length - 1; i4 >= end; i4--) {
        arr[i4] = arr[i4 - count];
      }
    };
    move(data);
    for (i4 = start; i4 < end; ++i4) {
      data[i4] = new this.dataElementType();
    }
    if (this._parsing) {
      move(meta._parsed);
    }
    this.parse(start, count);
    if (resetNewElements) {
      this.updateElements(data, start, count, "reset");
    }
  }
  updateElements(element, start, count, mode) {
  }
  _removeElements(start, count) {
    const meta = this._cachedMeta;
    if (this._parsing) {
      const removed = meta._parsed.splice(start, count);
      if (meta._stacked) {
        clearStacks(meta, removed);
      }
    }
    meta.data.splice(start, count);
  }
  _sync(args) {
    if (this._parsing) {
      this._syncList.push(args);
    } else {
      const [method, arg1, arg2] = args;
      this[method](arg1, arg2);
    }
    this.chart._dataChanges.push([
      this.index,
      ...args
    ]);
  }
  _onDataPush() {
    const count = arguments.length;
    this._sync([
      "_insertElements",
      this.getDataset().data.length - count,
      count
    ]);
  }
  _onDataPop() {
    this._sync([
      "_removeElements",
      this._cachedMeta.data.length - 1,
      1
    ]);
  }
  _onDataShift() {
    this._sync([
      "_removeElements",
      0,
      1
    ]);
  }
  _onDataSplice(start, count) {
    if (count) {
      this._sync([
        "_removeElements",
        start,
        count
      ]);
    }
    const newCount = arguments.length - 2;
    if (newCount) {
      this._sync([
        "_insertElements",
        start,
        newCount
      ]);
    }
  }
  _onDataUnshift() {
    this._sync([
      "_insertElements",
      0,
      arguments.length
    ]);
  }
};
__publicField(DatasetController, "defaults", {});
__publicField(DatasetController, "datasetElementType", null);
__publicField(DatasetController, "dataElementType", null);
function getAllScaleValues(scale, type) {
  if (!scale._cache.$bar) {
    const visibleMetas = scale.getMatchingVisibleMetas(type);
    let values = [];
    for (let i4 = 0, ilen = visibleMetas.length; i4 < ilen; i4++) {
      values = values.concat(visibleMetas[i4].controller.getAllParsedValues(scale));
    }
    scale._cache.$bar = _arrayUnique(values.sort((a3, b2) => a3 - b2));
  }
  return scale._cache.$bar;
}
function computeMinSampleSize(meta) {
  const scale = meta.iScale;
  const values = getAllScaleValues(scale, meta.type);
  let min = scale._length;
  let i4, ilen, curr, prev;
  const updateMinAndPrev = () => {
    if (curr === 32767 || curr === -32768) {
      return;
    }
    if (defined(prev)) {
      min = Math.min(min, Math.abs(curr - prev) || min);
    }
    prev = curr;
  };
  for (i4 = 0, ilen = values.length; i4 < ilen; ++i4) {
    curr = scale.getPixelForValue(values[i4]);
    updateMinAndPrev();
  }
  prev = void 0;
  for (i4 = 0, ilen = scale.ticks.length; i4 < ilen; ++i4) {
    curr = scale.getPixelForTick(i4);
    updateMinAndPrev();
  }
  return min;
}
function computeFitCategoryTraits(index2, ruler, options, stackCount) {
  const thickness = options.barThickness;
  let size, ratio;
  if (isNullOrUndef(thickness)) {
    size = ruler.min * options.categoryPercentage;
    ratio = options.barPercentage;
  } else {
    size = thickness * stackCount;
    ratio = 1;
  }
  return {
    chunk: size / stackCount,
    ratio,
    start: ruler.pixels[index2] - size / 2
  };
}
function computeFlexCategoryTraits(index2, ruler, options, stackCount) {
  const pixels = ruler.pixels;
  const curr = pixels[index2];
  let prev = index2 > 0 ? pixels[index2 - 1] : null;
  let next = index2 < pixels.length - 1 ? pixels[index2 + 1] : null;
  const percent = options.categoryPercentage;
  if (prev === null) {
    prev = curr - (next === null ? ruler.end - ruler.start : next - curr);
  }
  if (next === null) {
    next = curr + curr - prev;
  }
  const start = curr - (curr - Math.min(prev, next)) / 2 * percent;
  const size = Math.abs(next - prev) / 2 * percent;
  return {
    chunk: size / stackCount,
    ratio: options.barPercentage,
    start
  };
}
function parseFloatBar(entry, item, vScale, i4) {
  const startValue = vScale.parse(entry[0], i4);
  const endValue = vScale.parse(entry[1], i4);
  const min = Math.min(startValue, endValue);
  const max = Math.max(startValue, endValue);
  let barStart = min;
  let barEnd = max;
  if (Math.abs(min) > Math.abs(max)) {
    barStart = max;
    barEnd = min;
  }
  item[vScale.axis] = barEnd;
  item._custom = {
    barStart,
    barEnd,
    start: startValue,
    end: endValue,
    min,
    max
  };
}
function parseValue(entry, item, vScale, i4) {
  if (isArray(entry)) {
    parseFloatBar(entry, item, vScale, i4);
  } else {
    item[vScale.axis] = vScale.parse(entry, i4);
  }
  return item;
}
function parseArrayOrPrimitive(meta, data, start, count) {
  const iScale = meta.iScale;
  const vScale = meta.vScale;
  const labels = iScale.getLabels();
  const singleScale = iScale === vScale;
  const parsed = [];
  let i4, ilen, item, entry;
  for (i4 = start, ilen = start + count; i4 < ilen; ++i4) {
    entry = data[i4];
    item = {};
    item[iScale.axis] = singleScale || iScale.parse(labels[i4], i4);
    parsed.push(parseValue(entry, item, vScale, i4));
  }
  return parsed;
}
function isFloatBar(custom) {
  return custom && custom.barStart !== void 0 && custom.barEnd !== void 0;
}
function barSign(size, vScale, actualBase) {
  if (size !== 0) {
    return sign(size);
  }
  return (vScale.isHorizontal() ? 1 : -1) * (vScale.min >= actualBase ? 1 : -1);
}
function borderProps(properties) {
  let reverse, start, end, top, bottom;
  if (properties.horizontal) {
    reverse = properties.base > properties.x;
    start = "left";
    end = "right";
  } else {
    reverse = properties.base < properties.y;
    start = "bottom";
    end = "top";
  }
  if (reverse) {
    top = "end";
    bottom = "start";
  } else {
    top = "start";
    bottom = "end";
  }
  return {
    start,
    end,
    reverse,
    top,
    bottom
  };
}
function setBorderSkipped(properties, options, stack, index2) {
  let edge = options.borderSkipped;
  const res = {};
  if (!edge) {
    properties.borderSkipped = res;
    return;
  }
  if (edge === true) {
    properties.borderSkipped = {
      top: true,
      right: true,
      bottom: true,
      left: true
    };
    return;
  }
  const { start, end, reverse, top, bottom } = borderProps(properties);
  if (edge === "middle" && stack) {
    properties.enableBorderRadius = true;
    if ((stack._top || 0) === index2) {
      edge = top;
    } else if ((stack._bottom || 0) === index2) {
      edge = bottom;
    } else {
      res[parseEdge(bottom, start, end, reverse)] = true;
      edge = top;
    }
  }
  res[parseEdge(edge, start, end, reverse)] = true;
  properties.borderSkipped = res;
}
function parseEdge(edge, a3, b2, reverse) {
  if (reverse) {
    edge = swap(edge, a3, b2);
    edge = startEnd(edge, b2, a3);
  } else {
    edge = startEnd(edge, a3, b2);
  }
  return edge;
}
function swap(orig, v1, v22) {
  return orig === v1 ? v22 : orig === v22 ? v1 : orig;
}
function startEnd(v3, start, end) {
  return v3 === "start" ? start : v3 === "end" ? end : v3;
}
function setInflateAmount(properties, { inflateAmount }, ratio) {
  properties.inflateAmount = inflateAmount === "auto" ? ratio === 1 ? 0.33 : 0 : inflateAmount;
}
var BarController = class extends DatasetController {
  parsePrimitiveData(meta, data, start, count) {
    return parseArrayOrPrimitive(meta, data, start, count);
  }
  parseArrayData(meta, data, start, count) {
    return parseArrayOrPrimitive(meta, data, start, count);
  }
  parseObjectData(meta, data, start, count) {
    const { iScale, vScale } = meta;
    const { xAxisKey = "x", yAxisKey = "y" } = this._parsing;
    const iAxisKey = iScale.axis === "x" ? xAxisKey : yAxisKey;
    const vAxisKey = vScale.axis === "x" ? xAxisKey : yAxisKey;
    const parsed = [];
    let i4, ilen, item, obj;
    for (i4 = start, ilen = start + count; i4 < ilen; ++i4) {
      obj = data[i4];
      item = {};
      item[iScale.axis] = iScale.parse(resolveObjectKey(obj, iAxisKey), i4);
      parsed.push(parseValue(resolveObjectKey(obj, vAxisKey), item, vScale, i4));
    }
    return parsed;
  }
  updateRangeFromParsed(range, scale, parsed, stack) {
    super.updateRangeFromParsed(range, scale, parsed, stack);
    const custom = parsed._custom;
    if (custom && scale === this._cachedMeta.vScale) {
      range.min = Math.min(range.min, custom.min);
      range.max = Math.max(range.max, custom.max);
    }
  }
  getMaxOverflow() {
    return 0;
  }
  getLabelAndValue(index2) {
    const meta = this._cachedMeta;
    const { iScale, vScale } = meta;
    const parsed = this.getParsed(index2);
    const custom = parsed._custom;
    const value = isFloatBar(custom) ? "[" + custom.start + ", " + custom.end + "]" : "" + vScale.getLabelForValue(parsed[vScale.axis]);
    return {
      label: "" + iScale.getLabelForValue(parsed[iScale.axis]),
      value
    };
  }
  initialize() {
    this.enableOptionSharing = true;
    super.initialize();
    const meta = this._cachedMeta;
    meta.stack = this.getDataset().stack;
  }
  update(mode) {
    const meta = this._cachedMeta;
    this.updateElements(meta.data, 0, meta.data.length, mode);
  }
  updateElements(bars, start, count, mode) {
    const reset = mode === "reset";
    const { index: index2, _cachedMeta: { vScale } } = this;
    const base = vScale.getBasePixel();
    const horizontal = vScale.isHorizontal();
    const ruler = this._getRuler();
    const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
    for (let i4 = start; i4 < start + count; i4++) {
      const parsed = this.getParsed(i4);
      const vpixels = reset || isNullOrUndef(parsed[vScale.axis]) ? {
        base,
        head: base
      } : this._calculateBarValuePixels(i4);
      const ipixels = this._calculateBarIndexPixels(i4, ruler);
      const stack = (parsed._stacks || {})[vScale.axis];
      const properties = {
        horizontal,
        base: vpixels.base,
        enableBorderRadius: !stack || isFloatBar(parsed._custom) || index2 === stack._top || index2 === stack._bottom,
        x: horizontal ? vpixels.head : ipixels.center,
        y: horizontal ? ipixels.center : vpixels.head,
        height: horizontal ? ipixels.size : Math.abs(vpixels.size),
        width: horizontal ? Math.abs(vpixels.size) : ipixels.size
      };
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i4, bars[i4].active ? "active" : mode);
      }
      const options = properties.options || bars[i4].options;
      setBorderSkipped(properties, options, stack, index2);
      setInflateAmount(properties, options, ruler.ratio);
      this.updateElement(bars[i4], i4, properties, mode);
    }
  }
  _getStacks(last, dataIndex) {
    const { iScale } = this._cachedMeta;
    const metasets = iScale.getMatchingVisibleMetas(this._type).filter((meta) => meta.controller.options.grouped);
    const stacked = iScale.options.stacked;
    const stacks = [];
    const currentParsed = this._cachedMeta.controller.getParsed(dataIndex);
    const iScaleValue = currentParsed && currentParsed[iScale.axis];
    const skipNull = (meta) => {
      const parsed = meta._parsed.find((item) => item[iScale.axis] === iScaleValue);
      const val = parsed && parsed[meta.vScale.axis];
      if (isNullOrUndef(val) || isNaN(val)) {
        return true;
      }
    };
    for (const meta of metasets) {
      if (dataIndex !== void 0 && skipNull(meta)) {
        continue;
      }
      if (stacked === false || stacks.indexOf(meta.stack) === -1 || stacked === void 0 && meta.stack === void 0) {
        stacks.push(meta.stack);
      }
      if (meta.index === last) {
        break;
      }
    }
    if (!stacks.length) {
      stacks.push(void 0);
    }
    return stacks;
  }
  _getStackCount(index2) {
    return this._getStacks(void 0, index2).length;
  }
  _getAxisCount() {
    return this._getAxis().length;
  }
  getFirstScaleIdForIndexAxis() {
    const scales2 = this.chart.scales;
    const indexScaleId = this.chart.options.indexAxis;
    return Object.keys(scales2).filter((key) => scales2[key].axis === indexScaleId).shift();
  }
  _getAxis() {
    const axis = {};
    const firstScaleAxisId = this.getFirstScaleIdForIndexAxis();
    for (const dataset of this.chart.data.datasets) {
      axis[valueOrDefault(this.chart.options.indexAxis === "x" ? dataset.xAxisID : dataset.yAxisID, firstScaleAxisId)] = true;
    }
    return Object.keys(axis);
  }
  _getStackIndex(datasetIndex, name, dataIndex) {
    const stacks = this._getStacks(datasetIndex, dataIndex);
    const index2 = name !== void 0 ? stacks.indexOf(name) : -1;
    return index2 === -1 ? stacks.length - 1 : index2;
  }
  _getRuler() {
    const opts = this.options;
    const meta = this._cachedMeta;
    const iScale = meta.iScale;
    const pixels = [];
    let i4, ilen;
    for (i4 = 0, ilen = meta.data.length; i4 < ilen; ++i4) {
      pixels.push(iScale.getPixelForValue(this.getParsed(i4)[iScale.axis], i4));
    }
    const barThickness = opts.barThickness;
    const min = barThickness || computeMinSampleSize(meta);
    return {
      min,
      pixels,
      start: iScale._startPixel,
      end: iScale._endPixel,
      stackCount: this._getStackCount(),
      scale: iScale,
      grouped: opts.grouped,
      ratio: barThickness ? 1 : opts.categoryPercentage * opts.barPercentage
    };
  }
  _calculateBarValuePixels(index2) {
    const { _cachedMeta: { vScale, _stacked, index: datasetIndex }, options: { base: baseValue, minBarLength } } = this;
    const actualBase = baseValue || 0;
    const parsed = this.getParsed(index2);
    const custom = parsed._custom;
    const floating = isFloatBar(custom);
    let value = parsed[vScale.axis];
    let start = 0;
    let length = _stacked ? this.applyStack(vScale, parsed, _stacked) : value;
    let head, size;
    if (length !== value) {
      start = length - value;
      length = value;
    }
    if (floating) {
      value = custom.barStart;
      length = custom.barEnd - custom.barStart;
      if (value !== 0 && sign(value) !== sign(custom.barEnd)) {
        start = 0;
      }
      start += value;
    }
    const startValue = !isNullOrUndef(baseValue) && !floating ? baseValue : start;
    let base = vScale.getPixelForValue(startValue);
    if (this.chart.getDataVisibility(index2)) {
      head = vScale.getPixelForValue(start + length);
    } else {
      head = base;
    }
    size = head - base;
    if (Math.abs(size) < minBarLength) {
      size = barSign(size, vScale, actualBase) * minBarLength;
      if (value === actualBase) {
        base -= size / 2;
      }
      const startPixel = vScale.getPixelForDecimal(0);
      const endPixel = vScale.getPixelForDecimal(1);
      const min = Math.min(startPixel, endPixel);
      const max = Math.max(startPixel, endPixel);
      base = Math.max(Math.min(base, max), min);
      head = base + size;
      if (_stacked && !floating) {
        parsed._stacks[vScale.axis]._visualValues[datasetIndex] = vScale.getValueForPixel(head) - vScale.getValueForPixel(base);
      }
    }
    if (base === vScale.getPixelForValue(actualBase)) {
      const halfGrid = sign(size) * vScale.getLineWidthForValue(actualBase) / 2;
      base += halfGrid;
      size -= halfGrid;
    }
    return {
      size,
      base,
      head,
      center: head + size / 2
    };
  }
  _calculateBarIndexPixels(index2, ruler) {
    const scale = ruler.scale;
    const options = this.options;
    const skipNull = options.skipNull;
    const maxBarThickness = valueOrDefault(options.maxBarThickness, Infinity);
    let center, size;
    const axisCount = this._getAxisCount();
    if (ruler.grouped) {
      const stackCount = skipNull ? this._getStackCount(index2) : ruler.stackCount;
      const range = options.barThickness === "flex" ? computeFlexCategoryTraits(index2, ruler, options, stackCount * axisCount) : computeFitCategoryTraits(index2, ruler, options, stackCount * axisCount);
      const axisID = this.chart.options.indexAxis === "x" ? this.getDataset().xAxisID : this.getDataset().yAxisID;
      const axisNumber = this._getAxis().indexOf(valueOrDefault(axisID, this.getFirstScaleIdForIndexAxis()));
      const stackIndex = this._getStackIndex(this.index, this._cachedMeta.stack, skipNull ? index2 : void 0) + axisNumber;
      center = range.start + range.chunk * stackIndex + range.chunk / 2;
      size = Math.min(maxBarThickness, range.chunk * range.ratio);
    } else {
      center = scale.getPixelForValue(this.getParsed(index2)[scale.axis], index2);
      size = Math.min(maxBarThickness, ruler.min * ruler.ratio);
    }
    return {
      base: center - size / 2,
      head: center + size / 2,
      center,
      size
    };
  }
  draw() {
    const meta = this._cachedMeta;
    const vScale = meta.vScale;
    const rects = meta.data;
    const ilen = rects.length;
    let i4 = 0;
    for (; i4 < ilen; ++i4) {
      if (this.getParsed(i4)[vScale.axis] !== null && !rects[i4].hidden) {
        rects[i4].draw(this._ctx);
      }
    }
  }
};
__publicField(BarController, "id", "bar");
__publicField(BarController, "defaults", {
  datasetElementType: false,
  dataElementType: "bar",
  categoryPercentage: 0.8,
  barPercentage: 0.9,
  grouped: true,
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "base",
        "width",
        "height"
      ]
    }
  }
});
__publicField(BarController, "overrides", {
  scales: {
    _index_: {
      type: "category",
      offset: true,
      grid: {
        offset: true
      }
    },
    _value_: {
      type: "linear",
      beginAtZero: true
    }
  }
});
var BubbleController = class extends DatasetController {
  initialize() {
    this.enableOptionSharing = true;
    super.initialize();
  }
  parsePrimitiveData(meta, data, start, count) {
    const parsed = super.parsePrimitiveData(meta, data, start, count);
    for (let i4 = 0; i4 < parsed.length; i4++) {
      parsed[i4]._custom = this.resolveDataElementOptions(i4 + start).radius;
    }
    return parsed;
  }
  parseArrayData(meta, data, start, count) {
    const parsed = super.parseArrayData(meta, data, start, count);
    for (let i4 = 0; i4 < parsed.length; i4++) {
      const item = data[start + i4];
      parsed[i4]._custom = valueOrDefault(item[2], this.resolveDataElementOptions(i4 + start).radius);
    }
    return parsed;
  }
  parseObjectData(meta, data, start, count) {
    const parsed = super.parseObjectData(meta, data, start, count);
    for (let i4 = 0; i4 < parsed.length; i4++) {
      const item = data[start + i4];
      parsed[i4]._custom = valueOrDefault(item && item.r && +item.r, this.resolveDataElementOptions(i4 + start).radius);
    }
    return parsed;
  }
  getMaxOverflow() {
    const data = this._cachedMeta.data;
    let max = 0;
    for (let i4 = data.length - 1; i4 >= 0; --i4) {
      max = Math.max(max, data[i4].size(this.resolveDataElementOptions(i4)) / 2);
    }
    return max > 0 && max;
  }
  getLabelAndValue(index2) {
    const meta = this._cachedMeta;
    const labels = this.chart.data.labels || [];
    const { xScale, yScale } = meta;
    const parsed = this.getParsed(index2);
    const x3 = xScale.getLabelForValue(parsed.x);
    const y3 = yScale.getLabelForValue(parsed.y);
    const r3 = parsed._custom;
    return {
      label: labels[index2] || "",
      value: "(" + x3 + ", " + y3 + (r3 ? ", " + r3 : "") + ")"
    };
  }
  update(mode) {
    const points = this._cachedMeta.data;
    this.updateElements(points, 0, points.length, mode);
  }
  updateElements(points, start, count, mode) {
    const reset = mode === "reset";
    const { iScale, vScale } = this._cachedMeta;
    const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    for (let i4 = start; i4 < start + count; i4++) {
      const point = points[i4];
      const parsed = !reset && this.getParsed(i4);
      const properties = {};
      const iPixel = properties[iAxis] = reset ? iScale.getPixelForDecimal(0.5) : iScale.getPixelForValue(parsed[iAxis]);
      const vPixel = properties[vAxis] = reset ? vScale.getBasePixel() : vScale.getPixelForValue(parsed[vAxis]);
      properties.skip = isNaN(iPixel) || isNaN(vPixel);
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i4, point.active ? "active" : mode);
        if (reset) {
          properties.options.radius = 0;
        }
      }
      this.updateElement(point, i4, properties, mode);
    }
  }
  resolveDataElementOptions(index2, mode) {
    const parsed = this.getParsed(index2);
    let values = super.resolveDataElementOptions(index2, mode);
    if (values.$shared) {
      values = Object.assign({}, values, {
        $shared: false
      });
    }
    const radius = values.radius;
    if (mode !== "active") {
      values.radius = 0;
    }
    values.radius += valueOrDefault(parsed && parsed._custom, radius);
    return values;
  }
};
__publicField(BubbleController, "id", "bubble");
__publicField(BubbleController, "defaults", {
  datasetElementType: false,
  dataElementType: "point",
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "borderWidth",
        "radius"
      ]
    }
  }
});
__publicField(BubbleController, "overrides", {
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
function getRatioAndOffset(rotation, circumference, cutout) {
  let ratioX = 1;
  let ratioY = 1;
  let offsetX = 0;
  let offsetY = 0;
  if (circumference < TAU) {
    const startAngle = rotation;
    const endAngle = startAngle + circumference;
    const startX = Math.cos(startAngle);
    const startY = Math.sin(startAngle);
    const endX = Math.cos(endAngle);
    const endY = Math.sin(endAngle);
    const calcMax = (angle, a3, b2) => _angleBetween(angle, startAngle, endAngle, true) ? 1 : Math.max(a3, a3 * cutout, b2, b2 * cutout);
    const calcMin = (angle, a3, b2) => _angleBetween(angle, startAngle, endAngle, true) ? -1 : Math.min(a3, a3 * cutout, b2, b2 * cutout);
    const maxX = calcMax(0, startX, endX);
    const maxY = calcMax(HALF_PI, startY, endY);
    const minX = calcMin(PI, startX, endX);
    const minY = calcMin(PI + HALF_PI, startY, endY);
    ratioX = (maxX - minX) / 2;
    ratioY = (maxY - minY) / 2;
    offsetX = -(maxX + minX) / 2;
    offsetY = -(maxY + minY) / 2;
  }
  return {
    ratioX,
    ratioY,
    offsetX,
    offsetY
  };
}
var DoughnutController = class extends DatasetController {
  constructor(chart, datasetIndex) {
    super(chart, datasetIndex);
    this.enableOptionSharing = true;
    this.innerRadius = void 0;
    this.outerRadius = void 0;
    this.offsetX = void 0;
    this.offsetY = void 0;
  }
  linkScales() {
  }
  parse(start, count) {
    const data = this.getDataset().data;
    const meta = this._cachedMeta;
    if (this._parsing === false) {
      meta._parsed = data;
    } else {
      let getter = (i5) => +data[i5];
      if (isObject(data[start])) {
        const { key = "value" } = this._parsing;
        getter = (i5) => +resolveObjectKey(data[i5], key);
      }
      let i4, ilen;
      for (i4 = start, ilen = start + count; i4 < ilen; ++i4) {
        meta._parsed[i4] = getter(i4);
      }
    }
  }
  _getRotation() {
    return toRadians(this.options.rotation - 90);
  }
  _getCircumference() {
    return toRadians(this.options.circumference);
  }
  _getRotationExtents() {
    let min = TAU;
    let max = -TAU;
    for (let i4 = 0; i4 < this.chart.data.datasets.length; ++i4) {
      if (this.chart.isDatasetVisible(i4) && this.chart.getDatasetMeta(i4).type === this._type) {
        const controller = this.chart.getDatasetMeta(i4).controller;
        const rotation = controller._getRotation();
        const circumference = controller._getCircumference();
        min = Math.min(min, rotation);
        max = Math.max(max, rotation + circumference);
      }
    }
    return {
      rotation: min,
      circumference: max - min
    };
  }
  update(mode) {
    const chart = this.chart;
    const { chartArea } = chart;
    const meta = this._cachedMeta;
    const arcs = meta.data;
    const spacing = this.getMaxBorderWidth() + this.getMaxOffset(arcs) + this.options.spacing;
    const maxSize = Math.max((Math.min(chartArea.width, chartArea.height) - spacing) / 2, 0);
    const cutout = Math.min(toPercentage(this.options.cutout, maxSize), 1);
    const chartWeight = this._getRingWeight(this.index);
    const { circumference, rotation } = this._getRotationExtents();
    const { ratioX, ratioY, offsetX, offsetY } = getRatioAndOffset(rotation, circumference, cutout);
    const maxWidth = (chartArea.width - spacing) / ratioX;
    const maxHeight = (chartArea.height - spacing) / ratioY;
    const maxRadius = Math.max(Math.min(maxWidth, maxHeight) / 2, 0);
    const outerRadius = toDimension(this.options.radius, maxRadius);
    const innerRadius = Math.max(outerRadius * cutout, 0);
    const radiusLength = (outerRadius - innerRadius) / this._getVisibleDatasetWeightTotal();
    this.offsetX = offsetX * outerRadius;
    this.offsetY = offsetY * outerRadius;
    meta.total = this.calculateTotal();
    this.outerRadius = outerRadius - radiusLength * this._getRingWeightOffset(this.index);
    this.innerRadius = Math.max(this.outerRadius - radiusLength * chartWeight, 0);
    this.updateElements(arcs, 0, arcs.length, mode);
  }
  _circumference(i4, reset) {
    const opts = this.options;
    const meta = this._cachedMeta;
    const circumference = this._getCircumference();
    if (reset && opts.animation.animateRotate || !this.chart.getDataVisibility(i4) || meta._parsed[i4] === null || meta.data[i4].hidden) {
      return 0;
    }
    return this.calculateCircumference(meta._parsed[i4] * circumference / TAU);
  }
  updateElements(arcs, start, count, mode) {
    const reset = mode === "reset";
    const chart = this.chart;
    const chartArea = chart.chartArea;
    const opts = chart.options;
    const animationOpts = opts.animation;
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;
    const animateScale = reset && animationOpts.animateScale;
    const innerRadius = animateScale ? 0 : this.innerRadius;
    const outerRadius = animateScale ? 0 : this.outerRadius;
    const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
    let startAngle = this._getRotation();
    let i4;
    for (i4 = 0; i4 < start; ++i4) {
      startAngle += this._circumference(i4, reset);
    }
    for (i4 = start; i4 < start + count; ++i4) {
      const circumference = this._circumference(i4, reset);
      const arc = arcs[i4];
      const properties = {
        x: centerX + this.offsetX,
        y: centerY + this.offsetY,
        startAngle,
        endAngle: startAngle + circumference,
        circumference,
        outerRadius,
        innerRadius
      };
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i4, arc.active ? "active" : mode);
      }
      startAngle += circumference;
      this.updateElement(arc, i4, properties, mode);
    }
  }
  calculateTotal() {
    const meta = this._cachedMeta;
    const metaData = meta.data;
    let total = 0;
    let i4;
    for (i4 = 0; i4 < metaData.length; i4++) {
      const value = meta._parsed[i4];
      if (value !== null && !isNaN(value) && this.chart.getDataVisibility(i4) && !metaData[i4].hidden) {
        total += Math.abs(value);
      }
    }
    return total;
  }
  calculateCircumference(value) {
    const total = this._cachedMeta.total;
    if (total > 0 && !isNaN(value)) {
      return TAU * (Math.abs(value) / total);
    }
    return 0;
  }
  getLabelAndValue(index2) {
    const meta = this._cachedMeta;
    const chart = this.chart;
    const labels = chart.data.labels || [];
    const value = formatNumber(meta._parsed[index2], chart.options.locale);
    return {
      label: labels[index2] || "",
      value
    };
  }
  getMaxBorderWidth(arcs) {
    let max = 0;
    const chart = this.chart;
    let i4, ilen, meta, controller, options;
    if (!arcs) {
      for (i4 = 0, ilen = chart.data.datasets.length; i4 < ilen; ++i4) {
        if (chart.isDatasetVisible(i4)) {
          meta = chart.getDatasetMeta(i4);
          arcs = meta.data;
          controller = meta.controller;
          break;
        }
      }
    }
    if (!arcs) {
      return 0;
    }
    for (i4 = 0, ilen = arcs.length; i4 < ilen; ++i4) {
      options = controller.resolveDataElementOptions(i4);
      if (options.borderAlign !== "inner") {
        max = Math.max(max, options.borderWidth || 0, options.hoverBorderWidth || 0);
      }
    }
    return max;
  }
  getMaxOffset(arcs) {
    let max = 0;
    for (let i4 = 0, ilen = arcs.length; i4 < ilen; ++i4) {
      const options = this.resolveDataElementOptions(i4);
      max = Math.max(max, options.offset || 0, options.hoverOffset || 0);
    }
    return max;
  }
  _getRingWeightOffset(datasetIndex) {
    let ringWeightOffset = 0;
    for (let i4 = 0; i4 < datasetIndex; ++i4) {
      if (this.chart.isDatasetVisible(i4)) {
        ringWeightOffset += this._getRingWeight(i4);
      }
    }
    return ringWeightOffset;
  }
  _getRingWeight(datasetIndex) {
    return Math.max(valueOrDefault(this.chart.data.datasets[datasetIndex].weight, 1), 0);
  }
  _getVisibleDatasetWeightTotal() {
    return this._getRingWeightOffset(this.chart.data.datasets.length) || 1;
  }
};
__publicField(DoughnutController, "id", "doughnut");
__publicField(DoughnutController, "defaults", {
  datasetElementType: false,
  dataElementType: "arc",
  animation: {
    animateRotate: true,
    animateScale: false
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "circumference",
        "endAngle",
        "innerRadius",
        "outerRadius",
        "startAngle",
        "x",
        "y",
        "offset",
        "borderWidth",
        "spacing"
      ]
    }
  },
  cutout: "50%",
  rotation: 0,
  circumference: 360,
  radius: "100%",
  spacing: 0,
  indexAxis: "r"
});
__publicField(DoughnutController, "descriptors", {
  _scriptable: (name) => name !== "spacing",
  _indexable: (name) => name !== "spacing" && !name.startsWith("borderDash") && !name.startsWith("hoverBorderDash")
});
__publicField(DoughnutController, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(chart) {
          const data = chart.data;
          const { labels: { pointStyle, textAlign, color: color2, useBorderRadius, borderRadius } } = chart.legend.options;
          if (data.labels.length && data.datasets.length) {
            return data.labels.map((label, i4) => {
              const meta = chart.getDatasetMeta(0);
              const style = meta.controller.getStyle(i4);
              return {
                text: label,
                fillStyle: style.backgroundColor,
                fontColor: color2,
                hidden: !chart.getDataVisibility(i4),
                lineDash: style.borderDash,
                lineDashOffset: style.borderDashOffset,
                lineJoin: style.borderJoinStyle,
                lineWidth: style.borderWidth,
                strokeStyle: style.borderColor,
                textAlign,
                pointStyle,
                borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
                index: i4
              };
            });
          }
          return [];
        }
      },
      onClick(e3, legendItem, legend) {
        legend.chart.toggleDataVisibility(legendItem.index);
        legend.chart.update();
      }
    }
  }
});
var LineController = class extends DatasetController {
  initialize() {
    this.enableOptionSharing = true;
    this.supportsDecimation = true;
    super.initialize();
  }
  update(mode) {
    const meta = this._cachedMeta;
    const { dataset: line, data: points = [], _dataset } = meta;
    const animationsDisabled = this.chart._animationsDisabled;
    let { start, count } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
    this._drawStart = start;
    this._drawCount = count;
    if (_scaleRangesChanged(meta)) {
      start = 0;
      count = points.length;
    }
    line._chart = this.chart;
    line._datasetIndex = this.index;
    line._decimated = !!_dataset._decimated;
    line.points = points;
    const options = this.resolveDatasetElementOptions(mode);
    if (!this.options.showLine) {
      options.borderWidth = 0;
    }
    options.segment = this.options.segment;
    this.updateElement(line, void 0, {
      animated: !animationsDisabled,
      options
    }, mode);
    this.updateElements(points, start, count, mode);
  }
  updateElements(points, start, count, mode) {
    const reset = mode === "reset";
    const { iScale, vScale, _stacked, _dataset } = this._cachedMeta;
    const { sharedOptions, includeOptions } = this._getSharedOptions(start, mode);
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const { spanGaps, segment } = this.options;
    const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
    const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
    const end = start + count;
    const pointsCount = points.length;
    let prevParsed = start > 0 && this.getParsed(start - 1);
    for (let i4 = 0; i4 < pointsCount; ++i4) {
      const point = points[i4];
      const properties = directUpdate ? point : {};
      if (i4 < start || i4 >= end) {
        properties.skip = true;
        continue;
      }
      const parsed = this.getParsed(i4);
      const nullData = isNullOrUndef(parsed[vAxis]);
      const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i4);
      const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i4);
      properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
      properties.stop = i4 > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
      if (segment) {
        properties.parsed = parsed;
        properties.raw = _dataset.data[i4];
      }
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i4, point.active ? "active" : mode);
      }
      if (!directUpdate) {
        this.updateElement(point, i4, properties, mode);
      }
      prevParsed = parsed;
    }
  }
  getMaxOverflow() {
    const meta = this._cachedMeta;
    const dataset = meta.dataset;
    const border = dataset.options && dataset.options.borderWidth || 0;
    const data = meta.data || [];
    if (!data.length) {
      return border;
    }
    const firstPoint = data[0].size(this.resolveDataElementOptions(0));
    const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
    return Math.max(border, firstPoint, lastPoint) / 2;
  }
  draw() {
    const meta = this._cachedMeta;
    meta.dataset.updateControlPoints(this.chart.chartArea, meta.iScale.axis);
    super.draw();
  }
};
__publicField(LineController, "id", "line");
__publicField(LineController, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  showLine: true,
  spanGaps: false
});
__publicField(LineController, "overrides", {
  scales: {
    _index_: {
      type: "category"
    },
    _value_: {
      type: "linear"
    }
  }
});
var PolarAreaController = class extends DatasetController {
  constructor(chart, datasetIndex) {
    super(chart, datasetIndex);
    this.innerRadius = void 0;
    this.outerRadius = void 0;
  }
  getLabelAndValue(index2) {
    const meta = this._cachedMeta;
    const chart = this.chart;
    const labels = chart.data.labels || [];
    const value = formatNumber(meta._parsed[index2].r, chart.options.locale);
    return {
      label: labels[index2] || "",
      value
    };
  }
  parseObjectData(meta, data, start, count) {
    return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
  }
  update(mode) {
    const arcs = this._cachedMeta.data;
    this._updateRadius();
    this.updateElements(arcs, 0, arcs.length, mode);
  }
  getMinMax() {
    const meta = this._cachedMeta;
    const range = {
      min: Number.POSITIVE_INFINITY,
      max: Number.NEGATIVE_INFINITY
    };
    meta.data.forEach((element, index2) => {
      const parsed = this.getParsed(index2).r;
      if (!isNaN(parsed) && this.chart.getDataVisibility(index2)) {
        if (parsed < range.min) {
          range.min = parsed;
        }
        if (parsed > range.max) {
          range.max = parsed;
        }
      }
    });
    return range;
  }
  _updateRadius() {
    const chart = this.chart;
    const chartArea = chart.chartArea;
    const opts = chart.options;
    const minSize = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top);
    const outerRadius = Math.max(minSize / 2, 0);
    const innerRadius = Math.max(opts.cutoutPercentage ? outerRadius / 100 * opts.cutoutPercentage : 1, 0);
    const radiusLength = (outerRadius - innerRadius) / chart.getVisibleDatasetCount();
    this.outerRadius = outerRadius - radiusLength * this.index;
    this.innerRadius = this.outerRadius - radiusLength;
  }
  updateElements(arcs, start, count, mode) {
    const reset = mode === "reset";
    const chart = this.chart;
    const opts = chart.options;
    const animationOpts = opts.animation;
    const scale = this._cachedMeta.rScale;
    const centerX = scale.xCenter;
    const centerY = scale.yCenter;
    const datasetStartAngle = scale.getIndexAngle(0) - 0.5 * PI;
    let angle = datasetStartAngle;
    let i4;
    const defaultAngle = 360 / this.countVisibleElements();
    for (i4 = 0; i4 < start; ++i4) {
      angle += this._computeAngle(i4, mode, defaultAngle);
    }
    for (i4 = start; i4 < start + count; i4++) {
      const arc = arcs[i4];
      let startAngle = angle;
      let endAngle = angle + this._computeAngle(i4, mode, defaultAngle);
      let outerRadius = chart.getDataVisibility(i4) ? scale.getDistanceFromCenterForValue(this.getParsed(i4).r) : 0;
      angle = endAngle;
      if (reset) {
        if (animationOpts.animateScale) {
          outerRadius = 0;
        }
        if (animationOpts.animateRotate) {
          startAngle = endAngle = datasetStartAngle;
        }
      }
      const properties = {
        x: centerX,
        y: centerY,
        innerRadius: 0,
        outerRadius,
        startAngle,
        endAngle,
        options: this.resolveDataElementOptions(i4, arc.active ? "active" : mode)
      };
      this.updateElement(arc, i4, properties, mode);
    }
  }
  countVisibleElements() {
    const meta = this._cachedMeta;
    let count = 0;
    meta.data.forEach((element, index2) => {
      if (!isNaN(this.getParsed(index2).r) && this.chart.getDataVisibility(index2)) {
        count++;
      }
    });
    return count;
  }
  _computeAngle(index2, mode, defaultAngle) {
    return this.chart.getDataVisibility(index2) ? toRadians(this.resolveDataElementOptions(index2, mode).angle || defaultAngle) : 0;
  }
};
__publicField(PolarAreaController, "id", "polarArea");
__publicField(PolarAreaController, "defaults", {
  dataElementType: "arc",
  animation: {
    animateRotate: true,
    animateScale: true
  },
  animations: {
    numbers: {
      type: "number",
      properties: [
        "x",
        "y",
        "startAngle",
        "endAngle",
        "innerRadius",
        "outerRadius"
      ]
    }
  },
  indexAxis: "r",
  startAngle: 0
});
__publicField(PolarAreaController, "overrides", {
  aspectRatio: 1,
  plugins: {
    legend: {
      labels: {
        generateLabels(chart) {
          const data = chart.data;
          if (data.labels.length && data.datasets.length) {
            const { labels: { pointStyle, color: color2 } } = chart.legend.options;
            return data.labels.map((label, i4) => {
              const meta = chart.getDatasetMeta(0);
              const style = meta.controller.getStyle(i4);
              return {
                text: label,
                fillStyle: style.backgroundColor,
                strokeStyle: style.borderColor,
                fontColor: color2,
                lineWidth: style.borderWidth,
                pointStyle,
                hidden: !chart.getDataVisibility(i4),
                index: i4
              };
            });
          }
          return [];
        }
      },
      onClick(e3, legendItem, legend) {
        legend.chart.toggleDataVisibility(legendItem.index);
        legend.chart.update();
      }
    }
  },
  scales: {
    r: {
      type: "radialLinear",
      angleLines: {
        display: false
      },
      beginAtZero: true,
      grid: {
        circular: true
      },
      pointLabels: {
        display: false
      },
      startAngle: 0
    }
  }
});
var PieController = class extends DoughnutController {
};
__publicField(PieController, "id", "pie");
__publicField(PieController, "defaults", {
  cutout: 0,
  rotation: 0,
  circumference: 360,
  radius: "100%"
});
var RadarController = class extends DatasetController {
  getLabelAndValue(index2) {
    const vScale = this._cachedMeta.vScale;
    const parsed = this.getParsed(index2);
    return {
      label: vScale.getLabels()[index2],
      value: "" + vScale.getLabelForValue(parsed[vScale.axis])
    };
  }
  parseObjectData(meta, data, start, count) {
    return _parseObjectDataRadialScale.bind(this)(meta, data, start, count);
  }
  update(mode) {
    const meta = this._cachedMeta;
    const line = meta.dataset;
    const points = meta.data || [];
    const labels = meta.iScale.getLabels();
    line.points = points;
    if (mode !== "resize") {
      const options = this.resolveDatasetElementOptions(mode);
      if (!this.options.showLine) {
        options.borderWidth = 0;
      }
      const properties = {
        _loop: true,
        _fullLoop: labels.length === points.length,
        options
      };
      this.updateElement(line, void 0, properties, mode);
    }
    this.updateElements(points, 0, points.length, mode);
  }
  updateElements(points, start, count, mode) {
    const scale = this._cachedMeta.rScale;
    const reset = mode === "reset";
    for (let i4 = start; i4 < start + count; i4++) {
      const point = points[i4];
      const options = this.resolveDataElementOptions(i4, point.active ? "active" : mode);
      const pointPosition = scale.getPointPositionForValue(i4, this.getParsed(i4).r);
      const x3 = reset ? scale.xCenter : pointPosition.x;
      const y3 = reset ? scale.yCenter : pointPosition.y;
      const properties = {
        x: x3,
        y: y3,
        angle: pointPosition.angle,
        skip: isNaN(x3) || isNaN(y3),
        options
      };
      this.updateElement(point, i4, properties, mode);
    }
  }
};
__publicField(RadarController, "id", "radar");
__publicField(RadarController, "defaults", {
  datasetElementType: "line",
  dataElementType: "point",
  indexAxis: "r",
  showLine: true,
  elements: {
    line: {
      fill: "start"
    }
  }
});
__publicField(RadarController, "overrides", {
  aspectRatio: 1,
  scales: {
    r: {
      type: "radialLinear"
    }
  }
});
var ScatterController = class extends DatasetController {
  getLabelAndValue(index2) {
    const meta = this._cachedMeta;
    const labels = this.chart.data.labels || [];
    const { xScale, yScale } = meta;
    const parsed = this.getParsed(index2);
    const x3 = xScale.getLabelForValue(parsed.x);
    const y3 = yScale.getLabelForValue(parsed.y);
    return {
      label: labels[index2] || "",
      value: "(" + x3 + ", " + y3 + ")"
    };
  }
  update(mode) {
    const meta = this._cachedMeta;
    const { data: points = [] } = meta;
    const animationsDisabled = this.chart._animationsDisabled;
    let { start, count } = _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled);
    this._drawStart = start;
    this._drawCount = count;
    if (_scaleRangesChanged(meta)) {
      start = 0;
      count = points.length;
    }
    if (this.options.showLine) {
      if (!this.datasetElementType) {
        this.addElements();
      }
      const { dataset: line, _dataset } = meta;
      line._chart = this.chart;
      line._datasetIndex = this.index;
      line._decimated = !!_dataset._decimated;
      line.points = points;
      const options = this.resolveDatasetElementOptions(mode);
      options.segment = this.options.segment;
      this.updateElement(line, void 0, {
        animated: !animationsDisabled,
        options
      }, mode);
    } else if (this.datasetElementType) {
      delete meta.dataset;
      this.datasetElementType = false;
    }
    this.updateElements(points, start, count, mode);
  }
  addElements() {
    const { showLine } = this.options;
    if (!this.datasetElementType && showLine) {
      this.datasetElementType = this.chart.registry.getElement("line");
    }
    super.addElements();
  }
  updateElements(points, start, count, mode) {
    const reset = mode === "reset";
    const { iScale, vScale, _stacked, _dataset } = this._cachedMeta;
    const firstOpts = this.resolveDataElementOptions(start, mode);
    const sharedOptions = this.getSharedOptions(firstOpts);
    const includeOptions = this.includeOptions(mode, sharedOptions);
    const iAxis = iScale.axis;
    const vAxis = vScale.axis;
    const { spanGaps, segment } = this.options;
    const maxGapLength = isNumber(spanGaps) ? spanGaps : Number.POSITIVE_INFINITY;
    const directUpdate = this.chart._animationsDisabled || reset || mode === "none";
    let prevParsed = start > 0 && this.getParsed(start - 1);
    for (let i4 = start; i4 < start + count; ++i4) {
      const point = points[i4];
      const parsed = this.getParsed(i4);
      const properties = directUpdate ? point : {};
      const nullData = isNullOrUndef(parsed[vAxis]);
      const iPixel = properties[iAxis] = iScale.getPixelForValue(parsed[iAxis], i4);
      const vPixel = properties[vAxis] = reset || nullData ? vScale.getBasePixel() : vScale.getPixelForValue(_stacked ? this.applyStack(vScale, parsed, _stacked) : parsed[vAxis], i4);
      properties.skip = isNaN(iPixel) || isNaN(vPixel) || nullData;
      properties.stop = i4 > 0 && Math.abs(parsed[iAxis] - prevParsed[iAxis]) > maxGapLength;
      if (segment) {
        properties.parsed = parsed;
        properties.raw = _dataset.data[i4];
      }
      if (includeOptions) {
        properties.options = sharedOptions || this.resolveDataElementOptions(i4, point.active ? "active" : mode);
      }
      if (!directUpdate) {
        this.updateElement(point, i4, properties, mode);
      }
      prevParsed = parsed;
    }
    this.updateSharedOptions(sharedOptions, mode, firstOpts);
  }
  getMaxOverflow() {
    const meta = this._cachedMeta;
    const data = meta.data || [];
    if (!this.options.showLine) {
      let max = 0;
      for (let i4 = data.length - 1; i4 >= 0; --i4) {
        max = Math.max(max, data[i4].size(this.resolveDataElementOptions(i4)) / 2);
      }
      return max > 0 && max;
    }
    const dataset = meta.dataset;
    const border = dataset.options && dataset.options.borderWidth || 0;
    if (!data.length) {
      return border;
    }
    const firstPoint = data[0].size(this.resolveDataElementOptions(0));
    const lastPoint = data[data.length - 1].size(this.resolveDataElementOptions(data.length - 1));
    return Math.max(border, firstPoint, lastPoint) / 2;
  }
};
__publicField(ScatterController, "id", "scatter");
__publicField(ScatterController, "defaults", {
  datasetElementType: false,
  dataElementType: "point",
  showLine: false,
  fill: false
});
__publicField(ScatterController, "overrides", {
  interaction: {
    mode: "point"
  },
  scales: {
    x: {
      type: "linear"
    },
    y: {
      type: "linear"
    }
  }
});
var controllers = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController
});
function abstract() {
  throw new Error("This method is not implemented: Check that a complete date adapter is provided.");
}
var DateAdapterBase = class _DateAdapterBase {
  constructor(options) {
    __publicField(this, "options");
    this.options = options || {};
  }
  /**
  * Override default date adapter methods.
  * Accepts type parameter to define options type.
  * @example
  * Chart._adapters._date.override<{myAdapterOption: string}>({
  *   init() {
  *     console.log(this.options.myAdapterOption);
  *   }
  * })
  */
  static override(members) {
    Object.assign(_DateAdapterBase.prototype, members);
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init() {
  }
  formats() {
    return abstract();
  }
  parse() {
    return abstract();
  }
  format() {
    return abstract();
  }
  add() {
    return abstract();
  }
  diff() {
    return abstract();
  }
  startOf() {
    return abstract();
  }
  endOf() {
    return abstract();
  }
};
var adapters = {
  _date: DateAdapterBase
};
function binarySearch(metaset, axis, value, intersect) {
  const { controller, data, _sorted } = metaset;
  const iScale = controller._cachedMeta.iScale;
  const spanGaps = metaset.dataset ? metaset.dataset.options ? metaset.dataset.options.spanGaps : null : null;
  if (iScale && axis === iScale.axis && axis !== "r" && _sorted && data.length) {
    const lookupMethod = iScale._reversePixels ? _rlookupByKey : _lookupByKey;
    if (!intersect) {
      const result = lookupMethod(data, axis, value);
      if (spanGaps) {
        const { vScale } = controller._cachedMeta;
        const { _parsed } = metaset;
        const distanceToDefinedLo = _parsed.slice(0, result.lo + 1).reverse().findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        result.lo -= Math.max(0, distanceToDefinedLo);
        const distanceToDefinedHi = _parsed.slice(result.hi).findIndex((point) => !isNullOrUndef(point[vScale.axis]));
        result.hi += Math.max(0, distanceToDefinedHi);
      }
      return result;
    } else if (controller._sharedOptions) {
      const el = data[0];
      const range = typeof el.getRange === "function" && el.getRange(axis);
      if (range) {
        const start = lookupMethod(data, axis, value - range);
        const end = lookupMethod(data, axis, value + range);
        return {
          lo: start.lo,
          hi: end.hi
        };
      }
    }
  }
  return {
    lo: 0,
    hi: data.length - 1
  };
}
function evaluateInteractionItems(chart, axis, position, handler, intersect) {
  const metasets = chart.getSortedVisibleDatasetMetas();
  const value = position[axis];
  for (let i4 = 0, ilen = metasets.length; i4 < ilen; ++i4) {
    const { index: index2, data } = metasets[i4];
    const { lo, hi } = binarySearch(metasets[i4], axis, value, intersect);
    for (let j4 = lo; j4 <= hi; ++j4) {
      const element = data[j4];
      if (!element.skip) {
        handler(element, index2, j4);
      }
    }
  }
}
function getDistanceMetricForAxis(axis) {
  const useX = axis.indexOf("x") !== -1;
  const useY = axis.indexOf("y") !== -1;
  return function(pt1, pt2) {
    const deltaX = useX ? Math.abs(pt1.x - pt2.x) : 0;
    const deltaY = useY ? Math.abs(pt1.y - pt2.y) : 0;
    return Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
  };
}
function getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) {
  const items = [];
  if (!includeInvisible && !chart.isPointInArea(position)) {
    return items;
  }
  const evaluationFunc = function(element, datasetIndex, index2) {
    if (!includeInvisible && !_isPointInArea(element, chart.chartArea, 0)) {
      return;
    }
    if (element.inRange(position.x, position.y, useFinalPosition)) {
      items.push({
        element,
        datasetIndex,
        index: index2
      });
    }
  };
  evaluateInteractionItems(chart, axis, position, evaluationFunc, true);
  return items;
}
function getNearestRadialItems(chart, position, axis, useFinalPosition) {
  let items = [];
  function evaluationFunc(element, datasetIndex, index2) {
    const { startAngle, endAngle } = element.getProps([
      "startAngle",
      "endAngle"
    ], useFinalPosition);
    const { angle } = getAngleFromPoint(element, {
      x: position.x,
      y: position.y
    });
    if (_angleBetween(angle, startAngle, endAngle)) {
      items.push({
        element,
        datasetIndex,
        index: index2
      });
    }
  }
  evaluateInteractionItems(chart, axis, position, evaluationFunc);
  return items;
}
function getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
  let items = [];
  const distanceMetric = getDistanceMetricForAxis(axis);
  let minDistance = Number.POSITIVE_INFINITY;
  function evaluationFunc(element, datasetIndex, index2) {
    const inRange2 = element.inRange(position.x, position.y, useFinalPosition);
    if (intersect && !inRange2) {
      return;
    }
    const center = element.getCenterPoint(useFinalPosition);
    const pointInArea = !!includeInvisible || chart.isPointInArea(center);
    if (!pointInArea && !inRange2) {
      return;
    }
    const distance = distanceMetric(position, center);
    if (distance < minDistance) {
      items = [
        {
          element,
          datasetIndex,
          index: index2
        }
      ];
      minDistance = distance;
    } else if (distance === minDistance) {
      items.push({
        element,
        datasetIndex,
        index: index2
      });
    }
  }
  evaluateInteractionItems(chart, axis, position, evaluationFunc);
  return items;
}
function getNearestItems(chart, position, axis, intersect, useFinalPosition, includeInvisible) {
  if (!includeInvisible && !chart.isPointInArea(position)) {
    return [];
  }
  return axis === "r" && !intersect ? getNearestRadialItems(chart, position, axis, useFinalPosition) : getNearestCartesianItems(chart, position, axis, intersect, useFinalPosition, includeInvisible);
}
function getAxisItems(chart, position, axis, intersect, useFinalPosition) {
  const items = [];
  const rangeMethod = axis === "x" ? "inXRange" : "inYRange";
  let intersectsItem = false;
  evaluateInteractionItems(chart, axis, position, (element, datasetIndex, index2) => {
    if (element[rangeMethod] && element[rangeMethod](position[axis], useFinalPosition)) {
      items.push({
        element,
        datasetIndex,
        index: index2
      });
      intersectsItem = intersectsItem || element.inRange(position.x, position.y, useFinalPosition);
    }
  });
  if (intersect && !intersectsItem) {
    return [];
  }
  return items;
}
var Interaction = {
  evaluateInteractionItems,
  modes: {
    index(chart, e3, options, useFinalPosition) {
      const position = getRelativePosition(e3, chart);
      const axis = options.axis || "x";
      const includeInvisible = options.includeInvisible || false;
      const items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
      const elements2 = [];
      if (!items.length) {
        return [];
      }
      chart.getSortedVisibleDatasetMetas().forEach((meta) => {
        const index2 = items[0].index;
        const element = meta.data[index2];
        if (element && !element.skip) {
          elements2.push({
            element,
            datasetIndex: meta.index,
            index: index2
          });
        }
      });
      return elements2;
    },
    dataset(chart, e3, options, useFinalPosition) {
      const position = getRelativePosition(e3, chart);
      const axis = options.axis || "xy";
      const includeInvisible = options.includeInvisible || false;
      let items = options.intersect ? getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible) : getNearestItems(chart, position, axis, false, useFinalPosition, includeInvisible);
      if (items.length > 0) {
        const datasetIndex = items[0].datasetIndex;
        const data = chart.getDatasetMeta(datasetIndex).data;
        items = [];
        for (let i4 = 0; i4 < data.length; ++i4) {
          items.push({
            element: data[i4],
            datasetIndex,
            index: i4
          });
        }
      }
      return items;
    },
    point(chart, e3, options, useFinalPosition) {
      const position = getRelativePosition(e3, chart);
      const axis = options.axis || "xy";
      const includeInvisible = options.includeInvisible || false;
      return getIntersectItems(chart, position, axis, useFinalPosition, includeInvisible);
    },
    nearest(chart, e3, options, useFinalPosition) {
      const position = getRelativePosition(e3, chart);
      const axis = options.axis || "xy";
      const includeInvisible = options.includeInvisible || false;
      return getNearestItems(chart, position, axis, options.intersect, useFinalPosition, includeInvisible);
    },
    x(chart, e3, options, useFinalPosition) {
      const position = getRelativePosition(e3, chart);
      return getAxisItems(chart, position, "x", options.intersect, useFinalPosition);
    },
    y(chart, e3, options, useFinalPosition) {
      const position = getRelativePosition(e3, chart);
      return getAxisItems(chart, position, "y", options.intersect, useFinalPosition);
    }
  }
};
var STATIC_POSITIONS = [
  "left",
  "top",
  "right",
  "bottom"
];
function filterByPosition(array, position) {
  return array.filter((v3) => v3.pos === position);
}
function filterDynamicPositionByAxis(array, axis) {
  return array.filter((v3) => STATIC_POSITIONS.indexOf(v3.pos) === -1 && v3.box.axis === axis);
}
function sortByWeight(array, reverse) {
  return array.sort((a3, b2) => {
    const v0 = reverse ? b2 : a3;
    const v1 = reverse ? a3 : b2;
    return v0.weight === v1.weight ? v0.index - v1.index : v0.weight - v1.weight;
  });
}
function wrapBoxes(boxes) {
  const layoutBoxes = [];
  let i4, ilen, box, pos, stack, stackWeight;
  for (i4 = 0, ilen = (boxes || []).length; i4 < ilen; ++i4) {
    box = boxes[i4];
    ({ position: pos, options: { stack, stackWeight = 1 } } = box);
    layoutBoxes.push({
      index: i4,
      box,
      pos,
      horizontal: box.isHorizontal(),
      weight: box.weight,
      stack: stack && pos + stack,
      stackWeight
    });
  }
  return layoutBoxes;
}
function buildStacks(layouts2) {
  const stacks = {};
  for (const wrap of layouts2) {
    const { stack, pos, stackWeight } = wrap;
    if (!stack || !STATIC_POSITIONS.includes(pos)) {
      continue;
    }
    const _stack = stacks[stack] || (stacks[stack] = {
      count: 0,
      placed: 0,
      weight: 0,
      size: 0
    });
    _stack.count++;
    _stack.weight += stackWeight;
  }
  return stacks;
}
function setLayoutDims(layouts2, params) {
  const stacks = buildStacks(layouts2);
  const { vBoxMaxWidth, hBoxMaxHeight } = params;
  let i4, ilen, layout;
  for (i4 = 0, ilen = layouts2.length; i4 < ilen; ++i4) {
    layout = layouts2[i4];
    const { fullSize } = layout.box;
    const stack = stacks[layout.stack];
    const factor = stack && layout.stackWeight / stack.weight;
    if (layout.horizontal) {
      layout.width = factor ? factor * vBoxMaxWidth : fullSize && params.availableWidth;
      layout.height = hBoxMaxHeight;
    } else {
      layout.width = vBoxMaxWidth;
      layout.height = factor ? factor * hBoxMaxHeight : fullSize && params.availableHeight;
    }
  }
  return stacks;
}
function buildLayoutBoxes(boxes) {
  const layoutBoxes = wrapBoxes(boxes);
  const fullSize = sortByWeight(layoutBoxes.filter((wrap) => wrap.box.fullSize), true);
  const left = sortByWeight(filterByPosition(layoutBoxes, "left"), true);
  const right = sortByWeight(filterByPosition(layoutBoxes, "right"));
  const top = sortByWeight(filterByPosition(layoutBoxes, "top"), true);
  const bottom = sortByWeight(filterByPosition(layoutBoxes, "bottom"));
  const centerHorizontal = filterDynamicPositionByAxis(layoutBoxes, "x");
  const centerVertical = filterDynamicPositionByAxis(layoutBoxes, "y");
  return {
    fullSize,
    leftAndTop: left.concat(top),
    rightAndBottom: right.concat(centerVertical).concat(bottom).concat(centerHorizontal),
    chartArea: filterByPosition(layoutBoxes, "chartArea"),
    vertical: left.concat(right).concat(centerVertical),
    horizontal: top.concat(bottom).concat(centerHorizontal)
  };
}
function getCombinedMax(maxPadding, chartArea, a3, b2) {
  return Math.max(maxPadding[a3], chartArea[a3]) + Math.max(maxPadding[b2], chartArea[b2]);
}
function updateMaxPadding(maxPadding, boxPadding) {
  maxPadding.top = Math.max(maxPadding.top, boxPadding.top);
  maxPadding.left = Math.max(maxPadding.left, boxPadding.left);
  maxPadding.bottom = Math.max(maxPadding.bottom, boxPadding.bottom);
  maxPadding.right = Math.max(maxPadding.right, boxPadding.right);
}
function updateDims(chartArea, params, layout, stacks) {
  const { pos, box } = layout;
  const maxPadding = chartArea.maxPadding;
  if (!isObject(pos)) {
    if (layout.size) {
      chartArea[pos] -= layout.size;
    }
    const stack = stacks[layout.stack] || {
      size: 0,
      count: 1
    };
    stack.size = Math.max(stack.size, layout.horizontal ? box.height : box.width);
    layout.size = stack.size / stack.count;
    chartArea[pos] += layout.size;
  }
  if (box.getPadding) {
    updateMaxPadding(maxPadding, box.getPadding());
  }
  const newWidth = Math.max(0, params.outerWidth - getCombinedMax(maxPadding, chartArea, "left", "right"));
  const newHeight = Math.max(0, params.outerHeight - getCombinedMax(maxPadding, chartArea, "top", "bottom"));
  const widthChanged = newWidth !== chartArea.w;
  const heightChanged = newHeight !== chartArea.h;
  chartArea.w = newWidth;
  chartArea.h = newHeight;
  return layout.horizontal ? {
    same: widthChanged,
    other: heightChanged
  } : {
    same: heightChanged,
    other: widthChanged
  };
}
function handleMaxPadding(chartArea) {
  const maxPadding = chartArea.maxPadding;
  function updatePos(pos) {
    const change = Math.max(maxPadding[pos] - chartArea[pos], 0);
    chartArea[pos] += change;
    return change;
  }
  chartArea.y += updatePos("top");
  chartArea.x += updatePos("left");
  updatePos("right");
  updatePos("bottom");
}
function getMargins(horizontal, chartArea) {
  const maxPadding = chartArea.maxPadding;
  function marginForPositions(positions2) {
    const margin = {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
    };
    positions2.forEach((pos) => {
      margin[pos] = Math.max(chartArea[pos], maxPadding[pos]);
    });
    return margin;
  }
  return horizontal ? marginForPositions([
    "left",
    "right"
  ]) : marginForPositions([
    "top",
    "bottom"
  ]);
}
function fitBoxes(boxes, chartArea, params, stacks) {
  const refitBoxes = [];
  let i4, ilen, layout, box, refit, changed;
  for (i4 = 0, ilen = boxes.length, refit = 0; i4 < ilen; ++i4) {
    layout = boxes[i4];
    box = layout.box;
    box.update(layout.width || chartArea.w, layout.height || chartArea.h, getMargins(layout.horizontal, chartArea));
    const { same, other } = updateDims(chartArea, params, layout, stacks);
    refit |= same && refitBoxes.length;
    changed = changed || other;
    if (!box.fullSize) {
      refitBoxes.push(layout);
    }
  }
  return refit && fitBoxes(refitBoxes, chartArea, params, stacks) || changed;
}
function setBoxDims(box, left, top, width, height) {
  box.top = top;
  box.left = left;
  box.right = left + width;
  box.bottom = top + height;
  box.width = width;
  box.height = height;
}
function placeBoxes(boxes, chartArea, params, stacks) {
  const userPadding = params.padding;
  let { x: x3, y: y3 } = chartArea;
  for (const layout of boxes) {
    const box = layout.box;
    const stack = stacks[layout.stack] || {
      count: 1,
      placed: 0,
      weight: 1
    };
    const weight = layout.stackWeight / stack.weight || 1;
    if (layout.horizontal) {
      const width = chartArea.w * weight;
      const height = stack.size || box.height;
      if (defined(stack.start)) {
        y3 = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, userPadding.left, y3, params.outerWidth - userPadding.right - userPadding.left, height);
      } else {
        setBoxDims(box, chartArea.left + stack.placed, y3, width, height);
      }
      stack.start = y3;
      stack.placed += width;
      y3 = box.bottom;
    } else {
      const height = chartArea.h * weight;
      const width = stack.size || box.width;
      if (defined(stack.start)) {
        x3 = stack.start;
      }
      if (box.fullSize) {
        setBoxDims(box, x3, userPadding.top, width, params.outerHeight - userPadding.bottom - userPadding.top);
      } else {
        setBoxDims(box, x3, chartArea.top + stack.placed, width, height);
      }
      stack.start = x3;
      stack.placed += height;
      x3 = box.right;
    }
  }
  chartArea.x = x3;
  chartArea.y = y3;
}
var layouts = {
  addBox(chart, item) {
    if (!chart.boxes) {
      chart.boxes = [];
    }
    item.fullSize = item.fullSize || false;
    item.position = item.position || "top";
    item.weight = item.weight || 0;
    item._layers = item._layers || function() {
      return [
        {
          z: 0,
          draw(chartArea) {
            item.draw(chartArea);
          }
        }
      ];
    };
    chart.boxes.push(item);
  },
  removeBox(chart, layoutItem) {
    const index2 = chart.boxes ? chart.boxes.indexOf(layoutItem) : -1;
    if (index2 !== -1) {
      chart.boxes.splice(index2, 1);
    }
  },
  configure(chart, item, options) {
    item.fullSize = options.fullSize;
    item.position = options.position;
    item.weight = options.weight;
  },
  update(chart, width, height, minPadding) {
    if (!chart) {
      return;
    }
    const padding = toPadding(chart.options.layout.padding);
    const availableWidth = Math.max(width - padding.width, 0);
    const availableHeight = Math.max(height - padding.height, 0);
    const boxes = buildLayoutBoxes(chart.boxes);
    const verticalBoxes = boxes.vertical;
    const horizontalBoxes = boxes.horizontal;
    each(chart.boxes, (box) => {
      if (typeof box.beforeLayout === "function") {
        box.beforeLayout();
      }
    });
    const visibleVerticalBoxCount = verticalBoxes.reduce((total, wrap) => wrap.box.options && wrap.box.options.display === false ? total : total + 1, 0) || 1;
    const params = Object.freeze({
      outerWidth: width,
      outerHeight: height,
      padding,
      availableWidth,
      availableHeight,
      vBoxMaxWidth: availableWidth / 2 / visibleVerticalBoxCount,
      hBoxMaxHeight: availableHeight / 2
    });
    const maxPadding = Object.assign({}, padding);
    updateMaxPadding(maxPadding, toPadding(minPadding));
    const chartArea = Object.assign({
      maxPadding,
      w: availableWidth,
      h: availableHeight,
      x: padding.left,
      y: padding.top
    }, padding);
    const stacks = setLayoutDims(verticalBoxes.concat(horizontalBoxes), params);
    fitBoxes(boxes.fullSize, chartArea, params, stacks);
    fitBoxes(verticalBoxes, chartArea, params, stacks);
    if (fitBoxes(horizontalBoxes, chartArea, params, stacks)) {
      fitBoxes(verticalBoxes, chartArea, params, stacks);
    }
    handleMaxPadding(chartArea);
    placeBoxes(boxes.leftAndTop, chartArea, params, stacks);
    chartArea.x += chartArea.w;
    chartArea.y += chartArea.h;
    placeBoxes(boxes.rightAndBottom, chartArea, params, stacks);
    chart.chartArea = {
      left: chartArea.left,
      top: chartArea.top,
      right: chartArea.left + chartArea.w,
      bottom: chartArea.top + chartArea.h,
      height: chartArea.h,
      width: chartArea.w
    };
    each(boxes.chartArea, (layout) => {
      const box = layout.box;
      Object.assign(box, chart.chartArea);
      box.update(chartArea.w, chartArea.h, {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      });
    });
  }
};
var BasePlatform = class {
  acquireContext(canvas, aspectRatio) {
  }
  releaseContext(context) {
    return false;
  }
  addEventListener(chart, type, listener) {
  }
  removeEventListener(chart, type, listener) {
  }
  getDevicePixelRatio() {
    return 1;
  }
  getMaximumSize(element, width, height, aspectRatio) {
    width = Math.max(0, width || element.width);
    height = height || element.height;
    return {
      width,
      height: Math.max(0, aspectRatio ? Math.floor(width / aspectRatio) : height)
    };
  }
  isAttached(canvas) {
    return true;
  }
  updateConfig(config) {
  }
};
var BasicPlatform = class extends BasePlatform {
  acquireContext(item) {
    return item && item.getContext && item.getContext("2d") || null;
  }
  updateConfig(config) {
    config.options.animation = false;
  }
};
var EXPANDO_KEY = "$chartjs";
var EVENT_TYPES = {
  touchstart: "mousedown",
  touchmove: "mousemove",
  touchend: "mouseup",
  pointerenter: "mouseenter",
  pointerdown: "mousedown",
  pointermove: "mousemove",
  pointerup: "mouseup",
  pointerleave: "mouseout",
  pointerout: "mouseout"
};
var isNullOrEmpty = (value) => value === null || value === "";
function initCanvas(canvas, aspectRatio) {
  const style = canvas.style;
  const renderHeight = canvas.getAttribute("height");
  const renderWidth = canvas.getAttribute("width");
  canvas[EXPANDO_KEY] = {
    initial: {
      height: renderHeight,
      width: renderWidth,
      style: {
        display: style.display,
        height: style.height,
        width: style.width
      }
    }
  };
  style.display = style.display || "block";
  style.boxSizing = style.boxSizing || "border-box";
  if (isNullOrEmpty(renderWidth)) {
    const displayWidth = readUsedSize(canvas, "width");
    if (displayWidth !== void 0) {
      canvas.width = displayWidth;
    }
  }
  if (isNullOrEmpty(renderHeight)) {
    if (canvas.style.height === "") {
      canvas.height = canvas.width / (aspectRatio || 2);
    } else {
      const displayHeight = readUsedSize(canvas, "height");
      if (displayHeight !== void 0) {
        canvas.height = displayHeight;
      }
    }
  }
  return canvas;
}
var eventListenerOptions = supportsEventListenerOptions ? {
  passive: true
} : false;
function addListener(node, type, listener) {
  if (node) {
    node.addEventListener(type, listener, eventListenerOptions);
  }
}
function removeListener(chart, type, listener) {
  if (chart && chart.canvas) {
    chart.canvas.removeEventListener(type, listener, eventListenerOptions);
  }
}
function fromNativeEvent(event, chart) {
  const type = EVENT_TYPES[event.type] || event.type;
  const { x: x3, y: y3 } = getRelativePosition(event, chart);
  return {
    type,
    chart,
    native: event,
    x: x3 !== void 0 ? x3 : null,
    y: y3 !== void 0 ? y3 : null
  };
}
function nodeListContains(nodeList, canvas) {
  for (const node of nodeList) {
    if (node === canvas || node.contains(canvas)) {
      return true;
    }
  }
}
function createAttachObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const observer = new MutationObserver((entries) => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.addedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.removedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
}
function createDetachObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const observer = new MutationObserver((entries) => {
    let trigger = false;
    for (const entry of entries) {
      trigger = trigger || nodeListContains(entry.removedNodes, canvas);
      trigger = trigger && !nodeListContains(entry.addedNodes, canvas);
    }
    if (trigger) {
      listener();
    }
  });
  observer.observe(document, {
    childList: true,
    subtree: true
  });
  return observer;
}
var drpListeningCharts = /* @__PURE__ */ new Map();
var oldDevicePixelRatio = 0;
function onWindowResize() {
  const dpr = window.devicePixelRatio;
  if (dpr === oldDevicePixelRatio) {
    return;
  }
  oldDevicePixelRatio = dpr;
  drpListeningCharts.forEach((resize, chart) => {
    if (chart.currentDevicePixelRatio !== dpr) {
      resize();
    }
  });
}
function listenDevicePixelRatioChanges(chart, resize) {
  if (!drpListeningCharts.size) {
    window.addEventListener("resize", onWindowResize);
  }
  drpListeningCharts.set(chart, resize);
}
function unlistenDevicePixelRatioChanges(chart) {
  drpListeningCharts.delete(chart);
  if (!drpListeningCharts.size) {
    window.removeEventListener("resize", onWindowResize);
  }
}
function createResizeObserver(chart, type, listener) {
  const canvas = chart.canvas;
  const container = canvas && _getParentNode(canvas);
  if (!container) {
    return;
  }
  const resize = throttled((width, height) => {
    const w3 = container.clientWidth;
    listener(width, height);
    if (w3 < container.clientWidth) {
      listener();
    }
  }, window);
  const observer = new ResizeObserver((entries) => {
    const entry = entries[0];
    const width = entry.contentRect.width;
    const height = entry.contentRect.height;
    if (width === 0 && height === 0) {
      return;
    }
    resize(width, height);
  });
  observer.observe(container);
  listenDevicePixelRatioChanges(chart, resize);
  return observer;
}
function releaseObserver(chart, type, observer) {
  if (observer) {
    observer.disconnect();
  }
  if (type === "resize") {
    unlistenDevicePixelRatioChanges(chart);
  }
}
function createProxyAndListen(chart, type, listener) {
  const canvas = chart.canvas;
  const proxy = throttled((event) => {
    if (chart.ctx !== null) {
      listener(fromNativeEvent(event, chart));
    }
  }, chart);
  addListener(canvas, type, proxy);
  return proxy;
}
var DomPlatform = class extends BasePlatform {
  acquireContext(canvas, aspectRatio) {
    const context = canvas && canvas.getContext && canvas.getContext("2d");
    if (context && context.canvas === canvas) {
      initCanvas(canvas, aspectRatio);
      return context;
    }
    return null;
  }
  releaseContext(context) {
    const canvas = context.canvas;
    if (!canvas[EXPANDO_KEY]) {
      return false;
    }
    const initial = canvas[EXPANDO_KEY].initial;
    [
      "height",
      "width"
    ].forEach((prop) => {
      const value = initial[prop];
      if (isNullOrUndef(value)) {
        canvas.removeAttribute(prop);
      } else {
        canvas.setAttribute(prop, value);
      }
    });
    const style = initial.style || {};
    Object.keys(style).forEach((key) => {
      canvas.style[key] = style[key];
    });
    canvas.width = canvas.width;
    delete canvas[EXPANDO_KEY];
    return true;
  }
  addEventListener(chart, type, listener) {
    this.removeEventListener(chart, type);
    const proxies = chart.$proxies || (chart.$proxies = {});
    const handlers = {
      attach: createAttachObserver,
      detach: createDetachObserver,
      resize: createResizeObserver
    };
    const handler = handlers[type] || createProxyAndListen;
    proxies[type] = handler(chart, type, listener);
  }
  removeEventListener(chart, type) {
    const proxies = chart.$proxies || (chart.$proxies = {});
    const proxy = proxies[type];
    if (!proxy) {
      return;
    }
    const handlers = {
      attach: releaseObserver,
      detach: releaseObserver,
      resize: releaseObserver
    };
    const handler = handlers[type] || removeListener;
    handler(chart, type, proxy);
    proxies[type] = void 0;
  }
  getDevicePixelRatio() {
    return window.devicePixelRatio;
  }
  getMaximumSize(canvas, width, height, aspectRatio) {
    return getMaximumSize(canvas, width, height, aspectRatio);
  }
  isAttached(canvas) {
    const container = canvas && _getParentNode(canvas);
    return !!(container && container.isConnected);
  }
};
function _detectPlatform(canvas) {
  if (!_isDomSupported() || typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
    return BasicPlatform;
  }
  return DomPlatform;
}
var Element = class {
  constructor() {
    __publicField(this, "x");
    __publicField(this, "y");
    __publicField(this, "active", false);
    __publicField(this, "options");
    __publicField(this, "$animations");
  }
  tooltipPosition(useFinalPosition) {
    const { x: x3, y: y3 } = this.getProps([
      "x",
      "y"
    ], useFinalPosition);
    return {
      x: x3,
      y: y3
    };
  }
  hasValue() {
    return isNumber(this.x) && isNumber(this.y);
  }
  getProps(props, final) {
    const anims = this.$animations;
    if (!final || !anims) {
      return this;
    }
    const ret = {};
    props.forEach((prop) => {
      ret[prop] = anims[prop] && anims[prop].active() ? anims[prop]._to : this[prop];
    });
    return ret;
  }
};
__publicField(Element, "defaults", {});
__publicField(Element, "defaultRoutes");
function autoSkip(scale, ticks) {
  const tickOpts = scale.options.ticks;
  const determinedMaxTicks = determineMaxTicks(scale);
  const ticksLimit = Math.min(tickOpts.maxTicksLimit || determinedMaxTicks, determinedMaxTicks);
  const majorIndices = tickOpts.major.enabled ? getMajorIndices(ticks) : [];
  const numMajorIndices = majorIndices.length;
  const first = majorIndices[0];
  const last = majorIndices[numMajorIndices - 1];
  const newTicks = [];
  if (numMajorIndices > ticksLimit) {
    skipMajors(ticks, newTicks, majorIndices, numMajorIndices / ticksLimit);
    return newTicks;
  }
  const spacing = calculateSpacing(majorIndices, ticks, ticksLimit);
  if (numMajorIndices > 0) {
    let i4, ilen;
    const avgMajorSpacing = numMajorIndices > 1 ? Math.round((last - first) / (numMajorIndices - 1)) : null;
    skip(ticks, newTicks, spacing, isNullOrUndef(avgMajorSpacing) ? 0 : first - avgMajorSpacing, first);
    for (i4 = 0, ilen = numMajorIndices - 1; i4 < ilen; i4++) {
      skip(ticks, newTicks, spacing, majorIndices[i4], majorIndices[i4 + 1]);
    }
    skip(ticks, newTicks, spacing, last, isNullOrUndef(avgMajorSpacing) ? ticks.length : last + avgMajorSpacing);
    return newTicks;
  }
  skip(ticks, newTicks, spacing);
  return newTicks;
}
function determineMaxTicks(scale) {
  const offset = scale.options.offset;
  const tickLength = scale._tickSize();
  const maxScale = scale._length / tickLength + (offset ? 0 : 1);
  const maxChart = scale._maxLength / tickLength;
  return Math.floor(Math.min(maxScale, maxChart));
}
function calculateSpacing(majorIndices, ticks, ticksLimit) {
  const evenMajorSpacing = getEvenSpacing(majorIndices);
  const spacing = ticks.length / ticksLimit;
  if (!evenMajorSpacing) {
    return Math.max(spacing, 1);
  }
  const factors = _factorize(evenMajorSpacing);
  for (let i4 = 0, ilen = factors.length - 1; i4 < ilen; i4++) {
    const factor = factors[i4];
    if (factor > spacing) {
      return factor;
    }
  }
  return Math.max(spacing, 1);
}
function getMajorIndices(ticks) {
  const result = [];
  let i4, ilen;
  for (i4 = 0, ilen = ticks.length; i4 < ilen; i4++) {
    if (ticks[i4].major) {
      result.push(i4);
    }
  }
  return result;
}
function skipMajors(ticks, newTicks, majorIndices, spacing) {
  let count = 0;
  let next = majorIndices[0];
  let i4;
  spacing = Math.ceil(spacing);
  for (i4 = 0; i4 < ticks.length; i4++) {
    if (i4 === next) {
      newTicks.push(ticks[i4]);
      count++;
      next = majorIndices[count * spacing];
    }
  }
}
function skip(ticks, newTicks, spacing, majorStart, majorEnd) {
  const start = valueOrDefault(majorStart, 0);
  const end = Math.min(valueOrDefault(majorEnd, ticks.length), ticks.length);
  let count = 0;
  let length, i4, next;
  spacing = Math.ceil(spacing);
  if (majorEnd) {
    length = majorEnd - majorStart;
    spacing = length / Math.floor(length / spacing);
  }
  next = start;
  while (next < 0) {
    count++;
    next = Math.round(start + count * spacing);
  }
  for (i4 = Math.max(start, 0); i4 < end; i4++) {
    if (i4 === next) {
      newTicks.push(ticks[i4]);
      count++;
      next = Math.round(start + count * spacing);
    }
  }
}
function getEvenSpacing(arr) {
  const len = arr.length;
  let i4, diff;
  if (len < 2) {
    return false;
  }
  for (diff = arr[0], i4 = 1; i4 < len; ++i4) {
    if (arr[i4] - arr[i4 - 1] !== diff) {
      return false;
    }
  }
  return diff;
}
var reverseAlign = (align) => align === "left" ? "right" : align === "right" ? "left" : align;
var offsetFromEdge = (scale, edge, offset) => edge === "top" || edge === "left" ? scale[edge] + offset : scale[edge] - offset;
var getTicksLimit = (ticksLength, maxTicksLimit) => Math.min(maxTicksLimit || ticksLength, ticksLength);
function sample(arr, numItems) {
  const result = [];
  const increment = arr.length / numItems;
  const len = arr.length;
  let i4 = 0;
  for (; i4 < len; i4 += increment) {
    result.push(arr[Math.floor(i4)]);
  }
  return result;
}
function getPixelForGridLine(scale, index2, offsetGridLines) {
  const length = scale.ticks.length;
  const validIndex2 = Math.min(index2, length - 1);
  const start = scale._startPixel;
  const end = scale._endPixel;
  const epsilon = 1e-6;
  let lineValue = scale.getPixelForTick(validIndex2);
  let offset;
  if (offsetGridLines) {
    if (length === 1) {
      offset = Math.max(lineValue - start, end - lineValue);
    } else if (index2 === 0) {
      offset = (scale.getPixelForTick(1) - lineValue) / 2;
    } else {
      offset = (lineValue - scale.getPixelForTick(validIndex2 - 1)) / 2;
    }
    lineValue += validIndex2 < index2 ? offset : -offset;
    if (lineValue < start - epsilon || lineValue > end + epsilon) {
      return;
    }
  }
  return lineValue;
}
function garbageCollect(caches, length) {
  each(caches, (cache) => {
    const gc = cache.gc;
    const gcLen = gc.length / 2;
    let i4;
    if (gcLen > length) {
      for (i4 = 0; i4 < gcLen; ++i4) {
        delete cache.data[gc[i4]];
      }
      gc.splice(0, gcLen);
    }
  });
}
function getTickMarkLength(options) {
  return options.drawTicks ? options.tickLength : 0;
}
function getTitleHeight(options, fallback) {
  if (!options.display) {
    return 0;
  }
  const font = toFont(options.font, fallback);
  const padding = toPadding(options.padding);
  const lines = isArray(options.text) ? options.text.length : 1;
  return lines * font.lineHeight + padding.height;
}
function createScaleContext(parent, scale) {
  return createContext(parent, {
    scale,
    type: "scale"
  });
}
function createTickContext(parent, index2, tick) {
  return createContext(parent, {
    tick,
    index: index2,
    type: "tick"
  });
}
function titleAlign(align, position, reverse) {
  let ret = _toLeftRightCenter(align);
  if (reverse && position !== "right" || !reverse && position === "right") {
    ret = reverseAlign(ret);
  }
  return ret;
}
function titleArgs(scale, offset, position, align) {
  const { top, left, bottom, right, chart } = scale;
  const { chartArea, scales: scales2 } = chart;
  let rotation = 0;
  let maxWidth, titleX, titleY;
  const height = bottom - top;
  const width = right - left;
  if (scale.isHorizontal()) {
    titleX = _alignStartEnd(align, left, right);
    if (isObject(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleY = scales2[positionAxisID].getPixelForValue(value) + height - offset;
    } else if (position === "center") {
      titleY = (chartArea.bottom + chartArea.top) / 2 + height - offset;
    } else {
      titleY = offsetFromEdge(scale, position, offset);
    }
    maxWidth = right - left;
  } else {
    if (isObject(position)) {
      const positionAxisID = Object.keys(position)[0];
      const value = position[positionAxisID];
      titleX = scales2[positionAxisID].getPixelForValue(value) - width + offset;
    } else if (position === "center") {
      titleX = (chartArea.left + chartArea.right) / 2 - width + offset;
    } else {
      titleX = offsetFromEdge(scale, position, offset);
    }
    titleY = _alignStartEnd(align, bottom, top);
    rotation = position === "left" ? -HALF_PI : HALF_PI;
  }
  return {
    titleX,
    titleY,
    maxWidth,
    rotation
  };
}
var Scale = class _Scale extends Element {
  constructor(cfg) {
    super();
    this.id = cfg.id;
    this.type = cfg.type;
    this.options = void 0;
    this.ctx = cfg.ctx;
    this.chart = cfg.chart;
    this.top = void 0;
    this.bottom = void 0;
    this.left = void 0;
    this.right = void 0;
    this.width = void 0;
    this.height = void 0;
    this._margins = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    };
    this.maxWidth = void 0;
    this.maxHeight = void 0;
    this.paddingTop = void 0;
    this.paddingBottom = void 0;
    this.paddingLeft = void 0;
    this.paddingRight = void 0;
    this.axis = void 0;
    this.labelRotation = void 0;
    this.min = void 0;
    this.max = void 0;
    this._range = void 0;
    this.ticks = [];
    this._gridLineItems = null;
    this._labelItems = null;
    this._labelSizes = null;
    this._length = 0;
    this._maxLength = 0;
    this._longestTextCache = {};
    this._startPixel = void 0;
    this._endPixel = void 0;
    this._reversePixels = false;
    this._userMax = void 0;
    this._userMin = void 0;
    this._suggestedMax = void 0;
    this._suggestedMin = void 0;
    this._ticksLength = 0;
    this._borderValue = 0;
    this._cache = {};
    this._dataLimitsCached = false;
    this.$context = void 0;
  }
  init(options) {
    this.options = options.setContext(this.getContext());
    this.axis = options.axis;
    this._userMin = this.parse(options.min);
    this._userMax = this.parse(options.max);
    this._suggestedMin = this.parse(options.suggestedMin);
    this._suggestedMax = this.parse(options.suggestedMax);
  }
  parse(raw, index2) {
    return raw;
  }
  getUserBounds() {
    let { _userMin, _userMax, _suggestedMin, _suggestedMax } = this;
    _userMin = finiteOrDefault(_userMin, Number.POSITIVE_INFINITY);
    _userMax = finiteOrDefault(_userMax, Number.NEGATIVE_INFINITY);
    _suggestedMin = finiteOrDefault(_suggestedMin, Number.POSITIVE_INFINITY);
    _suggestedMax = finiteOrDefault(_suggestedMax, Number.NEGATIVE_INFINITY);
    return {
      min: finiteOrDefault(_userMin, _suggestedMin),
      max: finiteOrDefault(_userMax, _suggestedMax),
      minDefined: isNumberFinite(_userMin),
      maxDefined: isNumberFinite(_userMax)
    };
  }
  getMinMax(canStack) {
    let { min, max, minDefined, maxDefined } = this.getUserBounds();
    let range;
    if (minDefined && maxDefined) {
      return {
        min,
        max
      };
    }
    const metas = this.getMatchingVisibleMetas();
    for (let i4 = 0, ilen = metas.length; i4 < ilen; ++i4) {
      range = metas[i4].controller.getMinMax(this, canStack);
      if (!minDefined) {
        min = Math.min(min, range.min);
      }
      if (!maxDefined) {
        max = Math.max(max, range.max);
      }
    }
    min = maxDefined && min > max ? max : min;
    max = minDefined && min > max ? min : max;
    return {
      min: finiteOrDefault(min, finiteOrDefault(max, min)),
      max: finiteOrDefault(max, finiteOrDefault(min, max))
    };
  }
  getPadding() {
    return {
      left: this.paddingLeft || 0,
      top: this.paddingTop || 0,
      right: this.paddingRight || 0,
      bottom: this.paddingBottom || 0
    };
  }
  getTicks() {
    return this.ticks;
  }
  getLabels() {
    const data = this.chart.data;
    return this.options.labels || (this.isHorizontal() ? data.xLabels : data.yLabels) || data.labels || [];
  }
  getLabelItems(chartArea = this.chart.chartArea) {
    const items = this._labelItems || (this._labelItems = this._computeLabelItems(chartArea));
    return items;
  }
  beforeLayout() {
    this._cache = {};
    this._dataLimitsCached = false;
  }
  beforeUpdate() {
    callback(this.options.beforeUpdate, [
      this
    ]);
  }
  update(maxWidth, maxHeight, margins) {
    const { beginAtZero, grace, ticks: tickOpts } = this.options;
    const sampleSize = tickOpts.sampleSize;
    this.beforeUpdate();
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this._margins = margins = Object.assign({
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }, margins);
    this.ticks = null;
    this._labelSizes = null;
    this._gridLineItems = null;
    this._labelItems = null;
    this.beforeSetDimensions();
    this.setDimensions();
    this.afterSetDimensions();
    this._maxLength = this.isHorizontal() ? this.width + margins.left + margins.right : this.height + margins.top + margins.bottom;
    if (!this._dataLimitsCached) {
      this.beforeDataLimits();
      this.determineDataLimits();
      this.afterDataLimits();
      this._range = _addGrace(this, grace, beginAtZero);
      this._dataLimitsCached = true;
    }
    this.beforeBuildTicks();
    this.ticks = this.buildTicks() || [];
    this.afterBuildTicks();
    const samplingEnabled = sampleSize < this.ticks.length;
    this._convertTicksToLabels(samplingEnabled ? sample(this.ticks, sampleSize) : this.ticks);
    this.configure();
    this.beforeCalculateLabelRotation();
    this.calculateLabelRotation();
    this.afterCalculateLabelRotation();
    if (tickOpts.display && (tickOpts.autoSkip || tickOpts.source === "auto")) {
      this.ticks = autoSkip(this, this.ticks);
      this._labelSizes = null;
      this.afterAutoSkip();
    }
    if (samplingEnabled) {
      this._convertTicksToLabels(this.ticks);
    }
    this.beforeFit();
    this.fit();
    this.afterFit();
    this.afterUpdate();
  }
  configure() {
    let reversePixels = this.options.reverse;
    let startPixel, endPixel;
    if (this.isHorizontal()) {
      startPixel = this.left;
      endPixel = this.right;
    } else {
      startPixel = this.top;
      endPixel = this.bottom;
      reversePixels = !reversePixels;
    }
    this._startPixel = startPixel;
    this._endPixel = endPixel;
    this._reversePixels = reversePixels;
    this._length = endPixel - startPixel;
    this._alignToPixels = this.options.alignToPixels;
  }
  afterUpdate() {
    callback(this.options.afterUpdate, [
      this
    ]);
  }
  beforeSetDimensions() {
    callback(this.options.beforeSetDimensions, [
      this
    ]);
  }
  setDimensions() {
    if (this.isHorizontal()) {
      this.width = this.maxWidth;
      this.left = 0;
      this.right = this.width;
    } else {
      this.height = this.maxHeight;
      this.top = 0;
      this.bottom = this.height;
    }
    this.paddingLeft = 0;
    this.paddingTop = 0;
    this.paddingRight = 0;
    this.paddingBottom = 0;
  }
  afterSetDimensions() {
    callback(this.options.afterSetDimensions, [
      this
    ]);
  }
  _callHooks(name) {
    this.chart.notifyPlugins(name, this.getContext());
    callback(this.options[name], [
      this
    ]);
  }
  beforeDataLimits() {
    this._callHooks("beforeDataLimits");
  }
  determineDataLimits() {
  }
  afterDataLimits() {
    this._callHooks("afterDataLimits");
  }
  beforeBuildTicks() {
    this._callHooks("beforeBuildTicks");
  }
  buildTicks() {
    return [];
  }
  afterBuildTicks() {
    this._callHooks("afterBuildTicks");
  }
  beforeTickToLabelConversion() {
    callback(this.options.beforeTickToLabelConversion, [
      this
    ]);
  }
  generateTickLabels(ticks) {
    const tickOpts = this.options.ticks;
    let i4, ilen, tick;
    for (i4 = 0, ilen = ticks.length; i4 < ilen; i4++) {
      tick = ticks[i4];
      tick.label = callback(tickOpts.callback, [
        tick.value,
        i4,
        ticks
      ], this);
    }
  }
  afterTickToLabelConversion() {
    callback(this.options.afterTickToLabelConversion, [
      this
    ]);
  }
  beforeCalculateLabelRotation() {
    callback(this.options.beforeCalculateLabelRotation, [
      this
    ]);
  }
  calculateLabelRotation() {
    const options = this.options;
    const tickOpts = options.ticks;
    const numTicks = getTicksLimit(this.ticks.length, options.ticks.maxTicksLimit);
    const minRotation = tickOpts.minRotation || 0;
    const maxRotation = tickOpts.maxRotation;
    let labelRotation = minRotation;
    let tickWidth, maxHeight, maxLabelDiagonal;
    if (!this._isVisible() || !tickOpts.display || minRotation >= maxRotation || numTicks <= 1 || !this.isHorizontal()) {
      this.labelRotation = minRotation;
      return;
    }
    const labelSizes = this._getLabelSizes();
    const maxLabelWidth = labelSizes.widest.width;
    const maxLabelHeight = labelSizes.highest.height;
    const maxWidth = _limitValue(this.chart.width - maxLabelWidth, 0, this.maxWidth);
    tickWidth = options.offset ? this.maxWidth / numTicks : maxWidth / (numTicks - 1);
    if (maxLabelWidth + 6 > tickWidth) {
      tickWidth = maxWidth / (numTicks - (options.offset ? 0.5 : 1));
      maxHeight = this.maxHeight - getTickMarkLength(options.grid) - tickOpts.padding - getTitleHeight(options.title, this.chart.options.font);
      maxLabelDiagonal = Math.sqrt(maxLabelWidth * maxLabelWidth + maxLabelHeight * maxLabelHeight);
      labelRotation = toDegrees(Math.min(Math.asin(_limitValue((labelSizes.highest.height + 6) / tickWidth, -1, 1)), Math.asin(_limitValue(maxHeight / maxLabelDiagonal, -1, 1)) - Math.asin(_limitValue(maxLabelHeight / maxLabelDiagonal, -1, 1))));
      labelRotation = Math.max(minRotation, Math.min(maxRotation, labelRotation));
    }
    this.labelRotation = labelRotation;
  }
  afterCalculateLabelRotation() {
    callback(this.options.afterCalculateLabelRotation, [
      this
    ]);
  }
  afterAutoSkip() {
  }
  beforeFit() {
    callback(this.options.beforeFit, [
      this
    ]);
  }
  fit() {
    const minSize = {
      width: 0,
      height: 0
    };
    const { chart, options: { ticks: tickOpts, title: titleOpts, grid: gridOpts } } = this;
    const display = this._isVisible();
    const isHorizontal = this.isHorizontal();
    if (display) {
      const titleHeight = getTitleHeight(titleOpts, chart.options.font);
      if (isHorizontal) {
        minSize.width = this.maxWidth;
        minSize.height = getTickMarkLength(gridOpts) + titleHeight;
      } else {
        minSize.height = this.maxHeight;
        minSize.width = getTickMarkLength(gridOpts) + titleHeight;
      }
      if (tickOpts.display && this.ticks.length) {
        const { first, last, widest, highest } = this._getLabelSizes();
        const tickPadding = tickOpts.padding * 2;
        const angleRadians = toRadians(this.labelRotation);
        const cos = Math.cos(angleRadians);
        const sin = Math.sin(angleRadians);
        if (isHorizontal) {
          const labelHeight = tickOpts.mirror ? 0 : sin * widest.width + cos * highest.height;
          minSize.height = Math.min(this.maxHeight, minSize.height + labelHeight + tickPadding);
        } else {
          const labelWidth = tickOpts.mirror ? 0 : cos * widest.width + sin * highest.height;
          minSize.width = Math.min(this.maxWidth, minSize.width + labelWidth + tickPadding);
        }
        this._calculatePadding(first, last, sin, cos);
      }
    }
    this._handleMargins();
    if (isHorizontal) {
      this.width = this._length = chart.width - this._margins.left - this._margins.right;
      this.height = minSize.height;
    } else {
      this.width = minSize.width;
      this.height = this._length = chart.height - this._margins.top - this._margins.bottom;
    }
  }
  _calculatePadding(first, last, sin, cos) {
    const { ticks: { align, padding }, position } = this.options;
    const isRotated = this.labelRotation !== 0;
    const labelsBelowTicks = position !== "top" && this.axis === "x";
    if (this.isHorizontal()) {
      const offsetLeft = this.getPixelForTick(0) - this.left;
      const offsetRight = this.right - this.getPixelForTick(this.ticks.length - 1);
      let paddingLeft = 0;
      let paddingRight = 0;
      if (isRotated) {
        if (labelsBelowTicks) {
          paddingLeft = cos * first.width;
          paddingRight = sin * last.height;
        } else {
          paddingLeft = sin * first.height;
          paddingRight = cos * last.width;
        }
      } else if (align === "start") {
        paddingRight = last.width;
      } else if (align === "end") {
        paddingLeft = first.width;
      } else if (align !== "inner") {
        paddingLeft = first.width / 2;
        paddingRight = last.width / 2;
      }
      this.paddingLeft = Math.max((paddingLeft - offsetLeft + padding) * this.width / (this.width - offsetLeft), 0);
      this.paddingRight = Math.max((paddingRight - offsetRight + padding) * this.width / (this.width - offsetRight), 0);
    } else {
      let paddingTop = last.height / 2;
      let paddingBottom = first.height / 2;
      if (align === "start") {
        paddingTop = 0;
        paddingBottom = first.height;
      } else if (align === "end") {
        paddingTop = last.height;
        paddingBottom = 0;
      }
      this.paddingTop = paddingTop + padding;
      this.paddingBottom = paddingBottom + padding;
    }
  }
  _handleMargins() {
    if (this._margins) {
      this._margins.left = Math.max(this.paddingLeft, this._margins.left);
      this._margins.top = Math.max(this.paddingTop, this._margins.top);
      this._margins.right = Math.max(this.paddingRight, this._margins.right);
      this._margins.bottom = Math.max(this.paddingBottom, this._margins.bottom);
    }
  }
  afterFit() {
    callback(this.options.afterFit, [
      this
    ]);
  }
  isHorizontal() {
    const { axis, position } = this.options;
    return position === "top" || position === "bottom" || axis === "x";
  }
  isFullSize() {
    return this.options.fullSize;
  }
  _convertTicksToLabels(ticks) {
    this.beforeTickToLabelConversion();
    this.generateTickLabels(ticks);
    let i4, ilen;
    for (i4 = 0, ilen = ticks.length; i4 < ilen; i4++) {
      if (isNullOrUndef(ticks[i4].label)) {
        ticks.splice(i4, 1);
        ilen--;
        i4--;
      }
    }
    this.afterTickToLabelConversion();
  }
  _getLabelSizes() {
    let labelSizes = this._labelSizes;
    if (!labelSizes) {
      const sampleSize = this.options.ticks.sampleSize;
      let ticks = this.ticks;
      if (sampleSize < ticks.length) {
        ticks = sample(ticks, sampleSize);
      }
      this._labelSizes = labelSizes = this._computeLabelSizes(ticks, ticks.length, this.options.ticks.maxTicksLimit);
    }
    return labelSizes;
  }
  _computeLabelSizes(ticks, length, maxTicksLimit) {
    const { ctx, _longestTextCache: caches } = this;
    const widths = [];
    const heights = [];
    const increment = Math.floor(length / getTicksLimit(length, maxTicksLimit));
    let widestLabelSize = 0;
    let highestLabelSize = 0;
    let i4, j4, jlen, label, tickFont, fontString, cache, lineHeight, width, height, nestedLabel;
    for (i4 = 0; i4 < length; i4 += increment) {
      label = ticks[i4].label;
      tickFont = this._resolveTickFontOptions(i4);
      ctx.font = fontString = tickFont.string;
      cache = caches[fontString] = caches[fontString] || {
        data: {},
        gc: []
      };
      lineHeight = tickFont.lineHeight;
      width = height = 0;
      if (!isNullOrUndef(label) && !isArray(label)) {
        width = _measureText(ctx, cache.data, cache.gc, width, label);
        height = lineHeight;
      } else if (isArray(label)) {
        for (j4 = 0, jlen = label.length; j4 < jlen; ++j4) {
          nestedLabel = label[j4];
          if (!isNullOrUndef(nestedLabel) && !isArray(nestedLabel)) {
            width = _measureText(ctx, cache.data, cache.gc, width, nestedLabel);
            height += lineHeight;
          }
        }
      }
      widths.push(width);
      heights.push(height);
      widestLabelSize = Math.max(width, widestLabelSize);
      highestLabelSize = Math.max(height, highestLabelSize);
    }
    garbageCollect(caches, length);
    const widest = widths.indexOf(widestLabelSize);
    const highest = heights.indexOf(highestLabelSize);
    const valueAt = (idx) => ({
      width: widths[idx] || 0,
      height: heights[idx] || 0
    });
    return {
      first: valueAt(0),
      last: valueAt(length - 1),
      widest: valueAt(widest),
      highest: valueAt(highest),
      widths,
      heights
    };
  }
  getLabelForValue(value) {
    return value;
  }
  getPixelForValue(value, index2) {
    return NaN;
  }
  getValueForPixel(pixel) {
  }
  getPixelForTick(index2) {
    const ticks = this.ticks;
    if (index2 < 0 || index2 > ticks.length - 1) {
      return null;
    }
    return this.getPixelForValue(ticks[index2].value);
  }
  getPixelForDecimal(decimal) {
    if (this._reversePixels) {
      decimal = 1 - decimal;
    }
    const pixel = this._startPixel + decimal * this._length;
    return _int16Range(this._alignToPixels ? _alignPixel(this.chart, pixel, 0) : pixel);
  }
  getDecimalForPixel(pixel) {
    const decimal = (pixel - this._startPixel) / this._length;
    return this._reversePixels ? 1 - decimal : decimal;
  }
  getBasePixel() {
    return this.getPixelForValue(this.getBaseValue());
  }
  getBaseValue() {
    const { min, max } = this;
    return min < 0 && max < 0 ? max : min > 0 && max > 0 ? min : 0;
  }
  getContext(index2) {
    const ticks = this.ticks || [];
    if (index2 >= 0 && index2 < ticks.length) {
      const tick = ticks[index2];
      return tick.$context || (tick.$context = createTickContext(this.getContext(), index2, tick));
    }
    return this.$context || (this.$context = createScaleContext(this.chart.getContext(), this));
  }
  _tickSize() {
    const optionTicks = this.options.ticks;
    const rot = toRadians(this.labelRotation);
    const cos = Math.abs(Math.cos(rot));
    const sin = Math.abs(Math.sin(rot));
    const labelSizes = this._getLabelSizes();
    const padding = optionTicks.autoSkipPadding || 0;
    const w3 = labelSizes ? labelSizes.widest.width + padding : 0;
    const h3 = labelSizes ? labelSizes.highest.height + padding : 0;
    return this.isHorizontal() ? h3 * cos > w3 * sin ? w3 / cos : h3 / sin : h3 * sin < w3 * cos ? h3 / cos : w3 / sin;
  }
  _isVisible() {
    const display = this.options.display;
    if (display !== "auto") {
      return !!display;
    }
    return this.getMatchingVisibleMetas().length > 0;
  }
  _computeGridLineItems(chartArea) {
    const axis = this.axis;
    const chart = this.chart;
    const options = this.options;
    const { grid, position, border } = options;
    const offset = grid.offset;
    const isHorizontal = this.isHorizontal();
    const ticks = this.ticks;
    const ticksLength = ticks.length + (offset ? 1 : 0);
    const tl = getTickMarkLength(grid);
    const items = [];
    const borderOpts = border.setContext(this.getContext());
    const axisWidth = borderOpts.display ? borderOpts.width : 0;
    const axisHalfWidth = axisWidth / 2;
    const alignBorderValue = function(pixel) {
      return _alignPixel(chart, pixel, axisWidth);
    };
    let borderValue, i4, lineValue, alignedLineValue;
    let tx1, ty1, tx2, ty2, x1, y1, x22, y22;
    if (position === "top") {
      borderValue = alignBorderValue(this.bottom);
      ty1 = this.bottom - tl;
      ty2 = borderValue - axisHalfWidth;
      y1 = alignBorderValue(chartArea.top) + axisHalfWidth;
      y22 = chartArea.bottom;
    } else if (position === "bottom") {
      borderValue = alignBorderValue(this.top);
      y1 = chartArea.top;
      y22 = alignBorderValue(chartArea.bottom) - axisHalfWidth;
      ty1 = borderValue + axisHalfWidth;
      ty2 = this.top + tl;
    } else if (position === "left") {
      borderValue = alignBorderValue(this.right);
      tx1 = this.right - tl;
      tx2 = borderValue - axisHalfWidth;
      x1 = alignBorderValue(chartArea.left) + axisHalfWidth;
      x22 = chartArea.right;
    } else if (position === "right") {
      borderValue = alignBorderValue(this.left);
      x1 = chartArea.left;
      x22 = alignBorderValue(chartArea.right) - axisHalfWidth;
      tx1 = borderValue + axisHalfWidth;
      tx2 = this.left + tl;
    } else if (axis === "x") {
      if (position === "center") {
        borderValue = alignBorderValue((chartArea.top + chartArea.bottom) / 2 + 0.5);
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
      }
      y1 = chartArea.top;
      y22 = chartArea.bottom;
      ty1 = borderValue + axisHalfWidth;
      ty2 = ty1 + tl;
    } else if (axis === "y") {
      if (position === "center") {
        borderValue = alignBorderValue((chartArea.left + chartArea.right) / 2);
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        borderValue = alignBorderValue(this.chart.scales[positionAxisID].getPixelForValue(value));
      }
      tx1 = borderValue - axisHalfWidth;
      tx2 = tx1 - tl;
      x1 = chartArea.left;
      x22 = chartArea.right;
    }
    const limit = valueOrDefault(options.ticks.maxTicksLimit, ticksLength);
    const step = Math.max(1, Math.ceil(ticksLength / limit));
    for (i4 = 0; i4 < ticksLength; i4 += step) {
      const context = this.getContext(i4);
      const optsAtIndex = grid.setContext(context);
      const optsAtIndexBorder = border.setContext(context);
      const lineWidth = optsAtIndex.lineWidth;
      const lineColor = optsAtIndex.color;
      const borderDash = optsAtIndexBorder.dash || [];
      const borderDashOffset = optsAtIndexBorder.dashOffset;
      const tickWidth = optsAtIndex.tickWidth;
      const tickColor = optsAtIndex.tickColor;
      const tickBorderDash = optsAtIndex.tickBorderDash || [];
      const tickBorderDashOffset = optsAtIndex.tickBorderDashOffset;
      lineValue = getPixelForGridLine(this, i4, offset);
      if (lineValue === void 0) {
        continue;
      }
      alignedLineValue = _alignPixel(chart, lineValue, lineWidth);
      if (isHorizontal) {
        tx1 = tx2 = x1 = x22 = alignedLineValue;
      } else {
        ty1 = ty2 = y1 = y22 = alignedLineValue;
      }
      items.push({
        tx1,
        ty1,
        tx2,
        ty2,
        x1,
        y1,
        x2: x22,
        y2: y22,
        width: lineWidth,
        color: lineColor,
        borderDash,
        borderDashOffset,
        tickWidth,
        tickColor,
        tickBorderDash,
        tickBorderDashOffset
      });
    }
    this._ticksLength = ticksLength;
    this._borderValue = borderValue;
    return items;
  }
  _computeLabelItems(chartArea) {
    const axis = this.axis;
    const options = this.options;
    const { position, ticks: optionTicks } = options;
    const isHorizontal = this.isHorizontal();
    const ticks = this.ticks;
    const { align, crossAlign, padding, mirror } = optionTicks;
    const tl = getTickMarkLength(options.grid);
    const tickAndPadding = tl + padding;
    const hTickAndPadding = mirror ? -padding : tickAndPadding;
    const rotation = -toRadians(this.labelRotation);
    const items = [];
    let i4, ilen, tick, label, x3, y3, textAlign, pixel, font, lineHeight, lineCount, textOffset;
    let textBaseline = "middle";
    if (position === "top") {
      y3 = this.bottom - hTickAndPadding;
      textAlign = this._getXAxisLabelAlignment();
    } else if (position === "bottom") {
      y3 = this.top + hTickAndPadding;
      textAlign = this._getXAxisLabelAlignment();
    } else if (position === "left") {
      const ret = this._getYAxisLabelAlignment(tl);
      textAlign = ret.textAlign;
      x3 = ret.x;
    } else if (position === "right") {
      const ret = this._getYAxisLabelAlignment(tl);
      textAlign = ret.textAlign;
      x3 = ret.x;
    } else if (axis === "x") {
      if (position === "center") {
        y3 = (chartArea.top + chartArea.bottom) / 2 + tickAndPadding;
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        y3 = this.chart.scales[positionAxisID].getPixelForValue(value) + tickAndPadding;
      }
      textAlign = this._getXAxisLabelAlignment();
    } else if (axis === "y") {
      if (position === "center") {
        x3 = (chartArea.left + chartArea.right) / 2 - tickAndPadding;
      } else if (isObject(position)) {
        const positionAxisID = Object.keys(position)[0];
        const value = position[positionAxisID];
        x3 = this.chart.scales[positionAxisID].getPixelForValue(value);
      }
      textAlign = this._getYAxisLabelAlignment(tl).textAlign;
    }
    if (axis === "y") {
      if (align === "start") {
        textBaseline = "top";
      } else if (align === "end") {
        textBaseline = "bottom";
      }
    }
    const labelSizes = this._getLabelSizes();
    for (i4 = 0, ilen = ticks.length; i4 < ilen; ++i4) {
      tick = ticks[i4];
      label = tick.label;
      const optsAtIndex = optionTicks.setContext(this.getContext(i4));
      pixel = this.getPixelForTick(i4) + optionTicks.labelOffset;
      font = this._resolveTickFontOptions(i4);
      lineHeight = font.lineHeight;
      lineCount = isArray(label) ? label.length : 1;
      const halfCount = lineCount / 2;
      const color2 = optsAtIndex.color;
      const strokeColor = optsAtIndex.textStrokeColor;
      const strokeWidth = optsAtIndex.textStrokeWidth;
      let tickTextAlign = textAlign;
      if (isHorizontal) {
        x3 = pixel;
        if (textAlign === "inner") {
          if (i4 === ilen - 1) {
            tickTextAlign = !this.options.reverse ? "right" : "left";
          } else if (i4 === 0) {
            tickTextAlign = !this.options.reverse ? "left" : "right";
          } else {
            tickTextAlign = "center";
          }
        }
        if (position === "top") {
          if (crossAlign === "near" || rotation !== 0) {
            textOffset = -lineCount * lineHeight + lineHeight / 2;
          } else if (crossAlign === "center") {
            textOffset = -labelSizes.highest.height / 2 - halfCount * lineHeight + lineHeight;
          } else {
            textOffset = -labelSizes.highest.height + lineHeight / 2;
          }
        } else {
          if (crossAlign === "near" || rotation !== 0) {
            textOffset = lineHeight / 2;
          } else if (crossAlign === "center") {
            textOffset = labelSizes.highest.height / 2 - halfCount * lineHeight;
          } else {
            textOffset = labelSizes.highest.height - lineCount * lineHeight;
          }
        }
        if (mirror) {
          textOffset *= -1;
        }
        if (rotation !== 0 && !optsAtIndex.showLabelBackdrop) {
          x3 += lineHeight / 2 * Math.sin(rotation);
        }
      } else {
        y3 = pixel;
        textOffset = (1 - lineCount) * lineHeight / 2;
      }
      let backdrop;
      if (optsAtIndex.showLabelBackdrop) {
        const labelPadding = toPadding(optsAtIndex.backdropPadding);
        const height = labelSizes.heights[i4];
        const width = labelSizes.widths[i4];
        let top = textOffset - labelPadding.top;
        let left = 0 - labelPadding.left;
        switch (textBaseline) {
          case "middle":
            top -= height / 2;
            break;
          case "bottom":
            top -= height;
            break;
        }
        switch (textAlign) {
          case "center":
            left -= width / 2;
            break;
          case "right":
            left -= width;
            break;
          case "inner":
            if (i4 === ilen - 1) {
              left -= width;
            } else if (i4 > 0) {
              left -= width / 2;
            }
            break;
        }
        backdrop = {
          left,
          top,
          width: width + labelPadding.width,
          height: height + labelPadding.height,
          color: optsAtIndex.backdropColor
        };
      }
      items.push({
        label,
        font,
        textOffset,
        options: {
          rotation,
          color: color2,
          strokeColor,
          strokeWidth,
          textAlign: tickTextAlign,
          textBaseline,
          translation: [
            x3,
            y3
          ],
          backdrop
        }
      });
    }
    return items;
  }
  _getXAxisLabelAlignment() {
    const { position, ticks } = this.options;
    const rotation = -toRadians(this.labelRotation);
    if (rotation) {
      return position === "top" ? "left" : "right";
    }
    let align = "center";
    if (ticks.align === "start") {
      align = "left";
    } else if (ticks.align === "end") {
      align = "right";
    } else if (ticks.align === "inner") {
      align = "inner";
    }
    return align;
  }
  _getYAxisLabelAlignment(tl) {
    const { position, ticks: { crossAlign, mirror, padding } } = this.options;
    const labelSizes = this._getLabelSizes();
    const tickAndPadding = tl + padding;
    const widest = labelSizes.widest.width;
    let textAlign;
    let x3;
    if (position === "left") {
      if (mirror) {
        x3 = this.right + padding;
        if (crossAlign === "near") {
          textAlign = "left";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x3 += widest / 2;
        } else {
          textAlign = "right";
          x3 += widest;
        }
      } else {
        x3 = this.right - tickAndPadding;
        if (crossAlign === "near") {
          textAlign = "right";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x3 -= widest / 2;
        } else {
          textAlign = "left";
          x3 = this.left;
        }
      }
    } else if (position === "right") {
      if (mirror) {
        x3 = this.left + padding;
        if (crossAlign === "near") {
          textAlign = "right";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x3 -= widest / 2;
        } else {
          textAlign = "left";
          x3 -= widest;
        }
      } else {
        x3 = this.left + tickAndPadding;
        if (crossAlign === "near") {
          textAlign = "left";
        } else if (crossAlign === "center") {
          textAlign = "center";
          x3 += widest / 2;
        } else {
          textAlign = "right";
          x3 = this.right;
        }
      }
    } else {
      textAlign = "right";
    }
    return {
      textAlign,
      x: x3
    };
  }
  _computeLabelArea() {
    if (this.options.ticks.mirror) {
      return;
    }
    const chart = this.chart;
    const position = this.options.position;
    if (position === "left" || position === "right") {
      return {
        top: 0,
        left: this.left,
        bottom: chart.height,
        right: this.right
      };
    }
    if (position === "top" || position === "bottom") {
      return {
        top: this.top,
        left: 0,
        bottom: this.bottom,
        right: chart.width
      };
    }
  }
  drawBackground() {
    const { ctx, options: { backgroundColor }, left, top, width, height } = this;
    if (backgroundColor) {
      ctx.save();
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    }
  }
  getLineWidthForValue(value) {
    const grid = this.options.grid;
    if (!this._isVisible() || !grid.display) {
      return 0;
    }
    const ticks = this.ticks;
    const index2 = ticks.findIndex((t3) => t3.value === value);
    if (index2 >= 0) {
      const opts = grid.setContext(this.getContext(index2));
      return opts.lineWidth;
    }
    return 0;
  }
  drawGrid(chartArea) {
    const grid = this.options.grid;
    const ctx = this.ctx;
    const items = this._gridLineItems || (this._gridLineItems = this._computeGridLineItems(chartArea));
    let i4, ilen;
    const drawLine = (p1, p22, style) => {
      if (!style.width || !style.color) {
        return;
      }
      ctx.save();
      ctx.lineWidth = style.width;
      ctx.strokeStyle = style.color;
      ctx.setLineDash(style.borderDash || []);
      ctx.lineDashOffset = style.borderDashOffset;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p22.x, p22.y);
      ctx.stroke();
      ctx.restore();
    };
    if (grid.display) {
      for (i4 = 0, ilen = items.length; i4 < ilen; ++i4) {
        const item = items[i4];
        if (grid.drawOnChartArea) {
          drawLine({
            x: item.x1,
            y: item.y1
          }, {
            x: item.x2,
            y: item.y2
          }, item);
        }
        if (grid.drawTicks) {
          drawLine({
            x: item.tx1,
            y: item.ty1
          }, {
            x: item.tx2,
            y: item.ty2
          }, {
            color: item.tickColor,
            width: item.tickWidth,
            borderDash: item.tickBorderDash,
            borderDashOffset: item.tickBorderDashOffset
          });
        }
      }
    }
  }
  drawBorder() {
    const { chart, ctx, options: { border, grid } } = this;
    const borderOpts = border.setContext(this.getContext());
    const axisWidth = border.display ? borderOpts.width : 0;
    if (!axisWidth) {
      return;
    }
    const lastLineWidth = grid.setContext(this.getContext(0)).lineWidth;
    const borderValue = this._borderValue;
    let x1, x22, y1, y22;
    if (this.isHorizontal()) {
      x1 = _alignPixel(chart, this.left, axisWidth) - axisWidth / 2;
      x22 = _alignPixel(chart, this.right, lastLineWidth) + lastLineWidth / 2;
      y1 = y22 = borderValue;
    } else {
      y1 = _alignPixel(chart, this.top, axisWidth) - axisWidth / 2;
      y22 = _alignPixel(chart, this.bottom, lastLineWidth) + lastLineWidth / 2;
      x1 = x22 = borderValue;
    }
    ctx.save();
    ctx.lineWidth = borderOpts.width;
    ctx.strokeStyle = borderOpts.color;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x22, y22);
    ctx.stroke();
    ctx.restore();
  }
  drawLabels(chartArea) {
    const optionTicks = this.options.ticks;
    if (!optionTicks.display) {
      return;
    }
    const ctx = this.ctx;
    const area = this._computeLabelArea();
    if (area) {
      clipArea(ctx, area);
    }
    const items = this.getLabelItems(chartArea);
    for (const item of items) {
      const renderTextOptions = item.options;
      const tickFont = item.font;
      const label = item.label;
      const y3 = item.textOffset;
      renderText(ctx, label, 0, y3, tickFont, renderTextOptions);
    }
    if (area) {
      unclipArea(ctx);
    }
  }
  drawTitle() {
    const { ctx, options: { position, title, reverse } } = this;
    if (!title.display) {
      return;
    }
    const font = toFont(title.font);
    const padding = toPadding(title.padding);
    const align = title.align;
    let offset = font.lineHeight / 2;
    if (position === "bottom" || position === "center" || isObject(position)) {
      offset += padding.bottom;
      if (isArray(title.text)) {
        offset += font.lineHeight * (title.text.length - 1);
      }
    } else {
      offset += padding.top;
    }
    const { titleX, titleY, maxWidth, rotation } = titleArgs(this, offset, position, align);
    renderText(ctx, title.text, 0, 0, font, {
      color: title.color,
      maxWidth,
      rotation,
      textAlign: titleAlign(align, position, reverse),
      textBaseline: "middle",
      translation: [
        titleX,
        titleY
      ]
    });
  }
  draw(chartArea) {
    if (!this._isVisible()) {
      return;
    }
    this.drawBackground();
    this.drawGrid(chartArea);
    this.drawBorder();
    this.drawTitle();
    this.drawLabels(chartArea);
  }
  _layers() {
    const opts = this.options;
    const tz = opts.ticks && opts.ticks.z || 0;
    const gz = valueOrDefault(opts.grid && opts.grid.z, -1);
    const bz = valueOrDefault(opts.border && opts.border.z, 0);
    if (!this._isVisible() || this.draw !== _Scale.prototype.draw) {
      return [
        {
          z: tz,
          draw: (chartArea) => {
            this.draw(chartArea);
          }
        }
      ];
    }
    return [
      {
        z: gz,
        draw: (chartArea) => {
          this.drawBackground();
          this.drawGrid(chartArea);
          this.drawTitle();
        }
      },
      {
        z: bz,
        draw: () => {
          this.drawBorder();
        }
      },
      {
        z: tz,
        draw: (chartArea) => {
          this.drawLabels(chartArea);
        }
      }
    ];
  }
  getMatchingVisibleMetas(type) {
    const metas = this.chart.getSortedVisibleDatasetMetas();
    const axisID = this.axis + "AxisID";
    const result = [];
    let i4, ilen;
    for (i4 = 0, ilen = metas.length; i4 < ilen; ++i4) {
      const meta = metas[i4];
      if (meta[axisID] === this.id && (!type || meta.type === type)) {
        result.push(meta);
      }
    }
    return result;
  }
  _resolveTickFontOptions(index2) {
    const opts = this.options.ticks.setContext(this.getContext(index2));
    return toFont(opts.font);
  }
  _maxDigits() {
    const fontSize = this._resolveTickFontOptions(0).lineHeight;
    return (this.isHorizontal() ? this.width : this.height) / fontSize;
  }
};
var TypedRegistry = class {
  constructor(type, scope, override) {
    this.type = type;
    this.scope = scope;
    this.override = override;
    this.items = /* @__PURE__ */ Object.create(null);
  }
  isForType(type) {
    return Object.prototype.isPrototypeOf.call(this.type.prototype, type.prototype);
  }
  register(item) {
    const proto = Object.getPrototypeOf(item);
    let parentScope;
    if (isIChartComponent(proto)) {
      parentScope = this.register(proto);
    }
    const items = this.items;
    const id = item.id;
    const scope = this.scope + "." + id;
    if (!id) {
      throw new Error("class does not have id: " + item);
    }
    if (id in items) {
      return scope;
    }
    items[id] = item;
    registerDefaults(item, scope, parentScope);
    if (this.override) {
      defaults.override(item.id, item.overrides);
    }
    return scope;
  }
  get(id) {
    return this.items[id];
  }
  unregister(item) {
    const items = this.items;
    const id = item.id;
    const scope = this.scope;
    if (id in items) {
      delete items[id];
    }
    if (scope && id in defaults[scope]) {
      delete defaults[scope][id];
      if (this.override) {
        delete overrides[id];
      }
    }
  }
};
function registerDefaults(item, scope, parentScope) {
  const itemDefaults = merge(/* @__PURE__ */ Object.create(null), [
    parentScope ? defaults.get(parentScope) : {},
    defaults.get(scope),
    item.defaults
  ]);
  defaults.set(scope, itemDefaults);
  if (item.defaultRoutes) {
    routeDefaults(scope, item.defaultRoutes);
  }
  if (item.descriptors) {
    defaults.describe(scope, item.descriptors);
  }
}
function routeDefaults(scope, routes) {
  Object.keys(routes).forEach((property) => {
    const propertyParts = property.split(".");
    const sourceName = propertyParts.pop();
    const sourceScope = [
      scope
    ].concat(propertyParts).join(".");
    const parts = routes[property].split(".");
    const targetName = parts.pop();
    const targetScope = parts.join(".");
    defaults.route(sourceScope, sourceName, targetScope, targetName);
  });
}
function isIChartComponent(proto) {
  return "id" in proto && "defaults" in proto;
}
var Registry = class {
  constructor() {
    this.controllers = new TypedRegistry(DatasetController, "datasets", true);
    this.elements = new TypedRegistry(Element, "elements");
    this.plugins = new TypedRegistry(Object, "plugins");
    this.scales = new TypedRegistry(Scale, "scales");
    this._typedRegistries = [
      this.controllers,
      this.scales,
      this.elements
    ];
  }
  add(...args) {
    this._each("register", args);
  }
  remove(...args) {
    this._each("unregister", args);
  }
  addControllers(...args) {
    this._each("register", args, this.controllers);
  }
  addElements(...args) {
    this._each("register", args, this.elements);
  }
  addPlugins(...args) {
    this._each("register", args, this.plugins);
  }
  addScales(...args) {
    this._each("register", args, this.scales);
  }
  getController(id) {
    return this._get(id, this.controllers, "controller");
  }
  getElement(id) {
    return this._get(id, this.elements, "element");
  }
  getPlugin(id) {
    return this._get(id, this.plugins, "plugin");
  }
  getScale(id) {
    return this._get(id, this.scales, "scale");
  }
  removeControllers(...args) {
    this._each("unregister", args, this.controllers);
  }
  removeElements(...args) {
    this._each("unregister", args, this.elements);
  }
  removePlugins(...args) {
    this._each("unregister", args, this.plugins);
  }
  removeScales(...args) {
    this._each("unregister", args, this.scales);
  }
  _each(method, args, typedRegistry) {
    [
      ...args
    ].forEach((arg) => {
      const reg = typedRegistry || this._getRegistryForType(arg);
      if (typedRegistry || reg.isForType(arg) || reg === this.plugins && arg.id) {
        this._exec(method, reg, arg);
      } else {
        each(arg, (item) => {
          const itemReg = typedRegistry || this._getRegistryForType(item);
          this._exec(method, itemReg, item);
        });
      }
    });
  }
  _exec(method, registry2, component) {
    const camelMethod = _capitalize(method);
    callback(component["before" + camelMethod], [], component);
    registry2[method](component);
    callback(component["after" + camelMethod], [], component);
  }
  _getRegistryForType(type) {
    for (let i4 = 0; i4 < this._typedRegistries.length; i4++) {
      const reg = this._typedRegistries[i4];
      if (reg.isForType(type)) {
        return reg;
      }
    }
    return this.plugins;
  }
  _get(id, typedRegistry, type) {
    const item = typedRegistry.get(id);
    if (item === void 0) {
      throw new Error('"' + id + '" is not a registered ' + type + ".");
    }
    return item;
  }
};
var registry = /* @__PURE__ */ new Registry();
var PluginService = class {
  constructor() {
    this._init = void 0;
  }
  notify(chart, hook, args, filter) {
    if (hook === "beforeInit") {
      this._init = this._createDescriptors(chart, true);
      this._notify(this._init, chart, "install");
    }
    if (this._init === void 0) {
      return;
    }
    const descriptors2 = filter ? this._descriptors(chart).filter(filter) : this._descriptors(chart);
    const result = this._notify(descriptors2, chart, hook, args);
    if (hook === "afterDestroy") {
      this._notify(descriptors2, chart, "stop");
      this._notify(this._init, chart, "uninstall");
      this._init = void 0;
    }
    return result;
  }
  _notify(descriptors2, chart, hook, args) {
    args = args || {};
    for (const descriptor of descriptors2) {
      const plugin = descriptor.plugin;
      const method = plugin[hook];
      const params = [
        chart,
        args,
        descriptor.options
      ];
      if (callback(method, params, plugin) === false && args.cancelable) {
        return false;
      }
    }
    return true;
  }
  invalidate() {
    if (!isNullOrUndef(this._cache)) {
      this._oldCache = this._cache;
      this._cache = void 0;
    }
  }
  _descriptors(chart) {
    if (this._cache) {
      return this._cache;
    }
    const descriptors2 = this._cache = this._createDescriptors(chart);
    this._notifyStateChanges(chart);
    return descriptors2;
  }
  _createDescriptors(chart, all) {
    const config = chart && chart.config;
    const options = valueOrDefault(config.options && config.options.plugins, {});
    const plugins2 = allPlugins(config);
    return options === false && !all ? [] : createDescriptors(chart, plugins2, options, all);
  }
  _notifyStateChanges(chart) {
    const previousDescriptors = this._oldCache || [];
    const descriptors2 = this._cache;
    const diff = (a3, b2) => a3.filter((x3) => !b2.some((y3) => x3.plugin.id === y3.plugin.id));
    this._notify(diff(previousDescriptors, descriptors2), chart, "stop");
    this._notify(diff(descriptors2, previousDescriptors), chart, "start");
  }
};
function allPlugins(config) {
  const localIds = {};
  const plugins2 = [];
  const keys = Object.keys(registry.plugins.items);
  for (let i4 = 0; i4 < keys.length; i4++) {
    plugins2.push(registry.getPlugin(keys[i4]));
  }
  const local = config.plugins || [];
  for (let i4 = 0; i4 < local.length; i4++) {
    const plugin = local[i4];
    if (plugins2.indexOf(plugin) === -1) {
      plugins2.push(plugin);
      localIds[plugin.id] = true;
    }
  }
  return {
    plugins: plugins2,
    localIds
  };
}
function getOpts(options, all) {
  if (!all && options === false) {
    return null;
  }
  if (options === true) {
    return {};
  }
  return options;
}
function createDescriptors(chart, { plugins: plugins2, localIds }, options, all) {
  const result = [];
  const context = chart.getContext();
  for (const plugin of plugins2) {
    const id = plugin.id;
    const opts = getOpts(options[id], all);
    if (opts === null) {
      continue;
    }
    result.push({
      plugin,
      options: pluginOpts(chart.config, {
        plugin,
        local: localIds[id]
      }, opts, context)
    });
  }
  return result;
}
function pluginOpts(config, { plugin, local }, opts, context) {
  const keys = config.pluginScopeKeys(plugin);
  const scopes = config.getOptionScopes(opts, keys);
  if (local && plugin.defaults) {
    scopes.push(plugin.defaults);
  }
  return config.createResolver(scopes, context, [
    ""
  ], {
    scriptable: false,
    indexable: false,
    allKeys: true
  });
}
function getIndexAxis(type, options) {
  const datasetDefaults = defaults.datasets[type] || {};
  const datasetOptions = (options.datasets || {})[type] || {};
  return datasetOptions.indexAxis || options.indexAxis || datasetDefaults.indexAxis || "x";
}
function getAxisFromDefaultScaleID(id, indexAxis) {
  let axis = id;
  if (id === "_index_") {
    axis = indexAxis;
  } else if (id === "_value_") {
    axis = indexAxis === "x" ? "y" : "x";
  }
  return axis;
}
function getDefaultScaleIDFromAxis(axis, indexAxis) {
  return axis === indexAxis ? "_index_" : "_value_";
}
function idMatchesAxis(id) {
  if (id === "x" || id === "y" || id === "r") {
    return id;
  }
}
function axisFromPosition(position) {
  if (position === "top" || position === "bottom") {
    return "x";
  }
  if (position === "left" || position === "right") {
    return "y";
  }
}
function determineAxis(id, ...scaleOptions) {
  if (idMatchesAxis(id)) {
    return id;
  }
  for (const opts of scaleOptions) {
    const axis = opts.axis || axisFromPosition(opts.position) || id.length > 1 && idMatchesAxis(id[0].toLowerCase());
    if (axis) {
      return axis;
    }
  }
  throw new Error(`Cannot determine type of '${id}' axis. Please provide 'axis' or 'position' option.`);
}
function getAxisFromDataset(id, axis, dataset) {
  if (dataset[axis + "AxisID"] === id) {
    return {
      axis
    };
  }
}
function retrieveAxisFromDatasets(id, config) {
  if (config.data && config.data.datasets) {
    const boundDs = config.data.datasets.filter((d3) => d3.xAxisID === id || d3.yAxisID === id);
    if (boundDs.length) {
      return getAxisFromDataset(id, "x", boundDs[0]) || getAxisFromDataset(id, "y", boundDs[0]);
    }
  }
  return {};
}
function mergeScaleConfig(config, options) {
  const chartDefaults = overrides[config.type] || {
    scales: {}
  };
  const configScales = options.scales || {};
  const chartIndexAxis = getIndexAxis(config.type, options);
  const scales2 = /* @__PURE__ */ Object.create(null);
  Object.keys(configScales).forEach((id) => {
    const scaleConf = configScales[id];
    if (!isObject(scaleConf)) {
      return console.error(`Invalid scale configuration for scale: ${id}`);
    }
    if (scaleConf._proxy) {
      return console.warn(`Ignoring resolver passed as options for scale: ${id}`);
    }
    const axis = determineAxis(id, scaleConf, retrieveAxisFromDatasets(id, config), defaults.scales[scaleConf.type]);
    const defaultId = getDefaultScaleIDFromAxis(axis, chartIndexAxis);
    const defaultScaleOptions = chartDefaults.scales || {};
    scales2[id] = mergeIf(/* @__PURE__ */ Object.create(null), [
      {
        axis
      },
      scaleConf,
      defaultScaleOptions[axis],
      defaultScaleOptions[defaultId]
    ]);
  });
  config.data.datasets.forEach((dataset) => {
    const type = dataset.type || config.type;
    const indexAxis = dataset.indexAxis || getIndexAxis(type, options);
    const datasetDefaults = overrides[type] || {};
    const defaultScaleOptions = datasetDefaults.scales || {};
    Object.keys(defaultScaleOptions).forEach((defaultID) => {
      const axis = getAxisFromDefaultScaleID(defaultID, indexAxis);
      const id = dataset[axis + "AxisID"] || axis;
      scales2[id] = scales2[id] || /* @__PURE__ */ Object.create(null);
      mergeIf(scales2[id], [
        {
          axis
        },
        configScales[id],
        defaultScaleOptions[defaultID]
      ]);
    });
  });
  Object.keys(scales2).forEach((key) => {
    const scale = scales2[key];
    mergeIf(scale, [
      defaults.scales[scale.type],
      defaults.scale
    ]);
  });
  return scales2;
}
function initOptions(config) {
  const options = config.options || (config.options = {});
  options.plugins = valueOrDefault(options.plugins, {});
  options.scales = mergeScaleConfig(config, options);
}
function initData(data) {
  data = data || {};
  data.datasets = data.datasets || [];
  data.labels = data.labels || [];
  return data;
}
function initConfig(config) {
  config = config || {};
  config.data = initData(config.data);
  initOptions(config);
  return config;
}
var keyCache = /* @__PURE__ */ new Map();
var keysCached = /* @__PURE__ */ new Set();
function cachedKeys(cacheKey, generate) {
  let keys = keyCache.get(cacheKey);
  if (!keys) {
    keys = generate();
    keyCache.set(cacheKey, keys);
    keysCached.add(keys);
  }
  return keys;
}
var addIfFound = (set2, obj, key) => {
  const opts = resolveObjectKey(obj, key);
  if (opts !== void 0) {
    set2.add(opts);
  }
};
var Config = class {
  constructor(config) {
    this._config = initConfig(config);
    this._scopeCache = /* @__PURE__ */ new Map();
    this._resolverCache = /* @__PURE__ */ new Map();
  }
  get platform() {
    return this._config.platform;
  }
  get type() {
    return this._config.type;
  }
  set type(type) {
    this._config.type = type;
  }
  get data() {
    return this._config.data;
  }
  set data(data) {
    this._config.data = initData(data);
  }
  get options() {
    return this._config.options;
  }
  set options(options) {
    this._config.options = options;
  }
  get plugins() {
    return this._config.plugins;
  }
  update() {
    const config = this._config;
    this.clearCache();
    initOptions(config);
  }
  clearCache() {
    this._scopeCache.clear();
    this._resolverCache.clear();
  }
  datasetScopeKeys(datasetType) {
    return cachedKeys(datasetType, () => [
      [
        `datasets.${datasetType}`,
        ""
      ]
    ]);
  }
  datasetAnimationScopeKeys(datasetType, transition) {
    return cachedKeys(`${datasetType}.transition.${transition}`, () => [
      [
        `datasets.${datasetType}.transitions.${transition}`,
        `transitions.${transition}`
      ],
      [
        `datasets.${datasetType}`,
        ""
      ]
    ]);
  }
  datasetElementScopeKeys(datasetType, elementType) {
    return cachedKeys(`${datasetType}-${elementType}`, () => [
      [
        `datasets.${datasetType}.elements.${elementType}`,
        `datasets.${datasetType}`,
        `elements.${elementType}`,
        ""
      ]
    ]);
  }
  pluginScopeKeys(plugin) {
    const id = plugin.id;
    const type = this.type;
    return cachedKeys(`${type}-plugin-${id}`, () => [
      [
        `plugins.${id}`,
        ...plugin.additionalOptionScopes || []
      ]
    ]);
  }
  _cachedScopes(mainScope, resetCache) {
    const _scopeCache = this._scopeCache;
    let cache = _scopeCache.get(mainScope);
    if (!cache || resetCache) {
      cache = /* @__PURE__ */ new Map();
      _scopeCache.set(mainScope, cache);
    }
    return cache;
  }
  getOptionScopes(mainScope, keyLists, resetCache) {
    const { options, type } = this;
    const cache = this._cachedScopes(mainScope, resetCache);
    const cached = cache.get(keyLists);
    if (cached) {
      return cached;
    }
    const scopes = /* @__PURE__ */ new Set();
    keyLists.forEach((keys) => {
      if (mainScope) {
        scopes.add(mainScope);
        keys.forEach((key) => addIfFound(scopes, mainScope, key));
      }
      keys.forEach((key) => addIfFound(scopes, options, key));
      keys.forEach((key) => addIfFound(scopes, overrides[type] || {}, key));
      keys.forEach((key) => addIfFound(scopes, defaults, key));
      keys.forEach((key) => addIfFound(scopes, descriptors, key));
    });
    const array = Array.from(scopes);
    if (array.length === 0) {
      array.push(/* @__PURE__ */ Object.create(null));
    }
    if (keysCached.has(keyLists)) {
      cache.set(keyLists, array);
    }
    return array;
  }
  chartOptionScopes() {
    const { options, type } = this;
    return [
      options,
      overrides[type] || {},
      defaults.datasets[type] || {},
      {
        type
      },
      defaults,
      descriptors
    ];
  }
  resolveNamedOptions(scopes, names2, context, prefixes = [
    ""
  ]) {
    const result = {
      $shared: true
    };
    const { resolver, subPrefixes } = getResolver(this._resolverCache, scopes, prefixes);
    let options = resolver;
    if (needContext(resolver, names2)) {
      result.$shared = false;
      context = isFunction(context) ? context() : context;
      const subResolver = this.createResolver(scopes, context, subPrefixes);
      options = _attachContext(resolver, context, subResolver);
    }
    for (const prop of names2) {
      result[prop] = options[prop];
    }
    return result;
  }
  createResolver(scopes, context, prefixes = [
    ""
  ], descriptorDefaults) {
    const { resolver } = getResolver(this._resolverCache, scopes, prefixes);
    return isObject(context) ? _attachContext(resolver, context, void 0, descriptorDefaults) : resolver;
  }
};
function getResolver(resolverCache, scopes, prefixes) {
  let cache = resolverCache.get(scopes);
  if (!cache) {
    cache = /* @__PURE__ */ new Map();
    resolverCache.set(scopes, cache);
  }
  const cacheKey = prefixes.join();
  let cached = cache.get(cacheKey);
  if (!cached) {
    const resolver = _createResolver(scopes, prefixes);
    cached = {
      resolver,
      subPrefixes: prefixes.filter((p3) => !p3.toLowerCase().includes("hover"))
    };
    cache.set(cacheKey, cached);
  }
  return cached;
}
var hasFunction = (value) => isObject(value) && Object.getOwnPropertyNames(value).some((key) => isFunction(value[key]));
function needContext(proxy, names2) {
  const { isScriptable, isIndexable } = _descriptors(proxy);
  for (const prop of names2) {
    const scriptable = isScriptable(prop);
    const indexable = isIndexable(prop);
    const value = (indexable || scriptable) && proxy[prop];
    if (scriptable && (isFunction(value) || hasFunction(value)) || indexable && isArray(value)) {
      return true;
    }
  }
  return false;
}
var version = "4.5.1";
var KNOWN_POSITIONS = [
  "top",
  "bottom",
  "left",
  "right",
  "chartArea"
];
function positionIsHorizontal(position, axis) {
  return position === "top" || position === "bottom" || KNOWN_POSITIONS.indexOf(position) === -1 && axis === "x";
}
function compare2Level(l1, l22) {
  return function(a3, b2) {
    return a3[l1] === b2[l1] ? a3[l22] - b2[l22] : a3[l1] - b2[l1];
  };
}
function onAnimationsComplete(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;
  chart.notifyPlugins("afterRender");
  callback(animationOptions && animationOptions.onComplete, [
    context
  ], chart);
}
function onAnimationProgress(context) {
  const chart = context.chart;
  const animationOptions = chart.options.animation;
  callback(animationOptions && animationOptions.onProgress, [
    context
  ], chart);
}
function getCanvas(item) {
  if (_isDomSupported() && typeof item === "string") {
    item = document.getElementById(item);
  } else if (item && item.length) {
    item = item[0];
  }
  if (item && item.canvas) {
    item = item.canvas;
  }
  return item;
}
var instances = {};
var getChart = (key) => {
  const canvas = getCanvas(key);
  return Object.values(instances).filter((c3) => c3.canvas === canvas).pop();
};
function moveNumericKeys(obj, start, move) {
  const keys = Object.keys(obj);
  for (const key of keys) {
    const intKey = +key;
    if (intKey >= start) {
      const value = obj[key];
      delete obj[key];
      if (move > 0 || intKey > start) {
        obj[intKey + move] = value;
      }
    }
  }
}
function determineLastEvent(e3, lastEvent, inChartArea, isClick) {
  if (!inChartArea || e3.type === "mouseout") {
    return null;
  }
  if (isClick) {
    return lastEvent;
  }
  return e3;
}
var Chart = class {
  static register(...items) {
    registry.add(...items);
    invalidatePlugins();
  }
  static unregister(...items) {
    registry.remove(...items);
    invalidatePlugins();
  }
  constructor(item, userConfig) {
    const config = this.config = new Config(userConfig);
    const initialCanvas = getCanvas(item);
    const existingChart = getChart(initialCanvas);
    if (existingChart) {
      throw new Error("Canvas is already in use. Chart with ID '" + existingChart.id + "' must be destroyed before the canvas with ID '" + existingChart.canvas.id + "' can be reused.");
    }
    const options = config.createResolver(config.chartOptionScopes(), this.getContext());
    this.platform = new (config.platform || _detectPlatform(initialCanvas))();
    this.platform.updateConfig(config);
    const context = this.platform.acquireContext(initialCanvas, options.aspectRatio);
    const canvas = context && context.canvas;
    const height = canvas && canvas.height;
    const width = canvas && canvas.width;
    this.id = uid();
    this.ctx = context;
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this._options = options;
    this._aspectRatio = this.aspectRatio;
    this._layers = [];
    this._metasets = [];
    this._stacks = void 0;
    this.boxes = [];
    this.currentDevicePixelRatio = void 0;
    this.chartArea = void 0;
    this._active = [];
    this._lastEvent = void 0;
    this._listeners = {};
    this._responsiveListeners = void 0;
    this._sortedMetasets = [];
    this.scales = {};
    this._plugins = new PluginService();
    this.$proxies = {};
    this._hiddenIndices = {};
    this.attached = false;
    this._animationsDisabled = void 0;
    this.$context = void 0;
    this._doResize = debounce((mode) => this.update(mode), options.resizeDelay || 0);
    this._dataChanges = [];
    instances[this.id] = this;
    if (!context || !canvas) {
      console.error("Failed to create chart: can't acquire context from the given item");
      return;
    }
    animator.listen(this, "complete", onAnimationsComplete);
    animator.listen(this, "progress", onAnimationProgress);
    this._initialize();
    if (this.attached) {
      this.update();
    }
  }
  get aspectRatio() {
    const { options: { aspectRatio, maintainAspectRatio }, width, height, _aspectRatio } = this;
    if (!isNullOrUndef(aspectRatio)) {
      return aspectRatio;
    }
    if (maintainAspectRatio && _aspectRatio) {
      return _aspectRatio;
    }
    return height ? width / height : null;
  }
  get data() {
    return this.config.data;
  }
  set data(data) {
    this.config.data = data;
  }
  get options() {
    return this._options;
  }
  set options(options) {
    this.config.options = options;
  }
  get registry() {
    return registry;
  }
  _initialize() {
    this.notifyPlugins("beforeInit");
    if (this.options.responsive) {
      this.resize();
    } else {
      retinaScale(this, this.options.devicePixelRatio);
    }
    this.bindEvents();
    this.notifyPlugins("afterInit");
    return this;
  }
  clear() {
    clearCanvas(this.canvas, this.ctx);
    return this;
  }
  stop() {
    animator.stop(this);
    return this;
  }
  resize(width, height) {
    if (!animator.running(this)) {
      this._resize(width, height);
    } else {
      this._resizeBeforeDraw = {
        width,
        height
      };
    }
  }
  _resize(width, height) {
    const options = this.options;
    const canvas = this.canvas;
    const aspectRatio = options.maintainAspectRatio && this.aspectRatio;
    const newSize = this.platform.getMaximumSize(canvas, width, height, aspectRatio);
    const newRatio = options.devicePixelRatio || this.platform.getDevicePixelRatio();
    const mode = this.width ? "resize" : "attach";
    this.width = newSize.width;
    this.height = newSize.height;
    this._aspectRatio = this.aspectRatio;
    if (!retinaScale(this, newRatio, true)) {
      return;
    }
    this.notifyPlugins("resize", {
      size: newSize
    });
    callback(options.onResize, [
      this,
      newSize
    ], this);
    if (this.attached) {
      if (this._doResize(mode)) {
        this.render();
      }
    }
  }
  ensureScalesHaveIDs() {
    const options = this.options;
    const scalesOptions = options.scales || {};
    each(scalesOptions, (axisOptions, axisID) => {
      axisOptions.id = axisID;
    });
  }
  buildOrUpdateScales() {
    const options = this.options;
    const scaleOpts = options.scales;
    const scales2 = this.scales;
    const updated = Object.keys(scales2).reduce((obj, id) => {
      obj[id] = false;
      return obj;
    }, {});
    let items = [];
    if (scaleOpts) {
      items = items.concat(Object.keys(scaleOpts).map((id) => {
        const scaleOptions = scaleOpts[id];
        const axis = determineAxis(id, scaleOptions);
        const isRadial = axis === "r";
        const isHorizontal = axis === "x";
        return {
          options: scaleOptions,
          dposition: isRadial ? "chartArea" : isHorizontal ? "bottom" : "left",
          dtype: isRadial ? "radialLinear" : isHorizontal ? "category" : "linear"
        };
      }));
    }
    each(items, (item) => {
      const scaleOptions = item.options;
      const id = scaleOptions.id;
      const axis = determineAxis(id, scaleOptions);
      const scaleType = valueOrDefault(scaleOptions.type, item.dtype);
      if (scaleOptions.position === void 0 || positionIsHorizontal(scaleOptions.position, axis) !== positionIsHorizontal(item.dposition)) {
        scaleOptions.position = item.dposition;
      }
      updated[id] = true;
      let scale = null;
      if (id in scales2 && scales2[id].type === scaleType) {
        scale = scales2[id];
      } else {
        const scaleClass = registry.getScale(scaleType);
        scale = new scaleClass({
          id,
          type: scaleType,
          ctx: this.ctx,
          chart: this
        });
        scales2[scale.id] = scale;
      }
      scale.init(scaleOptions, options);
    });
    each(updated, (hasUpdated, id) => {
      if (!hasUpdated) {
        delete scales2[id];
      }
    });
    each(scales2, (scale) => {
      layouts.configure(this, scale, scale.options);
      layouts.addBox(this, scale);
    });
  }
  _updateMetasets() {
    const metasets = this._metasets;
    const numData = this.data.datasets.length;
    const numMeta = metasets.length;
    metasets.sort((a3, b2) => a3.index - b2.index);
    if (numMeta > numData) {
      for (let i4 = numData; i4 < numMeta; ++i4) {
        this._destroyDatasetMeta(i4);
      }
      metasets.splice(numData, numMeta - numData);
    }
    this._sortedMetasets = metasets.slice(0).sort(compare2Level("order", "index"));
  }
  _removeUnreferencedMetasets() {
    const { _metasets: metasets, data: { datasets } } = this;
    if (metasets.length > datasets.length) {
      delete this._stacks;
    }
    metasets.forEach((meta, index2) => {
      if (datasets.filter((x3) => x3 === meta._dataset).length === 0) {
        this._destroyDatasetMeta(index2);
      }
    });
  }
  buildOrUpdateControllers() {
    const newControllers = [];
    const datasets = this.data.datasets;
    let i4, ilen;
    this._removeUnreferencedMetasets();
    for (i4 = 0, ilen = datasets.length; i4 < ilen; i4++) {
      const dataset = datasets[i4];
      let meta = this.getDatasetMeta(i4);
      const type = dataset.type || this.config.type;
      if (meta.type && meta.type !== type) {
        this._destroyDatasetMeta(i4);
        meta = this.getDatasetMeta(i4);
      }
      meta.type = type;
      meta.indexAxis = dataset.indexAxis || getIndexAxis(type, this.options);
      meta.order = dataset.order || 0;
      meta.index = i4;
      meta.label = "" + dataset.label;
      meta.visible = this.isDatasetVisible(i4);
      if (meta.controller) {
        meta.controller.updateIndex(i4);
        meta.controller.linkScales();
      } else {
        const ControllerClass = registry.getController(type);
        const { datasetElementType, dataElementType } = defaults.datasets[type];
        Object.assign(ControllerClass, {
          dataElementType: registry.getElement(dataElementType),
          datasetElementType: datasetElementType && registry.getElement(datasetElementType)
        });
        meta.controller = new ControllerClass(this, i4);
        newControllers.push(meta.controller);
      }
    }
    this._updateMetasets();
    return newControllers;
  }
  _resetElements() {
    each(this.data.datasets, (dataset, datasetIndex) => {
      this.getDatasetMeta(datasetIndex).controller.reset();
    }, this);
  }
  reset() {
    this._resetElements();
    this.notifyPlugins("reset");
  }
  update(mode) {
    const config = this.config;
    config.update();
    const options = this._options = config.createResolver(config.chartOptionScopes(), this.getContext());
    const animsDisabled = this._animationsDisabled = !options.animation;
    this._updateScales();
    this._checkEventBindings();
    this._updateHiddenIndices();
    this._plugins.invalidate();
    if (this.notifyPlugins("beforeUpdate", {
      mode,
      cancelable: true
    }) === false) {
      return;
    }
    const newControllers = this.buildOrUpdateControllers();
    this.notifyPlugins("beforeElementsUpdate");
    let minPadding = 0;
    for (let i4 = 0, ilen = this.data.datasets.length; i4 < ilen; i4++) {
      const { controller } = this.getDatasetMeta(i4);
      const reset = !animsDisabled && newControllers.indexOf(controller) === -1;
      controller.buildOrUpdateElements(reset);
      minPadding = Math.max(+controller.getMaxOverflow(), minPadding);
    }
    minPadding = this._minPadding = options.layout.autoPadding ? minPadding : 0;
    this._updateLayout(minPadding);
    if (!animsDisabled) {
      each(newControllers, (controller) => {
        controller.reset();
      });
    }
    this._updateDatasets(mode);
    this.notifyPlugins("afterUpdate", {
      mode
    });
    this._layers.sort(compare2Level("z", "_idx"));
    const { _active, _lastEvent } = this;
    if (_lastEvent) {
      this._eventHandler(_lastEvent, true);
    } else if (_active.length) {
      this._updateHoverStyles(_active, _active, true);
    }
    this.render();
  }
  _updateScales() {
    each(this.scales, (scale) => {
      layouts.removeBox(this, scale);
    });
    this.ensureScalesHaveIDs();
    this.buildOrUpdateScales();
  }
  _checkEventBindings() {
    const options = this.options;
    const existingEvents = new Set(Object.keys(this._listeners));
    const newEvents = new Set(options.events);
    if (!setsEqual(existingEvents, newEvents) || !!this._responsiveListeners !== options.responsive) {
      this.unbindEvents();
      this.bindEvents();
    }
  }
  _updateHiddenIndices() {
    const { _hiddenIndices } = this;
    const changes = this._getUniformDataChanges() || [];
    for (const { method, start, count } of changes) {
      const move = method === "_removeElements" ? -count : count;
      moveNumericKeys(_hiddenIndices, start, move);
    }
  }
  _getUniformDataChanges() {
    const _dataChanges = this._dataChanges;
    if (!_dataChanges || !_dataChanges.length) {
      return;
    }
    this._dataChanges = [];
    const datasetCount = this.data.datasets.length;
    const makeSet = (idx) => new Set(_dataChanges.filter((c3) => c3[0] === idx).map((c3, i4) => i4 + "," + c3.splice(1).join(",")));
    const changeSet = makeSet(0);
    for (let i4 = 1; i4 < datasetCount; i4++) {
      if (!setsEqual(changeSet, makeSet(i4))) {
        return;
      }
    }
    return Array.from(changeSet).map((c3) => c3.split(",")).map((a3) => ({
      method: a3[1],
      start: +a3[2],
      count: +a3[3]
    }));
  }
  _updateLayout(minPadding) {
    if (this.notifyPlugins("beforeLayout", {
      cancelable: true
    }) === false) {
      return;
    }
    layouts.update(this, this.width, this.height, minPadding);
    const area = this.chartArea;
    const noArea = area.width <= 0 || area.height <= 0;
    this._layers = [];
    each(this.boxes, (box) => {
      if (noArea && box.position === "chartArea") {
        return;
      }
      if (box.configure) {
        box.configure();
      }
      this._layers.push(...box._layers());
    }, this);
    this._layers.forEach((item, index2) => {
      item._idx = index2;
    });
    this.notifyPlugins("afterLayout");
  }
  _updateDatasets(mode) {
    if (this.notifyPlugins("beforeDatasetsUpdate", {
      mode,
      cancelable: true
    }) === false) {
      return;
    }
    for (let i4 = 0, ilen = this.data.datasets.length; i4 < ilen; ++i4) {
      this.getDatasetMeta(i4).controller.configure();
    }
    for (let i4 = 0, ilen = this.data.datasets.length; i4 < ilen; ++i4) {
      this._updateDataset(i4, isFunction(mode) ? mode({
        datasetIndex: i4
      }) : mode);
    }
    this.notifyPlugins("afterDatasetsUpdate", {
      mode
    });
  }
  _updateDataset(index2, mode) {
    const meta = this.getDatasetMeta(index2);
    const args = {
      meta,
      index: index2,
      mode,
      cancelable: true
    };
    if (this.notifyPlugins("beforeDatasetUpdate", args) === false) {
      return;
    }
    meta.controller._update(mode);
    args.cancelable = false;
    this.notifyPlugins("afterDatasetUpdate", args);
  }
  render() {
    if (this.notifyPlugins("beforeRender", {
      cancelable: true
    }) === false) {
      return;
    }
    if (animator.has(this)) {
      if (this.attached && !animator.running(this)) {
        animator.start(this);
      }
    } else {
      this.draw();
      onAnimationsComplete({
        chart: this
      });
    }
  }
  draw() {
    let i4;
    if (this._resizeBeforeDraw) {
      const { width, height } = this._resizeBeforeDraw;
      this._resizeBeforeDraw = null;
      this._resize(width, height);
    }
    this.clear();
    if (this.width <= 0 || this.height <= 0) {
      return;
    }
    if (this.notifyPlugins("beforeDraw", {
      cancelable: true
    }) === false) {
      return;
    }
    const layers = this._layers;
    for (i4 = 0; i4 < layers.length && layers[i4].z <= 0; ++i4) {
      layers[i4].draw(this.chartArea);
    }
    this._drawDatasets();
    for (; i4 < layers.length; ++i4) {
      layers[i4].draw(this.chartArea);
    }
    this.notifyPlugins("afterDraw");
  }
  _getSortedDatasetMetas(filterVisible) {
    const metasets = this._sortedMetasets;
    const result = [];
    let i4, ilen;
    for (i4 = 0, ilen = metasets.length; i4 < ilen; ++i4) {
      const meta = metasets[i4];
      if (!filterVisible || meta.visible) {
        result.push(meta);
      }
    }
    return result;
  }
  getSortedVisibleDatasetMetas() {
    return this._getSortedDatasetMetas(true);
  }
  _drawDatasets() {
    if (this.notifyPlugins("beforeDatasetsDraw", {
      cancelable: true
    }) === false) {
      return;
    }
    const metasets = this.getSortedVisibleDatasetMetas();
    for (let i4 = metasets.length - 1; i4 >= 0; --i4) {
      this._drawDataset(metasets[i4]);
    }
    this.notifyPlugins("afterDatasetsDraw");
  }
  _drawDataset(meta) {
    const ctx = this.ctx;
    const args = {
      meta,
      index: meta.index,
      cancelable: true
    };
    const clip = getDatasetClipArea(this, meta);
    if (this.notifyPlugins("beforeDatasetDraw", args) === false) {
      return;
    }
    if (clip) {
      clipArea(ctx, clip);
    }
    meta.controller.draw();
    if (clip) {
      unclipArea(ctx);
    }
    args.cancelable = false;
    this.notifyPlugins("afterDatasetDraw", args);
  }
  isPointInArea(point) {
    return _isPointInArea(point, this.chartArea, this._minPadding);
  }
  getElementsAtEventForMode(e3, mode, options, useFinalPosition) {
    const method = Interaction.modes[mode];
    if (typeof method === "function") {
      return method(this, e3, options, useFinalPosition);
    }
    return [];
  }
  getDatasetMeta(datasetIndex) {
    const dataset = this.data.datasets[datasetIndex];
    const metasets = this._metasets;
    let meta = metasets.filter((x3) => x3 && x3._dataset === dataset).pop();
    if (!meta) {
      meta = {
        type: null,
        data: [],
        dataset: null,
        controller: null,
        hidden: null,
        xAxisID: null,
        yAxisID: null,
        order: dataset && dataset.order || 0,
        index: datasetIndex,
        _dataset: dataset,
        _parsed: [],
        _sorted: false
      };
      metasets.push(meta);
    }
    return meta;
  }
  getContext() {
    return this.$context || (this.$context = createContext(null, {
      chart: this,
      type: "chart"
    }));
  }
  getVisibleDatasetCount() {
    return this.getSortedVisibleDatasetMetas().length;
  }
  isDatasetVisible(datasetIndex) {
    const dataset = this.data.datasets[datasetIndex];
    if (!dataset) {
      return false;
    }
    const meta = this.getDatasetMeta(datasetIndex);
    return typeof meta.hidden === "boolean" ? !meta.hidden : !dataset.hidden;
  }
  setDatasetVisibility(datasetIndex, visible) {
    const meta = this.getDatasetMeta(datasetIndex);
    meta.hidden = !visible;
  }
  toggleDataVisibility(index2) {
    this._hiddenIndices[index2] = !this._hiddenIndices[index2];
  }
  getDataVisibility(index2) {
    return !this._hiddenIndices[index2];
  }
  _updateVisibility(datasetIndex, dataIndex, visible) {
    const mode = visible ? "show" : "hide";
    const meta = this.getDatasetMeta(datasetIndex);
    const anims = meta.controller._resolveAnimations(void 0, mode);
    if (defined(dataIndex)) {
      meta.data[dataIndex].hidden = !visible;
      this.update();
    } else {
      this.setDatasetVisibility(datasetIndex, visible);
      anims.update(meta, {
        visible
      });
      this.update((ctx) => ctx.datasetIndex === datasetIndex ? mode : void 0);
    }
  }
  hide(datasetIndex, dataIndex) {
    this._updateVisibility(datasetIndex, dataIndex, false);
  }
  show(datasetIndex, dataIndex) {
    this._updateVisibility(datasetIndex, dataIndex, true);
  }
  _destroyDatasetMeta(datasetIndex) {
    const meta = this._metasets[datasetIndex];
    if (meta && meta.controller) {
      meta.controller._destroy();
    }
    delete this._metasets[datasetIndex];
  }
  _stop() {
    let i4, ilen;
    this.stop();
    animator.remove(this);
    for (i4 = 0, ilen = this.data.datasets.length; i4 < ilen; ++i4) {
      this._destroyDatasetMeta(i4);
    }
  }
  destroy() {
    this.notifyPlugins("beforeDestroy");
    const { canvas, ctx } = this;
    this._stop();
    this.config.clearCache();
    if (canvas) {
      this.unbindEvents();
      clearCanvas(canvas, ctx);
      this.platform.releaseContext(ctx);
      this.canvas = null;
      this.ctx = null;
    }
    delete instances[this.id];
    this.notifyPlugins("afterDestroy");
  }
  toBase64Image(...args) {
    return this.canvas.toDataURL(...args);
  }
  bindEvents() {
    this.bindUserEvents();
    if (this.options.responsive) {
      this.bindResponsiveEvents();
    } else {
      this.attached = true;
    }
  }
  bindUserEvents() {
    const listeners = this._listeners;
    const platform = this.platform;
    const _add = (type, listener2) => {
      platform.addEventListener(this, type, listener2);
      listeners[type] = listener2;
    };
    const listener = (e3, x3, y3) => {
      e3.offsetX = x3;
      e3.offsetY = y3;
      this._eventHandler(e3);
    };
    each(this.options.events, (type) => _add(type, listener));
  }
  bindResponsiveEvents() {
    if (!this._responsiveListeners) {
      this._responsiveListeners = {};
    }
    const listeners = this._responsiveListeners;
    const platform = this.platform;
    const _add = (type, listener2) => {
      platform.addEventListener(this, type, listener2);
      listeners[type] = listener2;
    };
    const _remove = (type, listener2) => {
      if (listeners[type]) {
        platform.removeEventListener(this, type, listener2);
        delete listeners[type];
      }
    };
    const listener = (width, height) => {
      if (this.canvas) {
        this.resize(width, height);
      }
    };
    let detached;
    const attached = () => {
      _remove("attach", attached);
      this.attached = true;
      this.resize();
      _add("resize", listener);
      _add("detach", detached);
    };
    detached = () => {
      this.attached = false;
      _remove("resize", listener);
      this._stop();
      this._resize(0, 0);
      _add("attach", attached);
    };
    if (platform.isAttached(this.canvas)) {
      attached();
    } else {
      detached();
    }
  }
  unbindEvents() {
    each(this._listeners, (listener, type) => {
      this.platform.removeEventListener(this, type, listener);
    });
    this._listeners = {};
    each(this._responsiveListeners, (listener, type) => {
      this.platform.removeEventListener(this, type, listener);
    });
    this._responsiveListeners = void 0;
  }
  updateHoverStyle(items, mode, enabled) {
    const prefix = enabled ? "set" : "remove";
    let meta, item, i4, ilen;
    if (mode === "dataset") {
      meta = this.getDatasetMeta(items[0].datasetIndex);
      meta.controller["_" + prefix + "DatasetHoverStyle"]();
    }
    for (i4 = 0, ilen = items.length; i4 < ilen; ++i4) {
      item = items[i4];
      const controller = item && this.getDatasetMeta(item.datasetIndex).controller;
      if (controller) {
        controller[prefix + "HoverStyle"](item.element, item.datasetIndex, item.index);
      }
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(activeElements) {
    const lastActive = this._active || [];
    const active = activeElements.map(({ datasetIndex, index: index2 }) => {
      const meta = this.getDatasetMeta(datasetIndex);
      if (!meta) {
        throw new Error("No dataset found at index " + datasetIndex);
      }
      return {
        datasetIndex,
        element: meta.data[index2],
        index: index2
      };
    });
    const changed = !_elementsEqual(active, lastActive);
    if (changed) {
      this._active = active;
      this._lastEvent = null;
      this._updateHoverStyles(active, lastActive);
    }
  }
  notifyPlugins(hook, args, filter) {
    return this._plugins.notify(this, hook, args, filter);
  }
  isPluginEnabled(pluginId) {
    return this._plugins._cache.filter((p3) => p3.plugin.id === pluginId).length === 1;
  }
  _updateHoverStyles(active, lastActive, replay) {
    const hoverOptions = this.options.hover;
    const diff = (a3, b2) => a3.filter((x3) => !b2.some((y3) => x3.datasetIndex === y3.datasetIndex && x3.index === y3.index));
    const deactivated = diff(lastActive, active);
    const activated = replay ? active : diff(active, lastActive);
    if (deactivated.length) {
      this.updateHoverStyle(deactivated, hoverOptions.mode, false);
    }
    if (activated.length && hoverOptions.mode) {
      this.updateHoverStyle(activated, hoverOptions.mode, true);
    }
  }
  _eventHandler(e3, replay) {
    const args = {
      event: e3,
      replay,
      cancelable: true,
      inChartArea: this.isPointInArea(e3)
    };
    const eventFilter = (plugin) => (plugin.options.events || this.options.events).includes(e3.native.type);
    if (this.notifyPlugins("beforeEvent", args, eventFilter) === false) {
      return;
    }
    const changed = this._handleEvent(e3, replay, args.inChartArea);
    args.cancelable = false;
    this.notifyPlugins("afterEvent", args, eventFilter);
    if (changed || args.changed) {
      this.render();
    }
    return this;
  }
  _handleEvent(e3, replay, inChartArea) {
    const { _active: lastActive = [], options } = this;
    const useFinalPosition = replay;
    const active = this._getActiveElements(e3, lastActive, inChartArea, useFinalPosition);
    const isClick = _isClickEvent(e3);
    const lastEvent = determineLastEvent(e3, this._lastEvent, inChartArea, isClick);
    if (inChartArea) {
      this._lastEvent = null;
      callback(options.onHover, [
        e3,
        active,
        this
      ], this);
      if (isClick) {
        callback(options.onClick, [
          e3,
          active,
          this
        ], this);
      }
    }
    const changed = !_elementsEqual(active, lastActive);
    if (changed || replay) {
      this._active = active;
      this._updateHoverStyles(active, lastActive, replay);
    }
    this._lastEvent = lastEvent;
    return changed;
  }
  _getActiveElements(e3, lastActive, inChartArea, useFinalPosition) {
    if (e3.type === "mouseout") {
      return [];
    }
    if (!inChartArea) {
      return lastActive;
    }
    const hoverOptions = this.options.hover;
    return this.getElementsAtEventForMode(e3, hoverOptions.mode, hoverOptions, useFinalPosition);
  }
};
__publicField(Chart, "defaults", defaults);
__publicField(Chart, "instances", instances);
__publicField(Chart, "overrides", overrides);
__publicField(Chart, "registry", registry);
__publicField(Chart, "version", version);
__publicField(Chart, "getChart", getChart);
function invalidatePlugins() {
  return each(Chart.instances, (chart) => chart._plugins.invalidate());
}
function clipSelf(ctx, element, endAngle) {
  const { startAngle, x: x3, y: y3, outerRadius, innerRadius, options } = element;
  const { borderWidth, borderJoinStyle } = options;
  const outerAngleClip = Math.min(borderWidth / outerRadius, _normalizeAngle(startAngle - endAngle));
  ctx.beginPath();
  ctx.arc(x3, y3, outerRadius - borderWidth / 2, startAngle + outerAngleClip / 2, endAngle - outerAngleClip / 2);
  if (innerRadius > 0) {
    const innerAngleClip = Math.min(borderWidth / innerRadius, _normalizeAngle(startAngle - endAngle));
    ctx.arc(x3, y3, innerRadius + borderWidth / 2, endAngle - innerAngleClip / 2, startAngle + innerAngleClip / 2, true);
  } else {
    const clipWidth = Math.min(borderWidth / 2, outerRadius * _normalizeAngle(startAngle - endAngle));
    if (borderJoinStyle === "round") {
      ctx.arc(x3, y3, clipWidth, endAngle - PI / 2, startAngle + PI / 2, true);
    } else if (borderJoinStyle === "bevel") {
      const r3 = 2 * clipWidth * clipWidth;
      const endX = -r3 * Math.cos(endAngle + PI / 2) + x3;
      const endY = -r3 * Math.sin(endAngle + PI / 2) + y3;
      const startX = r3 * Math.cos(startAngle + PI / 2) + x3;
      const startY = r3 * Math.sin(startAngle + PI / 2) + y3;
      ctx.lineTo(endX, endY);
      ctx.lineTo(startX, startY);
    }
  }
  ctx.closePath();
  ctx.moveTo(0, 0);
  ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.clip("evenodd");
}
function clipArc(ctx, element, endAngle) {
  const { startAngle, pixelMargin, x: x3, y: y3, outerRadius, innerRadius } = element;
  let angleMargin = pixelMargin / outerRadius;
  ctx.beginPath();
  ctx.arc(x3, y3, outerRadius, startAngle - angleMargin, endAngle + angleMargin);
  if (innerRadius > pixelMargin) {
    angleMargin = pixelMargin / innerRadius;
    ctx.arc(x3, y3, innerRadius, endAngle + angleMargin, startAngle - angleMargin, true);
  } else {
    ctx.arc(x3, y3, pixelMargin, endAngle + HALF_PI, startAngle - HALF_PI);
  }
  ctx.closePath();
  ctx.clip();
}
function toRadiusCorners(value) {
  return _readValueToProps(value, [
    "outerStart",
    "outerEnd",
    "innerStart",
    "innerEnd"
  ]);
}
function parseBorderRadius$1(arc, innerRadius, outerRadius, angleDelta) {
  const o3 = toRadiusCorners(arc.options.borderRadius);
  const halfThickness = (outerRadius - innerRadius) / 2;
  const innerLimit = Math.min(halfThickness, angleDelta * innerRadius / 2);
  const computeOuterLimit = (val) => {
    const outerArcLimit = (outerRadius - Math.min(halfThickness, val)) * angleDelta / 2;
    return _limitValue(val, 0, Math.min(halfThickness, outerArcLimit));
  };
  return {
    outerStart: computeOuterLimit(o3.outerStart),
    outerEnd: computeOuterLimit(o3.outerEnd),
    innerStart: _limitValue(o3.innerStart, 0, innerLimit),
    innerEnd: _limitValue(o3.innerEnd, 0, innerLimit)
  };
}
function rThetaToXY(r3, theta, x3, y3) {
  return {
    x: x3 + r3 * Math.cos(theta),
    y: y3 + r3 * Math.sin(theta)
  };
}
function pathArc(ctx, element, offset, spacing, end, circular) {
  const { x: x3, y: y3, startAngle: start, pixelMargin, innerRadius: innerR } = element;
  const outerRadius = Math.max(element.outerRadius + spacing + offset - pixelMargin, 0);
  const innerRadius = innerR > 0 ? innerR + spacing + offset + pixelMargin : 0;
  let spacingOffset = 0;
  const alpha2 = end - start;
  if (spacing) {
    const noSpacingInnerRadius = innerR > 0 ? innerR - spacing : 0;
    const noSpacingOuterRadius = outerRadius > 0 ? outerRadius - spacing : 0;
    const avNogSpacingRadius = (noSpacingInnerRadius + noSpacingOuterRadius) / 2;
    const adjustedAngle = avNogSpacingRadius !== 0 ? alpha2 * avNogSpacingRadius / (avNogSpacingRadius + spacing) : alpha2;
    spacingOffset = (alpha2 - adjustedAngle) / 2;
  }
  const beta = Math.max(1e-3, alpha2 * outerRadius - offset / PI) / outerRadius;
  const angleOffset = (alpha2 - beta) / 2;
  const startAngle = start + angleOffset + spacingOffset;
  const endAngle = end - angleOffset - spacingOffset;
  const { outerStart, outerEnd, innerStart, innerEnd } = parseBorderRadius$1(element, innerRadius, outerRadius, endAngle - startAngle);
  const outerStartAdjustedRadius = outerRadius - outerStart;
  const outerEndAdjustedRadius = outerRadius - outerEnd;
  const outerStartAdjustedAngle = startAngle + outerStart / outerStartAdjustedRadius;
  const outerEndAdjustedAngle = endAngle - outerEnd / outerEndAdjustedRadius;
  const innerStartAdjustedRadius = innerRadius + innerStart;
  const innerEndAdjustedRadius = innerRadius + innerEnd;
  const innerStartAdjustedAngle = startAngle + innerStart / innerStartAdjustedRadius;
  const innerEndAdjustedAngle = endAngle - innerEnd / innerEndAdjustedRadius;
  ctx.beginPath();
  if (circular) {
    const outerMidAdjustedAngle = (outerStartAdjustedAngle + outerEndAdjustedAngle) / 2;
    ctx.arc(x3, y3, outerRadius, outerStartAdjustedAngle, outerMidAdjustedAngle);
    ctx.arc(x3, y3, outerRadius, outerMidAdjustedAngle, outerEndAdjustedAngle);
    if (outerEnd > 0) {
      const pCenter = rThetaToXY(outerEndAdjustedRadius, outerEndAdjustedAngle, x3, y3);
      ctx.arc(pCenter.x, pCenter.y, outerEnd, outerEndAdjustedAngle, endAngle + HALF_PI);
    }
    const p4 = rThetaToXY(innerEndAdjustedRadius, endAngle, x3, y3);
    ctx.lineTo(p4.x, p4.y);
    if (innerEnd > 0) {
      const pCenter = rThetaToXY(innerEndAdjustedRadius, innerEndAdjustedAngle, x3, y3);
      ctx.arc(pCenter.x, pCenter.y, innerEnd, endAngle + HALF_PI, innerEndAdjustedAngle + Math.PI);
    }
    const innerMidAdjustedAngle = (endAngle - innerEnd / innerRadius + (startAngle + innerStart / innerRadius)) / 2;
    ctx.arc(x3, y3, innerRadius, endAngle - innerEnd / innerRadius, innerMidAdjustedAngle, true);
    ctx.arc(x3, y3, innerRadius, innerMidAdjustedAngle, startAngle + innerStart / innerRadius, true);
    if (innerStart > 0) {
      const pCenter = rThetaToXY(innerStartAdjustedRadius, innerStartAdjustedAngle, x3, y3);
      ctx.arc(pCenter.x, pCenter.y, innerStart, innerStartAdjustedAngle + Math.PI, startAngle - HALF_PI);
    }
    const p8 = rThetaToXY(outerStartAdjustedRadius, startAngle, x3, y3);
    ctx.lineTo(p8.x, p8.y);
    if (outerStart > 0) {
      const pCenter = rThetaToXY(outerStartAdjustedRadius, outerStartAdjustedAngle, x3, y3);
      ctx.arc(pCenter.x, pCenter.y, outerStart, startAngle - HALF_PI, outerStartAdjustedAngle);
    }
  } else {
    ctx.moveTo(x3, y3);
    const outerStartX = Math.cos(outerStartAdjustedAngle) * outerRadius + x3;
    const outerStartY = Math.sin(outerStartAdjustedAngle) * outerRadius + y3;
    ctx.lineTo(outerStartX, outerStartY);
    const outerEndX = Math.cos(outerEndAdjustedAngle) * outerRadius + x3;
    const outerEndY = Math.sin(outerEndAdjustedAngle) * outerRadius + y3;
    ctx.lineTo(outerEndX, outerEndY);
  }
  ctx.closePath();
}
function drawArc(ctx, element, offset, spacing, circular) {
  const { fullCircles, startAngle, circumference } = element;
  let endAngle = element.endAngle;
  if (fullCircles) {
    pathArc(ctx, element, offset, spacing, endAngle, circular);
    for (let i4 = 0; i4 < fullCircles; ++i4) {
      ctx.fill();
    }
    if (!isNaN(circumference)) {
      endAngle = startAngle + (circumference % TAU || TAU);
    }
  }
  pathArc(ctx, element, offset, spacing, endAngle, circular);
  ctx.fill();
  return endAngle;
}
function drawBorder(ctx, element, offset, spacing, circular) {
  const { fullCircles, startAngle, circumference, options } = element;
  const { borderWidth, borderJoinStyle, borderDash, borderDashOffset, borderRadius } = options;
  const inner = options.borderAlign === "inner";
  if (!borderWidth) {
    return;
  }
  ctx.setLineDash(borderDash || []);
  ctx.lineDashOffset = borderDashOffset;
  if (inner) {
    ctx.lineWidth = borderWidth * 2;
    ctx.lineJoin = borderJoinStyle || "round";
  } else {
    ctx.lineWidth = borderWidth;
    ctx.lineJoin = borderJoinStyle || "bevel";
  }
  let endAngle = element.endAngle;
  if (fullCircles) {
    pathArc(ctx, element, offset, spacing, endAngle, circular);
    for (let i4 = 0; i4 < fullCircles; ++i4) {
      ctx.stroke();
    }
    if (!isNaN(circumference)) {
      endAngle = startAngle + (circumference % TAU || TAU);
    }
  }
  if (inner) {
    clipArc(ctx, element, endAngle);
  }
  if (options.selfJoin && endAngle - startAngle >= PI && borderRadius === 0 && borderJoinStyle !== "miter") {
    clipSelf(ctx, element, endAngle);
  }
  if (!fullCircles) {
    pathArc(ctx, element, offset, spacing, endAngle, circular);
    ctx.stroke();
  }
}
var ArcElement = class extends Element {
  constructor(cfg) {
    super();
    __publicField(this, "circumference");
    __publicField(this, "endAngle");
    __publicField(this, "fullCircles");
    __publicField(this, "innerRadius");
    __publicField(this, "outerRadius");
    __publicField(this, "pixelMargin");
    __publicField(this, "startAngle");
    this.options = void 0;
    this.circumference = void 0;
    this.startAngle = void 0;
    this.endAngle = void 0;
    this.innerRadius = void 0;
    this.outerRadius = void 0;
    this.pixelMargin = 0;
    this.fullCircles = 0;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  inRange(chartX, chartY, useFinalPosition) {
    const point = this.getProps([
      "x",
      "y"
    ], useFinalPosition);
    const { angle, distance } = getAngleFromPoint(point, {
      x: chartX,
      y: chartY
    });
    const { startAngle, endAngle, innerRadius, outerRadius, circumference } = this.getProps([
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius",
      "circumference"
    ], useFinalPosition);
    const rAdjust = (this.options.spacing + this.options.borderWidth) / 2;
    const _circumference = valueOrDefault(circumference, endAngle - startAngle);
    const nonZeroBetween = _angleBetween(angle, startAngle, endAngle) && startAngle !== endAngle;
    const betweenAngles = _circumference >= TAU || nonZeroBetween;
    const withinRadius = _isBetween(distance, innerRadius + rAdjust, outerRadius + rAdjust);
    return betweenAngles && withinRadius;
  }
  getCenterPoint(useFinalPosition) {
    const { x: x3, y: y3, startAngle, endAngle, innerRadius, outerRadius } = this.getProps([
      "x",
      "y",
      "startAngle",
      "endAngle",
      "innerRadius",
      "outerRadius"
    ], useFinalPosition);
    const { offset, spacing } = this.options;
    const halfAngle = (startAngle + endAngle) / 2;
    const halfRadius = (innerRadius + outerRadius + spacing + offset) / 2;
    return {
      x: x3 + Math.cos(halfAngle) * halfRadius,
      y: y3 + Math.sin(halfAngle) * halfRadius
    };
  }
  tooltipPosition(useFinalPosition) {
    return this.getCenterPoint(useFinalPosition);
  }
  draw(ctx) {
    const { options, circumference } = this;
    const offset = (options.offset || 0) / 4;
    const spacing = (options.spacing || 0) / 2;
    const circular = options.circular;
    this.pixelMargin = options.borderAlign === "inner" ? 0.33 : 0;
    this.fullCircles = circumference > TAU ? Math.floor(circumference / TAU) : 0;
    if (circumference === 0 || this.innerRadius < 0 || this.outerRadius < 0) {
      return;
    }
    ctx.save();
    const halfAngle = (this.startAngle + this.endAngle) / 2;
    ctx.translate(Math.cos(halfAngle) * offset, Math.sin(halfAngle) * offset);
    const fix = 1 - Math.sin(Math.min(PI, circumference || 0));
    const radiusOffset = offset * fix;
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    drawArc(ctx, this, radiusOffset, spacing, circular);
    drawBorder(ctx, this, radiusOffset, spacing, circular);
    ctx.restore();
  }
};
__publicField(ArcElement, "id", "arc");
__publicField(ArcElement, "defaults", {
  borderAlign: "center",
  borderColor: "#fff",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: void 0,
  borderRadius: 0,
  borderWidth: 2,
  offset: 0,
  spacing: 0,
  angle: void 0,
  circular: true,
  selfJoin: false
});
__publicField(ArcElement, "defaultRoutes", {
  backgroundColor: "backgroundColor"
});
__publicField(ArcElement, "descriptors", {
  _scriptable: true,
  _indexable: (name) => name !== "borderDash"
});
function setStyle(ctx, options, style = options) {
  ctx.lineCap = valueOrDefault(style.borderCapStyle, options.borderCapStyle);
  ctx.setLineDash(valueOrDefault(style.borderDash, options.borderDash));
  ctx.lineDashOffset = valueOrDefault(style.borderDashOffset, options.borderDashOffset);
  ctx.lineJoin = valueOrDefault(style.borderJoinStyle, options.borderJoinStyle);
  ctx.lineWidth = valueOrDefault(style.borderWidth, options.borderWidth);
  ctx.strokeStyle = valueOrDefault(style.borderColor, options.borderColor);
}
function lineTo(ctx, previous, target) {
  ctx.lineTo(target.x, target.y);
}
function getLineMethod(options) {
  if (options.stepped) {
    return _steppedLineTo;
  }
  if (options.tension || options.cubicInterpolationMode === "monotone") {
    return _bezierCurveTo;
  }
  return lineTo;
}
function pathVars(points, segment, params = {}) {
  const count = points.length;
  const { start: paramsStart = 0, end: paramsEnd = count - 1 } = params;
  const { start: segmentStart, end: segmentEnd } = segment;
  const start = Math.max(paramsStart, segmentStart);
  const end = Math.min(paramsEnd, segmentEnd);
  const outside = paramsStart < segmentStart && paramsEnd < segmentStart || paramsStart > segmentEnd && paramsEnd > segmentEnd;
  return {
    count,
    start,
    loop: segment.loop,
    ilen: end < start && !outside ? count + end - start : end - start
  };
}
function pathSegment(ctx, line, segment, params) {
  const { points, options } = line;
  const { count, start, loop, ilen } = pathVars(points, segment, params);
  const lineMethod = getLineMethod(options);
  let { move = true, reverse } = params || {};
  let i4, point, prev;
  for (i4 = 0; i4 <= ilen; ++i4) {
    point = points[(start + (reverse ? ilen - i4 : i4)) % count];
    if (point.skip) {
      continue;
    } else if (move) {
      ctx.moveTo(point.x, point.y);
      move = false;
    } else {
      lineMethod(ctx, prev, point, reverse, options.stepped);
    }
    prev = point;
  }
  if (loop) {
    point = points[(start + (reverse ? ilen : 0)) % count];
    lineMethod(ctx, prev, point, reverse, options.stepped);
  }
  return !!loop;
}
function fastPathSegment(ctx, line, segment, params) {
  const points = line.points;
  const { count, start, ilen } = pathVars(points, segment, params);
  const { move = true, reverse } = params || {};
  let avgX = 0;
  let countX = 0;
  let i4, point, prevX, minY, maxY, lastY;
  const pointIndex = (index2) => (start + (reverse ? ilen - index2 : index2)) % count;
  const drawX = () => {
    if (minY !== maxY) {
      ctx.lineTo(avgX, maxY);
      ctx.lineTo(avgX, minY);
      ctx.lineTo(avgX, lastY);
    }
  };
  if (move) {
    point = points[pointIndex(0)];
    ctx.moveTo(point.x, point.y);
  }
  for (i4 = 0; i4 <= ilen; ++i4) {
    point = points[pointIndex(i4)];
    if (point.skip) {
      continue;
    }
    const x3 = point.x;
    const y3 = point.y;
    const truncX = x3 | 0;
    if (truncX === prevX) {
      if (y3 < minY) {
        minY = y3;
      } else if (y3 > maxY) {
        maxY = y3;
      }
      avgX = (countX * avgX + x3) / ++countX;
    } else {
      drawX();
      ctx.lineTo(x3, y3);
      prevX = truncX;
      countX = 0;
      minY = maxY = y3;
    }
    lastY = y3;
  }
  drawX();
}
function _getSegmentMethod(line) {
  const opts = line.options;
  const borderDash = opts.borderDash && opts.borderDash.length;
  const useFastPath = !line._decimated && !line._loop && !opts.tension && opts.cubicInterpolationMode !== "monotone" && !opts.stepped && !borderDash;
  return useFastPath ? fastPathSegment : pathSegment;
}
function _getInterpolationMethod(options) {
  if (options.stepped) {
    return _steppedInterpolation;
  }
  if (options.tension || options.cubicInterpolationMode === "monotone") {
    return _bezierInterpolation;
  }
  return _pointInLine;
}
function strokePathWithCache(ctx, line, start, count) {
  let path = line._path;
  if (!path) {
    path = line._path = new Path2D();
    if (line.path(path, start, count)) {
      path.closePath();
    }
  }
  setStyle(ctx, line.options);
  ctx.stroke(path);
}
function strokePathDirect(ctx, line, start, count) {
  const { segments, options } = line;
  const segmentMethod = _getSegmentMethod(line);
  for (const segment of segments) {
    setStyle(ctx, options, segment.style);
    ctx.beginPath();
    if (segmentMethod(ctx, line, segment, {
      start,
      end: start + count - 1
    })) {
      ctx.closePath();
    }
    ctx.stroke();
  }
}
var usePath2D = typeof Path2D === "function";
function draw(ctx, line, start, count) {
  if (usePath2D && !line.options.segment) {
    strokePathWithCache(ctx, line, start, count);
  } else {
    strokePathDirect(ctx, line, start, count);
  }
}
var LineElement = class extends Element {
  constructor(cfg) {
    super();
    this.animated = true;
    this.options = void 0;
    this._chart = void 0;
    this._loop = void 0;
    this._fullLoop = void 0;
    this._path = void 0;
    this._points = void 0;
    this._segments = void 0;
    this._decimated = false;
    this._pointsUpdated = false;
    this._datasetIndex = void 0;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  updateControlPoints(chartArea, indexAxis) {
    const options = this.options;
    if ((options.tension || options.cubicInterpolationMode === "monotone") && !options.stepped && !this._pointsUpdated) {
      const loop = options.spanGaps ? this._loop : this._fullLoop;
      _updateBezierControlPoints(this._points, options, chartArea, loop, indexAxis);
      this._pointsUpdated = true;
    }
  }
  set points(points) {
    this._points = points;
    delete this._segments;
    delete this._path;
    this._pointsUpdated = false;
  }
  get points() {
    return this._points;
  }
  get segments() {
    return this._segments || (this._segments = _computeSegments(this, this.options.segment));
  }
  first() {
    const segments = this.segments;
    const points = this.points;
    return segments.length && points[segments[0].start];
  }
  last() {
    const segments = this.segments;
    const points = this.points;
    const count = segments.length;
    return count && points[segments[count - 1].end];
  }
  interpolate(point, property) {
    const options = this.options;
    const value = point[property];
    const points = this.points;
    const segments = _boundSegments(this, {
      property,
      start: value,
      end: value
    });
    if (!segments.length) {
      return;
    }
    const result = [];
    const _interpolate = _getInterpolationMethod(options);
    let i4, ilen;
    for (i4 = 0, ilen = segments.length; i4 < ilen; ++i4) {
      const { start, end } = segments[i4];
      const p1 = points[start];
      const p22 = points[end];
      if (p1 === p22) {
        result.push(p1);
        continue;
      }
      const t3 = Math.abs((value - p1[property]) / (p22[property] - p1[property]));
      const interpolated = _interpolate(p1, p22, t3, options.stepped);
      interpolated[property] = point[property];
      result.push(interpolated);
    }
    return result.length === 1 ? result[0] : result;
  }
  pathSegment(ctx, segment, params) {
    const segmentMethod = _getSegmentMethod(this);
    return segmentMethod(ctx, this, segment, params);
  }
  path(ctx, start, count) {
    const segments = this.segments;
    const segmentMethod = _getSegmentMethod(this);
    let loop = this._loop;
    start = start || 0;
    count = count || this.points.length - start;
    for (const segment of segments) {
      loop &= segmentMethod(ctx, this, segment, {
        start,
        end: start + count - 1
      });
    }
    return !!loop;
  }
  draw(ctx, chartArea, start, count) {
    const options = this.options || {};
    const points = this.points || [];
    if (points.length && options.borderWidth) {
      ctx.save();
      draw(ctx, this, start, count);
      ctx.restore();
    }
    if (this.animated) {
      this._pointsUpdated = false;
      this._path = void 0;
    }
  }
};
__publicField(LineElement, "id", "line");
__publicField(LineElement, "defaults", {
  borderCapStyle: "butt",
  borderDash: [],
  borderDashOffset: 0,
  borderJoinStyle: "miter",
  borderWidth: 3,
  capBezierPoints: true,
  cubicInterpolationMode: "default",
  fill: false,
  spanGaps: false,
  stepped: false,
  tension: 0
});
__publicField(LineElement, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
__publicField(LineElement, "descriptors", {
  _scriptable: true,
  _indexable: (name) => name !== "borderDash" && name !== "fill"
});
function inRange$1(el, pos, axis, useFinalPosition) {
  const options = el.options;
  const { [axis]: value } = el.getProps([
    axis
  ], useFinalPosition);
  return Math.abs(pos - value) < options.radius + options.hitRadius;
}
var PointElement = class extends Element {
  constructor(cfg) {
    super();
    __publicField(this, "parsed");
    __publicField(this, "skip");
    __publicField(this, "stop");
    this.options = void 0;
    this.parsed = void 0;
    this.skip = void 0;
    this.stop = void 0;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  inRange(mouseX, mouseY, useFinalPosition) {
    const options = this.options;
    const { x: x3, y: y3 } = this.getProps([
      "x",
      "y"
    ], useFinalPosition);
    return Math.pow(mouseX - x3, 2) + Math.pow(mouseY - y3, 2) < Math.pow(options.hitRadius + options.radius, 2);
  }
  inXRange(mouseX, useFinalPosition) {
    return inRange$1(this, mouseX, "x", useFinalPosition);
  }
  inYRange(mouseY, useFinalPosition) {
    return inRange$1(this, mouseY, "y", useFinalPosition);
  }
  getCenterPoint(useFinalPosition) {
    const { x: x3, y: y3 } = this.getProps([
      "x",
      "y"
    ], useFinalPosition);
    return {
      x: x3,
      y: y3
    };
  }
  size(options) {
    options = options || this.options || {};
    let radius = options.radius || 0;
    radius = Math.max(radius, radius && options.hoverRadius || 0);
    const borderWidth = radius && options.borderWidth || 0;
    return (radius + borderWidth) * 2;
  }
  draw(ctx, area) {
    const options = this.options;
    if (this.skip || options.radius < 0.1 || !_isPointInArea(this, area, this.size(options) / 2)) {
      return;
    }
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.fillStyle = options.backgroundColor;
    drawPoint(ctx, options, this.x, this.y);
  }
  getRange() {
    const options = this.options || {};
    return options.radius + options.hitRadius;
  }
};
__publicField(PointElement, "id", "point");
/**
* @type {any}
*/
__publicField(PointElement, "defaults", {
  borderWidth: 1,
  hitRadius: 1,
  hoverBorderWidth: 1,
  hoverRadius: 4,
  pointStyle: "circle",
  radius: 3,
  rotation: 0
});
/**
* @type {any}
*/
__publicField(PointElement, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
function getBarBounds(bar, useFinalPosition) {
  const { x: x3, y: y3, base, width, height } = bar.getProps([
    "x",
    "y",
    "base",
    "width",
    "height"
  ], useFinalPosition);
  let left, right, top, bottom, half;
  if (bar.horizontal) {
    half = height / 2;
    left = Math.min(x3, base);
    right = Math.max(x3, base);
    top = y3 - half;
    bottom = y3 + half;
  } else {
    half = width / 2;
    left = x3 - half;
    right = x3 + half;
    top = Math.min(y3, base);
    bottom = Math.max(y3, base);
  }
  return {
    left,
    top,
    right,
    bottom
  };
}
function skipOrLimit(skip2, value, min, max) {
  return skip2 ? 0 : _limitValue(value, min, max);
}
function parseBorderWidth(bar, maxW, maxH) {
  const value = bar.options.borderWidth;
  const skip2 = bar.borderSkipped;
  const o3 = toTRBL(value);
  return {
    t: skipOrLimit(skip2.top, o3.top, 0, maxH),
    r: skipOrLimit(skip2.right, o3.right, 0, maxW),
    b: skipOrLimit(skip2.bottom, o3.bottom, 0, maxH),
    l: skipOrLimit(skip2.left, o3.left, 0, maxW)
  };
}
function parseBorderRadius(bar, maxW, maxH) {
  const { enableBorderRadius } = bar.getProps([
    "enableBorderRadius"
  ]);
  const value = bar.options.borderRadius;
  const o3 = toTRBLCorners(value);
  const maxR = Math.min(maxW, maxH);
  const skip2 = bar.borderSkipped;
  const enableBorder = enableBorderRadius || isObject(value);
  return {
    topLeft: skipOrLimit(!enableBorder || skip2.top || skip2.left, o3.topLeft, 0, maxR),
    topRight: skipOrLimit(!enableBorder || skip2.top || skip2.right, o3.topRight, 0, maxR),
    bottomLeft: skipOrLimit(!enableBorder || skip2.bottom || skip2.left, o3.bottomLeft, 0, maxR),
    bottomRight: skipOrLimit(!enableBorder || skip2.bottom || skip2.right, o3.bottomRight, 0, maxR)
  };
}
function boundingRects(bar) {
  const bounds = getBarBounds(bar);
  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;
  const border = parseBorderWidth(bar, width / 2, height / 2);
  const radius = parseBorderRadius(bar, width / 2, height / 2);
  return {
    outer: {
      x: bounds.left,
      y: bounds.top,
      w: width,
      h: height,
      radius
    },
    inner: {
      x: bounds.left + border.l,
      y: bounds.top + border.t,
      w: width - border.l - border.r,
      h: height - border.t - border.b,
      radius: {
        topLeft: Math.max(0, radius.topLeft - Math.max(border.t, border.l)),
        topRight: Math.max(0, radius.topRight - Math.max(border.t, border.r)),
        bottomLeft: Math.max(0, radius.bottomLeft - Math.max(border.b, border.l)),
        bottomRight: Math.max(0, radius.bottomRight - Math.max(border.b, border.r))
      }
    }
  };
}
function inRange(bar, x3, y3, useFinalPosition) {
  const skipX = x3 === null;
  const skipY = y3 === null;
  const skipBoth = skipX && skipY;
  const bounds = bar && !skipBoth && getBarBounds(bar, useFinalPosition);
  return bounds && (skipX || _isBetween(x3, bounds.left, bounds.right)) && (skipY || _isBetween(y3, bounds.top, bounds.bottom));
}
function hasRadius(radius) {
  return radius.topLeft || radius.topRight || radius.bottomLeft || radius.bottomRight;
}
function addNormalRectPath(ctx, rect) {
  ctx.rect(rect.x, rect.y, rect.w, rect.h);
}
function inflateRect(rect, amount, refRect = {}) {
  const x3 = rect.x !== refRect.x ? -amount : 0;
  const y3 = rect.y !== refRect.y ? -amount : 0;
  const w3 = (rect.x + rect.w !== refRect.x + refRect.w ? amount : 0) - x3;
  const h3 = (rect.y + rect.h !== refRect.y + refRect.h ? amount : 0) - y3;
  return {
    x: rect.x + x3,
    y: rect.y + y3,
    w: rect.w + w3,
    h: rect.h + h3,
    radius: rect.radius
  };
}
var BarElement = class extends Element {
  constructor(cfg) {
    super();
    this.options = void 0;
    this.horizontal = void 0;
    this.base = void 0;
    this.width = void 0;
    this.height = void 0;
    this.inflateAmount = void 0;
    if (cfg) {
      Object.assign(this, cfg);
    }
  }
  draw(ctx) {
    const { inflateAmount, options: { borderColor, backgroundColor } } = this;
    const { inner, outer } = boundingRects(this);
    const addRectPath = hasRadius(outer.radius) ? addRoundedRectPath : addNormalRectPath;
    ctx.save();
    if (outer.w !== inner.w || outer.h !== inner.h) {
      ctx.beginPath();
      addRectPath(ctx, inflateRect(outer, inflateAmount, inner));
      ctx.clip();
      addRectPath(ctx, inflateRect(inner, -inflateAmount, outer));
      ctx.fillStyle = borderColor;
      ctx.fill("evenodd");
    }
    ctx.beginPath();
    addRectPath(ctx, inflateRect(inner, inflateAmount));
    ctx.fillStyle = backgroundColor;
    ctx.fill();
    ctx.restore();
  }
  inRange(mouseX, mouseY, useFinalPosition) {
    return inRange(this, mouseX, mouseY, useFinalPosition);
  }
  inXRange(mouseX, useFinalPosition) {
    return inRange(this, mouseX, null, useFinalPosition);
  }
  inYRange(mouseY, useFinalPosition) {
    return inRange(this, null, mouseY, useFinalPosition);
  }
  getCenterPoint(useFinalPosition) {
    const { x: x3, y: y3, base, horizontal } = this.getProps([
      "x",
      "y",
      "base",
      "horizontal"
    ], useFinalPosition);
    return {
      x: horizontal ? (x3 + base) / 2 : x3,
      y: horizontal ? y3 : (y3 + base) / 2
    };
  }
  getRange(axis) {
    return axis === "x" ? this.width / 2 : this.height / 2;
  }
};
__publicField(BarElement, "id", "bar");
__publicField(BarElement, "defaults", {
  borderSkipped: "start",
  borderWidth: 0,
  borderRadius: 0,
  inflateAmount: "auto",
  pointStyle: void 0
});
__publicField(BarElement, "defaultRoutes", {
  backgroundColor: "backgroundColor",
  borderColor: "borderColor"
});
var elements = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  ArcElement,
  BarElement,
  LineElement,
  PointElement
});
var BORDER_COLORS = [
  "rgb(54, 162, 235)",
  "rgb(255, 99, 132)",
  "rgb(255, 159, 64)",
  "rgb(255, 205, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(201, 203, 207)"
  // grey
];
var BACKGROUND_COLORS = /* @__PURE__ */ BORDER_COLORS.map((color2) => color2.replace("rgb(", "rgba(").replace(")", ", 0.5)"));
function getBorderColor(i4) {
  return BORDER_COLORS[i4 % BORDER_COLORS.length];
}
function getBackgroundColor(i4) {
  return BACKGROUND_COLORS[i4 % BACKGROUND_COLORS.length];
}
function colorizeDefaultDataset(dataset, i4) {
  dataset.borderColor = getBorderColor(i4);
  dataset.backgroundColor = getBackgroundColor(i4);
  return ++i4;
}
function colorizeDoughnutDataset(dataset, i4) {
  dataset.backgroundColor = dataset.data.map(() => getBorderColor(i4++));
  return i4;
}
function colorizePolarAreaDataset(dataset, i4) {
  dataset.backgroundColor = dataset.data.map(() => getBackgroundColor(i4++));
  return i4;
}
function getColorizer(chart) {
  let i4 = 0;
  return (dataset, datasetIndex) => {
    const controller = chart.getDatasetMeta(datasetIndex).controller;
    if (controller instanceof DoughnutController) {
      i4 = colorizeDoughnutDataset(dataset, i4);
    } else if (controller instanceof PolarAreaController) {
      i4 = colorizePolarAreaDataset(dataset, i4);
    } else if (controller) {
      i4 = colorizeDefaultDataset(dataset, i4);
    }
  };
}
function containsColorsDefinitions(descriptors2) {
  let k3;
  for (k3 in descriptors2) {
    if (descriptors2[k3].borderColor || descriptors2[k3].backgroundColor) {
      return true;
    }
  }
  return false;
}
function containsColorsDefinition(descriptor) {
  return descriptor && (descriptor.borderColor || descriptor.backgroundColor);
}
function containsDefaultColorsDefenitions() {
  return defaults.borderColor !== "rgba(0,0,0,0.1)" || defaults.backgroundColor !== "rgba(0,0,0,0.1)";
}
var plugin_colors = {
  id: "colors",
  defaults: {
    enabled: true,
    forceOverride: false
  },
  beforeLayout(chart, _args, options) {
    if (!options.enabled) {
      return;
    }
    const { data: { datasets }, options: chartOptions } = chart.config;
    const { elements: elements2 } = chartOptions;
    const containsColorDefenition = containsColorsDefinitions(datasets) || containsColorsDefinition(chartOptions) || elements2 && containsColorsDefinitions(elements2) || containsDefaultColorsDefenitions();
    if (!options.forceOverride && containsColorDefenition) {
      return;
    }
    const colorizer = getColorizer(chart);
    datasets.forEach(colorizer);
  }
};
function lttbDecimation(data, start, count, availableWidth, options) {
  const samples = options.samples || availableWidth;
  if (samples >= count) {
    return data.slice(start, start + count);
  }
  const decimated = [];
  const bucketWidth = (count - 2) / (samples - 2);
  let sampledIndex = 0;
  const endIndex = start + count - 1;
  let a3 = start;
  let i4, maxAreaPoint, maxArea, area, nextA;
  decimated[sampledIndex++] = data[a3];
  for (i4 = 0; i4 < samples - 2; i4++) {
    let avgX = 0;
    let avgY = 0;
    let j4;
    const avgRangeStart = Math.floor((i4 + 1) * bucketWidth) + 1 + start;
    const avgRangeEnd = Math.min(Math.floor((i4 + 2) * bucketWidth) + 1, count) + start;
    const avgRangeLength = avgRangeEnd - avgRangeStart;
    for (j4 = avgRangeStart; j4 < avgRangeEnd; j4++) {
      avgX += data[j4].x;
      avgY += data[j4].y;
    }
    avgX /= avgRangeLength;
    avgY /= avgRangeLength;
    const rangeOffs = Math.floor(i4 * bucketWidth) + 1 + start;
    const rangeTo = Math.min(Math.floor((i4 + 1) * bucketWidth) + 1, count) + start;
    const { x: pointAx, y: pointAy } = data[a3];
    maxArea = area = -1;
    for (j4 = rangeOffs; j4 < rangeTo; j4++) {
      area = 0.5 * Math.abs((pointAx - avgX) * (data[j4].y - pointAy) - (pointAx - data[j4].x) * (avgY - pointAy));
      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = data[j4];
        nextA = j4;
      }
    }
    decimated[sampledIndex++] = maxAreaPoint;
    a3 = nextA;
  }
  decimated[sampledIndex++] = data[endIndex];
  return decimated;
}
function minMaxDecimation(data, start, count, availableWidth) {
  let avgX = 0;
  let countX = 0;
  let i4, point, x3, y3, prevX, minIndex, maxIndex, startIndex, minY, maxY;
  const decimated = [];
  const endIndex = start + count - 1;
  const xMin = data[start].x;
  const xMax = data[endIndex].x;
  const dx = xMax - xMin;
  for (i4 = start; i4 < start + count; ++i4) {
    point = data[i4];
    x3 = (point.x - xMin) / dx * availableWidth;
    y3 = point.y;
    const truncX = x3 | 0;
    if (truncX === prevX) {
      if (y3 < minY) {
        minY = y3;
        minIndex = i4;
      } else if (y3 > maxY) {
        maxY = y3;
        maxIndex = i4;
      }
      avgX = (countX * avgX + point.x) / ++countX;
    } else {
      const lastIndex = i4 - 1;
      if (!isNullOrUndef(minIndex) && !isNullOrUndef(maxIndex)) {
        const intermediateIndex1 = Math.min(minIndex, maxIndex);
        const intermediateIndex2 = Math.max(minIndex, maxIndex);
        if (intermediateIndex1 !== startIndex && intermediateIndex1 !== lastIndex) {
          decimated.push({
            ...data[intermediateIndex1],
            x: avgX
          });
        }
        if (intermediateIndex2 !== startIndex && intermediateIndex2 !== lastIndex) {
          decimated.push({
            ...data[intermediateIndex2],
            x: avgX
          });
        }
      }
      if (i4 > 0 && lastIndex !== startIndex) {
        decimated.push(data[lastIndex]);
      }
      decimated.push(point);
      prevX = truncX;
      countX = 0;
      minY = maxY = y3;
      minIndex = maxIndex = startIndex = i4;
    }
  }
  return decimated;
}
function cleanDecimatedDataset(dataset) {
  if (dataset._decimated) {
    const data = dataset._data;
    delete dataset._decimated;
    delete dataset._data;
    Object.defineProperty(dataset, "data", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: data
    });
  }
}
function cleanDecimatedData(chart) {
  chart.data.datasets.forEach((dataset) => {
    cleanDecimatedDataset(dataset);
  });
}
function getStartAndCountOfVisiblePointsSimplified(meta, points) {
  const pointCount = points.length;
  let start = 0;
  let count;
  const { iScale } = meta;
  const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
  if (minDefined) {
    start = _limitValue(_lookupByKey(points, iScale.axis, min).lo, 0, pointCount - 1);
  }
  if (maxDefined) {
    count = _limitValue(_lookupByKey(points, iScale.axis, max).hi + 1, start, pointCount) - start;
  } else {
    count = pointCount - start;
  }
  return {
    start,
    count
  };
}
var plugin_decimation = {
  id: "decimation",
  defaults: {
    algorithm: "min-max",
    enabled: false
  },
  beforeElementsUpdate: (chart, args, options) => {
    if (!options.enabled) {
      cleanDecimatedData(chart);
      return;
    }
    const availableWidth = chart.width;
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const { _data, indexAxis } = dataset;
      const meta = chart.getDatasetMeta(datasetIndex);
      const data = _data || dataset.data;
      if (resolve([
        indexAxis,
        chart.options.indexAxis
      ]) === "y") {
        return;
      }
      if (!meta.controller.supportsDecimation) {
        return;
      }
      const xAxis = chart.scales[meta.xAxisID];
      if (xAxis.type !== "linear" && xAxis.type !== "time") {
        return;
      }
      if (chart.options.parsing) {
        return;
      }
      let { start, count } = getStartAndCountOfVisiblePointsSimplified(meta, data);
      const threshold = options.threshold || 4 * availableWidth;
      if (count <= threshold) {
        cleanDecimatedDataset(dataset);
        return;
      }
      if (isNullOrUndef(_data)) {
        dataset._data = data;
        delete dataset.data;
        Object.defineProperty(dataset, "data", {
          configurable: true,
          enumerable: true,
          get: function() {
            return this._decimated;
          },
          set: function(d3) {
            this._data = d3;
          }
        });
      }
      let decimated;
      switch (options.algorithm) {
        case "lttb":
          decimated = lttbDecimation(data, start, count, availableWidth, options);
          break;
        case "min-max":
          decimated = minMaxDecimation(data, start, count, availableWidth);
          break;
        default:
          throw new Error(`Unsupported decimation algorithm '${options.algorithm}'`);
      }
      dataset._decimated = decimated;
    });
  },
  destroy(chart) {
    cleanDecimatedData(chart);
  }
};
function _segments(line, target, property) {
  const segments = line.segments;
  const points = line.points;
  const tpoints = target.points;
  const parts = [];
  for (const segment of segments) {
    let { start, end } = segment;
    end = _findSegmentEnd(start, end, points);
    const bounds = _getBounds(property, points[start], points[end], segment.loop);
    if (!target.segments) {
      parts.push({
        source: segment,
        target: bounds,
        start: points[start],
        end: points[end]
      });
      continue;
    }
    const targetSegments = _boundSegments(target, bounds);
    for (const tgt of targetSegments) {
      const subBounds = _getBounds(property, tpoints[tgt.start], tpoints[tgt.end], tgt.loop);
      const fillSources = _boundSegment(segment, points, subBounds);
      for (const fillSource of fillSources) {
        parts.push({
          source: fillSource,
          target: tgt,
          start: {
            [property]: _getEdge(bounds, subBounds, "start", Math.max)
          },
          end: {
            [property]: _getEdge(bounds, subBounds, "end", Math.min)
          }
        });
      }
    }
  }
  return parts;
}
function _getBounds(property, first, last, loop) {
  if (loop) {
    return;
  }
  let start = first[property];
  let end = last[property];
  if (property === "angle") {
    start = _normalizeAngle(start);
    end = _normalizeAngle(end);
  }
  return {
    property,
    start,
    end
  };
}
function _pointsFromSegments(boundary, line) {
  const { x: x3 = null, y: y3 = null } = boundary || {};
  const linePoints = line.points;
  const points = [];
  line.segments.forEach(({ start, end }) => {
    end = _findSegmentEnd(start, end, linePoints);
    const first = linePoints[start];
    const last = linePoints[end];
    if (y3 !== null) {
      points.push({
        x: first.x,
        y: y3
      });
      points.push({
        x: last.x,
        y: y3
      });
    } else if (x3 !== null) {
      points.push({
        x: x3,
        y: first.y
      });
      points.push({
        x: x3,
        y: last.y
      });
    }
  });
  return points;
}
function _findSegmentEnd(start, end, points) {
  for (; end > start; end--) {
    const point = points[end];
    if (!isNaN(point.x) && !isNaN(point.y)) {
      break;
    }
  }
  return end;
}
function _getEdge(a3, b2, prop, fn2) {
  if (a3 && b2) {
    return fn2(a3[prop], b2[prop]);
  }
  return a3 ? a3[prop] : b2 ? b2[prop] : 0;
}
function _createBoundaryLine(boundary, line) {
  let points = [];
  let _loop = false;
  if (isArray(boundary)) {
    _loop = true;
    points = boundary;
  } else {
    points = _pointsFromSegments(boundary, line);
  }
  return points.length ? new LineElement({
    points,
    options: {
      tension: 0
    },
    _loop,
    _fullLoop: _loop
  }) : null;
}
function _shouldApplyFill(source) {
  return source && source.fill !== false;
}
function _resolveTarget(sources, index2, propagate) {
  const source = sources[index2];
  let fill2 = source.fill;
  const visited = [
    index2
  ];
  let target;
  if (!propagate) {
    return fill2;
  }
  while (fill2 !== false && visited.indexOf(fill2) === -1) {
    if (!isNumberFinite(fill2)) {
      return fill2;
    }
    target = sources[fill2];
    if (!target) {
      return false;
    }
    if (target.visible) {
      return fill2;
    }
    visited.push(fill2);
    fill2 = target.fill;
  }
  return false;
}
function _decodeFill(line, index2, count) {
  const fill2 = parseFillOption(line);
  if (isObject(fill2)) {
    return isNaN(fill2.value) ? false : fill2;
  }
  let target = parseFloat(fill2);
  if (isNumberFinite(target) && Math.floor(target) === target) {
    return decodeTargetIndex(fill2[0], index2, target, count);
  }
  return [
    "origin",
    "start",
    "end",
    "stack",
    "shape"
  ].indexOf(fill2) >= 0 && fill2;
}
function decodeTargetIndex(firstCh, index2, target, count) {
  if (firstCh === "-" || firstCh === "+") {
    target = index2 + target;
  }
  if (target === index2 || target < 0 || target >= count) {
    return false;
  }
  return target;
}
function _getTargetPixel(fill2, scale) {
  let pixel = null;
  if (fill2 === "start") {
    pixel = scale.bottom;
  } else if (fill2 === "end") {
    pixel = scale.top;
  } else if (isObject(fill2)) {
    pixel = scale.getPixelForValue(fill2.value);
  } else if (scale.getBasePixel) {
    pixel = scale.getBasePixel();
  }
  return pixel;
}
function _getTargetValue(fill2, scale, startValue) {
  let value;
  if (fill2 === "start") {
    value = startValue;
  } else if (fill2 === "end") {
    value = scale.options.reverse ? scale.min : scale.max;
  } else if (isObject(fill2)) {
    value = fill2.value;
  } else {
    value = scale.getBaseValue();
  }
  return value;
}
function parseFillOption(line) {
  const options = line.options;
  const fillOption = options.fill;
  let fill2 = valueOrDefault(fillOption && fillOption.target, fillOption);
  if (fill2 === void 0) {
    fill2 = !!options.backgroundColor;
  }
  if (fill2 === false || fill2 === null) {
    return false;
  }
  if (fill2 === true) {
    return "origin";
  }
  return fill2;
}
function _buildStackLine(source) {
  const { scale, index: index2, line } = source;
  const points = [];
  const segments = line.segments;
  const sourcePoints = line.points;
  const linesBelow = getLinesBelow(scale, index2);
  linesBelow.push(_createBoundaryLine({
    x: null,
    y: scale.bottom
  }, line));
  for (let i4 = 0; i4 < segments.length; i4++) {
    const segment = segments[i4];
    for (let j4 = segment.start; j4 <= segment.end; j4++) {
      addPointsBelow(points, sourcePoints[j4], linesBelow);
    }
  }
  return new LineElement({
    points,
    options: {}
  });
}
function getLinesBelow(scale, index2) {
  const below = [];
  const metas = scale.getMatchingVisibleMetas("line");
  for (let i4 = 0; i4 < metas.length; i4++) {
    const meta = metas[i4];
    if (meta.index === index2) {
      break;
    }
    if (!meta.hidden) {
      below.unshift(meta.dataset);
    }
  }
  return below;
}
function addPointsBelow(points, sourcePoint, linesBelow) {
  const postponed = [];
  for (let j4 = 0; j4 < linesBelow.length; j4++) {
    const line = linesBelow[j4];
    const { first, last, point } = findPoint(line, sourcePoint, "x");
    if (!point || first && last) {
      continue;
    }
    if (first) {
      postponed.unshift(point);
    } else {
      points.push(point);
      if (!last) {
        break;
      }
    }
  }
  points.push(...postponed);
}
function findPoint(line, sourcePoint, property) {
  const point = line.interpolate(sourcePoint, property);
  if (!point) {
    return {};
  }
  const pointValue = point[property];
  const segments = line.segments;
  const linePoints = line.points;
  let first = false;
  let last = false;
  for (let i4 = 0; i4 < segments.length; i4++) {
    const segment = segments[i4];
    const firstValue = linePoints[segment.start][property];
    const lastValue = linePoints[segment.end][property];
    if (_isBetween(pointValue, firstValue, lastValue)) {
      first = pointValue === firstValue;
      last = pointValue === lastValue;
      break;
    }
  }
  return {
    first,
    last,
    point
  };
}
var simpleArc = class {
  constructor(opts) {
    this.x = opts.x;
    this.y = opts.y;
    this.radius = opts.radius;
  }
  pathSegment(ctx, bounds, opts) {
    const { x: x3, y: y3, radius } = this;
    bounds = bounds || {
      start: 0,
      end: TAU
    };
    ctx.arc(x3, y3, radius, bounds.end, bounds.start, true);
    return !opts.bounds;
  }
  interpolate(point) {
    const { x: x3, y: y3, radius } = this;
    const angle = point.angle;
    return {
      x: x3 + Math.cos(angle) * radius,
      y: y3 + Math.sin(angle) * radius,
      angle
    };
  }
};
function _getTarget(source) {
  const { chart, fill: fill2, line } = source;
  if (isNumberFinite(fill2)) {
    return getLineByIndex(chart, fill2);
  }
  if (fill2 === "stack") {
    return _buildStackLine(source);
  }
  if (fill2 === "shape") {
    return true;
  }
  const boundary = computeBoundary(source);
  if (boundary instanceof simpleArc) {
    return boundary;
  }
  return _createBoundaryLine(boundary, line);
}
function getLineByIndex(chart, index2) {
  const meta = chart.getDatasetMeta(index2);
  const visible = meta && chart.isDatasetVisible(index2);
  return visible ? meta.dataset : null;
}
function computeBoundary(source) {
  const scale = source.scale || {};
  if (scale.getPointPositionForValue) {
    return computeCircularBoundary(source);
  }
  return computeLinearBoundary(source);
}
function computeLinearBoundary(source) {
  const { scale = {}, fill: fill2 } = source;
  const pixel = _getTargetPixel(fill2, scale);
  if (isNumberFinite(pixel)) {
    const horizontal = scale.isHorizontal();
    return {
      x: horizontal ? pixel : null,
      y: horizontal ? null : pixel
    };
  }
  return null;
}
function computeCircularBoundary(source) {
  const { scale, fill: fill2 } = source;
  const options = scale.options;
  const length = scale.getLabels().length;
  const start = options.reverse ? scale.max : scale.min;
  const value = _getTargetValue(fill2, scale, start);
  const target = [];
  if (options.grid.circular) {
    const center = scale.getPointPositionForValue(0, start);
    return new simpleArc({
      x: center.x,
      y: center.y,
      radius: scale.getDistanceFromCenterForValue(value)
    });
  }
  for (let i4 = 0; i4 < length; ++i4) {
    target.push(scale.getPointPositionForValue(i4, value));
  }
  return target;
}
function _drawfill(ctx, source, area) {
  const target = _getTarget(source);
  const { chart, index: index2, line, scale, axis } = source;
  const lineOpts = line.options;
  const fillOption = lineOpts.fill;
  const color2 = lineOpts.backgroundColor;
  const { above = color2, below = color2 } = fillOption || {};
  const meta = chart.getDatasetMeta(index2);
  const clip = getDatasetClipArea(chart, meta);
  if (target && line.points.length) {
    clipArea(ctx, area);
    doFill(ctx, {
      line,
      target,
      above,
      below,
      area,
      scale,
      axis,
      clip
    });
    unclipArea(ctx);
  }
}
function doFill(ctx, cfg) {
  const { line, target, above, below, area, scale, clip } = cfg;
  const property = line._loop ? "angle" : cfg.axis;
  ctx.save();
  let fillColor = below;
  if (below !== above) {
    if (property === "x") {
      clipVertical(ctx, target, area.top);
      fill(ctx, {
        line,
        target,
        color: above,
        scale,
        property,
        clip
      });
      ctx.restore();
      ctx.save();
      clipVertical(ctx, target, area.bottom);
    } else if (property === "y") {
      clipHorizontal(ctx, target, area.left);
      fill(ctx, {
        line,
        target,
        color: below,
        scale,
        property,
        clip
      });
      ctx.restore();
      ctx.save();
      clipHorizontal(ctx, target, area.right);
      fillColor = above;
    }
  }
  fill(ctx, {
    line,
    target,
    color: fillColor,
    scale,
    property,
    clip
  });
  ctx.restore();
}
function clipVertical(ctx, target, clipY) {
  const { segments, points } = target;
  let first = true;
  let lineLoop = false;
  ctx.beginPath();
  for (const segment of segments) {
    const { start, end } = segment;
    const firstPoint = points[start];
    const lastPoint = points[_findSegmentEnd(start, end, points)];
    if (first) {
      ctx.moveTo(firstPoint.x, firstPoint.y);
      first = false;
    } else {
      ctx.lineTo(firstPoint.x, clipY);
      ctx.lineTo(firstPoint.x, firstPoint.y);
    }
    lineLoop = !!target.pathSegment(ctx, segment, {
      move: lineLoop
    });
    if (lineLoop) {
      ctx.closePath();
    } else {
      ctx.lineTo(lastPoint.x, clipY);
    }
  }
  ctx.lineTo(target.first().x, clipY);
  ctx.closePath();
  ctx.clip();
}
function clipHorizontal(ctx, target, clipX) {
  const { segments, points } = target;
  let first = true;
  let lineLoop = false;
  ctx.beginPath();
  for (const segment of segments) {
    const { start, end } = segment;
    const firstPoint = points[start];
    const lastPoint = points[_findSegmentEnd(start, end, points)];
    if (first) {
      ctx.moveTo(firstPoint.x, firstPoint.y);
      first = false;
    } else {
      ctx.lineTo(clipX, firstPoint.y);
      ctx.lineTo(firstPoint.x, firstPoint.y);
    }
    lineLoop = !!target.pathSegment(ctx, segment, {
      move: lineLoop
    });
    if (lineLoop) {
      ctx.closePath();
    } else {
      ctx.lineTo(clipX, lastPoint.y);
    }
  }
  ctx.lineTo(clipX, target.first().y);
  ctx.closePath();
  ctx.clip();
}
function fill(ctx, cfg) {
  const { line, target, property, color: color2, scale, clip } = cfg;
  const segments = _segments(line, target, property);
  for (const { source: src, target: tgt, start, end } of segments) {
    const { style: { backgroundColor = color2 } = {} } = src;
    const notShape = target !== true;
    ctx.save();
    ctx.fillStyle = backgroundColor;
    clipBounds(ctx, scale, clip, notShape && _getBounds(property, start, end));
    ctx.beginPath();
    const lineLoop = !!line.pathSegment(ctx, src);
    let loop;
    if (notShape) {
      if (lineLoop) {
        ctx.closePath();
      } else {
        interpolatedLineTo(ctx, target, end, property);
      }
      const targetLoop = !!target.pathSegment(ctx, tgt, {
        move: lineLoop,
        reverse: true
      });
      loop = lineLoop && targetLoop;
      if (!loop) {
        interpolatedLineTo(ctx, target, start, property);
      }
    }
    ctx.closePath();
    ctx.fill(loop ? "evenodd" : "nonzero");
    ctx.restore();
  }
}
function clipBounds(ctx, scale, clip, bounds) {
  const chartArea = scale.chart.chartArea;
  const { property, start, end } = bounds || {};
  if (property === "x" || property === "y") {
    let left, top, right, bottom;
    if (property === "x") {
      left = start;
      top = chartArea.top;
      right = end;
      bottom = chartArea.bottom;
    } else {
      left = chartArea.left;
      top = start;
      right = chartArea.right;
      bottom = end;
    }
    ctx.beginPath();
    if (clip) {
      left = Math.max(left, clip.left);
      right = Math.min(right, clip.right);
      top = Math.max(top, clip.top);
      bottom = Math.min(bottom, clip.bottom);
    }
    ctx.rect(left, top, right - left, bottom - top);
    ctx.clip();
  }
}
function interpolatedLineTo(ctx, target, point, property) {
  const interpolatedPoint = target.interpolate(point, property);
  if (interpolatedPoint) {
    ctx.lineTo(interpolatedPoint.x, interpolatedPoint.y);
  }
}
var index = {
  id: "filler",
  afterDatasetsUpdate(chart, _args, options) {
    const count = (chart.data.datasets || []).length;
    const sources = [];
    let meta, i4, line, source;
    for (i4 = 0; i4 < count; ++i4) {
      meta = chart.getDatasetMeta(i4);
      line = meta.dataset;
      source = null;
      if (line && line.options && line instanceof LineElement) {
        source = {
          visible: chart.isDatasetVisible(i4),
          index: i4,
          fill: _decodeFill(line, i4, count),
          chart,
          axis: meta.controller.options.indexAxis,
          scale: meta.vScale,
          line
        };
      }
      meta.$filler = source;
      sources.push(source);
    }
    for (i4 = 0; i4 < count; ++i4) {
      source = sources[i4];
      if (!source || source.fill === false) {
        continue;
      }
      source.fill = _resolveTarget(sources, i4, options.propagate);
    }
  },
  beforeDraw(chart, _args, options) {
    const draw2 = options.drawTime === "beforeDraw";
    const metasets = chart.getSortedVisibleDatasetMetas();
    const area = chart.chartArea;
    for (let i4 = metasets.length - 1; i4 >= 0; --i4) {
      const source = metasets[i4].$filler;
      if (!source) {
        continue;
      }
      source.line.updateControlPoints(area, source.axis);
      if (draw2 && source.fill) {
        _drawfill(chart.ctx, source, area);
      }
    }
  },
  beforeDatasetsDraw(chart, _args, options) {
    if (options.drawTime !== "beforeDatasetsDraw") {
      return;
    }
    const metasets = chart.getSortedVisibleDatasetMetas();
    for (let i4 = metasets.length - 1; i4 >= 0; --i4) {
      const source = metasets[i4].$filler;
      if (_shouldApplyFill(source)) {
        _drawfill(chart.ctx, source, chart.chartArea);
      }
    }
  },
  beforeDatasetDraw(chart, args, options) {
    const source = args.meta.$filler;
    if (!_shouldApplyFill(source) || options.drawTime !== "beforeDatasetDraw") {
      return;
    }
    _drawfill(chart.ctx, source, chart.chartArea);
  },
  defaults: {
    propagate: true,
    drawTime: "beforeDatasetDraw"
  }
};
var getBoxSize = (labelOpts, fontSize) => {
  let { boxHeight = fontSize, boxWidth = fontSize } = labelOpts;
  if (labelOpts.usePointStyle) {
    boxHeight = Math.min(boxHeight, fontSize);
    boxWidth = labelOpts.pointStyleWidth || Math.min(boxWidth, fontSize);
  }
  return {
    boxWidth,
    boxHeight,
    itemHeight: Math.max(fontSize, boxHeight)
  };
};
var itemsEqual = (a3, b2) => a3 !== null && b2 !== null && a3.datasetIndex === b2.datasetIndex && a3.index === b2.index;
var Legend = class extends Element {
  constructor(config) {
    super();
    this._added = false;
    this.legendHitBoxes = [];
    this._hoveredItem = null;
    this.doughnutMode = false;
    this.chart = config.chart;
    this.options = config.options;
    this.ctx = config.ctx;
    this.legendItems = void 0;
    this.columnSizes = void 0;
    this.lineWidths = void 0;
    this.maxHeight = void 0;
    this.maxWidth = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.left = void 0;
    this.right = void 0;
    this.height = void 0;
    this.width = void 0;
    this._margins = void 0;
    this.position = void 0;
    this.weight = void 0;
    this.fullSize = void 0;
  }
  update(maxWidth, maxHeight, margins) {
    this.maxWidth = maxWidth;
    this.maxHeight = maxHeight;
    this._margins = margins;
    this.setDimensions();
    this.buildLabels();
    this.fit();
  }
  setDimensions() {
    if (this.isHorizontal()) {
      this.width = this.maxWidth;
      this.left = this._margins.left;
      this.right = this.width;
    } else {
      this.height = this.maxHeight;
      this.top = this._margins.top;
      this.bottom = this.height;
    }
  }
  buildLabels() {
    const labelOpts = this.options.labels || {};
    let legendItems = callback(labelOpts.generateLabels, [
      this.chart
    ], this) || [];
    if (labelOpts.filter) {
      legendItems = legendItems.filter((item) => labelOpts.filter(item, this.chart.data));
    }
    if (labelOpts.sort) {
      legendItems = legendItems.sort((a3, b2) => labelOpts.sort(a3, b2, this.chart.data));
    }
    if (this.options.reverse) {
      legendItems.reverse();
    }
    this.legendItems = legendItems;
  }
  fit() {
    const { options, ctx } = this;
    if (!options.display) {
      this.width = this.height = 0;
      return;
    }
    const labelOpts = options.labels;
    const labelFont = toFont(labelOpts.font);
    const fontSize = labelFont.size;
    const titleHeight = this._computeTitleHeight();
    const { boxWidth, itemHeight } = getBoxSize(labelOpts, fontSize);
    let width, height;
    ctx.font = labelFont.string;
    if (this.isHorizontal()) {
      width = this.maxWidth;
      height = this._fitRows(titleHeight, fontSize, boxWidth, itemHeight) + 10;
    } else {
      height = this.maxHeight;
      width = this._fitCols(titleHeight, labelFont, boxWidth, itemHeight) + 10;
    }
    this.width = Math.min(width, options.maxWidth || this.maxWidth);
    this.height = Math.min(height, options.maxHeight || this.maxHeight);
  }
  _fitRows(titleHeight, fontSize, boxWidth, itemHeight) {
    const { ctx, maxWidth, options: { labels: { padding } } } = this;
    const hitboxes = this.legendHitBoxes = [];
    const lineWidths = this.lineWidths = [
      0
    ];
    const lineHeight = itemHeight + padding;
    let totalHeight = titleHeight;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    let row = -1;
    let top = -lineHeight;
    this.legendItems.forEach((legendItem, i4) => {
      const itemWidth = boxWidth + fontSize / 2 + ctx.measureText(legendItem.text).width;
      if (i4 === 0 || lineWidths[lineWidths.length - 1] + itemWidth + 2 * padding > maxWidth) {
        totalHeight += lineHeight;
        lineWidths[lineWidths.length - (i4 > 0 ? 0 : 1)] = 0;
        top += lineHeight;
        row++;
      }
      hitboxes[i4] = {
        left: 0,
        top,
        row,
        width: itemWidth,
        height: itemHeight
      };
      lineWidths[lineWidths.length - 1] += itemWidth + padding;
    });
    return totalHeight;
  }
  _fitCols(titleHeight, labelFont, boxWidth, _itemHeight) {
    const { ctx, maxHeight, options: { labels: { padding } } } = this;
    const hitboxes = this.legendHitBoxes = [];
    const columnSizes = this.columnSizes = [];
    const heightLimit = maxHeight - titleHeight;
    let totalWidth = padding;
    let currentColWidth = 0;
    let currentColHeight = 0;
    let left = 0;
    let col = 0;
    this.legendItems.forEach((legendItem, i4) => {
      const { itemWidth, itemHeight } = calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight);
      if (i4 > 0 && currentColHeight + itemHeight + 2 * padding > heightLimit) {
        totalWidth += currentColWidth + padding;
        columnSizes.push({
          width: currentColWidth,
          height: currentColHeight
        });
        left += currentColWidth + padding;
        col++;
        currentColWidth = currentColHeight = 0;
      }
      hitboxes[i4] = {
        left,
        top: currentColHeight,
        col,
        width: itemWidth,
        height: itemHeight
      };
      currentColWidth = Math.max(currentColWidth, itemWidth);
      currentColHeight += itemHeight + padding;
    });
    totalWidth += currentColWidth;
    columnSizes.push({
      width: currentColWidth,
      height: currentColHeight
    });
    return totalWidth;
  }
  adjustHitBoxes() {
    if (!this.options.display) {
      return;
    }
    const titleHeight = this._computeTitleHeight();
    const { legendHitBoxes: hitboxes, options: { align, labels: { padding }, rtl } } = this;
    const rtlHelper = getRtlAdapter(rtl, this.left, this.width);
    if (this.isHorizontal()) {
      let row = 0;
      let left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
      for (const hitbox of hitboxes) {
        if (row !== hitbox.row) {
          row = hitbox.row;
          left = _alignStartEnd(align, this.left + padding, this.right - this.lineWidths[row]);
        }
        hitbox.top += this.top + titleHeight + padding;
        hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(left), hitbox.width);
        left += hitbox.width + padding;
      }
    } else {
      let col = 0;
      let top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
      for (const hitbox of hitboxes) {
        if (hitbox.col !== col) {
          col = hitbox.col;
          top = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - this.columnSizes[col].height);
        }
        hitbox.top = top;
        hitbox.left += this.left + padding;
        hitbox.left = rtlHelper.leftForLtr(rtlHelper.x(hitbox.left), hitbox.width);
        top += hitbox.height + padding;
      }
    }
  }
  isHorizontal() {
    return this.options.position === "top" || this.options.position === "bottom";
  }
  draw() {
    if (this.options.display) {
      const ctx = this.ctx;
      clipArea(ctx, this);
      this._draw();
      unclipArea(ctx);
    }
  }
  _draw() {
    const { options: opts, columnSizes, lineWidths, ctx } = this;
    const { align, labels: labelOpts } = opts;
    const defaultColor = defaults.color;
    const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
    const labelFont = toFont(labelOpts.font);
    const { padding } = labelOpts;
    const fontSize = labelFont.size;
    const halfFontSize = fontSize / 2;
    let cursor;
    this.drawTitle();
    ctx.textAlign = rtlHelper.textAlign("left");
    ctx.textBaseline = "middle";
    ctx.lineWidth = 0.5;
    ctx.font = labelFont.string;
    const { boxWidth, boxHeight, itemHeight } = getBoxSize(labelOpts, fontSize);
    const drawLegendBox = function(x3, y3, legendItem) {
      if (isNaN(boxWidth) || boxWidth <= 0 || isNaN(boxHeight) || boxHeight < 0) {
        return;
      }
      ctx.save();
      const lineWidth = valueOrDefault(legendItem.lineWidth, 1);
      ctx.fillStyle = valueOrDefault(legendItem.fillStyle, defaultColor);
      ctx.lineCap = valueOrDefault(legendItem.lineCap, "butt");
      ctx.lineDashOffset = valueOrDefault(legendItem.lineDashOffset, 0);
      ctx.lineJoin = valueOrDefault(legendItem.lineJoin, "miter");
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = valueOrDefault(legendItem.strokeStyle, defaultColor);
      ctx.setLineDash(valueOrDefault(legendItem.lineDash, []));
      if (labelOpts.usePointStyle) {
        const drawOptions = {
          radius: boxHeight * Math.SQRT2 / 2,
          pointStyle: legendItem.pointStyle,
          rotation: legendItem.rotation,
          borderWidth: lineWidth
        };
        const centerX = rtlHelper.xPlus(x3, boxWidth / 2);
        const centerY = y3 + halfFontSize;
        drawPointLegend(ctx, drawOptions, centerX, centerY, labelOpts.pointStyleWidth && boxWidth);
      } else {
        const yBoxTop = y3 + Math.max((fontSize - boxHeight) / 2, 0);
        const xBoxLeft = rtlHelper.leftForLtr(x3, boxWidth);
        const borderRadius = toTRBLCorners(legendItem.borderRadius);
        ctx.beginPath();
        if (Object.values(borderRadius).some((v3) => v3 !== 0)) {
          addRoundedRectPath(ctx, {
            x: xBoxLeft,
            y: yBoxTop,
            w: boxWidth,
            h: boxHeight,
            radius: borderRadius
          });
        } else {
          ctx.rect(xBoxLeft, yBoxTop, boxWidth, boxHeight);
        }
        ctx.fill();
        if (lineWidth !== 0) {
          ctx.stroke();
        }
      }
      ctx.restore();
    };
    const fillText = function(x3, y3, legendItem) {
      renderText(ctx, legendItem.text, x3, y3 + itemHeight / 2, labelFont, {
        strikethrough: legendItem.hidden,
        textAlign: rtlHelper.textAlign(legendItem.textAlign)
      });
    };
    const isHorizontal = this.isHorizontal();
    const titleHeight = this._computeTitleHeight();
    if (isHorizontal) {
      cursor = {
        x: _alignStartEnd(align, this.left + padding, this.right - lineWidths[0]),
        y: this.top + padding + titleHeight,
        line: 0
      };
    } else {
      cursor = {
        x: this.left + padding,
        y: _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[0].height),
        line: 0
      };
    }
    overrideTextDirection(this.ctx, opts.textDirection);
    const lineHeight = itemHeight + padding;
    this.legendItems.forEach((legendItem, i4) => {
      ctx.strokeStyle = legendItem.fontColor;
      ctx.fillStyle = legendItem.fontColor;
      const textWidth = ctx.measureText(legendItem.text).width;
      const textAlign = rtlHelper.textAlign(legendItem.textAlign || (legendItem.textAlign = labelOpts.textAlign));
      const width = boxWidth + halfFontSize + textWidth;
      let x3 = cursor.x;
      let y3 = cursor.y;
      rtlHelper.setWidth(this.width);
      if (isHorizontal) {
        if (i4 > 0 && x3 + width + padding > this.right) {
          y3 = cursor.y += lineHeight;
          cursor.line++;
          x3 = cursor.x = _alignStartEnd(align, this.left + padding, this.right - lineWidths[cursor.line]);
        }
      } else if (i4 > 0 && y3 + lineHeight > this.bottom) {
        x3 = cursor.x = x3 + columnSizes[cursor.line].width + padding;
        cursor.line++;
        y3 = cursor.y = _alignStartEnd(align, this.top + titleHeight + padding, this.bottom - columnSizes[cursor.line].height);
      }
      const realX = rtlHelper.x(x3);
      drawLegendBox(realX, y3, legendItem);
      x3 = _textX(textAlign, x3 + boxWidth + halfFontSize, isHorizontal ? x3 + width : this.right, opts.rtl);
      fillText(rtlHelper.x(x3), y3, legendItem);
      if (isHorizontal) {
        cursor.x += width + padding;
      } else if (typeof legendItem.text !== "string") {
        const fontLineHeight = labelFont.lineHeight;
        cursor.y += calculateLegendItemHeight(legendItem, fontLineHeight) + padding;
      } else {
        cursor.y += lineHeight;
      }
    });
    restoreTextDirection(this.ctx, opts.textDirection);
  }
  drawTitle() {
    const opts = this.options;
    const titleOpts = opts.title;
    const titleFont = toFont(titleOpts.font);
    const titlePadding = toPadding(titleOpts.padding);
    if (!titleOpts.display) {
      return;
    }
    const rtlHelper = getRtlAdapter(opts.rtl, this.left, this.width);
    const ctx = this.ctx;
    const position = titleOpts.position;
    const halfFontSize = titleFont.size / 2;
    const topPaddingPlusHalfFontSize = titlePadding.top + halfFontSize;
    let y3;
    let left = this.left;
    let maxWidth = this.width;
    if (this.isHorizontal()) {
      maxWidth = Math.max(...this.lineWidths);
      y3 = this.top + topPaddingPlusHalfFontSize;
      left = _alignStartEnd(opts.align, left, this.right - maxWidth);
    } else {
      const maxHeight = this.columnSizes.reduce((acc, size) => Math.max(acc, size.height), 0);
      y3 = topPaddingPlusHalfFontSize + _alignStartEnd(opts.align, this.top, this.bottom - maxHeight - opts.labels.padding - this._computeTitleHeight());
    }
    const x3 = _alignStartEnd(position, left, left + maxWidth);
    ctx.textAlign = rtlHelper.textAlign(_toLeftRightCenter(position));
    ctx.textBaseline = "middle";
    ctx.strokeStyle = titleOpts.color;
    ctx.fillStyle = titleOpts.color;
    ctx.font = titleFont.string;
    renderText(ctx, titleOpts.text, x3, y3, titleFont);
  }
  _computeTitleHeight() {
    const titleOpts = this.options.title;
    const titleFont = toFont(titleOpts.font);
    const titlePadding = toPadding(titleOpts.padding);
    return titleOpts.display ? titleFont.lineHeight + titlePadding.height : 0;
  }
  _getLegendItemAt(x3, y3) {
    let i4, hitBox, lh;
    if (_isBetween(x3, this.left, this.right) && _isBetween(y3, this.top, this.bottom)) {
      lh = this.legendHitBoxes;
      for (i4 = 0; i4 < lh.length; ++i4) {
        hitBox = lh[i4];
        if (_isBetween(x3, hitBox.left, hitBox.left + hitBox.width) && _isBetween(y3, hitBox.top, hitBox.top + hitBox.height)) {
          return this.legendItems[i4];
        }
      }
    }
    return null;
  }
  handleEvent(e3) {
    const opts = this.options;
    if (!isListened(e3.type, opts)) {
      return;
    }
    const hoveredItem = this._getLegendItemAt(e3.x, e3.y);
    if (e3.type === "mousemove" || e3.type === "mouseout") {
      const previous = this._hoveredItem;
      const sameItem = itemsEqual(previous, hoveredItem);
      if (previous && !sameItem) {
        callback(opts.onLeave, [
          e3,
          previous,
          this
        ], this);
      }
      this._hoveredItem = hoveredItem;
      if (hoveredItem && !sameItem) {
        callback(opts.onHover, [
          e3,
          hoveredItem,
          this
        ], this);
      }
    } else if (hoveredItem) {
      callback(opts.onClick, [
        e3,
        hoveredItem,
        this
      ], this);
    }
  }
};
function calculateItemSize(boxWidth, labelFont, ctx, legendItem, _itemHeight) {
  const itemWidth = calculateItemWidth(legendItem, boxWidth, labelFont, ctx);
  const itemHeight = calculateItemHeight(_itemHeight, legendItem, labelFont.lineHeight);
  return {
    itemWidth,
    itemHeight
  };
}
function calculateItemWidth(legendItem, boxWidth, labelFont, ctx) {
  let legendItemText = legendItem.text;
  if (legendItemText && typeof legendItemText !== "string") {
    legendItemText = legendItemText.reduce((a3, b2) => a3.length > b2.length ? a3 : b2);
  }
  return boxWidth + labelFont.size / 2 + ctx.measureText(legendItemText).width;
}
function calculateItemHeight(_itemHeight, legendItem, fontLineHeight) {
  let itemHeight = _itemHeight;
  if (typeof legendItem.text !== "string") {
    itemHeight = calculateLegendItemHeight(legendItem, fontLineHeight);
  }
  return itemHeight;
}
function calculateLegendItemHeight(legendItem, fontLineHeight) {
  const labelHeight = legendItem.text ? legendItem.text.length : 0;
  return fontLineHeight * labelHeight;
}
function isListened(type, opts) {
  if ((type === "mousemove" || type === "mouseout") && (opts.onHover || opts.onLeave)) {
    return true;
  }
  if (opts.onClick && (type === "click" || type === "mouseup")) {
    return true;
  }
  return false;
}
var plugin_legend = {
  id: "legend",
  _element: Legend,
  start(chart, _args, options) {
    const legend = chart.legend = new Legend({
      ctx: chart.ctx,
      options,
      chart
    });
    layouts.configure(chart, legend, options);
    layouts.addBox(chart, legend);
  },
  stop(chart) {
    layouts.removeBox(chart, chart.legend);
    delete chart.legend;
  },
  beforeUpdate(chart, _args, options) {
    const legend = chart.legend;
    layouts.configure(chart, legend, options);
    legend.options = options;
  },
  afterUpdate(chart) {
    const legend = chart.legend;
    legend.buildLabels();
    legend.adjustHitBoxes();
  },
  afterEvent(chart, args) {
    if (!args.replay) {
      chart.legend.handleEvent(args.event);
    }
  },
  defaults: {
    display: true,
    position: "top",
    align: "center",
    fullSize: true,
    reverse: false,
    weight: 1e3,
    onClick(e3, legendItem, legend) {
      const index2 = legendItem.datasetIndex;
      const ci = legend.chart;
      if (ci.isDatasetVisible(index2)) {
        ci.hide(index2);
        legendItem.hidden = true;
      } else {
        ci.show(index2);
        legendItem.hidden = false;
      }
    },
    onHover: null,
    onLeave: null,
    labels: {
      color: (ctx) => ctx.chart.options.color,
      boxWidth: 40,
      padding: 10,
      generateLabels(chart) {
        const datasets = chart.data.datasets;
        const { labels: { usePointStyle, pointStyle, textAlign, color: color2, useBorderRadius, borderRadius } } = chart.legend.options;
        return chart._getSortedDatasetMetas().map((meta) => {
          const style = meta.controller.getStyle(usePointStyle ? 0 : void 0);
          const borderWidth = toPadding(style.borderWidth);
          return {
            text: datasets[meta.index].label,
            fillStyle: style.backgroundColor,
            fontColor: color2,
            hidden: !meta.visible,
            lineCap: style.borderCapStyle,
            lineDash: style.borderDash,
            lineDashOffset: style.borderDashOffset,
            lineJoin: style.borderJoinStyle,
            lineWidth: (borderWidth.width + borderWidth.height) / 4,
            strokeStyle: style.borderColor,
            pointStyle: pointStyle || style.pointStyle,
            rotation: style.rotation,
            textAlign: textAlign || style.textAlign,
            borderRadius: useBorderRadius && (borderRadius || style.borderRadius),
            datasetIndex: meta.index
          };
        }, this);
      }
    },
    title: {
      color: (ctx) => ctx.chart.options.color,
      display: false,
      position: "center",
      text: ""
    }
  },
  descriptors: {
    _scriptable: (name) => !name.startsWith("on"),
    labels: {
      _scriptable: (name) => ![
        "generateLabels",
        "filter",
        "sort"
      ].includes(name)
    }
  }
};
var Title = class extends Element {
  constructor(config) {
    super();
    this.chart = config.chart;
    this.options = config.options;
    this.ctx = config.ctx;
    this._padding = void 0;
    this.top = void 0;
    this.bottom = void 0;
    this.left = void 0;
    this.right = void 0;
    this.width = void 0;
    this.height = void 0;
    this.position = void 0;
    this.weight = void 0;
    this.fullSize = void 0;
  }
  update(maxWidth, maxHeight) {
    const opts = this.options;
    this.left = 0;
    this.top = 0;
    if (!opts.display) {
      this.width = this.height = this.right = this.bottom = 0;
      return;
    }
    this.width = this.right = maxWidth;
    this.height = this.bottom = maxHeight;
    const lineCount = isArray(opts.text) ? opts.text.length : 1;
    this._padding = toPadding(opts.padding);
    const textSize = lineCount * toFont(opts.font).lineHeight + this._padding.height;
    if (this.isHorizontal()) {
      this.height = textSize;
    } else {
      this.width = textSize;
    }
  }
  isHorizontal() {
    const pos = this.options.position;
    return pos === "top" || pos === "bottom";
  }
  _drawArgs(offset) {
    const { top, left, bottom, right, options } = this;
    const align = options.align;
    let rotation = 0;
    let maxWidth, titleX, titleY;
    if (this.isHorizontal()) {
      titleX = _alignStartEnd(align, left, right);
      titleY = top + offset;
      maxWidth = right - left;
    } else {
      if (options.position === "left") {
        titleX = left + offset;
        titleY = _alignStartEnd(align, bottom, top);
        rotation = PI * -0.5;
      } else {
        titleX = right - offset;
        titleY = _alignStartEnd(align, top, bottom);
        rotation = PI * 0.5;
      }
      maxWidth = bottom - top;
    }
    return {
      titleX,
      titleY,
      maxWidth,
      rotation
    };
  }
  draw() {
    const ctx = this.ctx;
    const opts = this.options;
    if (!opts.display) {
      return;
    }
    const fontOpts = toFont(opts.font);
    const lineHeight = fontOpts.lineHeight;
    const offset = lineHeight / 2 + this._padding.top;
    const { titleX, titleY, maxWidth, rotation } = this._drawArgs(offset);
    renderText(ctx, opts.text, 0, 0, fontOpts, {
      color: opts.color,
      maxWidth,
      rotation,
      textAlign: _toLeftRightCenter(opts.align),
      textBaseline: "middle",
      translation: [
        titleX,
        titleY
      ]
    });
  }
};
function createTitle(chart, titleOpts) {
  const title = new Title({
    ctx: chart.ctx,
    options: titleOpts,
    chart
  });
  layouts.configure(chart, title, titleOpts);
  layouts.addBox(chart, title);
  chart.titleBlock = title;
}
var plugin_title = {
  id: "title",
  _element: Title,
  start(chart, _args, options) {
    createTitle(chart, options);
  },
  stop(chart) {
    const titleBlock = chart.titleBlock;
    layouts.removeBox(chart, titleBlock);
    delete chart.titleBlock;
  },
  beforeUpdate(chart, _args, options) {
    const title = chart.titleBlock;
    layouts.configure(chart, title, options);
    title.options = options;
  },
  defaults: {
    align: "center",
    display: false,
    font: {
      weight: "bold"
    },
    fullSize: true,
    padding: 10,
    position: "top",
    text: "",
    weight: 2e3
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: true,
    _indexable: false
  }
};
var map2 = /* @__PURE__ */ new WeakMap();
var plugin_subtitle = {
  id: "subtitle",
  start(chart, _args, options) {
    const title = new Title({
      ctx: chart.ctx,
      options,
      chart
    });
    layouts.configure(chart, title, options);
    layouts.addBox(chart, title);
    map2.set(chart, title);
  },
  stop(chart) {
    layouts.removeBox(chart, map2.get(chart));
    map2.delete(chart);
  },
  beforeUpdate(chart, _args, options) {
    const title = map2.get(chart);
    layouts.configure(chart, title, options);
    title.options = options;
  },
  defaults: {
    align: "center",
    display: false,
    font: {
      weight: "normal"
    },
    fullSize: true,
    padding: 0,
    position: "top",
    text: "",
    weight: 1500
  },
  defaultRoutes: {
    color: "color"
  },
  descriptors: {
    _scriptable: true,
    _indexable: false
  }
};
var positioners = {
  average(items) {
    if (!items.length) {
      return false;
    }
    let i4, len;
    let xSet = /* @__PURE__ */ new Set();
    let y3 = 0;
    let count = 0;
    for (i4 = 0, len = items.length; i4 < len; ++i4) {
      const el = items[i4].element;
      if (el && el.hasValue()) {
        const pos = el.tooltipPosition();
        xSet.add(pos.x);
        y3 += pos.y;
        ++count;
      }
    }
    if (count === 0 || xSet.size === 0) {
      return false;
    }
    const xAverage = [
      ...xSet
    ].reduce((a3, b2) => a3 + b2) / xSet.size;
    return {
      x: xAverage,
      y: y3 / count
    };
  },
  nearest(items, eventPosition) {
    if (!items.length) {
      return false;
    }
    let x3 = eventPosition.x;
    let y3 = eventPosition.y;
    let minDistance = Number.POSITIVE_INFINITY;
    let i4, len, nearestElement;
    for (i4 = 0, len = items.length; i4 < len; ++i4) {
      const el = items[i4].element;
      if (el && el.hasValue()) {
        const center = el.getCenterPoint();
        const d3 = distanceBetweenPoints(eventPosition, center);
        if (d3 < minDistance) {
          minDistance = d3;
          nearestElement = el;
        }
      }
    }
    if (nearestElement) {
      const tp = nearestElement.tooltipPosition();
      x3 = tp.x;
      y3 = tp.y;
    }
    return {
      x: x3,
      y: y3
    };
  }
};
function pushOrConcat(base, toPush) {
  if (toPush) {
    if (isArray(toPush)) {
      Array.prototype.push.apply(base, toPush);
    } else {
      base.push(toPush);
    }
  }
  return base;
}
function splitNewlines(str) {
  if ((typeof str === "string" || str instanceof String) && str.indexOf("\n") > -1) {
    return str.split("\n");
  }
  return str;
}
function createTooltipItem(chart, item) {
  const { element, datasetIndex, index: index2 } = item;
  const controller = chart.getDatasetMeta(datasetIndex).controller;
  const { label, value } = controller.getLabelAndValue(index2);
  return {
    chart,
    label,
    parsed: controller.getParsed(index2),
    raw: chart.data.datasets[datasetIndex].data[index2],
    formattedValue: value,
    dataset: controller.getDataset(),
    dataIndex: index2,
    datasetIndex,
    element
  };
}
function getTooltipSize(tooltip, options) {
  const ctx = tooltip.chart.ctx;
  const { body, footer, title } = tooltip;
  const { boxWidth, boxHeight } = options;
  const bodyFont = toFont(options.bodyFont);
  const titleFont = toFont(options.titleFont);
  const footerFont = toFont(options.footerFont);
  const titleLineCount = title.length;
  const footerLineCount = footer.length;
  const bodyLineItemCount = body.length;
  const padding = toPadding(options.padding);
  let height = padding.height;
  let width = 0;
  let combinedBodyLength = body.reduce((count, bodyItem) => count + bodyItem.before.length + bodyItem.lines.length + bodyItem.after.length, 0);
  combinedBodyLength += tooltip.beforeBody.length + tooltip.afterBody.length;
  if (titleLineCount) {
    height += titleLineCount * titleFont.lineHeight + (titleLineCount - 1) * options.titleSpacing + options.titleMarginBottom;
  }
  if (combinedBodyLength) {
    const bodyLineHeight = options.displayColors ? Math.max(boxHeight, bodyFont.lineHeight) : bodyFont.lineHeight;
    height += bodyLineItemCount * bodyLineHeight + (combinedBodyLength - bodyLineItemCount) * bodyFont.lineHeight + (combinedBodyLength - 1) * options.bodySpacing;
  }
  if (footerLineCount) {
    height += options.footerMarginTop + footerLineCount * footerFont.lineHeight + (footerLineCount - 1) * options.footerSpacing;
  }
  let widthPadding = 0;
  const maxLineWidth = function(line) {
    width = Math.max(width, ctx.measureText(line).width + widthPadding);
  };
  ctx.save();
  ctx.font = titleFont.string;
  each(tooltip.title, maxLineWidth);
  ctx.font = bodyFont.string;
  each(tooltip.beforeBody.concat(tooltip.afterBody), maxLineWidth);
  widthPadding = options.displayColors ? boxWidth + 2 + options.boxPadding : 0;
  each(body, (bodyItem) => {
    each(bodyItem.before, maxLineWidth);
    each(bodyItem.lines, maxLineWidth);
    each(bodyItem.after, maxLineWidth);
  });
  widthPadding = 0;
  ctx.font = footerFont.string;
  each(tooltip.footer, maxLineWidth);
  ctx.restore();
  width += padding.width;
  return {
    width,
    height
  };
}
function determineYAlign(chart, size) {
  const { y: y3, height } = size;
  if (y3 < height / 2) {
    return "top";
  } else if (y3 > chart.height - height / 2) {
    return "bottom";
  }
  return "center";
}
function doesNotFitWithAlign(xAlign, chart, options, size) {
  const { x: x3, width } = size;
  const caret = options.caretSize + options.caretPadding;
  if (xAlign === "left" && x3 + width + caret > chart.width) {
    return true;
  }
  if (xAlign === "right" && x3 - width - caret < 0) {
    return true;
  }
}
function determineXAlign(chart, options, size, yAlign) {
  const { x: x3, width } = size;
  const { width: chartWidth, chartArea: { left, right } } = chart;
  let xAlign = "center";
  if (yAlign === "center") {
    xAlign = x3 <= (left + right) / 2 ? "left" : "right";
  } else if (x3 <= width / 2) {
    xAlign = "left";
  } else if (x3 >= chartWidth - width / 2) {
    xAlign = "right";
  }
  if (doesNotFitWithAlign(xAlign, chart, options, size)) {
    xAlign = "center";
  }
  return xAlign;
}
function determineAlignment(chart, options, size) {
  const yAlign = size.yAlign || options.yAlign || determineYAlign(chart, size);
  return {
    xAlign: size.xAlign || options.xAlign || determineXAlign(chart, options, size, yAlign),
    yAlign
  };
}
function alignX(size, xAlign) {
  let { x: x3, width } = size;
  if (xAlign === "right") {
    x3 -= width;
  } else if (xAlign === "center") {
    x3 -= width / 2;
  }
  return x3;
}
function alignY(size, yAlign, paddingAndSize) {
  let { y: y3, height } = size;
  if (yAlign === "top") {
    y3 += paddingAndSize;
  } else if (yAlign === "bottom") {
    y3 -= height + paddingAndSize;
  } else {
    y3 -= height / 2;
  }
  return y3;
}
function getBackgroundPoint(options, size, alignment, chart) {
  const { caretSize, caretPadding, cornerRadius } = options;
  const { xAlign, yAlign } = alignment;
  const paddingAndSize = caretSize + caretPadding;
  const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
  let x3 = alignX(size, xAlign);
  const y3 = alignY(size, yAlign, paddingAndSize);
  if (yAlign === "center") {
    if (xAlign === "left") {
      x3 += paddingAndSize;
    } else if (xAlign === "right") {
      x3 -= paddingAndSize;
    }
  } else if (xAlign === "left") {
    x3 -= Math.max(topLeft, bottomLeft) + caretSize;
  } else if (xAlign === "right") {
    x3 += Math.max(topRight, bottomRight) + caretSize;
  }
  return {
    x: _limitValue(x3, 0, chart.width - size.width),
    y: _limitValue(y3, 0, chart.height - size.height)
  };
}
function getAlignedX(tooltip, align, options) {
  const padding = toPadding(options.padding);
  return align === "center" ? tooltip.x + tooltip.width / 2 : align === "right" ? tooltip.x + tooltip.width - padding.right : tooltip.x + padding.left;
}
function getBeforeAfterBodyLines(callback2) {
  return pushOrConcat([], splitNewlines(callback2));
}
function createTooltipContext(parent, tooltip, tooltipItems) {
  return createContext(parent, {
    tooltip,
    tooltipItems,
    type: "tooltip"
  });
}
function overrideCallbacks(callbacks, context) {
  const override = context && context.dataset && context.dataset.tooltip && context.dataset.tooltip.callbacks;
  return override ? callbacks.override(override) : callbacks;
}
var defaultCallbacks = {
  beforeTitle: noop,
  title(tooltipItems) {
    if (tooltipItems.length > 0) {
      const item = tooltipItems[0];
      const labels = item.chart.data.labels;
      const labelCount = labels ? labels.length : 0;
      if (this && this.options && this.options.mode === "dataset") {
        return item.dataset.label || "";
      } else if (item.label) {
        return item.label;
      } else if (labelCount > 0 && item.dataIndex < labelCount) {
        return labels[item.dataIndex];
      }
    }
    return "";
  },
  afterTitle: noop,
  beforeBody: noop,
  beforeLabel: noop,
  label(tooltipItem) {
    if (this && this.options && this.options.mode === "dataset") {
      return tooltipItem.label + ": " + tooltipItem.formattedValue || tooltipItem.formattedValue;
    }
    let label = tooltipItem.dataset.label || "";
    if (label) {
      label += ": ";
    }
    const value = tooltipItem.formattedValue;
    if (!isNullOrUndef(value)) {
      label += value;
    }
    return label;
  },
  labelColor(tooltipItem) {
    const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
    const options = meta.controller.getStyle(tooltipItem.dataIndex);
    return {
      borderColor: options.borderColor,
      backgroundColor: options.backgroundColor,
      borderWidth: options.borderWidth,
      borderDash: options.borderDash,
      borderDashOffset: options.borderDashOffset,
      borderRadius: 0
    };
  },
  labelTextColor() {
    return this.options.bodyColor;
  },
  labelPointStyle(tooltipItem) {
    const meta = tooltipItem.chart.getDatasetMeta(tooltipItem.datasetIndex);
    const options = meta.controller.getStyle(tooltipItem.dataIndex);
    return {
      pointStyle: options.pointStyle,
      rotation: options.rotation
    };
  },
  afterLabel: noop,
  afterBody: noop,
  beforeFooter: noop,
  footer: noop,
  afterFooter: noop
};
function invokeCallbackWithFallback(callbacks, name, ctx, arg) {
  const result = callbacks[name].call(ctx, arg);
  if (typeof result === "undefined") {
    return defaultCallbacks[name].call(ctx, arg);
  }
  return result;
}
var Tooltip = class extends Element {
  constructor(config) {
    super();
    this.opacity = 0;
    this._active = [];
    this._eventPosition = void 0;
    this._size = void 0;
    this._cachedAnimations = void 0;
    this._tooltipItems = [];
    this.$animations = void 0;
    this.$context = void 0;
    this.chart = config.chart;
    this.options = config.options;
    this.dataPoints = void 0;
    this.title = void 0;
    this.beforeBody = void 0;
    this.body = void 0;
    this.afterBody = void 0;
    this.footer = void 0;
    this.xAlign = void 0;
    this.yAlign = void 0;
    this.x = void 0;
    this.y = void 0;
    this.height = void 0;
    this.width = void 0;
    this.caretX = void 0;
    this.caretY = void 0;
    this.labelColors = void 0;
    this.labelPointStyles = void 0;
    this.labelTextColors = void 0;
  }
  initialize(options) {
    this.options = options;
    this._cachedAnimations = void 0;
    this.$context = void 0;
  }
  _resolveAnimations() {
    const cached = this._cachedAnimations;
    if (cached) {
      return cached;
    }
    const chart = this.chart;
    const options = this.options.setContext(this.getContext());
    const opts = options.enabled && chart.options.animation && options.animations;
    const animations = new Animations(this.chart, opts);
    if (opts._cacheable) {
      this._cachedAnimations = Object.freeze(animations);
    }
    return animations;
  }
  getContext() {
    return this.$context || (this.$context = createTooltipContext(this.chart.getContext(), this, this._tooltipItems));
  }
  getTitle(context, options) {
    const { callbacks } = options;
    const beforeTitle = invokeCallbackWithFallback(callbacks, "beforeTitle", this, context);
    const title = invokeCallbackWithFallback(callbacks, "title", this, context);
    const afterTitle = invokeCallbackWithFallback(callbacks, "afterTitle", this, context);
    let lines = [];
    lines = pushOrConcat(lines, splitNewlines(beforeTitle));
    lines = pushOrConcat(lines, splitNewlines(title));
    lines = pushOrConcat(lines, splitNewlines(afterTitle));
    return lines;
  }
  getBeforeBody(tooltipItems, options) {
    return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "beforeBody", this, tooltipItems));
  }
  getBody(tooltipItems, options) {
    const { callbacks } = options;
    const bodyItems = [];
    each(tooltipItems, (context) => {
      const bodyItem = {
        before: [],
        lines: [],
        after: []
      };
      const scoped = overrideCallbacks(callbacks, context);
      pushOrConcat(bodyItem.before, splitNewlines(invokeCallbackWithFallback(scoped, "beforeLabel", this, context)));
      pushOrConcat(bodyItem.lines, invokeCallbackWithFallback(scoped, "label", this, context));
      pushOrConcat(bodyItem.after, splitNewlines(invokeCallbackWithFallback(scoped, "afterLabel", this, context)));
      bodyItems.push(bodyItem);
    });
    return bodyItems;
  }
  getAfterBody(tooltipItems, options) {
    return getBeforeAfterBodyLines(invokeCallbackWithFallback(options.callbacks, "afterBody", this, tooltipItems));
  }
  getFooter(tooltipItems, options) {
    const { callbacks } = options;
    const beforeFooter = invokeCallbackWithFallback(callbacks, "beforeFooter", this, tooltipItems);
    const footer = invokeCallbackWithFallback(callbacks, "footer", this, tooltipItems);
    const afterFooter = invokeCallbackWithFallback(callbacks, "afterFooter", this, tooltipItems);
    let lines = [];
    lines = pushOrConcat(lines, splitNewlines(beforeFooter));
    lines = pushOrConcat(lines, splitNewlines(footer));
    lines = pushOrConcat(lines, splitNewlines(afterFooter));
    return lines;
  }
  _createItems(options) {
    const active = this._active;
    const data = this.chart.data;
    const labelColors = [];
    const labelPointStyles = [];
    const labelTextColors = [];
    let tooltipItems = [];
    let i4, len;
    for (i4 = 0, len = active.length; i4 < len; ++i4) {
      tooltipItems.push(createTooltipItem(this.chart, active[i4]));
    }
    if (options.filter) {
      tooltipItems = tooltipItems.filter((element, index2, array) => options.filter(element, index2, array, data));
    }
    if (options.itemSort) {
      tooltipItems = tooltipItems.sort((a3, b2) => options.itemSort(a3, b2, data));
    }
    each(tooltipItems, (context) => {
      const scoped = overrideCallbacks(options.callbacks, context);
      labelColors.push(invokeCallbackWithFallback(scoped, "labelColor", this, context));
      labelPointStyles.push(invokeCallbackWithFallback(scoped, "labelPointStyle", this, context));
      labelTextColors.push(invokeCallbackWithFallback(scoped, "labelTextColor", this, context));
    });
    this.labelColors = labelColors;
    this.labelPointStyles = labelPointStyles;
    this.labelTextColors = labelTextColors;
    this.dataPoints = tooltipItems;
    return tooltipItems;
  }
  update(changed, replay) {
    const options = this.options.setContext(this.getContext());
    const active = this._active;
    let properties;
    let tooltipItems = [];
    if (!active.length) {
      if (this.opacity !== 0) {
        properties = {
          opacity: 0
        };
      }
    } else {
      const position = positioners[options.position].call(this, active, this._eventPosition);
      tooltipItems = this._createItems(options);
      this.title = this.getTitle(tooltipItems, options);
      this.beforeBody = this.getBeforeBody(tooltipItems, options);
      this.body = this.getBody(tooltipItems, options);
      this.afterBody = this.getAfterBody(tooltipItems, options);
      this.footer = this.getFooter(tooltipItems, options);
      const size = this._size = getTooltipSize(this, options);
      const positionAndSize = Object.assign({}, position, size);
      const alignment = determineAlignment(this.chart, options, positionAndSize);
      const backgroundPoint = getBackgroundPoint(options, positionAndSize, alignment, this.chart);
      this.xAlign = alignment.xAlign;
      this.yAlign = alignment.yAlign;
      properties = {
        opacity: 1,
        x: backgroundPoint.x,
        y: backgroundPoint.y,
        width: size.width,
        height: size.height,
        caretX: position.x,
        caretY: position.y
      };
    }
    this._tooltipItems = tooltipItems;
    this.$context = void 0;
    if (properties) {
      this._resolveAnimations().update(this, properties);
    }
    if (changed && options.external) {
      options.external.call(this, {
        chart: this.chart,
        tooltip: this,
        replay
      });
    }
  }
  drawCaret(tooltipPoint, ctx, size, options) {
    const caretPosition = this.getCaretPosition(tooltipPoint, size, options);
    ctx.lineTo(caretPosition.x1, caretPosition.y1);
    ctx.lineTo(caretPosition.x2, caretPosition.y2);
    ctx.lineTo(caretPosition.x3, caretPosition.y3);
  }
  getCaretPosition(tooltipPoint, size, options) {
    const { xAlign, yAlign } = this;
    const { caretSize, cornerRadius } = options;
    const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(cornerRadius);
    const { x: ptX, y: ptY } = tooltipPoint;
    const { width, height } = size;
    let x1, x22, x3, y1, y22, y3;
    if (yAlign === "center") {
      y22 = ptY + height / 2;
      if (xAlign === "left") {
        x1 = ptX;
        x22 = x1 - caretSize;
        y1 = y22 + caretSize;
        y3 = y22 - caretSize;
      } else {
        x1 = ptX + width;
        x22 = x1 + caretSize;
        y1 = y22 - caretSize;
        y3 = y22 + caretSize;
      }
      x3 = x1;
    } else {
      if (xAlign === "left") {
        x22 = ptX + Math.max(topLeft, bottomLeft) + caretSize;
      } else if (xAlign === "right") {
        x22 = ptX + width - Math.max(topRight, bottomRight) - caretSize;
      } else {
        x22 = this.caretX;
      }
      if (yAlign === "top") {
        y1 = ptY;
        y22 = y1 - caretSize;
        x1 = x22 - caretSize;
        x3 = x22 + caretSize;
      } else {
        y1 = ptY + height;
        y22 = y1 + caretSize;
        x1 = x22 + caretSize;
        x3 = x22 - caretSize;
      }
      y3 = y1;
    }
    return {
      x1,
      x2: x22,
      x3,
      y1,
      y2: y22,
      y3
    };
  }
  drawTitle(pt, ctx, options) {
    const title = this.title;
    const length = title.length;
    let titleFont, titleSpacing, i4;
    if (length) {
      const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
      pt.x = getAlignedX(this, options.titleAlign, options);
      ctx.textAlign = rtlHelper.textAlign(options.titleAlign);
      ctx.textBaseline = "middle";
      titleFont = toFont(options.titleFont);
      titleSpacing = options.titleSpacing;
      ctx.fillStyle = options.titleColor;
      ctx.font = titleFont.string;
      for (i4 = 0; i4 < length; ++i4) {
        ctx.fillText(title[i4], rtlHelper.x(pt.x), pt.y + titleFont.lineHeight / 2);
        pt.y += titleFont.lineHeight + titleSpacing;
        if (i4 + 1 === length) {
          pt.y += options.titleMarginBottom - titleSpacing;
        }
      }
    }
  }
  _drawColorBox(ctx, pt, i4, rtlHelper, options) {
    const labelColor = this.labelColors[i4];
    const labelPointStyle = this.labelPointStyles[i4];
    const { boxHeight, boxWidth } = options;
    const bodyFont = toFont(options.bodyFont);
    const colorX = getAlignedX(this, "left", options);
    const rtlColorX = rtlHelper.x(colorX);
    const yOffSet = boxHeight < bodyFont.lineHeight ? (bodyFont.lineHeight - boxHeight) / 2 : 0;
    const colorY = pt.y + yOffSet;
    if (options.usePointStyle) {
      const drawOptions = {
        radius: Math.min(boxWidth, boxHeight) / 2,
        pointStyle: labelPointStyle.pointStyle,
        rotation: labelPointStyle.rotation,
        borderWidth: 1
      };
      const centerX = rtlHelper.leftForLtr(rtlColorX, boxWidth) + boxWidth / 2;
      const centerY = colorY + boxHeight / 2;
      ctx.strokeStyle = options.multiKeyBackground;
      ctx.fillStyle = options.multiKeyBackground;
      drawPoint(ctx, drawOptions, centerX, centerY);
      ctx.strokeStyle = labelColor.borderColor;
      ctx.fillStyle = labelColor.backgroundColor;
      drawPoint(ctx, drawOptions, centerX, centerY);
    } else {
      ctx.lineWidth = isObject(labelColor.borderWidth) ? Math.max(...Object.values(labelColor.borderWidth)) : labelColor.borderWidth || 1;
      ctx.strokeStyle = labelColor.borderColor;
      ctx.setLineDash(labelColor.borderDash || []);
      ctx.lineDashOffset = labelColor.borderDashOffset || 0;
      const outerX = rtlHelper.leftForLtr(rtlColorX, boxWidth);
      const innerX = rtlHelper.leftForLtr(rtlHelper.xPlus(rtlColorX, 1), boxWidth - 2);
      const borderRadius = toTRBLCorners(labelColor.borderRadius);
      if (Object.values(borderRadius).some((v3) => v3 !== 0)) {
        ctx.beginPath();
        ctx.fillStyle = options.multiKeyBackground;
        addRoundedRectPath(ctx, {
          x: outerX,
          y: colorY,
          w: boxWidth,
          h: boxHeight,
          radius: borderRadius
        });
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = labelColor.backgroundColor;
        ctx.beginPath();
        addRoundedRectPath(ctx, {
          x: innerX,
          y: colorY + 1,
          w: boxWidth - 2,
          h: boxHeight - 2,
          radius: borderRadius
        });
        ctx.fill();
      } else {
        ctx.fillStyle = options.multiKeyBackground;
        ctx.fillRect(outerX, colorY, boxWidth, boxHeight);
        ctx.strokeRect(outerX, colorY, boxWidth, boxHeight);
        ctx.fillStyle = labelColor.backgroundColor;
        ctx.fillRect(innerX, colorY + 1, boxWidth - 2, boxHeight - 2);
      }
    }
    ctx.fillStyle = this.labelTextColors[i4];
  }
  drawBody(pt, ctx, options) {
    const { body } = this;
    const { bodySpacing, bodyAlign, displayColors, boxHeight, boxWidth, boxPadding } = options;
    const bodyFont = toFont(options.bodyFont);
    let bodyLineHeight = bodyFont.lineHeight;
    let xLinePadding = 0;
    const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
    const fillLineOfText = function(line) {
      ctx.fillText(line, rtlHelper.x(pt.x + xLinePadding), pt.y + bodyLineHeight / 2);
      pt.y += bodyLineHeight + bodySpacing;
    };
    const bodyAlignForCalculation = rtlHelper.textAlign(bodyAlign);
    let bodyItem, textColor, lines, i4, j4, ilen, jlen;
    ctx.textAlign = bodyAlign;
    ctx.textBaseline = "middle";
    ctx.font = bodyFont.string;
    pt.x = getAlignedX(this, bodyAlignForCalculation, options);
    ctx.fillStyle = options.bodyColor;
    each(this.beforeBody, fillLineOfText);
    xLinePadding = displayColors && bodyAlignForCalculation !== "right" ? bodyAlign === "center" ? boxWidth / 2 + boxPadding : boxWidth + 2 + boxPadding : 0;
    for (i4 = 0, ilen = body.length; i4 < ilen; ++i4) {
      bodyItem = body[i4];
      textColor = this.labelTextColors[i4];
      ctx.fillStyle = textColor;
      each(bodyItem.before, fillLineOfText);
      lines = bodyItem.lines;
      if (displayColors && lines.length) {
        this._drawColorBox(ctx, pt, i4, rtlHelper, options);
        bodyLineHeight = Math.max(bodyFont.lineHeight, boxHeight);
      }
      for (j4 = 0, jlen = lines.length; j4 < jlen; ++j4) {
        fillLineOfText(lines[j4]);
        bodyLineHeight = bodyFont.lineHeight;
      }
      each(bodyItem.after, fillLineOfText);
    }
    xLinePadding = 0;
    bodyLineHeight = bodyFont.lineHeight;
    each(this.afterBody, fillLineOfText);
    pt.y -= bodySpacing;
  }
  drawFooter(pt, ctx, options) {
    const footer = this.footer;
    const length = footer.length;
    let footerFont, i4;
    if (length) {
      const rtlHelper = getRtlAdapter(options.rtl, this.x, this.width);
      pt.x = getAlignedX(this, options.footerAlign, options);
      pt.y += options.footerMarginTop;
      ctx.textAlign = rtlHelper.textAlign(options.footerAlign);
      ctx.textBaseline = "middle";
      footerFont = toFont(options.footerFont);
      ctx.fillStyle = options.footerColor;
      ctx.font = footerFont.string;
      for (i4 = 0; i4 < length; ++i4) {
        ctx.fillText(footer[i4], rtlHelper.x(pt.x), pt.y + footerFont.lineHeight / 2);
        pt.y += footerFont.lineHeight + options.footerSpacing;
      }
    }
  }
  drawBackground(pt, ctx, tooltipSize, options) {
    const { xAlign, yAlign } = this;
    const { x: x3, y: y3 } = pt;
    const { width, height } = tooltipSize;
    const { topLeft, topRight, bottomLeft, bottomRight } = toTRBLCorners(options.cornerRadius);
    ctx.fillStyle = options.backgroundColor;
    ctx.strokeStyle = options.borderColor;
    ctx.lineWidth = options.borderWidth;
    ctx.beginPath();
    ctx.moveTo(x3 + topLeft, y3);
    if (yAlign === "top") {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x3 + width - topRight, y3);
    ctx.quadraticCurveTo(x3 + width, y3, x3 + width, y3 + topRight);
    if (yAlign === "center" && xAlign === "right") {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x3 + width, y3 + height - bottomRight);
    ctx.quadraticCurveTo(x3 + width, y3 + height, x3 + width - bottomRight, y3 + height);
    if (yAlign === "bottom") {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x3 + bottomLeft, y3 + height);
    ctx.quadraticCurveTo(x3, y3 + height, x3, y3 + height - bottomLeft);
    if (yAlign === "center" && xAlign === "left") {
      this.drawCaret(pt, ctx, tooltipSize, options);
    }
    ctx.lineTo(x3, y3 + topLeft);
    ctx.quadraticCurveTo(x3, y3, x3 + topLeft, y3);
    ctx.closePath();
    ctx.fill();
    if (options.borderWidth > 0) {
      ctx.stroke();
    }
  }
  _updateAnimationTarget(options) {
    const chart = this.chart;
    const anims = this.$animations;
    const animX = anims && anims.x;
    const animY = anims && anims.y;
    if (animX || animY) {
      const position = positioners[options.position].call(this, this._active, this._eventPosition);
      if (!position) {
        return;
      }
      const size = this._size = getTooltipSize(this, options);
      const positionAndSize = Object.assign({}, position, this._size);
      const alignment = determineAlignment(chart, options, positionAndSize);
      const point = getBackgroundPoint(options, positionAndSize, alignment, chart);
      if (animX._to !== point.x || animY._to !== point.y) {
        this.xAlign = alignment.xAlign;
        this.yAlign = alignment.yAlign;
        this.width = size.width;
        this.height = size.height;
        this.caretX = position.x;
        this.caretY = position.y;
        this._resolveAnimations().update(this, point);
      }
    }
  }
  _willRender() {
    return !!this.opacity;
  }
  draw(ctx) {
    const options = this.options.setContext(this.getContext());
    let opacity = this.opacity;
    if (!opacity) {
      return;
    }
    this._updateAnimationTarget(options);
    const tooltipSize = {
      width: this.width,
      height: this.height
    };
    const pt = {
      x: this.x,
      y: this.y
    };
    opacity = Math.abs(opacity) < 1e-3 ? 0 : opacity;
    const padding = toPadding(options.padding);
    const hasTooltipContent = this.title.length || this.beforeBody.length || this.body.length || this.afterBody.length || this.footer.length;
    if (options.enabled && hasTooltipContent) {
      ctx.save();
      ctx.globalAlpha = opacity;
      this.drawBackground(pt, ctx, tooltipSize, options);
      overrideTextDirection(ctx, options.textDirection);
      pt.y += padding.top;
      this.drawTitle(pt, ctx, options);
      this.drawBody(pt, ctx, options);
      this.drawFooter(pt, ctx, options);
      restoreTextDirection(ctx, options.textDirection);
      ctx.restore();
    }
  }
  getActiveElements() {
    return this._active || [];
  }
  setActiveElements(activeElements, eventPosition) {
    const lastActive = this._active;
    const active = activeElements.map(({ datasetIndex, index: index2 }) => {
      const meta = this.chart.getDatasetMeta(datasetIndex);
      if (!meta) {
        throw new Error("Cannot find a dataset at index " + datasetIndex);
      }
      return {
        datasetIndex,
        element: meta.data[index2],
        index: index2
      };
    });
    const changed = !_elementsEqual(lastActive, active);
    const positionChanged = this._positionChanged(active, eventPosition);
    if (changed || positionChanged) {
      this._active = active;
      this._eventPosition = eventPosition;
      this._ignoreReplayEvents = true;
      this.update(true);
    }
  }
  handleEvent(e3, replay, inChartArea = true) {
    if (replay && this._ignoreReplayEvents) {
      return false;
    }
    this._ignoreReplayEvents = false;
    const options = this.options;
    const lastActive = this._active || [];
    const active = this._getActiveElements(e3, lastActive, replay, inChartArea);
    const positionChanged = this._positionChanged(active, e3);
    const changed = replay || !_elementsEqual(active, lastActive) || positionChanged;
    if (changed) {
      this._active = active;
      if (options.enabled || options.external) {
        this._eventPosition = {
          x: e3.x,
          y: e3.y
        };
        this.update(true, replay);
      }
    }
    return changed;
  }
  _getActiveElements(e3, lastActive, replay, inChartArea) {
    const options = this.options;
    if (e3.type === "mouseout") {
      return [];
    }
    if (!inChartArea) {
      return lastActive.filter((i4) => this.chart.data.datasets[i4.datasetIndex] && this.chart.getDatasetMeta(i4.datasetIndex).controller.getParsed(i4.index) !== void 0);
    }
    const active = this.chart.getElementsAtEventForMode(e3, options.mode, options, replay);
    if (options.reverse) {
      active.reverse();
    }
    return active;
  }
  _positionChanged(active, e3) {
    const { caretX, caretY, options } = this;
    const position = positioners[options.position].call(this, active, e3);
    return position !== false && (caretX !== position.x || caretY !== position.y);
  }
};
__publicField(Tooltip, "positioners", positioners);
var plugin_tooltip = {
  id: "tooltip",
  _element: Tooltip,
  positioners,
  afterInit(chart, _args, options) {
    if (options) {
      chart.tooltip = new Tooltip({
        chart,
        options
      });
    }
  },
  beforeUpdate(chart, _args, options) {
    if (chart.tooltip) {
      chart.tooltip.initialize(options);
    }
  },
  reset(chart, _args, options) {
    if (chart.tooltip) {
      chart.tooltip.initialize(options);
    }
  },
  afterDraw(chart) {
    const tooltip = chart.tooltip;
    if (tooltip && tooltip._willRender()) {
      const args = {
        tooltip
      };
      if (chart.notifyPlugins("beforeTooltipDraw", {
        ...args,
        cancelable: true
      }) === false) {
        return;
      }
      tooltip.draw(chart.ctx);
      chart.notifyPlugins("afterTooltipDraw", args);
    }
  },
  afterEvent(chart, args) {
    if (chart.tooltip) {
      const useFinalPosition = args.replay;
      if (chart.tooltip.handleEvent(args.event, useFinalPosition, args.inChartArea)) {
        args.changed = true;
      }
    }
  },
  defaults: {
    enabled: true,
    external: null,
    position: "average",
    backgroundColor: "rgba(0,0,0,0.8)",
    titleColor: "#fff",
    titleFont: {
      weight: "bold"
    },
    titleSpacing: 2,
    titleMarginBottom: 6,
    titleAlign: "left",
    bodyColor: "#fff",
    bodySpacing: 2,
    bodyFont: {},
    bodyAlign: "left",
    footerColor: "#fff",
    footerSpacing: 2,
    footerMarginTop: 6,
    footerFont: {
      weight: "bold"
    },
    footerAlign: "left",
    padding: 6,
    caretPadding: 2,
    caretSize: 5,
    cornerRadius: 6,
    boxHeight: (ctx, opts) => opts.bodyFont.size,
    boxWidth: (ctx, opts) => opts.bodyFont.size,
    multiKeyBackground: "#fff",
    displayColors: true,
    boxPadding: 0,
    borderColor: "rgba(0,0,0,0)",
    borderWidth: 0,
    animation: {
      duration: 400,
      easing: "easeOutQuart"
    },
    animations: {
      numbers: {
        type: "number",
        properties: [
          "x",
          "y",
          "width",
          "height",
          "caretX",
          "caretY"
        ]
      },
      opacity: {
        easing: "linear",
        duration: 200
      }
    },
    callbacks: defaultCallbacks
  },
  defaultRoutes: {
    bodyFont: "font",
    footerFont: "font",
    titleFont: "font"
  },
  descriptors: {
    _scriptable: (name) => name !== "filter" && name !== "itemSort" && name !== "external",
    _indexable: false,
    callbacks: {
      _scriptable: false,
      _indexable: false
    },
    animation: {
      _fallback: false
    },
    animations: {
      _fallback: "animation"
    }
  },
  additionalOptionScopes: [
    "interaction"
  ]
};
var plugins = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  Colors: plugin_colors,
  Decimation: plugin_decimation,
  Filler: index,
  Legend: plugin_legend,
  SubTitle: plugin_subtitle,
  Title: plugin_title,
  Tooltip: plugin_tooltip
});
var addIfString = (labels, raw, index2, addedLabels) => {
  if (typeof raw === "string") {
    index2 = labels.push(raw) - 1;
    addedLabels.unshift({
      index: index2,
      label: raw
    });
  } else if (isNaN(raw)) {
    index2 = null;
  }
  return index2;
};
function findOrAddLabel(labels, raw, index2, addedLabels) {
  const first = labels.indexOf(raw);
  if (first === -1) {
    return addIfString(labels, raw, index2, addedLabels);
  }
  const last = labels.lastIndexOf(raw);
  return first !== last ? index2 : first;
}
var validIndex = (index2, max) => index2 === null ? null : _limitValue(Math.round(index2), 0, max);
function _getLabelForValue(value) {
  const labels = this.getLabels();
  if (value >= 0 && value < labels.length) {
    return labels[value];
  }
  return value;
}
var CategoryScale = class extends Scale {
  constructor(cfg) {
    super(cfg);
    this._startValue = void 0;
    this._valueRange = 0;
    this._addedLabels = [];
  }
  init(scaleOptions) {
    const added = this._addedLabels;
    if (added.length) {
      const labels = this.getLabels();
      for (const { index: index2, label } of added) {
        if (labels[index2] === label) {
          labels.splice(index2, 1);
        }
      }
      this._addedLabels = [];
    }
    super.init(scaleOptions);
  }
  parse(raw, index2) {
    if (isNullOrUndef(raw)) {
      return null;
    }
    const labels = this.getLabels();
    index2 = isFinite(index2) && labels[index2] === raw ? index2 : findOrAddLabel(labels, raw, valueOrDefault(index2, raw), this._addedLabels);
    return validIndex(index2, labels.length - 1);
  }
  determineDataLimits() {
    const { minDefined, maxDefined } = this.getUserBounds();
    let { min, max } = this.getMinMax(true);
    if (this.options.bounds === "ticks") {
      if (!minDefined) {
        min = 0;
      }
      if (!maxDefined) {
        max = this.getLabels().length - 1;
      }
    }
    this.min = min;
    this.max = max;
  }
  buildTicks() {
    const min = this.min;
    const max = this.max;
    const offset = this.options.offset;
    const ticks = [];
    let labels = this.getLabels();
    labels = min === 0 && max === labels.length - 1 ? labels : labels.slice(min, max + 1);
    this._valueRange = Math.max(labels.length - (offset ? 0 : 1), 1);
    this._startValue = this.min - (offset ? 0.5 : 0);
    for (let value = min; value <= max; value++) {
      ticks.push({
        value
      });
    }
    return ticks;
  }
  getLabelForValue(value) {
    return _getLabelForValue.call(this, value);
  }
  configure() {
    super.configure();
    if (!this.isHorizontal()) {
      this._reversePixels = !this._reversePixels;
    }
  }
  getPixelForValue(value) {
    if (typeof value !== "number") {
      value = this.parse(value);
    }
    return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
  }
  getPixelForTick(index2) {
    const ticks = this.ticks;
    if (index2 < 0 || index2 > ticks.length - 1) {
      return null;
    }
    return this.getPixelForValue(ticks[index2].value);
  }
  getValueForPixel(pixel) {
    return Math.round(this._startValue + this.getDecimalForPixel(pixel) * this._valueRange);
  }
  getBasePixel() {
    return this.bottom;
  }
};
__publicField(CategoryScale, "id", "category");
__publicField(CategoryScale, "defaults", {
  ticks: {
    callback: _getLabelForValue
  }
});
function generateTicks$1(generationOptions, dataRange) {
  const ticks = [];
  const MIN_SPACING = 1e-14;
  const { bounds, step, min, max, precision, count, maxTicks, maxDigits, includeBounds } = generationOptions;
  const unit = step || 1;
  const maxSpaces = maxTicks - 1;
  const { min: rmin, max: rmax } = dataRange;
  const minDefined = !isNullOrUndef(min);
  const maxDefined = !isNullOrUndef(max);
  const countDefined = !isNullOrUndef(count);
  const minSpacing = (rmax - rmin) / (maxDigits + 1);
  let spacing = niceNum((rmax - rmin) / maxSpaces / unit) * unit;
  let factor, niceMin, niceMax, numSpaces;
  if (spacing < MIN_SPACING && !minDefined && !maxDefined) {
    return [
      {
        value: rmin
      },
      {
        value: rmax
      }
    ];
  }
  numSpaces = Math.ceil(rmax / spacing) - Math.floor(rmin / spacing);
  if (numSpaces > maxSpaces) {
    spacing = niceNum(numSpaces * spacing / maxSpaces / unit) * unit;
  }
  if (!isNullOrUndef(precision)) {
    factor = Math.pow(10, precision);
    spacing = Math.ceil(spacing * factor) / factor;
  }
  if (bounds === "ticks") {
    niceMin = Math.floor(rmin / spacing) * spacing;
    niceMax = Math.ceil(rmax / spacing) * spacing;
  } else {
    niceMin = rmin;
    niceMax = rmax;
  }
  if (minDefined && maxDefined && step && almostWhole((max - min) / step, spacing / 1e3)) {
    numSpaces = Math.round(Math.min((max - min) / spacing, maxTicks));
    spacing = (max - min) / numSpaces;
    niceMin = min;
    niceMax = max;
  } else if (countDefined) {
    niceMin = minDefined ? min : niceMin;
    niceMax = maxDefined ? max : niceMax;
    numSpaces = count - 1;
    spacing = (niceMax - niceMin) / numSpaces;
  } else {
    numSpaces = (niceMax - niceMin) / spacing;
    if (almostEquals(numSpaces, Math.round(numSpaces), spacing / 1e3)) {
      numSpaces = Math.round(numSpaces);
    } else {
      numSpaces = Math.ceil(numSpaces);
    }
  }
  const decimalPlaces = Math.max(_decimalPlaces(spacing), _decimalPlaces(niceMin));
  factor = Math.pow(10, isNullOrUndef(precision) ? decimalPlaces : precision);
  niceMin = Math.round(niceMin * factor) / factor;
  niceMax = Math.round(niceMax * factor) / factor;
  let j4 = 0;
  if (minDefined) {
    if (includeBounds && niceMin !== min) {
      ticks.push({
        value: min
      });
      if (niceMin < min) {
        j4++;
      }
      if (almostEquals(Math.round((niceMin + j4 * spacing) * factor) / factor, min, relativeLabelSize(min, minSpacing, generationOptions))) {
        j4++;
      }
    } else if (niceMin < min) {
      j4++;
    }
  }
  for (; j4 < numSpaces; ++j4) {
    const tickValue = Math.round((niceMin + j4 * spacing) * factor) / factor;
    if (maxDefined && tickValue > max) {
      break;
    }
    ticks.push({
      value: tickValue
    });
  }
  if (maxDefined && includeBounds && niceMax !== max) {
    if (ticks.length && almostEquals(ticks[ticks.length - 1].value, max, relativeLabelSize(max, minSpacing, generationOptions))) {
      ticks[ticks.length - 1].value = max;
    } else {
      ticks.push({
        value: max
      });
    }
  } else if (!maxDefined || niceMax === max) {
    ticks.push({
      value: niceMax
    });
  }
  return ticks;
}
function relativeLabelSize(value, minSpacing, { horizontal, minRotation }) {
  const rad = toRadians(minRotation);
  const ratio = (horizontal ? Math.sin(rad) : Math.cos(rad)) || 1e-3;
  const length = 0.75 * minSpacing * ("" + value).length;
  return Math.min(minSpacing / ratio, length);
}
var LinearScaleBase = class extends Scale {
  constructor(cfg) {
    super(cfg);
    this.start = void 0;
    this.end = void 0;
    this._startValue = void 0;
    this._endValue = void 0;
    this._valueRange = 0;
  }
  parse(raw, index2) {
    if (isNullOrUndef(raw)) {
      return null;
    }
    if ((typeof raw === "number" || raw instanceof Number) && !isFinite(+raw)) {
      return null;
    }
    return +raw;
  }
  handleTickRangeOptions() {
    const { beginAtZero } = this.options;
    const { minDefined, maxDefined } = this.getUserBounds();
    let { min, max } = this;
    const setMin = (v3) => min = minDefined ? min : v3;
    const setMax = (v3) => max = maxDefined ? max : v3;
    if (beginAtZero) {
      const minSign = sign(min);
      const maxSign = sign(max);
      if (minSign < 0 && maxSign < 0) {
        setMax(0);
      } else if (minSign > 0 && maxSign > 0) {
        setMin(0);
      }
    }
    if (min === max) {
      let offset = max === 0 ? 1 : Math.abs(max * 0.05);
      setMax(max + offset);
      if (!beginAtZero) {
        setMin(min - offset);
      }
    }
    this.min = min;
    this.max = max;
  }
  getTickLimit() {
    const tickOpts = this.options.ticks;
    let { maxTicksLimit, stepSize } = tickOpts;
    let maxTicks;
    if (stepSize) {
      maxTicks = Math.ceil(this.max / stepSize) - Math.floor(this.min / stepSize) + 1;
      if (maxTicks > 1e3) {
        console.warn(`scales.${this.id}.ticks.stepSize: ${stepSize} would result generating up to ${maxTicks} ticks. Limiting to 1000.`);
        maxTicks = 1e3;
      }
    } else {
      maxTicks = this.computeTickLimit();
      maxTicksLimit = maxTicksLimit || 11;
    }
    if (maxTicksLimit) {
      maxTicks = Math.min(maxTicksLimit, maxTicks);
    }
    return maxTicks;
  }
  computeTickLimit() {
    return Number.POSITIVE_INFINITY;
  }
  buildTicks() {
    const opts = this.options;
    const tickOpts = opts.ticks;
    let maxTicks = this.getTickLimit();
    maxTicks = Math.max(2, maxTicks);
    const numericGeneratorOptions = {
      maxTicks,
      bounds: opts.bounds,
      min: opts.min,
      max: opts.max,
      precision: tickOpts.precision,
      step: tickOpts.stepSize,
      count: tickOpts.count,
      maxDigits: this._maxDigits(),
      horizontal: this.isHorizontal(),
      minRotation: tickOpts.minRotation || 0,
      includeBounds: tickOpts.includeBounds !== false
    };
    const dataRange = this._range || this;
    const ticks = generateTicks$1(numericGeneratorOptions, dataRange);
    if (opts.bounds === "ticks") {
      _setMinAndMaxByKey(ticks, this, "value");
    }
    if (opts.reverse) {
      ticks.reverse();
      this.start = this.max;
      this.end = this.min;
    } else {
      this.start = this.min;
      this.end = this.max;
    }
    return ticks;
  }
  configure() {
    const ticks = this.ticks;
    let start = this.min;
    let end = this.max;
    super.configure();
    if (this.options.offset && ticks.length) {
      const offset = (end - start) / Math.max(ticks.length - 1, 1) / 2;
      start -= offset;
      end += offset;
    }
    this._startValue = start;
    this._endValue = end;
    this._valueRange = end - start;
  }
  getLabelForValue(value) {
    return formatNumber(value, this.chart.options.locale, this.options.ticks.format);
  }
};
var LinearScale = class extends LinearScaleBase {
  determineDataLimits() {
    const { min, max } = this.getMinMax(true);
    this.min = isNumberFinite(min) ? min : 0;
    this.max = isNumberFinite(max) ? max : 1;
    this.handleTickRangeOptions();
  }
  computeTickLimit() {
    const horizontal = this.isHorizontal();
    const length = horizontal ? this.width : this.height;
    const minRotation = toRadians(this.options.ticks.minRotation);
    const ratio = (horizontal ? Math.sin(minRotation) : Math.cos(minRotation)) || 1e-3;
    const tickFont = this._resolveTickFontOptions(0);
    return Math.ceil(length / Math.min(40, tickFont.lineHeight / ratio));
  }
  getPixelForValue(value) {
    return value === null ? NaN : this.getPixelForDecimal((value - this._startValue) / this._valueRange);
  }
  getValueForPixel(pixel) {
    return this._startValue + this.getDecimalForPixel(pixel) * this._valueRange;
  }
};
__publicField(LinearScale, "id", "linear");
__publicField(LinearScale, "defaults", {
  ticks: {
    callback: Ticks.formatters.numeric
  }
});
var log10Floor = (v3) => Math.floor(log10(v3));
var changeExponent = (v3, m3) => Math.pow(10, log10Floor(v3) + m3);
function isMajor(tickVal) {
  const remain = tickVal / Math.pow(10, log10Floor(tickVal));
  return remain === 1;
}
function steps(min, max, rangeExp) {
  const rangeStep = Math.pow(10, rangeExp);
  const start = Math.floor(min / rangeStep);
  const end = Math.ceil(max / rangeStep);
  return end - start;
}
function startExp(min, max) {
  const range = max - min;
  let rangeExp = log10Floor(range);
  while (steps(min, max, rangeExp) > 10) {
    rangeExp++;
  }
  while (steps(min, max, rangeExp) < 10) {
    rangeExp--;
  }
  return Math.min(rangeExp, log10Floor(min));
}
function generateTicks(generationOptions, { min, max }) {
  min = finiteOrDefault(generationOptions.min, min);
  const ticks = [];
  const minExp = log10Floor(min);
  let exp = startExp(min, max);
  let precision = exp < 0 ? Math.pow(10, Math.abs(exp)) : 1;
  const stepSize = Math.pow(10, exp);
  const base = minExp > exp ? Math.pow(10, minExp) : 0;
  const start = Math.round((min - base) * precision) / precision;
  const offset = Math.floor((min - base) / stepSize / 10) * stepSize * 10;
  let significand = Math.floor((start - offset) / Math.pow(10, exp));
  let value = finiteOrDefault(generationOptions.min, Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision);
  while (value < max) {
    ticks.push({
      value,
      major: isMajor(value),
      significand
    });
    if (significand >= 10) {
      significand = significand < 15 ? 15 : 20;
    } else {
      significand++;
    }
    if (significand >= 20) {
      exp++;
      significand = 2;
      precision = exp >= 0 ? 1 : precision;
    }
    value = Math.round((base + offset + significand * Math.pow(10, exp)) * precision) / precision;
  }
  const lastTick = finiteOrDefault(generationOptions.max, value);
  ticks.push({
    value: lastTick,
    major: isMajor(lastTick),
    significand
  });
  return ticks;
}
var LogarithmicScale = class extends Scale {
  constructor(cfg) {
    super(cfg);
    this.start = void 0;
    this.end = void 0;
    this._startValue = void 0;
    this._valueRange = 0;
  }
  parse(raw, index2) {
    const value = LinearScaleBase.prototype.parse.apply(this, [
      raw,
      index2
    ]);
    if (value === 0) {
      this._zero = true;
      return void 0;
    }
    return isNumberFinite(value) && value > 0 ? value : null;
  }
  determineDataLimits() {
    const { min, max } = this.getMinMax(true);
    this.min = isNumberFinite(min) ? Math.max(0, min) : null;
    this.max = isNumberFinite(max) ? Math.max(0, max) : null;
    if (this.options.beginAtZero) {
      this._zero = true;
    }
    if (this._zero && this.min !== this._suggestedMin && !isNumberFinite(this._userMin)) {
      this.min = min === changeExponent(this.min, 0) ? changeExponent(this.min, -1) : changeExponent(this.min, 0);
    }
    this.handleTickRangeOptions();
  }
  handleTickRangeOptions() {
    const { minDefined, maxDefined } = this.getUserBounds();
    let min = this.min;
    let max = this.max;
    const setMin = (v3) => min = minDefined ? min : v3;
    const setMax = (v3) => max = maxDefined ? max : v3;
    if (min === max) {
      if (min <= 0) {
        setMin(1);
        setMax(10);
      } else {
        setMin(changeExponent(min, -1));
        setMax(changeExponent(max, 1));
      }
    }
    if (min <= 0) {
      setMin(changeExponent(max, -1));
    }
    if (max <= 0) {
      setMax(changeExponent(min, 1));
    }
    this.min = min;
    this.max = max;
  }
  buildTicks() {
    const opts = this.options;
    const generationOptions = {
      min: this._userMin,
      max: this._userMax
    };
    const ticks = generateTicks(generationOptions, this);
    if (opts.bounds === "ticks") {
      _setMinAndMaxByKey(ticks, this, "value");
    }
    if (opts.reverse) {
      ticks.reverse();
      this.start = this.max;
      this.end = this.min;
    } else {
      this.start = this.min;
      this.end = this.max;
    }
    return ticks;
  }
  getLabelForValue(value) {
    return value === void 0 ? "0" : formatNumber(value, this.chart.options.locale, this.options.ticks.format);
  }
  configure() {
    const start = this.min;
    super.configure();
    this._startValue = log10(start);
    this._valueRange = log10(this.max) - log10(start);
  }
  getPixelForValue(value) {
    if (value === void 0 || value === 0) {
      value = this.min;
    }
    if (value === null || isNaN(value)) {
      return NaN;
    }
    return this.getPixelForDecimal(value === this.min ? 0 : (log10(value) - this._startValue) / this._valueRange);
  }
  getValueForPixel(pixel) {
    const decimal = this.getDecimalForPixel(pixel);
    return Math.pow(10, this._startValue + decimal * this._valueRange);
  }
};
__publicField(LogarithmicScale, "id", "logarithmic");
__publicField(LogarithmicScale, "defaults", {
  ticks: {
    callback: Ticks.formatters.logarithmic,
    major: {
      enabled: true
    }
  }
});
function getTickBackdropHeight(opts) {
  const tickOpts = opts.ticks;
  if (tickOpts.display && opts.display) {
    const padding = toPadding(tickOpts.backdropPadding);
    return valueOrDefault(tickOpts.font && tickOpts.font.size, defaults.font.size) + padding.height;
  }
  return 0;
}
function measureLabelSize(ctx, font, label) {
  label = isArray(label) ? label : [
    label
  ];
  return {
    w: _longestText(ctx, font.string, label),
    h: label.length * font.lineHeight
  };
}
function determineLimits(angle, pos, size, min, max) {
  if (angle === min || angle === max) {
    return {
      start: pos - size / 2,
      end: pos + size / 2
    };
  } else if (angle < min || angle > max) {
    return {
      start: pos - size,
      end: pos
    };
  }
  return {
    start: pos,
    end: pos + size
  };
}
function fitWithPointLabels(scale) {
  const orig = {
    l: scale.left + scale._padding.left,
    r: scale.right - scale._padding.right,
    t: scale.top + scale._padding.top,
    b: scale.bottom - scale._padding.bottom
  };
  const limits = Object.assign({}, orig);
  const labelSizes = [];
  const padding = [];
  const valueCount = scale._pointLabels.length;
  const pointLabelOpts = scale.options.pointLabels;
  const additionalAngle = pointLabelOpts.centerPointLabels ? PI / valueCount : 0;
  for (let i4 = 0; i4 < valueCount; i4++) {
    const opts = pointLabelOpts.setContext(scale.getPointLabelContext(i4));
    padding[i4] = opts.padding;
    const pointPosition = scale.getPointPosition(i4, scale.drawingArea + padding[i4], additionalAngle);
    const plFont = toFont(opts.font);
    const textSize = measureLabelSize(scale.ctx, plFont, scale._pointLabels[i4]);
    labelSizes[i4] = textSize;
    const angleRadians = _normalizeAngle(scale.getIndexAngle(i4) + additionalAngle);
    const angle = Math.round(toDegrees(angleRadians));
    const hLimits = determineLimits(angle, pointPosition.x, textSize.w, 0, 180);
    const vLimits = determineLimits(angle, pointPosition.y, textSize.h, 90, 270);
    updateLimits(limits, orig, angleRadians, hLimits, vLimits);
  }
  scale.setCenterPoint(orig.l - limits.l, limits.r - orig.r, orig.t - limits.t, limits.b - orig.b);
  scale._pointLabelItems = buildPointLabelItems(scale, labelSizes, padding);
}
function updateLimits(limits, orig, angle, hLimits, vLimits) {
  const sin = Math.abs(Math.sin(angle));
  const cos = Math.abs(Math.cos(angle));
  let x3 = 0;
  let y3 = 0;
  if (hLimits.start < orig.l) {
    x3 = (orig.l - hLimits.start) / sin;
    limits.l = Math.min(limits.l, orig.l - x3);
  } else if (hLimits.end > orig.r) {
    x3 = (hLimits.end - orig.r) / sin;
    limits.r = Math.max(limits.r, orig.r + x3);
  }
  if (vLimits.start < orig.t) {
    y3 = (orig.t - vLimits.start) / cos;
    limits.t = Math.min(limits.t, orig.t - y3);
  } else if (vLimits.end > orig.b) {
    y3 = (vLimits.end - orig.b) / cos;
    limits.b = Math.max(limits.b, orig.b + y3);
  }
}
function createPointLabelItem(scale, index2, itemOpts) {
  const outerDistance = scale.drawingArea;
  const { extra, additionalAngle, padding, size } = itemOpts;
  const pointLabelPosition = scale.getPointPosition(index2, outerDistance + extra + padding, additionalAngle);
  const angle = Math.round(toDegrees(_normalizeAngle(pointLabelPosition.angle + HALF_PI)));
  const y3 = yForAngle(pointLabelPosition.y, size.h, angle);
  const textAlign = getTextAlignForAngle(angle);
  const left = leftForTextAlign(pointLabelPosition.x, size.w, textAlign);
  return {
    visible: true,
    x: pointLabelPosition.x,
    y: y3,
    textAlign,
    left,
    top: y3,
    right: left + size.w,
    bottom: y3 + size.h
  };
}
function isNotOverlapped(item, area) {
  if (!area) {
    return true;
  }
  const { left, top, right, bottom } = item;
  const apexesInArea = _isPointInArea({
    x: left,
    y: top
  }, area) || _isPointInArea({
    x: left,
    y: bottom
  }, area) || _isPointInArea({
    x: right,
    y: top
  }, area) || _isPointInArea({
    x: right,
    y: bottom
  }, area);
  return !apexesInArea;
}
function buildPointLabelItems(scale, labelSizes, padding) {
  const items = [];
  const valueCount = scale._pointLabels.length;
  const opts = scale.options;
  const { centerPointLabels, display } = opts.pointLabels;
  const itemOpts = {
    extra: getTickBackdropHeight(opts) / 2,
    additionalAngle: centerPointLabels ? PI / valueCount : 0
  };
  let area;
  for (let i4 = 0; i4 < valueCount; i4++) {
    itemOpts.padding = padding[i4];
    itemOpts.size = labelSizes[i4];
    const item = createPointLabelItem(scale, i4, itemOpts);
    items.push(item);
    if (display === "auto") {
      item.visible = isNotOverlapped(item, area);
      if (item.visible) {
        area = item;
      }
    }
  }
  return items;
}
function getTextAlignForAngle(angle) {
  if (angle === 0 || angle === 180) {
    return "center";
  } else if (angle < 180) {
    return "left";
  }
  return "right";
}
function leftForTextAlign(x3, w3, align) {
  if (align === "right") {
    x3 -= w3;
  } else if (align === "center") {
    x3 -= w3 / 2;
  }
  return x3;
}
function yForAngle(y3, h3, angle) {
  if (angle === 90 || angle === 270) {
    y3 -= h3 / 2;
  } else if (angle > 270 || angle < 90) {
    y3 -= h3;
  }
  return y3;
}
function drawPointLabelBox(ctx, opts, item) {
  const { left, top, right, bottom } = item;
  const { backdropColor } = opts;
  if (!isNullOrUndef(backdropColor)) {
    const borderRadius = toTRBLCorners(opts.borderRadius);
    const padding = toPadding(opts.backdropPadding);
    ctx.fillStyle = backdropColor;
    const backdropLeft = left - padding.left;
    const backdropTop = top - padding.top;
    const backdropWidth = right - left + padding.width;
    const backdropHeight = bottom - top + padding.height;
    if (Object.values(borderRadius).some((v3) => v3 !== 0)) {
      ctx.beginPath();
      addRoundedRectPath(ctx, {
        x: backdropLeft,
        y: backdropTop,
        w: backdropWidth,
        h: backdropHeight,
        radius: borderRadius
      });
      ctx.fill();
    } else {
      ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
    }
  }
}
function drawPointLabels(scale, labelCount) {
  const { ctx, options: { pointLabels } } = scale;
  for (let i4 = labelCount - 1; i4 >= 0; i4--) {
    const item = scale._pointLabelItems[i4];
    if (!item.visible) {
      continue;
    }
    const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i4));
    drawPointLabelBox(ctx, optsAtIndex, item);
    const plFont = toFont(optsAtIndex.font);
    const { x: x3, y: y3, textAlign } = item;
    renderText(ctx, scale._pointLabels[i4], x3, y3 + plFont.lineHeight / 2, plFont, {
      color: optsAtIndex.color,
      textAlign,
      textBaseline: "middle"
    });
  }
}
function pathRadiusLine(scale, radius, circular, labelCount) {
  const { ctx } = scale;
  if (circular) {
    ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
  } else {
    let pointPosition = scale.getPointPosition(0, radius);
    ctx.moveTo(pointPosition.x, pointPosition.y);
    for (let i4 = 1; i4 < labelCount; i4++) {
      pointPosition = scale.getPointPosition(i4, radius);
      ctx.lineTo(pointPosition.x, pointPosition.y);
    }
  }
}
function drawRadiusLine(scale, gridLineOpts, radius, labelCount, borderOpts) {
  const ctx = scale.ctx;
  const circular = gridLineOpts.circular;
  const { color: color2, lineWidth } = gridLineOpts;
  if (!circular && !labelCount || !color2 || !lineWidth || radius < 0) {
    return;
  }
  ctx.save();
  ctx.strokeStyle = color2;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(borderOpts.dash || []);
  ctx.lineDashOffset = borderOpts.dashOffset;
  ctx.beginPath();
  pathRadiusLine(scale, radius, circular, labelCount);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}
function createPointLabelContext(parent, index2, label) {
  return createContext(parent, {
    label,
    index: index2,
    type: "pointLabel"
  });
}
var RadialLinearScale = class extends LinearScaleBase {
  constructor(cfg) {
    super(cfg);
    this.xCenter = void 0;
    this.yCenter = void 0;
    this.drawingArea = void 0;
    this._pointLabels = [];
    this._pointLabelItems = [];
  }
  setDimensions() {
    const padding = this._padding = toPadding(getTickBackdropHeight(this.options) / 2);
    const w3 = this.width = this.maxWidth - padding.width;
    const h3 = this.height = this.maxHeight - padding.height;
    this.xCenter = Math.floor(this.left + w3 / 2 + padding.left);
    this.yCenter = Math.floor(this.top + h3 / 2 + padding.top);
    this.drawingArea = Math.floor(Math.min(w3, h3) / 2);
  }
  determineDataLimits() {
    const { min, max } = this.getMinMax(false);
    this.min = isNumberFinite(min) && !isNaN(min) ? min : 0;
    this.max = isNumberFinite(max) && !isNaN(max) ? max : 0;
    this.handleTickRangeOptions();
  }
  computeTickLimit() {
    return Math.ceil(this.drawingArea / getTickBackdropHeight(this.options));
  }
  generateTickLabels(ticks) {
    LinearScaleBase.prototype.generateTickLabels.call(this, ticks);
    this._pointLabels = this.getLabels().map((value, index2) => {
      const label = callback(this.options.pointLabels.callback, [
        value,
        index2
      ], this);
      return label || label === 0 ? label : "";
    }).filter((v3, i4) => this.chart.getDataVisibility(i4));
  }
  fit() {
    const opts = this.options;
    if (opts.display && opts.pointLabels.display) {
      fitWithPointLabels(this);
    } else {
      this.setCenterPoint(0, 0, 0, 0);
    }
  }
  setCenterPoint(leftMovement, rightMovement, topMovement, bottomMovement) {
    this.xCenter += Math.floor((leftMovement - rightMovement) / 2);
    this.yCenter += Math.floor((topMovement - bottomMovement) / 2);
    this.drawingArea -= Math.min(this.drawingArea / 2, Math.max(leftMovement, rightMovement, topMovement, bottomMovement));
  }
  getIndexAngle(index2) {
    const angleMultiplier = TAU / (this._pointLabels.length || 1);
    const startAngle = this.options.startAngle || 0;
    return _normalizeAngle(index2 * angleMultiplier + toRadians(startAngle));
  }
  getDistanceFromCenterForValue(value) {
    if (isNullOrUndef(value)) {
      return NaN;
    }
    const scalingFactor = this.drawingArea / (this.max - this.min);
    if (this.options.reverse) {
      return (this.max - value) * scalingFactor;
    }
    return (value - this.min) * scalingFactor;
  }
  getValueForDistanceFromCenter(distance) {
    if (isNullOrUndef(distance)) {
      return NaN;
    }
    const scaledDistance = distance / (this.drawingArea / (this.max - this.min));
    return this.options.reverse ? this.max - scaledDistance : this.min + scaledDistance;
  }
  getPointLabelContext(index2) {
    const pointLabels = this._pointLabels || [];
    if (index2 >= 0 && index2 < pointLabels.length) {
      const pointLabel = pointLabels[index2];
      return createPointLabelContext(this.getContext(), index2, pointLabel);
    }
  }
  getPointPosition(index2, distanceFromCenter, additionalAngle = 0) {
    const angle = this.getIndexAngle(index2) - HALF_PI + additionalAngle;
    return {
      x: Math.cos(angle) * distanceFromCenter + this.xCenter,
      y: Math.sin(angle) * distanceFromCenter + this.yCenter,
      angle
    };
  }
  getPointPositionForValue(index2, value) {
    return this.getPointPosition(index2, this.getDistanceFromCenterForValue(value));
  }
  getBasePosition(index2) {
    return this.getPointPositionForValue(index2 || 0, this.getBaseValue());
  }
  getPointLabelPosition(index2) {
    const { left, top, right, bottom } = this._pointLabelItems[index2];
    return {
      left,
      top,
      right,
      bottom
    };
  }
  drawBackground() {
    const { backgroundColor, grid: { circular } } = this.options;
    if (backgroundColor) {
      const ctx = this.ctx;
      ctx.save();
      ctx.beginPath();
      pathRadiusLine(this, this.getDistanceFromCenterForValue(this._endValue), circular, this._pointLabels.length);
      ctx.closePath();
      ctx.fillStyle = backgroundColor;
      ctx.fill();
      ctx.restore();
    }
  }
  drawGrid() {
    const ctx = this.ctx;
    const opts = this.options;
    const { angleLines, grid, border } = opts;
    const labelCount = this._pointLabels.length;
    let i4, offset, position;
    if (opts.pointLabels.display) {
      drawPointLabels(this, labelCount);
    }
    if (grid.display) {
      this.ticks.forEach((tick, index2) => {
        if (index2 !== 0 || index2 === 0 && this.min < 0) {
          offset = this.getDistanceFromCenterForValue(tick.value);
          const context = this.getContext(index2);
          const optsAtIndex = grid.setContext(context);
          const optsAtIndexBorder = border.setContext(context);
          drawRadiusLine(this, optsAtIndex, offset, labelCount, optsAtIndexBorder);
        }
      });
    }
    if (angleLines.display) {
      ctx.save();
      for (i4 = labelCount - 1; i4 >= 0; i4--) {
        const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i4));
        const { color: color2, lineWidth } = optsAtIndex;
        if (!lineWidth || !color2) {
          continue;
        }
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color2;
        ctx.setLineDash(optsAtIndex.borderDash);
        ctx.lineDashOffset = optsAtIndex.borderDashOffset;
        offset = this.getDistanceFromCenterForValue(opts.reverse ? this.min : this.max);
        position = this.getPointPosition(i4, offset);
        ctx.beginPath();
        ctx.moveTo(this.xCenter, this.yCenter);
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
      }
      ctx.restore();
    }
  }
  drawBorder() {
  }
  drawLabels() {
    const ctx = this.ctx;
    const opts = this.options;
    const tickOpts = opts.ticks;
    if (!tickOpts.display) {
      return;
    }
    const startAngle = this.getIndexAngle(0);
    let offset, width;
    ctx.save();
    ctx.translate(this.xCenter, this.yCenter);
    ctx.rotate(startAngle);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    this.ticks.forEach((tick, index2) => {
      if (index2 === 0 && this.min >= 0 && !opts.reverse) {
        return;
      }
      const optsAtIndex = tickOpts.setContext(this.getContext(index2));
      const tickFont = toFont(optsAtIndex.font);
      offset = this.getDistanceFromCenterForValue(this.ticks[index2].value);
      if (optsAtIndex.showLabelBackdrop) {
        ctx.font = tickFont.string;
        width = ctx.measureText(tick.label).width;
        ctx.fillStyle = optsAtIndex.backdropColor;
        const padding = toPadding(optsAtIndex.backdropPadding);
        ctx.fillRect(-width / 2 - padding.left, -offset - tickFont.size / 2 - padding.top, width + padding.width, tickFont.size + padding.height);
      }
      renderText(ctx, tick.label, 0, -offset, tickFont, {
        color: optsAtIndex.color,
        strokeColor: optsAtIndex.textStrokeColor,
        strokeWidth: optsAtIndex.textStrokeWidth
      });
    });
    ctx.restore();
  }
  drawTitle() {
  }
};
__publicField(RadialLinearScale, "id", "radialLinear");
__publicField(RadialLinearScale, "defaults", {
  display: true,
  animate: true,
  position: "chartArea",
  angleLines: {
    display: true,
    lineWidth: 1,
    borderDash: [],
    borderDashOffset: 0
  },
  grid: {
    circular: false
  },
  startAngle: 0,
  ticks: {
    showLabelBackdrop: true,
    callback: Ticks.formatters.numeric
  },
  pointLabels: {
    backdropColor: void 0,
    backdropPadding: 2,
    display: true,
    font: {
      size: 10
    },
    callback(label) {
      return label;
    },
    padding: 5,
    centerPointLabels: false
  }
});
__publicField(RadialLinearScale, "defaultRoutes", {
  "angleLines.color": "borderColor",
  "pointLabels.color": "color",
  "ticks.color": "color"
});
__publicField(RadialLinearScale, "descriptors", {
  angleLines: {
    _fallback: "grid"
  }
});
var INTERVALS = {
  millisecond: {
    common: true,
    size: 1,
    steps: 1e3
  },
  second: {
    common: true,
    size: 1e3,
    steps: 60
  },
  minute: {
    common: true,
    size: 6e4,
    steps: 60
  },
  hour: {
    common: true,
    size: 36e5,
    steps: 24
  },
  day: {
    common: true,
    size: 864e5,
    steps: 30
  },
  week: {
    common: false,
    size: 6048e5,
    steps: 4
  },
  month: {
    common: true,
    size: 2628e6,
    steps: 12
  },
  quarter: {
    common: false,
    size: 7884e6,
    steps: 4
  },
  year: {
    common: true,
    size: 3154e7
  }
};
var UNITS = /* @__PURE__ */ Object.keys(INTERVALS);
function sorter(a3, b2) {
  return a3 - b2;
}
function parse(scale, input) {
  if (isNullOrUndef(input)) {
    return null;
  }
  const adapter = scale._adapter;
  const { parser, round: round2, isoWeekday } = scale._parseOpts;
  let value = input;
  if (typeof parser === "function") {
    value = parser(value);
  }
  if (!isNumberFinite(value)) {
    value = typeof parser === "string" ? adapter.parse(value, parser) : adapter.parse(value);
  }
  if (value === null) {
    return null;
  }
  if (round2) {
    value = round2 === "week" && (isNumber(isoWeekday) || isoWeekday === true) ? adapter.startOf(value, "isoWeek", isoWeekday) : adapter.startOf(value, round2);
  }
  return +value;
}
function determineUnitForAutoTicks(minUnit, min, max, capacity) {
  const ilen = UNITS.length;
  for (let i4 = UNITS.indexOf(minUnit); i4 < ilen - 1; ++i4) {
    const interval = INTERVALS[UNITS[i4]];
    const factor = interval.steps ? interval.steps : Number.MAX_SAFE_INTEGER;
    if (interval.common && Math.ceil((max - min) / (factor * interval.size)) <= capacity) {
      return UNITS[i4];
    }
  }
  return UNITS[ilen - 1];
}
function determineUnitForFormatting(scale, numTicks, minUnit, min, max) {
  for (let i4 = UNITS.length - 1; i4 >= UNITS.indexOf(minUnit); i4--) {
    const unit = UNITS[i4];
    if (INTERVALS[unit].common && scale._adapter.diff(max, min, unit) >= numTicks - 1) {
      return unit;
    }
  }
  return UNITS[minUnit ? UNITS.indexOf(minUnit) : 0];
}
function determineMajorUnit(unit) {
  for (let i4 = UNITS.indexOf(unit) + 1, ilen = UNITS.length; i4 < ilen; ++i4) {
    if (INTERVALS[UNITS[i4]].common) {
      return UNITS[i4];
    }
  }
}
function addTick(ticks, time, timestamps) {
  if (!timestamps) {
    ticks[time] = true;
  } else if (timestamps.length) {
    const { lo, hi } = _lookup(timestamps, time);
    const timestamp = timestamps[lo] >= time ? timestamps[lo] : timestamps[hi];
    ticks[timestamp] = true;
  }
}
function setMajorTicks(scale, ticks, map3, majorUnit) {
  const adapter = scale._adapter;
  const first = +adapter.startOf(ticks[0].value, majorUnit);
  const last = ticks[ticks.length - 1].value;
  let major, index2;
  for (major = first; major <= last; major = +adapter.add(major, 1, majorUnit)) {
    index2 = map3[major];
    if (index2 >= 0) {
      ticks[index2].major = true;
    }
  }
  return ticks;
}
function ticksFromTimestamps(scale, values, majorUnit) {
  const ticks = [];
  const map3 = {};
  const ilen = values.length;
  let i4, value;
  for (i4 = 0; i4 < ilen; ++i4) {
    value = values[i4];
    map3[value] = i4;
    ticks.push({
      value,
      major: false
    });
  }
  return ilen === 0 || !majorUnit ? ticks : setMajorTicks(scale, ticks, map3, majorUnit);
}
var TimeScale = class extends Scale {
  constructor(props) {
    super(props);
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
    this._unit = "day";
    this._majorUnit = void 0;
    this._offsets = {};
    this._normalized = false;
    this._parseOpts = void 0;
  }
  init(scaleOpts, opts = {}) {
    const time = scaleOpts.time || (scaleOpts.time = {});
    const adapter = this._adapter = new adapters._date(scaleOpts.adapters.date);
    adapter.init(opts);
    mergeIf(time.displayFormats, adapter.formats());
    this._parseOpts = {
      parser: time.parser,
      round: time.round,
      isoWeekday: time.isoWeekday
    };
    super.init(scaleOpts);
    this._normalized = opts.normalized;
  }
  parse(raw, index2) {
    if (raw === void 0) {
      return null;
    }
    return parse(this, raw);
  }
  beforeLayout() {
    super.beforeLayout();
    this._cache = {
      data: [],
      labels: [],
      all: []
    };
  }
  determineDataLimits() {
    const options = this.options;
    const adapter = this._adapter;
    const unit = options.time.unit || "day";
    let { min, max, minDefined, maxDefined } = this.getUserBounds();
    function _applyBounds(bounds) {
      if (!minDefined && !isNaN(bounds.min)) {
        min = Math.min(min, bounds.min);
      }
      if (!maxDefined && !isNaN(bounds.max)) {
        max = Math.max(max, bounds.max);
      }
    }
    if (!minDefined || !maxDefined) {
      _applyBounds(this._getLabelBounds());
      if (options.bounds !== "ticks" || options.ticks.source !== "labels") {
        _applyBounds(this.getMinMax(false));
      }
    }
    min = isNumberFinite(min) && !isNaN(min) ? min : +adapter.startOf(Date.now(), unit);
    max = isNumberFinite(max) && !isNaN(max) ? max : +adapter.endOf(Date.now(), unit) + 1;
    this.min = Math.min(min, max - 1);
    this.max = Math.max(min + 1, max);
  }
  _getLabelBounds() {
    const arr = this.getLabelTimestamps();
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    if (arr.length) {
      min = arr[0];
      max = arr[arr.length - 1];
    }
    return {
      min,
      max
    };
  }
  buildTicks() {
    const options = this.options;
    const timeOpts = options.time;
    const tickOpts = options.ticks;
    const timestamps = tickOpts.source === "labels" ? this.getLabelTimestamps() : this._generate();
    if (options.bounds === "ticks" && timestamps.length) {
      this.min = this._userMin || timestamps[0];
      this.max = this._userMax || timestamps[timestamps.length - 1];
    }
    const min = this.min;
    const max = this.max;
    const ticks = _filterBetween(timestamps, min, max);
    this._unit = timeOpts.unit || (tickOpts.autoSkip ? determineUnitForAutoTicks(timeOpts.minUnit, this.min, this.max, this._getLabelCapacity(min)) : determineUnitForFormatting(this, ticks.length, timeOpts.minUnit, this.min, this.max));
    this._majorUnit = !tickOpts.major.enabled || this._unit === "year" ? void 0 : determineMajorUnit(this._unit);
    this.initOffsets(timestamps);
    if (options.reverse) {
      ticks.reverse();
    }
    return ticksFromTimestamps(this, ticks, this._majorUnit);
  }
  afterAutoSkip() {
    if (this.options.offsetAfterAutoskip) {
      this.initOffsets(this.ticks.map((tick) => +tick.value));
    }
  }
  initOffsets(timestamps = []) {
    let start = 0;
    let end = 0;
    let first, last;
    if (this.options.offset && timestamps.length) {
      first = this.getDecimalForValue(timestamps[0]);
      if (timestamps.length === 1) {
        start = 1 - first;
      } else {
        start = (this.getDecimalForValue(timestamps[1]) - first) / 2;
      }
      last = this.getDecimalForValue(timestamps[timestamps.length - 1]);
      if (timestamps.length === 1) {
        end = last;
      } else {
        end = (last - this.getDecimalForValue(timestamps[timestamps.length - 2])) / 2;
      }
    }
    const limit = timestamps.length < 3 ? 0.5 : 0.25;
    start = _limitValue(start, 0, limit);
    end = _limitValue(end, 0, limit);
    this._offsets = {
      start,
      end,
      factor: 1 / (start + 1 + end)
    };
  }
  _generate() {
    const adapter = this._adapter;
    const min = this.min;
    const max = this.max;
    const options = this.options;
    const timeOpts = options.time;
    const minor = timeOpts.unit || determineUnitForAutoTicks(timeOpts.minUnit, min, max, this._getLabelCapacity(min));
    const stepSize = valueOrDefault(options.ticks.stepSize, 1);
    const weekday = minor === "week" ? timeOpts.isoWeekday : false;
    const hasWeekday = isNumber(weekday) || weekday === true;
    const ticks = {};
    let first = min;
    let time, count;
    if (hasWeekday) {
      first = +adapter.startOf(first, "isoWeek", weekday);
    }
    first = +adapter.startOf(first, hasWeekday ? "day" : minor);
    if (adapter.diff(max, min, minor) > 1e5 * stepSize) {
      throw new Error(min + " and " + max + " are too far apart with stepSize of " + stepSize + " " + minor);
    }
    const timestamps = options.ticks.source === "data" && this.getDataTimestamps();
    for (time = first, count = 0; time < max; time = +adapter.add(time, stepSize, minor), count++) {
      addTick(ticks, time, timestamps);
    }
    if (time === max || options.bounds === "ticks" || count === 1) {
      addTick(ticks, time, timestamps);
    }
    return Object.keys(ticks).sort(sorter).map((x3) => +x3);
  }
  getLabelForValue(value) {
    const adapter = this._adapter;
    const timeOpts = this.options.time;
    if (timeOpts.tooltipFormat) {
      return adapter.format(value, timeOpts.tooltipFormat);
    }
    return adapter.format(value, timeOpts.displayFormats.datetime);
  }
  format(value, format) {
    const options = this.options;
    const formats = options.time.displayFormats;
    const unit = this._unit;
    const fmt = format || formats[unit];
    return this._adapter.format(value, fmt);
  }
  _tickFormatFunction(time, index2, ticks, format) {
    const options = this.options;
    const formatter = options.ticks.callback;
    if (formatter) {
      return callback(formatter, [
        time,
        index2,
        ticks
      ], this);
    }
    const formats = options.time.displayFormats;
    const unit = this._unit;
    const majorUnit = this._majorUnit;
    const minorFormat = unit && formats[unit];
    const majorFormat = majorUnit && formats[majorUnit];
    const tick = ticks[index2];
    const major = majorUnit && majorFormat && tick && tick.major;
    return this._adapter.format(time, format || (major ? majorFormat : minorFormat));
  }
  generateTickLabels(ticks) {
    let i4, ilen, tick;
    for (i4 = 0, ilen = ticks.length; i4 < ilen; ++i4) {
      tick = ticks[i4];
      tick.label = this._tickFormatFunction(tick.value, i4, ticks);
    }
  }
  getDecimalForValue(value) {
    return value === null ? NaN : (value - this.min) / (this.max - this.min);
  }
  getPixelForValue(value) {
    const offsets = this._offsets;
    const pos = this.getDecimalForValue(value);
    return this.getPixelForDecimal((offsets.start + pos) * offsets.factor);
  }
  getValueForPixel(pixel) {
    const offsets = this._offsets;
    const pos = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
    return this.min + pos * (this.max - this.min);
  }
  _getLabelSize(label) {
    const ticksOpts = this.options.ticks;
    const tickLabelWidth = this.ctx.measureText(label).width;
    const angle = toRadians(this.isHorizontal() ? ticksOpts.maxRotation : ticksOpts.minRotation);
    const cosRotation = Math.cos(angle);
    const sinRotation = Math.sin(angle);
    const tickFontSize = this._resolveTickFontOptions(0).size;
    return {
      w: tickLabelWidth * cosRotation + tickFontSize * sinRotation,
      h: tickLabelWidth * sinRotation + tickFontSize * cosRotation
    };
  }
  _getLabelCapacity(exampleTime) {
    const timeOpts = this.options.time;
    const displayFormats = timeOpts.displayFormats;
    const format = displayFormats[timeOpts.unit] || displayFormats.millisecond;
    const exampleLabel = this._tickFormatFunction(exampleTime, 0, ticksFromTimestamps(this, [
      exampleTime
    ], this._majorUnit), format);
    const size = this._getLabelSize(exampleLabel);
    const capacity = Math.floor(this.isHorizontal() ? this.width / size.w : this.height / size.h) - 1;
    return capacity > 0 ? capacity : 1;
  }
  getDataTimestamps() {
    let timestamps = this._cache.data || [];
    let i4, ilen;
    if (timestamps.length) {
      return timestamps;
    }
    const metas = this.getMatchingVisibleMetas();
    if (this._normalized && metas.length) {
      return this._cache.data = metas[0].controller.getAllParsedValues(this);
    }
    for (i4 = 0, ilen = metas.length; i4 < ilen; ++i4) {
      timestamps = timestamps.concat(metas[i4].controller.getAllParsedValues(this));
    }
    return this._cache.data = this.normalize(timestamps);
  }
  getLabelTimestamps() {
    const timestamps = this._cache.labels || [];
    let i4, ilen;
    if (timestamps.length) {
      return timestamps;
    }
    const labels = this.getLabels();
    for (i4 = 0, ilen = labels.length; i4 < ilen; ++i4) {
      timestamps.push(parse(this, labels[i4]));
    }
    return this._cache.labels = this._normalized ? timestamps : this.normalize(timestamps);
  }
  normalize(values) {
    return _arrayUnique(values.sort(sorter));
  }
};
__publicField(TimeScale, "id", "time");
__publicField(TimeScale, "defaults", {
  bounds: "data",
  adapters: {},
  time: {
    parser: false,
    unit: false,
    round: false,
    isoWeekday: false,
    minUnit: "millisecond",
    displayFormats: {}
  },
  ticks: {
    source: "auto",
    callback: false,
    major: {
      enabled: false
    }
  }
});
function interpolate2(table, val, reverse) {
  let lo = 0;
  let hi = table.length - 1;
  let prevSource, nextSource, prevTarget, nextTarget;
  if (reverse) {
    if (val >= table[lo].pos && val <= table[hi].pos) {
      ({ lo, hi } = _lookupByKey(table, "pos", val));
    }
    ({ pos: prevSource, time: prevTarget } = table[lo]);
    ({ pos: nextSource, time: nextTarget } = table[hi]);
  } else {
    if (val >= table[lo].time && val <= table[hi].time) {
      ({ lo, hi } = _lookupByKey(table, "time", val));
    }
    ({ time: prevSource, pos: prevTarget } = table[lo]);
    ({ time: nextSource, pos: nextTarget } = table[hi]);
  }
  const span = nextSource - prevSource;
  return span ? prevTarget + (nextTarget - prevTarget) * (val - prevSource) / span : prevTarget;
}
var TimeSeriesScale = class extends TimeScale {
  constructor(props) {
    super(props);
    this._table = [];
    this._minPos = void 0;
    this._tableRange = void 0;
  }
  initOffsets() {
    const timestamps = this._getTimestampsForTable();
    const table = this._table = this.buildLookupTable(timestamps);
    this._minPos = interpolate2(table, this.min);
    this._tableRange = interpolate2(table, this.max) - this._minPos;
    super.initOffsets(timestamps);
  }
  buildLookupTable(timestamps) {
    const { min, max } = this;
    const items = [];
    const table = [];
    let i4, ilen, prev, curr, next;
    for (i4 = 0, ilen = timestamps.length; i4 < ilen; ++i4) {
      curr = timestamps[i4];
      if (curr >= min && curr <= max) {
        items.push(curr);
      }
    }
    if (items.length < 2) {
      return [
        {
          time: min,
          pos: 0
        },
        {
          time: max,
          pos: 1
        }
      ];
    }
    for (i4 = 0, ilen = items.length; i4 < ilen; ++i4) {
      next = items[i4 + 1];
      prev = items[i4 - 1];
      curr = items[i4];
      if (Math.round((next + prev) / 2) !== curr) {
        table.push({
          time: curr,
          pos: i4 / (ilen - 1)
        });
      }
    }
    return table;
  }
  _generate() {
    const min = this.min;
    const max = this.max;
    let timestamps = super.getDataTimestamps();
    if (!timestamps.includes(min) || !timestamps.length) {
      timestamps.splice(0, 0, min);
    }
    if (!timestamps.includes(max) || timestamps.length === 1) {
      timestamps.push(max);
    }
    return timestamps.sort((a3, b2) => a3 - b2);
  }
  _getTimestampsForTable() {
    let timestamps = this._cache.all || [];
    if (timestamps.length) {
      return timestamps;
    }
    const data = this.getDataTimestamps();
    const label = this.getLabelTimestamps();
    if (data.length && label.length) {
      timestamps = this.normalize(data.concat(label));
    } else {
      timestamps = data.length ? data : label;
    }
    timestamps = this._cache.all = timestamps;
    return timestamps;
  }
  getDecimalForValue(value) {
    return (interpolate2(this._table, value) - this._minPos) / this._tableRange;
  }
  getValueForPixel(pixel) {
    const offsets = this._offsets;
    const decimal = this.getDecimalForPixel(pixel) / offsets.factor - offsets.end;
    return interpolate2(this._table, decimal * this._tableRange + this._minPos, true);
  }
};
__publicField(TimeSeriesScale, "id", "timeseries");
__publicField(TimeSeriesScale, "defaults", TimeScale.defaults);
var scales = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale
});
var registerables = [
  controllers,
  elements,
  plugins,
  scales
];

// src/utils/theme.ts
function getCSSVar(varName, fallback = "#000000") {
  const root = document.body || document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(varName).trim();
  return value || fallback;
}
function getAccentColor() {
  const tempEl = document.createElement("div");
  tempEl.style.position = "absolute";
  tempEl.style.visibility = "hidden";
  document.body.appendChild(tempEl);
  let accentColor = getComputedStyle(tempEl).getPropertyValue(CSS_VARIABLES.INTERACTIVE_ACCENT).trim();
  if (!accentColor) {
    accentColor = getComputedStyle(tempEl).getPropertyValue(CSS_VARIABLES.COLOR_ACCENT).trim();
  }
  if (!accentColor) {
    accentColor = getComputedStyle(tempEl).getPropertyValue(CSS_VARIABLES.ACCENT_COLOR).trim();
  }
  document.body.removeChild(tempEl);
  if (!accentColor) {
    const root = document.body || document.documentElement;
    accentColor = getComputedStyle(root).getPropertyValue(CSS_VARIABLES.INTERACTIVE_ACCENT).trim();
  }
  if (!accentColor) {
    accentColor = FALLBACK_COLORS.ACCENT;
  }
  return accentColor;
}
function getThemeColors() {
  const accentColor = getAccentColor();
  return {
    accentColor,
    textMuted: getCSSVar(CSS_VARIABLES.TEXT_MUTED, FALLBACK_COLORS.TEXT_MUTED),
    textFaint: getCSSVar(CSS_VARIABLES.TEXT_FAINT, FALLBACK_COLORS.TEXT_FAINT),
    borderColor: getCSSVar(CSS_VARIABLES.BACKGROUND_MODIFIER_BORDER, FALLBACK_COLORS.BORDER),
    bgPrimary: getCSSVar(CSS_VARIABLES.BACKGROUND_PRIMARY, FALLBACK_COLORS.BG_PRIMARY),
    errorColor: getCSSVar(CSS_VARIABLES.TEXT_ERROR, FALLBACK_COLORS.TEXT_ERROR),
    successColor: getCSSVar(CSS_VARIABLES.TEXT_SUCCESS, FALLBACK_COLORS.TEXT_SUCCESS),
    startLineColor: getCSSVar(CSS_VARIABLES.TEXT_ACCENT, accentColor)
  };
}
function colorToRgba(color2, alpha2) {
  if (color2.startsWith("#")) {
    const r3 = parseInt(color2.slice(1, 3), 16);
    const g4 = parseInt(color2.slice(3, 5), 16);
    const b2 = parseInt(color2.slice(5, 7), 16);
    return `rgba(${r3}, ${g4}, ${b2}, ${alpha2})`;
  } else if (color2.startsWith("rgb")) {
    return color2.replace("rgb", "rgba").replace(")", `, ${alpha2})`);
  }
  return color2;
}

// src/services/chart-service.ts
var ChartService = class {
  /**
   * Prepares chart data from file entries
   */
  prepareChartData(entries, file, settings, options, startTrackingDateStr, todayStr) {
    const { dateIso, daysToShow, metricType, minLimit, maxLimit, scaleMinValue, scaleMaxValue } = options;
    const activeDate = dateIso ? DateService.parse(dateIso, DATE_FORMATS.ISO) : DateService.now();
    const endDate = activeDate.clone().add(CHART_CONFIG.FUTURE_DAYS_OFFSET, "days");
    const startDate = endDate.clone().subtract(daysToShow - 1, "days");
    const activeDateStr = DateService.format(activeDate, settings.dateFormat);
    const colors2 = getThemeColors();
    const labels = [];
    const values = [];
    const pointBackgroundColors = [];
    const pointBorderColors = [];
    const pointRadii = [];
    const pointBorderWidths = [];
    const dateStrings = [];
    let maxValue = 0;
    let startTrackingIndex = null;
    let activeDateIndex = null;
    for (let i4 = 0; i4 < daysToShow; i4++) {
      const date = startDate.clone().add(i4, "days");
      const dateStr = DateService.format(date, settings.dateFormat);
      if (dateStr === startTrackingDateStr) {
        startTrackingIndex = i4;
      }
      if (dateStr === activeDateStr) {
        activeDateIndex = i4;
      }
      let label = "";
      const m3 = window.moment;
      if (m3) {
        label = m3(date.toDate()).format(DATE_FORMATS.DISPLAY_SHORT);
      } else {
        const day = date.getDate();
        const month = date.toDate().toLocaleDateString("ru", { month: "short" });
        label = `${day} ${month}`;
      }
      labels.push(label);
      dateStrings.push(dateStr);
      const val = entries.get(dateStr);
      let numVal = 0;
      if (val != null) {
        if (metricType === TrackerType.TEXT) {
          numVal = countWords(String(val));
        } else if (typeof val === "number") {
          numVal = val;
        } else if (val === "1" || String(val) === "true") {
          numVal = 1;
        } else {
          numVal = Number(val) || 0;
        }
      }
      values.push(numVal);
      maxValue = Math.max(maxValue, numVal);
      let pointColor = colors2.accentColor;
      let pointBorder = colors2.accentColor;
      const isAfterToday = dateStr > todayStr;
      const hasLimits = minLimit !== null || maxLimit !== null;
      if (!isAfterToday && startTrackingIndex !== null && i4 >= startTrackingIndex && hasLimits) {
        const isInRange = (minLimit === null || numVal >= minLimit) && (maxLimit === null || numVal <= maxLimit);
        if (isInRange) {
          pointColor = colors2.successColor;
          pointBorder = colors2.successColor;
        } else {
          pointColor = colors2.errorColor;
          pointBorder = colors2.errorColor;
        }
      }
      pointBackgroundColors.push(pointColor);
      pointBorderColors.push(pointBorder);
      pointRadii.push(CHART_CONFIG.POINT_RADIUS);
      pointBorderWidths.push(CHART_CONFIG.POINT_BORDER_WIDTH);
    }
    let yAxisMin = 0;
    let yAxisMax = maxValue;
    const allMinValues = [];
    if (minLimit !== null) allMinValues.push(minLimit);
    if (scaleMinValue !== null) allMinValues.push(scaleMinValue);
    if (allMinValues.length > 0) {
      const minFromAll = Math.min(...allMinValues);
      yAxisMin = Math.min(yAxisMin, minFromAll);
    }
    const allMaxValues = [maxValue];
    if (maxLimit !== null) allMaxValues.push(maxLimit);
    if (minLimit !== null && maxLimit === null) {
      allMaxValues.push(minLimit * 2);
    }
    if (scaleMaxValue !== null) allMaxValues.push(scaleMaxValue);
    if (allMaxValues.length > 0) {
      const maxFromAll = Math.max(...allMaxValues);
      yAxisMax = Math.max(yAxisMax, maxFromAll);
    }
    return {
      labels,
      values,
      pointBackgroundColors,
      pointBorderColors,
      pointRadii,
      pointBorderWidths,
      dateStrings,
      startTrackingIndex,
      activeDateIndex,
      maxValue,
      yAxisMin,
      yAxisMax
    };
  }
  /**
   * Creates Chart.js configuration
   */
  createChartConfig(data, colors2, options, onChartClick) {
    const { metricType, unit, minLimit, maxLimit, scaleMinValue, scaleMaxValue } = options;
    let chartLabel;
    if (unit) {
      chartLabel = unit.charAt(0).toUpperCase() + unit.slice(1);
    } else {
      chartLabel = metricType === TrackerType.TEXT ? "Word count" : "Value";
    }
    const config = {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [{
          label: chartLabel,
          data: data.values,
          borderColor: colors2.accentColor,
          backgroundColor: colorToRgba(colors2.accentColor, 0.1),
          borderWidth: CHART_CONFIG.BORDER_WIDTH,
          fill: false,
          tension: CHART_CONFIG.LINE_TENSION,
          pointRadius: data.pointRadii,
          pointBackgroundColor: data.pointBackgroundColors,
          pointBorderColor: data.pointBorderColors,
          pointBorderWidth: data.pointBorderWidths,
          pointHoverRadius: CHART_CONFIG.POINT_HOVER_RADIUS,
          pointHitRadius: CHART_CONFIG.POINT_HIT_RADIUS,
          pointHoverBackgroundColor: (ctx) => {
            const index2 = ctx.dataIndex;
            return data.pointBackgroundColors[index2] || colors2.accentColor;
          },
          pointHoverBorderColor: (ctx) => {
            const index2 = ctx.dataIndex;
            return data.pointBorderColors[index2] || colors2.accentColor;
          },
          pointHoverBorderWidth: (ctx) => {
            const index2 = ctx.dataIndex;
            return data.pointBorderWidths[index2] || CHART_CONFIG.POINT_BORDER_WIDTH;
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: colors2.bgPrimary,
            titleColor: colors2.textMuted,
            bodyColor: colors2.textMuted,
            borderColor: colors2.borderColor,
            borderWidth: 1,
            padding: 8,
            displayColors: false,
            callbacks: {
              label: (context) => {
                const value = context.parsed.y;
                if (unit) {
                  const capitalizedUnit = unit.charAt(0).toUpperCase() + unit.slice(1);
                  return `${capitalizedUnit}: ${value}`;
                }
                return `${chartLabel}: ${value}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: colorToRgba(colors2.borderColor, 0.3),
              lineWidth: CHART_CONFIG.GRID_LINE_WIDTH,
              drawBorder: false
            },
            ticks: {
              color: colors2.textFaint,
              font: {
                family: "var(--font-text)",
                size: CHART_CONFIG.FONT_SIZE_SMALL
              },
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: CHART_CONFIG.MAX_TICKS_LIMIT
            }
          },
          y: {
            grid: {
              display: true,
              color: colorToRgba(colors2.borderColor, 0.3),
              lineWidth: CHART_CONFIG.GRID_LINE_WIDTH,
              drawBorder: false
            },
            ticks: {
              color: colors2.textFaint,
              font: {
                family: "var(--font-text)",
                size: CHART_CONFIG.FONT_SIZE_SMALL
              }
            },
            beginAtZero: !minLimit && !maxLimit && !scaleMinValue && !scaleMaxValue,
            min: minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null ? data.yAxisMin : void 0,
            max: minLimit !== null || maxLimit !== null || scaleMinValue !== null || scaleMaxValue !== null ? data.yAxisMax : void 0
          }
        },
        interaction: {
          intersect: false,
          mode: "index"
        },
        elements: {
          point: {
            hoverBackgroundColor: void 0,
            hoverBorderColor: void 0,
            hoverRadius: CHART_CONFIG.POINT_HOVER_RADIUS,
            hoverBorderWidth: void 0
          }
        },
        onClick: (event, elements2, chart) => {
          if (elements2 && elements2.length > 0) {
            const element = elements2[0];
            const pointIndex = element.index;
            const dateStrings = chart.dateStrings;
            if (dateStrings && pointIndex >= 0 && pointIndex < dateStrings.length) {
              const clickedDateStr = dateStrings[pointIndex];
              onChartClick(clickedDateStr);
            }
          }
        },
        onResize: (chart) => {
          this.drawChartAnnotations(chart, data, colors2, minLimit, maxLimit);
        }
      },
      plugins: [{
        id: "startLinePlugin",
        beforeDraw: (chart) => {
          this.drawChartAnnotations(chart, data, colors2, minLimit, maxLimit);
        }
      }]
    };
    return config;
  }
  /**
   * Draws annotations (vertical lines, limit lines) on chart
   */
  drawChartAnnotations(chart, data, colors2, minLimit, maxLimit) {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    if (!chartArea) return;
    if (data.startTrackingIndex !== null && data.startTrackingIndex !== data.activeDateIndex) {
      this.drawVerticalLine(
        chart,
        data.startTrackingIndex,
        colors2.startLineColor,
        true
        // dashed
      );
    }
    if (data.activeDateIndex !== null) {
      this.drawVerticalLine(
        chart,
        data.activeDateIndex,
        colors2.startLineColor,
        false
        // solid
      );
    }
    if (minLimit !== null) {
      this.drawHorizontalLine(chart, minLimit, colors2.startLineColor);
    }
    if (maxLimit !== null) {
      this.drawHorizontalLine(chart, maxLimit, colors2.startLineColor);
    }
  }
  /**
   * Draws a vertical line on chart
   */
  drawVerticalLine(chart, index2, color2, dashed) {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    if (!chartArea) return;
    const xScale = chart.scales.x;
    const xPos = xScale.getPixelForValue(index2);
    if (xPos < chartArea.left || xPos > chartArea.right) return;
    ctx.save();
    ctx.strokeStyle = colorToRgba(color2, 0.6);
    ctx.lineWidth = 2;
    ctx.setLineDash(dashed ? [5, 5] : []);
    ctx.beginPath();
    ctx.moveTo(xPos, chartArea.top);
    ctx.lineTo(xPos, chartArea.bottom);
    ctx.stroke();
    ctx.restore();
  }
  /**
   * Draws a horizontal line on chart
   */
  drawHorizontalLine(chart, value, color2) {
    const ctx = chart.ctx;
    const chartArea = chart.chartArea;
    if (!chartArea) return;
    const yScale = chart.scales.y;
    const yPos = yScale.getPixelForValue(value);
    if (yPos < chartArea.top || yPos > chartArea.bottom) return;
    ctx.save();
    ctx.strokeStyle = colorToRgba(color2, 0.6);
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(chartArea.left, yPos);
    ctx.lineTo(chartArea.right, yPos);
    ctx.stroke();
    ctx.restore();
  }
};

// src/components/Chart/ChartWrapper.tsx
Chart.register(...registerables);
function ChartWrapper({
  file,
  plugin,
  dateIso,
  daysToShow,
  entries,
  fileOptions,
  onDateClick
}) {
  const canvasRef = A2(null);
  const chartRef = A2(null);
  const chartService = T2(() => new ChartService(), []);
  const trackerType = (fileOptions?.mode ?? TrackerType.GOOD_HABIT).toLowerCase();
  const unit = fileOptions?.unit || "";
  const minLimit = fileOptions?.minLimit ? parseFloat(fileOptions.minLimit) : null;
  const maxLimit = fileOptions?.maxLimit ? parseFloat(fileOptions.maxLimit) : null;
  const scaleMinValue = fileOptions?.minValue ? parseFloat(fileOptions.minValue) : null;
  const scaleMaxValue = fileOptions?.maxValue ? parseFloat(fileOptions.maxValue) : null;
  const startTrackingDateStr = T2(() => {
    return plugin.getStartTrackingDate(entries, fileOptions);
  }, [plugin, entries, fileOptions]);
  const handleChartClick = q2((dateStr) => {
    if (onDateClick) {
      onDateClick(dateStr);
    }
  }, [onDateClick]);
  const prevConfigRef = A2(null);
  y2(() => {
    if (!canvasRef.current) return;
    const colors2 = getThemeColors();
    const todayStr = DateService.format(DateService.now(), plugin.settings.dateFormat);
    const chartData = chartService.prepareChartData(
      entries,
      file,
      plugin.settings,
      {
        dateIso,
        daysToShow,
        metricType: trackerType,
        unit,
        minLimit,
        maxLimit,
        scaleMinValue,
        scaleMaxValue
      },
      startTrackingDateStr,
      todayStr
    );
    const currentConfig = {
      trackerType,
      unit,
      minLimit,
      maxLimit,
      scaleMinValue,
      scaleMaxValue
    };
    const canUpdate = chartRef.current && prevConfigRef.current && prevConfigRef.current.trackerType === currentConfig.trackerType && prevConfigRef.current.unit === currentConfig.unit && prevConfigRef.current.minLimit === currentConfig.minLimit && prevConfigRef.current.maxLimit === currentConfig.maxLimit && prevConfigRef.current.scaleMinValue === currentConfig.scaleMinValue && prevConfigRef.current.scaleMaxValue === currentConfig.scaleMaxValue;
    if (canUpdate && chartRef.current) {
      const config = chartService.createChartConfig(
        chartData,
        colors2,
        {
          dateIso,
          daysToShow,
          metricType: trackerType,
          unit,
          minLimit,
          maxLimit,
          scaleMinValue,
          scaleMaxValue
        },
        handleChartClick
      );
      chartRef.current.data = config.data;
      if (config.options) {
        Object.assign(chartRef.current.options, config.options);
      }
      chartRef.current.dateStrings = chartData.dateStrings;
      chartRef.current.update("none");
    } else {
      const config = chartService.createChartConfig(
        chartData,
        colors2,
        {
          dateIso,
          daysToShow,
          metricType: trackerType,
          unit,
          minLimit,
          maxLimit,
          scaleMinValue,
          scaleMaxValue
        },
        handleChartClick
      );
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        chartRef.current = new Chart(ctx, config);
        chartRef.current.dateStrings = chartData.dateStrings;
      }
      prevConfigRef.current = currentConfig;
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [
    file,
    plugin,
    dateIso,
    daysToShow,
    entries,
    trackerType,
    unit,
    minLimit,
    maxLimit,
    scaleMinValue,
    scaleMaxValue,
    startTrackingDateStr,
    chartService,
    handleChartClick
  ]);
  return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.CHART, style: { height: `${CHART_CONFIG.DEFAULT_HEIGHT}px` }, children: /* @__PURE__ */ u3("canvas", { ref: canvasRef, height: CHART_CONFIG.CANVAS_HEIGHT }) });
}

// src/components/TrackerItem/TrackerItem.tsx
function TrackerItemComponent({ file, plugin, dateIso, viewMode, opts }) {
  const { onDateChange } = useTrackerContext();
  const [fileOptions, setFileOptions] = d2(null);
  const [entries, setEntries] = d2(/* @__PURE__ */ new Map());
  const [isLoading, setIsLoading] = d2(true);
  const loadData = q2(async () => {
    try {
      const [options, entriesData] = await Promise.all([
        plugin.getFileTypeFromFrontmatter(file),
        plugin.readAllEntries(file)
      ]);
      setFileOptions(options);
      setEntries(entriesData);
      setIsLoading(false);
    } catch (error) {
      console.error("TrackerItem: error loading data", error);
      setIsLoading(false);
    }
  }, [plugin, file]);
  y2(() => {
    loadData();
  }, [loadData, dateIso]);
  y2(() => {
    plugin.registerTrackerRefresh(file.path, loadData);
    return () => {
      plugin.unregisterTrackerRefresh(file.path);
    };
  }, [plugin, file.path, loadData]);
  const handleValueChange = q2(async () => {
    const entriesData = await plugin.readAllEntries(file);
    setEntries(entriesData);
  }, [plugin, file]);
  const trackerType = T2(() => {
    return (fileOptions?.mode ?? TrackerType.GOOD_HABIT).toLowerCase();
  }, [fileOptions]);
  const displayName = T2(() => {
    const baseName = file.basename;
    const unit = fileOptions?.unit || "";
    return unit ? `${baseName} (${unit})` : baseName;
  }, [file, fileOptions]);
  const {
    daysToShow: defaultDaysToShow,
    showChartByDefault,
    showStatsByDefault,
    hideChartOnMobile,
    hideStatsOnMobile
  } = plugin.settings;
  const daysToShow = parseInt(opts.days) || defaultDaysToShow;
  const isHabitType = T2(() => {
    return trackerType === TrackerType.GOOD_HABIT || trackerType === TrackerType.BAD_HABIT;
  }, [trackerType]);
  const shouldShowChart = T2(() => {
    if (isHabitType) return false;
    const showChart = opts.showChart === "true" || opts.showChart === void 0 && showChartByDefault;
    const hideOnMobile = plugin.isMobileDevice() && hideChartOnMobile;
    return showChart && !hideOnMobile;
  }, [opts.showChart, isHabitType, showChartByDefault, hideChartOnMobile, plugin]);
  const shouldShowStats = T2(() => {
    const showStats = opts.showStats === "true" || opts.showStats === void 0 && showStatsByDefault;
    const hideOnMobile = plugin.isMobileDevice() && hideStatsOnMobile;
    return showStats && !hideOnMobile;
  }, [opts.showStats, showStatsByDefault, hideStatsOnMobile, plugin]);
  const handleEdit = q2(() => {
    plugin.openEditTrackerModal(file);
  }, [plugin, file]);
  const handleMoveUp = q2(async () => {
    await plugin.moveTrackerUp(file);
  }, [plugin, file]);
  const handleMoveDown = q2(async () => {
    await plugin.moveTrackerDown(file);
  }, [plugin, file]);
  const startTrackingDate = T2(() => {
    if (!fileOptions) return null;
    return plugin.getStartTrackingDate(entries, fileOptions);
  }, [plugin, entries, fileOptions]);
  const limitProgress = T2(() => {
    if (!fileOptions || plugin.settings.disableLimitReaction) return null;
    const minLimit = fileOptions.minLimit ? parseFloat(fileOptions.minLimit) : null;
    const maxLimit = fileOptions.maxLimit ? parseFloat(fileOptions.maxLimit) : null;
    if (minLimit === null && maxLimit === null) return null;
    const currentValue = entries.get(dateIso);
    const value = currentValue != null ? Number(currentValue) : null;
    if (value === null || isNaN(value)) {
      return { width: "0%", color: "transparent" };
    }
    let progressPercent = 0;
    let isExceedingMax = false;
    if (minLimit !== null && maxLimit !== null) {
      if (value >= minLimit && value <= maxLimit) {
        progressPercent = 100;
      } else if (value < minLimit) {
        progressPercent = Math.max(0, 100 * (value / minLimit));
      } else {
        progressPercent = 100;
        isExceedingMax = true;
      }
    } else if (maxLimit !== null) {
      if (value <= maxLimit) {
        progressPercent = 100;
      } else {
        progressPercent = 100;
        isExceedingMax = true;
      }
    } else if (minLimit !== null) {
      progressPercent = Math.min(100, Math.max(0, 100 * (value / minLimit)));
    }
    const hue2 = isExceedingMax ? 0 : 120 * (progressPercent / 100);
    const progressColor = `hsl(${hue2}, 70%, 50%)`;
    return {
      width: `${progressPercent}%`,
      color: progressColor
    };
  }, [fileOptions, plugin.settings.disableLimitReaction, entries, dateIso]);
  const renderControl = () => {
    if (isLoading || !fileOptions) return null;
    const controlProps = {
      file,
      dateIso,
      plugin,
      fileOptions,
      entries,
      onValueChange: handleValueChange
    };
    const isHabit = trackerType === TrackerType.GOOD_HABIT || trackerType === TrackerType.BAD_HABIT;
    if (isHabit) {
      return /* @__PURE__ */ u3(
        Heatmap,
        {
          ...controlProps,
          daysToShow,
          trackerType,
          startTrackingDate
        }
      );
    }
    switch (trackerType) {
      case TrackerType.NUMBER:
        return /* @__PURE__ */ u3(NumberControl, { ...controlProps });
      case TrackerType.PLUSMINUS:
        return /* @__PURE__ */ u3(PlusMinusControl, { ...controlProps });
      case TrackerType.TEXT:
        return /* @__PURE__ */ u3(TextControl, { ...controlProps });
      case TrackerType.SCALE:
        return /* @__PURE__ */ u3(ScaleControl, { ...controlProps });
      default:
        return /* @__PURE__ */ u3("div", { children: [
          "Unknown tracker type: ",
          trackerType
        ] });
    }
  };
  if (viewMode === ViewMode.DISPLAY) {
    const currentValue = entries.get(dateIso);
    return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.TRACKER, "data-file-path": file.path, children: [
      /* @__PURE__ */ u3(
        TrackerHeader,
        {
          file,
          displayName,
          plugin
        }
      ),
      /* @__PURE__ */ u3("div", { children: [
        dateIso,
        ": ",
        currentValue ?? "\u2014"
      ] }),
      shouldShowChart && fileOptions && /* @__PURE__ */ u3(
        ChartWrapper,
        {
          file,
          plugin,
          dateIso,
          daysToShow,
          entries,
          fileOptions,
          onDateClick: onDateChange
        }
      ),
      shouldShowStats && fileOptions && /* @__PURE__ */ u3(
        Statistics,
        {
          file,
          plugin,
          dateIso,
          daysToShow,
          trackerType,
          entries,
          fileOptions
        }
      )
    ] });
  }
  return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.TRACKER, "data-file-path": file.path, children: [
    /* @__PURE__ */ u3(
      TrackerHeader,
      {
        file,
        displayName,
        plugin,
        onEdit: handleEdit,
        onMoveUp: handleMoveUp,
        onMoveDown: handleMoveDown,
        limitProgress
      }
    ),
    /* @__PURE__ */ u3("div", { class: CSS_CLASSES.TRACKER_CONTROLS, children: renderControl() }),
    shouldShowChart && fileOptions && /* @__PURE__ */ u3(
      ChartWrapper,
      {
        file,
        plugin,
        dateIso,
        daysToShow,
        entries,
        fileOptions,
        onDateClick: onDateChange
      }
    ),
    shouldShowStats && fileOptions && /* @__PURE__ */ u3(
      Statistics,
      {
        file,
        plugin,
        dateIso,
        daysToShow,
        trackerType,
        entries,
        fileOptions
      }
    )
  ] });
}
var TrackerItem = M2(TrackerItemComponent, (prevProps, nextProps) => {
  if (prevProps.file.path !== nextProps.file.path) return false;
  if (prevProps.dateIso !== nextProps.dateIso) return false;
  if (prevProps.viewMode !== nextProps.viewMode) return false;
  if (prevProps.plugin !== nextProps.plugin) return false;
  const prevOpts = prevProps.opts;
  const nextOpts = nextProps.opts;
  const prevKeys = Object.keys(prevOpts);
  const nextKeys = Object.keys(nextOpts);
  if (prevKeys.length !== nextKeys.length) return false;
  for (const key of prevKeys) {
    if (prevOpts[key] !== nextOpts[key]) return false;
  }
  return true;
});

// src/components/TrackerBlock/FolderNode.tsx
function FolderNodeComponent({ node, plugin, dateIso, viewMode, opts }) {
  const nodeRef = A2(null);
  const shouldShowHeader = node.files.length > 0 || node.level > 0 && node.children.length > 0;
  const handleMoveUp = q2(async () => {
    const folderPath = normalizePath(node.path);
    await plugin.moveFolderUp(folderPath);
  }, [plugin, node.path]);
  const handleMoveDown = q2(async () => {
    const folderPath = normalizePath(node.path);
    await plugin.moveFolderDown(folderPath);
  }, [plugin, node.path]);
  const renderFolderIcon = q2(() => {
    const folderIcon = plugin.getIconForPath(node.path, false);
    if (!folderIcon) return null;
    const iconContainer = document.createElement("span");
    plugin.renderIcon(folderIcon, iconContainer);
    return /* @__PURE__ */ u3(
      "span",
      {
        class: "tracker-notes__folder-icon",
        ref: (el) => {
          if (el && iconContainer.firstChild) {
            el.innerHTML = "";
            el.appendChild(iconContainer.firstChild);
          }
        }
      }
    );
  }, [plugin, node.path]);
  return /* @__PURE__ */ u3(
    "div",
    {
      ref: nodeRef,
      class: `${CSS_CLASSES.FOLDER_NODE} level-${node.level}`,
      "data-folder-path": normalizePath(node.path),
      children: [
        shouldShowHeader && /* @__PURE__ */ u3("div", { class: `${CSS_CLASSES.FOLDER_HEADER} level-${node.level}`, children: [
          /* @__PURE__ */ u3("span", { children: [
            renderFolderIcon(),
            /* @__PURE__ */ u3("span", { children: node.name })
          ] }),
          /* @__PURE__ */ u3("div", { class: CSS_CLASSES.ORDER_BTN_CONTAINER, children: [
            /* @__PURE__ */ u3(
              "button",
              {
                type: "button",
                class: CSS_CLASSES.ORDER_BTN_UP,
                onClick: handleMoveUp,
                title: MODAL_LABELS.MOVE_UP,
                children: "\u2191"
              }
            ),
            /* @__PURE__ */ u3(
              "button",
              {
                type: "button",
                class: CSS_CLASSES.ORDER_BTN_DOWN,
                onClick: handleMoveDown,
                title: MODAL_LABELS.MOVE_DOWN,
                children: "\u2193"
              }
            )
          ] })
        ] }),
        node.files.length > 0 && /* @__PURE__ */ u3("div", { class: CSS_CLASSES.TRACKERS_CONTAINER, "data-folder-path": normalizePath(node.path), children: node.files.map((file) => /* @__PURE__ */ u3(
          TrackerItem,
          {
            file,
            plugin,
            dateIso,
            viewMode,
            opts
          },
          file.path
        )) }),
        node.children.map((childNode) => /* @__PURE__ */ u3(
          FolderNode,
          {
            node: childNode,
            plugin,
            dateIso,
            viewMode,
            opts
          },
          childNode.path
        ))
      ]
    }
  );
}
var FolderNode = M2(FolderNodeComponent, (prevProps, nextProps) => {
  if (prevProps.node.path !== nextProps.node.path) return false;
  if (prevProps.node.files.length !== nextProps.node.files.length) return false;
  if (prevProps.node.children.length !== nextProps.node.children.length) return false;
  if (!prevProps.node.files.every((f4, i4) => f4.path === nextProps.node.files[i4]?.path)) return false;
  if (!prevProps.node.children.every((c3, i4) => c3.path === nextProps.node.children[i4]?.path)) return false;
  if (prevProps.dateIso !== nextProps.dateIso) return false;
  if (prevProps.viewMode !== nextProps.viewMode) return false;
  if (prevProps.plugin !== nextProps.plugin) return false;
  const prevOpts = prevProps.opts;
  const nextOpts = nextProps.opts;
  const prevKeys = Object.keys(prevOpts);
  const nextKeys = Object.keys(nextOpts);
  if (prevKeys.length !== nextKeys.length) return false;
  for (const key of prevKeys) {
    if (prevOpts[key] !== nextOpts[key]) return false;
  }
  return true;
});

// src/components/TrackerBlock/TrackerBlock.tsx
function TrackerBlock({
  plugin,
  folderTree,
  initialDateIso,
  viewMode,
  opts,
  folderPath
}) {
  const [dateIso, setDateIso] = d2(initialDateIso);
  const [isUpdating, setIsUpdating] = d2(false);
  const [pendingDate, setPendingDate] = d2(null);
  const handleDateChange = q2(async (newDate) => {
    const newDateIso = DateService.resolveDateIso(newDate, plugin.settings.dateFormat);
    setDateIso(newDateIso);
    setPendingDate(newDateIso);
    setIsUpdating(true);
    try {
    } finally {
      setIsUpdating(false);
      setPendingDate(null);
    }
  }, [plugin.settings.dateFormat]);
  const handleNavigate = q2((days) => {
    const referenceIso = pendingDate ?? dateIso;
    const currentDateObj = DateService.parse(referenceIso, plugin.settings.dateFormat);
    const newDate = currentDateObj.clone().add(days, "days");
    const newDateStr = DateService.format(newDate, plugin.settings.dateFormat);
    handleDateChange(newDateStr);
  }, [pendingDate, dateIso, plugin.settings.dateFormat, handleDateChange]);
  const contextValue = T2(() => ({
    plugin,
    dateIso,
    viewMode,
    opts,
    onDateChange: handleDateChange
  }), [plugin, dateIso, viewMode, opts, handleDateChange]);
  if (!folderTree || folderTree.files.length === 0 && folderTree.children.length === 0) {
    return /* @__PURE__ */ u3("div", { class: CSS_CLASSES.ERROR, children: [
      "tracker: ",
      ERROR_MESSAGES.NO_TRACKERS,
      " ",
      folderPath
    ] });
  }
  const folderName = folderPath.split("/").pop() || folderPath;
  return /* @__PURE__ */ u3(TrackerContext.Provider, { value: contextValue, children: [
    viewMode === ViewMode.CONTROL && /* @__PURE__ */ u3("div", { class: CSS_CLASSES.TRACKER_NOTES_HEADER, children: [
      /* @__PURE__ */ u3("div", { class: "tracker-notes__header-title", children: /* @__PURE__ */ u3("span", { class: "tracker-notes__header-label", children: folderName }) }),
      /* @__PURE__ */ u3(
        DatePicker,
        {
          dateIso,
          onDateChange: handleDateChange,
          onNavigate: handleNavigate,
          isUpdating
        }
      ),
      /* @__PURE__ */ u3(LoadingIndicator, { isActive: isUpdating })
    ] }),
    /* @__PURE__ */ u3("div", { class: CSS_CLASSES.TRACKER_NOTES, children: /* @__PURE__ */ u3("div", { class: CSS_CLASSES.TRACKER_NOTES_HIERARCHY, children: /* @__PURE__ */ u3(
      FolderNode,
      {
        node: folderTree,
        plugin,
        dateIso,
        viewMode,
        opts
      }
    ) }) })
  ] });
}

// src/ui/tracker-block-render-child.tsx
var TrackerBlockRenderChild = class extends import_obsidian.MarkdownRenderChild {
  constructor(plugin, source, containerEl, ctx) {
    super(containerEl);
    this.plugin = plugin;
    this.source = source;
    this.opts = parseOptions(source);
    this.folderPath = this.opts.folder || plugin.settings.trackersFolder;
    this.ctx = ctx;
  }
  async render() {
    if (!this.opts.folder) {
      this.folderPath = this.plugin.settings.trackersFolder;
    }
    try {
      const folderTree = this.plugin.getFolderTree(this.folderPath);
      const viewMode = (this.opts.view ?? ViewMode.CONTROL).toLowerCase();
      let initialDate = this.opts.date;
      if (!initialDate && this.ctx.sourcePath) {
        initialDate = this.extractDateFromNotePath(this.ctx.sourcePath);
      }
      const dateIso = DateService.resolveDateIso(initialDate, this.plugin.settings.dateFormat);
      G(
        /* @__PURE__ */ u3(
          TrackerBlock,
          {
            plugin: this.plugin,
            folderTree,
            initialDateIso: dateIso,
            viewMode,
            opts: this.opts,
            folderPath: this.folderPath
          }
        ),
        this.containerEl
      );
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      this.containerEl.empty();
      this.containerEl.createEl("div", {
        text: `tracker: ${ERROR_MESSAGES.RENDER_ERROR}: ${errorMsg}`,
        cls: "tracker-notes__error"
      });
      console.error("Tracker: error processing block", error);
    }
  }
  /**
   * Extract date from note file path/name
   */
  extractDateFromNotePath(sourcePath) {
    try {
      const noteFile = this.plugin.app.vault.getAbstractFileByPath(sourcePath);
      if (!(noteFile instanceof import_obsidian.TFile)) return void 0;
      const fileName = noteFile.basename;
      if (!fileName) return void 0;
      const dateFormats = [
        "YYYY-MM-DD",
        "YYYY/MM/DD",
        "DD.MM.YYYY",
        "YYYY-MM-DD HH:mm",
        "YYYY/MM/DD HH:mm"
      ];
      for (const fmt of dateFormats) {
        try {
          const parsedDate = DateService.parse(fileName, fmt);
          if (parsedDate.isValid()) {
            return DateService.format(parsedDate, this.plugin.settings.dateFormat);
          }
        } catch {
        }
      }
      const datePattern = /(\d{4}[-/]\d{2}[-/]\d{2})|(\d{2}\.\d{2}\.\d{4})/;
      const match = fileName.match(datePattern);
      if (match) {
        const dateStr = match[0];
        const parsedDate = DateService.parseMultiple(dateStr, ["YYYY-MM-DD", "YYYY/MM/DD", "DD.MM.YYYY"]);
        if (parsedDate.isValid()) {
          return DateService.format(parsedDate, this.plugin.settings.dateFormat);
        }
      }
    } catch (error) {
      console.error("Tracker: Error reading note filename", error);
    }
    return void 0;
  }
  getFolderPath() {
    return this.folderPath;
  }
  getOptions() {
    return this.opts;
  }
  onload() {
  }
  onunload() {
    G(null, this.containerEl);
    this.plugin.removeActiveBlock(this);
  }
};

// src/domain/types.ts
var DEFAULT_SETTINGS = {
  trackersFolder: "0. Files/Trackers",
  dateFormat: "YYYY-MM-DD",
  daysToShow: 30,
  showChartByDefault: true,
  showStatsByDefault: false,
  hideChartOnMobile: false,
  hideStatsOnMobile: false,
  disableLimitReaction: false
};

// src/services/folder-tree-service.ts
var import_obsidian2 = require("obsidian");
var FolderTreeService = class {
  constructor(app) {
    this.app = app;
    this.cache = /* @__PURE__ */ new Map();
    this.customSortOrder = void 0;
  }
  /**
   * Updates settings for sorting
   */
  updateSettings(settings) {
    this.customSortOrder = settings.customSortOrder;
  }
  cacheKey(folderPath, maxDepth) {
    return `${normalizePath(folderPath)}::${maxDepth}`;
  }
  getFolderTree(folderPath, maxDepth = 3) {
    const key = this.cacheKey(folderPath, maxDepth);
    const cached = this.cache.get(key);
    if (cached) {
      return cached;
    }
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder) {
      return null;
    }
    if (folder instanceof import_obsidian2.TFile) {
      return {
        name: folder.basename,
        path: folder.path,
        level: 0,
        files: [folder],
        children: []
      };
    }
    if (folder instanceof import_obsidian2.TFolder) {
      const tree = this.buildFolderTree(folder, maxDepth, 0);
      this.cache.set(key, tree);
      return tree;
    }
    return null;
  }
  /**
   * Gets normalized full path from vault root
   * Returns the full normalized path as-is, without relative calculations
   */
  getRelativePath(fullPath) {
    return normalizePath(fullPath);
  }
  /**
   * Sorts items using custom sort order if available, otherwise alphabetically
   */
  sortItems(items, folderPath) {
    const relativePath = this.getRelativePath(folderPath);
    const sortOrder = this.customSortOrder?.[relativePath];
    if (!sortOrder || sortOrder.length === 0) {
      return [...items].sort((a3, b2) => {
        const aName = a3 instanceof import_obsidian2.TFile ? a3.basename : a3.name;
        const bName = b2 instanceof import_obsidian2.TFile ? b2.basename : b2.name;
        return aName.localeCompare(bName, void 0, { sensitivity: "base" });
      });
    }
    const itemMap = /* @__PURE__ */ new Map();
    const itemNames = /* @__PURE__ */ new Set();
    for (const item of items) {
      const itemName = item instanceof import_obsidian2.TFile ? item.basename : item.name;
      itemMap.set(itemName, item);
      itemNames.add(itemName);
    }
    const sorted = [];
    const added = /* @__PURE__ */ new Set();
    for (const orderedName of sortOrder) {
      const item = itemMap.get(orderedName);
      if (item) {
        sorted.push(item);
        added.add(orderedName);
      }
    }
    const remaining = [];
    for (const item of items) {
      const itemName = item instanceof import_obsidian2.TFile ? item.basename : item.name;
      if (!added.has(itemName)) {
        remaining.push(item);
      }
    }
    remaining.sort((a3, b2) => {
      const aName = a3 instanceof import_obsidian2.TFile ? a3.basename : a3.name;
      const bName = b2 instanceof import_obsidian2.TFile ? b2.basename : b2.name;
      return aName.localeCompare(bName, void 0, { sensitivity: "base" });
    });
    return [...sorted, ...remaining];
  }
  buildFolderTree(folder, maxDepth, currentLevel) {
    const node = {
      name: folder.name,
      path: folder.path,
      level: currentLevel,
      files: [],
      children: []
    };
    for (const child of folder.children) {
      if (child instanceof import_obsidian2.TFile && child.extension === "md") {
        node.files.push(child);
      }
    }
    node.files = this.sortItems(node.files, folder.path);
    if (currentLevel < maxDepth) {
      for (const child of folder.children) {
        if (child instanceof import_obsidian2.TFolder) {
          if (child.name.toLowerCase().includes("archive")) {
            continue;
          }
          const childNode = this.buildFolderTree(child, maxDepth, currentLevel + 1);
          if (childNode.files.length > 0 || childNode.children.length > 0) {
            node.children.push(childNode);
          }
        }
      }
      node.children = this.sortItems(node.children, folder.path);
    }
    return node;
  }
  invalidate(folderPath) {
    if (!folderPath) {
      this.cache.clear();
      return;
    }
    const normalized = normalizePath(folderPath);
    for (const key of Array.from(this.cache.keys())) {
      const [cachedPath] = key.split("::");
      if (cachedPath === normalized || cachedPath.startsWith(`${normalized}/`) || normalized.startsWith(`${cachedPath}/`)) {
        this.cache.delete(key);
      }
    }
  }
};

// src/services/tracker-file-service.ts
var import_obsidian3 = require("obsidian");
var TrackerFileService = class {
  // 5 minutes
  constructor(app) {
    this.app = app;
    // Cache for file content to avoid redundant reads
    this.fileContentCache = /* @__PURE__ */ new Map();
    this.CACHE_TTL_MS = 5 * 60 * 1e3;
  }
  /**
   * Get cached file content or read from vault
   */
  async getFileContent(file) {
    const cacheKey = file.path;
    const cached = this.fileContentCache.get(cacheKey);
    const now = Date.now();
    const fileMtime = file.stat?.mtime || 0;
    if (cached) {
      const cacheAge = now - cached.timestamp;
      if (cacheAge < this.CACHE_TTL_MS && cached.fileMtime === fileMtime) {
        return cached.content;
      }
    }
    const content = await this.app.vault.read(file);
    const latestMtime = file.stat?.mtime || now;
    this.fileContentCache.set(cacheKey, {
      content,
      timestamp: now,
      fileMtime: latestMtime
    });
    return content;
  }
  /**
   * Invalidate cache for a specific file
   */
  invalidateFileCache(filePath) {
    this.fileContentCache.delete(filePath);
  }
  async ensureFileWithHeading(filePath, type = "good-habit") {
    const existing = this.app.vault.getAbstractFileByPath(filePath);
    if (existing instanceof import_obsidian3.TFile) return existing;
    const dir = filePath.split("/").slice(0, -1).join("/");
    if (dir && !this.app.vault.getAbstractFileByPath(dir)) {
      await this.app.vault.createFolder(dir);
    }
    const content = `---
type: "${type}"
data: {}
---
`;
    return this.app.vault.create(filePath, content);
  }
  parseFrontmatterData(frontmatter) {
    const data = {};
    const dataMatch = frontmatter.match(/data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/);
    if (dataMatch) {
      if (frontmatter.match(/data:\s*\{\}/)) {
        return data;
      }
      const dataContent = dataMatch[1];
      if (dataContent) {
        const dataLines = dataContent.split(/\n/);
        dataLines.forEach((line) => {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#") || trimmed === "{}") return;
          const match = trimmed.match(/^["']([^"']+)["']\s*:\s*(.+)$/);
          if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
              value = value.slice(1, -1);
              value = value.replace(/\\"/g, '"').replace(/\\'/g, "'");
            }
            data[key] = parseMaybeNumber(value);
          } else {
            const matchNoQuotes = trimmed.match(/^([^:]+?)\s*:\s*(.+)$/);
            if (matchNoQuotes) {
              const key = matchNoQuotes[1].trim();
              let value = matchNoQuotes[2].trim();
              if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
                value = value.slice(1, -1);
                value = value.replace(/\\"/g, '"').replace(/\\'/g, "'");
              }
              data[key] = parseMaybeNumber(value);
            }
          }
        });
      }
    }
    return data;
  }
  formatDataToYaml(data) {
    if (Object.keys(data).length === 0) {
      return "data: {}\n";
    }
    let yaml = "data:\n";
    const sortedDates = Object.keys(data).sort();
    sortedDates.forEach((date) => {
      const value = data[date];
      if (typeof value === "string") {
        const escapedValue = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r");
        yaml += `  "${date}": "${escapedValue}"
`;
      } else {
        yaml += `  "${date}": ${value}
`;
      }
    });
    return yaml;
  }
  async readAllEntries(file) {
    const entries = /* @__PURE__ */ new Map();
    try {
      const raw = await this.getFileContent(file);
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) return entries;
      const frontmatter = frontmatterMatch[1];
      const data = this.parseFrontmatterData(frontmatter);
      Object.entries(data).forEach(([date, value]) => {
        entries.set(date, value);
      });
    } catch (error) {
      console.error("Tracker: error reading all entries", error);
    }
    return entries;
  }
  async readValueForDate(file, dateIso) {
    const entries = await this.readAllEntries(file);
    return entries.get(dateIso) ?? null;
  }
  async writeLogLine(file, dateIso, value) {
    try {
      const content = await this.getFileContent(file);
      this.invalidateFileCache(file.path);
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) {
        throw new Error(ERROR_MESSAGES.NO_FRONTMATTER);
      }
      const frontmatter = frontmatterMatch[1];
      const body = content.slice(frontmatterMatch[0].length);
      const data = this.parseFrontmatterData(frontmatter);
      data[dateIso] = parseMaybeNumber(value);
      const dataYaml = this.formatDataToYaml(data);
      let newFrontmatter = frontmatter.trim();
      const dataMatch = newFrontmatter.match(/data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/);
      if (dataMatch) {
        const dataYamlTrimmed = dataYaml.endsWith("\n") ? dataYaml.slice(0, -1) : dataYaml;
        newFrontmatter = newFrontmatter.replace(
          /data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/,
          dataYamlTrimmed
        );
      } else {
        newFrontmatter = newFrontmatter + "\n" + dataYaml.trimEnd();
      }
      if (!newFrontmatter.endsWith("\n")) {
        newFrontmatter += "\n";
      }
      const newContent = `---
${newFrontmatter}---${body}`;
      await this.app.vault.modify(file, newContent);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Tracker: write error", error);
      throw new Error(errorMsg);
    }
  }
  /**
   * Delete entry for a specific date
   */
  async deleteEntry(file, dateIso) {
    try {
      const content = await this.getFileContent(file);
      this.invalidateFileCache(file.path);
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!frontmatterMatch) {
        throw new Error(ERROR_MESSAGES.NO_FRONTMATTER);
      }
      const frontmatter = frontmatterMatch[1];
      const body = content.slice(frontmatterMatch[0].length);
      const data = this.parseFrontmatterData(frontmatter);
      delete data[dateIso];
      const dataYaml = this.formatDataToYaml(data);
      let newFrontmatter = frontmatter.trim();
      const dataMatch = newFrontmatter.match(/data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/);
      if (dataMatch) {
        const dataYamlTrimmed = dataYaml.endsWith("\n") ? dataYaml.slice(0, -1) : dataYaml;
        newFrontmatter = newFrontmatter.replace(
          /data:\s*(?:\{\}|(?:\n((?:\s+[^\n]+\n?)*)))/,
          dataYamlTrimmed
        );
      } else {
        newFrontmatter = newFrontmatter + "\n" + dataYaml.trimEnd();
      }
      if (!newFrontmatter.endsWith("\n")) {
        newFrontmatter += "\n";
      }
      const newContent = `---
${newFrontmatter}---${body}`;
      await this.app.vault.modify(file, newContent);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error("Tracker: delete entry error", error);
      throw new Error(errorMsg);
    }
  }
  async getFileTypeFromFrontmatter(file) {
    const fileOpts = {};
    try {
      const fileContent = await this.getFileContent(file);
      const frontmatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const typeMatch = frontmatter.match(/^type:\s*["']?([^"'\s\n]+)["']?/m);
        fileOpts.mode = typeMatch && typeMatch[1] ? typeMatch[1].trim() : TrackerType.GOOD_HABIT;
        const minValueMatch = frontmatter.match(/^minValue:\s*([\d.]+)/m);
        if (minValueMatch) fileOpts.minValue = minValueMatch[1];
        const maxValueMatch = frontmatter.match(/^maxValue:\s*([\d.]+)/m);
        if (maxValueMatch) fileOpts.maxValue = maxValueMatch[1];
        const stepMatch = frontmatter.match(/^step:\s*([\d.]+)/m);
        if (stepMatch) fileOpts.step = stepMatch[1];
        const minLimitMatch = frontmatter.match(/^minLimit:\s*([\d.]+)/m);
        if (minLimitMatch) fileOpts.minLimit = minLimitMatch[1];
        const maxLimitMatch = frontmatter.match(/^maxLimit:\s*([\d.]+)/m);
        if (maxLimitMatch) fileOpts.maxLimit = maxLimitMatch[1];
        const unitMatch = frontmatter.match(/^unit:\s*["']?([^"'\n]+)["']?/m);
        if (unitMatch && unitMatch[1]) {
          fileOpts.unit = unitMatch[1].trim();
        }
        const trackingStartDateMatch = frontmatter.match(/^trackingStartDate:\s*["']?([^"'\s\n]+)["']?/m);
        if (trackingStartDateMatch && trackingStartDateMatch[1]) {
          fileOpts.trackingStartDate = trackingStartDateMatch[1].trim();
        }
      } else {
        fileOpts.mode = TrackerType.GOOD_HABIT;
      }
    } catch (error) {
      console.error("Tracker: error reading frontmatter", error);
      fileOpts.mode = TrackerType.GOOD_HABIT;
    }
    return fileOpts;
  }
  getStartTrackingDate(entries, settings, fileOpts) {
    if (fileOpts?.trackingStartDate) {
      return fileOpts.trackingStartDate;
    }
    return DateService.format(DateService.now(), settings.dateFormat);
  }
  calculateStreak(entries, settings, endDate, trackerType, file, startTrackingDateStr) {
    let streak = 0;
    let currentDate = endDate instanceof Date ? DateService.fromDate(endDate) : DateService.fromDate(new Date(endDate));
    currentDate = DateService.startOfDay(currentDate);
    const metricType = (trackerType || "good-habit").toLowerCase();
    const isBadHabit = metricType === "bad-habit";
    const startTrackingDate = determineStartTrackingDate(
      startTrackingDateStr,
      file,
      entries,
      settings,
      currentDate
    );
    if (!startTrackingDate || !startTrackingDate.isValid()) {
      return 0;
    }
    let daysChecked = 0;
    while (daysChecked < MAX_DAYS_BACK) {
      if (DateService.isBefore(currentDate, startTrackingDate)) {
        break;
      }
      const val = getEntryValueByDate(entries, currentDate, settings);
      let isSuccess = false;
      if (isBadHabit) {
        if (val == null || val === void 0) {
          isSuccess = true;
        } else {
          const hasValue = isTrackerValueTrue(val);
          isSuccess = !hasValue;
        }
      } else {
        if (val != null && val !== void 0) {
          isSuccess = isTrackerValueTrue(val);
        }
      }
      if (isSuccess) {
        streak++;
      } else {
        break;
      }
      currentDate = currentDate.subtract(1, "days");
      daysChecked++;
    }
    return streak;
  }
  calculateBestStreak(entries, settings, trackerType, file, startTrackingDateStr) {
    const metricType = (trackerType || "good-habit").toLowerCase();
    const isBadHabit = metricType === "bad-habit";
    if (entries.size === 0) return 0;
    const today = DateService.now();
    let currentDate = DateService.startOfDay(today);
    const startTrackingDate = determineStartTrackingDate(
      startTrackingDateStr,
      file,
      entries,
      settings,
      currentDate
    );
    if (!startTrackingDate || !startTrackingDate.isValid()) {
      return 0;
    }
    let bestStreak = 0;
    let currentStreak = 0;
    let daysChecked = 0;
    while (!DateService.isBefore(currentDate, startTrackingDate) && daysChecked < MAX_DAYS_BACK) {
      const val = getEntryValueByDate(entries, currentDate, settings);
      let isSuccess = false;
      if (isBadHabit) {
        if (val == null || val === void 0) {
          isSuccess = true;
        } else {
          const hasValue = isTrackerValueTrue(val);
          isSuccess = !hasValue;
        }
      } else {
        if (val != null && val !== void 0) {
          isSuccess = isTrackerValueTrue(val);
        }
      }
      if (isSuccess) {
        currentStreak++;
        bestStreak = Math.max(bestStreak, currentStreak);
      } else {
        currentStreak = 0;
      }
      currentDate = currentDate.subtract(1, "days");
      daysChecked++;
    }
    return bestStreak;
  }
};

// src/ui/tracker-settings-tab.ts
var import_obsidian5 = require("obsidian");

// src/ui/suggest/folder-suggest.ts
var import_obsidian4 = require("obsidian");
var FolderSuggest = class extends import_obsidian4.AbstractInputSuggest {
  constructor(app, inputEl, folders) {
    super(app, inputEl);
    this.folders = folders;
  }
  getSuggestions(query) {
    const normalizedQuery = query.toLowerCase().trim();
    if (!normalizedQuery) {
      return this.folders.slice(0, 100);
    }
    return this.folders.filter((folder) => {
      const path = folder.path || "";
      return path.toLowerCase().includes(normalizedQuery);
    }).slice(0, 100);
  }
  renderSuggestion(folder, el) {
    const path = folder.path || "";
    el.textContent = path || MODAL_LABELS.ROOT_FOLDER;
  }
  selectSuggestion(folder) {
    const path = folder.path || "";
    this.setValue(path);
    this.close();
  }
};

// src/ui/tracker-settings-tab.ts
var TrackerSettingsTab = class extends import_obsidian5.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    const folders = this.app.vault.getAllFolders();
    new import_obsidian5.Setting(containerEl).setName("Default trackers folder").setDesc("Can be overridden with `folder` parameter in habit block").addText((t3) => {
      t3.setPlaceholder("0. Files/Trackers").setValue(this.plugin.settings.trackersFolder).onChange(async (v3) => {
        this.plugin.settings.trackersFolder = v3.trim();
        await this.plugin.saveSettings();
      });
      new FolderSuggest(this.app, t3.inputEl, folders);
    });
    new import_obsidian5.Setting(containerEl).setName("Number of days").setDesc("Number of past days displayed for charts and habits. Can be overridden with `days` parameter in tracker/habit block").addText(
      (t3) => t3.setPlaceholder("30").setValue(String(this.plugin.settings.daysToShow)).onChange(async (v3) => {
        const num = parseInt(v3.trim());
        if (!isNaN(num) && num > 0) {
          this.plugin.settings.daysToShow = num;
          await this.plugin.saveSettings();
        }
      })
    );
    new import_obsidian5.Setting(containerEl).setName("Show chart by default").setDesc("Can be overridden with showChart: `true/false` parameter").addToggle(
      (t3) => t3.setValue(this.plugin.settings.showChartByDefault).onChange(async (v3) => {
        this.plugin.settings.showChartByDefault = v3;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("Show statistics by default").setDesc("Can be overridden with showStats: `true/false` parameter").addToggle(
      (t3) => t3.setValue(this.plugin.settings.showStatsByDefault).onChange(async (v3) => {
        this.plugin.settings.showStatsByDefault = v3;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("Hide chart on mobile").addToggle(
      (t3) => t3.setValue(this.plugin.settings.hideChartOnMobile).onChange(async (v3) => {
        this.plugin.settings.hideChartOnMobile = v3;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("Hide statistics on mobile").addToggle(
      (t3) => t3.setValue(this.plugin.settings.hideStatsOnMobile).onChange(async (v3) => {
        this.plugin.settings.hideStatsOnMobile = v3;
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian5.Setting(containerEl).setName("Disable color reaction to range compliance").setDesc("Disables color feedback when metric values are within or outside the defined limit range").addToggle(
      (t3) => t3.setValue(this.plugin.settings.disableLimitReaction).onChange(async (v3) => {
        this.plugin.settings.disableLimitReaction = v3;
        await this.plugin.saveSettings();
      })
    );
  }
};

// src/ui/modals/create-tracker-modal.ts
var import_obsidian6 = require("obsidian");

// src/ui/components/tracker-type-selector.ts
function populateTrackerTypeSelector(selectElement, defaultValue = TrackerType.GOOD_HABIT) {
  selectElement.innerHTML = "";
  const habitsGroup = document.createElement("optgroup");
  habitsGroup.label = MODAL_LABELS.HABITS_GROUP;
  const goodHabitOption = document.createElement("option");
  goodHabitOption.value = TrackerType.GOOD_HABIT;
  goodHabitOption.textContent = TRACKER_TYPE_LABELS[TrackerType.GOOD_HABIT];
  habitsGroup.appendChild(goodHabitOption);
  const badHabitOption = document.createElement("option");
  badHabitOption.value = TrackerType.BAD_HABIT;
  badHabitOption.textContent = TRACKER_TYPE_LABELS[TrackerType.BAD_HABIT];
  habitsGroup.appendChild(badHabitOption);
  selectElement.appendChild(habitsGroup);
  const metricsGroup = document.createElement("optgroup");
  metricsGroup.label = MODAL_LABELS.METRICS_GROUP;
  const numberOption = document.createElement("option");
  numberOption.value = TrackerType.NUMBER;
  numberOption.textContent = TRACKER_TYPE_LABELS[TrackerType.NUMBER];
  metricsGroup.appendChild(numberOption);
  const scaleOption = document.createElement("option");
  scaleOption.value = TrackerType.SCALE;
  scaleOption.textContent = TRACKER_TYPE_LABELS[TrackerType.SCALE];
  metricsGroup.appendChild(scaleOption);
  const plusminusOption = document.createElement("option");
  plusminusOption.value = TrackerType.PLUSMINUS;
  plusminusOption.textContent = TRACKER_TYPE_LABELS[TrackerType.PLUSMINUS];
  metricsGroup.appendChild(plusminusOption);
  const textOption = document.createElement("option");
  textOption.value = TrackerType.TEXT;
  textOption.textContent = TRACKER_TYPE_LABELS[TrackerType.TEXT];
  metricsGroup.appendChild(textOption);
  selectElement.appendChild(metricsGroup);
  selectElement.value = defaultValue;
}
function isMetricType(type) {
  return [
    TrackerType.NUMBER,
    TrackerType.PLUSMINUS,
    TrackerType.TEXT,
    TrackerType.SCALE
  ].includes(type);
}

// src/ui/modals/create-tracker-modal.ts
var CreateTrackerModal = class extends import_obsidian6.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: MODAL_LABELS.CREATE_TRACKER });
    const nameSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.NAME).addText((text) => {
      text.setPlaceholder(PLACEHOLDERS.TRACKER_NAME);
      text.inputEl.style.width = "100%";
    });
    const folders = this.app.vault.getAllFolders();
    const folderSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.PATH).addText((text) => {
      const defaultPath = this.plugin.settings.trackersFolder || DEFAULT_SETTINGS.trackersFolder;
      text.setPlaceholder(defaultPath);
      text.setValue("");
      text.inputEl.style.width = "100%";
      new FolderSuggest(this.app, text.inputEl, folders);
    });
    const typeSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.TYPE).addDropdown((dropdown) => {
      dropdown.setValue(TrackerType.GOOD_HABIT);
    });
    const typeDropdown = typeSetting.controlEl.querySelector("select");
    if (typeDropdown) {
      populateTrackerTypeSelector(typeDropdown, TrackerType.GOOD_HABIT);
    }
    const startDateSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.START_DATE).addText((text) => {
      const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      text.setValue(today);
      text.inputEl.type = "date";
      text.inputEl.style.width = "100%";
    });
    const parametersHeader = contentEl.createEl("h3", { text: MODAL_LABELS.PARAMETERS });
    const unitSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.UNIT).addText((text) => {
      text.setPlaceholder(PLACEHOLDERS.UNIT);
      text.inputEl.style.width = "100%";
    });
    const unitInput = unitSetting.controlEl.querySelector("input");
    const plusminusStepSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.STEP).addText((text) => {
      text.setPlaceholder(String(DEFAULTS.STEP)).setValue(String(DEFAULTS.STEP)).inputEl.type = "number";
      text.inputEl.step = "any";
      text.inputEl.style.width = "100%";
    });
    const minValueSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.VALUE_FROM).addText((text) => {
      text.setPlaceholder(String(DEFAULTS.MIN_VALUE)).setValue(String(DEFAULTS.MIN_VALUE)).inputEl.type = "number";
      text.inputEl.style.width = "100%";
    });
    const maxValueSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.VALUE_TO).addText((text) => {
      text.setPlaceholder(String(DEFAULTS.MAX_VALUE)).setValue(String(DEFAULTS.MAX_VALUE)).inputEl.type = "number";
      text.inputEl.style.width = "100%";
    });
    const stepSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.STEP).addText((text) => {
      text.setPlaceholder(String(DEFAULTS.STEP)).setValue(String(DEFAULTS.STEP)).inputEl.type = "number";
      text.inputEl.step = "any";
      text.inputEl.style.width = "100%";
    });
    parametersHeader.style.display = "none";
    unitSetting.settingEl.style.display = "none";
    plusminusStepSetting.settingEl.style.display = "none";
    minValueSetting.settingEl.style.display = "none";
    maxValueSetting.settingEl.style.display = "none";
    stepSetting.settingEl.style.display = "none";
    const limitsHeader = contentEl.createEl("h3", { text: MODAL_LABELS.LIMITS });
    const limitsDescription = contentEl.createEl("p", {
      text: MODAL_LABELS.LIMITS_DESCRIPTION,
      cls: "tracker-notes__limits-description"
    });
    limitsDescription.style.fontSize = "0.9em";
    limitsDescription.style.color = "var(--text-muted, #999999)";
    limitsDescription.style.marginTop = "0.5em";
    limitsDescription.style.marginBottom = "1em";
    const maxLimitSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.UPPER_LIMIT).addText((text) => {
      text.setPlaceholder(PLACEHOLDERS.LIMIT_NONE).setValue("").inputEl.type = "number";
      text.inputEl.style.width = "100%";
    });
    const minLimitSetting = new import_obsidian6.Setting(contentEl).setName(MODAL_LABELS.LOWER_LIMIT).addText((text) => {
      text.setPlaceholder(PLACEHOLDERS.LIMIT_NONE).setValue("").inputEl.type = "number";
      text.inputEl.style.width = "100%";
    });
    limitsHeader.style.display = "none";
    limitsDescription.style.display = "none";
    minLimitSetting.settingEl.style.display = "none";
    maxLimitSetting.settingEl.style.display = "none";
    const typeDropdownSelect = typeSetting.controlEl.querySelector("select");
    if (typeDropdownSelect) {
      typeDropdownSelect.onchange = () => {
        const isScale = typeDropdownSelect.value === TrackerType.SCALE;
        const isMetric = isMetricType(typeDropdownSelect.value);
        const isPlusminus = typeDropdownSelect.value === TrackerType.PLUSMINUS;
        const isText = typeDropdownSelect.value === TrackerType.TEXT;
        if (isMetric) {
          parametersHeader.style.display = "";
          unitSetting.settingEl.style.display = "";
          if (isText) {
            if (unitInput) {
              unitInput.value = DEFAULTS.TEXT_UNIT;
              unitInput.disabled = true;
            }
          } else if (unitInput) {
            unitInput.disabled = false;
          }
          if (isScale) {
            minValueSetting.settingEl.style.display = "";
            maxValueSetting.settingEl.style.display = "";
            stepSetting.settingEl.style.display = "";
            plusminusStepSetting.settingEl.style.display = "none";
          } else {
            minValueSetting.settingEl.style.display = "none";
            maxValueSetting.settingEl.style.display = "none";
            stepSetting.settingEl.style.display = "none";
            plusminusStepSetting.settingEl.style.display = isPlusminus ? "" : "none";
          }
        } else {
          parametersHeader.style.display = "none";
          unitSetting.settingEl.style.display = "none";
          plusminusStepSetting.settingEl.style.display = "none";
          minValueSetting.settingEl.style.display = "none";
          maxValueSetting.settingEl.style.display = "none";
          stepSetting.settingEl.style.display = "none";
        }
        if (isMetric) {
          limitsHeader.style.display = "";
          limitsDescription.style.display = "";
          minLimitSetting.settingEl.style.display = "";
          maxLimitSetting.settingEl.style.display = "";
        } else {
          limitsHeader.style.display = "none";
          limitsDescription.style.display = "none";
          minLimitSetting.settingEl.style.display = "none";
          maxLimitSetting.settingEl.style.display = "none";
        }
      };
    }
    new import_obsidian6.Setting(contentEl).addButton((button) => {
      button.setButtonText(MODAL_LABELS.CREATE).setCta().onClick(async () => {
        const nameInput = nameSetting.controlEl.querySelector("input");
        const name = nameInput.value.trim();
        if (!name) {
          new import_obsidian6.Notice(ERROR_MESSAGES.ENTER_NAME);
          return;
        }
        const typeDropdownSelect2 = typeSetting.controlEl.querySelector("select");
        const type = typeDropdownSelect2 ? typeDropdownSelect2.value : TrackerType.GOOD_HABIT;
        const minValue = type === TrackerType.SCALE ? minValueSetting.controlEl.querySelector("input")?.value || String(DEFAULTS.MIN_VALUE) : String(DEFAULTS.MIN_VALUE);
        const maxValue = type === TrackerType.SCALE ? maxValueSetting.controlEl.querySelector("input")?.value || String(DEFAULTS.MAX_VALUE) : String(DEFAULTS.MAX_VALUE);
        const step = type === TrackerType.SCALE ? stepSetting.controlEl.querySelector("input")?.value || String(DEFAULTS.STEP) : type === TrackerType.PLUSMINUS ? plusminusStepSetting.controlEl.querySelector("input")?.value || String(DEFAULTS.STEP) : String(DEFAULTS.STEP);
        const minLimitInput = minLimitSetting.controlEl.querySelector("input");
        const maxLimitInput = maxLimitSetting.controlEl.querySelector("input");
        const minLimit = minLimitInput?.value.trim() || "";
        const maxLimit = maxLimitInput?.value.trim() || "";
        if (minLimit && maxLimit) {
          const minLimitNum = parseFloat(minLimit);
          const maxLimitNum = parseFloat(maxLimit);
          if (!isNaN(minLimitNum) && !isNaN(maxLimitNum) && maxLimitNum <= minLimitNum) {
            new import_obsidian6.Notice(MODAL_LABELS.UPPER_LIMIT_MUST_BE_GREATER);
            return;
          }
        }
        const unitInputValue = unitSetting.controlEl.querySelector("input");
        const unitRaw = unitInputValue?.value.trim() || "";
        const unit = type === TrackerType.TEXT ? DEFAULTS.TEXT_UNIT : unitRaw;
        const isMetric = isMetricType(type);
        const startDateInput = startDateSetting.controlEl.querySelector("input");
        const startDate = startDateInput?.value || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const fileName = sanitizeFileName(name) + ".md";
        const folderInput = folderSetting.controlEl.querySelector("input");
        let inputFolder = folderInput?.value.trim() || "";
        if (inputFolder === MODAL_LABELS.ROOT_FOLDER) {
          inputFolder = "";
        }
        const targetFolder = inputFolder || this.plugin.settings.trackersFolder;
        const filePath = targetFolder ? `${targetFolder}/${fileName}` : fileName;
        try {
          const file = await this.plugin.ensureFileWithHeading(filePath, type);
          const content = await this.app.vault.read(file);
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          let newFrontmatter = `type: "${type}"
`;
          newFrontmatter += `trackingStartDate: "${startDate}"
`;
          if (type === TrackerType.SCALE) {
            newFrontmatter += `minValue: ${parseFloat(minValue) || DEFAULTS.MIN_VALUE}
`;
            newFrontmatter += `maxValue: ${parseFloat(maxValue) || DEFAULTS.MAX_VALUE}
`;
            newFrontmatter += `step: ${parseFloat(step) || DEFAULTS.STEP}
`;
          } else if (type === TrackerType.PLUSMINUS) {
            newFrontmatter += `step: ${parseFloat(step) || DEFAULTS.STEP}
`;
          }
          if (minLimit) {
            newFrontmatter += `minLimit: ${parseFloat(minLimit)}
`;
          }
          if (maxLimit) {
            newFrontmatter += `maxLimit: ${parseFloat(maxLimit)}
`;
          }
          if (unit && isMetric) {
            const escapedUnit = unit.replace(/"/g, '\\"');
            newFrontmatter += `unit: "${escapedUnit}"
`;
          }
          newFrontmatter += `data: {}
`;
          const body = frontmatterMatch ? content.slice(frontmatterMatch[0].length).trim() : content.trim();
          const newContent = `---
${newFrontmatter}---${body ? `

${body}` : ""}`;
          await this.app.vault.modify(file, newContent);
          new import_obsidian6.Notice(`${SUCCESS_MESSAGES.TRACKER_CREATED}: ${name}`);
          const fileFolderPath = this.plugin.getFolderPathFromFile(file.path);
          await this.plugin.onTrackerCreated(fileFolderPath, file);
          this.close();
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          new import_obsidian6.Notice(`${ERROR_MESSAGES.CREATE_ERROR}: ${errorMsg}`);
          console.error("Tracker: error creating tracker", error);
        }
      });
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/modals/edit-tracker-modal.ts
var import_obsidian7 = require("obsidian");
var EditTrackerModal = class extends import_obsidian7.Modal {
  constructor(app, plugin, file) {
    super(app);
    this.plugin = plugin;
    this.file = file;
  }
  async onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: MODAL_LABELS.EDIT_TRACKER });
    const fileOpts = await this.plugin.getFileTypeFromFrontmatter(this.file);
    const currentType = fileOpts.mode || "good-habit";
    const currentName = this.file.basename;
    const currentUnit = fileOpts.unit || "";
    const currentMinValue = fileOpts.minValue || "";
    const currentMaxValue = fileOpts.maxValue || "";
    const currentStep = fileOpts.step || "";
    const currentMinLimit = fileOpts.minLimit || "";
    const currentMaxLimit = fileOpts.maxLimit || "";
    const currentStartDate = fileOpts.trackingStartDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const nameSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.NAME).addText((text) => {
      text.setPlaceholder(PLACEHOLDERS.TRACKER_NAME);
      text.setValue(currentName);
      text.inputEl.style.width = "100%";
    });
    const typeSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.TYPE).addDropdown((dropdown) => {
      dropdown.addOption("good-habit", TRACKER_TYPE_LABELS["good-habit"]);
      dropdown.addOption("bad-habit", TRACKER_TYPE_LABELS["bad-habit"]);
      dropdown.addOption("number", TRACKER_TYPE_LABELS["number"]);
      dropdown.addOption("scale", TRACKER_TYPE_LABELS["scale"]);
      dropdown.addOption("plusminus", TRACKER_TYPE_LABELS["plusminus"]);
      dropdown.addOption("text", TRACKER_TYPE_LABELS["text"]);
      dropdown.setValue(currentType);
      dropdown.selectEl.disabled = true;
    });
    const typeDropdown = typeSetting.controlEl.querySelector("select");
    if (typeDropdown) {
      typeDropdown.innerHTML = "";
      const habitsGroup = document.createElement("optgroup");
      habitsGroup.label = MODAL_LABELS.HABITS_GROUP;
      const goodHabitOption = document.createElement("option");
      goodHabitOption.value = "good-habit";
      goodHabitOption.textContent = TRACKER_TYPE_LABELS["good-habit"];
      habitsGroup.appendChild(goodHabitOption);
      const badHabitOption = document.createElement("option");
      badHabitOption.value = "bad-habit";
      badHabitOption.textContent = TRACKER_TYPE_LABELS["bad-habit"];
      habitsGroup.appendChild(badHabitOption);
      typeDropdown.appendChild(habitsGroup);
      const metricsGroup = document.createElement("optgroup");
      metricsGroup.label = MODAL_LABELS.METRICS_GROUP;
      const numberOption = document.createElement("option");
      numberOption.value = "number";
      numberOption.textContent = TRACKER_TYPE_LABELS["number"];
      metricsGroup.appendChild(numberOption);
      const scaleOption = document.createElement("option");
      scaleOption.value = "scale";
      scaleOption.textContent = TRACKER_TYPE_LABELS["scale"];
      metricsGroup.appendChild(scaleOption);
      const plusminusOption = document.createElement("option");
      plusminusOption.value = "plusminus";
      plusminusOption.textContent = TRACKER_TYPE_LABELS["plusminus"];
      metricsGroup.appendChild(plusminusOption);
      const textOption = document.createElement("option");
      textOption.value = "text";
      textOption.textContent = TRACKER_TYPE_LABELS["text"];
      metricsGroup.appendChild(textOption);
      typeDropdown.appendChild(metricsGroup);
      typeDropdown.value = currentType;
      typeDropdown.disabled = true;
    }
    const startDateSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.START_DATE).addText((text) => {
      text.setValue(currentStartDate);
      text.inputEl.type = "date";
      text.inputEl.style.width = "100%";
    });
    const warningEl = contentEl.createDiv({
      cls: "tracker-notes__start-date-warning",
      attr: { style: "display: none; margin-top: 0.5em; padding: 0.75em; background: var(--background-modifier-error); color: #fff; border-radius: 4px; font-size: 0.9em;" }
    });
    const startDateInput = startDateSetting.controlEl.querySelector("input");
    if (startDateInput) {
      startDateInput.addEventListener("input", async () => {
        const newStartDate = startDateInput.value;
        if (!newStartDate || newStartDate === currentStartDate) {
          warningEl.style.display = "none";
          return;
        }
        try {
          const content = await this.app.vault.read(this.file);
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
          let existingData = {};
          if (frontmatterMatch) {
            existingData = this.plugin.parseFrontmatterData(frontmatterMatch[1]);
          }
          const newStartDateObj = DateService.parse(newStartDate, "YYYY-MM-DD");
          let datesToDeleteCount = 0;
          for (const [dateStr] of Object.entries(existingData)) {
            try {
              const dataDateObj = DateService.parseMultiple(dateStr, [
                this.plugin.settings.dateFormat,
                "YYYY-MM-DD",
                "DD.MM.YYYY",
                "MM/DD/YYYY"
              ]);
              if (DateService.isBefore(dataDateObj, newStartDateObj)) {
                datesToDeleteCount++;
              }
            } catch (e3) {
            }
          }
          if (datesToDeleteCount > 0) {
            const formattedDate = DateService.format(newStartDateObj, this.plugin.settings.dateFormat);
            const recordsText = datesToDeleteCount === 1 ? MODAL_LABELS.RECORD_SINGULAR : MODAL_LABELS.RECORDS_PLURAL;
            warningEl.textContent = MODAL_LABELS.WARNING_RECORDS_BEFORE_DATE.replace("{count}", String(datesToDeleteCount)).replace("{records}", recordsText).replace("{date}", formattedDate);
            warningEl.style.display = "block";
          } else {
            warningEl.style.display = "none";
          }
        } catch (error) {
          console.error("Tracker: error checking data", error);
          warningEl.style.display = "none";
        }
      });
    }
    const parametersHeader = contentEl.createEl("h3", { text: MODAL_LABELS.PARAMETERS });
    const unitSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.UNIT).addText((text) => {
      const unitValue = currentType === "text" ? DEFAULTS.TEXT_UNIT : currentUnit;
      text.setPlaceholder(PLACEHOLDERS.UNIT);
      text.setValue(unitValue);
      text.inputEl.style.width = "100%";
      if (currentType === "text") {
        text.inputEl.disabled = true;
      }
    });
    const unitInput = unitSetting.controlEl.querySelector("input");
    const plusminusStepSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.STEP).addText((text) => {
      text.setPlaceholder(String(DEFAULTS.STEP)).setValue(currentStep || String(DEFAULTS.STEP)).inputEl.type = "number";
      text.inputEl.step = "any";
      text.inputEl.style.width = "100%";
    });
    const minValueSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.VALUE_FROM).addText((text) => {
      text.setPlaceholder(String(DEFAULTS.MIN_VALUE)).setValue(currentMinValue || String(DEFAULTS.MIN_VALUE)).inputEl.type = "number";
      text.inputEl.style.width = "100%";
    });
    const maxValueSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.VALUE_TO).addText((text) => {
      text.setPlaceholder(String(DEFAULTS.MAX_VALUE)).setValue(currentMaxValue || String(DEFAULTS.MAX_VALUE)).inputEl.type = "number";
      text.inputEl.style.width = "100%";
    });
    const stepSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.STEP).addText((text) => {
      text.setPlaceholder(String(DEFAULTS.STEP)).setValue(currentStep || String(DEFAULTS.STEP)).inputEl.type = "number";
      text.inputEl.step = "any";
      text.inputEl.style.width = "100%";
    });
    const limitsHeader = contentEl.createEl("h3", { text: MODAL_LABELS.LIMITS });
    const limitsDescription = contentEl.createEl("p", {
      text: MODAL_LABELS.LIMITS_DESCRIPTION,
      cls: "tracker-notes__limits-description"
    });
    limitsDescription.style.fontSize = "0.9em";
    limitsDescription.style.color = "var(--text-muted, #999999)";
    limitsDescription.style.marginTop = "0.5em";
    limitsDescription.style.marginBottom = "1em";
    const maxLimitSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.UPPER_LIMIT).addText((text) => {
      text.setPlaceholder(PLACEHOLDERS.LIMIT_NONE).setValue(currentMaxLimit).inputEl.type = "number";
      text.inputEl.style.width = "100%";
    });
    const minLimitSetting = new import_obsidian7.Setting(contentEl).setName(MODAL_LABELS.LOWER_LIMIT).addText((text) => {
      text.setPlaceholder(PLACEHOLDERS.LIMIT_NONE).setValue(currentMinLimit).inputEl.type = "number";
      text.inputEl.style.width = "100%";
    });
    const updateFieldsVisibility = () => {
      const isScale = typeDropdown.value === "scale";
      const isMetric = ["number", "plusminus", "text", "scale"].includes(typeDropdown.value);
      const isPlusminus = typeDropdown.value === "plusminus";
      const isText = typeDropdown.value === "text";
      if (isMetric) {
        parametersHeader.style.display = "";
        unitSetting.settingEl.style.display = "";
        if (isText) {
          if (unitInput) {
            unitInput.value = DEFAULTS.TEXT_UNIT;
            unitInput.disabled = true;
          }
        } else if (unitInput) {
          unitInput.disabled = false;
        }
        if (isScale) {
          minValueSetting.settingEl.style.display = "";
          maxValueSetting.settingEl.style.display = "";
          stepSetting.settingEl.style.display = "";
          plusminusStepSetting.settingEl.style.display = "none";
        } else {
          minValueSetting.settingEl.style.display = "none";
          maxValueSetting.settingEl.style.display = "none";
          stepSetting.settingEl.style.display = "none";
          plusminusStepSetting.settingEl.style.display = isPlusminus ? "" : "none";
        }
      } else {
        parametersHeader.style.display = "none";
        unitSetting.settingEl.style.display = "none";
        plusminusStepSetting.settingEl.style.display = "none";
        minValueSetting.settingEl.style.display = "none";
        maxValueSetting.settingEl.style.display = "none";
        stepSetting.settingEl.style.display = "none";
      }
      if (isMetric) {
        limitsHeader.style.display = "";
        limitsDescription.style.display = "";
        minLimitSetting.settingEl.style.display = "";
        maxLimitSetting.settingEl.style.display = "";
      } else {
        limitsHeader.style.display = "none";
        limitsDescription.style.display = "none";
        minLimitSetting.settingEl.style.display = "none";
        maxLimitSetting.settingEl.style.display = "none";
      }
    };
    updateFieldsVisibility();
    if (typeDropdown) {
      typeDropdown.onchange = updateFieldsVisibility;
    }
    const buttonsWrapper = contentEl.createDiv({ cls: "tracker-modal-buttons" });
    const deleteBtn = buttonsWrapper.createEl("button", {
      text: MODAL_LABELS.DELETE,
      cls: "mod-warning"
    });
    deleteBtn.addEventListener("click", async () => {
      try {
        const filePath = this.file.path;
        const fileName = this.file.basename;
        await this.plugin.onTrackerDeleted(filePath);
        await this.app.vault.delete(this.file);
        new import_obsidian7.Notice(`${SUCCESS_MESSAGES.TRACKER_DELETED}: ${fileName}`);
        this.close();
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        new import_obsidian7.Notice(`${ERROR_MESSAGES.UPDATE_ERROR}: ${errorMsg}`);
        console.error("Tracker: error deleting tracker", error);
      }
    });
    const saveBtn = buttonsWrapper.createEl("button", {
      text: MODAL_LABELS.SAVE,
      cls: "mod-cta"
    });
    saveBtn.addEventListener("click", async () => {
      const nameInput = nameSetting.controlEl.querySelector("input");
      const name = nameInput.value.trim();
      if (!name) {
        new import_obsidian7.Notice(ERROR_MESSAGES.ENTER_NAME);
        return;
      }
      const type = typeDropdown ? typeDropdown.value : currentType;
      const minValue = type === "scale" ? minValueSetting.controlEl.querySelector("input")?.value || "0" : "0";
      const maxValue = type === "scale" ? maxValueSetting.controlEl.querySelector("input")?.value || "10" : "10";
      const step = type === "scale" ? stepSetting.controlEl.querySelector("input")?.value || "1" : type === "plusminus" ? plusminusStepSetting.controlEl.querySelector("input")?.value || "1" : "1";
      const minLimitInput = minLimitSetting.controlEl.querySelector("input");
      const maxLimitInput = maxLimitSetting.controlEl.querySelector("input");
      const minLimit = minLimitInput?.value.trim() || "";
      const maxLimit = maxLimitInput?.value.trim() || "";
      if (minLimit && maxLimit) {
        const minLimitNum = parseFloat(minLimit);
        const maxLimitNum = parseFloat(maxLimit);
        if (!isNaN(minLimitNum) && !isNaN(maxLimitNum) && maxLimitNum <= minLimitNum) {
          new import_obsidian7.Notice(MODAL_LABELS.UPPER_LIMIT_MUST_BE_GREATER);
          return;
        }
      }
      const unitInputValue = unitSetting.controlEl.querySelector("input");
      const unitRaw = unitInputValue?.value.trim() || "";
      const unit = type === "text" ? DEFAULTS.TEXT_UNIT : unitRaw;
      const isMetric = ["number", "plusminus", "text", "scale"].includes(type);
      const startDateInput2 = startDateSetting.controlEl.querySelector("input");
      const startDate = startDateInput2?.value || currentStartDate;
      try {
        const content = await this.app.vault.read(this.file);
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        const body = frontmatterMatch ? content.slice(frontmatterMatch[0].length).trim() : content.trim();
        let existingData = {};
        if (frontmatterMatch) {
          existingData = this.plugin.parseFrontmatterData(frontmatterMatch[1]);
        }
        if (startDate !== currentStartDate) {
          const newStartDateObj = DateService.parse(startDate, "YYYY-MM-DD");
          const datesToDelete = [];
          for (const [dateStr] of Object.entries(existingData)) {
            try {
              const dataDateObj = DateService.parseMultiple(dateStr, [
                this.plugin.settings.dateFormat,
                "YYYY-MM-DD",
                "DD.MM.YYYY",
                "MM/DD/YYYY"
              ]);
              if (DateService.isBefore(dataDateObj, newStartDateObj)) {
                datesToDelete.push(dateStr);
              }
            } catch (e3) {
            }
          }
          for (const dateStr of datesToDelete) {
            delete existingData[dateStr];
          }
        }
        let newFrontmatter = `type: "${type}"
`;
        newFrontmatter += `trackingStartDate: "${startDate}"
`;
        if (type === "scale") {
          newFrontmatter += `minValue: ${parseFloat(minValue) || 0}
`;
          newFrontmatter += `maxValue: ${parseFloat(maxValue) || 10}
`;
          newFrontmatter += `step: ${parseFloat(step) || 1}
`;
        } else if (type === "plusminus") {
          newFrontmatter += `step: ${parseFloat(step) || 1}
`;
        }
        if (minLimit) {
          newFrontmatter += `minLimit: ${parseFloat(minLimit)}
`;
        }
        if (maxLimit) {
          newFrontmatter += `maxLimit: ${parseFloat(maxLimit)}
`;
        }
        if (unit && isMetric) {
          const escapedUnit = unit.replace(/"/g, '\\"');
          newFrontmatter += `unit: "${escapedUnit}"
`;
        }
        const dataYaml = this.plugin.formatDataToYaml(existingData);
        newFrontmatter += dataYaml;
        const newContent = `---
${newFrontmatter}---${body ? `

${body}` : ""}`;
        try {
          const oldPath = this.file.path;
          const oldBasename = this.file.basename;
          await this.app.vault.modify(this.file, newContent);
          let updatedFile = this.file;
          if (name !== oldBasename) {
            try {
              const newFileName = name.replace(/[<>:"/\\|?*]/g, "_") + ".md";
              const folderPath = this.file.parent?.path || "";
              const newPath = folderPath ? `${folderPath}/${newFileName}` : newFileName;
              const renamedFile = await this.app.vault.rename(this.file, newPath);
              const fileToCheck = this.file;
              if (fileToCheck.path !== oldPath) {
                updatedFile = fileToCheck;
                this.plugin.handleTrackerRenamed(oldPath, updatedFile);
              }
            } catch (renameError) {
              const errorMsg = renameError instanceof Error ? renameError.message : String(renameError);
              console.error("Tracker: error renaming file", {
                oldPath,
                newFileName: name.replace(/[<>:"/\\|?*]/g, "_") + ".md",
                error: errorMsg,
                renameError
              });
            }
          }
          new import_obsidian7.Notice(`${SUCCESS_MESSAGES.TRACKER_UPDATED}: ${name}`);
          this.plugin.invalidateCacheForFile(updatedFile);
          if (oldPath !== updatedFile.path) {
            for (const block of Array.from(this.plugin.activeBlocks)) {
              const trackers = block.containerEl.querySelectorAll(
                `.tracker-notes__tracker[data-file-path="${oldPath}"]`
              );
              trackers.forEach((tracker) => {
                tracker.dataset.filePath = updatedFile.path;
              });
            }
          }
          await this.plugin.refreshTrackersForFile(updatedFile);
          this.close();
        } catch (error) {
          const errorMsg = error instanceof Error ? error.message : String(error);
          new import_obsidian7.Notice(`${ERROR_MESSAGES.UPDATE_ERROR}: ${errorMsg}`);
          console.error("Tracker: error updating tracker", error);
        }
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        new import_obsidian7.Notice(`${ERROR_MESSAGES.UPDATE_ERROR}: ${errorMsg}`);
        console.error("Tracker: error updating tracker", error);
      }
    });
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/ui/modals/file-picker-modal.ts
var import_obsidian8 = require("obsidian");
var FilePickerModal = class extends import_obsidian8.Modal {
  constructor(app, files, onPick) {
    super(app);
    this.files = files;
    this.onPick = onPick;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    if (this.files.length === 0) {
      new import_obsidian8.Notice(MODAL_LABELS.NO_TRACKERS_FOUND);
      this.close();
      return;
    }
    contentEl.createEl("h3", { text: MODAL_LABELS.SELECT_TRACKER });
    this.files.slice(0, 200).forEach((file) => {
      const btn = contentEl.createEl("button", { text: file.path });
      btn.onclick = () => {
        this.close();
        this.onPick(file);
      };
    });
  }
  onClose() {
    this.onPick(null);
    this.contentEl.empty();
  }
};

// src/styles/index.css
var styles_default = `/* ============================================\r
   Tracker: Habits & Metrics - Base Styles\r
   ============================================ */\r
\r
/* Reset hover effects for code blocks */\r
.markdown-source-view.mod-cm6 .cm-embed-block.cm-lang-habit:hover,\r
.markdown-source-view.mod-cm6 .cm-embed-block.cm-lang-tracker:hover { \r
  box-shadow: none; \r
  cursor: default; \r
}\r
\r
/* ============================================\r
   Main Container\r
   ============================================ */\r
.tracker-notes { \r
  margin: 1.25em 0; \r
  padding: 1.25em; \r
  border-radius: 12px; \r
  background: var(--background-secondary); \r
  border: 1px solid var(--background-modifier-border);\r
  box-shadow: \r
    0 1px 2px rgba(0, 0, 0, 0.04),\r
    0 4px 12px rgba(0, 0, 0, 0.06);\r
  box-sizing: border-box; \r
  max-width: 100%; \r
  overflow-x: hidden;\r
  transition: box-shadow 0.2s ease;\r
}\r
\r
.tracker-notes:hover {\r
  box-shadow: \r
    0 2px 4px rgba(0, 0, 0, 0.04),\r
    0 6px 16px rgba(0, 0, 0, 0.08);\r
}\r
\r
/* ============================================\r
   Header Section\r
   ============================================ */\r
.tracker-notes__header { \r
  display: flex; \r
  flex-direction: column; \r
  gap: 1em; \r
  margin: 0.75em 0; \r
  margin-bottom: 1em; \r
  box-sizing: border-box; \r
  align-items: center; \r
}\r
\r
.tracker-notes__header-title { \r
  display: flex; \r
  align-items: center; \r
  gap: 0.5em; \r
  font-weight: 700; \r
  font-size: 1.2em; \r
  color: var(--text-normal);\r
  letter-spacing: -0.01em;\r
}\r
\r
.tracker-notes__header-icon { \r
  font-size: 1.35em;\r
  opacity: 0.9;\r
}\r
\r
.tracker-notes__header-label { \r
  font-size: inherit;\r
}\r
\r
.tracker-notes__date-picker-container { \r
  width: 100%; \r
  display: flex; \r
  justify-content: center; \r
}\r
\r
/* ============================================\r
   Trackers Grid\r
   ============================================ */\r
.tracker-notes__trackers { \r
  display: grid; \r
  grid-template-columns: repeat(2, 1fr); \r
  gap: 1em; \r
}\r
\r
/* ============================================\r
   Folder Hierarchy\r
   ============================================ */\r
.tracker-notes__hierarchy { \r
  display: flex; \r
  flex-direction: column; \r
  gap: 1.75em; \r
}\r
\r
.tracker-notes__folder-node { \r
  display: flex; \r
  flex-direction: column; \r
  margin-bottom: 1.15em; \r
}\r
\r
.tracker-notes__folder-node.level-0 { \r
  padding-left: 0; \r
  margin-bottom: 0; \r
}\r
\r
.tracker-notes__folder-node.level-1 { \r
  padding-left: 0; \r
  margin-top: 1.15em; \r
  margin-bottom: 1.4em; \r
}\r
\r
.tracker-notes__folder-node.level-2 { \r
  padding-left: 1.15em; \r
  margin-top: 0.85em; \r
  margin-bottom: 1.15em; \r
}\r
\r
.tracker-notes__folder-node.level-3 { \r
  padding-left: 0.6em; \r
  margin-top: 0.6em; \r
  margin-bottom: 0.85em; \r
}\r
\r
.tracker-notes__folder-header { \r
  font-weight: 700; \r
  color: var(--text-normal); \r
  margin-bottom: 0.85em; \r
  margin-top: 0.6em; \r
  padding-bottom: 0.6em; \r
  border-bottom: 2px solid var(--background-modifier-border); \r
  display: flex; \r
  align-items: center; \r
  justify-content: space-between; \r
  gap: 0.55em;\r
  transition: border-color 0.2s ease;\r
}\r
\r
.tracker-notes__folder-header.level-0 { \r
  font-size: 1.45em; \r
  margin-top: 0;\r
  letter-spacing: -0.01em;\r
}\r
\r
.tracker-notes__folder-header.level-1 { \r
  font-size: 1.4em; \r
  margin-top: 0.3em;\r
  letter-spacing: -0.01em;\r
}\r
\r
.tracker-notes__folder-header.level-2 { \r
  font-size: 1.2em; \r
  margin-top: 0.3em; \r
  border-bottom-width: 1px;\r
}\r
\r
.tracker-notes__folder-header.level-3 { \r
  font-size: 1.05em; \r
  margin-top: 0.3em; \r
  border-bottom-width: 1px;\r
}\r
\r
/* ============================================\r
   Error & Success Messages\r
   ============================================ */\r
.tracker-notes__error { \r
  color: var(--text-on-accent, #ffffff); \r
  padding: 0.85em 1.15em; \r
  background: var(--text-error, #d32f2f); \r
  border: none; \r
  border-radius: 10px; \r
  margin: 0.6em 0; \r
  font-size: 0.9em; \r
  font-weight: 600; \r
  word-wrap: break-word; \r
  overflow-wrap: break-word; \r
  line-height: 1.5; \r
  box-shadow: 0 3px 10px rgba(200, 0, 0, 0.25);\r
}\r
\r
.tracker-notes__success { \r
  color: var(--text-success, var(--text-normal)); \r
  padding: 0.5em 0.75em; \r
  background: var(--background-modifier-success, var(--background-modifier-border)); \r
  border-radius: 8px; \r
  margin: 0.45em 0; \r
  font-size: 0.85em; \r
  word-wrap: break-word; \r
  overflow-wrap: break-word;\r
}\r
\r
/* ============================================\r
   Loading Indicator\r
   ============================================ */\r
.tracker-notes__loading { \r
  display: none; \r
  align-items: center; \r
  gap: 0.45em; \r
  font-size: 0.85em; \r
  color: var(--text-muted); \r
  margin-top: 0.35em; \r
}\r
\r
.tracker-notes__loading.is-active { \r
  display: flex; \r
}\r
\r
.tracker-notes__loading-dot { \r
  width: 0.9em; \r
  height: 0.9em; \r
  border-radius: 50%; \r
  border: 2px solid var(--interactive-accent); \r
  border-top-color: transparent; \r
  animation: tracker-loading-spin 0.8s linear infinite; \r
}\r
\r
@keyframes tracker-loading-spin { \r
  0% { transform: rotate(0deg); } \r
  100% { transform: rotate(360deg); } \r
}\r
\r
/* ============================================\r
   View Mode Visibility\r
   ============================================ */\r
\r
/* Hide buttons in preview mode */\r
.markdown-preview-view .tracker-notes__settings-btn,\r
.markdown-preview-view .tracker-notes__order-btns {\r
  display: none !important;\r
}\r
\r
/* Explicit display in edit mode */\r
.markdown-source-view .tracker-notes__settings-btn,\r
.markdown-source-view .tracker-notes__order-btns {\r
  display: flex;\r
}\r
\r
/* Keep old limit classes for backward compatibility */\r
.tracker-notes__tracker-header.tracker-notes__limit-error,\r
.tracker-notes__tracker-header.tracker-notes__limit-success {\r
  transition: border-color 0.2s ease;\r
}\r
\r
/* ============================================\r
   Iconize Integration\r
   ============================================ */\r
.tracker-notes__folder-header .iconize-icon,\r
.tracker-notes__tracker-title .iconize-icon {\r
  display: inline-block;\r
  vertical-align: middle;\r
  line-height: 1;\r
}\r
\r
.tracker-notes__folder-header .lucide-icon,\r
.tracker-notes__tracker-title .lucide-icon {\r
  font-size: 0.9em;\r
  opacity: 0.85;\r
}\r
\r
/* ============================================\r
   Animations\r
   ============================================ */\r
@keyframes pulse { \r
  0%, 100% { transform: scale(1); } \r
  50% { transform: scale(1.1); } \r
}\r
\r
/* ============================================\r
   Tracker: Habits & Metrics - Component Styles\r
   ============================================ */\r
\r
/* ============================================\r
   Individual Tracker Card\r
   ============================================ */\r
.tracker-notes__tracker { \r
  padding: 1em 1.25em; \r
  border-radius: 10px; \r
  background: var(--background-primary); \r
  border: 1px solid var(--background-modifier-border); \r
  box-shadow: \r
    0 1px 3px rgba(0, 0, 0, 0.04),\r
    0 2px 8px rgba(0, 0, 0, 0.04);\r
  box-sizing: border-box; \r
  max-width: 100%; \r
  overflow-x: hidden;\r
  position: relative;\r
}\r
\r
/* ============================================\r
   Tracker Header\r
   ============================================ */\r
.tracker-notes__tracker-header { \r
  margin-bottom: 0.85em; \r
  padding-bottom: 0.65em; \r
  border-bottom: 1px solid var(--background-modifier-border); \r
  display: flex; \r
  align-items: center; \r
  justify-content: space-between; \r
  gap: 0.5em;\r
  position: relative;\r
}\r
\r
/* Limit progress indicator */\r
.tracker-notes__tracker-header::after {\r
  content: '';\r
  position: absolute;\r
  bottom: -1px;\r
  left: 0;\r
  height: 2px;\r
  width: var(--limit-progress-width, 0%);\r
  background-color: var(--limit-progress-color, transparent);\r
  transition: width 0.3s ease, background-color 0.3s ease;\r
  z-index: 1;\r
  border-radius: 1px;\r
}\r
\r
.tracker-notes__tracker-title { \r
  font-weight: 600; \r
  font-size: 1em; \r
  color: var(--text-normal); \r
  margin: 0; \r
  word-wrap: break-word; \r
  overflow-wrap: break-word; \r
  text-decoration: none !important; \r
  flex: 1; \r
  min-width: 0;\r
  display: flex;\r
  align-items: center;\r
  gap: 0.4em;\r
}\r
\r
.tracker-notes__tracker-title a {\r
  color: inherit;\r
  text-decoration: none;\r
  transition: color 0.15s ease;\r
}\r
\r
.tracker-notes__tracker-title a:hover {\r
  color: var(--text-accent, var(--interactive-accent));\r
}\r
\r
/* ============================================\r
   Settings & Order Buttons\r
   ============================================ */\r
.tracker-notes__settings-btn { \r
  padding: 0.35em 0.5em !important; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 6px; \r
  background: var(--background-secondary); \r
  color: var(--text-muted); \r
  cursor: pointer; \r
  font-size: 0.85em; \r
  transition: all 0.2s ease; \r
  white-space: nowrap; \r
  flex-shrink: 0; \r
  flex-grow: 0; \r
  width: auto; \r
  min-width: 2em; \r
  max-width: 2.5em; \r
  height: 2em; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  opacity: 0.6;\r
}\r
\r
.tracker-notes__settings-btn:hover { \r
  background: var(--interactive-hover); \r
  border-color: var(--interactive-accent); \r
  transform: translateY(-1px); \r
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); \r
  opacity: 1;\r
  color: var(--text-normal);\r
}\r
\r
.tracker-notes__settings-btn:active { \r
  transform: scale(0.95) translateY(0); \r
}\r
\r
.tracker-notes__order-btns { \r
  display: flex; \r
  gap: 0.3em; \r
  align-items: center; \r
  flex-shrink: 0; \r
}\r
\r
.tracker-notes__order-btn-up, \r
.tracker-notes__order-btn-down { \r
  padding: 0.35em 0.5em !important; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 6px; \r
  background: var(--background-secondary); \r
  color: var(--text-muted); \r
  cursor: pointer; \r
  font-size: 0.85em; \r
  transition: all 0.2s ease; \r
  white-space: nowrap; \r
  flex-shrink: 0; \r
  width: auto; \r
  min-width: 2em; \r
  max-width: 2.5em; \r
  height: 2em; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  opacity: 0.6;\r
}\r
\r
.tracker-notes__order-btn-up:hover, \r
.tracker-notes__order-btn-down:hover { \r
  background: var(--interactive-hover); \r
  border-color: var(--interactive-accent); \r
  transform: translateY(-1px); \r
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1); \r
  opacity: 1;\r
  color: var(--text-normal);\r
}\r
\r
.tracker-notes__order-btn-up:active, \r
.tracker-notes__order-btn-down:active { \r
  transform: scale(0.95) translateY(0); \r
}\r
\r
.tracker-notes__order-btn-up:disabled, \r
.tracker-notes__order-btn-down:disabled { \r
  opacity: 0.25; \r
  cursor: not-allowed; \r
}\r
\r
.tracker-notes__order-btn-up:disabled:hover, \r
.tracker-notes__order-btn-down:disabled:hover { \r
  background: var(--background-secondary); \r
  border-color: var(--background-modifier-border); \r
  transform: none; \r
  box-shadow: none; \r
}\r
\r
/* ============================================\r
   Controls Row\r
   ============================================ */\r
.tracker-notes__row { \r
  display: flex; \r
  align-items: center; \r
  gap: 0.65em; \r
  padding: 0.5em 0; \r
  flex-wrap: wrap; \r
}\r
\r
.tracker-notes__value { \r
  min-width: 2.5em; \r
  text-align: center; \r
  font-weight: 700; \r
  font-size: 1.1em; \r
  color: var(--text-normal); \r
  transition: transform 0.2s ease, color 0.2s ease; \r
  flex-shrink: 0;\r
  padding: 0.25em 0.5em;\r
  background: var(--background-secondary);\r
  border-radius: 6px;\r
}\r
\r
.tracker-notes__value.updated { \r
  animation: pulse 0.3s ease;\r
  color: var(--interactive-accent);\r
}\r
\r
/* ============================================\r
   Form Inputs\r
   ============================================ */\r
.tracker-notes input { \r
  outline: none !important; \r
}\r
\r
.tracker-notes input[type="number"] { \r
  width: 5em; \r
  min-width: 5em; \r
  max-width: 100%; \r
  padding: 0.5em 0.75em; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 8px; \r
  background: var(--background-primary);\r
  color: var(--text-normal); \r
  font-size: 0.95em;\r
  font-weight: 500;\r
  transition: border-color 0.2s ease, box-shadow 0.2s ease; \r
  box-sizing: border-box; \r
  transform: scale(1) !important;\r
}\r
\r
.tracker-notes input[type="number"]:hover {\r
  border-color: var(--background-modifier-border-hover, var(--background-modifier-border));\r
}\r
\r
.tracker-notes input[type="number"]:focus { \r
  outline: none !important; \r
  box-shadow: 0 0 0 2px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.2) !important;\r
  border-color: var(--interactive-accent);\r
}\r
\r
/* Range Slider */\r
.tracker-notes input[type="range"], \r
.tracker-notes__slider { \r
  flex: 1 1 auto; \r
  min-width: 0; \r
  height: 8px; \r
  border-radius: 4px; \r
  background: var(--background-modifier-border); \r
  outline: none; \r
  appearance: none;\r
  -webkit-appearance: none; \r
  cursor: pointer;\r
  transition: background 0.2s ease;\r
}\r
\r
.tracker-notes input[type="range"]:hover,\r
.tracker-notes__slider:hover {\r
  background: var(--background-modifier-border-hover, var(--background-modifier-border));\r
}\r
\r
.tracker-notes input[type="range"]::-webkit-slider-thumb, \r
.tracker-notes__slider::-webkit-slider-thumb { \r
  appearance: none;\r
  -webkit-appearance: none;\r
  -moz-appearance: none;\r
  width: 20px; \r
  height: 20px; \r
  border-radius: 50%; \r
  background: var(--interactive-accent); \r
  cursor: pointer; \r
  transition: all 0.2s ease; \r
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);\r
  border: 2px solid var(--background-primary);\r
}\r
\r
.tracker-notes input[type="range"]::-webkit-slider-thumb:hover, \r
.tracker-notes__slider::-webkit-slider-thumb:hover { \r
  transform: scale(1.15); \r
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\r
}\r
\r
.tracker-notes input[type="range"]::-moz-range-thumb, \r
.tracker-notes__slider::-moz-range-thumb { \r
  width: 20px; \r
  height: 20px; \r
  border-radius: 50%; \r
  background: var(--interactive-accent); \r
  cursor: pointer; \r
  border: 2px solid var(--background-primary);\r
  transition: all 0.2s ease; \r
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);\r
}\r
\r
.tracker-notes input[type="range"]::-moz-range-thumb:hover, \r
.tracker-notes__slider::-moz-range-thumb:hover { \r
  transform: scale(1.15); \r
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);\r
}\r
\r
/* ============================================\r
   Progress Bar (Scale Input)\r
   ============================================ */\r
.tracker-notes__progress-bar-wrapper { \r
  display: inline; \r
  white-space: normal; \r
  width: 100%; \r
}\r
\r
.tracker-notes__progress-bar-input { \r
  height: var(--input-height, 2.75em); \r
  width: 100%; \r
  border-radius: 10px;\r
  border: 1px solid var(--background-modifier-border);\r
  position: relative; \r
  cursor: col-resize; \r
  background: var(--background-secondary);\r
  user-select: none; \r
  box-sizing: border-box; \r
  outline: none; \r
  overflow: hidden;\r
  transition: border-color 0.2s ease, box-shadow 0.2s ease;\r
}\r
\r
.tracker-notes__progress-bar-progress { \r
  height: 100%; \r
  background: linear-gradient(90deg, \r
    var(--interactive-accent) 0%, \r
    color-mix(in srgb, var(--interactive-accent) 85%, white) 100%\r
  );\r
  border-radius: 10px;\r
  pointer-events: none; \r
  position: absolute; \r
  left: 0; \r
  top: 0; \r
  z-index: 3;\r
  transition: width 0.15s ease;\r
}\r
\r
.tracker-notes__progress-bar-value { \r
  position: absolute; \r
  top: 50%; \r
  left: 50%; \r
  transform: translate(-50%, -50%); \r
  font-size: 0.95em; \r
  font-weight: 700; \r
  color: var(--text-normal); \r
  pointer-events: none; \r
  z-index: 4; \r
  white-space: nowrap;\r
  text-shadow: 0 1px 1px rgb(0 0 0 / 10%);\r
}\r
\r
.tracker-notes__progress-bar-label-left { \r
  position: absolute; \r
  top: 50%; \r
  transform: translate(0, -50%); \r
  left: 0.75em; \r
  font-size: 0.8em; \r
  color: var(--text-muted); \r
  font-weight: 600; \r
  pointer-events: none; \r
  z-index: 1;\r
  opacity: 0.7;\r
}\r
\r
.tracker-notes__progress-bar-label-right { \r
  position: absolute; \r
  top: 50%; \r
  transform: translate(0, -50%); \r
  right: 0.75em;\r
  font-size: 0.8em;\r
  color: var(--text-muted); \r
  font-weight: 600; \r
  pointer-events: none; \r
  z-index: 1;\r
  opacity: 0.7;\r
}\r
\r
/* ============================================\r
   Buttons\r
   ============================================ */\r
.tracker-notes button { \r
  padding: 0.5em 1em; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 8px; \r
  background: var(--background-secondary); \r
  color: var(--text-normal); \r
  cursor: pointer; \r
  font-size: 0.9em;\r
  font-weight: 600;\r
  transition: all 0.2s ease; \r
  white-space: nowrap; \r
  flex-shrink: 0;\r
}\r
\r
.tracker-notes button:hover { \r
  background: var(--interactive-hover); \r
  border-color: var(--interactive-accent); \r
  transform: translateY(-1px); \r
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);\r
}\r
\r
.tracker-notes button:active { \r
  transform: scale(0.97) translateY(0); \r
}\r
\r
/* ============================================\r
   Text Input\r
   ============================================ */\r
.tracker-notes__text-input { \r
  width: 100%; \r
  max-width: 100%; \r
  padding: 0.65em 0.85em; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 10px; \r
  background: var(--background-primary); \r
  color: var(--text-normal); \r
  font-family: inherit; \r
  font-size: 0.9em; \r
  transition: border-color 0.2s ease, box-shadow 0.2s ease; \r
  resize: vertical; \r
  min-height: 70px; \r
  box-sizing: border-box;\r
  line-height: 1.5;\r
}\r
\r
.tracker-notes__text-input:hover {\r
  border-color: var(--background-modifier-border-hover, var(--background-modifier-border));\r
}\r
\r
.tracker-notes__text-input:focus { \r
  outline: none !important; \r
  border-color: var(--interactive-accent);\r
  box-shadow: 0 0 0 3px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.15);\r
}\r
\r
/* ============================================\r
   Statistics Section\r
   ============================================ */\r
.tracker-notes__stats { \r
  margin-top: 1em; \r
  margin-bottom: 0.5em; \r
  padding-top: 0.85em; \r
  padding-bottom: 0.5em; \r
  border-top: 1px solid var(--background-modifier-border); \r
  font-size: 0.88em; \r
  color: var(--text-muted); \r
  line-height: 1.6; \r
  word-wrap: break-word; \r
  overflow-wrap: break-word; \r
}\r
\r
.tracker-notes__stats > div { \r
  margin: 0.35em 0;\r
  transition: opacity 0.2s ease;\r
}\r
\r
.tracker-notes__stats-section { \r
  margin: 0.6em 0; \r
}\r
\r
.tracker-notes__stats-item { \r
  margin: 0.3em 0; \r
  padding: 0.25em 0; \r
}\r
\r
.tracker-notes__stats-streak { \r
  font-size: 1em; \r
}\r
\r
/* Statistics Card */\r
.tracker-notes__stats-card { \r
  background: var(--background-secondary); \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 10px; \r
  padding: 0.85em 1.1em; \r
  margin: 0.6em 0; \r
  box-shadow: \r
    0 1px 3px rgba(0, 0, 0, 0.04),\r
    0 2px 6px rgba(0, 0, 0, 0.03);\r
}\r
\r
.tracker-notes__stats-section-title { \r
  font-weight: 700; \r
  font-size: 0.7em; \r
  color: var(--text-muted); \r
  margin-bottom: 0.7em; \r
  text-transform: uppercase; \r
  letter-spacing: 1.2px; \r
  opacity: 0.8;\r
  display: flex;\r
  align-items: center;\r
  gap: 0.4em;\r
}\r
\r
.tracker-notes__stats-metric { \r
  display: flex; \r
  align-items: baseline; \r
  margin: 0.55em 0; \r
  padding: 0.35em 0; \r
  gap: 0.45em; \r
  flex-wrap: wrap; \r
}\r
\r
.tracker-notes__stats-icon { \r
  font-size: 1.1em; \r
  line-height: 1; \r
  display: inline-flex; \r
  align-items: center; \r
  justify-content: center;\r
  flex-shrink: 0;\r
  opacity: 0.9;\r
}\r
\r
.tracker-notes__stats-icon--streak { \r
  font-size: 1.25em; \r
}\r
\r
.tracker-notes__stats-label { \r
  color: var(--text-muted); \r
  font-size: 0.9em; \r
  font-weight: 500;\r
}\r
\r
.tracker-notes__stats-value { \r
  color: var(--text-normal); \r
  font-weight: 700; \r
  font-size: 0.98em; \r
}\r
\r
.tracker-notes__stats-value--large { \r
  font-size: 1.15em; \r
  font-weight: 800;\r
}\r
\r
.tracker-notes__stats-value-sub { \r
  color: var(--text-muted); \r
  font-size: 0.85em; \r
  font-weight: 500; \r
}\r
\r
.tracker-notes__stats-value--success { \r
  color: var(--text-success, var(--interactive-accent)); \r
}\r
\r
.tracker-notes__stats-value--warning { \r
  color: var(--text-warning, var(--interactive-accent)); \r
}\r
\r
.tracker-notes__stats-value--error { \r
  color: var(--text-error, var(--interactive-accent)); \r
}\r
\r
.tracker-notes__stats-value--accent { \r
  color: var(--interactive-accent, var(--text-normal)); \r
}\r
\r
/* Completion Rate with Progress Bar */\r
.tracker-notes__stats-metric--completion { \r
  flex-direction: column; \r
  gap: 0.55em; \r
}\r
\r
.tracker-notes__stats-completion-header { \r
  display: flex; \r
  align-items: baseline; \r
  gap: 0.45em; \r
  flex-wrap: wrap; \r
}\r
\r
.tracker-notes__stats-progress-bar { \r
  width: 100%; \r
  height: 10px; \r
  background: var(--background-modifier-border); \r
  border-radius: 5px; \r
  overflow: hidden; \r
  position: relative; \r
  margin-top: 0.25em;\r
}\r
\r
.tracker-notes__stats-progress-fill { \r
  height: 100%; \r
  border-radius: 5px; \r
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease; \r
}\r
\r
.tracker-notes__stats-progress-fill.tracker-notes__stats-value--success { \r
  background: linear-gradient(90deg, \r
    var(--text-success, var(--interactive-accent)) 0%, \r
    color-mix(in srgb, var(--text-success, var(--interactive-accent)) 80%, white) 100%\r
  );\r
}\r
\r
.tracker-notes__stats-progress-fill.tracker-notes__stats-value--warning { \r
  background: linear-gradient(90deg, \r
    var(--text-warning, var(--interactive-accent)) 0%, \r
    color-mix(in srgb, var(--text-warning, var(--interactive-accent)) 80%, white) 100%\r
  );\r
}\r
\r
.tracker-notes__stats-progress-fill.tracker-notes__stats-value--error { \r
  background: linear-gradient(90deg, \r
    var(--text-error, var(--interactive-accent)) 0%, \r
    color-mix(in srgb, var(--text-error, var(--interactive-accent)) 80%, white) 100%\r
  );\r
}\r
\r
/* Streak Styles */\r
.tracker-notes__stats-metric--streak { \r
  margin: 0.55em 0; \r
  padding: 0.45em 0;\r
}\r
\r
/* Min/Max Inline Display */\r
.tracker-notes__stats-metric--minmax { \r
  gap: 0.35em; \r
}\r
\r
/* ============================================\r
   Heatmap\r
   ============================================ */\r
.tracker-notes__heatmap { \r
  display: flex; \r
  flex-direction: row-reverse; \r
  gap: 0.35em; \r
  overflow-x: auto; \r
  padding: 0.6em 0; \r
  margin-top: 0.6em; \r
  min-height: 2.75em; \r
  max-width: 100%; \r
  box-sizing: border-box; \r
  touch-action: pan-x pan-y;\r
  transition: opacity 0.15s ease;\r
}\r
\r
.tracker-notes__heatmap::-webkit-scrollbar { \r
  height: 6px; \r
}\r
\r
.tracker-notes__heatmap::-webkit-scrollbar-track { \r
  background: var(--background-modifier-border); \r
  border-radius: 3px; \r
}\r
\r
.tracker-notes__heatmap::-webkit-scrollbar-thumb { \r
  background: var(--text-muted); \r
  border-radius: 3px;\r
  transition: background 0.2s ease;\r
}\r
\r
.tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { \r
  background: var(--text-normal); \r
}\r
\r
.tracker-notes__heatmap-day { \r
  aspect-ratio: 1; \r
  min-width: 2.65em; \r
  max-width: 3.2em; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  border-radius: 8px; \r
  font-size: 0.88em; \r
  background: var(--background-modifier-border); \r
  color: var(--text-muted); \r
  transition: 0.1s; \r
  cursor: pointer; \r
  font-weight: 600; \r
  flex-shrink: 0;\r
  border: 1px solid transparent;\r
}\r
\r
.tracker-notes__heatmap-day:hover:not(.before-start):not(.after-today) { \r
  filter: brightness(0.95);\r
}\r
\r
.tracker-notes__heatmap-day.has-value.good-habit { \r
  background: var(--interactive-accent); \r
  color: var(--text-on-accent, var(--text-normal));\r
  box-shadow: 0 2px 6px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.3);\r
}\r
\r
.tracker-notes__heatmap-day.has-value.bad-habit { \r
  background: var(--text-error, var(--background-modifier-error)); \r
  color: var(--text-on-accent, var(--text-normal));\r
  box-shadow: 0 2px 6px rgba(200, 0, 0, 0.25);\r
}\r
\r
.tracker-notes__heatmap-day.bad-habit:not(.has-value):not(.before-start):not(.after-today) { \r
  background: var(--interactive-accent); \r
  color: var(--text-on-accent, var(--text-normal));\r
  box-shadow: 0 2px 6px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.3);\r
}\r
\r
.tracker-notes__heatmap-day.good-habit.before-start,\r
.tracker-notes__heatmap-day.good-habit.after-today,\r
.tracker-notes__heatmap-day.bad-habit.before-start,\r
.tracker-notes__heatmap-day.bad-habit.after-today { \r
  background: var(--background-modifier-border); \r
  opacity: 0.5;\r
  cursor: default;\r
}\r
\r
.tracker-notes__heatmap-day.start-day { \r
  flex-direction: column;\r
  justify-content: center;\r
  align-items: center;\r
  line-height: 1;\r
}\r
\r
.tracker-notes__heatmap-day.start-day::after {\r
  content: "START";\r
  font-size: 0.45em;\r
  line-height: 1;\r
  margin-top: 0.15em;\r
  opacity: 0.75;\r
  font-weight: 700;\r
  letter-spacing: 0.5px;\r
}\r
\r
/* ============================================\r
   Calendar\r
   ============================================ */\r
.tracker-notes__calendar { \r
  display: grid; \r
  grid-template-columns: repeat(7, 1fr); \r
  gap: 0.35em; \r
  margin-top: 0.85em; \r
  max-width: 100%; \r
}\r
\r
.tracker-notes__calendar-day { \r
  aspect-ratio: 1; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  border-radius: 6px; \r
  font-size: 0.8em; \r
  background: var(--background-modifier-border); \r
  color: var(--text-muted); \r
  transition: all 0.2s ease; \r
  cursor: default; \r
  min-width: 0;\r
  font-weight: 500;\r
}\r
\r
.tracker-notes__calendar-day.has-value { \r
  background: var(--interactive-accent); \r
  color: var(--text-on-accent); \r
  font-weight: 700; \r
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);\r
}\r
\r
.tracker-notes__calendar-day:hover { \r
  transform: scale(1.1); \r
}\r
\r
.tracker-notes__calendar-day.start-day { \r
  position: relative; \r
  box-shadow: 0 0 0 2px var(--text-accent, var(--interactive-accent)) !important; \r
  opacity: 0.9; \r
}\r
\r
/* ============================================\r
   Chart\r
   ============================================ */\r
.tracker-notes__chart { \r
  margin-top: 0.85em; \r
  margin-bottom: 0.5em; \r
  border-top: 1px solid var(--background-modifier-border); \r
  padding-top: 0.85em; \r
  width: 100%; \r
  max-width: 100%; \r
  position: relative; \r
  height: 200px; \r
  box-sizing: border-box; \r
  overflow: hidden;\r
  transition: opacity 0.15s ease;\r
}\r
\r
.tracker-notes__chart canvas { \r
  max-width: 100% !important; \r
  height: 180px !important; \r
}\r
\r
/* ============================================\r
   Date Picker\r
   ============================================ */\r
.tracker-notes__date-picker { \r
  display: flex; \r
  align-items: center; \r
  gap: 0.5em; \r
  flex-wrap: wrap; \r
  justify-content: center; \r
  max-width: 100%;\r
  background: var(--background-primary);\r
  border-radius: 12px;\r
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);\r
}\r
\r
.tracker-notes__date-nav-btn { \r
  padding: 0.5em 0.85em; \r
  font-size: 1em; \r
  min-width: 2.5em; \r
  height: 2.5em; \r
  border: 1px solid var(--background-modifier-border); \r
  border-radius: 8px; \r
  background: var(--background-secondary); \r
  color: var(--text-normal); \r
  cursor: pointer; \r
  transition: all 0.2s ease; \r
  font-weight: 700; \r
  display: flex; \r
  align-items: center; \r
  justify-content: center; \r
  flex-shrink: 0;\r
}\r
\r
.tracker-notes__date-nav-btn:hover { \r
  background: var(--interactive-hover); \r
  border-color: var(--interactive-accent);\r
  transform: translateY(-1px); \r
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);\r
}\r
\r
.tracker-notes__date-nav-btn:active { \r
  transform: scale(0.95) translateY(0); \r
}\r
\r
.tracker-notes__date-input { \r
  padding: 0.5em 0.85em; \r
  border: 1px solid var(--background-modifier-border) !important; \r
  border-radius: 8px; \r
  background: var(--background-secondary); \r
  color: var(--text-normal); \r
  font-size: 1em !important; \r
  transition: all 0.2s ease; \r
  height: 2.5em; \r
  width: 165px; \r
  box-sizing: border-box; \r
  font-weight: 600; \r
  text-align: center; \r
  flex-shrink: 0;\r
}\r
\r
.tracker-notes__date-input:hover {\r
  border-color: var(--background-modifier-border-hover, var(--background-modifier-border)) !important;\r
}\r
\r
.tracker-notes__date-input.is-updating { \r
  opacity: 0.6; \r
  cursor: progress; \r
}\r
\r
.tracker-notes__date-input:focus { \r
  outline: none !important; \r
  box-shadow: 0 0 0 2px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.2) !important;\r
  border-color: var(--interactive-accent) !important;\r
}\r
\r
.tracker-notes__date-btn { \r
  padding: 0.5em 1.15em; \r
  font-size: 0.9em; \r
  white-space: nowrap; \r
  flex-shrink: 0; \r
  border: none; \r
  border-radius: 8px; \r
  background: var(--interactive-accent); \r
  color: var(--text-on-accent, var(--text-normal)); \r
  cursor: pointer; \r
  transition: all 0.2s ease; \r
  font-weight: 700; \r
  height: 2.5em;\r
  box-shadow: 0 2px 6px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.25);\r
}\r
\r
.tracker-notes__date-btn:hover { \r
  background: var(--interactive-accent-hover, var(--interactive-accent)); \r
  transform: translateY(-1px); \r
  box-shadow: 0 4px 12px rgba(var(--interactive-accent-rgb, 127, 109, 242), 0.35);\r
}\r
\r
.tracker-notes__date-btn:active { \r
  transform: scale(0.97) translateY(0); \r
}\r
\r
/* ============================================\r
   Modal Buttons\r
   ============================================ */\r
.tracker-modal-buttons {\r
  display: flex;\r
  justify-content: space-between;\r
  margin-top: 1.75em;\r
  gap: 1em;\r
}\r
\r
.tracker-modal-buttons button {\r
  padding: 0.65em 1.25em;\r
  border-radius: 8px;\r
  cursor: pointer;\r
  border: 1px solid var(--background-modifier-border);\r
  transition: all 0.2s ease;\r
  font-weight: 600;\r
}\r
\r
.tracker-modal-buttons button.mod-warning {\r
  background: var(--background-secondary);\r
  color: var(--text-normal);\r
}\r
\r
.tracker-modal-buttons button.mod-warning:hover {\r
  background: var(--text-error);\r
  border-color: var(--text-error);\r
  color: var(--text-on-accent);\r
  box-shadow: 0 3px 10px rgba(200, 0, 0, 0.25);\r
}\r
\r
.tracker-modal-buttons button.mod-cta {\r
  background: var(--interactive-accent);\r
  color: var(--text-on-accent);\r
  border-color: var(--interactive-accent);\r
}\r
\r
.tracker-modal-buttons button.mod-cta:hover {\r
  background: var(--interactive-accent-hover, var(--interactive-accent));\r
  border-color: var(--interactive-accent-hover, var(--interactive-accent));\r
}\r
\r
/* ============================================\r
   Tracker: Habits & Metrics - Responsive Styles\r
   ============================================ */\r
\r
/* Switch to single column on medium screens */\r
@media (max-width: 1600px) {\r
  .tracker-notes__trackers { \r
    display: grid !important; \r
    grid-template-columns: 1fr !important; \r
    gap: 1em; \r
  }\r
}\r
\r
/* Medium screens */\r
@media (max-width: 900px) {\r
  .tracker-notes__trackers { \r
    gap: 0.85em; \r
  }\r
  \r
  .tracker-notes__tracker { \r
    padding: 0.85em; \r
  }\r
}\r
\r
/* Tablet/Mobile */\r
@media (max-width: 700px) {\r
  .tracker-notes { \r
    padding: 0.65em; \r
    margin: 0.6em 0; \r
    border-radius: 10px; \r
  }\r
  \r
  .tracker-notes__header { \r
    margin: 0.5em 0; \r
    margin-bottom: 0.35em; \r
    gap: 0.55em; \r
  }\r
  \r
  .tracker-notes__header-title { \r
    font-size: 1.05em; \r
  }\r
  \r
  .tracker-notes__trackers { \r
    display: grid !important; \r
    grid-template-columns: 1fr !important; \r
    gap: 0.6em; \r
  }\r
  \r
  .tracker-notes__tracker { \r
    padding: 0.65em; \r
    border-radius: 8px; \r
  }\r
  \r
  .tracker-notes__tracker-header { \r
    margin-bottom: 0.55em; \r
    padding-bottom: 0.45em; \r
    overflow: hidden; \r
    white-space: nowrap; \r
    gap: 0.35em; \r
  }\r
  \r
  .tracker-notes__tracker-title { \r
    font-size: 0.92em; \r
    min-width: 0; \r
    overflow: hidden; \r
    text-overflow: ellipsis; \r
    white-space: nowrap; \r
    flex: 1 1 auto; \r
  }\r
  \r
  .tracker-notes__order-btns { \r
    display: flex; \r
    gap: 0.25em; \r
    align-items: center; \r
    flex-shrink: 0; \r
  }\r
  \r
  .tracker-notes__order-btn-up, \r
  .tracker-notes__order-btn-down { \r
    width: 1.85em; \r
    min-width: 1.85em; \r
    max-width: 1.85em; \r
    height: 1.85em; \r
    padding: 0 !important; \r
    font-size: 0.8em; \r
  }\r
  \r
  .tracker-notes__settings-btn { \r
    flex-shrink: 0; \r
    flex-grow: 0; \r
    width: 1.85em; \r
    min-width: 1.85em; \r
    max-width: 1.85em; \r
    height: 1.85em; \r
    padding: 0 !important; \r
    display: flex; \r
    align-items: center; \r
    justify-content: center; \r
  }\r
  \r
  .tracker-notes__date-picker-container { \r
    padding: 0; \r
  }\r
  \r
  .tracker-notes__date-picker { \r
    gap: 0.35em; \r
    flex-wrap: wrap;\r
    padding: 0.4em;\r
    border-radius: 10px;\r
  }\r
  \r
  .tracker-notes__date-nav-btn { \r
    padding: 0.4em 0.65em; \r
    font-size: 0.9em; \r
    min-width: 2.1em; \r
    height: 2.25em; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
    flex-shrink: 0; \r
  }\r
  \r
  .tracker-notes__date-input { \r
    padding: 0.4em 0.65em; \r
    font-size: 0.9em !important; \r
    height: 2.25em; \r
    width: auto !important; \r
    min-width: auto !important; \r
    max-width: none !important; \r
    flex-shrink: 0; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__row { \r
    gap: 0.45em; \r
    padding: 0.35em 0; \r
  }\r
  \r
  .tracker-notes__value { \r
    font-size: 0.95em; \r
    min-width: 2.1em;\r
    padding: 0.2em 0.4em;\r
  }\r
  \r
  .tracker-notes input[type="number"] { \r
    width: 100%; \r
    padding: 0.35em 0.55em; \r
    font-size: 0.88em; \r
    background: var(--background-primary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes button { \r
    padding: 0.35em 0.65em; \r
    font-size: 0.88em; \r
    width: 100%; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__text-input { \r
    padding: 0.45em; \r
    font-size: 0.88em; \r
    min-height: 55px; \r
    background: var(--background-primary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__stats { \r
    margin-top: 0.55em; \r
    margin-bottom: 0.45em; \r
    padding-top: 0.55em; \r
    padding-bottom: 0.45em; \r
    font-size: 0.82em; \r
  }\r
  \r
  .tracker-notes__stats-section { \r
    margin: 0.45em 0; \r
    padding: 0.35em 0; \r
  }\r
  \r
  .tracker-notes__stats-metric { \r
    margin: 0.35em 0; \r
    padding: 0.25em 0; \r
  }\r
  \r
  .tracker-notes__stats-section-title { \r
    font-size: 0.85em; \r
    margin-bottom: 0.35em; \r
  }\r
  \r
  .tracker-notes__stats-label { \r
    font-size: 0.85em; \r
  }\r
  \r
  .tracker-notes__stats-value { \r
    font-size: 0.92em; \r
  }\r
  \r
  .tracker-notes__stats-progress-bar { \r
    height: 7px; \r
  }\r
  \r
  .tracker-notes__stats-card {\r
    padding: 0.7em 0.9em;\r
    border-radius: 8px;\r
  }\r
  \r
  .tracker-notes__heatmap { \r
    gap: 0.25em; \r
    padding: 0.45em 0; \r
    margin-top: 0.45em; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar { \r
    height: 5px !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-track { \r
    background: transparent !important; \r
    border-radius: 0 !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-thumb { \r
    background: var(--text-muted) !important; \r
    border-radius: 2px !important; \r
    opacity: 0.5 !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { \r
    background: var(--text-normal) !important; \r
    opacity: 0.8 !important; \r
  }\r
  \r
  .tracker-notes__heatmap-day { \r
    min-width: 2.6em; \r
    max-width: 2.9em; \r
    font-size: 0.82em;\r
    border-radius: 6px;\r
  }\r
  \r
  .tracker-notes__calendar { \r
    gap: 0.2em; \r
    margin-top: 0.55em; \r
  }\r
  \r
  .tracker-notes__calendar-day { \r
    font-size: 0.68em; \r
  }\r
  \r
  .tracker-notes__chart { \r
    margin-top: 0.55em; \r
    margin-bottom: 0.45em; \r
    padding-top: 0.55em; \r
    height: 170px; \r
  }\r
  \r
  .tracker-notes__chart canvas { \r
    height: 150px !important; \r
  }\r
  \r
  .tracker-notes__hierarchy { \r
    gap: 1.1em; \r
  }\r
  \r
  .tracker-notes__folder-node { \r
    margin-bottom: 0.85em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-0 { \r
    margin-bottom: 1.1em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-1 { \r
    padding-left: 0; \r
    margin-top: 0.85em; \r
    margin-bottom: 0.85em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-2 { \r
    padding-left: 0; \r
    margin-top: 0.55em; \r
    margin-bottom: 0.55em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-3 { \r
    padding-left: 0; \r
    margin-top: 0.45em; \r
    margin-bottom: 0.45em; \r
  }\r
  \r
  .tracker-notes__folder-header { \r
    margin-bottom: 0.55em; \r
    margin-top: 0.3em; \r
    padding-bottom: 0.45em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-0 { \r
    font-size: 1.2em; \r
    margin-top: 0; \r
  }\r
  \r
  .tracker-notes__folder-header.level-1 { \r
    font-size: 1.15em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-2 { \r
    font-size: 1em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-3 { \r
    font-size: 0.92em; \r
  }\r
}\r
\r
/* Small Mobile */\r
@media (max-width: 480px) {\r
  .tracker-notes { \r
    padding: 0.5em; \r
    margin: 0.45em 0; \r
    border-radius: 8px; \r
  }\r
  \r
  .tracker-notes__header { \r
    margin: 0.45em 0; \r
    margin-bottom: 0.25em; \r
    gap: 0.45em; \r
  }\r
  \r
  .tracker-notes__header-title { \r
    font-size: 0.98em; \r
  }\r
  \r
  .tracker-notes__trackers { \r
    display: grid !important; \r
    grid-template-columns: 1fr !important; \r
    gap: 0.45em; \r
  }\r
  \r
  .tracker-notes__tracker { \r
    padding: 0.5em; \r
    border-radius: 7px; \r
  }\r
  \r
  .tracker-notes__tracker-header { \r
    margin-bottom: 0.45em; \r
    padding-bottom: 0.35em; \r
    overflow: hidden; \r
    white-space: nowrap; \r
    gap: 0.3em; \r
  }\r
  \r
  .tracker-notes__tracker-title { \r
    font-size: 0.88em; \r
    min-width: 0; \r
    overflow: hidden; \r
    text-overflow: ellipsis; \r
    white-space: nowrap; \r
    flex: 1 1 auto; \r
  }\r
  \r
  .tracker-notes__order-btns { \r
    display: flex; \r
    gap: 0.18em; \r
    align-items: center; \r
    flex-shrink: 0; \r
  }\r
  \r
  .tracker-notes__order-btn-up, \r
  .tracker-notes__order-btn-down { \r
    width: 1.65em; \r
    min-width: 1.65em; \r
    max-width: 1.65em; \r
    height: 1.65em; \r
    padding: 0 !important; \r
    font-size: 0.75em; \r
  }\r
  \r
  .tracker-notes__settings-btn { \r
    flex-shrink: 0; \r
    flex-grow: 0; \r
    width: 1.65em; \r
    min-width: 1.65em; \r
    max-width: 1.65em; \r
    height: 1.65em; \r
    padding: 0 !important; \r
    display: flex; \r
    align-items: center; \r
    justify-content: center; \r
  }\r
  \r
  .tracker-notes__date-picker { \r
    gap: 0.28em;\r
    padding: 0.35em;\r
    border-radius: 8px;\r
  }\r
  \r
  .tracker-notes__date-nav-btn { \r
    padding: 0.38em 0.55em; \r
    font-size: 0.85em; \r
    min-width: 1.9em; \r
    height: 2.05em; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
    flex-shrink: 0; \r
  }\r
  \r
  .tracker-notes__date-input { \r
    padding: 0.38em 0.55em; \r
    font-size: 0.85em !important; \r
    height: 2.05em; \r
    width: auto !important; \r
    min-width: auto !important; \r
    max-width: none !important; \r
    flex-shrink: 0; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__row { \r
    gap: 0.35em; \r
    padding: 0.28em 0; \r
  }\r
  \r
  .tracker-notes__value { \r
    font-size: 0.88em; \r
    min-width: 1.9em;\r
    padding: 0.18em 0.35em;\r
  }\r
  \r
  .tracker-notes input[type="number"] { \r
    padding: 0.28em 0.45em; \r
    font-size: 0.82em; \r
    background: var(--background-primary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes button { \r
    padding: 0.28em 0.55em; \r
    font-size: 0.82em; \r
    background: var(--background-secondary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__text-input { \r
    padding: 0.38em; \r
    font-size: 0.82em; \r
    min-height: 48px; \r
    background: var(--background-primary) !important; \r
    border: 1px solid var(--background-modifier-border) !important; \r
    color: var(--text-normal) !important; \r
  }\r
  \r
  .tracker-notes__stats { \r
    margin-top: 0.45em; \r
    margin-bottom: 0.35em; \r
    padding-top: 0.45em; \r
    padding-bottom: 0.35em; \r
    font-size: 0.78em; \r
  }\r
  \r
  .tracker-notes__stats-section { \r
    margin: 0.38em 0; \r
    padding: 0.28em 0; \r
  }\r
  \r
  .tracker-notes__stats-metric { \r
    margin: 0.28em 0; \r
    padding: 0.18em 0; \r
  }\r
  \r
  .tracker-notes__stats-section-title { \r
    font-size: 0.82em; \r
    margin-bottom: 0.28em; \r
  }\r
  \r
  .tracker-notes__stats-label { \r
    font-size: 0.82em; \r
  }\r
  \r
  .tracker-notes__stats-value { \r
    font-size: 0.88em; \r
  }\r
  \r
  .tracker-notes__stats-progress-bar { \r
    height: 5px; \r
  }\r
  \r
  .tracker-notes__stats-card {\r
    padding: 0.55em 0.75em;\r
    border-radius: 7px;\r
    margin: 0.45em 0;\r
  }\r
  \r
  .tracker-notes__heatmap { \r
    gap: 0.18em; \r
    padding: 0.35em 0; \r
    margin-top: 0.35em; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar { \r
    height: 4px !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-track { \r
    background: transparent !important; \r
    border-radius: 0 !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-thumb { \r
    background: var(--text-muted) !important; \r
    border-radius: 2px !important; \r
    opacity: 0.5 !important; \r
  }\r
  \r
  .tracker-notes__heatmap::-webkit-scrollbar-thumb:hover { \r
    background: var(--text-normal) !important; \r
    opacity: 0.8 !important; \r
  }\r
  \r
  .tracker-notes__heatmap-day { \r
    min-width: 2.85em; \r
    max-width: 3.1em; \r
    font-size: 0.88em;\r
    border-radius: 6px;\r
  }\r
  \r
  .tracker-notes__heatmap-day.start-day::after { \r
    font-size: 0.42em; \r
  }\r
  \r
  .tracker-notes__calendar { \r
    gap: 0.12em; \r
    margin-top: 0.45em; \r
  }\r
  \r
  .tracker-notes__calendar-day { \r
    font-size: 0.62em; \r
  }\r
  \r
  .tracker-notes__chart { \r
    margin-top: 0.45em; \r
    margin-bottom: 0.35em; \r
    padding-top: 0.45em; \r
    height: 145px; \r
  }\r
  \r
  .tracker-notes__chart canvas { \r
    height: 125px !important; \r
  }\r
  \r
  .tracker-notes__hierarchy { \r
    gap: 0.85em; \r
  }\r
  \r
  .tracker-notes__folder-node { \r
    margin-bottom: 0.55em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-0 { \r
    margin-bottom: 0.85em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-1 { \r
    margin-top: 0.55em; \r
    margin-bottom: 0.55em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-2 { \r
    margin-top: 0.45em; \r
    margin-bottom: 0.45em; \r
  }\r
  \r
  .tracker-notes__folder-node.level-3 { \r
    margin-top: 0.35em; \r
    margin-bottom: 0.35em; \r
  }\r
  \r
  .tracker-notes__folder-header { \r
    margin-bottom: 0.45em; \r
    margin-top: 0.25em; \r
    padding-bottom: 0.35em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-0 { \r
    font-size: 1.1em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-1 { \r
    font-size: 1.05em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-2 { \r
    font-size: 0.95em; \r
  }\r
  \r
  .tracker-notes__folder-header.level-3 { \r
    font-size: 0.88em; \r
  }\r
  \r
  .tracker-modal-buttons {\r
    flex-direction: column;\r
    gap: 0.6em;\r
  }\r
  \r
  .tracker-modal-buttons button {\r
    width: 100%;\r
  }\r
}\r
\r
`;

// src/utils/filename-parser.ts
function parseFilename(basename) {
  const match = basename.match(/^(\d+)[-.\s]+(.+)$/);
  if (match) {
    return {
      prefix: parseInt(match[1], 10),
      name: match[2],
      original: basename
    };
  }
  return {
    prefix: null,
    name: basename,
    original: basename
  };
}
function formatFilename(name, prefix) {
  if (prefix === void 0 || prefix === null) {
    return name;
  }
  const prefixWidth = prefix >= 100 ? 3 : prefix >= 10 ? 2 : 2;
  const prefixStr = String(prefix).padStart(prefixWidth, "0");
  return `${prefixStr}-${name}`;
}

// src/services/tracker-order-service.ts
var TrackerOrderService = class {
  constructor(app) {
    this.app = app;
  }
  /**
   * Reorders trackers in a folder by renaming them with numeric prefixes
   * @param folderPath Path to the folder containing trackers
   * @param newOrder Array of files in the desired order
   */
  async reorderTrackers(folderPath, newOrder) {
    if (newOrder.length === 0) return;
    const prefixWidth = newOrder.length >= 100 ? 3 : newOrder.length >= 10 ? 2 : 2;
    for (let i4 = 0; i4 < newOrder.length; i4++) {
      const file = newOrder[i4];
      const parsed = parseFilename(file.basename);
      const newBasename = formatFilename(parsed.name, i4 + 1);
      const newPath = `${folderPath}/${newBasename}.md`;
      if (file.path !== newPath) {
        await this.app.vault.rename(file, newPath);
      }
    }
  }
  /**
   * Reorders folders in a parent folder by renaming them with numeric prefixes
   * @param parentFolderPath Path to the parent folder
   * @param newOrder Array of folders in the desired order
   */
  async reorderFolders(parentFolderPath, newOrder) {
    if (newOrder.length === 0) return;
    const prefixWidth = newOrder.length >= 100 ? 3 : newOrder.length >= 10 ? 2 : 2;
    for (let i4 = 0; i4 < newOrder.length; i4++) {
      const folder = newOrder[i4];
      const parsed = parseFilename(folder.name);
      const newName = formatFilename(parsed.name, i4 + 1);
      const newPath = parentFolderPath ? `${parentFolderPath}/${newName}` : newName;
      if (folder.path !== newPath) {
        await this.app.vault.rename(folder, newPath);
      }
    }
  }
};

// src/services/iconize-service.ts
var import_obsidian9 = require("obsidian");
var IconizeService = class {
  constructor(app) {
    this.app = app;
    this.iconData = null;
    this.dataLoaded = false;
    this.watchInterval = null;
    this.lastModifiedTime = 0;
    this.iconDataPath = "";
  }
  /**
   * Loads icon data from Iconize plugin data file
   */
  async loadIconizeData() {
    const configDir = this.app.vault.configDir || ".obsidian";
    const relativePath = (0, import_obsidian9.normalizePath)(`${configDir}/plugins/obsidian-icon-folder/data.json`);
    this.iconDataPath = relativePath;
    try {
      try {
        const content = await this.app.vault.adapter.read(relativePath);
        this.iconData = JSON.parse(content);
        this.dataLoaded = true;
        try {
          const stat = await this.app.vault.adapter.stat(relativePath);
          this.lastModifiedTime = stat.mtime || 0;
        } catch {
          this.lastModifiedTime = Date.now();
        }
      } catch (readError) {
        this.iconData = null;
        this.dataLoaded = true;
        this.lastModifiedTime = 0;
      }
    } catch (error) {
      console.error("[Iconize] Error loading data:", error);
      this.iconData = null;
      this.dataLoaded = true;
      this.lastModifiedTime = 0;
    }
  }
  /**
   * Starts watching the icon data file for changes
   */
  startWatching() {
    this.stopWatching();
    this.watchInterval = setInterval(async () => {
      if (!this.iconDataPath) return;
      try {
        const stat = await this.app.vault.adapter.stat(this.iconDataPath);
        const currentMtime = stat.mtime || 0;
        if (currentMtime > this.lastModifiedTime) {
          this.dataLoaded = false;
          await this.loadIconizeData();
        }
      } catch {
      }
    }, 2e3);
  }
  /**
   * Stops watching the icon data file
   */
  stopWatching() {
    if (this.watchInterval) {
      clearInterval(this.watchInterval);
      this.watchInterval = null;
    }
  }
  /**
   * Gets icon for a given path (file or folder)
   * Only returns icon if it's explicitly set for this path - no inheritance from parent folders
   * @param path - Path to file or folder
   * @param isFile - Whether the path is a file (true) or folder (false) - not used anymore but kept for compatibility
   * @returns Icon string (emoji or Lucide icon name) or null if not found
   */
  getIcon(path, isFile = false) {
    if (!this.iconData) {
      return null;
    }
    const normalizedPath = this.normalizePath(path);
    if (this.iconData[normalizedPath]) {
      return this.iconData[normalizedPath];
    }
    const pathWithSlash = `/${normalizedPath}`;
    if (this.iconData[pathWithSlash]) {
      return this.iconData[pathWithSlash];
    }
    if (normalizedPath.endsWith(".md")) {
      const pathWithoutExt = normalizedPath.slice(0, -3);
      if (this.iconData[pathWithoutExt]) {
        return this.iconData[pathWithoutExt];
      }
      if (this.iconData[`/${pathWithoutExt}`]) {
        return this.iconData[`/${pathWithoutExt}`];
      }
    }
    return null;
  }
  /**
   * Normalizes path for Iconize format
   */
  normalizePath(path) {
    if (!path) return "";
    return path.replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\/+/, "").replace(/\/$/, "");
  }
  /**
   * Renders icon in a container element
   * @param icon - Icon string (emoji or Lucide icon name)
   * @param container - Container element to render icon in
   */
  renderIcon(icon, container) {
    if (!icon) {
      return;
    }
    if (icon.startsWith("Li")) {
      const iconSpan = container.createSpan({
        cls: "iconize-icon lucide-icon",
        attr: {
          "data-icon": icon,
          "aria-label": icon
        }
      });
      iconSpan.style.marginRight = "0.3em";
      iconSpan.style.display = "inline-block";
    } else {
      const emojiSpan = container.createSpan({ text: icon });
      emojiSpan.style.marginRight = "0.3em";
    }
  }
  /**
   * Updates icon path when a file or folder is renamed
   * This preserves the icon association after rename
   */
  updateIconPath(oldPath, newPath) {
    if (!this.iconData) {
      return;
    }
    const oldNormalized = this.normalizePath(oldPath);
    const newNormalized = this.normalizePath(newPath);
    const pathVariants = [
      oldNormalized,
      `/${oldNormalized}`,
      oldNormalized.endsWith(".md") ? oldNormalized.slice(0, -3) : null,
      oldNormalized.endsWith(".md") ? `/${oldNormalized.slice(0, -3)}` : null
    ].filter(Boolean);
    let iconValue = null;
    let foundPath = null;
    for (const variant of pathVariants) {
      if (this.iconData[variant] && typeof this.iconData[variant] === "string") {
        iconValue = this.iconData[variant];
        foundPath = variant;
        break;
      }
    }
    if (iconValue && foundPath) {
      let newPathKey;
      if (foundPath.startsWith("/")) {
        newPathKey = `/${newNormalized}`;
      } else {
        newPathKey = newNormalized;
      }
      if (foundPath.endsWith(".md") || !foundPath.includes(".") && newPath.endsWith(".md")) {
      } else if (newPath.endsWith(".md") && !newPathKey.endsWith(".md")) {
        newPathKey = newPathKey.slice(0, -3);
      }
      this.iconData[newPathKey] = iconValue;
      delete this.iconData[foundPath];
    }
  }
  /**
   * Invalidates cached data (useful if Iconize data changes)
   */
  invalidateCache() {
    this.dataLoaded = false;
    this.iconData = null;
  }
};

// src/core/managers/state-manager.ts
var StateManager = class {
  // LRU tracking: most recently used at the end
  constructor(app, trackerFileService, folderTreeService) {
    this.app = app;
    this.trackerFileService = trackerFileService;
    this.folderTreeService = folderTreeService;
    this.trackerState = /* @__PURE__ */ new Map();
    this.accessOrder = [];
  }
  /**
   * Update access order for LRU cache
   */
  updateAccessOrder(filePath) {
    const index2 = this.accessOrder.indexOf(filePath);
    if (index2 !== -1) {
      this.accessOrder.splice(index2, 1);
    }
    this.accessOrder.push(filePath);
  }
  /**
   * Evict least recently used cache entry if cache is full
   */
  evictIfNeeded() {
    if (this.trackerState.size >= MAX_CACHE_SIZE) {
      const lruKey = this.accessOrder.shift();
      if (lruKey) {
        this.trackerState.delete(lruKey);
      }
    }
  }
  /**
   * Ensure tracker state is loaded for a file
   */
  async ensureTrackerState(file) {
    const existing = this.trackerState.get(file.path);
    if (existing) {
      this.updateAccessOrder(file.path);
      return existing;
    }
    this.evictIfNeeded();
    const [entries, fileOpts] = await Promise.all([
      this.trackerFileService.readAllEntries(file),
      this.trackerFileService.getFileTypeFromFrontmatter(file)
    ]);
    const state = { entries, fileOpts };
    this.trackerState.set(file.path, state);
    this.updateAccessOrder(file.path);
    return state;
  }
  /**
   * Clear tracker state for a specific path
   */
  clearTrackerState(path) {
    this.trackerState.delete(path);
    const index2 = this.accessOrder.indexOf(path);
    if (index2 !== -1) {
      this.accessOrder.splice(index2, 1);
    }
  }
  /**
   * Clears all backend state (trackerState, FolderTreeService cache)
   * Use sparingly - prefer selective cache invalidation
   */
  async clearAllCaches() {
    this.trackerState.clear();
    this.accessOrder = [];
    this.folderTreeService.invalidate();
  }
  /**
   * Invalidate cache for a folder and all its contents
   */
  invalidateCacheForFolder(folderPath, normalizePath3) {
    const normalizedPath = normalizePath3(folderPath);
    const folder = this.app.vault.getAbstractFileByPath(normalizedPath);
    if (folder instanceof this.app.vault.adapter.constructor) {
    }
    if (folder && "children" in folder) {
      this.clearCacheForFolder(folder);
    }
  }
  clearCacheForFolder(folder) {
    for (const child of folder.children) {
      if ("extension" in child && child.extension === "md") {
        this.clearTrackerState(child.path);
      } else if ("children" in child) {
        this.clearCacheForFolder(child);
      }
    }
  }
  /**
   * Move tracker state from old path to new path
   */
  moveTrackerState(oldPath, newPath) {
    if (oldPath === newPath) return;
    const state = this.trackerState.get(oldPath);
    if (state) {
      this.trackerState.delete(oldPath);
      this.trackerState.set(newPath, state);
      const index2 = this.accessOrder.indexOf(oldPath);
      if (index2 !== -1) {
        this.accessOrder[index2] = newPath;
      }
    } else {
      this.trackerState.delete(newPath);
      const index2 = this.accessOrder.indexOf(newPath);
      if (index2 !== -1) {
        this.accessOrder.splice(index2, 1);
      }
    }
  }
  /**
   * Updates trackerState after renaming multiple files/folders
   */
  updateTrackerStateAfterRename(newPathsMap) {
    for (const [oldPath, newPath] of newPathsMap.entries()) {
      this.moveTrackerState(oldPath, newPath);
    }
  }
  /**
   * Updates trackerState for all trackers inside renamed folders
   */
  updateTrackerStateForRenamedFolders(folderPathsMap, normalizePath3) {
    const filePathsMap = /* @__PURE__ */ new Map();
    for (const [oldFolderPath, newFolderPath] of folderPathsMap.entries()) {
      const oldFolder = this.app.vault.getAbstractFileByPath(oldFolderPath);
      if (!oldFolder || !("children" in oldFolder)) continue;
      const getAllFiles = (folder) => {
        const files2 = [];
        for (const child of folder.children) {
          if ("extension" in child && child.extension === "md") {
            files2.push(child);
          } else if ("children" in child) {
            files2.push(...getAllFiles(child));
          }
        }
        return files2;
      };
      const files = getAllFiles(oldFolder);
      const normalizedOldPath = normalizePath3(oldFolderPath);
      const normalizedNewPath = normalizePath3(newFolderPath);
      for (const file of files) {
        const normalizedFilePath = normalizePath3(file.path);
        if (normalizedFilePath.startsWith(normalizedOldPath + "/")) {
          const relativePath = normalizedFilePath.substring(normalizedOldPath.length);
          const newFilePath = normalizedNewPath + relativePath;
          filePathsMap.set(file.path, newFilePath);
        }
      }
    }
    this.updateTrackerStateAfterRename(filePathsMap);
  }
};

// src/core/managers/sort-order-manager.ts
var SortOrderManager = class {
  constructor(settings, saveSettingsCallback) {
    this.settings = settings;
    this.saveSettingsCallback = saveSettingsCallback;
  }
  /**
   * Update settings reference (called when settings change)
   */
  updateSettings(settings) {
    this.settings = settings;
  }
  /**
   * Gets normalized full path from vault root
   */
  getRelativePath(fullPath, normalizePath3) {
    return normalizePath3(fullPath);
  }
  /**
   * Gets current sort order for a folder from settings or creates alphabetical order
   */
  getSortOrderForFolder(items, folderPath, normalizePath3) {
    const relativePath = this.getRelativePath(folderPath, normalizePath3);
    const sortOrder = this.settings.customSortOrder?.[relativePath];
    if (sortOrder && sortOrder.length > 0) {
      return sortOrder;
    }
    return items.map((item) => "basename" in item ? item.basename : item.name).sort((a3, b2) => a3.localeCompare(b2, void 0, { sensitivity: "base" }));
  }
  /**
   * Saves sort order for a folder to settings
   */
  async saveSortOrderForFolder(folderPath, order, normalizePath3) {
    const relativePath = this.getRelativePath(folderPath, normalizePath3);
    const updatedCustomSortOrder = this.settings.customSortOrder ? { ...this.settings.customSortOrder } : {};
    updatedCustomSortOrder[relativePath] = order;
    this.settings.customSortOrder = updatedCustomSortOrder;
    await this.saveSettingsCallback();
  }
  /**
   * Sorts items using custom sort order if available, otherwise alphabetically
   */
  sortItemsByOrder(items, folderPath, normalizePath3) {
    const order = this.getSortOrderForFolder(items, folderPath, normalizePath3);
    const itemMap = /* @__PURE__ */ new Map();
    for (const item of items) {
      const itemName = "basename" in item ? item.basename : item.name;
      itemMap.set(itemName, item);
    }
    const sorted = [];
    const added = /* @__PURE__ */ new Set();
    for (const orderedName of order) {
      const item = itemMap.get(orderedName);
      if (item) {
        sorted.push(item);
        added.add(orderedName);
      }
    }
    const remaining = [];
    for (const item of items) {
      const itemName = "basename" in item ? item.basename : item.name;
      if (!added.has(itemName)) {
        remaining.push(item);
      }
    }
    remaining.sort((a3, b2) => {
      const aName = "basename" in a3 ? a3.basename : a3.name;
      const bName = "basename" in b2 ? b2.basename : b2.name;
      return aName.localeCompare(bName, void 0, { sensitivity: "base" });
    });
    return [...sorted, ...remaining];
  }
  /**
   * Updates customSortOrder when a file or folder is renamed
   */
  async updateCustomSortOrderOnRename(oldPath, newPath, isFolder, getFolderPathFromFile, normalizePath3) {
    if (!this.settings.customSortOrder) {
      return;
    }
    const updated = { ...this.settings.customSortOrder };
    let hasChanges = false;
    if (isFolder) {
      if (updated[oldPath]) {
        updated[newPath] = updated[oldPath];
        delete updated[oldPath];
        hasChanges = true;
      }
      const oldPathPrefix = `${oldPath}/`;
      const newPathPrefix = `${newPath}/`;
      const keysToUpdate = [];
      for (const key of Object.keys(updated)) {
        if (key.startsWith(oldPathPrefix)) {
          keysToUpdate.push(key);
        }
      }
      for (const key of keysToUpdate) {
        const newKey = key.replace(oldPathPrefix, newPathPrefix);
        updated[newKey] = updated[key];
        delete updated[key];
        hasChanges = true;
      }
      const oldFolderName = oldPath.split("/").pop() || oldPath;
      const newFolderName = newPath.split("/").pop() || newPath;
      for (const key of Object.keys(updated)) {
        const order = updated[key];
        if (Array.isArray(order)) {
          let orderChanged = false;
          const updatedOrder = order.map((item) => {
            if (item === oldFolderName) {
              orderChanged = true;
              return newFolderName;
            }
            return item;
          });
          if (orderChanged) {
            updated[key] = updatedOrder;
            hasChanges = true;
          }
        }
      }
    } else {
      const oldFullFileName = oldPath.split("/").pop() || oldPath;
      const newFullFileName = newPath.split("/").pop() || newPath;
      const oldFileName = oldFullFileName.replace(/\.md$/, "");
      const newFileName = newFullFileName.replace(/\.md$/, "");
      const oldFolderPath = getFolderPathFromFile(oldPath);
      const newFolderPath = getFolderPathFromFile(newPath);
      const normalizedOldFolderPath = normalizePath3(oldFolderPath);
      const normalizedNewFolderPath = normalizePath3(newFolderPath);
      const foldersToCheck = /* @__PURE__ */ new Set();
      if (normalizedOldFolderPath) {
        foldersToCheck.add(normalizedOldFolderPath);
      }
      if (normalizedNewFolderPath && normalizedNewFolderPath !== normalizedOldFolderPath) {
        foldersToCheck.add(normalizedNewFolderPath);
      }
      for (const folderPath of foldersToCheck) {
        if (updated[folderPath] && Array.isArray(updated[folderPath])) {
          const order = updated[folderPath];
          let orderChanged = false;
          const updatedOrder = order.map((item) => {
            if (item === oldFileName) {
              orderChanged = true;
              return newFileName;
            }
            return item;
          });
          if (orderChanged) {
            updated[folderPath] = updatedOrder;
            hasChanges = true;
          }
        }
      }
    }
    if (hasChanges) {
      this.settings.customSortOrder = updated;
      await this.saveSettingsCallback();
    }
  }
  /**
   * Handles file deletion - removes tracker from customSortOrder
   */
  async handleFileDeleteSortOrder(filePath, getFolderPathFromFile, normalizePath3) {
    const folderPath = getFolderPathFromFile(filePath);
    if (!folderPath) return;
    const fileName = filePath.split("/").pop()?.replace(/\.md$/, "") || "";
    if (!fileName) return;
    const normalizedFolderPath = normalizePath3(folderPath);
    const relativePath = this.getRelativePath(normalizedFolderPath, normalizePath3);
    if (!this.settings.customSortOrder?.[relativePath]) {
      return;
    }
    const currentSortOrder = this.settings.customSortOrder[relativePath];
    const updatedSortOrder = currentSortOrder.filter((name) => name !== fileName);
    await this.saveSortOrderForFolder(normalizedFolderPath, updatedSortOrder, normalizePath3);
  }
  /**
   * Handles folder deletion - removes folder and all nested sort order configs
   */
  async handleFolderDeleteSortOrder(folderPath, normalizePath3) {
    if (!this.settings.customSortOrder) {
      return;
    }
    const normalizedFolderPath = normalizePath3(folderPath);
    const relativePath = this.getRelativePath(normalizedFolderPath, normalizePath3);
    const updated = { ...this.settings.customSortOrder };
    let hasChanges = false;
    const folderPathPrefix = `${relativePath}/`;
    const keysToDelete = [];
    for (const key of Object.keys(updated)) {
      if (key === relativePath || key.startsWith(folderPathPrefix)) {
        keysToDelete.push(key);
      }
    }
    for (const key of keysToDelete) {
      delete updated[key];
      hasChanges = true;
    }
    if (hasChanges) {
      this.settings.customSortOrder = updated;
      await this.saveSettingsCallback();
    }
  }
};

// src/core/managers/dom-reorder.ts
var DomReorderManager = class {
  constructor(getActiveBlocks, normalizePath3, isFolderRelevant) {
    this.getActiveBlocks = getActiveBlocks;
    this.normalizePath = normalizePath3;
    this.isFolderRelevant = isFolderRelevant;
  }
  /**
   * Reorders tracker DOM elements in place without full re-rendering
   */
  async swapTrackerElementsInDOM(folderPath, trackersInNewOrder) {
    const normalizedFolderPath = this.normalizePath(folderPath);
    const activeBlocks = this.getActiveBlocks();
    const relevantBlocks = Array.from(activeBlocks).filter((block) => {
      const blockPath = this.normalizePath(block.getFolderPath());
      return this.isFolderRelevant(normalizedFolderPath, blockPath);
    });
    for (const block of relevantBlocks) {
      const trackersContainers = block.containerEl.querySelectorAll(
        `.tracker-notes__trackers[data-folder-path="${normalizedFolderPath}"]`
      );
      for (const trackersContainer of Array.from(trackersContainers)) {
        const trackerElementsMap = /* @__PURE__ */ new Map();
        for (const file of trackersInNewOrder) {
          const trackerElement = trackersContainer.querySelector(
            `.tracker-notes__tracker[data-file-path="${file.path}"]`
          );
          if (trackerElement) {
            trackerElementsMap.set(file.path, trackerElement);
          }
        }
        const sortedTrackerElements = [];
        for (const file of trackersInNewOrder) {
          const element = trackerElementsMap.get(file.path);
          if (element) {
            sortedTrackerElements.push(element);
          }
        }
        for (const element of sortedTrackerElements) {
          if (element.parentElement) {
            element.remove();
          }
        }
        for (const element of sortedTrackerElements) {
          trackersContainer.appendChild(element);
        }
      }
    }
  }
  /**
   * Reorders folder DOM elements in place without full re-rendering
   */
  async reorderFolderElementsInDOM(parentFolderPath, foldersInNewOrder) {
    const normalizedParentPath = this.normalizePath(parentFolderPath);
    const activeBlocks = this.getActiveBlocks();
    const relevantBlocks = Array.from(activeBlocks).filter((block) => {
      const blockPath = this.normalizePath(block.getFolderPath());
      return this.isFolderRelevant(normalizedParentPath, blockPath);
    });
    for (const block of relevantBlocks) {
      const hierarchyContainer = block.containerEl.querySelector(
        `.tracker-notes__hierarchy`
      );
      if (!hierarchyContainer) continue;
      let parentContainer = null;
      if (!parentFolderPath || parentFolderPath === "" || parentFolderPath === "/") {
        parentContainer = hierarchyContainer;
      } else {
        const allFolderNodes = hierarchyContainer.querySelectorAll(`.tracker-notes__folder-node`);
        for (const folderNode of Array.from(allFolderNodes)) {
          const nodeFolderPath = this.normalizePath(folderNode.dataset.folderPath || "");
          if (nodeFolderPath === normalizedParentPath) {
            parentContainer = folderNode;
            break;
          }
          if (!parentContainer) {
            const trackersContainer = folderNode.querySelector(`.tracker-notes__trackers`);
            if (trackersContainer) {
              const trackersPath = this.normalizePath(trackersContainer.dataset.folderPath || "");
              if (trackersPath === normalizedParentPath) {
                parentContainer = folderNode;
                break;
              }
            }
          }
        }
        if (!parentContainer) {
          parentContainer = hierarchyContainer;
        }
      }
      if (!parentContainer) {
        console.warn(`Tracker: Could not find parent container for ${parentFolderPath}`);
        continue;
      }
      const siblings = Array.from(parentContainer.children);
      const folderSiblings = siblings.filter(
        (el) => el.classList.contains("tracker-notes__folder-node")
      );
      const folderElementsMap = /* @__PURE__ */ new Map();
      for (const folderNode of folderSiblings) {
        let nodeFolderPath = this.normalizePath(folderNode.dataset.folderPath || "");
        if (!nodeFolderPath) {
          const trackersContainer = folderNode.querySelector(`.tracker-notes__trackers`);
          if (trackersContainer) {
            nodeFolderPath = this.normalizePath(trackersContainer.dataset.folderPath || "");
          }
        }
        if (nodeFolderPath) {
          folderElementsMap.set(nodeFolderPath, folderNode);
        }
      }
      const sortedFolderElements = [];
      for (const folder of foldersInNewOrder) {
        const element = folderElementsMap.get(folder.path);
        if (element) {
          sortedFolderElements.push(element);
        }
      }
      if (sortedFolderElements.length === 0) {
        console.warn(`Tracker: No folder elements found in DOM. Parent: ${parentFolderPath}`);
        continue;
      }
      if (sortedFolderElements.length < foldersInNewOrder.length) {
        console.warn(`Tracker: Some folders not found in DOM. Expected ${foldersInNewOrder.length}, found ${sortedFolderElements.length}. Parent: ${parentFolderPath}`);
      }
      for (const element of sortedFolderElements) {
        if (element.parentElement) {
          element.remove();
        }
      }
      let insertBefore = null;
      const remainingSiblings = Array.from(parentContainer.children);
      for (let i4 = remainingSiblings.length - 1; i4 >= 0; i4--) {
        const sibling = remainingSiblings[i4];
        if (!sibling.classList.contains("tracker-notes__folder-node")) {
          insertBefore = sibling.nextSibling;
          break;
        }
      }
      if (insertBefore) {
        for (const element of sortedFolderElements) {
          parentContainer.insertBefore(element, insertBefore);
        }
      } else {
        for (const element of sortedFolderElements) {
          parentContainer.appendChild(element);
        }
      }
    }
  }
  /**
   * Updates button handlers for all folders and trackers in DOM after folder renaming
   */
  async updateAllFolderButtonHandlersAfterRename(newPathsMap, getAbstractFileByPath, moveFolderUp, moveFolderDown) {
    const activeBlocks = this.getActiveBlocks();
    for (const block of Array.from(activeBlocks)) {
      const hierarchyContainer = block.containerEl.querySelector(`.tracker-notes__hierarchy`);
      if (!hierarchyContainer) continue;
      const allFolderNodes = hierarchyContainer.querySelectorAll(`.tracker-notes__folder-node`);
      for (const folderNode of Array.from(allFolderNodes)) {
        const currentPath = this.normalizePath(folderNode.dataset.folderPath || "");
        if (!currentPath) continue;
        let actualPath = currentPath;
        for (const [oldPath, newPath] of newPathsMap.entries()) {
          const normalizedOldPath = this.normalizePath(oldPath);
          const normalizedNewPath = this.normalizePath(newPath);
          if (currentPath === normalizedOldPath) {
            const folder = getAbstractFileByPath(normalizedNewPath);
            if (folder && "children" in folder) {
              actualPath = this.normalizePath(folder.path);
            } else {
              actualPath = normalizedNewPath;
            }
            break;
          } else if (currentPath.startsWith(normalizedOldPath + "/")) {
            const relativePath = currentPath.substring(normalizedOldPath.length);
            const computedNewPath = normalizedNewPath + relativePath;
            const folder = getAbstractFileByPath(computedNewPath);
            if (folder && "children" in folder) {
              actualPath = this.normalizePath(folder.path);
            } else {
              actualPath = computedNewPath;
            }
            break;
          }
        }
        if (actualPath !== currentPath) {
          folderNode.dataset.folderPath = actualPath;
          const trackersContainer = folderNode.querySelector(`.tracker-notes__trackers`);
          if (trackersContainer) {
            trackersContainer.dataset.folderPath = actualPath;
          }
        }
        this.updateFolderButtonHandlers(folderNode, actualPath, moveFolderUp, moveFolderDown);
        const trackers = folderNode.querySelectorAll(`.tracker-notes__tracker`);
        for (const tracker of Array.from(trackers)) {
          const trackerPath = this.normalizePath(tracker.dataset.filePath || "");
          if (!trackerPath) continue;
          let actualTrackerPath = trackerPath;
          for (const [oldPath, newPath] of newPathsMap.entries()) {
            const normalizedOldPath = this.normalizePath(oldPath);
            const normalizedNewPath = this.normalizePath(newPath);
            if (trackerPath.startsWith(normalizedOldPath + "/")) {
              const relativePath = trackerPath.substring(normalizedOldPath.length);
              const computedNewPath = normalizedNewPath + relativePath;
              const file = getAbstractFileByPath(computedNewPath);
              if (file && "extension" in file) {
                actualTrackerPath = this.normalizePath(file.path);
              } else {
                actualTrackerPath = computedNewPath;
              }
              break;
            }
          }
          if (actualTrackerPath !== trackerPath) {
            tracker.dataset.filePath = actualTrackerPath;
            const link = tracker.querySelector("a.internal-link");
            if (link) {
              link.href = actualTrackerPath;
              link.setAttribute("data-href", actualTrackerPath);
            }
          }
        }
      }
    }
  }
  /**
   * Updates onclick handlers for folder buttons
   */
  updateFolderButtonHandlers(folderElement, newPath, moveFolderUp, moveFolderDown) {
    const orderBtnsContainer = folderElement.querySelector(`.${CSS_CLASSES.ORDER_BTN_CONTAINER}`);
    if (orderBtnsContainer) {
      const upButton = orderBtnsContainer.querySelector(`.${CSS_CLASSES.ORDER_BTN_UP}`);
      if (upButton) {
        upButton.onclick = async (e3) => {
          e3.stopPropagation();
          await moveFolderUp(newPath);
        };
      }
      const downButton = orderBtnsContainer.querySelector(`.${CSS_CLASSES.ORDER_BTN_DOWN}`);
      if (downButton) {
        downButton.onclick = async (e3) => {
          e3.stopPropagation();
          await moveFolderDown(newPath);
        };
      }
    }
  }
};

// src/core/managers/block-manager.ts
var BlockManager = class {
  constructor(getWorkspace) {
    this.getWorkspace = getWorkspace;
    this.activeBlocks = /* @__PURE__ */ new Set();
  }
  /**
   * Add a block to active blocks set
   */
  addBlock(block) {
    this.activeBlocks.add(block);
  }
  /**
   * Remove a block from active blocks set
   */
  removeBlock(block) {
    this.activeBlocks.delete(block);
  }
  /**
   * Clear all active blocks
   */
  clearAllBlocks() {
    this.activeBlocks.forEach((block) => block.unload());
    this.activeBlocks.clear();
  }
  /**
   * Check if a folder path is relevant to a block path
   */
  isFolderRelevant(targetPath, blockPath) {
    if (blockPath === targetPath) return true;
    if (!blockPath || !targetPath) return true;
    return targetPath.startsWith(`${blockPath}/`) || blockPath.startsWith(`${targetPath}/`);
  }
  /**
   * Refresh blocks for a specific folder
   */
  async refreshBlocksForFolder(folderPath, normalizePath3) {
    const normalizedPath = normalizePath3(folderPath);
    const blocksToRefresh = Array.from(this.activeBlocks).filter((block) => {
      const blockPath = normalizePath3(block.getFolderPath());
      return this.isFolderRelevant(normalizedPath, blockPath);
    });
    for (const block of blocksToRefresh) {
      try {
        await block.render();
      } catch (error) {
        console.error("Tracker: error updating block", error);
      }
    }
  }
  /**
   * Refresh a specific tracker by calling its registered callback
   */
  refreshTrackersForFile(file, invalidateCacheForFile, refreshTracker) {
    invalidateCacheForFile(file);
    refreshTracker(file.path);
  }
  /**
   * Refresh all active blocks with scroll position preservation
   */
  async refreshAllBlocks() {
    const scrollPositions = /* @__PURE__ */ new Map();
    const findAndSaveScrollContainers = (root) => {
      const style = window.getComputedStyle(root);
      if (style.overflow === "auto" || style.overflow === "scroll" || style.overflowY === "auto" || style.overflowY === "scroll" || style.overflowX === "auto" || style.overflowX === "scroll") {
        scrollPositions.set(root, {
          top: root.scrollTop,
          left: root.scrollLeft
        });
      }
      const allElements = root.querySelectorAll("*");
      for (const el of Array.from(allElements)) {
        const elStyle = window.getComputedStyle(el);
        if (elStyle.overflow === "auto" || elStyle.overflow === "scroll" || elStyle.overflowY === "auto" || elStyle.overflowY === "scroll" || elStyle.overflowX === "auto" || elStyle.overflowX === "scroll") {
          scrollPositions.set(el, {
            top: el.scrollTop,
            left: el.scrollLeft
          });
        }
      }
    };
    const workspace = this.getWorkspace();
    for (const leaf of workspace.getLeavesOfType("markdown")) {
      const view = leaf.view;
      if (view && view.containerEl) {
        findAndSaveScrollContainers(view.containerEl);
        const cmScroller = view.containerEl.querySelector(".cm-scroller");
        if (cmScroller) {
          scrollPositions.set(cmScroller, {
            top: cmScroller.scrollTop,
            left: cmScroller.scrollLeft
          });
        }
        const previewView = view.containerEl.querySelector(".markdown-preview-view");
        if (previewView) {
          scrollPositions.set(previewView, {
            top: previewView.scrollTop,
            left: previewView.scrollLeft
          });
        }
      }
    }
    const windowScroll = { top: window.scrollY, left: window.scrollX };
    for (const block of Array.from(this.activeBlocks)) {
      try {
        await block.render();
      } catch (error) {
        console.error("Tracker: error updating block", error);
      }
    }
    const restoreScroll = () => {
      window.scrollTo(windowScroll.left, windowScroll.top);
      for (const [container, position] of scrollPositions.entries()) {
        if (container && container.isConnected) {
          try {
            container.scrollTop = position.top;
            container.scrollLeft = position.left;
          } catch (e3) {
          }
        }
      }
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        restoreScroll();
        setTimeout(() => {
          restoreScroll();
        }, IMMEDIATE_TIMEOUT_MS);
        setTimeout(() => {
          restoreScroll();
        }, SCROLL_RESTORE_DELAY_2_MS);
      });
    });
  }
  /**
   * Handle tracker deletion animation
   */
  async onTrackerDeleted(filePath) {
    for (const block of Array.from(this.activeBlocks)) {
      const trackersContainers = Array.from(
        block.containerEl.querySelectorAll(".tracker-notes__trackers")
      );
      if (trackersContainers.length === 0) continue;
      for (const trackersContainer of trackersContainers) {
        const trackersToDelete = Array.from(trackersContainer.querySelectorAll(
          `.tracker-notes__tracker[data-file-path="${filePath}"]`
        ));
        if (trackersToDelete.length === 0) continue;
        for (const tracker of trackersToDelete) {
          tracker.style.transition = "opacity 0.2s ease";
          tracker.style.opacity = "0";
          setTimeout(() => {
            tracker.remove();
          }, UI_CONSTANTS.TRANSITION_OPACITY_DURATION_MS);
        }
      }
    }
  }
};

// src/core/handlers/vault-events.ts
var VaultEventHandlers = class {
  constructor(sortOrderManager, stateManager, folderTreeService, getSettings, normalizePath3, getFolderPathFromFile) {
    this.sortOrderManager = sortOrderManager;
    this.stateManager = stateManager;
    this.folderTreeService = folderTreeService;
    this.getSettings = getSettings;
    this.normalizePath = normalizePath3;
    this.getFolderPathFromFile = getFolderPathFromFile;
  }
  /**
   * Handles rename events from Obsidian vault
   */
  handleRename(file, oldPath) {
    const settings = this.getSettings();
    if (!settings.customSortOrder) {
      return;
    }
    const normalizedOldPath = this.normalizePath(oldPath);
    const normalizedNewPath = this.normalizePath(file.path);
    const isFolder = "children" in file;
    void this.sortOrderManager.updateCustomSortOrderOnRename(
      normalizedOldPath,
      normalizedNewPath,
      isFolder,
      this.getFolderPathFromFile,
      this.normalizePath
    );
  }
  /**
   * Handles file deletion events
   */
  async handleFileDelete(file, filePath) {
    await this.sortOrderManager.handleFileDeleteSortOrder(
      filePath,
      this.getFolderPathFromFile,
      this.normalizePath
    );
    const folderPath = this.getFolderPathFromFile(filePath);
    if (folderPath) {
      this.folderTreeService.invalidate(folderPath);
    }
  }
  /**
   * Handles folder deletion events
   */
  async handleFolderDelete(folderPath) {
    await this.sortOrderManager.handleFolderDeleteSortOrder(
      folderPath,
      this.normalizePath
    );
    this.folderTreeService.updateSettings(this.getSettings());
    this.folderTreeService.invalidate(folderPath);
  }
  /**
   * Handle tracker renamed event
   */
  handleTrackerRenamed(oldPath, file) {
    this.stateManager.moveTrackerState(oldPath, file.path);
  }
};

// src/core/tracker-plugin.ts
var TrackerPlugin = class extends import_obsidian10.Plugin {
  constructor() {
    super(...arguments);
    this.refreshBlocksDebounceTimer = null;
    // Simple callback registry for tracker refresh
    this.trackerRefreshCallbacks = /* @__PURE__ */ new Map();
  }
  /**
   * Get active blocks (for external access)
   */
  get activeBlocks() {
    return this.blockManager.activeBlocks;
  }
  /**
   * Check if current device is mobile (based on viewport width)
   */
  isMobileDevice() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }
  async onload() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.folderTreeService = new FolderTreeService(this.app);
    this.folderTreeService.updateSettings(this.settings);
    this.trackerFileService = new TrackerFileService(this.app);
    this.trackerOrderService = new TrackerOrderService(this.app);
    this.iconizeService = new IconizeService(this.app);
    this.stateManager = new StateManager(
      this.app,
      this.trackerFileService,
      this.folderTreeService
    );
    this.sortOrderManager = new SortOrderManager(
      this.settings,
      () => this.saveSettings()
    );
    this.blockManager = new BlockManager(
      () => this.app.workspace
    );
    this.domReorderManager = new DomReorderManager(
      () => this.blockManager.activeBlocks,
      (p3) => this.normalizePath(p3),
      (t3, b2) => this.blockManager.isFolderRelevant(t3, b2)
    );
    this.vaultEventHandlers = new VaultEventHandlers(
      this.sortOrderManager,
      this.stateManager,
      this.folderTreeService,
      () => this.settings,
      (p3) => this.normalizePath(p3),
      (p3) => this.getFolderPathFromFile(p3)
    );
    this.iconizeService.loadIconizeData().then(() => {
      this.iconizeService.startWatching();
    }).catch(() => {
    });
    this.addStyleSheet();
    this.addSettingTab(new TrackerSettingsTab(this.app, this));
    this.registerMarkdownCodeBlockProcessor("tracker", this.processTrackerBlock.bind(this));
    this.registerMarkdownCodeBlockProcessor("habit", this.processTrackerBlock.bind(this));
    this.addCommand({
      id: "tracker-create",
      name: "Create new tracker",
      callback: () => this.createNewTracker()
    });
    this.registerEvent(
      this.app.vault.on("rename", (file, oldPath) => {
        if (file instanceof import_obsidian10.TFile || file instanceof import_obsidian10.TFolder) {
          this.vaultEventHandlers.handleRename(file, oldPath);
        }
      })
    );
    this.registerEvent(
      this.app.vault.on("delete", (file) => {
        if (file instanceof import_obsidian10.TFile && file.extension === "md") {
          void this.vaultEventHandlers.handleFileDelete(file, file.path);
        } else if (file instanceof import_obsidian10.TFolder) {
          void this.vaultEventHandlers.handleFolderDelete(file.path);
        }
      })
    );
  }
  async onunload() {
    this.blockManager.clearAllBlocks();
    this.iconizeService.stopWatching();
  }
  // ---- Path utilities --------------------------------------------------------
  normalizePath(path) {
    if (!path) return "";
    return path.trim().replace(/\\/g, "/").replace(/\/+/g, "/").replace(/^\/+/, "").replace(/\/$/, "");
  }
  getFolderPathFromFile(filePath) {
    if (!filePath) return "";
    const normalizedPath = this.normalizePath(filePath);
    const lastSlash = normalizedPath.lastIndexOf("/");
    if (lastSlash === -1) {
      return "";
    }
    return normalizedPath.substring(0, lastSlash);
  }
  getFolderTree(folderPath) {
    return this.folderTreeService.getFolderTree(folderPath);
  }
  // ---- Stylesheet ------------------------------------------------------------
  addStyleSheet() {
    if (this.styleEl) return;
    const styleEl = document.createElement("style");
    styleEl.textContent = styles_default;
    document.head.appendChild(styleEl);
    this.styleEl = styleEl;
    this.register(() => {
      styleEl.remove();
      if (this.styleEl === styleEl) {
        this.styleEl = void 0;
      }
    });
  }
  // ---- Code blocks -----------------------------------------------------------
  async processTrackerBlock(source, el, ctx) {
    const block = new TrackerBlockRenderChild(this, source, el, ctx);
    ctx.addChild(block);
    this.blockManager.addBlock(block);
    await block.render();
  }
  removeActiveBlock(block) {
    this.blockManager.removeBlock(block);
  }
  async refreshBlocksForFolder(folderPath) {
    await this.blockManager.refreshBlocksForFolder(folderPath, (p3) => this.normalizePath(p3));
  }
  refreshTrackersForFile(file) {
    this.blockManager.refreshTrackersForFile(
      file,
      (f4) => this.invalidateCacheForFile(f4),
      (path) => this.refreshTracker(path)
    );
  }
  async refreshAllBlocks() {
    await this.blockManager.refreshAllBlocks();
  }
  // ---- Data Access -----------------------------------------------------------
  async getFileTypeFromFrontmatter(file) {
    const state = await this.stateManager.ensureTrackerState(file);
    return state.fileOpts;
  }
  invalidateCacheForFolder(folderPath) {
    this.stateManager.invalidateCacheForFolder(folderPath, (p3) => this.normalizePath(p3));
  }
  invalidateCacheForFile(file) {
    this.stateManager.clearTrackerState(file.path);
    this.trackerFileService.invalidateFileCache(file.path);
  }
  /**
   * Register a refresh callback for a tracker
   */
  registerTrackerRefresh(filePath, callback2) {
    this.trackerRefreshCallbacks.set(filePath, callback2);
  }
  /**
   * Unregister a refresh callback for a tracker
   */
  unregisterTrackerRefresh(filePath) {
    this.trackerRefreshCallbacks.delete(filePath);
  }
  /**
   * Directly call the refresh callback for a specific tracker
   */
  refreshTracker(filePath) {
    const callback2 = this.trackerRefreshCallbacks.get(filePath);
    if (callback2) {
      callback2();
    }
  }
  /**
   * Update callback registration when a tracker file is renamed
   */
  updateTrackerRefreshPath(oldPath, newPath) {
    const callback2 = this.trackerRefreshCallbacks.get(oldPath);
    if (callback2) {
      this.trackerRefreshCallbacks.delete(oldPath);
      this.trackerRefreshCallbacks.set(newPath, callback2);
    }
  }
  handleTrackerRenamed(oldPath, file) {
    this.vaultEventHandlers.handleTrackerRenamed(oldPath, file);
    this.updateTrackerRefreshPath(oldPath, file.path);
    this.iconizeService.updateIconPath(oldPath, file.path);
  }
  async getStartTrackingDateAsync(entries, file) {
    if (!file) {
      return DateService.format(DateService.now(), this.settings.dateFormat);
    }
    const fileOpts = await this.getFileTypeFromFrontmatter(file);
    return this.trackerFileService.getStartTrackingDate(entries, this.settings, fileOpts);
  }
  getStartTrackingDate(entries, fileOpts) {
    return this.trackerFileService.getStartTrackingDate(entries, this.settings, fileOpts);
  }
  calculateStreak(entries, endDate, trackerType, file, startTrackingDateStr) {
    return this.trackerFileService.calculateStreak(entries, this.settings, endDate, trackerType, file, startTrackingDateStr);
  }
  calculateBestStreak(entries, trackerType, file, startTrackingDateStr) {
    return this.trackerFileService.calculateBestStreak(entries, this.settings, trackerType, file, startTrackingDateStr);
  }
  async readAllEntries(file) {
    const state = await this.stateManager.ensureTrackerState(file);
    return new Map(state.entries);
  }
  // ---- Tracker CRUD ----------------------------------------------------------
  async createNewTracker() {
    new CreateTrackerModal(this.app, this).open();
  }
  async onTrackerCreated(folderPath, file) {
    this.folderTreeService.invalidate(folderPath);
    await this.stateManager.ensureTrackerState(file);
    const normalizedFolderPath = this.normalizePath(folderPath);
    if (normalizedFolderPath) {
      const currentSortOrder = this.settings.customSortOrder?.[normalizedFolderPath] || [];
      const updatedSortOrder = currentSortOrder.filter((name) => name !== file.basename);
      updatedSortOrder.unshift(file.basename);
      await this.sortOrderManager.saveSortOrderForFolder(
        normalizedFolderPath,
        updatedSortOrder,
        (p3) => this.normalizePath(p3)
      );
    }
    for (const block of Array.from(this.blockManager.activeBlocks)) {
      const blockFolderPath = block.getFolderPath();
      const normalizedBlockPath = this.normalizePath(blockFolderPath);
      if (!this.blockManager.isFolderRelevant(normalizedFolderPath, normalizedBlockPath)) continue;
      await block.render();
    }
  }
  async onTrackerDeleted(filePath) {
    this.stateManager.clearTrackerState(filePath);
    await this.blockManager.onTrackerDeleted(filePath);
  }
  // ---- File operations -------------------------------------------------------
  async ensureFileWithHeading(filePath, type = "good-habit") {
    return this.trackerFileService.ensureFileWithHeading(filePath, type);
  }
  parseFrontmatterData(frontmatter) {
    return this.trackerFileService.parseFrontmatterData(frontmatter);
  }
  formatDataToYaml(data) {
    return this.trackerFileService.formatDataToYaml(data);
  }
  async readValueForDate(file, dateIso) {
    const entries = await this.readAllEntries(file);
    return entries.get(dateIso) ?? null;
  }
  async writeLogLine(file, dateIso, value) {
    try {
      const state = await this.stateManager.ensureTrackerState(file);
      const normalizedValue = parseMaybeNumber(value);
      state.entries.set(dateIso, normalizedValue);
      await this.trackerFileService.writeLogLine(file, dateIso, value);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      new import_obsidian10.Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
      console.error("Tracker: write error", error);
      throw error;
    }
  }
  async deleteEntry(file, dateIso) {
    try {
      const state = await this.stateManager.ensureTrackerState(file);
      state.entries.delete(dateIso);
      await this.trackerFileService.deleteEntry(file, dateIso);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      new import_obsidian10.Notice(`${ERROR_MESSAGES.WRITE_ERROR}: ${errorMsg}`);
      console.error("Tracker: delete entry error", error);
      throw error;
    }
  }
  async pickTrackerFile() {
    const files = this.app.vault.getMarkdownFiles().filter((f4) => f4.path.startsWith(this.settings.trackersFolder + "/"));
    if (files.length === 0) {
      new import_obsidian10.Notice(MODAL_LABELS.NO_TRACKERS_FOUND);
      return null;
    }
    if (files.length === 1) return files[0];
    return new Promise((resolve2) => {
      new FilePickerModal(this.app, files, resolve2).open();
    });
  }
  // ---- Settings --------------------------------------------------------------
  async saveSettings() {
    await this.saveData(this.settings);
    this.folderTreeService.updateSettings(this.settings);
    this.sortOrderManager.updateSettings(this.settings);
    if (this.refreshBlocksDebounceTimer) {
      clearTimeout(this.refreshBlocksDebounceTimer);
    }
    this.refreshBlocksDebounceTimer = setTimeout(async () => {
      await this.refreshAllBlocks();
      this.refreshBlocksDebounceTimer = null;
    }, DEBOUNCE_DELAY_MS);
  }
  // ---- Tracker editing -------------------------------------------------------
  editTracker(file) {
    new EditTrackerModal(this.app, this, file).open();
  }
  openEditTrackerModal(file) {
    this.editTracker(file);
  }
  // ---- Tracker ordering ------------------------------------------------------
  async moveTrackerUp(file) {
    const folderPath = this.getFolderPathFromFile(file.path);
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder || !(folder instanceof import_obsidian10.TFolder)) return;
    const trackers = folder.children.filter(
      (f4) => f4 instanceof import_obsidian10.TFile && f4.extension === "md"
    );
    const sortedTrackers = this.sortOrderManager.sortItemsByOrder(
      trackers,
      folderPath,
      (p3) => this.normalizePath(p3)
    );
    const currentIndex = sortedTrackers.findIndex((t3) => t3.path === file.path);
    if (currentIndex <= 0) return;
    [sortedTrackers[currentIndex - 1], sortedTrackers[currentIndex]] = [sortedTrackers[currentIndex], sortedTrackers[currentIndex - 1]];
    const newOrder = sortedTrackers.map((t3) => t3.basename);
    await this.sortOrderManager.saveSortOrderForFolder(
      folderPath,
      newOrder,
      (p3) => this.normalizePath(p3)
    );
    await this.domReorderManager.swapTrackerElementsInDOM(folderPath, sortedTrackers);
    this.folderTreeService.invalidate(folderPath);
  }
  async moveTrackerDown(file) {
    const folderPath = this.getFolderPathFromFile(file.path);
    const folder = this.app.vault.getAbstractFileByPath(folderPath);
    if (!folder || !(folder instanceof import_obsidian10.TFolder)) return;
    const trackers = folder.children.filter(
      (f4) => f4 instanceof import_obsidian10.TFile && f4.extension === "md"
    );
    const sortedTrackers = this.sortOrderManager.sortItemsByOrder(
      trackers,
      folderPath,
      (p3) => this.normalizePath(p3)
    );
    const currentIndex = sortedTrackers.findIndex((t3) => t3.path === file.path);
    if (currentIndex < 0 || currentIndex >= sortedTrackers.length - 1) return;
    [sortedTrackers[currentIndex], sortedTrackers[currentIndex + 1]] = [sortedTrackers[currentIndex + 1], sortedTrackers[currentIndex]];
    const newOrder = sortedTrackers.map((t3) => t3.basename);
    await this.sortOrderManager.saveSortOrderForFolder(
      folderPath,
      newOrder,
      (p3) => this.normalizePath(p3)
    );
    await this.domReorderManager.swapTrackerElementsInDOM(folderPath, sortedTrackers);
    this.folderTreeService.invalidate(folderPath);
  }
  async moveFolderUp(folderPath) {
    const parentFolderPath = this.getFolderPathFromFile(folderPath);
    let folders;
    if (!parentFolderPath) {
      folders = this.app.vault.getRoot().children.filter(
        (f4) => f4 instanceof import_obsidian10.TFolder
      );
    } else {
      const parentFolder = this.app.vault.getAbstractFileByPath(parentFolderPath);
      if (!parentFolder || !(parentFolder instanceof import_obsidian10.TFolder)) return;
      folders = parentFolder.children.filter(
        (f4) => f4 instanceof import_obsidian10.TFolder
      );
    }
    const sortedFolders = this.sortOrderManager.sortItemsByOrder(
      folders,
      parentFolderPath || "",
      (p3) => this.normalizePath(p3)
    );
    const currentIndex = sortedFolders.findIndex((f4) => f4.path === folderPath);
    if (currentIndex <= 0) return;
    [sortedFolders[currentIndex - 1], sortedFolders[currentIndex]] = [sortedFolders[currentIndex], sortedFolders[currentIndex - 1]];
    const newOrder = sortedFolders.map((f4) => f4.name);
    await this.sortOrderManager.saveSortOrderForFolder(
      parentFolderPath || "",
      newOrder,
      (p3) => this.normalizePath(p3)
    );
    await this.domReorderManager.reorderFolderElementsInDOM(parentFolderPath || "", sortedFolders);
    this.folderTreeService.invalidate(parentFolderPath || "");
  }
  async moveFolderDown(folderPath) {
    const parentFolderPath = this.getFolderPathFromFile(folderPath);
    let folders;
    if (!parentFolderPath) {
      folders = this.app.vault.getRoot().children.filter(
        (f4) => f4 instanceof import_obsidian10.TFolder
      );
    } else {
      const parentFolder = this.app.vault.getAbstractFileByPath(parentFolderPath);
      if (!parentFolder || !(parentFolder instanceof import_obsidian10.TFolder)) return;
      folders = parentFolder.children.filter(
        (f4) => f4 instanceof import_obsidian10.TFolder
      );
    }
    const sortedFolders = this.sortOrderManager.sortItemsByOrder(
      folders,
      parentFolderPath || "",
      (p3) => this.normalizePath(p3)
    );
    const currentIndex = sortedFolders.findIndex((f4) => f4.path === folderPath);
    if (currentIndex < 0 || currentIndex >= sortedFolders.length - 1) return;
    [sortedFolders[currentIndex], sortedFolders[currentIndex + 1]] = [sortedFolders[currentIndex + 1], sortedFolders[currentIndex]];
    const newOrder = sortedFolders.map((f4) => f4.name);
    await this.sortOrderManager.saveSortOrderForFolder(
      parentFolderPath || "",
      newOrder,
      (p3) => this.normalizePath(p3)
    );
    await this.domReorderManager.reorderFolderElementsInDOM(parentFolderPath || "", sortedFolders);
    this.folderTreeService.invalidate(parentFolderPath || "");
  }
  // ---- Iconize integration ---------------------------------------------------
  getIconForPath(path, isFile = false) {
    return this.iconizeService.getIcon(path, isFile);
  }
  renderIcon(icon, container) {
    this.iconizeService.renderIcon(icon, container);
  }
};

// src/main.ts
var main_default = TrackerPlugin;
/*! Bundled license information:

@kurkle/color/dist/color.esm.js:
  (*!
   * @kurkle/color v0.3.4
   * https://github.com/kurkle/color#readme
   * (c) 2024 Jukka Kurkela
   * Released under the MIT License
   *)

chart.js/dist/chunks/helpers.dataset.js:
  (*!
   * Chart.js v4.5.1
   * https://www.chartjs.org
   * (c) 2025 Chart.js Contributors
   * Released under the MIT License
   *)

chart.js/dist/chart.js:
  (*!
   * Chart.js v4.5.1
   * https://www.chartjs.org
   * (c) 2025 Chart.js Contributors
   * Released under the MIT License
   *)
*/
