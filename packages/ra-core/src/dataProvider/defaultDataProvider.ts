export const defaultDataProvider = {
  create: () => Promise.resolve({ data: null }),
  delete: () => Promise.resolve({ data: null }),
  deleteMany: () => Promise.resolve({ data: [] }),
  getList: () => Promise.resolve({ data: [], total: 0 }),
  getMany: () => Promise.resolve({ data: [] }),
  getManyReference: () => Promise.resolve({ data: [], total: 0 }),
  getOne: () => Promise.resolve({ data: null }),
  update: () => Promise.resolve({ data: null }),
  updateMany: () => Promise.resolve({ data: [] })
}