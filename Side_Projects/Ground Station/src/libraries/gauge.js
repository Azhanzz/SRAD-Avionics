/*!
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 Mykhailo Stadnyk <mikhus@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @version 2.1.7
 */
!(function (e) {
  "use strict";
  function t(e, t) {
    if (!e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
  }
  function i(e, t) {
    if ("function" != typeof t && null !== t)
      throw new TypeError(
        "Super expression must either be null or a function, not " + typeof t
      );
    (e.prototype = Object.create(t && t.prototype, {
      constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 },
    })),
      t &&
        (Object.setPrototypeOf
          ? Object.setPrototypeOf(e, t)
          : (e.__proto__ = t));
  }
  function r(e, t) {
    if (!(e instanceof t))
      throw new TypeError("Cannot call a class as a function");
  }
  function n(e, t) {
    if (
      (t || (t = "undefined" == typeof window ? global : window),
      void 0 !== t[e])
    )
      return t[e];
    for (
      var i = ["webkit", "moz", "ms", "o"],
        r = 0,
        n = i.length,
        o = e.charAt(0).toUpperCase() + e.substr(1);
      r < n;
      r++
    ) {
      var a = t[i[r] + o];
      if (void 0 !== a) return a;
    }
    return null;
  }
  function o(e, t, i, r, n, a, l) {
    if ("function" != typeof r)
      throw new TypeError("Invalid animation rule:", r);
    var s = e - i,
      d = s / n,
      u = 0;
    d > 1 && (d = 1),
      1 !== d && ((u = r(d)), isFinite(u) && !isNaN(u) && (d = u)),
      t && t(d),
      s < n
        ? (l.frame = U(function (e) {
            return o(e, t, i, r, n, a, l);
          }))
        : (a && a(), (l.inProgress = !1));
  }
  function a() {
    Array.prototype.constructor.apply(this, arguments);
  }
  function l(e) {
    if (!(e instanceof DOMException && 2152923147 === e.result)) throw e;
  }
  function s(e, t) {
    return t.replace(ee, function (t, i) {
      var r = e[i];
      return void 0 !== r ? r : t;
    });
  }
  function d(e) {
    return (
      e.majorTicks instanceof Array ||
        (e.majorTicks = e.majorTicks ? [e.majorTicks] : []),
      e.majorTicks.length ||
        (e.majorTicks.push(te.formatMajorTickNumber(e.minValue, e)),
        e.majorTicks.push(te.formatMajorTickNumber(e.maxValue, e))),
      ["right" !== e.tickSide, "left" !== e.tickSide]
    );
  }
  function u(e, t, i, r, n, o) {
    e.beginPath(),
      e.moveTo(t + o, i),
      e.lineTo(t + r - o, i),
      e.quadraticCurveTo(t + r, i, t + r, i + o),
      e.lineTo(t + r, i + n - o),
      e.quadraticCurveTo(t + r, i + n, t + r - o, i + n),
      e.lineTo(t + o, i + n),
      e.quadraticCurveTo(t, i + n, t, i + n - o),
      e.lineTo(t, i + o),
      e.quadraticCurveTo(t, i, t + o, i),
      e.closePath();
  }
  function c(e, t) {
    var i = t.valueDec,
      r = t.valueInt,
      n = 0,
      o = void 0,
      a = void 0,
      l = void 0;
    if (((e = parseFloat(e)), (l = e < 0), (e = Math.abs(e)), i > 0)) {
      for (
        a = e.toFixed(i).toString().split("."), o = r - a[0].length;
        n < o;
        ++n
      )
        a[0] = "0" + a[0];
      a = (l ? "-" : "") + a[0] + "." + a[1];
    } else {
      for (a = Math.round(e).toString(), o = r - a.length; n < o; ++n)
        a = "0" + a;
      a = (l ? "-" : "") + a;
    }
    return a;
  }
  function h(e, t) {
    var i = void 0,
      r = !1;
    return (
      (i =
        0 === t.majorTicksDec
          ? Math.round(e).toString()
          : e.toFixed(t.majorTicksDec)),
      t.majorTicksInt > 1
        ? ((r = ~i.indexOf(".")),
          ~i.indexOf("-")
            ? "-" +
              [
                t.majorTicksInt + t.majorTicksDec + 2 + (r ? 1 : 0) - i.length,
              ].join("0") +
              i.replace("-", "")
            : [
                t.majorTicksInt + t.majorTicksDec + 1 + (r ? 1 : 0) - i.length,
              ].join("0") + i)
        : i
    );
  }
  function f(e) {
    return (e * Math.PI) / 180;
  }
  function v(e, t) {
    return { x: -e * Math.sin(t), y: e * Math.cos(t) };
  }
  function m(e, t, i, r) {
    var n = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4],
      o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 0,
      a = e.createLinearGradient(n ? 0 : o, n ? o : 0, n ? 0 : r, n ? r : 0);
    return a.addColorStop(0, t), a.addColorStop(1, i), a;
  }
  function g(e, t) {
    if (arguments.length > 2 && void 0 !== arguments[2] && arguments[2])
      return e.restore(), !0;
    e.save();
    var i = t.borderShadowWidth;
    return i && ((e.shadowBlur = i), (e.shadowColor = t.colorBorderShadow)), !0;
  }
  function p(e, t) {
    t.needleShadow &&
      ((e.shadowOffsetX = 2),
      (e.shadowOffsetY = 2),
      (e.shadowBlur = 10),
      (e.shadowColor = t.colorNeedleShadowDown));
  }
  function w(e, t, i) {
    return (
      e["font" + t + "Style"] +
      " " +
      e["font" + t + "Weight"] +
      " " +
      e["font" + t + "Size"] * i +
      "px " +
      e["font" + t]
    );
  }
  function b(e) {
    (e.shadowOffsetX = null),
      (e.shadowOffsetY = null),
      (e.shadowBlur = null),
      (e.shadowColor = ""),
      (e.strokeStyle = null),
      (e.lineWidth = 0),
      e.save();
  }
  function y(e, t, i, r) {
    t.valueTextShadow &&
      ((e.shadowOffsetX = i),
      (e.shadowOffsetY = i),
      (e.shadowBlur = r),
      (e.shadowColor = t.colorValueTextShadow));
  }
  function x(e, t, i, r, n, o) {
    if (t.valueBox) {
      b(e);
      var a = t.valueDec ? 1 + t.valueDec : 0,
        l = "9".repeat(
          Math.max.apply(
            null,
            [String(parseInt(i)).length + a].concat(
              t.majorTicks.map(function (e) {
                return String(parseInt(e, 10)).length + a;
              })
            )
          )
        ),
        s = t.valueText || c(i, t),
        d = o / 200,
        h = o / 100,
        f = 0.4 * h,
        v = 1.2 * h;
      (e.font = w(t, "Value", d)), y(e, t, f, v);
      var m = e.measureText(t.valueText ? s : "-" + c(Number(l), t)).width;
      b(e);
      var g = parseFloat(t.fontValueSize) * d + f + v,
        p = h * parseFloat(t.valueBoxStroke),
        x = 2 * o - 2 * p,
        k = m + 10 * h,
        T = 1.1 * g + f + v,
        S = h * t.valueBoxBorderRadius,
        O = ((parseFloat(t.valueBoxWidth) || 0) / 100) * x;
      O > k && (k = O), k > x && (k = x);
      var A = r - k / 2,
        V = n - T / 2,
        C = n - 5.75 * h;
      if ((e.beginPath(), S ? u(e, A, V, k, T, S) : e.rect(A, V, k, T), p)) {
        var P = e.createRadialGradient(r, C, 10 * h, r, C, 20 * h);
        P.addColorStop(0, t.colorValueBoxRect),
          P.addColorStop(1, t.colorValueBoxRectEnd),
          (e.strokeStyle = P),
          (e.lineWidth = p),
          e.stroke();
      }
      t.colorValueBoxShadow &&
        ((e.shadowBlur = 1.2 * h), (e.shadowColor = t.colorValueBoxShadow)),
        t.colorValueBoxBackground &&
          ((e.fillStyle = t.colorValueBoxBackground), e.fill()),
        e.closePath(),
        e.restore(),
        y(e, t, f, v),
        (e.fillStyle = t.colorValueText),
        (e.textAlign = "center"),
        (e.textBaseline = "alphabetic"),
        e.fillText(s, A + k / 2, n + T / 2 - g / 3),
        e.restore();
    }
  }
  function k(e) {
    var t = e.value,
      i = e.minValue,
      r = e.maxValue,
      n = 0.01 * (r - i);
    return {
      normal: t < i ? i : t > r ? r : t,
      indented: t < i ? i - n : t > r ? r + n : t,
    };
  }
  function T(e, t, i, r, n) {
    i.beginPath(),
      i.arc(0, 0, $(e), 0, 2 * ie, !0),
      (i.lineWidth = t),
      (i.strokeStyle = n ? te.linearGradient(i, r, n, e) : r),
      i.stroke(),
      i.closePath();
  }
  function S(e, t) {
    var i = H.pixelRatio;
    return (
      e.maxRadius ||
        (e.maxRadius =
          e.max -
          t.borderShadowWidth -
          t.borderOuterWidth * i -
          t.borderMiddleWidth * i -
          t.borderInnerWidth * i +
          (t.borderOuterWidth ? 0.5 : 0) +
          (t.borderMiddleWidth ? 0.5 : 0) +
          (t.borderInnerWidth ? 0.5 : 0)),
      e.maxRadius
    );
  }
  function O(e, t) {
    var i = H.pixelRatio,
      r = t.borderShadowWidth * i,
      n = e.max - r - (t.borderOuterWidth * i) / 2,
      o =
        n - (t.borderOuterWidth * i) / 2 - (t.borderMiddleWidth * i) / 2 + 0.5,
      a =
        o - (t.borderMiddleWidth * i) / 2 - (t.borderInnerWidth * i) / 2 + 0.5,
      l = S(e, t),
      s = void 0,
      d = !1;
    e.save(),
      t.borderOuterWidth &&
        ((d = te.drawShadow(e, t, d)),
        T(
          n,
          t.borderOuterWidth * i,
          e,
          t.colorBorderOuter,
          t.colorBorderOuterEnd
        )),
      t.borderMiddleWidth &&
        ((d = te.drawShadow(e, t, d)),
        T(
          o,
          t.borderMiddleWidth * i,
          e,
          t.colorBorderMiddle,
          t.colorBorderMiddleEnd
        )),
      t.borderInnerWidth &&
        ((d = te.drawShadow(e, t, d)),
        T(
          a,
          t.borderInnerWidth * i,
          e,
          t.colorBorderInner,
          t.colorBorderInnerEnd
        )),
      te.drawShadow(e, t, d),
      e.beginPath(),
      e.arc(0, 0, $(l), 0, 2 * ie, !0),
      t.colorPlateEnd
        ? ((s = e.createRadialGradient(0, 0, l / 2, 0, 0, l)),
          s.addColorStop(0, t.colorPlate),
          s.addColorStop(1, t.colorPlateEnd))
        : (s = t.colorPlate),
      (e.fillStyle = s),
      e.fill(),
      e.closePath(),
      e.restore();
  }
  function A(e, t) {
    var i = (e.max * (parseFloat(t.highlightsWidth) || 0)) / 100;
    if (i) {
      var r = $(C(e, t) - i / 2),
        n = 0,
        o = t.highlights.length,
        a = (t.maxValue - t.minValue) / t.ticksAngle;
      for (e.save(); n < o; n++) {
        var l = t.highlights[n];
        e.beginPath(),
          e.rotate(re),
          e.arc(
            0,
            0,
            r,
            te.radians(t.startAngle + (l.from - t.minValue) / a),
            te.radians(t.startAngle + (l.to - t.minValue) / a),
            !1
          ),
          (e.strokeStyle = l.color),
          (e.lineWidth = i),
          (e.lineCap = t.highlightsLineCap),
          e.stroke(),
          e.closePath(),
          e.restore(),
          e.save();
      }
    }
  }
  function V(e, t) {
    var i = C(e, t),
      r = void 0,
      n = void 0,
      o = void 0,
      a = 0,
      l = 0,
      s = Math.abs(t.minorTicks) || 0,
      d = t.ticksAngle / (t.maxValue - t.minValue);
    for (
      e.lineWidth = H.pixelRatio,
        e.strokeStyle = t.colorMinorTicks || t.colorStrokeTicks,
        e.save(),
        t.exactTicks
          ? ((n = t.maxValue - t.minValue),
            (r = s ? n / s : 0),
            (l = (Q.mod(t.majorTicks[0], s) || 0) * d))
          : (r = s * (t.majorTicks.length - 1));
      a < r;
      ++a
    )
      (o = t.startAngle + l + a * (t.ticksAngle / r)) <=
        t.ticksAngle + t.startAngle &&
        (e.rotate(te.radians(o)),
        e.beginPath(),
        e.moveTo(0, i),
        e.lineTo(0, i - 0.075 * e.max),
        j(e));
  }
  function C(e, t) {
    var i = e.max / 100;
    return (
      S(e, t) -
      5 * i -
      (t.barWidth
        ? 2 * (parseFloat(t.barStrokeWidth) || 0) +
          ((parseFloat(t.barWidth) || 0) + 5) * i
        : 0)
    );
  }
  function P(e, t) {
    te.prepareTicks(t);
    var i = $(C(e, t)),
      r = void 0,
      n = void 0,
      o = t.majorTicks.length,
      a = H.pixelRatio;
    for (
      e.lineWidth = 2 * a,
        e.save(),
        n =
          t.colorMajorTicks instanceof Array
            ? t.colorMajorTicks
            : new Array(o).fill(t.colorStrokeTicks || t.colorMajorTicks),
        r = 0;
      r < o;
      ++r
    )
      (e.strokeStyle = n[r]),
        e.rotate(te.radians(N(t, t.exactTicks ? t.majorTicks[r] : r, o))),
        e.beginPath(),
        e.moveTo(0, i),
        e.lineTo(0, i - 0.15 * e.max),
        j(e);
    t.strokeTicks &&
      ((e.strokeStyle = t.colorStrokeTicks || n[0]),
      e.rotate(re),
      e.beginPath(),
      e.arc(
        0,
        0,
        i,
        te.radians(t.startAngle),
        te.radians(t.startAngle + t.ticksAngle),
        !1
      ),
      j(e));
  }
  function N(e, t, i) {
    if (e.exactTicks) {
      var r = e.ticksAngle / (e.maxValue - e.minValue);
      return e.startAngle + r * (t - e.minValue);
    }
    return e.startAngle + t * (e.ticksAngle / (i - 1));
  }
  function j(e) {
    e.stroke(), e.restore(), e.closePath(), e.save();
  }
  function M(e, t) {
    var i = C(e, t) - 0.15 * e.max,
      r = {},
      n = 0,
      o = t.majorTicks.length,
      a = "needle" !== t.animationTarget,
      l =
        t.colorNumbers instanceof Array
          ? t.colorNumbers
          : new Array(o).fill(t.colorNumbers),
      s = a
        ? (-(t.value - t.minValue) / (t.maxValue - t.minValue)) * t.ticksAngle
        : 0;
    for (
      a && (e.save(), e.rotate(-te.radians(s))),
        e.font = te.font(t, "Numbers", e.max / 200),
        e.lineWidth = 0,
        e.textAlign = "center",
        e.textBaseline = "middle";
      n < o;
      ++n
    ) {
      var d = s + N(t, t.exactTicks ? t.majorTicks[n] : n, o),
        u = e.measureText(t.majorTicks[n]).width,
        c = t.fontNumbersSize,
        h = Math.sqrt(u * u + c * c) / 2,
        f = te.radialPoint(
          i - h - (t.numbersMargin / 100) * e.max,
          te.radians(d)
        );
      360 === d && (d = 0),
        r[d] ||
          ((r[d] = !0),
          (e.fillStyle = l[n]),
          e.fillText(t.majorTicks[n], f.x, f.y));
    }
    a && e.restore();
  }
  function B(e, t) {
    t.title &&
      (e.save(),
      (e.font = te.font(t, "Title", e.max / 200)),
      (e.fillStyle = t.colorTitle),
      (e.textAlign = "center"),
      e.fillText(t.title, 0, -e.max / 4.25, 0.8 * e.max),
      e.restore());
  }
  function W(e, t) {
    t.units &&
      (e.save(),
      (e.font = te.font(t, "Units", e.max / 200)),
      (e.fillStyle = t.colorUnits),
      (e.textAlign = "center"),
      e.fillText(te.formatContext(t, t.units), 0, e.max / 3.25, 0.8 * e.max),
      e.restore());
  }
  function _(e, t) {
    if (t.needle) {
      var i = t.ticksAngle < 360 ? te.normalizedValue(t).indented : t.value,
        r = h
          ? t.startAngle
          : t.startAngle +
            ((i - t.minValue) / (t.maxValue - t.minValue)) * t.ticksAngle;
      "right" === t.barStartPosition &&
        (r =
          t.startAngle +
          t.ticksAngle -
          ((i - t.minValue) / (t.maxValue - t.minValue)) * t.ticksAngle);
      var n = S(e, t),
        o = $((n / 100) * t.needleCircleSize),
        a = $((n / 100) * t.needleCircleSize * 0.75),
        l = $((n / 100) * t.needleEnd),
        s = $(t.needleStart ? (n / 100) * t.needleStart : 0),
        d = (n / 100) * t.needleWidth,
        u = ((n / 100) * t.needleWidth) / 2,
        c = H.pixelRatio,
        h = "needle" !== t.animationTarget;
      e.save(),
        te.drawNeedleShadow(e, t),
        e.rotate(te.radians(r)),
        (e.fillStyle = te.linearGradient(
          e,
          t.colorNeedle,
          t.colorNeedleEnd,
          l - s
        )),
        "arrow" === t.needleType
          ? (e.beginPath(),
            e.moveTo(-u, -s),
            e.lineTo(-d, 0),
            e.lineTo(-1 * c, l),
            e.lineTo(c, l),
            e.lineTo(d, 0),
            e.lineTo(u, -s),
            e.closePath(),
            e.fill(),
            e.beginPath(),
            e.lineTo(-0.5 * c, l),
            e.lineTo(-1 * c, l),
            e.lineTo(-d, 0),
            e.lineTo(-u, -s),
            e.lineTo((u / 2) * c - 2 * c, -s),
            e.closePath(),
            (e.fillStyle = t.colorNeedleShadowUp),
            e.fill())
          : (e.beginPath(),
            e.moveTo(-u, l),
            e.lineTo(-u, s),
            e.lineTo(u, s),
            e.lineTo(u, l),
            e.closePath(),
            e.fill()),
        t.needleCircleSize &&
          (e.restore(),
          te.drawNeedleShadow(e, t),
          t.needleCircleOuter &&
            (e.beginPath(),
            e.arc(0, 0, o, 0, 2 * ie, !0),
            (e.fillStyle = te.linearGradient(
              e,
              t.colorNeedleCircleOuter,
              t.colorNeedleCircleOuterEnd,
              o
            )),
            e.fill(),
            e.closePath()),
          t.needleCircleInner &&
            (e.beginPath(),
            e.arc(0, 0, a, 0, 2 * ie, !0),
            (e.fillStyle = te.linearGradient(
              e,
              t.colorNeedleCircleInner,
              t.colorNeedleCircleInnerEnd,
              a
            )),
            e.fill(),
            e.closePath()),
          e.restore());
    }
  }
  function E(e, t, i) {
    te.drawValueBox(e, t, i, 0, e.max - 0.33 * e.max, e.max);
  }
  function R(e) {
    var t = e.startAngle,
      i = e.startAngle + e.ticksAngle,
      r = t,
      n =
        t +
        ((te.normalizedValue(e).normal - e.minValue) /
          (e.maxValue - e.minValue)) *
          e.ticksAngle;
    if ("middle" === e.barStartPosition) {
      var o = 0.5 * (e.minValue + e.maxValue);
      e.value < o
        ? ((r =
            180 -
            ((o - te.normalizedValue(e).normal) / (e.maxValue - e.minValue)) *
              e.ticksAngle),
          (n = 180))
        : ((r = 180),
          (n =
            180 +
            ((te.normalizedValue(e).normal - o) / (e.maxValue - e.minValue)) *
              e.ticksAngle));
    } else "right" === e.barStartPosition && ((r = i - n + t), (n = i));
    return { startAngle: r, endAngle: n };
  }
  function I(e, t) {
    var i = e.max / 100,
      r = S(e, t) - 5 * i,
      n = parseFloat(t.barStrokeWidth + "") || 0,
      o = (parseFloat(t.barWidth + "") || 0) * i,
      a = r - 2 * n - o,
      l = (r - a) / 2,
      s = a + l,
      d = n / s,
      u = t.startAngle,
      c = t.startAngle + t.ticksAngle;
    if (
      (e.save(),
      e.rotate(re),
      n &&
        (e.beginPath(),
        e.arc(0, 0, s, te.radians(u) - d, te.radians(c) + d, !1),
        (e.strokeStyle = t.colorBarStroke),
        (e.lineWidth = 2 * l),
        e.stroke(),
        e.closePath()),
      o &&
        (e.beginPath(),
        e.arc(0, 0, s, te.radians(u), te.radians(c), !1),
        (e.strokeStyle = t.colorBar),
        (e.lineWidth = o),
        e.stroke(),
        e.closePath(),
        t.barShadow &&
          (e.beginPath(),
          e.arc(0, 0, r, te.radians(u), te.radians(c), !1),
          e.clip(),
          e.beginPath(),
          (e.strokeStyle = t.colorBar),
          (e.lineWidth = 1),
          (e.shadowBlur = t.barShadow),
          (e.shadowColor = t.colorBarShadow),
          (e.shadowOffsetX = 0),
          (e.shadowOffsetY = 0),
          e.arc(
            0,
            0,
            r,
            te.radians(t.startAngle),
            te.radians(t.startAngle + t.ticksAngle),
            !1
          ),
          e.stroke(),
          e.closePath(),
          e.restore(),
          e.rotate(re)),
        t.barProgress))
    ) {
      var h = R(t),
        f = h.startAngle,
        v = h.endAngle;
      e.beginPath(),
        e.arc(0, 0, s, te.radians(f), te.radians(v), !1),
        (e.strokeStyle = t.colorBarProgress),
        (e.lineWidth = o),
        e.stroke(),
        e.closePath();
    }
    e.restore();
  }
  function z(e) {
    return e.options.animatedValue ? e.options.value : e.value;
  }
  var D = function e(t, i, r) {
      null === t && (t = Function.prototype);
      var n = Object.getOwnPropertyDescriptor(t, i);
      if (void 0 === n) {
        var o = Object.getPrototypeOf(t);
        return null === o ? void 0 : e(o, i, r);
      }
      if ("value" in n) return n.value;
      var a = n.get;
      if (void 0 !== a) return a.call(r);
    },
    F = function e(t, i, r, n) {
      var o = Object.getOwnPropertyDescriptor(t, i);
      if (void 0 === o) {
        var a = Object.getPrototypeOf(t);
        null !== a && e(a, i, r, n);
      } else if ("value" in o && o.writable) o.value = r;
      else {
        var l = o.set;
        void 0 !== l && l.call(n, r);
      }
      return r;
    },
    G = (function () {
      function e(e, t) {
        for (var i = 0; i < t.length; i++) {
          var r = t[i];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function (t, i, r) {
        return i && e(t.prototype, i), r && e(t, r), t;
      };
    })();
  Object.assign ||
    Object.defineProperty(Object, "assign", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function (e, t) {
        if (void 0 === e || null === e)
          throw new TypeError("Cannot convert first argument to object");
        for (var i = Object(e), r = 1; r < arguments.length; r++) {
          var n = arguments[r];
          if (void 0 !== n && null !== n)
            for (
              var o = Object.keys(Object(n)), a = 0, l = o.length;
              a < l;
              a++
            ) {
              var s = o[a],
                d = Object.getOwnPropertyDescriptor(n, s);
              void 0 !== d && d.enumerable && (i[s] = n[s]);
            }
        }
        return i;
      },
    }),
    Array.prototype.indexOf ||
      Object.defineProperty(Array.prototype, "indexOf", {
        value: function (e, t) {
          var i;
          if (null === this)
            throw new TypeError('"this" is null or not defined');
          var r = Object(this),
            n = r.length >>> 0;
          if (0 === n) return -1;
          var o = +t || 0;
          if ((Math.abs(o) === 1 / 0 && (o = 0), o >= n)) return -1;
          for (i = Math.max(o >= 0 ? o : n - Math.abs(o), 0); i < n; ) {
            if (i in r && r[i] === e) return i;
            i++;
          }
          return -1;
        },
      }),
    Array.prototype.fill ||
      Object.defineProperty(Array.prototype, "fill", {
        value: function (e) {
          if (null === this) throw new TypeError("this is null or not defined");
          for (
            var t = Object(this),
              i = t.length >>> 0,
              r = arguments[1],
              n = r >> 0,
              o = n < 0 ? Math.max(i + n, 0) : Math.min(n, i),
              a = arguments[2],
              l = void 0 === a ? i : a >> 0,
              s = l < 0 ? Math.max(i + l, 0) : Math.min(l, i);
            o < s;

          )
            (t[o] = e), o++;
          return t;
        },
      }),
    "undefined" == typeof window &&
      (window = "undefined" == typeof global ? {} : global);
  var L = (function () {
      function e() {
        r(this, e),
          (this._events = {}),
          (this.addListener = this.on),
          (this.removeListener = this.off);
      }
      return (
        G(e, [
          {
            key: "emit",
            value: function (e) {
              if (this._events[e]) {
                for (
                  var t = 0,
                    i = this._events[e].length,
                    r = arguments.length,
                    n = Array(r > 1 ? r - 1 : 0),
                    o = 1;
                  o < r;
                  o++
                )
                  n[o - 1] = arguments[o];
                for (; t < i; t++)
                  this._events[e][t] && this._events[e][t].apply(this, n);
              }
            },
          },
          {
            key: "once",
            value: function (e) {
              for (
                var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), r = 1;
                r < t;
                r++
              )
                i[r - 1] = arguments[r];
              for (var n = 0, o = i.length, a = this; n < o; n++)
                !(function () {
                  var t = i[n],
                    r = function i() {
                      a.off(e, i), t.apply(a, arguments);
                    };
                  i[n] = r;
                })();
              this.on.apply(this, [e].concat(i));
            },
          },
          {
            key: "on",
            value: function (e) {
              this._events[e] || (this._events[e] = []);
              for (
                var t = 0, i = arguments.length <= 1 ? 0 : arguments.length - 1;
                t < i;
                t++
              )
                this._events[e].push(
                  arguments.length <= t + 1 ? void 0 : arguments[t + 1]
                );
            },
          },
          {
            key: "off",
            value: function (e) {
              if (this._events[e])
                for (
                  var t = 0,
                    i = arguments.length <= 1 ? 0 : arguments.length - 1;
                  t < i;
                  t++
                )
                  for (
                    var r =
                        arguments.length <= t + 1 ? void 0 : arguments[t + 1],
                      n = void 0;
                    ~(n = this._events[e].indexOf(r));

                  )
                    this._events[e].splice(n, 1);
            },
          },
          {
            key: "removeAllListeners",
            value: function (e) {
              delete this._events[e];
            },
          },
          {
            key: "listeners",
            get: function () {
              return this._events;
            },
          },
        ]),
        e
      );
    })(),
    U =
      n("requestAnimationFrame") ||
      function (e) {
        return setTimeout(function () {
          return e(new Date().getTime());
        }, 1e3 / 60);
      },
    q = {
      linear: function (e) {
        return e;
      },
      quad: function (e) {
        return Math.pow(e, 2);
      },
      dequad: function (e) {
        return 1 - q.quad(1 - e);
      },
      quint: function (e) {
        return Math.pow(e, 5);
      },
      dequint: function (e) {
        return 1 - Math.pow(1 - e, 5);
      },
      cycle: function (e) {
        return 1 - Math.sin(Math.acos(e));
      },
      decycle: function (e) {
        return Math.sin(Math.acos(1 - e));
      },
      bounce: function (e) {
        return 1 - q.debounce(1 - e);
      },
      debounce: function (e) {
        for (var t = 0, i = 1; 1; t += i, i /= 2)
          if (e >= (7 - 4 * t) / 11)
            return -Math.pow((11 - 6 * t - 11 * e) / 4, 2) + Math.pow(i, 2);
      },
      elastic: function (e) {
        return 1 - q.delastic(1 - e);
      },
      delastic: function (e) {
        return (
          Math.pow(2, 10 * (e - 1)) * Math.cos(((20 * Math.PI * 1.5) / 3) * e)
        );
      },
    },
    X = (function () {
      function e() {
        var t =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : "linear",
          i =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : 250,
          n =
            arguments.length > 2 && void 0 !== arguments[2]
              ? arguments[2]
              : function () {},
          o =
            arguments.length > 3 && void 0 !== arguments[3]
              ? arguments[3]
              : function () {};
        if (
          (r(this, e),
          (this.duration = i),
          (this.rule = t),
          (this.draw = n),
          (this.end = o),
          "function" != typeof this.draw)
        )
          throw new TypeError("Invalid animation draw callback:", n);
        if ("function" != typeof this.end)
          throw new TypeError("Invalid animation end callback:", o);
      }
      return (
        G(e, [
          {
            key: "animate",
            value: function (e, t) {
              var i = this;
              this.frame && this.cancel();
              var r =
                window.performance && window.performance.now
                  ? window.performance.now()
                  : n("animationStartTime") || Date.now();
              (e = e || this.draw),
                (t = t || this.end),
                (this.draw = e),
                (this.end = t),
                (this.frame = U(function (n) {
                  return o(n, e, r, q[i.rule] || i.rule, i.duration, t, i);
                }));
            },
          },
          {
            key: "cancel",
            value: function () {
              if (this.frame) {
                (n("cancelAnimationFrame") || function (e) {})(this.frame),
                  (this.frame = null);
              }
            },
          },
          {
            key: "destroy",
            value: function () {
              this.cancel(), (this.draw = null), (this.end = null);
            },
          },
        ]),
        e
      );
    })();
  X.rules = q;
  var Y = (function () {
      function t(i, n, o) {
        r(this, t),
          (this.options = i),
          (this.element = n.toLowerCase()),
          (this.type = t.toDashed(o)),
          (this.Type = e[o]),
          (this.mutationsObserved = !1),
          (this.isObservable = !!window.MutationObserver),
          window.GAUGES_NO_AUTO_INIT || t.domReady(this.traverse.bind(this));
      }
      return (
        G(
          t,
          [
            {
              key: "isValidNode",
              value: function (e) {
                return !(
                  !e.tagName ||
                  e.tagName.toLowerCase() !== this.element ||
                  e.getAttribute("data-type") !== this.type
                );
              },
            },
            {
              key: "traverse",
              value: function () {
                for (
                  var e = document.getElementsByTagName(this.element),
                    t = 0,
                    i = e.length;
                  t < i;
                  t++
                )
                  this.process(e[t]);
                this.isObservable &&
                  !this.mutationsObserved &&
                  (new MutationObserver(this.observe.bind(this)).observe(
                    document.body,
                    {
                      childList: !0,
                      subtree: !0,
                      attributes: !0,
                      characterData: !0,
                      attributeOldValue: !0,
                      characterDataOldValue: !0,
                    }
                  ),
                  (this.mutationsObserved = !0));
              },
            },
            {
              key: "observe",
              value: function (e) {
                for (var t = 0, i = e.length; t < i; t++) {
                  var r = e[t];
                  if (
                    "attributes" === r.type &&
                    "data-type" === r.attributeName &&
                    this.isValidNode(r.target) &&
                    r.oldValue !== this.type
                  )
                    setTimeout(this.process.bind(this, r.target));
                  else if (r.addedNodes && r.addedNodes.length)
                    for (var n = 0, o = r.addedNodes.length; n < o; n++)
                      setTimeout(this.process.bind(this, r.addedNodes[n]));
                }
              },
            },
            {
              key: "process",
              value: function (e) {
                var i = this;
                if (!this.isValidNode(e)) return null;
                var r = void 0,
                  n = JSON.parse(JSON.stringify(this.options)),
                  o = null;
                for (r in n)
                  if (n.hasOwnProperty(r)) {
                    var a = t.toAttributeName(r),
                      l = t.parse(e.getAttribute(a));
                    null !== l && void 0 !== l && (n[r] = l);
                  }
                return (
                  (n.renderTo = e),
                  (o = new this.Type(n)),
                  o.draw && o.draw(),
                  this.isObservable
                    ? ((o.observer = new MutationObserver(function (r) {
                        r.forEach(function (r) {
                          if ("attributes" === r.type) {
                            var n = r.attributeName.toLowerCase(),
                              a = e.getAttribute(n).toLowerCase();
                            if ("data-type" === n && a && a !== i.type)
                              o.observer.disconnect(),
                                delete o.observer,
                                o.destroy && o.destroy();
                            else if ("data-" === n.substr(0, 5)) {
                              var l = n
                                  .substr(5)
                                  .split("-")
                                  .map(function (e, t) {
                                    return t
                                      ? e.charAt(0).toUpperCase() + e.substr(1)
                                      : e;
                                  })
                                  .join(""),
                                s = {};
                              (s[l] = t.parse(e.getAttribute(r.attributeName))),
                                "value" === l
                                  ? o && (o.value = s[l])
                                  : o.update && o.update(s);
                            }
                          }
                        });
                      })),
                      o.observer.observe(e, { attributes: !0 }),
                      o)
                    : o
                );
              },
            },
          ],
          [
            {
              key: "parse",
              value: function (e) {
                if ("true" === e) return !0;
                if ("false" === e) return !1;
                if ("undefined" !== e) {
                  if ("null" === e) return null;
                  if (/^[-+#.\w\d\s]+(?:,[-+#.\w\d\s]*)+$/.test(e))
                    return e.split(",");
                  try {
                    return JSON.parse(e);
                  } catch (e) {}
                  return e;
                }
              },
            },
            {
              key: "toDashed",
              value: function (e) {
                for (
                  var t = e.split(/(?=[A-Z])/),
                    i = 1,
                    r = t.length,
                    n = t[0].toLowerCase();
                  i < r;
                  i++
                )
                  n += "-" + t[i].toLowerCase();
                return n;
              },
            },
            {
              key: "toCamelCase",
              value: function (e) {
                for (
                  var t =
                      !(arguments.length > 1 && void 0 !== arguments[1]) ||
                      arguments[1],
                    i = e.split(/-/),
                    r = 0,
                    n = i.length,
                    o = "";
                  r < n;
                  r++
                )
                  o +=
                    r || t
                      ? i[r][0].toUpperCase() + i[r].substr(1).toLowerCase()
                      : i[r].toLowerCase();
                return o;
              },
            },
            {
              key: "toAttributeName",
              value: function (e) {
                return "data-" + t.toDashed(e);
              },
            },
            {
              key: "domReady",
              value: function (e) {
                if (
                  /comp|inter|loaded/.test(
                    (window.document || {}).readyState + ""
                  )
                )
                  return e();
                window.addEventListener
                  ? window.addEventListener("DOMContentLoaded", e, !1)
                  : window.attachEvent && window.attachEvent("onload", e);
              },
            },
          ]
        ),
        t
      );
    })(),
    H = (function () {
      function e(t, i, n) {
        r(this, e),
          e.collection.push(this),
          (this.width = i || 0),
          (this.height = n || 0),
          (this.element = t),
          this.init();
      }
      return (
        G(
          e,
          [
            {
              key: "init",
              value: function () {
                var t = e.pixelRatio;
                (this.element.width = this.width * t),
                  (this.element.height = this.height * t),
                  (this.element.style.width = this.width + "px"),
                  (this.element.style.height = this.height + "px"),
                  (this.elementClone = this.element.cloneNode(!0)),
                  (this.context = this.element.getContext("2d")),
                  (this.contextClone = this.elementClone.getContext("2d")),
                  (this.drawWidth = this.element.width),
                  (this.drawHeight = this.element.height),
                  (this.drawX = this.drawWidth / 2),
                  (this.drawY = this.drawHeight / 2),
                  (this.minSide =
                    this.drawX < this.drawY ? this.drawX : this.drawY),
                  (this.elementClone.initialized = !1),
                  this.contextClone.translate(this.drawX, this.drawY),
                  this.contextClone.save(),
                  this.context.translate(this.drawX, this.drawY),
                  this.context.save(),
                  (this.context.max = this.contextClone.max = this.minSide),
                  (this.context.maxRadius = this.contextClone.maxRadius = null);
              },
            },
            {
              key: "destroy",
              value: function () {
                var t = e.collection.indexOf(this);
                ~t && e.collection.splice(t, 1),
                  this.context.clearRect(
                    -this.drawX,
                    -this.drawY,
                    this.drawWidth,
                    this.drawHeight
                  ),
                  (this.context.max = null),
                  delete this.context.max,
                  (this.context.maxRadius = null),
                  delete this.context.maxRadius,
                  (this.context = null),
                  (this.contextClone = null),
                  (this.elementClone = null),
                  (this.element = null),
                  (this.onRedraw = null);
              },
            },
            {
              key: "commit",
              value: function () {
                var t = e.pixelRatio;
                return (
                  1 !== t &&
                    (this.contextClone.scale(t, t), this.contextClone.save()),
                  this
                );
              },
            },
            {
              key: "redraw",
              value: function () {
                return this.init(), this.onRedraw && this.onRedraw(), this;
              },
            },
          ],
          [
            {
              key: "redraw",
              value: function () {
                for (var t = 0, i = e.collection.length; t < i; t++)
                  e.collection[t].redraw();
              },
            },
            {
              key: "pixelRatio",
              get: function () {
                return window.devicePixelRatio || 1;
              },
            },
          ]
        ),
        e
      );
    })();
  (H.collection = []),
    window.matchMedia &&
      window
        .matchMedia("screen and (min-resolution: 2dppx)")
        .addListener(H.redraw);
  var J = {
    renderTo: null,
    width: 0,
    height: 0,
    minValue: 0,
    maxValue: 100,
    value: 0,
    units: !1,
    exactTicks: !1,
    majorTicks: [0, 20, 40, 60, 80, 100],
    minorTicks: 10,
    strokeTicks: !0,
    animatedValue: !1,
    animateOnInit: !1,
    title: !1,
    borders: !0,
    numbersMargin: 1,
    listeners: null,
    valueInt: 3,
    valueDec: 2,
    majorTicksInt: 1,
    majorTicksDec: 0,
    animation: !0,
    animationDuration: 500,
    animationRule: "cycle",
    colorPlate: "#fff",
    colorPlateEnd: "",
    colorMajorTicks: "#444",
    colorMinorTicks: "#666",
    colorStrokeTicks: "",
    colorTitle: "#888",
    colorUnits: "#888",
    colorNumbers: "#444",
    colorNeedle: "rgba(240,128,128,1)",
    colorNeedleEnd: "rgba(255,160,122,.9)",
    colorValueText: "#444",
    colorValueTextShadow: "rgba(0,0,0,0.3)",
    colorBorderShadow: "rgba(0,0,0,0.5)",
    colorBorderOuter: "#ddd",
    colorBorderOuterEnd: "#aaa",
    colorBorderMiddle: "#eee",
    colorBorderMiddleEnd: "#f0f0f0",
    colorBorderInner: "#fafafa",
    colorBorderInnerEnd: "#ccc",
    colorValueBoxRect: "#888",
    colorValueBoxRectEnd: "#666",
    colorValueBoxBackground: "#babab2",
    colorValueBoxShadow: "rgba(0,0,0,1)",
    colorNeedleShadowUp: "rgba(2,255,255,0.2)",
    colorNeedleShadowDown: "rgba(188,143,143,0.45)",
    colorBarStroke: "#222",
    colorBar: "#ccc",
    colorBarProgress: "#888",
    colorBarShadow: "#000",
    fontNumbers: "Arial",
    fontTitle: "Arial",
    fontUnits: "Arial",
    fontValue: "Arial",
    fontNumbersSize: 20,
    fontTitleSize: 24,
    fontUnitsSize: 22,
    fontValueSize: 26,
    fontNumbersStyle: "normal",
    fontTitleStyle: "normal",
    fontUnitsStyle: "normal",
    fontValueStyle: "normal",
    fontNumbersWeight: "normal",
    fontTitleWeight: "normal",
    fontUnitsWeight: "normal",
    fontValueWeight: "normal",
    needle: !0,
    needleShadow: !0,
    needleType: "arrow",
    needleStart: 5,
    needleEnd: 85,
    needleWidth: 4,
    borderOuterWidth: 3,
    borderMiddleWidth: 3,
    borderInnerWidth: 3,
    borderShadowWidth: 3,
    valueBox: !0,
    valueBoxStroke: 5,
    valueBoxWidth: 0,
    valueText: "",
    valueTextShadow: !0,
    valueBoxBorderRadius: 2.5,
    highlights: [
      { from: 20, to: 60, color: "#eee" },
      { from: 60, to: 80, color: "#ccc" },
      { from: 80, to: 100, color: "#999" },
    ],
    highlightsWidth: 15,
    highlightsLineCap: "butt",
    barWidth: 20,
    barStrokeWidth: 0,
    barProgress: !0,
    barShadow: 0,
  };
  (a.prototype = Object.create(Array.prototype)),
    (a.prototype.constructor = a),
    (a.prototype.get = function (e) {
      if ("string" == typeof e)
        for (var t = 0, i = this.length; t < i; t++) {
          var r = this[t].options.renderTo.tagName
            ? this[t].options.renderTo
            : document.getElementById(this[t].options.renderTo || "");
          if (r.getAttribute("id") === e) return this[t];
        }
      else if ("number" == typeof e) return this[e];
      return null;
    });
  var Z = "2.1.7",
    $ = (Math.round, Math.abs),
    K = new a();
  K.version = Z;
  var Q = (function (n) {
    function o(i) {
      r(this, o);
      var n = t(this, (o.__proto__ || Object.getPrototypeOf(o)).call(this)),
        a = n.constructor.name;
      if ("BaseGauge" === a)
        throw new TypeError("Attempt to instantiate abstract class!");
      if (
        (K.push(n),
        i.listeners &&
          Object.keys(i.listeners).forEach(function (e) {
            (i.listeners[e] instanceof Array
              ? i.listeners[e]
              : [i.listeners[e]]
            ).forEach(function (t) {
              n.on(e, t);
            });
          }),
        (n.version = Z),
        (n.type = e[a] || o),
        (n.initialized = !1),
        (i.minValue = parseFloat(i.minValue)),
        (i.maxValue = parseFloat(i.maxValue)),
        (i.value = parseFloat(i.value) || 0),
        i.borders ||
          (i.borderInnerWidth = i.borderMiddleWidth = i.borderOuterWidth = 0),
        !i.renderTo)
      )
        throw TypeError(
          "Canvas element was not specified when creating the Gauge object!"
        );
      var l = i.renderTo.tagName
        ? i.renderTo
        : document.getElementById(i.renderTo);
      if (!(l instanceof HTMLCanvasElement))
        throw TypeError("Given gauge canvas element is invalid!");
      return (
        (i.width = parseFloat(i.width) || 0),
        (i.height = parseFloat(i.height) || 0),
        (i.width && i.height) ||
          (i.width ||
            (i.width = l.parentNode ? l.parentNode.offsetWidth : l.offsetWidth),
          i.height ||
            (i.height = l.parentNode
              ? l.parentNode.offsetHeight
              : l.offsetHeight)),
        (n.options = i || {}),
        n.options.animateOnInit &&
          ((n._value = n.options.value),
          (n.options.value = n.options.minValue)),
        (n.canvas = new H(l, i.width, i.height)),
        (n.canvas.onRedraw = n.draw.bind(n)),
        (n.animation = new X(i.animationRule, i.animationDuration)),
        n
      );
    }
    return (
      i(o, n),
      G(
        o,
        [
          {
            key: "update",
            value: function (e) {
              return (
                Object.assign(this.options, this.type.configure(e || {})),
                (this.canvas.width = this.options.width),
                (this.canvas.height = this.options.height),
                (this.animation.rule = this.options.animationRule),
                (this.animation.duration = this.options.animationDuration),
                this.canvas.redraw(),
                this
              );
            },
          },
          {
            key: "destroy",
            value: function () {
              var e = K.indexOf(this);
              ~e && K.splice(e, 1),
                this.canvas.destroy(),
                (this.canvas = null),
                this.animation.destroy(),
                (this.animation = null),
                this.emit("destroy");
            },
          },
          {
            key: "draw",
            value: function () {
              return (
                this.options.animateOnInit &&
                  !this.initialized &&
                  ((this.value = this._value),
                  (this.initialized = !0),
                  this.emit("init")),
                this.emit("render"),
                this
              );
            },
          },
          {
            key: "value",
            set: function (e) {
              var t = this;
              e = o.ensureValue(e, this.options.minValue);
              var i = this.options.value;
              if (e !== i)
                if (this.options.animation) {
                  if (
                    this.animation.frame &&
                    ((this.options.value = this._value), this._value === e)
                  )
                    return this.animation.cancel(), void delete this._value;
                  void 0 === this._value && (this._value = e),
                    this.emit("animationStart"),
                    this.animation.animate(
                      function (r) {
                        var n = i + (e - i) * r;
                        t.options.animatedValue && t.emit("value", n, t.value),
                          (t.options.value = n),
                          t.draw(),
                          t.emit("animate", r, t.options.value);
                      },
                      function () {
                        void 0 !== t._value &&
                          (t.emit("value", t._value, t.value),
                          (t.options.value = t._value),
                          delete t._value),
                          t.draw(),
                          t.emit("animationEnd");
                      }
                    );
                } else
                  this.emit("value", e, this.value),
                    (this.options.value = e),
                    this.draw();
            },
            get: function () {
              return void 0 === this._value ? this.options.value : this._value;
            },
          },
        ],
        [
          {
            key: "configure",
            value: function (e) {
              return e;
            },
          },
          {
            key: "initialize",
            value: function (e, t) {
              return new Y(t, "canvas", e);
            },
          },
          {
            key: "fromElement",
            value: function (e) {
              var t = Y.toCamelCase(e.getAttribute("data-type")),
                i = e.attributes,
                r = 0,
                n = i.length,
                o = {};
              if (t) {
                for (/Gauge$/.test(t) || (t += "Gauge"); r < n; r++)
                  o[Y.toCamelCase(i[r].name.replace(/^data-/, ""), !1)] =
                    Y.parse(i[r].value);
                new Y(o, e.tagName, t).process(e);
              }
            },
          },
          {
            key: "ensureValue",
            value: function (e) {
              var t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 0;
              return (
                (e = parseFloat(e)),
                (!isNaN(e) && isFinite(e)) || (e = parseFloat(t) || 0),
                e
              );
            },
          },
          {
            key: "mod",
            value: function (e, t) {
              return ((e % t) + t) % t;
            },
          },
          {
            key: "version",
            get: function () {
              return Z;
            },
          },
        ]
      ),
      o
    );
  })(L);
  void 0 !== e &&
    ((e.BaseGauge = Q), (e.gauges = (window.document || {}).gauges = K));
  var ee = /{([_a-zA-Z]+[_a-zA-Z0-9]*)}/g,
    te = {
      roundRect: u,
      padValue: c,
      formatMajorTickNumber: h,
      radians: f,
      radialPoint: v,
      linearGradient: m,
      drawNeedleShadow: p,
      drawValueBox: x,
      verifyError: l,
      prepareTicks: d,
      drawShadow: g,
      font: w,
      normalizedValue: k,
      formatContext: s,
    },
    ie = Math.PI,
    re = ie / 2,
    ne = Object.assign({}, J, {
      ticksAngle: 270,
      startAngle: 45,
      colorNeedleCircleOuter: "#f0f0f0",
      colorNeedleCircleOuterEnd: "#ccc",
      colorNeedleCircleInner: "#e8e8e8",
      colorNeedleCircleInnerEnd: "#f5f5f5",
      needleCircleSize: 10,
      needleCircleInner: !0,
      needleCircleOuter: !0,
      needleStart: 20,
      animationTarget: "needle",
      useMinPath: !1,
      barWidth: 0,
      barStartPosition: "left",
    }),
    oe = (function (e) {
      function n(e) {
        return (
          r(this, n),
          (e = Object.assign({}, ne, e || {})),
          t(
            this,
            (n.__proto__ || Object.getPrototypeOf(n)).call(this, n.configure(e))
          )
        );
      }
      return (
        i(n, e),
        G(
          n,
          [
            {
              key: "draw",
              value: function () {
                try {
                  var e = this.canvas,
                    t = [-e.drawX, -e.drawY, e.drawWidth, e.drawHeight],
                    i = t[0],
                    r = t[1],
                    o = t[2],
                    a = t[3],
                    l = this.options;
                  if ("needle" === l.animationTarget) {
                    if (!e.elementClone.initialized) {
                      var s = e.contextClone;
                      s.clearRect(i, r, o, a),
                        s.save(),
                        this.emit("beforePlate"),
                        O(s, l),
                        this.emit("beforeHighlights"),
                        A(s, l),
                        this.emit("beforeMinorTicks"),
                        V(s, l),
                        this.emit("beforeMajorTicks"),
                        P(s, l),
                        this.emit("beforeNumbers"),
                        M(s, l),
                        this.emit("beforeTitle"),
                        B(s, l),
                        this.emit("beforeUnits"),
                        W(s, l),
                        (e.elementClone.initialized = !0);
                    }
                    this.canvas.commit(),
                      e.context.clearRect(i, r, o, a),
                      e.context.save(),
                      e.context.drawImage(e.elementClone, i, r, o, a),
                      e.context.save(),
                      this.emit("beforeProgressBar"),
                      I(e.context, l),
                      this.emit("beforeValueBox"),
                      E(e.context, l, z(this)),
                      this.emit("beforeNeedle"),
                      _(e.context, l);
                  } else {
                    var d = -te.radians(
                      ((l.value - l.minValue) / (l.maxValue - l.minValue)) *
                        l.ticksAngle
                    );
                    if (
                      (e.context.clearRect(i, r, o, a),
                      e.context.save(),
                      this.emit("beforePlate"),
                      O(e.context, l),
                      e.context.rotate(d),
                      this.emit("beforeHighlights"),
                      A(e.context, l),
                      this.emit("beforeMinorTicks"),
                      V(e.context, l),
                      this.emit("beforeMajorTicks"),
                      P(e.context, l),
                      this.emit("beforeNumbers"),
                      M(e.context, l),
                      this.emit("beforeProgressBar"),
                      I(e.context, l),
                      e.context.rotate(-d),
                      e.context.save(),
                      !e.elementClone.initialized)
                    ) {
                      var u = e.contextClone;
                      u.clearRect(i, r, o, a),
                        u.save(),
                        this.emit("beforeTitle"),
                        B(u, l),
                        this.emit("beforeUnits"),
                        W(u, l),
                        this.emit("beforeNeedle"),
                        _(u, l),
                        (e.elementClone.initialized = !0);
                    }
                    e.context.drawImage(e.elementClone, i, r, o, a);
                  }
                  this.emit("beforeValueBox"),
                    E(e.context, l, z(this)),
                    D(
                      n.prototype.__proto__ ||
                        Object.getPrototypeOf(n.prototype),
                      "draw",
                      this
                    ).call(this);
                } catch (e) {
                  te.verifyError(e);
                }
                return this;
              },
            },
            {
              key: "value",
              set: function (e) {
                (e = Q.ensureValue(e, this.options.minValue)),
                  this.options.animation &&
                    360 === this.options.ticksAngle &&
                    this.options.useMinPath &&
                    ((this._value = e),
                    (e =
                      this.options.value +
                      ((((e - this.options.value) % 360) + 540) % 360) -
                      180)),
                  F(
                    n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                    "value",
                    e,
                    this
                  );
              },
              get: function () {
                return D(
                  n.prototype.__proto__ || Object.getPrototypeOf(n.prototype),
                  "value",
                  this
                );
              },
            },
          ],
          [
            {
              key: "configure",
              value: function (e) {
                return (
                  e.barWidth > 50 && (e.barWidth = 50),
                  isNaN(e.startAngle) && (e.startAngle = 45),
                  isNaN(e.ticksAngle) && (e.ticksAngle = 270),
                  e.ticksAngle > 360 && (e.ticksAngle = 360),
                  e.ticksAngle < 0 && (e.ticksAngle = 0),
                  e.startAngle < 0 && (e.startAngle = 0),
                  e.startAngle > 360 && (e.startAngle = 360),
                  e
                );
              },
            },
          ]
        ),
        n
      );
    })(Q);
  void 0 !== e && (e.RadialGauge = oe),
    Q.initialize("RadialGauge", ne),
    "undefined" != typeof module &&
      Object.assign(e, {
        Collection: a,
        GenericOptions: J,
        Animation: X,
        BaseGauge: Q,
        drawings: te,
        SmartCanvas: H,
        DomObserver: Y,
        vendorize: n,
      });
})("undefined" != typeof module ? module.exports : window);
