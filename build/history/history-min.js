YUI.add("history",function(D){var K=D.Lang,W=D.UA,Z=D.Event.Target,T=D.config,B=T.win.history,d=T.win.location,R=T.doc.documentMode,F=encodeURIComponent,U=decodeURIComponent,N,O,a="Missing or invalid argument",Q=/([^=&]+)=([^&]*)/g,E=false,S,P="history:ready",X="history:globalStateChange",J="history:moduleStateChange";if(!YUI.Env.history){YUI.Env.history=O={ready:false,_modules:[],_stateField:null,_historyIFrame:null};}if(W.gecko){S=function(){var A=/#(.*)$/.exec(d.href);return A&&A[1]?A[1]:"";};}else{S=function(){return d.hash.substr(1);};}function b(){var C=[],A=[];D.Object.each(O._modules,function(G,H){C.push(H+"="+G.initialState);A.push(H+"="+G.currentState);});O._stateField.set("value",C.join("&")+"|"+A.join("&"));}function V(H){var A,G=[],C=false;if(H){Q.lastIndex=0;while((A=Q.exec(H))){G[A[1]]=A[2];}D.Object.each(O._modules,function(L,e){var Y=G[e];if(!Y||L.currentState!==Y){L.currentState=Y||L.initialState;L.fire(J,U(L.currentState));C=true;}});}else{D.Object.each(O._modules,function(L,Y){if(L.currentState!==L.initialState){L.currentState=L.initialState;L.fire(J,U(L.currentState));C=true;}});}if(C){N.fire(X);}}function M(H){var A,G;A="<html><body>"+H+"</body></html>";try{G=O._historyIFrame.get("contentWindow.document");G.invoke("open");G.invoke("write",A,"","","","");G.invoke("close");return true;}catch(C){return false;}}function I(){var A,G,C;if(!O._historyIFrame.get("contentWindow.document")){setTimeout(I,10);return;}A=O._historyIFrame.get("contentWindow.document.body");G=A?A.get("innerText"):null;C=S();setInterval(function(){var Y,H,L;A=O._historyIFrame.get("contentWindow.document.body");Y=A?A.get("innerText"):null;L=S();if(Y!==G){G=Y;V(G);if(!G){H=[];D.Object.each(O._modules,function(e,f){H.push(f+"="+e.initialState);});L=H.join("&");}else{L=G;}d.hash=C=L;b();}else{if(L!==C){C=L;M(L);}}},50);O.ready=true;N.fire(P);}function c(){var C,e,L,G,A,H,Y;e=O._stateField.get("value").split("|");if(e.length>1){Q.lastIndex=0;while((C=Q.exec(e[0]))){L=C[1];A=C[2];G=O._modules[L];if(G){G.initialState=A;}}Q.lastIndex=0;while((C=Q.exec(e[1]))){L=C[1];H=C[2];G=O._modules[L];if(G){G.currentState=H;}}}if(!K.isUndefined(T.win.onhashchange)){D.on("hashchange",function(){var f=S();V(f);b();},window);O.ready=true;N.fire(P);}else{if(E){I();}else{Y=S();setInterval(function(){var f=S();if(f!==Y){Y=f;V(Y);b();}},50);O.ready=true;N.fire(P);}}}N={register:function(G,A){var C;if(!K.isString(G)||K.trim(G)===""||!K.isString(A)){throw new Error(a);}if(O._modules[G]){return;}if(O.ready){return null;}G=F(G);A=F(A);C=new N.Module(G,A);O._modules[G]=C;return C;},initialize:function(A,H){var C,G;if(O.ready){return true;}A=D.get(A);if(!A){throw new Error(a);}C=A.get("tagName").toUpperCase();G=A.get("type");if(C!=="TEXTAREA"&&(C!=="INPUT"||G!=="hidden"&&G!=="text")){throw new Error(a);}if(W.ie&&(K.isUndefined(R)||R<8)){E=true;H=D.get(H);if(!H||H.get("tagName").toUpperCase()!=="IFRAME"){throw new Error(a);}}if(W.opera&&!K.isUndefined(B.navigationMode)){B.navigationMode="compatible";}O._stateField=A;O._historyIFrame=H;D.on("domready",c);return true;},navigate:function(C,G){var A;if(!K.isString(C)||!K.isString(G)){throw new Error(a);}A={};A[C]=G;return N.multiNavigate(A);},multiNavigate:function(C){var G=[],H,A=false;if(!O.ready){return false;}D.Object.each(O._modules,function(Y,e){var f,L=U(e);if(!C.hasOwnProperty(L)){f=Y.currentState;}else{f=F(C[L]);if(f!==Y.upcomingState){Y.upcomingState=f;A=true;}}G.push(e+"="+f);});if(!A){return false;}H=G.join("&");if(E){return M(H);}else{d.hash=H;return true;}},getCurrentState:function(C){var A;if(!K.isString(C)){throw new Error(a);}if(!O.ready){return null;}A=O._modules[C];if(!A){return null;}return U(A.currentState);},getBookmarkedState:function(H){var A,C,G;if(!K.isString(H)){throw new Error(a);}G=d.href;C=G.indexOf("#");if(C>=0){G=G.substr(C+1);Q.lastIndex=0;while((A=Q.exec(G))){if(A[1]===H){return U(A[2]);}}}return null;},getQueryStringParameter:function(L,C){var A,H,G;C=C||d.href;G=C.indexOf("?");H=G>=0?C.substr(G+1):C;G=H.lastIndexOf("#");H=G>=0?H.substr(0,G):H;Q.lastIndex=0;while((A=Q.exec(H))){if(A[1]===L){return U(A[2]);}}return null;}};D.mix(N,Z.prototype);Z.call(N);N.Module=function(C,A){Z.call(this);this.id=C;this.initialState=A;this.currentState=A;this.upcomingState=A;};D.mix(N.Module,Z,false,null,1);D.History=N;},"@VERSION@",{skinnable:false,use:["event","node"]});