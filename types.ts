export enum MessageSender {
  USER = 'user',
  AI = 'ai',
}

export interface Message {
  sender: MessageSender;
  text: string;
}

export interface Avatar {
  id: string;
  name: string;
  language: string;
  imageUrl: string;
  faceId: string; // Unique identifier for the Simli.ai 3D model
}

export interface ConfirmedBooking {
  avatar: Avatar;
  duration: number;
  scheduledTime: Date;
  sessionCode: string;
}