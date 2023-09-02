interface IAdress {
  email: string;
  name: string;
}

interface IMessage {
  to: IAdress;
  from: IAdress;
  subject: string;
  template?: any;
  context?: any;
  html?: string;
  body?: string;
  preview?: boolean;
}

interface IMailProvider {
  sendMail(message: IMessage): Promise<void>;
}

export { IMailProvider, IMessage, IAdress };
