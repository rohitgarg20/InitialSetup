export interface IEventListItem{
  _id: string
  _key: string
  attendees?: number
  description: string
  category: string
  image: string
  name: string
  schedule: string
  tagline: string
  viewcount: number
  startDate?: Date
  author?: {
    userName: string
    status?: string
    lastActiveTime?: string
    picture?: string
    signature?: string
    aboutme?: string
  }
  tid?: string
  description_1?: string
  description_2?: string
  field_1?: string
  field_2?: string
  mascotsCount?: number
  onlineUsersCount?: number
  membersCount?: number

}

export interface INudgeListItem{
  _id: string
  _key: string
  type: string
  uid: number
  image: string
  favicon: string
  asset_type: string
  assetId: number
  title: string
  schedule: number
  end_time: number
  description: string
  invitation_text: string
  startDate: Date
  endDate: Date
}

export interface IUserObj{
  username: string
  fullname: string
  userslug: string
  picture: string
  uid: number
  displayname: string
  signature: string
}

export interface IAttachment {
  picture: string
  type: string
  link?: string
}

export interface IPostItem{
  _id: string
  _key: string
  type: string
  uid: number
  approved: boolean
  attachment_id: string
  cid: number
  content: string
  lastposttime: number
  mainPid: number
  postcount: number
  sub_cid: number
  comment_count: number
  timestamp: number
  viewcount: number
  tags: string[]
  user: IUserObj
  attachment: IAttachment
  isDiscussionRoomAvailable: boolean
  postDate: Date
  isPostByLoggedInUser?: boolean
  tid?: number
  pid?: number
}

export interface OptionsData {
  icon: string
  key: string
  heading: string
  subHeading?: string
  showToUser?: boolean
  iconStyle?: any
}

export interface IJokeItem {
  content: string
  authorName: string
  jokeId: string
  id: string
}