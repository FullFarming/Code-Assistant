export interface Department {
  id: string;
  name: string;
  fullName: string;
  nameKo: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  color: string;
  description: string;
}

export const DEPARTMENTS: Department[] = [
  {
    id: "wpr",
    name: "WPR",
    fullName: "Workplace Resources",
    nameKo: "WPR팀",
    icon: "🏢",
    iconBg: "#C41230",
    iconColor: "#FFFFFF",
    color: "#C41230",
    description: "시설·행정·IT 지원",
  },
  {
    id: "hr",
    name: "HR",
    fullName: "Human Resources",
    nameKo: "HR팀",
    icon: "👥",
    iconBg: "#2563EB",
    iconColor: "#FFFFFF",
    color: "#2563EB",
    description: "인사·채용·복지",
  },
];
