!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/js/",n(n.s=1)}([function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=(s=i,o=btoa(unescape(encodeURIComponent(JSON.stringify(s)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),"/*# ".concat(l," */")),a=i.sources.map((function(e){return"/*# sourceURL=".concat(i.sourceRoot||"").concat(e," */")}));return[n].concat(a).concat([r]).join("\n")}var s,o,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,i){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(i)for(var a=0;a<this.length;a++){var s=this[a][0];null!=s&&(r[s]=!0)}for(var o=0;o<e.length;o++){var l=[].concat(e[o]);i&&r[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},function(e,t,n){"use strict";n.r(t);n(2),n(3),n(4);window.OCA.Trashbin=OCA.Trashbin},function(e,n){OCA.Trashbin={},OCA.Trashbin.App={_initialized:!1,client:null,initialize:function(e){if(!this._initialized){this._initialized=!0,this.client=new OC.Files.Client({host:OC.getHost(),port:OC.getPort(),root:OC.linkToRemoteBase("dav")+"/trashbin/"+OC.getCurrentUser().uid,useHTTPS:"https"===OC.getProtocol()});var n=OC.Util.History.parseUrlQuery();this.fileList=new OCA.Trashbin.FileList($("#app-content-trashbin"),{fileActions:this._createFileActions(),detailsViewEnabled:!1,scrollTo:n.scrollto,config:OCA.Files.App.getFilesConfig(),multiSelectMenu:[{name:"restore",displayName:t("files_trashbin","Restore"),iconClass:"icon-history"},{name:"delete",displayName:t("files_trashbin","Delete permanently"),iconClass:"icon-delete"}],client:this.client,shown:!0})}},_createFileActions:function(){var e=this.client,n=new OCA.Files.FileActions;return n.register("dir","Open",OC.PERMISSION_READ,"",(function(e,t){var n=t.fileList.getCurrentDirectory();t.fileList.changeDirectory(OC.joinPaths(n,e))})),n.setDefault("dir","Open"),n.registerAction({name:"Restore",displayName:t("files_trashbin","Restore"),type:OCA.Files.FileActions.TYPE_INLINE,mime:"all",permissions:OC.PERMISSION_READ,iconClass:"icon-history",actionHandler:function(n,i){var r=i.fileList,a=r.findFileEl(n);r.showFileBusyState(a,!0);var s=i.fileList.getCurrentDirectory();e.move(OC.joinPaths("trash",s,n),OC.joinPaths("restore",n),!0).then(r._removeCallback.bind(r,[n]),(function(){r.showFileBusyState(a,!1),OC.Notification.show(t("files_trashbin","Error while restoring file from trashbin"))}))}}),n.registerAction({name:"Delete",displayName:t("files_trashbin","Delete permanently"),mime:"all",permissions:OC.PERMISSION_READ,iconClass:"icon-delete",render:function(e,i,r){var a=n._makeActionLink(e,r);return a.attr("original-title",t("files_trashbin","Delete permanently")),a.children("img").attr("alt",t("files_trashbin","Delete permanently")),r.$file.find("td:last").append(a),a},actionHandler:function(n,i){var r=i.fileList;$(".tipsy").remove();var a=r.findFileEl(n);r.showFileBusyState(a,!0);var s=i.fileList.getCurrentDirectory();e.remove(OC.joinPaths("trash",s,n)).then(r._removeCallback.bind(r,[n]),(function(){r.showFileBusyState(a,!1),OC.Notification.show(t("files_trashbin","Error while removing file from trashbin"))}))}}),n}},window.addEventListener("DOMContentLoaded",(function(){$("#app-content-trashbin").one("show",(function(){OCA.Trashbin.App.initialize($("#app-content-trashbin"))}))}))},function(e,n){!function(){var e=new RegExp(/^(.+)\.d[0-9]+$/),n="{http://nextcloud.org/ns}trashbin-filename",i="{http://nextcloud.org/ns}trashbin-deletion-time",r="{http://nextcloud.org/ns}trashbin-original-location",a="{http://nextcloud.org/ns}trashbin-title";function s(t){t=OC.basename(t);var n=e.exec(t);return n&&n.length>1&&(t=n[1]),t}var o=function(e,t){this.client=t.client,this.initialize(e,t)};o.prototype=_.extend({},OCA.Files.FileList.prototype,{id:"trashbin",appName:t("files_trashbin","Deleted files"),client:null,initialize:function(){this.client.addFileInfoParser((function(e,t){var s=e.propStat[0].properties,o=s[r],l=s[a];return{displayName:s[n],mtime:1e3*parseInt(s[i],10),hasPreview:!0,path:o,extraData:l}}));var e=OCA.Files.FileList.prototype.initialize.apply(this,arguments);return this.$el.find(".undelete").click("click",_.bind(this._onClickRestoreSelected,this)),this.setSort("mtime","desc"),this.breadcrumb._makeCrumbs=function(){for(var e=OCA.Files.BreadCrumb.prototype._makeCrumbs.apply(this,[].concat(Array.prototype.slice.call(arguments),["icon-delete no-hover"])),t=1;t<e.length;t++)e[t].name=s(e[t].name);return e},OC.Plugins.attach("OCA.Trashbin.FileList",this),e},getDirectoryPermissions:function(){return OC.PERMISSION_READ|OC.PERMISSION_DELETE},_setCurrentDir:function(e){OCA.Files.FileList.prototype._setCurrentDir.apply(this,arguments);var t=OC.basename(e);""!==t&&this.setPageTitle(s(t))},_createRow:function(){var e=OCA.Files.FileList.prototype._createRow.apply(this,arguments);return e.find("td.filesize").remove(),e},getAjaxUrl:function(e,t){var n="";return t&&(n="?"+OC.buildQueryString(t)),OC.filePath("files_trashbin","ajax",e+".php")+n},setupUploadEvents:function(){},linkTo:function(e){return OC.linkTo("files","index.php")+"?view=trashbin&dir="+encodeURIComponent(e).replace(/%2F/g,"/")},elementToFile:function(e){var t=OCA.Files.FileList.prototype.elementToFile(e);return"/"===this.getCurrentDirectory()&&(t.displayName=s(t.name)),delete t.size,t},updateEmptyContent:function(){var e=this.$fileList.find("tr:first").exists();this.$el.find("#emptycontent").toggleClass("hidden",e),this.$el.find("#filestable th").toggleClass("hidden",!e)},_removeCallback:function(e){for(var t,n=0;n<e.length;n++)t=this.remove(OC.basename(e[n]),{updateSummary:!1}),this.fileSummary.remove({type:t.attr("data-type"),size:t.attr("data-size")});this.fileSummary.update(),this.updateEmptyContent()},_onClickRestoreSelected:function(e){e.preventDefault();for(var n=this,i=_.pluck(this.getSelectedFiles(),"name"),r=0;r<i.length;r++){var a=this.findFileEl(i[r]);this.showFileBusyState(a,!0)}this.fileMultiSelectMenu.toggleLoading("restore",!0);var s=i.map((function(e){return n.client.move(OC.joinPaths("trash",n.getCurrentDirectory(),e),OC.joinPaths("restore",e),!0).then((function(){n._removeCallback([e])}))}));return Promise.all(s).then((function(){n.fileMultiSelectMenu.toggleLoading("restore",!1)}),(function(){OC.Notification.show(t("files_trashbin","Error while restoring files from trashbin"))}))},_onClickDeleteSelected:function(e){e.preventDefault();for(var n=this,i=this.$el.find(".select-all").is(":checked"),r=_.pluck(this.getSelectedFiles(),"name"),a=0;a<r.length;a++){var s=this.findFileEl(r[a]);this.showFileBusyState(s,!0)}if(i)return this.client.remove(OC.joinPaths("trash",this.getCurrentDirectory())).then((function(){n.hideMask(),n.setFiles([])}),(function(){OC.Notification.show(t("files_trashbin","Error while emptying trashbin"))}));this.fileMultiSelectMenu.toggleLoading("delete",!0);var o=r.map((function(e){return n.client.remove(OC.joinPaths("trash",n.getCurrentDirectory(),e)).then((function(){n._removeCallback([e])}))}));return Promise.all(o).then((function(){n.fileMultiSelectMenu.toggleLoading("delete",!1)}),(function(){OC.Notification.show(t("files_trashbin","Error while removing files from trashbin"))}))},_onClickFile:function(e){var t=$(this).parent().parent().data("mime");return"httpd/unix-directory"!==t&&e.preventDefault(),OCA.Files.FileList.prototype._onClickFile.apply(this,arguments)},generatePreviewUrl:function(e){return OC.generateUrl("/apps/files_trashbin/preview?")+$.param(e)},getDownloadUrl:function(){return"#"},getDefaultActionUrl:function(){return"#"},updateStorageStatistics:function(){},isSelectedDeletable:function(){return!0},_getWebdavProperties:function(){return[n,i,r,a].concat(this.filesClient.getPropfindProperties())},reload:function(){this._selectedFiles={},this._selectionSummary.clear(),this.$el.find(".select-all").prop("checked",!1),this.showMask(),this._reloadCall&&this._reloadCall.abort(),this._reloadCall=this.client.getFolderContents("trash/"+this.getCurrentDirectory(),{includeParent:!1,properties:this._getWebdavProperties()});var e=this.reloadCallback.bind(this);return this._reloadCall.then(e,e)},reloadCallback:function(e,n){return delete this._reloadCall,this.hideMask(),401!==e&&(403===e?(this.changeDirectory("/"),OC.Notification.show(t("files","This operation is forbidden")),!1):500===e?(this.changeDirectory("/"),OC.Notification.show(t("files","This directory is unavailable, please check the logs or contact the administrator")),!1):404===e?(this.changeDirectory("/"),!1):(0===e||this.setFiles(n),!0))}}),OCA.Trashbin.FileList=o}()},function(e,t,n){var i=n(5);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);(0,n(6).default)("e1044e6c",i,!0,{})},function(e,t,n){"use strict";n.r(t);var i=n(0),r=n.n(i)()(!0);r.push([e.i,'#app-content-trashbin tbody tr[data-type="file"] td a.name,#app-content-trashbin tbody tr[data-type="file"] td a.name span.nametext,#app-content-trashbin tbody tr[data-type="file"] td a.name span.nametext span{cursor:default}#app-content-trashbin .summary :last-child{padding:0}#app-content-trashbin #filestable .summary .filesize{display:none}\n',"",{"version":3,"sources":["/tmp/npmbuildbot-aeaGOj/apps/files_trashbin/src/trash.scss"],"names":[],"mappings":"AASA,kNAGC,cAAe,CACf,2CAGA,SAAU,CACV,qDAEA,YAAa","file":"trash.scss","sourcesContent":['/*\n * Copyright (c) 2014\n *\n * This file is licensed under the Affero General Public License version 3\n * or later.\n *\n * See the COPYING-README file.\n *\n */\n#app-content-trashbin tbody tr[data-type="file"] td a.name,\n#app-content-trashbin tbody tr[data-type="file"] td a.name span.nametext,\n#app-content-trashbin tbody tr[data-type="file"] td a.name span.nametext span {\n\tcursor: default;\n}\n\n#app-content-trashbin .summary :last-child {\n\tpadding: 0;\n}\n#app-content-trashbin #filestable .summary .filesize {\n\tdisplay: none;\n}\n\n']}]),t.default=r},function(e,t,n){"use strict";function i(e,t){for(var n=[],i={},r=0;r<t.length;r++){var a=t[r],s=a[0],o={id:e+":"+r,css:a[1],media:a[2],sourceMap:a[3]};i[s]?i[s].parts.push(o):n.push(i[s]={id:s,parts:[o]})}return n}n.r(t),n.d(t,"default",(function(){return d}));var r="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!r)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var a={},s=r&&(document.head||document.getElementsByTagName("head")[0]),o=null,l=0,c=!1,u=function(){},f=null,h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function d(e,t,n,r){c=n,f=r||{};var s=i(e,t);return p(s),function(t){for(var n=[],r=0;r<s.length;r++){var o=s[r];(l=a[o.id]).refs--,n.push(l)}t?p(s=i(e,t)):s=[];for(r=0;r<n.length;r++){var l;if(0===(l=n[r]).refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete a[l.id]}}}}function p(e){for(var t=0;t<e.length;t++){var n=e[t],i=a[n.id];if(i){i.refs++;for(var r=0;r<i.parts.length;r++)i.parts[r](n.parts[r]);for(;r<n.parts.length;r++)i.parts.push(C(n.parts[r]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var s=[];for(r=0;r<n.parts.length;r++)s.push(C(n.parts[r]));a[n.id]={id:n.id,refs:1,parts:s}}}}function m(){var e=document.createElement("style");return e.type="text/css",s.appendChild(e),e}function C(e){var t,n,i=document.querySelector('style[data-vue-ssr-id~="'+e.id+'"]');if(i){if(c)return u;i.parentNode.removeChild(i)}if(h){var r=l++;i=o||(o=m()),t=v.bind(null,i,r,!1),n=v.bind(null,i,r,!0)}else i=m(),t=y.bind(null,i),n=function(){i.parentNode.removeChild(i)};return t(e),function(i){if(i){if(i.css===e.css&&i.media===e.media&&i.sourceMap===e.sourceMap)return;t(e=i)}else n()}}var b,g=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join("\n")});function v(e,t,n,i){var r=n?"":i.css;if(e.styleSheet)e.styleSheet.cssText=g(t,r);else{var a=document.createTextNode(r),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(a,s[t]):e.appendChild(a)}}function y(e,t){var n=t.css,i=t.media,r=t.sourceMap;if(i&&e.setAttribute("media",i),f.ssrId&&e.setAttribute("data-vue-ssr-id",t.id),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}]);
//# sourceMappingURL=files_trashbin.js.map