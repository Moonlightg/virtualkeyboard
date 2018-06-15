﻿; var VirtualKeyboard = new function () {
    var I = this; I.$VERSION$ = "3.7.1.788"; var l = findPath('vk_loader.js'); var o = /\x03/; var O = { 'layout': null, 'skin': 'winxp' }; var Q = 'kb_b'; var _ = true; var c = true; var C = { 14: 'backspace', 15: 'tab', 28: 'enter', 29: 'caps', 41: 'shift_left', 52: 'shift_right', 53: 'del', 54: 'ctrl_left', 55: 'alt_left', 56: 'space', 57: 'alt_right', 58: 'ctrl_right', 59: 'input_method' }; var v = { 'SHIFT': 'shift', 'ALT': 'alt', 'CTRL': 'ctrl', 'CAPS': 'caps' }; var V; var x = { 'QWERTY Default': "À1234567890m=ÜQWERTYUIOPÛÝASDFGHJKL;ÞZXCVBNM¼¾¿" }; var X = 0, z = 0, Z = 1, w = 2, W = 4, s = 8, S = W | s, k = W | Z, K = w | s, q = w | W, E = w | W | s, r = w | Z, R = Z | w | W, t = Z | s, T = Z | w | W | s; var y = { 'buttonUp': 'kbButton', 'buttonDown': 'kbButtonDown', 'buttonHover': 'kbButtonHover', 'hoverShift': 'hoverShift', 'hoverAlt': 'hoverAlt', 'modeAlt': 'modeAlt', 'modeAltCaps': 'modeAltCaps', 'modeCaps': 'modeCaps', 'modeNormal': 'modeNormal', 'modeShift': 'modeShift', 'modeShiftAlt': 'modeShiftAlt', 'modeShiftAltCaps': 'modeShiftAltCaps', 'modeShiftCaps': 'modeShiftCaps', 'charNormal': 'charNormal', 'charShift': 'charShift', 'charAlt': 'charAlt', 'charShiftAlt': 'charShiftAlt', 'charCaps': 'charCaps', 'charShiftCaps': 'charShiftCaps', 'hiddenAlt': 'hiddenAlt', 'hiddenCaps': 'hiddenCaps', 'hiddenShift': 'hiddenShift', 'hiddenShiftCaps': 'hiddenShiftCaps', 'deadkey': 'deadKey', 'noanim': 'VK_no_animate' }; var Y = null; var u = []; u.hash = {}; u.codes = {}; u.codeFilter = null; u.options = null; var U = { keyboard: null, desk: null, progressbar: null, langbox: null, attachedInput: null }; var p = null; I.addLayoutList = function () { for (var i = 0, iI = arguments.length; i < iI; i++) { try { I.addLayout(arguments[i]); } catch (e) { } } }; I.addLayout = function (i) {
        var e = i.code.entityDecode().split("-"), iI = i.name.entityDecode(), il = J(i.normal); if (!isArray(il) || 47 != il.length) throw new Error('VirtualKeyboard requires \'keys\' property to be an array with 47 items, ' + il.length + ' detected. Layout code: ' + e + ', layout name: ' + iI); i.code = (e[1] || e[0]); i.name = iI; i.normal = il; i.domain = e[0]; i.id = i.code + " " + i.name; if (u.hash.hasOwnProperty(i.id)) { var io = u.hash[i.id]; for (var iO in i) { io[iO] = i[iO] } } else {
            var e; if (!u.codes.hasOwnProperty(i.code)) { e = { 'name': i.code, 'layout': [] }; u.codes[i.code] = e } else { e = u.codes[i.code] }
            u.push(i); e.layout.push(i); u.hash[i.id] = i; if (!u.codes.hasOwnProperty(i.code)) u.codes[i.code] = i.code; i.toString = function () { return this.id }; u.options = null
        } 
    }; I.switchLayout = function (i) {
        var e = (!Y || i != Y.toString()); if (e) {
            j(); if (!i) { i = U.langbox.value }
            if (!u.options.hasOwnProperty(i)) return false; G(10); I.IME.hide(); U.langbox.options[u.options[i]].selected = true; Y = u.hash[i]; e = !!Y; if (e) { if (Y.requires) { var iI = Y.requires.map(function (io) { return l + "/layouts/" + io }); var il = Y.toString(); ScriptQueue.queue(iI, function () { if (Y.toString() == il) { g.apply(I, arguments); } }); } else { g(null, true); } } else { g(null, false); } 
        } else { e = Y && i == Y.toString(); }
        return e
    }; I.getLayouts = function () {
        var i = []; for (var e = 0, iI = u.length; e < iI; e++) { i[i.length] = [u[e].code, u[e].name] }
        return i.sort();
    }; I.setVisibleLayoutCodes = function () {
        var i = isArray(arguments[0]) ? arguments[0] : arguments, e = null, iI; for (var il in u.codes) { if (u.codes.hasOwnProperty(il)) { iI = il.toUpperCase(); if (i.indexOf(iI) > -1) { if (!e) e = {}; e[iI] = iI } } }
        u.codeFilter = e; u.options = null; Y = null; if (!I.switchLayout(U.langbox.value)) { I.switchLayout(U.langbox.value); } 
    }; I.getLayoutCodes = function () {
        var i = []; for (var e in u.codes) { if (!u.codes.hasOwnProperty(e)) continue; i.push(e); }
        return i.sort();
    }; var P = function (i, e) {
        var iI = "", il = false; i = i.replace(Q, ""); switch (i) {
            case v.CAPS: case v.SHIFT: case "shift_left": case "shift_right": case v.ALT: case "alt_left": case "alt_right": return true; case 'backspace': if (isFunction(Y.charProcessor) && DocumentSelection.getSelection(U.attachedInput).length) { iI = "\x08" } else if (e && e.currentTarget == U.attachedInput) { I.IME.hide(true); return true } else { DocumentSelection.deleteAtCursor(U.attachedInput, false); I.IME.hide(true); }
                break; case 'del': I.IME.hide(true); if (e) return true; DocumentSelection.deleteAtCursor(U.attachedInput, true); break; case 'space': iI = " "; break; case 'tab': iI = "\t"; break; case 'enter': iI = "\n"; break; default: iI = Y.keys[i][X]; break
        }
        if (iI) {
            if (!(iI = m(iI, DocumentSelection.getSelection(U.attachedInput)))) return il; var io = false; if (!iI[1] && iI[0].length <= 1 && iI[0].charCodeAt(0) <= 0x7fff && !U.attachedInput.contentDocument) { var iO = iI[0].charCodeAt(0); io = !F(iO, e); } else { io = true }
            if (io) { DocumentSelection.insertAtCursor(U.attachedInput, iI[0]); if (iI[1]) { DocumentSelection.setRange(U.attachedInput, -iI[1], 0, true); } } 
        }
        return il
    }; var a = function (i) {
        if (!I.isEnabled() || !I.isOpen()) return; var e = X; var iI = i.getKeyCode(); switch (i.type) {
            case 'keydown': switch (iI) {
                    case 9: break; case 37: if (I.IME.isOpen()) { I.IME.prevPage(i); i.preventDefault(); }
                        break; case 39: if (I.IME.isOpen()) { I.IME.nextPage(i); i.preventDefault(); }
                        break; case 38: if (I.IME.isOpen()) { if (!I.IME.showPaged()) I.IME.prevPage(i); i.preventDefault(); }
                        break; case 40: if (I.IME.isOpen()) { if (!I.IME.showAllPages()) I.IME.nextPage(i); i.preventDefault(); }
                        break; case 8: case 46: var il = U.desk.childNodes[V[iI]]; if (_ && !i.getRepeat()) DOM.CSS(il).addClass(y.buttonDown); if (!P(il.id, i)) i.preventDefault(); break; case 20: if (!i.getRepeat()) { e = e ^ s }
                        break; case 27: if (I.IME.isOpen()) { I.IME.hide(); } else { var io = DocumentSelection.getStart(U.attachedInput); DocumentSelection.setRange(U.attachedInput, io, io); }
                        return false; default: if (!i.getRepeat()) { e = e | i.shiftKey | i.ctrlKey << 2 | i.altKey << 1 }
                        if (V.hasOwnProperty(iI)) {
                            if (!(i.altKey ^ i.ctrlKey)) { var il = U.desk.childNodes[V[iI]]; if (_) DOM.CSS(il).addClass(y.buttonDown); p = il.id }
                            if (i.altKey && i.ctrlKey) { i.preventDefault(); if (i.srcElement) { P(U.desk.childNodes[V[iI]].id, i); p = "" } } 
                        } else { I.IME.hide(); }
                        break
                }
                break; case 'keyup': switch (iI) {
                    case 20: break; default: if (!i.getRepeat()) { e = X & (T ^ (!i.shiftKey | (!i.ctrlKey << 2) | (!i.altKey << 1))); }
                        if (_ && V.hasOwnProperty(iI)) { DOM.CSS(U.desk.childNodes[V[iI]]).removeClass(y.buttonDown); } 
                }
                break; case 'keypress': if (p && !i.VK_bypass) {
                    if (!P(p, i)) { i.stopPropagation(); i.preventDefault(); }
                    p = null
                }
                if (!X ^ q && (i.altKey || i.ctrlKey)) { I.IME.hide(); }
                if (0 == iI && !p && !i.VK_bypass && (!i.ctrlKey && !i.altKey && !i.shiftKey)) { i.preventDefault(); } 
        }
        if (e != X) { B(e); b(); } 
    }; var A = function (i) {
        var e = DOM.getParent(i.srcElement || i.target, 'a'); if (!e || e.parentNode.id.indexOf(Q) < 0) return; e = e.parentNode; switch (e.id.substring(Q.length)) { case "caps": case "shift_left": case "shift_right": case "alt_left": case "alt_right": case "ctrl_left": case "ctrl_right": return }
        if (DOM.CSS(e).hasClass(y.buttonDown) || !_) { P(e.id); }
        if (_) { DOM.CSS(e).removeClass(y.buttonDown) }
        var iI = X & (s | i.shiftKey | i.altKey << 1 | i.ctrlKey << 2); if (X != iI) { B(iI); b(); }
        i.preventDefault(); i.stopPropagation();
    }; var d = function (i) {
        var e = DOM.getParent(i.srcElement || i.target, 'a'); if (!e || e.parentNode.id.indexOf(Q) < 0) return; e = e.parentNode; var iI = X; var il = e.id.substring(Q.length); switch (il) {
            case "caps": iI = iI ^ s; break; case "input_method": if (document.getElementById("kb_langselector").value == 'US US') { $("#kb_binput_method a").css("background-position", "-453px -114px"); VirtualKeyboard.switchLayout("CN Chinese Simpl. Pinyin"); }
                else { VirtualKeyboard.switchLayout("US US"); }
                break; case "shift_left": case "shift_right": if (i.shiftKey) break; iI = iI ^ Z; break; case "alt_left": case "alt_right": case "ctrl_left": case "ctrl_right": iI = iI ^ (i.altKey << 1 ^ w) ^ (i.ctrlKey << 2 ^ W); break; default: if (_) DOM.CSS(e).addClass(y.buttonDown); break
        }
        if (X != iI) { B(iI); b(); }
        i.preventDefault(); i.stopPropagation();
    }; var D = function (i) {
        var e = DOM.getParent(i.srcElement || i.target, 'div'), iI = i.type == 'mouseover' ? 2 : 3; if (e && (id = e.id).indexOf(Q) > -1) { if (id.indexOf(v.SHIFT) > -1) { n(iI, v.SHIFT); } else if (id.indexOf(v.ALT) > -1 || id.indexOf(v.CTRL) > -1) { n(iI, v.CTRL); n(iI, v.ALT); } else if (id.indexOf(v.CAPS) > -1) { N(iI, e); } else if (_) { N(iI, e); if (3 == iI) { N(0, e); } } }
        i.preventDefault(); i.stopPropagation();
    }; var f = function (i) { DocumentCookie.set('vk_mapping', i.target.value); V = x[i.target.value] }; I.attachInput = function (i) {
        if (!i) return U.attachedInput; if (isString(i)) i = document.getElementById(i); if (i == U.attachedInput || !i) return U.attachedInput; if (!I.switchLayout(O.layout) && !I.switchLayout(U.langbox.value)) { throw new Error('No layouts available'); }
        I.detachInput(); if (!i || !i.tagName) { U.attachedInput = null } else {
            _ = !DOM.CSS(i).hasClass(y.noanim); U.attachedInput = i; H(); if (i.contentWindow) { i = i.contentWindow.document.body.parentNode }
            i.focus(); EM.addEventListener(i, 'keydown', a); EM.addEventListener(i, 'keyup', a); EM.addEventListener(i, 'keypress', a); EM.addEventListener(i, 'mousedown', I.IME.blurHandler); var e = document.body.parentNode; if (document.body.parentNode != DOM.getParent(i, 'html')) { EM.addEventListener(e, 'keydown', a); EM.addEventListener(e, 'keyup', a); EM.addEventListener(e, 'keypress', a); }
            h(true);
        }
        return U.attachedInput
    }; I.detachInput = function () {
        if (!U.attachedInput) return false; H(true); I.IME.hide(); if (U.attachedInput) {
            var i = U.attachedInput; if (i.contentWindow) { i = i.contentWindow.document.body.parentNode }
            EM.removeEventListener(i, 'keydown', a); EM.removeEventListener(i, 'keypress', a); EM.removeEventListener(i, 'keyup', a); EM.removeEventListener(i, 'mousedown', I.IME.blurHandler); var e = document.body.parentNode; EM.removeEventListener(e, 'keydown', a); EM.removeEventListener(e, 'keyup', a); EM.removeEventListener(e, 'keypress', a);
        }
        h(false); U.attachedInput = null; return true
    }; I.getAttachedInput = function () { return U.attachedInput }; I.open = I.show = function (i, e) {
        if (!(i = I.attachInput(i || U.attachedInput)) || !U.keyboard || !document.body) return false; if (!U.keyboard.parentNode || U.keyboard.parentNode.nodeType == 11) { if (isString(e)) e = document.getElementById(e); if (!e.appendChild) return false; e.appendChild(U.keyboard); }
        return true
    }; I.close = I.hide = function () { if (!U.keyboard || !I.isOpen()) return false; I.detachInput(); I.IME.hide(); U.keyboard.parentNode.removeChild(U.keyboard); return true }; I.toggle = function (i, e, iI) { I.isOpen() && U.attachedInput == I.attachInput(i) ? I.close() : I.show(i, e, iI); }; I.isOpen = function () { return (!!U.keyboard.parentNode) && U.keyboard.parentNode.nodeType == 1 }; I.isEnabled = function () { return c }; I.isReady = function () { return u.length > 0 }; var F = function (i, e) {
        if (isFunction(window.document.createEvent)) {
            var iI = DOM.getWindow(U.attachedInput); try {
                e = iI.document.createEvent("KeyEvents"); e.initKeyEvent('keypress', false, true, U.attachedInput.contentWindow, false, false, false, false, 0, i); if (false === e.isTrusted) { return false }
                e.VK_bypass = true; U.attachedInput.dispatchEvent(e);
            } catch (ex) { try { e = iI.document.createEvent("KeyboardEvents"); e.initKeyEvent('keypress', false, true, U.attachedInput.contentWindow, false, false, false, false, i, 0); e.VK_bypass = true; U.attachedInput.dispatchEvent(e); } catch (ex) { return false } } 
        } else { try { e.keyCode = 10 == i ? 13 : i; ret = true } catch (ex) { return false } }
        return true
    }; var g = function (e, iI) {
        if (!e) {
            if (iI) {
                delete Y.requires; if (!Y.keys) { L(Y); Y.html = M(Y.keys); }
                U.desk.innerHTML = Y.html; U.keyboard.className = Y.domain; I.IME.css = Y.domain; X = z; b(); if (isFunction(Y.activate)) { Y.activate(); }
                H(); DocumentCookie.set('vk_layout', Y.id); O.layout = Y.id; G(100);
            } else { var il = 6; var io = setInterval(function () { var iO = ['loaderror', '']; DOM.CSS(U.progressbar).removeClass(iO).addClass(iO[il % 2]); if (! --il) { clearInterval(io); g(null, true); } }, 200); } 
        } else if (iI) { if (Y.requires) { G(Math.round(100 / (Y.requires.length + 1))); Y.requires.pop(); } } 
    }; var G = function (i) { c = i > 99; U.progressbar.style.display = c ? "none" : "block"; U.desk.style.display = c ? "block" : "none"; U.progressbar.innerHTML = i + "%" }; var h = function (i) {
        if (i) { var e = DOM.StyleSheet(l + 'css/' + O.skin + '/keyboard.css'); e.add(); }
        var iI = DOM.getWindow(U.attachedInput); if (window != iI) { var e = DOM.StyleSheet(l + 'css/' + O.skin + '/keyboard.css', iI); if (i) { e.add(); } else { e.remove(); } } 
    }; var H = function (i) { if (U.attachedInput) { var X = i ? "" : (Y.rtl ? 'rtl' : 'ltr'); if (U.attachedInput.contentWindow) U.attachedInput.contentWindow.document.body.dir = X; else U.attachedInput.dir = X } }; var j = function () {
        if (null != u.options) return; var i = u.sort(), e, iI, il, io = {}; u.options = {}; U.langbox.innerHTML = ""; for (var iO = 0, iQ = i.length, i_ = 0; iO < iQ; iO++) {
            e = u[iO]; il = e.id; if (u.codeFilter && !u.codeFilter.hasOwnProperty(e.code)) continue; if (io.label != e.code) { io = document.createElement('optgroup'); io.label = e.code; U.langbox.appendChild(io); }
            iI = document.createElement('option'); iI.value = il; iI.appendChild(document.createTextNode(e.name)); iI.label = e.name; iI.selected = e == Y; io.appendChild(iI); u.options[il] = i_++
        } 
    }; var J = function (i) { if (isString(i)) return i.match(/\x01.+?\x01|\x03.|[\ud800-\udbff][\udc00-\udfff]|./g).map(function (e) { return e.replace(/[\x01\x02]/g, "") }); else return i.map(function (e) { return isArray(e) ? e.map(function (i) { return String.fromCharCodeExt(i) }).join("") : String.fromCharCodeExt(e).replace(/[\x01\x02]/g, "") }); }; var L = function (i) {
        var e = i.normal, iI = i.shift || {}, il = i.alt || {}, io = i.shift_alt || {}, iO = i.caps || {}, iQ = i.shift_caps || {}, i_ = i.dk, ic = i.cbk, iC, ie, iv, iV, ix = null, iX, iz, iZ, iw, iW = -1, is = []; for (var iS = 0, ik = e.length; iS < ik; iS++) {
            var iK = e[iS], iq = null, iE = null, ir = null, iR = [iK]; if (iI.hasOwnProperty(iS)) { iC = J(iI[iS]); iX = iS }
            if (iX > -1 && iC[iS - iX]) { ir = iC[iS - iX]; iR[Z] = ir } else if (iK && iK != (iK = iK.toUpperCase())) { iR[Z] = iK; ir = iK }
            if (il.hasOwnProperty(iS)) { ie = J(il[iS]); iz = iS }
            if (iz > -1 && ie[iS - iz]) { iq = ie[iS - iz]; iR[q] = iq }
            if (io.hasOwnProperty(iS)) { iv = J(io[iS]); iZ = iS }
            if (iZ > -1 && iv[iS - iZ]) { iR[R] = iv[iS - iZ] } else if (iq && iq != (iq = iq.toUpperCase())) { iR[R] = iq }
            if (iO.hasOwnProperty(iS)) { iV = J(iO[iS]); iw = iS }
            if (iw > -1 && iV[iS - iw]) { iE = iV[iS - iw] }
            if (iE) { iR[s] = iE } else if (ir && ir.toUpperCase() != ir.toLowerCase()) { iR[s] = ir } else if (iK) { iR[s] = iK.toUpperCase(); }
            if (iQ.hasOwnProperty(iS)) { ix = J(iQ[iS]); iW = iS }
            if (iW > -1 && ix[iS - iW]) { iR[t] = ix[iS - iW] } else if (iE) { iR[t] = iE.toLowerCase(); } else if (ir) { iR[t] = ir.toLowerCase(); } else if (iK) { iR[t] = iK }
            is[iS] = iR
        }
        if (i_) {
            i.dk = {}; for (var iS in i_) {
                if (i_.hasOwnProperty(iS)) {
                    var it = iS; if (parseInt(iS) && iS > 9) { it = String.fromCharCode(iS); }
                    i.dk[it] = J(i_[iS]).join("").replace(it, it + it);
                } 
            } 
        }
        i.rtl = !!is.join("").match(/[\u05b0-\u06ff]/); if (isFunction(ic)) { i.charProcessor = ic } else if (ic) { i.activate = ic.activate; i.charProcessor = ic.charProcessor }
        i.keys = is; delete i.normal; delete i.shift; delete i.alt; delete i.shift_alt; delete i.caps; delete i.shift_caps; delete i.cbk; return is
    }; var b = function () { var i = []; i[z] = y.modeNormal; i[Z] = y.modeShift; i[q] = y.modeAlt; i[R] = y.modeShiftAlt; i[s] = y.modeCaps; i[t] = y.modeShiftCaps; i[w] = y.modeNormal; i[W] = y.modeNormal; i[r] = y.modeShift; i[k] = y.modeShift; i[K] = y.modeCaps; i[S] = y.modeCaps; i[E] = y.modeShiftAltCaps; i[T] = y.modeShiftAltCaps; DOM.CSS(U.desk).removeClass(i).addClass(i[X]); }; var B = function (i) {
        var e = X ^ i; if (e & Z) { n(!!(i & Z), v.SHIFT); }
        if (e & w) { n(!!(i & w), v.ALT); }
        if (e & W) { n(!!(i & W), v.CTRL); }
        if (e & s) { N(!!(i & s), null, v.CAPS); }
        X = i
    }; var n = function (i, e) {
        var iI = document.getElementById(Q + e + '_left'), il = document.getElementById(Q + e + '_right'); switch (0 + i) {
            case 0: iI.className = DOM.CSS(il).removeClass(y.buttonDown).getClass(); break; case 1: DOM.CSS(U.desk).removeClass([y.hoverShift, y.hoverAlt]); iI.className = DOM.CSS(il).addClass(y.buttonDown).getClass(); break; case 2: if (v.SHIFT == e && X & Z ^ Z) { DOM.CSS(U.desk).addClass(y.hoverShift); } else if (v.ALT == e && X ^ q) { DOM.CSS(U.desk).addClass(y.hoverAlt); }
                iI.className = DOM.CSS(il).addClass(y.buttonHover).getClass(); break; case 3: if (v.SHIFT == e) { DOM.CSS(U.desk).removeClass(y.hoverShift); } else if (v.ALT == e) { DOM.CSS(U.desk).removeClass(y.hoverAlt); }
                iI.className = DOM.CSS(il).removeClass(y.buttonHover).getClass(); break
        } 
    }; var N = function (i, e, iI) { var il = e || document.getElementById(Q + iI); if (il) { switch (0 + i) { case 0: DOM.CSS(il).removeClass(y.buttonDown); break; case 1: DOM.CSS(il).addClass(y.buttonDown); break; case 2: DOM.CSS(il).addClass(y.buttonHover); break; case 3: DOM.CSS(il).removeClass(y.buttonHover); break } } }; var m = function (i, e) {
        var iI = [i, 0]; if (isFunction(Y.charProcessor)) { var il = { shift: X & Z, alt: X & w, ctrl: X & W, caps: X & s }; iI = Y.charProcessor(i, e, il); } else if (i == "\x08") { iI = ['', 0] } else if (Y.dk && e.length <= 1) { var io = o.test(i); i = i.replace(o, ""); if (e && Y.dk.hasOwnProperty(e)) { iI[1] = 0; var iO = Y.dk[e], iQ = iO.indexOf(i) + 1; iI[0] = iQ ? iO.charAt(iQ) : i } else if (io && Y.dk.hasOwnProperty(i)) { iI[1] = 1; iI[0] = i } }
        return iI
    }; var M = function (i) {
        var e = document.createElement('span'); document.body.appendChild(e); e.style.position = 'absolute'; e.style.left = '-1000px'; for (var iI = 0, il = i.length, io = [], iO, iQ; iI < il; iI++) { iO = i[iI]; io.push(["<div id='", Q, iI, "' class='", y.buttonUp, "'><a href='#'>", ii(Y, iO, z, y.charNormal, e), ii(Y, iO, Z, y.charShift, e), ii(Y, iO, q, y.charAlt, e), ii(Y, iO, R, y.charShiftAlt, e), ii(Y, iO, s, y.charCaps, e), ii(Y, iO, t, y.charShiftCaps, e), "</a></div>"].join("")); }
        for (var iI in C) { if (C.hasOwnProperty(iI)) { iO = C[iI]; iQ = iO.replace(/_.+/, ''); io.splice(iI, 0, ["<div id='", Q, iO, "' class='", y.buttonUp, "'><a title='", iQ, "'", "><span class='title'>", iQ, "</span>", "</a></div>"].join("")); } }
        document.body.removeChild(e); return io.join("").replace(/(<\w+)/g, "$1 unselectable='on' ");
    }; var ii = function (i, e, X, iI, il) {
        var io = [], iO = e[X] || "", iQ = o.test(iO) && i.dk && i.dk.hasOwnProperty(iO = iO.replace(o, "")); if (iQ) iI += " " + y.deadkey; if ((X == t && e[s] && iO.toLowerCase() == e[s].toLowerCase()) || (X == s && e[t] && iO.toLowerCase() == e[t].toLowerCase())) { iI += " " + y.hiddenCaps }
        if ((X == Z && e[z] && iO.toLowerCase() == e[z].toLowerCase()) || (X == z && e[Z] && iO.toLowerCase() == e[Z].toLowerCase())) { iI += " " + y.hiddenShift }
        if ((X == Z && e[t] && iO.toLowerCase() == e[t].toLowerCase()) || (X == t && e[Z] && iO.toLowerCase() == e[Z].toLowerCase())) { iI += " " + y.hiddenShiftCaps }
        if ((X == s && e[z] && iO.toLowerCase() == e[z].toLowerCase()) || (X == z && e[s] && iO.toLowerCase() == e[s].toLowerCase())) { iI += " " + y.hiddenCaps }
        if ((X == R && e[q] && iO.toLowerCase() == e[q].toLowerCase()) || (X == q && e[Z] && iO.toLowerCase() == e[Z].toLowerCase())) { iI += " " + y.hiddenAlt }
        io.push("<span"); if (iI) { io.push(" class=\"" + iI + "\""); }
        io.push(" >\xa0" + iO + "\xa0</span>"); return io.join("");
    }; (function () {
        U.keyboard = document.createElement('div'); U.keyboard.unselectable = "on"; U.keyboard.style.visibility = "hidden"; U.keyboard.id = 'virtualKeyboard'; U.keyboard.innerHTML = ("<div id=\"kbDesk\"><!-- --></div>" + "<div class=\"progressbar\"><!-- --></div>" + "<select id=\"kb_langselector\"></select>" + "<select id=\"kb_mappingselector\"></select>" + '<div id="copyrights" nofocus="true"><a href="#" target="_self" title="点击进行中英文切换">中英文切换 </a></div>').replace(/(<\w+)/g, "$1 unselectable='on' "); U.desk = U.keyboard.firstChild; U.progressbar = U.keyboard.childNodes.item(1); var i = U.keyboard.childNodes.item(2); EM.addEventListener(i, 'change', function (e) { I.switchLayout(this.value) }); U.langbox = i; var i = i.nextSibling, iI = ""; V = DocumentCookie.get('vk_mapping'); if (!x.hasOwnProperty(V)) V = 'QWERTY Default'; for (var il in x) {
            var io = x[il].split("").map(function (e) { return e.charCodeAt(0) }); io.splice(14, 0, 8, 9); io.splice(28, 0, 13, 20); io.splice(41, 0, 16); io.splice(52, 0, 16, 46, 17, 18, 32, 18, 17); var iO = io; io = []; for (var iQ = 0, i_ = iO.length; iQ < i_; iQ++) { io[iO[iQ]] = iQ }
            x[il] = io; iO = il.split(" ", 2); if (iI.indexOf(iI = iO[0]) != 0) { i.appendChild(document.createElement('optgroup')); i.lastChild.label = iI }
            io = document.createElement('option'); i.lastChild.appendChild(io); io.value = il; io.innerHTML = iO[1]; io.selected = (il == V);
        }
        V = x[V]; EM.addEventListener(i, 'change', f); EM.addEventListener(U.desk, 'mousedown', d); EM.addEventListener(U.desk, 'mouseup', A); EM.addEventListener(U.desk, 'mouseover', D); EM.addEventListener(U.desk, 'mouseout', D); EM.addEventListener(U.desk, 'click', EM.preventDefaultAction); var ic; var iC; var ie; try { ic = window.opener.location.search } catch (e) { }; try { iC = window.dialogArguments.location.search } catch (e) { }; try { ie = window.top.location.search } catch (e) { }; var iv = getScriptQuery('vk_loader.js'), iV = parseQuery((ic || iC || ie || window.location.search).slice(1)); O.layout = iV.vk_layout || iv.vk_layout || DocumentCookie.get('vk_layout') || O.layout; O.skin = iV.vk_skin || iv.vk_skin || O.skin; h(true);
    })();
}; VirtualKeyboard.Langs = {}; VirtualKeyboard.IME = new function () {
    var i = this; var I = "<div id=\"VirtualKeyboardIME\"><table><tr><td class=\"IMEControl\"><div class=\"left\"><!-- --></div></td>" + "<td class=\"IMEControl IMEContent\"></td>" + "<td class=\"IMEControl\"><div class=\"right\"><!-- --></div></td></tr>" + "<tr><td class=\"IMEControl IMEInfo\" colspan=\"3\"><div class=\"showAll\"><div class=\"IMEPageCounter\"></div><div class=\"arrow\"></div></div></td></tr></div>"; var l = null; var o = ""; var O = 0; var Q = false; var _ = []; var c = null; var C = null; i.show = function (x) {
        c = VirtualKeyboard.getAttachedInput(); var X = DOM.getWindow(c); if (C != X) {
            if (l && l.parentNode) { l.parentNode.removeChild(l); }
            C = X; V(); C.document.body.appendChild(l);
        }
        l.className = i.css; if (x) i.setSuggestions(x); if (c && l && _.length > 0) { EM.addEventListener(c, 'blur', i.blurHandler); l.style.display = "block"; i.updatePosition(c); } else if ('none' != l.style.display) { i.hide(); } 
    }; i.hide = function (x) { if (l && 'none' != l.style.display) { l.style.display = "none"; EM.removeEventListener(c, 'blur', i.blurHandler); if (c && DocumentSelection.getSelection(c) && !x) DocumentSelection.deleteSelection(c); c = null; _ = [] } }; i.updatePosition = function () { var x = DOM.getOffset(c); l.style.left = x.x + 'px'; var X = DocumentSelection.getSelectionOffset(c); l.style.top = x.y + X.y + X.h - c.scrollTop + 'px' }; i.setSuggestions = function (x) { if (!isArray(x)) return false; _ = x; O = 0; e(); i.updatePosition(c); }; i.getSuggestions = function (x) { return isNumber(x) ? _[x] : _ }; i.nextPage = function (x) { O = Math.max(Math.min(O + 1, (Math.ceil(_.length / 10)) - 1), 0); e(); }; i.prevPage = function (x) { O = Math.max(O - 1, 0); e(); }; i.getPage = function () { return O }; i.getChar = function (x) { x = --x < 0 ? 9 : x; return _[i.getPage() * 10 + x] }; i.isOpen = function () { return l && 'block' == l.style.display }; i.blurHandler = function (x) { i.hide(); }; i.toggleShowAll = function (x) {
        var X = l.firstChild.rows[1].cells[0].lastChild; if (Q = !Q) { X.className = 'showPage' } else { X.className = 'showAll' }
        e();
    }; i.showAllPages = function () {
        if (!Q) { i.toggleShowAll(); return true }
        return false
    }; i.showPaged = function () {
        if (Q) { i.toggleShowAll(); return true }
        return false
    }; var e = function () {
        var x = ['<table>']; for (var X = 0, z = Math.ceil(_.length / 10); X < z; X++) {
            if (Q || X == O) {
                x.push('<tr>'); for (var Z = 0, w = X * 10; Z < 10 && !isUndefined(_[w + Z]); Z++) {
                    x.push("<td><a href=''>"); if (X == O) { x.push("<b>&nbsp;" + ((Z + 1) % 10) + ": </b>"); } else { x.push("<b></b>"); }
                    x.push(_[w + Z] + "</a></td>");
                }
                x.push('</tr>');
            } 
        }
        x.push('</table>'); l.firstChild.rows[0].cells[1].innerHTML = x.join(""); l.firstChild.rows[1].cells[0].firstChild.firstChild.innerHTML = (O + 1) + "/" + (0 + Q || Math.ceil(_.length / 10)); var W = l.getElementsByTagName("*"); for (var Z = 0, s = W.length; Z < s; Z++) { W[Z].unselectable = "on" } 
    }; var v = function (x) {
        var X = DOM.getParent(x.target, 'a'); if (X) { DocumentSelection.insertAtCursor(c, X.lastChild.nodeValue); i.hide(); }
        x.preventDefault(); x.stopPropagation()
    }; var V = function () {
        var x = C.document.createElement('div'); x.innerHTML = I; l = x.firstChild; l.style.display = 'none'; var X = l.firstChild.rows[0].cells[0], z = l.firstChild.rows[0].cells[2], Z = l.firstChild.rows[1].cells[0].lastChild; EM.addEventListener(X, 'mousedown', i.prevPage); EM.addEventListener(X, 'mousedown', EM.preventDefaultAction); EM.addEventListener(X, 'mousedown', EM.stopPropagationAction); EM.addEventListener(z, 'mousedown', i.nextPage); EM.addEventListener(z, 'mousedown', EM.preventDefaultAction); EM.addEventListener(z, 'mousedown', EM.stopPropagationAction); EM.addEventListener(Z, 'mousedown', i.toggleShowAll); EM.addEventListener(Z, 'mousedown', EM.preventDefaultAction); EM.addEventListener(Z, 'mousedown', EM.stopPropagationAction); l.unselectable = "on"; var w = l.getElementsByTagName("*"); for (var W = 0, s = w.length; W < s; W++) { w[W].unselectable = "on" }
        EM.addEventListener(l, 'mousedown', v); EM.addEventListener(l, 'mouseup', EM.preventDefaultAction); EM.addEventListener(l, 'click', EM.preventDefaultAction);
    } 
}; VirtualKeyboard.Layout = function () { };