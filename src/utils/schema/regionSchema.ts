
export const regionOptions = [
  '서울', '경기남부', '경기북부', '인천', '대전', '세종', '충남', '충북', 
  '부산', '울산', '대구', '경남', '경북', '광주', '제주'
];

export const regionGroups = [
  {
    name: '수도권',
    regions: ['서울', '경기남부', '경기북부', '인천']
  },
  {
    name: '충청권',
    regions: ['대전', '세종', '충남', '충북']
  },
  {
    name: '경상권',
    regions: ['부산', '울산', '대구', '경남', '경북']
  },
  {
    name: '전라/제주권',
    regions: ['광주', '제주']
  }
];

export interface RegionGroup {
  name: string;
  regions: string[];
}
