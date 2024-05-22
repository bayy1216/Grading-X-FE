export interface AnnouncementsResponse {
  announcementResponses: Announcement[];
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  updatedDate: string;
}