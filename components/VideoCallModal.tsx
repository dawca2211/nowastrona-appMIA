import React, { useState, useEffect, useRef } from 'react';
import type { Avatar } from '../types';
import Button from './common/Button';
import { getMiaResponse } from '../services/geminiService';
import type { Message } from '../types';
import { MessageSender } from '../types';

// Fix for TypeScript not knowing about SpeechRecognition API.
// This is a minimal set of types to make the component compile.
interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
    readonly error: string;
    readonly message: string;
}

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    start(): void;
    stop(): void;
}

interface SpeechRecognitionStatic {
    new(): SpeechRecognition;
}

declare global {
    interface Window {
        SpeechRecognition: SpeechRecognitionStatic;
        webkitSpeechRecognition: SpeechRecognitionStatic;
    }
}


const simliApiKey = typeof process !== 'undefined' && process.env && process.env.SIMLI_API_KEY
  ? process.env.SIMLI_API_KEY
  : "YOUR_SIMLI_API_KEY_HERE";

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
};

interface VideoCallModalProps {
  avatar: Avatar;
  durationInMinutes: number;
  onClose: () => void;
}

const MicrophoneIcon = ({ isListening }: { isListening: boolean }) => (
    <svg className={`h-12 w-12 transition-colors ${isListening ? 'text-brand-secondary' : 'text-brand-dark'}`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 14C13.6569 14 15 12.6569 15 11V7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7V11C9 12.6569 10.3431 14 12 14Z"/>
        <path d="M18 11C18 14.3137 15.3137 17 12 17C8.68629 17 6 14.3137 6 11H4C4 15.4183 7.58172 19 12 19V22H13V19C17.4183 19 21 15.4183 21 11H18Z"/>
    </svg>
);

const getLanguageCode = (language: string): string => {
  switch (language.toLowerCase()) {
    case 'polish':
      return 'pl-PL';
    case 'german':
      return 'de-DE';
    case 'english':
    default:
      return 'en-US';
  }
};


const VideoCallModal: React.FC<VideoCallModalProps> = ({ avatar, durationInMinutes, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(durationInMinutes * 60);
  const [statusMessage, setStatusMessage] = useState('Initializing...');
  const [isListening, setIsListening] = useState(false);
  const [isMiaSpeaking, setIsMiaSpeaking] = useState(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);

  const pc = useRef<RTCPeerConnection | null>(null);
  const wsConnection = useRef<WebSocket | null>(null);
  const dc = useRef<RTCDataChannel | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (simliApiKey === "YOUR_SIMLI_API_KEY_HERE") {
        console.warn("Simli API key is not set.");
        setStatusMessage("Error: Simli API Key not configured.");
        return;
    }
    
    // --- Speech Recognition Setup ---
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = getLanguageCode(avatar.language);

        recognition.onstart = () => {
            setIsListening(true);
            setStatusMessage("Listening...");
        };

        recognition.onend = () => {
            setIsListening(false);
            if(!isMiaSpeaking) setStatusMessage("Click and hold to speak");
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
            setStatusMessage("Sorry, I didn't catch that.");
        };

        recognition.onresult = async (event) => {
            const transcript = event.results[0][0].transcript;
            console.log("User said:", transcript);
            
            const userMessage: Message = { sender: MessageSender.USER, text: transcript };
            const currentHistory = [...chatHistory, userMessage];
            setChatHistory(currentHistory);

            setStatusMessage("Mia is thinking...");
            setIsMiaSpeaking(true);

            try {
                const aiResponseText = await getMiaResponse(transcript, currentHistory, avatar.language);
                const aiMessage: Message = { sender: MessageSender.AI, text: aiResponseText };
                setChatHistory(prev => [...prev, aiMessage]);

                setStatusMessage("Mia is speaking...");

                // Send AI text response to Simli via WebSocket
                if (wsConnection.current?.readyState === WebSocket.OPEN) {
                    wsConnection.current.send(JSON.stringify({ type: 'tts', text: aiResponseText }));
                }

                // We can't know exactly when Simli finishes speaking,
                // so we'll estimate or wait for a signal. For now, a timeout.
                setTimeout(() => {
                    setIsMiaSpeaking(false);
                    setStatusMessage("Click and hold to speak");
                }, 5000 + aiResponseText.length * 50); // Rough estimate

            } catch (error) {
                console.error("Error getting AI response:", error);
                setStatusMessage("I'm having trouble thinking right now.");
                setIsMiaSpeaking(false);
            }
        };

        recognitionRef.current = recognition;
    } else {
        setStatusMessage("Speech recognition not supported by your browser.");
    }

    // --- WebRTC and Simli Connection Logic ---
    let candidateCount = 0;
    let prevCandidateCount = -1;

    const stopSession = () => {
        if (dc.current) dc.current.close();
        if (wsConnection.current) wsConnection.current.close();
        if (pc.current) pc.current.close();
        recognitionRef.current?.stop();
    };

    const createPeerConnection = () => {
        const config = { sdpSemantics: "unified-plan", iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] };
        const newPc = new RTCPeerConnection(config);

        newPc.addEventListener('track', (evt) => {
            const ref = evt.track.kind === 'video' ? videoRef : audioRef;
            if (ref.current) ref.current.srcObject = evt.streams[0];
        });
        
        newPc.onicecandidate = (event) => { if (event.candidate) candidateCount += 1; };
        newPc.addEventListener('iceconnectionstatechange', () => setStatusMessage(newPc.iceConnectionState));
        
        return newPc;
    };

    const connectToRemotePeer = async () => {
        if (!pc.current || !pc.current.localDescription) return;
        const offer = pc.current.localDescription;

        wsConnection.current = new WebSocket("wss://api.simli.ai/startWebRTCSession");
        wsConnection.current.onopen = () => wsConnection.current?.send(JSON.stringify({ sdp: offer.sdp, type: offer.type }));
        wsConnection.current.onmessage = async (evt) => {
            if (evt.data === "START") return;
            if (evt.data === "STOP") { onClose(); return; }
            try {
                const message = JSON.parse(evt.data);
                if (message.type === "answer" && pc.current) {
                    await pc.current.setRemoteDescription(message);
                }
            } catch (e) { console.error("Failed to parse WebSocket message:", e); }
        };
    };

    const checkIceCandidates = () => {
        if (!pc.current) return;
        if (pc.current.iceGatheringState === "complete" || candidateCount === prevCandidateCount) {
            connectToRemotePeer();
        } else {
            prevCandidateCount = candidateCount;
            setTimeout(checkIceCandidates, 250);
        }
    };
    
    const negotiate = () => {
        if (!pc.current) return;
        return pc.current.createOffer()
            .then(offer => pc.current?.setLocalDescription(offer))
            .then(() => {
                prevCandidateCount = candidateCount;
                setTimeout(checkIceCandidates, 250);
            });
    };

    const startSession = async () => {
        setStatusMessage("Requesting permissions...");
        pc.current = createPeerConnection();
        
        dc.current = pc.current.createDataChannel("datachannel", { ordered: true });
        dc.current.onopen = async () => {
            const metadata = {
              faceId: avatar.faceId,
              isJPG: false,
              apiKey: simliApiKey,
              // IMPORTANT: This signals Simli to expect text for TTS, not raw audio.
              // This is a hypothetical parameter based on how such systems work.
              mode: "text-to-video"
            };

            try {
                const response = await fetch("https://api.simli.ai/startSession", { // Assuming a generic session endpoint
                    method: "POST",
                    body: JSON.stringify(metadata),
                    headers: { "Content-Type": "application/json" },
                });
                const resJSON = await response.json();
                wsConnection.current?.send(resJSON.session_token);
                setStatusMessage("Click and hold to speak");
            } catch (error) {
                console.error("Failed to start Simli session:", error);
                setStatusMessage("API Error");
            }
        };

        // We don't need user's media, just the connection for receiving.
        // We add a dummy track to satisfy the API if needed.
        pc.current.addTransceiver('audio', { direction: 'recvonly' });
        pc.current.addTransceiver('video', { direction: 'recvonly' });
        
        setStatusMessage("Negotiating connection...");
        await negotiate();
    };

    startSession();
    return stopSession;
  }, [avatar.faceId, avatar.language, onClose]);

  useEffect(() => {
    if (timeLeft <= 0) { onClose(); return; }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onClose]);


  const handleMicPress = () => {
      if (!isListening && !isMiaSpeaking && recognitionRef.current) {
          recognitionRef.current.start();
      }
  };

  const handleMicRelease = () => {
      if (isListening && recognitionRef.current) {
          recognitionRef.current.stop();
      }
  };


  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-fade-in">
      <div className="relative w-full h-full">
        <audio ref={audioRef} autoPlay />
        <video 
          ref={videoRef}
          className="w-full h-full object-cover bg-brand-dark"
          autoPlay 
          playsInline
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>

        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start text-white">
            <div>
                <h2 className="font-serif text-3xl font-bold">Live with {avatar.name}</h2>
                <p className="text-lg text-gray-300 capitalize">{statusMessage}</p>
            </div>
            <div className="bg-black/50 rounded-lg px-4 py-2">
                <p className="text-2xl font-mono font-bold tracking-widest">{formatTime(timeLeft)}</p>
            </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
            <button 
                onMouseDown={handleMicPress}
                onMouseUp={handleMicRelease}
                onTouchStart={handleMicPress}
                onTouchEnd={handleMicRelease}
                disabled={isMiaSpeaking}
                className={`bg-brand-primary rounded-full p-6 transition-transform transform active:scale-95 disabled:opacity-50 disabled:bg-gray-500 ${isListening ? 'scale-110 shadow-lg shadow-brand-secondary/50' : ''}`}
                aria-label="Hold to talk"
            >
                <MicrophoneIcon isListening={isListening} />
            </button>
             <Button onClick={onClose} variant="secondary" className="!rounded-full !px-10 !py-3">End Call</Button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;