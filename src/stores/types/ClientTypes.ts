interface ProfileInfoData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  country: string;
  birth_datetime: string;
  preferred_employee: {
    full_name: string;
    id: number;
  };
}
interface docList {
  full_name: string;
  id: string;
}
interface docCurrent {
  employee: number;
}

interface timeList {
  start: number;
  end: number;
}

interface requestChat {
  data: [
    {
      closed: boolean;
      dt_created: string;
      request_id: number;
    }
  ];
}
interface currentChat {
  messages: [
    {
      value: string;
      dt_created: string;
      message: string;
      request_id: number;
      kind: string;
    }
  ];
}

export interface FileUploadSchema {
  file: string;
  file_name: string;
}

export type UserState = {
  tel: string | null;
  email: string | null;
  token: string | null;
  fileId: string | null;
  timeList: timeList[];
  fileListIds: never[];
  sms: boolean | false;
  editStatus: boolean | true;
  acceptedCons: boolean | true;
  profileInfoData: ProfileInfoData;
  docList: docList[];
  docCurrent: docCurrent;
  requestChat: requestChat;
  currentChat: currentChat;
  fileUpload: FileUploadSchema;
}
