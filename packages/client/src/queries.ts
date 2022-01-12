export const UpdateItem = `
  mutation updateItem($input: UpdateItemInput!) {
    updateItem(input: $input) {
      _id
    }
  }
`;

export const CreateItem = `
  mutation createItem($input: CreateItemInput!) {
    createItem(input: $input) {
      _id
    }
  }
`;

export const FindByIdQuery = `
query ($id: String!) {
  item (id: $id) {
    _id
    name
    value
    height
    width
    length
    weight
    volume
    quantity
  }
}
`;

export const DeleteById = `
  mutation deleteItem ($id: String!) {
    deleteItem (id: $id) {
      _id
    }
  }
`;

export const ListItemsQuery = `
  query filterItems ($filter: FilterItemsInput!) {
    filterItems (filter: $filter) {
      _id
      name
      value
      height
      width
      length
      weight
      volume
      quantity
    }
  }
`;
