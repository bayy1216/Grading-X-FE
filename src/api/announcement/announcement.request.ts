export interface AnnouncementCreateRequest {
  title: string;
  content: string;
}

export interface AnnouncementUpdateRequest {
  title?: string;
  content?: string;
}