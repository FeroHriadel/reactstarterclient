export type CategoryItem = {
    title: string;
    slug: string;
    description: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export type TagItem = {
    title: string;
    slug: string;
    description: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export type AddCategoryFormValues = {
    title: string;
    description: string;
}

export type AddTagFormValues = {
    title: string;
    description: string;
}

export type CloudinaryImage = {
    public_id: string;
    url: string;
}

export interface Item {
    category: string,
    tags: string[],
    title: string,
    description: string,
    images: CloudinaryImage[]
}