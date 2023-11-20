export interface SubSections {
  title: string;
  route: string;
  icon?: string;
  subtitle?: string;
}

export interface Section {
  title: string;
  route?: Sections;
  icon: React.ReactElement;
  type?: "subitem" | "item";
  children?: SubSections[];
}

type SectionsObject = {
  [key in Sections]: Section;
};

export type ResponseType<T> = {
  status: number;
  response: T | any;
};
