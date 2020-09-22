type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag[];
}
type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
};
type Tag = {
    id: string;
    name: string;
};
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => "duplicated" | "success"; // 联合类型
    update: (id: string, name: string) => "success" | "not found" | "duplicated";// 联合类型
    remove: (id: string) => boolean;
    save: () => void;
};