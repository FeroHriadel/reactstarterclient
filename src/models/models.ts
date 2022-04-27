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
