export interface SectionDetails {
    [key: string]: {
      faces: string[];
      content: {
        [key: string]: string;
      };
    };
  }