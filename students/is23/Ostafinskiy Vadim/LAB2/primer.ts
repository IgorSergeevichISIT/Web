// Базовые типы
const userName: string = "Alice";
const userAge: number = 28;
const isActive: boolean = true;
const favoriteNumbers: number[] = [3, 7, 42];
const tupleExample: [string, number] = ["points", 10];
// const bigInteger: bigint = 9007199254740991n;
const uniqueId: symbol = Symbol("id");
const optionalValue: string | undefined = undefined;
const nullableValue: string | null = null;

function greet(name: string): string {
  return` Привет, ${name}!`;
}

// Интерфейсы и типы
interface User {
  id: number;
  name: string;
  email?: string;
}

// type Admin = User & {
//   role: "admin";
//   permissions: string[];
// };

interface Admin extends User {
  role: "admin";
  permissions: string[];
}

const admin: Admin = {
  id: 1,
  name: "Bob",
  role: "admin",
  permissions: ["manage-users", "view-reports"],
};

type ApiResponse<T> = {
  data: T;
  error?: string;
};

const adminResponse: ApiResponse<Admin> = {
  data: admin,
};

// keyof, typeof, in, as
const settings = {
  theme: "dark",
  language: "ru",
  notifications: true,
};

type Settings = typeof settings;
type SettingKey = keyof Settings;

// const updateSetting = (key: SettingKey, value: Settings[SettingKey]) => {
//   settings[key] = value;
// };

// Глава 4. Utility types: Partial, Pick, Omit, Record, ReturnType и другие
type Article = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  65?: Date;
};


type ArticleDraft = Partial<Article>;
type ArticlePreview = Pick<Article, "id" | "title" | "tags">;
type ArticleWithoutBody = Omit<Article, "body">;
type ArticleTagMap = Record<string, ArticlePreview>;

const draft: ArticleDraft = {
  title: "Новый пост про TypeScript",
};

const preview: ArticlePreview = {
  id: "1",
  title: "Знакомство с TypeScript",
  tags: ["typescript", "basics"],
};

const withoutBody: ArticleWithoutBody = {
  id: "2",
  title: "Гайд по типам",
  tags: ["typescript"],
};

const tagMap: ArticleTagMap = {
  typescript: preview,
};

const loadArticle = (id: string) => ({
  id,
  title: "Заголовок",
  body: "Содержимое",
  tags: ["typescript"],
});

type LoadArticleResult = ReturnType<typeof loadArticle>;

const result: LoadArticleResult = loadArticle("3");





// Пример вызова дженерика
// const userEntity: Name<User> = {
//     data: { 
//         id: 1, 
//         name: "John", 
//         email: "john@example.com" 
//     },
//     timestamp: new Date()
// };

let a: (string | number)[] = [];
let b: string[] | number [] = [];
let c: [string, number] = ["Привет", 123];

interface Article {
  id: number;
  title: string;
  tags: string[];
  createdAt: Date;
}

type SortKeys<T> = keyof T | `-${Extract<keyof T, string | number>}`;

type ArticleSortKeys = SortKeys<Article>;
// ArticleSortKeys = "id" | "title" | "tags"|"-id" | "-title" | "-tags"