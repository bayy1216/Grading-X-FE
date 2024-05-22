import {axiosClient} from "@/api/AxiosClient.ts";
import {Announcement, AnnouncementsResponse} from "@/api/announcement/announcement.response.ts";
import {AnnouncementCreateRequest, AnnouncementUpdateRequest} from "@/api/announcement/announcement.request.ts";

export async function getAnnouncementsByCourseId(courseId: number): Promise<AnnouncementsResponse> {
  const response = await axiosClient.get(`/api/v2/announcement/${courseId}/announcement`);
  return response.data;
}

export async function createAnnouncement(courseId: number, request: AnnouncementCreateRequest): Promise<number> {
  const response = await axiosClient.post(`/api/v2/announcement/${courseId}/announcement`, {
    ...request
  });
  return response.data;
}

export async function getAnnouncementById(announcementId: number): Promise<Announcement> {
  const response = await axiosClient.get(`/api/v2/announcement/announcement/${announcementId}`);
  return response.data;
}


export async function updateAnnouncement(announcementId: number, request: AnnouncementUpdateRequest): Promise<void> {
  await axiosClient.put(`/api/v2/announcement/announcement/${announcementId}`, {
    ...request
  });
  return;
}

export async function deleteAnnouncement(announcementId: number): Promise<void> {
  await axiosClient.delete(`/api/v2/announcement/announcement/${announcementId}`);
  return;
}
