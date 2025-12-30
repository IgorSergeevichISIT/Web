export interface ProductData {
    id: number;
    src: string;
    title: string;
    text: string;
    color?: string;
}

export const products: ProductData[] = [
    { id: 1, src: "/photo1.jpeg", title: "Финансовая акция 1", text: "Инвестируйте с выгодой!" },
    { id: 2, src: "/photo2.png", title: "Финансовая акция 2", text: "Успейте воспользоваться предложением!" },
    { id: 3, src: "/photo3.png", title: "Финансовая акция 3", text: "Сделайте свой капитал больше!" }
];
