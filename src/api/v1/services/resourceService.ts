import { Resource } from "../models/resource";

let sampleResources: Resource[] = [
  {
    id: 1,
    title: "Express.js Guide",
    type: "documentation",
    url: "https://expressjs.com/en/guide",
    description: "Official Express.js documentation",
    createdAt: "2025-02-20T10:00:00.000Z",
  },
  {
    id: 2,
    title: "TypeScript Basics",
    type: "video",
    url: "https://example.com/ts-basics",
    description: "Introduction to TypeScript",
    createdAt: "2025-02-20T10:00:00.000Z",
  },
  {
    id: 3,
    title: "REST API Design",
    type: "article",
    url: "https://example.com/rest-design",
    description: "Best practices for REST API design",
    createdAt: "2025-02-20T10:00:00.000Z",
  },
  {
    id: 4,
    title: "Jest Testing Tutorial",
    type: "tutorial",
    url: "https://example.com/jest-tutorial",
    description: "Complete guide to testing with Jest",
    createdAt: "2025-02-20T10:00:00.000Z",
  },
];

let resources: Resource[] = [...sampleResources];

export const RESOURCE_TYPES = [
  "article",
  "video",
  "tutorial",
  "documentation",
] as const;

export const getAllResources = (): Resource[] => {
  return resources;
};

export const getResourceById = (id: number): Resource | undefined => {
  for (let i = 0; i < resources.length; i++) {
    if (resources[i].id === id) {
      return resources[i];
    }
  }
  return undefined;
};

export const createResource = (input: {
  title: string;
  type: string;
  url: string;
  description?: string;
}): Resource => {
  let maxId = 0;
  for (let i = 0; i < resources.length; i++) {
    if (resources[i].id > maxId) {
      maxId = resources[i].id;
    }
  }
  const newOne: Resource = {
    id: maxId + 1,
    title: input.title,
    type: input.type,
    url: input.url,
    description: input.description || "",
    createdAt: new Date().toISOString(),
  };
  resources.push(newOne);
  return newOne;
};
