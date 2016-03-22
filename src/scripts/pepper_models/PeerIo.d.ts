/// <reference path="../../typings/tsd.d.ts" />

declare module PeerIo{
    export var OnStartVideo: string;
    export var OnStopVideo: string;
    export var OnDataLinkUp: string;
    export var OnDataLinkDown: string;
    export var OnRecvData: string;

    export class PeerIo extends EventEmitter2{

        //================= setup ==================
        constructor(peerJs_: PeerJs.Peer);

        addDefaultStream(mediaStream: MediaStream): void;

        addVideoNeighbour(peerId: string, stream?: MediaStream | MediaStream[]): void;

        addDataNeighbour(peerId: string, option?: PeerJs.PeerConnectOption): void;

        removeVideoNeighbour(peerId: string): void;

        removeDataNeighbour(peerId: string): void;

        //================= setup ==================

        //================= data channel ===========
        send(peerId: string, message: string): void;

        broadcast(message: string): void;
        //================= data channel ===========
    }
}
