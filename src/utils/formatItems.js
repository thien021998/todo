function format(items){
  return items.map(item => {
    const date = {
      ...item,
      created_at: item.created_at.split("T", 1),
      updated_at: item.updated_at.split("T", 1)
    }
    return date
  })
}

export default format
