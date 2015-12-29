var PeerIo;!function(t){var e=function(){function e(){}return e.prototype.state=function(){return t.PeerJsStateEnum.initial},e.prototype.network=function(e,n){n&&e.setStateObject(new t.OnlineState)},e.prototype.peer=function(t,e){},e}();t.OfflineState=e}(PeerIo||(PeerIo={}));var PeerIo;!function(t){var e=function(){function e(){}return e.prototype.state=function(){return t.PeerJsStateEnum.online},e.prototype.network=function(e,n){n||e.setStateObject(new t.OfflineState)},e.prototype.peer=function(e,n){n&&e.setStateObject(new t.ConnectedState)},e}();t.OnlineState=e}(PeerIo||(PeerIo={}));var PeerIo;!function(t){var e=function(){function e(){}return e.prototype.state=function(){return t.PeerJsStateEnum.connected},e.prototype.network=function(e,n){n||e.setStateObject(new t.WaitClosingState)},e.prototype.peer=function(e,n){n||e.setStateObject(new t.OnlineState)},e}();t.ConnectedState=e}(PeerIo||(PeerIo={}));var PeerIo;!function(t){var e=function(){function e(){}return e.prototype.state=function(){return t.PeerJsStateEnum.wait_closing},e.prototype.network=function(e,n){n&&e.setStateObject(new t.ConnectedState)},e.prototype.peer=function(e,n){n||e.setStateObject(new t.OfflineState)},e}();t.WaitClosingState=e}(PeerIo||(PeerIo={}));var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},PeerIo;!function(t){!function(t){t[t.initial=1]="initial",t[t.online=2]="online",t[t.connected=3]="connected",t[t.wait_closing=4]="wait_closing"}(t.PeerJsStateEnum||(t.PeerJsStateEnum={}));var e=(t.PeerJsStateEnum,function(e){function n(){e.call(this),this._ON_STATE_CHANGED="onStateCahnged",this._state=new t.OfflineState}return __extends(n,e),n.prototype.state=function(){return this._state.state()},n.prototype.stateObject=function(){return this._state},n.prototype.setStateObject=function(t){this._state=t,this.emit(this._ON_STATE_CHANGED,t.state())},n.prototype.onStateChanged=function(t){this.on(this._ON_STATE_CHANGED,t)},n}(EventEmitter2));t.PeerJsStateManager=e}(PeerIo||(PeerIo={}));var PeerIo;!function(t){var e=function(){function e(){}return e.waitTime=function(t,e){return t+Math.random()*(e-t)},e.key=function(e,n){switch(n){case t.NeighbourTypeEnum.video:return e+"-video";case t.NeighbourTypeEnum.data:return e+"-data"}},e.isDataChannel=function(t){return t&&t.hasOwnProperty("reliable")},e.isMediaConnection=function(t){return t&&t.hasOwnProperty("localStream")},e.isMediaStream=function(t){return t&&"active"in t&&"id"in t},e}();t.Util=e}(PeerIo||(PeerIo={}));var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},PeerIo;!function(t){!function(t){t[t.video=1]="video",t[t.data=2]="data"}(t.NeighbourTypeEnum||(t.NeighbourTypeEnum={}));var e=(t.NeighbourTypeEnum,function(e){function n(t,n){e.call(this),this.peerId_=t,this.type_=n,this.sources_=[],this.option_={label:"json",serialization:"none",reliable:!1},this.isEstablished=function(){throw"this method should be overwrite."},this.addLink=function(t){throw"this method should be overwrite."}}return __extends(n,e),n.prototype.type=function(){return this.type_},n.prototype.peerID=function(){return this.peerId_},n.prototype.streams=function(){return this.sources_},n.prototype.setStream=function(e){console.log("setstream1"),console.log(e),e instanceof Array?(console.log("setstream2"),Array.prototype.push.apply(this.sources_,e)):t.Util.isMediaStream(e)&&(console.log("setstream3"),this.sources_.push(e))},n.prototype.dataChannelOption=function(){return this.option_},n.prototype.setDataChannelOption=function(t){this.option_=t},n.prototype.key=function(){return t.Util.key(this.peerId_,this.type_)},n}(EventEmitter2));t.NeighbourRecord=e}(PeerIo||(PeerIo={}));var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},PeerIo;!function(t){var e=function(e){function n(){var t=this;e.call(this),this.NEED_ESTABLISH_LINK="need-establish-link-in-neighbourstore",this.recordsHash_={},this.linksHash_={},this.neighbours=function(){return t.recordsHash_}}return __extends(n,e),n.prototype.addRecord_=function(t){t.isEstablished=this.isEstablished_.bind(this,t.key()),t.addLink=this.addLink_.bind(this,t.key()),this.recordsHash_[t.key()]=t},n.prototype.addRecord=function(t){t.key()in this.recordsHash_?this.recordsHash_[t.key()].isEstablished()||this.emit(this.NEED_ESTABLISH_LINK,this.recordsHash_[t.key()]):(this.addRecord_(t),this.emit(this.NEED_ESTABLISH_LINK,t))},n.prototype.removeRecord=function(t){t.key()in this.linksHash_&&(this.linksHash_[t.key()].close(),delete this.linksHash_[t.key()]),t.key()in this.recordsHash_&&delete this.recordsHash_[t.key()]},n.prototype.addLink=function(e){if(!(e.key()in this.recordsHash_)){var n=new t.NeighbourRecord(e.peerID(),e.type());this.addRecord_(n)}this.linksHash_[e.key()]=e},n.prototype.findLink=function(t){return this.linksHash_[t]},n.prototype.links=function(){return _.reduce(this.linksHash_,function(t,e,n){return t.concat(e)},[])},n.prototype.addLink_=function(t,e){this.isEstablished_(t)&&this.linksHash_[t].close(),this.linksHash_[t]=e},n.prototype.isEstablished_=function(t){return t in this.linksHash_?this.linksHash_[t].isEstablished():!1},n}(EventEmitter2);t.NeighbourStore=e}(PeerIo||(PeerIo={}));var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},PeerIo;!function(t){var e=function(e){function n(t,n){e.call(this),this.peerID_=t,this.link_=n,this.OnStopVideo="onStopVideo-in-peer.io.ts",this.OnDataLinkDown="onDataLinkDown-in-link_component.ts",this.OnRecvData="onRecvData-in-link_component.ts"}return __extends(n,e),n.prototype.type=function(){return null},n.prototype.peerID=function(){return this.peerID_},n.prototype.key=function(){return t.Util.key(this.peerID_,this.type())},n.prototype.isEstablished=function(){return!1},n.prototype.send=function(t){},n.prototype.close=function(){},n}(EventEmitter2);t.LinkComponentTemplate=e;var n=function(e){function n(t,n){var o=this;e.call(this,t,n),this.peerID_=t,this.link_=n,n.on("close",function(){o.link_=null,o.emit(o.OnDataLinkDown)}),n.on("error",function(t){o.link_=null}),n.on("data",function(t){o.emit(o.OnRecvData,t)})}return __extends(n,e),n.prototype.type=function(){return t.NeighbourTypeEnum.data},n.prototype.isEstablished=function(){return this.link_&&this.link_.open?this.link_.open:!1},n.prototype.send=function(t){this.isEstablished()&&this.link_&&this.link_.send(t)},n.prototype.close=function(){this.link_&&this.link_.close(),this.link_=null},n.prototype.options=function(){return{metadata:this.link_.metadata,serialization:this.link_.serialization,reliable:this.link_.reliable}},n}(e);t.DataLinkComponent=n;var o=function(e){function n(t,n){var o=this;e.call(this,t,n),this.peerID_=t,this.link_=n,this._sources=[],n.on("close",function(){o.link_=null,o.emit(o.OnStopVideo)}),n.on("error",function(t){o.link_=null})}return __extends(n,e),n.prototype.type=function(){return t.NeighbourTypeEnum.video},n.prototype.isEstablished=function(){return this.link_&&this.link_.open?this.link_.open:!1},n.prototype.sources=function(){return this._sources},n.prototype.setSource=function(t){t instanceof Array?Array.prototype.push.apply(this._sources,t):this._sources.push(t)},n.prototype.close=function(){this.link_&&this.link_.close(),this.link_=null},n}(e);t.VideoLinkComponent=o;var i=function(){function e(){}return e.createLinkComponent=function(e,i){return t.Util.isDataChannel(i)?new n(e,i):t.Util.isMediaConnection(i)?new o(e,i):null},e}();t.LinkComponentFactory=i}(PeerIo||(PeerIo={}));var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},PeerIo;!function(t){var e=function(e){function n(n){var o=this;e.call(this),this.peer_=n,this.OnNewMediaStream="on-new-mediastream-in-link_generator.ts",this.OnNewDataChannel="on-new-datachannel-in-link_generator.ts",this.neighbourSourceHash_={},this.onStateChanged_=function(e){switch(e){case t.PeerJsStateEnum.initial:break;case t.PeerJsStateEnum.online:o.peer_.disconnected||o.state_.stateObject().peer(o.state_,!0);break;case t.PeerJsStateEnum.connected:setTimeout(o._establishAllPeer,t.Util.waitTime(2e3,5e3));break;case t.PeerJsStateEnum.wait_closing:}},this.establishLink=function(e){switch(e.type()){case t.NeighbourTypeEnum.video:o.tryCall_(e);break;case t.NeighbourTypeEnum.data:o.tryConnect_(e)}},this._establishAllPeer=function(){_.each(o.targetNeighbours_(),o.establishLink)},this.onRecvCall_=function(e){console.log("onrecv1");var n=e.peer,i=o.findNeighbour_(n),r=o.defaultStream_;if(i){console.log("onrecv1-1");var s=i.streams();s&&(r=s[0])}console.log("onrecv2"),e.answer(r),e.on("stream",function(i){console.log("onrecv3");var r=t.LinkComponentFactory.createLinkComponent(n,e);o.emit(o.OnNewMediaStream,r,i)})},this.onRecvConnect_=function(e){var n=e.peer;e.on("open",function(){var i=t.LinkComponentFactory.createLinkComponent(n,e);o.emit(o.OnNewDataChannel,i)})},this.state_=new t.PeerJsStateManager,this.state_.onStateChanged(this.onStateChanged_),this.checkNetworkStatus_(),this.wrapPeerEvent_()}return __extends(n,e),n.prototype.setDefaultStream=function(t){this.defaultStream_=t},n.prototype.addNeighbourSource=function(t,e){this.neighbourSourceHash_[t]=e},n.prototype.removeNeighbourSource=function(t){t in this.neighbourSourceHash_&&delete this.neighbourSourceHash_[t]},n.prototype.checkNetworkStatus_=function(){var t=this;Offline.options={checks:{xhr:{url:"https://skyway.io/dist/0.3/peer.min.js"}}},Offline.on("up",function(){t.state_.stateObject().network(t.state_,!0)}),Offline.on("down",function(){t.state_.stateObject().network(t.state_,!1)}),"up"===Offline.state&&this.state_.stateObject().network(this.state_,!0),Offline.check()},n.prototype.wrapPeerEvent_=function(){var t=this;this.peer_.on("open",function(){t.state_.stateObject().peer(t.state_,!0)}),this.peer_.on("error",function(t){console.log(t)}),this.peer_.on("disconnected",function(){t.state_.stateObject().peer(t.state_,!1)}),this.peer_.on("connection",this.onRecvConnect_),this.peer_.on("call",this.onRecvCall_)},n.prototype.findNeighbour_=function(t){var e=_.find(this.neighbourSourceHash_,function(e){return t in e});return e?e[t]:null},n.prototype.neighbourArray_=function(){return _.reduce(this.neighbourSourceHash_,function(t,e,n){return _.reduce(e(),function(t,e,n){return t.concat(e)},t)},[])},n.prototype.targetNeighbours_=function(){var t=this.neighbourArray_();return _.filter(t,function(t){return!t.isEstablished()})},n.prototype.tryCall_=function(e){var n=this;console.log("trycall1");var o=e.streams(),i=this.defaultStream_;console.log(o),o&&(i=o[0]),console.log(i);var r=this.peer_.call(e.peerID(),i);console.log("trycall2"),console.log(r),r&&r.on("stream",function(o){console.log("trycall3");var i=t.LinkComponentFactory.createLinkComponent(e.peerID(),r);n.emit(n.OnNewMediaStream,i,o)})},n.prototype.tryConnect_=function(e){var n=this,o=this.peer_.connect(e.peerID(),e.dataChannelOption());o&&o.on("open",function(){var i=t.LinkComponentFactory.createLinkComponent(e.peerID(),o);n.emit(n.OnNewDataChannel,i)})},n}(EventEmitter2);t.LinkGenerator=e}(PeerIo||(PeerIo={}));var __extends=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},PeerIo;!function(t){t.OnStartVideo="onStartVideo-in-peer.io.ts",t.OnStopVideo="onStopVideo-in-peer.io.ts",t.OnDataLinkUp="onDataLinkUp",t.OnDataLinkDown="onDataLinkDown",t.OnRecvData="onRecvData";var e=function(e){function n(n){var o=this;e.call(this),this.peerJs_=n,this.newDataChannel_=function(e){o.neighbourStore_.addLink(e),o.emit(t.OnDataLinkUp,e.peerID(),e.options()),e.on(e.OnRecvData,function(n){o.emit(t.OnRecvData,e.peerID(),n)})},this.newMediaStream_=function(e,n){console.log("new media stream"),o.neighbourStore_.addLink(e),o.emit(t.OnStartVideo,e.peerID(),n)},this.neighbourStore_=new t.NeighbourStore,this.linkGenerator_=new t.LinkGenerator(n),this.linkGenerator_.addNeighbourSource("neighbourSource",this.neighbourStore_.neighbours),this.linkGenerator_.on(this.linkGenerator_.OnNewDataChannel,this.newDataChannel_),this.linkGenerator_.on(this.linkGenerator_.OnNewMediaStream,this.newMediaStream_),this.neighbourStore_.on(this.neighbourStore_.NEED_ESTABLISH_LINK,this.linkGenerator_.establishLink)}return __extends(n,e),n.prototype.addDefaultStream=function(t){this.linkGenerator_.setDefaultStream(t)},n.prototype.addVideoNeighbour=function(e,n){var o=new t.NeighbourRecord(e,t.NeighbourTypeEnum.video);n&&o.setStream(n),this.neighbourStore_.addRecord(o)},n.prototype.addDataNeighbour=function(e,n){var o=new t.NeighbourRecord(e,t.NeighbourTypeEnum.data);n&&o.setDataChannelOption(n),this.neighbourStore_.addRecord(o)},n.prototype.removeVideoNeighbour=function(e){this.neighbourStore_.removeRecord(new t.NeighbourRecord(e,t.NeighbourTypeEnum.video))},n.prototype.removeDataNeighbour=function(e){this.neighbourStore_.removeRecord(new t.NeighbourRecord(e,t.NeighbourTypeEnum.data))},n.prototype.send=function(t,e){var n=this.neighbourStore_.findLink(t+"-data");n&&n.send(e)},n.prototype.broadcast=function(t){var e=this.neighbourStore_.links();_.each(e,function(e){e.send(t)})},n}(EventEmitter2);t.PeerIo=e}(PeerIo||(PeerIo={}));