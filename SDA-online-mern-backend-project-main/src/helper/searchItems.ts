interface SearchOptions {
  search: string
  minPrice?: number
  maxPrice?: number
  categoryId?: string
  // notAdmin?: boolean
}

export const searchItems = ({
  search,
  minPrice,
  maxPrice,
  categoryId,
}: // notAdmin,
SearchOptions) => {
  const searchRegExpr = new RegExp('.*' + search + '.*', 'i')

  let searchObject: any = {
    // search about any item by name or description
    $or: [
      { name: { $regex: searchRegExpr } },
      { description: { $regex: searchRegExpr } },
      { email: { $regex: searchRegExpr } },
      { phone: { $regex: searchRegExpr } },
    ],
  }

  // filter products by price
  if (minPrice !== undefined && maxPrice !== undefined) {
    searchObject.price = {
      $gte: minPrice,
      $lte: maxPrice,
    }
  }

  // filter products by category
  if (categoryId) {
    // searchObject.category = categoryId

    // Split the string into an array of category IDs and filter
    const categoryIdsArray = categoryId.split(',').filter((categoryId) => categoryId.trim() !== '')

    if (categoryIdsArray.length > 0) {
      // categoryIds is an array of filtered category IDs
      searchObject.category = categoryIdsArray
    }
  }

  // search only for user (not admin)
  // if (notAdmin) {
  //   searchObject.isAdmin = { $ne: true }
  // }

  return searchObject
}
