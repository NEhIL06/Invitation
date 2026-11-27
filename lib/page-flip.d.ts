declare module "page-flip" {
  export class PageFlip {
    constructor(element: HTMLElement, options: Record<string, number | boolean | string>);
    loadFromHTML(pages: HTMLElement[]): void;
    on(event: "flip", listener: (event: {data: number}) => void): void;
    on(event: "changeState", listener: (event: {data: string}) => void): void;
    getState(): string;
    flipNext(corner: "bottom" | "top"): void;
    flipPrev(corner: "bottom" | "top"): void;
    turnToPage(page: number): void;
    destroy(): void;
  }
}

